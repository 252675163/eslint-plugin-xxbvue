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
        type: "object",
        properties: {
        },
        additionalProperties: false,
        require,
      },
    ],
  },

  create(context) {
    // const tokens =
    //   context.parserServices.getTemplateBodyTokenStore &&
    //   context.parserServices.getTemplateBodyTokenStore();

    let hasInvalidEOF = false;
    const vanlistReg = /^van-list/
    return utils.defineTemplateBodyVisitor(
      context,
      {
        VElement(node) {
          if (hasInvalidEOF) {
            return;
          }
          if(!vanlistReg.test(node.name)){
            return
          }
          let errorText = utils.getAttribute(node,'error-text') || utils.getDirective(node,'bind','error-text')
          let ModelError = utils.getDirective(node,'model','error')
          let error = utils.getDirective(node,'bind','error')
          let loading = utils.getDirective(node,'bind','loading')
          let finished = utils.getDirective(node,'bind','finished')
          if(!ModelError){
            if(!error){
              context.report({
                node: node,
                loc: node.startTag.loc,
                message:
                  '记得添加属性{{name}}',
                data:{
                  name:'v-model:error="error"'
                }
              });
            }else{
              context.report({
                node: node,
                loc: node.startTag.loc,
                message:
                  '需要将:error改为v-model:error',
                data:{
                  name:'v-model:error="error"'
                }
              });
            }
          }
          if(!errorText){
            context.report({
              node: node,
              loc: node.startTag.loc,
              message:
                '记得添加属性{{name}}',
              data:{
                name:'error-text="请求失败，点击重新加载"'
              }
            });
          }
          if(!loading){
            context.report({
              node: node,
              loc: node.startTag.loc,
              message:
                '记得添加属性{{name}}',
              data:{
                name:':loading="loading"'
              }
            });
          }
          if(!finished){
            context.report({
              node: node,
              loc: node.startTag.loc,
              message:
                '记得添加属性{{name}}',
              data:{
                name:':finished="finished"'
              }
            });
          }
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
