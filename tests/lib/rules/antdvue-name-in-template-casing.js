/**
 * @fileoverview setTimeout 第二个参数禁止是数字
 * @author OBKoro1
 */
"use strict";
var rule = require("../../../lib/rules/antdvue-name-in-template-casing"), // 引入rule
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 7, // 默认支持语法为es5
  },
});
// 运行测试用例
ruleTester.run("antdvue-name-in-template-casing", rule, {
  // 正确的测试用例
  valid: [
    {
      code: "<template><a-button>click me</a-button></template>",
    },
    {
      code: "<template><a-icon /></template>",
    },
    {
      code: "<template><otherCompoent>click me</otherCompoent></template>",
    },
  ],
  // 错误的测试用例
  invalid: [
    {
      code: "<template><a-Button>click me</a-Button></template>",
      errors: [
        {
          message:
            'Ant-design-vue\'s component name "a-Button" must be kebab-case.', // 与rule抛出的错误保持一致
        },
      ],
    },
  ],
});
