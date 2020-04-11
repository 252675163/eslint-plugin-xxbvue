/**
 * @author zdw
 */
"use strict";
var rule = require("../../../lib/rules/event-name-without-on-in-template"), // 引入rule
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 7, // 默认支持语法为es5
  },
});
// 运行测试用例
ruleTester.run("event-name-without-on-in-template", rule, {
  // 正确的测试用例
  valid: [
    {
      code: "<template><a-button @click='fn'>click me</a-button></template>",
    },
  ],
  // 错误的测试用例
  invalid: [
    {
      code:
        "<template><a-button v-on:on-click='fn'>click me</a-Button></template>",
      errors: [
        {
          message: 'Component event name on-click must be not start with "on".', // 与rule抛出的错误保持一致
        },
      ],
    },
    {
      code: "<template><a-button @on-click='fn'>click me</a-Button></template>",
      errors: [
        {
          message: 'Component event name on-click must be not start with "on".', // 与rule抛出的错误保持一致
        },
      ],
    },
    {
      code: `<template><div><a-button @onClick='fn'>click me</a-button><c-button @onClick='fn'>click me</c-button></div></template>`,
      errors: [
        {
          message: 'Component event name onClick must be not start with "on".', // 与rule抛出的错误保持一致
        },
      ],
      output: `<template><div><a-button @click='fn'>click me</a-button><c-button @onClick='fn'>click me</c-button></div></template>`,
      options: [{ elementNameIncludes: ["/a-/i"] }],
    },
  ],
});
