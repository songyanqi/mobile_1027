/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * create by dony in 2017-03-28
	 */

	var NoFindGoods = __webpack_require__(1116);

	new Vue({
	    el: "#noFindGoods",
	    data: {
	        eventHub: new Vue()
	    },
	    components: {
	        NoFindGoods: NoFindGoods
	    }
	});

/***/ },

/***/ 1116:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1117)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/goodsDetail/vue/nofind_goods.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1118)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3c72ec75/nofind_goods.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1117:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//     <div class = "noGoods">
	//         <div v-if = "!isapp" class = "top0 top_h_t top_show">
	//             <div class="top_container">
	//                 <div class="top_left">
	//                     <a class="top_back" href="javascript:history.back();" data-dav-tj="detail|back|back|1|back@detail">
	//                         <span class="home_arrow_back"></span>
	//                     </a>
	//                 </div>
	//                 <div class="title_container">
	//                 </div>
	//                 <div class="top_right">
	//                     <a href="/" class="top_home" data-dav-tj="detail|home|home|1|home@detail">
	//                         <span class="home_icon"></span>
	//                     </a>
	//                 </div>
	//             </div>
	//         </div>
	//         <!---->
	//         <div class = "no_good_icon"></div>
	//         <div class = "no_goods_text">商品不存在</div>
	//         <div class = "no_goods_btn">
	//             <a class = "common" href="#" @click="handleBack" style = "margin-right: 10px;">返回上一级</a>
	//             <a class = "common" href="/" style = "margin-left: 10px;">首页</a>
	//         </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	  data: function data() {
	    return {};
	  },

	  props: ["isapp"],
	  methods: {
	    getAppVersion: function getAppVersion() {
	      // 空格分所有
	      var u = navigator.userAgent;
	      var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) || u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i) || u.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
	      if (versionStr == null) {
	        return 0;
	      } else {
	        var v = versionStr[2].split(".").reduce(function (a, b) {
	          return +a * 10 + +b;
	        });
	      }
	      return +v;
	    },
	    callNative2: function callNative2(host, action, params, callback, minv, minCallback) {
	      var callback = callback || function () {};

	      if (this.getAppVersion() >= minv.split(".").reduce(function (a, b) {
	        return +a * 10 + +b;
	      })) {
	        var t = Date.now() + "_" + Math.round(Math.random() * 10000);
	        window["callback_" + t] = callback;

	        var str = "davdian:\/\/call." + host + ".com?action=" + encodeURIComponent(action) + "&params=" + encodeURIComponent(JSON.stringify(params)) + "&callback=" + encodeURIComponent("callback_" + t) + "&minv=" + encodeURIComponent(minv);
	        window.location.href = str;
	      } else {
	        if (minCallback) {
	          minCallback();
	        } else {
	          //              bravetime.newAlert("请升级您的APP")
	        }
	      }
	    },
	    handleBack: function handleBack() {
	      if (this.isapp) {
	        var callback = function callback() {};
	        this.callNative2("BrowserTouch", "goBackToRootPage", {}, callback, '3.9.0');
	      } else {
	        history.back();
	      }
	    }
	  }
	  // </script>

	};

/***/ },

/***/ 1118:
/***/ function(module, exports) {

	module.exports = "\n<div class = \"noGoods\">\n    <div v-if = \"!isapp\" class = \"top0 top_h_t top_show\">\n        <div class=\"top_container\">\n            <div class=\"top_left\">\n                <a class=\"top_back\" href=\"javascript:history.back();\" data-dav-tj=\"detail|back|back|1|back@detail\">\n                    <span class=\"home_arrow_back\"></span>\n                </a>\n            </div>\n            <div class=\"title_container\">\n            </div>\n            <div class=\"top_right\">\n                <a href=\"/\" class=\"top_home\" data-dav-tj=\"detail|home|home|1|home@detail\">\n                    <span class=\"home_icon\"></span>\n                </a>\n            </div>\n        </div>\n    </div>\n    <!---->\n    <div class = \"no_good_icon\"></div>\n    <div class = \"no_goods_text\">商品不存在</div>\n    <div class = \"no_goods_btn\">\n        <a class = \"common\" href=\"#\" @click=\"handleBack\" style = \"margin-right: 10px;\">返回上一级</a>\n        <a class = \"common\" href=\"/\" style = \"margin-left: 10px;\">首页</a>\n    </div>\n</div>\n";

/***/ }

/******/ });