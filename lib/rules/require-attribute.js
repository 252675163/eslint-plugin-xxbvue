/**
 * @author zdw
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require("../utils");
const { toRegExp } = require("../utils/regexp");


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "enforce specific casing for the component naming style in template",
      categories: undefined,
      url:
        "https://eslint.vuejs.org/rules/component-name-in-template-casing.html",
    },
    fixable: "code",
    schema: [
      {
        type: "array",
        items: {
          type: "object",
          properties: {
            elementNameReg: {
              type: 'string',
              require: true
            },
            attribute: {
              type: 'array',
              additionalProperties: false,
              require: true,
              items: {
                type: "object",
                properties: {
                  name: {
                    type: 'string',
                    require: true
                  },
                  defaultValue: {
                    type: 'string',
                  },
                  mustBeAttr: {
                    type: 'boolean',
                  },
                  mustBeDirective: {
                    type: 'boolean',
                  }
                }
              }
            }
          }
        },
        additionalProperties: false,
        require: true,
      },
    ],
  },

  create(context) {
    const tokens =
      context.parserServices.getTemplateBodyTokenStore &&
      context.parserServices.getTemplateBodyTokenStore();

    let hasInvalidEOF = false;
    let options = (context.options[0] || []).map(optionP => {
      let newOption = { attribute: [] }
      newOption.reg = toRegExp(optionP.elementNameReg)
      for (let rawoption of (optionP.attribute || [])) {
        let option = Object.assign({}, rawoption)
        option.mustBeAttr = option.mustBeAttr === undefined ? false : option.mustBeAttr
        option.mustBeDirective = option.mustBeDirective === undefined ? false : option.mustBeDirective
        // 都将属性转为帕斯卡命名，方便后面获取属性值
        option.pascalName = option.name.includes('-') ? option.name : option.name.replace(/([A-Z])/g, "-$1")
        newOption.attribute.push(option)
      }
      return newOption
    })
    return utils.defineTemplateBodyVisitor(
      context,
      {
        VElement(node) {
          if (hasInvalidEOF) {
            return;
          }
          let reports = []
          for (let option2 of options) {
            if (!option2.reg.test(node.name)) {
              continue
            }
            for (let option of option2.attribute) {
              let reportItem = {}
              let attr = utils.getAttributeByPascal(node, option.pascalName) || utils.getDirectiveByPascal(node, 'bind', option.pascalName)
              let dir = utils.getDirective(node, 'model', option.pascalName)
              if (option.mustBeAttr) {
                if (dir && attr) {
                  reportItem.message = `需要将v-model:${dir.key.argument.name}改为${option.pascalName}`
                }


              } else if (option.mustBeDirective) {
                if (dir && attr) {
                  reportItem.message = `需要将${attr.key.name}改为v-model:${option.pascalName}`
                }
              }
              if (reportItem.message) {
                reports.push(reportItem)
                continue
              }
              if (!attr && !dir) {
                if (option.defaultText) {
                  reportItem.message = `记得添加属性${option.name}="${option.defaultText}"`
                } else if (option.defaultValue) {
                  reportItem.message = option.mustBeDirective ? `记得添加属性v-model:${option.name}="${option.defaultValue}"` : `记得添加属性:${option.name}="${option.defaultValue}"`
                } else {
                  reportItem.message = option.mustBeDirective ? `记得添加属性v-model:${option.name}` : `记得添加属性${option.name}`
                }
              }
              if (reportItem.message) {
                reports.push(reportItem)
              }
            }
          }
          reports.forEach(reportItem => {
            context.report({
              node: node,
              loc: node.startTag.loc,
              message:
                reportItem.message,
            });
          })
        },
      },
      Object.assign({
        Program(node) {
          hasInvalidEOF = utils.hasInvalidEOF(node);
        },
      })
    );
  },
};
