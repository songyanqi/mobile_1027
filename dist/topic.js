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

	'use strict';

	var _common = __webpack_require__(1122);

	var _common2 = _interopRequireDefault(_common);

	var _Vue = __webpack_require__(459);

	var _Vue2 = _interopRequireDefault(_Vue);

	var _vueLazyload = __webpack_require__(1119);

	var _vueLazyload2 = _interopRequireDefault(_vueLazyload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 第三方模块
	_vueLazyload2.default.init(); // 基础模块


	new _Vue2.default({
	  components: {
	    app: __webpack_require__(1550)
	  },
	  template: '<app/>',
	  el: ".app"
	});

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

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _md = __webpack_require__(92);

	var _md2 = _interopRequireDefault(_md);

	var _utils = __webpack_require__(94);

	var _utils2 = _interopRequireDefault(_utils);

	var _$ = __webpack_require__(95);

	var _$2 = _interopRequireDefault(_$);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var common = __webpack_require__(96); // var crypto = require('crypto');


	var config = {
	  feed: '/api/m/index/index?t=' + Date.now(),
	  // feed:  '../data/index/index.json',
	  like: '/api/m/index/guess?t=' + Date.now(),
	  sign: '/api/m/index/sign?t=' + Date.now(),
	  advert: '/api/m/index/advert?t=' + Date.now(),
	  cart: '/api/m/index/cart?t=' + Date.now(),
	  statistics: '/appapi',
	  arrList: [location.href.split("/").slice(0, 3).join("/"), document.cookie.split(';').filter(function (x) {
	    return x.indexOf("dvdsid") > -1;
	  })[0] ? document.cookie.split(';').filter(function (x) {
	    return x.indexOf("dvdsid") > -1;
	  })[0].split("=")[1] : 0, navigator.userAgent, 'json', new Date().getTime(), 'web_h5_*_*', '750_1334', JSON.parse(sessionStorage.getItem('dataVersion')) && JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion] ? JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion] : 0]
	};

	var strSign = function strSign(str, obj) {
	  var strObj = sortObj(str, obj);
	  var str = '';
	  for (var i in strObj) {
	    str += i + '=' + encodeURIComponent(strObj[i]) + '&';
	  }
	  return str;
	};

	var sortObj = function sortObj(dataVersion, obj) {
	  obj = obj || {};
	  for (var i = 0, d; d = ["rp", 'rl', 'logDp', 'dp'][i++];) {
	    var tmp_value = _utils2.default.utils.getQuery(d);
	    if (tmp_value) {
	      obj[d] = tmp_value.replace(/[ +]/g, "");
	    }
	  }

	  var string = '';
	  var strObj = {};
	  var t = null;
	  var tValue = null;
	  var arrKey = ['shop_url', 'sess_key', 'device_token', 'format', 'ts', 'osv', 'wh', 'data_version'];
	  // 测试
	  // let arrValue = ['http://haba.davdian.com/', 'b63b64c250150b505ab0e8219325ef80adb73835', "", 'json', new Date().getTime(), 'web_h5_*_*', '750_1334', (JSON.parse(sessionStorage.getItem('dataVersion')) && JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion])?JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]:0]
	  // 线上
	  var osv = "web_h5_*_*";
	  if (window.Units && Units.isApp() && Units.isIOS()) {
	    osv = "web_ios_*_*";
	  }
	  if (window.Units && Units.isApp() && Units.isAndroid()) {
	    osv = "web_android_*_*";
	  }
	  // let arrValue = [location.host, document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, "", 'json', new Date().getTime(), osv, '750_1334', (JSON.parse(sessionStorage.getItem('dataVersion')) && JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion])?JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]:0]
	  var arrValue = [location.href.split("/").slice(0, 3).join("/"), document.cookie.split(';').filter(function (x) {
	    return x.indexOf("dvdsid") > -1;
	  })[0] ? document.cookie.split(';').filter(function (x) {
	    return x.indexOf("dvdsid") > -1;
	  })[0].split("=")[1] : 0, "", 'json', new Date().getTime(), osv, '750_1334', 0];
	  if (obj) {
	    for (var p in obj) {
	      arrKey.push(p);
	      arrValue.push(obj[p]);
	    }
	  }
	  for (var _i = 0; _i < arrKey.length; _i++) {
	    for (var j = 0; j < arrKey.length - _i - 1; j++) {
	      if (arrKey[j] > arrKey[j + 1]) {
	        t = arrKey[j + 1];
	        arrKey[j + 1] = arrKey[j];
	        arrKey[j] = t;

	        tValue = arrValue[j + 1];
	        arrValue[j + 1] = arrValue[j];
	        arrValue[j] = tValue;
	      }
	    }
	  }
	  for (var _i2 = 0; _i2 < arrKey.length; _i2++) {
	    strObj[arrKey[_i2]] = arrValue[_i2];
	  }
	  for (var _p in strObj) {
	    string += _p + '=' + strObj[_p];
	  }
	  // var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()
	  var sign = (0, _md2.default)(string).toString().toUpperCase();
	  strObj.sign = sign;
	  return strObj;
	};

	var dataVersion = function dataVersion(str) {
	  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (obj.data_version) {
	    if (sessionStorage.getItem('dataVersion')) {
	      var o = JSON.parse(sessionStorage.getItem('dataVersion'));
	      o[str] = obj.data_version;
	      sessionStorage.setItem('dataVersion', JSON.stringify(o));
	    } else {
	      var o = {};
	      o[str] = obj.data_version;
	      sessionStorage.setItem('dataVersion', JSON.stringify(o));
	    }
	  }
	};

	var api = function api(url) {
	  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var path = '';
	  if (sessionStorage.history) {
	    path = JSON.parse(sessionStorage.history)[JSON.parse(sessionStorage.history).length - 2] && JSON.parse(sessionStorage.history)[JSON.parse(sessionStorage.history).length - 2].path;
	  }
	  if (!url && typeof url != 'string') {
	    console.warn('请求地址为空或格式不正确');
	    return;
	  }
	  var method = obj.method || 'GET';
	  var urlF = url;

	  var dataObj = {
	    credentials: "include",
	    mode: 'cors',
	    headers: {
	      "Content-Type": "application/x-www-form-urlencoded"
	    },
	    method: method.toUpperCase()
	  };
	  if (obj.data) {
	    dataObj.body = obj.data;
	  }
	  if (sessionStorage.getItem('dvdSessionKeyFlag') && path == window.tj_path) {
	    if (localStorage.getItem(url)) {
	      return Promise.resolve(JSON.parse(localStorage.getItem(url)));
	    } else {
	      return fetch(urlF, dataObj).then(function (response) {
	        return response.json();
	      }).then(function (data) {
	        if (data.code === 0) {
	          localStorage.setItem(url, JSON.stringify(data));
	          return Promise.resolve(data);
	        } else {
	          return Promise.reject(data);
	        }
	      });
	    }
	  } else {
	    return fetch(urlF, dataObj).then(function (response) {
	      return response.json();
	    }).then(function (data) {
	      if (data.code === 0) {
	        sessionStorage.setItem('dvdSessionKeyFlag', true);
	        localStorage.setItem(url, JSON.stringify(data));
	        return Promise.resolve(data);
	      } else {
	        return Promise.reject(data);
	      }
	    });
	  }
	};

	var apiNoSave = function apiNoSave(url) {
	  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (!url && typeof url != 'string') {
	    console.warn('请求地址为空或格式不正确');
	    return;
	  }
	  var method = obj.method || 'GET';
	  var urlF = url;

	  var dataObj = {
	    credentials: "include",
	    mode: 'cors',
	    headers: {
	      "Content-Type": "application/x-www-form-urlencoded"
	    },
	    method: method.toUpperCase()
	  };
	  if (obj.data) {
	    dataObj.body = obj.data;
	  }
	  return fetch(urlF, dataObj).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    if (data.code === 0) {
	      return Promise.resolve(data);
	    } else {
	      return Promise.reject(data);
	    }
	  });
	};
	var sStorageCover = function sStorageCover(str, obj) {
	  if (!obj) {
	    return '参数错误';
	  } else {
	    sessionStorage.setItem(str, JSON.stringify(obj));
	  }
	};

	var sStorageSet = function sStorageSet(str, obj) {
	  if (!obj) {
	    return '参数错误';
	  } else {
	    if (sessionStorage.getItem(str)) {
	      var o = JSON.parse(sessionStorage.getItem(str));
	      for (var p in obj) {
	        o[p] = obj[p];
	      }
	      sessionStorage.setItem(str, JSON.stringify(o));
	    } else {
	      sessionStorage.setItem(str, JSON.stringify(obj));
	    }
	  }
	};

	var sStorageGet = function sStorageGet(str, key) {
	  if (key) {
	    if (sessionStorage.getItem(str)) {
	      if (JSON.parse(sessionStorage.getItem(str))[key] || JSON.parse(sessionStorage.getItem(str))[key] == 0) {
	        return JSON.parse(sessionStorage.getItem(str))[key];
	      } else {
	        // console.warn('不存在'+key+'在'+ str+'的sessionStorage中')
	        return false;
	      }
	    } else {
	      // console.warn('不存在'+str+'sessionStorage')
	      return false;
	    }
	  } else {
	    if (sessionStorage.getItem(str)) {
	      return JSON.parse(sessionStorage.getItem(str));
	    } else {
	      // console.warn('不存在'+str+'sessionStorage')
	      return false;
	    }
	  }
	};

	/*
	function Storage () {
	  var tracking = (function () {
	    var listeners = {}
	    var listening = false

	    function listen () {
	      if (window.addEventListener) {
	        window.addEventListener('storage', change, false)
	      } else if (window.attachEvent) {
	        window.attachEvent('onstorage', change)
	      } else {
	        window.onstorage = change
	      }
	    }

	    function change (e) {
	      if (!e) {
	        e = window.event
	      }
	      var all = listeners[e.key]
	      if (all) {
	        all.forEach(fire)
	      }

	      function fire (listener) {
	        listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri)
	      }
	    }

	    function on (key, fn) {
	      if (listeners[key]) {
	        listeners[key].push(fn)
	      } else {
	        listeners[key] = [fn]
	      }
	      if (listening === false) {
	        listen()
	      }
	    }

	    function off (key, fn) {
	      var ns = listeners[key]
	      if (ns.length > 1) {
	        ns.splice(ns.indexOf(fn), 1)
	      } else {
	        listeners[key] = []
	      }
	    }

	    return {
	      on: on,
	      off: off
	    }
	  })()

	  var ls = 'localStorage' in window && window.localStorage

	  function accessor (key, value) {
	    if (arguments.length === 1) {
	      return get(key)
	    }
	    return set(key, value)
	  }

	  function get (key) {
	    return JSON.parse(ls.getItem(key))
	  }

	  function set (key, value) {
	    try {
	      ls.setItem(key, JSON.stringify(value))
	      return true
	    } catch (e) {
	      return false
	    }
	  }

	  function remove (key) {
	    return ls.removeItem(key)
	  }

	  function clear () {
	    return ls.clear()
	  }

	  accessor.set = set
	  accessor.get = get
	  accessor.remove = remove
	  accessor.clear = clear
	  accessor.on = tracking.on
	  accessor.off = tracking.off

	  return accessor
	}
	let isJson = (obj = {}) => {
	  var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
	  return isjson;
	}



	let getFromDate = (obj = {}) => {
	  var str = ''
	  for (let i in obj){
	    if (isJson(obj[i])){
	      str += '&' + i + '={' + getFromDate(obj[i]) +'}'
	    } else {
	      str += '&' + i + '=' + obj[i] || "null"
	    }
	  }
	  return str
	}
	*/
	var statistics = function statistics() {
	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  var host = config.statistics;
	  var feedList = JSON.parse(localStorage.getItem('feedList'));
	  !feedList && (feedList = {});
	  !feedList.sess_key && (feedList.sess_key = common.default.getDvdsid());
	  // getDvdsid
	  var listData = {
	    "ip": "", //ip
	    "nxtime": "", //ng时间
	    "timestamp": new Date().getTime(), //日志时间
	    "production": obj.production || '0', //业务线 数据字典稍后定
	    "log_source": '1', //日志来源 数据字典稍后定
	    "user_agent": navigator.userAgent, //浏览器UA
	    "market": "", //来源市场
	    "uid": parseInt(feedList.sess_key.substring(feedList.sess_key.length - 8, feedList.sess_key.length - 1), 10).toString(), //用户id
	    "session": feedList.sess_key.substring(0, feedList.sess_key.length - 8), //session id
	    "status": feedList.visitor_status, //卖家状态 (0：游客 1:买家 3:卖家)
	    "device": "", //设备类型
	    "device_id": "", //设备号
	    "sys_version": "", //设备版本号
	    "resolution": window.screen.width + '*' + window.screen.height, //分辨率
	    "location": "", //当前位置
	    "app_version": feedList.data_version || "", //APP版本号
	    "action": '1', //操作action 数据字典稍后定，click，view，
	    "action_type": "1", //操作类型（元素）
	    "object_id": obj.objectId || "", //操作对象id（url）
	    "production_data": { //详细信息
	      "action": obj.action || '1', //1：点击
	      "action_type": obj.action_type || "1", //1：模板
	      "object_id": obj.objectId || "", //模板id
	      "period": obj.period || "", //停留时长 毫秒
	      "page": obj.page || "", //1：首页 2：详情页 3购物车 4搜索空   猜你喜欢位置
	      "menu_id": obj.menu_id || "", //输出menu_id
	      "goods_id": obj.goods_id || "", //详情页输出goods_id
	      "feed": {
	        "itemPosition": obj.itemPosition || "", //整个feed item的位置，透传服务端下发的position
	        "tplId": obj.tplId || "", //模板Id
	        "type": obj.type || "", //title or body
	        "dataPosition": obj.dataPosition || "", //当前点击的内容在body中的位置，透传服务端下发的position，title无此字段
	        "cmdContent": obj.cmdContent || "", //动作：点击，来自feed中的command->content
	        "imgUrl": obj.imgUrl || "", //当前点击imgUrl，可以为空
	        "cmdLog": obj.cmdLog || ""
	      }
	    }
	  };
	  try {
	    _$2.default.ajax({
	      url: host,
	      type: "post",
	      data: JSON.stringify(listData),
	      success: function success(result) {
	        if (result == "success_1") {
	          callback && callback();
	        }
	      }, error: function error() {}
	    });
	  } catch (e) {
	    console.error(e);
	  }
	};

	/**
	 * 点击统计
	 * @param item
	 * @param scope
	 * @param type
	 */
	var clickAnalysis = function clickAnalysis(item, scope, type) {
	  var href = void 0,
	      imgUrl = "",
	      $a = void 0,
	      position = 0,
	      done = false;
	  var target = item.target;
	  var $target = (0, _$2.default)(target);

	  // 是A标签直接获取链接
	  if (target.tagName == "A") {
	    $a = $target;
	  } else {
	    $a = $target.parents("a");
	  }
	  if ($a.length) {
	    href = $a.get(0).href || $a.get(0).href2;
	    position = $a.attr("position") || "";
	  }

	  // 找img
	  var $img = $a.find("img");
	  if ($img.length) {
	    imgUrl = $img.attr("src");
	  }

	  // 找log
	  var cmdLog = "";
	  var curItem = scope.data.body.dataList.filter(function (x) {
	    return x.position == position;
	  });
	  if (curItem.length) {
	    cmdLog = curItem[0].command.log;
	  }

	  if (href) {
	    var tplId = scope.data[type].tplId || "";

	    var objStatistics = {
	      "objectId": tplId,
	      "itemPosition": scope.data.position || "",
	      "tplId": tplId,
	      "type": type,
	      "dataPosition": position.toString(),
	      "cmdContent": href,
	      "imgUrl": imgUrl,
	      "cmdLog": cmdLog
	    };
	    layout.statistics(objStatistics, function () {
	      if (!done) {
	        done = true;
	        bravetime.goto(href);
	      }
	    });

	    setTimeout(function () {
	      if (!done) {
	        done = true;
	        bravetime.goto(href);
	      }
	    }, 200);
	  }
	  event.preventDefault();
	};

	var styleObject = function styleObject(data) {
	  if (data && data.body && data.body.bgColor) {
	    var bgColor = data.body.bgColor;
	    return {
	      backgroundColor: "#" + bgColor.slice(2, 8)
	    };
	  } else {
	    return {
	      backgroundColor: "#f0f0f0"
	    };
	  }
	};
	var styleObjectDvk = function styleObjectDvk(data) {
	  if (data && data.body && data.body.bgColor) {
	    var bgColor = data.body.bgColor;
	    return {
	      backgroundColor: "#" + bgColor.slice(2, 8)
	    };
	  } else {
	    return {
	      backgroundColor: "#ffffff"
	    };
	  }
	};

	var sort = function sort(data) {
	  for (var i = 0; i < data.body.dataList.length; i++) {
	    for (var j = 0; j < data.body.dataList.length - 1; j++) {
	      if (parseInt(data.body.dataList[j].position) > parseInt(data.body.dataList[j + 1].position)) {
	        var temp = data.body.dataList[j];
	        data.body.dataList[j] = data.body.dataList[j + 1];
	        data.body.dataList[j + 1] = temp;
	      }
	    }
	  }
	};

	var layout = {
	  api: api,
	  apiNoSave: apiNoSave,
	  sortObj: sortObj,
	  config: config,
	  statistics: statistics,
	  dataVersion: dataVersion,
	  strSign: strSign,
	  styleObject: styleObject,
	  styleObjectDvk: styleObjectDvk,
	  sort: sort,
	  clickAnalysis: clickAnalysis,
	  sStorageCover: sStorageCover,
	  sStorageSet: sStorageSet,
	  sStorageGet: sStorageGet
	};

	exports.default = layout;

/***/ },

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(93));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var T = [];

		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());

		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }

		            // Shortcuts
		            var H = this._hash.words;

		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];

		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];

		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );

		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];

		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));


		return CryptoJS.MD5;

	}));

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory();
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define([], factory);
		}
		else {
			// Global (browser)
			root.CryptoJS = factory();
		}
	}(this, function () {

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined) {
		    /*
		     * Local polyfil of Object.create
		     */
		    var create = Object.create || (function () {
		        function F() {};

		        return function (obj) {
		            var subtype;

		            F.prototype = obj;

		            subtype = new F();

		            F.prototype = null;

		            return subtype;
		        };
		    }())

		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};

		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};

		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {


		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);

		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }

		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }

		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;

		                // Reference supertype
		                subtype.$super = this;

		                return subtype;
		            },

		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);

		                return instance;
		            },

		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },

		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }

		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },

		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());

		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },

		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },

		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;

		            // Clamp excess bits
		            this.clamp();

		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;

		            // Chainable
		            return this;
		        },

		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;

		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);

		            return clone;
		        },

		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];

		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;

		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });

		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);

		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }

		            return new WordArray.init(words, nBytes);
		        }
		    });

		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};

		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }

		            return hexChars.join('');
		        },

		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }

		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };

		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }

		            return latin1Chars.join('');
		        },

		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }

		            return new WordArray.init(words, latin1StrLength);
		        }
		    };

		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },

		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };

		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },

		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }

		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },

		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;

		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }

		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;

		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }

		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }

		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },

		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();

		            return clone;
		        },

		        _minBufferSize: 0
		    });

		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),

		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-hasher logic
		            this._doReset();
		        },

		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);

		            // Update the hash
		            this._process();

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }

		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();

		            return hash;
		        },

		        blockSize: 512/32,

		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },

		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });

		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};

		    return C;
		}(Math));


		return CryptoJS;

	}));

/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getbackData = exports.savebackData = exports.strSign = exports.getUserState = exports.isInisWechatOrApp = exports.getQuery = undefined;

	var _md = __webpack_require__(92);

	var _md2 = _interopRequireDefault(_md);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var utils = {}; // var crypto = require('crypto')

	var u = navigator.userAgent;
	utils.getQuery = function (name) {
	    var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.match(reg);
	    if (r != null) return decodeURIComponent(r[2]);
	    return null;
	};
	var getQuery = exports.getQuery = function getQuery(name) {
	    var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.match(reg);
	    if (r != null) return decodeURIComponent(r[2]);
	    return null;
	};
	utils.isInisWechatOrApp = function (name) {
	    if (utils.isApp() || utils.isWechat()) {
	        return true;
	    } else {
	        return false;
	    }
	};
	var isInisWechatOrApp = exports.isInisWechatOrApp = utils.isInisWechatOrApp;

	utils.isIOS = function () {
	    if (u.match(/ios/i)) {
	        return true;
	    }
	    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	};
	utils.isMobileIOS = function () {
	    return (/iPhone|iPad|iPod/i.test(u)
	    );
	};
	utils.getAppVersion = function () {
	    // 空格分所有
	    var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) || u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i) || u.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
	    if (versionStr == null) {
	        return 0;
	    } else {
	        var v = versionStr[2].split(".").reduce(function (a, b) {
	            return +a * 10 + +b;
	        });
	    }
	    return +v;
	};
	utils.isAndroid = function () {
	    if (u.match(/(android|linux)/i)) {
	        return true;
	    }
	    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	};
	utils.isApp = function () {
	    return !!u.match(/davdian|bravetime|vyohui/);
	};
	utils.isTel = function (t) {
	    var tel = $.trim(t);
	    var reg = /^1\d{10}$/;
	    return reg.test(tel);
	};
	utils.isQQ = function () {
	    var ua = window.navigator.userAgent.toLowerCase();
	    if (ua.match(/qq\//i) == "qq/") {
	        return true;
	    } else {
	        return false;
	    }
	};
	utils.isWechat = function () {
	    var ua = window.navigator.userAgent.toLowerCase();
	    if (ua.match(/MicroMessenger/i) == "micromessenger") {
	        return true;
	    } else {
	        return false;
	    }
	};
	utils.isZipcode = function (zipcode) {
	    var reg = /^[0-9]{6}$/; //只允许为6位数字

	    return reg.test(zipcode);
	};
	utils.trim = function (text) {
	    if (typeof text == "string") {
	        return text.replace(/^\s*|\s*$/g, "");
	    } else {
	        return text;
	    }
	};
	utils.isIdcard = function (idCard) {
	    idCard = utils.trim(idCard); //去掉字符串头尾空格
	    if (idCard.length == 15) {
	        return utils.isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证
	    } else if (idCard.length == 18) {
	        var a_idCard = idCard.split(""); // 得到身份证数组   
	        if (utils.isValidityBrithBy18IdCard(idCard) && utils.isTrueValidateCodeBy18IdCard(a_idCard)) {
	            //进行18位身份证的基本验证和第18位的验证
	            return true;
	        } else {
	            return false;
	        }
	    } else {
	        return false;
	    }
	};

	var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子   
	var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X   
	/**  
	 * 判断身份证号码为18位时最后的验证位是否正确  
	 * @param a_idCard 身份证号码数组  
	 * @return  
	 */
	utils.isTrueValidateCodeBy18IdCard = function (a_idCard) {
	    var sum = 0;
	    if (a_idCard[17].toLowerCase() == 'x') {
	        a_idCard[17] = 10;
	    }
	    for (var i = 0; i < 17; i++) {
	        sum += Wi[i] * a_idCard[i]; // 加权求和   
	    }
	    valCodePosition = sum % 11; // 得到验证码所位置   
	    if (a_idCard[17] == ValideCode[valCodePosition]) {
	        return true;
	    } else {
	        return false;
	    }
	};

	/**  
	  * 验证18位数身份证号码中的生日是否是有效生日  
	  * @param idCard 18位书身份证字符串  
	  * @return  
	  */
	utils.isValidityBrithBy18IdCard = function (idCard18) {
	    var year = idCard18.substring(6, 10);
	    var month = idCard18.substring(10, 12);
	    var day = idCard18.substring(12, 14);
	    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day), 13, 0, 0);
	    // 这里用getFullYear()获取年份，避免千年虫问题   
	    if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
	        return false;
	    } else {
	        return true;
	    }
	};

	/**  
	 * 验证15位数身份证号码中的生日是否是有效生日  
	 * @param idCard15 15位书身份证字符串  
	 * @return  
	 */
	utils.isValidityBrithBy15IdCard = function (idCard15) {
	    var year = idCard15.substring(6, 8);
	    var month = idCard15.substring(8, 10);
	    var day = idCard15.substring(10, 12);
	    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
	    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
	    if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
	        return false;
	    } else {
	        return true;
	    }
	};
	/**  
	 * 页面返回需要刷新页面方法
	 * @return  
	 */
	utils.backReloadPage = function () {
	    try {
	        if (sessionStorage.getItem('history') && JSON.parse(sessionStorage.getItem('history')).length > 1) {
	            if (JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length - 1].path != JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length - 2].path) {
	                window.location.reload();
	            }
	        }
	    } catch (e) {
	        console.warn('backReloadPage报错:e->', e);
	    }
	};
	utils.goTo = function (href) {
	    location.href = href;
	};
	/**  
	 * cookies方法封装
	 * 
	 */
	utils.getCookie = function (name) {
	    var arr = void 0,
	        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	    if (arr = document.cookie.match(reg)) return decodeURIComponent(arr[2]);else return null;
	};
	utils.getUserState = function () {
	    if (utils.getCookie('dvdsid')) return utils.getCookie('dvdsid').substring(utils.getCookie('dvdsid').length - 1, utils.getCookie('dvdsid').length);else return null;
	};
	var getUserState = exports.getUserState = function getUserState() {
	    if (utils.getCookie('dvdsid')) return utils.getCookie('dvdsid').substring(utils.getCookie('dvdsid').length - 1, utils.getCookie('dvdsid').length);else return null;
	};
	utils.strSign = function (obj) {
	    var strObj = sortObj(obj);
	    var str = '';
	    for (var i in strObj) {
	        str += i + '=' + strObj[i] + '&';
	    }
	    return str;
	};
	var strSign = exports.strSign = function strSign(obj) {
	    var strObj = sortObj(obj);
	    var str = '';
	    for (var i in strObj) {
	        str += i + '=' + strObj[i] + '&';
	    }
	    return str;
	};

	var sortObj = function sortObj(obj) {
	    var string = '';
	    var strObj = {};
	    var t = null;
	    var tValue = null;
	    var arrKey = ['shop_url', 'sess_key', 'device_token', 'format', 'ts', 'osv', 'wh', 'data_version'];
	    var osv = "web_h5_*_*";
	    if (window.Units && Units.isApp() && Units.isIOS()) {
	        osv = "web_ios_*_*";
	    }
	    if (window.Units && Units.isApp() && Units.isAndroid()) {
	        osv = "web_android_*_*";
	    }
	    var arrValue = [location.href.split("/").slice(0, 3).join("/"), document.cookie.split(';').filter(function (x) {
	        return x.indexOf("dvdsid") > -1;
	    })[0] ? document.cookie.split(';').filter(function (x) {
	        return x.indexOf("dvdsid") > -1;
	    })[0].split("=")[1] : 0, "", 'json', new Date().getTime(), osv, '750_1334', 0];
	    if (obj) {
	        for (var _p in obj) {
	            arrKey.push(_p);
	            arrValue.push(obj[_p]);
	        }
	    }
	    for (var i = 0; i < arrKey.length; i++) {
	        for (var j = 0; j < arrKey.length - i - 1; j++) {
	            if (arrKey[j] > arrKey[j + 1]) {
	                t = arrKey[j + 1];
	                arrKey[j + 1] = arrKey[j];
	                arrKey[j] = t;

	                tValue = arrValue[j + 1];
	                arrValue[j + 1] = arrValue[j];
	                arrValue[j] = tValue;
	            }
	        }
	    }
	    for (var _i = 0; _i < arrKey.length; _i++) {
	        strObj[arrKey[_i]] = arrValue[_i];
	    }
	    for (var _p2 in strObj) {
	        string += _p2 + '=' + strObj[_p2];
	    }
	    // var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()
	    var sign = (0, _md2.default)(string).toString().toUpperCase();
	    strObj.sign = sign;
	    return strObj;
	};
	// let sort = function(data){
	//   for(let i = 0 ; i < data.body.dataList.length; i++){
	//     for(let j = 0 ; j < data.body.dataList.length - 1; j++){
	//       if(parseInt(data.body.dataList[j].position) > parseInt(data.body.dataList[j + 1].position)){
	//         let temp = data.body.dataList[j];
	//         data.body.dataList[j] = data.body.dataList[j+1];
	//         data.body.dataList[j + 1] = temp;
	//       }
	//     }
	//   }
	// }
	var savebackData = exports.savebackData = function savebackData(obj) {
	    if (obj['_data']) {
	        localStorage.setItem('backData', JSON.stringify(obj['_data']));
	    } else {
	        localStorage.setItem('backData', JSON.stringify(obj));
	    }
	};

	var getbackData = exports.getbackData = function getbackData(obj, top) {
	    try {
	        if (sessionStorage.getItem('history') && JSON.parse(sessionStorage.getItem('history')).length > 1 && JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length - 1] != 'other' && JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length - 2] == 'other') {
	            if (localStorage.getItem('backData') && JSON.parse(localStorage.getItem('backData'))) {
	                obj['_data'] = JSON.parse(localStorage.getItem('backData'));
	                for (p in JSON.parse(localStorage.getItem('backData'))) {
	                    obj[p] = JSON.parse(localStorage.getItem('backData'))[p];
	                }
	                window.scroll(0, JSON.parse(localStorage.getItem('backData'))[top]);
	                localStorage.removeItem('backData');
	                return true;
	            } else {
	                return false;
	            }
	        } else {
	            return false;
	        }
	    } catch (e) {
	        console.warn('getbackData:' + e);
	        return false;
	    }
	};

	exports.default = {
	    utils: utils
	};

/***/ },

/***/ 95:
/***/ function(module, exports) {

	module.exports = $;

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _md = __webpack_require__(92);

	var _md2 = _interopRequireDefault(_md);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var strSign = function strSign(str, flag) {
	    var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var strObj = sortObj(str, flag, obj); //字符串 传入当前的信息名称
	    var str = ''; //重新获取编译后的字符串
	    for (var i in strObj) {
	        //变成键值对的形式
	        str += i + '=' + strObj[i] + '&';
	    }
	    return strObj;
	}; // var crypto = require('crypto')


	var sortObj = function sortObj(dataVersion, flag) {
	    var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    //传入当前的信息名称 如feed
	    var string = '';
	    var strObj = {};
	    var t = null;
	    var tValue = null;
	    var arrKey = ['shop_url', 'sess_key', 'device_token', 'format', 'ts', 'osv', 'wh', 'data_version']; //需要上传的参数

	    /**
	     * 获取当前的版本号信息,如果没有取0
	     */
	    var osv = "web_h5_*_*";
	    if (window.Units && Units.isApp() && Units.isIOS()) {
	        osv = "web_ios_*_*";
	    }
	    if (window.Units && Units.isApp() && Units.isAndroid()) {
	        osv = "web_android_*_*";
	    }
	    var arrValue = [];
	    if (flag && !window.isPrivateMode) {
	        arrValue = [location.host, document.cookie.split(';').filter(function (x) {
	            return x.indexOf("dvdsid") > -1;
	        })[0] ? document.cookie.split(';').filter(function (x) {
	            return x.indexOf("dvdsid") > -1;
	        })[0].split("=")[1] : 0, "", 'json', new Date().getTime(), osv, '750_1334', 0];
	    } else {
	        // log('this is isPrivateMode or flag is false')
	        arrValue = [location.host, document.cookie.split(';').filter(function (x) {
	            return x.indexOf("dvdsid") > -1;
	        })[0] ? document.cookie.split(';').filter(function (x) {
	            return x.indexOf("dvdsid") > -1;
	        })[0].split("=")[1] : 0, "", 'json', new Date().getTime(), osv, '750_1334', 0];
	    }

	    for (var item in obj) {
	        arrKey.push(item.toString());
	        arrValue.push(obj[item]);
	    }

	    for (var i = 0; i < arrKey.length; i++) {
	        for (var j = 0; j < arrKey.length - i - 1; j++) {
	            if (arrKey[j] > arrKey[j + 1]) {
	                t = arrKey[j + 1];
	                arrKey[j + 1] = arrKey[j];
	                arrKey[j] = t;

	                tValue = arrValue[j + 1];
	                arrValue[j + 1] = arrValue[j];
	                arrValue[j] = tValue;
	            }
	        }
	    }
	    for (var _i = 0; _i < arrKey.length; _i++) {
	        strObj[arrKey[_i]] = arrValue[_i];
	    }
	    for (var p in strObj) {
	        string += p + '=' + strObj[p];
	    }
	    var sign = md5(string).toUpperCase();
	    strObj.sign = sign;
	    return strObj;
	};

	// let md5 = (str="") => crypto.createHash('md5').update(str, 'utf8').digest('hex')
	var md5 = function md5() {
	    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    return (0, _md2.default)(str).toString().toUpperCase();
	};

	var dataVersion = function dataVersion(str) {
	    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    // 信息名称 以及该信息下的所有需要上传的信息
	    if (obj.data_version && !window.isPrivateMode) {
	        //如果数据版本号不为0
	        if (sessionStorage.getItem('dataVersion')) {
	            //如果缓存中有版本号
	            var o = JSON.parse(sessionStorage.getItem('dataVersion'));
	            o[str] = obj.data_version;
	            sessionStorage.setItem('dataVersion', JSON.stringify(o)); //改变当前的所需要信息的版本号 其余的版本号不变
	        } else {
	            var o = {};
	            o[str] = obj.data_version;
	            sessionStorage.setItem('dataVersion', JSON.stringify(o));
	        }
	    }
	};

	var getDataWithSign = function getDataWithSign(opt) {
	    log("get Data WithSign, opt is");
	    log(opt);

	    opt.updata = opt.updata || opt.data || {};

	    if (window.isPrivateMode) {
	        log('您现在在用隐身模式访问接口，请切换到常规模式');
	    }
	    var flag = opt.flag || 0;
	    var dataurl = opt.url + "?t=" + Date.now();
	    if (!opt.url) {
	        console.warn('缺少必要url参数');
	        return;
	    }
	    var keyName = opt.keyName || md5LocalKey(opt.url, opt.updata);
	    var success1 = opt.success;
	    var data = "";
	    var error1 = opt.error;
	    var obj = opt.updata;

	    obj = obj || {};
	    for (var i = 0, d; d = ["rp", 'rl', 'logDp', 'dp'][i++];) {
	        var tmp_value = window.Units && Units.getQuery(d);
	        if (tmp_value) {
	            obj[d] = tmp_value;
	        }
	    }

	    var updatas = strSign(keyName, flag, obj);
	    log('ajax－>', dataurl);

	    $.ajax({
	        type: "POST",
	        url: dataurl, //数据地址
	        data: updatas, //获得了所有信息 店铺地址 版本号 等 flag来确定是否传入版本号
	        dataType: 'json',
	        success: function success(result) {
	            // data.data = false;
	            if (!window.isPrivateMode) {
	                //如果不是隐身模式，能在本地存储
	                //如果版本号相同，取本地的数据，下拉的时候每次的版本号都不一样 不走这一步
	                // if (sessionStorage.getItem('dataVersion') && JSON.parse(sessionStorage.getItem('dataVersion'))[keyName] && (result.data_version === JSON.parse(sessionStorage.getItem('dataVersion'))[keyName])) {
	                //     if (flag) {//如果万一 下拉数据的版本号一样 不取本地的数据 下拉false 不是下拉 true
	                //         data = JSON.parse(localStorage.getItem(keyName))
	                //     }else{
	                //         data = result
	                //     }
	                // } else {//如果版本号不一样
	                data = result; //取最新的数据
	                if (flag) {
	                    //不是下拉的时候 在本地存储
	                    localStorage.setItem(keyName, JSON.stringify(result));
	                }
	                // localStorage.setItem(keyName, JSON.stringify(result))
	                // }
	            } else {
	                data = result;
	            }
	            // dataVersion(keyName, result);//在缓存中放入最新的该链接取得数据的版本号
	            success1(data);
	            log("getDataWithSign " + dataurl + " success :");
	            log(data);
	        },
	        error: function error(e) {
	            error1(e);
	            log("getDataWithSign " + dataurl + " err :");
	            log(e);
	        }
	    });
	};

	var postStatisticsData = function postStatisticsData(opt, productionData, callback) {
	    var baseStatisticsData = {
	        "ip": "", //ip
	        "nxtime": "", //ng时间
	        "timestamp": Date.now(), //日志时间
	        "production": '1', //业务线 数据字典稍后定
	        "log_source": '1', //日志来源 数据字典稍后定
	        "user_agent": navigator.userAgent, //浏览器UA
	        "market": "", //来源市场
	        "uid": getUid(), //用户id
	        "session": getSession(), //session id
	        "status": getVisitorStatus(), //卖家状态 (0：游客 1:买家 3:卖家)
	        "device": "", //设备类型
	        "device_id": "", //设备号
	        "sys_version": "", //设备版本号
	        "resolution": window.screen.width + '*' + window.screen.height, //分辨率
	        "location": "", //当前位置
	        "app_version": "", //APP版本号
	        "action": '1', //操作action 数据字典稍后定，click，view，
	        "action_type": "1", //操作类型（元素）
	        "object_id": "", //操作对象id（url）
	        "production_data": {}
	    };
	    for (var i in opt) {
	        baseStatisticsData[i] = opt[i];
	    }
	    baseStatisticsData['production_data'] = productionData;
	    $.ajax({
	        url: '/appapi',
	        type: "post",
	        data: JSON.stringify(baseStatisticsData),
	        success: function success(result) {
	            if (result == "success_1") {
	                callback && callback();
	            }
	        }, error: function error() {}
	    });
	};

	var getDvdsid = function getDvdsid() {
	    var result = "",
	        list = document.cookie.split(";").filter(function (x) {
	        return x.indexOf("dvdsid") > -1;
	    });
	    if (list.length) {
	        result = list[0].split("=")[1];
	    }
	    return result;
	};

	var getSession = function getSession() {
	    var dvdsid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDvdsid();
	    return dvdsid ? dvdsid.substr(0, 32) : dvdsid;
	};

	var getUid = function getUid() {
	    var dvdsid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDvdsid();
	    return dvdsid ? Number('0x' + dvdsid.substr(32, 7)) + "" : dvdsid;
	};

	var getVisitorStatus = function getVisitorStatus() {
	    var dvdsid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDvdsid();
	    return ["0", "1", "3"][dvdsid ? dvdsid.substr(39, 1) : 1];
	};

	var baseJumpUrl = function baseJumpUrl() {
	    return {
	        courseHomePage: "/course.html",
	        courseIntroducePage: function courseIntroducePage(id) {
	            return "/course-" + id + ".html";
	        },
	        coursePage: function coursePage(id) {
	            return "/course_room-" + id + ".html";
	        }
	    };
	};
	var md5LocalKey = function md5LocalKey(url) {
	    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var str = ''; //获取请求接口和业务参数的字符串
	    //排除翻页游标导致的key值不一样
	    var strObj = JSON.stringify(obj);
	    var objStr = JSON.parse(strObj);

	    if (objStr["pageIndex"]) {
	        objStr["pageIndex"] = 0;
	    }
	    for (var i in objStr) {
	        str += i + '=' + objStr[i] + '&';
	    }
	    str = str + url;
	    str = md5(str);
	    log(str);
	    return str;
	};

	var log = function log() {
	    var href = location.href,
	        dev = href.indexOf("bravetime.net") > -1,
	        prod = href.indexOf("davdian.com") > -1;

	    for (var _len = arguments.length, obj = Array(_len), _key = 0; _key < _len; _key++) {
	        obj[_key] = arguments[_key];
	    }

	    if (dev) {
	        console.log(obj);
	    } else if (prod) {
	        if (window.logInfo) {
	            window.logInfo.push(obj);
	        } else {
	            window.logInfo = [obj];
	        }
	    }
	};

	var initShare = function initShare() {
	    var share_source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    window.tlShareCallback = function () {
	        postStatisticsData({ action_type: "0", production: "5" }, { share_source: share_source + "", source_url: location.href, share_type: "1" });
	    };
	    window.sendShareCallback = function () {
	        postStatisticsData({ action_type: "0", production: "5" }, { share_source: share_source + "", source_url: location.href, share_type: "2" });
	    };
	    window.QQShareCallback = function () {
	        postStatisticsData({ action_type: "0", production: "5" }, { share_source: share_source + "", source_url: location.href, share_type: "3" });
	    };
	    window.qZoneShareCallbackCancel = function () {
	        postStatisticsData({ action_type: "0", production: "5" }, { share_source: share_source + "", source_url: location.href, share_type: "4" });
	    };
	};

	var common = {
	    getDataWithSign: getDataWithSign,
	    sortObj: sortObj,
	    strSign: strSign,
	    dataVersion: dataVersion,
	    baseJumpUrl: baseJumpUrl,
	    postStatisticsData: postStatisticsData,
	    md5: md5,
	    md5LocalKey: md5LocalKey,
	    getUid: getUid,
	    getDvdsid: getDvdsid,
	    log: log,
	    initShare: initShare
	};
	exports.default = common;

/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(151)
	__vue_script__ = __webpack_require__(153)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-maybeyoulike.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(157)
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
	  var id = "_v-71249cee/com-maybeyoulike.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(152);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-maybeyoulike.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-maybeyoulike.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.clearfix:after {\n  content: '';\n  display: block;\n clear: both;\n}\n.no_more {\n  margin-bottom: 20px;\n}\n.good_list_2_row {\n  background: #f1f1f1;\n  padding: 10px 5px 0 5px;\n}\n.good_list_2_row .good_img_container {\n  padding: 0;\n  position: relative;\n  background-color: #fff;\n  min-height:145px;\n}\n.font-weight {\n  font-weight: 500;\n}\n.goods4_price_bar em {\n  font-style: normal;\n  font-size: 12px;\n  display: inline-block;\n  margin-right: 2px;\n}\n\n.good_list_2_row .good_item {\n  padding: 0 5px;\n  margin-bottom: 10px;\n  float: left;\n  width: 50%;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n}\n\n.good_list_2_row .good_item .good_img_container img {\n  border: none;\n}\n\n.good_con {\n  display: block;\n  background-color: #FFF;\n  padding: 10px;\n  padding-top: 0;\n  overflow: hidden;\n}\n\n.good_con .fz_14 {\n  font-size: 14px;\n}\n\n.good_con .fz_12 {\n  overflow: hidden;\n  height: 16px;\n  line-height: 16px;\n}\n\n.good_con .fz_12 .dav-color-price {\n  display: inline-block;\n}\n\n.good_con .nowPrice {\n  font-size: 16px;\n}\n\n.good_list_2_row .good_item .lable {\n  color: #FF4A7D;\n  font-size: 10px;\n  display: inline-block;\n  margin-left: 4px;\n  font-family: sans-serif;\n  background-color: #FFF;\n  float: right;\n   -webkit-box-sizing: border-box;\n  position: relative;\n  top: 7.89473%;\n  padding: 0 2px;\n  border: 1px solid #FF4A7D;\n  line-height: 15px;\n  border-radius: 4px;\n}\n\n.good_list_2_row .good_item .lable .border {\n   -webkit-transform: scale(0.5);\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  position: absolute;\n  border: 1px solid #FF4A7D;\n  top: -50%;\n  right: -50%;\n  bottom: -50%;\n  left: -50%;\n  border-radius: 7px;\n}\n\n.good_list_2_row .good_item .good_title {\n  margin-bottom: 4px;\n   -webkit-line-clamp: 2;\n  line-clamp: 2;\n  line-height: 19px;\n  font-size: 12px;\n  color: #333;\n  text-overflow: ellipsis;\n  white-space: pre-line;\n  height: 36px;\n  -webkit-box-orient: vertical;\n  display: -webkit-box;\n  overflow: hidden;\n  padding-top: 6px;\n}\n.dav-color-price {\n  color: #FF4A7D;\n}\n.goods4_price_bar {\n  overflow: hidden;\n  height: 19px;\n  width: 200%;\n  font-size: 14px;\n}\n.good_list_sell_out{\n  font-size: 15px;\n  color: #fff;\n  background-color: rgba(0,0,0,.7);\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  line-height: 60px;\n  top: 50%;\n  position: absolute;\n  z-index: 2;\n  margin-top: -30px;\n  left: 50%;\n  margin-left: -30px;\n  text-align: center;\n}\n.img_label{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n.img_container{\n  position: relative;\n}\n.vip_return{\n  line-height: 1;\n  font-size: 0;\n  color: #BF9D51;\n  padding-left: 4px;\n  position: relative;\n  display: inline-block;\n   -webkit-transform: scale(0.5);\n   -webkit-transform-origin: 0 60%;\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  -ms-transform-origin: 0 60%;\n      transform-origin: 0 60%;\n  vertical-align: middle;\n  margin-bottom: 4px;\n}\n.vip_return .vip_return_title{\n  font-size: 22px;\n}\n.vip_return .vip_return_f{\n  font-size: 18px;\n  padding: 0 2px 0 4px;\n}\n.vip_return .vip_return_price{\n  font-size: 24px;\n}\n@media screen and (max-width:374px){\n  .vip_return{\n    padding-left:0;\n    margin-bottom: 3px;\n  }\n  .vip_return .vip_return_title{\n    font-size: 20px;\n  }\n  .vip_return .vip_return_f{\n    font-size: 14px;\n    padding: 0 2px 0 4px;\n  }\n  .vip_return .vip_return_price{\n    font-size: 20px;\n  }\n}\n\n.logo_left {\n  display                 : inline-block;\n  width                   : 162px;\n  height                  : 39px;\n  background-size         : 100%;\n  background-image        : url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUQAAABOCAYAAABYBm8UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEW5JREFUeNrsXQnUVVUVPjwmJ3AARE1FIUkDzTB1qdBg5RhOQKaioiYooCKRaAgSijizUFCQSEBzIIdKTU1NnMBQUzOcWiI5oeCApqYo0Pl659Xr7//fv787nn3e/dbaC4X97r3n3H33Pt8Z9m6xqPdgU4UOVr5tpbOVtVZetTLfyscmXLS00sdKdyutrbxv5UErbyhtz65WfuTe40buPS5373G6e6ca0cPK7lbaWllt5UknIWMzZ5ud3Ht8ycoDVtYobU8/J7tYKbm/e9bKXVZm+vCALaoc4hgrZ1rZoIHO21YmWZkSoMEdYeU8K10b/P0qK1dbOUVZe8a49jSFj6wMszJXmVOY6j6khlhoZZSVBQHa5uVWBrsAUI0lVs62coOitqxv5RYr+9bQWWTlSCsv++AQZ1k5vhndy6z8JCCDG2FlcjM6iMZ7K2nPSCuXCnV/YOVOBW3axMrTVrZqRm9/K3cHYpct3Gj+m83oneIChQY8amVPgd4yKztY+SCvB8Ww9SCBM6x8cEcHYnTfEDhD4DtWRitoT3fCGQLzXNT2HVcLnCFwmylP94SAaQJnCFxhZTsF7RktdIbA5m5knBtKbqTEGGgIhjeP0B2uoD0XkvrrWTnZ8zZt0QRNbgzrWPlVAHbZm3wvJ3reHky/jSd/c4wwCKbmELsQ+iEY3iVWtiX0tyT7KGvg2Q6J8LtRnr+nr5P6+ypnMC3JQA3s7HmbhjmfweKneTrEVXVkeKDKUeZBN/S4TWdE/B12Egz0uF2rI1Lsjkptc6qjjKwT9RXwLSMj/naI+f/F3cweem1Ew9NInedF/N3nnrannSmvREbFGI/fVZStJRiNzFFKlU+K8LsvPG4TBk2bRvxtGyun5uUQTUTD00adWaqsAadZaRXj99tb2SewPjnAymGBU2UNiBtsT49p25k6RG3UOSpV9hnYRD4igeuMC/BjnJsX5cqIKvsObIOKuwLeMQ//Uor5ey3UOcQIPCihvt/L8AsYvmN9o2PzeZ+IVNl3jE3oOmdrc4gaqHOIVBlIcn9kiKPEQxVQ5+sC7HesfO+R0LVwguxATQ7Rd+ocIlUG+lrpluD1Dgk0aPhMnRGotw6wzyckfL1ztDlEn6lziFQZGO/5iLOgzvUZqLd1wTpJIFnJbtocoo/UOVSqDOPoJdTFgfkVQt0TrGxcUOciUGcQVD+x8oiPo8RSgtfyiTqHGoFZ40ASh+uFutjicFqgfeYTdQ41UG/sgqoESPaAlWhpEgdspeqWRSNKCV/PF+ocagTu5oxDgnvc6PAa4vpwiK0L6lwE6ghg9sT+wpRT0V1LXD+TQwRJO0QfqHOoEZg1igvcn88YeSLVjYgoX1DnIlBX0JpgF8iverP7byZDE9hnJ20OMW/qHHIE7kT0K7IQz6/6/3OJ+4w24SJP6hxyoD7BBVNpP1SOZS61crvwdxh9nq7RIVao8yZFBE4UzFGmiQ3+/7dW/i787TZuNBUi8qLOIQdqJogikcz0Bn/3c+I+SIrbRqNDBHWeXUTgxIDzrsMISnJTI39/MXG/cQF/vHlQ53mB9+c2Qt0Zpjx3WA2mNg5G96me7GEc4uvktftmaHi9IkTg1xQZ3VAr7YnA0JQxSlf1kjxtkDZQAG2Zx9SZDdTPR/jW8gQTPJsKysyUTqq5EhmHeJXhV3qyMjz2CNSJjkZqgTTnYWOUpIIv3FRGaKNEjJ4xh/WUh9SZpcp4f0eYHGuKkNjDyJPU/qbGIISZ0kHC5v4+OEQY0fnkyCoLwxtvyoVppMCGUCz7b6bE6Po7I4hKSaqBVT1p4tX9yH7NC5iewUr6UR5SZ5YqD3Zt0XKkjwmazR3pY6Z0xqbVIMYhbuH+/KFHhodavewu9sPdn1pOZTAvvzmjwvzijcT1zlLSR19xVPMa8ndpMhiWKiNQz3Ej3hYK+nwHFzQlWCQYwTNTOjuZcgG4XB1iZan8MUeffTA8NgJjr9Sb7r9XKzC6Pu7lx6Uk1biAuD/q5G6qoJ/aVk2FMPOJaTEYliqvqRpo4DtZq6DPmWApmSNkp3RS2ajNOMTql4QVz6U5Gx6o8lfJCHy50YXxCVKSCv5q5T6hLkYrGvYlrqkKcj4wGDZQD6ty5GsU9HdnFywlWGLlDqEuM6XzXSs75ukQGzrHATkaHkuV10T4UPJGTyt7J0hJqsGULUXBn3UV9dsjERlMu5yoMo5YTldmmyONvMAVMzfITukknkA2zj7EJwx39CZJ6sxG4JMMvzUjNEpSjfvcSFE6uteW1TkKg5mZA1X+zPCLQXkDwXGoUPd9K7PI6zNTOhjkJFp+Ie7GbNT2fSFj6sxS5XsSMvYssWlKlCTqKPFMZf0XhcFgsW2/mPdlA/XxVt5V1rcnE4OaKw1fsRKB+gFCP9EpnSROqrB7guJQZ5Yqr1IYgdnR4cUR73GDlXcIB62tH6MwGOxnXSfi/ViqfJuRp2bzCaOEelgkmRLxHhNJB53UdEciDnGx4c4jxqHObAQ+WmEExih6SIqUpAJMXl+WkpP26eNlGEyHiGyCpco4XXOMwv48nKCoCC4rIt7nfuK9tSEofCYOsUJj0z4pwFLl24zOM6SIeNJFjCiUpBrTjLzYOUbnGms4swxmYATqzNoZnOFHCvuSWcS4KOa9JhG6WORJpIZzkskd+qVInVmq/InSCMxQktUxKEkFH5IjzLEK+zMKg2GoM0uVce1bFfYjtrn0FOr+wZQ3yscB+omZ0knke0/SIb5CfMwsdWYj8BFKIzBGJ52FutfHoCTVYBZXelv5msJ+ZRmMlDqzVPk9U948rhHMRujzE7gftsoxUzqJLK4knf4Lk9h/Spg6s1QZkeV3dWB0kxK6JwIZs0o9VmnfsgxGQp3ZQI05uE8V9h02QEuPyiE58YMJ3ZeZ0uluEqjhnEY+xEMMdyyuFnVmqfK7iiMw5ue2F+renwAlqQazjxGOpYvC/o3CYGpRZ5YqY/P1fUptk5k7nJjgfdkpndjV+dJwiG9ZGZ4QdWYj8AClEZgdeU1M+N446fIEoX+G0j5mGUxT1Hknkiovi/BN+IKtjPyUV1PJieOAmdJBDeddfHOIlWjIbK5sjDqzVJm9p0/AB9ZbqLs4pXYyFBxpqtop7WuWwTRGndn9gwOMjmQijYFJyHpJSiN7ZkpnvI8O0biowozWqqlzT3L4G2VU6hOYVdBJKT0DVj6lSTo113COYivV1BkfXA/it1gYeFRpX4G1SffE1kpOHBfnEbqoRf5lHx3iO24kwQDpfzAvM5X83aGKI3AXN2qRUpI0y7wyJztGGL01nPHhPkRSZ0xpdCcD9StGd3GpU428qFNzyYnjANMcTxP6kVecSyl3KApR/540PBSc+Rb5ET+m2OiY+bjJKT8LAtI/iHc1SHG/9ycZzOgIdtZPcf+wZT8vTvl5JhC6x5qINZxLGXQsthp8TOgzmayR2GCUYqNrR4yikRnlypSfB/dgUmedqbjvV5AMpiVpm5gGeUpx/2Cjc0ehrjQ5cRzg5Jm0+FZrE7GGcxYO8SOT3qkR7fWDTzPyI0czidFbHDCj0K5WDlbc/2Awd6Vw3edMzMl9D8DQzgkZPRMzCh1mIhznK2XUkFudh08SiMB/UWxwiGIjyKmBLIBFB2YVdazyD/9IksFI6bhmYINzd6Eum5w4DqYb+TwlyvYOYW9QyrCTMUpMKvPM4gAi8CBTnoeT0oWlGT4bs5KNfV97KH4PKxNmMJjCeV65bTILR+dm+FxYyZ5B6NM1nLN0iPDsAxO61mFGP6SUBPN6x2X8bEjSOZvQH6f8XSTFYJ7McCSfFhDgdhXq4ojeHRk/HwKO9Ax/F3a03irjxtxtynu6BsbskJeUG11fK92EuhhV729lPZNdeUqkFGNWYLFxeTsrf1P8To5xo/AOEX+PbV/a57TZ0eFyN+WQZc0dHOdD5UzpKjKmdG721SECOGv8PROtUHyULMg+gqH7qId9g4I2jTG6t+FUGEzURRZs9n5NuV12dcFaigGGL9WQNXAKDOV8H/aNMlfwacRORAQ+2OjHblZ6mfCA7OSdlbehwmBYoNLf9ADe4VkmTIgHIKWcHjCKAQ03/y0yXy+URBNgSyMDaAcYzFsZBHjfgD2HxwZqmyjn20NqxHmBoRgPBRKBMW94gAkXKH/QRnkbWAc3mHSgvuIUo/copgSiXKN5OkTpJDSW2vvX00tRDJy8GRpAO8BgJKeCcCz12gDa28o5xJCBLPpb+OwQAWxTOLUZHWyxWRHAC8Gq2NEmfIwOpB046fDHGv+OqnCHB9JWbGDeuA5ss9l9iSUPHvIKN1JseOpkoeP+dwbyMk43+azqZ43NAnIUKKyEZLwrGzCWG63sbnTW7YnkKAJy/Bv47hABHA5H8aJebkSIpfI9jd6Erw3R0o046gVnB9YWbPBFTRFsSenq6NeHgbTvUKOzJEQUrNvcd1jy7IFxJhInBp4N7EVgXq19HTnEnm50FQrg/Oab8qmMNwJ7V+NMfWFkLb/XyhTIAkzOQ8xb4az2eh49fyX5LqjwhsLfYAHp/uLVe429rOws1F1rysc5V3nmN7Ar4EtGnmQZNZwxlz+ncIj5ACvkWwp1P/B8ZIUM0NLED6CYmAZ5pjABb8HsiUWm9uM9bgsSakirVo5pyiGWCptIHUx6rBmetwWlHT5Lqe0FsgWcx/cJ/Ymet4fJ0IRz9/sXDjF74AzlToT+ZM/bg1XVmYR+P2J0XCBbMAtfqCf9guftwZHL5XGDdeEQ08V4Qhc1qDWceGCTa4wuzMA74Mz5UYT+hQratMaUKxxKgRyeuxQOMTtgpXVvQv88Je1aasrbpKTAcb72hTl4BWbf4QtuhKgBOF20itA/p3CI2YHJHIJEm5q2GjE1NOptD6bvwF68kwj9SYrahppDzDx8ZV9p4RBTBpb2jwzU6ADsF11I6GPvV+vCLLwAnOH6Ql0cmb1OWfvYcqhnFQ7Rr9Ehsn/fo7CNTC0NpJYaVJiFF2BKx04x5bk5TUAGrVsIfaQ861A4xPSA6MtU+7pQaTvvMlwph2JxJX8c5diLBF8Yrka31mD9P9UvC4eYPLCIIK0x8Y6VuYrbyjhz5II8sDAPNcxllpX3lLYThwEWEPr/qY9eOMTkMYrQneYisVbAmTOp2c4pzCM34ARUD0L/IuXtZXZttKuwusIhJgumrggq201V3l448ymEPspb7lWYSS5gghGmQ5Yoby87pYOtSKXCISYLZn/XbEeZteMqcpRbbMHJHkjg0Cel0ZXPYKZ0kAJtn3p2iC0T1t3ayo7ENS8NpB8xzzSL0MeHWSQVSQbS7/cg4ppI1LwgkP6ZSw46+qJD2wqV2wZmTMx2gs8FOh2J691r5cWA+pKJxJsbWWozplhVSLbZgmiPNKhvQNz/3ID6EsyFOc7XCQ7xY6Hyu4E5RKlDQvr4V4R6UkwIrC/RP3cIdbEI84lA73Xi/ssD6st/Gnk27iXENSXAWfqbA7PNaYTum3CIvxYq3xRYR/1SqIf6GZLzkUutvCzQQ/LXRwKkbz8T6s0zsjnHp4Uf/KtWFgXUj2Aj0kp+c4R60mA1KUC7RHC5ROrj4BAnCyLsbMMd1dKApwTRA6NiaelQUHBJKcdBJkzgLPb5gv5kVjuHC3R+bMrZnEMC0vq/IfgmHxZe73FTTvBaC9i7d0WgtjlGwAhxRHEhHCJy3PW28ucaHX9coB01vIYRoD+wRYTZnIql/qGm8TnHt025oM8TJlyMqTHKWOz6cyXZn0OaoNjILo4MzvcG2I+Vb7KpQciMCN/ksTXo8HxT3qe4NlC7XOVsb34T/44R+b9LBLdY1Htw9T/gaA+q3bV38wm3W3nIhA/kRRtgyoWskTFjgSCi1gIy8iK5Qxc3cnzOUfSVpj7QsD8fd4E1KrZyzq/Sny+6iL6sDvoS/YiV+U1ce+N+k3B8ODGE/bJYgUWmpVtN/aBmf/5LgAEAzQxLfXjSAv8AAAAASUVORK5CYII=);\n}\n\n@-webkit-keyframes plus {\n  0% {\n    -webkit-transform : rotate(0deg);\n    transform         : rotate(0deg);\n  }\n  50% {\n    -webkit-transform : rotate(360deg);\n    transform         : rotate(360deg);\n  }\n  100% {\n    -webkit-transform : rotate(360deg);\n    transform         : rotate(360deg);\n  }\n}\n\n@keyframes plus {\n  0% {\n    -webkit-transform : rotate(0deg);\n    transform         : rotate(0deg);\n  }\n  50% {\n    -webkit-transform : rotate(360deg);\n    transform         : rotate(360deg);\n  }\n  100% {\n    -webkit-transform : rotate(360deg);\n    transform         : rotate(360deg);\n  }\n}\n\n.logo_right {\n  display                 : inline-block;\n  width                   : 39px;\n  height                  : 39px;\n  -webkit-animation       : plus 2s linear 0s infinite;;\n  animation               : plus 2s linear 0s infinite;\n  background-size         : 100%;\n  background-image        : url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABYpJREFUeNrs3FtoHFUYB/D/OWd2dtJsbC7UNJgoXkobaW2ViA/xikh9UcSH1FIp0YivPohiwSJ4qxgU8UX0QUSsKMYLaFsFEUFaFKnaoibFaKApEXNpm9tuNrsz43f2EpKw6e4kM+fszuaDf3YzezY5+e05c4EzYWM9PXDnAV4L1D1kZx7l95rqZkoX5TZKMyVB+YXSR/lCT5cYImwUX9l343V7N9rY+cxWY9HrYGb2UVM9TzlYYHs7ZR/lPcoj6rvlII0oZiiCnueLL3odbkIb3IEV0BZXN+UNlZ1yiUeOth+cDrxr344WNrkUTo40h9Cm+0R22tZlIRVVK+XlEts+QblRVccMJJHCRoLblmEsOOIYTdr0KMPsEZG1jinD6/LYvkfNno1waLQdsTtxzNmBK9gF4mAFpiptE/UukqcZpj8iRaEMb5PH9u0q0Aw2htM0RT9wbsGVbCIzbRcXX/4msYnwfleKl/S861GCth0H0ntoqgrUUheX/1Je6M0a8LyUrQZtLz230UTHU7sAE1/ph5Q5nla0S8JVE55XtKJw1YC3GrSS4MKMt1q0kuHCiLcWNE9wYcJbK5pnuDDg+YG2KrhKxvMLbdVwlYjnJ9qa4CoJz2+0NcNVAl4QaL7AlTNeUGi+wZUjXpBovsKVE17QaL7DlQOeCrRA4HTiqUILDE4Hnkq0QOFU4qlGCxxOBZ4ONCVwQeLpQlMGFwSeTjSlcH7i6UZTDucHXjmgyTJ0XA7l8ZwPDTTut0eFXNA1V8obiS0+Ff917AYcdPZoQysEF6E8CAXLDCQe/mYYfpvfOdtgQ6SLL5MyEwlcuGrz1t6OB55ltms0OUrQZihHKX+uBLeX8hLlalWfWk0LMHQS6D8F1MZKaD+Wxsjuxi3OrfyF+rkEbEfZSOtFdn3eY8itJMjDPUM5pHq4O9QFcyNQ10YoVvH2VpShrjEVN5101HZZVPEE7abQR4178weHm3SgVWjtpjych3t63cNTPUlpk3C71i081U5KB9d1SlLBJQ//zRyhXrwVWNkS7sy6g6eSNzqcknDvrFt4Knk+97OE+5Ly9bpHSTVMeY7i5s8h76d8o6MnLl15OfSlpDgUziwwFtXQ1e8pnblLsIUjaip3Rrwvhygvu5NBgzHhJqMmrjO5uNYUrOhlviV4RDA+Mhuz+q25RAQuHeGCuxOI5a7dz+Vm5OFLXeQfXt4gKDSDujQ/7yIVN55qirFDRsQtOorE5XVi6x8j/duO/3XfyTu2o/nceHbxvobbqAwdU1Oice7i7KCBqYvMilquyNzxU6RSlgFzMhHZ/9rnsA2O3zrbCW9CCx7XiTZ5nsGMukJul397sTDbxcxlG5gtOB595VPsOj6A/1qbsmhuSOEKoUVrvP+13HEwXR9D2pB4fdrweCWhlRMerzS0csHjlYhWDni8UtF04/FKRtOJxysdTRceDwOaDjweFjTVeDxMaCrxeNjQVOHxMKKpwONhRQsaj4cZLUg8Hna0oPB4NaAFgcerBc1vPF5NaH7i8WpD8wuPVyOaH3i8WtHWiserGW0teLza0VaLx8sAzes6EFMV3s4TAxjf3ADuuivDydfMqAsulI+0KY/tJ1WNvMdf/BjX9A/j7JYW2u4uGXkLcJGIi8Qsw9BAZlmCyun5icf2R1VNW7mmp+utY9jx4xnEY9aSZRYLcMIALk4ICqFZSvdpg5Q3S2wrVw69r2qfN97SgNbBf9Hd+xlqZuaQrDGXwnEBJOIM8RmgZoMLV/2xQP5/32+LtBmi3IXS7vrypUTaxlRDDEnLhJlMFR5xmQV+epdR34PsPRf/LDqOyR7JVZCvIntbwaDqTjGCsQ0hFzQu2cctLPNiLBvNJe+Z+o5yPaU2dyCQkD+V2+nL/wIMAKAWeEo/H9NGAAAAAElFTkSuQmCC);\n}\n.logo_container {\n  margin-top : 20px;\n  width      : 100%;\n  text-align : center;\n  max-width  : 640px;\n}\n\n.good_list_2_row .column3Con {\n  padding-bottom: 0;\n}\n.good_list_2_row .column3 {\n  width: 33.3%;\n}\n.good_list_2_row .column3Cont {\n  height: auto;\n}\n.good_list_2_row .column3Price {\n  display: block;\n  width: 50%;\n  text-align: center;\n}\n.good_list_2_row .column3VipReturn {\n  display: block;\n  text-align: center;\n}\n", ""]);

	// exports


/***/ },

/***/ 153:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _native = __webpack_require__(154);

	var _native2 = _interopRequireDefault(_native);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    return {
	      isapp: false
	    };
	  },
	  props: ["list", "no_more", "loading", "refer", "referer", "errors", "column"],
	  created: function created() {},
	  mounted: function mounted() {
	    this.isapp = this.isApp();
	  },

	  methods: {
	    isApp: function isApp() {
	      var u = navigator.userAgent;

	      return !!u.match(/davdian|bravetime|vyohui/);
	    },

	    // 是否为mobile
	    isMobile: function isMobile() {
	      var ua = navigator.userAgent;
	      return !!ua.match(/Mobile/i);
	    },

	    // 跳转方式
	    handleJump: function handleJump(url) {
	      this.isapp = this.isApp();
	      if (this.isapp) {
	        _native2.default.Browser.open({
	          url: url
	        });
	      } else if (this.isMobile()) {
	        window.open(url, '_blank');
	      } else {
	        window.open(url, '_self');
	      }
	    },
	    handleHref: function handleHref(item) {
	      var newHref = "";
	      if (item.command && item.command.content) {
	        newHref = item.command.content;
	      } else if (item.url) {
	        newHref = item.url;
	      } else {
	        newHref = this.a_href(item.goods_id);
	      }

	      // window.location.href = newHref;
	      this.handleJump(newHref);
	    },

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
	    },
	    imgObject: function imgObject(imgSrc) {
	      return {
	        src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	        error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	        loading: '//pic.davdian.com/free/2017/08/04/davdianbg.jpg'
	      };
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
	  //   .clearfix:after {
	  //     content: '';
	  //     display: block;
	  //    clear: both;
	  //   }
	  //   .no_more {
	  //     margin-bottom: 20px;
	  //   }
	  //   .good_list_2_row {
	  //     background: #f1f1f1;
	  //     padding: 10px 5px 0 5px;
	  //   }
	  //   .good_list_2_row .good_img_container {
	  //     padding: 0;
	  //     position: relative;
	  //     background-color: #fff;
	  //     min-height:145px;
	  //   }
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
	  //     float: left;
	  //     width: 50%;
	  //     box-sizing: border-box;
	  //     -webkit-box-sizing: border-box;
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
	  //   .good_con .fz_14 {
	  //     font-size: 14px;
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
	  //      -webkit-box-sizing: border-box;
	  //     position: relative;
	  //     top: 7.89473%;
	  //     padding: 0 2px;
	  //     border: 1px solid #FF4A7D;
	  //     line-height: 15px;
	  //     border-radius: 4px;
	  //   }
	  //
	  //   .good_list_2_row .good_item .lable .border {
	  //      -webkit-transform: scale(0.5);
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
	  //      -webkit-line-clamp: 2;
	  //     line-clamp: 2;
	  //     line-height: 19px;
	  //     font-size: 12px;
	  //     color: #333;
	  //     text-overflow: ellipsis;
	  //     white-space: pre-line;
	  //     height: 36px;
	  //     -webkit-box-orient: vertical;
	  //     display: -webkit-box;
	  //     overflow: hidden;
	  //     padding-top: 6px;
	  //   }
	  //   .dav-color-price {
	  //     color: #FF4A7D;
	  //   }
	  //   .goods4_price_bar {
	  //     overflow: hidden;
	  //     height: 19px;
	  //     width: 200%;
	  //     font-size: 14px;
	  //   }
	  //   .good_list_sell_out{
	  //     font-size: 15px;
	  //     color: #fff;
	  //     background-color: rgba(0,0,0,.7);
	  //     width: 60px;
	  //     height: 60px;
	  //     border-radius: 30px;
	  //     line-height: 60px;
	  //     top: 50%;
	  //     position: absolute;
	  //     z-index: 2;
	  //     margin-top: -30px;
	  //     left: 50%;
	  //     margin-left: -30px;
	  //     text-align: center;
	  //   }
	  //   .img_label{
	  //     font-weight: bold;
	  //     left: 0;
	  //     bottom:0;
	  //     position:absolute;
	  //     font-size: 10px;
	  //     opacity: 0.8;
	  //     background: linear-gradient(90deg,#ff5b5b,#fa1862);
	  //     background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);
	  //     color:#fff;
	  //     line-height: 16px;
	  //     padding:1px 8px 0 6px;
	  //     border-top-right-radius: 8px;
	  //   }
	  //   .img_label:after{
	  //     content: "";
	  //     width: 0;
	  //     height: 0;
	  //     border-width: 0 4px 10px 0;
	  //     border-style: solid;
	  //     border-color: transparent transparent #fa1862 transparent;
	  //     position: absolute;
	  //     margin-left: 8px;
	  //     bottom: 0;
	  //   }
	  //   .img_container{
	  //     position: relative;
	  //   }
	  //   .vip_return{
	  //     line-height: 1;
	  //     font-size: 0;
	  //     color: #BF9D51;
	  //     padding-left: 4px;
	  //     position: relative;
	  //     display: inline-block;
	  //      -webkit-transform: scale(0.5);
	  //      -webkit-transform-origin: 0 60%;
	  //     transform: scale(0.5);
	  //     transform-origin: 0 60%;
	  //     vertical-align: middle;
	  //     margin-bottom: 4px;
	  //   }
	  //   .vip_return .vip_return_title{
	  //     font-size: 22px;
	  //   }
	  //   .vip_return .vip_return_f{
	  //     font-size: 18px;
	  //     padding: 0 2px 0 4px;
	  //   }
	  //   .vip_return .vip_return_price{
	  //     font-size: 24px;
	  //   }
	  //   @media screen and (max-width:374px){
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
	  //   }
	  //
	  //   .logo_left {
	  //     display                 : inline-block;
	  //     width                   : 162px;
	  //     height                  : 39px;
	  //     -webkit-background-size : 100%;
	  //     background-size         : 100%;
	  //     background-image        : url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUQAAABOCAYAAABYBm8UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEW5JREFUeNrsXQnUVVUVPjwmJ3AARE1FIUkDzTB1qdBg5RhOQKaioiYooCKRaAgSijizUFCQSEBzIIdKTU1NnMBQUzOcWiI5oeCApqYo0Pl659Xr7//fv787nn3e/dbaC4X97r3n3H33Pt8Z9m6xqPdgU4UOVr5tpbOVtVZetTLfyscmXLS00sdKdyutrbxv5UErbyhtz65WfuTe40buPS5373G6e6ca0cPK7lbaWllt5UknIWMzZ5ud3Ht8ycoDVtYobU8/J7tYKbm/e9bKXVZm+vCALaoc4hgrZ1rZoIHO21YmWZkSoMEdYeU8K10b/P0qK1dbOUVZe8a49jSFj6wMszJXmVOY6j6khlhoZZSVBQHa5uVWBrsAUI0lVs62coOitqxv5RYr+9bQWWTlSCsv++AQZ1k5vhndy6z8JCCDG2FlcjM6iMZ7K2nPSCuXCnV/YOVOBW3axMrTVrZqRm9/K3cHYpct3Gj+m83oneIChQY8amVPgd4yKztY+SCvB8Ww9SCBM6x8cEcHYnTfEDhD4DtWRitoT3fCGQLzXNT2HVcLnCFwmylP94SAaQJnCFxhZTsF7RktdIbA5m5knBtKbqTEGGgIhjeP0B2uoD0XkvrrWTnZ8zZt0QRNbgzrWPlVAHbZm3wvJ3reHky/jSd/c4wwCKbmELsQ+iEY3iVWtiX0tyT7KGvg2Q6J8LtRnr+nr5P6+ypnMC3JQA3s7HmbhjmfweKneTrEVXVkeKDKUeZBN/S4TWdE/B12Egz0uF2rI1Lsjkptc6qjjKwT9RXwLSMj/naI+f/F3cweem1Ew9NInedF/N3nnrannSmvREbFGI/fVZStJRiNzFFKlU+K8LsvPG4TBk2bRvxtGyun5uUQTUTD00adWaqsAadZaRXj99tb2SewPjnAymGBU2UNiBtsT49p25k6RG3UOSpV9hnYRD4igeuMC/BjnJsX5cqIKvsObIOKuwLeMQ//Uor5ey3UOcQIPCihvt/L8AsYvmN9o2PzeZ+IVNl3jE3oOmdrc4gaqHOIVBlIcn9kiKPEQxVQ5+sC7HesfO+R0LVwguxATQ7Rd+ocIlUG+lrpluD1Dgk0aPhMnRGotw6wzyckfL1ztDlEn6lziFQZGO/5iLOgzvUZqLd1wTpJIFnJbtocoo/UOVSqDOPoJdTFgfkVQt0TrGxcUOciUGcQVD+x8oiPo8RSgtfyiTqHGoFZ40ASh+uFutjicFqgfeYTdQ41UG/sgqoESPaAlWhpEgdspeqWRSNKCV/PF+ocagTu5oxDgnvc6PAa4vpwiK0L6lwE6ghg9sT+wpRT0V1LXD+TQwRJO0QfqHOoEZg1igvcn88YeSLVjYgoX1DnIlBX0JpgF8iverP7byZDE9hnJ20OMW/qHHIE7kT0K7IQz6/6/3OJ+4w24SJP6hxyoD7BBVNpP1SOZS61crvwdxh9nq7RIVao8yZFBE4UzFGmiQ3+/7dW/i787TZuNBUi8qLOIQdqJogikcz0Bn/3c+I+SIrbRqNDBHWeXUTgxIDzrsMISnJTI39/MXG/cQF/vHlQ53mB9+c2Qt0Zpjx3WA2mNg5G96me7GEc4uvktftmaHi9IkTg1xQZ3VAr7YnA0JQxSlf1kjxtkDZQAG2Zx9SZDdTPR/jW8gQTPJsKysyUTqq5EhmHeJXhV3qyMjz2CNSJjkZqgTTnYWOUpIIv3FRGaKNEjJ4xh/WUh9SZpcp4f0eYHGuKkNjDyJPU/qbGIISZ0kHC5v4+OEQY0fnkyCoLwxtvyoVppMCGUCz7b6bE6Po7I4hKSaqBVT1p4tX9yH7NC5iewUr6UR5SZ5YqD3Zt0XKkjwmazR3pY6Z0xqbVIMYhbuH+/KFHhodavewu9sPdn1pOZTAvvzmjwvzijcT1zlLSR19xVPMa8ndpMhiWKiNQz3Ej3hYK+nwHFzQlWCQYwTNTOjuZcgG4XB1iZan8MUeffTA8NgJjr9Sb7r9XKzC6Pu7lx6Uk1biAuD/q5G6qoJ/aVk2FMPOJaTEYliqvqRpo4DtZq6DPmWApmSNkp3RS2ajNOMTql4QVz6U5Gx6o8lfJCHy50YXxCVKSCv5q5T6hLkYrGvYlrqkKcj4wGDZQD6ty5GsU9HdnFywlWGLlDqEuM6XzXSs75ukQGzrHATkaHkuV10T4UPJGTyt7J0hJqsGULUXBn3UV9dsjERlMu5yoMo5YTldmmyONvMAVMzfITukknkA2zj7EJwx39CZJ6sxG4JMMvzUjNEpSjfvcSFE6uteW1TkKg5mZA1X+zPCLQXkDwXGoUPd9K7PI6zNTOhjkJFp+Ie7GbNT2fSFj6sxS5XsSMvYssWlKlCTqKPFMZf0XhcFgsW2/mPdlA/XxVt5V1rcnE4OaKw1fsRKB+gFCP9EpnSROqrB7guJQZ5Yqr1IYgdnR4cUR73GDlXcIB62tH6MwGOxnXSfi/ViqfJuRp2bzCaOEelgkmRLxHhNJB53UdEciDnGx4c4jxqHObAQ+WmEExih6SIqUpAJMXl+WkpP26eNlGEyHiGyCpco4XXOMwv48nKCoCC4rIt7nfuK9tSEofCYOsUJj0z4pwFLl24zOM6SIeNJFjCiUpBrTjLzYOUbnGms4swxmYATqzNoZnOFHCvuSWcS4KOa9JhG6WORJpIZzkskd+qVInVmq/InSCMxQktUxKEkFH5IjzLEK+zMKg2GoM0uVce1bFfYjtrn0FOr+wZQ3yscB+omZ0knke0/SIb5CfMwsdWYj8BFKIzBGJ52FutfHoCTVYBZXelv5msJ+ZRmMlDqzVPk9U948rhHMRujzE7gftsoxUzqJLK4knf4Lk9h/Spg6s1QZkeV3dWB0kxK6JwIZs0o9VmnfsgxGQp3ZQI05uE8V9h02QEuPyiE58YMJ3ZeZ0uluEqjhnEY+xEMMdyyuFnVmqfK7iiMw5ue2F+renwAlqQazjxGOpYvC/o3CYGpRZ5YqY/P1fUptk5k7nJjgfdkpndjV+dJwiG9ZGZ4QdWYj8AClEZgdeU1M+N446fIEoX+G0j5mGUxT1Hknkiovi/BN+IKtjPyUV1PJieOAmdJBDeddfHOIlWjIbK5sjDqzVJm9p0/AB9ZbqLs4pXYyFBxpqtop7WuWwTRGndn9gwOMjmQijYFJyHpJSiN7ZkpnvI8O0biowozWqqlzT3L4G2VU6hOYVdBJKT0DVj6lSTo113COYivV1BkfXA/it1gYeFRpX4G1SffE1kpOHBfnEbqoRf5lHx3iO24kwQDpfzAvM5X83aGKI3AXN2qRUpI0y7wyJztGGL01nPHhPkRSZ0xpdCcD9StGd3GpU428qFNzyYnjANMcTxP6kVecSyl3KApR/540PBSc+Rb5ET+m2OiY+bjJKT8LAtI/iHc1SHG/9ycZzOgIdtZPcf+wZT8vTvl5JhC6x5qINZxLGXQsthp8TOgzmayR2GCUYqNrR4yikRnlypSfB/dgUmedqbjvV5AMpiVpm5gGeUpx/2Cjc0ehrjQ5cRzg5Jm0+FZrE7GGcxYO8SOT3qkR7fWDTzPyI0czidFbHDCj0K5WDlbc/2Awd6Vw3edMzMl9D8DQzgkZPRMzCh1mIhznK2XUkFudh08SiMB/UWxwiGIjyKmBLIBFB2YVdazyD/9IksFI6bhmYINzd6Eum5w4DqYb+TwlyvYOYW9QyrCTMUpMKvPM4gAi8CBTnoeT0oWlGT4bs5KNfV97KH4PKxNmMJjCeV65bTILR+dm+FxYyZ5B6NM1nLN0iPDsAxO61mFGP6SUBPN6x2X8bEjSOZvQH6f8XSTFYJ7McCSfFhDgdhXq4ojeHRk/HwKO9Ax/F3a03irjxtxtynu6BsbskJeUG11fK92EuhhV729lPZNdeUqkFGNWYLFxeTsrf1P8To5xo/AOEX+PbV/a57TZ0eFyN+WQZc0dHOdD5UzpKjKmdG721SECOGv8PROtUHyULMg+gqH7qId9g4I2jTG6t+FUGEzURRZs9n5NuV12dcFaigGGL9WQNXAKDOV8H/aNMlfwacRORAQ+2OjHblZ6mfCA7OSdlbehwmBYoNLf9ADe4VkmTIgHIKWcHjCKAQ03/y0yXy+URBNgSyMDaAcYzFsZBHjfgD2HxwZqmyjn20NqxHmBoRgPBRKBMW94gAkXKH/QRnkbWAc3mHSgvuIUo/copgSiXKN5OkTpJDSW2vvX00tRDJy8GRpAO8BgJKeCcCz12gDa28o5xJCBLPpb+OwQAWxTOLUZHWyxWRHAC8Gq2NEmfIwOpB046fDHGv+OqnCHB9JWbGDeuA5ss9l9iSUPHvIKN1JseOpkoeP+dwbyMk43+azqZ43NAnIUKKyEZLwrGzCWG63sbnTW7YnkKAJy/Bv47hABHA5H8aJebkSIpfI9jd6Erw3R0o046gVnB9YWbPBFTRFsSenq6NeHgbTvUKOzJEQUrNvcd1jy7IFxJhInBp4N7EVgXq19HTnEnm50FQrg/Oab8qmMNwJ7V+NMfWFkLb/XyhTIAkzOQ8xb4az2eh49fyX5LqjwhsLfYAHp/uLVe429rOws1F1rysc5V3nmN7Ar4EtGnmQZNZwxlz+ncIj5ACvkWwp1P/B8ZIUM0NLED6CYmAZ5pjABb8HsiUWm9uM9bgsSakirVo5pyiGWCptIHUx6rBmetwWlHT5Lqe0FsgWcx/cJ/Ymet4fJ0IRz9/sXDjF74AzlToT+ZM/bg1XVmYR+P2J0XCBbMAtfqCf9guftwZHL5XGDdeEQ08V4Qhc1qDWceGCTa4wuzMA74Mz5UYT+hQratMaUKxxKgRyeuxQOMTtgpXVvQv88Je1aasrbpKTAcb72hTl4BWbf4QtuhKgBOF20itA/p3CI2YHJHIJEm5q2GjE1NOptD6bvwF68kwj9SYrahppDzDx8ZV9p4RBTBpb2jwzU6ADsF11I6GPvV+vCLLwAnOH6Ql0cmb1OWfvYcqhnFQ7Rr9Ehsn/fo7CNTC0NpJYaVJiFF2BKx04x5bk5TUAGrVsIfaQ861A4xPSA6MtU+7pQaTvvMlwph2JxJX8c5diLBF8Yrka31mD9P9UvC4eYPLCIIK0x8Y6VuYrbyjhz5II8sDAPNcxllpX3lLYThwEWEPr/qY9eOMTkMYrQneYisVbAmTOp2c4pzCM34ARUD0L/IuXtZXZttKuwusIhJgumrggq201V3l448ymEPspb7lWYSS5gghGmQ5Yoby87pYOtSKXCISYLZn/XbEeZteMqcpRbbMHJHkjg0Cel0ZXPYKZ0kAJtn3p2iC0T1t3ayo7ENS8NpB8xzzSL0MeHWSQVSQbS7/cg4ppI1LwgkP6ZSw46+qJD2wqV2wZmTMx2gs8FOh2J691r5cWA+pKJxJsbWWozplhVSLbZgmiPNKhvQNz/3ID6EsyFOc7XCQ7xY6Hyu4E5RKlDQvr4V4R6UkwIrC/RP3cIdbEI84lA73Xi/ssD6st/Gnk27iXENSXAWfqbA7PNaYTum3CIvxYq3xRYR/1SqIf6GZLzkUutvCzQQ/LXRwKkbz8T6s0zsjnHp4Uf/KtWFgXUj2Aj0kp+c4R60mA1KUC7RHC5ROrj4BAnCyLsbMMd1dKApwTRA6NiaelQUHBJKcdBJkzgLPb5gv5kVjuHC3R+bMrZnEMC0vq/IfgmHxZe73FTTvBaC9i7d0WgtjlGwAhxRHEhHCJy3PW28ucaHX9coB01vIYRoD+wRYTZnIql/qGm8TnHt025oM8TJlyMqTHKWOz6cyXZn0OaoNjILo4MzvcG2I+Vb7KpQciMCN/ksTXo8HxT3qe4NlC7XOVsb34T/44R+b9LBLdY1Htw9T/gaA+q3bV38wm3W3nIhA/kRRtgyoWskTFjgSCi1gIy8iK5Qxc3cnzOUfSVpj7QsD8fd4E1KrZyzq/Sny+6iL6sDvoS/YiV+U1ce+N+k3B8ODGE/bJYgUWmpVtN/aBmf/5LgAEAzQxLfXjSAv8AAAAASUVORK5CYII=);
	  //   }
	  //
	  //   @-webkit-keyframes plus {
	  //     0% {
	  //       -webkit-transform : rotate(0deg);
	  //       transform         : rotate(0deg);
	  //     }
	  //     50% {
	  //       -webkit-transform : rotate(360deg);
	  //       transform         : rotate(360deg);
	  //     }
	  //     100% {
	  //       -webkit-transform : rotate(360deg);
	  //       transform         : rotate(360deg);
	  //     }
	  //   }
	  //
	  //   @keyframes plus {
	  //     0% {
	  //       -webkit-transform : rotate(0deg);
	  //       transform         : rotate(0deg);
	  //     }
	  //     50% {
	  //       -webkit-transform : rotate(360deg);
	  //       transform         : rotate(360deg);
	  //     }
	  //     100% {
	  //       -webkit-transform : rotate(360deg);
	  //       transform         : rotate(360deg);
	  //     }
	  //   }
	  //
	  //   .logo_right {
	  //     display                 : inline-block;
	  //     width                   : 39px;
	  //     height                  : 39px;
	  //     -webkit-animation       : plus 2s linear 0s infinite;;
	  //     animation               : plus 2s linear 0s infinite;
	  //     -webkit-background-size : 100%;
	  //     background-size         : 100%;
	  //     background-image        : url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABYpJREFUeNrs3FtoHFUYB/D/OWd2dtJsbC7UNJgoXkobaW2ViA/xikh9UcSH1FIp0YivPohiwSJ4qxgU8UX0QUSsKMYLaFsFEUFaFKnaoibFaKApEXNpm9tuNrsz43f2EpKw6e4kM+fszuaDf3YzezY5+e05c4EzYWM9PXDnAV4L1D1kZx7l95rqZkoX5TZKMyVB+YXSR/lCT5cYImwUX9l343V7N9rY+cxWY9HrYGb2UVM9TzlYYHs7ZR/lPcoj6rvlII0oZiiCnueLL3odbkIb3IEV0BZXN+UNlZ1yiUeOth+cDrxr344WNrkUTo40h9Cm+0R22tZlIRVVK+XlEts+QblRVccMJJHCRoLblmEsOOIYTdr0KMPsEZG1jinD6/LYvkfNno1waLQdsTtxzNmBK9gF4mAFpiptE/UukqcZpj8iRaEMb5PH9u0q0Aw2htM0RT9wbsGVbCIzbRcXX/4msYnwfleKl/S861GCth0H0ntoqgrUUheX/1Je6M0a8LyUrQZtLz230UTHU7sAE1/ph5Q5nla0S8JVE55XtKJw1YC3GrSS4MKMt1q0kuHCiLcWNE9wYcJbK5pnuDDg+YG2KrhKxvMLbdVwlYjnJ9qa4CoJz2+0NcNVAl4QaL7AlTNeUGi+wZUjXpBovsKVE17QaL7DlQOeCrRA4HTiqUILDE4Hnkq0QOFU4qlGCxxOBZ4ONCVwQeLpQlMGFwSeTjSlcH7i6UZTDucHXjmgyTJ0XA7l8ZwPDTTut0eFXNA1V8obiS0+Ff917AYcdPZoQysEF6E8CAXLDCQe/mYYfpvfOdtgQ6SLL5MyEwlcuGrz1t6OB55ltms0OUrQZihHKX+uBLeX8hLlalWfWk0LMHQS6D8F1MZKaD+Wxsjuxi3OrfyF+rkEbEfZSOtFdn3eY8itJMjDPUM5pHq4O9QFcyNQ10YoVvH2VpShrjEVN5101HZZVPEE7abQR4178weHm3SgVWjtpjych3t63cNTPUlpk3C71i081U5KB9d1SlLBJQ//zRyhXrwVWNkS7sy6g6eSNzqcknDvrFt4Knk+97OE+5Ly9bpHSTVMeY7i5s8h76d8o6MnLl15OfSlpDgUziwwFtXQ1e8pnblLsIUjaip3Rrwvhygvu5NBgzHhJqMmrjO5uNYUrOhlviV4RDA+Mhuz+q25RAQuHeGCuxOI5a7dz+Vm5OFLXeQfXt4gKDSDujQ/7yIVN55qirFDRsQtOorE5XVi6x8j/duO/3XfyTu2o/nceHbxvobbqAwdU1Oice7i7KCBqYvMilquyNzxU6RSlgFzMhHZ/9rnsA2O3zrbCW9CCx7XiTZ5nsGMukJul397sTDbxcxlG5gtOB595VPsOj6A/1qbsmhuSOEKoUVrvP+13HEwXR9D2pB4fdrweCWhlRMerzS0csHjlYhWDni8UtF04/FKRtOJxysdTRceDwOaDjweFjTVeDxMaCrxeNjQVOHxMKKpwONhRQsaj4cZLUg8Hna0oPB4NaAFgcerBc1vPF5NaH7i8WpD8wuPVyOaH3i8WtHWiserGW0teLza0VaLx8sAzes6EFMV3s4TAxjf3ADuuivDydfMqAsulI+0KY/tJ1WNvMdf/BjX9A/j7JYW2u4uGXkLcJGIi8Qsw9BAZlmCyun5icf2R1VNW7mmp+utY9jx4xnEY9aSZRYLcMIALk4ICqFZSvdpg5Q3S2wrVw69r2qfN97SgNbBf9Hd+xlqZuaQrDGXwnEBJOIM8RmgZoMLV/2xQP5/32+LtBmi3IXS7vrypUTaxlRDDEnLhJlMFR5xmQV+epdR34PsPRf/LDqOyR7JVZCvIntbwaDqTjGCsQ0hFzQu2cctLPNiLBvNJe+Z+o5yPaU2dyCQkD+V2+nL/wIMAKAWeEo/H9NGAAAAAElFTkSuQmCC);
	  //   }
	  //   .logo_container {
	  //     margin-top : 20px;
	  //     width      : 100%;
	  //     text-align : center;
	  //     max-width  : 640px;
	  //   }
	  //
	  //   .good_list_2_row .column3Con {
	  //     padding-bottom: 0;
	  //   }
	  //   .good_list_2_row .column3 {
	  //     width: 33.3%;
	  //   }
	  //   .good_list_2_row .column3Cont {
	  //     height: auto;
	  //   }
	  //   .good_list_2_row .column3Price {
	  //     display: block;
	  //     width: 50%;
	  //     text-align: center;
	  //   }
	  //   .good_list_2_row .column3VipReturn {
	  //     display: block;
	  //     text-align: center;
	  //   }
	  // </style>

	}; // <template>
	//   <div class="good_list_con">
	//     <div class="good_list_2_row clearfix">
	//       <a
	//          v-for = "item of list"
	//          @click = 'handleHref(item)'
	//          class="good_item" :class = "{ column3: column && column == '3' }">
	//         <div class="good_img_container">
	//           <div class="img_container good_img_container">
	//             <img v-if = "item.goods_img" v-lazy="imgObject(item.goods_img)" style="display: inline;">
	//             <img v-if = "item.imageUrl" v-lazy="imgObject(item.imageUrl)" style="display: inline;">
	//             <span class="img_label" v-if="item.goods_label || item.actInfo" v-text="item.goods_label || item.actInfo"></span>
	//             <span class="img_label" v-if="item.goods_label == '' && item.ratio" v-text="'返现'+item.ratio+'倍'"></span>
	//           </div>
	//           <div v-if = "item.sale_status" class="good_list_sell_out ng-scope">
	//             <span v-if = "item.sale_status == 'soldout'" class="ng-scope">售罄</span>
	//             <span v-if = "item.sale_status == 'presale'" class="ng-scope">预售</span>
	//             <span v-if = "item.sale_status == 'offline'" class="ng-scope">未上架</span>
	//           </div>
	//         </div>
	//
	//         <div class="good_con" :class = "{ column3Con: column && column == '3' }">
	//           <div class="good_title">{{item.goods_name || item.title}}</div>
	//           <div class="goods4_price_bar" :class = "{ column3Cont: column && column == '3' }">
	//             <span v-if = "item.shop_price" class="dav-color-price font-weight" :class = "{ column3Price: column && column == 3 }"><em class="fz_14">¥</em><span class="nowPrice"><span>{{(item.shop_price+"").split(".")[0]}}</span><span class="fz_14" v-if="(item.shop_price+'').split('.').length == 2">.{{(item.shop_price+"").split(".")[1]}}</span></span></span>
	//             <span v-if = "item.nowPrice" class="dav-color-price font-weight" :class = "{ column3Price: column && column == 3 }"><em class="fz_14">¥</em><span class="nowPrice"><span>{{(item.nowPrice+"").split(".")[0]}}</span><span class="fz_14" v-if="(item.nowPrice+'').split('.').length == 2">.{{(item.nowPrice+"").split(".")[1]}}</span></span></span>
	//             <span class="vip_return" :class = "{ column3VipReturn: column && column == 3 }" v-if = "(item.seller_income && item.seller_income != '0') || (item.comm_income && item.comm_income != '0') || (item.timeshopIncome && item.timeshopIncome != '0') || (item.income && item.income != '0')">
	//               <span class="vip_return_title">会员返</span>
	//               <span class="vip_return_f">¥</span>
	//               <span class="vip_return_price">{{item.seller_income || item.comm_income || item.timeshopIncome || item.income}}</span>
	//             </span>
	//           </div>
	//         </div>
	//       </a>
	//     </div>
	//     <div class="logo_container" v-if="loading">
	//       <div class="logo_left"></div>
	//       <div class="logo_right"></div>
	//     </div>
	//     <div class="no_more" v-if="errors">
	//       <span>（ &gt;_&lt; ）加载失败了</span>
	//     </div>
	//     <div v-if = "no_more" class="no_more">
	//       没有更多商品了
	//     </div>
	//   </div>
	// </template>
	// <script>

/***/ },

/***/ 154:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _LiveVideo;

	var _ua = __webpack_require__(155);

	var _ua2 = _interopRequireDefault(_ua);

	var _$ = __webpack_require__(95);

	var _$2 = _interopRequireDefault(_$);

	var _config = __webpack_require__(156);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * 模块功能: js与native交互模块
	                                                                                                                                                                                                                   * 模块目标: 本模块要封装app2.4.0之后为前端提供的所有native接口
	                                                                                                                                                                                                                   * 文档地址: http://wiki.bravetime.net/pages/viewpage.action?pageId=8192341
	                                                                                                                                                                                                                   */


	// 默认标题栏
	var defaultTitleBar = {
	  showHead: 1, // 是否展示头部
	  backOnHead: 1, // 头部返回按钮
	  homeOnHead: 0, // 头部首页按钮
	  shareOnHead: 0, // 头部分享按钮
	  btnOnHead: 0, // 头部文字按钮
	  btnText: "", // 头部文字按钮文字
	  btnLink: "", // 头部文字按钮链接
	  showFoot: 0 // 是否展示底部
	};

	/**
	 * 功能: 拼接调用native的通信协议(核心方法)
	 * 用法:
	 * call({
	      v: '3.1.0',
	      host: 'Browser',
	      action: 'open',
	      param: param,
	    });
	 */
	function getProtocal() {
	  var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  // 参数默认值
	  param.success = param.success || function () {};
	  param.error = param.error || function () {};

	  // 回调名称
	  var callbackName = 'native_callback_' + Math.random().toString().split('.')[1];

	  // 设置全局回调
	  window[callbackName] = function (response) {
	    // 多数native接口执行成功时response.code就会返回'1',执行失败时就会返回'0'。
	    // 此处返回'1'时候正常回调success,但返回不等于'1'时一律执行error。
	    // 如此一来,诸如Account.login这样的返回'0'|'1'|'2'的接口就可以处理'0'|'1'以外的情况了(在error中判断response === '0'|'2'|'3'|'4'|...)。
	    if (response.code == '1') {
	      param.success(response);
	    } else {
	      param.error(response);
	    }
	    // 执行完回收
	    window[callbackName] = null;
	  };

	  // 拼接唤起native协议
	  var protocal = 'davdian://call.' + param.host + '.com?action=' + param.action + '&params=' + encodeURIComponent(JSON.stringify(param.param)) + '&callback=' + callbackName + '&minv=' + param.v;

	  return protocal;
	}

	/**
	 * 功能: 端内调用app
	 * 用法:
	 * call({
	      v: '3.1.0',
	      host: 'Browser',
	      action: 'open',
	      param: {},
	    });
	 */
	function innerCall() {
	  var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  // 不在app中,直接返回
	  if (!_ua2.default.isDvdApp()) return;

	  // 参数检查
	  if (!param.host || !param.action || !param.v) {
	    throw new Error('参数不全');
	  }

	  // 参数默认值
	  param.invalid = param.invalid || function () {
	    alert("请升级您的APP");
	  };

	  // 当前版本高于指定版本,可以调用native,否则进行提示
	  if (_ua2.default.compareVersion(_ua2.default.getDvdAppVersion(), param.v) >= 0) {
	    // 客户端端内调用协议
	    var protocal = getProtocal(param);

	    // 打印协议
	    console.log(protocal);

	    // logger
	    console.log('location.href\u65B9\u5F0F\u5524\u8D77native,\u534F\u8BAE\u4E3A: ' + protocal);

	    // 调用native
	    console.log(protocal);
	    location.href = protocal;
	  } else {
	    // 版本错误提示
	    param.invalid();
	  }
	}

	/**
	 * 功能: 端外调用app(唤起后再执行app接口)
	 * 用法:
	 * call({
	      v: '3.1.0',
	      host: 'Browser',
	      action: 'open',
	      param: {
	        invoke: true,
	        ...
	      },
	    });
	 */
	function outerCall() {
	  var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  // 在app中,直接返回
	  if (_ua2.default.isDvdApp()) return;

	  // 端内调用协议
	  var protocal = getProtocal(param);

	  if (_ua2.default.isAndroid()) {
	    // 端外唤起协议
	    var outerProtocal = 'davdian://invoke.davdian.com?cmd=' + encodeURIComponent(protocal);

	    // 打印协议
	    console.log(outerProtocal);

	    // 唤起app
	    location.href = outerProtocal;

	    // 兜底跳转下载页
	    setTimeout(function () {
	      location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller';
	    }, 3000);
	  } else if (_ua2.default.isIos()) {
	    // let env = /(davdian\.com|vyohui\.cn|bravetime\.net)/.exec(location.href)[0];

	    // 端外唤起协议
	    var _outerProtocal = '//invoke.davdian.com?cmd=' + encodeURIComponent(protocal);

	    // 打印协议
	    console.log(_outerProtocal);

	    // alert(protocal)
	    // alert(outerProtocal);

	    // 唤起app
	    location.href = _outerProtocal;
	  }
	}

	/**
	 * 功能: 调用native(核心方法)
	 * 用法:
	 * call({
	      v: '3.1.0',
	      host: 'Browser',
	      action: 'open',
	      param: {
	        invoke: true,
	        ...
	      },
	    });
	 */
	function call() {
	  var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  // 如果param.param.invoke为真,需要先唤起native再执行cmd
	  if (param.param.invoke) {
	    delete param.param.invoke;
	    outerCall(param);
	  } else {
	    innerCall(param);
	  }
	}

	var native = {
	  /****************************** 1、账户相关 ******************************/
	  Account: {
	    /**
	     * 功能: 登录
	     * 用法:
	     * native.Account.login()
	     */
	    login: function login() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.4.0',
	        host: 'Account',
	        action: 'login',
	        param: param
	      });
	    }
	  },

	  /****************************** 2、直播相关 ******************************/
	  LiveVideo: (_LiveVideo = {
	    /**
	     * 功能: 跳转直播只有当App未启动，或处于首页4个tab页面时（即首页上未盖住其他页面的情况）才进行跳转，否则不进行跳转，以防止出现无法预期的异常情况
	     * 用法:
	     * native.LiveVideo.goTab({
	        userId: "用户Id",
	      })
	     */
	    goTab: function goTab() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.4.0',
	        host: 'LiveVideo',
	        action: 'goTab',
	        param: param
	      });
	    },


	    /**
	     * 功能: 进入某个直播间isPlaying决定客户端在获取到状态为回顾时，是否需要提示；fromPush用来决定如何提示用户（推送和普通流程不同）
	     * 用法:
	     * native.LiveVideo.enterRoom({
	       "liveId" : "房间号",
	       "isPlaying":"1/2/3" ,// 1表示直播中，2是回放，3是整理中
	       "fromPush":"0/1" // 0表示不来自于推送，1表示来自推送
	      })
	     */
	    enterRoom: function enterRoom() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.5.0',
	        host: 'LiveVideo',
	        action: 'enterRoom',
	        param: param
	      });
	    },


	    /**
	     * 功能: 进入直播申请页，若已有进行中申请，则显示申请进度（审核中或审核被拒绝）
	     * 用法:
	     * native.LiveVideo.applyVideoLive()
	     */
	    applyVideoLive: function applyVideoLive() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.5.0',
	        host: 'LiveVideo',
	        action: 'applyVideoLive',
	        param: param
	      });
	    },


	    /**
	     * 功能: 展示直播申请结果
	     * 用法:
	     * native.LiveVideo.showApplyResult({
	        "result":"0/1" // 0表示未通过，1表示通过
	      })
	     */
	    showApplyResult: function showApplyResult() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.5.0',
	        host: 'LiveVideo',
	        action: 'showApplyResult',
	        param: param
	      });
	    },


	    /**
	     * 功能: 进入某个话题列表
	     * 用法:
	     * native.LiveVideo.openTopicVideoList({
	        "type":"video/voice",//video:视屏直播，voice:语音回顾
	        "name":"话题标题" ,
	        "ID":"话题ID"
	      })
	     */
	    openTopicVideoList: function openTopicVideoList() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.7.0',
	        host: 'LiveVideo',
	        action: 'openTopicVideoList',
	        param: param
	      });
	    },


	    /**
	     * 功能: 进入全部话题列表
	     * 用法:
	     * native.LiveVideo.openTopicList()
	     */
	    openTopicList: function openTopicList() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.7.0',
	        host: 'LiveVideo',
	        action: 'openTopicList',
	        param: param
	      });
	    }
	  }, _defineProperty(_LiveVideo, 'openTopicVideoList', function openTopicVideoList() {
	    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    call({
	      v: '2.7.0',
	      host: 'LiveVideo',
	      action: 'openTopicVideoList',
	      param: param
	    });
	  }), _defineProperty(_LiveVideo, 'openEssenceList', function openEssenceList() {
	    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    call({
	      v: '3.4.0',
	      host: 'LiveVideo',
	      action: 'openEssenceList',
	      param: param
	    });
	  }), _LiveVideo),

	  /****************************** 3、用户信息 ******************************/
	  PersonInfo: {
	    /**
	     * 功能: 查看(大V课讲师的)个人主页
	     * 用法:
	     * native.PersonInfo.showPersonHome({
	        userId: "用户Id",
	      })
	     */
	    showPersonHome: function showPersonHome() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.5.0',
	        host: 'PersonInfo',
	        action: 'showHomePage',
	        param: param
	      });
	    }
	  },

	  /****************************** 4、浏览 ******************************/
	  Browser: {
	    /**
	     * 功能: 打开新的webview
	     * 用法:
	     * native.Browser.open({
	        url: 'http://18514008282.vyohui.cn/',
	      });
	     */
	    open: function open() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.5.0',
	        host: 'Browser',
	        action: 'open',
	        param: param
	      });
	    },


	    /**
	     * 功能: 关闭当前webview
	     * 用法:
	     * native.Browser.close();
	     */
	    close: function close() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.5.0',
	        host: 'Browser',
	        action: 'close',
	        param: param
	      });
	    },


	    /**
	     * 功能: 设置native头部标题栏
	     * 用法:
	     * native.Browser.setHead({
	        'title' : '修改后的标题',
	        'backBtn' : '0/1', // 0表示头部不展示返回按钮，1表示展示
	        'homeBtn' : '0/1', // 0表示头部不展示首页按钮，1表示展示
	        'shareBtn' : '0/1', //0表示头部不展示分享按钮，1表示展示
	        'shareMoney' : '分享获得返现数', //0表示分享返现为0不显示分享赚钱按钮，非0：展示分享赚钱按钮，在3.9.1之前用该字段
	        'shareMoneyStr':'分享获取返现数显示的字符串',//在3.9.1中会用该字段
	        'rightBtn' : {
	          'text' : '头部右部展示的文字按钮文字',        
	          'textColor':'头部右部按钮文字颜色',
	          'action' : '文字按钮需要执行的JS'
	        }
	      })
	     */
	    setHead: function setHead() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.6.0',
	        host: 'Browser',
	        action: 'setHead',
	        param: param
	      });
	    },


	    /**
	     * 功能: 初始化native头部标题栏
	     * 用法:
	     * native.Browser.initHead({
	          content: JSON.stringify({
	            showHead: 1,
	            showFoot: 0,
	            backOnHead: 1,
	            homeOnHead: 0,
	            shareOnHead: 0,
	            btnOnHead: 0,
	            btnText: "",
	            btnLink: ""
	          })
	        }
	     })
	     */
	    initHead: function initHead() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.4.0',
	        host: 'Browser',
	        action: 'initHead',
	        param: param
	      });
	    },


	    /**
	     * app支付
	     * 用法:
	     * native.Browser.pay({
	        "url": "目标地址", "pay_type": "1", //payType的值为0则为默认1为组团参与者，2为组团发起者。
	        "pay_id": "123456",//支付ID
	        "sign": "abdsdfsdfasfda"
	        "platform": "0",//直接调用支付平台，0：直接调用微信支付，1：直接调用支付宝支付。
	      });
	     */
	    pay: function pay() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.1.0',
	        host: 'Browser',
	        action: 'pay',
	        param: param
	      });
	    },


	    /**
	     * 功能: 添加订单选择身份证
	     * 用法:
	     * native.Browser.selectIdentity({
	        cardName: ''
	      })
	     */
	    selectIdentity: function selectIdentity() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.7.0',
	        host: 'Browser',
	        action: 'selectIdentity',
	        param: param
	      });
	    },


	    /**
	     * 功能: APP中点击图片显示大图
	     * 用法:
	     * native.Browser.selectIdentity({
	        cardName: ''
	      })
	     */
	    showBigImage: function showBigImage() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '4.1.0',
	        host: 'Browser',
	        action: 'showBigImage',
	        param: param
	      });
	    }
	  },

	  /****************************** 5、购物车 ******************************/
	  ShopCart: {
	    /**
	     * 功能: 商品加入购物车
	     * 用法:
	     * native.ShopCart.open({
	        "goodsID" : "商品ID",
	        "cout" : "商品数量"
	      });
	     */
	    addGoodsToShopCart: function addGoodsToShopCart() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '2.6.0',
	        host: 'ShopCart',
	        action: 'addGoodsToShopCart',
	        param: param
	      });
	    }
	  },

	  /****************************** 6、发现社区 ******************************/
	  Community: {
	    /**
	     * 功能: 打开发现社区
	     * 用法:
	     * native.Community.openCommunity(;
	     */
	    openCommunity: function openCommunity() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.1.0',
	        host: 'Community',
	        action: 'openCommunity',
	        param: param
	      });
	    }
	  },

	  /****************************** 7、share分享 ******************************/
	  Share: {
	    /**
	     * 分享卡
	     * 用法:
	     * native.Share.shareInfo({
	        "show":"是否显示下方shareView",//0：不显示，1：显示。
	        "shareType":"是否只分享图片"，//0：分享图文链接方式，1：只分享图片 （支持图片分享的分享图片、不支持分享图文链接（需要传tilte、desc、link、imgUrl））。
	        "sharePlatform":"分享方式",//0：微信朋友圈，1：微信好友，2：QQ好友，3：QQ空间，4：短信，5：复制功能。
	        "shareTitle":"底部特殊分享标题",
	        "shareDesc":"底部特殊分享描述",
	        "title":"分享标题",
	        "desc":"分享内容描述",
	        "link":"分享链接',
	        "imgUrl":"分享图片链接",
	        "bigImageUrl":"只分享图片：大图片链接",
	        "shareSource":"分享统计的shareSource", //h5分享为15或者没有这个字段，原生的一定要传根据分享列表传值http://wiki.bravetime.net/pages/viewpage.action?pageId=15106888
	      })
	     */
	    shareInfo: function shareInfo() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.3.0',
	        host: 'Share',
	        action: 'shareInfo',
	        param: param
	      });
	    },


	    /**
	     * 分享卡
	     * 用法:
	     * native.Share.share({
	        courseId: '直播ID',
	      })
	     */
	    shareCard: function shareCard() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.4.0',
	        host: 'Share',
	        action: 'cardShare',
	        param: param
	      });
	    },


	    /**
	     * 素材分享
	     * 用法:
	     * native.Share.materialShare({
	        "pageId":"素材分享页id"
	      })
	     */
	    materialShare: function materialShare() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.6.0',
	        host: 'Share',
	        action: 'materialShare',
	        param: param
	      });
	    }
	  },

	  /****************************** 8、语音直播相关 ******************************/
	  VoiceLive: {
	    /**
	     * 功能: 打开语音直播介绍页
	     * 用法:
	     * native.VoiceLive.openVoiceIntro({
	        "courseId":"语音直播间id",//语音直播间id，根据courseId去请求得到加载网址。
	        "fromPush":"判断是否未推送",//0:代表非推送打开，1：推送打开 。
	        "messageType":"推送消息类型",//只有判断为推送消息才会解析该参数 1：语音直播即将开始消息，2:语音直播问题被回答消息；
	      });
	     */
	    openVoiceIntro: function openVoiceIntro() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.4.0',
	        host: 'VoiceLive',
	        action: 'openVoiceIntro',
	        param: param
	      });
	    },


	    /**
	     * 功能: 打开老师信息页
	     * 用法:
	     * native.VoiceLive.openTeacherHome({
	        "teacherId" : "老师ID"
	      });
	     */
	    openTeacherHome: function openTeacherHome() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.4.0',
	        host: 'VoiceLive',
	        action: 'openTeacherHome',
	        param: param
	      });
	    },


	    /**
	     * 功能: 进入直播间
	     * 用法:
	     * native.VoiceLive.enterVoiceRoom({
	        "courseId": "语音直播间id"
	      });
	     */
	    enterVoiceRoom: function enterVoiceRoom() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.4.0',
	        host: 'VoiceLive',
	        action: 'enterRoom',
	        param: param
	      });
	    },


	    /**
	     * 功能: 进入全部课程列表
	     * 用法:
	     * native.VoiceLive.enterCourseList();
	     */
	    enterCourseList: function enterCourseList() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.7.0',
	        host: 'VoiceLive',
	        action: 'enterCourseList',
	        param: param
	      });
	    },


	    /**
	     * 功能: 进入语音直播
	     * 用法:
	     * native.VoiceLive.enterOldVoiceLiveRoom({
	         "liveId": "149",//直播id
	         "title": "著名亲子教育专家 卢洪波：孩子贪玩，我该怎么办？",//标题
	         "status": "4",//状态（2：直播结束前 3：直播整理中 4：直播回顾）
	         "intro": "分享时间:2016年07月18日（周一）14:00-15:00　　分享内容:　　很多父母一直处于困惑纠结中，孩子小的时候，父母想尽一切办法教TA玩，但是孩子从上幼儿园开始，父母开始限制TA玩，上小学后，几乎就不允许玩，然后就会发现孩子是想尽一切办法在找时间偷着玩：听课时，因为没有玩具，玩手指头；写作业时，趁着思考的间隙，玩转笔；走路时，没有足球，踢石头子......家长挂在嘴边上的话又多了一句“别玩，好好学习”“别玩，快写！”“别玩，好好走路”等等。　　　　作为父母，我们是怎么认识玩的呢？孩子的成长是否需要玩呢？到底应该让孩子玩什么，怎么玩呢？在玩中，应该培养哪些优秀好好学习”“别玩，快写！”“别玩，好好走路”等等。　　　　作为父母，我们是怎么认识玩的呢？孩子的成长是否需要玩呢？到底应该让孩子玩什么，怎么玩呢？在玩中，应该培养哪些优秀\345\223品质呢？如何实现在玩中学，学中玩的理想教育呢？PS:&nbsp;&nbsp;在大V店APP里预约听课，可以立即向分享老师提问哦！听课指南："(需要将/n、/r替换为//n、//r),//课程简介、分享描述内容
	         "smallImageUrl": "http://pic.davdian.com/free/2016/07/01/320_320_d9c182776612fe1f3243b763dcf9a1b5.jpg",//分享显示图片
	         "reviewUrl": "/index.php?m=default&c=live&a=liveinfo&id=149",//回顾网页
	         "shareUrl": "/index.php?m=default&c=live&a=liveinfo&id=149"//分享的链接
	       });
	     */
	    enterOldVoiceLiveRoom: function enterOldVoiceLiveRoom() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.7.0',
	        host: 'VoiceLive',
	        action: 'enterOldVoiceLiveRoom',
	        param: param
	      });
	    },

	    /**
	     * 功能: 进入全部笔记页面
	     * 用法:
	     * native.VoiceLive.callAppEnterAllNote()
	       });
	     */
	    callAppEnterAllNote: function callAppEnterAllNote() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.9.2',
	        host: 'VoiceLive',
	        action: 'openCourseCommentList',
	        param: param
	      });
	    },

	    /**
	     * 功能: 进入写笔记页面
	     * 用法:
	     * native.VoiceLive.callAppEnterWriteNote()
	       });
	     */
	    callAppEnterWriteNote: function callAppEnterWriteNote() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '4.1.0',
	        host: 'VoiceLive',
	        action: 'openCourseNoteEdit',
	        param: param
	      });
	    }
	  },

	  /****************************** 9、社群 ******************************/
	  CommunityChat: {
	    /**
	     * 功能: 打开社群
	     * 用法:
	     * native.CommunityChat.enterCommunityChat();
	     */
	    enterCommunityChat: function enterCommunityChat() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.8.0',
	        host: 'CommunityChat',
	        action: 'enterCommunityChat',
	        param: param
	      });
	    },


	    /**
	     * 功能: 打开社群成员列表
	     * 用法:
	     * native.CommunityChat.enterCommunityMemberList({
	        "communityId" : "社群id"
	      });
	     */
	    enterCommunityMemberList: function enterCommunityMemberList() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.8.0',
	        host: 'CommunityChat',
	        action: 'enterCommunityMemberList',
	        param: param
	      });
	    }
	  },

	  /****************************** 10、搜索相关 ******************************/
	  Search: {
	    /**
	     * 功能: 进入商品搜索结果页
	     * 用法:
	     * native.Search.enterGoodsSearchResult({
	        "name" : "书包"
	      });
	     */
	    enterGoodsSearchResult: function enterGoodsSearchResult() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.9.0',
	        host: 'Search',
	        action: 'enterGoodsSearchResult',
	        param: param
	      });
	    }
	  },

	  /****************************** 11、H5触发cmd命令 ******************************/
	  BrowserTouch: {
	    /**
	     * 功能: H5触发cmd客户端实现回到上一级页面
	     * 用法:
	     * native.BrowserTouch.goBackToRootPage();
	     */
	    goBackToRootPage: function goBackToRootPage() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '3.9.0',
	        host: 'BrowserTouch',
	        action: 'goBackToRootPage',
	        param: param
	      });
	    }
	  },
	  /****************************** 12、H5触发cmd命令 ******************************/
	  Common: {
	    /**
	     * 功能: H5触发cmd客户端实现回到上一级页面
	     * 用法:
	     * native.BrowserTouch.goBackToRootPage();
	     */
	    log: function log() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      call({
	        v: '4.1.0',
	        host: 'Common',
	        action: 'log',
	        param: param
	      });
	    }
	  },

	  /****************************** 自定义便捷接口 ******************************/
	  custom: {
	    /**
	     * 功能: 设置native分享信息
	     * 用法:
	     * native.custom.setShareInfo({
	        title: '大V店组团包邮', // 分享标题
	        desc: '一件包邮！每天上新！好货低价又包邮，抢到了就赚翻啦', // 分享描述
	        link: location.href, // 分享链接
	        imgUrl: 'http://pic.davdian.com/free/2016/04/09/320_320_0fc3e0dbbadd249b7f1b93a525f0adf0.jpg', // 分享图标
	      });
	     */
	    setShareInfo: function setShareInfo() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 参数合并
	      param = _$2.default.extend({}, _config2.default.defaultShareInfo, param);

	      // 参数处理
	      param.imgUrl.replace("https", "http");

	      // 注册全局方法供native调用
	      window.iosInterface = window.iosInterface || {};
	      window.iosInterface.getShareInfo = function () {
	        return JSON.stringify(param);
	      };
	    },


	    /**
	     * 功能: 注册事件回调,webview返回当前页面时执行。
	     * 背景: ios3.9.1之后采用WKWebView,返回当前页面时不会自动刷新页面,但ios会回调js全局方法。
	     * 用法:
	     * native.custom.onWebviewBack({
	        callback: function () {
	          location.reload();
	        }
	      });
	     */
	    onWebviewBack: function onWebviewBack() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 参数处理
	      param.callback = param.callback || function () {
	        location.reload();
	      };

	      // 注册全局方法供native调用
	      window.iosInterface = window.iosInterface || {};
	      var nativeWebviewBack = window.iosInterface.nativeWebviewBack;
	      window.iosInterface.nativeWebviewBack = function () {
	        nativeWebviewBack && nativeWebviewBack();
	        param.callback();
	      };
	    },


	    /**
	     * 功能: 初始化native头部标题栏
	     * 用法:
	     * native.Browser.initHead({
	        showHead: 1,
	        showFoot: 0,
	        backOnHead: 1,
	        homeOnHead: 0,
	        shareOnHead: 0,
	        btnOnHead: 0,
	        btnText: "",
	        btnLink: ""
	      })
	     */
	    initHead: function initHead() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 参数合并
	      param = _$2.default.extend({}, defaultTitleBar, param);

	      // 调用Browser.initHead接口
	      native.Browser.initHead({
	        content: param
	      });
	    },


	    /**
	     * 功能: 分享
	     * 用法:
	     * native.custom.share({
	        title: 'MAMA+|大V店',
	        desc: 'MAMA+|大V店',
	        link: 'MAMA+|大V店',
	        imgUrl: 'http://pic.davdian.com/goods/1/20151017104524.png'
	      })
	     */
	    share: function share() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 分享信息(页面分享信息+默认分享信息)
	      var shareInfo = _$2.default.extend({}, _config2.default.defaultShareInfo, window.iosInterface && window.iosInterface.getShareInfo && JSON.parse(window.iosInterface.getShareInfo()));

	      // 默认参数(加入分享信息)
	      var defaultParam = _$2.default.extend({
	        show: '1',
	        shareType: '0'
	      }, shareInfo);

	      // 覆盖默认参数
	      param = _$2.default.extend({}, defaultParam, param);

	      // 调用Share.shareInfo接口
	      native.Share.shareInfo(param);
	    },


	    /**
	     * 功能: 分享朋友圈
	     * 用法:
	     * native.custom.shareWeixinTimeline({
	        title: 'MAMA+|大V店',
	        desc: 'MAMA+|大V店',
	        link: 'MAMA+|大V店',
	        imgUrl: 'http://pic.davdian.com/goods/1/20151017104524.png'
	      })
	     */
	    shareWeixinTimeline: function shareWeixinTimeline() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 默认参数
	      param = _$2.default.extend({
	        show: '0',
	        sharePlatform: '0'
	      }, param);
	      this.share(param);
	    },


	    /**
	     * 分享微信好友
	     * 用法:
	     * native.custom.shareWeixinFriend({
	        title: 'MAMA+|大V店',
	        desc: 'MAMA+|大V店',
	        link: 'MAMA+|大V店',
	        imgUrl: 'http://pic.davdian.com/goods/1/20151017104524.png'
	      })
	     */
	    shareWeixinFriend: function shareWeixinFriend() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 默认参数
	      param = _$2.default.extend({
	        show: '0',
	        sharePlatform: '1'
	      }, param);
	      this.share(param);
	    },


	    /**
	     * 分享QQ好友
	     * 用法:
	     * native.custom.shareQQFriend({
	        title: 'MAMA+|大V店',
	        desc: 'MAMA+|大V店',
	        link: 'MAMA+|大V店',
	        imgUrl: 'http://pic.davdian.com/goods/1/20151017104524.png'
	      })
	     */
	    shareQQFriend: function shareQQFriend() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 默认参数
	      param = _$2.default.extend({
	        show: '0',
	        sharePlatform: '2'
	      }, param);
	      this.share(param);
	    },


	    /**
	     * 分享QQ空间
	     * 用法:
	     * native.custom.shareQQZone({
	        title: 'MAMA+|大V店',
	        desc: 'MAMA+|大V店',
	        link: 'MAMA+|大V店',
	        imgUrl: 'http://pic.davdian.com/goods/1/20151017104524.png'
	      })
	     */
	    shareQQZone: function shareQQZone() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 默认参数
	      param = _$2.default.extend({
	        show: '0',
	        sharePlatform: '3'
	      }, param);
	      this.share(param);
	    },


	    /**
	     * 分享到短信
	     * 用法:
	     * native.custom.shareSms({
	        title: 'MAMA+|大V店',
	        desc: 'MAMA+|大V店',
	        link: 'MAMA+|大V店',
	        imgUrl: 'http://pic.davdian.com/goods/1/20151017104524.png'
	      })
	     */
	    shareSms: function shareSms() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 默认参数
	      param = _$2.default.extend({
	        show: '0',
	        sharePlatform: '4'
	      }, param);
	      this.share(param);
	    },


	    /**
	     * 复制分享链接
	     * 用法:
	     * native.custom.shareCopyUrl({
	        link: 'MAMA+|大V店'
	      })
	     */
	    shareCopyUrl: function shareCopyUrl() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 默认参数
	      param = _$2.default.extend({
	        show: '0',
	        sharePlatform: '5'
	      }, param);
	      this.share(param);
	    },


	    /**
	     * 分享图片
	     * 用法:
	     * native.custom.shareImg({
	        show: '1',  // 1弹窗,0不弹窗
	        shareType: '1',
	        bigImageUrl: 'http://pic.davdian.com/free/back_top_icon_0803.png'  // imgUrl无效,必须用bigImageUrl
	      })
	     */
	    shareImg: function shareImg() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // 默认参数
	      param = _$2.default.extend({
	        show: '1', // 1弹窗,0不弹窗
	        shareType: '1',
	        bigImageUrl: 'http://pic.davdian.com/free/back_top_icon_0803.png' // imgUrl无效,必须用bigImageUrl
	      }, param);
	      this.share(param);
	    },


	    /**
	     * 功能: 唤起app首页,不执行cmd
	     * 用法:
	     * native.custom.invoke()
	     */
	    invoke: function invoke() {
	      call({
	        v: '0.0.0',
	        host: '',
	        action: '',
	        param: {
	          invoke: true
	        }
	      });
	    }
	  }
	};

	exports.default = native;

/***/ },

/***/ 155:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Created by weiguangsun on 2016/6/17.
	 * 判断当前平台类型
	 */
	function Ua() {
		this.ua = navigator.userAgent;
		this.cache = {};
	}

	Ua.prototype = {
		match: function match(regex) {
			if (Object.prototype.toString.call(regex) === '[object String]') {
				regex = new RegExp(regex, 'g');
			}
			return regex.test(this.ua);
		},
		getFromCache: function getFromCache(cacheName, regexArray) {
			// 如果未缓存过cache[cacheName]，则缓存对正则数组regStrArray匹配的结果
			if (this.cache[cacheName] === undefined) {
				// 正则数组regStrArray匹配的结果
				var cacheValue;
				for (var i in regexArray) {
					cacheValue = this.match(regexArray[i]);
					if (cacheValue) {
						break;
					}
				}
				// 缓存
				this.cache[cacheName] = cacheValue;
			}
			// 返回缓存中的值
			return this.cache[cacheName];
		},
		/**
	  * chrome浏览器
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.108 Mobile Safari/537.36
	  * ios		Mozilla/5.0 (iPod; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/51.0.2704.64 Mobile/13F69 Safari/601.1.46
	  */
		isChrome: function isChrome() {
			return this.getFromCache('isChrome', ['Chrome', 'CriOS']);
		},
		/**
	  * uc浏览器
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; U; Android 6.0; zh-CN; MI 5 Build/MRA58K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.10.3.810 U3/0.8.0 Mobile Safari/534.30
	  * ios		Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/13F69 UCBrowser/10.9.16.802 Mobile
	  */
		isUc: function isUc() {
			return this.getFromCache('isUc', ['UCBrowser']);
		},
		/**
	  * QQ浏览器
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; U; Android 6.0; zh-cn; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko)Version/4.0 Chrome/37.0.0.0 MQQBrowser/6.7 Mobile Safari/537.36
	  * ios		Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/6.0 MQQBrowser/6.7.2 Mobile/13F69 Safari/8536.25 MttCustomUA/2
	  */
		isQqBrowser: function isQqBrowser() {
			return this.getFromCache('isQqBrowser', ['MQQBrowser']);
		},
		/**
	  * 小米系统浏览器
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; U; Android 6.0; zh-cn; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.85 Mobile Safari/537.36 XiaoMi/MiuiBrowser/2.1.1
	  */
		isXiaoMiBrowser: function isXiaoMiBrowser() {
			return this.getFromCache('isXiaoMiBrowser', ['XiaoMi/MiuiBrowser']);
		},
		/**
	  * safari浏览器
	  * @returns {true | false}
	  * ios		Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1
	  */
		isSafari: function isSafari() {
			return this.getFromCache('isSafari', ['Version/\\d?[.]\\d Mobile/.* Safari/.*']);
		},
		/**
	  * 百度浏览器
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.116 Mobile Safari/537.36 baidubrowser/7.8.12.0 (Baidu; P1 6.0)
	  * ios
	  */
		isBaiduBrowser: function isBaiduBrowser() {
			return this.getFromCache('isBaiduBrowser', ['baidubrowser']);
		},
		/**
	  * 搜狗浏览器
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; Android 6.0; MI 5; Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.92 SDK/1.2.2.675 Mobile Safari/537.36 SogouMSE,SogouMobileBrowser/5.5.0
	  * ios
	  */
		isSougouBrowser: function isSougouBrowser() {
			return this.getFromCache('isSougouBrowser', ['SogouMobileBrowser']);
		},
		/**
	  * 新浪微博
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36 Weibo (Xiaomi-MI 5__weibo__6.6.0__android__android6.0)
	  * ios		Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 Weibo (iPod5,1__weibo__5.4.0__iphone__os9.3.2)
	  */
		isSinaWeiBo: function isSinaWeiBo() {
			return this.getFromCache('isSinaWeiBo', ['Weibo']);
		},
		/**
	  * QQ+QQ空间（QQ和QQ空间ua相同）
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036522 Safari/537.36 V1_AND_SQ_6.3.7_374_YYB_D QQ/6.3.7.2795 NetType/WIFI WebP/0.3.0 Pixel/1080
	  * ios		Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 QQ/6.3.5.437 V1_IPH_SQ_6.3.5_1_APP_A Pixel/640 Core/UIWebView NetType/WIFI Mem/12
	  */
		isQq: function isQq() {
			return this.getFromCache('isQq', [/QQ\/[0-9]?/]);
		},
		/**
	  * 微信+朋友圈（微信和朋友圈ua相同）
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036523 Safari/537.36 MicroMessenger/6.3.18.800 NetType/WIFI Language/zh_CN
	  * ios		Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 MicroMessenger/6.3.19 NetType/WIFI Language/zh_CN
	  */
		isWeiXin: function isWeiXin() {
			return this.getFromCache('isWeiXin', ['MicroMessenger']);
		},
		/**
	  * 支付宝
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; U; Android 6.0; zh-cn; MI 5 Build/MRA58K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/1.0.0.100 U3/0.8.0 Mobile Safari/534.30 AlipayDefined(nt:WIFI,ws:360|640|3.0) AliApp(AP/9.6.8.053103) AlipayClient/9.6.8.053103 Language/zh-Hans
	  * ios		Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E233 ChannelId(12) Nebula PSDType(1) AlipayDefined(nt:WIFI,ws:320|504|2.0) AliApp(AP/9.6.6.05070802) AlipayClient/9.6.6.05070802 Language/zh-Hans
	  */
		isAlipay: function isAlipay() {
			return this.getFromCache('isAlipay', ['AlipayClient']);
		},
		/**
	  * 搜狐新闻客户端
	  * @returns {true | false}
	  * android	Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36 SohuNews/5.6.0 BuildCode/106 JsKit/1.0 (Android)
	  * ios		Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E233 JsKit/1.0 (iOS)
	  */
		isSohuNewsClient: function isSohuNewsClient() {
			return this.getFromCache('isSohuNewsClient', ['SohuNews', 'JsKit']);
		},
		/**
	  * android
	  * @returns {true | false}
	  */
		isAndroid: function isAndroid() {
			return this.getFromCache('isAndroid', ['Android']);
		},
		/**
	  * ios
	  * @returns {true | false}
	  */
		isIos: function isIos() {
			return this.getFromCache('isIos', ['iPhone']);
		},
		/**
	  * 手机端
	  * @returns {true | false}
	  */
		isMobile: function isMobile() {
			return this.getFromCache('isMobile', ['Mobile']);
		},
		/**
	  * 大V店客户端
	  * @returns {true | false}
	  * android(正式环境):	Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 android.davdian.com/3.6.2
	  * android(beta环境):	Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 android.vyohui.cn/3.7.0/dvddomain=1
	  * ios
	  */
		isDvdApp: function isDvdApp() {
			return this.getFromCache('isDvdApp', ['davdian', 'vyohui', 'bravetime']);
		},
		/**
	  * 获取大V店客户端版本号
	  */
		getDvdAppVersion: function getDvdAppVersion() {
			var result = /(ios|android)\.(davdian\.com|vyohui\.cn|bravetime\.net)\/([\d\.]+)/.exec(navigator.userAgent);
			if (result) {
				return result[3];
			}
		},

		/**
	  * 比较版本号
	  */
		compareVersion: function compareVersion(v1, v2) {
			// 用.分割版本号
			var subV1Arr = v1.split('.');
			var subV2Arr = v2.split('.');

			// 取.最多的数组长度
			var length = subV1Arr.length >= subV2Arr.length ? subV1Arr.length : subV2Arr.length;

			// 比较每个相对应的子版本号
			for (var i = 0; i < length; i++) {
				var subV1 = (subV1Arr[i] || 0) * 1;
				var subV2 = (subV2Arr[i] || 0) * 1;
				if (subV1 > subV2) {
					return 1;
				} else if (subV1 < subV2) {
					return -1;
				}
			}
			return 0;
		}
	};
	Ua.prototype.constructor = Ua;

	exports.default = new Ua();

/***/ },

/***/ 156:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 全局配置文件
	 */
	exports.default = {
	  // 默认分享信息
	  defaultShareInfo: {
	    title: 'MAMA+|大V店', // 分享标题
	    desc: 'MAMA+|大V店', // 分享描述
	    link: window.location.href, // 分享链接
	    imgUrl: 'http://pic.davdian.com/free/index0925_icon1.png?x-oss-process=image/resize,m_fill,w_80' // 分享图标
	  }
	};

/***/ },

/***/ 157:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"good_list_con\">\n  <div class=\"good_list_2_row clearfix\">\n    <a\n       v-for = \"item of list\"\n       @click = 'handleHref(item)'\n       class=\"good_item\" :class = \"{ column3: column && column == '3' }\">\n      <div class=\"good_img_container\">\n        <div class=\"img_container good_img_container\">\n          <img v-if = \"item.goods_img\" v-lazy=\"imgObject(item.goods_img)\" style=\"display: inline;\">\n          <img v-if = \"item.imageUrl\" v-lazy=\"imgObject(item.imageUrl)\" style=\"display: inline;\">\n          <span class=\"img_label\" v-if=\"item.goods_label || item.actInfo\" v-text=\"item.goods_label || item.actInfo\"></span>\n          <span class=\"img_label\" v-if=\"item.goods_label == '' && item.ratio\" v-text=\"'返现'+item.ratio+'倍'\"></span>\n        </div>\n        <div v-if = \"item.sale_status\" class=\"good_list_sell_out ng-scope\">\n          <span v-if = \"item.sale_status == 'soldout'\" class=\"ng-scope\">售罄</span>\n          <span v-if = \"item.sale_status == 'presale'\" class=\"ng-scope\">预售</span>\n          <span v-if = \"item.sale_status == 'offline'\" class=\"ng-scope\">未上架</span>\n        </div>\n      </div>\n\n      <div class=\"good_con\" :class = \"{ column3Con: column && column == '3' }\">\n        <div class=\"good_title\">{{item.goods_name || item.title}}</div>\n        <div class=\"goods4_price_bar\" :class = \"{ column3Cont: column && column == '3' }\">\n          <span v-if = \"item.shop_price\" class=\"dav-color-price font-weight\" :class = \"{ column3Price: column && column == 3 }\"><em class=\"fz_14\">¥</em><span class=\"nowPrice\"><span>{{(item.shop_price+\"\").split(\".\")[0]}}</span><span class=\"fz_14\" v-if=\"(item.shop_price+'').split('.').length == 2\">.{{(item.shop_price+\"\").split(\".\")[1]}}</span></span></span>\n          <span v-if = \"item.nowPrice\" class=\"dav-color-price font-weight\" :class = \"{ column3Price: column && column == 3 }\"><em class=\"fz_14\">¥</em><span class=\"nowPrice\"><span>{{(item.nowPrice+\"\").split(\".\")[0]}}</span><span class=\"fz_14\" v-if=\"(item.nowPrice+'').split('.').length == 2\">.{{(item.nowPrice+\"\").split(\".\")[1]}}</span></span></span>\n          <span class=\"vip_return\" :class = \"{ column3VipReturn: column && column == 3 }\" v-if = \"(item.seller_income && item.seller_income != '0') || (item.comm_income && item.comm_income != '0') || (item.timeshopIncome && item.timeshopIncome != '0') || (item.income && item.income != '0')\">\n            <span class=\"vip_return_title\">会员返</span>\n            <span class=\"vip_return_f\">¥</span>\n            <span class=\"vip_return_price\">{{item.seller_income || item.comm_income || item.timeshopIncome || item.income}}</span>\n          </span>\n        </div>\n      </div>\n    </a>\n  </div>\n  <div class=\"logo_container\" v-if=\"loading\">\n    <div class=\"logo_left\"></div>\n    <div class=\"logo_right\"></div>\n  </div>\n  <div class=\"no_more\" v-if=\"errors\">\n    <span>（ &gt;_&lt; ）加载失败了</span>\n  </div>\n  <div v-if = \"no_more\" class=\"no_more\">\n    没有更多商品了\n  </div>\n</div>\n";

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(283);

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);
	var bind = __webpack_require__(285);
	var Axios = __webpack_require__(286);
	var defaults = __webpack_require__(287);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(305);
	axios.CancelToken = __webpack_require__(306);
	axios.isCancel = __webpack_require__(302);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(307);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(285);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },

/***/ 285:
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },

/***/ 286:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(287);
	var utils = __webpack_require__(284);
	var InterceptorManager = __webpack_require__(299);
	var dispatchRequest = __webpack_require__(300);
	var isAbsoluteURL = __webpack_require__(303);
	var combineURLs = __webpack_require__(304);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(284);
	var normalizeHeaderName = __webpack_require__(289);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(290);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(290);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(288)))

/***/ },

/***/ 288:
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(284);
	var settle = __webpack_require__(291);
	var buildURL = __webpack_require__(294);
	var parseHeaders = __webpack_require__(295);
	var isURLSameOrigin = __webpack_require__(296);
	var createError = __webpack_require__(292);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(297);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(298);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(288)))

/***/ },

/***/ 291:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(292);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(293);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },

/***/ 293:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },

/***/ 297:
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);
	var transformData = __webpack_require__(301);
	var isCancel = __webpack_require__(302);
	var defaults = __webpack_require__(287);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(284);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },

/***/ 302:
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },

/***/ 303:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },

/***/ 304:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },

/***/ 305:
/***/ function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(305);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ },

/***/ 307:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.1.1
	 */

	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  var type = typeof x;
	  return x !== null && (type === 'object' || type === 'function');
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (Array.isArray) {
	  _isArray = Array.isArray;
	} else {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(309);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$1(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then$$1.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then$$1) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then$$1, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return resolve(promise, value);
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$1) {
	  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$1 === GET_THEN_ERROR) {
	      reject(promise, GET_THEN_ERROR.error);
	      GET_THEN_ERROR.error = null;
	    } else if (then$$1 === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$1)) {
	      handleForeignThenable(promise, maybeThenable, then$$1);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function resolve(promise, value) {
	  if (promise === value) {
	    reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      resolve(promise, value);
	    } else if (failed) {
	      reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      resolve(promise, value);
	    }, function rejectPromise(reason) {
	      reject(promise, reason);
	    });
	  } catch (e) {
	    reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator$1(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate(input);
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	}

	Enumerator$1.prototype._enumerate = function (input) {
	  for (var i = 0; this._state === PENDING && i < input.length; i++) {
	    this._eachEntry(input[i], i);
	  }
	};

	Enumerator$1.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$1 = c.resolve;

	  if (resolve$$1 === resolve$1) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise$2) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$1) {
	        return resolve$$1(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$1(entry), i);
	  }
	};

	Enumerator$1.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator$1.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all$1(entries) {
	  return new Enumerator$1(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race$1(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$1(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise$2(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise$2.all = all$1;
	Promise$2.race = race$1;
	Promise$2.resolve = resolve$1;
	Promise$2.reject = reject$1;
	Promise$2._setScheduler = setScheduler;
	Promise$2._setAsap = setAsap;
	Promise$2._asap = asap;

	Promise$2.prototype = {
	  constructor: Promise$2,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	/*global self*/
	function polyfill$1() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise$2;
	}

	// Strange compat..
	Promise$2.polyfill = polyfill$1;
	Promise$2.Promise = Promise$2;

	return Promise$2;

	})));

	//# sourceMappingURL=es6-promise.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(288), (function() { return this; }())))

/***/ },

/***/ 309:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	    web-storage-cache -- Added `expires` attribute and serialize data with `JSON.parse` for the localStorage and sessionStorage.
	    Version 1.0.3
	    https://github.com/WQTeam/web-storage-cache
	    (c) 2013-2016 WQTeam, MIT license
	*/
	!function(a,b){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=b():a.WebStorageCache=b()}(this,function(){"use strict";function a(a,b){for(var c in b)a[c]=b[c];return a}function b(a){var b=!1;if(a&&a.setItem){b=!0;var c="__"+Math.round(1e7*Math.random());try{a.setItem(c,c),a.removeItem(c)}catch(d){b=!1}}return b}function c(a){var b=typeof a;return"string"===b&&window[a]instanceof Storage?window[a]:a}function d(a){return"[object Date]"===Object.prototype.toString.call(a)&&!isNaN(a.getTime())}function e(a,b){if(b=b||new Date,"number"==typeof a?a=a===1/0?l:new Date(b.getTime()+1e3*a):"string"==typeof a&&(a=new Date(a)),a&&!d(a))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return a}function f(a){var b=!1;if(a)if(a.code)switch(a.code){case 22:b=!0;break;case 1014:"NS_ERROR_DOM_QUOTA_REACHED"===a.name&&(b=!0)}else-2147024882===a.number&&(b=!0);return b}function g(a,b){this.c=(new Date).getTime(),b=b||m;var c=e(b);this.e=c.getTime(),this.v=a}function h(a){return"object"!=typeof a?!1:a&&"c"in a&&"e"in a&&"v"in a?!0:!1}function i(a){var b=(new Date).getTime();return b<a.e}function j(a){return"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a)),a}function k(e){var f={storage:"localStorage",exp:1/0},g=a(f,e),h=g.exp;if(h&&"number"!=typeof h&&!d(h))throw new Error("Constructor `exp` parameter cannot be converted to a valid Date instance");m=h;var i=c(g.storage),j=b(i);this.isSupported=function(){return j},j?(this.storage=i,this.quotaExceedHandler=function(a,b,c){if(console.warn("Quota exceeded!"),c&&c.force===!0){var d=this.deleteAllExpires();console.warn("delete all expires CacheItem : ["+d+"] and try execute `set` method again!");try{c.force=!1,this.set(a,b,c)}catch(e){console.warn(e)}}}):a(this,o)}var l=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),m=l,n={serialize:function(a){return JSON.stringify(a)},deserialize:function(a){return a&&JSON.parse(a)}},o={set:function(){},get:function(){},"delete":function(){},deleteAllExpires:function(){},clear:function(){},add:function(){},replace:function(){},touch:function(){}},p={set:function(b,c,d){if(b=j(b),d=a({force:!0},d),void 0===c)return this["delete"](b);var e=n.serialize(c),h=new g(e,d.exp);try{this.storage.setItem(b,n.serialize(h))}catch(i){f(i)?this.quotaExceedHandler(b,e,d,i):console.error(i)}return c},get:function(a){a=j(a);var b=null;try{b=n.deserialize(this.storage.getItem(a))}catch(c){return null}if(h(b)){if(i(b)){var d=b.v;return n.deserialize(d)}this["delete"](a)}return null},"delete":function(a){return a=j(a),this.storage.removeItem(a),a},deleteAllExpires:function(){for(var a=this.storage.length,b=[],c=this,d=0;a>d;d++){var e=this.storage.key(d),f=null;try{f=n.deserialize(this.storage.getItem(e))}catch(g){}if(null!==f&&void 0!==f.e){var h=(new Date).getTime();h>=f.e&&b.push(e)}}return b.forEach(function(a){c["delete"](a)}),b},clear:function(){this.storage.clear()},add:function(b,c,d){b=j(b),d=a({force:!0},d);try{var e=n.deserialize(this.storage.getItem(b));if(!h(e)||!i(e))return this.set(b,c,d),!0}catch(f){return this.set(b,c,d),!0}return!1},replace:function(a,b,c){a=j(a);var d=null;try{d=n.deserialize(this.storage.getItem(a))}catch(e){return!1}if(h(d)){if(i(d))return this.set(a,b,c),!0;this["delete"](a)}return!1},touch:function(a,b){a=j(a);var c=null;try{c=n.deserialize(this.storage.getItem(a))}catch(d){return!1}if(h(c)){if(i(c))return this.set(a,this.get(a),{exp:b}),!0;this["delete"](a)}return!1}};return k.prototype=p,k});

/***/ },

/***/ 459:
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * Vue.js v2.0.5
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	!function (e, t) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e.Vue = t();
	}(undefined, function () {
	  "use strict";
	  function e(e) {
	    return null == e ? "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? JSON.stringify(e, null, 2) : String(e);
	  }function t(e) {
	    var t = parseFloat(e, 10);return t || 0 === t ? t : e;
	  }function n(e, t) {
	    for (var n = Object.create(null), r = e.split(","), i = 0; i < r.length; i++) {
	      n[r[i]] = !0;
	    }return t ? function (e) {
	      return n[e.toLowerCase()];
	    } : function (e) {
	      return n[e];
	    };
	  }function r(e, t) {
	    if (e.length) {
	      var n = e.indexOf(t);if (n > -1) return e.splice(n, 1);
	    }
	  }function i(e, t) {
	    return Er.call(e, t);
	  }function o(e) {
	    return "string" == typeof e || "number" == typeof e;
	  }function a(e) {
	    var t = Object.create(null);return function (n) {
	      var r = t[n];return r || (t[n] = e(n));
	    };
	  }function s(e, t) {
	    function n(n) {
	      var r = arguments.length;return r ? r > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t);
	    }return n._length = e.length, n;
	  }function c(e, t) {
	    t = t || 0;for (var n = e.length - t, r = new Array(n); n--;) {
	      r[n] = e[n + t];
	    }return r;
	  }function u(e, t) {
	    for (var n in t) {
	      e[n] = t[n];
	    }return e;
	  }function l(e) {
	    return null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
	  }function f(e) {
	    return Pr.call(e) === Rr;
	  }function d(e) {
	    for (var t = {}, n = 0; n < e.length; n++) {
	      e[n] && u(t, e[n]);
	    }return t;
	  }function p() {}function v(e) {
	    return e.reduce(function (e, t) {
	      return e.concat(t.staticKeys || []);
	    }, []).join(",");
	  }function h(e, t) {
	    return e == t || !(!l(e) || !l(t)) && JSON.stringify(e) === JSON.stringify(t);
	  }function m(e, t) {
	    for (var n = 0; n < e.length; n++) {
	      if (h(e[n], t)) return n;
	    }return -1;
	  }function g(e) {
	    var t = (e + "").charCodeAt(0);return 36 === t || 95 === t;
	  }function y(e, t, n, r) {
	    Object.defineProperty(e, t, { value: n, enumerable: !!r, writable: !0, configurable: !0 });
	  }function _(e) {
	    if (!Fr.test(e)) {
	      var t = e.split(".");return function (e) {
	        for (var n = 0; n < t.length; n++) {
	          if (!e) return;e = e[t[n]];
	        }return e;
	      };
	    }
	  }function b(e) {
	    return (/native code/.test(e.toString())
	    );
	  }function $(e) {
	    Qr.target && Xr.push(Qr.target), Qr.target = e;
	  }function w() {
	    Qr.target = Xr.pop();
	  }function C() {
	    ei.length = 0, ti = {}, ni = ri = !1;
	  }function x() {
	    for (ri = !0, ei.sort(function (e, t) {
	      return e.id - t.id;
	    }), ii = 0; ii < ei.length; ii++) {
	      var e = ei[ii],
	          t = e.id;ti[t] = null, e.run();
	    }Zr && Br.devtools && Zr.emit("flush"), C();
	  }function k(e) {
	    var t = e.id;if (null == ti[t]) {
	      if (ti[t] = !0, ri) {
	        for (var n = ei.length - 1; n >= 0 && ei[n].id > e.id;) {
	          n--;
	        }ei.splice(Math.max(n, ii) + 1, 0, e);
	      } else ei.push(e);ni || (ni = !0, Gr(x));
	    }
	  }function A(e) {
	    si.clear(), O(e, si);
	  }function O(e, t) {
	    var n,
	        r,
	        i = Array.isArray(e);if ((i || l(e)) && Object.isExtensible(e)) {
	      if (e.__ob__) {
	        var o = e.__ob__.dep.id;if (t.has(o)) return;t.add(o);
	      }if (i) for (n = e.length; n--;) {
	        O(e[n], t);
	      } else for (r = Object.keys(e), n = r.length; n--;) {
	        O(e[r[n]], t);
	      }
	    }
	  }function T(e, t) {
	    e.__proto__ = t;
	  }function S(e, t, n) {
	    for (var r = 0, i = n.length; r < i; r++) {
	      var o = n[r];y(e, o, t[o]);
	    }
	  }function E(e) {
	    if (l(e)) {
	      var t;return i(e, "__ob__") && e.__ob__ instanceof di ? t = e.__ob__ : fi.shouldConvert && !Br._isServer && (Array.isArray(e) || f(e)) && Object.isExtensible(e) && !e._isVue && (t = new di(e)), t;
	    }
	  }function j(e, t, n, r) {
	    var i = new Qr(),
	        o = Object.getOwnPropertyDescriptor(e, t);if (!o || o.configurable !== !1) {
	      var a = o && o.get,
	          s = o && o.set,
	          c = E(n);Object.defineProperty(e, t, { enumerable: !0, configurable: !0, get: function get() {
	          var t = a ? a.call(e) : n;return Qr.target && (i.depend(), c && c.dep.depend(), Array.isArray(t) && D(t)), t;
	        }, set: function set(t) {
	          var r = a ? a.call(e) : n;t !== r && (s ? s.call(e, t) : n = t, c = E(t), i.notify());
	        } });
	    }
	  }function L(e, t, n) {
	    if (Array.isArray(e)) return e.length = Math.max(e.length, t), e.splice(t, 1, n), n;if (i(e, t)) return void (e[t] = n);var r = e.__ob__;if (!(e._isVue || r && r.vmCount)) return r ? (j(r.value, t, n), r.dep.notify(), n) : void (e[t] = n);
	  }function N(e, t) {
	    var n = e.__ob__;e._isVue || n && n.vmCount || i(e, t) && (delete e[t], n && n.dep.notify());
	  }function D(e) {
	    for (var t = void 0, n = 0, r = e.length; n < r; n++) {
	      t = e[n], t && t.__ob__ && t.__ob__.dep.depend(), Array.isArray(t) && D(t);
	    }
	  }function M(e) {
	    e._watchers = [], P(e), R(e), I(e), F(e), H(e);
	  }function P(e) {
	    var t = e.$options.props;if (t) {
	      var n = e.$options.propsData || {},
	          r = e.$options._propKeys = Object.keys(t),
	          i = !e.$parent;fi.shouldConvert = i;for (var o = function o(i) {
	        var o = r[i];j(e, o, De(o, t, n, e));
	      }, a = 0; a < r.length; a++) {
	        o(a);
	      }fi.shouldConvert = !0;
	    }
	  }function R(e) {
	    var t = e.$options.data;t = e._data = "function" == typeof t ? t.call(e) : t || {}, f(t) || (t = {});for (var n = Object.keys(t), r = e.$options.props, o = n.length; o--;) {
	      r && i(r, n[o]) || V(e, n[o]);
	    }E(t), t.__ob__ && t.__ob__.vmCount++;
	  }function I(e) {
	    var t = e.$options.computed;if (t) for (var n in t) {
	      var r = t[n];"function" == typeof r ? (pi.get = B(r, e), pi.set = p) : (pi.get = r.get ? r.cache !== !1 ? B(r.get, e) : s(r.get, e) : p, pi.set = r.set ? s(r.set, e) : p), Object.defineProperty(e, n, pi);
	    }
	  }function B(e, t) {
	    var n = new ai(t, e, p, { lazy: !0 });return function () {
	      return n.dirty && n.evaluate(), Qr.target && n.depend(), n.value;
	    };
	  }function F(e) {
	    var t = e.$options.methods;if (t) for (var n in t) {
	      e[n] = null == t[n] ? p : s(t[n], e);
	    }
	  }function H(e) {
	    var t = e.$options.watch;if (t) for (var n in t) {
	      var r = t[n];if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
	        U(e, n, r[i]);
	      } else U(e, n, r);
	    }
	  }function U(e, t, n) {
	    var r;f(n) && (r = n, n = n.handler), "string" == typeof n && (n = e[n]), e.$watch(t, n, r);
	  }function z(e) {
	    var t = {};t.get = function () {
	      return this._data;
	    }, Object.defineProperty(e.prototype, "$data", t), e.prototype.$set = L, e.prototype.$delete = N, e.prototype.$watch = function (e, t, n) {
	      var r = this;n = n || {}, n.user = !0;var i = new ai(r, e, t, n);return n.immediate && t.call(r, i.value), function () {
	        i.teardown();
	      };
	    };
	  }function V(e, t) {
	    g(t) || Object.defineProperty(e, t, { configurable: !0, enumerable: !0, get: function get() {
	        return e._data[t];
	      }, set: function set(n) {
	        e._data[t] = n;
	      } });
	  }function J(e) {
	    var t = new vi(e.tag, e.data, e.children, e.text, e.elm, e.ns, e.context, e.componentOptions);return t.isStatic = e.isStatic, t.key = e.key, t.isCloned = !0, t;
	  }function q(e) {
	    for (var t = new Array(e.length), n = 0; n < e.length; n++) {
	      t[n] = J(e[n]);
	    }return t;
	  }function K(e, t, n, r) {
	    r += t;var i = e.__injected || (e.__injected = {});if (!i[r]) {
	      i[r] = !0;var o = e[t];o ? e[t] = function () {
	        o.apply(this, arguments), n.apply(this, arguments);
	      } : e[t] = n;
	    }
	  }function W(e, t, n, r, i) {
	    var o, a, s, c, u, l;for (o in e) {
	      if (a = e[o], s = t[o], a) {
	        if (s) {
	          if (a !== s) if (Array.isArray(s)) {
	            s.length = a.length;for (var f = 0; f < s.length; f++) {
	              s[f] = a[f];
	            }e[o] = s;
	          } else s.fn = a, e[o] = s;
	        } else l = "!" === o.charAt(0), u = l ? o.slice(1) : o, Array.isArray(a) ? n(u, a.invoker = Z(a), l) : (a.invoker || (c = a, a = e[o] = {}, a.fn = c, a.invoker = G(a)), n(u, a.invoker, l));
	      } else ;
	    }for (o in t) {
	      e[o] || (u = "!" === o.charAt(0) ? o.slice(1) : o, r(u, t[o].invoker));
	    }
	  }function Z(e) {
	    return function (t) {
	      for (var n = arguments, r = 1 === arguments.length, i = 0; i < e.length; i++) {
	        r ? e[i](t) : e[i].apply(null, n);
	      }
	    };
	  }function G(e) {
	    return function (t) {
	      var n = 1 === arguments.length;n ? e.fn(t) : e.fn.apply(null, arguments);
	    };
	  }function Y(e, t, n) {
	    if (o(e)) return [Q(e)];if (Array.isArray(e)) {
	      for (var r = [], i = 0, a = e.length; i < a; i++) {
	        var s = e[i],
	            c = r[r.length - 1];Array.isArray(s) ? r.push.apply(r, Y(s, t, (n || "") + "_" + i)) : o(s) ? c && c.text ? c.text += String(s) : "" !== s && r.push(Q(s)) : s instanceof vi && (s.text && c && c.text ? c.text += s.text : (t && X(s, t), s.tag && null == s.key && null != n && (s.key = "__vlist" + n + "_" + i + "__"), r.push(s)));
	      }return r;
	    }
	  }function Q(e) {
	    return new vi(void 0, void 0, void 0, String(e));
	  }function X(e, t) {
	    if (e.tag && !e.ns && (e.ns = t, e.children)) for (var n = 0, r = e.children.length; n < r; n++) {
	      X(e.children[n], t);
	    }
	  }function ee(e) {
	    return e && e.filter(function (e) {
	      return e && e.componentOptions;
	    })[0];
	  }function te(e) {
	    var t = e.$options,
	        n = t.parent;if (n && !t.abstract) {
	      for (; n.$options.abstract && n.$parent;) {
	        n = n.$parent;
	      }n.$children.push(e);
	    }e.$parent = n, e.$root = n ? n.$root : e, e.$children = [], e.$refs = {}, e._watcher = null, e._inactive = !1, e._isMounted = !1, e._isDestroyed = !1, e._isBeingDestroyed = !1;
	  }function ne(e) {
	    e.prototype._mount = function (e, t) {
	      var n = this;return n.$el = e, n.$options.render || (n.$options.render = hi), re(n, "beforeMount"), n._watcher = new ai(n, function () {
	        n._update(n._render(), t);
	      }, p), t = !1, null == n.$vnode && (n._isMounted = !0, re(n, "mounted")), n;
	    }, e.prototype._update = function (e, t) {
	      var n = this;n._isMounted && re(n, "beforeUpdate");var r = n.$el,
	          i = mi;mi = n;var o = n._vnode;n._vnode = e, o ? n.$el = n.__patch__(o, e) : n.$el = n.__patch__(n.$el, e, t), mi = i, r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el), n._isMounted && re(n, "updated");
	    }, e.prototype._updateFromParent = function (e, t, n, r) {
	      var i = this,
	          o = !(!i.$options._renderChildren && !r);if (i.$options._parentVnode = n, i.$options._renderChildren = r, e && i.$options.props) {
	        fi.shouldConvert = !1;for (var a = i.$options._propKeys || [], s = 0; s < a.length; s++) {
	          var c = a[s];i[c] = De(c, i.$options.props, e, i);
	        }fi.shouldConvert = !0, i.$options.propsData = e;
	      }if (t) {
	        var u = i.$options._parentListeners;i.$options._parentListeners = t, i._updateListeners(t, u);
	      }o && (i.$slots = be(r, i._renderContext), i.$forceUpdate());
	    }, e.prototype.$forceUpdate = function () {
	      var e = this;e._watcher && e._watcher.update();
	    }, e.prototype.$destroy = function () {
	      var e = this;if (!e._isBeingDestroyed) {
	        re(e, "beforeDestroy"), e._isBeingDestroyed = !0;var t = e.$parent;!t || t._isBeingDestroyed || e.$options.abstract || r(t.$children, e), e._watcher && e._watcher.teardown();for (var n = e._watchers.length; n--;) {
	          e._watchers[n].teardown();
	        }e._data.__ob__ && e._data.__ob__.vmCount--, e._isDestroyed = !0, re(e, "destroyed"), e.$off(), e.$el && (e.$el.__vue__ = null), e.__patch__(e._vnode, null);
	      }
	    };
	  }function re(e, t) {
	    var n = e.$options[t];if (n) for (var r = 0, i = n.length; r < i; r++) {
	      n[r].call(e);
	    }e.$emit("hook:" + t);
	  }function ie(e, t, n, r, i) {
	    if (e && (l(e) && (e = Ae.extend(e)), "function" == typeof e)) {
	      if (ke(e), !e.cid) if (e.resolved) e = e.resolved;else if (e = fe(e, function () {
	        n.$forceUpdate();
	      }), !e) return;t = t || {};var o = de(t, e);if (e.options.functional) return oe(e, o, t, n, r);var a = t.on;t.on = t.nativeOn, e.options.abstract && (t = {}), ve(t);var s = e.options.name || i,
	          c = new vi("vue-component-" + e.cid + (s ? "-" + s : ""), t, void 0, void 0, void 0, void 0, n, { Ctor: e, propsData: o, listeners: a, tag: i, children: r });return c;
	    }
	  }function oe(e, t, n, r, i) {
	    var o = {},
	        a = e.options.props;if (a) for (var c in a) {
	      o[c] = De(c, a, t);
	    }var u = e.options.render.call(null, s(me, { _self: Object.create(r) }), { props: o, data: n, parent: r, children: Y(i), slots: function slots() {
	        return be(i, r);
	      } });return u instanceof vi && (u.functionalContext = r, n.slot && ((u.data || (u.data = {})).slot = n.slot)), u;
	  }function ae(e, t) {
	    var n = e.componentOptions,
	        r = { _isComponent: !0, parent: t, propsData: n.propsData, _componentTag: n.tag, _parentVnode: e, _parentListeners: n.listeners, _renderChildren: n.children },
	        i = e.data.inlineTemplate;return i && (r.render = i.render, r.staticRenderFns = i.staticRenderFns), new n.Ctor(r);
	  }function se(e, t) {
	    if (!e.child || e.child._isDestroyed) {
	      var n = e.child = ae(e, mi);n.$mount(t ? e.elm : void 0, t);
	    }
	  }function ce(e, t) {
	    var n = t.componentOptions,
	        r = t.child = e.child;r._updateFromParent(n.propsData, n.listeners, t, n.children);
	  }function ue(e) {
	    e.child._isMounted || (e.child._isMounted = !0, re(e.child, "mounted")), e.data.keepAlive && (e.child._inactive = !1, re(e.child, "activated"));
	  }function le(e) {
	    e.child._isDestroyed || (e.data.keepAlive ? (e.child._inactive = !0, re(e.child, "deactivated")) : e.child.$destroy());
	  }function fe(e, t) {
	    if (!e.requested) {
	      e.requested = !0;var n = e.pendingCallbacks = [t],
	          r = !0,
	          i = function i(t) {
	        if (l(t) && (t = Ae.extend(t)), e.resolved = t, !r) for (var i = 0, o = n.length; i < o; i++) {
	          n[i](t);
	        }
	      },
	          o = function o(e) {},
	          a = e(i, o);return a && "function" == typeof a.then && !e.resolved && a.then(i, o), r = !1, e.resolved;
	    }e.pendingCallbacks.push(t);
	  }function de(e, t) {
	    var n = t.options.props;if (n) {
	      var r = {},
	          i = e.attrs,
	          o = e.props,
	          a = e.domProps;if (i || o || a) for (var s in n) {
	        var c = Mr(s);pe(r, o, s, c, !0) || pe(r, i, s, c) || pe(r, a, s, c);
	      }return r;
	    }
	  }function pe(e, t, n, r, o) {
	    if (t) {
	      if (i(t, n)) return e[n] = t[n], o || delete t[n], !0;if (i(t, r)) return e[n] = t[r], o || delete t[r], !0;
	    }return !1;
	  }function ve(e) {
	    e.hook || (e.hook = {});for (var t = 0; t < yi.length; t++) {
	      var n = yi[t],
	          r = e.hook[n],
	          i = gi[n];e.hook[n] = r ? he(i, r) : i;
	    }
	  }function he(e, t) {
	    return function (n, r) {
	      e(n, r), t(n, r);
	    };
	  }function me(e, t, n) {
	    return t && (Array.isArray(t) || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) && (n = t, t = void 0), ge(this._self, e, t, n);
	  }function ge(e, t, n, r) {
	    if (!n || !n.__ob__) {
	      if (!t) return hi();if ("string" == typeof t) {
	        var i,
	            o = Br.getTagNamespace(t);if (Br.isReservedTag(t)) return new vi(t, n, Y(r, o), void 0, void 0, o, e);if (i = Ne(e.$options, "components", t)) return ie(i, n, e, r, t);var a = "foreignObject" === t ? "xhtml" : o;return new vi(t, n, Y(r, a), void 0, void 0, o, e);
	      }return ie(t, n, e, r);
	    }
	  }function ye(e) {
	    e.$vnode = null, e._vnode = null, e._staticTrees = null, e._renderContext = e.$options._parentVnode && e.$options._parentVnode.context, e.$slots = be(e.$options._renderChildren, e._renderContext), e.$createElement = s(me, e), e.$options.el && e.$mount(e.$options.el);
	  }function _e(n) {
	    function r(e, t, n) {
	      if (Array.isArray(e)) for (var r = 0; r < e.length; r++) {
	        e[r] && "string" != typeof e[r] && i(e[r], t + "_" + r, n);
	      } else i(e, t, n);
	    }function i(e, t, n) {
	      e.isStatic = !0, e.key = t, e.isOnce = n;
	    }n.prototype.$nextTick = function (e) {
	      Gr(e, this);
	    }, n.prototype._render = function () {
	      var e = this,
	          t = e.$options,
	          n = t.render,
	          r = t.staticRenderFns,
	          i = t._parentVnode;if (e._isMounted) for (var o in e.$slots) {
	        e.$slots[o] = q(e.$slots[o]);
	      }r && !e._staticTrees && (e._staticTrees = []), e.$vnode = i;var a;try {
	        a = n.call(e._renderProxy, e.$createElement);
	      } catch (t) {
	        if (Br.errorHandler) Br.errorHandler.call(null, t, e);else {
	          if (Br._isServer) throw t;console.error(t);
	        }a = e._vnode;
	      }return a instanceof vi || (a = hi()), a.parent = i, a;
	    }, n.prototype._h = me, n.prototype._s = e, n.prototype._n = t, n.prototype._e = hi, n.prototype._q = h, n.prototype._i = m, n.prototype._m = function (e, t) {
	      var n = this._staticTrees[e];return n && !t ? Array.isArray(n) ? q(n) : J(n) : (n = this._staticTrees[e] = this.$options.staticRenderFns[e].call(this._renderProxy), r(n, "__static__" + e, !1), n);
	    }, n.prototype._o = function (e, t, n) {
	      return r(e, "__once__" + t + (n ? "_" + n : ""), !0), e;
	    };var o = function o(e) {
	      return e;
	    };n.prototype._f = function (e) {
	      return Ne(this.$options, "filters", e, !0) || o;
	    }, n.prototype._l = function (e, t) {
	      var n, r, i, o, a;if (Array.isArray(e)) for (n = new Array(e.length), r = 0, i = e.length; r < i; r++) {
	        n[r] = t(e[r], r);
	      } else if ("number" == typeof e) for (n = new Array(e), r = 0; r < e; r++) {
	        n[r] = t(r + 1, r);
	      } else if (l(e)) for (o = Object.keys(e), n = new Array(o.length), r = 0, i = o.length; r < i; r++) {
	        a = o[r], n[r] = t(e[a], a, r);
	      }return n;
	    }, n.prototype._t = function (e, t) {
	      var n = this.$slots[e];return n || t;
	    }, n.prototype._b = function (e, t, n) {
	      if (t) if (l(t)) {
	        Array.isArray(t) && (t = d(t));for (var r in t) {
	          if ("class" === r || "style" === r) e[r] = t[r];else {
	            var i = n || Br.mustUseProp(r) ? e.domProps || (e.domProps = {}) : e.attrs || (e.attrs = {});i[r] = t[r];
	          }
	        }
	      } else ;return e;
	    }, n.prototype._k = function (e) {
	      return Br.keyCodes[e];
	    };
	  }function be(e, t) {
	    var n = {};if (!e) return n;for (var r, i, o = Y(e) || [], a = [], s = 0, c = o.length; s < c; s++) {
	      if (i = o[s], (i.context === t || i.functionalContext === t) && i.data && (r = i.data.slot)) {
	        var u = n[r] || (n[r] = []);"template" === i.tag ? u.push.apply(u, i.children) : u.push(i);
	      } else a.push(i);
	    }return a.length && (1 !== a.length || " " !== a[0].text && !a[0].isComment) && (n.default = a), n;
	  }function $e(e) {
	    e._events = Object.create(null);var t = e.$options._parentListeners,
	        n = s(e.$on, e),
	        r = s(e.$off, e);e._updateListeners = function (t, i) {
	      W(t, i || {}, n, r, e);
	    }, t && e._updateListeners(t);
	  }function we(e) {
	    e.prototype.$on = function (e, t) {
	      var n = this;return (n._events[e] || (n._events[e] = [])).push(t), n;
	    }, e.prototype.$once = function (e, t) {
	      function n() {
	        r.$off(e, n), t.apply(r, arguments);
	      }var r = this;return n.fn = t, r.$on(e, n), r;
	    }, e.prototype.$off = function (e, t) {
	      var n = this;if (!arguments.length) return n._events = Object.create(null), n;var r = n._events[e];if (!r) return n;if (1 === arguments.length) return n._events[e] = null, n;for (var i, o = r.length; o--;) {
	        if (i = r[o], i === t || i.fn === t) {
	          r.splice(o, 1);break;
	        }
	      }return n;
	    }, e.prototype.$emit = function (e) {
	      var t = this,
	          n = t._events[e];if (n) {
	        n = n.length > 1 ? c(n) : n;for (var r = c(arguments, 1), i = 0, o = n.length; i < o; i++) {
	          n[i].apply(t, r);
	        }
	      }return t;
	    };
	  }function Ce(e) {
	    e.prototype._init = function (e) {
	      var t = this;t._uid = _i++, t._isVue = !0, e && e._isComponent ? xe(t, e) : t.$options = Le(ke(t.constructor), e || {}, t), t._renderProxy = t, t._self = t, te(t), $e(t), re(t, "beforeCreate"), M(t), re(t, "created"), ye(t);
	    };
	  }function xe(e, t) {
	    var n = e.$options = Object.create(e.constructor.options);n.parent = t.parent, n.propsData = t.propsData, n._parentVnode = t._parentVnode, n._parentListeners = t._parentListeners, n._renderChildren = t._renderChildren, n._componentTag = t._componentTag, t.render && (n.render = t.render, n.staticRenderFns = t.staticRenderFns);
	  }function ke(e) {
	    var t = e.options;if (e.super) {
	      var n = e.super.options,
	          r = e.superOptions,
	          i = e.extendOptions;n !== r && (e.superOptions = n, i.render = t.render, i.staticRenderFns = t.staticRenderFns, t = e.options = Le(n, i), t.name && (t.components[t.name] = e));
	    }return t;
	  }function Ae(e) {
	    this._init(e);
	  }function Oe(e, t) {
	    var n, r, o;for (n in t) {
	      r = e[n], o = t[n], i(e, n) ? l(r) && l(o) && Oe(r, o) : L(e, n, o);
	    }return e;
	  }function Te(e, t) {
	    return t ? e ? e.concat(t) : Array.isArray(t) ? t : [t] : e;
	  }function Se(e, t) {
	    var n = Object.create(e || null);return t ? u(n, t) : n;
	  }function Ee(e) {
	    var t = e.props;if (t) {
	      var n,
	          r,
	          i,
	          o = {};if (Array.isArray(t)) for (n = t.length; n--;) {
	        r = t[n], "string" == typeof r && (i = Lr(r), o[i] = { type: null });
	      } else if (f(t)) for (var a in t) {
	        r = t[a], i = Lr(a), o[i] = f(r) ? r : { type: r };
	      }e.props = o;
	    }
	  }function je(e) {
	    var t = e.directives;if (t) for (var n in t) {
	      var r = t[n];"function" == typeof r && (t[n] = { bind: r, update: r });
	    }
	  }function Le(e, t, n) {
	    function r(r) {
	      var i = wi[r] || Ci;l[r] = i(e[r], t[r], n, r);
	    }Ee(t), je(t);var o = t.extends;if (o && (e = "function" == typeof o ? Le(e, o.options, n) : Le(e, o, n)), t.mixins) for (var a = 0, s = t.mixins.length; a < s; a++) {
	      var c = t.mixins[a];c.prototype instanceof Ae && (c = c.options), e = Le(e, c, n);
	    }var u,
	        l = {};for (u in e) {
	      r(u);
	    }for (u in t) {
	      i(e, u) || r(u);
	    }return l;
	  }function Ne(e, t, n, r) {
	    if ("string" == typeof n) {
	      var i = e[t],
	          o = i[n] || i[Lr(n)] || i[Nr(Lr(n))];return o;
	    }
	  }function De(e, t, n, r) {
	    var o = t[e],
	        a = !i(n, e),
	        s = n[e];if (Re(o.type) && (a && !i(o, "default") ? s = !1 : "" !== s && s !== Mr(e) || (s = !0)), void 0 === s) {
	      s = Me(r, o, e);var c = fi.shouldConvert;fi.shouldConvert = !0, E(s), fi.shouldConvert = c;
	    }return s;
	  }function Me(e, t, n) {
	    if (i(t, "default")) {
	      var r = t.default;return l(r), e && e.$options.propsData && void 0 === e.$options.propsData[n] && void 0 !== e[n] ? e[n] : "function" == typeof r && t.type !== Function ? r.call(e) : r;
	    }
	  }function Pe(e) {
	    var t = e && e.toString().match(/^\s*function (\w+)/);return t && t[1];
	  }function Re(e) {
	    if (!Array.isArray(e)) return "Boolean" === Pe(e);for (var t = 0, n = e.length; t < n; t++) {
	      if ("Boolean" === Pe(e[t])) return !0;
	    }return !1;
	  }function Ie(e) {
	    e.use = function (e) {
	      if (!e.installed) {
	        var t = c(arguments, 1);return t.unshift(this), "function" == typeof e.install ? e.install.apply(e, t) : e.apply(null, t), e.installed = !0, this;
	      }
	    };
	  }function Be(e) {
	    e.mixin = function (t) {
	      e.options = Le(e.options, t);
	    };
	  }function Fe(e) {
	    e.cid = 0;var t = 1;e.extend = function (e) {
	      e = e || {};var n = this,
	          r = 0 === n.cid;if (r && e._Ctor) return e._Ctor;var i = e.name || n.options.name,
	          o = function o(e) {
	        this._init(e);
	      };return o.prototype = Object.create(n.prototype), o.prototype.constructor = o, o.cid = t++, o.options = Le(n.options, e), o.super = n, o.extend = n.extend, Br._assetTypes.forEach(function (e) {
	        o[e] = n[e];
	      }), i && (o.options.components[i] = o), o.superOptions = n.options, o.extendOptions = e, r && (e._Ctor = o), o;
	    };
	  }function He(e) {
	    Br._assetTypes.forEach(function (t) {
	      e[t] = function (n, r) {
	        return r ? ("component" === t && f(r) && (r.name = r.name || n, r = e.extend(r)), "directive" === t && "function" == typeof r && (r = { bind: r, update: r }), this.options[t + "s"][n] = r, r) : this.options[t + "s"][n];
	      };
	    });
	  }function Ue(e) {
	    var t = {};t.get = function () {
	      return Br;
	    }, Object.defineProperty(e, "config", t), e.util = xi, e.set = L, e.delete = N, e.nextTick = Gr, e.options = Object.create(null), Br._assetTypes.forEach(function (t) {
	      e.options[t + "s"] = Object.create(null);
	    }), u(e.options.components, Ai), Ie(e), Be(e), Fe(e), He(e);
	  }function ze(e) {
	    for (var t = e.data, n = e, r = e; r.child;) {
	      r = r.child._vnode, r.data && (t = Ve(r.data, t));
	    }for (; n = n.parent;) {
	      n.data && (t = Ve(t, n.data));
	    }return Je(t);
	  }function Ve(e, t) {
	    return { staticClass: qe(e.staticClass, t.staticClass), class: e.class ? [e.class, t.class] : t.class };
	  }function Je(e) {
	    var t = e.class,
	        n = e.staticClass;return n || t ? qe(n, Ke(t)) : "";
	  }function qe(e, t) {
	    return e ? t ? e + " " + t : e : t || "";
	  }function Ke(e) {
	    var t = "";if (!e) return t;if ("string" == typeof e) return e;if (Array.isArray(e)) {
	      for (var n, r = 0, i = e.length; r < i; r++) {
	        e[r] && (n = Ke(e[r])) && (t += n + " ");
	      }return t.slice(0, -1);
	    }if (l(e)) {
	      for (var o in e) {
	        e[o] && (t += o + " ");
	      }return t.slice(0, -1);
	    }return t;
	  }function We(e) {
	    return Fi(e) ? "svg" : "math" === e ? "math" : void 0;
	  }function Ze(e) {
	    if (!Ur) return !0;if (Ui(e)) return !1;if (e = e.toLowerCase(), null != zi[e]) return zi[e];var t = document.createElement(e);return e.indexOf("-") > -1 ? zi[e] = t.constructor === window.HTMLUnknownElement || t.constructor === window.HTMLElement : zi[e] = /HTMLUnknownElement/.test(t.toString());
	  }function Ge(e) {
	    if ("string" == typeof e) {
	      if (e = document.querySelector(e), !e) return document.createElement("div");
	    }return e;
	  }function Ye(e, t) {
	    var n = document.createElement(e);return "select" !== e ? n : (t.data && t.data.attrs && "multiple" in t.data.attrs && n.setAttribute("multiple", "multiple"), n);
	  }function Qe(e, t) {
	    return document.createElementNS(Mi[e], t);
	  }function Xe(e) {
	    return document.createTextNode(e);
	  }function et(e) {
	    return document.createComment(e);
	  }function tt(e, t, n) {
	    e.insertBefore(t, n);
	  }function nt(e, t) {
	    e.removeChild(t);
	  }function rt(e, t) {
	    e.appendChild(t);
	  }function it(e) {
	    return e.parentNode;
	  }function ot(e) {
	    return e.nextSibling;
	  }function at(e) {
	    return e.tagName;
	  }function st(e, t) {
	    e.textContent = t;
	  }function ct(e) {
	    return e.childNodes;
	  }function ut(e, t, n) {
	    e.setAttribute(t, n);
	  }function lt(e, t) {
	    var n = e.data.ref;if (n) {
	      var i = e.context,
	          o = e.child || e.elm,
	          a = i.$refs;t ? Array.isArray(a[n]) ? r(a[n], o) : a[n] === o && (a[n] = void 0) : e.data.refInFor ? Array.isArray(a[n]) ? a[n].push(o) : a[n] = [o] : a[n] = o;
	    }
	  }function ft(e) {
	    return null == e;
	  }function dt(e) {
	    return null != e;
	  }function pt(e, t) {
	    return e.key === t.key && e.tag === t.tag && e.isComment === t.isComment && !e.data == !t.data;
	  }function vt(e, t, n) {
	    var r,
	        i,
	        o = {};for (r = t; r <= n; ++r) {
	      i = e[r].key, dt(i) && (o[i] = r);
	    }return o;
	  }function ht(e) {
	    function t(e) {
	      return new vi(C.tagName(e).toLowerCase(), {}, [], void 0, e);
	    }function n(e, t) {
	      function n() {
	        0 === --n.listeners && r(e);
	      }return n.listeners = t, n;
	    }function r(e) {
	      var t = C.parentNode(e);t && C.removeChild(t, e);
	    }function i(e, t, n) {
	      var r,
	          i = e.data;if (e.isRootInsert = !n, dt(i) && (dt(r = i.hook) && dt(r = r.init) && r(e), dt(r = e.child))) return u(e, t), e.elm;var o = e.children,
	          s = e.tag;return dt(s) ? (e.elm = e.ns ? C.createElementNS(e.ns, s) : C.createElement(s, e), l(e), a(e, o, t), dt(i) && c(e, t)) : e.isComment ? e.elm = C.createComment(e.text) : e.elm = C.createTextNode(e.text), e.elm;
	    }function a(e, t, n) {
	      if (Array.isArray(t)) for (var r = 0; r < t.length; ++r) {
	        C.appendChild(e.elm, i(t[r], n, !0));
	      } else o(e.text) && C.appendChild(e.elm, C.createTextNode(e.text));
	    }function s(e) {
	      for (; e.child;) {
	        e = e.child._vnode;
	      }return dt(e.tag);
	    }function c(e, t) {
	      for (var n = 0; n < $.create.length; ++n) {
	        $.create[n](qi, e);
	      }_ = e.data.hook, dt(_) && (_.create && _.create(qi, e), _.insert && t.push(e));
	    }function u(e, t) {
	      e.data.pendingInsert && t.push.apply(t, e.data.pendingInsert), e.elm = e.child.$el, s(e) ? (c(e, t), l(e)) : (lt(e), t.push(e));
	    }function l(e) {
	      var t;dt(t = e.context) && dt(t = t.$options._scopeId) && C.setAttribute(e.elm, t, ""), dt(t = mi) && t !== e.context && dt(t = t.$options._scopeId) && C.setAttribute(e.elm, t, "");
	    }function f(e, t, n, r, o, a) {
	      for (; r <= o; ++r) {
	        C.insertBefore(e, i(n[r], a), t);
	      }
	    }function d(e) {
	      var t,
	          n,
	          r = e.data;if (dt(r)) for (dt(t = r.hook) && dt(t = t.destroy) && t(e), t = 0; t < $.destroy.length; ++t) {
	        $.destroy[t](e);
	      }if (dt(t = e.children)) for (n = 0; n < e.children.length; ++n) {
	        d(e.children[n]);
	      }
	    }function p(e, t, n, r) {
	      for (; n <= r; ++n) {
	        var i = t[n];dt(i) && (dt(i.tag) ? (v(i), d(i)) : C.removeChild(e, i.elm));
	      }
	    }function v(e, t) {
	      if (t || dt(e.data)) {
	        var i = $.remove.length + 1;for (t ? t.listeners += i : t = n(e.elm, i), dt(_ = e.child) && dt(_ = _._vnode) && dt(_.data) && v(_, t), _ = 0; _ < $.remove.length; ++_) {
	          $.remove[_](e, t);
	        }dt(_ = e.data.hook) && dt(_ = _.remove) ? _(e, t) : t();
	      } else r(e.elm);
	    }function h(e, t, n, r, o) {
	      for (var a, s, c, u, l = 0, d = 0, v = t.length - 1, h = t[0], g = t[v], y = n.length - 1, _ = n[0], b = n[y], $ = !o; l <= v && d <= y;) {
	        ft(h) ? h = t[++l] : ft(g) ? g = t[--v] : pt(h, _) ? (m(h, _, r), h = t[++l], _ = n[++d]) : pt(g, b) ? (m(g, b, r), g = t[--v], b = n[--y]) : pt(h, b) ? (m(h, b, r), $ && C.insertBefore(e, h.elm, C.nextSibling(g.elm)), h = t[++l], b = n[--y]) : pt(g, _) ? (m(g, _, r), $ && C.insertBefore(e, g.elm, h.elm), g = t[--v], _ = n[++d]) : (ft(a) && (a = vt(t, l, v)), s = dt(_.key) ? a[_.key] : null, ft(s) ? (C.insertBefore(e, i(_, r), h.elm), _ = n[++d]) : (c = t[s], c.tag !== _.tag ? (C.insertBefore(e, i(_, r), h.elm), _ = n[++d]) : (m(c, _, r), t[s] = void 0, $ && C.insertBefore(e, _.elm, h.elm), _ = n[++d])));
	      }l > v ? (u = ft(n[y + 1]) ? null : n[y + 1].elm, f(e, u, n, d, y, r)) : d > y && p(e, t, l, v);
	    }function m(e, t, n, r) {
	      if (e !== t) {
	        if (t.isStatic && e.isStatic && t.key === e.key && (t.isCloned || t.isOnce)) return void (t.elm = e.elm);var i,
	            o = t.data,
	            a = dt(o);a && dt(i = o.hook) && dt(i = i.prepatch) && i(e, t);var c = t.elm = e.elm,
	            u = e.children,
	            l = t.children;if (a && s(t)) {
	          for (i = 0; i < $.update.length; ++i) {
	            $.update[i](e, t);
	          }dt(i = o.hook) && dt(i = i.update) && i(e, t);
	        }ft(t.text) ? dt(u) && dt(l) ? u !== l && h(c, u, l, n, r) : dt(l) ? (dt(e.text) && C.setTextContent(c, ""), f(c, null, l, 0, l.length - 1, n)) : dt(u) ? p(c, u, 0, u.length - 1) : dt(e.text) && C.setTextContent(c, "") : e.text !== t.text && C.setTextContent(c, t.text), a && dt(i = o.hook) && dt(i = i.postpatch) && i(e, t);
	      }
	    }function g(e, t, n) {
	      if (n && e.parent) e.parent.data.pendingInsert = t;else for (var r = 0; r < t.length; ++r) {
	        t[r].data.hook.insert(t[r]);
	      }
	    }function y(e, t, n) {
	      t.elm = e;var r = t.tag,
	          i = t.data,
	          o = t.children;if (dt(i) && (dt(_ = i.hook) && dt(_ = _.init) && _(t, !0), dt(_ = t.child))) return u(t, n), !0;if (dt(r)) {
	        if (dt(o)) {
	          var s = C.childNodes(e);if (s.length) {
	            var l = !0;if (s.length !== o.length) l = !1;else for (var f = 0; f < o.length; f++) {
	              if (!y(s[f], o[f], n)) {
	                l = !1;break;
	              }
	            }if (!l) return !1;
	          } else a(t, o, n);
	        }dt(i) && c(t, n);
	      }return !0;
	    }var _,
	        b,
	        $ = {},
	        w = e.modules,
	        C = e.nodeOps;for (_ = 0; _ < Ki.length; ++_) {
	      for ($[Ki[_]] = [], b = 0; b < w.length; ++b) {
	        void 0 !== w[b][Ki[_]] && $[Ki[_]].push(w[b][Ki[_]]);
	      }
	    }return function (e, n, r, o) {
	      if (!n) return void (e && d(e));var a,
	          c,
	          u = !1,
	          l = [];if (e) {
	        var f = dt(e.nodeType);if (!f && pt(e, n)) m(e, n, l, o);else {
	          if (f) {
	            if (1 === e.nodeType && e.hasAttribute("server-rendered") && (e.removeAttribute("server-rendered"), r = !0), r && y(e, n, l)) return g(n, l, !0), e;e = t(e);
	          }if (a = e.elm, c = C.parentNode(a), i(n, l), n.parent && (n.parent.elm = n.elm, s(n))) for (var v = 0; v < $.create.length; ++v) {
	            $.create[v](qi, n.parent);
	          }null !== c ? (C.insertBefore(c, n.elm, C.nextSibling(a)), p(c, [e], 0, 0)) : dt(e.tag) && d(e);
	        }
	      } else u = !0, i(n, l);return g(n, l, u), n.elm;
	    };
	  }function mt(e, t) {
	    if (e.data.directives || t.data.directives) {
	      var n,
	          r,
	          i,
	          o = e === qi,
	          a = gt(e.data.directives, e.context),
	          s = gt(t.data.directives, t.context),
	          c = [],
	          u = [];for (n in s) {
	        r = a[n], i = s[n], r ? (i.oldValue = r.value, _t(i, "update", t, e), i.def && i.def.componentUpdated && u.push(i)) : (_t(i, "bind", t, e), i.def && i.def.inserted && c.push(i));
	      }if (c.length) {
	        var l = function l() {
	          c.forEach(function (n) {
	            _t(n, "inserted", t, e);
	          });
	        };o ? K(t.data.hook || (t.data.hook = {}), "insert", l, "dir-insert") : l();
	      }if (u.length && K(t.data.hook || (t.data.hook = {}), "postpatch", function () {
	        u.forEach(function (n) {
	          _t(n, "componentUpdated", t, e);
	        });
	      }, "dir-postpatch"), !o) for (n in a) {
	        s[n] || _t(a[n], "unbind", e);
	      }
	    }
	  }function gt(e, t) {
	    var n = Object.create(null);if (!e) return n;var r, i;for (r = 0; r < e.length; r++) {
	      i = e[r], i.modifiers || (i.modifiers = Zi), n[yt(i)] = i, i.def = Ne(t.$options, "directives", i.name, !0);
	    }return n;
	  }function yt(e) {
	    return e.rawName || e.name + "." + Object.keys(e.modifiers || {}).join(".");
	  }function _t(e, t, n, r) {
	    var i = e.def && e.def[t];i && i(n.elm, e, n, r);
	  }function bt(e, t) {
	    if (e.data.attrs || t.data.attrs) {
	      var n,
	          r,
	          i,
	          o = t.elm,
	          a = e.data.attrs || {},
	          s = t.data.attrs || {};s.__ob__ && (s = t.data.attrs = u({}, s));for (n in s) {
	        r = s[n], i = a[n], i !== r && $t(o, n, r);
	      }for (n in a) {
	        null == s[n] && (Li(n) ? o.removeAttributeNS(ji, Ni(n)) : Si(n) || o.removeAttribute(n));
	      }
	    }
	  }function $t(e, t, n) {
	    Ei(t) ? Di(n) ? e.removeAttribute(t) : e.setAttribute(t, t) : Si(t) ? e.setAttribute(t, Di(n) || "false" === n ? "false" : "true") : Li(t) ? Di(n) ? e.removeAttributeNS(ji, Ni(t)) : e.setAttributeNS(ji, t, n) : Di(n) ? e.removeAttribute(t) : e.setAttribute(t, n);
	  }function wt(e, t) {
	    var n = t.elm,
	        r = t.data,
	        i = e.data;if (r.staticClass || r.class || i && (i.staticClass || i.class)) {
	      var o = ze(t),
	          a = n._transitionClasses;a && (o = qe(o, Ke(a))), o !== n._prevClass && (n.setAttribute("class", o), n._prevClass = o);
	    }
	  }function Ct(e, t) {
	    if (e.data.on || t.data.on) {
	      var n = t.data.on || {},
	          r = e.data.on || {},
	          i = t.elm._v_add || (t.elm._v_add = function (e, n, r) {
	        t.elm.addEventListener(e, n, r);
	      }),
	          o = t.elm._v_remove || (t.elm._v_remove = function (e, n) {
	        t.elm.removeEventListener(e, n);
	      });W(n, r, i, o, t.context);
	    }
	  }function xt(e, t) {
	    if (e.data.domProps || t.data.domProps) {
	      var n,
	          r,
	          i = t.elm,
	          o = e.data.domProps || {},
	          a = t.data.domProps || {};a.__ob__ && (a = t.data.domProps = u({}, a));for (n in o) {
	        null == a[n] && (i[n] = "");
	      }for (n in a) {
	        if ("textContent" !== n && "innerHTML" !== n || !t.children || (t.children.length = 0), r = a[n], "value" === n) {
	          i._value = r;var s = null == r ? "" : String(r);i.value === s || i.composing || (i.value = s);
	        } else i[n] = r;
	      }
	    }
	  }function kt(e, t) {
	    if (e.data && e.data.style || t.data.style) {
	      var n,
	          r,
	          i = t.elm,
	          o = e.data.style || {},
	          a = t.data.style || {};if ("string" == typeof a) return void (i.style.cssText = a);var s = a.__ob__;Array.isArray(a) && (a = t.data.style = d(a)), s && (a = t.data.style = u({}, a));for (r in o) {
	        null == a[r] && no(i, r, "");
	      }for (r in a) {
	        n = a[r], n !== o[r] && no(i, r, null == n ? "" : n);
	      }
	    }
	  }function At(e, t) {
	    if (t && t.trim()) if (e.classList) t.indexOf(" ") > -1 ? t.split(/\s+/).forEach(function (t) {
	      return e.classList.add(t);
	    }) : e.classList.add(t);else {
	      var n = " " + e.getAttribute("class") + " ";n.indexOf(" " + t + " ") < 0 && e.setAttribute("class", (n + t).trim());
	    }
	  }function Ot(e, t) {
	    if (t && t.trim()) if (e.classList) t.indexOf(" ") > -1 ? t.split(/\s+/).forEach(function (t) {
	      return e.classList.remove(t);
	    }) : e.classList.remove(t);else {
	      for (var n = " " + e.getAttribute("class") + " ", r = " " + t + " "; n.indexOf(r) >= 0;) {
	        n = n.replace(r, " ");
	      }e.setAttribute("class", n.trim());
	    }
	  }function Tt(e) {
	    vo(function () {
	      vo(e);
	    });
	  }function St(e, t) {
	    (e._transitionClasses || (e._transitionClasses = [])).push(t), At(e, t);
	  }function Et(e, t) {
	    e._transitionClasses && r(e._transitionClasses, t), Ot(e, t);
	  }function jt(e, t, n) {
	    var r = Lt(e, t),
	        i = r.type,
	        o = r.timeout,
	        a = r.propCount;if (!i) return n();var s = i === so ? lo : po,
	        c = 0,
	        u = function u() {
	      e.removeEventListener(s, l), n();
	    },
	        l = function l(t) {
	      t.target === e && ++c >= a && u();
	    };setTimeout(function () {
	      c < a && u();
	    }, o + 1), e.addEventListener(s, l);
	  }function Lt(e, t) {
	    var n,
	        r = window.getComputedStyle(e),
	        i = r[uo + "Delay"].split(", "),
	        o = r[uo + "Duration"].split(", "),
	        a = Nt(i, o),
	        s = r[fo + "Delay"].split(", "),
	        c = r[fo + "Duration"].split(", "),
	        u = Nt(s, c),
	        l = 0,
	        f = 0;t === so ? a > 0 && (n = so, l = a, f = o.length) : t === co ? u > 0 && (n = co, l = u, f = c.length) : (l = Math.max(a, u), n = l > 0 ? a > u ? so : co : null, f = n ? n === so ? o.length : c.length : 0);var d = n === so && ho.test(r[uo + "Property"]);return { type: n, timeout: l, propCount: f, hasTransform: d };
	  }function Nt(e, t) {
	    for (; e.length < t.length;) {
	      e = e.concat(e);
	    }return Math.max.apply(null, t.map(function (t, n) {
	      return Dt(t) + Dt(e[n]);
	    }));
	  }function Dt(e) {
	    return 1e3 * Number(e.slice(0, -1));
	  }function Mt(e) {
	    var t = e.elm;t._leaveCb && (t._leaveCb.cancelled = !0, t._leaveCb());var n = Rt(e.data.transition);if (n && !t._enterCb && 1 === t.nodeType) {
	      var r = n.css,
	          i = n.type,
	          o = n.enterClass,
	          a = n.enterActiveClass,
	          s = n.appearClass,
	          c = n.appearActiveClass,
	          u = n.beforeEnter,
	          l = n.enter,
	          f = n.afterEnter,
	          d = n.enterCancelled,
	          p = n.beforeAppear,
	          v = n.appear,
	          h = n.afterAppear,
	          m = n.appearCancelled,
	          g = mi.$vnode,
	          y = g && g.parent ? g.parent.context : mi,
	          _ = !y._isMounted || !e.isRootInsert;if (!_ || v || "" === v) {
	        var b = _ ? s : o,
	            $ = _ ? c : a,
	            w = _ ? p || u : u,
	            C = _ && "function" == typeof v ? v : l,
	            x = _ ? h || f : f,
	            k = _ ? m || d : d,
	            A = r !== !1 && !Jr,
	            O = C && (C._length || C.length) > 1,
	            T = t._enterCb = It(function () {
	          A && Et(t, $), T.cancelled ? (A && Et(t, b), k && k(t)) : x && x(t), t._enterCb = null;
	        });e.data.show || K(e.data.hook || (e.data.hook = {}), "insert", function () {
	          var n = t.parentNode,
	              r = n && n._pending && n._pending[e.key];r && r.tag === e.tag && r.elm._leaveCb && r.elm._leaveCb(), C && C(t, T);
	        }, "transition-insert"), w && w(t), A && (St(t, b), St(t, $), Tt(function () {
	          Et(t, b), T.cancelled || O || jt(t, i, T);
	        })), e.data.show && C && C(t, T), A || O || T();
	      }
	    }
	  }function Pt(e, t) {
	    function n() {
	      m.cancelled || (e.data.show || ((r.parentNode._pending || (r.parentNode._pending = {}))[e.key] = e), u && u(r), v && (St(r, s), St(r, c), Tt(function () {
	        Et(r, s), m.cancelled || h || jt(r, a, m);
	      })), l && l(r, m), v || h || m());
	    }var r = e.elm;r._enterCb && (r._enterCb.cancelled = !0, r._enterCb());var i = Rt(e.data.transition);if (!i) return t();if (!r._leaveCb && 1 === r.nodeType) {
	      var o = i.css,
	          a = i.type,
	          s = i.leaveClass,
	          c = i.leaveActiveClass,
	          u = i.beforeLeave,
	          l = i.leave,
	          f = i.afterLeave,
	          d = i.leaveCancelled,
	          p = i.delayLeave,
	          v = o !== !1 && !Jr,
	          h = l && (l._length || l.length) > 1,
	          m = r._leaveCb = It(function () {
	        r.parentNode && r.parentNode._pending && (r.parentNode._pending[e.key] = null), v && Et(r, c), m.cancelled ? (v && Et(r, s), d && d(r)) : (t(), f && f(r)), r._leaveCb = null;
	      });p ? p(n) : n();
	    }
	  }function Rt(e) {
	    if (e) {
	      if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
	        var t = {};return e.css !== !1 && u(t, mo(e.name || "v")), u(t, e), t;
	      }return "string" == typeof e ? mo(e) : void 0;
	    }
	  }function It(e) {
	    var t = !1;return function () {
	      t || (t = !0, e());
	    };
	  }function Bt(e, t, n) {
	    var r = t.value,
	        i = e.multiple;if (!i || Array.isArray(r)) {
	      for (var o, a, s = 0, c = e.options.length; s < c; s++) {
	        if (a = e.options[s], i) o = m(r, Ht(a)) > -1, a.selected !== o && (a.selected = o);else if (h(Ht(a), r)) return void (e.selectedIndex !== s && (e.selectedIndex = s));
	      }i || (e.selectedIndex = -1);
	    }
	  }function Ft(e, t) {
	    for (var n = 0, r = t.length; n < r; n++) {
	      if (h(Ht(t[n]), e)) return !1;
	    }return !0;
	  }function Ht(e) {
	    return "_value" in e ? e._value : e.value;
	  }function Ut(e) {
	    e.target.composing = !0;
	  }function zt(e) {
	    e.target.composing = !1, Vt(e.target, "input");
	  }function Vt(e, t) {
	    var n = document.createEvent("HTMLEvents");n.initEvent(t, !0, !0), e.dispatchEvent(n);
	  }function Jt(e) {
	    return !e.child || e.data && e.data.transition ? e : Jt(e.child._vnode);
	  }function qt(e) {
	    var t = e && e.componentOptions;return t && t.Ctor.options.abstract ? qt(ee(t.children)) : e;
	  }function Kt(e) {
	    var t = {},
	        n = e.$options;for (var r in n.propsData) {
	      t[r] = e[r];
	    }var i = n._parentListeners;
	    for (var o in i) {
	      t[Lr(o)] = i[o].fn;
	    }return t;
	  }function Wt(e, t) {
	    return (/\d-keep-alive$/.test(t.tag) ? e("keep-alive") : null
	    );
	  }function Zt(e) {
	    for (; e = e.parent;) {
	      if (e.data.transition) return !0;
	    }
	  }function Gt(e) {
	    e.elm._moveCb && e.elm._moveCb(), e.elm._enterCb && e.elm._enterCb();
	  }function Yt(e) {
	    e.data.newPos = e.elm.getBoundingClientRect();
	  }function Qt(e) {
	    var t = e.data.pos,
	        n = e.data.newPos,
	        r = t.left - n.left,
	        i = t.top - n.top;if (r || i) {
	      e.data.moved = !0;var o = e.elm.style;o.transform = o.WebkitTransform = "translate(" + r + "px," + i + "px)", o.transitionDuration = "0s";
	    }
	  }function Xt(e, t) {
	    var n = document.createElement("div");return n.innerHTML = '<div a="' + e + '">', n.innerHTML.indexOf(t) > 0;
	  }function en(e) {
	    return Eo.innerHTML = e, Eo.textContent;
	  }function tn(e, t) {
	    return t && (e = e.replace(ba, "\n")), e.replace(ya, "<").replace(_a, ">").replace($a, "&").replace(wa, '"');
	  }function nn(e, t) {
	    function n(t) {
	      f += t, e = e.substring(t);
	    }function r() {
	      var t = e.match(Ro);if (t) {
	        var r = { tagName: t[1], attrs: [], start: f };n(t[0].length);for (var i, o; !(i = e.match(Io)) && (o = e.match(Do));) {
	          n(o[0].length), r.attrs.push(o);
	        }if (i) return r.unarySlash = i[1], n(i[0].length), r.end = f, r;
	      }
	    }function i(e) {
	      var n = e.tagName,
	          r = e.unarySlash;u && ("p" === s && Bi(n) && o("", s), Ii(n) && s === n && o("", n));for (var i = l(n) || "html" === n && "head" === s || !!r, a = e.attrs.length, f = new Array(a), d = 0; d < a; d++) {
	        var p = e.attrs[d];zo && p[0].indexOf('""') === -1 && ("" === p[3] && delete p[3], "" === p[4] && delete p[4], "" === p[5] && delete p[5]);var v = p[3] || p[4] || p[5] || "";f[d] = { name: p[1], value: tn(v, t.shouldDecodeNewlines) };
	      }i || (c.push({ tag: n, attrs: f }), s = n, r = ""), t.start && t.start(n, f, i, e.start, e.end);
	    }function o(e, n, r, i) {
	      var o;if (null == r && (r = f), null == i && (i = f), n) {
	        var a = n.toLowerCase();for (o = c.length - 1; o >= 0 && c[o].tag.toLowerCase() !== a; o--) {}
	      } else o = 0;if (o >= 0) {
	        for (var u = c.length - 1; u >= o; u--) {
	          t.end && t.end(c[u].tag, r, i);
	        }c.length = o, s = o && c[o - 1].tag;
	      } else "br" === n.toLowerCase() ? t.start && t.start(n, [], !0, r, i) : "p" === n.toLowerCase() && (t.start && t.start(n, [], !1, r, i), t.end && t.end(n, r, i));
	    }for (var a, s, c = [], u = t.expectHTML, l = t.isUnaryTag || Ir, f = 0; e;) {
	      if (a = e, s && ma(s, t.sfc, c)) {
	        var d = s.toLowerCase(),
	            p = ga[d] || (ga[d] = new RegExp("([\\s\\S]*?)(</" + d + "[^>]*>)", "i")),
	            v = 0,
	            h = e.replace(p, function (e, n, r) {
	          return v = r.length, "script" !== d && "style" !== d && "noscript" !== d && (n = n.replace(/<!--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), t.chars && t.chars(n), "";
	        });f += e.length - h.length, e = h, o("</" + d + ">", d, f - v, f);
	      } else {
	        var m = e.indexOf("<");if (0 === m) {
	          if (Ho.test(e)) {
	            var g = e.indexOf("-->");if (g >= 0) {
	              n(g + 3);continue;
	            }
	          }if (Uo.test(e)) {
	            var y = e.indexOf("]>");if (y >= 0) {
	              n(y + 2);continue;
	            }
	          }var _ = e.match(Fo);if (_) {
	            n(_[0].length);continue;
	          }var b = e.match(Bo);if (b) {
	            var $ = f;n(b[0].length), o(b[0], b[1], $, f);continue;
	          }var w = r();if (w) {
	            i(w);continue;
	          }
	        }var C = void 0,
	            x = void 0,
	            k = void 0;if (m > 0) {
	          for (x = e.slice(m); !(Bo.test(x) || Ro.test(x) || Ho.test(x) || Uo.test(x) || (k = x.indexOf("<", 1), k < 0));) {
	            m += k, x = e.slice(m);
	          }C = e.substring(0, m), n(m);
	        }m < 0 && (C = e, e = ""), t.chars && C && t.chars(C);
	      }if (e === a && t.chars) {
	        t.chars(e);break;
	      }
	    }o();
	  }function rn(e) {
	    function t() {
	      (a || (a = [])).push(e.slice(d, i).trim()), d = i + 1;
	    }var n,
	        r,
	        i,
	        o,
	        a,
	        s = !1,
	        c = !1,
	        u = 0,
	        l = 0,
	        f = 0,
	        d = 0;for (i = 0; i < e.length; i++) {
	      if (r = n, n = e.charCodeAt(i), s) 39 === n && 92 !== r && (s = !s);else if (c) 34 === n && 92 !== r && (c = !c);else if (124 !== n || 124 === e.charCodeAt(i + 1) || 124 === e.charCodeAt(i - 1) || u || l || f) switch (n) {case 34:
	          c = !0;break;case 39:
	          s = !0;break;case 40:
	          f++;break;case 41:
	          f--;break;case 91:
	          l++;break;case 93:
	          l--;break;case 123:
	          u++;break;case 125:
	          u--;} else void 0 === o ? (d = i + 1, o = e.slice(0, i).trim()) : t();
	    }if (void 0 === o ? o = e.slice(0, i).trim() : 0 !== d && t(), a) for (i = 0; i < a.length; i++) {
	      o = on(o, a[i]);
	    }return o;
	  }function on(e, t) {
	    var n = t.indexOf("(");if (n < 0) return '_f("' + t + '")(' + e + ")";var r = t.slice(0, n),
	        i = t.slice(n + 1);return '_f("' + r + '")(' + e + "," + i;
	  }function an(e, t) {
	    var n = t ? ka(t) : Ca;if (n.test(e)) {
	      for (var r, i, o = [], a = n.lastIndex = 0; r = n.exec(e);) {
	        i = r.index, i > a && o.push(JSON.stringify(e.slice(a, i)));var s = rn(r[1].trim());o.push("_s(" + s + ")"), a = i + r[0].length;
	      }return a < e.length && o.push(JSON.stringify(e.slice(a))), o.join("+");
	    }
	  }function sn(e) {
	    console.error("[Vue parser]: " + e);
	  }function cn(e, t) {
	    return e ? e.map(function (e) {
	      return e[t];
	    }).filter(function (e) {
	      return e;
	    }) : [];
	  }function un(e, t, n) {
	    (e.props || (e.props = [])).push({ name: t, value: n });
	  }function ln(e, t, n) {
	    (e.attrs || (e.attrs = [])).push({ name: t, value: n });
	  }function fn(e, t, n, r, i, o) {
	    (e.directives || (e.directives = [])).push({ name: t, rawName: n, value: r, arg: i, modifiers: o });
	  }function dn(e, t, n, r, i) {
	    r && r.capture && (delete r.capture, t = "!" + t);var o;r && r.native ? (delete r.native, o = e.nativeEvents || (e.nativeEvents = {})) : o = e.events || (e.events = {});var a = { value: n, modifiers: r },
	        s = o[t];Array.isArray(s) ? i ? s.unshift(a) : s.push(a) : s ? o[t] = i ? [a, s] : [s, a] : o[t] = a;
	  }function pn(e, t, n) {
	    var r = vn(e, ":" + t) || vn(e, "v-bind:" + t);if (null != r) return r;if (n !== !1) {
	      var i = vn(e, t);if (null != i) return JSON.stringify(i);
	    }
	  }function vn(e, t) {
	    var n;if (null != (n = e.attrsMap[t])) for (var r = e.attrsList, i = 0, o = r.length; i < o; i++) {
	      if (r[i].name === t) {
	        r.splice(i, 1);break;
	      }
	    }return n;
	  }function hn(e, t) {
	    Vo = t.warn || sn, Jo = t.getTagNamespace || Ir, qo = t.mustUseProp || Ir, Ko = t.isPreTag || Ir, Wo = cn(t.modules, "preTransformNode"), Zo = cn(t.modules, "transformNode"), Go = cn(t.modules, "postTransformNode"), Yo = t.delimiters;var n,
	        r,
	        i = [],
	        o = t.preserveWhitespace !== !1,
	        a = !1,
	        s = !1;return nn(e, { expectHTML: t.expectHTML, isUnaryTag: t.isUnaryTag, shouldDecodeNewlines: t.shouldDecodeNewlines, start: function start(e, o, c) {
	        function u(e) {}var l = r && r.ns || Jo(e);t.isIE && "svg" === l && (o = Ln(o));var f = { type: 1, tag: e, attrsList: o, attrsMap: Sn(o, t.isIE), parent: r, children: [] };l && (f.ns = l), jn(f) && (f.forbidden = !0);for (var d = 0; d < Wo.length; d++) {
	          Wo[d](f, t);
	        }if (a || (mn(f), f.pre && (a = !0)), Ko(f.tag) && (s = !0), a) gn(f);else {
	          bn(f), $n(f), Cn(f), yn(f), f.plain = !f.key && !o.length, _n(f), xn(f), kn(f);for (var p = 0; p < Zo.length; p++) {
	            Zo[p](f, t);
	          }An(f);
	        }n ? i.length || n.if && f.else && (u(f), n.elseBlock = f) : (n = f, u(n)), r && !f.forbidden && (f.else ? wn(f, r) : (r.children.push(f), f.parent = r)), c || (r = f, i.push(f));for (var v = 0; v < Go.length; v++) {
	          Go[v](f, t);
	        }
	      }, end: function end() {
	        var e = i[i.length - 1],
	            t = e.children[e.children.length - 1];t && 3 === t.type && " " === t.text && e.children.pop(), i.length -= 1, r = i[i.length - 1], e.pre && (a = !1), Ko(e.tag) && (s = !1);
	      }, chars: function chars(e) {
	        if (r && (e = s || e.trim() ? Da(e) : o && r.children.length ? " " : "")) {
	          var t;!a && " " !== e && (t = an(e, Yo)) ? r.children.push({ type: 2, expression: t, text: e }) : (e = e.replace(Na, ""), r.children.push({ type: 3, text: e }));
	        }
	      } }), n;
	  }function mn(e) {
	    null != vn(e, "v-pre") && (e.pre = !0);
	  }function gn(e) {
	    var t = e.attrsList.length;if (t) for (var n = e.attrs = new Array(t), r = 0; r < t; r++) {
	      n[r] = { name: e.attrsList[r].name, value: JSON.stringify(e.attrsList[r].value) };
	    } else e.pre || (e.plain = !0);
	  }function yn(e) {
	    var t = pn(e, "key");t && (e.key = t);
	  }function _n(e) {
	    var t = pn(e, "ref");t && (e.ref = t, e.refInFor = On(e));
	  }function bn(e) {
	    var t;if (t = vn(e, "v-for")) {
	      var n = t.match(Oa);if (!n) return;e.for = n[2].trim();var r = n[1].trim(),
	          i = r.match(Ta);i ? (e.alias = i[1].trim(), e.iterator1 = i[2].trim(), i[3] && (e.iterator2 = i[3].trim())) : e.alias = r;
	    }
	  }function $n(e) {
	    var t = vn(e, "v-if");t && (e.if = t), null != vn(e, "v-else") && (e.else = !0);
	  }function wn(e, t) {
	    var n = En(t.children);n && n.if && (n.elseBlock = e);
	  }function Cn(e) {
	    var t = vn(e, "v-once");null != t && (e.once = !0);
	  }function xn(e) {
	    if ("slot" === e.tag) e.slotName = pn(e, "name");else {
	      var t = pn(e, "slot");t && (e.slotTarget = t);
	    }
	  }function kn(e) {
	    var t;(t = pn(e, "is")) && (e.component = t), null != vn(e, "inline-template") && (e.inlineTemplate = !0);
	  }function An(e) {
	    var t,
	        n,
	        r,
	        i,
	        o,
	        a,
	        s,
	        c,
	        u = e.attrsList;for (t = 0, n = u.length; t < n; t++) {
	      if (r = i = u[t].name, o = u[t].value, Aa.test(r)) {
	        if (e.hasBindings = !0, s = Tn(r), s && (r = r.replace(La, "")), Sa.test(r)) r = r.replace(Sa, ""), s && s.prop && (c = !0, r = Lr(r), "innerHtml" === r && (r = "innerHTML")), c || qo(r) ? un(e, r, o) : ln(e, r, o);else if (Ea.test(r)) r = r.replace(Ea, ""), dn(e, r, o, s);else {
	          r = r.replace(Aa, "");var l = r.match(ja);l && (a = l[1]) && (r = r.slice(0, -(a.length + 1))), fn(e, r, i, o, a, s);
	        }
	      } else ln(e, r, JSON.stringify(o));
	    }
	  }function On(e) {
	    for (var t = e; t;) {
	      if (void 0 !== t.for) return !0;t = t.parent;
	    }return !1;
	  }function Tn(e) {
	    var t = e.match(La);if (t) {
	      var n = {};return t.forEach(function (e) {
	        n[e.slice(1)] = !0;
	      }), n;
	    }
	  }function Sn(e, t) {
	    for (var n = {}, r = 0, i = e.length; r < i; r++) {
	      n[e[r].name] = e[r].value;
	    }return n;
	  }function En(e) {
	    for (var t = e.length; t--;) {
	      if (e[t].tag) return e[t];
	    }
	  }function jn(e) {
	    return "style" === e.tag || "script" === e.tag && (!e.attrsMap.type || "text/javascript" === e.attrsMap.type);
	  }function Ln(e) {
	    for (var t = [], n = 0; n < e.length; n++) {
	      var r = e[n];Ma.test(r.name) || (r.name = r.name.replace(Pa, ""), t.push(r));
	    }return t;
	  }function Nn(e, t) {
	    e && (Qo = Ra(t.staticKeys || ""), Xo = t.isReservedTag || function () {
	      return !1;
	    }, Mn(e), Pn(e, !1));
	  }function Dn(e) {
	    return n("type,tag,attrsList,attrsMap,plain,parent,children,attrs" + (e ? "," + e : ""));
	  }function Mn(e) {
	    if (e.static = Rn(e), 1 === e.type) for (var t = 0, n = e.children.length; t < n; t++) {
	      var r = e.children[t];Mn(r), r.static || (e.static = !1);
	    }
	  }function Pn(e, t) {
	    if (1 === e.type) {
	      if ((e.static || e.once) && (e.staticInFor = t), e.static) return void (e.staticRoot = !0);if (e.children) for (var n = 0, r = e.children.length; n < r; n++) {
	        Pn(e.children[n], t || !!e.for);
	      }
	    }
	  }function Rn(e) {
	    return 2 !== e.type && (3 === e.type || !(!e.pre && (e.hasBindings || e.if || e.for || Sr(e.tag) || !Xo(e.tag) || In(e) || !Object.keys(e).every(Qo))));
	  }function In(e) {
	    for (; e.parent;) {
	      if (e = e.parent, "template" !== e.tag) return !1;if (e.for) return !0;
	    }return !1;
	  }function Bn(e, t) {
	    var n = t ? "nativeOn:{" : "on:{";for (var r in e) {
	      n += '"' + r + '":' + Fn(e[r]) + ",";
	    }return n.slice(0, -1) + "}";
	  }function Fn(e) {
	    if (e) {
	      if (Array.isArray(e)) return "[" + e.map(Fn).join(",") + "]";if (e.modifiers) {
	        var t = "",
	            n = [];for (var r in e.modifiers) {
	          Fa[r] ? t += Fa[r] : n.push(r);
	        }n.length && (t = Hn(n) + t);var i = Ia.test(e.value) ? e.value + "($event)" : e.value;return "function($event){" + t + i + "}";
	      }return Ia.test(e.value) ? e.value : "function($event){" + e.value + "}";
	    }return "function(){}";
	  }function Hn(e) {
	    var t = 1 === e.length ? Un(e[0]) : Array.prototype.concat.apply([], e.map(Un));return Array.isArray(t) ? "if(" + t.map(function (e) {
	      return "$event.keyCode!==" + e;
	    }).join("&&") + ")return;" : "if($event.keyCode!==" + t + ")return;";
	  }function Un(e) {
	    return parseInt(e, 10) || Ba[e] || "_k(" + JSON.stringify(e) + ")";
	  }function zn(e, t) {
	    e.wrapData = function (e) {
	      return "_b(" + e + "," + t.value + (t.modifiers && t.modifiers.prop ? ",true" : "") + ")";
	    };
	  }function Vn(e, t) {
	    var n = ia,
	        r = ia = [],
	        i = oa;oa = 0, aa = t, ea = t.warn || sn, ta = cn(t.modules, "transformCode"), na = cn(t.modules, "genData"), ra = t.directives || {};var o = e ? Jn(e) : '_h("div")';return ia = n, oa = i, { render: "with(this){return " + o + "}", staticRenderFns: r };
	  }function Jn(e) {
	    if (e.staticRoot && !e.staticProcessed) return qn(e);if (e.once && !e.onceProcessed) return Kn(e);if (e.for && !e.forProcessed) return Gn(e);if (e.if && !e.ifProcessed) return Wn(e);if ("template" !== e.tag || e.slotTarget) {
	      if ("slot" === e.tag) return nr(e);var t;if (e.component) t = rr(e.component, e);else {
	        var n = e.plain ? void 0 : Yn(e),
	            r = e.inlineTemplate ? null : Xn(e);t = "_h('" + e.tag + "'" + (n ? "," + n : "") + (r ? "," + r : "") + ")";
	      }for (var i = 0; i < ta.length; i++) {
	        t = ta[i](e, t);
	      }return t;
	    }return Xn(e) || "void 0";
	  }function qn(e) {
	    return e.staticProcessed = !0, ia.push("with(this){return " + Jn(e) + "}"), "_m(" + (ia.length - 1) + (e.staticInFor ? ",true" : "") + ")";
	  }function Kn(e) {
	    if (e.onceProcessed = !0, e.staticInFor) {
	      for (var t = "", n = e.parent; n;) {
	        if (n.for) {
	          t = n.key;break;
	        }n = n.parent;
	      }return t ? "_o(" + Jn(e) + "," + oa++ + (t ? "," + t : "") + ")" : Jn(e);
	    }return qn(e);
	  }function Wn(e) {
	    var t = e.if;return e.ifProcessed = !0, "(" + t + ")?" + Jn(e) + ":" + Zn(e);
	  }function Zn(e) {
	    return e.elseBlock ? Jn(e.elseBlock) : "_e()";
	  }function Gn(e) {
	    var t = e.for,
	        n = e.alias,
	        r = e.iterator1 ? "," + e.iterator1 : "",
	        i = e.iterator2 ? "," + e.iterator2 : "";return e.forProcessed = !0, "_l((" + t + "),function(" + n + r + i + "){return " + Jn(e) + "})";
	  }function Yn(e) {
	    var t = "{",
	        n = Qn(e);n && (t += n + ","), e.key && (t += "key:" + e.key + ","), e.ref && (t += "ref:" + e.ref + ","), e.refInFor && (t += "refInFor:true,"), e.component && (t += 'tag:"' + e.tag + '",'), e.slotTarget && (t += "slot:" + e.slotTarget + ",");for (var r = 0; r < na.length; r++) {
	      t += na[r](e);
	    }if (e.attrs && (t += "attrs:{" + ir(e.attrs) + "},"), e.props && (t += "domProps:{" + ir(e.props) + "},"), e.events && (t += Bn(e.events) + ","), e.nativeEvents && (t += Bn(e.nativeEvents, !0) + ","), e.inlineTemplate) {
	      var i = e.children[0];if (1 === i.type) {
	        var o = Vn(i, aa);t += "inlineTemplate:{render:function(){" + o.render + "},staticRenderFns:[" + o.staticRenderFns.map(function (e) {
	          return "function(){" + e + "}";
	        }).join(",") + "]}";
	      }
	    }return t = t.replace(/,$/, "") + "}", e.wrapData && (t = e.wrapData(t)), t;
	  }function Qn(e) {
	    var t = e.directives;if (t) {
	      var n,
	          r,
	          i,
	          o,
	          a = "directives:[",
	          s = !1;for (n = 0, r = t.length; n < r; n++) {
	        i = t[n], o = !0;var c = ra[i.name] || Ha[i.name];c && (o = !!c(e, i, ea)), o && (s = !0, a += '{name:"' + i.name + '",rawName:"' + i.rawName + '"' + (i.value ? ",value:(" + i.value + "),expression:" + JSON.stringify(i.value) : "") + (i.arg ? ',arg:"' + i.arg + '"' : "") + (i.modifiers ? ",modifiers:" + JSON.stringify(i.modifiers) : "") + "},");
	      }return s ? a.slice(0, -1) + "]" : void 0;
	    }
	  }function Xn(e) {
	    if (e.children.length) return "[" + e.children.map(er).join(",") + "]";
	  }function er(e) {
	    return 1 === e.type ? Jn(e) : tr(e);
	  }function tr(e) {
	    return 2 === e.type ? e.expression : JSON.stringify(e.text);
	  }function nr(e) {
	    var t = e.slotName || '"default"',
	        n = Xn(e);return "_t(" + t + (n ? "," + n : "") + ")";
	  }function rr(e, t) {
	    var n = t.inlineTemplate ? null : Xn(t);return "_h(" + e + "," + Yn(t) + (n ? "," + n : "") + ")";
	  }function ir(e) {
	    for (var t = "", n = 0; n < e.length; n++) {
	      var r = e[n];t += '"' + r.name + '":' + r.value + ",";
	    }return t.slice(0, -1);
	  }function or(e, t) {
	    var n = hn(e.trim(), t);Nn(n, t);var r = Vn(n, t);return { ast: n, render: r.render, staticRenderFns: r.staticRenderFns };
	  }function ar(e, t) {
	    var n = (t.warn || sn, vn(e, "class"));n && (e.staticClass = JSON.stringify(n));var r = pn(e, "class", !1);r && (e.classBinding = r);
	  }function sr(e) {
	    var t = "";return e.staticClass && (t += "staticClass:" + e.staticClass + ","), e.classBinding && (t += "class:" + e.classBinding + ","), t;
	  }function cr(e) {
	    var t = pn(e, "style", !1);t && (e.styleBinding = t);
	  }function ur(e) {
	    return e.styleBinding ? "style:(" + e.styleBinding + ")," : "";
	  }function lr(e) {
	    if (ca = e, sa = ca.length, la = fa = da = 0, e.indexOf("[") < 0) return { exp: e, idx: null };for (; !dr();) {
	      ua = fr(), pr(ua) ? hr(ua) : 91 === ua && vr(ua);
	    }return { exp: e.substring(0, fa), idx: e.substring(fa + 1, da) };
	  }function fr() {
	    return ca.charCodeAt(++la);
	  }function dr() {
	    return la >= sa;
	  }function pr(e) {
	    return 34 === e || 39 === e;
	  }function vr(e) {
	    var t = 1;for (fa = la; !dr();) {
	      if (e = fr(), pr(e)) hr(e);else if (91 === e && t++, 93 === e && t--, 0 === t) {
	        da = la;break;
	      }
	    }
	  }function hr(e) {
	    for (var t = e; !dr() && (e = fr(), e !== t);) {}
	  }function mr(e, t, n) {
	    pa = n;var r = t.value,
	        i = t.modifiers,
	        o = e.tag,
	        a = e.attrsMap.type;return "select" === o ? br(e, r, i) : "input" === o && "checkbox" === a ? gr(e, r, i) : "input" === o && "radio" === a ? yr(e, r, i) : _r(e, r, i), !0;
	  }function gr(e, t, n) {
	    var r = n && n.number,
	        i = pn(e, "value") || "null",
	        o = pn(e, "true-value") || "true",
	        a = pn(e, "false-value") || "false";un(e, "checked", "Array.isArray(" + t + ")?_i(" + t + "," + i + ")>-1:_q(" + t + "," + o + ")"), dn(e, "change", "var $$a=" + t + ",$$el=$event.target,$$c=$$el.checked?(" + o + "):(" + a + ");if(Array.isArray($$a)){var $$v=" + (r ? "_n(" + i + ")" : i) + ",$$i=_i($$a,$$v);if($$c){$$i<0&&(" + t + "=$$a.concat($$v))}else{$$i>-1&&(" + t + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{" + t + "=$$c}", null, !0);
	  }function yr(e, t, n) {
	    var r = n && n.number,
	        i = pn(e, "value") || "null";i = r ? "_n(" + i + ")" : i, un(e, "checked", "_q(" + t + "," + i + ")"), dn(e, "change", $r(t, i), null, !0);
	  }function _r(e, t, n) {
	    var r = e.attrsMap.type,
	        i = n || {},
	        o = i.lazy,
	        a = i.number,
	        s = i.trim,
	        c = o || Vr && "range" === r ? "change" : "input",
	        u = !o && "range" !== r,
	        l = "input" === e.tag || "textarea" === e.tag,
	        f = l ? "$event.target.value" + (s ? ".trim()" : "") : "$event";f = a || "number" === r ? "_n(" + f + ")" : f;var d = $r(t, f);l && u && (d = "if($event.target.composing)return;" + d), un(e, "value", l ? "_s(" + t + ")" : "(" + t + ")"), dn(e, c, d, null, !0);
	  }function br(e, t, n) {
	    var r = n && n.number,
	        i = 'Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (r ? "_n(val)" : "val") + "})" + (null == e.attrsMap.multiple ? "[0]" : ""),
	        o = $r(t, i);dn(e, "change", o, null, !0);
	  }function $r(e, t) {
	    var n = lr(e);return null === n.idx ? e + "=" + t : "var $$exp = " + n.exp + ", $$idx = " + n.idx + ";if (!Array.isArray($$exp)){" + e + "=" + t + "}else{$$exp.splice($$idx, 1, " + t + ")}";
	  }function wr(e, t) {
	    t.value && un(e, "textContent", "_s(" + t.value + ")");
	  }function Cr(e, t) {
	    t.value && un(e, "innerHTML", "_s(" + t.value + ")");
	  }function xr(e, t) {
	    return t = t ? u(u({}, Ka), t) : Ka, or(e, t);
	  }function kr(e, t, n) {
	    var r = (t && t.warn || $i, t && t.delimiters ? String(t.delimiters) + e : e);if (qa[r]) return qa[r];var i = {},
	        o = xr(e, t);i.render = Ar(o.render);var a = o.staticRenderFns.length;i.staticRenderFns = new Array(a);for (var s = 0; s < a; s++) {
	      i.staticRenderFns[s] = Ar(o.staticRenderFns[s]);
	    }return qa[r] = i;
	  }function Ar(e) {
	    try {
	      return new Function(e);
	    } catch (e) {
	      return p;
	    }
	  }function Or(e) {
	    if (e.outerHTML) return e.outerHTML;var t = document.createElement("div");return t.appendChild(e.cloneNode(!0)), t.innerHTML;
	  }var Tr,
	      Sr = n("slot,component", !0),
	      Er = Object.prototype.hasOwnProperty,
	      jr = /-(\w)/g,
	      Lr = a(function (e) {
	    return e.replace(jr, function (e, t) {
	      return t ? t.toUpperCase() : "";
	    });
	  }),
	      Nr = a(function (e) {
	    return e.charAt(0).toUpperCase() + e.slice(1);
	  }),
	      Dr = /([^-])([A-Z])/g,
	      Mr = a(function (e) {
	    return e.replace(Dr, "$1-$2").replace(Dr, "$1-$2").toLowerCase();
	  }),
	      Pr = Object.prototype.toString,
	      Rr = "[object Object]",
	      Ir = function Ir() {
	    return !1;
	  },
	      Br = { optionMergeStrategies: Object.create(null), silent: !1, devtools: !1, errorHandler: null, ignoredElements: null, keyCodes: Object.create(null), isReservedTag: Ir, isUnknownElement: Ir, getTagNamespace: p, mustUseProp: Ir, _assetTypes: ["component", "directive", "filter"], _lifecycleHooks: ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated"], _maxUpdateCount: 100, _isServer: !1 },
	      Fr = /[^\w.$]/,
	      Hr = "__proto__" in {},
	      Ur = "undefined" != typeof window && "[object Object]" !== Object.prototype.toString.call(window),
	      zr = Ur && window.navigator.userAgent.toLowerCase(),
	      Vr = zr && /msie|trident/.test(zr),
	      Jr = zr && zr.indexOf("msie 9.0") > 0,
	      qr = zr && zr.indexOf("edge/") > 0,
	      Kr = zr && zr.indexOf("android") > 0,
	      Wr = zr && /iphone|ipad|ipod|ios/.test(zr),
	      Zr = Ur && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
	      Gr = function () {
	    function e() {
	      r = !1;var e = n.slice(0);n.length = 0;for (var t = 0; t < e.length; t++) {
	        e[t]();
	      }
	    }var t,
	        n = [],
	        r = !1;if ("undefined" != typeof Promise && b(Promise)) {
	      var i = Promise.resolve();t = function t() {
	        i.then(e), Wr && setTimeout(p);
	      };
	    } else if ("undefined" == typeof MutationObserver || !b(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) t = function t() {
	      setTimeout(e, 0);
	    };else {
	      var o = 1,
	          a = new MutationObserver(e),
	          s = document.createTextNode(String(o));a.observe(s, { characterData: !0 }), t = function t() {
	        o = (o + 1) % 2, s.data = String(o);
	      };
	    }return function (e, i) {
	      var o = i ? function () {
	        e.call(i);
	      } : e;n.push(o), r || (r = !0, t());
	    };
	  }();Tr = "undefined" != typeof Set && b(Set) ? Set : function () {
	    function e() {
	      this.set = Object.create(null);
	    }return e.prototype.has = function (e) {
	      return void 0 !== this.set[e];
	    }, e.prototype.add = function (e) {
	      this.set[e] = 1;
	    }, e.prototype.clear = function () {
	      this.set = Object.create(null);
	    }, e;
	  }();var Yr = 0,
	      Qr = function Qr() {
	    this.id = Yr++, this.subs = [];
	  };Qr.prototype.addSub = function (e) {
	    this.subs.push(e);
	  }, Qr.prototype.removeSub = function (e) {
	    r(this.subs, e);
	  }, Qr.prototype.depend = function () {
	    Qr.target && Qr.target.addDep(this);
	  }, Qr.prototype.notify = function () {
	    for (var e = this.subs.slice(), t = 0, n = e.length; t < n; t++) {
	      e[t].update();
	    }
	  }, Qr.target = null;var Xr = [],
	      ei = [],
	      ti = {},
	      ni = !1,
	      ri = !1,
	      ii = 0,
	      oi = 0,
	      ai = function ai(e, t, n, r) {
	    void 0 === r && (r = {}), this.vm = e, e._watchers.push(this), this.deep = !!r.deep, this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync, this.expression = t.toString(), this.cb = n, this.id = ++oi, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new Tr(), this.newDepIds = new Tr(), "function" == typeof t ? this.getter = t : (this.getter = _(t), this.getter || (this.getter = function () {})), this.value = this.lazy ? void 0 : this.get();
	  };ai.prototype.get = function () {
	    $(this);var e = this.getter.call(this.vm, this.vm);return this.deep && A(e), w(), this.cleanupDeps(), e;
	  }, ai.prototype.addDep = function (e) {
	    var t = e.id;this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this));
	  }, ai.prototype.cleanupDeps = function () {
	    for (var e = this, t = this.deps.length; t--;) {
	      var n = e.deps[t];e.newDepIds.has(n.id) || n.removeSub(e);
	    }var r = this.depIds;this.depIds = this.newDepIds, this.newDepIds = r, this.newDepIds.clear(), r = this.deps, this.deps = this.newDeps, this.newDeps = r, this.newDeps.length = 0;
	  }, ai.prototype.update = function () {
	    this.lazy ? this.dirty = !0 : this.sync ? this.run() : k(this);
	  }, ai.prototype.run = function () {
	    if (this.active) {
	      var e = this.get();if (e !== this.value || l(e) || this.deep) {
	        var t = this.value;if (this.value = e, this.user) try {
	          this.cb.call(this.vm, e, t);
	        } catch (e) {
	          if (!Br.errorHandler) throw e;Br.errorHandler.call(null, e, this.vm);
	        } else this.cb.call(this.vm, e, t);
	      }
	    }
	  }, ai.prototype.evaluate = function () {
	    this.value = this.get(), this.dirty = !1;
	  }, ai.prototype.depend = function () {
	    for (var e = this, t = this.deps.length; t--;) {
	      e.deps[t].depend();
	    }
	  }, ai.prototype.teardown = function () {
	    var e = this;if (this.active) {
	      this.vm._isBeingDestroyed || this.vm._vForRemoving || r(this.vm._watchers, this);for (var t = this.deps.length; t--;) {
	        e.deps[t].removeSub(e);
	      }this.active = !1;
	    }
	  };var si = new Tr(),
	      ci = Array.prototype,
	      ui = Object.create(ci);["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (e) {
	    var t = ci[e];y(ui, e, function () {
	      for (var n = arguments, r = arguments.length, i = new Array(r); r--;) {
	        i[r] = n[r];
	      }var o,
	          a = t.apply(this, i),
	          s = this.__ob__;switch (e) {case "push":
	          o = i;break;case "unshift":
	          o = i;break;case "splice":
	          o = i.slice(2);}return o && s.observeArray(o), s.dep.notify(), a;
	    });
	  });var li = Object.getOwnPropertyNames(ui),
	      fi = { shouldConvert: !0, isSettingProps: !1 },
	      di = function di(e) {
	    if (this.value = e, this.dep = new Qr(), this.vmCount = 0, y(e, "__ob__", this), Array.isArray(e)) {
	      var t = Hr ? T : S;t(e, ui, li), this.observeArray(e);
	    } else this.walk(e);
	  };di.prototype.walk = function (e) {
	    for (var t = Object.keys(e), n = 0; n < t.length; n++) {
	      j(e, t[n], e[t[n]]);
	    }
	  }, di.prototype.observeArray = function (e) {
	    for (var t = 0, n = e.length; t < n; t++) {
	      E(e[t]);
	    }
	  };var pi = { enumerable: !0, configurable: !0, get: p, set: p },
	      vi = function vi(e, t, n, r, i, o, a, s) {
	    this.tag = e, this.data = t, this.children = n, this.text = r, this.elm = i, this.ns = o, this.context = a, this.functionalContext = void 0, this.key = t && t.key, this.componentOptions = s, this.child = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1;
	  },
	      hi = function hi() {
	    var e = new vi();return e.text = "", e.isComment = !0, e;
	  },
	      mi = null,
	      gi = { init: se, prepatch: ce, insert: ue, destroy: le },
	      yi = Object.keys(gi),
	      _i = 0;Ce(Ae), z(Ae), we(Ae), ne(Ae), _e(Ae);var bi,
	      $i = p,
	      wi = Br.optionMergeStrategies;wi.data = function (e, t, n) {
	    return n ? e || t ? function () {
	      var r = "function" == typeof t ? t.call(n) : t,
	          i = "function" == typeof e ? e.call(n) : void 0;return r ? Oe(r, i) : i;
	    } : void 0 : t ? "function" != typeof t ? e : e ? function () {
	      return Oe(t.call(this), e.call(this));
	    } : t : e;
	  }, Br._lifecycleHooks.forEach(function (e) {
	    wi[e] = Te;
	  }), Br._assetTypes.forEach(function (e) {
	    wi[e + "s"] = Se;
	  }), wi.watch = function (e, t) {
	    if (!t) return e;if (!e) return t;var n = {};u(n, e);for (var r in t) {
	      var i = n[r],
	          o = t[r];i && !Array.isArray(i) && (i = [i]), n[r] = i ? i.concat(o) : [o];
	    }return n;
	  }, wi.props = wi.methods = wi.computed = function (e, t) {
	    if (!t) return e;if (!e) return t;var n = Object.create(null);return u(n, e), u(n, t), n;
	  };var Ci = function Ci(e, t) {
	    return void 0 === t ? e : t;
	  },
	      xi = Object.freeze({ defineReactive: j, _toString: e, toNumber: t, makeMap: n, isBuiltInTag: Sr, remove: r, hasOwn: i, isPrimitive: o, cached: a, camelize: Lr, capitalize: Nr, hyphenate: Mr, bind: s, toArray: c, extend: u, isObject: l, isPlainObject: f, toObject: d, noop: p, no: Ir, genStaticKeys: v, looseEqual: h, looseIndexOf: m, isReserved: g, def: y, parsePath: _, hasProto: Hr, inBrowser: Ur, UA: zr, isIE: Vr, isIE9: Jr, isEdge: qr, isAndroid: Kr, isIOS: Wr, devtools: Zr, nextTick: Gr, get _Set() {
	      return Tr;
	    }, mergeOptions: Le, resolveAsset: Ne, warn: $i, formatComponentName: bi, validateProp: De }),
	      ki = { name: "keep-alive", abstract: !0, created: function created() {
	      this.cache = Object.create(null);
	    }, render: function render() {
	      var e = ee(this.$slots.default);if (e && e.componentOptions) {
	        var t = e.componentOptions,
	            n = null == e.key ? t.Ctor.cid + "::" + t.tag : e.key;this.cache[n] ? e.child = this.cache[n].child : this.cache[n] = e, e.data.keepAlive = !0;
	      }return e;
	    }, destroyed: function destroyed() {
	      var e = this;for (var t in this.cache) {
	        var n = e.cache[t];re(n.child, "deactivated"), n.child.$destroy();
	      }
	    } },
	      Ai = { KeepAlive: ki };Ue(Ae), Object.defineProperty(Ae.prototype, "$isServer", { get: function get() {
	      return Br._isServer;
	    } }), Ae.version = "2.0.5";var Oi,
	      Ti = n("value,selected,checked,muted"),
	      Si = n("contenteditable,draggable,spellcheck"),
	      Ei = n("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),
	      ji = "http://www.w3.org/1999/xlink",
	      Li = function Li(e) {
	    return ":" === e.charAt(5) && "xlink" === e.slice(0, 5);
	  },
	      Ni = function Ni(e) {
	    return Li(e) ? e.slice(6, e.length) : "";
	  },
	      Di = function Di(e) {
	    return null == e || e === !1;
	  },
	      Mi = { svg: "http://www.w3.org/2000/svg", math: "http://www.w3.org/1998/Math/MathML", xhtml: "http://www.w3.org/1999/xhtm" },
	      Pi = n("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template"),
	      Ri = n("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr", !0),
	      Ii = n("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source", !0),
	      Bi = n("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track", !0),
	      Fi = n("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
	      Hi = function Hi(e) {
	    return "pre" === e;
	  },
	      Ui = function Ui(e) {
	    return Pi(e) || Fi(e);
	  },
	      zi = Object.create(null),
	      Vi = Object.freeze({ createElement: Ye, createElementNS: Qe, createTextNode: Xe, createComment: et, insertBefore: tt, removeChild: nt, appendChild: rt, parentNode: it, nextSibling: ot, tagName: at, setTextContent: st, childNodes: ct, setAttribute: ut }),
	      Ji = { create: function create(e, t) {
	      lt(t);
	    }, update: function update(e, t) {
	      e.data.ref !== t.data.ref && (lt(e, !0), lt(t));
	    }, destroy: function destroy(e) {
	      lt(e, !0);
	    } },
	      qi = new vi("", {}, []),
	      Ki = ["create", "update", "remove", "destroy"],
	      Wi = { create: mt, update: mt, destroy: function destroy(e) {
	      mt(e, qi);
	    } },
	      Zi = Object.create(null),
	      Gi = [Ji, Wi],
	      Yi = { create: bt, update: bt },
	      Qi = { create: wt, update: wt },
	      Xi = { create: Ct, update: Ct },
	      eo = { create: xt, update: xt },
	      to = /^--/,
	      no = function no(e, t, n) {
	    to.test(t) ? e.style.setProperty(t, n) : e.style[io(t)] = n;
	  },
	      ro = ["Webkit", "Moz", "ms"],
	      io = a(function (e) {
	    if (Oi = Oi || document.createElement("div"), e = Lr(e), "filter" !== e && e in Oi.style) return e;for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < ro.length; n++) {
	      var r = ro[n] + t;if (r in Oi.style) return r;
	    }
	  }),
	      oo = { create: kt, update: kt },
	      ao = Ur && !Jr,
	      so = "transition",
	      co = "animation",
	      uo = "transition",
	      lo = "transitionend",
	      fo = "animation",
	      po = "animationend";ao && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (uo = "WebkitTransition", lo = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (fo = "WebkitAnimation", po = "webkitAnimationEnd"));var vo = Ur && window.requestAnimationFrame || setTimeout,
	      ho = /\b(transform|all)(,|$)/,
	      mo = a(function (e) {
	    return { enterClass: e + "-enter", leaveClass: e + "-leave", appearClass: e + "-enter", enterActiveClass: e + "-enter-active", leaveActiveClass: e + "-leave-active", appearActiveClass: e + "-enter-active" };
	  }),
	      go = Ur ? { create: function create(e, t) {
	      t.data.show || Mt(t);
	    }, remove: function remove(e, t) {
	      e.data.show ? t() : Pt(e, t);
	    } } : {},
	      yo = [Yi, Qi, Xi, eo, oo, go],
	      _o = yo.concat(Gi),
	      bo = ht({ nodeOps: Vi, modules: _o });Jr && document.addEventListener("selectionchange", function () {
	    var e = document.activeElement;e && e.vmodel && Vt(e, "input");
	  });var $o = { inserted: function inserted(e, t, n) {
	      if ("select" === n.tag) {
	        var r = function r() {
	          Bt(e, t, n.context);
	        };r(), (Vr || qr) && setTimeout(r, 0);
	      } else "textarea" !== n.tag && "text" !== e.type || t.modifiers.lazy || (Kr || (e.addEventListener("compositionstart", Ut), e.addEventListener("compositionend", zt)), Jr && (e.vmodel = !0));
	    }, componentUpdated: function componentUpdated(e, t, n) {
	      if ("select" === n.tag) {
	        Bt(e, t, n.context);var r = e.multiple ? t.value.some(function (t) {
	          return Ft(t, e.options);
	        }) : t.value !== t.oldValue && Ft(t.value, e.options);r && Vt(e, "change");
	      }
	    } },
	      wo = { bind: function bind(e, t, n) {
	      var r = t.value;n = Jt(n);var i = n.data && n.data.transition;r && i && !Jr && Mt(n);var o = "none" === e.style.display ? "" : e.style.display;e.style.display = r ? o : "none", e.__vOriginalDisplay = o;
	    }, update: function update(e, t, n) {
	      var r = t.value,
	          i = t.oldValue;if (r !== i) {
	        n = Jt(n);var o = n.data && n.data.transition;o && !Jr ? r ? (Mt(n), e.style.display = e.__vOriginalDisplay) : Pt(n, function () {
	          e.style.display = "none";
	        }) : e.style.display = r ? e.__vOriginalDisplay : "none";
	      }
	    } },
	      Co = { model: $o, show: wo },
	      xo = { name: String, appear: Boolean, css: Boolean, mode: String, type: String, enterClass: String, leaveClass: String, enterActiveClass: String, leaveActiveClass: String, appearClass: String, appearActiveClass: String },
	      ko = { name: "transition", props: xo, abstract: !0, render: function render(e) {
	      var t = this,
	          n = this.$slots.default;if (n && (n = n.filter(function (e) {
	        return e.tag;
	      }), n.length)) {
	        var r = this.mode,
	            i = n[0];if (Zt(this.$vnode)) return i;var o = qt(i);if (!o) return i;if (this._leaving) return Wt(e, i);var a = o.key = null == o.key || o.isStatic ? "__v" + (o.tag + this._uid) + "__" : o.key,
	            s = (o.data || (o.data = {})).transition = Kt(this),
	            c = this._vnode,
	            l = qt(c);if (o.data.directives && o.data.directives.some(function (e) {
	          return "show" === e.name;
	        }) && (o.data.show = !0), l && l.data && l.key !== a) {
	          var f = l.data.transition = u({}, s);if ("out-in" === r) return this._leaving = !0, K(f, "afterLeave", function () {
	            t._leaving = !1, t.$forceUpdate();
	          }, a), Wt(e, i);if ("in-out" === r) {
	            var d,
	                p = function p() {
	              d();
	            };K(s, "afterEnter", p, a), K(s, "enterCancelled", p, a), K(f, "delayLeave", function (e) {
	              d = e;
	            }, a);
	          }
	        }return i;
	      }
	    } },
	      Ao = u({ tag: String, moveClass: String }, xo);delete Ao.mode;var Oo = { props: Ao, render: function render(e) {
	      for (var t = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, i = this.$slots.default || [], o = this.children = [], a = Kt(this), s = 0; s < i.length; s++) {
	        var c = i[s];c.tag && null != c.key && 0 !== String(c.key).indexOf("__vlist") && (o.push(c), n[c.key] = c, (c.data || (c.data = {})).transition = a);
	      }if (r) {
	        for (var u = [], l = [], f = 0; f < r.length; f++) {
	          var d = r[f];d.data.transition = a, d.data.pos = d.elm.getBoundingClientRect(), n[d.key] ? u.push(d) : l.push(d);
	        }this.kept = e(t, null, u), this.removed = l;
	      }return e(t, null, o);
	    }, beforeUpdate: function beforeUpdate() {
	      this.__patch__(this._vnode, this.kept, !1, !0), this._vnode = this.kept;
	    }, updated: function updated() {
	      var e = this.prevChildren,
	          t = this.moveClass || this.name + "-move";if (e.length && this.hasMove(e[0].elm, t)) {
	        e.forEach(Gt), e.forEach(Yt), e.forEach(Qt);document.body.offsetHeight;e.forEach(function (e) {
	          if (e.data.moved) {
	            var n = e.elm,
	                r = n.style;St(n, t), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(lo, n._moveCb = function e(r) {
	              r && !/transform$/.test(r.propertyName) || (n.removeEventListener(lo, e), n._moveCb = null, Et(n, t));
	            });
	          }
	        });
	      }
	    }, methods: { hasMove: function hasMove(e, t) {
	        if (!ao) return !1;if (null != this._hasMove) return this._hasMove;St(e, t);var n = Lt(e);return Et(e, t), this._hasMove = n.hasTransform;
	      } } },
	      To = { Transition: ko, TransitionGroup: Oo };Ae.config.isUnknownElement = Ze, Ae.config.isReservedTag = Ui, Ae.config.getTagNamespace = We, Ae.config.mustUseProp = Ti, u(Ae.options.directives, Co), u(Ae.options.components, To), Ae.prototype.__patch__ = Br._isServer ? p : bo, Ae.prototype.$mount = function (e, t) {
	    return e = e && !Br._isServer ? Ge(e) : void 0, this._mount(e, t);
	  }, setTimeout(function () {
	    Br.devtools && Zr && Zr.emit("init", Ae);
	  }, 0);var So = !!Ur && Xt("\n", "&#10;"),
	      Eo = document.createElement("div"),
	      jo = /([^\s"'<>\/=]+)/,
	      Lo = /(?:=)/,
	      No = [/"([^"]*)"+/.source, /'([^']*)'+/.source, /([^\s"'=<>`]+)/.source],
	      Do = new RegExp("^\\s*" + jo.source + "(?:\\s*(" + Lo.source + ")\\s*(?:" + No.join("|") + "))?"),
	      Mo = "[a-zA-Z_][\\w\\-\\.]*",
	      Po = "((?:" + Mo + "\\:)?" + Mo + ")",
	      Ro = new RegExp("^<" + Po),
	      Io = /^\s*(\/?)>/,
	      Bo = new RegExp("^<\\/" + Po + "[^>]*>"),
	      Fo = /^<!DOCTYPE [^>]+>/i,
	      Ho = /^<!--/,
	      Uo = /^<!\[/,
	      zo = !1;"x".replace(/x(.)?/g, function (e, t) {
	    zo = "" === t;
	  });var Vo,
	      Jo,
	      qo,
	      Ko,
	      Wo,
	      Zo,
	      Go,
	      Yo,
	      Qo,
	      Xo,
	      ea,
	      ta,
	      na,
	      ra,
	      ia,
	      oa,
	      aa,
	      sa,
	      ca,
	      ua,
	      la,
	      fa,
	      da,
	      pa,
	      va = n("script,style", !0),
	      ha = function ha(e) {
	    return "lang" === e.name && "html" !== e.value;
	  },
	      ma = function ma(e, t, n) {
	    return !!va(e) || !(!t || "template" !== e || 1 !== n.length || !n[0].attrs.some(ha));
	  },
	      ga = {},
	      ya = /&lt;/g,
	      _a = /&gt;/g,
	      ba = /&#10;/g,
	      $a = /&amp;/g,
	      wa = /&quot;/g,
	      Ca = /\{\{((?:.|\n)+?)\}\}/g,
	      xa = /[-.*+?^${}()|[\]\/\\]/g,
	      ka = a(function (e) {
	    var t = e[0].replace(xa, "\\$&"),
	        n = e[1].replace(xa, "\\$&");
	    return new RegExp(t + "((?:.|\\n)+?)" + n, "g");
	  }),
	      Aa = /^v-|^@|^:/,
	      Oa = /(.*?)\s+(?:in|of)\s+(.*)/,
	      Ta = /\(([^,]*),([^,]*)(?:,([^,]*))?\)/,
	      Sa = /^:|^v-bind:/,
	      Ea = /^@|^v-on:/,
	      ja = /:(.*)$/,
	      La = /\.[^.]+/g,
	      Na = /\u2028|\u2029/g,
	      Da = a(en),
	      Ma = /^xmlns:NS\d+/,
	      Pa = /^NS\d+:/,
	      Ra = a(Dn),
	      Ia = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,
	      Ba = { esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46] },
	      Fa = { stop: "$event.stopPropagation();", prevent: "$event.preventDefault();", self: "if($event.target !== $event.currentTarget)return;" },
	      Ha = { bind: zn, cloak: p },
	      Ua = (new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b"), { staticKeys: ["staticClass"], transformNode: ar, genData: sr }),
	      za = { transformNode: cr, genData: ur },
	      Va = [Ua, za],
	      Ja = { model: mr, text: wr, html: Cr },
	      qa = Object.create(null),
	      Ka = { isIE: Vr, expectHTML: !0, modules: Va, staticKeys: v(Va), directives: Ja, isReservedTag: Ui, isUnaryTag: Ri, mustUseProp: Ti, getTagNamespace: We, isPreTag: Hi },
	      Wa = a(function (e) {
	    var t = Ge(e);return t && t.innerHTML;
	  }),
	      Za = Ae.prototype.$mount;return Ae.prototype.$mount = function (e, t) {
	    if (e = e && Ge(e), e === document.body || e === document.documentElement) return this;var n = this.$options;if (!n.render) {
	      var r = n.template;if (r) {
	        if ("string" == typeof r) "#" === r.charAt(0) && (r = Wa(r));else {
	          if (!r.nodeType) return this;r = r.innerHTML;
	        }
	      } else e && (r = Or(e));if (r) {
	        var i = kr(r, { warn: $i, shouldDecodeNewlines: So, delimiters: n.delimiters }, this),
	            o = i.render,
	            a = i.staticRenderFns;n.render = o, n.staticRenderFns = a;
	      }
	    }return Za.call(this, e, t);
	  }, Ae.compile = kr, Ae;
	});

/***/ },

/***/ 931:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.go = go;
	exports.getUrl = getUrl;
	function go(url, $router) {
	  if (/^javas/.test(url) || !url) return;
	  var useRouter = (typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object' || $router && typeof url === 'string' && !/http/.test(url);
	  if (useRouter) {
	    url === 'BACK' ? $router.go(-1) : $router.push(url);
	  } else {
	    window.location.href = url;
	  }
	}

	function getUrl(url, $router) {
	  // Make sure the href is right in hash mode
	  if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
	    return '#!' + url;
	  }
	  return url && (typeof url === 'undefined' ? 'undefined' : _typeof(url)) !== 'object' ? url : 'javascript:void(0);';
	}

/***/ },

/***/ 934:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(935)
	__vue_script__ = __webpack_require__(937)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/tab/tab.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(939)
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
	  var id = "_v-26d2b126/tab.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 935:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(936);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./tab.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./tab.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 936:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.vux-tab-ink-bar {\n  position: absolute;\n  height: 2px;\n  bottom: 0;\n  left: 0;\n  background-color: #04BE02;\n  text-align: center;\n}\n.vux-tab-ink-bar-transition-forward {\n  -webkit-transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;\n  transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;\n}\n.vux-tab-ink-bar-transition-backward {\n  -webkit-transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.vux-tab {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: #fff;\n  height: 44px;\n  position: relative;\n}\n.vux-tab button {\n  padding: 0;\n  border: 0;\n  outline: 0;\n  background: 0 0;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n.vux-tab .vux-tab-item {\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n  height: 100%;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  background: -webkit-gradient(linear, left top, left bottom, from(#e5e5e5), color-stop(#e5e5e5), to(rgba(229, 229, 229, 0))) bottom left no-repeat;\n  background: -webkit-linear-gradient(top, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;\n  background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;\n  background-size: 100% 1px;\n  font-size: 14px;\n  text-align: center;\n  line-height: 44px;\n  color: #666;\n}\n.vux-tab .vux-tab-item.vux-tab-selected {\n  color: #04BE02;\n  border-bottom: 3px solid #04BE02;\n}\n.vux-tab .vux-tab-item.vux-tab-disabled {\n  color: #ddd;\n}\n.vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected {\n  background: 0 0;\n}\n/** when=prop:custom-bar-width **/\n.vux-tab-bar-inner {\n  display: block;\n  background-color: #04BE02;\n  margin: auto;\n  height: 100%;\n  -webkit-transition: width 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: width 0.3s cubic-bezier(0.35, 0, 0.25, 1);\n}\n.vux-tab-item-badge {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  display: inline-block;\n  height: 18px;\n  min-width: 18px;\n  padding: 0 4px;\n  border-radius: 30px;\n  margin: auto 0 auto 4px;\n  line-height: 18px;\n  font-size: 11px;\n  background-clip: padding-box;\n  vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },

/***/ 937:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _multiItems = __webpack_require__(938);

	exports.default = {
	  name: 'tab',
	  mixins: [_multiItems.parentMixin],
	  mounted: function mounted() {
	    var _this = this;

	    // stop bar anmination on first loading
	    this.$nextTick(function () {
	      setTimeout(function () {
	        _this.hasReady = true;
	      }, 0);
	    });
	  },

	  props: {
	    lineWidth: {
	      type: Number,
	      default: 3
	    },
	    activeColor: String,
	    barActiveColor: String,
	    defaultColor: String,
	    disabledColor: String,
	    animate: {
	      type: Boolean,
	      default: true
	    },
	    customBarWidth: [Function, String]
	  },
	  computed: {
	    barLeft: function barLeft() {
	      return this.currentIndex * (100 / this.number) + '%';
	    },
	    barRight: function barRight() {
	      return (this.number - this.currentIndex - 1) * (100 / this.number) + '%';
	    },

	    // when prop:custom-bar-width
	    innerBarStyle: function innerBarStyle() {
	      return {
	        width: typeof this.customBarWidth === 'function' ? this.customBarWidth(this.currentIndex) : this.customBarWidth,
	        backgroundColor: this.barActiveColor || this.activeColor
	      };
	    },

	    // end
	    barStyle: function barStyle() {
	      var commonStyle = {
	        left: this.barLeft,
	        right: this.barRight,
	        display: 'block',
	        height: this.lineWidth + 'px',
	        transition: !this.hasReady ? 'none' : null
	      };
	      if (!this.customBarWidth) {
	        commonStyle.backgroundColor = this.barActiveColor || this.activeColor;
	      } else {
	        commonStyle.backgroundColor = 'transparent'; // when=prop:custom-bar-width
	      }
	      return commonStyle;
	    },
	    barClass: function barClass() {
	      return {
	        'vux-tab-ink-bar-transition-forward': this.direction === 'forward',
	        'vux-tab-ink-bar-transition-backward': this.direction === 'backward'
	      };
	    }
	  },
	  watch: {
	    currentIndex: function currentIndex(newIndex, oldIndex) {
	      this.direction = newIndex > oldIndex ? 'forward' : 'backward';
	      this.$emit('on-index-change', newIndex, oldIndex);
	    }
	  },
	  data: function data() {
	    return {
	      direction: 'forward',
	      right: '100%',
	      hasReady: false
	    };
	  }
	};
	// </script>
	//
	//
	// <style lang="less">
	// @import '../../styles/variable.less';
	//
	// @prefixClass: vux-tab;
	// @easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
	// @effect-duration: .3s;
	//
	// .@{prefixClass} {
	//
	//   &-ink-bar {
	//     position: absolute;
	//     height: 2px;
	//     bottom: 0;
	//     left: 0;
	//     background-color: @tab-bar-active-color;
	//     text-align: center;
	//
	//     &-transition-forward {
	//       transition: right @effect-duration @easing-in-out,
	//       left @effect-duration @easing-in-out @effect-duration * 0.3;
	//     }
	//     &-transition-backward {
	//       transition: right @effect-duration @easing-in-out @effect-duration * 0.3,
	//       left @effect-duration @easing-in-out;
	//     }
	//   }
	//
	// }
	//
	// .vux-tab {
	//   display: flex;
	//   background-color: #fff;
	//   height: 44px;
	//   position: relative;
	// }
	// .vux-tab button {
	//   padding: 0;
	//   border: 0;
	//   outline: 0;
	//   background: 0 0;
	//   appearance: none;
	// }
	// .vux-tab .vux-tab-item {
	//   display: block;
	//   flex: 1;
	//   width: 100%;
	//   height: 100%;
	//   box-sizing: border-box;
	//   background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
	//   background-size: 100% 1px;
	//   font-size: 14px;
	//   text-align: center;
	//   line-height: 44px;
	//   color: @tab-text-default-color;
	// }
	//
	// .vux-tab .vux-tab-item.vux-tab-selected {
	//   color: @tab-text-active-color;
	//   border-bottom: 3px solid @tab-text-active-color;
	// }
	//
	// .vux-tab .vux-tab-item.vux-tab-disabled {
	//   color: @tab-text-disabled-color;
	// }
	//
	// .vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected {
	//   background: 0 0;
	// }
	//
	// /** when=prop:custom-bar-width **/
	// .vux-tab-bar-inner {
	//   display: block;
	//   background-color: @tab-text-active-color;
	//   margin: auto;
	//   height: 100%;
	//   transition: width 0.3s @easing-in-out;
	// }
	//
	// .vux-tab-item-badge {
	//   position: absolute;
	//   top:0;
	//   bottom:0;
	//   box-sizing: border-box;
	//   display: inline-block;
	//   height: 18px;
	//   min-width: 18px;
	//   padding: 0 4px;
	//   border-radius: 30px;
	//   margin: auto 0 auto 4px;
	//   line-height: 18px;
	//   font-size: 11px;
	//   background-clip: padding-box;
	//   vertical-align: middle;
	// }
	// </style>
	// <template>
	//   <div class="vux-tab" :class="{'vux-tab-no-animate': !animate}">
	//     <slot></slot>
	//     <div v-if="animate" class="vux-tab-ink-bar" :class="barClass" :style="barStyle">
	//       <span class="vux-tab-bar-inner" :style="innerBarStyle" v-if="customBarWidth"></span>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 938:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.childMixin = exports.parentMixin = undefined;

	var _router = __webpack_require__(931);

	var parentMixin = {
	  mounted: function mounted() {
	    if (this.value >= 0) {
	      this.currentIndex = this.value;
	    }
	    this.updateIndex();
	  },

	  methods: {
	    updateIndex: function updateIndex() {
	      if (!this.$children || !this.$children.length) return;
	      this.number = this.$children.length;
	      var children = this.$children;
	      for (var i = 0; i < children.length; i++) {
	        children[i].currentIndex = i;
	        if (children[i].currentSelected) {
	          this.index = i;
	        }
	      }
	    }
	  },
	  props: {
	    value: Number
	  },
	  watch: {
	    currentIndex: function currentIndex(val, oldVal) {
	      oldVal > -1 && this.$children[oldVal] && (this.$children[oldVal].currentSelected = false);
	      val > -1 && this.$children[val] && (this.$children[val].currentSelected = true);
	      this.$emit('input', val);
	    },
	    index: function index(val) {
	      this.currentIndex = val;
	    },
	    value: function value(val) {
	      this.index = val;
	    }
	  },
	  data: function data() {
	    return {
	      index: -1,
	      currentIndex: this.index,
	      number: this.$children.length
	    };
	  }
	};

	var childMixin = {
	  props: {
	    selected: {
	      type: Boolean,
	      default: false
	    }
	  },
	  mounted: function mounted() {
	    this.$parent.updateIndex();
	  },
	  beforeDestroy: function beforeDestroy() {
	    var $parent = this.$parent;
	    this.$nextTick(function () {
	      $parent.updateIndex();
	    });
	  },

	  methods: {
	    onItemClick: function onItemClick(hasLink) {
	      var _this = this;

	      if (typeof this.disabled === 'undefined' || this.disabled === false) {
	        this.currentSelected = true;
	        this.$parent.currentIndex = this.currentIndex;
	        this.$nextTick(function () {
	          _this.$emit('on-item-click', _this.currentIndex);
	        });
	      }
	      if (hasLink === true) {
	        (0, _router.go)(this.link, this.$router);
	      }
	    }
	  },
	  watch: {
	    currentSelected: function currentSelected(val) {
	      if (val) {
	        this.$parent.index = this.currentIndex;
	      }
	    },
	    selected: function selected(val) {
	      this.currentSelected = val;
	    }
	  },
	  data: function data() {
	    return {
	      currentIndex: -1,
	      currentSelected: this.selected
	    };
	  }
	};

	exports.parentMixin = parentMixin;
	exports.childMixin = childMixin;

/***/ },

/***/ 939:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-tab\" :class=\"{'vux-tab-no-animate': !animate}\">\n  <slot></slot>\n  <div v-if=\"animate\" class=\"vux-tab-ink-bar\" :class=\"barClass\" :style=\"barStyle\">\n    <span class=\"vux-tab-bar-inner\" :style=\"innerBarStyle\" v-if=\"customBarWidth\"></span>\n  </div>\n</div>\n";

/***/ },

/***/ 940:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(941)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/tab/tab-item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(942)
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
	  var id = "_v-e4ee4cec/tab-item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 941:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _multiItems = __webpack_require__(938);

	exports.default = {
	  name: 'tab-item',
	  mixins: [_multiItems.childMixin],
	  props: {
	    activeClass: String,
	    disabled: Boolean,
	    badgeBackground: {
	      type: String,
	      default: '#f74c31'
	    },
	    badgeColor: {
	      type: String,
	      default: '#fff'
	    },
	    badgeLabel: String
	  },
	  computed: {
	    style: function style() {
	      return {
	        borderWidth: this.$parent.lineWidth + 'px',
	        borderColor: this.$parent.activeColor,
	        color: this.currentSelected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
	        border: this.$parent.animate ? 'none' : 'auto'
	      };
	    }
	  }
	  // </script>

	}; // <template>
	//   <div class="vux-tab-item" :class="[currentSelected ? activeClass : '', {'vux-tab-selected': currentSelected, 'vux-tab-disabled': disabled}]" :style="style" @click="onItemClick">
	//     <slot></slot>
	//     <span :style="{background: badgeBackground, color: badgeColor}" class="vux-tab-item-badge" v-if="typeof badgeLabel !== 'undefined' && badgeLabel !== ''">{{ badgeLabel }}</span>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 942:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-tab-item\" :class=\"[currentSelected ? activeClass : '', {'vux-tab-selected': currentSelected, 'vux-tab-disabled': disabled}]\" :style=\"style\" @click=\"onItemClick\">\n  <slot></slot>\n  <span :style=\"{background: badgeBackground, color: badgeColor}\" class=\"vux-tab-item-badge\" v-if=\"typeof badgeLabel !== 'undefined' && badgeLabel !== ''\">{{ badgeLabel }}</span>\n</div>\n";

/***/ },

/***/ 943:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(944)
	__vue_script__ = __webpack_require__(946)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/alert/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(952)
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
	  var id = "_v-f832942c/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 944:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(945);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 945:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".vux-fade-enter-active,\n.vux-fade-leave-active {\n  opacity: 1;\n  -webkit-transition: opacity linear 0.2s;\n  transition: opacity linear 0.2s;\n}\n.vux-fade-enter,\n.vux-fade-leave-to {\n  opacity: 0;\n}\n.vux-dialog-enter-active,\n.vux-dialog-leave-active {\n  opacity: 1;\n  -webkit-transition-duration: 400ms;\n          transition-duration: 400ms;\n  -webkit-transform: translate(-50%, -50%) scale(1) !important;\n      -ms-transform: translate(-50%, -50%) scale(1) !important;\n          transform: translate(-50%, -50%) scale(1) !important;\n  -webkit-transition-property: opacity, -webkit-transform!important;\n  transition-property: opacity, -webkit-transform!important;\n  transition-property: transform, opacity!important;\n  transition-property: transform, opacity, -webkit-transform!important;\n}\n.vux-dialog-leave-active {\n  -webkit-transition-duration: 300ms;\n          transition-duration: 300ms;\n}\n.vux-dialog-enter {\n  opacity: 0;\n  -webkit-transform: translate(-50%, -50%) scale(1.185) !important;\n      -ms-transform: translate(-50%, -50%) scale(1.185) !important;\n          transform: translate(-50%, -50%) scale(1.185) !important;\n}\n.vux-dialog-leave-active {\n  opacity: 0;\n  -webkit-transform: translate(-50%, -50%) scale(0.85) !important;\n      -ms-transform: translate(-50%, -50%) scale(0.85) !important;\n          transform: translate(-50%, -50%) scale(0.85) !important;\n}\n.vux-mask-enter,\n.vux-mask-leave-active {\n  opacity: 0;\n}\n.vux-mask-leave-active,\n.vux-mask-enter-active {\n  -webkit-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.weui-mask {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n}\n.weui-mask_transparent {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n.weui-dialog {\n  position: fixed;\n  z-index: 5000;\n  width: 80%;\n  max-width: 300px;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background-color: #FFFFFF;\n  text-align: center;\n  border-radius: 3px;\n  overflow: hidden;\n}\n.weui-dialog__hd {\n  padding: 1.3em 1.6em 0.5em;\n}\n.weui-dialog__title {\n  font-weight: 400;\n  font-size: 18px;\n}\n.weui-dialog__bd {\n  padding: 0 1.6em 0.8em;\n  min-height: 40px;\n  font-size: 15px;\n  line-height: 1.3;\n  word-wrap: break-word;\n  word-break: break-all;\n  color: #999999;\n}\n.weui-dialog__bd:first-child {\n  padding: 2.7em 20px 1.7em;\n  color: #353535;\n}\n.weui-dialog__ft {\n  position: relative;\n  line-height: 48px;\n  font-size: 18px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.weui-dialog__ft:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-dialog__btn {\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  color: #3CC51F;\n  text-decoration: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  position: relative;\n}\n.weui-dialog__btn:active {\n  background-color: #EEEEEE;\n}\n.weui-dialog__btn:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleX(0.5);\n      -ms-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n.weui-dialog__btn:first-child:after {\n  display: none;\n}\n.weui-dialog__btn_default {\n  color: #353535;\n}\n.weui-dialog__btn_primary {\n  color: #0BB20C;\n}\n.weui-skin_android .weui-dialog {\n  text-align: left;\n  -webkit-box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\n          box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\n}\n.weui-skin_android .weui-dialog__title {\n  font-size: 21px;\n}\n.weui-skin_android .weui-dialog__hd {\n  text-align: left;\n}\n.weui-skin_android .weui-dialog__bd {\n  color: #999999;\n  padding: 0.25em 1.6em 2em;\n  font-size: 17px;\n  text-align: left;\n}\n.weui-skin_android .weui-dialog__bd:first-child {\n  padding: 1.6em 1.6em 2em;\n  color: #353535;\n}\n.weui-skin_android .weui-dialog__ft {\n  display: block;\n  text-align: right;\n  line-height: 42px;\n  font-size: 16px;\n  padding: 0 1.6em 0.7em;\n}\n.weui-skin_android .weui-dialog__ft:after {\n  display: none;\n}\n.weui-skin_android .weui-dialog__btn {\n  display: inline-block;\n  vertical-align: top;\n  padding: 0 .8em;\n}\n.weui-skin_android .weui-dialog__btn:after {\n  display: none;\n}\n.weui-skin_android .weui-dialog__btn:active {\n  background-color: rgba(0, 0, 0, 0.06);\n}\n.weui-skin_android .weui-dialog__btn:visited {\n  background-color: rgba(0, 0, 0, 0.06);\n}\n.weui-skin_android .weui-dialog__btn:last-child {\n  margin-right: -0.8em;\n}\n.weui-skin_android .weui-dialog__btn_default {\n  color: #808080;\n}\n@media screen and (min-width: 1024px) {\n  .weui-dialog {\n    width: 35%;\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 946:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _xDialog = __webpack_require__(947);

	var _xDialog2 = _interopRequireDefault(_xDialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'alert',
	  components: {
	    XDialog: _xDialog2.default
	  },
	  created: function created() {
	    if (typeof this.value !== 'undefined') {
	      this.showValue = this.value;
	    }
	  },

	  props: {
	    value: Boolean,
	    title: String,
	    content: String,
	    buttonText: String,
	    maskTransition: {
	      type: String,
	      default: 'vux-mask'
	    },
	    dialogTransition: {
	      type: String,
	      default: 'vux-dialog'
	    }
	  },
	  data: function data() {
	    return {
	      showValue: false
	    };
	  },

	  methods: {
	    _onHide: function _onHide() {
	      this.showValue = false;
	    }
	  },
	  watch: {
	    value: function value(val) {
	      this.showValue = val;
	    },
	    showValue: function showValue(val) {
	      this.$emit('input', val);
	    }
	  }
	  // </script>
	  //
	  // <style lang="less">
	  // @import '../../styles/transition.less';
	  // @import '../../styles/weui/widget/weui_tips/weui_mask';
	  // @import '../../styles/weui/widget/weui_tips/weui_dialog';
	  // </style>

	}; // <template>
	//   <div class="vux-alert">
	//     <x-dialog
	//     v-model="showValue"
	//     :mask-transition="maskTransition"
	//     :dialog-transition="dialogTransition"
	//     @on-hide="$emit('on-hide')"
	//     @on-show="$emit('on-show')">
	//       <div class="weui-dialog__hd">
	//         <strong class="weui-dialog__title">{{title}}</strong>
	//       </div>
	//       <div class="weui-dialog__bd">
	//         <slot>
	//           <div v-html="content"></div>
	//         </slot>
	//       </div>
	//       <div class="weui-dialog__ft">
	//         <a href="javascript:;"
	//         class="weui-dialog__btn weui-dialog__btn_primary"
	//         @click="_onHide">{{buttonText || $t('button_text')}}</a>
	//       </div>
	//     </x-dialog>
	//   </div>
	// </template>
	//
	// <i18n>
	// button_text:
	//   en: OK
	//   zh-CN: 确定
	// </i18n>
	//
	// <script>

/***/ },

/***/ 947:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(948)
	__vue_script__ = __webpack_require__(950)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/x-dialog/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(951)
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
	  var id = "_v-2a6eedc5/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 948:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(949);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 949:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".vux-fade-enter-active,\n.vux-fade-leave-active {\n  opacity: 1;\n  -webkit-transition: opacity linear 0.2s;\n  transition: opacity linear 0.2s;\n}\n.vux-fade-enter,\n.vux-fade-leave-to {\n  opacity: 0;\n}\n.vux-dialog-enter-active,\n.vux-dialog-leave-active {\n  opacity: 1;\n  -webkit-transition-duration: 400ms;\n          transition-duration: 400ms;\n  -webkit-transform: translate(-50%, -50%) scale(1) !important;\n      -ms-transform: translate(-50%, -50%) scale(1) !important;\n          transform: translate(-50%, -50%) scale(1) !important;\n  -webkit-transition-property: opacity, -webkit-transform!important;\n  transition-property: opacity, -webkit-transform!important;\n  transition-property: transform, opacity!important;\n  transition-property: transform, opacity, -webkit-transform!important;\n}\n.vux-dialog-leave-active {\n  -webkit-transition-duration: 300ms;\n          transition-duration: 300ms;\n}\n.vux-dialog-enter {\n  opacity: 0;\n  -webkit-transform: translate(-50%, -50%) scale(1.185) !important;\n      -ms-transform: translate(-50%, -50%) scale(1.185) !important;\n          transform: translate(-50%, -50%) scale(1.185) !important;\n}\n.vux-dialog-leave-active {\n  opacity: 0;\n  -webkit-transform: translate(-50%, -50%) scale(0.85) !important;\n      -ms-transform: translate(-50%, -50%) scale(0.85) !important;\n          transform: translate(-50%, -50%) scale(0.85) !important;\n}\n.vux-mask-enter,\n.vux-mask-leave-active {\n  opacity: 0;\n}\n.vux-mask-leave-active,\n.vux-mask-enter-active {\n  -webkit-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.weui-mask {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n}\n.weui-mask_transparent {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n.weui-dialog {\n  position: fixed;\n  z-index: 5000;\n  width: 80%;\n  max-width: 300px;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background-color: #FFFFFF;\n  text-align: center;\n  border-radius: 3px;\n  overflow: hidden;\n}\n.weui-dialog__hd {\n  padding: 1.3em 1.6em 0.5em;\n}\n.weui-dialog__title {\n  font-weight: 400;\n  font-size: 18px;\n}\n.weui-dialog__bd {\n  padding: 0 1.6em 0.8em;\n  min-height: 40px;\n  font-size: 15px;\n  line-height: 1.3;\n  word-wrap: break-word;\n  word-break: break-all;\n  color: #999999;\n}\n.weui-dialog__bd:first-child {\n  padding: 2.7em 20px 1.7em;\n  color: #353535;\n}\n.weui-dialog__ft {\n  position: relative;\n  line-height: 48px;\n  font-size: 18px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.weui-dialog__ft:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-dialog__btn {\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  color: #3CC51F;\n  text-decoration: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  position: relative;\n}\n.weui-dialog__btn:active {\n  background-color: #EEEEEE;\n}\n.weui-dialog__btn:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleX(0.5);\n      -ms-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n.weui-dialog__btn:first-child:after {\n  display: none;\n}\n.weui-dialog__btn_default {\n  color: #353535;\n}\n.weui-dialog__btn_primary {\n  color: #0BB20C;\n}\n.weui-skin_android .weui-dialog {\n  text-align: left;\n  -webkit-box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\n          box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\n}\n.weui-skin_android .weui-dialog__title {\n  font-size: 21px;\n}\n.weui-skin_android .weui-dialog__hd {\n  text-align: left;\n}\n.weui-skin_android .weui-dialog__bd {\n  color: #999999;\n  padding: 0.25em 1.6em 2em;\n  font-size: 17px;\n  text-align: left;\n}\n.weui-skin_android .weui-dialog__bd:first-child {\n  padding: 1.6em 1.6em 2em;\n  color: #353535;\n}\n.weui-skin_android .weui-dialog__ft {\n  display: block;\n  text-align: right;\n  line-height: 42px;\n  font-size: 16px;\n  padding: 0 1.6em 0.7em;\n}\n.weui-skin_android .weui-dialog__ft:after {\n  display: none;\n}\n.weui-skin_android .weui-dialog__btn {\n  display: inline-block;\n  vertical-align: top;\n  padding: 0 .8em;\n}\n.weui-skin_android .weui-dialog__btn:after {\n  display: none;\n}\n.weui-skin_android .weui-dialog__btn:active {\n  background-color: rgba(0, 0, 0, 0.06);\n}\n.weui-skin_android .weui-dialog__btn:visited {\n  background-color: rgba(0, 0, 0, 0.06);\n}\n.weui-skin_android .weui-dialog__btn:last-child {\n  margin-right: -0.8em;\n}\n.weui-skin_android .weui-dialog__btn_default {\n  color: #808080;\n}\n@media screen and (min-width: 1024px) {\n  .weui-dialog {\n    width: 35%;\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 950:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="vux-x-dialog" @touchmove="onTouchMove">
	//     <transition :name="maskTransition">
	//       <div class="weui-mask" @click="hideOnBlur && (currentValue = false)" v-show="currentValue"></div>
	//     </transition>
	//     <transition :name="dialogTransition">
	//       <div :class="dialogClass" v-show="currentValue" :style="dialogStyle">
	//         <slot></slot>
	//       </div>
	//     </transition>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'x-dialog',
	  props: {
	    value: {
	      type: Boolean,
	      default: false
	    },
	    maskTransition: {
	      type: String,
	      default: 'vux-mask'
	    },
	    dialogTransition: {
	      type: String,
	      default: 'vux-dialog'
	    },
	    dialogClass: {
	      type: String,
	      default: 'weui-dialog'
	    },
	    hideOnBlur: Boolean,
	    dialogStyle: Object,
	    scroll: {
	      type: Boolean,
	      default: true
	    }
	  },
	  watch: {
	    value: {
	      handler: function handler(val) {
	        this.currentValue = val;
	      },
	      immediate: true
	    },
	    currentValue: function currentValue(val) {
	      this.$emit(val ? 'on-show' : 'on-hide');
	      this.$emit('input', val);
	    }
	  },
	  data: function data() {
	    return {
	      currentValue: false
	    };
	  },

	  methods: {
	    onTouchMove: function onTouchMove(event) {
	      !this.scroll && event.preventDefault();
	    }
	  }
	  // </script>
	  //
	  // <style lang="less">
	  // @import '../../styles/transition.less';
	  // @import '../../styles/weui/widget/weui_tips/weui_mask';
	  // @import '../../styles/weui/widget/weui_tips/weui_dialog';
	  // </style>

	};

/***/ },

/***/ 951:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-x-dialog\" @touchmove=\"onTouchMove\">\n  <transition :name=\"maskTransition\">\n    <div class=\"weui-mask\" @click=\"hideOnBlur && (currentValue = false)\" v-show=\"currentValue\"></div>\n  </transition>\n  <transition :name=\"dialogTransition\">\n    <div :class=\"dialogClass\" v-show=\"currentValue\" :style=\"dialogStyle\">\n      <slot></slot>\n    </div>\n  </transition>\n</div>\n";

/***/ },

/***/ 952:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-alert\">\n  <x-dialog\n  v-model=\"showValue\"\n  :mask-transition=\"maskTransition\"\n  :dialog-transition=\"dialogTransition\"\n  @on-hide=\"$emit('on-hide')\"\n  @on-show=\"$emit('on-show')\">\n    <div class=\"weui-dialog__hd\">\n      <strong class=\"weui-dialog__title\">{{title}}</strong>\n    </div>\n    <div class=\"weui-dialog__bd\">\n      <slot>\n        <div v-html=\"content\"></div>\n      </slot>\n    </div>\n    <div class=\"weui-dialog__ft\">\n      <a href=\"javascript:;\"\n      class=\"weui-dialog__btn weui-dialog__btn_primary\"\n      @click=\"_onHide\">{{buttonText || '确定'}}</a>\n    </div>\n  </x-dialog>\n</div>\n";

/***/ },

/***/ 965:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _WXShare = __webpack_require__(966);

	var _WXShare2 = _interopRequireDefault(_WXShare);

	var _pathHistory = __webpack_require__(967);

	var _pathHistory2 = _interopRequireDefault(_pathHistory);

	var _appInterface = __webpack_require__(968);

	var _appInterface2 = _interopRequireDefault(_appInterface);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 初始化
	 */
	var init = function init() {
	    _pathHistory2.default.init();
	};

	/**
	 * 信息准备完成
	 */
	var ready = function ready() {
	    _WXShare2.default.init();
	    _appInterface2.default.init();
	};

	exports.default = {
	    ready: ready,
	    init: init,
	    pathHistory: _pathHistory2.default

	    /*
	     // 页面打开时
	     import base from '../utils/base.es6';
	     base.init();
	    
	     // 异步获取数据后
	     window.title = "detail";
	     window.link = location.href;
	     window.imgUrl = "http://pic.davdian.com/supplier/2017/03/15/1000_1000_5b66b3165dd581008e333e9edd8acf2c.jpg";
	     window.desc = "描述";
	    
	     base.ready();
	    
	     */

	};

/***/ },

/***/ 966:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var axios = __webpack_require__(282);
	__webpack_require__(308).polyfill();
	var WebStorageCache = __webpack_require__(358);
	var WXShareCache = new WebStorageCache({ storage: 'sessionStorage' });
	var _initShareInfo = void 0;

	/**
	 * 获取token
	 * @param {boolean} forcedNetwork
	 */
	var getToken = function getToken(forcedNetwork) {
	    var tokenInfo = getTokenFromSession();
	    if (!tokenInfo || forcedNetwork) {
	        getTokenFromNetwork().then(function (data) {
	            tokenInfo = data.data;
	            if (!tokenInfo.error) {
	                initWXShare(tokenInfo);
	                setTokenToSession(tokenInfo);
	            } else {
	                console.log("get token error");
	            }
	        }).catch(function () {
	            retry();
	        });
	    } else {
	        initWXShare(tokenInfo);
	    }
	};

	var retry = function retry() {
	    var timesKey = "init_wx_share_error_times";
	    var times = +WXShareCache.get(timesKey) || 0;
	    // 签名失败更新签名 5秒内不超过5次
	    if (times < 5) {
	        WXShareCache.set(timesKey, times + 1, { exp: 5 });
	        getToken(true);
	    }
	};

	var wxError = function wxError(res) {
	    if (res.errMsg == "config:invalid signature") {
	        retry();
	    } else {
	        console.log("wx error: " + res.errMsg);
	    }
	};

	var wxReady = function wxReady() {
	    var shareInfo = getShareInfo();
	    timelineShare(shareInfo);
	    appMessageShare(shareInfo);
	    qqMessageShare(shareInfo);
	    onMenuShareQZone(shareInfo);
	    weiboMessageShare(shareInfo);
	};

	/**
	 * 分享到朋友圈
	 */
	var timelineShare = function timelineShare(shareInfo) {
	    wx.onMenuShareTimeline({
	        title: shareInfo.title, // 分享标题
	        link: shareInfo.link, // 分享链接
	        imgUrl: shareInfo.imgUrl, // 分享图标
	        desc: shareInfo.desc,
	        success: function success() {
	            // 用户确认分享后执行的回调函数
	            if (shareInfo.successTimelineShare && typeof shareInfo.successTimelineShare == "function") {
	                shareInfo.successTimelineShare();
	            }
	            if (shareInfo.alwaysTimelineShare && typeof shareInfo.alwaysTimelineShare == "function") {
	                shareInfo.alwaysTimelineShare();
	            }
	            if (window.tlShareCallback) {
	                window.tlShareCallback();
	            }
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            if (shareInfo.cancelTimelineShare && typeof shareInfo.cancelTimelineShare == "function") {
	                shareInfo.cancelTimelineShare();
	            }
	            if (shareInfo.alwaysTimelineShare && typeof shareInfo.alwaysTimelineShare == "function") {
	                shareInfo.alwaysTimelineShare();
	            }
	        }
	    });
	};
	var getNewLineLink = function getNewLineLink(href) {
	    if (href && href.length > 5 && href.substring(0, 4) && href.substring(0, 5)) {
	        var str = href.substring(0, 4);
	        var str1 = href.substring(0, 5);
	        // console.log(str =='http' && str1 != 'https')
	        if (str == 'http' && str1 != 'https') {
	            return href.replace('http', 'https');
	        } else {
	            return href;
	        }
	    }
	};
	var appMessageShare = function appMessageShare(shareInfo) {
	    wx.onMenuShareAppMessage({
	        title: shareInfo.title, // 分享标题
	        link: shareInfo.link, // 分享链接
	        imgUrl: shareInfo.imgUrl, // 分享图标
	        desc: shareInfo.desc,
	        success: function success() {
	            // 用户确认分享后执行的回调函数
	            if (shareInfo.successAppMessageShare && typeof shareInfo.successAppMessageShare == "function") {
	                shareInfo.successAppMessageShare();
	            }
	            if (shareInfo.alwaysAppMessageShare && typeof shareInfo.alwaysAppMessageShare == "function") {
	                shareInfo.alwaysAppMessageShare();
	            }
	            if (window.sendShareCallback) {
	                window.sendShareCallback();
	            }
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            if (shareInfo.cancelAppMessageShare && typeof shareInfo.cancelAppMessageShare == "function") {
	                shareInfo.cancelAppMessageShare();
	            }
	            if (shareInfo.alwaysAppMessageShare && typeof shareInfo.alwaysAppMessageShare == "function") {
	                shareInfo.alwaysAppMessageShare();
	            }
	        }
	    });
	};

	var qqMessageShare = function qqMessageShare(shareInfo) {
	    wx.onMenuShareQQ({
	        title: shareInfo.title, // 分享标题
	        link: shareInfo.link, // 分享链接
	        imgUrl: shareInfo.imgUrl, // 分享图标
	        desc: shareInfo.desc,
	        success: function success() {
	            // 用户确认分享后执行的回调函数
	            if (shareInfo.successQqMessageShare && typeof shareInfo.successQqMessageShare == "function") {
	                shareInfo.successQqMessageShare();
	            }
	            if (shareInfo.alwaysQqMessageShare && typeof shareInfo.alwaysQqMessageShare == "function") {
	                shareInfo.alwaysQqMessageShare();
	            }
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            if (shareInfo.cancelQqMessageShare && typeof shareInfo.cancelQqMessageShare == "function") {
	                shareInfo.cancelQqMessageShare();
	            }
	            if (shareInfo.alwaysQqMessageShare && typeof shareInfo.alwaysQqMessageShare == "function") {
	                shareInfo.alwaysQqMessageShare();
	            }
	        }
	    });
	};

	var onMenuShareQZone = function onMenuShareQZone(shareInfo) {
	    wx.onMenuShareQZone({
	        title: shareInfo.title, // 分享标题
	        link: shareInfo.link, // 分享链接
	        imgUrl: shareInfo.imgUrl, // 分享图标
	        desc: shareInfo.desc,
	        success: function success() {
	            if (shareInfo.successOnMenuShareQZone && typeof shareInfo.successOnMenuShareQZone == "function") {
	                shareInfo.successOnMenuShareQZone();
	            }
	            if (shareInfo.successOnMenuShareQZone && typeof shareInfo.successOnMenuShareQZone == "function") {
	                shareInfo.successOnMenuShareQZone();
	            }
	            if (window.QQShareCallback) {
	                window.QQShareCallback();
	            }
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            if (shareInfo.cancelOnMenuShareQZone && typeof shareInfo.cancelOnMenuShareQZone == "function") {
	                shareInfo.cancelOnMenuShareQZone();
	            }
	            if (shareInfo.cancelOnMenuShareQZone && typeof shareInfo.cancelOnMenuShareQZone == "function") {
	                shareInfo.cancelOnMenuShareQZone();
	            }
	        }
	    });
	};

	var weiboMessageShare = function weiboMessageShare(shareInfo) {
	    wx.onMenuShareWeibo({
	        title: shareInfo.title, // 分享标题
	        link: shareInfo.link, // 分享链接
	        imgUrl: shareInfo.imgUrl, // 分享图标
	        desc: shareInfo.desc,
	        success: function success() {
	            // 用户确认分享后执行的回调函数
	            if (shareInfo.successWeiboMessageShare && typeof shareInfo.successWeiboMessageShare == "function") {
	                shareInfo.successWeiboMessageShare();
	            }
	            if (shareInfo.alwaysWeiboMessageShare && typeof shareInfo.alwaysWeiboMessageShare == "function") {
	                shareInfo.alwaysWeiboMessageShare();
	            }
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            if (shareInfo.cancelWeiboMessageShare && typeof shareInfo.cancelWeiboMessageShare == "function") {
	                shareInfo.cancelWeiboMessageShare();
	            }
	            if (shareInfo.alwaysWeiboMessageShare && typeof shareInfo.alwaysWeiboMessageShare == "function") {
	                shareInfo.alwaysWeiboMessageShare();
	            }
	        }
	    });
	};

	var initWXShare = function initWXShare(result) {
	    if (window.wx) {
	        var _wx = window.wx;
	        _wx.error(wxError);
	        _wx.ready(wxReady);
	        _wx.config({
	            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	            appId: result["data"]["appId"], // 必填，公众号的唯一标识
	            timestamp: result["data"]["timestamp"], // 必填，生成签名的时间戳
	            nonceStr: result["data"]["nonceStr"], // 必填，生成签名的随机串
	            signature: result["data"]["signature"], // 必填，签名，见附录1
	            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        });
	    }
	};

	/**
	 * 从缓存中获取token
	 */
	var getTokenFromSession = function getTokenFromSession() {
	    return WXShareCache.get("dvd_wx_token");
	};

	/**
	 * 向缓存中设置token
	 * @param {object} info
	 */
	var setTokenToSession = function setTokenToSession(info) {
	    return WXShareCache.set("dvd_wx_token", info);
	};

	/**
	 * 从网络上获取token
	 */
	var getTokenFromNetwork = function getTokenFromNetwork() {
	    return new Promise(function (resolve, reject) {
	        axios.get('/wechatJsToken', { params: { url: encodeURIComponent(location.href) } }).then(function (respone) {
	            resolve(respone);
	        }).catch(function (error) {
	            reject(error);
	        });
	    });
	};

	var init = function init(shareInfo) {
	    _initShareInfo = shareInfo || {};
	    getToken(false);
	};

	var getShareInfo = function getShareInfo() {
	    // 设置默认值，部分从window中取到
	    var newShareInfo = {
	        title: window.shareTitle || window.title || "大V店",
	        link: getNewLineLink(window.lineLink || window.link || location.href),
	        imgUrl: window.imgUrl || "http://pic.davdian.com/free/index0925_icon1.png?x-oss-process=image/resize,m_fill,w_80",
	        desc: window.descContent || window.desc || "大V店"
	    };
	    Object.assign(newShareInfo, _initShareInfo);
	    return newShareInfo;
	};

	exports.default = {
	    init: init,
	    getShareInfo: getShareInfo
	};

/***/ },

/***/ 967:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// let WebStorageCache = require("Web-storage-cache");
	// let pathCache = new WebStorageCache({storage: 'sessionStorage'});

	/**
	 * 设置路径历史
	 */
	var setPathHistory = function setPathHistory() {
	    /*
	     let list = getPathHistoryList()||[];
	     let listItem = {href:location.href,path:window.tj_path||"other"};
	     list.push(listItem);
	     pathCache.set("history_path",list);
	     */

	    if (!window.isPrivateMode) {
	        var his = getPathHistoryList();
	        his.push({ href: location.href, path: window.tj_path || "other" });
	        sessionStorage.history = JSON.stringify(his);
	    }
	};

	/**
	 * 获取路径历史列表
	 */
	var getPathHistoryList = function getPathHistoryList() {
	    var his = [];
	    if (!window.isPrivateMode) {
	        if (sessionStorage.history) {
	            his = JSON.parse(sessionStorage.history);
	        }
	    }

	    return his;

	    // return pathCache.get("history_path")
	};

	/**
	 * 初始化
	 */
	var init = function init() {
	    isPrivateMode();
	    setPathHistory();
	};

	var isPrivateMode = function isPrivateMode() {
	    try {
	        localStorage.setItem('isPrivateMode', '1');
	        localStorage.removeItem('isPrivateMode');
	        window.isPrivateMode = false;
	    } catch (e) {
	        window.isPrivateMode = true;
	    }
	};

	exports.default = {
	    setPathHistory: setPathHistory,
	    getPathHistoryList: getPathHistoryList,
	    init: init
	};

/***/ },

/***/ 968:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(94);

	var _utils2 = _interopRequireDefault(_utils);

	var _WXShare = __webpack_require__(966);

	var _WXShare2 = _interopRequireDefault(_WXShare);

	var _dialog = __webpack_require__(969);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var utils = _utils2.default.utils;
	var iosInterface = window.iosInterface = {};

	iosInterface.getHeadAndFootData = function () {
	    var defaultData = {
	        showHead: 1, // 是否展示头部
	        showFoot: 0, // 是否展示底部
	        backOnHead: 1, // 头部返回按钮
	        homeOnHead: 0, // 头部首页按钮
	        shareOnHead: 0, // 头部分享按钮
	        btnOnHead: 0, // 头部文字按钮
	        btnText: "", // 头部文字按钮文字
	        btnLink: "" // 头部文字按钮链接
	    };
	    var formatData = {
	        showHead: 0, // 是否展示头部
	        showFoot: 0, // 是否展示底部
	        backOnHead: 0, // 头部返回按钮
	        homeOnHead: 0, // 头部首页按钮
	        shareOnHead: 0, // 头部分享按钮
	        btnOnHead: 0, // 头部文字按钮
	        btnText: "", // 头部文字按钮文字
	        btnLink: "" // 头部文字按钮链接
	    };
	    if (window.appData) {
	        return JSON.stringify(Object.assign(formatData, window.appData));
	    } else {
	        return JSON.stringify(defaultData);
	    }
	};

	iosInterface.getShareInfo = function () {
	    var shareInfo = _WXShare2.default.getShareInfo();
	    return JSON.stringify(Object.assign(shareInfo, window.moreShareInfo));
	};
	iosInterface.refreshPreviousPageData = function () {
	    backNewData.$children[0].appUpData();
	};
	/**
	 * 初始化头部
	 */
	var initHead = function initHead(callback) {
	    callApp('Browser', 'initHead', { content: JSON.parse(iosInterface.getHeadAndFootData()) }, callback, '3.4.0', nullFunction);
	};

	/**
	 * 空函数
	 */
	var nullFunction = function nullFunction() {};

	/**
	 * 调用2.4.0以前
	 * @param callback
	 * @param error
	 * @param className
	 * @param method
	 * @param argumentsList
	 */
	var callAppOld = function callAppOld(callback, error, className, method, argumentsList) {
	    var t = Date.now();
	    window["callback_" + t] = callback;
	    window["error_" + t] = error;
	    var str = "neng:\/\/call.app.com?v=" + [encodeURIComponent("callback_" + t), encodeURIComponent("error_" + t), className, method, JSON.stringify(argumentsList)].join("|||").replace(/"/g, "'");
	    utils.goTo(str);
	};

	/**
	 * app外调用app
	 * @param host
	 * @param action
	 * @param para
	 */
	var callAppNative = function callAppNative(host, action, para) {
	    var baseHref = getBaseHost(),
	        url = void 0;
	    window.d_callback = nullFunction;
	    if (utils.isIOS()) {
	        url = "https://invoke." + baseHref + "?cmd=" + encodeURIComponent('davdian://call.' + host + '.com?action=' + action + '&params=' + encodeURIComponent(JSON.stringify(para)) + '&callback=d_callback&minv=2.5.0');
	    } else if (utils.isAndroid() && !utils.isWechat()) {
	        url = "davdian://invoke." + baseHref + "?cmd=" + encodeURIComponent('davdian://call.' + host + '.com?action=' + action + '&params=' + encodeURIComponent(JSON.stringify(para)) + '&callback=d_callback&minv=2.5.0');
	        setTimeout(function () {
	            url = '//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller';
	            utils.goTo(url);
	        }, 1500);
	    } else {
	        url = '//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller';
	    }
	    utils.goTo(url);
	};

	/**
	 * 打开app并进入大V课
	 * @param courseId
	 */
	var callAppEnteroom = function callAppEnteroom(courseId) {
	    callAppNative("VoiceLive", "enterRoom", { courseId: courseId });
	};

	/**
	 * 打开app并进入直播
	 * @param liveId
	 */
	var callAppLive = function callAppLive(liveId) {
	    var para = {
	        "liveId": liveId || window["liveId"],
	        "isPlaying": "1", // 1表示直播中，2是回放，3是整理中
	        "fromPush": "0" // 0表示不来自于推送，1表示来自推送
	    };
	    callAppNative('LiveVideo', 'enterRoom', para);
	};

	/**
	 * 得到基础host
	 * @returns {null}
	 */
	var getBaseHost = function getBaseHost() {
	    var result = location.href.match("davdian.com|bravetime.net|vyohui.cn");
	    if (result && result.length) {
	        return result[0];
	    } else {
	        return null;
	    }
	};

	/**
	 * 调用app2.4.0以后
	 */
	var callApp = function callApp(host, action, params) {
	    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : nullFunction;
	    var minv = arguments[4];
	    var minCallback = arguments[5];


	    if (utils.getAppVersion() >= minv.split(".").reduce(function (a, b) {
	        return +a * 10 + +b;
	    })) {
	        var t = Date.now() + "_" + Math.round(Math.random() * 10000);
	        window["callback_" + t] = callback;
	        var url = "davdian:\/\/call." + host + ".com?" + "action=" + encodeURIComponent(action) + "&" + "params=" + encodeURIComponent(JSON.stringify(params)) + "&" + "callback=" + encodeURIComponent("callback_" + t) + "&" + "minv=" + encodeURIComponent(minv);
	        utils.goTo(url);
	    } else {
	        if (minCallback) {
	            minCallback();
	        } else {
	            alert("请升级您的APP");
	        }
	    }
	};

	/**
	 * 设置app头部
	 * @param opt
	 * @param callback
	 */
	var setHead = function setHead(opt, callback) {
	    setTimeout(function () {
	        callApp("Browser", "setHead", opt, callback, '2.6.0');
	    }, 100);
	};

	/**
	 * 选取身份证
	 * @param callback
	 * @param minCallback
	 */
	var selectIdentity = function selectIdentity(callback, minCallback) {
	    var cardName = {
	        "cardName": sessionStorage.getItem("Addressee")
	    };
	    callApp("Browser", "selectIdentity", cardName, callback, '3.7.0', minCallback);
	};

	/**
	 * 调用app进入语音课程
	 * @param courseId
	 */
	var enterVoiceRoom = function enterVoiceRoom(courseId) {
	    if (!window.enterVoiceRoomFlag) {
	        window.enterVoiceRoomFlag = true;
	        callApp("VoiceLive", "enterRoom", { courseId: courseId }, function () {
	            location.reload();
	        }, "3.4.0");
	    }
	};

	/**
	 * 调用app登录
	 * @param callback
	 * @param minCallback
	 */
	var nativeLogin = function nativeLogin(callback, minCallback) {
	    callApp("Account", "login", {}, callback, '2.4.0', minCallback);
	};

	/**
	 * app支付
	 */
	var nativePay = function nativePay(url, callback) {
	    var option = {};
	    option.url = encodeURIComponent(url);
	    if (url.split("app_pay/").length > 1) {
	        var list = url.split("app_pay/")[1].split("&");
	        for (var i = 0; i < list.length; i++) {
	            var key = list[i].split("=")[0];
	            option[key] = list[i].split("=")[1];
	        }
	    }

	    var callFunction = function callFunction(result) {
	        if (typeof result === "string") {
	            result = JSON.parse(result);
	        }
	        callback(+result.code, result.order_id);
	    };
	    callApp('Browser', 'pay', option, callFunction, '3.1.0', function () {
	        utils.goTo(url);
	    });
	};

	/**
	 * 回到app首页
	 */
	var goAppHome = function goAppHome() {
	    callAppOld(nullFunction, function () {
	        alert("系统异常，请退出app重试");
	    }, "base", "home", []);
	};

	/**
	 * 在新标签打开页面
	 * @param opt
	 * @param callback
	 */
	var openNewPage = function openNewPage(opt, callback) {
	    callApp('Browser', 'open', opt, callback, '3.1.0', function () {
	        utils.goTo(opt.url);
	    });
	};

	/**
	 * 旧版分享
	 */
	var callAppShare = function callAppShare() {
	    callAppOld(function (r) {
	        var result = JSON.parse(r);
	        var code = +result["code"];
	        if (code === 0) {
	            // 分享成功
	            _dialog2.default.info("分享成功");
	        } else if (code === 1) {
	            _dialog2.default.info("分享失败");
	        } else {
	            alert("系统异常，请重试");
	        }
	    }, function () {
	        alert("系统异常，请退出app重试");
	    }, "base", "share", []);
	};

	/**
	 * 新版分享
	 * @param type
	 * @param info
	 * @param callback
	 * @param errorCallback
	 */
	var callAppShareInfo = function callAppShareInfo(type, info, callback, errorCallback) {
	    var shartInfo = window.iosInterface.netWorkGetShareInfo();
	    var option = info || JSON.parse(shartInfo);

	    option.shareType = '0';
	    if (+type === -1) {
	        option.show = '1';
	    } else {
	        option.show = '0';
	        option.sharePlatform = type + "";
	    }

	    var callFunction = function callFunction(code) {
	        if (+code === 0) {
	            errorCallback && errorCallback();
	        } else {
	            callback && callback();
	        }
	    };

	    callApp('Share', 'shareInfo', option, callFunction, '3.3.0');
	};

	/**
	 * 唤起app分享图片
	 */
	var callAppShareImg = function callAppShareImg(type, imgUrl, callback, errorCallback) {

	    var shartInfo = window.iosInterface.netWorkGetShareInfo();

	    var option = JSON.parse(shartInfo);
	    option.bigImageUrl = imgUrl;
	    option.shareType = "1";

	    if (type === -1) {
	        option.show = "1";
	    } else {
	        option.show = "0";
	        option.sharePlatform = type + "";
	    }

	    var callFunction = function callFunction(result) {
	        var code = +result.code,
	            msg = result.msg;
	        if (code === 0) {
	            errorCallback && errorCallback(msg);
	        } else {
	            callback && callback();
	        }
	    };

	    callApp('Share', 'shareInfo', option, callFunction, '3.3.0', function () {
	        bravetime.newAlert('当前版本过低不支持此功能，请尽快升级，或长按保存图片');
	    });
	};

	/**
	 * 唤起app分享到朋友圈
	 */
	var callAppShareToTimeline = function callAppShareToTimeline() {
	    callAppOld(function () {
	        var result = JSON.parse(r);
	        var code = +result["code"];
	        if (code === 0) {
	            // 分享成功
	            _dialog2.default.info("分享成功");
	        } else if (code === 1) {
	            _dialog2.default.info("分享失败");
	        } else {
	            alert("系统异常，请重试");
	        }
	    }, function () {
	        alert("系统异常，请退出app重试");
	    }, "base", "share_to_wechat_timeline", []);
	};

	/**
	 * 唤起app分享给好友
	 */
	var callAppShareToFriend = function callAppShareToFriend() {
	    callAppOld(function () {
	        var result = JSON.parse(r);
	        var code = +result["code"];
	        if (code === 0) {
	            _dialog2.default.info("分享成功");
	        } else if (code === 1) {
	            _dialog2.default.info("分享失败");
	        } else {
	            alert("系统异常，请重试");
	        }
	    }, function () {
	        alert("系统异常，请退出app重试");
	    }, "base", "share_to_wechat_friend", []);
	};

	/**
	 * 唤起原生保存图片
	 * @param src
	 */
	var callNativeHoldPic = function callNativeHoldPic(src) {
	    callAppOld(nullFunction, nullFunction, "base", "savePic", [src]);
	};

	/**
	 * app分享卡
	 */
	var callCardShare = function callCardShare(courseId) {
	    callApp("Share", "cardShare", { courseId: courseId }, nullFunction, '3.4.0');
	};

	/**
	 * 告知app页面打开成功
	 * @returns {boolean}
	 */
	var callNativeReady = function callNativeReady() {
	    // 如果是订单确认页,而且是等待刷新的,就不发这个了
	    if (window["tj_id"] === 21 && $ && $.cookie && $.cookie("no_refresh")) {
	        $.removeCookie("no_refresh");
	        return false;
	    }
	    callAppOld(function () {}, function () {}, "base", "ready", []);
	};

	/**
	 * 调用原生确认框
	 * @param msg
	 * @param opt
	 */
	var callNativeConfirm = function callNativeConfirm(msg, opt) {
	    callAppOld(opt.okLink, opt.cancelLink, "base", "confirm", [msg, JSON.stringify(opt)]);
	};

	/**
	 * 初始化
	 */
	var init = function init() {
	    initHead();
	};

	exports.default = {
	    init: init,
	    callNativeConfirm: callNativeConfirm,
	    callNativeReady: callNativeReady,
	    callCardShare: callCardShare,
	    callNativeHoldPic: callNativeHoldPic,
	    callAppShareToFriend: callAppShareToFriend,
	    callAppShareToTimeline: callAppShareToTimeline,
	    callAppShare: callAppShare,
	    callAppShareImg: callAppShareImg,
	    callAppEnteroom: callAppEnteroom,
	    callAppShareInfo: callAppShareInfo,
	    callAppLive: callAppLive,
	    setHead: setHead,
	    selectIdentity: selectIdentity,
	    enterVoiceRoom: enterVoiceRoom,
	    nativeLogin: nativeLogin,
	    nativePay: nativePay,
	    goAppHome: goAppHome,
	    openNewPage: openNewPage
	};

/***/ },

/***/ 969:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _index = __webpack_require__(970);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(973);

	var _index4 = _interopRequireDefault(_index3);

	var _vue = __webpack_require__(495);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_index2.default);
	_vue2.default.use(_index4.default);

	/**
	* 弹出
	* @param msg
	* @param callback
	*/
	var alert = function alert() {
	  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	  var callback = arguments[1];

	  var _callback = void 0,
	      _msg = msg;
	  if (callback) {
	    _callback = callback;
	  } else if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === "object") {
	    _msg = msg.msg;
	    _callback = msg.callback;
	  } else {
	    _callback = function _callback() {};
	  }
	  _vue2.default.$vux.alert.show({
	    content: _msg,
	    onHide: _callback
	  });
	};

	/**
	* 提示
	* @param value
	*/
	var info = function info(value) {
	  _vue2.default.$vux.toast.show({
	    text: value,
	    position: "middle",
	    width: "200px",
	    type: "text"
	  });
	};

	exports.default = {
	  alert: alert,
	  info: info,
	  toast: info
	};

/***/ },

/***/ 970:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.install = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _alert = __webpack_require__(943);

	var _alert2 = _interopRequireDefault(_alert);

	var _plugin_helper = __webpack_require__(971);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $vm = void 0;

	var plugin = {
	  install: function install(Vue) {
	    if (!$vm) {
	      var Alert = Vue.extend(_alert2.default);
	      $vm = new Alert({
	        el: document.createElement('div')
	      });
	      document.body.appendChild($vm.$el);
	    }

	    var alert = {
	      show: function show() {
	        var _this = this;

	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	          (0, _plugin_helper.mergeOptions)($vm, options);
	        } else if (typeof options === 'string') {
	          $vm.content = options;
	        }
	        this.watcher && this.watcher();
	        this.watcher = $vm.$watch('showValue', function (val) {
	          val && options.onShow && options.onShow($vm);
	          if (val === false && options.onHide) {
	            options.onHide($vm);
	            _this.watcher && _this.watcher();
	          }
	        });
	        $vm.showValue = true;
	      },
	      hide: function hide() {
	        $vm.showValue = false;
	        this.watcher && this.watcher();
	        this.watcher = null;
	      }
	    };

	    if (!Vue.$vux) {
	      Vue.$vux = {
	        alert: alert
	      };
	    } else {
	      Vue.$vux.alert = alert;
	    }

	    Vue.mixin({
	      created: function created() {
	        this.$vux = Vue.$vux;
	      }
	    });
	  }
	};

	exports.default = plugin;
	var install = exports.install = plugin.install;

/***/ },

/***/ 971:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeOptions = undefined;

	var _objectAssign = __webpack_require__(972);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mergeOptions = function mergeOptions($vm, options) {
	  var defaults = {};
	  for (var i in $vm.$options.props) {
	    if (i !== 'value') {
	      defaults[i] = $vm.$options.props[i].default;
	    }
	  }
	  var _options = (0, _objectAssign2.default)({}, defaults, options);
	  for (var _i in _options) {
	    $vm[_i] = _options[_i];
	  }
	};

	exports.mergeOptions = mergeOptions;

/***/ },

/***/ 972:
/***/ function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },

/***/ 973:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.install = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _toast = __webpack_require__(974);

	var _toast2 = _interopRequireDefault(_toast);

	var _plugin_helper = __webpack_require__(971);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $vm = void 0;
	var watcher = void 0;

	var plugin = {
	  install: function install(vue) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var Toast = vue.extend(_toast2.default);

	    if (!$vm) {
	      $vm = new Toast({
	        el: document.createElement('div')
	      });
	      document.body.appendChild($vm.$el);
	    }

	    var defaults = {};
	    for (var i in $vm.$options.props) {
	      if (i !== 'value') {
	        defaults[i] = $vm.$options.props[i].default;
	      }
	    }

	    var toast = {
	      show: function show() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        // destroy watcher
	        watcher && watcher();
	        if (typeof options === 'string') {
	          $vm.text = options;
	        } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	          (0, _plugin_helper.mergeOptions)($vm, options);
	        }
	        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.onShow || options.onHide) {
	          watcher = $vm.$watch('show', function (val) {
	            val && options.onShow && options.onShow($vm);
	            val === false && options.onHide && options.onHide($vm);
	          });
	        }
	        $vm.show = true;
	      },
	      text: function text(_text) {
	        var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

	        this.show({
	          type: 'text',
	          width: 'auto',
	          position: position,
	          text: _text
	        });
	      },
	      hide: function hide() {
	        $vm.show = false;
	      }
	    };

	    // all Vux's plugins are included in this.$vux
	    if (!vue.$vux) {
	      vue.$vux = {
	        toast: toast
	      };
	    } else {
	      vue.$vux.toast = toast;
	    }

	    vue.mixin({
	      created: function created() {
	        this.$vux = vue.$vux;
	      }
	    });
	  }
	};

	exports.default = plugin;
	var install = exports.install = plugin.install;

/***/ },

/***/ 974:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(975)
	__vue_script__ = __webpack_require__(977)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/toast/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(979)
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
	  var id = "_v-226e80f5/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 975:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(976);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 976:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".vux-fade-enter-active,\n.vux-fade-leave-active {\n  opacity: 1;\n  -webkit-transition: opacity linear 0.2s;\n  transition: opacity linear 0.2s;\n}\n.vux-fade-enter,\n.vux-fade-leave-to {\n  opacity: 0;\n}\n.vux-dialog-enter-active,\n.vux-dialog-leave-active {\n  opacity: 1;\n  -webkit-transition-duration: 400ms;\n          transition-duration: 400ms;\n  -webkit-transform: translate(-50%, -50%) scale(1) !important;\n      -ms-transform: translate(-50%, -50%) scale(1) !important;\n          transform: translate(-50%, -50%) scale(1) !important;\n  -webkit-transition-property: opacity, -webkit-transform!important;\n  transition-property: opacity, -webkit-transform!important;\n  transition-property: transform, opacity!important;\n  transition-property: transform, opacity, -webkit-transform!important;\n}\n.vux-dialog-leave-active {\n  -webkit-transition-duration: 300ms;\n          transition-duration: 300ms;\n}\n.vux-dialog-enter {\n  opacity: 0;\n  -webkit-transform: translate(-50%, -50%) scale(1.185) !important;\n      -ms-transform: translate(-50%, -50%) scale(1.185) !important;\n          transform: translate(-50%, -50%) scale(1.185) !important;\n}\n.vux-dialog-leave-active {\n  opacity: 0;\n  -webkit-transform: translate(-50%, -50%) scale(0.85) !important;\n      -ms-transform: translate(-50%, -50%) scale(0.85) !important;\n          transform: translate(-50%, -50%) scale(0.85) !important;\n}\n.vux-mask-enter,\n.vux-mask-leave-active {\n  opacity: 0;\n}\n.vux-mask-leave-active,\n.vux-mask-enter-active {\n  -webkit-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.weui-mask {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n}\n.weui-mask_transparent {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n@font-face {\n  font-weight: normal;\n  font-style: normal;\n  font-family: \"weui\";\n  src: url('data:application/octet-stream;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzJAKEx+AAABfAAAAFZjbWFw65cFHQAAAhwAAAJQZ2x5ZvCRR/EAAASUAAAKtGhlYWQMPROtAAAA4AAAADZoaGVhCCwD+gAAALwAAAAkaG10eEJo//8AAAHUAAAASGxvY2EYqhW4AAAEbAAAACZtYXhwASEAVQAAARgAAAAgbmFtZeNcHtgAAA9IAAAB5nBvc3T6bLhLAAARMAAAAOYAAQAAA+gAAABaA+j/////A+kAAQAAAAAAAAAAAAAAAAAAABIAAQAAAAEAACbZbxtfDzz1AAsD6AAAAADUm2dvAAAAANSbZ2///wAAA+kD6gAAAAgAAgAAAAAAAAABAAAAEgBJAAUAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQOwAZAABQAIAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA6gHqEQPoAAAAWgPqAAAAAAABAAAAAAAAAAAAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+j//wPoAAAD6AAAAAAABQAAAAMAAAAsAAAABAAAAXQAAQAAAAAAbgADAAEAAAAsAAMACgAAAXQABABCAAAABAAEAAEAAOoR//8AAOoB//8AAAABAAQAAAABAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA4ADwAQABEAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAANwAAAAAAAAAEQAA6gEAAOoBAAAAAQAA6gIAAOoCAAAAAgAA6gMAAOoDAAAAAwAA6gQAAOoEAAAABAAA6gUAAOoFAAAABQAA6gYAAOoGAAAABgAA6gcAAOoHAAAABwAA6ggAAOoIAAAACAAA6gkAAOoJAAAACQAA6goAAOoKAAAACgAA6gsAAOoLAAAACwAA6gwAAOoMAAAADAAA6g0AAOoNAAAADQAA6g4AAOoOAAAADgAA6g8AAOoPAAAADwAA6hAAAOoQAAAAEAAA6hEAAOoRAAAAEQAAAAAARgCMANIBJAF4AcQCMgJgAqgC/ANIA6YD/gROBKAE9AVaAAAAAgAAAAADrwOtABQAKQAAASIHBgcGFBcWFxYyNzY3NjQnJicmAyInJicmNDc2NzYyFxYXFhQHBgcGAfV4Z2Q7PDw7ZGfwZmQ7PDw7ZGZ4bl5bNjc3Nlte215bNjc3NlteA608O2Rn8GdjOzw8O2Nn8GdkOzz8rzc1W17bXlw1Nzc1XF7bXls1NwAAAAACAAAAAAOzA7MAFwAtAAABIgcGBwYVFBcWFxYzMjc2NzY1NCcmJyYTBwYiLwEmNjsBETQ2OwEyFhURMzIWAe52Z2Q7PT07ZGd2fGpmOz4+O2ZpIXYOKA52Dg0XXQsHJgcLXRcNA7M+O2ZqfHZnZDs9PTtkZ3Z9aWY7Pv3wmhISmhIaARcICwsI/ukaAAMAAAAAA+UD5QAXACMALAAAASIHBgcGFRQXFhcWMzI3Njc2NTQnJicmAxQrASI1AzQ7ATIHJyImNDYyFhQGAe6Ecm9BRERBb3KEiXZxQkREQnF1aQIxAwgCQgMBIxIZGSQZGQPkREJxdomEcm9BRERBb3KEinVxQkT9HQICAWICAjEZIxkZIxkAAAAAAgAAAAADsQPkABkALgAAAQYHBgc2BREUFxYXFhc2NzY3NjURJBcmJyYTAQYvASY/ATYyHwEWNjclNjIfARYB9VVVQk+v/tFHPmxebGxdbT1I/tGvT0JVo/7VBASKAwMSAQUBcQEFAgESAgUBEQQD4xMYEhk3YP6sjnVlSD8cHD9IZXWOAVRgNxkSGP62/tkDA48EBBkCAVYCAQHlAQIQBAAAAAADAAAAAAOxA+QAGwAqADMAAAEGBwYHBgcGNxEUFxYXFhc2NzY3NjURJBcmJyYHMzIWFQMUBisBIicDNDYTIiY0NjIWFAYB9UFBODssO38gRz5sXmxsXW09SP7YqFBBVW80BAYMAwImBQELBh4PFhYeFRUD5A8SDhIOEikK/q2PdWRJPh0dPklkdY8BU141GRIY/AYE/sYCAwUBOgQG/kAVHxUVHxUAAAACAAAAAAPkA+QAFwAtAAABIgcGBwYVFBcWFxYzMjc2NzY1NCcmJyYTAQYiLwEmPwE2Mh8BFjI3ATYyHwEWAe6Ecm9BQ0NCbnODiXVxQkREQnF1kf6gAQUBowMDFgEFAYUCBQEBQwIFARUEA+NEQnF1iYNzbkJDQ0FvcoSJdXFCRP6j/qUBAagEBR4CAWYBAQENAgIVBAAAAAQAAAAAA68DrQAUACkAPwBDAAABIgcGBwYUFxYXFjI3Njc2NCcmJyYDIicmJyY0NzY3NjIXFhcWFAcGBwYTBQ4BLwEmBg8BBhYfARYyNwE+ASYiFzAfAQH1eGdkOzw8O2Rn8GZkOzw8O2RmeG5eWzY3NzZbXtteWzY3NzZbXmn+9gYSBmAGDwUDBQEGfQUQBgElBQELEBUBAQOtPDtkZ/BnYzs8PDtjZ/BnZDs8/K83NVte215cNTc3NVxe215bNTcCJt0FAQVJBQIGBAcRBoAGBQEhBQ8LBAEBAAABAAAAAAO7AzoAFwAAEy4BPwE+AR8BFjY3ATYWFycWFAcBBiInPQoGBwUHGgzLDCELAh0LHwsNCgr9uQoeCgGzCyEOCw0HCZMJAQoBvgkCCg0LHQv9sQsKAAAAAAIAAAAAA+UD5gAXACwAAAEiBwYHBhUUFxYXFjMyNzY3NjU0JyYnJhMHBi8BJicmNRM0NjsBMhYVExceAQHvhHJvQUNDQm5zg4l1cUJEREJxdVcQAwT6AwIEEAMCKwIDDsUCAQPlREJxdYmDc25CQ0NBb3KEiXVxQkT9VhwEAncCAgMGAXoCAwMC/q2FAgQAAAQAAAAAA68DrQADABgALQAzAAABMB8BAyIHBgcGFBcWFxYyNzY3NjQnJicmAyInJicmNDc2NzYyFxYXFhQHBgcGAyMVMzUjAuUBAfJ4Z2Q7PDw7ZGfwZmQ7PDw7ZGZ4bl5bNjc3Nlte215bNjc3NltemyT92QKDAQEBLDw7ZGfwZ2M7PDw7Y2fwZ2Q7PPyvNzVbXtteXDU3NzVcXtteWzU3AjH9JAAAAAMAAAAAA+QD5AAXACcAMAAAASIHBgcGFRQXFhcWMzI3Njc2NTQnJicmAzMyFhUDFAYrASImNQM0NhMiJjQ2MhYUBgHuhHJvQUNDQm5zg4l1cUJEREJxdZ42BAYMAwInAwMMBh8PFhYeFhYD40RCcXWJg3NuQkNDQW9yhIl1cUJE/vYGBf7AAgMDAgFABQb+NhYfFhYfFgAABAAAAAADwAPAAAgAEgAoAD0AAAEyNjQmIgYUFhcjFTMRIxUzNSMDIgcGBwYVFBYXFjMyNzY3NjU0Jy4BAyInJicmNDc2NzYyFxYXFhQHBgcGAfQYISEwISFRjzk5yTorhG5rPT99am+DdmhlPD4+PMyFbV5bNTc3NVte2l5bNTc3NVteAqAiLyIiLyI5Hf7EHBwCsT89a26Ed8w8Pj48ZWh2g29qffyjNzVbXtpeWzU3NzVbXtpeWzU3AAADAAAAAAOoA6gACwAgADUAAAEHJwcXBxc3FzcnNwMiBwYHBhQXFhcWMjc2NzY0JyYnJgMiJyYnJjQ3Njc2MhcWFxYUBwYHBgKOmpocmpocmpocmpq2dmZiOjs7OmJm7GZiOjs7OmJmdmtdWTQ2NjRZXdZdWTQ2NjRZXQKqmpocmpocmpocmpoBGTs6YmbsZmI6Ozs6YmbsZmI6O/zCNjRZXdZdWTQ2NjRZXdZdWTQ2AAMAAAAAA+kD6gAaAC8AMAAAAQYHBiMiJyYnJjQ3Njc2MhcWFxYVFAcGBwEHATI3Njc2NCcmJyYiBwYHBhQXFhcWMwKONUBCR21dWjU3NzVaXdpdWzU2GBcrASM5/eBXS0grKysrSEuuSkkqLCwqSUpXASMrFxg2NVtd2l1aNTc3NVpdbUdCQDX+3jkBGSsrSEuuSkkqLCwqSUquS0grKwAC//8AAAPoA+gAFAAwAAABIgcGBwYQFxYXFiA3Njc2ECcmJyYTFg4BIi8BBwYuATQ/AScmPgEWHwE3Nh4BBg8BAfSIdHFDRERDcXQBEHRxQ0REQ3F0SQoBFBsKoqgKGxMKqKIKARQbCqKoChsUAQqoA+hEQ3F0/vB0cUNERENxdAEQdHFDRP1jChsTCqiiCgEUGwqiqAobFAEKqKIKARQbCqIAAAIAAAAAA+QD5AAXADQAAAEiBwYHBhUUFxYXFjMyNzY3NjU0JyYnJhMUBiMFFxYUDwEGLwEuAT8BNh8BFhQPAQUyFh0BAe6Ecm9BQ0NCbnODiXVxQkREQnF1fwQC/pGDAQEVAwTsAgEC7AQEFAIBhAFwAgMD40RCcXWJg3NuQkNDQW9yhIl1cUJE/fYCAwuVAgQCFAQE0AIFAtEEBBQCBQGVCwMDJwAAAAUAAAAAA9QD0wAjACcANwBHAEgAAAERFAYjISImNREjIiY9ATQ2MyE1NDYzITIWHQEhMhYdARQGIyERIREHIgYVERQWOwEyNjURNCYjISIGFREUFjsBMjY1ETQmKwEDeyYb/XYbJkMJDQ0JAQYZEgEvExkBBgkNDQn9CQJc0QkNDQktCQ0NCf7sCQ0NCS0JDQ0JLQMi/TQbJiYbAswMCiwJDS4SGRkSLg0JLAoM/UwCtGsNCf5NCQ0NCQGzCQ0NCf5NCQ0NCQGzCQ0AAAAAEADGAAEAAAAAAAEABAAAAAEAAAAAAAIABwAEAAEAAAAAAAMABAALAAEAAAAAAAQABAAPAAEAAAAAAAUACwATAAEAAAAAAAYABAAeAAEAAAAAAAoAKwAiAAEAAAAAAAsAEwBNAAMAAQQJAAEACABgAAMAAQQJAAIADgBoAAMAAQQJAAMACAB2AAMAAQQJAAQACAB+AAMAAQQJAAUAFgCGAAMAAQQJAAYACACcAAMAAQQJAAoAVgCkAAMAAQQJAAsAJgD6d2V1aVJlZ3VsYXJ3ZXVpd2V1aVZlcnNpb24gMS4wd2V1aUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAHcAZQB1AGkAUgBlAGcAdQBsAGEAcgB3AGUAdQBpAHcAZQB1AGkAVgBlAHIAcwBpAG8AbgAgADEALgAwAHcAZQB1AGkARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETAAZjaXJjbGUIZG93bmxvYWQEaW5mbwxzYWZlX3N1Y2Nlc3MJc2FmZV93YXJuB3N1Y2Nlc3MOc3VjY2Vzcy1jaXJjbGURc3VjY2Vzcy1uby1jaXJjbGUHd2FpdGluZw53YWl0aW5nLWNpcmNsZQR3YXJuC2luZm8tY2lyY2xlBmNhbmNlbAZzZWFyY2gFY2xlYXIEYmFjawZkZWxldGUAAAAA') format('truetype');\n}\n[class^=\"weui-icon-\"],\n[class*=\" weui-icon-\"] {\n  display: inline-block;\n  vertical-align: middle;\n  font: normal normal normal 14px/1 \"weui\";\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n}\n[class^=\"weui-icon-\"]:before,\n[class*=\" weui-icon-\"]:before {\n  display: inline-block;\n  margin-left: .2em;\n  margin-right: .2em;\n}\n.weui-icon-circle:before {\n  content: \"\\EA01\";\n}\n/* '' */\n.weui-icon-download:before {\n  content: \"\\EA02\";\n}\n/* '' */\n.weui-icon-info:before {\n  content: \"\\EA03\";\n}\n/* '' */\n.weui-icon-safe-success:before {\n  content: \"\\EA04\";\n}\n/* '' */\n.weui-icon-safe-warn:before {\n  content: \"\\EA05\";\n}\n/* '' */\n.weui-icon-success:before {\n  content: \"\\EA06\";\n}\n/* '' */\n.weui-icon-success-circle:before {\n  content: \"\\EA07\";\n}\n/* '' */\n.weui-icon-success-no-circle:before {\n  content: \"\\EA08\";\n}\n/* '' */\n.weui-icon-waiting:before {\n  content: \"\\EA09\";\n}\n/* '' */\n.weui-icon-waiting-circle:before {\n  content: \"\\EA0A\";\n}\n/* '' */\n.weui-icon-warn:before {\n  content: \"\\EA0B\";\n}\n/* '' */\n.weui-icon-info-circle:before {\n  content: \"\\EA0C\";\n}\n/* '' */\n.weui-icon-cancel:before {\n  content: \"\\EA0D\";\n}\n/* '' */\n.weui-icon-search:before {\n  content: \"\\EA0E\";\n}\n/* '' */\n.weui-icon-clear:before {\n  content: \"\\EA0F\";\n}\n/* '' */\n.weui-icon-back:before {\n  content: \"\\EA10\";\n}\n/* '' */\n.weui-icon-delete:before {\n  content: \"\\EA11\";\n}\n/* '' */\n[class^=\"weui-icon_\"]:before,\n[class*=\" weui-icon_\"]:before {\n  margin: 0;\n}\n.weui-icon-success {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-waiting {\n  font-size: 23px;\n  color: #10AEFF;\n}\n.weui-icon-warn {\n  font-size: 23px;\n  color: #F43530;\n}\n.weui-icon-info {\n  font-size: 23px;\n  color: #10AEFF;\n}\n.weui-icon-success-circle {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-success-no-circle {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-waiting-circle {\n  font-size: 23px;\n  color: #10AEFF;\n}\n.weui-icon-circle {\n  font-size: 23px;\n  color: #C9C9C9;\n}\n.weui-icon-download {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-info-circle {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-safe-success {\n  color: #09BB07;\n}\n.weui-icon-safe-warn {\n  color: #FFBE00;\n}\n.weui-icon-cancel {\n  color: #F43530;\n  font-size: 22px;\n}\n.weui-icon-search {\n  color: #B2B2B2;\n  font-size: 14px;\n}\n.weui-icon-clear {\n  color: #B2B2B2;\n  font-size: 14px;\n}\n.weui-icon-delete.weui-icon_gallery-delete {\n  color: #FFFFFF;\n  font-size: 22px;\n}\n.weui-icon_msg {\n  font-size: 93px;\n}\n.weui-icon_msg.weui-icon-warn {\n  color: #F76260;\n}\n.weui-icon_msg-primary {\n  font-size: 93px;\n}\n.weui-icon_msg-primary.weui-icon-warn {\n  color: #FFBE00;\n}\n.weui-toast {\n  position: fixed;\n  z-index: 5000;\n  width: 7.6em;\n  min-height: 7.6em;\n  top: 180px;\n  left: 50%;\n  margin-left: -3.8em;\n  background: rgba(17, 17, 17, 0.7);\n  text-align: center;\n  border-radius: 5px;\n  color: #FFFFFF;\n}\n.weui-icon_toast {\n  margin: 22px 0 0;\n  display: block;\n}\n.weui-icon_toast.weui-icon-success-no-circle:before {\n  color: #FFFFFF;\n  font-size: 55px;\n}\n.weui-icon_toast.weui-loading {\n  margin: 30px 0 0;\n  width: 38px;\n  height: 38px;\n  vertical-align: baseline;\n}\n.weui-toast__content {\n  margin: 0 0 15px;\n}\n.weui-toast.vux-toast-top {\n  top: 10px;\n}\n.weui-toast.vux-toast-bottom {\n  top: auto;\n  bottom: 10px;\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n.weui-toast.vux-toast-middle {\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n      -ms-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n.vux-slide-from-top-enter,\n.vux-slide-from-top-leave-active {\n  opacity: 0;\n  -webkit-transform: translateX(-50%) translateY(-100%) !important;\n      -ms-transform: translateX(-50%) translateY(-100%) !important;\n          transform: translateX(-50%) translateY(-100%) !important;\n}\n.vux-slide-from-bottom-enter,\n.vux-slide-from-bottom-leave-active {\n  opacity: 0;\n  -webkit-transform: translateX(-50%) translateY(100%) !important;\n      -ms-transform: translateX(-50%) translateY(100%) !important;\n          transform: translateX(-50%) translateY(100%) !important;\n}\n.vux-slide-from-top-enter-active,\n.vux-slide-from-top-leave-active,\n.vux-slide-from-bottom-enter-active,\n.vux-slide-from-bottom-leave-active {\n  -webkit-transition: all 400ms cubic-bezier(0.36, 0.66, 0.04, 1);\n  transition: all 400ms cubic-bezier(0.36, 0.66, 0.04, 1);\n}\n.weui-toast {\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n  margin-left: 0!important;\n}\n.weui-toast.weui-toast_forbidden {\n  color: #F76260;\n}\n.weui-toast.weui-toast_forbidden .weui-toast__content {\n  margin-top: 10px;\n}\n.weui-toast.weui-toast_text {\n  min-height: 0;\n}\n.weui-toast_text .weui-toast__content {\n  margin: 0;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-radius: 15px;\n}\n.weui-toast__content {\n  font-size: 16px;\n}\n.weui-loading_toast .weui-toast__content {\n  margin-top: 0;\n}\n.weui-toast_success .weui-icon_toast:before {\n  content: \"\\EA08\";\n}\n.weui-toast_cancel .weui-icon_toast:before {\n  content: \"\\EA0D\";\n}\n.weui-toast_forbidden .weui-icon_toast.weui-icon-success-no-circle:before {\n  content: \"\\EA0B\";\n  color: #F76260;\n}\n", ""]);

	// exports


/***/ },

/***/ 977:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _safariFix = __webpack_require__(978);

	var _safariFix2 = _interopRequireDefault(_safariFix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'toast',
	  mixins: [_safariFix2.default],
	  props: {
	    value: Boolean,
	    time: {
	      type: Number,
	      default: 2000
	    },
	    type: {
	      type: String,
	      default: 'success'
	    },
	    transition: String,
	    width: {
	      type: String,
	      default: '7.6em'
	    },
	    isShowMask: {
	      type: Boolean,
	      default: false
	    },
	    text: String,
	    position: String
	  },
	  data: function data() {
	    return {
	      show: false
	    };
	  },
	  created: function created() {
	    if (this.value) {
	      this.show = true;
	    }
	  },

	  computed: {
	    currentTransition: function currentTransition() {
	      if (this.transition) {
	        return this.transition;
	      }
	      if (this.position === 'top') {
	        return 'vux-slide-from-top';
	      }
	      if (this.position === 'bottom') {
	        return 'vux-slide-from-bottom';
	      }
	      return 'vux-fade';
	    },
	    toastClass: function toastClass() {
	      return {
	        'weui-toast_forbidden': this.type === 'warn',
	        'weui-toast_cancel': this.type === 'cancel',
	        'weui-toast_success': this.type === 'success',
	        'weui-toast_text': this.type === 'text',
	        'vux-toast-top': this.position === 'top',
	        'vux-toast-bottom': this.position === 'bottom',
	        'vux-toast-middle': this.position === 'middle'
	      };
	    },
	    style: function style() {
	      if (this.type === 'text' && this.width === 'auto') {
	        return { padding: '10px' };
	      }
	    }
	  },
	  watch: {
	    show: function show(val) {
	      var _this = this;

	      if (val) {
	        this.$emit('input', true);
	        this.$emit('on-show');
	        this.fixSafariOverflowScrolling('auto');

	        clearTimeout(this.timeout);
	        this.timeout = setTimeout(function () {
	          _this.show = false;
	          _this.$emit('input', false);
	          _this.$emit('on-hide');
	          _this.fixSafariOverflowScrolling('touch');
	        }, this.time);
	      }
	    },
	    value: function value(val) {
	      this.show = val;
	    }
	  }
	  // </script>
	  //
	  // <style lang="less">
	  // @import '../../styles/transition.less';
	  // @import '../../styles/weui/widget/weui_tips/weui_mask';
	  // @import '../../styles/weui/icon/weui_icon_font';
	  // @import '../../styles/weui/widget/weui_tips/weui_toast';
	  //
	  // .weui-toast.vux-toast-top {
	  //   top: @toast-position-top-offset;
	  // }
	  // .weui-toast.vux-toast-bottom {
	  //   top: auto;
	  //   bottom: @toast-position-bottom-offset;
	  //   transform: translateX(-50%);
	  // }
	  // .weui-toast.vux-toast-middle {
	  //   top: 50%;
	  //   transform: translateX(-50%) translateY(-50%);
	  // }
	  // .vux-slide-from-top-enter, .vux-slide-from-top-leave-active {
	  //   opacity: 0;
	  //   transform: translateX(-50%) translateY(-100%)!important;
	  // }
	  // .vux-slide-from-bottom-enter, .vux-slide-from-bottom-leave-active {
	  //   opacity: 0;
	  //   transform: translateX(-50%) translateY(100%)!important;
	  // }
	  // .vux-slide-from-top-enter-active,
	  // .vux-slide-from-top-leave-active,
	  // .vux-slide-from-bottom-enter-active,
	  // .vux-slide-from-bottom-leave-active {
	  //   transition: all 400ms cubic-bezier(.36,.66,.04,1);
	  // }
	  // .weui-toast {
	  //   transform: translateX(-50%);
	  //   margin-left: 0!important;
	  // }
	  // .weui-toast.weui-toast_forbidden {
	  //   color: #F76260;
	  // }
	  // .weui-toast.weui-toast_forbidden .weui-toast__content {
	  //   margin-top: 10px;
	  // }
	  // .weui-toast.weui-toast_text{
	  //   min-height: 0;
	  // }
	  // .weui-toast_text .weui-toast__content {
	  //   margin: 0;
	  //   padding-top: 10px;
	  //   padding-bottom: 10px;
	  //   border-radius: 15px;
	  // }
	  // .weui-toast__content {
	  //   font-size: @toast-content-font-size;
	  // }
	  // .weui-loading_toast .weui-toast__content {
	  //   margin-top: 0;
	  // }
	  // .weui-toast_success .weui-icon_toast:before {
	  //   content: "\EA08";
	  // }
	  // .weui-toast_cancel .weui-icon_toast:before {
	  //   content: "\EA0D";
	  // }
	  // .weui-toast_forbidden .weui-icon_toast.weui-icon-success-no-circle:before {
	  //   content: "\EA0B";
	  //   color: #F76260;
	  // }
	  // </style>

	}; // <template>
	//   <div class="vux-toast">
	//     <div class="weui-mask_transparent" v-show="isShowMask && show"></div>
	//     <transition :name="currentTransition">
	//       <div class="weui-toast" :style="{width: width}" :class="toastClass" v-show="show">
	//         <i class="weui-icon-success-no-circle weui-icon_toast" v-show="type !== 'text'"></i>
	//         <p class="weui-toast__content" v-if="text" :style="style" v-html="$t(text)"></p>
	//         <p class="weui-toast__content" v-else><slot></slot></p>
	//       </div>
	//     </transition>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 978:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  mounted: function mounted() {
	    this.$overflowScrollingList = document.querySelectorAll('.vux-fix-safari-overflow-scrolling');
	  },

	  methods: {
	    fixSafariOverflowScrolling: function fixSafariOverflowScrolling(type) {
	      if (!this.$overflowScrollingList.length) return;
	      // if (!/iphone/i.test(navigator.userAgent)) return
	      for (var i = 0; i < this.$overflowScrollingList.length; i++) {
	        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type;
	      }
	    }
	  }
	};

/***/ },

/***/ 979:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-toast\">\n  <div class=\"weui-mask_transparent\" v-show=\"isShowMask && show\"></div>\n  <transition :name=\"currentTransition\">\n    <div class=\"weui-toast\" :style=\"{width: width}\" :class=\"toastClass\" v-show=\"show\">\n      <i class=\"weui-icon-success-no-circle weui-icon_toast\" v-show=\"type !== 'text'\"></i>\n      <p class=\"weui-toast__content\" v-if=\"text\" :style=\"style\" v-html=\"text\"></p>\n      <p class=\"weui-toast__content\" v-else><slot></slot></p>\n    </div>\n  </transition>\n</div>\n";

/***/ },

/***/ 985:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _scriptjs = __webpack_require__(986);

	var _scriptjs2 = _interopRequireDefault(_scriptjs);

	var _$ = __webpack_require__(95);

	var _$2 = _interopRequireDefault(_$);

	var _config = __webpack_require__(156);

	var _config2 = _interopRequireDefault(_config);

	var _jsCookie = __webpack_require__(987);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _util = __webpack_require__(988);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 项目所需所有微信接口列表
	var jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];

	/**
	 * weixin模块
	 * 微信相关设置
	 */
	exports.default = {
	  /**
	   * 设置微信分享信息
	   * @param param 分享信息
	   * @param response php接口(调用php接口时传js_wx_info参数会在公参返回微信验证信息)
	   * 调用方法:
	   share.setWeixinShareInfo({
	      title: '大V店组团包邮', // 分享标题
	      desc: '一件包邮！每天上新！好货低价又包邮，抢到了就赚翻啦', // 分享描述
	      link: location.href, // 分享链接
	      imgUrl: 'http://pic.davdian.com/free/2016/04/09/320_320_0fc3e0dbbadd249b7f1b93a525f0adf0.jpg', // 分享图标
	    }, response);
	   */
	  setShareInfo: function setShareInfo(param, response) {
	    // 开发模式不调用验证信息
	    if (location.href.indexOf("localhost") > -1 || location.href.indexOf("//192.168") > -1) {
	      return;
	    }

	    // param分享参数覆盖默认分享信息
	    var shareInfo = _$2.default.extend({}, _config2.default.defaultShareInfo, {
	      type: '', // 分享类型,music、video或link，不填默认为link
	      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	      success: function success() {}, // 用户确认分享后执行的回调函数
	      cancel: function cancel() {} // 用户取消分享后执行的回调函数
	    }, param);

	    // 加载微信jssdk
	    (0, _scriptjs2.default)('//res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
	      // 更新cookie中weixin_verify_info
	      var updateVerifyInfo = function updateVerifyInfo(callback) {
	        // 从PHP获取微信token
	        _$2.default.ajax({
	          cache: false,
	          async: true,
	          url: '/wechatJsToken',
	          type: 'get',
	          dataType: 'json',
	          data: {
	            url: encodeURIComponent(location.href)
	          },
	          success: function success(response) {
	            if (response && response.data) {
	              _jsCookie2.default.set('weixin_verify_info', JSON.stringify(response.data), {
	                domain: _util2.default.getBaseDomain(),
	                path: '/',
	                expires: 1 / 24 // 有效时间1小时
	              });
	              callback();
	            }
	          },
	          error: function error(_error) {
	            // alert('调用/wechatJsToken接口error');
	            console.log('调用/wechatJsToken接口error');
	          }
	        });
	      };

	      // 进行微信验证
	      var verify = function verify(response) {
	        var appInfo = null;

	        if (response) {
	          // alert('wx_info:' + JSON.stringify(response.wx_info));
	          // 使用接口公参的微信验证信息
	          appInfo = {
	            appId: response.wx_info.appId,
	            timestamp: response.sys_time,
	            nonceStr: response.wx_info.nonceStr,
	            signature: response.wx_info.signature
	          };
	        } else if (_jsCookie2.default.get('weixin_verify_info')) {
	          // 使用cookie的微信验证信息
	          appInfo = JSON.parse(_jsCookie2.default.get('weixin_verify_info'));
	        } else {
	          // 从wechatJsToken接口取微信验证信息
	          updateVerifyInfo(verify);
	          return;
	        }

	        // 通过config接口注入权限验证配置
	        wx.config({
	          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	          appId: appInfo.appId, // 必填，公众号的唯一标识
	          timestamp: appInfo.timestamp, // 必填，生成签名的时间戳
	          nonceStr: appInfo.nonceStr, // 必填，生成签名的随机串
	          signature: appInfo.signature, // 必填，签名，见附录1
	          jsApiList: [].concat(jsApiList) // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        });
	      };

	      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	      wx.ready(function () {
	        console.log('微信验证成功');
	        // 为每个分享平台设置相同的分享信息
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = jsApiList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var api = _step.value;

	            wx[api](shareInfo);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      });

	      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	      wx.error(function (res) {
	        console.error('微信验证失败');
	        if (!updateVerifyInfo.execTimes || updateVerifyInfo.execTimes < 2) {
	          updateVerifyInfo(verify);
	          updateVerifyInfo.execTimes = updateVerifyInfo.execTimes ? updateVerifyInfo.execTimes + 1 : 1;
	        }
	      });

	      verify(response);
	    });
	  },

	  /**
	   * 功能：跳转微信授权页面
	   * @param show true为显示授权，false为隐式授权
	   */
	  goAuthPage: function goAuthPage(show) {
	    // 微信授权后回调页面url
	    // var redirect_uri = `${location.protocol}//open.davdian.com/view_[[env_stage]]_[[env_num]]/weixin_auth_redirect.html?env_num=[[env_num]]&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;
	    // var redirect_uri = `${location.protocol}//open.davdian.com/view_gray_9/weixin_auth_redirect.html?env_num=[[env_num]]&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;
	    // var redirect_uri = `${location.protocol}//open.davdian.com/view/weixin_auth_redirect.html?env_num=[[env_num]]&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;
	    var redirect_uri = location.protocol + '//open.davdian.com/view/weixin_auth_redirect.html?referrer_protocal=' + encodeURIComponent(location.protocol) + '&referrer_host=' + encodeURIComponent(location.host) + '&referrer_path=' + encodeURIComponent(location.href.split(location.host)[1]);

	    // 微信授权页面url，davdian.com的appid=wx5f9796f55f5366b6，vyohui.cn的aooud=wx588f41c3ea092fe0
	    var url = '//open.weixin.qq.com/connect/oauth2/authorize?appid=wx5f9796f55f5366b6&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_' + (show ? 'userinfo' : 'base') + '&state=' + Date.now();

	    // 去微信授权页面
	    location.href = url;
	    throw new Error('\u5373\u5C06\u8DF3\u8F6C\u5FAE\u4FE1\u6388\u6743\u9875(' + location.href + ')\uFF0C\u5DF2\u4E3B\u52A8\u629B\u51FA\u5F02\u5E38\u4E2D\u65AD\u5F53\u524D\u9875\u9762js\u6267\u884C\uFF0C\u8BF7\u5FFD\u7565\u6B64\u5F02\u5E38\u4FE1\u606F~');
	  }
	};

/***/ },

/***/ 986:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  * $script.js JS loader & dependency manager
	  * https://github.com/ded/script.js
	  * (c) Dustin Diaz 2014 | License MIT
	  */

	(function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition()
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else this[name] = definition()
	})('$script', function () {
	  var doc = document
	    , head = doc.getElementsByTagName('head')[0]
	    , s = 'string'
	    , f = false
	    , push = 'push'
	    , readyState = 'readyState'
	    , onreadystatechange = 'onreadystatechange'
	    , list = {}
	    , ids = {}
	    , delay = {}
	    , scripts = {}
	    , scriptpath
	    , urlArgs

	  function every(ar, fn) {
	    for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
	    return 1
	  }
	  function each(ar, fn) {
	    every(ar, function (el) {
	      return !fn(el)
	    })
	  }

	  function $script(paths, idOrDone, optDone) {
	    paths = paths[push] ? paths : [paths]
	    var idOrDoneIsDone = idOrDone && idOrDone.call
	      , done = idOrDoneIsDone ? idOrDone : optDone
	      , id = idOrDoneIsDone ? paths.join('') : idOrDone
	      , queue = paths.length
	    function loopFn(item) {
	      return item.call ? item() : list[item]
	    }
	    function callback() {
	      if (!--queue) {
	        list[id] = 1
	        done && done()
	        for (var dset in delay) {
	          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
	        }
	      }
	    }
	    setTimeout(function () {
	      each(paths, function loading(path, force) {
	        if (path === null) return callback()
	        
	        if (!force && !/^https?:\/\//.test(path) && scriptpath) {
	          path = (path.indexOf('.js') === -1) ? scriptpath + path + '.js' : scriptpath + path;
	        }
	        
	        if (scripts[path]) {
	          if (id) ids[id] = 1
	          return (scripts[path] == 2) ? callback() : setTimeout(function () { loading(path, true) }, 0)
	        }

	        scripts[path] = 1
	        if (id) ids[id] = 1
	        create(path, callback)
	      })
	    }, 0)
	    return $script
	  }

	  function create(path, fn) {
	    var el = doc.createElement('script'), loaded
	    el.onload = el.onerror = el[onreadystatechange] = function () {
	      if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
	      el.onload = el[onreadystatechange] = null
	      loaded = 1
	      scripts[path] = 2
	      fn()
	    }
	    el.async = 1
	    el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
	    head.insertBefore(el, head.lastChild)
	  }

	  $script.get = create

	  $script.order = function (scripts, id, done) {
	    (function callback(s) {
	      s = scripts.shift()
	      !scripts.length ? $script(s, id, done) : $script(s, callback)
	    }())
	  }

	  $script.path = function (p) {
	    scriptpath = p
	  }
	  $script.urlArgs = function (str) {
	    urlArgs = str;
	  }
	  $script.ready = function (deps, ready, req) {
	    deps = deps[push] ? deps : [deps]
	    var missing = [];
	    !each(deps, function (dep) {
	      list[dep] || missing[push](dep);
	    }) && every(deps, function (dep) {return list[dep]}) ?
	      ready() : !function (key) {
	      delay[key] = delay[key] || []
	      delay[key][push](ready)
	      req && req(missing)
	    }(deps.join('|'))
	    return $script
	  }

	  $script.done = function (idOrDone) {
	    $script([null], idOrDone)
	  }

	  return $script
	});


/***/ },

/***/ 987:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.4
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (true) {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					// We're using "expires" because "max-age" is not supported by IE
					attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					var stringifiedAttributes = '';

					for (var attributeName in attributes) {
						if (!attributes[attributeName]) {
							continue;
						}
						stringifiedAttributes += '; ' + attributeName;
						if (attributes[attributeName] === true) {
							continue;
						}
						stringifiedAttributes += '=' + attributes[attributeName];
					}
					return (document.cookie = key + '=' + value + stringifiedAttributes);
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));


/***/ },

/***/ 988:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 该模块存放短小的工具方法,如方法代码量大或几个方法是同一类型,应封装成独立模块
	 */
	exports.default = {
	  /**
	   * 页面触底通知回调
	   */
	  pageScrollToBottom: function pageScrollToBottom(callback) {
	    window.addEventListener('scroll', function () {
	      if (document.documentElement.clientHeight + document.body.scrollTop >= document.body.clientHeight * 0.95) {
	        callback();
	      }
	    }, false);
	  },
	  getOffsetLeft: function getOffsetLeft(node) {
	    if (node.offsetParent) {
	      return node.offsetLeft + this.getOffsetLeft(node.offsetParent);
	    } else {
	      return node.offsetLeft;
	    }
	  },
	  getOffsetTop: function getOffsetTop(node) {
	    if (node.offsetParent) {
	      return node.offsetTop + this.getOffsetTop(node.offsetParent);
	    } else {
	      return node.offsetTop;
	    }
	  },

	  /**
	   * 获取页面基础域名
	   */
	  getBaseDomain: function getBaseDomain() {
	    return (/(bravetime.net|vyohui.cn|davdian.com)/.exec(location.host)[0]
	    );
	  }
	};

/***/ },

/***/ 998:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(999)
	__vue_script__ = __webpack_require__(1001)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/swiper/swiper.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1005)
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
	  var id = "_v-df5bf68c/swiper.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 999:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1000);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./swiper.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./swiper.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1000:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.vux-slider {\n  overflow: hidden;\n  position: relative;\n}\n.vux-slider > .vux-indicator,\n.vux-slider .vux-indicator-right {\n  position: absolute;\n  right: 15px;\n  bottom: 10px;\n}\n.vux-slider > .vux-indicator > a,\n.vux-slider .vux-indicator-right > a {\n  float: left;\n  margin-left: 6px;\n}\n.vux-slider > .vux-indicator > a > .vux-icon-dot,\n.vux-slider .vux-indicator-right > a > .vux-icon-dot {\n  display: inline-block;\n  vertical-align: middle;\n  width: 6px;\n  height: 6px;\n  border-radius: 3px;\n  background-color: #d0cdd1;\n}\n.vux-slider > .vux-indicator > a > .vux-icon-dot.active,\n.vux-slider .vux-indicator-right > a > .vux-icon-dot.active {\n  background-color: #04BE02;\n}\n.vux-slider > .vux-indicator-center {\n  right: 50%;\n  -webkit-transform: translateX(50%);\n      -ms-transform: translateX(50%);\n          transform: translateX(50%);\n}\n.vux-slider > .vux-indicator-left {\n  left: 15px;\n  right: auto;\n}\n.vux-slider > .vux-swiper {\n  overflow: hidden;\n  position: relative;\n}\n.vux-slider > .vux-swiper > .vux-swiper-item {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.vux-slider > .vux-swiper > .vux-swiper-item > a {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background: center center no-repeat;\n  background-size: cover;\n}\n.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 1.4em;\n  font-size: 16px;\n  padding: 20px 50px 12px 13px;\n  margin: 0;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.7)));\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.7) 100%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.7) 100%);\n  color: #fff;\n  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  word-wrap: normal;\n}\n", ""]);

	// exports


/***/ },

/***/ 1001:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _swiper = __webpack_require__(1002);

	var _swiper2 = _interopRequireDefault(_swiper);

	var _router = __webpack_require__(931);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//   <div class="vux-slider">
	//     <div class="vux-swiper" :style="{height: xheight}">
	//       <slot></slot>
	//       <div class="vux-swiper-item" v-for="(item, index) in list" @click="clickListItem(item)" :data-index="index">
	//         <a href="javascript:">
	//           <div class="vux-img" :style="{backgroundImage: buildBackgroundUrl(item.img)}"></div>
	//           <p class="vux-swiper-desc" v-if="showDescMask">{{item.title}}</p>
	//         </a>
	//       </div>
	//       <div v-if="listTwoLoopItem.length > 0" class="vux-swiper-item vux-swiper-item-clone" v-for="(item, index) in listTwoLoopItem" @click="clickListItem(item)" :data-index="index">
	//         <a href="javascript:">
	//           <div class="vux-img" :style="{backgroundImage: buildBackgroundUrl(item.img)}"></div>
	//           <p class="vux-swiper-desc" v-if="showDescMask">{{item.title}}</p>
	//         </a>
	//       </div>
	//     </div>
	//     <div :class="[dotsClass, 'vux-indicator', 'vux-indicator-' + dotsPosition]" v-show="showDots">
	//       <a href="javascript:" v-for="key in length">
	//         <i class="vux-icon-dot" :class="{'active': key - 1 === current}"></i>
	//       </a>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'swiper',
	  created: function created() {
	    this.index = this.value || 0;
	    if (this.index) {
	      this.current = this.index;
	    }
	  },
	  mounted: function mounted() {
	    var _this2 = this;

	    this.hasTwoLoopItem();
	    this.$nextTick(function () {
	      if (!(_this2.list && _this2.list.length === 0)) {
	        _this2.render(_this2.index);
	      }
	      _this2.xheight = _this2.getHeight();
	    });
	  },

	  methods: {
	    hasTwoLoopItem: function hasTwoLoopItem() {
	      if (this.list.length === 2 && this.loop) {
	        this.listTwoLoopItem = this.list;
	      }
	    },
	    clickListItem: function clickListItem(item) {
	      (0, _router.go)(item.url, this.$router);
	      this.$emit('on-click-list-item', JSON.parse(JSON.stringify(item)));
	    },
	    buildBackgroundUrl: function buildBackgroundUrl(url) {
	      return 'url(' + url + ')';
	    },
	    render: function render() {
	      var _this3 = this;

	      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      this.swiper && this.swiper.destroy();
	      this.swiper = new _swiper2.default({
	        container: this.$el,
	        direction: this.direction,
	        auto: this.auto,
	        loop: this.loop,
	        interval: this.interval,
	        threshold: this.threshold,
	        duration: this.duration,
	        height: this.height || this._height,
	        minMovingDistance: this.minMovingDistance,
	        imgList: this.imgList
	      }).on('swiped', function (prev, index) {
	        _this3.current = index % _this3.length;
	        _this3.index = index % _this3.length;
	      });
	      if (index > 0) {
	        this.swiper.go(index);
	      }
	    },
	    rerender: function rerender() {
	      var _this4 = this;

	      if (!this.$el || this.hasRender) {
	        return;
	      }
	      this.hasRender = true;
	      this.hasTwoLoopItem();
	      this.$nextTick(function () {
	        _this4.index = _this4.value || 0;
	        _this4.current = _this4.value || 0;
	        _this4.length = _this4.list.length || _this4.$children.length;
	        _this4.destroy();
	        _this4.render(_this4.value);
	      });
	    },
	    destroy: function destroy() {
	      this.hasRender = false;
	      this.swiper && this.swiper.destroy();
	    },
	    getHeight: function getHeight() {
	      // when list.length > 0, it's better to set height or ratio
	      var hasHeight = parseInt(this.height, 10);
	      if (hasHeight) return this.height;
	      if (!hasHeight) {
	        if (this.aspectRatio) {
	          return this.$el.offsetWidth * this.aspectRatio + 'px';
	        }
	        return '180px';
	      }
	    }
	  },
	  props: {
	    list: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    direction: {
	      type: String,
	      default: 'horizontal'
	    },
	    showDots: {
	      type: Boolean,
	      default: true
	    },
	    showDescMask: {
	      type: Boolean,
	      default: true
	    },
	    dotsPosition: {
	      type: String,
	      default: 'right'
	    },
	    dotsClass: String,
	    auto: {
	      type: Boolean,
	      default: false
	    },
	    loop: Boolean,
	    interval: {
	      type: Number,
	      default: 3000
	    },
	    threshold: {
	      type: Number,
	      default: 50
	    },
	    duration: {
	      type: Number,
	      default: 300
	    },
	    height: {
	      type: String,
	      default: 'auto'
	    },
	    aspectRatio: Number,
	    minMovingDistance: {
	      type: Number,
	      default: 0
	    },
	    value: {
	      type: Number,
	      default: 0
	    }
	  },
	  data: function data() {
	    return {
	      hasRender: false,
	      current: this.index || 0,
	      xheight: 'auto',
	      length: this.list.length,
	      index: 0,
	      // issue #1484 Fix click to fail
	      listTwoLoopItem: []
	    };
	  },

	  watch: {
	    list: function list(val) {
	      this.rerender();
	    },
	    current: function current(currentIndex) {
	      this.index = currentIndex;
	      this.$emit('on-index-change', currentIndex);
	    },
	    index: function index(val) {
	      var _this = this;
	      if (val !== this.current) {
	        this.$nextTick(function () {
	          _this.swiper && _this.swiper.go(val);
	        });
	      }
	      this.$emit('input', val);
	    },
	    value: function value(val) {
	      this.index = val;
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.destroy();
	  }
	};

	// </script>
	//
	// <style lang="less">
	// @import '../../styles/variable.less';
	//
	// @pre: vux;
	//
	// .@{pre}-slider {
	//   overflow: hidden;
	//   position: relative;
	//
	//   > .@{pre}-indicator, .@{pre}-indicator-right {
	//     position: absolute;
	//     right: 15px;
	//     bottom: 10px;
	//
	//     > a {
	//       float: left;
	//       margin-left: 6px;
	//
	//       > .@{pre}-icon-dot {
	//         display: inline-block;
	//         vertical-align: middle;
	//         width: 6px;
	//         height: 6px;
	//         border-radius: 3px;
	//         background-color: #d0cdd1;
	//       }
	//       > .@{pre}-icon-dot.active {
	//         background-color: @swiper-indicator-active-color;
	//       }
	//
	//     }
	//   }
	//
	//   > .@{pre}-indicator-center {
	//     right: 50%;
	//     transform: translateX(50%)
	//   }
	//
	//   > .@{pre}-indicator-left {
	//     left: 15px;
	//     right: auto;
	//   }
	//
	//   > .@{pre}-swiper {
	//     overflow: hidden;
	//     position: relative;
	//
	//     > .@{pre}-swiper-item {
	//       position: absolute;
	//       top: 0;
	//       left: 0;
	//       width: 100%;
	//       height: 100%;
	//
	//       > a {
	//         display: block;
	//         width: 100%;
	//         height: 100%;
	//
	//         > .@{pre}-img {
	//           display: block;
	//           width: 100%;
	//           height: 100%;
	//           background: center center no-repeat;
	//           background-size: cover;
	//         }
	//
	//         > .@{pre}-swiper-desc {
	//           position: absolute;
	//           left: 0;
	//           right: 0;
	//           bottom: 0;
	//           height: 1.4em;
	//           font-size: 16px;
	//           padding: 20px 50px 12px 13px;
	//           margin: 0;
	//           background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .7) 100%);
	//           color: #fff;
	//           text-shadow: 0 1px 0 rgba(0, 0, 0, .5);
	//           overflow: hidden;
	//           text-overflow: ellipsis;
	//           white-space: nowrap;
	//           word-wrap: normal;
	//         }
	//
	//       }
	//     }
	//   }
	// }
	// </style>

/***/ },

/***/ 1002:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _arrayFrom = __webpack_require__(1003);

	var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

	var _objectAssign = __webpack_require__(972);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Swiper = function () {
	  function Swiper(options) {
	    _classCallCheck(this, Swiper);

	    this._default = {
	      container: '.vux-swiper',
	      item: '.vux-swiper-item',
	      direction: 'vertical',
	      activeClass: 'active',
	      threshold: 50,
	      duration: 300,
	      auto: false,
	      loop: false,
	      interval: 3000,
	      height: 'auto',
	      minMovingDistance: 0
	    };
	    this._options = (0, _objectAssign2.default)(this._default, options);
	    this._options.height = this._options.height.replace('px', '');
	    this._start = {};
	    this._move = {};
	    this._end = {};
	    this._eventHandlers = {};
	    this._prev = this._current = this._goto = 0;
	    this._width = this._height = this._distance = 0;
	    this._offset = [];
	    this.$box = this._options.container;
	    this.$container = this._options.container.querySelector('.vux-swiper');
	    this.$items = this.$container.querySelectorAll(this._options.item);
	    this.count = this.$items.length;
	    this.realCount = this.$items.length; // real items length
	    this._position = []; // used by go event
	    this._firstItemIndex = 0;
	    if (!this.count) {
	      return;
	    }
	    this._init();
	    this._auto();
	    this._bind();
	    this._onResize();
	    return this;
	  }

	  _createClass(Swiper, [{
	    key: '_auto',
	    value: function _auto() {
	      var me = this;
	      me.stop();
	      if (me._options.auto) {
	        me.timer = setTimeout(function () {
	          me.next();
	        }, me._options.interval);
	      }
	    }
	  }, {
	    key: 'updateItemWidth',
	    value: function updateItemWidth() {
	      this._width = this.$box.offsetWidth || document.documentElement.offsetWidth;
	      this._distance = this._options.direction === 'horizontal' ? this._width : this._height;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.timer && clearTimeout(this.timer);
	    }
	  }, {
	    key: '_loop',
	    value: function _loop() {
	      return this._options.loop && this.realCount >= 3;
	    }
	  }, {
	    key: '_onResize',
	    value: function _onResize() {
	      var me = this;
	      this.resizeHandler = function () {
	        setTimeout(function () {
	          me.updateItemWidth();
	          me._setOffset();
	          me._setTransform();
	        }, 100);
	      };
	      window.addEventListener('orientationchange', this.resizeHandler, false);
	    }
	  }, {
	    key: '_init',
	    value: function _init() {
	      this._height = this._options.height === 'auto' ? 'auto' : this._options.height - 0;
	      this.updateItemWidth();
	      this._initPosition();
	      this._activate(this._current);
	      this._setOffset();
	      this._setTransform();
	      if (this._loop()) {
	        this._loopRender();
	      }
	    }
	  }, {
	    key: '_initPosition',
	    value: function _initPosition() {
	      for (var i = 0; i < this.realCount; i++) {
	        this._position.push(i);
	      }
	    }
	  }, {
	    key: '_movePosition',
	    value: function _movePosition(position) {
	      var me = this;
	      if (position > 0) {
	        var firstIndex = me._position.splice(0, 1);
	        me._position.push(firstIndex[0]);
	      } else if (position < 0) {
	        var lastIndex = me._position.pop();
	        me._position.unshift(lastIndex);
	      }
	    }
	  }, {
	    key: '_setOffset',
	    value: function _setOffset() {
	      var me = this;
	      var index = me._position.indexOf(me._current);
	      me._offset = [];
	      (0, _arrayFrom2.default)(me.$items).forEach(function ($item, key) {
	        me._offset.push((key - index) * me._distance);
	      });
	    }
	  }, {
	    key: '_setTransition',
	    value: function _setTransition(duration) {
	      duration = duration || this._options.duration || 'none';
	      var transition = duration === 'none' ? 'none' : duration + 'ms';
	      (0, _arrayFrom2.default)(this.$items).forEach(function ($item, key) {
	        $item.style.webkitTransition = transition;
	        $item.style.transition = transition;
	      });
	    }
	  }, {
	    key: '_setTransform',
	    value: function _setTransform(offset) {
	      var me = this;
	      offset = offset || 0;
	      (0, _arrayFrom2.default)(me.$items).forEach(function ($item, key) {
	        var distance = me._offset[key] + offset;
	        var transform = 'translate3d(' + distance + 'px, 0, 0)';
	        if (me._options.direction === 'vertical') {
	          transform = 'translate3d(0, ' + distance + 'px, 0)';
	        }
	        $item.style.webkitTransform = transform;
	        $item.style.transform = transform;
	      });
	    }
	  }, {
	    key: '_bind',
	    value: function _bind() {
	      var me = this;
	      me.touchstartHandler = function (e) {
	        me.stop();
	        me._start.x = e.changedTouches[0].pageX;
	        me._start.y = e.changedTouches[0].pageY;
	        me._setTransition('none');
	      };
	      me.touchmoveHandler = function (e) {
	        me._move.x = e.changedTouches[0].pageX;
	        me._move.y = e.changedTouches[0].pageY;
	        var distanceX = me._move.x - me._start.x;
	        var distanceY = me._move.y - me._start.y;
	        var distance = distanceY;
	        var noScrollerY = Math.abs(distanceX) > Math.abs(distanceY);
	        if (me._options.direction === 'horizontal' && noScrollerY) {
	          distance = distanceX;
	        }
	        if ((me._options.minMovingDistance && Math.abs(distance) >= me._options.minMovingDistance || !me._options.minMovingDistance) && noScrollerY) {
	          me._setTransform(distance);
	        }

	        noScrollerY && e.preventDefault();
	      };

	      me.touchendHandler = function (e) {
	        me._end.x = e.changedTouches[0].pageX;
	        me._end.y = e.changedTouches[0].pageY;

	        var distance = me._end.y - me._start.y;
	        if (me._options.direction === 'horizontal') {
	          distance = me._end.x - me._start.x;
	        }

	        distance = me.getDistance(distance);
	        if (distance !== 0 && me._options.minMovingDistance && Math.abs(distance) < me._options.minMovingDistance) {
	          return;
	        }
	        if (distance > me._options.threshold) {
	          me.move(-1);
	        } else if (distance < -me._options.threshold) {
	          me.move(1);
	        } else {
	          me.move(0);
	        }

	        me._loopRender();
	      };

	      me.transitionEndHandler = function (e) {
	        me._activate(me._current);
	        var cb = me._eventHandlers.swiped;
	        cb && cb.apply(me, [me._prev % me.count, me._current % me.count]);
	        me._auto();
	        me._loopRender();
	        e.preventDefault();
	      };
	      me.$container.addEventListener('touchstart', me.touchstartHandler, false);
	      me.$container.addEventListener('touchmove', me.touchmoveHandler, false);
	      me.$container.addEventListener('touchend', me.touchendHandler, false);
	      me.$items[1] && me.$items[1].addEventListener('webkitTransitionEnd', me.transitionEndHandler, false);
	    }
	  }, {
	    key: '_loopRender',
	    value: function _loopRender() {
	      var me = this;
	      if (me._loop()) {
	        // issue #507 (delete cloneNode)
	        if (me._offset[me._offset.length - 1] === 0) {
	          me.$container.appendChild(me.$items[0]);
	          me._loopEvent(1);
	        } else if (me._offset[0] === 0) {
	          me.$container.insertBefore(me.$items[me.$items.length - 1], me.$container.firstChild);
	          me._loopEvent(-1);
	        }
	      }
	    }
	  }, {
	    key: '_loopEvent',
	    value: function _loopEvent(num) {
	      var me = this;
	      me._itemDestoy();
	      me.$items = me.$container.querySelectorAll(me._options.item);
	      me.$items[1] && me.$items[1].addEventListener('webkitTransitionEnd', me.transitionEndHandler, false);
	      me._movePosition(num);
	      me._setOffset();
	      me._setTransform();
	    }
	  }, {
	    key: 'getDistance',
	    value: function getDistance(distance) {
	      if (this._loop()) {
	        return distance;
	      } else {
	        if (distance > 0 && this._current === 0) {
	          return 0;
	        } else if (distance < 0 && this._current === this.realCount - 1) {
	          return 0;
	        } else {
	          return distance;
	        }
	      }
	    }
	  }, {
	    key: '_moveIndex',
	    value: function _moveIndex(num) {
	      if (num !== 0) {
	        this._prev = this._current;
	        this._current += this.realCount;
	        this._current += num;
	        this._current %= this.realCount;
	      }
	    }
	  }, {
	    key: '_activate',
	    value: function _activate(index) {
	      var clazz = this._options.activeClass;
	      Array.prototype.forEach.call(this.$items, function ($item, key) {
	        $item.classList.remove(clazz);
	        if (index === Number($item.dataset.index)) {
	          $item.classList.add(clazz);
	        }
	      });
	    }
	  }, {
	    key: 'go',
	    value: function go(index) {
	      var me = this;
	      me.stop();

	      index = index || 0;
	      index += this.realCount;
	      index = index % this.realCount;
	      index = this._position.indexOf(index) - this._position.indexOf(this._current);

	      me._moveIndex(index);
	      me._setOffset();
	      me._setTransition();
	      me._setTransform();
	      me._auto();
	      return this;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      this.move(1);
	      return this;
	    }
	  }, {
	    key: 'move',
	    value: function move(num) {
	      this.go(this._current + num);
	      return this;
	    }
	  }, {
	    key: 'on',
	    value: function on(event, callback) {
	      if (this._eventHandlers[event]) {
	        console.error('[swiper] event ' + event + ' is already register');
	      }
	      if (typeof callback !== 'function') {
	        console.error('[swiper] parameter callback must be a function');
	      }
	      this._eventHandlers[event] = callback;
	      return this;
	    }
	  }, {
	    key: '_itemDestoy',
	    value: function _itemDestoy() {
	      var _this = this;

	      this.$items.length && (0, _arrayFrom2.default)(this.$items).forEach(function (item) {
	        item.removeEventListener('webkitTransitionEnd', _this.transitionEndHandler, false);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stop();
	      this._current = 0;
	      this._setTransform(0);
	      window.removeEventListener('orientationchange', this.resizeHandler, false);
	      this.$container.removeEventListener('touchstart', this.touchstartHandler, false);
	      this.$container.removeEventListener('touchmove', this.touchmoveHandler, false);
	      this.$container.removeEventListener('touchend', this.touchendHandler, false);
	      this._itemDestoy();
	      // remove clone item (used by loop only 2)
	      if (this._options.loop && this.count === 2) {
	        var $item = this.$container.querySelector(this._options.item + '-clone');
	        $item && this.$container.removeChild($item);
	        $item = this.$container.querySelector(this._options.item + '-clone');
	        $item && this.$container.removeChild($item);
	      }
	    }
	  }]);

	  return Swiper;
	}();

	exports.default = Swiper;

/***/ },

/***/ 1003:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (typeof Array.from === 'function' ?
	  Array.from :
	  __webpack_require__(1004)
	);


/***/ },

/***/ 1004:
/***/ function(module, exports) {

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// Reference: http://www.ecma-international.org/ecma-262/6.0/#sec-array.from
	module.exports = (function() {
	  var isCallable = function(fn) {
	    return typeof fn === 'function';
	  };
	  var toInteger = function (value) {
	    var number = Number(value);
	    if (isNaN(number)) { return 0; }
	    if (number === 0 || !isFinite(number)) { return number; }
	    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	  };
	  var maxSafeInteger = Math.pow(2, 53) - 1;
	  var toLength = function (value) {
	    var len = toInteger(value);
	    return Math.min(Math.max(len, 0), maxSafeInteger);
	  };
	  var iteratorProp = function(value) {
	    if(value != null) {
	      if(['string','number','boolean','symbol'].indexOf(typeof value) > -1){
	        return Symbol.iterator;
	      } else if (
	        (typeof Symbol !== 'undefined') &&
	        ('iterator' in Symbol) &&
	        (Symbol.iterator in value)
	      ) {
	        return Symbol.iterator;
	      }
	      // Support "@@iterator" placeholder, Gecko 27 to Gecko 35
	      else if ('@@iterator' in value) {
	        return '@@iterator';
	      }
	    }
	  };
	  var getMethod = function(O, P) {
	    // Assert: IsPropertyKey(P) is true.
	    if (O != null && P != null) {
	      // Let func be GetV(O, P).
	      var func = O[P];
	      // ReturnIfAbrupt(func).
	      // If func is either undefined or null, return undefined.
	      if(func == null) {
	        return void 0;
	      }
	      // If IsCallable(func) is false, throw a TypeError exception.
	      if (!isCallable(func)) {
	        throw new TypeError(func + ' is not a function');
	      }
	      return func;
	    }
	  };
	  var iteratorStep = function(iterator) {
	    // Let result be IteratorNext(iterator).
	    // ReturnIfAbrupt(result).
	    var result = iterator.next();
	    // Let done be IteratorComplete(result).
	    // ReturnIfAbrupt(done).
	    var done = Boolean(result.done);
	    // If done is true, return false.
	    if(done) {
	      return false;
	    }
	    // Return result.
	    return result;
	  };

	  // The length property of the from method is 1.
	  return function from(items /*, mapFn, thisArg */ ) {
	    'use strict';

	    // 1. Let C be the this value.
	    var C = this;

	    // 2. If mapfn is undefined, let mapping be false.
	    var mapFn = arguments.length > 1 ? arguments[1] : void 0;

	    var T;
	    if (typeof mapFn !== 'undefined') {
	      // 3. else
	      //   a. If IsCallable(mapfn) is false, throw a TypeError exception.
	      if (!isCallable(mapFn)) {
	        throw new TypeError(
	          'Array.from: when provided, the second argument must be a function'
	        );
	      }

	      //   b. If thisArg was supplied, let T be thisArg; else let T
	      //      be undefined.
	      if (arguments.length > 2) {
	        T = arguments[2];
	      }
	      //   c. Let mapping be true (implied by mapFn)
	    }

	    var A, k;

	    // 4. Let usingIterator be GetMethod(items, @@iterator).
	    // 5. ReturnIfAbrupt(usingIterator).
	    var usingIterator = getMethod(items, iteratorProp(items));

	    // 6. If usingIterator is not undefined, then
	    if (usingIterator !== void 0) {
	      // a. If IsConstructor(C) is true, then
	      //   i. Let A be the result of calling the [[Construct]]
	      //      internal method of C with an empty argument list.
	      // b. Else,
	      //   i. Let A be the result of the abstract operation ArrayCreate
	      //      with argument 0.
	      // c. ReturnIfAbrupt(A).
	      A = isCallable(C) ? Object(new C()) : [];

	      // d. Let iterator be GetIterator(items, usingIterator).
	      var iterator = usingIterator.call(items);

	      // e. ReturnIfAbrupt(iterator).
	      if (iterator == null) {
	        throw new TypeError(
	          'Array.from requires an array-like or iterable object'
	        );
	      }

	      // f. Let k be 0.
	      k = 0;

	      // g. Repeat
	      var next, nextValue;
	      while (true) {
	        // i. Let Pk be ToString(k).
	        // ii. Let next be IteratorStep(iterator).
	        // iii. ReturnIfAbrupt(next).
	        next = iteratorStep(iterator);

	        // iv. If next is false, then
	        if (!next) {

	          // 1. Let setStatus be Set(A, "length", k, true).
	          // 2. ReturnIfAbrupt(setStatus).
	          A.length = k;

	          // 3. Return A.
	          return A;
	        }
	        // v. Let nextValue be IteratorValue(next).
	        // vi. ReturnIfAbrupt(nextValue)
	        nextValue = next.value;

	        // vii. If mapping is true, then
	        //   1. Let mappedValue be Call(mapfn, T, «nextValue, k»).
	        //   2. If mappedValue is an abrupt completion, return
	        //      IteratorClose(iterator, mappedValue).
	        //   3. Let mappedValue be mappedValue.[[value]].
	        // viii. Else, let mappedValue be nextValue.
	        // ix.  Let defineStatus be the result of
	        //      CreateDataPropertyOrThrow(A, Pk, mappedValue).
	        // x. [TODO] If defineStatus is an abrupt completion, return
	        //    IteratorClose(iterator, defineStatus).
	        if (mapFn) {
	          A[k] = mapFn.call(T, nextValue, k);
	        }
	        else {
	          A[k] = nextValue;
	        }
	        // xi. Increase k by 1.
	        k++;
	      }
	      // 7. Assert: items is not an Iterable so assume it is
	      //    an array-like object.
	    } else {

	      // 8. Let arrayLike be ToObject(items).
	      var arrayLike = Object(items);

	      // 9. ReturnIfAbrupt(items).
	      if (items == null) {
	        throw new TypeError(
	          'Array.from requires an array-like object - not null or undefined'
	        );
	      }

	      // 10. Let len be ToLength(Get(arrayLike, "length")).
	      // 11. ReturnIfAbrupt(len).
	      var len = toLength(arrayLike.length);

	      // 12. If IsConstructor(C) is true, then
	      //     a. Let A be Construct(C, «len»).
	      // 13. Else
	      //     a. Let A be ArrayCreate(len).
	      // 14. ReturnIfAbrupt(A).
	      A = isCallable(C) ? Object(new C(len)) : new Array(len);

	      // 15. Let k be 0.
	      k = 0;
	      // 16. Repeat, while k < len… (also steps a - h)
	      var kValue;
	      while (k < len) {
	        kValue = arrayLike[k];
	        if (mapFn) {
	          A[k] = mapFn.call(T, kValue, k);
	        }
	        else {
	          A[k] = kValue;
	        }
	        k++;
	      }
	      // 17. Let setStatus be Set(A, "length", len, true).
	      // 18. ReturnIfAbrupt(setStatus).
	      A.length = len;
	      // 19. Return A.
	    }
	    return A;
	  };
	})();


/***/ },

/***/ 1005:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-slider\">\n  <div class=\"vux-swiper\" :style=\"{height: xheight}\">\n    <slot></slot>\n    <div class=\"vux-swiper-item\" v-for=\"(item, index) in list\" @click=\"clickListItem(item)\" :data-index=\"index\">\n      <a href=\"javascript:\">\n        <div class=\"vux-img\" :style=\"{backgroundImage: buildBackgroundUrl(item.img)}\"></div>\n        <p class=\"vux-swiper-desc\" v-if=\"showDescMask\">{{item.title}}</p>\n      </a>\n    </div>\n    <div v-if=\"listTwoLoopItem.length > 0\" class=\"vux-swiper-item vux-swiper-item-clone\" v-for=\"(item, index) in listTwoLoopItem\" @click=\"clickListItem(item)\" :data-index=\"index\">\n      <a href=\"javascript:\">\n        <div class=\"vux-img\" :style=\"{backgroundImage: buildBackgroundUrl(item.img)}\"></div>\n        <p class=\"vux-swiper-desc\" v-if=\"showDescMask\">{{item.title}}</p>\n      </a>\n    </div>\n  </div>\n  <div :class=\"[dotsClass, 'vux-indicator', 'vux-indicator-' + dotsPosition]\" v-show=\"showDots\">\n    <a href=\"javascript:\" v-for=\"key in length\">\n      <i class=\"vux-icon-dot\" :class=\"{'active': key - 1 === current}\"></i>\n    </a>\n  </div>\n</div>\n";

/***/ },

/***/ 1016:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1017)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/swiper/swiper-item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1018)
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
	  var id = "_v-4b9abb14/swiper-item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1017:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="vux-swiper-item"><slot></slot></div>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'swiper-item',
	  mounted: function mounted() {
	    var _this = this;

	    this.$nextTick(function () {
	      _this.$parent.rerender();
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    var $parent = this.$parent;
	    this.$nextTick(function () {
	      $parent.rerender();
	    });
	  }
	};
	// </script>

/***/ },

/***/ 1018:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-swiper-item\"><slot></slot></div>\n";

/***/ },

/***/ 1049:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  created: function created() {
	    this.uuid = Math.random().toString(36).substring(3, 8);
	  }
	};

/***/ },

/***/ 1073:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1074)
	__vue_script__ = __webpack_require__(1076)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/scroller/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1095)
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
	  var id = "_v-d4184cfc/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1074:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1075);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1075:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.xs-plugin-pullup-container {\n  text-align: center;\n}\n", ""]);

	// exports


/***/ },

/***/ 1076:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _objectAssign = __webpack_require__(972);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _xscroll = __webpack_require__(1077);

	var _xscroll2 = _interopRequireDefault(_xscroll);

	var _pulldown = __webpack_require__(1093);

	var _pulldown2 = _interopRequireDefault(_pulldown);

	var _pullup = __webpack_require__(1094);

	var _pullup2 = _interopRequireDefault(_pullup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//   <div :style="styles">
	//     <div class="xs-container">
	//       <slot></slot>
	//       <slot name="pulldown"></slot>
	//       <slot name="pullup"></slot>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	var pulldownDefaultConfig = function pulldownDefaultConfig() {
	  return {
	    content: 'Pull Down To Refresh',
	    height: 60,
	    autoRefresh: false,
	    downContent: 'Pull Down To Refresh',
	    upContent: 'Release To Refresh',
	    loadingContent: 'Loading...',
	    clsPrefix: 'xs-plugin-pulldown-'
	  };
	};

	var pullupDefaultConfig = function pullupDefaultConfig() {
	  return {
	    content: 'Pull Up To Refresh',
	    pullUpHeight: 60,
	    height: 40,
	    autoRefresh: false,
	    downContent: 'Release To Refresh',
	    upContent: 'Pull Up To Refresh',
	    loadingContent: 'Loading...',
	    clsPrefix: 'xs-plugin-pullup-'
	  };
	};

	exports.default = {
	  name: 'scroller',
	  props: {
	    value: {
	      type: Object,
	      default: function _default() {
	        return {
	          pulldownStatus: '',
	          pullupStatus: ''
	        };
	      }
	    },
	    height: String,
	    lockX: Boolean,
	    lockY: Boolean,
	    scrollbarX: Boolean,
	    scrollbarY: Boolean,
	    bounce: {
	      type: Boolean,
	      default: true
	    },
	    useOriginScroll: {
	      type: Boolean,
	      default: false
	    },
	    useTransition: {
	      type: Boolean,
	      default: true
	    },
	    preventDefault: {
	      type: Boolean,
	      default: false
	    },
	    stopPropagation: Boolean,
	    boundryCheck: {
	      type: Boolean,
	      default: true
	    },
	    gpuAcceleration: {
	      type: Boolean,
	      default: true
	    },
	    usePulldown: {
	      type: Boolean,
	      default: false
	    },
	    usePullup: {
	      type: Boolean,
	      default: false
	    },
	    /**
	    * refer to: http://xscroll.github.io/node_modules/xscroll/doc/PullDown.html
	    */
	    pulldownConfig: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    },
	    pullupConfig: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    },
	    enableHorizontalSwiping: {
	      type: Boolean,
	      default: false
	    },
	    scrollBottomOffset: {
	      type: Number,
	      default: 0
	    }
	  },
	  methods: {
	    reset: function reset(scrollPosition, duration, easing) {
	      if (scrollPosition) {
	        if (typeof scrollPosition.left !== 'undefined') {
	          this._xscroll.scrollLeft(scrollPosition.left, duration, easing);
	        }
	        if (typeof scrollPosition.top !== 'undefined') {
	          this._xscroll.scrollTop(scrollPosition.top, duration, easing);
	        }
	      }
	      this._xscroll && this._xscroll.resetSize();
	    },
	    donePulldown: function donePulldown() {
	      var _this = this;

	      this.pulldown.reset(function () {
	        // repaint
	        _this.reset();
	      });
	      this.currentValue.pulldownStatus = 'default';
	    },
	    disablePullup: function disablePullup() {
	      // this._xscroll.unplug(this.pullup)
	      this.pullup.stop();
	      this.currentValue.pullupStatus = 'disabled';
	    },
	    enablePullup: function enablePullup() {
	      this.currentValue.pullupStatus = 'default';
	      this.pullup.restart();
	    },
	    donePullup: function donePullup() {
	      this.pullup.complete();
	      this.reset();
	      this.currentValue.pullupStatus = 'default';
	    },
	    getStyles: function getStyles() {
	      var height = this.height;
	      if (!this.height && this.$el && !this.$el.style.height && this.lockX) {
	        height = document.documentElement.clientHeight + 'px';
	        this.reset();
	      }

	      if (this.height && this.height.indexOf('-') === 0) {
	        height = document.documentElement.clientHeight + parseInt(this.height) + 'px';
	      }
	      this.styles = {
	        height: '' + height
	      };
	    }
	  },
	  created: function created() {
	    var _this2 = this;

	    if (!this.value) {
	      this.currentValue = {
	        pulldownStatus: '',
	        pullupStatus: ''
	      };
	    } else {
	      this.currentValue = this.value;
	    }
	    this.handleOrientationchange = function () {
	      setTimeout(function () {
	        _this2.reset();
	      }, 100);
	    };
	  },
	  data: function data() {
	    return {
	      currentValue: {},
	      styles: {}
	    };
	  },

	  watch: {
	    currentValue: {
	      handler: function handler(val) {
	        this.$emit('input', pure(val));
	      },
	      deep: true
	    },
	    height: function height() {
	      this.getStyles();
	    },

	    value: {
	      handler: function handler(val) {
	        if (val.pullupStatus === 'default' && this.currentValue.pullupStatus !== 'default') {
	          this.donePullup();
	        }
	        if (val.pulldownStatus === 'default' && this.currentValue.pulldownStatus !== 'default') {
	          this.donePulldown();
	        }
	        if (val.pullupStatus === 'disabled' && this.currentValue.pullupStatus !== 'disabled') {
	          this.disablePullup();
	        }
	        if (val.pullupStatus === 'enabled' && this.currentValue.pullupStatus === 'disabled') {
	          this.enablePullup();
	        }
	      },
	      deep: true
	    }
	  },
	  mounted: function mounted() {
	    var _this3 = this;

	    this.uuid = Math.random().toString(36).substring(3, 8);
	    this.$nextTick(function () {
	      _this3.$el.setAttribute('id', 'vux-scroller-' + _this3.uuid);
	      var content = null;
	      if (_this3.$slots.default) {
	        content = _this3.$slots.default[0].elm;
	      }
	      if (!content) {
	        throw new Error('no content is found');
	      }

	      _this3._xscroll = new _xscroll2.default({
	        renderTo: '#vux-scroller-' + _this3.uuid,
	        lockX: _this3.lockX,
	        lockY: _this3.lockY,
	        scrollbarX: _this3.scrollbarX,
	        scrollbarY: _this3.scrollbarY,
	        content: content,
	        bounce: _this3.bounce,
	        useOriginScroll: _this3.useOriginScroll,
	        useTransition: _this3.useTransition,
	        preventDefault: _this3.preventDefault,
	        boundryCheck: _this3.boundryCheck,
	        gpuAcceleration: _this3.gpuAcceleration,
	        stopPropagation: _this3.stopPropagation
	      });

	      _this3._xscroll.on('scroll', function () {
	        if (_this3._xscroll) {
	          var top = _this3._xscroll.getScrollTop();
	          _this3.$emit('on-scroll', {
	            top: top,
	            left: _this3._xscroll.getScrollLeft()
	          });
	          var containerHeight = _this3._xscroll.containerHeight;
	          var scrollHeight = _this3._xscroll.height;
	          if (top >= containerHeight - scrollHeight - _this3.scrollBottomOffset) {
	            _this3.$emit('on-scroll-bottom');
	          }
	        }
	      });

	      if (_this3.usePulldown) {
	        // if use slot=pulldown
	        var container = _this3.$slots.pulldown;
	        var config = (0, _objectAssign2.default)(pulldownDefaultConfig(), _this3.pulldownConfig);
	        if (container) {
	          config.container = container[0].elm;
	        }
	        _this3.pulldown = new _pulldown2.default(config);
	        _this3._xscroll.plug(_this3.pulldown);
	        _this3.pulldown.on('loading', function (e) {
	          _this3.$emit('on-pulldown-loading', _this3.uuid);
	        });
	        _this3.pulldown.on('statuschange', function (val) {
	          _this3.currentValue.pulldownStatus = val.newVal;
	        });
	      }

	      if (_this3.usePullup) {
	        // if use slot=pullup
	        var _container = _this3.$slots.pullup;
	        var _config = (0, _objectAssign2.default)(pullupDefaultConfig(), _this3.pullupConfig);

	        if (_container) {
	          _config.container = _container[0].elm;
	        }
	        _this3.pullup = new _pullup2.default(_config);
	        _this3._xscroll.plug(_this3.pullup);
	        _this3.pullup.on('loading', function (e) {
	          _this3.$emit('on-pullup-loading', _this3.uuid);
	        });
	        _this3.pullup.on('statuschange', function (val) {
	          _this3.currentValue.pullupStatus = val.newVal;
	        });
	      }

	      if (_this3.enableHorizontalSwiping) {
	        _this3._xscroll.on('panstart', function (e) {
	          if (e.direction === 2 || e.direction === 4) {
	            e.preventDefault();
	            if (_this3.scrollbarY) {
	              _this3._xscroll.userConfig.scrollbarY = false;
	            }
	            _this3._xscroll.userConfig.lockY = true;
	          }
	        });
	        _this3._xscroll.on('panend', function () {
	          if (_this3.scrollbarY) {
	            _this3._xscroll.userConfig.scrollbarY = true;
	          }
	          _this3._xscroll.userConfig.lockY = false;
	        });
	      }

	      _this3._xscroll.render();
	      window.addEventListener('orientationchange', _this3.handleOrientationchange, false);
	    });
	    this.getStyles();
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.pullup) {
	      this._xscroll.unplug(this.pullup);
	      this.pullup.pluginDestructor();
	    }
	    if (this.pulldown) {
	      this._xscroll.unplug(this.pulldown);
	      this.pulldown.pluginDestructor();
	    }
	    window.removeEventListener('orientationchange', this.handleOrientationchange, false);
	    this._xscroll.destroy();
	    this._xscroll = null;
	  }
	};


	function pure(obj) {
	  return JSON.parse(JSON.stringify(obj));
	}
	// </script>
	//
	// <style>
	// .xs-plugin-pullup-container {
	//   text-align: center;
	// }
	// </style>

/***/ },

/***/ 1077:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078),
		Base = __webpack_require__(1079),
		Timer = __webpack_require__(1081),
		Animate = __webpack_require__(1083),
		Hammer = __webpack_require__(1084),
		SimuScroll = __webpack_require__(1085),
		OriginScroll = __webpack_require__(1092);
	var XScroll = function(cfg) {
			var _ = cfg && cfg.useOriginScroll ? OriginScroll : SimuScroll;
			return new _(cfg);
		}
	/**
	 * Util
	 * @namespace Util
	 * @type {Object}
	 */
	XScroll.Util = Util;
	/**
	 * Base
	 * @namespace Base
	 * @type {Base}
	 */
	XScroll.Base = Base;
	/**
	 * Timer
	 * @namespace Timer
	 * @type {Timer}
	 */
	XScroll.Timer = Timer;
	/**
	 * Animate
	 * @namespace Animate
	 * @type {Animate}
	 */
	XScroll.Animate = Animate;
	/**
	 * Hammer
	 * @namespace Hammer
	 * @type {Hammer}
	 */
	XScroll.Hammer = Hammer;
	/**
	 * plugins
	 * @namespace Plugins
	 * @type {Object}
	 */
	XScroll.Plugins = {};

	if (typeof module == 'object' && module.exports) {
		module.exports = XScroll;
	}
	/** ignored by jsdoc **/
	else {
		return window.XScroll = XScroll;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1078:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g,
		EMPTY = '';

	var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g,
		trim = String.prototype.trim;

	var _trim = trim ?
		function(str) {
			return str == null ? EMPTY : trim.call(str);
		} : function(str) {
			return str == null ? EMPTY : (str + '').replace(RE_TRIM, EMPTY);
		};

	function upperCase() {
		return arguments[1].toUpperCase();
	}

	function Empty() {}

	function createObject(proto, constructor) {
		var newProto;
		if (Object.create) {
			newProto = Object.create(proto);
		} else {
			Empty.prototype = proto;
			newProto = new Empty();
		}
		newProto.constructor = constructor;
		return newProto;
	}

	function getNodes(node, rootNode) {
		if (!node) return;
		if (node.nodeType) return [node];
		var rootNode = rootNode && rootNode.nodeType ? rootNode : document;
		if (node && typeof node === "string") {
			return rootNode.querySelectorAll(node);
		}
		return;
	}

	// Useful for temporary DOM ids.
	var idCounter = 0;

	var getOffsetTop = function(el) {
		var offset = el.offsetTop;
		if (el.offsetParent != null) offset += getOffsetTop(el.offsetParent);
		return offset;
	};
	var getOffsetLeft = function(el) {
		var offset = el.offsetLeft;
		if (el.offsetParent != null) offset += getOffsetLeft(el.offsetParent);
		return offset;
	};

	var Util = {
		// Is a given variable an object?
		isObject: function(obj) {
			return obj === Object(obj);
		},
		isArray: Array.isArray || function(obj) {
			return toString.call(obj) == '[object Array]';
		},
		// Is a given array, string, or object empty?
		// An "empty" object has no enumerable own-properties.
		isEmpty: function(obj) {
			if (obj == null) return true;
			if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
			for (var key in obj)
				if (this.has(obj, key)) return false;
			return true;
		},
		mix: function(to, from, deep) {
			for (var i in from) {
				to[i] = from[i];
			}
			return to;
		},
		extend: function(r, s, px, sx) {
			if (!s || !r) {
				return r;
			}
			var sp = s.prototype,
				rp;
			// add prototype chain
			rp = createObject(sp, r);
			r.prototype = this.mix(rp, r.prototype);
			r.superclass = createObject(sp, s);
			// add prototype overrides
			if (px) {
				this.mix(rp, px);
			}
			// add object overrides
			if (sx) {
				this.mix(r, sx);
			}
			return r;
		},
		/**
		 * test whether a string start with a specified substring
		 * @param {String} str the whole string
		 * @param {String} prefix a specified substring
		 * @return {Boolean} whether str start with prefix
		 * @member util
		 */
		startsWith: function(str, prefix) {
			return str.lastIndexOf(prefix, 0) === 0;
		},

		/**
		 * test whether a string end with a specified substring
		 * @param {String} str the whole string
		 * @param {String} suffix a specified substring
		 * @return {Boolean} whether str end with suffix
		 * @member util
		 */
		endsWith: function(str, suffix) {
			var ind = str.length - suffix.length;
			return ind >= 0 && str.indexOf(suffix, ind) === ind;
		},
		/**
		 * Removes the whitespace from the beginning and end of a string.
		 * @method
		 * @member util
		 */
		trim: _trim,
		/**
		 * Substitutes keywords in a string using an object/array.
		 * Removes undef keywords and ignores escaped keywords.
		 * @param {String} str template string
		 * @param {Object} o json data
		 * @member util
		 * @param {RegExp} [regexp] to match a piece of template string
		 */
		substitute: function(str, o, regexp) {
			if (typeof str !== 'string' || !o) {
				return str;
			}

			return str.replace(regexp || SUBSTITUTE_REG, function(match, name) {
				if (match.charAt(0) === '\\') {
					return match.slice(1);
				}
				return (o[name] === undefined) ? EMPTY : o[name];
			});
		},
		/**
		 * vendors
		 * @return { String } webkit|moz|ms|o
		 * @memberOf Util
		 */
		vendor: (function() {
			var el = document.createElement('div').style;
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;
			for (; i < l; i++) {
				transform = vendors[i] + 'ransform';
				if (transform in el) return vendors[i].substr(0, vendors[i].length - 1);
			}
			return false;
		})(),
		/**
		 *  add vendor to attribute
		 *  @memberOf Util
		 *  @param {String} attrName name of attribute
		 *  @return { String }
		 **/
		prefixStyle: function(attrName) {
			if (this.vendor === false) return false;
			if (this.vendor === '') return attrName;
			return this.vendor + attrName.charAt(0).toUpperCase() + attrName.substr(1);
		},
		/**
		 * judge if has class
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 * @param  {String}  className
		 * @return {Boolean}
		 */
		hasClass: function(el, className) {
			return el && el.className && className && el.className.indexOf(className) != -1;
		},
		/**
		 * add className for the element
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 * @param  {String}  className
		 */
		addClass: function(el, className) {
			if (el && className && !this.hasClass(el, className)) {
				el.className += " " + className;
			}
		},
		/**
		 * remove className for the element
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 * @param  {String}  className
		 */
		removeClass: function(el, className) {
			if (el && el.className && className) {
				el.className = el.className.replace(className, "");
			}
		},
		/**
		 * remove an element
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 */
		remove: function(el) {
			if (!el || !el.parentNode) return;
			el.parentNode.removeChild(el);
		},
		/**
		 * get offset top
		 * @memberOf Util
		 * @param  {HTMLElement}   el
		 * @return {Number} offsetTop
		 */
		getOffsetTop: getOffsetTop,
		/**
		 * get offset left
		 * @memberOf Util
		 * @param  {HTMLElement}  el
		 * @return {Number} offsetLeft
		 */
		getOffsetLeft: getOffsetLeft,
		/**
		 * get offset left
		 * @memberOf Util
		 * @param  {HTMLElement} el
		 * @param  {String} selector
		 * @param  {HTMLElement} rootNode
		 * @return {HTMLElement} parent element
		 */
		findParentEl: function(el, selector, rootNode) {
			var rs = null,
				parent = null;
			var type = /^#/.test(selector) ? "id" : /^\./.test(selector) ? "class" : "tag";
			var sel = selector.replace(/\.|#/g, "");
			if (rootNode && typeof rootNode === "string") {
				rootNode = document.querySelector(rootNode);
			}
			rootNode = rootNode || document.body;
			if (!el || !selector) return;
			if (type == "class" && el.className && el.className.match(sel)) {
				return el;
			} else if (type == "id" && el.id && _trim(el.id) == sel) {
				return el;
			} else if (type == "tag" && el.tagName.toLowerCase() == sel) {
				return el;
			}
			while (!rs) {
				if (parent == rootNode) break;
				parent = el.parentNode;
				if (!parent) break;
				if ((type == "class" && parent.className && parent.className.match(sel)) || (type == "id" && parent.id && _trim(parent.id) == sel) || (type == "tag" && parent.tagName && parent.tagName.toLowerCase() == sel)) {
					rs = parent
					return rs;
					break;
				} else {
					el = parent;
				}
			}
			return null;
		},
		/**
		 * Generate a unique integer id (unique within the entire client session).
		 * @param  {String} prefix
		 * @return {String} guid
		 */
		guid: function(prefix) {
			var id = ++idCounter + '';
			return prefix ? prefix + id : id;
		},
		/**
		 * judge if is an android os
		 * @return {Boolean} [description]
		 */
		isAndroid: function() {
			return /Android /.test(window.navigator.appVersion);
		},
		/**
		 * judge if is an android device with low  performance
		 * @return {Boolean}
		 */
		isBadAndroid: function() {
			return /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion))
		},
		px2Num: function(px) {
			return Number(px.replace(/px/, ''));
		},
		getNodes: getNodes,
		getNode: function(node, rootNode) {
			var nodes = getNodes(node, rootNode);
			return nodes && nodes[0];
		},
		stringifyStyle: function(style) {
			var styleStr = "";
			for (var i in style) {
				styleStr += [i, ":", style[i], ";"].join("");
			}
			return styleStr;
		}
	}

	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	var names = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];
	for (var i = 0; i < names.length; i++) {
		Util['is' + names[i]] = function(obj) {
			return toString.call(obj) == '[object ' + names[i] + ']';
		};
	}

	if (typeof module == 'object' && module.exports) {
		module.exports = Util;
	}
	/** ignored by jsdoc **/
	else {
		return Util;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1079:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	var Events = __webpack_require__(1080);
	/** 
	      @constructor 
	      @mixes Events
	      */
	var Base = function() {}

	Util.mix(Base.prototype, Events);

	Util.mix(Base.prototype, {
		/**
		 * @memberof Base
		 * @param  {object} plugin plug a plugin
		 */
		plug: function(plugin) {
			var self = this;
			if (!plugin || !plugin.pluginId) return;
			if (!self.__plugins) {
				self.__plugins = [];
			}
			var __plugin = self.getPlugin(plugin.pluginId);
			__plugin && self.unplug(plugin.pluginId);
			plugin.pluginInitializer(self);
			self.__plugins.push(plugin);
			return self;
		},
		/**
		 * @memberof Base
		 * @param  {object|string} plugin unplug a plugin by pluginId or plugin instance
		 */
		unplug: function(plugin) {
			var self = this;
			if (!plugin || !self.__plugins) return;
			var _plugin = typeof plugin == "string" ? self.getPlugin(plugin) : plugin;
			_plugin.pluginDestructor(self);
			for (var i = 0, l = self.__plugins.length;i < l;i++) {
				if (self.__plugins[i] == _plugin) {
					return self.__plugins.splice(i, 1);
				}
			}
		},
		/**
		 * @memberof Base
		 * @param  {object|string} plugin get plugin by pluginId
		 */
		getPlugin: function(pluginId) {
			var self = this;
			var plugins = [];
			if(!self.__plugins) return;
			for (var i = 0, l = self.__plugins.length;i < l;i++) {
				if (self.__plugins[i] && self.__plugins[i].pluginId == pluginId) {
					plugins.push(self.__plugins[i])
				}
			}
			return plugins.length > 1 ? plugins : plugins[0] || null;
		}
	});

	if (typeof module == 'object' && module.exports) {
		module.exports = Base;
	}
	/** ignored by jsdoc **/
	else {
		return Base;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1080:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	// Returns a function that will be executed at most one time, no matter how
	// often you call it. Useful for lazy initialization.
	var _once = function(func) {
	  var ran = false,
	    memo;
	  return function() {
	    if (ran) return memo;
	    ran = true;
	    memo = func.apply(this, arguments);
	    func = null;
	    return memo;
	  };
	};


	/**
	 * @discription events
	 * @mixin
	 */
	var Events = {
	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  on: function(name, callback, context) {
	    if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	    this._events || (this._events = {});
	    var events = this._events[name] || (this._events[name] = []);
	    events.push({
	      callback: callback,
	      context: context,
	      ctx: context || this
	    });
	    return this;
	  },


	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, it will be removed.
	  once: function(name, callback, context) {
	    if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
	    var self = this;
	    var once = _once(function() {
	      self.off(name, once);
	      callback.apply(this, arguments);
	    });
	    once._callback = callback;
	    return this.on(name, once, context);
	  },

	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  off: function(name, callback, context) {
	    if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;

	    // Remove all callbacks for all events.
	    if (!name && !callback && !context) {
	      this._events = void 0;
	      return this;
	    }

	    var names = name ? [name] : Object.keys(this._events);
	    for (var i = 0, length = names.length; i < length; i++) {
	      name = names[i];

	      // Bail out if there are no events stored.
	      var events = this._events[name];
	      if (!events) continue;

	      // Remove all callbacks for this event.
	      if (!callback && !context) {
	        delete this._events[name];
	        continue;
	      }

	      // Find any remaining events.
	      var remaining = [];
	      for (var j = 0, k = events.length; j < k; j++) {
	        var event = events[j];
	        if (
	          callback && callback !== event.callback &&
	          callback !== event.callback._callback ||
	          context && context !== event.context
	        ) {
	          remaining.push(event);
	        }
	      }

	      // Replace events if there are any remaining.  Otherwise, clean up.
	      if (remaining.length) {
	        this._events[name] = remaining;
	      } else {
	        delete this._events[name];
	      }
	    }

	    return this;
	  },

	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  trigger: function(name) {
	    if (!this._events) return this;
	    var args = Array.prototype.slice.call(arguments, 1);
	    if (!eventsApi(this, 'trigger', name, args)) return this;
	    var events = this._events[name];
	    var allEvents = this._events.all;
	    if (events) triggerEvents(events, args);
	    if (allEvents) triggerEvents(allEvents, arguments);
	    return this;
	  },

	  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
	  // listen to an event in another object ... keeping track of what it's
	  // listening to.
	  listenTo: function(obj, name, callback) {
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var id = obj._listenId || (obj._listenId = Util.guid('l'));
	    listeningTo[id] = obj;
	    if (!callback && typeof name === 'object') callback = this;
	    obj.on(name, callback, this);
	    return this;
	  },

	  listenToOnce: function(obj, name, callback) {
	    if (typeof name === 'object') {
	      for (var event in name) this.listenToOnce(obj, event, name[event]);
	      return this;
	    }
	    var cb = _once(function() {
	      this.stopListening(obj, name, cb);
	      callback.apply(this, arguments);
	    });
	    cb._callback = callback;
	    return this.listenTo(obj, name, cb);
	  },

	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  stopListening: function(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;
	    var remove = !name && !callback;
	    if (!callback && typeof name === 'object') callback = this;
	    if (obj)(listeningTo = {})[obj._listenId] = obj;
	    for (var id in listeningTo) {
	      obj = listeningTo[id];
	      obj.off(name, callback, this);
	      if (remove || Util.isEmpty(obj._events)) delete this._listeningTo[id];
	    }
	    return this;
	  }

	};

	// Regular expression used to split event strings.
	var eventSplitter = /\s+/;

	// Implement fancy features of the Events API such as multiple event
	// names `"change blur"` and jQuery-style event maps `{change: action}`
	// in terms of the existing API.
	var eventsApi = function(obj, action, name, rest) {
	  if (!name) return true;

	  // Handle event maps.
	  if (typeof name === 'object') {
	    for (var key in name) {
	      obj[action].apply(obj, [key, name[key]].concat(rest));
	    }
	    return false;
	  }

	  // Handle space separated event names.
	  if (eventSplitter.test(name)) {
	    var names = name.split(eventSplitter);
	    for (var i = 0, length = names.length; i < length; i++) {
	      obj[action].apply(obj, [names[i]].concat(rest));
	    }
	    return false;
	  }

	  return true;
	};

	// A difficult-to-believe, but optimized internal dispatch function for
	// triggering events. Tries to keep the usual cases speedy (most internal
	var triggerEvents = function(events, args) {
	  var ev, i = -1,
	    l = events.length,
	    a1 = args[0],
	    a2 = args[1],
	    a3 = args[2];
	  switch (args.length) {
	    case 0:
	      while (++i < l)(ev = events[i]).callback.call(ev.ctx);
	      return;
	    case 1:
	      while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1);
	      return;
	    case 2:
	      while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2);
	      return;
	    case 3:
	      while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
	      return;
	    default:
	      while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
	      return;
	  }
	};

	// Aliases for backwards compatibility.
	Events.bind = Events.on;
	Events.unbind = Events.off;

	if (typeof module == 'object' && module.exports) {
	  module.exports = Events;
	}
	/** ignored by jsdoc **/
	else {
	  return Events;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1081:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	var Base = __webpack_require__(1079);
	var Easing = __webpack_require__(1082);

	var RAF = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};

	var vendors = ['webkit', 'moz', 'ms', 'o'];
	var cancelRAF = window.cancelAnimationFrame;
	if (!cancelRAF) {
		for (var i = 0; i < vendors.length; i++) {
			if (window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame']) {
				cancelRAF = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
			}
		}
	}

	cancelRAF = cancelRAF || window.clearTimeout;

	function Bezier(x1, y1, x2, y2, epsilon) {
		var curveX = function(t) {
			var v = 1 - t;
			return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
		};

		var curveY = function(t) {
			var v = 1 - t;
			return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
		};

		var derivativeCurveX = function(t) {
			var v = 1 - t;
			return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
		};

		return function(t) {

			var x = t,
				t0, t1, t2, x2, d2, i;

			// First try a few iterations of Newton's method -- normally very fast.
			for (t2 = x, i = 0; i < 8; i++) {
				x2 = curveX(t2) - x;
				if (Math.abs(x2) < epsilon) return curveY(t2);
				d2 = derivativeCurveX(t2);
				if (Math.abs(d2) < 1e-6) break;
				t2 = t2 - x2 / d2;
			}

			t0 = 0, t1 = 1, t2 = x;

			if (t2 < t0) return curveY(t0);
			if (t2 > t1) return curveY(t1);

			// Fallback to the bisection method for reliability.
			while (t0 < t1) {
				x2 = curveX(t2);
				if (Math.abs(x2 - x) < epsilon) return curveY(t2);
				if (x > x2) t0 = t2;
				else t1 = t2;
				t2 = (t1 - t0) * .5 + t0;
			}

			// Failure
			return curveY(t2);

		};

	};



	function Timer(cfg) {
		var self = this;
		self.cfg = Util.mix({
			easing: "linear"
		}, cfg)
	}

	Timer.MIN_DURATION = 1;

	Util.extend(Timer, Base, {
		reset: function(cfg) {
			var self = this;
			Util.mix(self.cfg, cfg);
			self.isfinished = false;
			self.percent = 0;
			self._stop = null;
		},
		run: function() {
			var self = this;
			var duration = self.cfg.duration;
			if (duration <= Timer.MIN_DURATION) {
				self.isfinished = true;
				self.trigger("run", {
					percent: 1
				});
				self.trigger("end", {
					percent: 1
				});
			}
			if (self.isfinished) return;
			self._hasFinishedPercent = self._stop && self._stop.percent || 0;
			self._stop = null;
			self.start = Date.now();
			self.percent = 0;
			// epsilon determines the precision of the solved values
			var epsilon = (1000 / 60 / duration) / 4;
			var b = Easing[self.cfg.easing];
			self.easingFn = Bezier(b[0], b[1], b[2], b[3], epsilon);
			self._run();
		},
		_run: function() {
			var self = this;
			cancelRAF(self._raf);
			self._raf = RAF(function() {
				self.now = Date.now();
				self.duration = self.now - self.start >= self.cfg.duration ? self.cfg.duration : self.now - self.start;
				self.progress = self.easingFn(self.duration / self.cfg.duration);
				self.percent = self.duration / self.cfg.duration + self._hasFinishedPercent;
				if (self.percent >= 1 || self._stop) {
					self.percent = self._stop && self._stop.percent ? self._stop.percent : 1;
					self.duration = self._stop && self._stop.duration ? self._stop.duration : self.duration;
					var param = {
						percent: self.percent
					};
					self.trigger("stop", param);
					if (self.percent >= 1) {
						self.isfinished = true;
						self.trigger("end", {
							percent: 1
						});
					}
					return;
				}
				self.trigger("run", {
					percent: self.progress,
					originPercent:self.percent
				});
				self._run();
			})
		},
		stop: function() {
			var self = this;
			self._stop = {
				percent: self.percent,
				now: self.now
			};
			cancelRAF(self._raf)
		}
	});


	if (typeof module == 'object' && module.exports) {
		module.exports = Timer;
	}
	/** ignored by jsdoc **/
	else {
		return Timer;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1082:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	//easing
	var Easing = {
		"linear": [0, 0, 1, 1],
		"ease": [.25, .1, .25, 1],
		"ease-in":[.42,0,1,1],
		"ease-out": [0, 0, .58, 1],
		"ease-in-out": [.42, 0, .58, 1],
		"quadratic": [0.33, 0.66, 0.66, 1],
		"circular": [0.1, 0.57, 0.1, 1],
		"bounce": [.71, 1.35, .47, 1.41],
		format: function(easing) {
			if (!easing) return;
			if (typeof easing === "string" && this[easing]) {
				return this[easing] instanceof Array ? [" cubic-bezier(", this[easing], ") "].join("") : this[easing];
			}
			if (easing instanceof Array) {
				return [" cubic-bezier(", easing, ") "].join("");
			}
			return easing;
		}
	}
	if (typeof module == 'object' && module.exports) {
		module.exports = Easing;
	}
	/** ignored by jsdoc **/
	 else {
		return Easing;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1083:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	var Timer = __webpack_require__(1081);
	var Easing = __webpack_require__(1082);
	var Base = __webpack_require__(1079);
	//transform
	var vendorTransform = Util.prefixStyle("transform");
	//transition webkitTransition MozTransition OTransition msTtransition
	var vendorTransition = Util.prefixStyle("transition");

	var vendorTransitionDuration = Util.prefixStyle("transitionDuration");

	var vendorTransformOrigin = Util.prefixStyle("transformOrigin");

	var vendorTransitionEnd = Util.vendor ? Util.prefixStyle("transitionEnd") : "transitionend";

	var vendorTransformStr = Util.vendor ? ["-", Util.vendor, "-transform"].join("") : "transform";

	var translateTpl = 'translateX({translateX}px) translateY({translateY}px) translateZ(0)';
	//limit attrs
	var animAttrs = {
		'transform': true,
		'opacity': true,
		'scrollTop': true,
		'scrollLeft': true
	};

	function myParse(v) {
		return Math.round(parseFloat(v) * 1e5) / 1e5;
	}

	function defaultDecompose() {
		return {
			translateX: 0,
			translateY: 0,
			rotate: 0,
			skewX: 0,
			skewY: 0,
			scaleX: 1,
			scaleY: 1
		};
	}

	function toMatrixArray(matrix) {
		matrix = matrix.split(/,/);
		matrix = Array.prototype.map.call(matrix, function(v) {
			return myParse(v);
		});
		return matrix;
	}

	function decomposeMatrix(matrix) {
		matrix = toMatrixArray(matrix);
		var scaleX, scaleY, skew,
			A = matrix[0],
			B = matrix[1],
			C = matrix[2],
			D = matrix[3];

		// Make sure matrix is not singular
		if (A * D - B * C) {
			scaleX = Math.sqrt(A * A + B * B);
			skew = (A * C + B * D) / (A * D - C * B);
			scaleY = (A * D - B * C) / scaleX;
			// step (6)
			if (A * D < B * C) {
				skew = -skew;
				scaleX = -scaleX;
			}
			// matrix is singular and cannot be interpolated
		} else {
			// In this case the elem shouldn't be rendered, hence scale == 0
			scaleX = scaleY = skew = 0;
		}

		// The recomposition order is very important
		// see http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp#l971
		return {
			translateX: myParse(matrix[4]),
			translateY: myParse(matrix[5]),
			rotate: myParse(Math.atan2(B, A) * 180 / Math.PI),
			skewX: myParse(Math.atan(skew) * 180 / Math.PI),
			skewY: 0,
			scaleX: myParse(scaleX),
			scaleY: myParse(scaleY)
		};
	}

	function getTransformInfo(transform) {
		transform = transform.split(')');
		var trim = Util.trim,
			i = -1,
			l = transform.length - 1,
			split, prop, val,
			ret = defaultDecompose();

		// Loop through the transform properties, parse and multiply them
		while (++i < l) {
			split = transform[i].split('(');
			prop = trim(split[0]);
			val = split[1];
			switch (prop) {
				case 'translateX':
				case 'translateY':
				case 'scaleX':
				case 'scaleY':
					ret[prop] = myParse(val);
					break;
				case 'translate':
				case 'translate3d':
					val = val.split(',');
					ret.translateX = myParse(val[0]);
					ret.translateY = myParse(val[1] || 0);
					break;
				case 'scale':
					val = val.split(',');
					ret.scaleX = myParse(val[0]);
					ret.scaleY = myParse(val[1] || val[0]);
					break;
				case 'matrix':
					return decomposeMatrix(val);
			}
		}

		return ret;
	}

	/**
	 * animate function
	 * @constructor
	 * @param {HTMLElement} el element to animate
	 * @param {Object} config config for animate
	 * @param {Object} config.css
	 * @param {Number} config.duration
	 * @param {String} config.easing
	 * @extends {Base}
	 */
	function Animate(el, cfg) {
		if (!el || !cfg || !cfg.css) return;
		var self = this;
		self.cfg = cfg;
		self.el = el;
		var duration = cfg.duration || 0,
			easing = cfg.easing || "ease",
			delay = cfg.delay || 0;
		//trigger run
		if (cfg.run) {
			//frame animate
			self.timer = self.timer || new Timer({
				duration: Math.round(duration),
				easing: easing,
			});
			self.timer.on("run", cfg.run);
		}
		self._bindEvt();
		return self;
	}

	function computeTransform(prevTransform, destTransform) {
		var transform = getTransformInfo(prevTransform);
		var dest = getTransformInfo(destTransform);
		var trans = {};
		for (var i in dest) {
			trans[i] = {
				prevVal: transform[i],
				newVal: dest[i]
			}
		}
		return trans;
	}

	//for scroll only
	function setStyle(el, styleName, prevVal, newVal, percent) {
		prevVal = isNaN(Number(prevVal)) ? 0 : Number(prevVal);
		var curVal = ((newVal - prevVal) * percent + prevVal);
		css(el, styleName, curVal);
	}

	function css(el, styleName, val) {
		switch (styleName) {
			case "scrollTop":
			case "scrollLeft":
				el[styleName] = val;
				break;
			case "transform":
				el.style[vendorTransform] = val;
			case "opacity":
				el.style[styleName] = val;
				break;

		}
	}

	Util.extend(Animate, Base, {
		/**
		 * to start the animation
		 * @memberof Animate
		 * @return {Animate}
		 */
		run: function() {
			var self = this;
			var cfg = self.cfg,
				el = self.el,
				duration = cfg.duration || 0,
				easing = cfg.easing || "ease",
				delay = cfg.delay || 0;
			self.__isTransitionEnd = false;
			clearTimeout(self.__itv)
			self.timer && self.timer.run();
			if (duration <= Timer.MIN_DURATION) {
				for (var i in cfg.css) {
					css(el, i, cfg.css[i]);
				}
				self.stop()
				self.__handlers.stop.call(self);
				return;
			}

			if(Util.isBadAndroid()){
				//use frame animate on bad android device
				cfg.useTransition = false;
			}

			if (cfg.useTransition) {
				//transition
				el.style[vendorTransition] = Util.substitute('all {duration}ms {easing} {delay}ms', {
					duration: Math.round(duration),
					easing: Easing.format(easing),
					delay: delay
				});
				for (var i in cfg.css) {
					//set css
					css(el, i, cfg.css[i]);
				}
				self.__itv = setTimeout(function() {
					if (!self.__isTransitionEnd) {
						self.__isTransitionEnd = true;
						self.trigger("transitionend");
					}
				}, Number(duration) + 60);
			} else {
				self.computeStyle = self.computeStyle || window.getComputedStyle(el);
				//transform
				if (cfg.css.transform && self.timer) {
					var transmap = self.transmap = computeTransform(self.computeStyle[vendorTransform], cfg.css.transform);
					self.timer.off("run", self.__handlers.transRun);
					self.timer.on("run", self.__handlers.transRun, self);
					self.timer.off("end",self.__handlers.transRun);
					self.timer.on("end", self.__handlers.transRun, self);
				}
			}
			return self;
		},
		_transitionEndHandler: function(e) {
			var self = this;
			self.stop();
			self.__handlers.stop.call(self);
		},
		__handlers: {
			transRun: function(e) {
				var self = this;
				var transmap = self.transmap;
				var el = self.el;
				var newTrans = {};
				for (var i in transmap) {
					newTrans[i] = (transmap[i].newVal - transmap[i].prevVal) * e.percent + transmap[i].prevVal
				}
				var ret = Util.substitute(translateTpl + ' ' +
					'scale({scaleX},{scaleY})', newTrans);
				el.style[vendorTransform] = ret;
			},
			stop: function(e) {
				var self = this;
				var cfg = self.cfg;
				cfg.end && cfg.end({
					percent: 1
				});
			}
		},
		_bindEvt: function() {
			var self = this;
			var cfg = self.cfg;
			var el = self.el;
			self.el.addEventListener(vendorTransitionEnd, function(e) {
				self.__isTransitionEnd = true;
				if (e.target !== e.currentTarget) return;
				self.trigger("transitionend", e);
			})
			self.on("transitionend", self._transitionEndHandler, self);
			var cssRun = function(e) {
				self.computeStyle = self.computeStyle || window.getComputedStyle(el);
				for (var i in cfg.css) {
					if (!/transform/.test(i)) {
						setStyle(self.el, i, self.computeStyle[i], cfg.css[i], e.percent);
					}
				}
			};
			self.timer && self.timer.on("run", cssRun);
			self.timer && self.timer.on("stop", self.__handlers.stop, self);
		},
		/**
		 * to stop the animation
		 * @memberof Animate
		 * @return {Animate}
		 */
		stop: function() {
			var self = this;
			if (self.cfg.useTransition && self.cfg.duration > Timer.MIN_DURATION) {
				var computeStyle = window.getComputedStyle(this.el);
				for (var i in self.cfg.css) {
					if (animAttrs[i]) {
						var value = /transform/.test(i) ? computeStyle[vendorTransform] : computeStyle[i];
						css(self.el, i, Util.substitute(translateTpl + ' ' + 'scale({scaleX},{scaleY})', getTransformInfo(value)));
					}
				}
				self.el.style[vendorTransition] = "none";
			}
			self.timer && self.timer.stop() && self.timer.reset();
			self.computeStyle = null;
			return self;
		},
		/**
		 * to reset the animation to a new state
		 * @memberof Animate
		 * @param {object} cfg cfg for new animation
		 * @return {Animate}
		 */
		reset: function(cfg) {
			var self = this;
			self.computeStyle = null;
			Util.mix(self.cfg, cfg);
			this.timer && self.timer.reset({
				duration: Math.round(self.cfg.duration),
				easing: self.cfg.easing
			});
			return self;
		}
	});


	if (typeof module == 'object' && module.exports) {
		module.exports = Animate;
	}
	/** ignored by jsdoc **/
	else {
		return Animate;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1084:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	/*! Hammer.JS - v2.0.4 - 2014-09-28
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2014 Jorik Tangelder;
	 * Licensed under the MIT license */
	  'use strict';

	var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');

	var TYPE_FUNCTION = 'function';

	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;

	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}

	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}

	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;

	    if (!obj) {
	        return;
	    }

	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge]
	 * @returns {Object} dest
	 */
	function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}

	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	function merge(dest, src) {
	    return extend(dest, src, true);
	}

	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;

	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;

	    if (properties) {
	        extend(childP, properties);
	    }
	}

	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}

	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}

	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}

	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}

	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}

	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}

	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}

	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}

	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}

	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}

	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;

	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }

	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }

	    return results;
	}

	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);

	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;

	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}

	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}

	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument;
	    return (doc.defaultView || doc.parentWindow);
	}

	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';

	var COMPUTE_INTERVAL = 25;

	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;

	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;

	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;

	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };

	    this.init();

	}

	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },

	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },

	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};

	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;

	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}

	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	    if (isFirst) {
	        manager.session = {};
	    }

	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;

	    // compute scale, rotation etc
	    computeInputData(manager, input);

	    // emit secret event
	    manager.emit('hammer.input', input);

	    manager.recognize(input);
	    manager.session.prevInput = input;
	}

	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;

	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }

	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }

	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;

	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);

	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	    computeIntervalInputData(session, input);

	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}

	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};

	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };

	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }

	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}

	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;

	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = last.deltaX - input.deltaX;
	        var deltaY = last.deltaY - input.deltaY;
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);

	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }

	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}

	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }

	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}

	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;

	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }

	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }

	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}

	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}

	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }
	    
	    if (abs(x) >= abs(y)) {
	        return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}

	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];

	    return Math.sqrt((x * x) + (y * y));
	}

	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}

	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}

	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}

	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};

	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;

	    this.allow = true; // used by Input.TouchMouse to disable mouse events
	    this.pressed = false; // mousedown state

	    Input.apply(this, arguments);
	}

	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];

	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }

	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }

	        // mouse must be down, and mouse events are allowed (see the TouchMouse input)
	        if (!this.pressed || !this.allow) {
	            return;
	        }

	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }

	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});

	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};

	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};

	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}

	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;

	    Input.apply(this, arguments);

	    this.store = (this.manager.session.pointerEvents = []);
	}

	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;

	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }

	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }

	        // update the event in the store
	        store[storeIndex] = ev;

	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });

	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});

	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};

	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;

	    Input.apply(this, arguments);
	}

	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }

	        if (!this.started) {
	            return;
	        }

	        var touches = normalizeSingleTouches.call(this, ev, type);

	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }

	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);

	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }

	    return [all, changed];
	}

	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};

	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};

	    Input.apply(this, arguments);
	}

	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }

	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;

	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }

	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;

	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });

	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }

	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }

	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }

	    if (!changedTargetTouches.length) {
	        return;
	    }

	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}

	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */
	function TouchMouseInput() {
	    Input.apply(this, arguments);

	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);
	}

	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

	        // when we're in a touch event, so  block all upcoming mouse events
	        // most mobile browser also emit mouseevents, right after touchstart
	        if (isTouch) {
	            this.mouse.allow = false;
	        } else if (isMouse && !this.mouse.allow) {
	            return;
	        }

	        // reset the allowMouse when we're done
	        if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
	            this.mouse.allow = true;
	        }

	        this.callback(manager, inputEvent, inputData);
	    },

	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});

	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';

	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}

	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }

	        if (NATIVE_TOUCH_ACTION) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },

	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },

	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },

	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        // not needed with native support for the touchAction property
	        if (NATIVE_TOUCH_ACTION) {
	            return;
	        }

	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;

	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }

	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE);
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },

	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};

	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }

	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	    // pan-x and pan-y can be combined
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
	    }

	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }

	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }

	    return TOUCH_ACTION_AUTO;
	}

	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;

	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.id = uniqueId();

	    this.manager = null;
	    this.options = merge(options || {}, this.defaults);

	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);

	    this.state = STATE_POSSIBLE;

	    this.simultaneous = {};
	    this.requireFail = [];
	}

	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},

	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        extend(this.options, options);

	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },

	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }

	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },

	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },

	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }

	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },

	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },

	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },

	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },

	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;

	        function emit(withState) {
	            self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
	        }

	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(true);
	        }

	        emit(); // simple 'eventName' events

	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(true);
	        }
	    },

	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },

	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },

	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = extend({}, inputData);

	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }

	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }

	        this.state = this.process(inputDataClone);

	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },

	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line

	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },

	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};

	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}

	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}

	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}

	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}

	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },

	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },

	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;

	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);

	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});

	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);

	    this.pX = null;
	    this.pY = null;
	}

	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },

	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },

	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;

	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },

	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },

	    emit: function(input) {
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;

	        var direction = directionStr(input.direction);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }

	        this._super.emit.call(this, input);
	    },
	    reset:function(){
	        
	    }
	});

	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },

	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },

	    emit: function(input) {
	        this._super.emit.call(this, input);
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            this.manager.emit(this.options.event + inOut, input);
	        }
	    }
	});

	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);

	    this._timer = null;
	    this._input = null;
	}

	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 500, // minimal time of the pointer to be pressed
	        threshold: 5 // a minimal movement is ok, but keep it low
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },

	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;

	        this._input = input;

	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },

	    reset: function() {
	        clearTimeout(this._timer);
	    },

	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }

	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});

	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },

	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});

	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.65,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },

	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },

	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;

	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.velocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.velocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.velocityY;
	        }

	        return this._super.attrTest.call(this, input) &&
	            direction & input.direction &&
	            input.distance > this.options.threshold &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },

	    emit: function(input) {
	        var direction = directionStr(input.direction);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }

	        this.manager.emit(this.options.event, input);
	    }
	});

	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);

	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;

	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}

	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 10, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },

	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	        this.reset();

	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }

	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }

	            this._input = input;

	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },

	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },

	    reset: function() {
	        clearTimeout(this._timer);
	    },

	    emit: function() {
	        if (this.state == STATE_RECOGNIZED ) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});

	/**
	 * Simple way to create an manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}

	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.4';

	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,

	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,

	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,

	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,

	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,

	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, { enable: false }],
	        [PinchRecognizer, { enable: false }, ['rotate']],
	        [SwipeRecognizer,{ direction: DIRECTION_HORIZONTAL }],
	        [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
	        [PressRecognizer]
	    ],

	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',

	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',

	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',

	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',

	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',

	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};

	var STOP = 1;
	var FORCED_STOP = 2;

	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    options = options || {};

	    this.options = merge(options, Hammer.defaults);
	    this.options.inputTarget = this.options.inputTarget || element;
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];

	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);

	    toggleCssProps(this, true);

	    each(options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}

	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        extend(this.options, options);

	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },

	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },

	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }

	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);

	        var recognizer;
	        var recognizers = this.recognizers;

	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;

	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }

	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];

	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }

	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },

	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }

	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },

	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }

	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }

	        this.recognizers.push(recognizer);
	        recognizer.manager = this;

	        this.touchAction.update();
	        return recognizer;
	    },

	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }

	        var recognizers = this.recognizers;
	        recognizer = this.get(recognizer);
	        recognizers.splice(inArray(recognizers, recognizer), 1);

	        this.touchAction.update();
	        return this;
	    },

	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },

	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },

	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }

	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }

	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };

	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },

	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);

	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};

	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    each(manager.options.cssProps, function(value, name) {
	        element.style[prefixed(element.style, name)] = add ? value : '';
	    });
	}

	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}

	extend(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,

	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,

	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,

	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,

	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,

	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,

	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});

	if (typeof module == 'object' && module.exports) {
	    module.exports = Hammer;
	}
	/** ignored by jsdoc **/
	else {
	    return Hammer;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1085:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078),
	  Base = __webpack_require__(1079),
	  Core = __webpack_require__(1086),
	  Animate = __webpack_require__(1083),
	  Hammer = __webpack_require__(1084),
	  ScrollBar = __webpack_require__(1090),
	  Controller = __webpack_require__(1091);
	//reduced boundry pan distance
	var PAN_RATE = 1 - 0.618;
	//constant for scrolling acceleration
	var SCROLL_ACCELERATION = 0.0005;
	//constant for outside of boundry acceleration
	var BOUNDRY_ACCELERATION = 0.03;
	//transform-origin
	var transformOrigin = Util.prefixStyle("transformOrigin");
	//transform
	var transform = Util.prefixStyle("transform");
	/** 
	 * @constructor
	 * @param {object} cfg config for scroll
	 * @param {number} cfg.SCROLL_ACCELERATION  acceleration for scroll, min value make the scrolling smoothly
	 * @param {number} cfg.BOUNDRY_CHECK_DURATION duration for boundry bounce
	 * @param {number} cfg.BOUNDRY_CHECK_EASING easing for boundry bounce
	 * @param {number} cfg.BOUNDRY_CHECK_ACCELERATION acceleration for boundry bounce
	 * @param {boolean} cfg.lockX just like overflow-x:hidden
	 * @param {boolean} cfg.lockY just like overflow-y:hidden
	 * @param {boolean} cfg.scrollbarX config if the scrollbar-x is visible
	 * @param {boolean} cfg.scrollbarY config if the scrollbar-y is visible
	 * @param {boolean} cfg.useTransition config if use css3 transition or raf for scroll animation
	 * @param {boolean} cfg.bounce config if use has the bounce effect when scrolling outside of the boundry
	 * @param {boolean} cfg.boundryCheck config if scrolling inside of the boundry
	 * @param {boolean} cfg.preventDefault prevent touchstart
	 * @param {boolean} cfg.preventTouchMove prevent touchmove
	 * @param {string|HTMLElement}  cfg.container config for scroller's container which default value is ".xs-container"
	 * @param {string|HTMLElement}  cfg.content config for scroller's content which default value is ".xs-content"
	 * @param {object}  cfg.indicatorInsets  config scrollbars position {top: number, left: number, bottom: number, right: number}
	 * @param {string}  cfg.stickyElements config for sticky-positioned elements
	 * @param {string}  cfg.fixedElements config for fixed-positioned elements
	 * @param {string}  cfg.touchAction config for touchAction of the scroller
	 * @extends XScroll
	 * @example
	 * var xscroll = new SimuScroll({
	 *    renderTo:"#scroll",
	 *    lockX:false,
	 *    scrollbarX:true
	 * });
	 * xscroll.render();
	 */
	function SimuScroll(cfg) {
	  SimuScroll.superclass.constructor.call(this, cfg);
	}

	Util.extend(SimuScroll, Core, {
	  /** 
	   * @memberof SimuScroll
	   * @override
	   */
	  init: function() {
	    var self = this;
	    var defaultCfg = {
	      preventDefault: true,
	      preventTouchMove: true
	    };
	    SimuScroll.superclass.init.call(this);
	    self.userConfig = Util.mix(defaultCfg, self.userConfig);
	    self.SCROLL_ACCELERATION = self.userConfig.SCROLL_ACCELERATION || SCROLL_ACCELERATION;
	    self.BOUNDRY_ACCELERATION = self.userConfig.BOUNDRY_ACCELERATION || BOUNDRY_ACCELERATION;
	    self._initContainer();
	    self.resetSize();
	    //set overflow behaviors
	    self._setOverflowBehavior();
	    self.defaltConfig = {
	      lockY: self.userConfig.lockY,
	      lockX: self.userConfig.lockX
	    }
	    return self;
	  },
	  destroy: function() {
	    var self = this;
	    SimuScroll.superclass.destroy.call(this);
	    self.renderTo.style.overflow = "";
	    self.renderTo.style.touchAction = "";
	    self.container.style.transform = "";
	    self.container.style.transformOrigin = "";
	    self.content.style.transform = "";
	    self.content.style.transformOrigin = "";
	    self.off("touchstart mousedown", self._ontouchstart);
	    self.off("touchmove", self._ontouchmove);
	    window.removeEventListener("resize", self.resizeHandler, self);
	    self.destroyScrollBars();
	  },
	  /**
	   * set overflow behavior
	   * @return {boolean} [description]
	   */
	  _setOverflowBehavior: function() {
	    var self = this;
	    var renderTo = self.renderTo;
	    var computeStyle = getComputedStyle(renderTo);
	    self.userConfig.lockX = undefined === self.userConfig.lockX ? ((computeStyle['overflow-x'] == "hidden" || self.width == self.containerWidth) ? true : false) : self.userConfig.lockX;
	    self.userConfig.lockY = undefined === self.userConfig.lockY ? ((computeStyle['overflow-y'] == "hidden" || self.height == self.containerHeight) ? true : false) : self.userConfig.lockY;
	    self.userConfig.scrollbarX = undefined === self.userConfig.scrollbarX ? (self.userConfig.lockX ? false : true) : self.userConfig.scrollbarX;
	    self.userConfig.scrollbarY = undefined === self.userConfig.scrollbarY ? (self.userConfig.lockY ? false : true) : self.userConfig.scrollbarY;
	    return self;
	  },
	  /**
	   * reset lockX or lockY config to the default value
	   */
	  _resetLockConfig: function() {
	    var self = this;
	    self.userConfig.lockX = self.defaltConfig.lockX;
	    self.userConfig.lockY = self.defaltConfig.lockY;
	    return self;
	  },
	  /**
	   * init container
	   * @override
	   * @return {SimuScroll}
	   */
	  _initContainer: function() {
	    var self = this;
	    SimuScroll.superclass._initContainer.call(self);
	    if (self.__isContainerInited || !self.container || !self.content) return;
	    self.container.style[transformOrigin] = "0 0";
	    self.content.style[transformOrigin] = "0 0";
	    self.translate(0, 0);
	    self.__isContainerInited = true;
	    return self;
	  },
	  /**
	   * get scroll top value
	   * @memberof SimuScroll
	   * @return {number} scrollTop
	   */
	  getScrollTop: function() {
	    var transY = window.getComputedStyle(this.container)[transform].match(/[-\d\.*\d*]+/g);
	    return transY ? Math.round(transY[5]) === 0 ? 0 : -Math.round(transY[5]) : 0;
	  },
	  /**
	   * get scroll left value
	   * @memberof SimuScroll
	   * @return {number} scrollLeft
	   */
	  getScrollLeft: function() {
	    var transX = window.getComputedStyle(this.content)[transform].match(/[-\d\.*\d*]+/g);
	    return transX ? Math.round(transX[4]) === 0 ? 0 : -Math.round(transX[4]) : 0;
	  },
	  /**
	   * horizontal scroll absolute to the destination
	   * @memberof SimuScroll
	   * @param scrollLeft {number} scrollLeft
	   * @param duration {number} duration for animte
	   * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	   **/
	  scrollLeft: function(x, duration, easing, callback) {
	    if (this.userConfig.lockX) return;
	    var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
	    this.x = (undefined === x || isNaN(x) || 0 === x) ? 0 : -Math.round(x);
	    this._animate("x", "translateX(" + this.x + "px) scale(" + this.scale + ")" + translateZ, duration, easing, callback);
	    return this;
	  },
	  /**
	   * vertical scroll absolute to the destination
	   * @memberof SimuScroll
	   * @param scrollTop {number} scrollTop
	   * @param duration {number} duration for animte
	   * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	   **/
	  scrollTop: function(y, duration, easing, callback) {
	    if (this.userConfig.lockY) return;
	    var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
	    this.y = (undefined === y || isNaN(y) || 0 === y) ? 0 : -Math.round(y);
	    this._animate("y", "translateY(" + this.y + "px) " + translateZ, duration, easing, callback);
	    return this;
	  },
	  /**
	   * translate the scroller to a new destination includes x , y , scale
	   * @memberof SimuScroll
	   * @param x {number} x
	   * @param y {number} y
	   * @param scale {number} scale
	   **/
	  translate: function(x, y, scale) {
	    var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
	    this.x = x || this.x || 0;
	    this.y = y || this.y || 0;
	    this.scale = scale || this.scale || 1;
	    this.content.style[transform] = "translate(" + this.x + "px,0px) scale(" + this.scale + ") " + translateZ;
	    this.container.style[transform] = "translate(0px," + this.y + "px) " + translateZ;
	    return this;
	  },
	  _animate: function(type, transform, duration, easing, callback) {
	    var self = this;
	    var duration = duration || 0;
	    var easing = easing || "quadratic";
	    var el = type == "y" ? self.container : self.content;
	    var config = {
	      css: {
	        transform: transform
	      },
	      duration: duration,
	      easing: easing,
	      run: function(e) {
	        /**
	         * @event {@link SimuScroll#"scroll"}
	         */
	        self.trigger("scroll", {
	          scrollTop: self.getScrollTop(),
	          scrollLeft: self.getScrollLeft(),
	          type: "scroll"
	        });
	      },
	      useTransition: self.userConfig.useTransition,
	      end: function(e) {
	        callback && callback();
	        if ((self["_bounce" + type] === 0 || self["_bounce" + type] === undefined) && easing != "linear") {
	          self['isScrolling' + type.toUpperCase()] = false;
	          self['isRealScrolling' + type.toUpperCase()] = false;
	          self.trigger("scrollend", {
	            type: "scrollend",
	            scrollTop: self.getScrollTop(),
	            scrollLeft: self.getScrollLeft(),
	            zoomType: type,
	            duration: duration,
	            easing: easing
	          });
	        }
	      }
	    };
	    var timer = self.__timers[type] = self.__timers[type] || new Animate(el, config);
	    timer.stop();
	    timer.reset(config);
	    timer.run();
	    self.trigger("scrollanimate", {
	      type: "scrollanimate",
	      scrollTop: -self.y,
	      scrollLeft: -self.x,
	      duration: duration,
	      easing: easing,
	      zoomType: type
	    })
	    return this;
	  },
	  _ontap: function(e) {
	    var self = this;
	    self.boundryCheck();
	    // self._unPreventHref(e);
	    if (!self.isRealScrollingX && !self.isRealScrollingY) {
	      // self._triggerClick(e);
	    }
	    // self._preventHref(e);
	    self.isRealScrollingY = false;
	    self.isRealScrollingY = false;
	  },
	  _bindEvt: function() {
	    SimuScroll.superclass._bindEvt.call(this);
	    var self = this;
	    if (self.__isEvtBind) return;
	    self.__isEvtBind = true;
	    var pinch = new Hammer.Pinch();
	    self.mc.add(pinch);
	    self.on("touchstart mousedown", self._ontouchstart, self);
	    self.on("touchmove", self._ontouchmove, self);
	    self.on("tap", self._ontap, self);
	    self.on("panstart", self._onpanstart, self);
	    self.on("pan", self._onpan, self);
	    self.on("panend", self._onpanend, self);
	    self.resizeHandler = function(e) {
	      setTimeout(function() {
	        self.resetSize();
	        self.boundryCheck(0);
	        self.render();
	      }, 100);
	    }
	    //window resize
	    window.addEventListener("resize", self.resizeHandler, self);

	    return this;
	  },
	  _ontouchstart: function(e) {
	    var self = this;
	    if (!(/(SELECT|INPUT|TEXTAREA)/i).test(e.target.tagName) && self.userConfig.preventDefault) {
	      e.preventDefault();
	    }
	    self.stop();
	  },
	  _ontouchmove: function(e) {
	    this.userConfig.preventTouchMove && e.preventDefault();
	  },
	  _onpanstart: function(e) {
	    this.userConfig.preventTouchMove && e.preventDefault();
	    var self = this;
	    var scrollLeft = self.getScrollLeft();
	    var scrollTop = self.getScrollTop();
	    self.stop();
	    self.translate(-scrollLeft, -scrollTop);
	    var threshold = self.mc.get("pan").options.threshold;
	    self.thresholdY = e.direction == "8" ? threshold : e.direction == "16" ? -threshold : 0;
	    self.thresholdX = e.direction == "2" ? threshold : e.direction == "4" ? -threshold : 0;
	    return self;
	  },
	  _onpan: function(e) {
	    this.userConfig.preventTouchMove && e.preventDefault();
	    var self = this;
	    var boundry = self.boundry;
	    var userConfig = self.userConfig;
	    var boundryCheck = userConfig.boundryCheck;
	    var bounce = userConfig.bounce;
	    var scrollTop = self.__topstart || (self.__topstart = -self.getScrollTop());
	    var scrollLeft = self.__leftstart || (self.__leftstart = -self.getScrollLeft());
	    var y = userConfig.lockY ? Number(scrollTop) : Number(scrollTop) + (e.deltaY + self.thresholdY);
	    var x = userConfig.lockX ? Number(scrollLeft) : Number(scrollLeft) + (e.deltaX + self.thresholdX);
	    var containerWidth = self.containerWidth;
	    var containerHeight = self.containerHeight;
	    if (boundryCheck) {
	      //over top
	      y = y > boundry.top ? bounce ? (y - boundry.top) * PAN_RATE + boundry.top : boundry.top : y;
	      //over bottom
	      y = y < boundry.bottom - containerHeight ? bounce ? y + (boundry.bottom - containerHeight - y) * PAN_RATE : boundry.bottom - containerHeight : y;
	      //over left
	      x = x > boundry.left ? bounce ? (x - boundry.left) * PAN_RATE + boundry.left : boundry.left : x;
	      //over right
	      x = x < boundry.right - containerWidth ? bounce ? x + (boundry.right - containerWidth - x) * PAN_RATE : boundry.right - containerWidth : x;
	    }
	    //move to x,y
	    self.translate(x, y);
	    //pan trigger the opposite direction
	    self.directionX = e.type == 'panleft' ? 'right' : e.type == 'panright' ? 'left' : '';
	    self.directionY = e.type == 'panup' ? 'down' : e.type == 'pandown' ? 'up' : '';
	    self.trigger("scroll", {
	      scrollTop: -y,
	      scrollLeft: -x,
	      triggerType: "pan",
	      type: "scroll"
	    });
	    return self;
	  },
	  _onpanend: function(e) {
	    var self = this;
	    var userConfig = self.userConfig;
	    var transX = self.computeScroll("x", e.velocityX);
	    var transY = self.computeScroll("y", e.velocityY);
	    var scrollLeft = transX ? transX.pos : 0;
	    var scrollTop = transY ? transY.pos : 0;
	    var duration;
	    if (transX && transY && transX.status == "inside" && transY.status == "inside" && transX.duration && transY.duration) {
	      //ensure the same duration
	      duration = Math.max(transX.duration, transY.duration);
	    }
	    transX && self.scrollLeft(scrollLeft, duration || transX.duration, transX.easing, function(e) {
	      self.boundryCheckX();
	    });
	    transY && self.scrollTop(scrollTop, duration || transY.duration, transY.easing, function(e) {
	      self.boundryCheckY();
	    });
	    //judge the direction
	    self.directionX = e.velocityX < 0 ? "left" : "right";
	    self.directionY = e.velocityY < 0 ? "up" : "down";
	    //clear start
	    self.__topstart = null;
	    self.__leftstart = null;
	    return self;
	  },
	  /**
	   * judge the scroller is out of boundry horizontally and vertically
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOut: function() {
	    return this.isBoundryOutLeft() || this.isBoundryOutRight() || this.isBoundryOutTop() || this.isBoundryOutBottom();
	  },
	  /**
	   * judge if the scroller is outsideof left
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOutLeft: function() {
	    return this.getBoundryOutLeft() > 0 ? true : false;
	  },
	  /**
	   * judge if the scroller is outsideof right
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOutRight: function() {
	    return this.getBoundryOutRight() > 0 ? true : false;
	  },
	  /**
	   * judge if the scroller is outsideof top
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOutTop: function() {
	    return this.getBoundryOutTop() > 0 ? true : false;
	  },
	  /**
	   * judge if the scroller is outsideof bottom
	   * @memberof SimuScroll
	   * @return {boolean} isBoundryOut
	   **/
	  isBoundryOutBottom: function() {
	    return this.getBoundryOutBottom() > 0 ? true : false;
	  },
	  /**
	   * get the offset value outsideof top
	   * @memberof SimuScroll
	   * @return {number} offset
	   **/
	  getBoundryOutTop: function() {
	    return -this.boundry.top - this.getScrollTop();
	  },
	  /**
	   * get the offset value outsideof left
	   * @memberof SimuScroll
	   * @return {number} offset
	   **/
	  getBoundryOutLeft: function() {
	    return -this.boundry.left - this.getScrollLeft();
	  },
	  /**
	   * get the offset value outsideof bottom
	   * @memberof SimuScroll
	   * @return {number} offset
	   **/
	  getBoundryOutBottom: function() {
	    return this.boundry.bottom - this.containerHeight + this.getScrollTop();
	  },
	  /**
	   * get the offset value outsideof right
	   * @memberof SimuScroll
	   * @return {number} offset
	   **/
	  getBoundryOutRight: function() {
	    return this.boundry.right - this.containerWidth + this.getScrollLeft();
	  },
	  /**
	   * compute scroll transition by zoomType and velocity
	   * @memberof SimuScroll
	   * @param {string} zoomType zoomType of scrolling
	   * @param {number} velocity velocity after panend
	   * @example
	   * var info = xscroll.computeScroll("x",2);
	   * // return {pos:90,easing:"easing",status:"inside",duration:500}
	   * @return {Object}
	   **/
	  computeScroll: function(type, v) {
	    var self = this;
	    var userConfig = self.userConfig;
	    var boundry = self.boundry;
	    var pos = type == "x" ? self.getScrollLeft() : self.getScrollTop();
	    var boundryStart = type == "x" ? boundry.left : boundry.top;
	    var boundryEnd = type == "x" ? boundry.right : boundry.bottom;
	    var innerSize = type == "x" ? self.containerWidth : self.containerHeight;
	    var maxSpeed = userConfig.maxSpeed || 2;
	    var boundryCheck = userConfig.boundryCheck;
	    var bounce = userConfig.bounce;
	    var transition = {};
	    var status = "inside";
	    if (boundryCheck) {
	      if (type == "x" && (self.isBoundryOutLeft() || self.isBoundryOutRight())) {
	        self.boundryCheckX();
	        return;
	      } else if (type == "y" && (self.isBoundryOutTop() || self.isBoundryOutBottom())) {
	        self.boundryCheckY();
	        return;
	      }
	    }
	    if (type == "x" && self.userConfig.lockX) return;
	    if (type == "y" && self.userConfig.lockY) return;
	    v = v > maxSpeed ? maxSpeed : v < -maxSpeed ? -maxSpeed : v;
	    var a = self.SCROLL_ACCELERATION * (v / (Math.abs(v) || 1));
	    var a2 = self.BOUNDRY_ACCELERATION;
	    var t = isNaN(v / a) ? 0 : v / a;
	    var s = Number(pos) + t * v / 2;
	    //over top boundry check bounce
	    if (s < -boundryStart && boundryCheck) {
	      var _s = -boundryStart - pos;
	      var _t = (Math.sqrt(-2 * a * _s + v * v) + v) / a;
	      var v0 = v - a * _t;
	      var _t2 = Math.abs(v0 / a2);
	      var s2 = v0 / 2 * _t2;
	      t = _t + _t2;
	      s = bounce ? -boundryStart + s2 : -boundryStart;
	      status = "outside";
	    } else if (s > innerSize - boundryEnd && boundryCheck) {
	      var _s = (boundryEnd - innerSize) + pos;
	      var _t = (Math.sqrt(-2 * a * _s + v * v) - v) / a;
	      var v0 = v - a * _t;
	      var _t2 = Math.abs(v0 / a2);
	      var s2 = v0 / 2 * _t2;
	      t = _t + _t2;
	      s = bounce ? innerSize - boundryEnd + s2 : innerSize - boundryEnd;
	      status = "outside";
	    }
	    if (isNaN(s) || isNaN(t)) return;
	    transition.pos = s;
	    transition.duration = t;
	    transition.easing = Math.abs(v) > 2 ? "circular" : "quadratic";
	    transition.status = status;
	    var Type = type.toUpperCase();
	    self['isScrolling' + Type] = true;
	    self['isRealScrolling' + Type] = true;
	    return transition;
	  },
	  /**
	   * bounce to the boundry horizontal
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  boundryCheckX: function(duration, easing, callback) {
	    var self = this;
	    if (!self.userConfig.boundryCheck) return;
	    if (typeof arguments[0] == "function") {
	      callback = arguments[0];
	      duration = self.userConfig.BOUNDRY_CHECK_DURATION;
	      easing = self.userConfig.BOUNDRY_CHECK_EASING;
	    } else {
	      duration = duration === 0 ? 0 : self.userConfig.BOUNDRY_CHECK_DURATION,
	        easing = easing || self.userConfig.BOUNDRY_CHECK_EASING;
	    }
	    if (!self.userConfig.bounce || self.userConfig.lockX) return;
	    var boundry = self.boundry;
	    if (self.isBoundryOutLeft()) {
	      self.scrollLeft(-boundry.left, duration, easing, callback);
	    } else if (self.isBoundryOutRight()) {
	      self.scrollLeft(self.containerWidth - boundry.right, duration, easing, callback);
	    }
	    return self;
	  },
	  /**
	   * bounce to the boundry vertical
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  boundryCheckY: function(duration, easing, callback) {
	    var self = this;
	    if (!self.userConfig.boundryCheck) return;
	    if (typeof arguments[0] == "function") {
	      callback = arguments[0];
	      duration = self.userConfig.BOUNDRY_CHECK_DURATION;
	      easing = self.userConfig.BOUNDRY_CHECK_EASING;
	    } else {
	      duration = duration === 0 ? 0 : self.userConfig.BOUNDRY_CHECK_DURATION,
	        easing = easing || self.userConfig.BOUNDRY_CHECK_EASING;
	    }
	    if (!self.userConfig.boundryCheck || self.userConfig.lockY) return;
	    var boundry = self.boundry;
	    if (self.isBoundryOutTop()) {
	      self.scrollTop(-boundry.top, duration, easing, callback);
	    } else if (self.isBoundryOutBottom()) {
	      self.scrollTop(self.containerHeight - boundry.bottom, duration, easing, callback);
	    }
	    return self;
	  },
	  /**
	   * bounce to the boundry vertical and horizontal
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  boundryCheck: function(duration, easing, callback) {
	    this.boundryCheckX(duration, easing, callback);
	    this.boundryCheckY(duration, easing, callback);
	    return this;
	  },
	  /**
	   * stop scrolling immediatelly
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  stop: function() {
	    var self = this;
	    self.__timers.x && self.__timers.x.stop();
	    self.__timers.y && self.__timers.y.stop();
	    if (self.isScrollingX || self.isScrollingY) {
	      var scrollTop = self.getScrollTop(),
	        scrollLeft = self.getScrollLeft();
	      self.trigger("scrollend", {
	        scrollTop: scrollTop,
	        scrollLeft: scrollLeft
	      });
	      self.trigger("stop", {
	        scrollTop: scrollTop,
	        scrollLeft: scrollLeft
	      })
	      self.isScrollingX = false;
	      self.isScrollingY = false;
	    }
	    return self;
	  },
	  /**
	   * render scroll
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   **/
	  render: function() {
	    var self = this;
	    SimuScroll.superclass.render.call(this);
	    //fixed for scrollbars
	    if (getComputedStyle(self.renderTo).position == "static") {
	      self.renderTo.style.position = "relative";
	    }
	    self.renderTo.style.overflow = "hidden";
	    self.initScrollBars();
	    self.initController();
	    return self;
	  },
	  /**
	   * init scrollbars
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   */
	  initScrollBars: function() {
	    var self = this;
	    if (!self.userConfig.boundryCheck) return;
	    var indicatorInsets = self.userConfig.indicatorInsets;
	    if (self.userConfig.scrollbarX) {
	      self.scrollbarX = self.scrollbarX || new ScrollBar({
	        xscroll: self,
	        type: "x",
	        spacing: indicatorInsets.spacing
	      });
	      self.scrollbarX.render();
	      self.scrollbarX._update();
	      self.scrollbarX.hide();
	    }
	    if (self.userConfig.scrollbarY) {
	      self.scrollbarY = self.scrollbarY || new ScrollBar({
	        xscroll: self,
	        type: "y",
	        spacing: indicatorInsets.spacing
	      });
	      self.scrollbarY.render();
	      self.scrollbarY._update();
	      self.scrollbarY.hide();
	    }
	    return self;
	  },
	  /**
	   * destroy scrollbars
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   */
	  destroyScrollBars: function() {
	    this.scrollbarX && this.scrollbarX.destroy();
	    this.scrollbarY && this.scrollbarY.destroy();
	    return this;
	  },
	  /**
	   * init controller for multi-scrollers
	   * @memberof SimuScroll
	   * @return {SimuScroll}
	   */
	  initController: function() {
	    var self = this;
	    self.controller = self.controller || new Controller({
	      xscroll: self
	    });
	    return self;
	  },
	  _unPreventHref: function(e) {
	    var target = Util.findParentEl(e.target,'a',this.renderTo);
	    if(!target) return;
	    if (target.tagName.toLowerCase() == "a") {
	      var href = target.getAttribute("data-xs-href");
	      if (href) {
	        target.setAttribute("href", href);
	      }
	    }
	  },
	  _preventHref: function(e) {
	    var target = Util.findParentEl(e.target,'a',this.renderTo);
	    if(!target) return;
	    if (target.tagName.toLowerCase() == "a") {
	      var href = target.getAttribute("href");
	      href && target.setAttribute("href", "javascript:void(0)");
	      href && target.setAttribute("data-xs-href", href);
	    }
	  },
	  _triggerClick: function(e) {
	    var target = e.target;
	    if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
	      var ev = document.createEvent('MouseEvents');
	      ev.initMouseEvent('click', true, true, e.view, 1,
	        target.screenX, target.screenY, target.clientX, target.clientY,
	        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
	        0, null);
	      target.dispatchEvent(ev);
	    }
	  }
	});

	if (typeof module == 'object' && module.exports) {
	  module.exports = SimuScroll;
	}
	/** ignored by jsdoc **/
	else {
	  return SimuScroll;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1086:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078),
	    Base = __webpack_require__(1079),
	    Animate = __webpack_require__(1083),
	    Boundry = __webpack_require__(1087),
	    Hammer = __webpack_require__(1084),
	    Sticky = __webpack_require__(1088),
	    Fixed = __webpack_require__(1089);
	// boundry checked bounce effect
	var BOUNDRY_CHECK_DURATION = 500;
	var BOUNDRY_CHECK_EASING = "ease";
	var BOUNDRY_CHECK_ACCELERATION = 0.1;
	/** 
	 * @constructor
	 * @param {object} cfg config for scroll
	 * @param {number} cfg.SCROLL_ACCELERATION  acceleration for scroll, min value make the scrolling smoothly
	 * @param {number} cfg.BOUNDRY_CHECK_DURATION duration for boundry bounce
	 * @param {number} cfg.BOUNDRY_CHECK_EASING easing for boundry bounce
	 * @param {number} cfg.BOUNDRY_CHECK_ACCELERATION acceleration for boundry bounce
	 * @param {boolean} cfg.lockX just like overflow-x:hidden
	 * @param {boolean} cfg.lockY just like overflow-y:hidden
	 * @param {boolean} cfg.scrollbarX config if the scrollbar-x is visible
	 * @param {boolean} cfg.scrollbarY config if the scrollbar-y is visible
	 * @param {boolean} cfg.useTransition config if use css3 transition or raf for scroll animation
	 * @param {boolean} cfg.useOriginScroll config if use simulate or origin scroll
	 * @param {boolean} cfg.bounce config if use has the bounce effect when scrolling outside of the boundry
	 * @param {boolean} cfg.boundryCheck config if scrolling inside of the boundry
	 * @param {boolean} cfg.preventDefault prevent touchstart
	 * @param {boolean} cfg.preventTouchMove prevent touchmove
	 * @param {string|HTMLElement}  cfg.container config for scroller's container which default value is ".xs-container"
	 * @param {string|HTMLElement}  cfg.content config for scroller's content which default value is ".xs-content"
	 * @param {object}  cfg.indicatorInsets  config scrollbars position {top: number, left: number, bottom: number, right: number}
	 * @param {string}  cfg.stickyElements config for sticky-positioned elements
	 * @param {string}  cfg.fixedElements config for fixed-positioned elements
	 * @param {string}  cfg.touchAction config for touchAction of the scroller
	 * @extends XScroll
	 * @example
	 * var xscroll = new XScroll({
	 *    renderTo:"#scroll",
	 *    lockX:false,
	 *    scrollbarX:true
	 * });
	 * xscroll.render();
	 */
	function XScroll(cfg) {
	    XScroll.superclass.constructor.call(this);
	    this.userConfig = cfg;
	    this.init();
	}

	Util.extend(XScroll, Base, {
	    /**
	     * version
	     * @memberof XScroll
	     * @type {string}
	     */
	    version: "3.0.13",
	    /**
	     * init scroll
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    init: function() {
	        var self = this;
	        var defaultCfg = {
	            preventDefault: true,
	            bounce: true,
	            boundryCheck: true,
	            useTransition: true,
	            gpuAcceleration: true,
	            BOUNDRY_CHECK_EASING: BOUNDRY_CHECK_EASING,
	            BOUNDRY_CHECK_DURATION: BOUNDRY_CHECK_DURATION,
	            BOUNDRY_CHECK_ACCELERATION: BOUNDRY_CHECK_ACCELERATION,
	            useOriginScroll: false,
	            zoomType: "y",
	            indicatorInsets: {
	                top: 3,
	                bottom: 3,
	                left: 3,
	                right: 3,
	                width: 3,
	                spacing: 5
	            },
	            container: ".xs-container",
	            content: ".xs-content",
	            stickyElements: ".xs-sticky",
	            fixedElements: ".xs-fixed",
	            touchAction: "auto"
	        };
	        //generate guid
	        self.guid = Util.guid();
	        self.renderTo = Util.getNode(self.userConfig.renderTo);
	        //timer for animtion
	        self.__timers = {};
	        //config attributes on element
	        var elCfg = JSON.parse(self.renderTo.getAttribute('xs-cfg'));
	        var userConfig = self.userConfig = Util.mix(Util.mix(defaultCfg, elCfg), self.userConfig);
	        self.container = Util.getNode(userConfig.container,self.renderTo);
	        self.content = Util.getNode(userConfig.content,self.renderTo);
	        self.boundry = new Boundry();
	        self.boundry.refresh();
	        return self;
	    },
	    /**
	     * destroy scroll
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    destroy: function() {
	        var self = this;
	        self.mc && self.mc.destroy();
	        self.sticky && self.sticky.destroy();
	        self.fixed && self.fixed.destroy();
	    },
	    _initContainer: function() {},
	    /**
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    enableGPUAcceleration: function() {
	        this.userConfig.gpuAcceleration = true;
	        return this;
	    },
	    /**
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    disableGPUAcceleration: function() {
	        this.userConfig.gpuAcceleration = false;
	        return this;
	    },
	    /**
	     * get scroll offset
	     * @memberof XScroll
	     * @return {Object} {scrollTop:scrollTop,scrollLeft:scrollLeft}
	     */
	    getScrollPos: function() {
	        var self = this;
	        return {
	            scrollLeft: self.getScrollLeft(),
	            scrollTop: self.getScrollTop()
	        }
	    },
	    /**
	     * get scroll top value
	     * @memberof XScroll
	     * @return {number} scrollTop
	     */
	    getScrollTop: function() {},
	    /**
	     * get scroll left value
	     * @memberof XScroll
	     * @return {number} scrollLeft
	     */
	    getScrollLeft: function() {},
	    /**
	     * scroll absolute to the destination
	     * @memberof XScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollTo: function(scrollLeft, scrollTop, duration, easing, callback) {
	        var self = this;
	        var scrollLeft = (undefined === scrollLeft || isNaN(scrollLeft)) ? -self.getScrollLeft() : scrollLeft;
	        var scrollTop = (undefined === scrollTop || isNaN(scrollTop)) ? -self.getScrollTop() : scrollTop;
	        self.scrollLeft(scrollLeft, duration, easing, callback);
	        self.scrollTop(scrollTop, duration, easing, callback);
	    },
	    /**
	     * scroll relative to the destination
	     * @memberof XScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollBy: function(scrollLeft, scrollTop, duration, easing, callback) {
	        this.scrollByX(scrollLeft, duration, easing, callback);
	        this.scrollByY(scrollTop, duration, easing, callback);
	    },
	    /**
	     * horizontal scroll relative to the destination
	     * @memberof XScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollLeftBy: function(scrollLeft, duration, easing, callback) {
	        this.scrollLeft(Number(scrollLeft) + Number(this.getScrollLeft()), duration, easing, callback);
	    },
	    /**
	     * vertical scroll relative to the destination
	     * @memberof XScroll
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollTopBy: function(scrollTop, duration, easing, callback) {
	        this.scrollTop(Number(scrollTop) + Number(this.getScrollTop()), duration, easing, callback);
	    },
	    /**
	     * horizontal scroll absolute to the destination
	     * @memberof XScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollLeft: function(scrollLeft, duration, easing, callback) {},
	    /**
	     * vertical scroll absolute to the destination
	     * @memberof XScroll
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollTop: function(scrollTop, duration, easing, callback) {},
	    /**
	     * reset the boundry size
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    resetSize: function() {
	        var self = this;
	        if(!self.container || !self.content) return;
	        var userConfig = self.userConfig;
	        var renderToStyle = getComputedStyle(self.renderTo);
	        var width = self.width = (userConfig.width || self.renderTo.offsetWidth) - Util.px2Num(renderToStyle['padding-left']) - Util.px2Num(renderToStyle['padding-right']);
	        var height = self.height = (userConfig.height || self.renderTo.offsetHeight) - Util.px2Num(renderToStyle['padding-top']) - Util.px2Num(renderToStyle['padding-bottom']);;
	        var containerWidth = userConfig.containerWidth || self.content.offsetWidth;
	        var containerHeight = userConfig.containerHeight || self.content.offsetHeight;
	        self.containerWidth = containerWidth < self.width ? self.width : containerWidth;
	        self.containerHeight = containerHeight < self.height ? self.height : containerHeight;
	        self.boundry.refresh({
	            width: self.width,
	            height: self.height
	        });
	        return self;
	    },
	    /**
	     * render scroll
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    render: function() {
	        var self = this;
	        self.resetSize();
	        //init stickies
	        self.initSticky();
	        //init fixed elements
	        self.initFixed();

	        self.trigger("afterrender", {
	            type: "afterrender"
	        });
	        self._bindEvt();
	        //update touch-action 
	        self.initTouchAction();
	        return self;
	    },
	    /**
	     * init touch action
	     * @memberof XScroll
	     * @return {XScroll}
	     */
	    initTouchAction: function() {
	        var self = this;
	        self.mc.set({
	            touchAction: self.userConfig.touchAction
	        });
	        return self;
	    },
	    initFixed: function() {
	        var self = this,
	            userConfig = self.userConfig;
	        self.fixed = self.fixed || new Fixed({
	            fixedElements:userConfig.fixedElements,
	            xscroll:self,
	            fixedRenderTo:userConfig.fixedRenderTo
	        });
	        self.fixed.render();
	        self.resetSize();
	        return self;
	    },
	    initSticky:function(){
	        var self = this,userConfig = self.userConfig;
	        var sticky = self.sticky = self.sticky || new Sticky({
	            xscroll:self,
	            zoomType:userConfig.zoomType,
	            stickyRenderTo:userConfig.stickyRenderTo
	        });
	        sticky.render();
	    },
	    /**
	     * bounce to the boundry vertical and horizontal
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    boundryCheck: function() {
	        return this;
	    },
	    /**
	     * bounce to the boundry horizontal
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    boundryCheckX: function() {
	        return this;
	    },
	    /**
	     * bounce to the boundry vertical
	     * @memberof XScroll
	     * @return {XScroll}
	     **/
	    boundryCheckY: function() {
	        return this;
	    },
	    _bindEvt: function() {
	        var self = this;
	        if (self.___isEvtBind) return;
	        self.___isEvtBind = true;
	        var mc = self.mc = new Hammer.Manager(self.renderTo);
	        var tap = new Hammer.Tap();
	        var pan = new Hammer.Pan();
	        var pinch = new Hammer.Pinch();
	        mc.add([tap, pan]);
	        //trigger all events 
	        self.mc.on("panstart pan panend pancancel pinchstart pinchmove pinchend pinchcancel pinchin pinchout", function(e) {
	            self.trigger(e.type, e);
	        });
	        //trigger touch events
	        var touchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel','mousedown'];
	        for (var i = 0, l = touchEvents.length; i < l; i++) {
	            self.renderTo.addEventListener(touchEvents[i], function(e) {
	                self.trigger(e.type, e);
	            });
	        }
	        self.mc.on("tap", function(e) {
	            if (e.tapCount == 1) {
	                e.type = "tap";
	                self.trigger(e.type, e);
	            } else if (e.tapCount == 2) {
	                e.type = "doubletap";
	                self.trigger("doubletap", e);
	            }
	        });
	        return self;
	    },
	    _resetLockConfig: function() {},
	    stop: function() {}
	});

	if (typeof module == 'object' && module.exports) {
	    module.exports = XScroll;
	}
	/** ignored by jsdoc **/
	else {
	    return XScroll;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1087:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	 var Util = __webpack_require__(1078);

	 function Boundry(cfg) {
	     this.cfg = Util.mix({
	         width: 0,
	         height: 0
	     }, cfg)
	     this.init();
	 }
	 Util.mix(Boundry.prototype, {
	     init: function() {
	         var self = this;
	         self._xtop = 0;
	         self._xright = 0;
	         self._xleft = 0;
	         self._xbottom = 0;
	         self.refresh({
	             width: self.cfg.width,
	             height: self.cfg.height
	         });
	     },
	     reset: function() {
	         this.resetTop();
	         this.resetLeft();
	         this.resetBottom();
	         this.resetRight();
	         return this;
	     },
	     resetTop: function() {
	         this._xtop = 0;
	         this.refresh();
	         return this;
	     },
	     resetLeft: function() {
	         this._xleft = 0;
	         this.refresh();
	         return this;
	     },
	     resetBottom: function() {
	         this._xbottom = 0;
	         this.refresh();
	         return this;
	     },
	     resetRight: function() {
	         this._xright = 0;
	         this.refresh();
	         return this;
	     },
	     expandTop: function(top) {
	         this._xtop = top;
	         this.refresh();
	         return this;
	     },
	     expandLeft: function(left) {
	         this._xleft = left;
	         this.refresh();
	         return this;
	     },
	     expandRight: function(right) {
	         this._xright = right;
	         this.refresh();
	         return this;
	     },
	     expandBottom: function(bottom) {
	         this._xbottom = bottom;
	         this.refresh();
	         return this;
	     },
	     refresh: function(cfg) {
	         Util.mix(this.cfg, cfg);
	         this.top = this._xtop;
	         this.left = this._xleft;
	         this.bottom = (cfg && cfg.height || this.cfg.height || 0) - this._xbottom;
	         this.right = (cfg && cfg.width || this.cfg.width || 0) - this._xright;
	         this.width = this.right - this.left > 0 ? this.right - this.left : 0;
	         this.height = this.bottom - this.top > 0 ? this.bottom - this.top : 0;
	         return this;
	     }
	 });


	 if (typeof module == 'object' && module.exports) {
	     module.exports = Boundry;
	 }
	 /** ignored by jsdoc **/
	 else{
	    return Boundry;
	 }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1088:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	var Base = __webpack_require__(1079);
	//transform
	var transform = Util.prefixStyle("transform");
	// default render function for position:sticky elements
	var defaultStickyRenderFunc = function(e) {
	  var stickyElement = e.stickyElement;
	  var curStickyElement = e.curStickyElement;
	  var xscroll = e.xscroll;
	  var _ = e._;
	  var infinite = xscroll.getPlugin("infinite");
	  if (infinite) {
	    infinite.userConfig.renderHook.call(self, stickyElement, curStickyElement);
	    stickyElement.setAttribute("xs-guid", curStickyElement.guid);
	    Util.addClass(stickyElement, curStickyElement.className);
	    for (var attrName in curStickyElement.style) {
	      if (attrName != "display" && attrName != "position") {
	        //copy styles
	        stickyElement.style[attrName] = attrName == _.height ? curStickyElement.style[attrName] + 'px' : curStickyElement.style[attrName];
	      }
	    }
	  } else {
	    var style = curStickyElement.getAttribute("style");
	    stickyElement.innerHTML = curStickyElement.innerHTML;
	    stickyElement.className = curStickyElement.className;
	    style && stickyElement.setAttribute("style", style);
	  }
	}

	var Sticky = function(cfg) {
	  Sticky.superclass.constructor.call(this, cfg);
	  this.userConfig = Util.mix({
	    stickyRenderTo: undefined,
	    forceSticky: true,
	    prefix: "xs-sticky-container",
	    stickyRenderFunc: defaultStickyRenderFunc,
	    zoomType: "y"
	  }, cfg);
	  this.init();
	}

	Util.extend(Sticky, Base, {
	  init: function() {
	    var self = this,
	      userConfig = self.userConfig,
	      xscroll = self.xscroll = userConfig.xscroll;
	    var isY = self.isY = !!(userConfig.zoomType == "y");
	    self._ = {
	      top: self.isY ? "top" : "left",
	      left: self.isY ? "left" : "bottom",
	      right: self.isY ? "right" : "top",
	      height: self.isY ? "height" : "width",
	      width: self.isY ? "width" : "height"
	    };
	    self.stickyRenderTo = Util.getNode(userConfig.stickyRenderTo);
	    self._handlers = [];
	    return self;
	  },
	  getStickiesPos: function() {
	    var self = this;
	    var xscroll = self.xscroll;
	    var isInfinite = self.isInfinite;
	    var isY = self.isY;
	    var _ = self._;
	    var stickiesPos = [];
	    var getPos = function(sticky) {
	      var pos = {};
	      if (isInfinite) {
	        pos[_.top] = isY ? sticky._top : sticky._left;
	        pos[_.height] = isY ? sticky._height : sticky._width;
	      } else {
	        pos[_.top] = self.isY ? Util.getOffsetTop(sticky) : Util.getOffsetLeft(sticky);
	        pos[_.height] = self.isY ? sticky.offsetHeight : sticky.offsetWidth;
	      }
	      return pos;
	    }
	    for (var i = 0; i < self.stickiesNum; i++) {
	      var pos = getPos(self.stickyElements[i]);
	      self._handlers[i] = self._handlers[i] || self.createStickyEl();
	      pos.el = self._handlers[i];
	      pos.isRender = false;
	      stickiesPos.push(pos);
	    }
	    return stickiesPos
	  },
	  getStickyElements: function() {
	    var self = this;
	    var xscroll = self.xscroll;
	    var userConfig = self.userConfig;
	    var isInfinite = self.isInfinite;
	    var infinite = xscroll.getPlugin("infinite");
	    if (infinite) {
	      var stickyElements = [],
	        serializedData = infinite.__serializedData;
	      for (var i in serializedData) {
	        var rowData = serializedData[i];
	        if (rowData && rowData.style && "sticky" == rowData.style.position) {
	          stickyElements.push(rowData);
	        }
	      }
	      return stickyElements;
	    } else {
	      return Util.getNodes(xscroll.userConfig.stickyElements, xscroll.content);
	    }
	  },
	  render: function(force) {
	    var self = this;
	    var userConfig = self.userConfig;
	    var xscroll = self.xscroll;
	    self.isInfinite = !!xscroll.getPlugin("infinite");
	    var _ = self._;
	    self.stickyElements = self.getStickyElements();
	    self.stickiesNum = self.stickyElements && self.stickyElements.length;
	    if (!self.stickiesNum) return;
	    if (!self.stickyRenderTo) {
	      self.stickyRenderTo = document.createElement('div');
	      xscroll.renderTo.appendChild(self.stickyRenderTo);
	    }
	    self.stickiesPos = self.getStickiesPos();
	    var stickyRenderTo = self.stickyRenderTo;
	    stickyRenderTo.style[_.top] = 0;
	    stickyRenderTo.style[_.left] = 0;
	    stickyRenderTo.style[_.right] = 0;
	    stickyRenderTo.style.position = xscroll.userConfig.useOriginScroll ? "fixed" : "absolute";
	    Util.addClass(self.stickyRenderTo, userConfig.prefix);
	    self.stickyHandler(force);
	    self._bindEvt();
	  },
	  createStickyEl: function() {
	    var self = this;
	    var el = document.createElement('div');
	    el.style.display = "none";
	    Util.addClass(el, "xs-sticky-handler");
	    self.stickyRenderTo.appendChild(el);
	    return el;
	  },
	  _bindEvt: function() {
	    var self = this,
	      xscroll = self.xscroll;
	    xscroll.on("scroll", self.stickyHandler, self);
	  },
	  stickyHandler: function(force) {
	    var self = this;
	    var xscroll = self.xscroll;
	    var userConfig = self.userConfig;
	    var scrollTop = self.isY ? xscroll.getScrollTop() : xscroll.getScrollLeft();
	    var stickiesPos = self.stickiesPos;
	    var _ = self._;
	    var indexes = [];
	    for (var i = 0, l = stickiesPos.length; i < l; i++) {
	      var top = stickiesPos[i][_.top];
	      if (scrollTop > top) {
	        indexes.push(i);
	      }
	    }
	    if (!indexes.length) {
	      if (self.stickyElement) {
	        self.stickyElement.style.display = "none";
	      }
	      self.curStickyIndex = undefined;
	      return;
	    }

	    var curStickyIndex = Math.max.apply(null, indexes);
	    if (self.curStickyIndex != curStickyIndex || force) {
	      var prevStickyIndex = self.curStickyIndex;
	      self.curStickyIndex = curStickyIndex;
	      self.curStickyElement = self.stickyElements[curStickyIndex];
	      self.curStickyPos = stickiesPos[curStickyIndex];
	      self.stickyElement = self.curStickyPos.el;
	      for (var i = 0, l = stickiesPos.length; i < l; i++) {
	        stickiesPos[i].el.style.display = "none";
	      }
	      var eventsObj = {
	        stickyElement: self.stickyElement,
	        curStickyIndex: self.curStickyIndex,
	        prevStickyIndex: prevStickyIndex,
	        curStickyPos: self.curStickyPos,
	        isRender: self.curStickyPos.isRender
	      };
	      xscroll.trigger("beforestickychange", eventsObj);
	      self._stickyRenderFunc(self);
	      xscroll.trigger("stickychange", eventsObj);
	    }

	    var trans = 0;
	    if (self.stickiesPos[self.curStickyIndex + 1]) {
	      var cur = self.stickiesPos[self.curStickyIndex];
	      var next = self.stickiesPos[self.curStickyIndex + 1];
	      if (scrollTop + cur[_.height] > next[_.top] && scrollTop + cur[_.height] < next[_.top] + cur[_.height]) {
	        trans = cur[_.height] + scrollTop - next[_.top];
	      } else {
	        trans = 0;
	      }
	    }
	    self.stickyElement.style[transform] = self.isY ? "translateY(-" + (trans) + "px) translateZ(0)" : "translateX(-" + (trans) + "px) translateZ(0)";
	  },
	  _stickyRenderFunc: function(e) {
	    var self = this;
	    var _ = self._;
	    var stickyRenderFunc = self.userConfig.stickyRenderFunc;
	    var el = self.curStickyPos.el;
	    if (!self.curStickyPos.isRender) {
	      el.style[_.left] = 0;
	      el.style[_.right] = 0;
	      stickyRenderFunc && stickyRenderFunc.call(self, e);
	    }
	    el.style.display = "block";
	    self.curStickyPos.isRender = true;
	  },
	  destroy: function() {
	    var self = this;
	    self.stickyElements = undefined;
	    self.stickiesNum = undefined;
	    self.stickiesPos = undefined;
	    Util.remove(self.stickyElement);
	    self.stickyElement = undefined;
	  }
	});

	if (typeof module == 'object' && module.exports) {
	  module.exports = Sticky;
	}
	/** ignored by jsdoc **/
	else {
	  return Sticky;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1089:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	var Base = __webpack_require__(1079);
	var transform = Util.prefixStyle("transform");

	var Fixed = function(cfg) {
	  Fixed.superclass.constructor.call(this, cfg);
	  this.userConfig = Util.mix({
	    fixedRenderTo: undefined,
	    fixedElements: ".xs-fixed",
	    prefix: "xs-fixed-container",
	    zoomType: "y"
	  }, cfg);
	  this.init();
	}

	Util.extend(Fixed, Base, {
	  fixedElements: [],
	  init: function() {
	    var self = this,
	      userConfig = self.userConfig,
	      xscroll = self.xscroll = userConfig.xscroll,
	      xscrollConfig = self.xscrollConfig = xscroll.userConfig;
	    self.isY = !!(userConfig.zoomType == "y");
	    self._ = self.isY ? {
	      top: "top",
	      height: "height",
	      width: "width",
	      offsetTop:"offsetTop"
	    } : {
	      top: "left",
	      height: "width",
	      width: "height",
	      offsetTop:"offsetLeft"
	    };
	    self.fixedRenderTo = Util.getNode(userConfig.fixedRenderTo);
	    return self;
	  },
	  render: function() {
	    var self = this;
	    var xscroll = self.xscroll;
	    self.infinite = xscroll.getPlugin("infinite");
	    if (!self.fixedRenderTo) {
	      self.fixedRenderTo = document.createElement('div');
	      xscroll.renderTo.appendChild(self.fixedRenderTo);
	    }
	    Util.addClass(self.fixedRenderTo, self.userConfig.prefix);
	    var originalFixedElements = self.originalFixedElements = self.getFixedElements();
	    for (var i = 0, l = originalFixedElements.length; i < l; i++) {
	      self.renderFixedElement(originalFixedElements[i], i,self.fixedRenderTo);
	    }
	    return self;
	  },
	  getFixedElements: function() {
	    var self = this;
	    var infinite = self.infinite;
	    var userConfig = self.userConfig;
	    if (infinite) {
	      var els = [];
	      for (var i in infinite.__serializedData) {
	        var data = infinite.__serializedData[i];
	        if (data && data.style && data.style.position == "fixed") {
	          els.push(data);
	        }
	      }
	      return els;
	    } else {
	      return Util.getNodes(userConfig.fixedElements, self.xscroll.content);
	    }
	  },
	  renderFixedElement: function(el, fixedIndex,fixedRenderTo) {
	    var self = this;
	    var isRender = true;
	    var _ = self._;
	    var xscroll = self.xscroll;
	    var userConfig = self.userConfig;
	    var xscrollConfig = self.xscrollConfig;
	    var useOriginScroll = xscrollConfig.useOriginScroll;
	    var infinite = self.infinite;
	    var fixedElement = self.fixedElements[fixedIndex];
	    if (!self.fixedElements[fixedIndex]) {
	      isRender = false;
	      if (useOriginScroll && !infinite) {
	        //use original position:fixed stylesheet
	        el.style.position = "fixed";
	        el.style.display = "block";
	      } else {
	        //deep clone fixed nodes and hide original nodes
	        fixedElement = document.createElement("div");
	        if (infinite) {
	          fixedElement.setAttribute("style", Util.stringifyStyle(Util.mix(el.style, {
	            display: "block",
	            width: "100%"
	          })));
	          fixedElement.style[_.top] = (el.style[_.top] >= 0 ? el.style[_.top] : el._top) + "px";
	          if (el.style[_.height]) {
	            fixedElement.style[_.height] = el.style[_.height] + "px";
	          }
	          infinite.userConfig.renderHook.call(self, fixedElement, el);
	        } else {
	          fixedElement.style.display = "block";
	          fixedElement.style.position = "absolute";
	          fixedElement.style[_.width] = "100%";
	          fixedElement.innerHTML = el.innerHTML;
	          fixedElement.className = el.className;
	          fixedElement.setAttribute("style", el.getAttribute("style"));
	          fixedElement.style[_.top] = el[_.offsetTop] + "px";
	          el.style.display = "none";
	        }
	        fixedRenderTo.appendChild(fixedElement);
	        self.fixedElements.push(fixedElement);
	      }
	    }
	    xscroll.trigger("fixedchange", {
	      fixedIndex: fixedIndex,
	      fixedElement: useOriginScroll ? el : fixedElement,
	      originalFixedElement: el,
	      isRender: isRender
	    });
	  },
	  destroy: function() {
	    var self = this;
	    self.fixedElements = undefined;
	  }
	});

	if (typeof module == 'object' && module.exports) {
	  module.exports = Fixed;
	}
	/** ignored by jsdoc **/
	else {
	  return Fixed;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1090:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	var Animate = __webpack_require__(1083);
	var MAX_BOUNCE_DISTANCE = 40;
	var MIN_BAR_SCROLLED_SIZE = 10;
	var MIN_BAR_SIZE = 50;
	var transform = Util.prefixStyle("transform");
	var transformStr = Util.vendor ? ["-", Util.vendor, "-transform"].join("") : "transform";
	var transition = Util.prefixStyle("transition");
	var borderRadius = Util.prefixStyle("borderRadius");
	var transitionDuration = Util.prefixStyle("transitionDuration");

	var ScrollBar = function(cfg) {
		this.userConfig = Util.mix({
			MIN_BAR_SCROLLED_SIZE:MIN_BAR_SCROLLED_SIZE,
			MIN_BAR_SIZE:MIN_BAR_SIZE,
			MAX_BOUNCE_DISTANCE:MAX_BOUNCE_DISTANCE,
			spacing:5
		}, cfg);
		this.init(cfg.xscroll);
	}

	Util.mix(ScrollBar.prototype, {
		init: function(xscroll) {
			var self = this;
			self.xscroll = xscroll;
			self.type = self.userConfig.type;
			self.isY = self.type == "y" ? true : false;
			self.scrollTopOrLeft = self.isY ? "scrollTop" : "scrollLeft";
		},
		destroy: function() {
			var self = this;
			Util.remove(self.scrollbar);
			self.xscroll.off("scroll", self._scrollHandler, self);
			self.xscroll.off("scrollend", self._scrollEndHandler, self);
		},
		render: function() {
			var self = this;
			var xscroll = self.xscroll;
			var boundry = xscroll.boundry;
			var indicatorInsets = self.xscroll.userConfig.indicatorInsets;
			var translateZ = xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
			var transform = translateZ ? transformStr + ":" + translateZ + ";" : "";
			var commonCss = "opacity:0;position:absolute;z-index:999;overflow:hidden;-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;" + transform;
			indicatorInsets._xright =  indicatorInsets.right + indicatorInsets.spacing;
			indicatorInsets._xbottom =  indicatorInsets.bottom + indicatorInsets.spacing;
			var css = self.isY ?
				Util.substitute("width:{width}px;bottom:{_xbottom}px;top:{top}px;right:{right}px;", indicatorInsets) + commonCss :
				Util.substitute("height:{width}px;left:{left}px;right:{_xright}px;bottom:{bottom}px;",indicatorInsets) + commonCss;
			

			if(!self.scrollbar){
				self.scrollbar = document.createElement("div");	
				self.indicate = document.createElement("div");
				xscroll.renderTo.appendChild(self.scrollbar);
				self.scrollbar.appendChild(self.indicate);
			}
			self.scrollbar.style.cssText = css;
			var size = self.isY ? "width:100%;" : "height:100%;";
			self.indicate.style.cssText = size + "position:absolute;background:rgba(0,0,0,0.3);-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;"
			self._update();
			self.hide(0);
			self._bindEvt();
		},
		_update: function(pos, duration, easing, callback) {
			var self = this;
			var pos = undefined === pos ? (self.isY ? self.xscroll.getScrollTop() : self.xscroll.getScrollLeft()) : pos;
			var barInfo = self.computeScrollBar(pos);
			var size = self.isY ? "height" : "width";
			self.indicate.style[size] = Math.round(barInfo.size) + "px";
			if (duration && easing) {
				self.scrollTo(barInfo.pos, duration, easing, callback);
			} else {
				self.moveTo(barInfo.pos);
			}
		},
		//compute the position and size of the scrollbar
		computeScrollBar: function(pos) {
			var self = this;
			var type = self.isY ? "y" : "x";
			var spacing = self.userConfig.spacing;
			var xscroll = self.xscroll;
			var boundry = xscroll.boundry;
			var userConfig = self.userConfig;
			var pos = self.isY ? Math.round(pos) + boundry._xtop : Math.round(pos) + boundry._xleft;
			var MIN_BAR_SCROLLED_SIZE = userConfig.MIN_BAR_SCROLLED_SIZE;
			var MIN_BAR_SIZE = userConfig.MIN_BAR_SIZE;
			var MAX_BOUNCE_DISTANCE = userConfig.MAX_BOUNCE_DISTANCE;
			self.containerSize = self.isY ? xscroll.containerHeight + boundry._xtop + boundry._xbottom : self.xscroll.containerWidth + boundry._xright + boundry._xleft;
			self.size = self.isY ? boundry.cfg.height : boundry.cfg.width;
			self.indicateSize = self.isY ? boundry.cfg.height - spacing * 2 : boundry.cfg.width - spacing * 2;
			var indicateSize = self.indicateSize;
			var containerSize = self.containerSize;
			var barPos = indicateSize * pos / containerSize;
			var barSize = Math.round(indicateSize * self.size / containerSize);
			var overTop = self.isY ? xscroll.getBoundryOutTop() : xscroll.getBoundryOutLeft();
			var overBottom = self.isY ? xscroll.getBoundryOutBottom() : xscroll.getBoundryOutRight();
			var barShiftSize = MIN_BAR_SIZE - barSize > 0 ? MIN_BAR_SIZE - barSize : 0;
			barSize = barSize < MIN_BAR_SIZE ? MIN_BAR_SIZE : barSize;
			barPos = (indicateSize - barShiftSize) * pos / containerSize;
			if (overTop >= 0) {
				var pct = overTop / MAX_BOUNCE_DISTANCE;
				pct = pct > 1 ? 1 : pct;
				barPos = - pct * (barSize -  MIN_BAR_SCROLLED_SIZE)
			}
			if (overBottom >= 0) {
				var pct = overBottom / MAX_BOUNCE_DISTANCE;
				pct = pct > 1 ? 1 : pct;
				barPos = pct * (barSize - MIN_BAR_SCROLLED_SIZE) + indicateSize - barSize; 
			}
			self.barPos = Math.round(barPos);
			return {
				size: Math.round(barSize),
				pos: self.barPos
			};
		},
		scrollTo: function(pos, duration, easing, callback) {
			var self = this;
			self.show();
			var translateZ = self.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
			var config = {
				css: {
					transform: self.isY ? "translateY(" + pos + "px)" + translateZ : "translateX(" + pos + "px)" + translateZ
				},
				duration: duration,
				easing: easing,
				useTransition: self.xscroll.userConfig.useTransition,
				end: callback
			};
			self.__timer = self.__timer || new Animate(self.indicate, config);
			//run
			self.__timer.stop();
			self.__timer.reset(config);
			self.__timer.run();
		},
		moveTo: function(pos) {
			var self = this;
			self.show();
			var translateZ = self.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
			self.isY ? self.indicate.style[transform] = "translateY(" + pos + "px) " + translateZ : self.indicate.style[transform] = "translateX(" + pos + "px) " + translateZ
			self.indicate.style[transition] = "";
		},
		_scrollHandler: function(e) {
			var self = this;
			self._update(e[self.scrollTopOrLeft]);
			return self;
		},
		isBoundryOut: function() {
			var self = this;
			return !self.isY ? (self.xscroll.isBoundryOutLeft() || self.xscroll.isBoundryOutRight()) : (self.xscroll.isBoundryOutTop() || self.xscroll.isBoundryOutBottom());
		},
		_scrollEndHandler: function(e) {
			var self = this;
			if (!self.isBoundryOut()) {
				self._update(e[self.scrollTopOrLeft]);
				self.hide();
			}
			return self;
		},
		_bindEvt: function() {
			var self = this;
			if (self.__isEvtBind) return;
			self.__isEvtBind = true;
			self.xscroll.on("scroll", self._scrollHandler, self);
			self.xscroll.on("scrollend", self._scrollEndHandler, self);
		},
		reset: function() {
			var self = this;
			self.pos = 0;
			self._update();
		},
		hide: function(duration, easing, delay) {
			var self = this;
			var duration = duration >= 0 ? duration : 300;
			var easing = easing || "ease-out";
			var delay = delay >= 0 ? delay : 100;
			self.scrollbar.style.opacity = 0;
			self.scrollbar.style[transition] = ["opacity ", duration, "ms ", " ease-out ", delay, "ms"].join("");
		},
		show: function() {
			var self = this;
			self.scrollbar.style.opacity = 1;
			self.scrollbar.style[transition] = "";
		}
	});

	if (typeof module == 'object' && module.exports) {
		module.exports = ScrollBar;
	}
	/** ignored by jsdoc **/
	else {
		return ScrollBar;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1091:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	/*
		wrapped scroll controller
	*/
	"use strict";
	var Util = __webpack_require__(1078),
		Base = __webpack_require__(1079);

	var Controller = function(cfg) {
		Controller.superclass.constructor.call(this, cfg);
		this.userConfig = Util.mix({}, cfg);
		this.init();
	}

	Util.extend(Controller, Base, {
		init: function() {
			var self = this;
			self.xscroll = self.userConfig.xscroll;
		},
		add: function(scroll, cfg) {
			var self = this;
			cfg = Util.extend({
				captureBounce: false,
				stopPropagation: true
			}, cfg)
			if (!self.__scrolls) {
				self.__scrolls = {};
			}
			if (scroll.guid && !self.__scrolls[scroll.guid]) {
				scroll.parentscroll = self.xscroll;
				self._bind(scroll);
				return self.__scrolls[scroll.guid] = scroll;
			}
			return;
		},
		remove: function(scroll) {
			var self = this;
			if (!scroll || !scroll.guid) return;
			var subscroll = self.__scrolls[scroll.guid];
			if (subscroll) {
				subscroll.parentscroll = null;
				self._unbind(scroll);
				subscroll = null;
			}
		},
		get: function(guid) {
			if (guid) {
				return this.__scrolls[guid];
			}
			return this.__scrolls;
		},

		_unbind: function(sub) {

		},

		_bind: function(sub) {
			var self = this,
				xscroll = self.xscroll;
			xscroll.renderTo.addEventListener("touchstart", function() {
				xscroll._resetLockConfig();
			});
			sub.renderTo.addEventListener("touchstart", function() {
				sub._resetLockConfig();
			});
			xscroll.on("panend", xscroll._resetLockConfig);
			sub.on("panend", sub._resetLockConfig);
			sub.on("panstart", function(e) {
				//vertical scroll enabled
				if (!sub.userConfig.lockY && !xscroll.userConfig.lockY) {
					//outside of boundry
					if (sub.isBoundryOut()) {
						xscroll.userConfig.lockY = true;
						return;
					}
					if (e.direction == 16 && sub.getBoundryOutTop() >= 0) {
						sub.userConfig.lockY = true;
					} else if (e.direction == 8 && sub.getBoundryOutTop() >= 0 && sub.getBoundryOutBottom() < 0) {
						xscroll.userConfig.lockY = true;
					}
					if (e.direction == 8 && sub.getBoundryOutBottom() >= 0) {
						sub.userConfig.lockY = true;
					} else if (e.direction == 16 && sub.getBoundryOutBottom() >= 0 && sub.getBoundryOutTop() < 0) {
						xscroll.userConfig.lockY = true;
					}
					if (sub.getBoundryOutTop() < 0 && sub.getBoundryOutBottom() < 0) {
						xscroll.userConfig.lockY = true;
					}
				}
				//horizontal scroll enabled
				if (!sub.userConfig.lockX && !xscroll.userConfig.lockX) {
					if (sub.isBoundryOut()) {
						xscroll.userConfig.lockX = true;
						return;
					}
					if (e.direction == 4 && sub.getBoundryOutLeft() >= 0) {
						sub.userConfig.lockX = true;
					} else if (e.direction == 2 && sub.getBoundryOutLeft() >= 0 && sub.getBoundryOutRight() < 0) {
						xscroll.userConfig.lockX = true;
					}
					if (e.direction == 2 && sub.getBoundryOutRight() >= 0) {
						sub.userConfig.lockX = true;
					} else if (e.direction == 4 && sub.getBoundryOutRight() >= 0 && sub.getBoundryOutLeft() < 0) {
						xscroll.userConfig.lockX = true;
					}
					if (sub.getBoundryOutLeft() < 0 && sub.getBoundryOutRight() < 0) {
						xscroll.userConfig.lockX = true;
					}
				}

				if (!sub.userConfig.lockX && xscroll.userConfig.lockX) {
					//pan x
					if (e.direction == 2 || e.direction == 4) {
						xscroll.userConfig.lockY = true;
					} else {
						sub.userConfig.lockX = true;
					}
				}

				if (!sub.userConfig.lockY && xscroll.userConfig.lockY) {
					//pan y
					if (e.direction == 8 || e.direction == 16) {
						xscroll.userConfig.lockX = true;
					} else {
						sub.userConfig.lockY = true;
					}
				}
			});
		}
	});

	if (typeof module == 'object' && module.exports) {
		module.exports = Controller;
	}
	/** ignored by jsdoc **/
	else {
		return Controller;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1092:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078),
	    Base = __webpack_require__(1079),
	    Core = __webpack_require__(1086),
	    Animate = __webpack_require__(1083);

	var transformOrigin = Util.prefixStyle("transformOrigin");
	/** 
	 * @constructor
	 * @param {object} cfg config for scroll
	 * @extends XScroll
	 * @example
	 * var xscroll = new OriginScroll({
	 *    renderTo:"#scroll"
	 * });
	 * xscroll.render();
	 */
	function OriginScroll(cfg) {
	    OriginScroll.superclass.constructor.call(this, cfg);
	}

	Util.extend(OriginScroll, Core, {
	    init: function() {
	        var self = this;
	        OriginScroll.superclass.init.call(this);
	        self.resetSize();
	    },
	    /**
	     * get scroll top value
	     * @memberof OriginScroll
	     * @return {number} scrollTop
	     */
	    getScrollTop: function() {
	        return this.renderTo.scrollTop;
	    },
	    /**
	     * get scroll left value
	     * @memberof OriginScroll
	     * @return {number} scrollLeft
	     */
	    getScrollLeft: function() {
	        return this.renderTo.scrollLeft;
	    },
	    /**
	     * vertical scroll absolute to the destination
	     * @memberof SimuScroll
	     * @param scrollTop {number} scrollTop
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollTop: function(y, duration, easing, callback) {
	        var self = this;
	        var y = Math.round(y);
	        if (self.userConfig.lockY) return;
	        var duration = duration || 0;
	        var easing = easing || "quadratic";
	        var config = {
	            css: {
	                scrollTop: y
	            },
	            duration: duration,
	            easing: easing,
	            run: function(e) {
	                //trigger scroll event
	                self.trigger("scroll", {
	                    scrollTop: self.getScrollTop(),
	                    scrollLeft: self.getScrollLeft()
	                });
	            },
	            useTransition: false, //scrollTop 
	            end: callback
	        };
	        self.__timers.y = self.__timers.y || new Animate(self.renderTo, config);
	        //run
	        self.__timers.y.stop();
	        self.__timers.y.reset(config);
	        self.__timers.y.run();
	    },
	    /**
	     * horizontal scroll absolute to the destination
	     * @memberof SimuScroll
	     * @param scrollLeft {number} scrollLeft
	     * @param duration {number} duration for animte
	     * @param easing {string} easing functio for animate : ease-in | ease-in-out | ease | bezier(n,n,n,n)
	     **/
	    scrollLeft: function(x, duration, easing, callback) {
	        var self = this;
	        var x = Math.round(x);
	        if (self.userConfig.lockX) return;
	        var duration = duration || 0;
	        var easing = easing || "quadratic";
	        var config = {
	            css: {
	                scrollLeft: x
	            },
	            duration: duration,
	            easing: easing,
	            run: function(e) {
	                //trigger scroll event
	                self.trigger("scroll", {
	                    scrollTop: self.getScrollTop(),
	                    scrollLeft: self.getScrollLeft()
	                });
	            },
	            useTransition: false, //scrollTop 
	            end: callback
	        };
	        self.__timers.x = self.__timers.x || new Animate(self.renderTo, config);
	        //run
	        self.__timers.x.stop();
	        self.__timers.x.reset(config);
	        self.__timers.x.run();
	    },
	    _bindEvt: function() {
	        OriginScroll.superclass._bindEvt.call(this);
	        var self = this;
	        if (self.__isEvtBind) return;
	        self.__isEvtBind = true;
	        self.renderTo.addEventListener("scroll", function(e) {
	            self.trigger("scroll", {
	                type: "scroll",
	                scrollTop: self.getScrollTop(),
	                scrollLeft: self.getScrollLeft()
	            })
	        }, false)
	    }
	});

	if (typeof module == 'object' && module.exports) {
	    module.exports = OriginScroll;
	}
	/** ignored by jsdoc **/
	else {
	    return OriginScroll;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1093:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	var Base = __webpack_require__(1079);
	var clsPrefix;
	var containerCls;
	var content = "Pull Down To Refresh";
	var loadingContent = "Loading...";
	/**
	 * A pulldown to refresh plugin for xscroll.
	 * @constructor
	 * @param {object} cfg
	 * @param {number} cfg.height
	 * @param {string} cfg.content default html for pulldown
	 * @param {string} cfg.downContent html for pulldown when scrollTop is smaller than cfg.height
	 * @param {string} cfg.upContent html for pulldown when scrollTop is larger than cfg.height
	 * @param {string} cfg.loadingContent html for pulldown when released
	 * @param {string} cfg.clsPrefix  class prefix which default value is "xs-plugin-pulldown-"
	 * @extends {Base}
	 */
	var PullDown = function(cfg) {
		PullDown.superclass.constructor.call(this, cfg);
		this.userConfig = Util.mix({
			content: content,
			height: 60,
			autoRefresh: true,
			downContent: "Pull Down To Refresh",
			upContent: "Release To Refresh",
			loadingContent: loadingContent,
			clsPrefix: "xs-plugin-pulldown-"
		}, cfg);
	}
	Util.extend(PullDown, Base, {
		/**
		 * a pluginId
		 * @memberOf PullDown
		 * @type {string}
		 */
		pluginId: "pulldown",
		/**
		 * plugin initializer
		 * @memberOf PullDown
		 * @override Base
		 * @return {PullDown}
		 */
		pluginInitializer: function(xscroll) {
			var self = this;
			self.xscroll = xscroll.render();
			clsPrefix = self.userConfig.clsPrefix;
			self.render();
			return self;
		},
		/**
		 * detroy the plugin
		 * @memberOf PullDown
		 * @override Base
		 * @return {PullDown}
		 */
		pluginDestructor: function() {
			var self = this;
			Util.remove(self.pulldown);
			self.xscroll.off("panstart", self._panStartHandler, self);
			self.xscroll.off("pan", self._panHandler, self);
			self.xscroll.off("panend", self._panEndHandler, self);
			self.__isRender = false;
			self._evtBinded = false;
		},
		/**
		 * render pulldown plugin
		 * @memberOf PullDown
		 * @return {PullDown}
		 */
		render: function() {
			var self = this;
			if (self.__isRender) return;
			self.__isRender = true;

			if (!self.userConfig.container) {
				var containerCls = clsPrefix + "container";
				var height = self.userConfig.height || 60;
				var pulldown = self.pulldown = document.createElement("div");
				pulldown.className = containerCls;
				pulldown.style.position = "absolute";
				pulldown.style.width = "100%";
				pulldown.style.height = height + "px";
				pulldown.style.lineHeight = height + "px";
				pulldown.style.top = -height + "px";
				pulldown.style.textAlign = "center";
				self.xscroll.container.appendChild(pulldown);
				self.status = 'up';
				Util.addClass(pulldown, clsPrefix + self.status);
				pulldown.innerHTML = self.userConfig[self.status + "Content"] || self.userConfig.content;
			} else {
				// has customed container
				self.pulldown = self.userConfig.container
			}
			
			self._bindEvt();
			return self;
		},
		_bindEvt: function() {
			var self = this;
			if (self._evtBinded) return;
			self._evtBinded = true;
			var pulldown = self.pulldown;
			var xscroll = self.xscroll;
			xscroll.on("pan", self._panHandler, self);
			xscroll.on("panstart", self._panStartHandler, self);
			xscroll.on("panend", self._panEndHandler, self);
		},
		_changeStatus: function(status) {
			var prevVal = this.status;
			this.status = status;
			if (!this.userConfig.container) {
				Util.removeClass(this.pulldown, clsPrefix + prevVal)
				Util.addClass(this.pulldown, clsPrefix + status);
				if (this.userConfig[status + "Content"]) {
					this.pulldown.innerHTML = this.userConfig[status + "Content"];
				}
			}
			if (prevVal != status) {
				this.trigger("statuschange", {
					prevVal: prevVal,
					newVal: status
				});
				if (status == "loading") {
					this.trigger("loading");
				}
			}
		},
		/**
		 * reset the pulldown plugin
		 * @memberOf PullDown
		 * @param {function} callback
		 * @return {PullDown}
		 */
		reset: function(callback) {
			this.xscroll.boundry.resetTop()
			this.xscroll.boundryCheckY(callback);
			this._expanded = false;
			return this;
		},
		_panStartHandler: function(e) {
			clearTimeout(this.loadingItv);
		},
		_panHandler: function(e) {
			var self = this;
			var scrollTop = self.xscroll.getScrollTop();
			if (scrollTop > 0) return;
			self._changeStatus(Math.abs(scrollTop) < self.userConfig.height ? "down" : "up");
		},
		_panEndHandler: function(e) {
			var self = this;
			var xscroll = self.xscroll;
			var height = self.userConfig.height || 60;
			var scrollTop = xscroll.getScrollTop();
			if (scrollTop < -height) {
				//prevent default bounce
				e.preventDefault();
				xscroll.boundry.resetTop();
				self._changeStatus("loading");
				xscroll.boundry.expandTop(height);
				xscroll.boundryCheckY(function() {
				});
				if (self.userConfig.autoRefresh) {
					clearTimeout(self.loadingItv);
					self.loadingItv = setTimeout(function() {
						xscroll.boundry.resetTop();
						xscroll.boundryCheckY(function() {
							window.location.reload();
						})
					}, 800);
				}
			}
		}
	});

	if (typeof module == 'object' && module.exports) {
		module.exports = PullDown;
	}
	/** ignored by jsdoc **/
	else if (window.XScroll && window.XScroll.Plugins) {
		return XScroll.Plugins.PullDown = PullDown;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1094:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	"use strict";
	var Util = __webpack_require__(1078);
	var Base = __webpack_require__(1079);
	var clsPrefix;
	var containerCls;
	var loadingContent = "Loading...";
	var upContent = "Pull Up To Refresh";
	var downContent = "Release To Refresh";
	var PULL_UP_HEIGHT = 60;
	var HEIGHT = 40;
	/**
	 * A pullup to load plugin for xscroll.
	 * @constructor
	 * @param {object} cfg
	 * @param {number} cfg.height
	 * @param {string} cfg.downContent
	 * @param {string} cfg.upContent
	 * @param {string} cfg.loadingContent
	 * @param {string} cfg.clsPrefix  class prefix which default value is "xs-plugin-pullup-"
	 * @param {number} cfg.bufferHeight preload data before scrolling to the bottom of the boundry
	 * @extends {Base}
	 */
	var PullUp = function(cfg) {
		PullUp.superclass.constructor.call(this);
		this.userConfig = Util.mix({
			upContent: upContent,
			downContent: downContent,
			pullUpHeight: PULL_UP_HEIGHT,
			height: HEIGHT,
			loadingContent: loadingContent,
			bufferHeight: 0,
			clsPrefix: "xs-plugin-pullup-"
		}, cfg);
	}
	Util.extend(PullUp, Base, {
		/**
		 * a pluginId
		 * @memberOf PullUp
		 * @type {string}
		 */
		pluginId: "pullup",
		/**
		 * plugin initializer
		 * @memberOf PullUp
		 * @override Base
		 * @return {PullUp}
		 */
		pluginInitializer: function(xscroll) {
			var self = this;
			self.xscroll = xscroll.render();
			clsPrefix = self.userConfig.clsPrefix;
			self.render();
			return self;
		},
		/**
		 * detroy the plugin
		 * @memberOf PullUp
		 * @override Base
		 * @return {PullUp}
		 */
		pluginDestructor: function() {
			var self = this;
			Util.remove(self.pullup);
			self.xscroll.off("scrollend", self._scrollEndHandler, self);
			self.xscroll.off("scroll", self._scrollHandler, self);
			self.xscroll.off("pan", self._panHandler, self);
			self.xscroll.boundry.resetBottom();
			self.__isRender = false;
			self._evtBinded = false;
		},
		/**
		 * disable the plugin
		 * @memberOf PullUp
		 * @override Base
		 * @return {PullUp}
		 */
		pluginDisable: function() {
			var self = this;
			self.userConfig.container || Util.remove(self.pullup)
			self.xscroll.off("scrollend", self._scrollEndHandler, self);
			self.xscroll.off("scroll", self._scrollHandler, self);
			self.xscroll.off("pan", self._panHandler, self);
			self.xscroll.boundry.resetBottom();
			self.__isRender = false;
			self._evtBinded = false;
		},
		/**
		 * render pullup plugin
		 * @memberOf PullUp
		 * @return {PullUp}
		 */
		render: function() {
			var self = this;
			if (self.__isRender) return;
			self.__isRender = true;
			if (!self.userConfig.container) {
				var containerCls = clsPrefix + "container";
				var height = self.userConfig.height;
				var pullup = self.pullup = document.createElement("div");
				pullup.className = containerCls;
				pullup.style.position = "absolute";
				pullup.style.width = "100%";
				pullup.style.height = height + "px";
				pullup.style.bottom = -height + "px";
				pullup.style.textAlign = "center";
				self.xscroll.container.appendChild(pullup);
				Util.addClass(pullup, clsPrefix + self.status);
				pullup.innerHTML = self.userConfig[self.status + "Content"] || self.userConfig.content;
			} else {
				self.pullup = self.userConfig.container
			}
			self.xscroll.boundry.expandBottom(self.userConfig.height);
			self.status = 'up';
			self._bindEvt();
			return self;
		},
		_bindEvt: function() {
			var self = this;
			if (self._evtBinded) return;
			self._evtBinded = true;
			var pullup = self.pullup;
			var xscroll = self.xscroll;
			xscroll.on("pan", self._panHandler, self);
			//load width a buffer
			if (self.userConfig.bufferHeight > 0) {
				xscroll.on("scroll", self._scrollHandler, self);
			}
			//bounce bottom
			xscroll.on("scrollend", self._scrollEndHandler, self);
			return self;
		},
		_scrollEndHandler: function(e) {
			var self = this,
				xscroll = self.xscroll,
				scrollTop = xscroll.getScrollTop();
			if (scrollTop == xscroll.containerHeight - xscroll.height + self.userConfig.height) {
				self._changeStatus("loading");
			}
			return self;
		},
		_scrollHandler: function(e) {
			var self = this,
				xscroll = self.xscroll;
			if (!self.isLoading && Math.abs(e.scrollTop) + xscroll.height + self.userConfig.height + self.userConfig.bufferHeight >= xscroll.containerHeight + xscroll.boundry._xtop + xscroll.boundry._xbottom) {
				self._changeStatus("loading");
			}
			return self;
		},
		_panHandler: function(e) {
			var self = this;
			var xscroll = self.xscroll;
			var offsetTop = -xscroll.getScrollTop();
			if (offsetTop < xscroll.height - xscroll.containerHeight - self.userConfig.pullUpHeight) {
				self._changeStatus("down")
			} else {
				self._changeStatus("up");
			}
			return self;
		},
		_changeStatus: function(status) {
			if (status != "loading" && this.isLoading) return;
			var prevVal = this.status;
			this.status = status;
			if (!this.userConfig.container) {
				Util.removeClass(this.pullup, clsPrefix + prevVal)
				Util.addClass(this.pullup, clsPrefix + status);
				this.pullup.innerHTML = this.userConfig[status + "Content"];
			}
			if (prevVal != status) {
				this.trigger("statuschange", {
					prevVal: prevVal,
					newVal: status
				});
				if (status == "loading") {
					this.isLoading = true;
					this.trigger("loading");
				}
			}
			return this;
		},
		/**
		 * notify pullup plugin to complete state after a remote data request
		 * @memberOf PullUp
		 * @return {PullUp}
		 */
		complete: function() {
			var self = this;
			var xscroll = self.xscroll;
			self.isLoading = false;
			self._changeStatus("up");
			return self;
		},
		stop: function() {
			var xscroll = this.xscroll;
			this.isLoading = false;
			this._changeStatus("stop");
			this.pluginDisable()
			return this;
		},
		restart: function() {
			var xscroll = this.xscroll;
			this.isLoading = false;
			this._changeStatus("default");
			this.render()
			return this;
		}
	});

	if (typeof module == 'object' && module.exports) {
		module.exports = PullUp;
	}
	/** ignored by jsdoc **/
	else if (window.XScroll && window.XScroll.Plugins) {
		return XScroll.Plugins.PullUp = PullUp;
	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1095:
/***/ function(module, exports) {

	module.exports = "\n<div :style=\"styles\">\n  <div class=\"xs-container\">\n    <slot></slot>\n    <slot name=\"pulldown\"></slot>\n    <slot name=\"pullup\"></slot>\n  </div>\n</div>\n";

/***/ },

/***/ 1119:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Vue = __webpack_require__(459);

	var _Vue2 = _interopRequireDefault(_Vue);

	var _VueLazyload = __webpack_require__(1120);

	var _VueLazyload2 = _interopRequireDefault(_VueLazyload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  init: function init(isLoading) {
	    // 懒加载全局设置
	    document.body.style.display = 'none';
	    if (isLoading) {
	      _Vue2.default.use(_VueLazyload2.default, {
	        loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	        error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	        try: 2,
	        preLoad: 1.5
	      });
	    } else {
	      _Vue2.default.use(_VueLazyload2.default, {
	        // loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	        // error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	        try: 2,
	        preLoad: 1.5
	      });
	    }
	    document.body.style.display = null;
	  }
	};

/***/ },

/***/ 1120:
/***/ function(module, exports) {

	module.exports = VueLazyload;

/***/ },

/***/ 1122:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _native = __webpack_require__(154);

	var _native2 = _interopRequireDefault(_native);

	var _ua = __webpack_require__(155);

	var _ua2 = _interopRequireDefault(_ua);

	var _login = __webpack_require__(1123);

	var _login2 = _interopRequireDefault(_login);

	var _jsCookie = __webpack_require__(987);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _util = __webpack_require__(988);

	var _util2 = _interopRequireDefault(_util);

	var _weixin = __webpack_require__(985);

	var _weixin2 = _interopRequireDefault(_weixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import scriptjs from 'scriptjs';
	__webpack_require__(1124);


	// ios wkwebview返回上一页执行回调刷新页面
	_native2.default.custom.onWebviewBack();

	/**
	 * 功能：检测是否需要去微信授权
	 */
	(function () {
	  // Cookies.remove('is_auto_login', {
	  //   domain: util.getBaseDomain()
	  // });
	  // alert(Cookies.get('is_auto_login'));

	  // Cookies.remove('weixin_auth_try_times', {
	  //   domain: util.getBaseDomain()
	  // });
	  // alert(Cookies.get('weixin_auth_try_times'));
	  // return;

	  // 微信授权短时间内尝试次数
	  var weixin_auth_try_times = _jsCookie2.default.get('weixin_auth_try_times');

	  // 完成微信授权之后会在cookie设置is_auto_login=1,有这个标识了不需要再走授权逻辑
	  if (_ua2.default.isWeiXin() && !_login2.default.isLogined() && _jsCookie2.default.get('is_auto_login') === undefined && (weixin_auth_try_times === undefined || weixin_auth_try_times < 1)) {

	    // 设置尝试授权次数，每次失败1天以后重新尝试
	    _jsCookie2.default.set('weixin_auth_try_times', weixin_auth_try_times ? parseInt(weixin_auth_try_times) + 1 : 1, {
	      domain: _util2.default.getBaseDomain(),
	      path: '/',
	      expires: 1 // 有效时间1天
	      // expires: 1 / 24 / 60    // 有效时间1分钟
	    });

	    _weixin2.default.goAuthPage();
	  }
	})();

	/**
	 * 功能：检测是否需要domain跳转
	 */
	function _checkRedirect(domain) {
	  // 当前域名与强制域名和小写强制域名都不符时，跳转到强制域名
	  if (domain && domain !== location.host && ''.toLowerCase && new String(domain).toLowerCase() !== location.host) {
	    /*// nemo逻辑
	    // 设置临时跳转路径
	    sessionStorage.setItem('temp_domain', location.hostname);*/
	    // 跳转强制domain
	    location.href = location.href.replace(location.host, domain);
	    // 中断程序执行
	    throw new Error('\u5373\u5C06\u8DF3\u8F6C\u5F3A\u5236\u57DF\u540D(' + location.href + ')\uFF0C\u5DF2\u4E3B\u52A8\u629B\u51FA\u5F02\u5E38\u4E2D\u65AD\u5F53\u524D\u9875\u9762js\u6267\u884C\uFF0C\u8BF7\u5FFD\u7565\u6B64\u5F02\u5E38\u4FE1\u606F~');
	  }
	}

	/**
	 * 功能：检测cookie是否需要强制跳转
	 */
	(function () {
	  var script = document.querySelector('script');
	  if (script && script.src && script.src.indexOf('common/js/autoRootSize.js') !== -1) {
	    _checkRedirect(_jsCookie2.default.get('force_domain'));
	  }
	})();

	// fastclick
	// iPhone; CPU iPhone OS 10_3_2 like Mac OS X
	// ios10以下才需要加fastclick
	// window.addEventListener('load', function () {
	//   // 延迟加载,提高页面显示速度
	//   setTimeout(function () {
	//     scriptjs('//cdn.davdian.com/fastclick/1.0.6/fastclick.min.js', function () {
	//       FastClick.attach(document.body);
	//     });
	//   }, 3000);
	// }, false);

	exports.default = {
	  /**
	   * 功能：检测接口是否需要domain跳转
	   * 说明：每个接口公参会返回强制跳转字段，如果这个字段有值并且与当前域名不同则跳转
	   */
	  checkRedirect: function checkRedirect(response) {
	    /*// nemo逻辑
	    // 百度脑图：http://naotu.baidu.com/file/845581a94947715ba1c8cf832d46eb37?token=bb2bd462d2f5f75f
	    if (response.code === 0 || response.code === '11012' || response.code === '11013') {
	      checkRedirect(Cookies.get('forceDomain'));
	    } else if (response.code === '11014') {
	      let temp_domain = sessionStorage.setItem('temp_domain', location.hostname);
	      if(temp_domain){
	        // 跳转临时domain
	        location.href = location.href.replace(location.host, temp_domain);
	      }else{
	        // 跳转默认domain
	        location.href = location.href.replace(location.host, 'bravetime.davdian.com');
	      }
	    }*/

	    // 建生逻辑：11012、11013、11015(访问的手机号域名有自定义域名)时根据返的cookie跳；10010时跳bravetime；
	    // 百度脑图：http://naotu.baidu.com/file/653525bad80d30f32561e78afacaae39?token=35f3626016726857
	    if (response.code === '11012' || response.code === '11013' || response.code === '11015') {
	      _checkRedirect(_jsCookie2.default.get('force_domain'));
	    } else if (response.code === '10010') {
	      // 跳转强制domain
	      location.href = location.href.replace(location.host, 'bravetime.' + _util2.default.getBaseDomain());
	      // 中断程序执行
	      throw new Error('\u5373\u5C06\u8DF3\u8F6C\u5F3A\u5236\u57DF\u540D(' + location.href + ')\uFF0C\u5DF2\u4E3B\u52A8\u629B\u51FA\u5F02\u5E38\u4E2D\u65AD\u5F53\u524D\u9875\u9762js\u6267\u884C\uFF0C\u8BF7\u5FFD\u7565\u6B64\u5F02\u5E38\u4FE1\u606F~');
	    }
	  }
	};

/***/ },

/***/ 1123:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsCookie = __webpack_require__(987);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 模块: 登录相关
	 * 说明: 通过Cookie中dvdsid(后端又叫session_key、sess_key)判断登录相关状态
	 */
	exports.default = {
	  /**
	   * 功能: 用户是否已登录
	   * 说明: 取dvdsid33-39位7个0为未登录
	   */
	  getDvdsid: function getDvdsid() {
	    var dvdsid = _jsCookie2.default.get('dvdsid');
	    return Object.prototype.toString.call(dvdsid) === '[object String]' ? dvdsid : '';
	  },

	  /**
	   * 功能: 用户是否已登录
	   * 说明: dvdsid第33-39位如果是7个0为未登录
	   */
	  isLogined: function isLogined() {
	    var dvdsid = this.getDvdsid();
	    return dvdsid && dvdsid.substr(32, 7) !== '0000000';
	  },

	  /**
	   * 功能: 获取session id
	   * 说明: 取dvdsid前32位
	   */
	  getSessionId: function getSessionId() {
	    return this.getDvdsid().substr(0, 32);
	  },

	  /**
	   * 功能: 获取userId
	   * 说明: 取dvdsid第33-39位,并转为10进制
	   */
	  getUserId: function getUserId() {
	    var sessionId = this.getDvdsid().substr(32, 7);
	    return sessionId ? parseInt(sessionId, 16) : '';
	  },

	  /**
	   * 功能: 获取用户身份
	   * 说明: 取dvdsid第40位
	   */
	  getUserStatusCode: function getUserStatusCode() {
	    return this.getDvdsid().substr(39, 1);
	  },

	  /**
	   * 功能: 跳转到登录页，登录后返回
	   * 说明: 调用此方法说明当前页面需要登录，如果未登录跳转登录页
	   */
	  goLoginPage: function goLoginPage() {
	    location.href = '/login.html?referer=' + encodeURIComponent(location.href);
	    throw new Error('\u5373\u5C06\u8DF3\u8F6C\u767B\u5F55\u9875(' + location.href + ')\uFF0C\u5DF2\u4E3B\u52A8\u629B\u51FA\u5F02\u5E38\u4E2D\u65AD\u5F53\u524D\u9875\u9762js\u6267\u884C\uFF0C\u8BF7\u5FFD\u7565\u6B64\u5F02\u5E38\u4FE1\u606F~');
	  },

	  /**
	   * 功能: 自动跳转登录页
	   * 说明: 调用此方法说明当前页面需要登录，如果未登录跳转登录页
	   */
	  needLogin: function needLogin() {
	    if (!this.isLogined()) {
	      this.goLoginPage();
	    }
	  },

	  /**
	   * 功能: 是否是已登录的买家
	   */
	  isBuyer: function isBuyer() {
	    return this.isLogined() && this.getUserStatusCode() === '1';
	  },

	  /**
	   * 功能: 是否是已登录的卖家
	   */
	  isSeller: function isSeller() {
	    return this.isLogined() && this.getUserStatusCode() === '3';
	  }
	};

/***/ },

/***/ 1124:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var designWidth = window.designWidth;
	function setRootSize(width) {
	  designWidth = width;
	  width = designWidth || 375;
	  var clientWidth = document.documentElement.clientWidth;
	  if (clientWidth > 640) {
	    clientWidth = 640;
	  } else {
	    if (clientWidth < 320) {
	      clientWidth = 320;
	    }
	  }
	  document.documentElement.style.fontSize = clientWidth / width * 100 + "px";
	}
	setRootSize();
	window.addEventListener("resize", function () {
	  setRootSize();
	}, false);
	window.designWidth = undefined;

	exports.default = setRootSize;

/***/ },

/***/ 1125:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ua = __webpack_require__(155);

	var _ua2 = _interopRequireDefault(_ua);

	var _native = __webpack_require__(154);

	var _native2 = _interopRequireDefault(_native);

	var _weixin = __webpack_require__(985);

	var _weixin2 = _interopRequireDefault(_weixin);

	var _Vue = __webpack_require__(459);

	var _Vue2 = _interopRequireDefault(_Vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getEl = function getEl() {
	  return (document.querySelector('.app') || document.body).appendChild(document.createElement('div'));
	};

	/**
	 * share模块
	 * 与分享有关的模块
	 */
	exports.default = {
	  /**
	   * 设置 微信&native 分享信息
	   * 调用方法:
	   share.setShareInfo({
	      title: '大V店组团包邮', // 分享标题
	      desc: '一件包邮！每天上新！好货低价又包邮，抢到了就赚翻啦', // 分享描述
	      link: location.href, // 分享链接
	      imgUrl: 'http://pic.davdian.com/free/2016/04/09/320_320_0fc3e0dbbadd249b7f1b93a525f0adf0.jpg', // 分享图标
	    });
	   */
	  setShareInfo: function setShareInfo() {
	    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var response = arguments[1];

	    if (_ua2.default.isWeiXin()) {
	      _weixin2.default.setShareInfo(param, response);
	    } else if (_ua2.default.isDvdApp()) {
	      _native2.default.custom.setShareInfo(param);
	    }
	  },

	  /**
	   * 唤起浏览器分享(目前只支持弹出浮层引导分享)
	   */
	  callBrowserShare: function callBrowserShare() {
	    new _Vue2.default({
	      components: {
	        'com-share-pop-tip': __webpack_require__(1126)
	      },
	      el: getEl(),
	      data: {},
	      template: '<com-share-pop-tip/>'
	    });
	  },

	  /**
	   * 唤起 浏览器|native 分享
	   */
	  callShare: function callShare() {
	    if (_ua2.default.isDvdApp()) {
	      _native2.default.custom.share();
	    } else {
	      this.callBrowserShare();
	    }
	  }
	};

/***/ },

/***/ 1126:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1127)
	__vue_script__ = __webpack_require__(1129)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-share-pop-tip.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1130)
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
	  var id = "_v-57b26686/com-share-pop-tip.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1127:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1128);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-share-pop-tip.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-share-pop-tip.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1128:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".com-share-pop-tip {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  max-width: 640px;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.8;\n  z-index: 99;\n  display: none; }\n  .com-share-pop-tip .arrow {\n    position: absolute;\n    top: 0;\n    right: 0.3rem; }\n  .com-share-pop-tip .tip {\n    margin-top: 1rem;\n    color: #ffffff;\n    font-size: 0.15rem;\n    padding: 0 0.3rem;\n    text-align: center;\n    line-height: 1.5; }\n", ""]);

	// exports


/***/ },

/***/ 1129:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ua = __webpack_require__(155);

	var _ua2 = _interopRequireDefault(_ua);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    return {
	      styleObject: {
	        display: 'block'
	      },
	      isWeixin: _ua2.default.isWeiXin()
	    };
	  },
	  props: {
	    classObject: {},
	    type: String // 取值weixin
	  },
	  components: {},
	  methods: {
	    show: function show() {
	      //        this.styleObject.display = 'block';
	    },
	    close: function close() {
	      //        this.styleObject.display = 'none';
	      this.$destroy();
	      this.$el.parentNode.removeChild(this.$el);
	    },
	    touchmove: function touchmove(event) {
	      event.preventDefault();
	    }
	  },
	  filters: {},
	  computed: {},
	  watch: {},
	  created: function created() {},
	  mounted: function mounted() {}
	  // </script>
	  //
	  // <style lang="sass" lang="scss" rel="stylesheet/scss">
	  //   @import "../common/css/util/all";
	  //
	  //   // 分享提示浮层
	  //   .com-share-pop-tip {
	  //     position: fixed;
	  //     bottom: 0;
	  //     width: 100%;
	  //     max-width: 640px;
	  //     height: 100%;
	  //     background-color: #000;
	  //     opacity: 0.8;
	  //     z-index: 99;
	  //     display: none;
	  //     .arrow {
	  //       position: absolute;
	  //       top: 0;
	  //       right: ptr(30);
	  //     }
	  //     .tip {
	  //       margin-top: ptr(100);
	  //       color: #ffffff;
	  //       font-size: ptr(15);
	  //       padding: 0 ptr(30);
	  //       text-align: center;
	  //       line-height: 1.5;
	  //     }
	  //   }
	  //
	  // </style>

	}; // <!--分享提示浮层-->
	// <template>
	//   <div class="com-share-pop-tip" :style="styleObject" @click="close" @touchmove="touchmove">
	//     <img class="arrow" src="http://pic.davdian.com/free/pointer.png">
	//     <div class="tip">
	//       <template v-if="isWeixin">
	//         <p>请点击右上角“分享”按钮,</p>
	//         <p>然后可以选择“发送给朋友”、“分享到朋友圈”或者“复制链接”后发送链接给朋友。</p>
	//       </template>
	//       <template v-if="!isWeixin">
	//         <p>请复制地址栏链接，将链接发送给朋友</p>
	//       </template>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 1130:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"com-share-pop-tip\" :style=\"styleObject\" @click=\"close\" @touchmove=\"touchmove\">\n  <img class=\"arrow\" src=\"http://pic.davdian.com/free/pointer.png\">\n  <div class=\"tip\">\n    <template v-if=\"isWeixin\">\n      <p>请点击右上角“分享”按钮,</p>\n      <p>然后可以选择“发送给朋友”、“分享到朋友圈”或者“复制链接”后发送链接给朋友。</p>\n    </template>\n    <template v-if=\"!isWeixin\">\n      <p>请复制地址栏链接，将链接发送给朋友</p>\n    </template>\n  </div>\n</div>\n";

/***/ },

/***/ 1140:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1141)
	__vue_script__ = __webpack_require__(1143)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-top-title.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1144)
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
	  var id = "_v-16214635/com-top-title.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1141:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1142);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-top-title.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-top-title.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1142:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes animation-top-title-hide {\n  0% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); } }\n\n@keyframes animation-top-title-hide {\n  0% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); } }\n\n@-webkit-keyframes animation-top-title-show {\n  0% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes animation-top-title-show {\n  0% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n.com-top-title {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  max-width: 640px;\n  height: 44px;\n  line-height: 44px;\n  background-color: #fafafa;\n  color: #333;\n  text-align: center;\n  font-size: 16px;\n  z-index: 1; }\n  .com-top-title.border-bottom {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.05); }\n  .com-top-title .back-btn {\n    position: absolute;\n    left: 0;\n    height: 100%;\n    width: 44px; }\n    .com-top-title .back-btn .back-arrow {\n      position: absolute;\n      top: 15px;\n      left: 15px;\n      display: inline-block;\n      width: 12px;\n      height: 12px;\n      border-bottom: 1px solid #333;\n      border-left: 1px solid #333;\n      -webkit-transform: rotate(45deg);\n          -ms-transform: rotate(45deg);\n              transform: rotate(45deg);\n      cursor: pointer; }\n  .com-top-title .title {\n    display: inline-block;\n    width: 60%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .com-top-title .home {\n    position: absolute;\n    top: 12px;\n    right: 12px;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    background: url(http://pic.davdian.com/free/home_icon_0825.png) no-repeat;\n    background-size: 100%;\n    cursor: pointer; }\n  .com-top-title.animate-hide {\n    -webkit-animation: animation-top-title-hide 0.2s forwards;\n            animation: animation-top-title-hide 0.2s forwards; }\n  .com-top-title.animate-show {\n    -webkit-animation: animation-top-title-show 0.2s forwards;\n            animation: animation-top-title-show 0.2s forwards; }\n", ""]);

	// exports


/***/ },

/***/ 1143:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ua = __webpack_require__(155);

	var _ua2 = _interopRequireDefault(_ua);

	var _native = __webpack_require__(154);

	var _native2 = _interopRequireDefault(_native);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//   <!--顶部标题-->
	//   <div class="com-top-title" :class="classObject" v-if="!isDvdApp" :style="styleObject">
	//     <div class="back-btn" @click="back">
	//       <i class="back-arrow"></i>
	//     </div>
	//     <span class="title">{{title}}</span>
	//     <i class="home" v-if="home !== undefined" @click="goHome"></i>
	//     <slot></slot>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  props: {
	    title: String,
	    home: {
	      type: String
	    },
	    'back-btn-click': Function,
	    'border-bottom': Boolean,
	    'hide-disable': Boolean
	  },
	  data: function data() {
	    return {
	      classObject: {
	        'animate-show': false,
	        'animate-hide': false,
	        'border-bottom': this.borderBottom
	      },
	      styleObject: {},
	      isDvdApp: _ua2.default.isDvdApp()
	    };
	  },

	  computed: {},
	  created: function created() {},
	  mounted: function mounted() {
	    // document.title与H5标题栏同步
	    document.title = this.title;
	    _native2.default.Browser.setHead({
	      'title': document.title
	    });

	    // 非native环境下,要显示H5标题栏并且要设置.app的padding-top
	    if (!_ua2.default.isDvdApp()) {
	      var app = document.querySelector('.app');
	      this.$el.style.position = '-webkit-sticky';
	      this.$el.style.position = 'sticky';
	      if (this.$el.style.position == '-webkit-sticky' || this.$el.style.position == 'sticky') {} else {
	        app.style.paddingTop = '44px';
	      }
	      app.style.backgroundPosition = '0 44px';
	      if (!this.hideDisable) {
	        this.setAutoAnimation();
	      }
	    }
	  },

	  methods: {
	    back: function back() {
	      if (this.backBtnClick) {
	        this.backBtnClick();
	      } else {
	        if (history.length > 1) {
	          history.back();
	        } else {
	          window.close();
	        }
	      }
	    },
	    goHome: function goHome() {
	      location.href = this.home || '/';
	    },
	    setAutoAnimation: function setAutoAnimation() {
	      var ts = this;
	      // 控制隐藏出现
	      var titleBarHeight = ts.$el.clientHeight;
	      var lastY = 0;
	      var downInSwitcher = true;
	      var upOutSwitcher = true;
	      window.addEventListener('scroll', function () {
	        var y = document.body.scrollTop;
	        // 页面向下滚动
	        if (y - lastY > 0) {
	          // 滚动距离大于topbar高度
	          if (upOutSwitcher && y > titleBarHeight) {
	            // top-title向上滑出
	            ts.classObject['animate-show'] = false;
	            ts.classObject['animate-hide'] = true;
	            upOutSwitcher = false;
	            setTimeout(function () {
	              upOutSwitcher = true;
	            }, 500);
	          }
	          // 页面向上滚动
	        } else if (downInSwitcher && y - lastY < -0) {
	          // top-title向下滑入
	          ts.classObject['animate-show'] = true;
	          ts.classObject['animate-hide'] = false;
	          downInSwitcher = false;
	          setTimeout(function () {
	            downInSwitcher = true;
	          }, 500);
	        }
	        lastY = document.body.scrollTop;
	      }, false);
	    }
	  },
	  filters: {},
	  watch: {}
	  // </script>
	  //
	  // <style lang="sass" lang="scss" rel="stylesheet/scss">
	  //   @import "../common/css/util/all";
	  //
	  //   // 动画
	  //   @keyframes animation-top-title-hide {
	  //     0% {
	  //       transform: translateY(0);
	  //     }
	  //     100% {
	  //       transform: translateY(-100%);
	  //     }
	  //   }
	  //
	  //   @keyframes animation-top-title-show {
	  //     0% {
	  //       transform: translateY(-100%);
	  //     }
	  //     100% {
	  //       transform: translateY(0);
	  //     }
	  //   }
	  //
	  //   // 顶部标题
	  //   .com-top-title {
	  //     position: fixed;
	  //     top: 0;
	  //     width: 100%;
	  //     max-width: $pageMaxWidth;
	  //     height: 44px;
	  //     line-height: 44px;
	  //     background-color: #fafafa;
	  //     color: #333;
	  //     text-align: center;
	  //     font-size: 16px;
	  //     z-index: 1;
	  //     &.border-bottom {
	  //       border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	  //     }
	  //     // 返回按钮
	  //     .back-btn {
	  //       position: absolute;
	  //       left: 0;
	  //       height: 100%;
	  //       width: 44px;
	  //       // 箭头
	  //       .back-arrow {
	  //         position: absolute;
	  //         top: 15px;
	  //         left: 15px;
	  //         display: inline-block;
	  //         width: 12px;
	  //         height: 12px;
	  //         border-bottom: 1px solid #333;
	  //         border-left: 1px solid #333;
	  //         transform: rotate(45deg);
	  //         cursor: pointer;
	  //       }
	  //     }
	  //     // 标题
	  //     .title {
	  //       display: inline-block;
	  //       width: 60%;
	  //       @include ellipsis;
	  //     }
	  //     // 首页
	  //     .home {
	  //       position: absolute;
	  //       top: 12px;
	  //       right: 12px;
	  //       display: inline-block;
	  //       width: 20px;
	  //       height: 20px;
	  //       background: url(http://pic.davdian.com/free/home_icon_0825.png) no-repeat;
	  //       background-size: 100%;
	  //       cursor: pointer;
	  //     }
	  //     &.animate-hide {
	  //       animation: animation-top-title-hide 0.2s forwards;
	  //     }
	  //     &.animate-show {
	  //       animation: animation-top-title-show 0.2s forwards;
	  //     }
	  //   }
	  // </style>

	};

/***/ },

/***/ 1144:
/***/ function(module, exports) {

	module.exports = "\n<!--顶部标题-->\n<div class=\"com-top-title\" :class=\"classObject\" v-if=\"!isDvdApp\" :style=\"styleObject\">\n  <div class=\"back-btn\" @click=\"back\">\n    <i class=\"back-arrow\"></i>\n  </div>\n  <span class=\"title\">{{title}}</span>\n  <i class=\"home\" v-if=\"home !== undefined\" @click=\"goHome\"></i>\n  <slot></slot>\n</div>\n";

/***/ },

/***/ 1550:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1551)
	__webpack_require__(1553)
	__vue_script__ = __webpack_require__(1555)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/vue/app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1699)
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
	  var id = "_v-385fd476/app.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1551:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1552);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1552:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nhtml, body {\n  height: 100%;\n  width: 100%;\n  overflow-x: hidden;\n}\n#vux_view_box_body{\n  /*padding-top: 44px;*/\n  overflow-x: hidden;\n  overflow-y: scroll;\n  padding-bottom:0;\n}\n\nbody {\n  background-color: #fff;\n  padding-top: 0;\n}\n\n.is_dvd_app #vux_view_box_body{\n  padding-top: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 1553:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1554);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/sass-loader/index.js!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./app.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/sass-loader/index.js!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1554:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct display in IE 9-.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\ntemplate,\n[hidden] {\n  display: none; }\n\n/* Links\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0; }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Restore the font weight unset by the previous rule.\n */\noptgroup {\n  font-weight: bold; }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n* {\n  margin: 0;\n  padding: 0; }\n\nul {\n  list-style: none inside; }\n\na {\n  text-decoration: none;\n  color: inherit; }\n\nimg {\n  border-style: none; }\n\niframe {\n  border: none; }\n\n:before,\n:after {\n  vertical-align: middle; }\n\nbody {\n  background-color: #f5f5f5;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 0.14rem;\n  line-height: 1;\n  color: #333;\n  word-break: break-all;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none; }\n\n.app {\n  margin: auto;\n  min-width: 320px;\n  max-width: 640px;\n  position: relative;\n  overflow: auto; }\n\nimg {\n  max-width: 100%; }\n", ""]);

	// exports


/***/ },

/***/ 1555:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(282);

	var _axios2 = _interopRequireDefault(_axios);

	var _layout = __webpack_require__(91);

	var _layout2 = _interopRequireDefault(_layout);

	var _$ = __webpack_require__(95);

	var _$2 = _interopRequireDefault(_$);

	var _share = __webpack_require__(1125);

	var _share2 = _interopRequireDefault(_share);

	var _base = __webpack_require__(965);

	var _base2 = _interopRequireDefault(_base);

	var _ua = __webpack_require__(155);

	var _ua2 = _interopRequireDefault(_ua);

	var _bus = __webpack_require__(1556);

	var _bus2 = _interopRequireDefault(_bus);

	var _native = __webpack_require__(154);

	var _native2 = _interopRequireDefault(_native);

	__webpack_require__(1557);

	var _index = __webpack_require__(1694);

	var _index2 = _interopRequireDefault(_index);

	var _webStorageCache = __webpack_require__(358);

	var _webStorageCache2 = _interopRequireDefault(_webStorageCache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var topicCache = new _webStorageCache2.default({ storage: 'sessionStorage' });
	exports.default = {
	  data: function data() {
	    return {
	      list: JSON.parse(dataStr).list,
	      title: "大V店",
	      isRender: false
	    };
	  },
	  components: {
	    'com-top-title': __webpack_require__(1140),
	    ViewBox: _index2.default
	  },
	  created: function created() {
	    window.tj_path = "new_topic";
	    _base2.default.init();
	    var that = this;
	    _bus2.default.$on('scroll', function (target) {
	      that.$refs.viewBox.scrollTo(target);
	    });
	    if (_ua2.default.isDvdApp()) {
	      document.body.className = document.body.className + "is_dvd_app";
	    }
	  },
	  mounted: function mounted() {
	    var that = this;

	    var info = JSON.parse(dataStr).info;

	    that.title = document.title = info.title;
	    _native2.default.custom.initHead({
	      shareOnHead: 1,
	      homeOnHead: 1
	    });
	    _share2.default.setShareInfo({
	      title: info.shareTitle,
	      desc: info.shareDesc,
	      link: location.href,
	      imgUrl: info.shareImg // 分享图标
	    });

	    that.$nextTick(function () {
	      if (_ua2.default.isIos() && _ua2.default.isWeiXin()) {
	        document.querySelector(".app").style.height = window.innerHeight - 44 + "px";
	      }
	      setTimeout(function () {
	        that.restorePosition();
	      }, 10);
	      that.addPositionListener();
	    });
	  },

	  methods: {
	    getData: function getData(item) {
	      var url = "/index.php?m=default&c=topic&a=ajax_goods_by_ids";
	      var requestGoods = item.goods.replace(/，/g, ",");

	      _axios2.default.request({
	        url: url,
	        method: 'post',
	        params: {
	          list: requestGoods,
	          table: "goods_id,goods_name,shop_price,goods_img,market_price,goods_brief"
	        }
	      }).then(function (res) {
	        item.previewData = res.data.data;
	      }).catch(function (err) {
	        reject(err);
	      });
	    },
	    addPositionListener: function addPositionListener() {
	      var that = this;
	      (0, _$2.default)(document).on("click", "a", function () {
	        var y = that.$refs.viewBox.getScrollTop();
	        topicCache.set("restoreY", y);
	      });
	    },
	    restorePosition: function restorePosition() {
	      var that = this;
	      var history = _base2.default.pathHistory.getPathHistoryList();
	      if (history.length > 2) {
	        if (history[history.length - 2].path === "detail" && history[history.length - 3].href === location.href) {
	          var restoreY = +topicCache.get("restoreY");
	          if (restoreY) {
	            that.$refs.viewBox.scrollTo(restoreY);
	          }
	        }
	      }
	    }
	  }
	};

/***/ },

/***/ 1556:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(495);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new _vue2.default();

/***/ },

/***/ 1557:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _Vue = __webpack_require__(459);

	var _Vue2 = _interopRequireDefault(_Vue);

	var _ua = __webpack_require__(155);

	var _ua2 = _interopRequireDefault(_ua);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var components = {};


	for (var i = 1; i < 27; i++) {
	  components["item_" + i] = __webpack_require__(1558)("./item_" + i + '.vue');
	}

	_Vue2.default.component('feed', {
	  components: components,
	  render: function render(createElement) {
	    var _this = this;

	    var that = this;
	    return createElement("section", {
	      attrs: {
	        id: that.environment + "_section"
	      },
	      style: {
	        background: "#fff",
	        fontSize: _ua2.default.isWeiXin() && _ua2.default.isIos() ? "100px" : "100px"
	      }
	    }, this.feedList.map(function (item) {
	      var fid = void 0;
	      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === "object") {
	        fid = item.id;
	      } else {
	        fid = item;
	      }
	      if (item.id == 2 || item.id == 10 || item.id == 18) {
	        _this.getData(item);
	      }
	      return createElement("div", {
	        attrs: {
	          name: item.anchor ? encodeURI(item.anchor).toString().replace(/%/g, "") : 'no_anchor_' + Math.floor(Math.random() * 1000)
	        },
	        "class": {
	          feed_item: true
	        }
	      }, [createElement("item_" + fid, {
	        props: {
	          environment: that.environment,
	          fid: fid,
	          itemData: item
	        }
	      })]);
	    }));
	  },
	  props: ["environment", 'feedList', 'currentEditFeed'],
	  data: function data() {
	    return {};
	  },

	  computed: {},
	  methods: {
	    getData: function getData(item) {
	      $.ajax({
	        url: "/index.php?m=default&c=topic&a=ajax_goods_by_ids",
	        type: "POST",
	        async: false,
	        data: {
	          list: item.goods.replace(/，/g, ","),
	          table: "goods_id,goods_name,shop_price,goods_img,market_price,goods_brief"
	        },
	        success: function success(result) {
	          result = JSON.parse(result);
	          item.previewData = result.data;
	        },
	        error: function error(err) {
	          console.log(err);
	        }
	      });
	    }
	  }
	});

/***/ },

/***/ 1558:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./item_1.vue": 1559,
		"./item_10.vue": 1564,
		"./item_11.vue": 1579,
		"./item_12.vue": 1582,
		"./item_13.vue": 1585,
		"./item_14.vue": 1588,
		"./item_15.vue": 1591,
		"./item_16.vue": 1594,
		"./item_17.vue": 1597,
		"./item_18.vue": 1600,
		"./item_19.vue": 1605,
		"./item_2.vue": 1618,
		"./item_20.vue": 1621,
		"./item_21.vue": 1629,
		"./item_22.vue": 1634,
		"./item_23.vue": 1639,
		"./item_24.vue": 1644,
		"./item_25.vue": 1647,
		"./item_26.vue": 1654,
		"./item_3.vue": 1657,
		"./item_4.vue": 1664,
		"./item_5.vue": 1671,
		"./item_6.vue": 1676,
		"./item_7.vue": 1681,
		"./item_8.vue": 1686,
		"./item_9.vue": 1689
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1558;


/***/ },

/***/ 1559:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1560)
	__vue_script__ = __webpack_require__(1562)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_1.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1563)
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
	  var id = "_v-5a653ff4/item_1.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1560:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1561);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a653ff4&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_1.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a653ff4&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_1.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1561:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },

/***/ 1562:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="img_item">
	//     <div class="img_container" v-if="environment=='menu'">
	//       <img src="http://pic.davdian.com/free/theme_thu_img1.jpg" alt="">
	//     </div>
	//     <div v-if="environment=='preview'">
	//       <img :src="itemData.imgUrl||'https://dummyimage.com/600x300.png&text=click%20mea'" alt="">
	//     </div>
	//     <div v-if="environment=='show'" style="position: relative">
	//       <a v-if="itemData.link&&itemData.link.length" :href="itemData.link">
	//         <img :src="itemData.imgUrl||'https://dummyimage.com/600x300.png&text=click%20mea'" alt="">
	//       </a>
	//       <img style="position: relative;left: 0;top: 0;" v-else :src="itemData.imgUrl||'https://dummyimage.com/600x300.png&text=click%20mea'" alt="">
	//     </div>
	//   </div>
	// </template>
	// <script>
	exports.default = {
	  name: "item1",
	  data: function data() {
	    return {
	      h: 100
	    };
	  },

	  props: ['environment', 'fid', 'itemData'],
	  mounted: function mounted() {

	    var img = new Image(),
	        that = this;
	    img.onload = function () {
	      var el = that.$el;
	      el.style.height = el.clientWidth / img.width * img.height + "px";
	    };

	    this.$nextTick(function () {
	      img.src = this.itemData.imgUrl;
	    });
	  }
	};
	// </script>
	// <style scoped>
	//
	// </style>

/***/ },

/***/ 1563:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"img_item\" _v-5a653ff4=\"\">\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-5a653ff4=\"\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img1.jpg\" alt=\"\" _v-5a653ff4=\"\">\n  </div>\n  <div v-if=\"environment=='preview'\" _v-5a653ff4=\"\">\n    <img :src=\"itemData.imgUrl||'https://dummyimage.com/600x300.png&amp;text=click%20mea'\" alt=\"\" _v-5a653ff4=\"\">\n  </div>\n  <div v-if=\"environment=='show'\" style=\"position: relative\" _v-5a653ff4=\"\">\n    <a v-if=\"itemData.link&amp;&amp;itemData.link.length\" :href=\"itemData.link\" _v-5a653ff4=\"\">\n      <img :src=\"itemData.imgUrl||'https://dummyimage.com/600x300.png&amp;text=click%20mea'\" alt=\"\" _v-5a653ff4=\"\">\n    </a>\n    <img style=\"position: relative;left: 0;top: 0;\" v-else=\"\" :src=\"itemData.imgUrl||'https://dummyimage.com/600x300.png&amp;text=click%20mea'\" alt=\"\" _v-5a653ff4=\"\">\n  </div>\n</div>\n";

/***/ },

/***/ 1564:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1565)
	__webpack_require__(1567)
	__vue_script__ = __webpack_require__(1569)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_10.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1578)
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
	  var id = "_v-1b838e28/item_10.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1565:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1566);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1b838e28&scoped=true!./goods.css", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1b838e28&scoped=true!./goods.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1566:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".goods_group[_v-1b838e28]{\n  overflow: hidden;\n  background-color: #f1f1f1;\n  padding: 5px;\n}\n.goods_group .goods_item[_v-1b838e28]{\n  width: 50%;\n  float: left;\n  padding: 5px;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 0;\n  overflow: hidden;\n}\n.goods_img[_v-1b838e28]{\n  position: relative;\n  background-color: #f1f1f1;\n}\n.goods_item>a[_v-1b838e28]{\n  background-color: #fff;\n  display:block;\n  padding-bottom: 10px;\n  overflow: hidden;\n}\n.goods_name[_v-1b838e28]{\n  font-size: 12px;\n  line-height: 18px;\n  color: #333;\n  overflow: hidden;\n  height: 36px;\n  margin: 5px 10px;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  display: -webkit-box;\n}\n.goods_price[_v-1b838e28]{\n  color: #FF4A7D;\n  font-size: 16px;\n  padding: 0 8px;\n  width: 200%;\n}\n.goods_label[_v-1b838e28]{\n  border-radius: 8px;\n  height: 16px;\n  line-height: 16px;\n  color: #fff;\n  padding: 0 5px;\n  background-color: #FF4A7D;\n  font-size: 10px;\n  display: inline-block;\n  margin-left: 4px;\n  font-family: sans-serif;\n}\n.img_label[_v-1b838e28]{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label[_v-1b838e28]:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n.vip_return[_v-1b838e28]{\n  line-height: 1;\n  font-size: 0;\n  color: #BF9D51;\n  padding-left: 4px;\n  position: relative;\n  display: inline-block;\n    -webkit-transform: scale(0.5);\n  -webkit-transform-origin: 0 60%;\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  -ms-transform-origin: 0 60%;\n      transform-origin: 0 60%;\n  vertical-align: middle;\n  margin-bottom: -4px;\n}\n.vip_return .vip_return_title[_v-1b838e28]{\n  font-size: 22px;\n}\n.vip_return .vip_return_f[_v-1b838e28]{\n  font-size: 18px;\n  padding: 0 2px 0 4px;\n}\n.vip_return .vip_return_price[_v-1b838e28]{\n  font-size: 24px;\n}\n.price[_v-1b838e28]{\n  vertical-align: sub;\n}\n @media screen and (max-width:374px){\n    .vip_return[_v-1b838e28]{\n      padding-left:0;\n      margin-bottom: -6px;\n    }\n    .vip_return .vip_return_title[_v-1b838e28]{\n      font-size: 20px;\n    }\n    .vip_return .vip_return_f[_v-1b838e28]{\n      font-size: 14px;\n      padding: 0 2px 0 4px;\n    }\n    .vip_return .vip_return_price[_v-1b838e28]{\n      font-size: 20px;\n    }\n    small[_v-1b838e28]{\n      font-size: 70%;\n    }\n }\nsmall[_v-1b838e28]{\n  padding: 0 2px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1567:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1568);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1b838e28&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_10.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1b838e28&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_10.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1568:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.goods_group_con[_v-1b838e28]{\n  background-color: #f1f1f1;\n}\n.goods_item[_v-1b838e28] {\n  font-size: 12px;\n  line-height: 16px;\n  background-color: #fff;\n  display:block;\n  margin-bottom: 10px;\n  padding: 0 10px;\n}\n.goods_item[_v-1b838e28]:nth-last-child(1){\n  margin-bottom: 0;\n}\n\n.goods_img[_v-1b838e28] {\n  width: 100%;\n  position:relative;\n}\n.goods_item img[_v-1b838e28]{\n  width: 100%;\n}\n\n.goods_title[_v-1b838e28] {\n  overflow: hidden;\n  color: #333;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  -o-text-overflow: ellipsis;\n  font-size: 14px;\n  line-height: 20px;\n  margin-top: 10px;\n}\n\n.market_price[_v-1b838e28] {\n  margin-left: 5px;\n  text-decoration: line-through;\n  color: #666;\n}\n\n.price[_v-1b838e28] {\n  color: #ff4a7d\n}\n\n.buy_btn[_v-1b838e28] {\n  float: right;\n  background-color: #FF4A7D;\n  color: #fff;\n  padding: 0 5px;\n  border-radius: 2px;\n}\n\n.img_label[_v-1b838e28]{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label[_v-1b838e28]:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\nsmall[_v-1b838e28]{\n  padding:0 1px;\n}\n\n.goods_price_outer[_v-1b838e28] {\n  margin-top: 10px;\n  font-size: 16px;\n  line-height: 16px;\n  padding-bottom: 10px;\n}\n\n", ""]);

	// exports


/***/ },

/***/ 1569:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _goodsItemHandler = __webpack_require__(1570);

	var _goodsItemHandler2 = _interopRequireDefault(_goodsItemHandler);

	var _index = __webpack_require__(1571);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: "item10",
	  data: function data() {
	    return {
	      previewData: null
	    };
	  },

	  watch: {
	    itemData: {
	      deep: true,
	      handler: function handler(val, oldVal) {
	        this.getData();
	      }
	    }
	  },
	  mounted: function mounted() {
	    var that = this;
	    this.initData();
	    this.getData();
	    that.$nextTick(function () {
	      that.$el.querySelectorAll(".goods_img").forEach(function (el, index, listObj) {
	        el.style.height = el.clientWidth + "px";
	      });
	    });
	  },

	  methods: {
	    getData: function getData() {
	      var that = this,
	          el = this.$el;
	      _goodsItemHandler2.default.handler(this.itemData, { limit: 2, el: el }).then(function (data) {
	        that.previewData = data.data;
	      });
	    },
	    initData: function initData() {
	      this.previewData = _goodsItemHandler2.default.init(this.itemData);
	    }
	  },
	  props: ['environment', "itemData"],
	  components: {
	    XImg: _index2.default
	  }
	};

/***/ },

/***/ 1570:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _webStorageCache = __webpack_require__(358);

	var _webStorageCache2 = _interopRequireDefault(_webStorageCache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var axios = __webpack_require__(282);
	__webpack_require__(308).polyfill();
	var __DEBUG = window.__DEBUG || location.href.indexOf("localhost") > -1;

	var topicCache = new _webStorageCache2.default({ storage: 'sessionStorage' });
	exports.default = {
	  init: function init(data) {
	    return data.goods.split(",").map(function (item) {
	      return { goods_id: item };
	    });
	  },
	  handler: function handler(data, _ref) {
	    var _ref$limit = _ref.limit,
	        limit = _ref$limit === undefined ? 4 : _ref$limit,
	        el = _ref.el;

	    return new Promise(function (resolve, reject) {
	      var goodsIds = data.goods;
	      var con = document.getElementById("vux_view_box_body");
	      if (goodsIds && goodsIds.length) {
	        var requestGoods = goodsIds.replace(/，/g, ",");
	        var cacheGoods = topicCache.get("topic_goods_" + requestGoods);
	        if (false) {
	          resolve(cacheGoods);
	        } else {
	          if (el) {
	            if (getPosition(el) < 100) {
	              getData();
	            } else {
	              con.addEventListener("scroll", function () {
	                if (getPosition(el) < 100) {
	                  getData();
	                }
	              });
	            }
	          }
	        }
	      }

	      function getData() {
	        if (data.finish) {
	          return;
	        }
	        data.finish = true;
	        var requestGoods = goodsIds.replace(/，/g, ",");
	        var url = "/index.php?m=default&c=topic&a=ajax_goods_by_ids";
	        if (__DEBUG) {
	          url = "/dvd/index.php?m=default&c=topic&a=ajax_goods_by_ids";
	        }
	        axios.request({
	          url: url,
	          method: 'post',
	          params: {
	            list: requestGoods,
	            table: "goods_id,goods_name,shop_price,goods_img,market_price,goods_brief"
	          }
	        }).then(function (res) {
	          var refer = res.data.referer,
	              str = "";
	          if (refer) {
	            str += "?";
	            for (var i in refer) {
	              str += i + "=" + refer[i] + "&";
	            }
	          }
	          if (refer && res.data.data) {
	            res.data.data.forEach(function (x) {
	              x.url = '/' + x.goods_id + ".html" + str;
	            });
	          }
	          if (res.data.data) {
	            res.data.data.forEach(function (x) {
	              var prices = (x.shop_price + "").split(".");
	              x.price = [prices[0]];
	              if (prices.length === 2) {
	                x.price[1] = '.' + prices[1];
	              } else {
	                x.price[1] = null;
	              }
	            });
	          }
	          resolve(res.data);
	          topicCache.set("topic_goods_" + requestGoods, res.data);
	        }).catch(function (err) {
	          reject(err);
	        });
	      }

	      function getPosition(el) {
	        if (con) {
	          return el.offsetTop - con.offsetHeight - con.scrollTop;
	        } else {
	          return 0;
	        }
	      }
	    });
	  }
	};

/***/ },

/***/ 1571:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1572)
	__vue_script__ = __webpack_require__(1574)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/x-img/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1577)
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
	  var id = "_v-04ff6efc/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1572:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1573);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1573:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.b-lazy {\n  -webkit-transition: opacity 500ms ease-in-out;\n  transition: opacity 500ms ease-in-out;\n  max-width: 100%;\n  opacity: 0;\n}\n\n.b-lazy.b-loaded {\n  opacity: 1;\n}\n", ""]);

	// exports


/***/ },

/***/ 1574:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vuxBlazy = __webpack_require__(1575);

	var _vuxBlazy2 = _interopRequireDefault(_vuxBlazy);

	var _webpSupport = __webpack_require__(1576);

	var _webpSupport2 = _interopRequireDefault(_webpSupport);

	var _mixin_uuid = __webpack_require__(1049);

	var _mixin_uuid2 = _interopRequireDefault(_mixin_uuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'x-img',
	  mixins: [_mixin_uuid2.default],
	  mounted: function mounted() {
	    var _this2 = this;

	    this.$nextTick(function () {
	      setTimeout(function () {
	        var _this = _this2;
	        var id = 'vux-ximg-' + _this2.uuid;
	        _this2.$el.setAttribute('id', id);
	        // this.$el.setAttribute('data-src', this.src)
	        _this2.blazy = new _vuxBlazy2.default({
	          scroller: _this2.scroller,
	          container: _this2.container,
	          selector: '#' + id,
	          offset: _this.offset,
	          errorClass: _this.errorClass,
	          successClass: _this.successClass,
	          success: function success(ele) {
	            _this.$emit('on-success', _this.src, ele);
	          },
	          error: function error(ele, msg) {
	            _this.$emit('on-error', _this.src, ele, msg);
	          }
	        });
	      }, _this2.delay);
	    });
	  },

	  computed: {
	    currentSrc: function currentSrc() {
	      if ((0, _webpSupport2.default)() && this.webpSrc) {
	        return this.webpSrc;
	      }
	      return this.src;
	    }
	  },
	  props: {
	    src: String,
	    webpSrc: String,
	    defaultSrc: {
	      type: String,
	      default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
	    },
	    errorClass: String,
	    successClass: String,
	    offset: {
	      type: Number,
	      defaut: 100
	    },
	    scroller: Object,
	    container: String,
	    delay: {
	      type: Number,
	      default: 100
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.blazy && this.blazy.destroy();
	  }
	};
	// </script>
	//
	// <style>
	// .b-lazy {
	//   transition: opacity 500ms ease-in-out;
	//   max-width: 100%;
	//   opacity: 0;
	// }
	//
	// .b-lazy.b-loaded {
	//   opacity: 1;
	// }
	// </style>
	// <template>
	//   <img :src="defaultSrc" :data-src="currentSrc" class="vux-x-img"/>
	// </template>
	//
	// <script>

/***/ },

/***/ 1575:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  hey, [be]Lazy.js - v1.6.2 - 2016.05.09
	  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
	  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
	*/
	;
	(function(root, blazy) {
	    if (true) {
	        // AMD. Register bLazy as an anonymous module
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (blazy), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        module.exports = blazy();
	    } else {
	        // Browser globals. Register bLazy on window
	        root.Blazy = blazy();
	    }
	})(this, function() {
	    'use strict';

	    //private vars
	    var _source, _viewport, _isRetina, _attrSrc = 'src',
	        _attrSrcset = 'srcset';

	    // constructor
	    return function Blazy(options) {
	        //IE7- fallback for missing querySelectorAll support
	        if (!document.querySelectorAll) {
	            var s = document.createStyleSheet();
	            document.querySelectorAll = function(r, c, i, j, a) {
	                a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
	                for (i = r.length; i--;) {
	                    s.addRule(r[i], 'k:v');
	                    for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
	                    s.removeRule(0);
	                }
	                return c;
	            };
	        }

	        //options and helper vars
	        var scope = this;
	        var util = scope._util = {};
	        util.elements = [];
	        util.destroyed = true;
	        scope.options = options || {};
	        scope.options.error = scope.options.error || false;
	        scope.options.offset = scope.options.offset || 100;
	        scope.options.success = scope.options.success || false;
	        scope.options.selector = scope.options.selector || '.b-lazy';
	        scope.options.separator = scope.options.separator || '|';
	        scope.options.container = scope.options.container ? document.querySelectorAll(scope.options.container) : false;
	        scope.options.errorClass = scope.options.errorClass || 'b-error';
	        scope.options.breakpoints = scope.options.breakpoints || false; // obsolete
	        scope.options.loadInvisible = scope.options.loadInvisible || false;
	        scope.options.successClass = scope.options.successClass || 'b-loaded';
	        scope.options.validateDelay = scope.options.validateDelay || 25;
	        scope.options.saveViewportOffsetDelay = scope.options.saveViewportOffsetDelay || 50;
	        scope.options.srcset = scope.options.srcset || 'data-srcset';
	        scope.options.src = _source = scope.options.src || 'data-src';
	        _isRetina = window.devicePixelRatio > 1;
	        _viewport = {};
	        _viewport.top = 0 - scope.options.offset;
	        _viewport.left = 0 - scope.options.offset;


	        /* public functions
	         ************************************/
	        scope.revalidate = function() {
	            initialize(this);
	        };
	        scope.load = function(elements, force) {
	            var opt = this.options;
	            if (elements.length === undefined) {
	                loadElement(elements, force, opt);
	            } else {
	                each(elements, function(element) {
	                    loadElement(element, force, opt);
	                });
	            }
	        };
	        scope.destroy = function() {
	            var self = this;
	            var util = self._util;
	            if (self.options.container) {
	                each(self.options.container, function(object) {
	                    unbindEvent(object, 'scroll', util.validateT);
	                });
	            }
	            unbindEvent(window, 'scroll', util.validateT);
	            unbindEvent(window, 'resize', util.validateT);
	            unbindEvent(window, 'resize', util.saveViewportOffsetT);

	            // destroy handler for scroller
	            if (self.scroller) {
	                self.scroller._xscroll && self.scroller._xscroll.off("scroll scrollend afterrender", util.validateT, self.scroller._xscroll);
	            }

	            util.count = 0;
	            util.elements.length = 0;
	            util.destroyed = true;
	        };

	        //throttle, ensures that we don't call the functions too often
	        util.validateT = throttle(function() {
	            validate(scope);
	        }, scope.options.validateDelay, scope);
	        util.saveViewportOffsetT = throttle(function() {
	            saveViewportOffset(scope.options.offset);
	        }, scope.options.saveViewportOffsetDelay, scope);
	        saveViewportOffset(scope.options.offset);

	        //handle multi-served image src (obsolete)
	        each(scope.options.breakpoints, function(object) {
	            if (object.width >= window.screen.width) {
	                _source = object.src;
	                return false;
	            }
	        });

	        // start lazy load
	        setTimeout(function() {
	            initialize(scope);
	        }); // "dom ready" fix

	    };


	    /* Private helper functions
	     ************************************/
	    function initialize(self) {
	        var util = self._util;
	        // First we create an array of elements to lazy load
	        util.elements = toArray(self.options.selector);
	        util.count = util.elements.length;
	        // Then we bind resize and scroll events if not already binded
	        if (util.destroyed) {
	            util.destroyed = false;
	            if (self.options.container) {
	                each(self.options.container, function(object) {
	                    bindEvent(object, 'scroll', util.validateT);
	                });
	            }
	            bindEvent(window, 'resize', util.saveViewportOffsetT);
	            bindEvent(window, 'resize', util.validateT);
	            bindEvent(window, 'scroll', util.validateT);

	            // scroll handler for scroller
	            if (self.options.scroller) {
	                var scroller = self.options.scroller._xscroll
	                var eventType = scroller.userConfig.useOriginScroll ? "scroll" : "scrollend";
	                scroller.on("afterrender", util.validateT, self);
	                scroller.on(eventType, util.validateT, self);
	            }
	        }
	        // And finally, we start to lazy load.
	        validate(self);
	    }

	    function validate(self) {
	        var util = self._util;
	        for (var i = 0; i < util.count; i++) {
	            var element = util.elements[i];
	            if (elementInView(element) || hasClass(element, self.options.successClass)) {
	                self.load(element);
	                util.elements.splice(i, 1);
	                util.count--;
	                i--;
	            }
	        }
	        if (util.count === 0) {
	            self.destroy();
	        }
	    }

	    function elementInView(ele) {
	        var rect = ele.getBoundingClientRect();
	        return (
	            // Intersection
	            rect.right >= _viewport.left && rect.bottom >= _viewport.top && rect.left <= _viewport.right && rect.top <= _viewport.bottom
	        );
	    }

	    function loadElement(ele, force, options) {
	        // if element is visible, not loaded or forced
	        if (!hasClass(ele, options.successClass) && (force || options.loadInvisible || (ele.offsetWidth > 0 && ele.offsetHeight > 0))) {
	            var dataSrc = ele.getAttribute(_source) || ele.getAttribute(options.src); // fallback to default 'data-src'
	            if (dataSrc) {
	                var dataSrcSplitted = dataSrc.split(options.separator);
	                var src = dataSrcSplitted[_isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
	                var isImage = equal(ele, 'img');
	                // Image or background image
	                if (isImage || ele.src === undefined) {
	                    var img = new Image();
	                    // using EventListener instead of onerror and onload
	                    // due to bug introduced in chrome v50 
	                    // (https://productforums.google.com/forum/#!topic/chrome/p51Lk7vnP2o)
	                    var onErrorHandler = function() {
	                        if (options.error) options.error(ele, "invalid");
	                        addClass(ele, options.errorClass);
	                        unbindEvent(img, 'error', onErrorHandler);
	                        unbindEvent(img, 'load', onLoadHandler);
	                    };
	                    var onLoadHandler = function() {
	                        // Is element an image
	                        if (isImage) {
	                            setSrc(ele, src); //src
	                            handleSource(ele, _attrSrcset, options.srcset); //srcset
	                            //picture element
	                            var parent = ele.parentNode;
	                            if (parent && equal(parent, 'picture')) {
	                                each(parent.getElementsByTagName('source'), function(source) {
	                                    handleSource(source, _attrSrcset, options.srcset);
	                                });
	                            }
	                            if (options.scroller) {
	                                options.scroller.reset()
	                            }
	                        // or background-image
	                        } else {
	                            ele.style.backgroundImage = 'url("' + src + '")';
	                        }
	                        itemLoaded(ele, options);
	                        unbindEvent(img, 'load', onLoadHandler);
	                        unbindEvent(img, 'error', onErrorHandler);
	                    };
	                    bindEvent(img, 'error', onErrorHandler);
	                    bindEvent(img, 'load', onLoadHandler);
	                    setSrc(img, src); //preload
	                } else { // An item with src like iframe, unity, simpelvideo etc
	                    setSrc(ele, src);
	                    itemLoaded(ele, options);
	                }
	            } else {
	                // video with child source
	                if (equal(ele, 'video')) {
	                    each(ele.getElementsByTagName('source'), function(source) {
	                        handleSource(source, _attrSrc, options.src);
	                    });
	                    ele.load();
	                    itemLoaded(ele, options);
	                } else {
	                    if (options.error) options.error(ele, "missing");
	                    addClass(ele, options.errorClass);
	                }
	            }
	        }
	    }

	    function itemLoaded(ele, options) {
	        addClass(ele, options.successClass);
	        if (options.success) options.success(ele);
	        // cleanup markup, remove data source attributes
	        ele.removeAttribute(options.src);
	        each(options.breakpoints, function(object) {
	            ele.removeAttribute(object.src);
	        });
	    }

	    function setSrc(ele, src) {
	        ele[_attrSrc] = src;
	    }

	    function handleSource(ele, attr, dataAttr) {
	        var dataSrc = ele.getAttribute(dataAttr);
	        if (dataSrc) {
	            ele[attr] = dataSrc;
	            ele.removeAttribute(dataAttr);
	        }
	    }

	    function equal(ele, str) {
	        return ele.nodeName.toLowerCase() === str;
	    }

	    function hasClass(ele, className) {
	        return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;
	    }

	    function addClass(ele, className) {
	        if (!hasClass(ele, className)) {
	            ele.className += ' ' + className;
	        }
	    }

	    function toArray(selector) {
	        var array = [];
	        var nodelist = document.querySelectorAll(selector);
	        for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}
	        return array;
	    }

	    function saveViewportOffset(offset) {
	        _viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;
	        _viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;
	    }

	    function bindEvent(ele, type, fn) {
	        if (ele.attachEvent) {
	            ele.attachEvent && ele.attachEvent('on' + type, fn);
	        } else {
	            ele.addEventListener(type, fn, false);
	        }
	    }

	    function unbindEvent(ele, type, fn) {
	        if (ele.detachEvent) {
	            ele.detachEvent && ele.detachEvent('on' + type, fn);
	        } else {
	            ele.removeEventListener(type, fn, false);
	        }
	    }

	    function each(object, fn) {
	        if (object && fn) {
	            var l = object.length;
	            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
	        }
	    }

	    function throttle(fn, minDelay, scope) {
	        var lastCall = 0;
	        return function() {
	            var now = +new Date();
	            if (now - lastCall < minDelay) {
	                return;
	            }
	            lastCall = now;
	            fn.apply(scope, arguments);
	        };
	    }
	});

/***/ },

/***/ 1576:
/***/ function(module, exports) {

	var webp_name = 'can_use_webp';
	function detectWebp() {
	  if (!window.localStorage || typeof localStorage !== 'object') return;
	  if (!localStorage.getItem(webp_name) || (localStorage.getItem(webp_name) !==
	      'available' && localStorage.getItem(webp_name) !== 'disable')) {
	    var img = document.createElement('img');
	    img.onload = function() {
	      try {
	        localStorage.setItem(webp_name, 'available');
	      } catch (ex) {}
	    };

	    img.onerror = function() {
	      try {
	        localStorage.setItem(webp_name, 'disable');
	      } catch (ex) {}
	    };
	    img.src =
	      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
	  }
	}

	detectWebp();

	module.exports = function() {
	  return !!window.localStorage && window.localStorage.getItem(webp_name) === 'available';
	};


/***/ },

/***/ 1577:
/***/ function(module, exports) {

	module.exports = "\n<img :src=\"defaultSrc\" :data-src=\"currentSrc\" class=\"vux-x-img\"/>\n";

/***/ },

/***/ 1578:
/***/ function(module, exports) {

	module.exports = "\n<div _v-1b838e28=\"\">\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-1b838e28=\"\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img11.jpg\" alt=\"\" _v-1b838e28=\"\">\n  </div>\n\n  <div v-if=\"environment=='preview'\" class=\"goods_group_con\" _v-1b838e28=\"\">\n    <div v-for=\"(item, index) in previewData\" :key=\"index\" class=\"goods_item\" _v-1b838e28=\"\">\n      <img class=\"goods_img\" :src=\"item.goods_img\" _v-1b838e28=\"\">\n      <div class=\"goods_title\" v-text=\"item.goods_name\" _v-1b838e28=\"\"></div>\n      <div class=\"goods_price_outer\" _v-1b838e28=\"\">\n        <!--<span class=\"price\" v-text=\"`¥${item.shop_price}`\"></span>-->\n        <span class=\"price\" v-text=\"'¥'+item.shop_price\" _v-1b838e28=\"\"></span>\n        <span class=\"market_price\" v-text=\"'¥'+item.market_price\" _v-1b838e28=\"\"></span>\n        <span class=\"buy_btn\" _v-1b838e28=\"\">立即购买</span>\n      </div>\n    </div>\n  </div>\n\n  <div v-if=\"environment=='show'\" class=\"goods_group_con\" _v-1b838e28=\"\">\n    <a :href=\"item.url\" v-for=\"(item, index) in previewData\" :key=\"index\" class=\"goods_item\" _v-1b838e28=\"\">\n      <div class=\"goods_img\" _v-1b838e28=\"\">\n        <!--<x-img v-if=\"index>3\" :src=\"item.goods_img\" default-src=\"http://pic.davdian.com/free/2017/06/08/160_160_4d0f1e2009fdfd8bb0c430cda8e22a82.png\" container=\"#vux_view_box_body\"></x-img>-->\n        <!--<img v-else  :src=\"item.goods_img\">-->\n        <img :src=\"item.goods_img\" _v-1b838e28=\"\">\n        <span class=\"img_label\" v-if=\"item.goods_label&amp;&amp;item.goods_label.length\" v-text=\"item.goods_label\" _v-1b838e28=\"\"></span>\n      </div>\n      <div class=\"goods_title\" v-text=\"item.goods_name\" _v-1b838e28=\"\"></div>\n      <div class=\"goods_price_outer\" _v-1b838e28=\"\">\n        <span v-if=\"item.price\" class=\"price\" _v-1b838e28=\"\">\n          <small _v-1b838e28=\"\">¥</small>{{item.price[0]}}<small _v-1b838e28=\"\">{{item.price[1]}}</small>\n        </span>\n        <span class=\"vip_return\" v-if=\"item.seller_income &amp;&amp; item.seller_income != '0'\" _v-1b838e28=\"\">\n          <span class=\"vip_return_title\" _v-1b838e28=\"\">会员返</span>\n          <span class=\"vip_return_f\" _v-1b838e28=\"\">¥</span>\n          <span class=\"vip_return_price\" _v-1b838e28=\"\">{{item.seller_income}}</span>\n        </span>\n      </div>\n    </a>\n  </div>\n\n</div>\n";

/***/ },

/***/ 1579:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1580)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_11.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1581)
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
	  var id = "_v-1b675f26/item_11.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1580:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img12.jpg" alt="">
	//       </div>
	//
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment']
	    // </script>

	};

/***/ },

/***/ 1581:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img12.jpg\" alt=\"\">\n  </div>\n\n</div>\n";

/***/ },

/***/ 1582:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1583)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_12.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1584)
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
	  var id = "_v-1b4b3024/item_12.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1583:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img13.jpg" alt="">
	//       </div>
	//       <!--<div class="video_container" v-if="environment==`preview`">-->
	//       <div class="video_container" v-if="environment=='preview'">
	//         <!--<img v-if="!itemData.con||itemData.con==``" src="https://dummyimage.com/600x300.png&text=click%20me%20to%20input" alt="">-->
	//         <img v-if="!itemData.con||itemData.con==''" src="https://dummyimage.com/600x300.png&text=click%20me%20to%20input" alt="">
	//         <div v-html="itemData.con" v-else></div>
	//       </div>
	//
	//       <!--<div v-if="environment==`show`&&itemData.con&&itemData.con.length">-->
	//       <div v-if="environment=='show'&&itemData.con&&itemData.con.length">
	//         <div v-html="itemData.con"></div>
	//       </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment', 'itemData']
	    // </script>

	};

/***/ },

/***/ 1584:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img13.jpg\" alt=\"\">\n  </div>\n  <!--<div class=\"video_container\" v-if=\"environment==`preview`\">-->\n  <div class=\"video_container\" v-if=\"environment=='preview'\">\n    <!--<img v-if=\"!itemData.con||itemData.con==``\" src=\"https://dummyimage.com/600x300.png&text=click%20me%20to%20input\" alt=\"\">-->\n    <img v-if=\"!itemData.con||itemData.con==''\" src=\"https://dummyimage.com/600x300.png&text=click%20me%20to%20input\" alt=\"\">\n    <div v-html=\"itemData.con\" v-else></div>\n  </div>\n\n  <!--<div v-if=\"environment==`show`&&itemData.con&&itemData.con.length\">-->\n  <div v-if=\"environment=='show'&&itemData.con&&itemData.con.length\">\n    <div v-html=\"itemData.con\"></div>\n  </div>\n</div>\n";

/***/ },

/***/ 1585:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1586)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_13.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1587)
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
	  var id = "_v-1b2f0122/item_13.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1586:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img13.jpg" alt="">
	//       </div>
	//
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment']
	    // </script>

	};

/***/ },

/***/ 1587:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img13.jpg\" alt=\"\">\n  </div>\n\n</div>\n";

/***/ },

/***/ 1588:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1589)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_14.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1590)
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
	  var id = "_v-1b12d220/item_14.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1589:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img14.jpg" alt="">
	//       </div>
	//
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment']
	    // </script>

	};

/***/ },

/***/ 1590:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img14.jpg\" alt=\"\">\n  </div>\n\n</div>\n";

/***/ },

/***/ 1591:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1592)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_15.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1593)
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
	  var id = "_v-1af6a31e/item_15.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1592:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img15.jpg" alt="">
	//       </div>
	//
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment']
	    // </script>

	};

/***/ },

/***/ 1593:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img15.jpg\" alt=\"\">\n  </div>\n\n</div>\n";

/***/ },

/***/ 1594:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1595)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_16.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1596)
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
	  var id = "_v-1ada741c/item_16.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1595:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img16.jpg" alt="">
	//       </div>
	//
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment']
	    // </script>

	};

/***/ },

/***/ 1596:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img16.jpg\" alt=\"\">\n  </div>\n\n</div>\n";

/***/ },

/***/ 1597:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1598)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_17.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1599)
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
	  var id = "_v-1abe451a/item_17.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1598:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img17.jpg" alt="">
	//       </div>
	//
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment']
	    // </script>

	};

/***/ },

/***/ 1599:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img17.jpg\" alt=\"\">\n  </div>\n\n</div>\n";

/***/ },

/***/ 1600:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1601)
	__vue_script__ = __webpack_require__(1603)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_18.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1604)
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
	  var id = "_v-1aa21618/item_18.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1601:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1602);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1aa21618&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_18.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1aa21618&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_18.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1602:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.goods_group .goods_item[_v-1aa21618]{\n  width: 33.3%;\n}\n.goods_name[_v-1aa21618]{\n  line-height:16px;\n  height:32px;\n}\n.goods_price[_v-1aa21618]{\n  width: inherit;\n  text-align: center;\n}\n.vip_return[_v-1aa21618]{\n  width: 200%;\n  text-align: center;\n  height: 12px;\n  padding-bottom: 10px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1603:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(1571);

	var _index2 = _interopRequireDefault(_index);

	var _comMaybeyoulike = __webpack_require__(150);

	var _comMaybeyoulike2 = _interopRequireDefault(_comMaybeyoulike);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    return {
	      previewData: null
	    };
	  },

	  watch: {},
	  mounted: function mounted() {
	    var that = this;
	    that.$nextTick(function () {
	      that.$el.querySelectorAll(".goods_img").forEach(function (el, index, listObj) {
	        el.style.height = el.clientWidth + "px";
	      });
	    });
	  },

	  methods: {},
	  props: ['environment', "itemData"],
	  components: {
	    XImg: _index2.default,
	    category: _comMaybeyoulike2.default
	  }
	};

/***/ },

/***/ 1604:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div _v-1aa21618=\"\">\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-1aa21618=\"\">\n    <img src=\"http://pic.davdian.com/free/2017/01/16/750_840_9e87809a2caf26a824c9306d3a7c6efd.png\" alt=\"\" _v-1aa21618=\"\">\n  </div>\n  <div v-if=\"environment=='preview'\" class=\"goods_group\" _v-1aa21618=\"\">\n    <div v-for=\"(item, index) in previewData\" :key=\"index\" class=\"goods_item\" _v-1aa21618=\"\">\n      <div class=\"goods_img\" _v-1aa21618=\"\">\n        <img :src=\"item.goods_img\" :alt=\"item.goods_name\" _v-1aa21618=\"\">\n        <span class=\"img_label\" v-if=\"item.goods_label&amp;&amp;item.goods_label.length\" v-text=\"item.goods_label\" _v-1aa21618=\"\"></span>\n      </div>\n      <div v-text=\"item.goods_name\" class=\"goods_name\" _v-1aa21618=\"\"></div>\n      <div class=\"goods_price\" _v-1aa21618=\"\"><small _v-1aa21618=\"\">¥</small>{{item.price[0]}}<small _v-1aa21618=\"\">{{item.price[1]}}</small></div>\n      <span class=\"vip_return\" v-if=\"item.seller_income &amp;&amp; item.seller_income != '0'\" _v-1aa21618=\"\">\n            <span class=\"vip_return_title\" _v-1aa21618=\"\">会员返</span>\n            <span class=\"vip_return_f\" _v-1aa21618=\"\">¥</span>\n            <span class=\"vip_return_price\" _v-1aa21618=\"\">{{item.seller_income}}</span>\n          </span>\n    </div>\n  </div>\n  <div v-if=\"environment=='show'\" class=\"goods_group\" _v-1aa21618=\"\">\n    <category :list=\"itemData.previewData\" :column=\"3 \" _v-1aa21618=\"\"></category>\n  </div>\n</div>\n";

/***/ },

/***/ 1605:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1606)
	__webpack_require__(1608)
	__vue_script__ = __webpack_require__(1610)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_19.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1617)
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
	  var id = "_v-1a85e716/item_19.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1606:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1607);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_19.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_19.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1607:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nhtml, body {\n  height: 100%;\n}\n\nbody {\n  overflow: scroll;\n}\n", ""]);

	// exports


/***/ },

/***/ 1608:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1609);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1a85e716&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./item_19.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1a85e716&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./item_19.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1609:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.navigation_menu[_v-1a85e716] {\n  background: #eee;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-flow: row;\n     -moz-box-orient: horizontal;\n     -moz-box-direction: normal;\n      -ms-flex-flow: row;\n          flex-flow: row;\n  width: 100%;\n  font-size: 14px;\n  line-height: 40px;\n  /*border-top:1px solid #f1f1f1;*/\n  top: 0;\n  z-index: 3;\n  margin-top: 0;\n  overflow: hidden;\n}\n\n.navigation_menu ul[_v-1a85e716] {\n  background: #fff;\n}\n\n.navigation_menu li[_v-1a85e716] {\n  flex: 1;\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  color: #333;\n  text-align: center;\n  cursor: pointer;\n  min-width: 25%;\n}\n\n.navigation_menu li.hover[_v-1a85e716] {\n  color: #FF4A7D\n}\n\n.navigation_menu li.hover span[_v-1a85e716] {\n  color: #FF4A7D;\n  display: inline-block;\n  height: 40px;\n  border-bottom: 2px solid #FF4A7D;\n}\n\n", ""]);

	// exports


/***/ },

/***/ 1610:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tab = __webpack_require__(934);

	var _tab2 = _interopRequireDefault(_tab);

	var _tabItem = __webpack_require__(940);

	var _tabItem2 = _interopRequireDefault(_tabItem);

	var _index = __webpack_require__(1611);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(1073);

	var _index4 = _interopRequireDefault(_index3);

	var _bus = __webpack_require__(1556);

	var _bus2 = _interopRequireDefault(_bus);

	var _ua = __webpack_require__(155);

	var _ua2 = _interopRequireDefault(_ua);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    return {
	      selectedName: null,
	      offsetTop: _ua2.default.isDvdApp() ? 0 : 44
	    };
	  },

	  props: ['environment', "itemData"],
	  components: {
	    Sticky: _index2.default,
	    Scroller: _index4.default,
	    Tab: _tab2.default,
	    TabItem: _tabItem2.default
	  },
	  mounted: function mounted() {
	    var that = this;
	    this.$nextTick(function () {
	      that.init();
	    });
	  },

	  methods: {
	    init: function init() {
	      var scrollBox = document.getElementById('vux_view_box_body'),
	          that = this;
	      scrollBox.addEventListener("scroll", function () {
	        var targetName = void 0;
	        $(".feed_item").each(function (index) {
	          var item = $(this);
	          var name = item.attr("name");
	          if (name.indexOf("no_anchor") === -1) {
	            var distance = item.offset().top;
	            var minDistance = that.offsetTop + 45;
	            if (distance < minDistance) {
	              targetName = name;
	            }
	          }
	          if (targetName) {
	            that.selectedName = targetName;
	          }
	        });
	      });
	    },
	    itemClickHandle: function itemClickHandle(index) {
	      var that = this;
	      var clickAnchor = encodeURI(this.itemData.tab[index]).toString().replace(/%/g, "");
	      var toTarget = $('[name=' + clickAnchor + ']').get(0);
	      if (toTarget) {
	        var toTop = toTarget.offsetTop - (that.offsetTop + 44);
	        _bus2.default.$emit('scroll', toTop);
	      }
	    }
	  }
	};

/***/ },

/***/ 1611:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1612)
	__vue_script__ = __webpack_require__(1614)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/sticky/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1616)
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
	  var id = "_v-76254fb1/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1612:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1613);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1613:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.vux-sticky-box {\n  z-index: 500;\n}\n.vux-sticky {\n  width: 100%;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n}\n.vux-fixed {\n  width: 100%;\n  position: fixed;\n  top: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 1614:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _sticky = __webpack_require__(1615);

	var _sticky2 = _interopRequireDefault(_sticky);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'sticky',
	  mounted: function mounted() {
	    var _this = this;

	    this.$nextTick(function () {
	      (0, _sticky2.default)(_this.$el, {
	        scrollBox: _this.scrollBox,
	        offset: _this.offset,
	        checkStickySupport: typeof _this.checkStickySupport === 'undefined' ? true : _this.checkStickySupport
	      });
	    });
	  },

	  props: ['scrollBox', 'offset', 'checkStickySupport']
	  // </script>
	  //
	  // <style lang="less">
	  // @import '../../styles/variable.less';
	  //
	  // .vux-sticky-box {
	  //   z-index: @sticky-zindex;
	  // }
	  // .vux-sticky {
	  //   width: 100%;
	  //   position: sticky;
	  //   top: 0;
	  // }
	  // .vux-fixed {
	  //   width: 100%;
	  //   position: fixed;
	  //   top: 0;
	  // }
	  // </style>

	}; // <template>
	//   <div class="vux-sticky-box">
	//     <slot></slot>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 1615:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (nav) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var scrollBox = options.scrollBox || window;
	  var offset = options.offset || 0;
	  var checkStickySupport = options.checkStickySupport === true || false;
	  if (typeof scrollBox === 'string') {
	    scrollBox = document.getElementById(scrollBox);
	  }

	  var navOffsetY = nav.offsetTop - offset;

	  var getTop = function getTop() {
	    if (scrollBox === window) {
	      return document.documentElement.scrollTop;
	    } else {
	      return scrollBox.scrollTop;
	    }
	  };

	  var scrollHandler = function scrollHandler() {
	    var distance = getTop();
	    if (distance >= navOffsetY) {
	      nav.style.top = offset + 'px';
	      nav.classList.add('vux-fixed');
	    } else {
	      nav.classList.remove('vux-fixed');
	    }
	  };

	  if (checkStickySupport && (gtIOS6() || isSupportSticky())) {
	    // 大于等于iOS6版本使用sticky
	    nav.classList.add('vux-sticky');
	  } else {
	    setTimeout(function () {
	      navOffsetY = nav.offsetTop - offset;
	      scrollBox.addEventListener('scroll', scrollHandler);
	    }, 1000);
	  }
	};

	// http://efe.baidu.com/blog/position-sticky/

	// 检测iOS版本大于等于6
	function gtIOS6() {
	  var userAgent = window.navigator.userAgent;
	  var ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_.]+)/);
	  return ios && ios[2] && parseInt(ios[2].replace(/_/g, '.'), 10) >= 6;
	}

	// 判断是否支持sticky属性
	function isSupportSticky() {
	  var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
	  var stickyText = '';
	  for (var i = 0; i < prefixTestList.length; i++) {
	    stickyText += 'position:' + prefixTestList[i] + 'sticky';
	  }
	  // 创建一个dom来检查
	  var div = document.createElement('div');
	  var body = document.body;
	  div.style.cssText = 'display:none' + stickyText;
	  body.appendChild(div);
	  var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
	  body.removeChild(div);
	  div = null;
	  return isSupport;
	}

/***/ },

/***/ 1616:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-sticky-box\">\n  <slot></slot>\n</div>\n";

/***/ },

/***/ 1617:
/***/ function(module, exports) {

	module.exports = "\n<div _v-1a85e716=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-1a85e716=\"\">\n    <img src=\"http://pic.davdian.com/free/2017/01/16/750_164_29b5a5aaec2047c94c9154f3908bfdfc.png\" alt=\"\" _v-1a85e716=\"\">\n  </div>\n  <div v-if=\"environment=='preview'\" class=\"navigation_container\" _v-1a85e716=\"\">\n    <ul class=\"navigation_menu\" v-if=\"itemData.tab&amp;&amp;itemData.tab.length\" _v-1a85e716=\"\">\n      <li v-for=\"(value,index) in itemData.tab\" :key=\"index\" _v-1a85e716=\"\">\n        <span v-text=\"value\" _v-1a85e716=\"\"></span>\n      </li>\n    </ul>\n    <div v-else=\"\" _v-1a85e716=\"\">导航位置</div>\n  </div>\n\n  <div v-if=\"environment=='show'\" style=\"height:44px;max-width: 640px;\" _v-1a85e716=\"\">\n    <sticky scroll-box=\"vux_view_box_body\" :offset=\"offsetTop\" :check-sticky-support=\"false\" _v-1a85e716=\"\">\n      <tab :line-width=\"1\" active-color=\"#ff4a7d\" style=\"max-width: 640px\" _v-1a85e716=\"\">\n        <tab-item @on-item-click=\"itemClickHandle\" :selected=\" encodeURI(value).toString().replace(/%/g, '') === selectedName\" v-for=\"(value,index) in itemData.tab\" :key=\"index\" v-text=\"value\" _v-1a85e716=\"\">\n          正在\n        </tab-item>\n      </tab>\n    </sticky>\n  </div>\n</div>\n";

/***/ },

/***/ 1618:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1619)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_2.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1620)
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
	  var id = "_v-5a735775/item_2.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1619:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _comMaybeyoulike = __webpack_require__(150);

	var _comMaybeyoulike2 = _interopRequireDefault(_comMaybeyoulike);

	var _index = __webpack_require__(1571);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: "item2",
	  data: function data() {
	    return {};
	  },

	  props: ['environment', "itemData"],
	  watch: {
	    itemData: {
	      deep: true,
	      handler: function handler(val, oldVal) {
	        debugger;
	        console.log(val);
	        var that = this;
	        this.$nextTick(function () {
	          that.$el.querySelectorAll(".goods_img").forEach(function (el) {
	            el.style.height = el.offsetWidth + "px";
	          });
	        });
	      }
	    }
	  },
	  mounted: function mounted() {},

	  methods: {
	    success: function success(src, ele) {
	      console.log('success load', src, ele);
	    },
	    error: function error(src, ele, msg) {}
	  },
	  components: {
	    XImg: _index2.default,
	    category: _comMaybeyoulike2.default
	  }
	};

/***/ },

/***/ 1620:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div>\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_image_2.jpg\" alt=\"\">\n  </div>\n\n  <div v-if=\"environment=='preview'\" class=\"goods_group\">\n    <div  v-for=\"(item, index) in itemData.previewData\" :key=\"index\" class=\"goods_item\">\n      <div class=\"goods_img\">\n        <img :src=\"item.goods_img\" :alt=\"item.goods_name\" >\n        <span class=\"img_label\" v-if=\"item.goods_label&&item.goods_label.length\" v-text=\"item.goods_label\"></span>\n      </div>\n      <div v-text=\"item.goods_name\" class=\"goods_name\"></div>\n      <div class=\"goods_price\">\n        <span class=\"price\" ><small>¥</small>{{item.shop_price}}</span>\n        <span class=\"vip_return\" v-if = \"item.seller_income && item.seller_income != '0'\">\n            <span class=\"vip_return_title\">会员返</span>\n            <span class=\"vip_return_f\">¥</span>\n            <span class=\"vip_return_price\">{{item.seller_income}}</span>\n          </span>\n      </div>\n    </div>\n  </div>\n  <div v-if=\"environment=='show'\" class=\"goods_group\">\n    <category :list = \"itemData.previewData\"></category>\n  </div>\n</div>\n";

/***/ },

/***/ 1621:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1622)
	__vue_script__ = __webpack_require__(1625)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_20.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1628)
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
	  var id = "_v-1819dcea/item_20.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1622:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1623);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1819dcea&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_20.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1819dcea&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_20.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1623:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports
	exports.i(__webpack_require__(1624), "");

	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.titText[_v-1819dcea] {\n  background: #FFF9E3;\n  color: #F3A100;\n}\n", ""]);

	// exports


/***/ },

/***/ 1624:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".titText {\n  background: #F5FEFF;\n  height: 44px;\n  text-align: center;\n  font-size: 18px;\n  line-height: 44px;\n  color: #26B6F9;\n}\n.title_left{\n  margin-right: 20px;font-size: 14px\n}\n.title_right{\n  margin-left: 20px; font-size: 14px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1625:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(1626);

	exports.default = {
	  data: function data() {
	    return {};
	  },

	  props: ['environment', "itemData"]
	  // </script>

	}; // <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/2017/01/16/750_88_abe221dc815fe2c81c4bbc34ac9c7142.png" alt="">
	//       </div>
	//       <div v-if="environment=='preview'||environment=='show'">
	//         <div class="titText">
	//           <span class="title_left">//</span>
	//           <span v-text="itemData.navigationTitle"></span>
	//           <span class="title_right">//</span>
	//         </div>
	//       </div>
	//     </div>
	// </template>
	// <style scoped="">
	//   .titText {
	//     background: #FFF9E3;
	//     color: #F3A100;
	//   }
	//   @import "../title/title.css";
	// </style>
	// <script>

/***/ },

/***/ 1626:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1628:
/***/ function(module, exports) {

	module.exports = "\n<div _v-1819dcea=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-1819dcea=\"\">\n    <img src=\"http://pic.davdian.com/free/2017/01/16/750_88_abe221dc815fe2c81c4bbc34ac9c7142.png\" alt=\"\" _v-1819dcea=\"\">\n  </div>\n  <div v-if=\"environment=='preview'||environment=='show'\" _v-1819dcea=\"\">\n    <div class=\"titText\" _v-1819dcea=\"\">\n      <span class=\"title_left\" _v-1819dcea=\"\">//</span>\n      <span v-text=\"itemData.navigationTitle\" _v-1819dcea=\"\"></span>\n      <span class=\"title_right\" _v-1819dcea=\"\">//</span>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 1629:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1630)
	__vue_script__ = __webpack_require__(1632)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_21.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1633)
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
	  var id = "_v-17fdade8/item_21.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1630:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1631);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-17fdade8&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_21.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-17fdade8&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_21.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1631:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.titText[_v-17fdade8] {\n  background: #F5FEFF;\n  color: #26B6F9;\n}\n", ""]);

	// exports


/***/ },

/***/ 1632:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(1626);

	exports.default = {
	  data: function data() {
	    return {};
	  },

	  props: ['environment', "itemData"]
	  // </script>

	}; // <template>
	//   <div>
	//     <!--<div class="img_container" v-if="environment==`menu`">-->
	//     <div class="img_container" v-if="environment=='menu'">
	//       <img src="http://pic.davdian.com/free/2017/01/16/750_88_b7b867f88cbbe333120de933699abefe.png" alt="">
	//     </div>
	//     <div v-if="environment=='preview'||environment=='show'">
	//       <div class="titText">
	//         <span class="title_left">//</span>
	//         <span v-text="itemData.navigationTitle"></span>
	//         <span class="title_right">//</span>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style scoped="">
	//   .titText {
	//     background: #F5FEFF;
	//     color: #26B6F9;
	//   }
	// </style>
	// <script>

/***/ },

/***/ 1633:
/***/ function(module, exports) {

	module.exports = "\n<div _v-17fdade8=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-17fdade8=\"\">\n    <img src=\"http://pic.davdian.com/free/2017/01/16/750_88_b7b867f88cbbe333120de933699abefe.png\" alt=\"\" _v-17fdade8=\"\">\n  </div>\n  <div v-if=\"environment=='preview'||environment=='show'\" _v-17fdade8=\"\">\n    <div class=\"titText\" _v-17fdade8=\"\">\n      <span class=\"title_left\" _v-17fdade8=\"\">//</span>\n      <span v-text=\"itemData.navigationTitle\" _v-17fdade8=\"\"></span>\n      <span class=\"title_right\" _v-17fdade8=\"\">//</span>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 1634:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1635)
	__vue_script__ = __webpack_require__(1637)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_22.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1638)
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
	  var id = "_v-17e17ee6/item_22.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1635:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1636);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-17e17ee6&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_22.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-17e17ee6&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_22.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1636:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.titText[_v-17e17ee6] {\n  background: #FDF6FF;\n  color: #DA7AF2;\n}\n", ""]);

	// exports


/***/ },

/***/ 1637:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(1626);

	exports.default = {
	  data: function data() {
	    return {};
	  },

	  props: ['environment', "itemData"]
	  // </script>

	}; // <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/2017/01/16/750_88_f0322789dc2ae0bdf52dc09fe4d29002.png" alt="">
	//       </div>
	//       <div v-if="environment=='preview'||environment=='show'">
	//         <div class="titText">
	//           <span class="title_left">//</span>
	//           <span v-text="itemData.navigationTitle"></span>
	//           <span class="title_right">//</span>
	//         </div>
	//       </div>
	//     </div>
	// </template>
	// <style scoped="">
	//   .titText {
	//     background: #FDF6FF;
	//     color: #DA7AF2;
	//   }
	// </style>
	// <script>

/***/ },

/***/ 1638:
/***/ function(module, exports) {

	module.exports = "\n<div _v-17e17ee6=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-17e17ee6=\"\">\n    <img src=\"http://pic.davdian.com/free/2017/01/16/750_88_f0322789dc2ae0bdf52dc09fe4d29002.png\" alt=\"\" _v-17e17ee6=\"\">\n  </div>\n  <div v-if=\"environment=='preview'||environment=='show'\" _v-17e17ee6=\"\">\n    <div class=\"titText\" _v-17e17ee6=\"\">\n      <span class=\"title_left\" _v-17e17ee6=\"\">//</span>\n      <span v-text=\"itemData.navigationTitle\" _v-17e17ee6=\"\"></span>\n      <span class=\"title_right\" _v-17e17ee6=\"\">//</span>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 1639:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1640)
	__vue_script__ = __webpack_require__(1642)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_23.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1643)
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
	  var id = "_v-17c54fe4/item_23.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1640:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1641);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-17c54fe4&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_23.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-17c54fe4&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_23.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1641:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.titText[_v-17c54fe4] {\n  background: #FFEDF2;\n  color: #FF4A7D;\n}\n", ""]);

	// exports


/***/ },

/***/ 1642:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(1626);

	exports.default = {
	  data: function data() {
	    return {};
	  },

	  props: ['environment', "itemData"]
	  // </script>

	}; // <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/2017/01/16/750_88_00ba53166b249f80458d6e25fd824934.png" alt="">
	//       </div>
	//       <div v-if="environment=='preview'||environment=='show'">
	//         <div class="titText">
	//           <span class="title_left">//</span>
	//           <span v-text="itemData.navigationTitle"></span>
	//           <span class="title_right">//</span>
	//         </div>
	//       </div>
	//     </div>
	// </template>
	// <style scoped="">
	//   .titText {
	//     background: #FFEDF2;
	//     color: #FF4A7D;
	//   }
	// </style>
	// <script>

/***/ },

/***/ 1643:
/***/ function(module, exports) {

	module.exports = "\n<div _v-17c54fe4=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-17c54fe4=\"\">\n    <img src=\"http://pic.davdian.com/free/2017/01/16/750_88_00ba53166b249f80458d6e25fd824934.png\" alt=\"\" _v-17c54fe4=\"\">\n  </div>\n  <div v-if=\"environment=='preview'||environment=='show'\" _v-17c54fe4=\"\">\n    <div class=\"titText\" _v-17c54fe4=\"\">\n      <span class=\"title_left\" _v-17c54fe4=\"\">//</span>\n      <span v-text=\"itemData.navigationTitle\" _v-17c54fe4=\"\"></span>\n      <span class=\"title_right\" _v-17c54fe4=\"\">//</span>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 1644:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1645)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_24.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1646)
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
	  var id = "_v-17a920e2/item_24.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1645:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div>
	//     <!--<div class="img_container" v-if="environment==`menu`">-->
	//     <div class="img_container" v-if="environment=='menu'">
	//       <img src="http://pic.davdian.com/free/2017/01/17/750_20_9c94e8e5db15bafa28f32fcba2eb40c7.png" alt="">
	//     </div>
	//     <div v-if="environment=='preview'||environment=='show'">
	//       <div :style="{height:itemData.value+'px'}"></div>
	//     </div>
	//   </div>
	// </template>
	// <script>
	exports.default = {
	  data: function data() {
	    return {};
	  },

	  props: ['environment', "itemData"]
	  // </script>

	};

/***/ },

/***/ 1646:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/2017/01/17/750_20_9c94e8e5db15bafa28f32fcba2eb40c7.png\" alt=\"\">\n  </div>\n  <div v-if=\"environment=='preview'||environment=='show'\">\n    <div :style=\"{height:itemData.value+'px'}\"></div>\n  </div>\n</div>\n";

/***/ },

/***/ 1647:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1648)
	__webpack_require__(1650)
	__vue_script__ = __webpack_require__(1652)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_25.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1653)
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
	  var id = "_v-178cf1e0/item_25.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1648:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1649);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-178cf1e0&scoped=true!./goods.css", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-178cf1e0&scoped=true!./goods.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1649:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".goods_group[_v-178cf1e0]{\n  overflow: hidden;\n  background-color: #f1f1f1;\n  padding: 5px;\n}\n.goods_group .goods_item[_v-178cf1e0]{\n  width: 50%;\n  float: left;\n  padding: 5px;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 0;\n  overflow: hidden;\n}\n.goods_img[_v-178cf1e0]{\n  position: relative;\n  background-color: #f1f1f1;\n}\n.goods_item>a[_v-178cf1e0]{\n  background-color: #fff;\n  display:block;\n  padding-bottom: 10px;\n  overflow: hidden;\n}\n.goods_name[_v-178cf1e0]{\n  font-size: 12px;\n  line-height: 18px;\n  color: #333;\n  overflow: hidden;\n  height: 36px;\n  margin: 5px 10px;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  display: -webkit-box;\n}\n.goods_price[_v-178cf1e0]{\n  color: #FF4A7D;\n  font-size: 16px;\n  padding: 0 8px;\n  width: 200%;\n}\n.goods_label[_v-178cf1e0]{\n  border-radius: 8px;\n  height: 16px;\n  line-height: 16px;\n  color: #fff;\n  padding: 0 5px;\n  background-color: #FF4A7D;\n  font-size: 10px;\n  display: inline-block;\n  margin-left: 4px;\n  font-family: sans-serif;\n}\n.img_label[_v-178cf1e0]{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label[_v-178cf1e0]:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n.vip_return[_v-178cf1e0]{\n  line-height: 1;\n  font-size: 0;\n  color: #BF9D51;\n  padding-left: 4px;\n  position: relative;\n  display: inline-block;\n    -webkit-transform: scale(0.5);\n  -webkit-transform-origin: 0 60%;\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  -ms-transform-origin: 0 60%;\n      transform-origin: 0 60%;\n  vertical-align: middle;\n  margin-bottom: -4px;\n}\n.vip_return .vip_return_title[_v-178cf1e0]{\n  font-size: 22px;\n}\n.vip_return .vip_return_f[_v-178cf1e0]{\n  font-size: 18px;\n  padding: 0 2px 0 4px;\n}\n.vip_return .vip_return_price[_v-178cf1e0]{\n  font-size: 24px;\n}\n.price[_v-178cf1e0]{\n  vertical-align: sub;\n}\n @media screen and (max-width:374px){\n    .vip_return[_v-178cf1e0]{\n      padding-left:0;\n      margin-bottom: -6px;\n    }\n    .vip_return .vip_return_title[_v-178cf1e0]{\n      font-size: 20px;\n    }\n    .vip_return .vip_return_f[_v-178cf1e0]{\n      font-size: 14px;\n      padding: 0 2px 0 4px;\n    }\n    .vip_return .vip_return_price[_v-178cf1e0]{\n      font-size: 20px;\n    }\n    small[_v-178cf1e0]{\n      font-size: 70%;\n    }\n }\nsmall[_v-178cf1e0]{\n  padding: 0 2px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1650:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1651);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-178cf1e0&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_25.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-178cf1e0&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_25.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1651:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.goods_group_con[_v-178cf1e0] {\n  overflow: hidden;\n  background-color: #f1f1f1;\n}\n\n.cross_goods_item[_v-178cf1e0] {\n  display: block;\n  height: 100px;\n  position: relative;\n  width: 100%;\n  background-color: #fff;\n  margin-bottom: 10px;\n}\n\n.cross_goods_item[_v-178cf1e0]:nth-last-child(1) {\n  margin-bottom: 0;\n}\n\n.cross_goods_item .goods_img[_v-178cf1e0] {\n  width: 80px;\n  height: 80px;\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  font-size: 0;\n}\n\n.cross_goods_item .goods_info[_v-178cf1e0] {\n  margin-left: 90px;\n  padding: 10px;\n}\n\n.goods_cross .goods_title[_v-178cf1e0] {\n  font-size: 14px;\n  color: #333;\n  line-height: 19px;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  display: -webkit-box;\n  height: 38px;\n  overflow: hidden;\n}\n\n.goods_cross .goods_price_outer[_v-178cf1e0] {\n  margin-top: 24px;\n  font-size: 16px;\n  line-height: 16px;\n  width: 200%;\n}\n\n.goods_cross .price[_v-178cf1e0] {\n  color: #ff4a7d;\n}\n\n.goods_cross .label[_v-178cf1e0] {\n  border-radius: 8px;\n  color: #fff;\n  padding: 0 5px;\n  background-color: #ff4a7d;\n  font-size: 10px;\n  display: inline-block;\n  margin-left: 4px;\n  font-family: sans-serif;\n  line-height: 16px;\n  height: 16px;\n  vertical-align: middle;\n}\n\n.img_label[_v-178cf1e0] {\n  font-weight: bold;\n  left: 0;\n  bottom: 0;\n  position: absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear, left top, right top, from(#ff5b5b), to(#fa1862));\n  background: linear-gradient(90deg, #ff5b5b, #fa1862);\n  background: -webkit-linear-gradient(left, #ff5b5b, #fa1862);\n  color: #fff;\n  line-height: 16px;\n  padding: 1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n\n.img_label[_v-178cf1e0]:after {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n\n.cross_goods_item:nth-child(2n) .goods_img[_v-178cf1e0] {\n  right: 10px;\n  left: inherit;\n}\n\n\n.cross_goods_item:nth-child(2n) .goods_info[_v-178cf1e0] {\n  margin-right: 90px;\n  margin-left: 0;\n}\n\nsmall[_v-178cf1e0] {\n  padding: 0 1px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1652:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _goodsItemHandler = __webpack_require__(1570);

	var _goodsItemHandler2 = _interopRequireDefault(_goodsItemHandler);

	var _index = __webpack_require__(1571);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: "item25",
	  data: function data() {
	    return {
	      previewData: null
	    };
	  },

	  watch: {
	    itemData: {
	      deep: true,
	      handler: function handler(val, oldVal) {
	        this.getData();
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.initData();
	    this.getData();
	  },

	  methods: {
	    getData: function getData() {
	      var that = this,
	          el = this.$el;
	      _goodsItemHandler2.default.handler(this.itemData, { limit: 2, el: el }).then(function (data) {
	        that.previewData = data.data;
	      });
	    },
	    initData: function initData() {
	      this.previewData = _goodsItemHandler2.default.init(this.itemData);
	    }
	  },
	  props: ['environment', "itemData"],
	  components: {
	    XImg: _index2.default
	  }
	};

/***/ },

/***/ 1653:
/***/ function(module, exports) {

	module.exports = "\n<div _v-178cf1e0=\"\">\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-178cf1e0=\"\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img_25.png\" alt=\"\" _v-178cf1e0=\"\">\n  </div>\n\n  <div v-if=\"environment=='preview'\" class=\"goods_group_con\" _v-178cf1e0=\"\">\n    <div v-for=\"(item, index) in previewData\" :key=\"index\" class=\"cross_goods_item goods_cross goods_cross2\" _v-178cf1e0=\"\">\n      <div class=\"goods_img\" _v-178cf1e0=\"\">\n        <img :src=\"item.goods_img\" :alt=\"item.goods_name\" _v-178cf1e0=\"\">\n        <span class=\"img_label\" v-if=\"item.goods_label&amp;&amp;item.goods_label.length\" v-text=\"item.goods_label\" _v-178cf1e0=\"\"></span>\n      </div>\n      <div class=\"goods_info\" _v-178cf1e0=\"\">\n        <div v-text=\"item.goods_name\" class=\"goods_title\" _v-178cf1e0=\"\"></div>\n        <div class=\"goods_price_outer\" _v-178cf1e0=\"\">\n          <span class=\"price\" _v-178cf1e0=\"\"><small _v-178cf1e0=\"\">¥</small>{{item.shop_price}}</span>\n          <span class=\"vip_return\" v-if=\"item.seller_income &amp;&amp; item.seller_income != '0'\" _v-178cf1e0=\"\">\n            <span class=\"vip_return_title\" _v-178cf1e0=\"\">会员返</span>\n            <span class=\"vip_return_f\" _v-178cf1e0=\"\">¥</span>\n            <span class=\"vip_return_price\" _v-178cf1e0=\"\">{{item.seller_income}}</span>\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div v-if=\"environment=='show'\" class=\"goods_group_con\" _v-178cf1e0=\"\">\n    <a :href=\"item.url\" v-for=\"(item, index) in previewData\" :key=\"index\" class=\"cross_goods_item goods_cross goods_cross2\" _v-178cf1e0=\"\">\n      <div class=\"goods_img\" _v-178cf1e0=\"\">\n        <!--<x-img v-if=\"index>6\" :src=\"item.goods_img\" default-src=\"http://pic.davdian.com/free/2017/06/08/160_160_4d0f1e2009fdfd8bb0c430cda8e22a82.png\" container=\"#vux_view_box_body\"></x-img>-->\n        <!--<img v-else  :src=\"item.goods_img\">-->\n        <img :src=\"item.goods_img\" _v-178cf1e0=\"\">\n        <span class=\"img_label\" v-if=\"item.goods_label&amp;&amp;item.goods_label.length\" v-text=\"item.goods_label\" _v-178cf1e0=\"\"></span>\n      </div>\n      <div class=\"goods_info\" _v-178cf1e0=\"\">\n        <div v-text=\"item.goods_name\" class=\"goods_title\" _v-178cf1e0=\"\"></div>\n        <div class=\"goods_price_outer\" _v-178cf1e0=\"\">\n          <span v-if=\"item.price\" class=\"price\" _v-178cf1e0=\"\"><small _v-178cf1e0=\"\">¥</small>{{item.price[0]}}<small _v-178cf1e0=\"\">{{item.price[1]}}</small></span>\n          <span class=\"vip_return\" _v-178cf1e0=\"\">\n            <span class=\"vip_return_title\" _v-178cf1e0=\"\">会员返</span>\n            <span class=\"vip_return_f\" _v-178cf1e0=\"\">¥</span>\n            <span class=\"vip_return_price\" _v-178cf1e0=\"\">{{item.seller_income}}</span>\n          </span>\n        </div>\n      </div>\n    </a>\n  </div>\n\n</div>\n";

/***/ },

/***/ 1654:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1655)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_26.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1656)
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
	  var id = "_v-1770c2de/item_26.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1655:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _swiper = __webpack_require__(998);

	var _swiper2 = _interopRequireDefault(_swiper);

	var _swiperItem = __webpack_require__(1016);

	var _swiperItem2 = _interopRequireDefault(_swiperItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: "item26",
	  data: function data() {
	    return { list: [], ratio: 0.5 };
	  },

	  components: {
	    Swiper: _swiper2.default,
	    SwiperItem: _swiperItem2.default
	  },
	  props: ['environment', 'fid', 'itemData'],
	  created: function created() {
	    var that = this;
	    for (var i = 0, d; d = this.itemData.imgList[i++];) {
	      if (d.imgUrl && d.link) {
	        this.list.push({ img: d.imgUrl, url: d.link });
	      }
	    }
	    var imgUrl = this.list[0].img;
	    var imgObj = new Image();
	    imgObj.onload = function () {
	      that.ratio = imgObj.height / imgObj.width;
	    };
	    imgObj.src = imgUrl;
	  }
	};

/***/ },

/***/ 1656:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img1.jpg\" alt=\"\">\n  </div>\n  <div v-if=\"environment=='preview'\">\n    <!--<img :src=\"itemData.imgList[0].imgUrl||`https://dummyimage.com/600x300.png&text=click%20mea`\" alt=\"\">-->\n    <img :src=\"itemData.imgList[0].imgUrl||'https://dummyimage.com/600x300.png&text=click%20mea'\" alt=\"\">\n  </div>\n  <div v-if=\"environment=='show'\">\n    <swiper loop auto :aspect-ratio=\"ratio\" :list=\"list\" :show-desc-mask=\"false\" :show-dots=\"false\">\n    </swiper>\n  </div>\n</div>\n";

/***/ },

/***/ 1657:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1658)
	__webpack_require__(1660)
	__vue_script__ = __webpack_require__(1662)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_3.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1663)
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
	  var id = "_v-5a816ef6/item_3.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1658:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1659);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a816ef6&scoped=true!./goods.css", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a816ef6&scoped=true!./goods.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1659:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".goods_group[_v-5a816ef6]{\n  overflow: hidden;\n  background-color: #f1f1f1;\n  padding: 5px;\n}\n.goods_group .goods_item[_v-5a816ef6]{\n  width: 50%;\n  float: left;\n  padding: 5px;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 0;\n  overflow: hidden;\n}\n.goods_img[_v-5a816ef6]{\n  position: relative;\n  background-color: #f1f1f1;\n}\n.goods_item>a[_v-5a816ef6]{\n  background-color: #fff;\n  display:block;\n  padding-bottom: 10px;\n  overflow: hidden;\n}\n.goods_name[_v-5a816ef6]{\n  font-size: 12px;\n  line-height: 18px;\n  color: #333;\n  overflow: hidden;\n  height: 36px;\n  margin: 5px 10px;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  display: -webkit-box;\n}\n.goods_price[_v-5a816ef6]{\n  color: #FF4A7D;\n  font-size: 16px;\n  padding: 0 8px;\n  width: 200%;\n}\n.goods_label[_v-5a816ef6]{\n  border-radius: 8px;\n  height: 16px;\n  line-height: 16px;\n  color: #fff;\n  padding: 0 5px;\n  background-color: #FF4A7D;\n  font-size: 10px;\n  display: inline-block;\n  margin-left: 4px;\n  font-family: sans-serif;\n}\n.img_label[_v-5a816ef6]{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label[_v-5a816ef6]:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n.vip_return[_v-5a816ef6]{\n  line-height: 1;\n  font-size: 0;\n  color: #BF9D51;\n  padding-left: 4px;\n  position: relative;\n  display: inline-block;\n    -webkit-transform: scale(0.5);\n  -webkit-transform-origin: 0 60%;\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  -ms-transform-origin: 0 60%;\n      transform-origin: 0 60%;\n  vertical-align: middle;\n  margin-bottom: -4px;\n}\n.vip_return .vip_return_title[_v-5a816ef6]{\n  font-size: 22px;\n}\n.vip_return .vip_return_f[_v-5a816ef6]{\n  font-size: 18px;\n  padding: 0 2px 0 4px;\n}\n.vip_return .vip_return_price[_v-5a816ef6]{\n  font-size: 24px;\n}\n.price[_v-5a816ef6]{\n  vertical-align: sub;\n}\n @media screen and (max-width:374px){\n    .vip_return[_v-5a816ef6]{\n      padding-left:0;\n      margin-bottom: -6px;\n    }\n    .vip_return .vip_return_title[_v-5a816ef6]{\n      font-size: 20px;\n    }\n    .vip_return .vip_return_f[_v-5a816ef6]{\n      font-size: 14px;\n      padding: 0 2px 0 4px;\n    }\n    .vip_return .vip_return_price[_v-5a816ef6]{\n      font-size: 20px;\n    }\n    small[_v-5a816ef6]{\n      font-size: 70%;\n    }\n }\nsmall[_v-5a816ef6]{\n  padding: 0 2px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1660:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1661);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a816ef6&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_3.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a816ef6&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_3.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1661:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.buy_btn[_v-5a816ef6]{\n  float: right;\n  background-color: #FF4A7D;\n  color: #fff;\n  padding: 0 5px;\n  border-radius: 2px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1662:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _goodsItemHandler = __webpack_require__(1570);

	var _goodsItemHandler2 = _interopRequireDefault(_goodsItemHandler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: "item3",
	  data: function data() {
	    return {
	      previewData: null
	    };
	  },

	  watch: {
	    itemData: {
	      deep: true,
	      handler: function handler(val, oldVal) {
	        this.getData();
	      }
	    }
	  },
	  created: function created() {
	    this.getData();
	  },

	  methods: {
	    getData: function getData() {
	      var that = this;
	      _goodsItemHandler2.default.handler(this.itemData, { limit: 4 }).then(function (data) {
	        that.previewData = data.data;
	      });
	    }
	  },
	  props: ['environment', "itemData"]
	  // </script>
	  // <style src="../goods/goods.css" scoped></style>
	  // <style scoped="">
	  //   .buy_btn{
	  //     float: right;
	  //     background-color: #FF4A7D;
	  //     color: #fff;
	  //     padding: 0 5px;
	  //     border-radius: 2px;
	  //   }
	  // </style>

	}; // <template>
	//   <div>
	//     <div class="img_container" v-if="environment=='menu'">
	//       <img src="http://pic.davdian.com/free/theme_thu_img10.jpg" alt="">
	//     </div>
	//     <div v-if="environment=='preview'" class="goods_group">
	//       <div v-for="(item, index) in previewData" :key="index" class="goods_item">
	//         <img :src="item.goods_img" :alt="item.goods_name" class="goods_img">
	//         <div v-text="item.goods_name" class="goods_name"></div>
	//         <div class="goods_price">
	//           <!--<span class="price" v-text="`¥${item.shop_price}`"></span>-->
	//           <span class="price" v-text="'¥'+item.shop_price"></span>
	//           <span class="buy_btn">立即购买</span>
	//         </div>
	//       </div>
	//     </div>
	//
	//     <div v-if="environment=='show'" class="goods_group">
	//       <a :href="item.url" v-for="(item, index) in previewData" :key="index" class="goods_item">
	//         <img :src="item.goods_img" :alt="item.goods_name" class="goods_img">
	//         <div v-text="item.goods_name" class="goods_name"></div>
	//         <div class="goods_price">
	//           <!--<span class="price" v-text="`¥${item.shop_price}`"></span>-->
	//           <span class="price" v-text="'¥'+item.shop_price"></span>
	//           <span class="buy_btn">立即购买</span>
	//         </div>
	//       </a>
	//     </div>
	//   </div>
	// </template>
	// <script>

/***/ },

/***/ 1663:
/***/ function(module, exports) {

	module.exports = "\n<div _v-5a816ef6=\"\">\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-5a816ef6=\"\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img10.jpg\" alt=\"\" _v-5a816ef6=\"\">\n  </div>\n  <div v-if=\"environment=='preview'\" class=\"goods_group\" _v-5a816ef6=\"\">\n    <div v-for=\"(item, index) in previewData\" :key=\"index\" class=\"goods_item\" _v-5a816ef6=\"\">\n      <img :src=\"item.goods_img\" :alt=\"item.goods_name\" class=\"goods_img\" _v-5a816ef6=\"\">\n      <div v-text=\"item.goods_name\" class=\"goods_name\" _v-5a816ef6=\"\"></div>\n      <div class=\"goods_price\" _v-5a816ef6=\"\">\n        <!--<span class=\"price\" v-text=\"`¥${item.shop_price}`\"></span>-->\n        <span class=\"price\" v-text=\"'¥'+item.shop_price\" _v-5a816ef6=\"\"></span>\n        <span class=\"buy_btn\" _v-5a816ef6=\"\">立即购买</span>\n      </div>\n    </div>\n  </div>\n\n  <div v-if=\"environment=='show'\" class=\"goods_group\" _v-5a816ef6=\"\">\n    <a :href=\"item.url\" v-for=\"(item, index) in previewData\" :key=\"index\" class=\"goods_item\" _v-5a816ef6=\"\">\n      <img :src=\"item.goods_img\" :alt=\"item.goods_name\" class=\"goods_img\" _v-5a816ef6=\"\">\n      <div v-text=\"item.goods_name\" class=\"goods_name\" _v-5a816ef6=\"\"></div>\n      <div class=\"goods_price\" _v-5a816ef6=\"\">\n        <!--<span class=\"price\" v-text=\"`¥${item.shop_price}`\"></span>-->\n        <span class=\"price\" v-text=\"'¥'+item.shop_price\" _v-5a816ef6=\"\"></span>\n        <span class=\"buy_btn\" _v-5a816ef6=\"\">立即购买</span>\n      </div>\n    </a>\n  </div>\n</div>\n";

/***/ },

/***/ 1664:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1665)
	__webpack_require__(1667)
	__vue_script__ = __webpack_require__(1669)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_4.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1670)
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
	  var id = "_v-5a8f8677/item_4.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1665:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1666);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a8f8677&scoped=true!./goods.css", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a8f8677&scoped=true!./goods.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1666:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".goods_group[_v-5a8f8677]{\n  overflow: hidden;\n  background-color: #f1f1f1;\n  padding: 5px;\n}\n.goods_group .goods_item[_v-5a8f8677]{\n  width: 50%;\n  float: left;\n  padding: 5px;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 0;\n  overflow: hidden;\n}\n.goods_img[_v-5a8f8677]{\n  position: relative;\n  background-color: #f1f1f1;\n}\n.goods_item>a[_v-5a8f8677]{\n  background-color: #fff;\n  display:block;\n  padding-bottom: 10px;\n  overflow: hidden;\n}\n.goods_name[_v-5a8f8677]{\n  font-size: 12px;\n  line-height: 18px;\n  color: #333;\n  overflow: hidden;\n  height: 36px;\n  margin: 5px 10px;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  display: -webkit-box;\n}\n.goods_price[_v-5a8f8677]{\n  color: #FF4A7D;\n  font-size: 16px;\n  padding: 0 8px;\n  width: 200%;\n}\n.goods_label[_v-5a8f8677]{\n  border-radius: 8px;\n  height: 16px;\n  line-height: 16px;\n  color: #fff;\n  padding: 0 5px;\n  background-color: #FF4A7D;\n  font-size: 10px;\n  display: inline-block;\n  margin-left: 4px;\n  font-family: sans-serif;\n}\n.img_label[_v-5a8f8677]{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label[_v-5a8f8677]:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n.vip_return[_v-5a8f8677]{\n  line-height: 1;\n  font-size: 0;\n  color: #BF9D51;\n  padding-left: 4px;\n  position: relative;\n  display: inline-block;\n    -webkit-transform: scale(0.5);\n  -webkit-transform-origin: 0 60%;\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  -ms-transform-origin: 0 60%;\n      transform-origin: 0 60%;\n  vertical-align: middle;\n  margin-bottom: -4px;\n}\n.vip_return .vip_return_title[_v-5a8f8677]{\n  font-size: 22px;\n}\n.vip_return .vip_return_f[_v-5a8f8677]{\n  font-size: 18px;\n  padding: 0 2px 0 4px;\n}\n.vip_return .vip_return_price[_v-5a8f8677]{\n  font-size: 24px;\n}\n.price[_v-5a8f8677]{\n  vertical-align: sub;\n}\n @media screen and (max-width:374px){\n    .vip_return[_v-5a8f8677]{\n      padding-left:0;\n      margin-bottom: -6px;\n    }\n    .vip_return .vip_return_title[_v-5a8f8677]{\n      font-size: 20px;\n    }\n    .vip_return .vip_return_f[_v-5a8f8677]{\n      font-size: 14px;\n      padding: 0 2px 0 4px;\n    }\n    .vip_return .vip_return_price[_v-5a8f8677]{\n      font-size: 20px;\n    }\n    small[_v-5a8f8677]{\n      font-size: 70%;\n    }\n }\nsmall[_v-5a8f8677]{\n  padding: 0 2px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1667:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1668);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a8f8677&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_4.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a8f8677&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_4.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1668:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.goods_group_con[_v-5a8f8677] {\n  overflow: hidden;\n  background-color: #f1f1f1;\n}\n\n.cross_goods_item[_v-5a8f8677]{\n  display: block;\n  height: 100px;\n  position: relative;\n  width: 100%;\n  background-color: #fff;\n  margin-bottom: 10px;\n}\n.cross_goods_item[_v-5a8f8677]:nth-last-child(1){\n  margin-bottom:0;\n}\n.cross_goods_item .goods_img[_v-5a8f8677]{\n  width: 80px;\n  height: 80px;\n  position: absolute;\n  top:10px;\n  left: 10px;\n  font-size: 0;\n}\n.cross_goods_item .goods_info[_v-5a8f8677]{\n  margin-left: 90px;\n  padding: 10px;\n}\n.goods_cross .goods_title[_v-5a8f8677]{\n  font-size: 14px;\n  color: #333;\n  line-height: 19px;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  display: -webkit-box;\n  height: 38px;\n  overflow: hidden;\n}\n.goods_cross .goods_detail[_v-5a8f8677]{\n  font-size: 10px;\n  color: #999;\n  line-height: 1.5;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  display: -webkit-box;\n  height: 3em;\n  overflow: hidden;\n  margin-top: 10px;\n}\n.goods_cross .goods_price_outer[_v-5a8f8677]{\n  margin-top: 24px;\n  font-size: 16px;\n  line-height: 16px;\n  width:200%\n}\n.goods_cross .price[_v-5a8f8677]{\n  color: #ff4a7d;\n}\n.goods_cross .label[_v-5a8f8677]{\n  border-radius: 8px;\n  color: #fff;\n  padding: 0 5px;\n  background-color: #ff4a7d;\n  font-size: 10px;\n  display: inline-block;\n  margin-left: 4px;\n  font-family: sans-serif;\n  line-height: 16px;\n  height: 16px;\n  vertical-align: middle;\n}\n.img_label[_v-5a8f8677]{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label[_v-5a8f8677]:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 1669:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _goodsItemHandler = __webpack_require__(1570);

	var _goodsItemHandler2 = _interopRequireDefault(_goodsItemHandler);

	var _index = __webpack_require__(1571);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: "item4",
	  data: function data() {
	    return {
	      previewData: null
	    };
	  },

	  watch: {
	    itemData: {
	      deep: true,
	      handler: function handler(val, oldVal) {
	        this.getData();
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.initData();
	    this.getData();
	  },

	  methods: {
	    getData: function getData() {
	      var that = this,
	          el = this.$el;;
	      _goodsItemHandler2.default.handler(this.itemData, { limit: 2, el: el }).then(function (data) {
	        that.previewData = data.data;
	      });
	    },
	    initData: function initData() {
	      this.previewData = _goodsItemHandler2.default.init(this.itemData);
	    }
	  },
	  props: ['environment', "itemData"],
	  components: {
	    XImg: _index2.default
	  }
	};

/***/ },

/***/ 1670:
/***/ function(module, exports) {

	module.exports = "\n<div name=\"item4\" _v-5a8f8677=\"\">\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-5a8f8677=\"\">\n    <img src=\"http://pic.davdian.com/free/2017/01/16/750_580_66b9a8876371d17f0a9509bd9b50de3a.png\" alt=\"\" _v-5a8f8677=\"\">\n  </div>\n\n  <div v-if=\"environment=='preview'\" class=\"goods_group_con\" _v-5a8f8677=\"\">\n    <div v-for=\"(item, index) in previewData\" :key=\"index\" class=\"cross_goods_item goods_cross\" _v-5a8f8677=\"\">\n      <div class=\"goods_img\" _v-5a8f8677=\"\">\n        <img :src=\"item.goods_img\" :alt=\"item.goods_name\" _v-5a8f8677=\"\">\n        <span class=\"img_label\" v-if=\"item.goods_label&amp;&amp;item.goods_label.length\" v-text=\"item.goods_label\" _v-5a8f8677=\"\"></span>\n      </div>\n      <div class=\"goods_info\" _v-5a8f8677=\"\">\n        <div v-text=\"item.goods_name\" class=\"goods_title\" _v-5a8f8677=\"\"></div>\n        <div class=\"goods_price_outer\" _v-5a8f8677=\"\">\n          <span class=\"price\" _v-5a8f8677=\"\"><small _v-5a8f8677=\"\">¥</small>{{item.shop_price}}</span>\n          <span class=\"vip_return\" v-if=\"item.seller_income &amp;&amp; item.seller_income != '0'\" _v-5a8f8677=\"\">\n            <span class=\"vip_return_title\" _v-5a8f8677=\"\">会员返</span>\n            <span class=\"vip_return_f\" _v-5a8f8677=\"\">¥</span>\n            <span class=\"vip_return_price\" _v-5a8f8677=\"\">{{item.seller_income}}</span>\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div v-if=\"environment=='show'\" class=\"goods_group_con\" _v-5a8f8677=\"\">\n    <a :href=\"item.url\" v-for=\"(item, index) in previewData\" :key=\"index\" class=\"cross_goods_item goods_cross\" _v-5a8f8677=\"\">\n      <div class=\"goods_img\" _v-5a8f8677=\"\">\n      <!--<x-img v-if=\"index>6\"  :src=\"item.goods_img\" default-src=\"http://pic.davdian.com/free/2017/06/08/160_160_4d0f1e2009fdfd8bb0c430cda8e22a82.png\" container=\"#vux_view_box_body\"></x-img>-->\n        <!--<img v-else :src=\"item.goods_img\">-->\n        <img :src=\"item.goods_img\" _v-5a8f8677=\"\">\n        <span class=\"img_label\" v-if=\"item.goods_label&amp;&amp;item.goods_label.length\" v-text=\"item.goods_label\" _v-5a8f8677=\"\"></span>\n      </div>\n      <div class=\"goods_info\" _v-5a8f8677=\"\">\n        <div v-text=\"item.goods_name\" class=\"goods_title\" _v-5a8f8677=\"\"></div>\n        <div class=\"goods_price_outer\" _v-5a8f8677=\"\">\n          <span class=\"price\" v-if=\"item.price\" _v-5a8f8677=\"\"><small _v-5a8f8677=\"\">¥</small>{{item.price[0]}}<small _v-5a8f8677=\"\">{{item.price[1]}}</small></span>\n          <span class=\"vip_return\" _v-5a8f8677=\"\">\n            <span class=\"vip_return_title\" _v-5a8f8677=\"\">会员返</span>\n            <span class=\"vip_return_f\" _v-5a8f8677=\"\">¥</span>\n            <span class=\"vip_return_price\" _v-5a8f8677=\"\">{{item.seller_income}}</span>\n          </span>\n        </div>\n      </div>\n    </a>\n  </div>\n\n</div>\n";

/***/ },

/***/ 1671:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1672)
	__vue_script__ = __webpack_require__(1674)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_5.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1675)
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
	  var id = "_v-5a9d9df8/item_5.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1672:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1673);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a9d9df8&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_5.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5a9d9df8&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_5.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1673:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.title_container[_v-5a9d9df8]{\n  text-align: center;\n  padding: 10px 0;\n  font-size: 14px;\n}\n.title_left[_v-5a9d9df8]{\n  margin-right: 5px;display: inline-block;width: 50px;height: 1px;background-color: #ec6890; vertical-align: middle;\n}\n.title_text[_v-5a9d9df8]{\n  line-height: 20px;font-size: 14px;background: #ec6890;border-radius: 10px;display: inline-block;padding: 0 10px;color: #fff;\n}\n.title_right[_v-5a9d9df8]{\n  margin-left: 5px;display: inline-block;width: 50px;height: 1px;background-color: #ec6890; vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },

/***/ 1674:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img5.jpg" alt="">
	//       </div>
	//       <!--<div class="title_container" v-if="environment==`preview`||environment==`show`">-->
	//       <div class="title_container" v-if="environment=='preview'||environment=='show'">
	//         <span class="title_left"></span>
	//         <!--<span class="title_text" v-html="itemData.con||`请输入文字`"></span>-->
	//         <span class="title_text" v-html="itemData.con||'请输入文字'"></span>
	//         <span class="title_right"></span>
	//       </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment', 'itemData']
	    // </script>
	    // <style scoped>
	    //   .title_container{
	    //     text-align: center;
	    //     padding: 10px 0;
	    //     font-size: 14px;
	    //   }
	    //   .title_left{
	    //     margin-right: 5px;display: inline-block;width: 50px;height: 1px;background-color: #ec6890; vertical-align: middle;
	    //   }
	    //   .title_text{
	    //     line-height: 20px;font-size: 14px;background: #ec6890;border-radius: 10px;display: inline-block;padding: 0 10px;color: #fff;
	    //   }
	    //   .title_right{
	    //     margin-left: 5px;display: inline-block;width: 50px;height: 1px;background-color: #ec6890; vertical-align: middle;
	    //   }
	    // </style>

	};

/***/ },

/***/ 1675:
/***/ function(module, exports) {

	module.exports = "\n<div _v-5a9d9df8=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-5a9d9df8=\"\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img5.jpg\" alt=\"\" _v-5a9d9df8=\"\">\n  </div>\n  <!--<div class=\"title_container\" v-if=\"environment==`preview`||environment==`show`\">-->\n  <div class=\"title_container\" v-if=\"environment=='preview'||environment=='show'\" _v-5a9d9df8=\"\">\n    <span class=\"title_left\" _v-5a9d9df8=\"\"></span>\n    <!--<span class=\"title_text\" v-html=\"itemData.con||`请输入文字`\"></span>-->\n    <span class=\"title_text\" v-html=\"itemData.con||'请输入文字'\" _v-5a9d9df8=\"\"></span>\n    <span class=\"title_right\" _v-5a9d9df8=\"\"></span>\n  </div>\n</div>\n";

/***/ },

/***/ 1676:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1677)
	__vue_script__ = __webpack_require__(1679)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_6.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1680)
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
	  var id = "_v-5aabb579/item_6.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1677:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1678);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5aabb579&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_6.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5aabb579&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_6.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1678:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.title_container[_v-5aabb579]{\n  text-align: center;\n  padding: 10px 0;\n  font-size: 14px;\n}\n.title_left[_v-5aabb579]{\n  margin-right: 5px;display: inline-block;width: 50px;height: 1px;background-color: #333; vertical-align: middle;\n}\n.title_text[_v-5aabb579]{\n  line-height: 20px;font-size: 14px;border-radius: 10px;display: inline-block;padding: 0 10px;\n}\n.title_right[_v-5aabb579]{\n  margin-left: 5px;display: inline-block;width: 50px;height: 1px;background-color: #333; vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },

/***/ 1679:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div>
	//     <!--<div class="img_container" v-if="environment==`menu`">-->
	//     <div class="img_container" v-if="environment=='menu'">
	//       <img src="http://pic.davdian.com/free/theme_thu_img6.jpg" alt="">
	//     </div>
	//     <!--<div class="title_container" v-if="environment==`preview`||environment==`show`">-->
	//     <div class="title_container" v-if="environment=='preview'||environment=='show'">
	//       <span class="title_left"></span>
	//       <!--<span class="title_text" v-html="itemData.con||`请输入文字`"></span>-->
	//       <span class="title_text" v-html="itemData.con||'请输入文字'"></span>
	//       <span class="title_right"></span>
	//     </div>
	//   </div>
	// </template>
	// <script>
	exports.default = {
	  data: function data() {
	    return {};
	  },

	  props: ['environment', 'itemData']
	  // </script>
	  // <style scoped>
	  //   .title_container{
	  //     text-align: center;
	  //     padding: 10px 0;
	  //     font-size: 14px;
	  //   }
	  //   .title_left{
	  //     margin-right: 5px;display: inline-block;width: 50px;height: 1px;background-color: #333; vertical-align: middle;
	  //   }
	  //   .title_text{
	  //     line-height: 20px;font-size: 14px;border-radius: 10px;display: inline-block;padding: 0 10px;
	  //   }
	  //   .title_right{
	  //     margin-left: 5px;display: inline-block;width: 50px;height: 1px;background-color: #333; vertical-align: middle;
	  //   }
	  // </style>

	};

/***/ },

/***/ 1680:
/***/ function(module, exports) {

	module.exports = "\n<div _v-5aabb579=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-5aabb579=\"\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img6.jpg\" alt=\"\" _v-5aabb579=\"\">\n  </div>\n  <!--<div class=\"title_container\" v-if=\"environment==`preview`||environment==`show`\">-->\n  <div class=\"title_container\" v-if=\"environment=='preview'||environment=='show'\" _v-5aabb579=\"\">\n    <span class=\"title_left\" _v-5aabb579=\"\"></span>\n    <!--<span class=\"title_text\" v-html=\"itemData.con||`请输入文字`\"></span>-->\n    <span class=\"title_text\" v-html=\"itemData.con||'请输入文字'\" _v-5aabb579=\"\"></span>\n    <span class=\"title_right\" _v-5aabb579=\"\"></span>\n  </div>\n</div>\n";

/***/ },

/***/ 1681:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1682)
	__vue_script__ = __webpack_require__(1684)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_7.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1685)
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
	  var id = "_v-5ab9ccfa/item_7.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1682:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1683);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5ab9ccfa&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_7.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5ab9ccfa&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_7.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1683:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.title_container[_v-5ab9ccfa]{\n  text-align: center;\n  padding: 10px 0;\n  font-size: 14px;\n}\n.title_text[_v-5ab9ccfa]{\n  line-height: 20px;font-size: 14px;display: inline-block;border-bottom: #333 2px solid;padding: 0 10px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1684:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img7.jpg" alt="">
	//       </div>
	//       <!--<div class="title_container" v-if="environment==`preview`||environment==`show`">-->
	//       <div class="title_container" v-if="environment=='preview'||environment=='show'">
	//         <!--<span class="title_text" v-html="itemData.con||`请输入文字`"></span>-->
	//         <span class="title_text" v-html="itemData.con||'请输入文字'"></span>
	//       </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['environment', 'itemData']
	    // </script>
	    //
	    // <style scoped>
	    //   .title_container{
	    //     text-align: center;
	    //     padding: 10px 0;
	    //     font-size: 14px;
	    //   }
	    //   .title_text{
	    //     line-height: 20px;font-size: 14px;display: inline-block;border-bottom: #333 2px solid;padding: 0 10px;
	    //   }
	    // </style>

	};

/***/ },

/***/ 1685:
/***/ function(module, exports) {

	module.exports = "\n<div _v-5ab9ccfa=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-5ab9ccfa=\"\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img7.jpg\" alt=\"\" _v-5ab9ccfa=\"\">\n  </div>\n  <!--<div class=\"title_container\" v-if=\"environment==`preview`||environment==`show`\">-->\n  <div class=\"title_container\" v-if=\"environment=='preview'||environment=='show'\" _v-5ab9ccfa=\"\">\n    <!--<span class=\"title_text\" v-html=\"itemData.con||`请输入文字`\"></span>-->\n    <span class=\"title_text\" v-html=\"itemData.con||'请输入文字'\" _v-5ab9ccfa=\"\"></span>\n  </div>\n</div>\n";

/***/ },

/***/ 1686:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1687)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_8.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1688)
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
	  var id = "_v-5ac7e47b/item_8.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1687:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//     <div>
	//       <!--<div class="img_container" v-if="environment==`menu`">-->
	//       <div class="img_container" v-if="environment=='menu'">
	//         <img src="http://pic.davdian.com/free/theme_thu_img3.jpg" alt="">
	//       </div>
	//       <div v-if="environment=='preview'">
	//         <!--<div v-text="itemData.con ||`请在右侧输入内容`"></div>-->
	//         <div v-text="itemData.con ||'请在右侧输入内容'"></div>
	//       </div>
	//       <div v-if="environment=='show'">
	//         <div style="font-size: 14px;padding: 10px;line-height: 1.4;" v-html="itemData.con"></div>
	//       </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	  data: function data() {
	    return {
	      spaceHandle: "444"
	    };
	  },

	  filters: {
	    spaceHandle: function spaceHandle(value) {
	      return value;
	    }
	  },
	  name: "item8",
	  props: ['environment', 'itemData'],
	  methods: {
	    spaceHandle: function spaceHandle(value) {
	      return value;
	    }
	  }
	  // </script>

	};

/***/ },

/***/ 1688:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img3.jpg\" alt=\"\">\n  </div>\n  <div v-if=\"environment=='preview'\">\n    <!--<div v-text=\"itemData.con ||`请在右侧输入内容`\"></div>-->\n    <div v-text=\"itemData.con ||'请在右侧输入内容'\"></div>\n  </div>\n  <div v-if=\"environment=='show'\">\n    <div style=\"font-size: 14px;padding: 10px;line-height: 1.4;\" v-html=\"itemData.con\"></div>\n  </div>\n</div>\n";

/***/ },

/***/ 1689:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1690)
	__vue_script__ = __webpack_require__(1692)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/new_topic/feed/item_9.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1693)
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
	  var id = "_v-5ad5fbfc/item_9.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1690:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1691);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5ad5fbfc&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_9.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5ad5fbfc&scoped=true!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./item_9.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1691:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.btn_container[_v-5ad5fbfc] {\n  text-align: center;\n  background: #f1f1f1;\n  min-height:80px;\n}\n\n.btn[_v-5ad5fbfc] {\n  color: #d73c6b;\n  border: 1px solid #d73c6b;\n  padding: 0 20px;\n  border-radius: 3px;\n  font-size: 12px;\n  display: inline-block;\n  line-height: 22px;\n  background-color: #fff;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n}\n", ""]);

	// exports


/***/ },

/***/ 1692:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div>
	//     <!--<div class="img_container" v-if="environment==`menu`">-->
	//     <div class="img_container" v-if="environment=='menu'">
	//       <img src="http://pic.davdian.com/free/theme_thu_img4.jpg" alt="">
	//     </div>
	//     <!--<div v-if="environment==`preview`" class="btn_container">-->
	//     <div v-if="environment=='preview'" class="btn_container">
	//       <span v-text="itemData.con|| '回到首页'" class="btn"></span>
	//     </div>
	//
	//     <!--<div v-if="environment==`show`" class="btn_container">-->
	//     <div v-if="environment=='show'" class="btn_container">
	//       <a :href="itemData.link" v-if="itemData.link&&itemData.link.length">
	//         <span v-text="itemData.con" class="btn"></span>
	//       </a>
	//       <span v-text="itemData.con" class="btn" v-else></span>
	//     </div>
	//
	//   </div>
	// </template>
	// <script>
	exports.default = {
	  data: function data() {
	    return {};
	  },

	  props: ['environment', 'itemData']
	  // </script>
	  // <style scoped="">
	  //   .btn_container {
	  //     text-align: center;
	  //     background: #f1f1f1;
	  //     min-height:80px;
	  //   }
	  //
	  //   .btn {
	  //     color: #d73c6b;
	  //     border: 1px solid #d73c6b;
	  //     padding: 0 20px;
	  //     border-radius: 3px;
	  //     font-size: 12px;
	  //     display: inline-block;
	  //     line-height: 22px;
	  //     background-color: #fff;
	  //     box-sizing: border-box;
	  //   }
	  // </style>

	};

/***/ },

/***/ 1693:
/***/ function(module, exports) {

	module.exports = "\n<div _v-5ad5fbfc=\"\">\n  <!--<div class=\"img_container\" v-if=\"environment==`menu`\">-->\n  <div class=\"img_container\" v-if=\"environment=='menu'\" _v-5ad5fbfc=\"\">\n    <img src=\"http://pic.davdian.com/free/theme_thu_img4.jpg\" alt=\"\" _v-5ad5fbfc=\"\">\n  </div>\n  <!--<div v-if=\"environment==`preview`\" class=\"btn_container\">-->\n  <div v-if=\"environment=='preview'\" class=\"btn_container\" _v-5ad5fbfc=\"\">\n    <span v-text=\"itemData.con|| '回到首页'\" class=\"btn\" _v-5ad5fbfc=\"\"></span>\n  </div>\n\n  <!--<div v-if=\"environment==`show`\" class=\"btn_container\">-->\n  <div v-if=\"environment=='show'\" class=\"btn_container\" _v-5ad5fbfc=\"\">\n    <a :href=\"itemData.link\" v-if=\"itemData.link&amp;&amp;itemData.link.length\" _v-5ad5fbfc=\"\">\n      <span v-text=\"itemData.con\" class=\"btn\" _v-5ad5fbfc=\"\"></span>\n    </a>\n    <span v-text=\"itemData.con\" class=\"btn\" v-else=\"\" _v-5ad5fbfc=\"\"></span>\n  </div>\n\n</div>\n";

/***/ },

/***/ 1694:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1695)
	__vue_script__ = __webpack_require__(1697)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/view-box/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1698)
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
	  var id = "_v-05b188ab/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1695:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1696);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!../../../../css-loader/index.js!../../../../vue-loader/lib/style-rewriter.js!../../../../less-loader/index.js!../../../../vux-loader/src/style-loader.js!../../../../vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1696:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.weui-tabbar {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  z-index: 500;\n  bottom: 0;\n  width: 100%;\n  background-color: #F7F7FA;\n}\n.weui-tabbar:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C0BFC4;\n  color: #C0BFC4;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-tabbar__item {\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 5px 0 0;\n  font-size: 0;\n  color: #999999;\n  text-align: center;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {\n  color: #09BB07;\n}\n.weui-tabbar__icon {\n  display: inline-block;\n  width: 27px;\n  height: 27px;\n}\ni.weui-tabbar__icon,\n.weui-tabbar__icon > i {\n  font-size: 24px;\n  color: #999999;\n}\n.weui-tabbar__icon img {\n  width: 100%;\n  height: 100%;\n}\n.weui-tabbar__label {\n  text-align: center;\n  color: #999999;\n  font-size: 10px;\n  line-height: 1.8;\n}\n.weui-tab {\n  position: relative;\n  height: 100%;\n}\n.weui-tab__panel {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 100%;\n  padding-bottom: 50px;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.weui-tab__content {\n  display: none;\n}\n", ""]);

	// exports


/***/ },

/***/ 1697:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="weui-tab">
	//     <slot name="header"></slot>
	//     <div class="weui-tab__panel vux-fix-safari-overflow-scrolling" ref="viewBoxBody" id="vux_view_box_body" :style='{paddingTop: bodyPaddingTop, paddingBottom: bodyPaddingBottom}'>
	//       <slot></slot>
	//     </div>
	//     <slot name="bottom"></slot>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'view-box',
	  props: ['bodyPaddingTop', 'bodyPaddingBottom'],
	  methods: {
	    scrollTo: function scrollTo(top) {
	      this.$refs.viewBoxBody.scrollTop = top;
	    },
	    getScrollTop: function getScrollTop() {
	      return this.$refs.viewBoxBody.scrollTop;
	    },
	    getScrollBody: function getScrollBody() {
	      return this.$refs.viewBoxBody;
	    }
	  }
	  // </script>
	  //
	  // <style lang="less">
	  // @import '../../styles/weui/widget/weui_tab/vux-tabbar';
	  // </style>

	};

/***/ },

/***/ 1698:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"weui-tab\">\n  <slot name=\"header\"></slot>\n  <div class=\"weui-tab__panel vux-fix-safari-overflow-scrolling\" ref=\"viewBoxBody\" id=\"vux_view_box_body\" :style='{paddingTop: bodyPaddingTop, paddingBottom: bodyPaddingBottom}'>\n    <slot></slot>\n  </div>\n  <slot name=\"bottom\"></slot>\n</div>\n";

/***/ },

/***/ 1699:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div style=\"height:100%;\" class=\"app\">\n  <view-box ref=\"viewBox\">\n    <com-top-title slot=\"header\" :title=\"title\" border-bottom home hide-disable></com-top-title>\n    <feed environment=\"show\" :feed-list=\"list\" ></feed>\n  </view-box>\n</div>\n";

/***/ }

/******/ });