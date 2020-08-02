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
    parser: '@typescript-eslint/parser'
  },
});
// 运行测试用例
ruleTester.run("no-spui", rule, {
  // 正确的测试用例
  valid: [
    
  ],
  // 错误的测试用例
  invalid: [
    {
      code: `
      <script lang='ts'>
      export default class InfoDataComponent extends Vue{
        @Prop({ default: 0 })
        pageType!: number
        initdata = this.pageType+1
      }
      </script>
      `,
      errors: [
        {
          message:
            'Do not init data key named "initdata" with props or computer'
        },
      ],
    },
  ],
});
