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

	__webpack_require__(1433);

/***/ },

/***/ 35:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 531:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(532)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/maybeYouLike.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(538)
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
	  var id = "_v-71517a04/maybeYouLike.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class = "mt_10" id = "comon">
	//         <div class="df_new_title_2" style="border-bottom: none">
	//             <span class="df_new_font">猜你喜欢</span>
	//         </div>
	//         <div class="logo_container"  v-show = "beforeFirstLoading">
	//             <div class="logo_left"></div>
	//             <div class="logo_right"></div>
	//         </div>
	//         <div style="clear: both;">
	//         </div>
	//         <category refer="guess_detail" :referer="referer"></category>
	//         <!--<category refer="guess_detail"-->
	//                   <!--:referer="referer"-->
	//                   <!--:list = "list"-->
	//                   <!--:loading = "beforeFirstLoading"></category>-->
	//
	//     </div>
	// </template>
	//
	// <script>
	var category = __webpack_require__(533);
	//      var category = require("../src/component/com-maybeyoulike.vue");
	exports.default = {
	    el: "#maybeYouLike",
	    data: function data() {
	        return {
	            loading: false,
	            no_more: false,
	            ajaxing: true,
	            beforeFirstLoading: false,
	            list: [],
	            referer: {}
	        };
	    },
	    components: {
	        category: category
	    },
	    created: function created() {
	        this.scroll();

	        var height = $("body").height() - 20;

	        if (height < $(window).height()) {
	            this.getData();
	        }
	    },
	    methods: {
	        scroll: function scroll() {
	            var scope = this;
	            $(window).scroll(function () {
	                //滚动条滚动事件
	                if (window.disabledGoodsLoading) {
	                    return false;
	                }
	                var offset = window.pageYOffset; //文档现在的位置加上窗口的高度
	                var offsetTop = document.body.scrollHeight; //整个页面的高度
	                if (offsetTop - offset - window.screen.availHeight < 100) {
	                    //如果滚动条到一定位置
	                    scope.getData();
	                }
	            });
	        },
	        getData: function getData() {
	            var scope = this;
	            if (!scope.no_more) {
	                if (scope.ajaxing) {
	                    scope.beforeFirstLoading = true; //显示加载动画
	                    scope.ajaxing = false;
	                    $.ajax({
	                        url: maybeYouLikeUrl,
	                        dataType: "json",
	                        success: function success(result) {
	                            scope.ajaxing = true;
	                            scope.beforeFirstLoading = false; //获取数据成功 加载动画隐藏
	                            scope.list = result.data;
	                            scope.referer = result.referer;
	                            scope.no_more = true; //判定值 改为false
	                        }, error: function error() {
	                            scope.ajaxing = true;
	                            scope.beforeFirstLoading = false;
	                            scope.no_more = true;
	                        }
	                    });
	                }
	            }
	        },
	        change: function change() {
	            this.$broadcast('changeData', this.list);
	        },
	        no_mores: function no_mores() {
	            this.$broadcast('no_mores', this.no_more);
	        }

	    },
	    watch: {
	        'list': 'change',
	        'no_more': 'no_mores'
	    }
	    // </script>

	};

/***/ },

/***/ 533:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(534)
	__vue_script__ = __webpack_require__(536)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/category.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(537)
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
	  var id = "_v-e0fc3198/category.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 534:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(535);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./category.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./category.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 535:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.good_list_2_row {\n    background: #f1f1f1;\n    padding: 10px 5px;\n  }\n\n  .font-weight {\n    font-weight: 500;\n  }\n  .goods4_price_bar em {\n    font-style: normal;\n    font-size: 12px;\n    display: inline-block;\n    margin-right: 2px;\n  }\n\n  .good_list_2_row .good_item {\n    padding: 0 5px;\n    margin-bottom: 10px;\n  }\n\n  .good_list_2_row .good_item .good_img_container img {\n    border: none;\n  }\n\n  .good_con {\n    display: block;\n    background-color: #FFF;\n    padding: 10px;\n    padding-top: 0;\n    overflow: hidden;\n  }\n\n  .good_con .fz_12 {\n    overflow: hidden;\n    height: 16px;\n    line-height: 16px;\n  }\n\n  .good_con .fz_12 .dav-color-price {\n    display: inline-block;\n  }\n\n  .good_con .nowPrice {\n    font-size: 16px;\n  }\n\n  .good_list_2_row .good_item .lable {\n    color: #FF4A7D;\n    font-size: 10px;\n    display: inline-block;\n    margin-left: 4px;\n    font-family: sans-serif;\n    background-color: #FFF;\n    float: right;\n    -webkit-box-sizing: border-box;\n    position: relative;\n    top: 7.89473%;\n    padding: 0 2px;\n    border: 1px solid #FF4A7D;\n    line-height: 15px;\n    border-radius: 4px;\n  }\n\n  .good_list_2_row .good_item .lable .border {\n    -webkit-transform: scale(0.5);\n    -ms-transform: scale(0.5);\n        transform: scale(0.5);\n    position: absolute;\n    border: 1px solid #FF4A7D;\n    top: -50%;\n    right: -50%;\n    bottom: -50%;\n    left: -50%;\n    border-radius: 7px;\n  }\n\n  .good_list_2_row .good_item .good_title {\n    margin-bottom: 4px;\n    -webkit-line-clamp: 2;\n    line-clamp: 2;\n    line-height: 19px;\n  }\n\n  .goods4_price_bar {\n    overflow: hidden;\n    height: 19px;\n    width: 200%;\n  }\n  .good_list_sell_out{\n    z-index: 0;\n  }\n.img_label{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n.img_container{\n  position: relative;\n}\n.vip_return{\n  line-height: 1;\n  font-size: 0;\n  color: #BF9D51;\n  padding-left: 4px;\n  position: relative;\n  display: inline-block;\n  -webkit-transform: scale(0.5);\n  -webkit-transform-origin: 0 60%;\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  -ms-transform-origin: 0 60%;\n      transform-origin: 0 60%;\n  vertical-align: middle;\n  margin-bottom: 4px;\n}\n.vip_return .vip_return_title{\n  font-size: 22px;\n}\n.vip_return .vip_return_f{\n  font-size: 18px;\n  padding: 0 2px 0 4px;\n}\n.vip_return .vip_return_price{\n  font-size: 24px;\n}\n @media screen and (max-width:374px){\n    .vip_return{\n      padding-left:0;\n      margin-bottom: 3px;\n    }\n    .vip_return .vip_return_title{\n      font-size: 20px;\n    }\n    .vip_return .vip_return_f{\n      font-size: 14px;\n      padding: 0 2px 0 4px;\n    }\n    .vip_return .vip_return_price{\n      font-size: 20px;\n    }\n }\n", ""]);

	// exports


/***/ },

/***/ 536:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="good_list_con">
	//         <div class="good_list_2_row">
	//             <!--单个商品模版template-->
	//             <a v-for="item in list" :data-id="item.goods_id" :href="a_href(item.goods_id)"
	//                      class="good_item">
	//                     <div class="good_img_container">
	//                         <div class="img_container">
	//                             <img :src="item.goods_img" style="display: inline;">
	//                             <span class="img_label" v-if="item.goods_label!=''" v-text="item.goods_label"></span>
	//                             <span class="img_label" v-if="item.goods_label==''&&item.ratio" v-text="'返现'+item.ratio+'倍'"></span>
	//                         </div>
	//                         <div v-if = "item.sale_status" class="good_list_sell_out ng-scope">
	//                             <span v-if = "item.sale_status == 'soldout'" class="ng-scope">售罄</span>
	//                             <span v-if = "item.sale_status == 'presale'" class="ng-scope">预售</span>
	//                             <span v-if = "item.sale_status == 'offline'" class="ng-scope">未上架</span>
	//                         </div>
	//                     </div>
	//
	//                     <div class="good_con">
	//                       <div class="good_title">{{item.goods_name}}</div>
	//                       <div class="goods4_price_bar">
	//                         <span class="dav-color-price font-weight"><em class="fz_14">¥</em><span class="nowPrice"><span>{{(item.shop_price+"").split(".")[0]}}</span><span class="fz_14" v-if="(item.shop_price+'').split('.').length == 2">.{{(item.shop_price+"").split(".")[1]}}</span></span></span>
	//                         <span class="vip_return" v-if = "(item.seller_income && item.seller_income != 0) || (item.comm_income && item.comm_income != 0)">
	//                           <span class="vip_return_title">会员返</span>
	//                           <span class="vip_return_f">¥</span>
	//                           <span class="vip_return_price">{{item.seller_income||item.comm_income}}</span>
	//                         </span>
	//                       </div>
	//                     </div>
	//                   </a>
	//             <!--不到50个商品展示这个template-->
	//             <div style="clear: both;"></div>
	//             <div v-show = "loading" class="no_more">
	//                 商品加载中 <img src="//pic.davdian.com/free/loading_03252.svg">
	//             </div>
	//             <div v-show = "no_more" class="no_more">
	//                 没有更多商品了
	//             </div>
	//         </div>
	//         <div class="good_list_2_row" ng-model="goods">
	//             <div style="clear:both"></div>
	//         </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },
	    props: ["list", "no_more", "loading", "refer", "referer"],
	    created: function created() {},
	    methods: {
	        a_href: function a_href(goods_id) {
	            var list = [],
	                str = "";
	            if (this.referer) {
	                for (var i in this.referer) {
	                    list.push(i + "=" + this.referer[i]);
	                }
	            }
	            if (list.length) {
	                str = "?" + list.join("&");
	            }
	            return "/" + goods_id + ".html" + str;
	        }
	    },
	    events: {
	        'changeData': function changeData(msg) {
	            this.list = msg;
	        },
	        'loadings': function loadings(msg) {
	            this.loading = msg;
	        },
	        'no_mores': function no_mores(msg) {
	            this.no_more = msg;
	        }
	    }
	    // </script>
	    // <style scope>
	    // .good_list_2_row {
	    //     background: #f1f1f1;
	    //     padding: 10px 5px;
	    //   }
	    //
	    //   .font-weight {
	    //     font-weight: 500;
	    //   }
	    //   .goods4_price_bar em {
	    //     font-style: normal;
	    //     font-size: 12px;
	    //     display: inline-block;
	    //     margin-right: 2px;
	    //   }
	    //
	    //   .good_list_2_row .good_item {
	    //     padding: 0 5px;
	    //     margin-bottom: 10px;
	    //   }
	    //
	    //   .good_list_2_row .good_item .good_img_container img {
	    //     border: none;
	    //   }
	    //
	    //   .good_con {
	    //     display: block;
	    //     background-color: #FFF;
	    //     padding: 10px;
	    //     padding-top: 0;
	    //     overflow: hidden;
	    //   }
	    //
	    //   .good_con .fz_12 {
	    //     overflow: hidden;
	    //     height: 16px;
	    //     line-height: 16px;
	    //   }
	    //
	    //   .good_con .fz_12 .dav-color-price {
	    //     display: inline-block;
	    //   }
	    //
	    //   .good_con .nowPrice {
	    //     font-size: 16px;
	    //   }
	    //
	    //   .good_list_2_row .good_item .lable {
	    //     color: #FF4A7D;
	    //     font-size: 10px;
	    //     display: inline-block;
	    //     margin-left: 4px;
	    //     font-family: sans-serif;
	    //     background-color: #FFF;
	    //     float: right;
	    //     -webkit-box-sizing: border-box;
	    //     position: relative;
	    //     top: 7.89473%;
	    //     padding: 0 2px;
	    //     border: 1px solid #FF4A7D;
	    //     line-height: 15px;
	    //     border-radius: 4px;
	    //   }
	    //
	    //   .good_list_2_row .good_item .lable .border {
	    //     -webkit-transform: scale(0.5);
	    //     transform: scale(0.5);
	    //     position: absolute;
	    //     border: 1px solid #FF4A7D;
	    //     top: -50%;
	    //     right: -50%;
	    //     bottom: -50%;
	    //     left: -50%;
	    //     border-radius: 7px;
	    //   }
	    //
	    //   .good_list_2_row .good_item .good_title {
	    //     margin-bottom: 4px;
	    //     -webkit-line-clamp: 2;
	    //     line-clamp: 2;
	    //     line-height: 19px;
	    //   }
	    //
	    //   .goods4_price_bar {
	    //     overflow: hidden;
	    //     height: 19px;
	    //     width: 200%;
	    //   }
	    //   .good_list_sell_out{
	    //     z-index: 0;
	    //   }
	    // .img_label{
	    //   font-weight: bold;
	    //   left: 0;
	    //   bottom:0;
	    //   position:absolute;
	    //   font-size: 10px;
	    //   opacity: 0.8;
	    //   background: linear-gradient(90deg,#ff5b5b,#fa1862);
	    //   background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);
	    //   color:#fff;
	    //   line-height: 16px;
	    //   padding:1px 8px 0 6px;
	    //   border-top-right-radius: 8px;
	    // }
	    // .img_label:after{
	    //   content: "";
	    //   width: 0;
	    //   height: 0;
	    //   border-width: 0 4px 10px 0;
	    //   border-style: solid;
	    //   border-color: transparent transparent #fa1862 transparent;
	    //   position: absolute;
	    //   margin-left: 8px;
	    //   bottom: 0;
	    // }
	    // .img_container{
	    //   position: relative;
	    // }
	    // .vip_return{
	    //   line-height: 1;
	    //   font-size: 0;
	    //   color: #BF9D51;
	    //   padding-left: 4px;
	    //   position: relative;
	    //   display: inline-block;
	    //   -webkit-transform: scale(0.5);
	    //   -webkit-transform-origin: 0 60%;
	    //   transform: scale(0.5);
	    //   transform-origin: 0 60%;
	    //   vertical-align: middle;
	    //   margin-bottom: 4px;
	    // }
	    // .vip_return .vip_return_title{
	    //   font-size: 22px;
	    // }
	    // .vip_return .vip_return_f{
	    //   font-size: 18px;
	    //   padding: 0 2px 0 4px;
	    // }
	    // .vip_return .vip_return_price{
	    //   font-size: 24px;
	    // }
	    //  @media screen and (max-width:374px){
	    //     .vip_return{
	    //       padding-left:0;
	    //       margin-bottom: 3px;
	    //     }
	    //     .vip_return .vip_return_title{
	    //       font-size: 20px;
	    //     }
	    //     .vip_return .vip_return_f{
	    //       font-size: 14px;
	    //       padding: 0 2px 0 4px;
	    //     }
	    //     .vip_return .vip_return_price{
	    //       font-size: 20px;
	    //     }
	    //  }
	    // </style>

	};

/***/ },

/***/ 537:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"good_list_con\">\n    <div class=\"good_list_2_row\">\n        <!--单个商品模版template-->\n        <a v-for=\"item in list\" :data-id=\"item.goods_id\" :href=\"a_href(item.goods_id)\"\n                 class=\"good_item\">\n                <div class=\"good_img_container\">\n                    <div class=\"img_container\">\n                        <img :src=\"item.goods_img\" style=\"display: inline;\">\n                        <span class=\"img_label\" v-if=\"item.goods_label!=''\" v-text=\"item.goods_label\"></span>\n                        <span class=\"img_label\" v-if=\"item.goods_label==''&&item.ratio\" v-text=\"'返现'+item.ratio+'倍'\"></span>\n                    </div>\n                    <div v-if = \"item.sale_status\" class=\"good_list_sell_out ng-scope\">\n                        <span v-if = \"item.sale_status == 'soldout'\" class=\"ng-scope\">售罄</span>\n                        <span v-if = \"item.sale_status == 'presale'\" class=\"ng-scope\">预售</span>\n                        <span v-if = \"item.sale_status == 'offline'\" class=\"ng-scope\">未上架</span>\n                    </div>\n                </div>\n\n                <div class=\"good_con\">\n                  <div class=\"good_title\">{{item.goods_name}}</div>\n                  <div class=\"goods4_price_bar\">\n                    <span class=\"dav-color-price font-weight\"><em class=\"fz_14\">¥</em><span class=\"nowPrice\"><span>{{(item.shop_price+\"\").split(\".\")[0]}}</span><span class=\"fz_14\" v-if=\"(item.shop_price+'').split('.').length == 2\">.{{(item.shop_price+\"\").split(\".\")[1]}}</span></span></span>\n                    <span class=\"vip_return\" v-if = \"(item.seller_income && item.seller_income != 0) || (item.comm_income && item.comm_income != 0)\">\n                      <span class=\"vip_return_title\">会员返</span>\n                      <span class=\"vip_return_f\">¥</span>\n                      <span class=\"vip_return_price\">{{item.seller_income||item.comm_income}}</span>\n                    </span>\n                  </div>\n                </div>\n              </a>\n        <!--不到50个商品展示这个template-->\n        <div style=\"clear: both;\"></div>\n        <div v-show = \"loading\" class=\"no_more\">\n            商品加载中 <img src=\"//pic.davdian.com/free/loading_03252.svg\">\n        </div>\n        <div v-show = \"no_more\" class=\"no_more\">\n            没有更多商品了\n        </div>\n    </div>\n    <div class=\"good_list_2_row\" ng-model=\"goods\">\n        <div style=\"clear:both\"></div>\n    </div>\n</div>\n";

/***/ },

/***/ 538:
/***/ function(module, exports) {

	module.exports = "\n<div class = \"mt_10\" id = \"comon\">\n    <div class=\"df_new_title_2\" style=\"border-bottom: none\">\n        <span class=\"df_new_font\">猜你喜欢</span>\n    </div>\n    <div class=\"logo_container\"  v-show = \"beforeFirstLoading\">\n        <div class=\"logo_left\"></div>\n        <div class=\"logo_right\"></div>\n    </div>\n    <div style=\"clear: both;\">\n    </div>\n    <category refer=\"guess_detail\" :referer=\"referer\"></category>\n    <!--<category refer=\"guess_detail\"-->\n              <!--:referer=\"referer\"-->\n              <!--:list = \"list\"-->\n              <!--:loading = \"beforeFirstLoading\"></category>-->\n\n</div>\n";

/***/ },

/***/ 1433:
/***/ function(module, exports, __webpack_require__) {

	// angular 加载底部数据
	//var app = angular.module("maybeYouLike", []);
	//app.directive('goods2row', function ($window, $sce) {
	//    var url = $sce.trustAsResourceUrl(window.baseFeUrl + "/module/goods3row.html");
	//    return {
	//        restrict: "EA",
	//        require: ['^ngModel'],
	//        replace: true,
	//        scope: false,
	//        templateUrl: url,
	//        link: function (scope, element) {
	//            var ajaxing = true;
	//            getGoods(scope,ajaxing);
	//            $("body").on("click", ".has_mores", function () {
	//                getGoods(scope,ajaxing);
	//            })
	//        }
	//    }
	//});
	//
	//function getGoods(scope,ajaxing) {
	//    if (ajaxing) {
	//        ajaxing = false;
	//        $.ajax({
	//            url: maybeYouLikeUrl,
	//            dataType: "json",
	//            success: function (result) {
	//                if (result.code) {
	//                    ajaxing = true;
	//                    bravetime.info("网络异常,猜你喜欢数据获取失败");
	//                } else {
	//                    scope.goods = result.data;
	//                    scope.has_more = result.has_more;
	//                    scope.$apply();
	//                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 100, failure_limit: 100})
	//                }
	//            }, error: function () {
	//                ajaxing = true;
	//            }
	//        });
	//    }
	//}


	// angular 加载数据
	var app = angular.module("maybeYouLike", []);
	app.directive('goods2row', function ($window, $sce) {
	    var url = $sce.trustAsResourceUrl(window.baseFeUrl + "/module/goods3row.html");
	    return {
	        restrict: "EA",
	        require: ['^ngModel'],
	        replace: true,
	        scope: false,
	        templateUrl: url,
	        link: function (scope, element) {
	            var ajaxing = true;
	            var page = 1;

	            getData();

	            $(".good_list_2_row").on("click",".has_mores",function(){
	                var imgs = '<img src="//pic.davdian.com/free/loading_03252.svg">';
	                $(this).html(imgs);
	                getData();
	            });

	            function getData() {
	                if (ajaxing) {
	                    ajaxing = false;
	                    $.ajax({
	                        url: maybeYouLikeUrl,
	                        dataType: "json",
	                        data: {
	                            page: page,
	                            pagesize:4,
	                            id:goodsid
	                        },
	                        success: function (result) {
	                            if (result.code) {
	                                ajaxing = false;
	                                bravetime.info(result.msg);
	                            } else {
	                                ajaxing = true;
	                                page++;

	                                scope.goods = (scope.goods || []).concat(result.data);

	                                scope.has_more = result.has_more;
	                                scope.$apply();
	                                $("img[data-original]").lazyload({
	                                    effect: "fadeIn",
	                                    threshold: 100,
	                                    failure_limit: 100
	                                });
	                                if (!scope.has_more) {
	                                    ajaxing = false;
	                                }
	                            }
	                            $(".has_mores").html("点击加载更多");
	                        }, error: function () {
	                            ajaxing = false;
	                            bravetime.info("网络异常,数据获取失败");
	                        }
	                    });
	                }
	            }

	        }
	    }
	});
	//引入 猜你喜欢 模块
	var maybeYouLike = __webpack_require__(531);


	new Vue({
	    el:'body',
	    data:function(){
	        return{
	            msg:'hello vue',
	        }
	    },
	    components:{
	        maybeYouLike:maybeYouLike,
	    }
	});





/***/ }

/******/ });