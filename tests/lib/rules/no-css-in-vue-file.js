"use strict";
var rule = require("../../../lib/rules/no-css-in-vue-file"), // 引入rule
  RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  "parserOptions": {
    ecmaVersion: 2020, sourceType: 'module',
    "parser": "@typescript-eslint/parser"
  }
});
// 运行测试用例
ruleTester.run("no-css-in-vue-file", rule, {
  // 正确的测试用例
  valid: [
    {
        filename: "a.vue",
        code: '<style lang="less"></style>',
    }
  ],
  // 错误的测试用例
  invalid: [
    {
      filename: "a.vue",
      code: '<style ></style>',
      errors: [
        {
          message:
            'Do not use css in .vue file,please use less'
        },
      ],
    },
  ],
});
