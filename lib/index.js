/**
 * @fileoverview custom eslint rules for vue project
 * @author xxbvue
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var vueeslintProcessor = require("./processor");
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = {
  "antdvue-name-in-template-casing": require("./rules/antdvue-name-in-template-casing"),
};

// import processors
module.exports.processors = {
  ".vue": vueeslintProcessor,
  // add your processors here
};
module.exports.configs = {
  base: require("./configs/base"),
};
