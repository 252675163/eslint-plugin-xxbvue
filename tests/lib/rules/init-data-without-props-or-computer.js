/**
 * @fileoverview setTimeout 第二个参数禁止是数字
 * @author OBKoro1
 */
"use strict";
var rule = require("../../../lib/rules/init-data-without-props-or-computer"), // 引入rule
  RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  "parserOptions": {
    ecmaVersion: 2020, sourceType: 'module',
    "parser": "@typescript-eslint/parser"
  }
});
// 运行测试用例
ruleTester.run("init-data-without-props-or-computer", rule, {
  // 正确的测试用例
  valid: [

  ],
  // 错误的测试用例
  invalid: [
    {
      filename: "a.vue",
      code: `
      <script lang="ts">
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
