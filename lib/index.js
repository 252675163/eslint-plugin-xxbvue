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
  "event-name-without-on-in-template": require("./rules/event-name-without-on-in-template"),
  "no-spui": require("./rules/no-spui"),
  "width-unit-transform": require("./rules/width-unit-transform"),
};

// import processors
module.exports.processors = {
  ".vue": vueeslintProcessor,
  // add your processors here
};
module.exports.configs = {
  base: require("./configs/base"),
};
