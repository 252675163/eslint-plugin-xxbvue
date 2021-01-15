/**
 * @author zdw
 */
"use strict";
var rule = require("../../../lib/rules/require-attribute"), // 引入rule
    RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester({
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
        ecmaVersion: 7, // 默认支持语法为es5
    },
});
const options = [[{
    elementNameReg: '/^(van-list)|^(VanList)/',
    attribute: [
        { name: "loading", mustBeAttr: true },
        { name: "finished", mustBeAttr: true, defaultValue: "finished" },
        { name: "error-text", mustBeAttr: true, defaultText: "请求失败，点击重新加载" },
        { name: "error", mustBeDirective: true, defaultValue: "error" },
    ]
}]]
// 运行测试用例
ruleTester.run("require-attribute", rule, {
    // 正确的测试用例
    valid: [
        {
            code: "<template><van-switch size='2vw'>click me</van-switch></template>",
            options,
        },
    ],
    // 错误的测试用例
    invalid: [
        {
            code:
                `<template>
          <van-list
          test="1"
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
            options
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
            options
        },
        {
            code:
                `<template>
          <van-list
          test="1"
            v-model:error="error"
            :finished="finished"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            >
          </van-list>
        </template>`,
            errors: [
                {
                    message: '记得添加属性loading', // 与rule抛出的错误保持一致
                },
            ],
            options
        }, {
            code:
                `<template>
          <van-list></van-list>
        </template>`,
            errors: [
                {
                    message: '记得添加属性loading', 
                },
                {
                    message: '记得添加属性:finished="finished"',
                },
                {
                    message: '记得添加属性error-text="请求失败，点击重新加载"',
                },
                {
                    message: '记得添加属性v-model:error="error"',
                },
            ],
            options
        },

        
    ],
});
