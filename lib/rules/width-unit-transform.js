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
          checks: {
            type: "array", // [{elementReg:'/van-/',attribute:'size'}]
            items: { type: "object" },
            uniqueItems: true,
            additionalItems: false,
          },
          viewportWidth:{
            type: "integer", // [{elementReg:'/van-/',attribute:'size'}]
          }
        },
        additionalProperties: false,
        require,
      },
    ],
  },

  create(context) {
    let options = context.options[0] || {};
    const tokens =
      context.parserServices.getTemplateBodyTokenStore &&
      context.parserServices.getTemplateBodyTokenStore();

    let hasInvalidEOF = false;
    
    let checkOptions = options.checks || []
    let widthOption = options.viewportWidth ||375
    return utils.defineTemplateBodyVisitor(
      context,
      {
        VAttribute(node) {
          if (hasInvalidEOF) {
            return;
          }
          //   if (!isVerifyTarget(node)) {
          //     return;
          //   }
          // options.checks = [{elementReg:'/van-/',attribute:'size'}]
          let VHTMLIdentifier = null
          let replaceText = null
          let oldToken = null;
          let keyName = null
          for(let item of checkOptions){
            let eleReg = toRegExp(item.elementReg)
            // 处理:size
            if(node.key.type==='VDirectiveKey'){
                if(node.key.argument.name.toLowerCase()===item.attribute.toLowerCase()&&
                    eleReg.test(node.parent.parent.name)
                ){
                    let text = (node.value&&node.value.expression && node.value.expression.type==='Literal')? node.value.expression.raw:undefined
                    if(text!==undefined){
                        if(/^\d+.?\d*$/.test(text)){
                            replaceText = `'${(Number(text)*100/widthOption).toFixed(2)}vw'`
                            VHTMLIdentifier = node
                            oldToken = tokens.getFirstToken(VHTMLIdentifier.value.expression)
                            keyName = VHTMLIdentifier.key.argument.name
                            break
                        }
                    }
                }
            }else {
                if(node.key.name.toLowerCase()===item.attribute.toLowerCase()&&
                    eleReg.test(node.parent.parent.name)
                ){
                    if(node.value&&node.value.value&&/^\d+.?\d*$/.test(node.value.value)){
                        replaceText = (Number(node.value)*100/widthOption).toFixed(2) + 'vw'
                        VHTMLIdentifier = node
                        oldToken = tokens.getFirstToken(VHTMLIdentifier.value)
                        keyName = VHTMLIdentifier.key.name
                        break
                    }
                }
            }
            
          }
          if(VHTMLIdentifier){
            
            context.report({
              node: VHTMLIdentifier,
              loc: VHTMLIdentifier.loc,
              message:
                '{{name}}属性需要添加vw单位',
              data: {
                name: keyName,
              },
              fix: (fixer) => {
                return [fixer.replaceText(oldToken, replaceText)];
              },
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
