require("../../stylesheet/base.css");
require("../../stylesheet/model.css");

// require('../../javascript/tongji');
require("../../javascript/units.js");
require("../../javascript/base.js");
require("../../javascript/model.js");

var Vue = require('Vue');
var VueLazyload = require('vue-lazyload/vue-lazyload');
Vue.use(VueLazyload, {
  try: 3,
  preload:2
});

var config = require('../page/overtime.vue');
new Vue(config);
