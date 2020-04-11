/**
 * @author zdw
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require("../utils");
const casing = require("../utils/casing");

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const defaultCase = "PascalCase";

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
  },

  create(context) {
    const caseType = "kebab-case";
    // const ignores = (options.ignores || []).map(toRegExp);
    const tokens =
      context.parserServices.getTemplateBodyTokenStore &&
      context.parserServices.getTemplateBodyTokenStore();

    /**
     * Checks whether the given node is the verification target node.
     * @param {VElement} node element node
     * @returns {boolean} `true` if the given node is the verification target node.
     */
    function isVerifyTarget(node) {
      // if (ignores.some((re) => re.test(node.rawName))) {
      //   // ignore
      //   return false;
      // }
      // We only verify the components registered in the component.
      return /^a-/i.test(node.rawName);
    }

    let hasInvalidEOF = false;

    return utils.defineTemplateBodyVisitor(
      context,
      {
        VElement(node) {
          if (hasInvalidEOF) {
            return;
          }

          if (!isVerifyTarget(node)) {
            return;
          }

          const name = node.rawName;
          const casingName = casing.getConverter(caseType)(name);
          if (casingName !== name) {
            const startTag = node.startTag;
            const open = tokens.getFirstToken(startTag);

            context.report({
              node: open,
              loc: open.loc,
              message:
                'Ant-design-vue\'s component name "{{name}}" must be {{caseType}}.',
              data: {
                name,
                caseType,
              },
              fix: (fixer) => {
                const endTag = node.endTag;
                if (!endTag) {
                  return fixer.replaceText(open, `<${casingName}`);
                }
                const endTagOpen = tokens.getFirstToken(endTag);
                return [
                  fixer.replaceText(open, `<${casingName}`),
                  fixer.replaceText(endTagOpen, `</${casingName}`),
                ];
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
