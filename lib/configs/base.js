module.exports = {
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    parser: '@typescript-eslint/parser'
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ["xxbvue"],
  rules: {
    "xxbvue/antdvue-name-in-template-casing": "error",
    "xxbvue/no-spui": "error",
    "xxbvue/event-name-without-on-in-template": [
      2,
      { elementNameIncludes: ["/a-/i"] },
    ],
    "xxbvue/width-unit-transform": [
      2,
      { checks: [{ elementReg: '/van-/', attribute: 'size' }] },
    ],
    "xxbvue/require-attribute": [
      2, [{
        elementNameReg: '/^(bd-list)|^(BdList)/',
        attribute: [
          { name: "loading", mustBeAttr: true, defaultValue: "loading" },
          { name: "finished", mustBeAttr: true, defaultValue: "finished" },
          { name: "error-text", mustBeAttr: true, defaultText: "请求失败，点击重新加载" },
          { name: "error", mustBeDirective: true, defaultValue: "error" },
        ]
      }]
    ]
  },
};
