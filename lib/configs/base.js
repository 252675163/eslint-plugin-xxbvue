module.exports = {
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ["xxbvue"],
  rules: {
    "xxbvue/antdvue-name-in-template-casing": "error",
    "xxbvue/event-name-without-on-in-template": [
      2,
      { elementNameIncludes: ["/a-/i"] },
    ],
  },
};
