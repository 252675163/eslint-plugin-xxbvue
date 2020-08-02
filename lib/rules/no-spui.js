/**
 * @author zdw
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require("../utils");

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------


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

    /**
     * Checks whether the given node is the verification target node.
     * @param {VElement} node element node
     * @returns {boolean} `true` if the given node is the verification target node.
     */
    function isSpui(node) {
      // if (ignores.some((re) => re.test(node.rawName))) {
      //   // ignore
      //   return false;
      // }
      // We only verify the components registered in the component.
      let transformName = node.name.trim().replace(/^i-/,'').replace('-','').toLowerCase()
      let arr = ["Affix", "Alert", "Scroll", "AutoComplete", "BackTop", "Badge", "Breadcrumb", "BreadcrumbItem", "Button", "ButtonGroup", "Card", "Carousel", "CarouselItem", "Cascader", "Checkbox", "CheckboxGroup", "DatePicker", "Dropdown", "DropdownItem", "DropdownMenu", "Form", "FormItem", "consultFilter", "consultFilterSingle", "consultFilterMulti", "consultFilterUnion", "vueTree", " checkboxTree", " radioTree", " Col", "Collapse", "Icon", "Input", "InputNumber", "XbInputNumber", "XbFuzzySelect", "LoadingBar", "Menu", "MenuGroup", "MenuItem", "Submenu", "Message", "Modal", "Notice", "Option", "Option2", "OptionGroup", "OptionGroup2", "Page", "XbPage", "Panel", "Poptip", "XbPoptip", "Progress", "Radio", "RadioGroup", "Rate", "Row", "Select", "Select2", "Slider", "Spin", "Step", "Steps", "Tabs", "TabPane", "Tag", "Timeline", "TimelineItem", "TimePicker", "Tooltip", "Upload", "XbOverflowTip", "XbTransfer", "XbConfirm", "XbIcon", "XbDroplist", "XbOption", "XbSelect", "XbTable", "XbLightTable", "XbSelectTable", "XbTableColumn", "XbHoverlist", " XbScrollbar", "XbFilter", "XbChartSelect", "XbGuidePop", "XbLoading"]
      return arr.some(i=>i.trim().toLowerCase()===transformName);
    }

    let hasInvalidEOF = false;

    return utils.defineTemplateBodyVisitor(
      context,
      {
        VElement(node) {
          if (hasInvalidEOF) {
            return;
          }

          if (!isSpui(node)) {
            return;
          }
          context.report({
            node,
            loc: node.loc,
            message:
              'Do not use spui compoent or compoent name must be start of "a-".',
          });
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
