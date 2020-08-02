/**
 * @fileoverview setTimeout 第二个参数禁止是数字
 * @author OBKoro1
 */
"use strict";
var rule = require("../../../lib/rules/no-spui"), // 引入rule
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 7, // 默认支持语法为es5
  },
});
// 运行测试用例
ruleTester.run("no-spui", rule, {
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
      code: "<template><Button>click me</Button></template>",
      errors: [
        {
          message:
            'Do not use spui compoent or compoent name must be start of "a-".', // 与rule抛出的错误保持一致
        },
      ],
    },
  ],
});
