/**
 * @author zdw
 */
"use strict";
var rule = require("../../../lib/rules/width-unit-transform"), // 引入rule
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 7, // 默认支持语法为es5
  },
});
const options = [{checks:[{elementReg:'/van-/',attribute:'size'}],viewportWidth:375}]
// 运行测试用例
ruleTester.run("width-unit-transform", rule, {
  // 正确的测试用例
  valid: [
    //  {
    //    code: "<template><van-switch size='2vw'>click me</van-switch></template>",
    //    options,
    //  },
     
  ],
  // 错误的测试用例
  invalid: [
    {
      code:
        "<template><van-switch size='2'>click me</van-switch></template>",
      errors: [
        {
          message: 'size属性需要添加vw单位', // 与rule抛出的错误保持一致
        },
      ],
      options,
    },
    {
        code:
          "<template><van-switch :size='2' >click me</van-switch></template>",
        errors: [
          {
            message: 'size属性需要添加vw单位', // 与rule抛出的错误保持一致
          },
        ],
        options,
      },
  ],
});
