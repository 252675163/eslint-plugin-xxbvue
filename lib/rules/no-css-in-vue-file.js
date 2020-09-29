/**
 * @author zdw
 */
"use strict";

const utils = require("../utils");


module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Do not use css in .vue file,please use less",
      categories: undefined,
      url:
        "https://eslint.vuejs.org/rules/component-name-in-template-casing.html",
    },
    fixable: "code",
  },

  create(context) {
      const root = context.parserServices.getDocumentFragment()
      
      
      return {
        Program:()=>{
          root.children.forEach(child=>{
          if(child.type==='VElement'&&child.name==='style'){
              let flag = child.startTag.attributes.some(attr=>{
                  return attr.type==='VAttribute'&&attr.value.value.toLowerCase()==='less'
              })
              if(!flag){
                  context.report({
                    node: child,
                    loc: child.loc,
                    message:
                      'Do not use css in .vue file,please use less',
                  });
              }
          }
        })}
      }
  },
};
