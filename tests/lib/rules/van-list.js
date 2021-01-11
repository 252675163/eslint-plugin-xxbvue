/**
 * @author zdw
 */
"use strict";
var rule = require("../../../lib/rules/van-list"), // 引入rule
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 7, // 默认支持语法为es5
  },
});
const options = [{checks:[{elementReg:'/van-/',attribute:'size'}],viewportWidth:375}]
// 运行测试用例
ruleTester.run("van-list", rule, {
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
        `<template>
          <van-list
            v-model:error="error"
            :loading="loading"
            :finished="finished"
            
            @load="onLoad"
            >
          </van-list>
        </template>`,
      errors: [
        {
          message: '记得添加属性error-text="请求失败，点击重新加载"', // 与rule抛出的错误保持一致
        },
      ],
    },
    {
        code:
        `<template>
           <van-list
             :loading="loading"
             :finished="finished"
             error-text="请求失败，点击重新加载"
             finished-text="没有更多了"
             @load="onLoad"
             >
           </van-list>
         </template>`,
        errors: [
          {
            message: '记得添加属性v-model:error="error"', // 与rule抛出的错误保持一致
          },
        ],
      },
  ],
});
