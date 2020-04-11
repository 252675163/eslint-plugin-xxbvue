/**
 * @author zdw
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require("../utils");
const casing = require("../utils/casing");
const { toRegExp } = require("../utils/regexp");

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const allowedCaseOptions = ["PascalCase", "kebab-case"];
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
    schema: [
      {
        type: "object",
        properties: {
          elementNameIgnores: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
            additionalItems: false,
          },
          elementNameIncludes: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
            additionalItems: false,
          },
        },
        additionalProperties: false,
        require,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const ignores = (options.elementNameIgnores || []).map(toRegExp);
    const includes = (options.elementNameIncludes || []).map(toRegExp);
    const tokens =
      context.parserServices.getTemplateBodyTokenStore &&
      context.parserServices.getTemplateBodyTokenStore();

    /**
     * Checks whether the given node is the verification target node.
     * @param {VElement} node element node
     * @returns {boolean} `true` if the given node is the verification target node.
     */
    function isVerifyTarget(node) {
      if (includes.some((re) => re.test(node.parent.parent.name))) {
        // include
        return true;
      }
      if (ignores.some((re) => re.test(node.parent.parent.name))) {
        // ignore
        return false;
      }
      return false;
    }

    let hasInvalidEOF = false;

    return utils.defineTemplateBodyVisitor(
      context,
      {
        VAttribute(node) {
          if (hasInvalidEOF) {
            return;
          }
          if (!isVerifyTarget(node)) {
            return;
          }
          let nameRegular = /^on(?=[A-Z])|^on-/;
          if (
            (node.key.name.rawName === "on" || node.key.name.rawName === "@") &&
            nameRegular.test(node.key.argument.rawName)
          ) {
            let VOnArgument = node.key.argument;
            const oldToken = tokens.getFirstToken(VOnArgument);

            context.report({
              node: VOnArgument,
              loc: VOnArgument.loc,
              message:
                'Component event name {{name}} must be not start with "on".',
              data: {
                name: VOnArgument.rawName,
              },
              fix: (fixer) => {
                let newName = VOnArgument.rawName
                  .replace(nameRegular, "")
                  .replace(/^[A-Z]/, (t) => t.toLowerCase());
                return [fixer.replaceText(oldToken, newName)];
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
