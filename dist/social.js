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

	__webpack_require__(1479);
	// require('../../javascript/base.js');
	__webpack_require__(1481);


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

/***/ 917:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(918)
	__vue_script__ = __webpack_require__(920)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/group/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(921)
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
	  var id = "_v-02435966/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 918:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(919);
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

/***/ 919:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.weui-cell_access {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  color: inherit;\n}\n.weui-cell_access:active {\n  background-color: #ECECEC;\n}\n.weui-cell_access .weui-cell__ft {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access .weui-cell__ft:after {\n  content: \" \";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n      -ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 2px;\n}\n.weui-cell_link {\n  color: #586C94;\n  font-size: 14px;\n}\n.weui-cell_link:first-child:before {\n  display: block;\n}\n.weui-cell_access.vux-cell-box {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access.vux-cell-box:after {\n  content: \" \";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n      -ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 17px;\n}\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.41176471;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 100%;\n      -ms-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells__title {\n  margin-top: 0.77em;\n  margin-bottom: 0.3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: .3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.weui-cell:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n     -moz-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.weui-cell__bd {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n/**\n* http://www.zhangxinxu.com/wordpress/2015/01/tips-blank-character-chinese-align/\n*/\n.vux-blank-half:before {\n  content: '\\2002';\n  speak: none;\n}\n.vux-blank-full:before {\n  content: '\\2003';\n  speak: none;\n}\n.vux-no-group-title {\n  margin-top: 0.77em;\n}\n", ""]);

	// exports


/***/ },

/***/ 920:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div>
	//     <div class="weui-cells__title" v-if="title" :style="{color:titleColor}" v-html="title"></div>
	//     <div class="weui-cells" :class="{'vux-no-group-title':!title}" :style="{marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter}">
	//       <slot name="after-title"></slot>
	//       <slot></slot>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'group',
	  props: {
	    title: String,
	    titleColor: String,
	    labelWidth: String,
	    labelAlign: String,
	    labelMarginRight: String,
	    gutter: [String, Number]
	  }
	  // </script>
	  //
	  // <style lang="less">
	  // @import '../../styles/weui/widget/weui_cell/weui_access';
	  // @import '../../styles/weui/widget/weui_cell/weui_cell_global';
	  // @import '../../styles/blank.less';
	  //
	  // .vux-no-group-title {
	  //   margin-top: @group-title-margin-top;
	  // }
	  // </style>

	};

/***/ },

/***/ 921:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <div class=\"weui-cells__title\" v-if=\"title\" :style=\"{color:titleColor}\" v-html=\"title\"></div>\n  <div class=\"weui-cells\" :class=\"{'vux-no-group-title':!title}\" :style=\"{marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter}\">\n    <slot name=\"after-title\"></slot>\n    <slot></slot>\n  </div>\n</div>\n";

/***/ },

/***/ 922:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(923)
	__vue_script__ = __webpack_require__(925)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/cell/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(933)
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
	  var id = "_v-16bcfb2a/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 923:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(924);
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

/***/ 924:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.vux-tap-active {\n  tap-highlight-color: rgba(0, 0, 0, 0);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.vux-tap-active:active {\n  background-color: #ECECEC;\n}\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.41176471;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 100%;\n      -ms-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells__title {\n  margin-top: 0.77em;\n  margin-bottom: 0.3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: .3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.weui-cell:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n     -moz-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.weui-cell__bd {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n.weui-loading {\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-animation: weuiLoading 1s steps(12, end) infinite;\n          animation: weuiLoading 1s steps(12, end) infinite;\n  background: transparent url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=\") no-repeat;\n  background-size: 100%;\n}\n.weui-loading.weui-loading_transparent {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHBhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8+PHJlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvPjwvc3ZnPgo=\");\n}\n@-webkit-keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n.vux-cell-primary {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.vux-label {\n  display: block;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-cell__ft .weui-loading {\n  display: block;\n}\n.weui-cell__ft.vux-cell-align-left {\n  text-align: left;\n}\n.weui-cell.vux-cell-no-border-intent:before {\n  left: 0;\n}\n.weui-cell_access .weui-cell__ft.vux-cell-arrow-down:after {\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);\n      -ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);\n}\n.weui-cell_access .weui-cell__ft.vux-cell-arrow-up:after {\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);\n      -ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);\n}\n.vux-cell-arrow-transition:after {\n  -webkit-transition: -webkit-transform 300ms;\n  transition: -webkit-transform 300ms;\n  transition: transform 300ms;\n  transition: transform 300ms, -webkit-transform 300ms;\n}\n.vux-cell-disabled .vux-label {\n  color: #b2b2b2;\n}\n.vux-cell-disabled.weui-cell_access .weui-cell__ft:after {\n  border-color: #e2e2e2;\n}\n", ""]);

	// exports


/***/ },

/***/ 925:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _inlineDesc = __webpack_require__(926);

	var _inlineDesc2 = _interopRequireDefault(_inlineDesc);

	var _router = __webpack_require__(931);

	var _props = __webpack_require__(932);

	var _props2 = _interopRequireDefault(_props);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'cell',
	  components: {
	    InlineDesc: _inlineDesc2.default
	  },
	  props: (0, _props2.default)(),
	  beforeMount: function beforeMount() {
	    this.hasTitleSlot = !!this.$slots.title;
	  },

	  computed: {
	    valueClass: function valueClass() {
	      return {
	        'vux-cell-primary': this.primary === 'content' || this.valueAlign === 'left',
	        'vux-cell-align-left': this.valueAlign === 'left',
	        'vux-cell-arrow-transition': !!this.arrowDirection,
	        'vux-cell-arrow-up': this.arrowDirection === 'up',
	        'vux-cell-arrow-down': this.arrowDirection === 'down'
	      };
	    }
	  },
	  methods: {
	    getLabelStyles: function getLabelStyles() {
	      return {
	        width: this.$parent.labelWidth || this.$parent.$parent.labelWidth,
	        textAlign: this.$parent.labelAlign || this.$parent.$parent.labelAlign,
	        marginRight: this.$parent.labelMarginRight || this.$parent.$parent.labelMarginRight
	      };
	    },
	    onClick: function onClick() {
	      !this.disabled && (0, _router.go)(this.link, this.$router);
	    }
	  },
	  data: function data() {
	    return {
	      hasTitleSlot: false
	    };
	  }
	};
	// </script>
	//
	// <style lang="less">
	// @import '../../styles/variable.less';
	// @import '../../styles/tap.less';
	// @import '../../styles/weui/base/mixin/setArrow.less';
	// @import '../../styles/weui/widget/weui_cell/weui_cell_global';
	// @import '../../styles/weui/widget/weui-loading/weui-loading.less';
	//
	// .vux-cell-primary {
	//   flex: 1;
	// }
	// .vux-label {
	//   display: block;
	//   word-wrap: break-word;
	//   word-break: break-all;
	// }
	// .weui-cell__ft .weui-loading {
	//   display: block;
	// }
	// .weui-cell__ft.vux-cell-align-left {
	//   text-align: left;
	// }
	// .weui-cell.vux-cell-no-border-intent:before {
	//   left: 0;
	// }
	// .weui-cell_access .weui-cell__ft.vux-cell-arrow-down:after {
	//   transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
	// }
	// .weui-cell_access .weui-cell__ft.vux-cell-arrow-up:after {
	//   transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);
	// }
	// .vux-cell-arrow-transition:after {
	//   transition: transform 300ms;
	// }
	// .vux-cell-disabled {
	//   .vux-label {
	//     color: #b2b2b2;
	//   }
	//   &.weui-cell_access .weui-cell__ft:after {
	//     border-color: @cell-disabled-arrow-color;
	//   }
	// }
	// </style>
	// <template>
	//   <div
	//     class="weui-cell"
	//     :class="{
	//       'vux-tap-active': isLink || !!link,
	//       'weui-cell_access': isLink || !!link,
	//       'vux-cell-no-border-intent': !borderIntent,
	//       'vux-cell-disabled': disabled
	//     }"
	//     @click="onClick">
	//     <div class="weui-cell__hd">
	//       <slot name="icon"></slot>
	//     </div>
	//     <div class="vux-cell-bd" :class="{'vux-cell-primary': primary === 'title' && valueAlign !== 'left'}">
	//       <p>
	//         <label class="vux-label" :style="getLabelStyles()" v-if="title || hasTitleSlot">
	//           <slot name="title">{{ title }}</slot>
	//         </label>
	//         <slot name="after-title"></slot>
	//       </p>
	//       <inline-desc>
	//         <slot name="inline-desc">{{ inlineDesc }}</slot>
	//       </inline-desc>
	//     </div>
	//     <div class="weui-cell__ft" :class="valueClass">
	//       <slot name="value"></slot>
	//       <slot>{{ value }}</slot>
	//       <i class="weui-loading" v-if="isLoading"></i>
	//     </div>
	//     <slot name="child"></slot>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 926:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(927)
	__vue_script__ = __webpack_require__(929)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/inline-desc/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(930)
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
	  var id = "_v-db721f5a/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 927:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(928);
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

/***/ 928:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n.vux-label-desc {\n  font-size:14px;\n  color:#666;\n}\n", ""]);

	// exports


/***/ },

/***/ 929:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <span class="vux-label-desc"><slot></slot></span>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'inline-desc'
	  // </script>
	  //
	  // <style>
	  // .vux-label-desc {
	  //   font-size:14px;
	  //   color:#666;
	  // }
	  // </style>

	};

/***/ },

/***/ 930:
/***/ function(module, exports) {

	module.exports = "\n<span class=\"vux-label-desc\"><slot></slot></span>\n";

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

/***/ 932:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  return {
	    title: [String, Number],
	    value: [String, Number, Array],
	    isLink: Boolean,
	    isLoading: Boolean,
	    inlineDesc: [String, Number],
	    primary: {
	      type: String,
	      default: 'title'
	    },
	    link: [String, Object],
	    valueAlign: [String, Boolean, Number],
	    borderIntent: {
	      type: Boolean,
	      default: true
	    },
	    disabled: Boolean,
	    arrowDirection: String // down or up
	  };
	};

/***/ },

/***/ 933:
/***/ function(module, exports) {

	module.exports = "\n<div\n  class=\"weui-cell\"\n  :class=\"{\n    'vux-tap-active': isLink || !!link,\n    'weui-cell_access': isLink || !!link,\n    'vux-cell-no-border-intent': !borderIntent,\n    'vux-cell-disabled': disabled\n  }\"\n  @click=\"onClick\">\n  <div class=\"weui-cell__hd\">\n    <slot name=\"icon\"></slot>\n  </div>\n  <div class=\"vux-cell-bd\" :class=\"{'vux-cell-primary': primary === 'title' && valueAlign !== 'left'}\">\n    <p>\n      <label class=\"vux-label\" :style=\"getLabelStyles()\" v-if=\"title || hasTitleSlot\">\n        <slot name=\"title\">{{ title }}</slot>\n      </label>\n      <slot name=\"after-title\"></slot>\n    </p>\n    <inline-desc>\n      <slot name=\"inline-desc\">{{ inlineDesc }}</slot>\n    </inline-desc>\n  </div>\n  <div class=\"weui-cell__ft\" :class=\"valueClass\">\n    <slot name=\"value\"></slot>\n    <slot>{{ value }}</slot>\n    <i class=\"weui-loading\" v-if=\"isLoading\"></i>\n  </div>\n  <slot name=\"child\"></slot>\n</div>\n";

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

/***/ 1011:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1012)
	__vue_script__ = __webpack_require__(1014)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/cell-box/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1015)
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
	  var id = "_v-7ac5c8a8/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1012:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1013);
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

/***/ 1013:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.vux-tap-active {\n  tap-highlight-color: rgba(0, 0, 0, 0);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.vux-tap-active:active {\n  background-color: #ECECEC;\n}\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.41176471;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 100%;\n      -ms-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells__title {\n  margin-top: 0.77em;\n  margin-bottom: 0.3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: .3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.weui-cell:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n     -moz-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.weui-cell__bd {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n.vux-cell-box > div {\n  padding-right: 13px;\n}\n.vux-cell-primary {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.weui-cell.vux-cell-no-border-intent:before {\n  left: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 1014:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _router = __webpack_require__(931);

	exports.default = {
	  name: 'cell-box',
	  props: {
	    isLink: Boolean,
	    link: [String, Object],
	    borderIntent: {
	      type: Boolean,
	      default: true
	    }
	  },
	  methods: {
	    onClick: function onClick() {
	      this.link && (0, _router.go)(this.link, this.$router);
	    }
	  }
	  // </script>
	  //
	  // <style lang="less">
	  // @import '../../styles/variable.less';
	  // @import '../../styles/tap.less';
	  // @import '../../styles/weui/base/mixin/setArrow.less';
	  // @import '../../styles/weui/widget/weui_cell/weui_cell_global';
	  //
	  // .vux-cell-box > div {
	  //   padding-right: 13px;
	  // }
	  // .vux-cell-primary {
	  //   flex: 1;
	  // }
	  // .weui-cell.vux-cell-no-border-intent:before {
	  //   left: 0;
	  // }
	  // </style>

	}; // <template>
	//   <div class="vux-cell-box weui-cell" :class="{'vux-tap-active': isLink || !!link, 'weui-cell_access': isLink || !!link, 'vux-cell-no-border-intent': !borderIntent}" @click="onClick">
	//     <div><slot></slot></div>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 1015:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"vux-cell-box weui-cell\" :class=\"{'vux-tap-active': isLink || !!link, 'weui-cell_access': isLink || !!link, 'vux-cell-no-border-intent': !borderIntent}\" @click=\"onClick\">\n  <div><slot></slot></div>\n</div>\n";

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

/***/ 1479:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 1481:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by jianchep on 17/03/29.
	 */

	var social = __webpack_require__(1482);
	var manage = __webpack_require__(1518);
	var member = __webpack_require__(1535);

	const routes = [
	    {path: '/', redirect: '/social'},
	    {path: '/social', component: social},
	    {path: '/manage/:id', component: manage},
	    {path: "/member/:id", component: member},
	    {path: "/:default", redirect: "/social"}

	]

	const router = new VueRouter({
	    routes:routes
	})

	const app = new Vue({
	    router:router
	}).$mount('#social')



/***/ },

/***/ 1482:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1483)
	__webpack_require__(1485)
	__vue_script__ = __webpack_require__(1487)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/social/social.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1517)
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
	  var id = "_v-60c3a804/social.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1483:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1484);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./social.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./social.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1484:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.curcle-full{\n    display: inline-block;\n    width: 5px;\n    height: 5px;\n    background: #FF4A7D;\n    border-radius: 50%;\n    vertical-align: top;\n    margin-top: 5px;\n}\n#ulList li .right{\n    position: relative;\n}\n.ulList_recall{\n    position: absolute;\n    background: #000;\n    width: 62px;\n    height: 35px;\n    top: -55px;\n    left: 0;\n    color: #fff;\n    text-align: center;\n    line-height: 35px;\n    border-radius: 7px;\n}\n.ulList_recall_angle{\n    position: absolute;\n    top: -21px;\n    left: 21px;\n    border-right: 10px solid transparent;\n    border-left: 10px solid transparent;\n    border-top: 10px solid #000;\n}\n.ulList_recall_content{\n    display: none;\n}\n.TextMessageSpan{\n    -webkit-user-select: text;\n    -moz-user-select: text;\n     -ms-user-select: text;\n         user-select: text;\n}\n.mask_con_mask{\n    position: absolute;\n    top: 0;\n    width: 100%;\n    height: 160px;\n    z-index: 100;\n}\n", ""]);

	// exports


/***/ },

/***/ 1485:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1486);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-60c3a804&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./social.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-60c3a804&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./social.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1486:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "#socail_container[_v-60c3a804] {\n  width: 100%;\n  height: 100%; }\n", ""]);

	// exports


/***/ },

/***/ 1487:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _speak = __webpack_require__(1488);

	var _speak2 = _interopRequireDefault(_speak);

	var _social_title = __webpack_require__(1495);

	var _social_title2 = _interopRequireDefault(_social_title);

	var _switch = __webpack_require__(1498);

	var _switch2 = _interopRequireDefault(_switch);

	var _common = __webpack_require__(1505);

	var _common2 = _interopRequireDefault(_common);

	var _userCommon = __webpack_require__(1510);

	var _userCommon2 = _interopRequireDefault(_userCommon);

	var _common3 = __webpack_require__(96);

	var _common4 = _interopRequireDefault(_common3);

	var _layout = __webpack_require__(91);

	var _layout2 = _interopRequireDefault(_layout);

	var _dialog = __webpack_require__(969);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _webStorageCache = __webpack_require__(358);

	var _webStorageCache2 = _interopRequireDefault(_webStorageCache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div id='socail_container'>
	//         <social-title :rightshow="true" :id='communityId' :data='title'></social-title>
	//         <speak v-on:send="sendMsg"></speak>
	//         <social-switch :data='userCommonRoomData'  :total='total' v-on:usercomment="openUserComment"></social-switch>
	//         <common v-if='commonRoomData[0]' :id='communityId' :flag='updataflagteacher' :data='commonRoomData' v-on:getupdatateacher="getupdatateacher"></common>
	//         <user-common v-if='userCommonFlag' :user-common-top="userCommonTop" :getupdataflag="getupdataflag" :flag="userCommonFlag" :data='userCommonRoomData' v-on:closeusercomment="closeUserComment" v-on:getupdata="getupdata"></user-common>
	//     </div>
	// </template>
	//
	// <script>
	var axios = __webpack_require__(282);
	__webpack_require__(308).polyfill();

	var socialCache = new _webStorageCache2.default({ storage: 'sessionStorage' });
	exports.default = {
	    data: function data() {
	        return {
	            dialog1: 0,
	            dialog2: 0,
	            communityId: '0',
	            myName: '匿名',
	            myAvatar: '',
	            userid: '',
	            title: '',
	            //老师数据流
	            teachertime: 1,
	            commonRoomData: [],
	            commonRoomId: '',
	            updataflagteacher: true,
	            hashTeacher: {},
	            //评论区
	            userCommonRoomId: '',
	            userCommonRoomData: [],
	            userCommonFlag: false,
	            getupdataflag: true,
	            userCommonTop: -10,
	            hash: {},
	            time: 1,
	            //开关组件
	            total: 0,
	            defaultAvatar: "http://pic.davdian.com/free/default_head_icon_0419.png"

	        };
	    },
	    created: function created() {
	        this.init();
	    },

	    components: {
	        speak: _speak2.default,
	        socialTitle: _social_title2.default,
	        socialSwitch: _switch2.default,
	        common: _common2.default,
	        userCommon: _userCommon2.default
	    },
	    methods: {
	        //控制开关点击发言评论弹屏打开
	        init: function init() {
	            this.initbase();
	            if (localStorage.getItem('social_reload')) {
	                localStorage.removeItem('social_reload');
	                window.location.reload();
	            }

	            if (localStorage.getItem('equipment')) {
	                localStorage.removeItem('equipment');
	                window.history.back();
	            }
	            console.log('bate1123123123');
	            // this.initData()
	        },
	        closeUserComment: function closeUserComment(top) {
	            this.userCommonFlag = false;
	            this.userCommonTop = top;
	        },
	        trim: function trim(s) {
	            return this.trimRight(this.trimLeft(s));
	        },
	        trimLeft: function trimLeft(s) {
	            if (s == null) {
	                return "";
	            }
	            var whitespace = new String(" \t\n\r");
	            var str = new String(s);
	            if (whitespace.indexOf(str.charAt(0)) != -1) {
	                var j = 0,
	                    i = str.length;
	                while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
	                    j++;
	                }
	                str = str.substring(j, i);
	            }
	            return str;
	        },
	        trimRight: function trimRight(s) {
	            if (s == null) return "";
	            var whitespace = new String(" \t\n\r");
	            var str = new String(s);
	            if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
	                var i = str.length - 1;
	                while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
	                    i--;
	                }
	                str = str.substring(0, i + 1);
	            }
	            return str;
	        },
	        getupdatateacher: function getupdatateacher(flag) {
	            var that = this;
	            that.updataflagteacher = false;
	            var obj = { communityId: this.communityId, roomType: 1, time: that.teachertime, direction: 0 };
	            axios.post('/api/mg/community/group/message_list', _layout2.default.strSign('socialCommon1', obj)).then(function (respone) {
	                if (respone.data && respone.data.code == 0) {
	                    if (respone.data.data) {
	                        that.teachertime = respone.data.data.maxTime;
	                        // that.commonRoomData = respone.data.data.dataList.concat(that.commonRoomData)
	                        that.commonRoomData = that.sortTeacher(respone.data.data.dataList, that.commonRoomData);
	                        if (respone.data.data.dataList.length == respone.data.data.pageSize) {
	                            setTimeout(function () {
	                                that.updataflagteacher = true;
	                            }, 1000);
	                        }
	                    }
	                } else {
	                    if (respone.data) {
	                        _dialog2.default.alert('message_list code:' + respone.data.code);
	                    } else {
	                        _dialog2.default.alert('message_list接口无data');
	                    }
	                }
	            }).catch(function (error) {
	                console.log(error, 11111111);
	            });
	        },

	        getupdata: function getupdata(flag) {
	            var that = this;
	            that.getupdataflag = false;
	            var obj = { communityId: this.communityId, roomType: 0, time: that.time, direction: 0 };
	            axios.post('/api/mg/community/group/message_list', _layout2.default.strSign('socialCommon1', obj)).then(function (respone) {
	                if (respone.data && respone.data.code == 0) {
	                    if (respone.data.data) {
	                        that.time = respone.data.data.maxTime;
	                        // that.userCommonRoomData = respone.data.data.dataList.concat(that.userCommonRoomData)
	                        that.userCommonRoomData = that.sort(respone.data.data.dataList, that.userCommonRoomData);
	                        if (respone.data.data.dataList.length == respone.data.data.pageSize) {
	                            setTimeout(function () {
	                                that.getupdataflag = true;
	                            }, 1000);
	                        }
	                    }
	                } else {
	                    if (respone.data) {
	                        _dialog2.default.alert('message_list code:' + respone.data.code);
	                    } else {
	                        _dialog2.default.alert('message_list接口无data');
	                    }
	                }
	            }).catch(function (error) {
	                console.log(error, 11111111);
	            });
	        },
	        openUserComment: function openUserComment() {
	            this.userCommonFlag = true;
	        },

	        //基础信息获取
	        initbase: function initbase() {
	            var that = this;
	            // axios.post('/api/mg/community/group/enter',lay.strSign('socialUser', {userId:338819}))
	            axios.post('/api/mg/community/group/enter', _layout2.default.strSign('socialUser')).then(function (respone) {
	                if (respone.data && respone.data.code == 0) {
	                    if (respone.data.data) {
	                        //todo 判断role
	                        if (respone.data.data.role == 1) {
	                            //群主进入app
	                            _dialog2.default.alert("发现您是群主，请在app端进入社群", function () {
	                                window.history.go(-1);
	                            });
	                        } else if (respone.data.data.role == 3) {
	                            //群成员
	                            that.communityId = respone.data.data.communityId;
	                            that.initData();
	                        } else if (respone.data.data.role == 4) {
	                            //进入妈妈课堂
	                            window.location.replace(respone.data.data.location);
	                        }
	                    }
	                } else {
	                    if (respone.data) {
	                        _dialog2.default.alert('社群入口code:' + respone.data.code);
	                    } else {
	                        _dialog2.default.alert('社群入口无data');
	                    }
	                }
	            }).catch(function (error) {
	                _dialog2.default.alert('社群入口error:' + error);
	            });
	        },

	        //老师页信息获取
	        initChatTeacher: function initChatTeacher() {
	            var that = this;
	            var obj = { communityId: this.communityId, roomType: 1, time: that.teachertime, direction: 0 };
	            axios.post('/api/mg/community/group/message_list', _layout2.default.strSign('socialCommon1', obj)).then(function (respone) {
	                if (respone.data && respone.data.code == 0) {
	                    if (respone.data.data) {
	                        // that.commonRoomData = respone.data.data.dataList
	                        that.commonRoomData = that.sortTeacher(respone.data.data.dataList);
	                        that.teachertime = respone.data.data.maxTime;
	                    }
	                } else {
	                    if (respone.data) {
	                        _dialog2.default.alert('message_list code:' + respone.data.code);
	                    } else {
	                        _dialog2.default.alert('message_list无data');
	                    }
	                }
	            }).catch(function (error) {
	                console.log(error, 11111111);
	            });
	        },

	        //初始化数据
	        initData: function initData() {
	            var that = this;
	            axios.post('/api/mg/community/group/info', _layout2.default.strSign('socialCommon1', { communityId: this.communityId })).then(function (respone) {
	                if (respone.data && respone.data.code == 0) {
	                    if (respone.data.data) {
	                        var key = 'social_manage_' + respone.data.data.teacherRoomId.split('_')[respone.data.data.teacherRoomId.split('_').length - 1];
	                        socialCache.set(key, respone.data.data);
	                        that.commonRoomId = respone.data.data.teacherRoomId;
	                        that.userCommonRoomId = respone.data.data.discussRoomId;
	                        that.title = respone.data.data.communityTitle || '还没设置群昵称呦';
	                        that.initChatData();
	                        that.initRongyun();
	                        that.initChatTeacher();
	                    }
	                } else {
	                    if (respone.data) {
	                        _dialog2.default.alert('info code:' + respone.data.code);
	                    } else {
	                        _dialog2.default.alert('info接口无data');
	                    }
	                }
	            }).catch(function (error) {
	                _dialog2.default.alert('baseDataError:', error);
	            });
	        },

	        //评论区数组去重
	        sort: function sort(data, conData) {
	            var arr = [];
	            if (conData) {
	                for (var p in data) {
	                    if (!this.hash[data[p].uuid]) {
	                        this.hash[data[p].uuid] = true;
	                        arr.push(data[p]);
	                    }
	                }
	                return arr.concat(conData);
	            } else {
	                for (var _p in data) {
	                    if (!this.hash[data[_p].uuid]) {
	                        this.hash[data[_p].uuid] = true;
	                        arr.push(data[_p]);
	                    }
	                }
	                return arr;
	            }
	        },

	        //教师区数组去重
	        sortTeacher: function sortTeacher(data, conData) {
	            var arr = [];
	            if (conData) {
	                for (var p in data) {
	                    if (!this.hashTeacher[data[p].uuid]) {
	                        this.hashTeacher[data[p].uuid] = true;
	                        arr.push(data[p]);
	                    }
	                }
	                return arr.concat(conData);
	            } else {
	                for (var _p2 in data) {
	                    if (!this.hashTeacher[data[_p2].uuid]) {
	                        this.hashTeacher[data[_p2].uuid] = true;
	                        arr.push(data[_p2]);
	                    }
	                }
	                return arr;
	            }
	        },
	        initChatData: function initChatData() {
	            var that = this;
	            var obj = { communityId: this.communityId, roomType: 0, time: that.time, direction: 0 };
	            axios.post('/api/mg/community/group/message_list', _layout2.default.strSign('socialCommon1', obj)).then(function (respone) {
	                if (respone.data && respone.data.code == 0) {
	                    if (respone.data.data) {
	                        // that.userCommonRoomData = respone.data.data.dataList
	                        that.userCommonRoomData = that.sort(respone.data.data.dataList);
	                        that.time = respone.data.data.maxTime;
	                        that.total = respone.data.data.total;
	                    }
	                } else {
	                    if (respone.data) {
	                        _dialog2.default.alert('message_list code:' + respone.data.code);
	                    } else {
	                        _dialog2.default.alert('message_list无data');
	                    }
	                }
	            }).catch(function (error) {
	                console.log(error, 11111111);
	            });
	        },

	        //融云初始化
	        initRongyun: function initRongyun() {
	            var that = this;
	            var it = "n19jmcy59zr29";
	            if (location.href.indexOf("davdian.com") > -1) {
	                it = "bmdehs6pd42ks";
	            }
	            var tokenurl = "/api/live/getToken?format=json";
	            var status = 1; //直播状态
	            that.ryContent(it, tokenurl, status, that.commonRoomId, that.userCommonRoomId);
	        },

	        //容云加入房间方法
	        joinRoom: function joinRoom(roomId, messageCount) {
	            var that = this;
	            if (typeof roomId == 'number') {
	                roomId = roomId.toString();
	            }
	            RongIMClient.getInstance().joinChatRoom(roomId, messageCount, {
	                onSuccess: function onSuccess() {},
	                onError: function onError(error) {
	                    _dialog2.default.alert('评论信息加载错误');
	                }
	            });
	        },

	        //容云连接服务器方法
	        ryContent: function ryContent(it, tokenurl, status, roomId1, roomId2) {
	            var that = this;
	            if (status == 1) {
	                var _loadRongIMClient = function _loadRongIMClient(ref) {
	                    //ref参数有为1即true 否则为false
	                    var data = { refresh: ref ? 1 : 0 };
	                    if (sess_key != undefined) {
	                        data.sess_key = sess_key;
	                    }
	                    $.ajax({
	                        type: "post",
	                        url: tokenurl,
	                        data: data,
	                        dataType: "json",
	                        success: function success(result) {
	                            if (result.code == 0) {
	                                var token = result.data.token;
	                                that.myName = result.data.username;
	                                that.userid = result.data.userid;
	                                if (result.data && result.data.headImage) {
	                                    that.myAvatar = result.data.headImage;
	                                }
	                                if (sess_key == undefined) {
	                                    //种cookie
	                                    $.cookie("sess_key", result.sess_key);
	                                }
	                                RongIMClient.setConnectionStatusListener({
	                                    onChanged: function onChanged(status) {
	                                        switch (status) {
	                                            //链接成功
	                                            case RongIMLib.ConnectionStatus.CONNECTED:
	                                                console.log('连接成功');
	                                                break;
	                                            //正在链接
	                                            case RongIMLib.ConnectionStatus.CONNECTING:
	                                                console.log('正在连接');
	                                                break;
	                                            //重新链接
	                                            case RongIMLib.ConnectionStatus.DISCONNECTED:
	                                                _dialog2.default.alert('消息获取失败，请重试', function () {
	                                                    window.location.reload();
	                                                });
	                                                break;
	                                            //其他设备登陆
	                                            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
	                                                console.log('其他');
	                                                console.log(that.$router.history.current.fullPath);

	                                                _dialog2.default.alert('您的账号其他设备登陆了', function () {
	                                                    if (that.$router.history.current.fullPath != '/social') {
	                                                        localStorage.setItem('equipment', '1');
	                                                    }
	                                                    window.history.back();
	                                                    // if (localStorage.getItem('social_reload')){
	                                                    //     localStorage.removeItem('social_reload')
	                                                    //     window.history.go(-2)
	                                                    // } else {
	                                                    //     window.history.back()
	                                                    // }
	                                                });
	                                                break;
	                                            //网络不可用
	                                            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
	                                                console.log('网络不可用');
	                                                if (sessionStorage.getItem('socialManageFlag')) {
	                                                    sessionStorage.removeItem('socialManageFlag');
	                                                } else {
	                                                    _dialog2.default.alert('网络不可用', function () {
	                                                        if (localStorage.getItem('social_reload')) {
	                                                            localStorage.removeItem('social_reload');
	                                                            window.history.go(-2);
	                                                        } else {
	                                                            window.history.back();
	                                                        }
	                                                    });
	                                                }
	                                                break;
	                                        }
	                                    }
	                                });
	                                // 消息监听器
	                                RongIMClient.setOnReceiveMessageListener({
	                                    // 接收到的消息
	                                    onReceived: function onReceived(message) {
	                                        console.log('message->', message);

	                                        if (message.messageType != 'CommandMessage') {
	                                            if (JSON.stringify(JSON.parse(message.content.extra).info.uuid)) {
	                                                var _uuid = JSON.stringify(JSON.parse(message.content.extra).info.uuid);
	                                                if (that.hashTeacher[_uuid] || that.hash[_uuid]) {
	                                                    return;
	                                                }
	                                            }
	                                        }
	                                        if (message.messageType == "TextMessage") {
	                                            var content2 = message.content.content;
	                                            var content = message.content;
	                                            var time = message.receivedTime;
	                                            // var uuid = JSON.stringify(JSON.parse(message.content.extra).info.uuid);
	                                            var uuid = JSON.parse(message.content.extra).info.uuid;
	                                            if (message.content.user) {
	                                                var user = message.content.user;
	                                                var icon = user.portrait || user.icon;
	                                                var id = user.id;
	                                                var name = user.name;
	                                            } else {
	                                                var name = "路人";
	                                                var icon = that.defaultAvatar;
	                                            }
	                                            var isTel = that.isPhoneNum(name);
	                                            if (isTel) {
	                                                var myphone = name.substr(3, 4);
	                                                name = name.replace(myphone, "****");
	                                            }
	                                            var tempmsg = {
	                                                "isPlay": false,
	                                                "msg": {
	                                                    "content": content2,
	                                                    "time": time,
	                                                    "type": 0
	                                                },
	                                                "speaker": {
	                                                    "avatar": icon,
	                                                    "id": message.senderUserId,
	                                                    "name": name
	                                                },
	                                                "uuid": uuid
	                                            };
	                                            if (JSON.parse(message.content.extra).info.isTips == '1') {
	                                                tempmsg.isTips = true;
	                                            }
	                                            if (JSON.parse(message.content.extra).info.userAsk == "1") {
	                                                tempmsg.is_answer = true;
	                                            }
	                                            if (message.targetId == that.commonRoomId) {
	                                                if (that.hashTeacher[uuid]) {
	                                                    return;
	                                                }
	                                                that.commonRoomData.push(tempmsg);
	                                                that.hashTeacher[uuid] = true;
	                                            } else if (message.targetId == that.userCommonRoomId) {
	                                                if (that.hash[uuid]) {
	                                                    return;
	                                                }
	                                                that.userCommonRoomData.push(tempmsg);
	                                                that.total = that.total + 1;
	                                                that.hash[uuid] = true;
	                                            }
	                                        } else if (message.messageType == "ImageMessage") {
	                                            var base64Str = message.content.content;
	                                            var content = "data:image/png;base64," + base64Str;
	                                            var time = message.receivedTime;
	                                            // var uuid = JSON.stringify(JSON.parse(message.content.extra).info.uuid);
	                                            var uuid = JSON.parse(message.content.extra).info.uuid;
	                                            if (message.content.user) {
	                                                var user = message.content.user;
	                                                var icon = user.portrait || user.icon;
	                                                var id = user.id;
	                                                var name = user.name;
	                                            } else {
	                                                var name = "临时访客";
	                                                var icon = that.defaultAvatar;
	                                            }
	                                            var isTel = that.isPhoneNum(name);
	                                            if (isTel) {
	                                                var myphone = name.substr(3, 4);
	                                                name = name.replace(myphone, "****");
	                                            }
	                                            var tempmsg = {
	                                                "isPlay": false,
	                                                "msg": {
	                                                    // "url": content,
	                                                    "url": message.content.imageUri,
	                                                    "time": time,
	                                                    "type": 1
	                                                },
	                                                "speaker": {
	                                                    "avatar": icon,
	                                                    "id": message.senderUserId,
	                                                    "name": name
	                                                },
	                                                "uuid": uuid,
	                                                "imageInfo": JSON.parse(message.content.extra).info.imageInfo
	                                            };
	                                            if (that.hashTeacher[uuid]) {
	                                                return;
	                                            }
	                                            that.commonRoomData.push(tempmsg);
	                                            that.hashTeacher[uuid] = true;
	                                        } else if (message.messageType == "VoiceMessage") {} else if (message.messageType == "CommandMessage") {
	                                            if (message.content.name == 'RC_DAV_COURSE_VOICE_TO_H5' && message.targetId == that.commonRoomId) {
	                                                var COURSE_VOICE = JSON.parse(message.content.data.content);
	                                                var extra = JSON.parse(COURSE_VOICE.extra);
	                                                var _name = COURSE_VOICE.user.name;
	                                                var isTel = that.isPhoneNum(_name);
	                                                if (isTel) {
	                                                    var myphone = _name.substr(3, 4);
	                                                    _name = _name.replace(myphone, "****");
	                                                }
	                                                var tempmsg = {
	                                                    "isPlay": false,
	                                                    "msg": {
	                                                        "url": COURSE_VOICE.content,
	                                                        "time": message.receivedTime,
	                                                        "type": 91,
	                                                        "duration": COURSE_VOICE.duration,
	                                                        "voicewidth": (COURSE_VOICE.duration + 65) * 2 > 200 ? 200 : (COURSE_VOICE.duration + 65) * 2
	                                                    },
	                                                    "speaker": {
	                                                        "avatar": COURSE_VOICE.user.icon,
	                                                        "id": COURSE_VOICE.user.senderUserId,
	                                                        "name": _name
	                                                    },
	                                                    "uuid": extra.info.uuid
	                                                };
	                                                if (that.hashTeacher[extra.info.uuid]) {
	                                                    return;
	                                                }
	                                                that.commonRoomData.push(tempmsg);
	                                                that.hashTeacher[extra.info.uuid] = true;
	                                            } else if (message.content.name == 'RC_DVK_DELETECLASS') {
	                                                _dialog2.default.alert('直播间已被删除', function () {
	                                                    window.history.go(-1);
	                                                });
	                                            }
	                                        }
	                                    },
	                                    default: function _default() {
	                                        _dialog2.default.alert('消息加载错误');
	                                    }
	                                });
	                                RongIMClient.connect(token, {
	                                    onSuccess: function onSuccess(userId) {
	                                        console.log(that.commonRoomId, 'hahahahhahahah1');
	                                        that.joinRoom(that.commonRoomId, 10);
	                                        console.log(that.userCommonRoomId, 'hahahhahah');
	                                        that.joinRoom(that.userCommonRoomId, 10);
	                                    },
	                                    onTokenIncorrect: function onTokenIncorrect() {
	                                        if (!ref) {
	                                            _loadRongIMClient(true);
	                                        }
	                                    },
	                                    onError: function onError(errorCode) {
	                                        var info = '';
	                                        switch (errorCode) {
	                                            case RongIMLib.ErrorCode.TIMEOUT:
	                                                info = '超时';
	                                                break;
	                                            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
	                                                info = '未知错误';
	                                                break;
	                                            case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
	                                                info = '不可接受的协议版本';
	                                                break;
	                                            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
	                                                info = 'appkey不正确';
	                                                break;
	                                            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
	                                                info = '服务器不可用';
	                                                break;
	                                        }
	                                        // log(errorCode);
	                                    }
	                                });
	                            } else {
	                                // code 105
	                                _dialog2.default.alert('tokenCode=' + result.code, function () {
	                                    window.location.reload();
	                                });
	                            }
	                        },
	                        error: function error(e, msg, data) {}
	                    });
	                };

	                // 融云收取信息
	                try {
	                    RongIMClient.init(it);
	                    // RongIMLib.RongIMVoice.init();
	                    RongIMLib.RongIMEmoji.init();
	                } catch (e) {
	                    // log(e)
	                    console.log(e);
	                    _dialog2.default.alert('实时接口异常，请重试', function () {
	                        window.location.reload();
	                    });
	                }

	                var sess_key = _common4.default.getDvdsid();
	                // 调用
	                _loadRongIMClient(false);
	            }
	        },

	        isPhoneNum: function isPhoneNum(s) {
	            var patrn = /^((110)|(13[0-9])|(14[5-7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
	            if (!patrn.exec(s)) return false;
	            return true;
	        },
	        sendMsg: function sendMsg(msg) {
	            this.sentMessage(this.trim(msg));
	        },
	        sentMessage: function sentMessage(message) {
	            if (!message) {
	                _dialog2.default.alert('发送消息不能为空');
	                return;
	            }
	            var that = this;
	            var isTel = that.isPhoneNum(that.myName);
	            if (isTel) {
	                var myphone = that.myName.substr(3, 4);
	                that.myName = that.myName.replace(myphone, "****");
	            }
	            var msg = new RongIMLib.TextMessage({
	                content: encodeURIComponent(message),
	                extra: JSON.stringify({
	                    info: {
	                        uuid: _common4.default.md5(Date.now() + "" + _common4.default.getUid() + "" + Math.floor((Math.random() + 1) * 100000000)),
	                        userAsk: 0, //0：不是用户提问，1：是用户提问
	                        messageType: 0, //0：代表讨论消息，1：代表直播间消息
	                        // courseId: that.courseId,
	                        courseId: that.communityId,
	                        time: new Date().getTime()
	                    }
	                }),
	                user: {
	                    icon: that.myAvatar,
	                    id: that.userid,
	                    name: encodeURIComponent(that.myName)
	                }
	            });
	            //评论聊天室
	            var commonchatRoomId = that.userCommonRoomId; // 聊天室 Id。
	            var conversationtype = RongIMLib.ConversationType.CHATROOM;
	            var count = 10; // 拉取最近聊天最多 50 条。
	            RongIMClient.getInstance().sendMessage(conversationtype, commonchatRoomId, msg, {
	                onSuccess: function onSuccess(message) {
	                    that.total = that.total + 1;
	                    var content = message.content.content;
	                    var time = message.sentTime;
	                    if (message.content.user) {
	                        var user = message.content.user;
	                        var icon = user.icon;
	                        var id = user.id;
	                        var name = user.name;
	                    } else {
	                        var name = that.myName;
	                        var icon = that.myAvatar;
	                    }
	                    var isTel = that.isPhoneNum(name);
	                    if (isTel) {
	                        var myphone = name.substr(3, 4);
	                        name = name.replace(myphone, "****");
	                    }
	                    var tempmsg = {
	                        "msg": {
	                            "content": content,
	                            "time": time,
	                            "type": 0
	                        },
	                        "speaker": {
	                            "avatar": icon,
	                            "id": message.senderUserId,
	                            "name": name
	                        },
	                        "uuid": ""
	                    };
	                    that.userCommonRoomData.push(tempmsg);
	                },
	                onError: function onError(errorCode, message) {
	                    var info = '';
	                    switch (errorCode) {
	                        case RongIMLib.ErrorCode.TIMEOUT:
	                            info = '超时';
	                            break;
	                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
	                            info = '未知错误';
	                            break;
	                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
	                            info = '在黑名单中，无法向对方发送消息';
	                            break;
	                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
	                            info = '不在讨论组中';
	                            break;
	                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
	                            info = '不在群组中';
	                            break;
	                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
	                            info = '不在聊天室中';
	                            break;
	                        default:
	                            info = "error";
	                            break;
	                    }
	                    _dialog2.default.alert(info);
	                    console.log('发送错误:' + info);
	                }
	            });
	        }
	    }
	    // </script>
	    // <!-- 组建内改变全局css样式 -->
	    // <style>
	    //     .curcle-full{
	    //         display: inline-block;
	    //         width: 5px;
	    //         height: 5px;
	    //         background: #FF4A7D;
	    //         border-radius: 50%;
	    //         vertical-align: top;
	    //         margin-top: 5px;
	    //     }
	    //     #ulList li .right{
	    //         position: relative;
	    //     }
	    //     .ulList_recall{
	    //         position: absolute;
	    //         background: #000;
	    //         width: 62px;
	    //         height: 35px;
	    //         top: -55px;
	    //         left: 0;
	    //         color: #fff;
	    //         text-align: center;
	    //         line-height: 35px;
	    //         border-radius: 7px;
	    //     }
	    //     .ulList_recall_angle{
	    //         position: absolute;
	    //         top: -21px;
	    //         left: 21px;
	    //         border-right: 10px solid transparent;
	    //         border-left: 10px solid transparent;
	    //         border-top: 10px solid #000;
	    //     }
	    //     .ulList_recall_content{
	    //         display: none;
	    //     }
	    //     .TextMessageSpan{
	    //         -webkit-user-select: text;
	    //         user-select: text;
	    //     }
	    //     .mask_con_mask{
	    //         position: absolute;
	    //         top: 0;
	    //         width: 100%;
	    //         height: 160px;
	    //         z-index: 100;
	    //     }
	    // </style>
	    // <!-- 组建内部css样式，不会改变全局样式 -->
	    // <style lang='sass' scoped>
	    //     #socail_container{
	    //         width: 100%;
	    //         height: 100%;
	    //     }
	    // </style>

	};

/***/ },

/***/ 1488:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1489)
	__webpack_require__(1491)
	__vue_script__ = __webpack_require__(1493)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/social/component/speak.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1494)
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
	  var id = "_v-39839a7f/speak.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1489:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1490);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./speak.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./speak.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1490:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },

/***/ 1491:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1492);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-39839a7f&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./speak.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-39839a7f&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./speak.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1492:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * lib中map使用“_”开头，本文件中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * 本文件中map使用\"_\"开头，extra中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * 合并base和extra中的同类base map\r\n * 用以解决业务方升级Yo时需比base和extra的一致性\r\n * 当extra为空时，base map将以base文件里的定义作为默认值\r\n * 当extra不为空时，base map使用extra文件里的定义\r\n */\n/**\n * Yo框架全局Variables\n * Yo基础变量map，如果不想定义某属性，将其value设置为null；\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\n * variables中map使用“_”开头，本文件中不使用\"_\"\n * variables ⇌ config\n */\n/**\r\n * Yo框架全局Variables\r\n * Yo基础变量map，如果不想定义某属性，将其value设置为null\r\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\r\n * 本文件中map使用\"_\"开头，config中不使用\"_\"\r\n * variables ⇌ config\r\n */\n/**\r\n * 合并variables和config中的同类map\r\n * 用以解决业务方升级Yo时需比config和variables的一致性\r\n * 当config为空时，使用variables中的map作为默认值\r\n * 当config不为空时，使用config中的定义\r\n */\n/**\r\n * Yo框架自定义全局函数\r\n * 扩充Sass默认函数库，用以增强语法\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的第一项\r\n * @function first\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的最后一项\r\n * @function last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的倒数第几项\r\n * @function nth-last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要返回的值在list中的倒数位置 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 移除SassList中的某个项目并返回新的List\r\n * @function remove\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {String} $value 指定需要被删除的值 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 截取SassList中的某个部分并返回新的List\r\n * @function slice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $start 指定需要截取的开始下标 <2.1.0>\r\n * @param {Integer} $end 指定需要截取的结束下标（不包括end），当该值缺省时默认为末尾下标 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 从SassList中添加/删除项目，然后返回新的List。\r\n * @function splice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要移除的开始下标 <2.1.0>\r\n * @param {Integer} $count 指定需要移除的数量，不可以为负值，0表示不移除 <2.1.0>\r\n * @param {String} $values 指定需要添加的新值（可以是多个），如果该值缺省，则表示只移除不添加新值 <2.1.0>\r\n */\n/**\r\n * Yo框架全局基础方法\r\n * 包括响应式方案，CSS3兼容性方案，厂商前缀方案，iconfont方案，flex布局等全局方法\r\n */\n/**\r\n * @module 功能\r\n * @description 给需要的属性加厂家前缀\r\n * @method _prefix\r\n * @version 1.0.0\r\n * @param {String} $property 指定属性 <1.0.0>\r\n * @param {String} $value 指定属性值 <1.0.0>\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 定义字体图标\r\n * @method _yofont\r\n * @version 1.0.0\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 四则运算(iOS6.0+,Android4.4+)\r\n * @method calc\r\n * @version 1.7.0\r\n * @param {String} $property 指定需要进行计算的CSS属性 <1.7.0>\r\n * @param {String} $value 与原生CSS语法一致，区别在于需要使用引号包裹表达式 <1.7.0>\r\n * @example <div class=\"calc\">四则运算</div>\r\n * .calc { @include calc(width, \"100% - 100px\"); }\r\n */\n/**\r\n * @module 功能\r\n * @description 定义响应式方案\r\n * @method responsive\r\n * @version 1.0.0\r\n * @param {String} $media 指定媒体查询条件，取值为`config`文件map `media-types`中的值 <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除浮动方案\r\n * @method clearfix\r\n * @version 1.0.0\r\n * @param {String} $type 指定清除浮动的方式，包括：pseudo-element | bfc，默认值：pseudo-element <1.8.5>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除行内级元素间间隙方案\r\n * @method killspace\r\n * @version 1.0.0\r\n * @param {Length} $font-size 指定子元素字号，默认值：.14rem <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <span class=\"item\">1</span>\r\n *      <span class=\"item\">2</span>\r\n *      <span class=\"item\">3</span>\r\n * </div>\r\n * .demo {@include killspace;}\r\n */\n/**\r\n * @module 功能\r\n * @description 元素在包含块中的对齐方式，默认为水平垂直对齐\r\n * @method align\r\n * @version 2.0.0\r\n * @param {String} $flexbox 指定包含块布局方式，可选值：flex | inline-flex，默认值：flex <2.0.0>\r\n * @param {String} $type 指定居中元素类型，可选值：image | text | other，默认值：text <2.0.0>\r\n * @param {Keywords} $justify-content 指定元素水平对齐方式，取值与`justify-content`属性一致，默认值：center <2.0.0>\r\n * @param {Keywords} $align-items 指定元素垂直对齐方式，取值与`align-items`属性一致，默认值：center <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <img class=\"item\" alt=\"未知尺寸图片居中\" />\r\n * </div>\r\n * .demo {@include align;}\r\n */\n/**\r\n * @module 功能\r\n * @description 定义文档根节点是否允许滚动\r\n * @method root-scroll\r\n * @version 1.4.0\r\n * @param {Boolean} $is-scroll 指定是否有滚动，默认值：false <1.8.6>\r\n */\n/**\r\n * @module 功能\r\n * @description 定义是否有滚动条\r\n * @method overflow\r\n * @version 1.0.0\r\n * @param {String} $overflow 取值与最新原生语法一致，默认值：auto <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 生成全屏方法\r\n * @method fullscreen\r\n * @version 1.7.0\r\n * @param {Integer} $z-index 指定层叠级别 <1.7.0>\r\n * @param {Keywords} $position 指定定位方式，取除`static | relative`之外的值，默认值：absolute <1.8.5>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义使用何种滤镜\r\n * @method filter\r\n * @version 1.7.0\r\n * @param {String} $filter 取值与`filter`属性一致 <1.7.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义UA默认外观\r\n * @method appearance\r\n * @version 1.0.0\r\n * @param {String} $appearance 取值与`appearance`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义如何选中内容\r\n * @method user-select\r\n * @version 1.0.0\r\n * @param {String} $user-select 取值与`user-select`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义盒模型\r\n * @method box-sizing\r\n * @version 1.0.0\r\n * @param {String} $box-sizing 指定盒模型类型，取值与`box-sizing`属性一致，默认值：border-box <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义渐变色值\r\n * @method gradient\r\n * @version 1.0.0\r\n * @param {String} $type 指定渐变的4种类型：linear, repeating-linear, radial, repeating-radial <1.0.0>\r\n * @param {String} $dir 指定渐变方向，可选值：[left | right] || [top | bottom] | angle <2.0.0>\r\n * @param {String} $gradient 指定渐变取值，与w3c最新原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景图像缩放（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-size\r\n * @version 1.4.0\r\n * @param {Keywords | Length} $background-size 指定背景图缩放值，取值与`background-size`属性一致 <1.4.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景裁减（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-clip\r\n * @version 1.6.0\r\n * @param {Keywords} $background-clip 指定背景图缩放值，取值与`background-clip`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景显示区域（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-origin\r\n * @version 1.6.0\r\n * @param {Keywords} $background-origin 指定背景图`background-position`属性计算相对的参考点，取值与`background-origin`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义圆角，用于修复某些安卓机型上“圆角+边框+背景”，背景溢出的情况\r\n * @method border-radius\r\n * @version 1.6.0\r\n * @param {Length} $border-radius 指定元素的圆角半径，取值与`border-radius`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 为元素添加边框（包括1px边框）\r\n * @method border\r\n * @version 2.0.0\r\n * @param {String} $border-width 指定边框厚度（单位为px），默认值：1px，取值与`border-width`属性一致，不同方向代表边框位置 <2.0.0>\r\n * @param {String} $border-color 指定边框颜色 <2.0.0>\r\n * @param {String} $border-style 指定边框样式 <2.0.0>\r\n * @param {String} $radius 指定边框圆角半径，默认值：null <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义简单变换\r\n * @method transform\r\n * @version 1.0.0\r\n * @param {String} $transform 取值范围与`transform`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义变换原点\r\n * @method transform-origin\r\n * @version 1.0.0\r\n * @param {Length | Percentage | Keywords} $transform-origin 取值范围与`transform-origin`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定某元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化\r\n * @method transform-style\r\n * @version 2.0.0\r\n * @param {String} $transform-style 取值范围与`transform-style`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生透视效果。「z>0」的三维元素比正常大，而「z<0」时则比正常小，大小程度由该属性的值决定。\r\n * @method perspective\r\n * @version 2.0.0\r\n * @param {none | Length} $perspective 取值范围与`perspective`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定透视点的位置\r\n * @method perspective-origin\r\n * @version 2.0.0\r\n * @param {Length | Percentage | Keywords} $perspective-origin 取值范围与`perspective-origin`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定元素背面面向用户时是否可见\r\n * @method backface-visibility\r\n * @version 2.0.0\r\n * @param {Keywords} $backface-visibility 取值范围与`backface-visibility`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 定义动画\r\n * @method animation\r\n * @version 1.0.0\r\n * @param {String} $animation 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定需要引用的动画名称\r\n * @method animation-name\r\n * @version 3.0.0\r\n * @param {String} $animation-name 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行一次所持续的时长\r\n * @method animation-duration\r\n * @version 3.0.0\r\n * @param {String} $animation-duration 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行方式\r\n * @method animation-timing-function\r\n * @version 3.0.0\r\n * @param {String} $animation-timing-function 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画延迟多久之后再开始\r\n * @method animation-delay\r\n * @version 3.0.0\r\n * @param {String} $animation-delay 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画循环几次\r\n * @method animation-iteration-count\r\n * @version 3.0.0\r\n * @param {String} $animation-iteration-count 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动方向\r\n * @method animation-direction\r\n * @version 3.0.0\r\n * @param {String} $animation-direction 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动状态\r\n * @method animation-play-state\r\n * @version 3.0.0\r\n * @param {String} $animation-play-state 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画时间之外的状态\r\n * @method animation-fill-mode\r\n * @version 3.0.0\r\n * @param {String} $animation-fill-mode 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Transition\r\n * @description 定义补间\r\n * @method transition\r\n * @version 1.0.0\r\n * @param {String} $transition 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义显示类型为伸缩盒\r\n * @method flexbox\r\n * @version 1.0.0\r\n * @param {String} $flexbox 默认值：flex，可选值：flex | inline-flex <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素如何分配空间\r\n * @method flex\r\n * @version 1.0.0\r\n * @param {Number} $flex 取值与`flex`属性一致，默认值：1 <1.0.0>\r\n * @param {String} $direction 默认值: row，可选值：row | column <1.5.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的排版顺序\r\n * @method order\r\n * @version 1.0.0\r\n * @param {Integer} $order 取值与`order`属性一致，默认值：1 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素流动方向及遇见边界时是否换行(iOS7.0+,Android4.4+)\r\n * @method flex-flow\r\n * @version 2.0.0\r\n * @param {String} $flex-flow 取值与`flex-flow`属性一致，默认值：row nowrap <2.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的流动方向\r\n * @method flex-direction\r\n * @version 1.0.0\r\n * @param {String} $flex-direction 取值与`flex-direction`属性一致，默认值：row <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素溢出后排版(iOS7.0+,Android4.4+)\r\n * @method flex-wrap\r\n * @version 1.0.0\r\n * @param {String} $flex-wrap 取值与`flex-wrap`属性一致，默认值：nowrap <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器主轴对齐方式(其中`space-around`值需要iOS7.0+,Android4.4+)\r\n * @method justify-content\r\n * @version 1.0.0\r\n * @param {String} $justify-content 取值与`justify-content`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义多行弹性容器侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-content\r\n * @version 1.8.5\r\n * @param {String} $align-content 取值与`align-content`属性一致，默认值：center <1.8.5>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义单行弹性容器侧轴对齐方式\r\n * @method align-items\r\n * @version 1.0.0\r\n * @param {String} $align-items 取值与`align-items`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器中子元素自身的在侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-self\r\n * @version 1.0.0\r\n * @param {String} $align-self 取值与`align-self`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成矩形方法\r\n * @method rect\r\n * @version 1.0.0\r\n * @param {Length} $width 定义矩形的长度 <1.0.0>\r\n * @param {Length} $height 定义矩形的高度 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成正方形方法\r\n * @method square\r\n * @version 1.0.0\r\n * @param {Length} $size 定义正方形的边长 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成圆形方法\r\n * @method circle\r\n * @version 1.0.0\r\n * @param {Length} $size 定义圆的半径长度 <1.0.0>\r\n * @param {Length} $radius 定义圆的圆角半径长度 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 链接处理方法\r\n * @method link\r\n * @version 1.0.0\r\n * @param {Color} $color 定义链接颜色 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 文本碰到边界是否换行\r\n * @method wrap\r\n * @version 1.0.0\r\n * @param {Boolean} $is-wrap 定义文本是否换行，默认值：true <2.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 单行文本溢出时显示省略号\r\n * @method ellipsis\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n * @param {Integer} $line-clamp 定义需要显示的行数，默认值：1（即使用单行溢出的处理方案），需要注意的是本参数只支持webkit内核 <2.1.2>\r\n */\n/**\r\n * @module 文本\r\n * @description 文字隐藏方案\r\n * @method texthide\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n */\n/**\r\n * Yo框架全局Reset\r\n * Yo重置Mobile及高级浏览器上常见的差异\r\n */\n*[_v-39839a7f],[_v-39839a7f]\n::before,[_v-39839a7f]\n::after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent; }\n\nhtml[_v-39839a7f],\nbody[_v-39839a7f] {\n  overflow: hidden;\n  height: 100%; }\n\n[_v-39839a7f]::-webkit-scrollbar {\n  display: none; }\n\nhtml[_v-39839a7f] {\n  background-color: #eee;\n  color: #212121;\n  font-size: 100px;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n   -ms-user-select: text;\n       user-select: text; }\n\nbody[_v-39839a7f] {\n  margin: 0;\n  font-size: 0.14em;\n  line-height: 1.5;\n  font-family: Helvetica Neue, Helvetica, STHeiTi, sans-serif; }\n\nul[_v-39839a7f],\nol[_v-39839a7f],\ndl[_v-39839a7f],\ndd[_v-39839a7f],\nh1[_v-39839a7f],\nh2[_v-39839a7f],\nh3[_v-39839a7f],\nh4[_v-39839a7f],\nh5[_v-39839a7f],\nh6[_v-39839a7f],\nfigure[_v-39839a7f],\nform[_v-39839a7f],\nfieldset[_v-39839a7f],\nlegend[_v-39839a7f],\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\np[_v-39839a7f],\nblockquote[_v-39839a7f],\nth[_v-39839a7f],\ntd[_v-39839a7f],\npre[_v-39839a7f],\nxmp[_v-39839a7f] {\n  margin: 0;\n  padding: 0; }\n\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\nselect[_v-39839a7f],\npre[_v-39839a7f],\nxmp[_v-39839a7f],\ntt[_v-39839a7f],\ncode[_v-39839a7f],\nkbd[_v-39839a7f],\nsamp[_v-39839a7f] {\n  line-height: inherit;\n  font-family: inherit; }\n\nh1[_v-39839a7f],\nh2[_v-39839a7f],\nh3[_v-39839a7f],\nh4[_v-39839a7f],\nh5[_v-39839a7f],\nh6[_v-39839a7f],\nsmall[_v-39839a7f],\nbig[_v-39839a7f],\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\nselect[_v-39839a7f] {\n  font-size: inherit; }\n\naddress[_v-39839a7f],\ncite[_v-39839a7f],\ndfn[_v-39839a7f],\nem[_v-39839a7f],\ni[_v-39839a7f],\noptgroup[_v-39839a7f],\nvar[_v-39839a7f] {\n  font-style: normal; }\n\ntable[_v-39839a7f] {\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n  text-align: left; }\n\nul[_v-39839a7f],\nol[_v-39839a7f],\nmenu[_v-39839a7f] {\n  list-style: none; }\n\nfieldset[_v-39839a7f],\nimg[_v-39839a7f] {\n  border: 0;\n  vertical-align: middle; }\n\narticle[_v-39839a7f],\naside[_v-39839a7f],\ndetails[_v-39839a7f],\nfigcaption[_v-39839a7f],\nfigure[_v-39839a7f],\nfooter[_v-39839a7f],\nheader[_v-39839a7f],\nmain[_v-39839a7f],\nmenu[_v-39839a7f],\nnav[_v-39839a7f],\nsection[_v-39839a7f],\nsummary[_v-39839a7f] {\n  display: block; }\n\naudio[_v-39839a7f],\ncanvas[_v-39839a7f],\nvideo[_v-39839a7f] {\n  display: inline-block; }\n\nblockquote[_v-39839a7f]:before,\nblockquote[_v-39839a7f]:after,\nq[_v-39839a7f]:before,\nq[_v-39839a7f]:after {\n  content: \" \"; }\n\ntextarea[_v-39839a7f],\npre[_v-39839a7f],\nxmp[_v-39839a7f] {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n\ntextarea[_v-39839a7f] {\n  resize: vertical; }\n\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\nselect\na[_v-39839a7f] {\n  outline: 0 none; }\n\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\nselect[_v-39839a7f] {\n  color: inherit; }\n  input[_v-39839a7f]:disabled,\n  textarea[_v-39839a7f]:disabled,\n  button[_v-39839a7f]:disabled,\n  select[_v-39839a7f]:disabled {\n    opacity: 1; }\n\nbutton[_v-39839a7f]::-moz-focus-inner,\ninput[_v-39839a7f]::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\ninput[type=\"button\"][_v-39839a7f],\ninput[type=\"submit\"][_v-39839a7f],\ninput[type=\"reset\"][_v-39839a7f],\ninput[type=\"file\"][_v-39839a7f]::-webkit-file-upload-button,\ninput[type=\"search\"][_v-39839a7f]::-webkit-search-cancel-button {\n  -webkit-appearance: none;\n  appearance: none; }\n\nmark[_v-39839a7f] {\n  background-color: transparent; }\n\na[_v-39839a7f],\nins[_v-39839a7f],\ns[_v-39839a7f],\nu[_v-39839a7f],\ndel[_v-39839a7f] {\n  text-decoration: none; }\n\na[_v-39839a7f] {\n  color: #00afc7; }\n\n.g-clear[_v-39839a7f]::after,\n.g-mod[_v-39839a7f]::after {\n  display: block;\n  overflow: hidden;\n  clear: both;\n  height: 0;\n  content: \" \"; }\n\n@font-face {\n  font-family: yofont;\n  src: url(//ss.qunarzz.com/yo/font/1.0.3/yofont.woff) format(\"woff\"), url(//ss.qunarzz.com/yo/font/1.0.3/yofont.ttf) format(\"truetype\"); }\n\n.yo-ico[_v-39839a7f] {\n  font-family: yofont !important;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  vertical-align: middle; }\n\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * lib中map使用“_”开头，本文件中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * 本文件中map使用\"_\"开头，extra中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * 合并base和extra中的同类base map\r\n * 用以解决业务方升级Yo时需比base和extra的一致性\r\n * 当extra为空时，base map将以base文件里的定义作为默认值\r\n * 当extra不为空时，base map使用extra文件里的定义\r\n */\n/**\n * Yo框架全局Variables\n * Yo基础变量map，如果不想定义某属性，将其value设置为null；\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\n * variables中map使用“_”开头，本文件中不使用\"_\"\n * variables ⇌ config\n */\n/**\r\n * Yo框架全局Variables\r\n * Yo基础变量map，如果不想定义某属性，将其value设置为null\r\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\r\n * 本文件中map使用\"_\"开头，config中不使用\"_\"\r\n * variables ⇌ config\r\n */\n/**\r\n * 合并variables和config中的同类map\r\n * 用以解决业务方升级Yo时需比config和variables的一致性\r\n * 当config为空时，使用variables中的map作为默认值\r\n * 当config不为空时，使用config中的定义\r\n */\n/**\r\n * Yo框架自定义全局函数\r\n * 扩充Sass默认函数库，用以增强语法\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的第一项\r\n * @function first\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的最后一项\r\n * @function last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的倒数第几项\r\n * @function nth-last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要返回的值在list中的倒数位置 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 移除SassList中的某个项目并返回新的List\r\n * @function remove\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {String} $value 指定需要被删除的值 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 截取SassList中的某个部分并返回新的List\r\n * @function slice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $start 指定需要截取的开始下标 <2.1.0>\r\n * @param {Integer} $end 指定需要截取的结束下标（不包括end），当该值缺省时默认为末尾下标 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 从SassList中添加/删除项目，然后返回新的List。\r\n * @function splice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要移除的开始下标 <2.1.0>\r\n * @param {Integer} $count 指定需要移除的数量，不可以为负值，0表示不移除 <2.1.0>\r\n * @param {String} $values 指定需要添加的新值（可以是多个），如果该值缺省，则表示只移除不添加新值 <2.1.0>\r\n */\n/**\r\n * Yo框架全局基础方法\r\n * 包括响应式方案，CSS3兼容性方案，厂商前缀方案，iconfont方案，flex布局等全局方法\r\n */\n/**\r\n * @module 功能\r\n * @description 给需要的属性加厂家前缀\r\n * @method _prefix\r\n * @version 1.0.0\r\n * @param {String} $property 指定属性 <1.0.0>\r\n * @param {String} $value 指定属性值 <1.0.0>\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 定义字体图标\r\n * @method _yofont\r\n * @version 1.0.0\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 四则运算(iOS6.0+,Android4.4+)\r\n * @method calc\r\n * @version 1.7.0\r\n * @param {String} $property 指定需要进行计算的CSS属性 <1.7.0>\r\n * @param {String} $value 与原生CSS语法一致，区别在于需要使用引号包裹表达式 <1.7.0>\r\n * @example <div class=\"calc\">四则运算</div>\r\n * .calc { @include calc(width, \"100% - 100px\"); }\r\n */\n/**\r\n * @module 功能\r\n * @description 定义响应式方案\r\n * @method responsive\r\n * @version 1.0.0\r\n * @param {String} $media 指定媒体查询条件，取值为`config`文件map `media-types`中的值 <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除浮动方案\r\n * @method clearfix\r\n * @version 1.0.0\r\n * @param {String} $type 指定清除浮动的方式，包括：pseudo-element | bfc，默认值：pseudo-element <1.8.5>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除行内级元素间间隙方案\r\n * @method killspace\r\n * @version 1.0.0\r\n * @param {Length} $font-size 指定子元素字号，默认值：.14rem <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <span class=\"item\">1</span>\r\n *      <span class=\"item\">2</span>\r\n *      <span class=\"item\">3</span>\r\n * </div>\r\n * .demo {@include killspace;}\r\n */\n/**\r\n * @module 功能\r\n * @description 元素在包含块中的对齐方式，默认为水平垂直对齐\r\n * @method align\r\n * @version 2.0.0\r\n * @param {String} $flexbox 指定包含块布局方式，可选值：flex | inline-flex，默认值：flex <2.0.0>\r\n * @param {String} $type 指定居中元素类型，可选值：image | text | other，默认值：text <2.0.0>\r\n * @param {Keywords} $justify-content 指定元素水平对齐方式，取值与`justify-content`属性一致，默认值：center <2.0.0>\r\n * @param {Keywords} $align-items 指定元素垂直对齐方式，取值与`align-items`属性一致，默认值：center <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <img class=\"item\" alt=\"未知尺寸图片居中\" />\r\n * </div>\r\n * .demo {@include align;}\r\n */\n/**\r\n * @module 功能\r\n * @description 定义文档根节点是否允许滚动\r\n * @method root-scroll\r\n * @version 1.4.0\r\n * @param {Boolean} $is-scroll 指定是否有滚动，默认值：false <1.8.6>\r\n */\n/**\r\n * @module 功能\r\n * @description 定义是否有滚动条\r\n * @method overflow\r\n * @version 1.0.0\r\n * @param {String} $overflow 取值与最新原生语法一致，默认值：auto <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 生成全屏方法\r\n * @method fullscreen\r\n * @version 1.7.0\r\n * @param {Integer} $z-index 指定层叠级别 <1.7.0>\r\n * @param {Keywords} $position 指定定位方式，取除`static | relative`之外的值，默认值：absolute <1.8.5>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义使用何种滤镜\r\n * @method filter\r\n * @version 1.7.0\r\n * @param {String} $filter 取值与`filter`属性一致 <1.7.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义UA默认外观\r\n * @method appearance\r\n * @version 1.0.0\r\n * @param {String} $appearance 取值与`appearance`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义如何选中内容\r\n * @method user-select\r\n * @version 1.0.0\r\n * @param {String} $user-select 取值与`user-select`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义盒模型\r\n * @method box-sizing\r\n * @version 1.0.0\r\n * @param {String} $box-sizing 指定盒模型类型，取值与`box-sizing`属性一致，默认值：border-box <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义渐变色值\r\n * @method gradient\r\n * @version 1.0.0\r\n * @param {String} $type 指定渐变的4种类型：linear, repeating-linear, radial, repeating-radial <1.0.0>\r\n * @param {String} $dir 指定渐变方向，可选值：[left | right] || [top | bottom] | angle <2.0.0>\r\n * @param {String} $gradient 指定渐变取值，与w3c最新原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景图像缩放（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-size\r\n * @version 1.4.0\r\n * @param {Keywords | Length} $background-size 指定背景图缩放值，取值与`background-size`属性一致 <1.4.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景裁减（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-clip\r\n * @version 1.6.0\r\n * @param {Keywords} $background-clip 指定背景图缩放值，取值与`background-clip`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景显示区域（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-origin\r\n * @version 1.6.0\r\n * @param {Keywords} $background-origin 指定背景图`background-position`属性计算相对的参考点，取值与`background-origin`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义圆角，用于修复某些安卓机型上“圆角+边框+背景”，背景溢出的情况\r\n * @method border-radius\r\n * @version 1.6.0\r\n * @param {Length} $border-radius 指定元素的圆角半径，取值与`border-radius`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 为元素添加边框（包括1px边框）\r\n * @method border\r\n * @version 2.0.0\r\n * @param {String} $border-width 指定边框厚度（单位为px），默认值：1px，取值与`border-width`属性一致，不同方向代表边框位置 <2.0.0>\r\n * @param {String} $border-color 指定边框颜色 <2.0.0>\r\n * @param {String} $border-style 指定边框样式 <2.0.0>\r\n * @param {String} $radius 指定边框圆角半径，默认值：null <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义简单变换\r\n * @method transform\r\n * @version 1.0.0\r\n * @param {String} $transform 取值范围与`transform`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义变换原点\r\n * @method transform-origin\r\n * @version 1.0.0\r\n * @param {Length | Percentage | Keywords} $transform-origin 取值范围与`transform-origin`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定某元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化\r\n * @method transform-style\r\n * @version 2.0.0\r\n * @param {String} $transform-style 取值范围与`transform-style`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生透视效果。「z>0」的三维元素比正常大，而「z<0」时则比正常小，大小程度由该属性的值决定。\r\n * @method perspective\r\n * @version 2.0.0\r\n * @param {none | Length} $perspective 取值范围与`perspective`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定透视点的位置\r\n * @method perspective-origin\r\n * @version 2.0.0\r\n * @param {Length | Percentage | Keywords} $perspective-origin 取值范围与`perspective-origin`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定元素背面面向用户时是否可见\r\n * @method backface-visibility\r\n * @version 2.0.0\r\n * @param {Keywords} $backface-visibility 取值范围与`backface-visibility`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 定义动画\r\n * @method animation\r\n * @version 1.0.0\r\n * @param {String} $animation 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定需要引用的动画名称\r\n * @method animation-name\r\n * @version 3.0.0\r\n * @param {String} $animation-name 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行一次所持续的时长\r\n * @method animation-duration\r\n * @version 3.0.0\r\n * @param {String} $animation-duration 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行方式\r\n * @method animation-timing-function\r\n * @version 3.0.0\r\n * @param {String} $animation-timing-function 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画延迟多久之后再开始\r\n * @method animation-delay\r\n * @version 3.0.0\r\n * @param {String} $animation-delay 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画循环几次\r\n * @method animation-iteration-count\r\n * @version 3.0.0\r\n * @param {String} $animation-iteration-count 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动方向\r\n * @method animation-direction\r\n * @version 3.0.0\r\n * @param {String} $animation-direction 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动状态\r\n * @method animation-play-state\r\n * @version 3.0.0\r\n * @param {String} $animation-play-state 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画时间之外的状态\r\n * @method animation-fill-mode\r\n * @version 3.0.0\r\n * @param {String} $animation-fill-mode 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Transition\r\n * @description 定义补间\r\n * @method transition\r\n * @version 1.0.0\r\n * @param {String} $transition 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义显示类型为伸缩盒\r\n * @method flexbox\r\n * @version 1.0.0\r\n * @param {String} $flexbox 默认值：flex，可选值：flex | inline-flex <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素如何分配空间\r\n * @method flex\r\n * @version 1.0.0\r\n * @param {Number} $flex 取值与`flex`属性一致，默认值：1 <1.0.0>\r\n * @param {String} $direction 默认值: row，可选值：row | column <1.5.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的排版顺序\r\n * @method order\r\n * @version 1.0.0\r\n * @param {Integer} $order 取值与`order`属性一致，默认值：1 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素流动方向及遇见边界时是否换行(iOS7.0+,Android4.4+)\r\n * @method flex-flow\r\n * @version 2.0.0\r\n * @param {String} $flex-flow 取值与`flex-flow`属性一致，默认值：row nowrap <2.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的流动方向\r\n * @method flex-direction\r\n * @version 1.0.0\r\n * @param {String} $flex-direction 取值与`flex-direction`属性一致，默认值：row <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素溢出后排版(iOS7.0+,Android4.4+)\r\n * @method flex-wrap\r\n * @version 1.0.0\r\n * @param {String} $flex-wrap 取值与`flex-wrap`属性一致，默认值：nowrap <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器主轴对齐方式(其中`space-around`值需要iOS7.0+,Android4.4+)\r\n * @method justify-content\r\n * @version 1.0.0\r\n * @param {String} $justify-content 取值与`justify-content`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义多行弹性容器侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-content\r\n * @version 1.8.5\r\n * @param {String} $align-content 取值与`align-content`属性一致，默认值：center <1.8.5>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义单行弹性容器侧轴对齐方式\r\n * @method align-items\r\n * @version 1.0.0\r\n * @param {String} $align-items 取值与`align-items`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器中子元素自身的在侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-self\r\n * @version 1.0.0\r\n * @param {String} $align-self 取值与`align-self`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成矩形方法\r\n * @method rect\r\n * @version 1.0.0\r\n * @param {Length} $width 定义矩形的长度 <1.0.0>\r\n * @param {Length} $height 定义矩形的高度 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成正方形方法\r\n * @method square\r\n * @version 1.0.0\r\n * @param {Length} $size 定义正方形的边长 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成圆形方法\r\n * @method circle\r\n * @version 1.0.0\r\n * @param {Length} $size 定义圆的半径长度 <1.0.0>\r\n * @param {Length} $radius 定义圆的圆角半径长度 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 链接处理方法\r\n * @method link\r\n * @version 1.0.0\r\n * @param {Color} $color 定义链接颜色 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 文本碰到边界是否换行\r\n * @method wrap\r\n * @version 1.0.0\r\n * @param {Boolean} $is-wrap 定义文本是否换行，默认值：true <2.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 单行文本溢出时显示省略号\r\n * @method ellipsis\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n * @param {Integer} $line-clamp 定义需要显示的行数，默认值：1（即使用单行溢出的处理方案），需要注意的是本参数只支持webkit内核 <2.1.2>\r\n */\n/**\r\n * @module 文本\r\n * @description 文字隐藏方案\r\n * @method texthide\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n */\n/**\r\n * Yo框架全局Reset\r\n * Yo重置Mobile及高级浏览器上常见的差异\r\n */\n*[_v-39839a7f],[_v-39839a7f]\n::before,[_v-39839a7f]\n::after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent; }\n\nhtml[_v-39839a7f],\nbody[_v-39839a7f] {\n  overflow: hidden;\n  height: 100%; }\n\n[_v-39839a7f]::-webkit-scrollbar {\n  display: none; }\n\nhtml[_v-39839a7f] {\n  background-color: #eee;\n  color: #212121;\n  font-size: 100px;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n   -ms-user-select: text;\n       user-select: text; }\n\nbody[_v-39839a7f] {\n  margin: 0;\n  font-size: 0.14em;\n  line-height: 1.5;\n  font-family: Helvetica Neue, Helvetica, STHeiTi, sans-serif; }\n\nul[_v-39839a7f],\nol[_v-39839a7f],\ndl[_v-39839a7f],\ndd[_v-39839a7f],\nh1[_v-39839a7f],\nh2[_v-39839a7f],\nh3[_v-39839a7f],\nh4[_v-39839a7f],\nh5[_v-39839a7f],\nh6[_v-39839a7f],\nfigure[_v-39839a7f],\nform[_v-39839a7f],\nfieldset[_v-39839a7f],\nlegend[_v-39839a7f],\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\np[_v-39839a7f],\nblockquote[_v-39839a7f],\nth[_v-39839a7f],\ntd[_v-39839a7f],\npre[_v-39839a7f],\nxmp[_v-39839a7f] {\n  margin: 0;\n  padding: 0; }\n\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\nselect[_v-39839a7f],\npre[_v-39839a7f],\nxmp[_v-39839a7f],\ntt[_v-39839a7f],\ncode[_v-39839a7f],\nkbd[_v-39839a7f],\nsamp[_v-39839a7f] {\n  line-height: inherit;\n  font-family: inherit; }\n\nh1[_v-39839a7f],\nh2[_v-39839a7f],\nh3[_v-39839a7f],\nh4[_v-39839a7f],\nh5[_v-39839a7f],\nh6[_v-39839a7f],\nsmall[_v-39839a7f],\nbig[_v-39839a7f],\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\nselect[_v-39839a7f] {\n  font-size: inherit; }\n\naddress[_v-39839a7f],\ncite[_v-39839a7f],\ndfn[_v-39839a7f],\nem[_v-39839a7f],\ni[_v-39839a7f],\noptgroup[_v-39839a7f],\nvar[_v-39839a7f] {\n  font-style: normal; }\n\ntable[_v-39839a7f] {\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n  text-align: left; }\n\nul[_v-39839a7f],\nol[_v-39839a7f],\nmenu[_v-39839a7f] {\n  list-style: none; }\n\nfieldset[_v-39839a7f],\nimg[_v-39839a7f] {\n  border: 0;\n  vertical-align: middle; }\n\narticle[_v-39839a7f],\naside[_v-39839a7f],\ndetails[_v-39839a7f],\nfigcaption[_v-39839a7f],\nfigure[_v-39839a7f],\nfooter[_v-39839a7f],\nheader[_v-39839a7f],\nmain[_v-39839a7f],\nmenu[_v-39839a7f],\nnav[_v-39839a7f],\nsection[_v-39839a7f],\nsummary[_v-39839a7f] {\n  display: block; }\n\naudio[_v-39839a7f],\ncanvas[_v-39839a7f],\nvideo[_v-39839a7f] {\n  display: inline-block; }\n\nblockquote[_v-39839a7f]:before,\nblockquote[_v-39839a7f]:after,\nq[_v-39839a7f]:before,\nq[_v-39839a7f]:after {\n  content: \" \"; }\n\ntextarea[_v-39839a7f],\npre[_v-39839a7f],\nxmp[_v-39839a7f] {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n\ntextarea[_v-39839a7f] {\n  resize: vertical; }\n\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\nselect\na[_v-39839a7f] {\n  outline: 0 none; }\n\ninput[_v-39839a7f],\ntextarea[_v-39839a7f],\nbutton[_v-39839a7f],\nselect[_v-39839a7f] {\n  color: inherit; }\n  input[_v-39839a7f]:disabled,\n  textarea[_v-39839a7f]:disabled,\n  button[_v-39839a7f]:disabled,\n  select[_v-39839a7f]:disabled {\n    opacity: 1; }\n\nbutton[_v-39839a7f]::-moz-focus-inner,\ninput[_v-39839a7f]::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\ninput[type=\"button\"][_v-39839a7f],\ninput[type=\"submit\"][_v-39839a7f],\ninput[type=\"reset\"][_v-39839a7f],\ninput[type=\"file\"][_v-39839a7f]::-webkit-file-upload-button,\ninput[type=\"search\"][_v-39839a7f]::-webkit-search-cancel-button {\n  -webkit-appearance: none;\n  appearance: none; }\n\nmark[_v-39839a7f] {\n  background-color: transparent; }\n\na[_v-39839a7f],\nins[_v-39839a7f],\ns[_v-39839a7f],\nu[_v-39839a7f],\ndel[_v-39839a7f] {\n  text-decoration: none; }\n\na[_v-39839a7f] {\n  color: #00afc7; }\n\n.g-clear[_v-39839a7f]::after,\n.g-mod[_v-39839a7f]::after {\n  display: block;\n  overflow: hidden;\n  clear: both;\n  height: 0;\n  content: \" \"; }\n\n@font-face {\n  font-family: yofont;\n  src: url(//ss.qunarzz.com/yo/font/1.0.3/yofont.woff) format(\"woff\"), url(//ss.qunarzz.com/yo/font/1.0.3/yofont.ttf) format(\"truetype\"); }\n\n.yo-ico[_v-39839a7f] {\n  font-family: yofont !important;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  vertical-align: middle; }\n\n.commonList-container[_v-39839a7f] {\n  padding-bottom: 40px;\n  position: relative;\n  width: 100%; }\n  .commonList-container .class_introduce_con[_v-39839a7f] {\n    position: relative;\n    padding: 5px 10px 0;\n    width: 100%; }\n    .commonList-container .class_introduce_con[_v-39839a7f]::after {\n      pointer-events: none;\n      position: absolute;\n      z-index: 999;\n      top: 0;\n      left: 0;\n      overflow: hidden;\n      content: \" \";\n      border-color: #E1E1E1;\n      border-style: solid;\n      border-width: 0 0 1px 0;\n      -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0; }\n      @media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.4895833333333333), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {\n        .commonList-container .class_introduce_con[_v-39839a7f]::after {\n          width: 100%;\n          height: 100%; } }\n      @media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.4895833333333335), (min-resolution: 144dpi) and (max-resolution: 239dpi), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {\n        .commonList-container .class_introduce_con[_v-39839a7f]::after {\n          width: 200%;\n          height: 200%;\n          -webkit-transform: scale(0.5);\n          -ms-transform: scale(0.5);\n              transform: scale(0.5); } }\n      @media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {\n        .commonList-container .class_introduce_con[_v-39839a7f]::after {\n          width: 300%;\n          height: 300%;\n          -webkit-transform: scale(0.33333);\n          -ms-transform: scale(0.33333);\n              transform: scale(0.33333); } }\n    .commonList-container .class_introduce_con .comment_tit[_v-39839a7f] {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      height: 50px; }\n      .commonList-container .class_introduce_con .comment_tit .img[_v-39839a7f] {\n        border-radius: 20px;\n        background-clip: padding-box !important;\n        width: 46px;\n        height: 46px;\n        background: pink;\n        margin-right: 5px;\n        margin-top: 5px;\n        -webkit-box-shadow: none !important;\n                box-shadow: none !important; }\n      .commonList-container .class_introduce_con .comment_tit .comment_dis[_v-39839a7f] {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n        -moz-box-flex: 1;\n         -ms-flex: 1;\n             flex: 1;\n        width: .1px;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -moz-box-pack: center;\n         -ms-flex-pack: center;\n             justify-content: center;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n        -moz-box-orient: vertical;\n        -moz-box-direction: normal;\n         -ms-flex-direction: column;\n             flex-direction: column;\n        width: 100% !important;\n        padding: 5px 0; }\n        .commonList-container .class_introduce_con .comment_tit .comment_dis span[_v-39839a7f] {\n          display: block !important;\n          width: 80% !important;\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          -moz-box-flex: 1;\n           -ms-flex: 1;\n               flex: 1;\n          width: .1px;\n          color: #999;\n          font-size: 12px; }\n        .commonList-container .class_introduce_con .comment_tit .comment_dis .commentname[_v-39839a7f] {\n          font-size: 14px;\n          color: #333;\n          line-height: 30px; }\n    .commonList-container .class_introduce_con .class_introduce_text[_v-39839a7f] {\n      font-size: 14px;\n      color: #666;\n      padding: 5px 0;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex; }\n\n#speak_container .bottominput[_v-39839a7f] {\n  max-width: 640px;\n  z-index: 112;\n  border-top: .5px solid #E3DFD8;\n  background: #F9F7F8;\n  position: relative;\n  height: 45px;\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -moz-box-pack: center;\n   -ms-flex-pack: center;\n       justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -moz-box-align: center;\n   -ms-flex-align: center;\n       align-items: center;\n  position: fixed;\n  bottom: 0;\n  padding: 8px; }\n  #speak_container .bottominput[_v-39839a7f]::after {\n    pointer-events: none;\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n    content: \" \";\n    border-color: #e1e1e1;\n    border-style: solid;\n    border-width: 1px 0 0 0;\n    -webkit-transform-origin: 0 0;\n    -ms-transform-origin: 0 0;\n        transform-origin: 0 0; }\n    @media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.4895833333333333), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {\n      #speak_container .bottominput[_v-39839a7f]::after {\n        width: 100%;\n        height: 100%; } }\n    @media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.4895833333333335), (min-resolution: 144dpi) and (max-resolution: 239dpi), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {\n      #speak_container .bottominput[_v-39839a7f]::after {\n        width: 200%;\n        height: 200%;\n        -webkit-transform: scale(0.5);\n        -ms-transform: scale(0.5);\n            transform: scale(0.5); } }\n    @media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {\n      #speak_container .bottominput[_v-39839a7f]::after {\n        width: 300%;\n        height: 300%;\n        -webkit-transform: scale(0.33333);\n        -ms-transform: scale(0.33333);\n            transform: scale(0.33333); } }\n  #speak_container .bottominput .text_talk[_v-39839a7f] {\n    margin-left: 0px;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -moz-box-flex: 1;\n     -ms-flex: 1;\n         flex: 1;\n    width: .1px;\n    height: 34px;\n    position: relative;\n    background: #FFFFFF;\n    border-radius: 5px;\n    background-clip: padding-box !important; }\n    #speak_container .bottominput .text_talk[_v-39839a7f]::after {\n      pointer-events: none;\n      position: absolute;\n      z-index: 999;\n      top: 0;\n      left: 0;\n      overflow: hidden;\n      content: \" \";\n      border-color: #eee;\n      border-style: solid;\n      border-width: 1px 1px 1px 1px;\n      -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0; }\n      @media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.4895833333333333), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {\n        #speak_container .bottominput .text_talk[_v-39839a7f]::after {\n          width: 100%;\n          height: 100%; } }\n      @media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.4895833333333335), (min-resolution: 144dpi) and (max-resolution: 239dpi), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {\n        #speak_container .bottominput .text_talk[_v-39839a7f]::after {\n          width: 200%;\n          height: 200%;\n          -webkit-transform: scale(0.5);\n          -ms-transform: scale(0.5);\n              transform: scale(0.5); } }\n      @media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {\n        #speak_container .bottominput .text_talk[_v-39839a7f]::after {\n          width: 300%;\n          height: 300%;\n          -webkit-transform: scale(0.33333);\n          -ms-transform: scale(0.33333);\n              transform: scale(0.33333); } }\n    #speak_container .bottominput .text_talk input[_v-39839a7f] {\n      height: 100%;\n      width: 100%;\n      text-indent: 10px;\n      border-radius: 5px; }\n  #speak_container .bottominput .send[_v-39839a7f] {\n    width: 70px;\n    height: 34px;\n    line-height: 34px;\n    margin-left: 8px;\n    text-align: center;\n    color: #FFFFFF;\n    background: #FF4A7D;\n    border-radius: 3px;\n    background-clip: padding-box !important; }\n", ""]);

	// exports


/***/ },

/***/ 1493:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div id='speak_container'>
	//         <div class="bottominput">
	//             <div class="text_talk">
	//                 <input v-if="discussStatus" class='text_talk_input' v-model="sentmassagetext" type="text" placeholder="向群主提问或参与讨论">
	//                 <input v-if="!discussStatus" type="text" placeholder="评论关闭" disabled>
	//             </div>
	//             <div class="send" @click="sendMessage">
	//                 <span>发送</span>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	// import layout from "../layout/api.es6";
	exports.default = {
	    data: function data() {
	        return {
	            discussStatus: 1,
	            sentmassagetext: ''
	        };
	    },
	    created: function created() {},
	    mounted: function mounted() {
	        this.$nextTick(function () {
	            this.init();
	        });
	    },

	    components: {},
	    methods: {
	        sendMessage: function sendMessage() {
	            this.$emit('send', this.sentmassagetext);
	            this.sentmassagetext = '';
	        },
	        init: function init() {
	            $(".text_talk_input").focus(function () {
	                if (document.getElementById('scrollcon')) {
	                    document.getElementById('scrollcon').scrollTop = document.getElementById('scrollcon').scrollHeight;
	                }
	            });
	        }
	    }
	    // </script>
	    // <!-- 组建内改变全局css样式 -->
	    // <style>
	    //
	    // </style>
	    // <!-- 组建内部css样式，不会改变全局样式 -->
	    // <style lang='sass' scoped>
	    // 	@import "../../../stylesheet/yo/usage/core/reset";
	    // 	@import "../../../stylesheet/yo/usage/module/commonList";
	    //     #speak_container{
	    //         .bottominput{
	    // 		    max-width: 640px;
	    // 		    z-index: 112;
	    // 		    border-top: .5px solid #E3DFD8;
	    // 		    background: #F9F7F8;
	    // 		    @include border(1px 0 0 0,#e1e1e1);
	    // 		    height:45px;
	    // 		    width:100%;
	    // 		    @include flexbox();
	    // 		    @include justify-content(center);
	    // 		    @include align-items(center);
	    // 		    position:fixed;
	    // 		    bottom:0;
	    // 		    padding:8px;
	    // 		    .text_talk{
	    // 		       margin-left:0px;
	    // 		      @include flex();
	    // 		      height:34px;
	    // 		      @include border(1px 1px 1px 1px,#eee);
	    // 		      background: #FFFFFF;
	    // 		      @include border-radius(5px);
	    // 		      input{
	    // 		        height:100%;
	    // 		        width:100%;
	    // 		        text-indent: 10px;
	    // 		        border-radius: 5px;
	    // 		      }
	    // 		    }
	    // 		    .send{
	    // 		      width:70px;
	    // 		      height:34px;
	    // 		      line-height:34px;
	    // 		      margin-left:8px;
	    // 		      text-align: center;
	    // 		      color: #FFFFFF;
	    // 		      background: #FF4A7D;
	    // 		      @include border-radius(3px);
	    // 		    }
	    // 	  	}
	    //     }
	    // </style>

	};

/***/ },

/***/ 1494:
/***/ function(module, exports) {

	module.exports = "\n<div id=\"speak_container\" _v-39839a7f=\"\">\n    <div class=\"bottominput\" _v-39839a7f=\"\">\n        <div class=\"text_talk\" _v-39839a7f=\"\">\n            <input v-if=\"discussStatus\" class=\"text_talk_input\" v-model=\"sentmassagetext\" type=\"text\" placeholder=\"向群主提问或参与讨论\" _v-39839a7f=\"\">\n            <input v-if=\"!discussStatus\" type=\"text\" placeholder=\"评论关闭\" disabled=\"\" _v-39839a7f=\"\">\n        </div>\n        <div class=\"send\" @click=\"sendMessage\" _v-39839a7f=\"\">\n            <span _v-39839a7f=\"\">发送</span>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 1495:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1496)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/social/component/social_title.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1497)
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
	  var id = "_v-faa0782e/social_title.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1496:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="top0">
	//         <div class="top_container">
	//             <div class="top_left" style="width: 40px">
	//                 <a class="top_back" href="javascript:history.back();">
	//                     <span class="home_arrow"></span>
	//                 </a>
	//             </div>
	//             <div class="title_container">
	//                 {{data||msg}}
	//             </div>
	//             <div class="top_right" style="width:40px;right:10px" v-if="rightshow||false" @click='manage'>
	//                 <a class="top_back">
	//                     <img style="width:26px;margin-top:12px;" class="back_home" src="http://pic.davdian.com/free/2017/04/06/social_title.png"/>
	//                 </a>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    props: ['data', 'rightshow', 'id'],
	    data: function data() {
	        return {
	            msg: document.title
	        };
	    },
	    methods: {
	        manage: function manage() {
	            localStorage.setItem('social_reload', '1');
	            window.location.href = '#/manage/' + this.id;
	        }
	    },
	    ready: function ready() {}
	    // </script>

	};

/***/ },

/***/ 1497:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"top0\">\n    <div class=\"top_container\">\n        <div class=\"top_left\" style=\"width: 40px\">\n            <a class=\"top_back\" href=\"javascript:history.back();\">\n                <span class=\"home_arrow\"></span>\n            </a>\n        </div>\n        <div class=\"title_container\">\n            {{data||msg}}\n        </div>\n        <div class=\"top_right\" style=\"width:40px;right:10px\" v-if=\"rightshow||false\" @click='manage'>\n            <a class=\"top_back\">\n                <img style=\"width:26px;margin-top:12px;\" class=\"back_home\" src=\"http://pic.davdian.com/free/2017/04/06/social_title.png\"/>\n            </a>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 1498:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1499)
	__webpack_require__(1501)
	__vue_script__ = __webpack_require__(1503)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/social/component/switch.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1504)
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
	  var id = "_v-f2589d52/switch.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1499:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1500);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./switch.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./switch.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1500:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },

/***/ 1501:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1502);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-f2589d52&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./switch.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-f2589d52&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./switch.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1502:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, ".flag[_v-f2589d52] {\n  z-index: 105;\n  position: fixed;\n  top: 54px;\n  width: 100%;\n  max-width: 640px;\n  text-align: right;\n  margin: 0 auto; }\n\n.flag span[_v-f2589d52] {\n  margin-right: 10px;\n  color: #ffffff;\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  font-size: 14px;\n  font-weight: bold;\n  text-align: center;\n  background: #FF4A7D;\n  display: inline-block;\n  position: relative;\n  border-radius: 14px; }\n\n.flag span[_v-f2589d52]:after {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: 0;\n  border: 1px solid #fff;\n  width: 100%;\n  height: 100%;\n  border-radius: 14px; }\n\n.commen_num[_v-f2589d52] {\n  position: fixed;\n  top: 57px;\n  width: 100%;\n  max-width: 640px;\n  margin: 0 auto;\n  text-align: right;\n  z-index: 99; }\n\n.commen_num span[_v-f2589d52] {\n  display: inline-block;\n  margin-right: 24px;\n  padding: 0 19px 0 10px;\n  color: #fff;\n  height: 21px;\n  line-height: 21px;\n  font-size: 12px;\n  background: rgba(0, 0, 0, 0.6);\n  border-radius: 10px;\n  background-clip: padding-box !important; }\n\n.flexd[_v-f2589d52] {\n  width: 100%;\n  position: fixed;\n  z-index: 105;\n  max-width: 640px;\n  margin: 0 auto;\n  text-align: right;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  top: 80px; }\n  .flexd .common_position[_v-f2589d52] {\n    position: relative;\n    height: 35px;\n    margin-bottom: 5px; }\n    .flexd .common_position img[_v-f2589d52] {\n      position: absolute;\n      top: 5px;\n      right: 5px;\n      width: 25px !important;\n      height: 25px !important;\n      border-radius: 25px; }\n    .flexd .common_position .common_box[_v-f2589d52] {\n      padding: 0 40px 0 10px;\n      color: #fff;\n      display: inline-block;\n      height: 35px;\n      line-height: 35px;\n      font-size: 12px;\n      background: rgba(0, 0, 0, 0.6);\n      border-radius: 35px;\n      max-width: 100%;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      text-align: left; }\n", ""]);

	// exports


/***/ },

/***/ 1503:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div id='switch'>
	//         <!--fiexd定位的弹幕-->
	//         <div v-if="commonflag && discussStatus" class="flexd" @click="open_comment">
	//             <div class="common_position"  v-if='commonList[commonList.length-2] && commonList[commonList.length-2].msg.content'>
	//                 <span class="common_box" v-text='decodeURIComponent(commonList[commonList.length-2].msg.content)'></span>
	//                 <img :src="commonList[commonList.length-2].speaker.avatar || defaultAvatar">
	//             </div>
	//
	//             <div class="common_position" v-if='commonList[commonList.length-1] && commonList[commonList.length-1].msg.content'>
	//                 <span class="common_box" v-text='decodeURIComponent(commonList[commonList.length-1].msg.content)'></span>
	//                 <img :src="commonList[commonList.length-1].speaker.avatar || defaultAvatar">
	//             </div>
	//         </div>
	//         <!--开关按钮-->
	//         <div v-if="commonflag && discussStatus" class="flag">
	//             <span @click="switchflag" >关</span>
	//         </div>
	//         <div v-if="!commonflag && discussStatus" class="flag">
	//             <span @click="switchflag">开</span>
	//         </div>
	//         <div  class="commen_num" v-if='discussStatus'><span>讨论：{{total}}</span></div>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    props: ['total', 'data'],
	    data: function data() {
	        return {
	            discussStatus: true,
	            commonflag: true,
	            total: 100,
	            defaultAvatar: '//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png'
	        };
	    },
	    computed: {
	        commonList: function commonList() {
	            return this.data || [];
	        }
	    },
	    methods: {
	        switchflag: function switchflag() {
	            this.commonflag = !this.commonflag;
	        },
	        open_comment: function open_comment() {
	            this.$emit('usercomment');
	        }
	    },
	    ready: function ready() {}
	    // </script>
	    //
	    // <!-- 组建内改变全局css样式 -->
	    // <style>
	    //
	    // </style>
	    // <!-- 组建内部css样式，不会改变全局样式 -->
	    // <style lang='sass' scoped>
	    //     .flag{
	    //     z-index: 105;
	    //     position: fixed;
	    //     top: 54px;
	    //     width: 100%;
	    //     max-width: 640px;
	    //     text-align: right;
	    //     margin: 0 auto;
	    //   }
	    //   .flag span{
	    //     margin-right: 10px;
	    //     color: #ffffff;
	    //     width: 28px;
	    //     height:28px;
	    //     line-height: 28px;
	    //     font-size: 14px;
	    //     font-weight: bold;
	    //     text-align: center;
	    //     background: #FF4A7D;
	    //     display: inline-block;
	    //     position: relative;
	    //     border-radius:14px;
	    //   }
	    //   .flag span:after{
	    //     content: '';
	    //     position: absolute;
	    //     top: -1px;
	    //     left: 0;
	    //     border: 1px solid #fff;
	    //     width: 100%;
	    //     height: 100%;
	    //     border-radius:14px;
	    //   }
	    //   .commen_num{
	    //     position: fixed;
	    //     top: 57px;
	    //     width: 100%;
	    //     max-width: 640px;
	    //     margin: 0 auto;
	    //     text-align: right;
	    //     z-index: 99;
	    //   }
	    //   .commen_num span{
	    //     display: inline-block;
	    //     margin-right: 24px;
	    //     padding: 0 19px 0 10px;
	    //     color: #fff;
	    //     height: 21px;
	    //     line-height: 21px;
	    //     font-size: 12px;
	    //     background: rgba(0,0,0,.6);
	    //     border-radius: 10px;
	    //     background-clip: padding-box!important;
	    //   }
	    //   .flexd {
	    //     width: 100%;
	    //     position: fixed;
	    //     z-index: 105;
	    //     max-width: 640px;
	    //     margin: 0 auto;
	    //     text-align: right;
	    //     padding: 10px;
	    //     box-sizing: border-box;
	    //     top: 80px;
	    //     .common_position {
	    //       position: relative;
	    //       height: 35px;
	    //       margin-bottom: 5px;
	    //       img {
	    //         position: absolute;
	    //         top: 5px;
	    //         right: 5px;
	    //         width: 25px!important;
	    //         height: 25px!important;
	    //         border-radius: 25px;
	    //       }
	    //       .common_box {
	    //         padding: 0 40px 0 10px;
	    //         color: #fff;
	    //         display: inline-block;
	    //         height: 35px;
	    //         line-height: 35px;
	    //         font-size: 12px;
	    //         background: rgba(0, 0, 0, .6);
	    //         border-radius: 35px;
	    //         max-width: 100%;
	    //         white-space: nowrap;
	    //         overflow: hidden;
	    //         text-overflow: ellipsis;
	    //         text-align: left;
	    //       }
	    //     }
	    //   }
	    // </style>

	};

/***/ },

/***/ 1504:
/***/ function(module, exports) {

	module.exports = "\n<div id=\"switch\" _v-f2589d52=\"\">\n    <!--fiexd定位的弹幕-->\n    <div v-if=\"commonflag &amp;&amp; discussStatus\" class=\"flexd\" @click=\"open_comment\" _v-f2589d52=\"\">\n        <div class=\"common_position\" v-if=\"commonList[commonList.length-2] &amp;&amp; commonList[commonList.length-2].msg.content\" _v-f2589d52=\"\">\n            <span class=\"common_box\" v-text=\"decodeURIComponent(commonList[commonList.length-2].msg.content)\" _v-f2589d52=\"\"></span>\n            <img :src=\"commonList[commonList.length-2].speaker.avatar || defaultAvatar\" _v-f2589d52=\"\">\n        </div>\n\n        <div class=\"common_position\" v-if=\"commonList[commonList.length-1] &amp;&amp; commonList[commonList.length-1].msg.content\" _v-f2589d52=\"\">\n            <span class=\"common_box\" v-text=\"decodeURIComponent(commonList[commonList.length-1].msg.content)\" _v-f2589d52=\"\"></span>\n            <img :src=\"commonList[commonList.length-1].speaker.avatar || defaultAvatar\" _v-f2589d52=\"\">\n        </div>\n    </div>\n    <!--开关按钮-->\n    <div v-if=\"commonflag &amp;&amp; discussStatus\" class=\"flag\" _v-f2589d52=\"\">\n        <span @click=\"switchflag\" _v-f2589d52=\"\">关</span>\n    </div>\n    <div v-if=\"!commonflag &amp;&amp; discussStatus\" class=\"flag\" _v-f2589d52=\"\">\n        <span @click=\"switchflag\" _v-f2589d52=\"\">开</span>\n    </div>\n    <div class=\"commen_num\" v-if=\"discussStatus\" _v-f2589d52=\"\"><span _v-f2589d52=\"\">讨论：{{total}}</span></div>\n</div>\n";

/***/ },

/***/ 1505:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1506)
	__vue_script__ = __webpack_require__(1508)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/social/component/common.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1509)
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
	  var id = "_v-3bbe1ee4/common.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1506:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1507);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3bbe1ee4&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./common.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3bbe1ee4&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./common.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1507:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * lib中map使用“_”开头，本文件中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * 本文件中map使用\"_\"开头，extra中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * 合并base和extra中的同类base map\r\n * 用以解决业务方升级Yo时需比base和extra的一致性\r\n * 当extra为空时，base map将以base文件里的定义作为默认值\r\n * 当extra不为空时，base map使用extra文件里的定义\r\n */\n/**\n * Yo框架全局Variables\n * Yo基础变量map，如果不想定义某属性，将其value设置为null；\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\n * variables中map使用“_”开头，本文件中不使用\"_\"\n * variables ⇌ config\n */\n/**\r\n * Yo框架全局Variables\r\n * Yo基础变量map，如果不想定义某属性，将其value设置为null\r\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\r\n * 本文件中map使用\"_\"开头，config中不使用\"_\"\r\n * variables ⇌ config\r\n */\n/**\r\n * 合并variables和config中的同类map\r\n * 用以解决业务方升级Yo时需比config和variables的一致性\r\n * 当config为空时，使用variables中的map作为默认值\r\n * 当config不为空时，使用config中的定义\r\n */\n/**\r\n * Yo框架自定义全局函数\r\n * 扩充Sass默认函数库，用以增强语法\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的第一项\r\n * @function first\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的最后一项\r\n * @function last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的倒数第几项\r\n * @function nth-last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要返回的值在list中的倒数位置 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 移除SassList中的某个项目并返回新的List\r\n * @function remove\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {String} $value 指定需要被删除的值 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 截取SassList中的某个部分并返回新的List\r\n * @function slice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $start 指定需要截取的开始下标 <2.1.0>\r\n * @param {Integer} $end 指定需要截取的结束下标（不包括end），当该值缺省时默认为末尾下标 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 从SassList中添加/删除项目，然后返回新的List。\r\n * @function splice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要移除的开始下标 <2.1.0>\r\n * @param {Integer} $count 指定需要移除的数量，不可以为负值，0表示不移除 <2.1.0>\r\n * @param {String} $values 指定需要添加的新值（可以是多个），如果该值缺省，则表示只移除不添加新值 <2.1.0>\r\n */\n/**\r\n * Yo框架全局基础方法\r\n * 包括响应式方案，CSS3兼容性方案，厂商前缀方案，iconfont方案，flex布局等全局方法\r\n */\n/**\r\n * @module 功能\r\n * @description 给需要的属性加厂家前缀\r\n * @method _prefix\r\n * @version 1.0.0\r\n * @param {String} $property 指定属性 <1.0.0>\r\n * @param {String} $value 指定属性值 <1.0.0>\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 定义字体图标\r\n * @method _yofont\r\n * @version 1.0.0\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 四则运算(iOS6.0+,Android4.4+)\r\n * @method calc\r\n * @version 1.7.0\r\n * @param {String} $property 指定需要进行计算的CSS属性 <1.7.0>\r\n * @param {String} $value 与原生CSS语法一致，区别在于需要使用引号包裹表达式 <1.7.0>\r\n * @example <div class=\"calc\">四则运算</div>\r\n * .calc { @include calc(width, \"100% - 100px\"); }\r\n */\n/**\r\n * @module 功能\r\n * @description 定义响应式方案\r\n * @method responsive\r\n * @version 1.0.0\r\n * @param {String} $media 指定媒体查询条件，取值为`config`文件map `media-types`中的值 <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除浮动方案\r\n * @method clearfix\r\n * @version 1.0.0\r\n * @param {String} $type 指定清除浮动的方式，包括：pseudo-element | bfc，默认值：pseudo-element <1.8.5>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除行内级元素间间隙方案\r\n * @method killspace\r\n * @version 1.0.0\r\n * @param {Length} $font-size 指定子元素字号，默认值：.14rem <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <span class=\"item\">1</span>\r\n *      <span class=\"item\">2</span>\r\n *      <span class=\"item\">3</span>\r\n * </div>\r\n * .demo {@include killspace;}\r\n */\n/**\r\n * @module 功能\r\n * @description 元素在包含块中的对齐方式，默认为水平垂直对齐\r\n * @method align\r\n * @version 2.0.0\r\n * @param {String} $flexbox 指定包含块布局方式，可选值：flex | inline-flex，默认值：flex <2.0.0>\r\n * @param {String} $type 指定居中元素类型，可选值：image | text | other，默认值：text <2.0.0>\r\n * @param {Keywords} $justify-content 指定元素水平对齐方式，取值与`justify-content`属性一致，默认值：center <2.0.0>\r\n * @param {Keywords} $align-items 指定元素垂直对齐方式，取值与`align-items`属性一致，默认值：center <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <img class=\"item\" alt=\"未知尺寸图片居中\" />\r\n * </div>\r\n * .demo {@include align;}\r\n */\n/**\r\n * @module 功能\r\n * @description 定义文档根节点是否允许滚动\r\n * @method root-scroll\r\n * @version 1.4.0\r\n * @param {Boolean} $is-scroll 指定是否有滚动，默认值：false <1.8.6>\r\n */\n/**\r\n * @module 功能\r\n * @description 定义是否有滚动条\r\n * @method overflow\r\n * @version 1.0.0\r\n * @param {String} $overflow 取值与最新原生语法一致，默认值：auto <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 生成全屏方法\r\n * @method fullscreen\r\n * @version 1.7.0\r\n * @param {Integer} $z-index 指定层叠级别 <1.7.0>\r\n * @param {Keywords} $position 指定定位方式，取除`static | relative`之外的值，默认值：absolute <1.8.5>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义使用何种滤镜\r\n * @method filter\r\n * @version 1.7.0\r\n * @param {String} $filter 取值与`filter`属性一致 <1.7.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义UA默认外观\r\n * @method appearance\r\n * @version 1.0.0\r\n * @param {String} $appearance 取值与`appearance`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义如何选中内容\r\n * @method user-select\r\n * @version 1.0.0\r\n * @param {String} $user-select 取值与`user-select`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义盒模型\r\n * @method box-sizing\r\n * @version 1.0.0\r\n * @param {String} $box-sizing 指定盒模型类型，取值与`box-sizing`属性一致，默认值：border-box <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义渐变色值\r\n * @method gradient\r\n * @version 1.0.0\r\n * @param {String} $type 指定渐变的4种类型：linear, repeating-linear, radial, repeating-radial <1.0.0>\r\n * @param {String} $dir 指定渐变方向，可选值：[left | right] || [top | bottom] | angle <2.0.0>\r\n * @param {String} $gradient 指定渐变取值，与w3c最新原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景图像缩放（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-size\r\n * @version 1.4.0\r\n * @param {Keywords | Length} $background-size 指定背景图缩放值，取值与`background-size`属性一致 <1.4.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景裁减（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-clip\r\n * @version 1.6.0\r\n * @param {Keywords} $background-clip 指定背景图缩放值，取值与`background-clip`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景显示区域（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-origin\r\n * @version 1.6.0\r\n * @param {Keywords} $background-origin 指定背景图`background-position`属性计算相对的参考点，取值与`background-origin`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义圆角，用于修复某些安卓机型上“圆角+边框+背景”，背景溢出的情况\r\n * @method border-radius\r\n * @version 1.6.0\r\n * @param {Length} $border-radius 指定元素的圆角半径，取值与`border-radius`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 为元素添加边框（包括1px边框）\r\n * @method border\r\n * @version 2.0.0\r\n * @param {String} $border-width 指定边框厚度（单位为px），默认值：1px，取值与`border-width`属性一致，不同方向代表边框位置 <2.0.0>\r\n * @param {String} $border-color 指定边框颜色 <2.0.0>\r\n * @param {String} $border-style 指定边框样式 <2.0.0>\r\n * @param {String} $radius 指定边框圆角半径，默认值：null <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义简单变换\r\n * @method transform\r\n * @version 1.0.0\r\n * @param {String} $transform 取值范围与`transform`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义变换原点\r\n * @method transform-origin\r\n * @version 1.0.0\r\n * @param {Length | Percentage | Keywords} $transform-origin 取值范围与`transform-origin`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定某元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化\r\n * @method transform-style\r\n * @version 2.0.0\r\n * @param {String} $transform-style 取值范围与`transform-style`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生透视效果。「z>0」的三维元素比正常大，而「z<0」时则比正常小，大小程度由该属性的值决定。\r\n * @method perspective\r\n * @version 2.0.0\r\n * @param {none | Length} $perspective 取值范围与`perspective`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定透视点的位置\r\n * @method perspective-origin\r\n * @version 2.0.0\r\n * @param {Length | Percentage | Keywords} $perspective-origin 取值范围与`perspective-origin`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定元素背面面向用户时是否可见\r\n * @method backface-visibility\r\n * @version 2.0.0\r\n * @param {Keywords} $backface-visibility 取值范围与`backface-visibility`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 定义动画\r\n * @method animation\r\n * @version 1.0.0\r\n * @param {String} $animation 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定需要引用的动画名称\r\n * @method animation-name\r\n * @version 3.0.0\r\n * @param {String} $animation-name 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行一次所持续的时长\r\n * @method animation-duration\r\n * @version 3.0.0\r\n * @param {String} $animation-duration 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行方式\r\n * @method animation-timing-function\r\n * @version 3.0.0\r\n * @param {String} $animation-timing-function 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画延迟多久之后再开始\r\n * @method animation-delay\r\n * @version 3.0.0\r\n * @param {String} $animation-delay 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画循环几次\r\n * @method animation-iteration-count\r\n * @version 3.0.0\r\n * @param {String} $animation-iteration-count 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动方向\r\n * @method animation-direction\r\n * @version 3.0.0\r\n * @param {String} $animation-direction 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动状态\r\n * @method animation-play-state\r\n * @version 3.0.0\r\n * @param {String} $animation-play-state 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画时间之外的状态\r\n * @method animation-fill-mode\r\n * @version 3.0.0\r\n * @param {String} $animation-fill-mode 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Transition\r\n * @description 定义补间\r\n * @method transition\r\n * @version 1.0.0\r\n * @param {String} $transition 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义显示类型为伸缩盒\r\n * @method flexbox\r\n * @version 1.0.0\r\n * @param {String} $flexbox 默认值：flex，可选值：flex | inline-flex <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素如何分配空间\r\n * @method flex\r\n * @version 1.0.0\r\n * @param {Number} $flex 取值与`flex`属性一致，默认值：1 <1.0.0>\r\n * @param {String} $direction 默认值: row，可选值：row | column <1.5.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的排版顺序\r\n * @method order\r\n * @version 1.0.0\r\n * @param {Integer} $order 取值与`order`属性一致，默认值：1 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素流动方向及遇见边界时是否换行(iOS7.0+,Android4.4+)\r\n * @method flex-flow\r\n * @version 2.0.0\r\n * @param {String} $flex-flow 取值与`flex-flow`属性一致，默认值：row nowrap <2.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的流动方向\r\n * @method flex-direction\r\n * @version 1.0.0\r\n * @param {String} $flex-direction 取值与`flex-direction`属性一致，默认值：row <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素溢出后排版(iOS7.0+,Android4.4+)\r\n * @method flex-wrap\r\n * @version 1.0.0\r\n * @param {String} $flex-wrap 取值与`flex-wrap`属性一致，默认值：nowrap <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器主轴对齐方式(其中`space-around`值需要iOS7.0+,Android4.4+)\r\n * @method justify-content\r\n * @version 1.0.0\r\n * @param {String} $justify-content 取值与`justify-content`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义多行弹性容器侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-content\r\n * @version 1.8.5\r\n * @param {String} $align-content 取值与`align-content`属性一致，默认值：center <1.8.5>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义单行弹性容器侧轴对齐方式\r\n * @method align-items\r\n * @version 1.0.0\r\n * @param {String} $align-items 取值与`align-items`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器中子元素自身的在侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-self\r\n * @version 1.0.0\r\n * @param {String} $align-self 取值与`align-self`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成矩形方法\r\n * @method rect\r\n * @version 1.0.0\r\n * @param {Length} $width 定义矩形的长度 <1.0.0>\r\n * @param {Length} $height 定义矩形的高度 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成正方形方法\r\n * @method square\r\n * @version 1.0.0\r\n * @param {Length} $size 定义正方形的边长 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成圆形方法\r\n * @method circle\r\n * @version 1.0.0\r\n * @param {Length} $size 定义圆的半径长度 <1.0.0>\r\n * @param {Length} $radius 定义圆的圆角半径长度 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 链接处理方法\r\n * @method link\r\n * @version 1.0.0\r\n * @param {Color} $color 定义链接颜色 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 文本碰到边界是否换行\r\n * @method wrap\r\n * @version 1.0.0\r\n * @param {Boolean} $is-wrap 定义文本是否换行，默认值：true <2.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 单行文本溢出时显示省略号\r\n * @method ellipsis\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n * @param {Integer} $line-clamp 定义需要显示的行数，默认值：1（即使用单行溢出的处理方案），需要注意的是本参数只支持webkit内核 <2.1.2>\r\n */\n/**\r\n * @module 文本\r\n * @description 文字隐藏方案\r\n * @method texthide\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n */\n/**\r\n * Yo框架全局Reset\r\n * Yo重置Mobile及高级浏览器上常见的差异\r\n */\n*[_v-3bbe1ee4],[_v-3bbe1ee4]\n::before,[_v-3bbe1ee4]\n::after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent; }\n\nhtml[_v-3bbe1ee4],\nbody[_v-3bbe1ee4] {\n  overflow: hidden;\n  height: 100%; }\n\n[_v-3bbe1ee4]::-webkit-scrollbar {\n  display: none; }\n\nhtml[_v-3bbe1ee4] {\n  background-color: #eee;\n  color: #212121;\n  font-size: 100px;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n   -ms-user-select: text;\n       user-select: text; }\n\nbody[_v-3bbe1ee4] {\n  margin: 0;\n  font-size: 0.14em;\n  line-height: 1.5;\n  font-family: Helvetica Neue, Helvetica, STHeiTi, sans-serif; }\n\nul[_v-3bbe1ee4],\nol[_v-3bbe1ee4],\ndl[_v-3bbe1ee4],\ndd[_v-3bbe1ee4],\nh1[_v-3bbe1ee4],\nh2[_v-3bbe1ee4],\nh3[_v-3bbe1ee4],\nh4[_v-3bbe1ee4],\nh5[_v-3bbe1ee4],\nh6[_v-3bbe1ee4],\nfigure[_v-3bbe1ee4],\nform[_v-3bbe1ee4],\nfieldset[_v-3bbe1ee4],\nlegend[_v-3bbe1ee4],\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\np[_v-3bbe1ee4],\nblockquote[_v-3bbe1ee4],\nth[_v-3bbe1ee4],\ntd[_v-3bbe1ee4],\npre[_v-3bbe1ee4],\nxmp[_v-3bbe1ee4] {\n  margin: 0;\n  padding: 0; }\n\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\nselect[_v-3bbe1ee4],\npre[_v-3bbe1ee4],\nxmp[_v-3bbe1ee4],\ntt[_v-3bbe1ee4],\ncode[_v-3bbe1ee4],\nkbd[_v-3bbe1ee4],\nsamp[_v-3bbe1ee4] {\n  line-height: inherit;\n  font-family: inherit; }\n\nh1[_v-3bbe1ee4],\nh2[_v-3bbe1ee4],\nh3[_v-3bbe1ee4],\nh4[_v-3bbe1ee4],\nh5[_v-3bbe1ee4],\nh6[_v-3bbe1ee4],\nsmall[_v-3bbe1ee4],\nbig[_v-3bbe1ee4],\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\nselect[_v-3bbe1ee4] {\n  font-size: inherit; }\n\naddress[_v-3bbe1ee4],\ncite[_v-3bbe1ee4],\ndfn[_v-3bbe1ee4],\nem[_v-3bbe1ee4],\ni[_v-3bbe1ee4],\noptgroup[_v-3bbe1ee4],\nvar[_v-3bbe1ee4] {\n  font-style: normal; }\n\ntable[_v-3bbe1ee4] {\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n  text-align: left; }\n\nul[_v-3bbe1ee4],\nol[_v-3bbe1ee4],\nmenu[_v-3bbe1ee4] {\n  list-style: none; }\n\nfieldset[_v-3bbe1ee4],\nimg[_v-3bbe1ee4] {\n  border: 0;\n  vertical-align: middle; }\n\narticle[_v-3bbe1ee4],\naside[_v-3bbe1ee4],\ndetails[_v-3bbe1ee4],\nfigcaption[_v-3bbe1ee4],\nfigure[_v-3bbe1ee4],\nfooter[_v-3bbe1ee4],\nheader[_v-3bbe1ee4],\nmain[_v-3bbe1ee4],\nmenu[_v-3bbe1ee4],\nnav[_v-3bbe1ee4],\nsection[_v-3bbe1ee4],\nsummary[_v-3bbe1ee4] {\n  display: block; }\n\naudio[_v-3bbe1ee4],\ncanvas[_v-3bbe1ee4],\nvideo[_v-3bbe1ee4] {\n  display: inline-block; }\n\nblockquote[_v-3bbe1ee4]:before,\nblockquote[_v-3bbe1ee4]:after,\nq[_v-3bbe1ee4]:before,\nq[_v-3bbe1ee4]:after {\n  content: \" \"; }\n\ntextarea[_v-3bbe1ee4],\npre[_v-3bbe1ee4],\nxmp[_v-3bbe1ee4] {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n\ntextarea[_v-3bbe1ee4] {\n  resize: vertical; }\n\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\nselect\na[_v-3bbe1ee4] {\n  outline: 0 none; }\n\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\nselect[_v-3bbe1ee4] {\n  color: inherit; }\n  input[_v-3bbe1ee4]:disabled,\n  textarea[_v-3bbe1ee4]:disabled,\n  button[_v-3bbe1ee4]:disabled,\n  select[_v-3bbe1ee4]:disabled {\n    opacity: 1; }\n\nbutton[_v-3bbe1ee4]::-moz-focus-inner,\ninput[_v-3bbe1ee4]::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\ninput[type=\"button\"][_v-3bbe1ee4],\ninput[type=\"submit\"][_v-3bbe1ee4],\ninput[type=\"reset\"][_v-3bbe1ee4],\ninput[type=\"file\"][_v-3bbe1ee4]::-webkit-file-upload-button,\ninput[type=\"search\"][_v-3bbe1ee4]::-webkit-search-cancel-button {\n  -webkit-appearance: none;\n  appearance: none; }\n\nmark[_v-3bbe1ee4] {\n  background-color: transparent; }\n\na[_v-3bbe1ee4],\nins[_v-3bbe1ee4],\ns[_v-3bbe1ee4],\nu[_v-3bbe1ee4],\ndel[_v-3bbe1ee4] {\n  text-decoration: none; }\n\na[_v-3bbe1ee4] {\n  color: #00afc7; }\n\n.g-clear[_v-3bbe1ee4]::after,\n.g-mod[_v-3bbe1ee4]::after {\n  display: block;\n  overflow: hidden;\n  clear: both;\n  height: 0;\n  content: \" \"; }\n\n@font-face {\n  font-family: yofont;\n  src: url(//ss.qunarzz.com/yo/font/1.0.3/yofont.woff) format(\"woff\"), url(//ss.qunarzz.com/yo/font/1.0.3/yofont.ttf) format(\"truetype\"); }\n\n.yo-ico[_v-3bbe1ee4] {\n  font-family: yofont !important;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  vertical-align: middle; }\n\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * lib中map使用“_”开头，本文件中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * 本文件中map使用\"_\"开头，extra中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * 合并base和extra中的同类base map\r\n * 用以解决业务方升级Yo时需比base和extra的一致性\r\n * 当extra为空时，base map将以base文件里的定义作为默认值\r\n * 当extra不为空时，base map使用extra文件里的定义\r\n */\n/**\n * Yo框架全局Variables\n * Yo基础变量map，如果不想定义某属性，将其value设置为null；\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\n * variables中map使用“_”开头，本文件中不使用\"_\"\n * variables ⇌ config\n */\n/**\r\n * Yo框架全局Variables\r\n * Yo基础变量map，如果不想定义某属性，将其value设置为null\r\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\r\n * 本文件中map使用\"_\"开头，config中不使用\"_\"\r\n * variables ⇌ config\r\n */\n/**\r\n * 合并variables和config中的同类map\r\n * 用以解决业务方升级Yo时需比config和variables的一致性\r\n * 当config为空时，使用variables中的map作为默认值\r\n * 当config不为空时，使用config中的定义\r\n */\n/**\r\n * Yo框架自定义全局函数\r\n * 扩充Sass默认函数库，用以增强语法\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的第一项\r\n * @function first\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的最后一项\r\n * @function last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的倒数第几项\r\n * @function nth-last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要返回的值在list中的倒数位置 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 移除SassList中的某个项目并返回新的List\r\n * @function remove\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {String} $value 指定需要被删除的值 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 截取SassList中的某个部分并返回新的List\r\n * @function slice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $start 指定需要截取的开始下标 <2.1.0>\r\n * @param {Integer} $end 指定需要截取的结束下标（不包括end），当该值缺省时默认为末尾下标 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 从SassList中添加/删除项目，然后返回新的List。\r\n * @function splice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要移除的开始下标 <2.1.0>\r\n * @param {Integer} $count 指定需要移除的数量，不可以为负值，0表示不移除 <2.1.0>\r\n * @param {String} $values 指定需要添加的新值（可以是多个），如果该值缺省，则表示只移除不添加新值 <2.1.0>\r\n */\n/**\r\n * Yo框架全局基础方法\r\n * 包括响应式方案，CSS3兼容性方案，厂商前缀方案，iconfont方案，flex布局等全局方法\r\n */\n/**\r\n * @module 功能\r\n * @description 给需要的属性加厂家前缀\r\n * @method _prefix\r\n * @version 1.0.0\r\n * @param {String} $property 指定属性 <1.0.0>\r\n * @param {String} $value 指定属性值 <1.0.0>\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 定义字体图标\r\n * @method _yofont\r\n * @version 1.0.0\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 四则运算(iOS6.0+,Android4.4+)\r\n * @method calc\r\n * @version 1.7.0\r\n * @param {String} $property 指定需要进行计算的CSS属性 <1.7.0>\r\n * @param {String} $value 与原生CSS语法一致，区别在于需要使用引号包裹表达式 <1.7.0>\r\n * @example <div class=\"calc\">四则运算</div>\r\n * .calc { @include calc(width, \"100% - 100px\"); }\r\n */\n/**\r\n * @module 功能\r\n * @description 定义响应式方案\r\n * @method responsive\r\n * @version 1.0.0\r\n * @param {String} $media 指定媒体查询条件，取值为`config`文件map `media-types`中的值 <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除浮动方案\r\n * @method clearfix\r\n * @version 1.0.0\r\n * @param {String} $type 指定清除浮动的方式，包括：pseudo-element | bfc，默认值：pseudo-element <1.8.5>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除行内级元素间间隙方案\r\n * @method killspace\r\n * @version 1.0.0\r\n * @param {Length} $font-size 指定子元素字号，默认值：.14rem <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <span class=\"item\">1</span>\r\n *      <span class=\"item\">2</span>\r\n *      <span class=\"item\">3</span>\r\n * </div>\r\n * .demo {@include killspace;}\r\n */\n/**\r\n * @module 功能\r\n * @description 元素在包含块中的对齐方式，默认为水平垂直对齐\r\n * @method align\r\n * @version 2.0.0\r\n * @param {String} $flexbox 指定包含块布局方式，可选值：flex | inline-flex，默认值：flex <2.0.0>\r\n * @param {String} $type 指定居中元素类型，可选值：image | text | other，默认值：text <2.0.0>\r\n * @param {Keywords} $justify-content 指定元素水平对齐方式，取值与`justify-content`属性一致，默认值：center <2.0.0>\r\n * @param {Keywords} $align-items 指定元素垂直对齐方式，取值与`align-items`属性一致，默认值：center <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <img class=\"item\" alt=\"未知尺寸图片居中\" />\r\n * </div>\r\n * .demo {@include align;}\r\n */\n/**\r\n * @module 功能\r\n * @description 定义文档根节点是否允许滚动\r\n * @method root-scroll\r\n * @version 1.4.0\r\n * @param {Boolean} $is-scroll 指定是否有滚动，默认值：false <1.8.6>\r\n */\n/**\r\n * @module 功能\r\n * @description 定义是否有滚动条\r\n * @method overflow\r\n * @version 1.0.0\r\n * @param {String} $overflow 取值与最新原生语法一致，默认值：auto <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 生成全屏方法\r\n * @method fullscreen\r\n * @version 1.7.0\r\n * @param {Integer} $z-index 指定层叠级别 <1.7.0>\r\n * @param {Keywords} $position 指定定位方式，取除`static | relative`之外的值，默认值：absolute <1.8.5>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义使用何种滤镜\r\n * @method filter\r\n * @version 1.7.0\r\n * @param {String} $filter 取值与`filter`属性一致 <1.7.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义UA默认外观\r\n * @method appearance\r\n * @version 1.0.0\r\n * @param {String} $appearance 取值与`appearance`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义如何选中内容\r\n * @method user-select\r\n * @version 1.0.0\r\n * @param {String} $user-select 取值与`user-select`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义盒模型\r\n * @method box-sizing\r\n * @version 1.0.0\r\n * @param {String} $box-sizing 指定盒模型类型，取值与`box-sizing`属性一致，默认值：border-box <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义渐变色值\r\n * @method gradient\r\n * @version 1.0.0\r\n * @param {String} $type 指定渐变的4种类型：linear, repeating-linear, radial, repeating-radial <1.0.0>\r\n * @param {String} $dir 指定渐变方向，可选值：[left | right] || [top | bottom] | angle <2.0.0>\r\n * @param {String} $gradient 指定渐变取值，与w3c最新原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景图像缩放（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-size\r\n * @version 1.4.0\r\n * @param {Keywords | Length} $background-size 指定背景图缩放值，取值与`background-size`属性一致 <1.4.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景裁减（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-clip\r\n * @version 1.6.0\r\n * @param {Keywords} $background-clip 指定背景图缩放值，取值与`background-clip`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景显示区域（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-origin\r\n * @version 1.6.0\r\n * @param {Keywords} $background-origin 指定背景图`background-position`属性计算相对的参考点，取值与`background-origin`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义圆角，用于修复某些安卓机型上“圆角+边框+背景”，背景溢出的情况\r\n * @method border-radius\r\n * @version 1.6.0\r\n * @param {Length} $border-radius 指定元素的圆角半径，取值与`border-radius`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 为元素添加边框（包括1px边框）\r\n * @method border\r\n * @version 2.0.0\r\n * @param {String} $border-width 指定边框厚度（单位为px），默认值：1px，取值与`border-width`属性一致，不同方向代表边框位置 <2.0.0>\r\n * @param {String} $border-color 指定边框颜色 <2.0.0>\r\n * @param {String} $border-style 指定边框样式 <2.0.0>\r\n * @param {String} $radius 指定边框圆角半径，默认值：null <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义简单变换\r\n * @method transform\r\n * @version 1.0.0\r\n * @param {String} $transform 取值范围与`transform`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义变换原点\r\n * @method transform-origin\r\n * @version 1.0.0\r\n * @param {Length | Percentage | Keywords} $transform-origin 取值范围与`transform-origin`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定某元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化\r\n * @method transform-style\r\n * @version 2.0.0\r\n * @param {String} $transform-style 取值范围与`transform-style`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生透视效果。「z>0」的三维元素比正常大，而「z<0」时则比正常小，大小程度由该属性的值决定。\r\n * @method perspective\r\n * @version 2.0.0\r\n * @param {none | Length} $perspective 取值范围与`perspective`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定透视点的位置\r\n * @method perspective-origin\r\n * @version 2.0.0\r\n * @param {Length | Percentage | Keywords} $perspective-origin 取值范围与`perspective-origin`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定元素背面面向用户时是否可见\r\n * @method backface-visibility\r\n * @version 2.0.0\r\n * @param {Keywords} $backface-visibility 取值范围与`backface-visibility`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 定义动画\r\n * @method animation\r\n * @version 1.0.0\r\n * @param {String} $animation 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定需要引用的动画名称\r\n * @method animation-name\r\n * @version 3.0.0\r\n * @param {String} $animation-name 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行一次所持续的时长\r\n * @method animation-duration\r\n * @version 3.0.0\r\n * @param {String} $animation-duration 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行方式\r\n * @method animation-timing-function\r\n * @version 3.0.0\r\n * @param {String} $animation-timing-function 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画延迟多久之后再开始\r\n * @method animation-delay\r\n * @version 3.0.0\r\n * @param {String} $animation-delay 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画循环几次\r\n * @method animation-iteration-count\r\n * @version 3.0.0\r\n * @param {String} $animation-iteration-count 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动方向\r\n * @method animation-direction\r\n * @version 3.0.0\r\n * @param {String} $animation-direction 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动状态\r\n * @method animation-play-state\r\n * @version 3.0.0\r\n * @param {String} $animation-play-state 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画时间之外的状态\r\n * @method animation-fill-mode\r\n * @version 3.0.0\r\n * @param {String} $animation-fill-mode 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Transition\r\n * @description 定义补间\r\n * @method transition\r\n * @version 1.0.0\r\n * @param {String} $transition 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义显示类型为伸缩盒\r\n * @method flexbox\r\n * @version 1.0.0\r\n * @param {String} $flexbox 默认值：flex，可选值：flex | inline-flex <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素如何分配空间\r\n * @method flex\r\n * @version 1.0.0\r\n * @param {Number} $flex 取值与`flex`属性一致，默认值：1 <1.0.0>\r\n * @param {String} $direction 默认值: row，可选值：row | column <1.5.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的排版顺序\r\n * @method order\r\n * @version 1.0.0\r\n * @param {Integer} $order 取值与`order`属性一致，默认值：1 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素流动方向及遇见边界时是否换行(iOS7.0+,Android4.4+)\r\n * @method flex-flow\r\n * @version 2.0.0\r\n * @param {String} $flex-flow 取值与`flex-flow`属性一致，默认值：row nowrap <2.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的流动方向\r\n * @method flex-direction\r\n * @version 1.0.0\r\n * @param {String} $flex-direction 取值与`flex-direction`属性一致，默认值：row <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素溢出后排版(iOS7.0+,Android4.4+)\r\n * @method flex-wrap\r\n * @version 1.0.0\r\n * @param {String} $flex-wrap 取值与`flex-wrap`属性一致，默认值：nowrap <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器主轴对齐方式(其中`space-around`值需要iOS7.0+,Android4.4+)\r\n * @method justify-content\r\n * @version 1.0.0\r\n * @param {String} $justify-content 取值与`justify-content`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义多行弹性容器侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-content\r\n * @version 1.8.5\r\n * @param {String} $align-content 取值与`align-content`属性一致，默认值：center <1.8.5>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义单行弹性容器侧轴对齐方式\r\n * @method align-items\r\n * @version 1.0.0\r\n * @param {String} $align-items 取值与`align-items`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器中子元素自身的在侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-self\r\n * @version 1.0.0\r\n * @param {String} $align-self 取值与`align-self`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成矩形方法\r\n * @method rect\r\n * @version 1.0.0\r\n * @param {Length} $width 定义矩形的长度 <1.0.0>\r\n * @param {Length} $height 定义矩形的高度 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成正方形方法\r\n * @method square\r\n * @version 1.0.0\r\n * @param {Length} $size 定义正方形的边长 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成圆形方法\r\n * @method circle\r\n * @version 1.0.0\r\n * @param {Length} $size 定义圆的半径长度 <1.0.0>\r\n * @param {Length} $radius 定义圆的圆角半径长度 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 链接处理方法\r\n * @method link\r\n * @version 1.0.0\r\n * @param {Color} $color 定义链接颜色 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 文本碰到边界是否换行\r\n * @method wrap\r\n * @version 1.0.0\r\n * @param {Boolean} $is-wrap 定义文本是否换行，默认值：true <2.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 单行文本溢出时显示省略号\r\n * @method ellipsis\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n * @param {Integer} $line-clamp 定义需要显示的行数，默认值：1（即使用单行溢出的处理方案），需要注意的是本参数只支持webkit内核 <2.1.2>\r\n */\n/**\r\n * @module 文本\r\n * @description 文字隐藏方案\r\n * @method texthide\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n */\n/**\r\n * Yo框架全局Reset\r\n * Yo重置Mobile及高级浏览器上常见的差异\r\n */\n*[_v-3bbe1ee4],[_v-3bbe1ee4]\n::before,[_v-3bbe1ee4]\n::after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent; }\n\nhtml[_v-3bbe1ee4],\nbody[_v-3bbe1ee4] {\n  overflow: hidden;\n  height: 100%; }\n\n[_v-3bbe1ee4]::-webkit-scrollbar {\n  display: none; }\n\nhtml[_v-3bbe1ee4] {\n  background-color: #eee;\n  color: #212121;\n  font-size: 100px;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n   -ms-user-select: text;\n       user-select: text; }\n\nbody[_v-3bbe1ee4] {\n  margin: 0;\n  font-size: 0.14em;\n  line-height: 1.5;\n  font-family: Helvetica Neue, Helvetica, STHeiTi, sans-serif; }\n\nul[_v-3bbe1ee4],\nol[_v-3bbe1ee4],\ndl[_v-3bbe1ee4],\ndd[_v-3bbe1ee4],\nh1[_v-3bbe1ee4],\nh2[_v-3bbe1ee4],\nh3[_v-3bbe1ee4],\nh4[_v-3bbe1ee4],\nh5[_v-3bbe1ee4],\nh6[_v-3bbe1ee4],\nfigure[_v-3bbe1ee4],\nform[_v-3bbe1ee4],\nfieldset[_v-3bbe1ee4],\nlegend[_v-3bbe1ee4],\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\np[_v-3bbe1ee4],\nblockquote[_v-3bbe1ee4],\nth[_v-3bbe1ee4],\ntd[_v-3bbe1ee4],\npre[_v-3bbe1ee4],\nxmp[_v-3bbe1ee4] {\n  margin: 0;\n  padding: 0; }\n\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\nselect[_v-3bbe1ee4],\npre[_v-3bbe1ee4],\nxmp[_v-3bbe1ee4],\ntt[_v-3bbe1ee4],\ncode[_v-3bbe1ee4],\nkbd[_v-3bbe1ee4],\nsamp[_v-3bbe1ee4] {\n  line-height: inherit;\n  font-family: inherit; }\n\nh1[_v-3bbe1ee4],\nh2[_v-3bbe1ee4],\nh3[_v-3bbe1ee4],\nh4[_v-3bbe1ee4],\nh5[_v-3bbe1ee4],\nh6[_v-3bbe1ee4],\nsmall[_v-3bbe1ee4],\nbig[_v-3bbe1ee4],\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\nselect[_v-3bbe1ee4] {\n  font-size: inherit; }\n\naddress[_v-3bbe1ee4],\ncite[_v-3bbe1ee4],\ndfn[_v-3bbe1ee4],\nem[_v-3bbe1ee4],\ni[_v-3bbe1ee4],\noptgroup[_v-3bbe1ee4],\nvar[_v-3bbe1ee4] {\n  font-style: normal; }\n\ntable[_v-3bbe1ee4] {\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n  text-align: left; }\n\nul[_v-3bbe1ee4],\nol[_v-3bbe1ee4],\nmenu[_v-3bbe1ee4] {\n  list-style: none; }\n\nfieldset[_v-3bbe1ee4],\nimg[_v-3bbe1ee4] {\n  border: 0;\n  vertical-align: middle; }\n\narticle[_v-3bbe1ee4],\naside[_v-3bbe1ee4],\ndetails[_v-3bbe1ee4],\nfigcaption[_v-3bbe1ee4],\nfigure[_v-3bbe1ee4],\nfooter[_v-3bbe1ee4],\nheader[_v-3bbe1ee4],\nmain[_v-3bbe1ee4],\nmenu[_v-3bbe1ee4],\nnav[_v-3bbe1ee4],\nsection[_v-3bbe1ee4],\nsummary[_v-3bbe1ee4] {\n  display: block; }\n\naudio[_v-3bbe1ee4],\ncanvas[_v-3bbe1ee4],\nvideo[_v-3bbe1ee4] {\n  display: inline-block; }\n\nblockquote[_v-3bbe1ee4]:before,\nblockquote[_v-3bbe1ee4]:after,\nq[_v-3bbe1ee4]:before,\nq[_v-3bbe1ee4]:after {\n  content: \" \"; }\n\ntextarea[_v-3bbe1ee4],\npre[_v-3bbe1ee4],\nxmp[_v-3bbe1ee4] {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n\ntextarea[_v-3bbe1ee4] {\n  resize: vertical; }\n\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\nselect\na[_v-3bbe1ee4] {\n  outline: 0 none; }\n\ninput[_v-3bbe1ee4],\ntextarea[_v-3bbe1ee4],\nbutton[_v-3bbe1ee4],\nselect[_v-3bbe1ee4] {\n  color: inherit; }\n  input[_v-3bbe1ee4]:disabled,\n  textarea[_v-3bbe1ee4]:disabled,\n  button[_v-3bbe1ee4]:disabled,\n  select[_v-3bbe1ee4]:disabled {\n    opacity: 1; }\n\nbutton[_v-3bbe1ee4]::-moz-focus-inner,\ninput[_v-3bbe1ee4]::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\ninput[type=\"button\"][_v-3bbe1ee4],\ninput[type=\"submit\"][_v-3bbe1ee4],\ninput[type=\"reset\"][_v-3bbe1ee4],\ninput[type=\"file\"][_v-3bbe1ee4]::-webkit-file-upload-button,\ninput[type=\"search\"][_v-3bbe1ee4]::-webkit-search-cancel-button {\n  -webkit-appearance: none;\n  appearance: none; }\n\nmark[_v-3bbe1ee4] {\n  background-color: transparent; }\n\na[_v-3bbe1ee4],\nins[_v-3bbe1ee4],\ns[_v-3bbe1ee4],\nu[_v-3bbe1ee4],\ndel[_v-3bbe1ee4] {\n  text-decoration: none; }\n\na[_v-3bbe1ee4] {\n  color: #00afc7; }\n\n.g-clear[_v-3bbe1ee4]::after,\n.g-mod[_v-3bbe1ee4]::after {\n  display: block;\n  overflow: hidden;\n  clear: both;\n  height: 0;\n  content: \" \"; }\n\n@font-face {\n  font-family: yofont;\n  src: url(//ss.qunarzz.com/yo/font/1.0.3/yofont.woff) format(\"woff\"), url(//ss.qunarzz.com/yo/font/1.0.3/yofont.ttf) format(\"truetype\"); }\n\n.yo-ico[_v-3bbe1ee4] {\n  font-family: yofont !important;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  vertical-align: middle; }\n\n.commonList-container[_v-3bbe1ee4] {\n  padding-bottom: 40px;\n  position: relative;\n  width: 100%; }\n  .commonList-container .class_introduce_con[_v-3bbe1ee4] {\n    position: relative;\n    padding: 5px 10px 0;\n    width: 100%; }\n    .commonList-container .class_introduce_con[_v-3bbe1ee4]::after {\n      pointer-events: none;\n      position: absolute;\n      z-index: 999;\n      top: 0;\n      left: 0;\n      overflow: hidden;\n      content: \" \";\n      border-color: #E1E1E1;\n      border-style: solid;\n      border-width: 0 0 1px 0;\n      -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0; }\n      @media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.4895833333333333), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {\n        .commonList-container .class_introduce_con[_v-3bbe1ee4]::after {\n          width: 100%;\n          height: 100%; } }\n      @media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.4895833333333335), (min-resolution: 144dpi) and (max-resolution: 239dpi), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {\n        .commonList-container .class_introduce_con[_v-3bbe1ee4]::after {\n          width: 200%;\n          height: 200%;\n          -webkit-transform: scale(0.5);\n          -ms-transform: scale(0.5);\n              transform: scale(0.5); } }\n      @media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {\n        .commonList-container .class_introduce_con[_v-3bbe1ee4]::after {\n          width: 300%;\n          height: 300%;\n          -webkit-transform: scale(0.33333);\n          -ms-transform: scale(0.33333);\n              transform: scale(0.33333); } }\n    .commonList-container .class_introduce_con .comment_tit[_v-3bbe1ee4] {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      height: 50px; }\n      .commonList-container .class_introduce_con .comment_tit .img[_v-3bbe1ee4] {\n        border-radius: 20px;\n        background-clip: padding-box !important;\n        width: 46px;\n        height: 46px;\n        background: pink;\n        margin-right: 5px;\n        margin-top: 5px;\n        -webkit-box-shadow: none !important;\n                box-shadow: none !important; }\n      .commonList-container .class_introduce_con .comment_tit .comment_dis[_v-3bbe1ee4] {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n        -moz-box-flex: 1;\n         -ms-flex: 1;\n             flex: 1;\n        width: .1px;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -moz-box-pack: center;\n         -ms-flex-pack: center;\n             justify-content: center;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n        -moz-box-orient: vertical;\n        -moz-box-direction: normal;\n         -ms-flex-direction: column;\n             flex-direction: column;\n        width: 100% !important;\n        padding: 5px 0; }\n        .commonList-container .class_introduce_con .comment_tit .comment_dis span[_v-3bbe1ee4] {\n          display: block !important;\n          width: 80% !important;\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          -moz-box-flex: 1;\n           -ms-flex: 1;\n               flex: 1;\n          width: .1px;\n          color: #999;\n          font-size: 12px; }\n        .commonList-container .class_introduce_con .comment_tit .comment_dis .commentname[_v-3bbe1ee4] {\n          font-size: 14px;\n          color: #333;\n          line-height: 30px; }\n    .commonList-container .class_introduce_con .class_introduce_text[_v-3bbe1ee4] {\n      font-size: 14px;\n      color: #666;\n      padding: 5px 0;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex; }\n\n.remindNews[_v-3bbe1ee4] {\n  margin-left: 25px !important;\n  margin-right: 25px !important;\n  margin-top: 10px !important;\n  margin-bottom: 10px !important;\n  padding-left: 20px !important;\n  padding-right: 20px !important;\n  padding-top: 6px !important;\n  padding-bottom: 7px !important; }\n\n#common[_v-3bbe1ee4] {\n  position: fixed;\n  overflow: scroll;\n  -webkit-overflow-scrolling: touch;\n  width: 100%;\n  height: 87%;\n  z-index: 1;\n  background: #f0f0f0; }\n\n.commonroom[_v-3bbe1ee4] {\n  width: 100% !important;\n  padding: 0 10px; }\n  .commonroom ul[_v-3bbe1ee4] {\n    padding-bottom: 10px;\n    width: 100%;\n    min-height: 480px; }\n    .commonroom ul li[_v-3bbe1ee4] {\n      min-height: 70px;\n      padding-bottom: 20px; }\n      .commonroom ul li .timebox[_v-3bbe1ee4] {\n        text-align: center;\n        width: 100%;\n        max-width: 640px;\n        /*height:30px;*/ }\n        .commonroom ul li .timebox .talk_time[_v-3bbe1ee4] {\n          display: inline-block;\n          /*height:20px;*/\n          color: #FFFFFF;\n          line-height: 20px;\n          padding: 0 10px;\n          font-size: 11px;\n          background: #cccccc;\n          border-radius: 4px;\n          background-clip: padding-box !important; }\n      .commonroom ul li .right[_v-3bbe1ee4] {\n        margin-left: 30px; }\n        .commonroom ul li .right .mainPic[_v-3bbe1ee4] {\n          max-height: 230px;\n          max-width: 230px;\n          margin-top: 5px;\n          margin-left: 5px;\n          position: relative; }\n          .commonroom ul li .right .mainPic .picBox[_v-3bbe1ee4] {\n            max-height: 230px;\n            max-width: 230px; }\n            .commonroom ul li .right .mainPic .picBox .picBox_icon[_v-3bbe1ee4] {\n              width: 0;\n              height: 0;\n              border-left: 10px solid transparent;\n              border-right: 10px solid transparent;\n              border-top: 10px solid #fff;\n              border-bottom: transparent;\n              position: absolute;\n              left: 0;\n              top: 8px;\n              overflow: hidden; }\n            .commonroom ul li .right .mainPic .picBox .picBox_icon1_container[_v-3bbe1ee4] {\n              position: absolute;\n              left: 1;\n              top: 8px;\n              width: 10px;\n              height: 20px;\n              overflow: hidden; }\n              .commonroom ul li .right .mainPic .picBox .picBox_icon1_container img[_v-3bbe1ee4] {\n                max-height: 230px;\n                max-width: 230px;\n                opacity: 1;\n                margin-top: -8px; }\n            .commonroom ul li .right .mainPic .picBox .picBox_icon1[_v-3bbe1ee4] {\n              position: absolute;\n              border-right: 10px solid transparent;\n              border-bottom: 20px solid #f0f0f0;\n              border-top: transparent;\n              width: 10px;\n              height: 20px; }\n            .commonroom ul li .right .mainPic .picBox .picBox_icon2[_v-3bbe1ee4] {\n              position: absolute;\n              border-right: 10px solid #f0f0f0;\n              border-bottom: 3px solid transparent; }\n            .commonroom ul li .right .mainPic .picBox img[_v-3bbe1ee4] {\n              max-height: 230px;\n              max-width: 230px;\n              opacity: 0; }\n          .commonroom ul li .right .mainPic .picBox_container[_v-3bbe1ee4] {\n            max-height: 230px;\n            max-width: 220px;\n            position: absolute;\n            border-radius: 4px;\n            top: 0;\n            left: 10px;\n            overflow: hidden; }\n            .commonroom ul li .right .mainPic .picBox_container img[_v-3bbe1ee4] {\n              max-height: 230px;\n              max-width: 230px;\n              margin-left: -10px; }\n        .commonroom ul li .right h2[_v-3bbe1ee4] {\n          font-size: 12px;\n          font-weight: normal;\n          min-height: 20px;\n          margin-left: 5px;\n          color: #666; }\n        .commonroom ul li .right .audiomain[_v-3bbe1ee4] {\n          height: 30px;\n          display: inline-block; }\n          .commonroom ul li .right .audiomain .main[_v-3bbe1ee4] {\n            text-indent: 30px;\n            color: #333; }\n          .commonroom ul li .right .audiomain .voice[_v-3bbe1ee4] {\n            height: 40px; }\n            .commonroom ul li .right .audiomain .voice .fa[_v-3bbe1ee4] {\n              position: relative;\n              display: inline-block; }\n            .commonroom ul li .right .audiomain .voice .min[_v-3bbe1ee4] {\n              position: absolute;\n              right: -53px;\n              top: 8px;\n              width: 40px;\n              color: #666;\n              font-size: 12px; }\n        .commonroom ul li .right .main[_v-3bbe1ee4] {\n          min-width: 40px;\n          min-height: 40px;\n          font-size: 14px;\n          color: #333;\n          background-color: #fff;\n          border-radius: 3px;\n          padding: 7px 10px 6px;\n          position: relative;\n          display: inline-block;\n          line-height: 27px;\n          word-break: break-all;\n          word-wrap: break-word;\n          max-width: 80%;\n          margin-left: 15px;\n          margin-top: 5px;\n          padding-left: 12px; }\n          .commonroom ul li .right .main span[_v-3bbe1ee4] {\n            display: block;\n            word-break: keep-all;\n            word-wrap: break-word;\n            overflow: hidden;\n            max-width: 500px; }\n        .commonroom ul li .right .noPlay .fa[_v-3bbe1ee4]:after {\n          content: \"\";\n          position: absolute;\n          top: -14px;\n          left: 35px;\n          width: 12px;\n          z-index: 100;\n          height: 17px;\n          background: url(\"//pic.davdian.com/free/2016/12/24/22_32_16dffc36683debdbbf6a813306594422.png\") no-repeat;\n          background-size: 12px; }\n        .commonroom ul li .right .play .fa[_v-3bbe1ee4]:after {\n          content: \"\";\n          position: absolute;\n          left: 31px;\n          width: 20px;\n          top: -15px;\n          z-index: 100;\n          height: 20px;\n          background: url(\"//pic.davdian.com/free/2017/02/27/playVoice.gif\") no-repeat;\n          background-size: 20px; }\n        .commonroom ul li .right .main[_v-3bbe1ee4]:before {\n          width: 0;\n          height: 0;\n          border-left: 10px solid transparent;\n          border-right: 10px solid transparent;\n          border-top: 20px solid #fff;\n          border-bottom: transparent;\n          content: \"\";\n          position: absolute;\n          left: -10px;\n          top: 8px; }\n        .commonroom ul li .right .main_picBox_icon2[_v-3bbe1ee4] {\n          position: absolute;\n          left: -15px;\n          border-right: 15px solid #f0f0f0;\n          border-bottom: 3px solid transparent; }\n      .commonroom ul li .head[_v-3bbe1ee4] {\n        width: 30px;\n        height: 30px;\n        float: left;\n        overflow: hidden; }\n        .commonroom ul li .head img[_v-3bbe1ee4] {\n          width: 30px;\n          height: 30px;\n          border-radius: 15px;\n          background-clip: padding-box !important; }\n    .commonroom ul .myself[_v-3bbe1ee4] {\n      padding-bottom: 20px;\n      overflow: hidden; }\n      .commonroom ul .myself .timebox[_v-3bbe1ee4] {\n        text-align: center;\n        width: 100%;\n        height: 30px; }\n        .commonroom ul .myself .timebox .talk_time[_v-3bbe1ee4] {\n          display: inline-block;\n          height: 20px;\n          color: #FFFFFF;\n          line-height: 20px;\n          padding: 0 5px;\n          background: #cccccc;\n          border-radius: 3px;\n          background-clip: padding-box !important; }\n      .commonroom ul .myself .right[_v-3bbe1ee4] {\n        float: right;\n        padding-right: 35px; }\n        .commonroom ul .myself .right h2[_v-3bbe1ee4] {\n          position: absolute;\n          font-size: 12px;\n          font-weight: normal;\n          margin-bottom: 5px; }\n        .commonroom ul .myself .right .audiomain[_v-3bbe1ee4] {\n          height: 30px; }\n          .commonroom ul .myself .right .audiomain .voice[_v-3bbe1ee4] {\n            width: 80px;\n            background: #FFFFFF;\n            border-radius: 5px;\n            background-clip: padding-box !important; }\n            .commonroom ul .myself .right .audiomain .voice .fa[_v-3bbe1ee4] {\n              position: relative;\n              display: inline-block; }\n            .commonroom ul .myself .right .audiomain .voice .min[_v-3bbe1ee4] {\n              position: absolute;\n              right: -53px;\n              top: 8px;\n              width: 40px;\n              color: #666;\n              font-size: 12px; }\n        .commonroom ul .myself .right .main[_v-3bbe1ee4] {\n          float: right;\n          font-size: 14px;\n          background-color: #fff;\n          color: #666;\n          border-radius: 3px;\n          padding: 7px 10px 6px;\n          position: relative;\n          display: inline-block;\n          line-height: 17px;\n          word-break: break-all;\n          word-wrap: break-word;\n          max-width: 70%;\n          margin-left: 4px;\n          word-wrap: break-word;\n          word-break: break-all; }\n        .commonroom ul .myself .right .play .fa[_v-3bbe1ee4]:after {\n          content: \"\";\n          position: absolute;\n          top: -11px;\n          left: 39px;\n          width: 12px;\n          z-index: 100;\n          height: 13px;\n          background: url(\"//pic.davdian.com/free/voice_img_311.gif\") no-repeat;\n          background-size: 12px; }\n        .commonroom ul .myself .right .main[_v-3bbe1ee4]:before {\n          width: 0;\n          height: 0;\n          border-left: 0px solid transparent;\n          border-right: 0px solid transparent;\n          border-top: 0px solid #fff;\n          border-bottom: transparent;\n          content: \"\";\n          position: absolute;\n          left: 0px;\n          top: 0px; }\n        .commonroom ul .myself .right .main[_v-3bbe1ee4]:after {\n          width: 0;\n          height: 0;\n          border-left: 10px solid transparent;\n          border-right: 10px solid transparent;\n          border-top: 10px solid #fff;\n          border-bottom: transparent;\n          content: \"\";\n          position: absolute;\n          right: -10px;\n          top: 8px; }\n      .commonroom ul .myself .head[_v-3bbe1ee4] {\n        position: absolute;\n        right: 0;\n        width: 25px;\n        height: 25px;\n        float: left;\n        overflow: hidden;\n        border-radius: 25px;\n        background-clip: padding-box !important; }\n        .commonroom ul .myself .head img[_v-3bbe1ee4] {\n          width: 25px;\n          height: 25px; }\n", ""]);

	// exports


/***/ },

/***/ 1508:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div id='common'>
	//         <div class="commonroom">
	// 	        <ul id="ulList">
	// 	            <audio preload="auto" class='allAudio'></audio>
	// 	            <li class='teacherChatData' v-for="(common,index) in barrageList" :key="common.uuid" msg_id="{{decodeURIComponent(common.speake.name)}}">
	// 	                <div class="timebox" v-if='index == 0 || (common.msg.time - barrageList[index - 1].msg.time) > 5*60*1000'>
	// 	                    <span class="talk_time"  v-if="new Date()-common.msg.time < 60*60*12*1000">{{getTime(parseInt(common.msg.time))}}</span>
	// 	                    <span class="talk_time"  v-if="new Date()-common.msg.time >= 60*60*12*1000">{{getFullTime(parseInt(common.msg.time))}}</span>
	// 	                </div>
	// 	                <div class="timebox">
	// 	                	<div class='talk_time remindNews' v-if='common.isTips || common.allMsg && JSON.parse(common.allMsg) && JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1'>{{decodeURIComponent(common.msg.content)}}</div>
	// 	                </div>
	//
	//
	// 	                <span class="head" v-if='!(common.isTips || common.allMsg && JSON.parse(common.allMsg) && JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1)'>
	// 	                    <img :src="common.speaker.avatar || defaultAvatar">
	// 	                </span>
	// 	                <div class="right" v-if='!(common.isTips || common.allMsg && JSON.parse(common.allMsg) && JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1)'>
	// 	                    <h2>{{decodeURIComponent(common.speaker.name)}}</h2>
	// 	                    <!--text类型的信息-->
	// 	                    <div  v-if="common.msg.type==0" class='main' :class="{'blue':common.is_answer}">
	// 	                        <i class='main_picBox_icon2'></i>
	// 	                        <span class='TextMessageSpan formfield'>{{decodeURIComponent(common.msg.content)}}</span>
	// 	                    </div>
	// 	                    <!--语音类型的信息-->
	// 	                    <div class="audiomain" @click="playVoiceFlag(index, common)" v-if="common.msg.type==2||common.msg.type==91" :class="{'replied':common.replied}">
	// 	                        <div class="voice"  :class="{ 'play': isPlay[index], 'noPlay': !isPlay[index] }">
	// 	                            <i class="fa fa-rss" v-if="common.msg.duration>0"></i>
	// 	                            <!-- <p :style="{width:(common.msg.voicewidth + 40)+'px'}" class="main">{{common.msg.duration}}''</p> -->
	// 	                            <p :style="{width:( getWidth(common.msg.duration) + 40)+'px'}" class="main">{{common.msg.duration}}''</p>
	// 	                            <i class='curcle-full' v-if='!curcleFullHash[common.uuid] && !common.msg.curcleFullHash'></i>
	// 	                        </div>
	// 	                        <div class='audio' :data-src="common.msg.url" preload="auto" :data-type=1 :data-index="index" v-if="common.msg.type==2"></div>
	// 	                        <div class='audio' :data-src="common.msg.url" preload="auto" :data-type=91 :data-index="index" v-if="common.msg.type==91"></div>
	// 	                    </div>
	// 	                    <!--图片类型的信息-->
	// 	                    <div v-if="common.msg.type==1" class="mainPic">
	// 	                        <div class="picBox">
	// 	                            <div class='picBox_icon1_container'>
	// 	                                <i class='picBox_icon1'></i>
	// 	                                <i class='picBox_icon2'></i>
	// 	                                <img :src="common.msg.url" alt="">
	// 	                            </div>
	// 	                            <img :src="common.msg.url" alt="">
	// 	                        </div>
	// 	                        <div class="picBox_container" @click='previewImage(common.uuid)'>
	// 	                            <img :style="getImageStyle(common)" :src="common.msg.url" alt="">
	// 	                        </div>
	// 	                    </div>
	// 	                </div>
	// 	            </li>
	// 	        </ul>
	// 	        <div class="bottom"></div>
	// 	    </div>
	//     </div>
	// </template>
	//
	// <script>
	// import layout from "../layout/api.es6";
	exports.default = {
	    props: ['data', 'flag', 'id'],
	    data: function data() {
	        return {
	            teacherDownMore: true,
	            isPlay: [],
	            curcleFullHash: {},
	            length: null,
	            defaultAvatar: '//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png'
	        };
	    },
	    created: function created() {},
	    mounted: function mounted() {
	        this.$nextTick(function () {
	            setTimeout(function () {
	                document.getElementById('common').scrollTop = document.getElementById('common').scrollHeight;
	            }, 100);
	            this.initScrool();
	        });
	        this.init();
	    },

	    computed: {
	        barrageList: function barrageList() {
	            window.testData = this.data;
	            return this.data || [];
	        },
	        updataflagteacher: function updataflagteacher() {
	            return this.flag || false;
	        }
	    },
	    components: {},
	    methods: {
	        initScrool: function initScrool() {
	            $('#common').on("scroll", function () {
	                if (document.getElementById('common').scrollTop > document.getElementById('common').scrollHeight - parseInt(document.body.clientHeight * 0.87) - 2) {
	                    document.getElementById('common').scrollTop = document.getElementById('common').scrollHeight - parseInt(document.body.clientHeight * 0.87) - 2;
	                }
	                if (document.getElementById('common').scrollTop < 1) {
	                    document.getElementById('common').scrollTop = 1;
	                }
	            });
	        },
	        getWidth: function getWidth(duration) {
	            return (duration + 65) * 2 > 200 ? 200 : (duration + 65) * 2;
	        },
	        init: function init() {
	            this.curcleFullHash = JSON.parse(localStorage.getItem('curcleFullHash_' + this.id)) || {};
	            this.scroolEvent();
	        },
	        scroolEvent: function scroolEvent() {
	            var that = this;
	            $('#common').on("scroll", function () {
	                if (document.getElementById('common').scrollTop < 100 && that.updataflagteacher) {
	                    that.$emit('getupdatateacher', that.updataflagteacher);
	                }
	            });
	        },

	        getTime: function getTime(second) {
	            var s = new Date(second).getSeconds();
	            var m = new Date(second).getMinutes();
	            var h = new Date(second).getHours();
	            var str;
	            if (h) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else if (m) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            }
	            return str;
	        },
	        getFullTime: function getFullTime(second) {
	            var y = new Date(second).getFullYear();
	            var monthtime = new Date(second).getMonth();
	            var daytime = new Date(second).getDate();
	            var s = new Date(second).getSeconds();
	            var m = new Date(second).getMinutes();
	            var h = new Date(second).getHours();
	            var str;
	            var fullTime;
	            if (h) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else if (m) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            }
	            fullTime = y + '年' + (monthtime + 1) + '月' + daytime + '日' + str;

	            return fullTime;
	        },
	        getImage: function getImage(w, h) {
	            var width, height;
	            if (w - h > 0) {
	                if (w > 230) {
	                    width = '230px';
	                    height = 230 * (h / w) + 'px';
	                }
	            } else {
	                if (h > 230) {
	                    height = '230px';
	                    width = 230 * (w / h) + 'px';
	                }
	            }
	            return {
	                width: width,
	                height: height
	            };
	        },
	        getImageStyle: function getImageStyle(item) {
	            var obj, o;
	            if (item.imageInfo) {
	                obj = item.imageInfo;
	                o = this.getImage(item.imageInfo.width, item.imageInfo.height);
	                return o;
	            } else {
	                try {
	                    obj = JSON.parse(JSON.parse(JSON.parse(item.allMsg).content).extra).info.imageInfo;
	                    o = this.getImage(obj.width, obj.height);
	                    return o;
	                } catch (e) {
	                    return {};
	                }
	            }
	        },
	        //语音
	        getJsObj: function getJsObj(index) {
	            if (!$('#ulList li').eq(index)[0]) {
	                return 'no';
	            }
	            if ($('#ulList li').eq(index).find('.audio') && $('#ulList li').eq(index).find('.audio').attr('data-src')) {
	                $('.allAudio').get(0).src = $('#ulList li').eq(index).find('.audio').attr('data-src');
	                return $('.allAudio').get(0);
	            } else {
	                return false;
	            }
	        },
	        getJqObj: function getJqObj(index) {
	            return $('#ulList li').eq(index).find('.audiomain');
	        },
	        playVoiceFlag: function playVoiceFlag(index) {
	            var that = this;
	            var audioJs = that.getJsObj(index);
	            var audioJq = that.getJqObj(index);
	            if (this.barrageList[index]) {
	                this.curcleFullHash[this.barrageList[index].uuid] = true;
	            }
	            $('#ulList li').eq(index).find('.curcle-full').css('display', 'none');
	            localStorage.setItem('curcleFullHash_' + this.id, JSON.stringify(this.curcleFullHash));

	            if (that.playIndexFlag > that.barrageList.length - 1) {
	                that.playIndexFlag = that.barrageList.length - 1;
	            }
	            if (index == 'no') {
	                that.playIndexFlag = index + 1;
	                that.getTeacherListAudio();
	                return;
	            }
	            if (audioJs) {
	                if (index == that.playIndexFlag) {
	                    if (that.barrageList[index].isPlay) {
	                        audioJs.pause();
	                        that.barrageList[index].isPlay = false;
	                        audioJq.removeClass('play');
	                    } else {
	                        audioJs.play();
	                        that.barrageList[index].isPlay = true;
	                        audioJq.addClass('play');
	                    }
	                } else {
	                    console.log("audioJs", audioJs);
	                    if (that.playIndexFlag || that.playIndexFlag == 0) {
	                        that.getJqObj(that.playIndexFlag).removeClass('play');
	                        that.barrageList[that.playIndexFlag].isPlay = false;
	                    }
	                    that.playIndexFlag = index;
	                    audioJs.play();
	                    audioJq.addClass('play');
	                    that.barrageList[index].isPlay = true;
	                    // console.log(audioJs.onended)
	                    // if(audioJs.onended == 'undefined'){
	                    //     console.log(1231313231232)
	                    // } else {
	                    audioJs.onended = function () {
	                        var i = index + 1;
	                        that.playVoiceFlag(i);
	                        audioJq.removeClass('play');
	                        that.barrageList[index].isPlay = false;
	                    };
	                    // }
	                }
	            } else {
	                var i = index + 1;
	                that.playVoiceFlag(i);
	            }
	        },
	        //图片微信
	        previewImage: function previewImage(uuid) {
	            var previewImageList = [];
	            var img = '';
	            for (var i = 0; i < this.barrageList.length; i++) {
	                if (this.barrageList[i].msg && this.barrageList[i].msg.type == 1) {
	                    previewImageList.push(this.barrageList[i].msg.url);
	                }
	                if (uuid == this.barrageList[i].uuid && this.barrageList[i].msg && this.barrageList[i].msg.url) {
	                    img = this.barrageList[i].msg.url;
	                }
	            }
	            wx.previewImage({
	                current: img,
	                urls: previewImageList
	            });
	        }
	    }
	    // </script>
	    // <!-- 组建内部css样式，不会改变全局样式 -->
	    //
	    // <style lang='sass' rel="stylesheet/scss" scoped>
	    // 	@import "../../../stylesheet/yo/usage/core/reset";
	    // 	@import "../../../stylesheet/yo/usage/module/commonList";
	    // 	.remindNews{
	    // 	    margin-left: 25px!important;
	    // 	    margin-right: 25px!important;
	    // 	    margin-top: 10px!important;
	    // 	    margin-bottom: 10px!important;
	    // 	    padding-left: 20px!important;
	    // 	    padding-right: 20px!important;
	    // 	    padding-top: 6px!important;
	    // 	    padding-bottom: 7px!important;
	    // 	}
	    // 	#common{
	    // 		position: fixed;
	    // 		overflow: scroll;
	    // 		-webkit-overflow-scrolling: touch;
	    // 		width: 100%;
	    // 		height: 87%;
	    // 	    z-index: 1;
	    // 	    background: #f0f0f0;
	    // 	}
	    //     .commonroom{
	    //     width:100%!important;
	    //     padding:0 10px;
	    //     ul{
	    //       padding-bottom:10px;
	    //       width:100%;
	    //       min-height: 480px;
	    //       li{
	    //         min-height: 70px;
	    //         padding-bottom: 20px;
	    //         .timebox{
	    //           text-align: center;;
	    //           width:100%;
	    //           max-width: 640px;
	    //           /*height:30px;*/
	    //           .talk_time{
	    //             display: inline-block;
	    //             /*height:20px;*/
	    //             color: #FFFFFF;
	    //             line-height: 20px;
	    //             padding:0 10px;
	    //             font-size: 11px;
	    //             background: #cccccc;
	    //             @include border-radius(4px);
	    //           }
	    //         }
	    //         .right {
	    //           .mainPic{
	    //             max-height: 230px;
	    //             max-width: 230px;
	    //             margin-top: 5px;
	    //             margin-left: 5px;
	    //             position: relative;
	    //             .picBox{
	    //               max-height: 230px;
	    //               max-width: 230px;
	    //               .picBox_icon{
	    //                 width: 0;
	    //                 height: 0;
	    //                 border-left: 10px solid transparent;
	    //                 border-right: 10px solid transparent;
	    //                 border-top: 10px solid #fff;
	    //                 border-bottom: transparent;
	    //                 position: absolute;
	    //                 left: 0;
	    //                 top: 8px;
	    //                 overflow: hidden;
	    //               }
	    //               .picBox_icon1_container{
	    //                 position: absolute;
	    //                 left: 1;
	    //                 top: 8px;
	    //                 width: 10px;
	    //                 height: 20px;
	    //                 overflow: hidden;
	    //                 img{
	    //                   max-height: 230px;
	    //                   max-width: 230px;
	    //                   opacity: 1;
	    //                   margin-top: -8px;
	    //                 }
	    //               }
	    //               .picBox_icon1{
	    //                 position: absolute;
	    //                 border-right: 10px solid transparent;
	    //                 border-bottom: 20px solid #f0f0f0;
	    //                 border-top: transparent;
	    //                 width: 10px;
	    //                 height: 20px;
	    //               }
	    //               .picBox_icon2{
	    //                 position: absolute;
	    //                 border-right: 10px solid #f0f0f0;
	    //                 border-bottom: 3px solid transparent;
	    //               }
	    //               img{
	    //                 max-height: 230px;
	    //                 max-width: 230px;
	    //                 opacity: 0;
	    //               }
	    //             }
	    //             .picBox_container{
	    //               max-height: 230px;
	    //               max-width: 220px;
	    //               position: absolute;
	    //               border-radius: 4px;
	    //               top: 0;
	    //               left: 10px;
	    //               overflow: hidden;
	    //               img{
	    //                 max-height: 230px;
	    //                 max-width: 230px;
	    //                 margin-left: -10px;
	    //               }
	    //             }
	    //           }
	    //           margin-left: 30px;
	    //           h2 {
	    //             font-size: 12px;
	    //             font-weight: normal;
	    //             min-height: 20px;
	    //             margin-left: 5px;
	    //             color: #666;
	    //           }
	    //           .audiomain{
	    //             .main{
	    //               text-indent: 30px;
	    //               color: #333;
	    //             }
	    //             height:30px;
	    //             display: inline-block;
	    //             .voice {
	    //               height:40px;
	    //               .fa {
	    //                 position: relative;
	    //                 display: inline-block;
	    //               }
	    //               .min {
	    //                 position: absolute;
	    //                 right: -53px;
	    //                 top: 8px;
	    //                 width: 40px;
	    //                 color: #666;
	    //                 font-size: 12px;
	    //               }
	    //             }
	    //           }
	    //           .main{
	    //             min-width: 40px;
	    //             min-height: 40px;
	    //             font-size: 14px;
	    //             color: #333;
	    //             background-color: #fff;
	    //             border-radius: 3px;
	    //             padding: 7px 10px 6px;
	    //             position: relative;
	    //             display: inline-block;
	    //             line-height: 27px;
	    //             word-break: break-all;
	    //             word-wrap: break-word;
	    //             max-width: 80%;
	    //             margin-left: 15px;
	    //             margin-top: 5px;
	    //             padding-left: 12px;
	    //             span{
	    //               display: block;
	    //               word-break: keep-all;
	    //               word-wrap: break-word;
	    //               overflow: hidden;
	    //               max-width: 500px;
	    //             }
	    //           }
	    //           .noPlay .fa:after {
	    //             content: "";
	    //             position: absolute;
	    //             top: -14px;
	    //             left: 35px;
	    //             width: 12px;
	    //             z-index: 100;
	    //             height: 17px;
	    //             background: url('//pic.davdian.com/free/2016/12/24/22_32_16dffc36683debdbbf6a813306594422.png') no-repeat;
	    //             background-size: 12px;
	    //           }
	    //           .play .fa:after {
	    //             content: "";
	    //             position: absolute;
	    //              left: 31px;
	    //              width: 20px;
	    //              top: -15px;
	    //              z-index: 100;
	    //              height: 20px;
	    //              background: url('//pic.davdian.com/free/2017/02/27/playVoice.gif') no-repeat;
	    //              background-size: 20px;
	    //           }
	    //           .main:before {
	    //             width: 0;
	    //             height: 0;
	    //             border-left: 10px solid transparent;
	    //             border-right: 10px solid transparent;
	    //             border-top: 20px solid #fff;
	    //             border-bottom: transparent;
	    //             content: "";
	    //             position: absolute;
	    //             left: -10px;
	    //             top: 8px;
	    //           }
	    //           .main_picBox_icon2{
	    //             position: absolute;
	    //             left: -15px;
	    //             border-right: 15px solid #f0f0f0;
	    //             border-bottom: 3px solid transparent;
	    //           }
	    //         }
	    //         .head{
	    //           width: 30px;
	    //           height: 30px;
	    //           float: left;
	    //           overflow: hidden;
	    //           img {
	    //             width: 30px;
	    //             height: 30px;
	    //             @include border-radius(15px);
	    //           }
	    //         }
	    //       }
	    //       .myself{
	    //         padding-bottom: 20px;
	    //         overflow: hidden;
	    //         .timebox{
	    //           text-align: center;;
	    //           width:100%;
	    //           height:30px;
	    //           .talk_time{
	    //             display: inline-block;
	    //             height:20px;
	    //             color: #FFFFFF;
	    //             line-height: 20px;
	    //             padding:0 5px;
	    //             background: #cccccc;
	    //             @include border-radius(3px);
	    //           }
	    //         }
	    //         .right {
	    //           float: right;
	    //           padding-right: 35px;
	    //           h2 {
	    //             position: absolute;
	    //             font-size: 12px;
	    //             font-weight: normal;
	    //             margin-bottom: 5px;
	    //           }
	    //           .audiomain{
	    //             height:30px;
	    //             .voice {
	    //               width: 80px;
	    //               background: #FFFFFF;
	    //               @include border-radius(5px);
	    //               .fa {
	    //                 position: relative;
	    //                 display: inline-block;
	    //               }
	    //               .min {
	    //                 position: absolute;
	    //                 right: -53px;
	    //                 top: 8px;
	    //                 width: 40px;
	    //                 color: #666;
	    //                 font-size: 12px;
	    //               }
	    //             }
	    //           }
	    //           .main{
	    //             float: right;
	    //             font-size: 14px;
	    //             background-color: #fff;
	    //             color: #666;
	    //             border-radius: 3px;
	    //             padding: 7px 10px 6px;
	    //             position: relative;
	    //             display: inline-block;
	    //             line-height: 17px;
	    //             word-break: break-all;
	    //             word-wrap: break-word;
	    //             max-width: 70%;
	    //             margin-left: 4px;
	    //             word-wrap:break-word;
	    //             word-break:break-all;
	    //           }
	    //           .play .fa:after {
	    //             content: "";
	    //             position: absolute;
	    //             top: -11px;
	    //             left: 39px;
	    //             width: 12px;
	    //             z-index: 100;
	    //             height: 13px;
	    //             background: url('//pic.davdian.com/free/voice_img_311.gif') no-repeat;
	    //             background-size: 12px;
	    //           }
	    //           .main:before {
	    //             width: 0;
	    //             height: 0;
	    //             border-left: 0px solid transparent;
	    //             border-right: 0px solid transparent;
	    //             border-top: 0px solid #fff;
	    //             border-bottom: transparent;
	    //             content: "";
	    //             position: absolute;
	    //             left: 0px;
	    //             top: 0px;
	    //           }
	    //           .main:after {
	    //             width: 0;
	    //             height: 0;
	    //             border-left: 10px solid transparent;
	    //             border-right: 10px solid transparent;
	    //             border-top: 10px solid #fff;
	    //             border-bottom: transparent;
	    //             content: "";
	    //             position: absolute;
	    //             right: -10px;
	    //             top: 8px;
	    //           }
	    //         }
	    //         .head{
	    //           position: absolute;
	    //           right: 0;
	    //           width: 25px;
	    //           height: 25px;
	    //           float: left;
	    //           overflow: hidden;
	    //           @include border-radius(25px);
	    //           img {
	    //             width: 25px;
	    //             height: 25px;
	    //           }
	    //         }
	    //       }
	    //     }
	    //   }
	    // </style>

	};

/***/ },

/***/ 1509:
/***/ function(module, exports) {

	module.exports = "\n    <div id=\"common\" _v-3bbe1ee4=\"\">\n        <div class=\"commonroom\" _v-3bbe1ee4=\"\">\n\t        <ul id=\"ulList\" _v-3bbe1ee4=\"\">\n\t            <audio preload=\"auto\" class=\"allAudio\" _v-3bbe1ee4=\"\"></audio>\n\t            <li class=\"teacherChatData\" v-for=\"(common,index) in barrageList\" :key=\"common.uuid\" msg_id=\"{{decodeURIComponent(common.speake.name)}}\" _v-3bbe1ee4=\"\">\n\t                <div class=\"timebox\" v-if=\"index == 0 || (common.msg.time - barrageList[index - 1].msg.time) > 5*60*1000\" _v-3bbe1ee4=\"\">\n\t                    <span class=\"talk_time\" v-if=\"new Date()-common.msg.time < 60*60*12*1000\" _v-3bbe1ee4=\"\">{{getTime(parseInt(common.msg.time))}}</span>\n\t                    <span class=\"talk_time\" v-if=\"new Date()-common.msg.time >= 60*60*12*1000\" _v-3bbe1ee4=\"\">{{getFullTime(parseInt(common.msg.time))}}</span>\n\t                </div>\n\t                <div class=\"timebox\" _v-3bbe1ee4=\"\">\n\t                \t<div class=\"talk_time remindNews\" v-if=\"common.isTips || common.allMsg &amp;&amp; JSON.parse(common.allMsg) &amp;&amp; JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1\" _v-3bbe1ee4=\"\">{{decodeURIComponent(common.msg.content)}}</div>\n\t                </div>\n\t                \n\n\t                <span class=\"head\" v-if=\"!(common.isTips || common.allMsg &amp;&amp; JSON.parse(common.allMsg) &amp;&amp; JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1)\" _v-3bbe1ee4=\"\">\n\t                    <img :src=\"common.speaker.avatar || defaultAvatar\" _v-3bbe1ee4=\"\">\n\t                </span>\n\t                <div class=\"right\" v-if=\"!(common.isTips || common.allMsg &amp;&amp; JSON.parse(common.allMsg) &amp;&amp; JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1)\" _v-3bbe1ee4=\"\">\n\t                    <h2 _v-3bbe1ee4=\"\">{{decodeURIComponent(common.speaker.name)}}</h2>\n\t                    <!--text类型的信息-->\n\t                    <div v-if=\"common.msg.type==0\" class=\"main\" :class=\"{'blue':common.is_answer}\" _v-3bbe1ee4=\"\">\n\t                        <i class=\"main_picBox_icon2\" _v-3bbe1ee4=\"\"></i>\n\t                        <span class=\"TextMessageSpan formfield\" _v-3bbe1ee4=\"\">{{decodeURIComponent(common.msg.content)}}</span>\n\t                    </div>\n\t                    <!--语音类型的信息-->\n\t                    <div class=\"audiomain\" @click=\"playVoiceFlag(index, common)\" v-if=\"common.msg.type==2||common.msg.type==91\" :class=\"{'replied':common.replied}\" _v-3bbe1ee4=\"\">\n\t                        <div class=\"voice\" :class=\"{ 'play': isPlay[index], 'noPlay': !isPlay[index] }\" _v-3bbe1ee4=\"\">\n\t                            <i class=\"fa fa-rss\" v-if=\"common.msg.duration>0\" _v-3bbe1ee4=\"\"></i>\n\t                            <!-- <p :style=\"{width:(common.msg.voicewidth + 40)+'px'}\" class=\"main\">{{common.msg.duration}}''</p> -->\n\t                            <p :style=\"{width:( getWidth(common.msg.duration) + 40)+'px'}\" class=\"main\" _v-3bbe1ee4=\"\">{{common.msg.duration}}''</p>\n\t                            <i class=\"curcle-full\" v-if=\"!curcleFullHash[common.uuid] &amp;&amp; !common.msg.curcleFullHash\" _v-3bbe1ee4=\"\"></i>\n\t                        </div>\n\t                        <div class=\"audio\" :data-src=\"common.msg.url\" preload=\"auto\" :data-type=\"1\" :data-index=\"index\" v-if=\"common.msg.type==2\" _v-3bbe1ee4=\"\"></div>\n\t                        <div class=\"audio\" :data-src=\"common.msg.url\" preload=\"auto\" :data-type=\"91\" :data-index=\"index\" v-if=\"common.msg.type==91\" _v-3bbe1ee4=\"\"></div>\n\t                    </div>\n\t                    <!--图片类型的信息-->\n\t                    <div v-if=\"common.msg.type==1\" class=\"mainPic\" _v-3bbe1ee4=\"\">\n\t                        <div class=\"picBox\" _v-3bbe1ee4=\"\">\n\t                            <div class=\"picBox_icon1_container\" _v-3bbe1ee4=\"\">\n\t                                <i class=\"picBox_icon1\" _v-3bbe1ee4=\"\"></i>\n\t                                <i class=\"picBox_icon2\" _v-3bbe1ee4=\"\"></i>\n\t                                <img :src=\"common.msg.url\" alt=\"\" _v-3bbe1ee4=\"\">\n\t                            </div>\n\t                            <img :src=\"common.msg.url\" alt=\"\" _v-3bbe1ee4=\"\">\n\t                        </div>\n\t                        <div class=\"picBox_container\" @click=\"previewImage(common.uuid)\" _v-3bbe1ee4=\"\">\n\t                            <img :style=\"getImageStyle(common)\" :src=\"common.msg.url\" alt=\"\" _v-3bbe1ee4=\"\">\n\t                        </div>\n\t                    </div>\n\t                </div>\n\t            </li>\n\t        </ul>\n\t        <div class=\"bottom\" _v-3bbe1ee4=\"\"></div>\n\t    </div>\n    </div>\n";

/***/ },

/***/ 1510:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1511)
	__webpack_require__(1513)
	__vue_script__ = __webpack_require__(1515)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/social/component/userCommon.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1516)
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
	  var id = "_v-ce500d8e/userCommon.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1511:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1512);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./userCommon.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./userCommon.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1512:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },

/***/ 1513:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1514);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-ce500d8e&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./userCommon.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-ce500d8e&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./userCommon.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1514:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * lib中map使用“_”开头，本文件中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * 本文件中map使用\"_\"开头，extra中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * 合并base和extra中的同类base map\r\n * 用以解决业务方升级Yo时需比base和extra的一致性\r\n * 当extra为空时，base map将以base文件里的定义作为默认值\r\n * 当extra不为空时，base map使用extra文件里的定义\r\n */\n/**\n * Yo框架全局Variables\n * Yo基础变量map，如果不想定义某属性，将其value设置为null；\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\n * variables中map使用“_”开头，本文件中不使用\"_\"\n * variables ⇌ config\n */\n/**\r\n * Yo框架全局Variables\r\n * Yo基础变量map，如果不想定义某属性，将其value设置为null\r\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\r\n * 本文件中map使用\"_\"开头，config中不使用\"_\"\r\n * variables ⇌ config\r\n */\n/**\r\n * 合并variables和config中的同类map\r\n * 用以解决业务方升级Yo时需比config和variables的一致性\r\n * 当config为空时，使用variables中的map作为默认值\r\n * 当config不为空时，使用config中的定义\r\n */\n/**\r\n * Yo框架自定义全局函数\r\n * 扩充Sass默认函数库，用以增强语法\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的第一项\r\n * @function first\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的最后一项\r\n * @function last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的倒数第几项\r\n * @function nth-last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要返回的值在list中的倒数位置 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 移除SassList中的某个项目并返回新的List\r\n * @function remove\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {String} $value 指定需要被删除的值 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 截取SassList中的某个部分并返回新的List\r\n * @function slice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $start 指定需要截取的开始下标 <2.1.0>\r\n * @param {Integer} $end 指定需要截取的结束下标（不包括end），当该值缺省时默认为末尾下标 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 从SassList中添加/删除项目，然后返回新的List。\r\n * @function splice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要移除的开始下标 <2.1.0>\r\n * @param {Integer} $count 指定需要移除的数量，不可以为负值，0表示不移除 <2.1.0>\r\n * @param {String} $values 指定需要添加的新值（可以是多个），如果该值缺省，则表示只移除不添加新值 <2.1.0>\r\n */\n/**\r\n * Yo框架全局基础方法\r\n * 包括响应式方案，CSS3兼容性方案，厂商前缀方案，iconfont方案，flex布局等全局方法\r\n */\n/**\r\n * @module 功能\r\n * @description 给需要的属性加厂家前缀\r\n * @method _prefix\r\n * @version 1.0.0\r\n * @param {String} $property 指定属性 <1.0.0>\r\n * @param {String} $value 指定属性值 <1.0.0>\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 定义字体图标\r\n * @method _yofont\r\n * @version 1.0.0\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 四则运算(iOS6.0+,Android4.4+)\r\n * @method calc\r\n * @version 1.7.0\r\n * @param {String} $property 指定需要进行计算的CSS属性 <1.7.0>\r\n * @param {String} $value 与原生CSS语法一致，区别在于需要使用引号包裹表达式 <1.7.0>\r\n * @example <div class=\"calc\">四则运算</div>\r\n * .calc { @include calc(width, \"100% - 100px\"); }\r\n */\n/**\r\n * @module 功能\r\n * @description 定义响应式方案\r\n * @method responsive\r\n * @version 1.0.0\r\n * @param {String} $media 指定媒体查询条件，取值为`config`文件map `media-types`中的值 <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除浮动方案\r\n * @method clearfix\r\n * @version 1.0.0\r\n * @param {String} $type 指定清除浮动的方式，包括：pseudo-element | bfc，默认值：pseudo-element <1.8.5>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除行内级元素间间隙方案\r\n * @method killspace\r\n * @version 1.0.0\r\n * @param {Length} $font-size 指定子元素字号，默认值：.14rem <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <span class=\"item\">1</span>\r\n *      <span class=\"item\">2</span>\r\n *      <span class=\"item\">3</span>\r\n * </div>\r\n * .demo {@include killspace;}\r\n */\n/**\r\n * @module 功能\r\n * @description 元素在包含块中的对齐方式，默认为水平垂直对齐\r\n * @method align\r\n * @version 2.0.0\r\n * @param {String} $flexbox 指定包含块布局方式，可选值：flex | inline-flex，默认值：flex <2.0.0>\r\n * @param {String} $type 指定居中元素类型，可选值：image | text | other，默认值：text <2.0.0>\r\n * @param {Keywords} $justify-content 指定元素水平对齐方式，取值与`justify-content`属性一致，默认值：center <2.0.0>\r\n * @param {Keywords} $align-items 指定元素垂直对齐方式，取值与`align-items`属性一致，默认值：center <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <img class=\"item\" alt=\"未知尺寸图片居中\" />\r\n * </div>\r\n * .demo {@include align;}\r\n */\n/**\r\n * @module 功能\r\n * @description 定义文档根节点是否允许滚动\r\n * @method root-scroll\r\n * @version 1.4.0\r\n * @param {Boolean} $is-scroll 指定是否有滚动，默认值：false <1.8.6>\r\n */\n/**\r\n * @module 功能\r\n * @description 定义是否有滚动条\r\n * @method overflow\r\n * @version 1.0.0\r\n * @param {String} $overflow 取值与最新原生语法一致，默认值：auto <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 生成全屏方法\r\n * @method fullscreen\r\n * @version 1.7.0\r\n * @param {Integer} $z-index 指定层叠级别 <1.7.0>\r\n * @param {Keywords} $position 指定定位方式，取除`static | relative`之外的值，默认值：absolute <1.8.5>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义使用何种滤镜\r\n * @method filter\r\n * @version 1.7.0\r\n * @param {String} $filter 取值与`filter`属性一致 <1.7.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义UA默认外观\r\n * @method appearance\r\n * @version 1.0.0\r\n * @param {String} $appearance 取值与`appearance`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义如何选中内容\r\n * @method user-select\r\n * @version 1.0.0\r\n * @param {String} $user-select 取值与`user-select`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义盒模型\r\n * @method box-sizing\r\n * @version 1.0.0\r\n * @param {String} $box-sizing 指定盒模型类型，取值与`box-sizing`属性一致，默认值：border-box <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义渐变色值\r\n * @method gradient\r\n * @version 1.0.0\r\n * @param {String} $type 指定渐变的4种类型：linear, repeating-linear, radial, repeating-radial <1.0.0>\r\n * @param {String} $dir 指定渐变方向，可选值：[left | right] || [top | bottom] | angle <2.0.0>\r\n * @param {String} $gradient 指定渐变取值，与w3c最新原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景图像缩放（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-size\r\n * @version 1.4.0\r\n * @param {Keywords | Length} $background-size 指定背景图缩放值，取值与`background-size`属性一致 <1.4.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景裁减（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-clip\r\n * @version 1.6.0\r\n * @param {Keywords} $background-clip 指定背景图缩放值，取值与`background-clip`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景显示区域（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-origin\r\n * @version 1.6.0\r\n * @param {Keywords} $background-origin 指定背景图`background-position`属性计算相对的参考点，取值与`background-origin`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义圆角，用于修复某些安卓机型上“圆角+边框+背景”，背景溢出的情况\r\n * @method border-radius\r\n * @version 1.6.0\r\n * @param {Length} $border-radius 指定元素的圆角半径，取值与`border-radius`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 为元素添加边框（包括1px边框）\r\n * @method border\r\n * @version 2.0.0\r\n * @param {String} $border-width 指定边框厚度（单位为px），默认值：1px，取值与`border-width`属性一致，不同方向代表边框位置 <2.0.0>\r\n * @param {String} $border-color 指定边框颜色 <2.0.0>\r\n * @param {String} $border-style 指定边框样式 <2.0.0>\r\n * @param {String} $radius 指定边框圆角半径，默认值：null <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义简单变换\r\n * @method transform\r\n * @version 1.0.0\r\n * @param {String} $transform 取值范围与`transform`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义变换原点\r\n * @method transform-origin\r\n * @version 1.0.0\r\n * @param {Length | Percentage | Keywords} $transform-origin 取值范围与`transform-origin`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定某元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化\r\n * @method transform-style\r\n * @version 2.0.0\r\n * @param {String} $transform-style 取值范围与`transform-style`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生透视效果。「z>0」的三维元素比正常大，而「z<0」时则比正常小，大小程度由该属性的值决定。\r\n * @method perspective\r\n * @version 2.0.0\r\n * @param {none | Length} $perspective 取值范围与`perspective`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定透视点的位置\r\n * @method perspective-origin\r\n * @version 2.0.0\r\n * @param {Length | Percentage | Keywords} $perspective-origin 取值范围与`perspective-origin`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定元素背面面向用户时是否可见\r\n * @method backface-visibility\r\n * @version 2.0.0\r\n * @param {Keywords} $backface-visibility 取值范围与`backface-visibility`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 定义动画\r\n * @method animation\r\n * @version 1.0.0\r\n * @param {String} $animation 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定需要引用的动画名称\r\n * @method animation-name\r\n * @version 3.0.0\r\n * @param {String} $animation-name 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行一次所持续的时长\r\n * @method animation-duration\r\n * @version 3.0.0\r\n * @param {String} $animation-duration 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行方式\r\n * @method animation-timing-function\r\n * @version 3.0.0\r\n * @param {String} $animation-timing-function 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画延迟多久之后再开始\r\n * @method animation-delay\r\n * @version 3.0.0\r\n * @param {String} $animation-delay 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画循环几次\r\n * @method animation-iteration-count\r\n * @version 3.0.0\r\n * @param {String} $animation-iteration-count 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动方向\r\n * @method animation-direction\r\n * @version 3.0.0\r\n * @param {String} $animation-direction 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动状态\r\n * @method animation-play-state\r\n * @version 3.0.0\r\n * @param {String} $animation-play-state 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画时间之外的状态\r\n * @method animation-fill-mode\r\n * @version 3.0.0\r\n * @param {String} $animation-fill-mode 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Transition\r\n * @description 定义补间\r\n * @method transition\r\n * @version 1.0.0\r\n * @param {String} $transition 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义显示类型为伸缩盒\r\n * @method flexbox\r\n * @version 1.0.0\r\n * @param {String} $flexbox 默认值：flex，可选值：flex | inline-flex <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素如何分配空间\r\n * @method flex\r\n * @version 1.0.0\r\n * @param {Number} $flex 取值与`flex`属性一致，默认值：1 <1.0.0>\r\n * @param {String} $direction 默认值: row，可选值：row | column <1.5.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的排版顺序\r\n * @method order\r\n * @version 1.0.0\r\n * @param {Integer} $order 取值与`order`属性一致，默认值：1 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素流动方向及遇见边界时是否换行(iOS7.0+,Android4.4+)\r\n * @method flex-flow\r\n * @version 2.0.0\r\n * @param {String} $flex-flow 取值与`flex-flow`属性一致，默认值：row nowrap <2.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的流动方向\r\n * @method flex-direction\r\n * @version 1.0.0\r\n * @param {String} $flex-direction 取值与`flex-direction`属性一致，默认值：row <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素溢出后排版(iOS7.0+,Android4.4+)\r\n * @method flex-wrap\r\n * @version 1.0.0\r\n * @param {String} $flex-wrap 取值与`flex-wrap`属性一致，默认值：nowrap <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器主轴对齐方式(其中`space-around`值需要iOS7.0+,Android4.4+)\r\n * @method justify-content\r\n * @version 1.0.0\r\n * @param {String} $justify-content 取值与`justify-content`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义多行弹性容器侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-content\r\n * @version 1.8.5\r\n * @param {String} $align-content 取值与`align-content`属性一致，默认值：center <1.8.5>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义单行弹性容器侧轴对齐方式\r\n * @method align-items\r\n * @version 1.0.0\r\n * @param {String} $align-items 取值与`align-items`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器中子元素自身的在侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-self\r\n * @version 1.0.0\r\n * @param {String} $align-self 取值与`align-self`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成矩形方法\r\n * @method rect\r\n * @version 1.0.0\r\n * @param {Length} $width 定义矩形的长度 <1.0.0>\r\n * @param {Length} $height 定义矩形的高度 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成正方形方法\r\n * @method square\r\n * @version 1.0.0\r\n * @param {Length} $size 定义正方形的边长 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成圆形方法\r\n * @method circle\r\n * @version 1.0.0\r\n * @param {Length} $size 定义圆的半径长度 <1.0.0>\r\n * @param {Length} $radius 定义圆的圆角半径长度 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 链接处理方法\r\n * @method link\r\n * @version 1.0.0\r\n * @param {Color} $color 定义链接颜色 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 文本碰到边界是否换行\r\n * @method wrap\r\n * @version 1.0.0\r\n * @param {Boolean} $is-wrap 定义文本是否换行，默认值：true <2.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 单行文本溢出时显示省略号\r\n * @method ellipsis\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n * @param {Integer} $line-clamp 定义需要显示的行数，默认值：1（即使用单行溢出的处理方案），需要注意的是本参数只支持webkit内核 <2.1.2>\r\n */\n/**\r\n * @module 文本\r\n * @description 文字隐藏方案\r\n * @method texthide\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n */\n/**\r\n * Yo框架全局Reset\r\n * Yo重置Mobile及高级浏览器上常见的差异\r\n */\n*[_v-ce500d8e],[_v-ce500d8e]\n::before,[_v-ce500d8e]\n::after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent; }\n\nhtml[_v-ce500d8e],\nbody[_v-ce500d8e] {\n  overflow: hidden;\n  height: 100%; }\n\n[_v-ce500d8e]::-webkit-scrollbar {\n  display: none; }\n\nhtml[_v-ce500d8e] {\n  background-color: #eee;\n  color: #212121;\n  font-size: 100px;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n   -ms-user-select: text;\n       user-select: text; }\n\nbody[_v-ce500d8e] {\n  margin: 0;\n  font-size: 0.14em;\n  line-height: 1.5;\n  font-family: Helvetica Neue, Helvetica, STHeiTi, sans-serif; }\n\nul[_v-ce500d8e],\nol[_v-ce500d8e],\ndl[_v-ce500d8e],\ndd[_v-ce500d8e],\nh1[_v-ce500d8e],\nh2[_v-ce500d8e],\nh3[_v-ce500d8e],\nh4[_v-ce500d8e],\nh5[_v-ce500d8e],\nh6[_v-ce500d8e],\nfigure[_v-ce500d8e],\nform[_v-ce500d8e],\nfieldset[_v-ce500d8e],\nlegend[_v-ce500d8e],\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\np[_v-ce500d8e],\nblockquote[_v-ce500d8e],\nth[_v-ce500d8e],\ntd[_v-ce500d8e],\npre[_v-ce500d8e],\nxmp[_v-ce500d8e] {\n  margin: 0;\n  padding: 0; }\n\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\nselect[_v-ce500d8e],\npre[_v-ce500d8e],\nxmp[_v-ce500d8e],\ntt[_v-ce500d8e],\ncode[_v-ce500d8e],\nkbd[_v-ce500d8e],\nsamp[_v-ce500d8e] {\n  line-height: inherit;\n  font-family: inherit; }\n\nh1[_v-ce500d8e],\nh2[_v-ce500d8e],\nh3[_v-ce500d8e],\nh4[_v-ce500d8e],\nh5[_v-ce500d8e],\nh6[_v-ce500d8e],\nsmall[_v-ce500d8e],\nbig[_v-ce500d8e],\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\nselect[_v-ce500d8e] {\n  font-size: inherit; }\n\naddress[_v-ce500d8e],\ncite[_v-ce500d8e],\ndfn[_v-ce500d8e],\nem[_v-ce500d8e],\ni[_v-ce500d8e],\noptgroup[_v-ce500d8e],\nvar[_v-ce500d8e] {\n  font-style: normal; }\n\ntable[_v-ce500d8e] {\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n  text-align: left; }\n\nul[_v-ce500d8e],\nol[_v-ce500d8e],\nmenu[_v-ce500d8e] {\n  list-style: none; }\n\nfieldset[_v-ce500d8e],\nimg[_v-ce500d8e] {\n  border: 0;\n  vertical-align: middle; }\n\narticle[_v-ce500d8e],\naside[_v-ce500d8e],\ndetails[_v-ce500d8e],\nfigcaption[_v-ce500d8e],\nfigure[_v-ce500d8e],\nfooter[_v-ce500d8e],\nheader[_v-ce500d8e],\nmain[_v-ce500d8e],\nmenu[_v-ce500d8e],\nnav[_v-ce500d8e],\nsection[_v-ce500d8e],\nsummary[_v-ce500d8e] {\n  display: block; }\n\naudio[_v-ce500d8e],\ncanvas[_v-ce500d8e],\nvideo[_v-ce500d8e] {\n  display: inline-block; }\n\nblockquote[_v-ce500d8e]:before,\nblockquote[_v-ce500d8e]:after,\nq[_v-ce500d8e]:before,\nq[_v-ce500d8e]:after {\n  content: \" \"; }\n\ntextarea[_v-ce500d8e],\npre[_v-ce500d8e],\nxmp[_v-ce500d8e] {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n\ntextarea[_v-ce500d8e] {\n  resize: vertical; }\n\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\nselect\na[_v-ce500d8e] {\n  outline: 0 none; }\n\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\nselect[_v-ce500d8e] {\n  color: inherit; }\n  input[_v-ce500d8e]:disabled,\n  textarea[_v-ce500d8e]:disabled,\n  button[_v-ce500d8e]:disabled,\n  select[_v-ce500d8e]:disabled {\n    opacity: 1; }\n\nbutton[_v-ce500d8e]::-moz-focus-inner,\ninput[_v-ce500d8e]::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\ninput[type=\"button\"][_v-ce500d8e],\ninput[type=\"submit\"][_v-ce500d8e],\ninput[type=\"reset\"][_v-ce500d8e],\ninput[type=\"file\"][_v-ce500d8e]::-webkit-file-upload-button,\ninput[type=\"search\"][_v-ce500d8e]::-webkit-search-cancel-button {\n  -webkit-appearance: none;\n  appearance: none; }\n\nmark[_v-ce500d8e] {\n  background-color: transparent; }\n\na[_v-ce500d8e],\nins[_v-ce500d8e],\ns[_v-ce500d8e],\nu[_v-ce500d8e],\ndel[_v-ce500d8e] {\n  text-decoration: none; }\n\na[_v-ce500d8e] {\n  color: #00afc7; }\n\n.g-clear[_v-ce500d8e]::after,\n.g-mod[_v-ce500d8e]::after {\n  display: block;\n  overflow: hidden;\n  clear: both;\n  height: 0;\n  content: \" \"; }\n\n@font-face {\n  font-family: yofont;\n  src: url(//ss.qunarzz.com/yo/font/1.0.3/yofont.woff) format(\"woff\"), url(//ss.qunarzz.com/yo/font/1.0.3/yofont.ttf) format(\"truetype\"); }\n\n.yo-ico[_v-ce500d8e] {\n  font-family: yofont !important;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  vertical-align: middle; }\n\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * lib中map使用“_”开头，本文件中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * Yo框架全局base定义\r\n * 本文件与variables不同地方在于，这里所定义的map可以使用在variables和任何地方\r\n * 本文件中map使用\"_\"开头，extra中不使用\"_\"\r\n * base ⇌ extra\r\n */\n/**\r\n * 合并base和extra中的同类base map\r\n * 用以解决业务方升级Yo时需比base和extra的一致性\r\n * 当extra为空时，base map将以base文件里的定义作为默认值\r\n * 当extra不为空时，base map使用extra文件里的定义\r\n */\n/**\n * Yo框架全局Variables\n * Yo基础变量map，如果不想定义某属性，将其value设置为null；\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\n * variables中map使用“_”开头，本文件中不使用\"_\"\n * variables ⇌ config\n */\n/**\r\n * Yo框架全局Variables\r\n * Yo基础变量map，如果不想定义某属性，将其value设置为null\r\n * Yo仅使用2种长度单位：px用于边框，rem用于除边框之外的所有地方\r\n * 本文件中map使用\"_\"开头，config中不使用\"_\"\r\n * variables ⇌ config\r\n */\n/**\r\n * 合并variables和config中的同类map\r\n * 用以解决业务方升级Yo时需比config和variables的一致性\r\n * 当config为空时，使用variables中的map作为默认值\r\n * 当config不为空时，使用config中的定义\r\n */\n/**\r\n * Yo框架自定义全局函数\r\n * 扩充Sass默认函数库，用以增强语法\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的第一项\r\n * @function first\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的最后一项\r\n * @function last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 返回SassList中的倒数第几项\r\n * @function nth-last\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要返回的值在list中的倒数位置 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 移除SassList中的某个项目并返回新的List\r\n * @function remove\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {String} $value 指定需要被删除的值 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 截取SassList中的某个部分并返回新的List\r\n * @function slice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $start 指定需要截取的开始下标 <2.1.0>\r\n * @param {Integer} $end 指定需要截取的结束下标（不包括end），当该值缺省时默认为末尾下标 <2.1.0>\r\n */\n/**\r\n * @module List扩展函数\r\n * @description 从SassList中添加/删除项目，然后返回新的List。\r\n * @function splice\r\n * @version 2.1.0\r\n * @param {String} $list 指定一个Sass List <2.1.0>\r\n * @param {Integer} $index 指定需要移除的开始下标 <2.1.0>\r\n * @param {Integer} $count 指定需要移除的数量，不可以为负值，0表示不移除 <2.1.0>\r\n * @param {String} $values 指定需要添加的新值（可以是多个），如果该值缺省，则表示只移除不添加新值 <2.1.0>\r\n */\n/**\r\n * Yo框架全局基础方法\r\n * 包括响应式方案，CSS3兼容性方案，厂商前缀方案，iconfont方案，flex布局等全局方法\r\n */\n/**\r\n * @module 功能\r\n * @description 给需要的属性加厂家前缀\r\n * @method _prefix\r\n * @version 1.0.0\r\n * @param {String} $property 指定属性 <1.0.0>\r\n * @param {String} $value 指定属性值 <1.0.0>\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 定义字体图标\r\n * @method _yofont\r\n * @version 1.0.0\r\n * @skip\r\n */\n/**\r\n * @module 功能\r\n * @description 四则运算(iOS6.0+,Android4.4+)\r\n * @method calc\r\n * @version 1.7.0\r\n * @param {String} $property 指定需要进行计算的CSS属性 <1.7.0>\r\n * @param {String} $value 与原生CSS语法一致，区别在于需要使用引号包裹表达式 <1.7.0>\r\n * @example <div class=\"calc\">四则运算</div>\r\n * .calc { @include calc(width, \"100% - 100px\"); }\r\n */\n/**\r\n * @module 功能\r\n * @description 定义响应式方案\r\n * @method responsive\r\n * @version 1.0.0\r\n * @param {String} $media 指定媒体查询条件，取值为`config`文件map `media-types`中的值 <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除浮动方案\r\n * @method clearfix\r\n * @version 1.0.0\r\n * @param {String} $type 指定清除浮动的方式，包括：pseudo-element | bfc，默认值：pseudo-element <1.8.5>\r\n */\n/**\r\n * @module 功能\r\n * @description 清除行内级元素间间隙方案\r\n * @method killspace\r\n * @version 1.0.0\r\n * @param {Length} $font-size 指定子元素字号，默认值：.14rem <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <span class=\"item\">1</span>\r\n *      <span class=\"item\">2</span>\r\n *      <span class=\"item\">3</span>\r\n * </div>\r\n * .demo {@include killspace;}\r\n */\n/**\r\n * @module 功能\r\n * @description 元素在包含块中的对齐方式，默认为水平垂直对齐\r\n * @method align\r\n * @version 2.0.0\r\n * @param {String} $flexbox 指定包含块布局方式，可选值：flex | inline-flex，默认值：flex <2.0.0>\r\n * @param {String} $type 指定居中元素类型，可选值：image | text | other，默认值：text <2.0.0>\r\n * @param {Keywords} $justify-content 指定元素水平对齐方式，取值与`justify-content`属性一致，默认值：center <2.0.0>\r\n * @param {Keywords} $align-items 指定元素垂直对齐方式，取值与`align-items`属性一致，默认值：center <2.0.0>\r\n * @example\r\n * <div class=\"demo\">\r\n *      <img class=\"item\" alt=\"未知尺寸图片居中\" />\r\n * </div>\r\n * .demo {@include align;}\r\n */\n/**\r\n * @module 功能\r\n * @description 定义文档根节点是否允许滚动\r\n * @method root-scroll\r\n * @version 1.4.0\r\n * @param {Boolean} $is-scroll 指定是否有滚动，默认值：false <1.8.6>\r\n */\n/**\r\n * @module 功能\r\n * @description 定义是否有滚动条\r\n * @method overflow\r\n * @version 1.0.0\r\n * @param {String} $overflow 取值与最新原生语法一致，默认值：auto <1.0.0>\r\n */\n/**\r\n * @module 功能\r\n * @description 生成全屏方法\r\n * @method fullscreen\r\n * @version 1.7.0\r\n * @param {Integer} $z-index 指定层叠级别 <1.7.0>\r\n * @param {Keywords} $position 指定定位方式，取除`static | relative`之外的值，默认值：absolute <1.8.5>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义使用何种滤镜\r\n * @method filter\r\n * @version 1.7.0\r\n * @param {String} $filter 取值与`filter`属性一致 <1.7.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义UA默认外观\r\n * @method appearance\r\n * @version 1.0.0\r\n * @param {String} $appearance 取值与`appearance`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义如何选中内容\r\n * @method user-select\r\n * @version 1.0.0\r\n * @param {String} $user-select 取值与`user-select`属性一致，默认值：none <1.0.0>\r\n */\n/**\r\n * @module 用户界面\r\n * @description 定义盒模型\r\n * @method box-sizing\r\n * @version 1.0.0\r\n * @param {String} $box-sizing 指定盒模型类型，取值与`box-sizing`属性一致，默认值：border-box <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义渐变色值\r\n * @method gradient\r\n * @version 1.0.0\r\n * @param {String} $type 指定渐变的4种类型：linear, repeating-linear, radial, repeating-radial <1.0.0>\r\n * @param {String} $dir 指定渐变方向，可选值：[left | right] || [top | bottom] | angle <2.0.0>\r\n * @param {String} $gradient 指定渐变取值，与w3c最新原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景图像缩放（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-size\r\n * @version 1.4.0\r\n * @param {Keywords | Length} $background-size 指定背景图缩放值，取值与`background-size`属性一致 <1.4.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景裁减（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-clip\r\n * @version 1.6.0\r\n * @param {Keywords} $background-clip 指定背景图缩放值，取值与`background-clip`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义背景显示区域（AndroidBrowser2.3.*还需要厂商前缀）\r\n * @method background-origin\r\n * @version 1.6.0\r\n * @param {Keywords} $background-origin 指定背景图`background-position`属性计算相对的参考点，取值与`background-origin`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 定义圆角，用于修复某些安卓机型上“圆角+边框+背景”，背景溢出的情况\r\n * @method border-radius\r\n * @version 1.6.0\r\n * @param {Length} $border-radius 指定元素的圆角半径，取值与`border-radius`属性一致 <1.6.0>\r\n */\n/**\r\n * @module 背景与边框\r\n * @description 为元素添加边框（包括1px边框）\r\n * @method border\r\n * @version 2.0.0\r\n * @param {String} $border-width 指定边框厚度（单位为px），默认值：1px，取值与`border-width`属性一致，不同方向代表边框位置 <2.0.0>\r\n * @param {String} $border-color 指定边框颜色 <2.0.0>\r\n * @param {String} $border-style 指定边框样式 <2.0.0>\r\n * @param {String} $radius 指定边框圆角半径，默认值：null <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义简单变换\r\n * @method transform\r\n * @version 1.0.0\r\n * @param {String} $transform 取值范围与`transform`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 定义变换原点\r\n * @method transform-origin\r\n * @version 1.0.0\r\n * @param {Length | Percentage | Keywords} $transform-origin 取值范围与`transform-origin`属性一致 <1.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定某元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化\r\n * @method transform-style\r\n * @version 2.0.0\r\n * @param {String} $transform-style 取值范围与`transform-style`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生透视效果。「z>0」的三维元素比正常大，而「z<0」时则比正常小，大小程度由该属性的值决定。\r\n * @method perspective\r\n * @version 2.0.0\r\n * @param {none | Length} $perspective 取值范围与`perspective`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定透视点的位置\r\n * @method perspective-origin\r\n * @version 2.0.0\r\n * @param {Length | Percentage | Keywords} $perspective-origin 取值范围与`perspective-origin`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Transform\r\n * @description 指定元素背面面向用户时是否可见\r\n * @method backface-visibility\r\n * @version 2.0.0\r\n * @param {Keywords} $backface-visibility 取值范围与`backface-visibility`属性一致 <2.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 定义动画\r\n * @method animation\r\n * @version 1.0.0\r\n * @param {String} $animation 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定需要引用的动画名称\r\n * @method animation-name\r\n * @version 3.0.0\r\n * @param {String} $animation-name 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行一次所持续的时长\r\n * @method animation-duration\r\n * @version 3.0.0\r\n * @param {String} $animation-duration 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画运行方式\r\n * @method animation-timing-function\r\n * @version 3.0.0\r\n * @param {String} $animation-timing-function 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画延迟多久之后再开始\r\n * @method animation-delay\r\n * @version 3.0.0\r\n * @param {String} $animation-delay 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画循环几次\r\n * @method animation-iteration-count\r\n * @version 3.0.0\r\n * @param {String} $animation-iteration-count 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动方向\r\n * @method animation-direction\r\n * @version 3.0.0\r\n * @param {String} $animation-direction 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画的运动状态\r\n * @method animation-play-state\r\n * @version 3.0.0\r\n * @param {String} $animation-play-state 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Animation\r\n * @description 指定动画时间之外的状态\r\n * @method animation-fill-mode\r\n * @version 3.0.0\r\n * @param {String} $animation-fill-mode 取值与原生语法一致 <3.0.0>\r\n */\n/**\r\n * @module Transition\r\n * @description 定义补间\r\n * @method transition\r\n * @version 1.0.0\r\n * @param {String} $transition 取值与原生语法一致 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义显示类型为伸缩盒\r\n * @method flexbox\r\n * @version 1.0.0\r\n * @param {String} $flexbox 默认值：flex，可选值：flex | inline-flex <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素如何分配空间\r\n * @method flex\r\n * @version 1.0.0\r\n * @param {Number} $flex 取值与`flex`属性一致，默认值：1 <1.0.0>\r\n * @param {String} $direction 默认值: row，可选值：row | column <1.5.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的排版顺序\r\n * @method order\r\n * @version 1.0.0\r\n * @param {Integer} $order 取值与`order`属性一致，默认值：1 <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素流动方向及遇见边界时是否换行(iOS7.0+,Android4.4+)\r\n * @method flex-flow\r\n * @version 2.0.0\r\n * @param {String} $flex-flow 取值与`flex-flow`属性一致，默认值：row nowrap <2.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义伸缩盒子元素的流动方向\r\n * @method flex-direction\r\n * @version 1.0.0\r\n * @param {String} $flex-direction 取值与`flex-direction`属性一致，默认值：row <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性盒子元素溢出后排版(iOS7.0+,Android4.4+)\r\n * @method flex-wrap\r\n * @version 1.0.0\r\n * @param {String} $flex-wrap 取值与`flex-wrap`属性一致，默认值：nowrap <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器主轴对齐方式(其中`space-around`值需要iOS7.0+,Android4.4+)\r\n * @method justify-content\r\n * @version 1.0.0\r\n * @param {String} $justify-content 取值与`justify-content`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义多行弹性容器侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-content\r\n * @version 1.8.5\r\n * @param {String} $align-content 取值与`align-content`属性一致，默认值：center <1.8.5>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义单行弹性容器侧轴对齐方式\r\n * @method align-items\r\n * @version 1.0.0\r\n * @param {String} $align-items 取值与`align-items`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module Flexbox\r\n * @description 定义弹性容器中子元素自身的在侧轴对齐方式(iOS7.0+,Android4.4+)\r\n * @method align-self\r\n * @version 1.0.0\r\n * @param {String} $align-self 取值与`align-self`属性一致，默认值：center <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成矩形方法\r\n * @method rect\r\n * @version 1.0.0\r\n * @param {Length} $width 定义矩形的长度 <1.0.0>\r\n * @param {Length} $height 定义矩形的高度 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成正方形方法\r\n * @method square\r\n * @version 1.0.0\r\n * @param {Length} $size 定义正方形的边长 <1.0.0>\r\n */\n/**\r\n * @module 形状\r\n * @description 生成圆形方法\r\n * @method circle\r\n * @version 1.0.0\r\n * @param {Length} $size 定义圆的半径长度 <1.0.0>\r\n * @param {Length} $radius 定义圆的圆角半径长度 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 链接处理方法\r\n * @method link\r\n * @version 1.0.0\r\n * @param {Color} $color 定义链接颜色 <1.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 文本碰到边界是否换行\r\n * @method wrap\r\n * @version 1.0.0\r\n * @param {Boolean} $is-wrap 定义文本是否换行，默认值：true <2.0.0>\r\n */\n/**\r\n * @module 文本\r\n * @description 单行文本溢出时显示省略号\r\n * @method ellipsis\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n * @param {Integer} $line-clamp 定义需要显示的行数，默认值：1（即使用单行溢出的处理方案），需要注意的是本参数只支持webkit内核 <2.1.2>\r\n */\n/**\r\n * @module 文本\r\n * @description 文字隐藏方案\r\n * @method texthide\r\n * @version 1.0.0\r\n * @param {Length} $width 定义容器的宽度，默认值：null <2.0.0>\r\n */\n/**\r\n * Yo框架全局Reset\r\n * Yo重置Mobile及高级浏览器上常见的差异\r\n */\n*[_v-ce500d8e],[_v-ce500d8e]\n::before,[_v-ce500d8e]\n::after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent; }\n\nhtml[_v-ce500d8e],\nbody[_v-ce500d8e] {\n  overflow: hidden;\n  height: 100%; }\n\n[_v-ce500d8e]::-webkit-scrollbar {\n  display: none; }\n\nhtml[_v-ce500d8e] {\n  background-color: #eee;\n  color: #212121;\n  font-size: 100px;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n   -ms-user-select: text;\n       user-select: text; }\n\nbody[_v-ce500d8e] {\n  margin: 0;\n  font-size: 0.14em;\n  line-height: 1.5;\n  font-family: Helvetica Neue, Helvetica, STHeiTi, sans-serif; }\n\nul[_v-ce500d8e],\nol[_v-ce500d8e],\ndl[_v-ce500d8e],\ndd[_v-ce500d8e],\nh1[_v-ce500d8e],\nh2[_v-ce500d8e],\nh3[_v-ce500d8e],\nh4[_v-ce500d8e],\nh5[_v-ce500d8e],\nh6[_v-ce500d8e],\nfigure[_v-ce500d8e],\nform[_v-ce500d8e],\nfieldset[_v-ce500d8e],\nlegend[_v-ce500d8e],\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\np[_v-ce500d8e],\nblockquote[_v-ce500d8e],\nth[_v-ce500d8e],\ntd[_v-ce500d8e],\npre[_v-ce500d8e],\nxmp[_v-ce500d8e] {\n  margin: 0;\n  padding: 0; }\n\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\nselect[_v-ce500d8e],\npre[_v-ce500d8e],\nxmp[_v-ce500d8e],\ntt[_v-ce500d8e],\ncode[_v-ce500d8e],\nkbd[_v-ce500d8e],\nsamp[_v-ce500d8e] {\n  line-height: inherit;\n  font-family: inherit; }\n\nh1[_v-ce500d8e],\nh2[_v-ce500d8e],\nh3[_v-ce500d8e],\nh4[_v-ce500d8e],\nh5[_v-ce500d8e],\nh6[_v-ce500d8e],\nsmall[_v-ce500d8e],\nbig[_v-ce500d8e],\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\nselect[_v-ce500d8e] {\n  font-size: inherit; }\n\naddress[_v-ce500d8e],\ncite[_v-ce500d8e],\ndfn[_v-ce500d8e],\nem[_v-ce500d8e],\ni[_v-ce500d8e],\noptgroup[_v-ce500d8e],\nvar[_v-ce500d8e] {\n  font-style: normal; }\n\ntable[_v-ce500d8e] {\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n  text-align: left; }\n\nul[_v-ce500d8e],\nol[_v-ce500d8e],\nmenu[_v-ce500d8e] {\n  list-style: none; }\n\nfieldset[_v-ce500d8e],\nimg[_v-ce500d8e] {\n  border: 0;\n  vertical-align: middle; }\n\narticle[_v-ce500d8e],\naside[_v-ce500d8e],\ndetails[_v-ce500d8e],\nfigcaption[_v-ce500d8e],\nfigure[_v-ce500d8e],\nfooter[_v-ce500d8e],\nheader[_v-ce500d8e],\nmain[_v-ce500d8e],\nmenu[_v-ce500d8e],\nnav[_v-ce500d8e],\nsection[_v-ce500d8e],\nsummary[_v-ce500d8e] {\n  display: block; }\n\naudio[_v-ce500d8e],\ncanvas[_v-ce500d8e],\nvideo[_v-ce500d8e] {\n  display: inline-block; }\n\nblockquote[_v-ce500d8e]:before,\nblockquote[_v-ce500d8e]:after,\nq[_v-ce500d8e]:before,\nq[_v-ce500d8e]:after {\n  content: \" \"; }\n\ntextarea[_v-ce500d8e],\npre[_v-ce500d8e],\nxmp[_v-ce500d8e] {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n\ntextarea[_v-ce500d8e] {\n  resize: vertical; }\n\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\nselect\na[_v-ce500d8e] {\n  outline: 0 none; }\n\ninput[_v-ce500d8e],\ntextarea[_v-ce500d8e],\nbutton[_v-ce500d8e],\nselect[_v-ce500d8e] {\n  color: inherit; }\n  input[_v-ce500d8e]:disabled,\n  textarea[_v-ce500d8e]:disabled,\n  button[_v-ce500d8e]:disabled,\n  select[_v-ce500d8e]:disabled {\n    opacity: 1; }\n\nbutton[_v-ce500d8e]::-moz-focus-inner,\ninput[_v-ce500d8e]::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\ninput[type=\"button\"][_v-ce500d8e],\ninput[type=\"submit\"][_v-ce500d8e],\ninput[type=\"reset\"][_v-ce500d8e],\ninput[type=\"file\"][_v-ce500d8e]::-webkit-file-upload-button,\ninput[type=\"search\"][_v-ce500d8e]::-webkit-search-cancel-button {\n  -webkit-appearance: none;\n  appearance: none; }\n\nmark[_v-ce500d8e] {\n  background-color: transparent; }\n\na[_v-ce500d8e],\nins[_v-ce500d8e],\ns[_v-ce500d8e],\nu[_v-ce500d8e],\ndel[_v-ce500d8e] {\n  text-decoration: none; }\n\na[_v-ce500d8e] {\n  color: #00afc7; }\n\n.g-clear[_v-ce500d8e]::after,\n.g-mod[_v-ce500d8e]::after {\n  display: block;\n  overflow: hidden;\n  clear: both;\n  height: 0;\n  content: \" \"; }\n\n@font-face {\n  font-family: yofont;\n  src: url(//ss.qunarzz.com/yo/font/1.0.3/yofont.woff) format(\"woff\"), url(//ss.qunarzz.com/yo/font/1.0.3/yofont.ttf) format(\"truetype\"); }\n\n.yo-ico[_v-ce500d8e] {\n  font-family: yofont !important;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  vertical-align: middle; }\n\n.commonList-container[_v-ce500d8e] {\n  padding-bottom: 40px;\n  position: relative;\n  width: 100%; }\n  .commonList-container .class_introduce_con[_v-ce500d8e] {\n    position: relative;\n    padding: 5px 10px 0;\n    width: 100%; }\n    .commonList-container .class_introduce_con[_v-ce500d8e]::after {\n      pointer-events: none;\n      position: absolute;\n      z-index: 999;\n      top: 0;\n      left: 0;\n      overflow: hidden;\n      content: \" \";\n      border-color: #E1E1E1;\n      border-style: solid;\n      border-width: 0 0 1px 0;\n      -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0; }\n      @media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.4895833333333333), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {\n        .commonList-container .class_introduce_con[_v-ce500d8e]::after {\n          width: 100%;\n          height: 100%; } }\n      @media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.4895833333333335), (min-resolution: 144dpi) and (max-resolution: 239dpi), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {\n        .commonList-container .class_introduce_con[_v-ce500d8e]::after {\n          width: 200%;\n          height: 200%;\n          -webkit-transform: scale(0.5);\n          -ms-transform: scale(0.5);\n              transform: scale(0.5); } }\n      @media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {\n        .commonList-container .class_introduce_con[_v-ce500d8e]::after {\n          width: 300%;\n          height: 300%;\n          -webkit-transform: scale(0.33333);\n          -ms-transform: scale(0.33333);\n              transform: scale(0.33333); } }\n    .commonList-container .class_introduce_con .comment_tit[_v-ce500d8e] {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      height: 50px; }\n      .commonList-container .class_introduce_con .comment_tit .img[_v-ce500d8e] {\n        border-radius: 20px;\n        background-clip: padding-box !important;\n        width: 46px;\n        height: 46px;\n        background: pink;\n        margin-right: 5px;\n        margin-top: 5px;\n        -webkit-box-shadow: none !important;\n                box-shadow: none !important; }\n      .commonList-container .class_introduce_con .comment_tit .comment_dis[_v-ce500d8e] {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n        -moz-box-flex: 1;\n         -ms-flex: 1;\n             flex: 1;\n        width: .1px;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -moz-box-pack: center;\n         -ms-flex-pack: center;\n             justify-content: center;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n        -moz-box-orient: vertical;\n        -moz-box-direction: normal;\n         -ms-flex-direction: column;\n             flex-direction: column;\n        width: 100% !important;\n        padding: 5px 0; }\n        .commonList-container .class_introduce_con .comment_tit .comment_dis span[_v-ce500d8e] {\n          display: block !important;\n          width: 80% !important;\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          -moz-box-flex: 1;\n           -ms-flex: 1;\n               flex: 1;\n          width: .1px;\n          color: #999;\n          font-size: 12px; }\n        .commonList-container .class_introduce_con .comment_tit .comment_dis .commentname[_v-ce500d8e] {\n          font-size: 14px;\n          color: #333;\n          line-height: 30px; }\n    .commonList-container .class_introduce_con .class_introduce_text[_v-ce500d8e] {\n      font-size: 14px;\n      color: #666;\n      padding: 5px 0;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex; }\n\n.mask[_v-ce500d8e] {\n  width: 100%;\n  height: 100%;\n  /*left: 50%;*/\n  max-width: 640px;\n  margin: 0 auto;\n  position: fixed;\n  z-index: 106;\n  background: rgba(0, 0, 0, 0.5); }\n  .mask .mask_con[_v-ce500d8e] {\n    position: fixed;\n    bottom: 0;\n    width: 100%;\n    z-index: 100;\n    height: 73%;\n    background: #fff; }\n    .mask .mask_con .close[_v-ce500d8e] {\n      position: absolute;\n      height: 30px;\n      width: 30px;\n      right: 0;\n      z-index: 105;\n      top: -40px; }\n      .mask .mask_con .close img[_v-ce500d8e] {\n        width: 30px;\n        height: 40px; }\n    .mask .mask_con .common[_v-ce500d8e] {\n      height: 100%;\n      overflow: hidden; }\n      .mask .mask_con .common .scrollcon[_v-ce500d8e] {\n        width: 100%;\n        height: 100%;\n        overflow: scroll;\n        -webkit-overflow-scrolling: touch; }\n\n.mask_con_mask[_v-ce500d8e] {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  height: 160px;\n  z-index: 100; }\n\n.commonbottom[_v-ce500d8e] {\n  width: 100%;\n  height: 10px; }\n", ""]);

	// exports


/***/ },

/***/ 1515:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div id='userCommon'>
	//         <div class="mask" v-if="commonShow">
	//             <div class='mask_con_mask' @click="close_comment"></div>
	//             <div class="mask_con">
	//                 <!--关闭按钮-->
	//                 <div class="close" @click="close_comment">
	//                     <img src="//pic.davdian.com/free/2016/12/22/60_80_543e7ae3b77c0ce52ebeee2a210dbdf6.png" alt="">
	//                 </div>
	//                 <!--弹出层列表-->
	//                 <div class="common" id="common">
	//                     <div class="scrollcon" id='scrollcon'>
	//                         <div class="commonList-container">
	//                             <div class="end" v-if="refreshtxt">拉取更多</div>
	//                             <div class="class_introduce_con" v-for="(common, index) in commonList" :key="common.uuid">
	//                                 <div class="comment_tit">
	//                                     <img class="img" :src="common.speaker.avatar || defaultAvatar" alt="">
	//                                     <div class="comment_dis">
	//                                         <span class="commentname">{{decodeURIComponent(common.speaker.name)}}</span>
	//                                         <span  v-if="new Date()-common.msg.time < 60*60*12*1000">{{getTime(parseInt(common.msg.time))}}</span>
	//                                         <span  v-if="new Date()-common.msg.time >= 60*60*12*1000">{{getFullTime(parseInt(common.msg.time))}}</span>
	//                                     </div>
	//                                 </div>
	//                                 <div class="class_introduce_text">
	//                                     <p>{{decodeURIComponent(common.msg.content)}}</p>
	//                                 </div>
	//                             </div>
	//                             <div class="commonbottom"></div>
	//                         </div>
	//                     </div>
	//                 </div>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	// import layout from "../layout/api.es6";
	var axios = __webpack_require__(282);
	__webpack_require__(308).polyfill();
	exports.default = {
	    props: ['flag', 'data', 'getupdataflag', 'userCommonTop'],
	    data: function data() {
	        return {
	            refreshtxt: false,
	            commonList: [],
	            length: null,
	            defaultAvatar: '//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png'

	        };
	    },
	    created: function created() {},
	    mounted: function mounted() {
	        this.$nextTick(function () {
	            this.init();
	            this.initScrool();
	        });
	    },

	    computed: {
	        commonShow: function commonShow() {
	            return this.flag || false;
	        },
	        commonList: function commonList() {
	            window.testData1 = this.data || [];
	            return this.data || [];
	        },
	        updataflag: function updataflag() {
	            return this.getupdataflag || false;
	        }
	    },
	    components: {},
	    methods: {
	        initScrool: function initScrool() {
	            $('#scrollcon').on("scroll", function () {
	                if (document.getElementById('scrollcon').scrollTop > document.getElementById('scrollcon').scrollHeight - parseInt(document.body.clientHeight * 0.73) - 2) {
	                    document.getElementById('scrollcon').scrollTop = document.getElementById('scrollcon').scrollHeight - parseInt(document.body.clientHeight * 0.73) - 2;
	                }
	                if (document.getElementById('scrollcon').scrollTop < 1) {
	                    document.getElementById('scrollcon').scrollTop = 1;
	                }
	            });
	        },
	        close_comment: function close_comment() {
	            this.$emit('closeusercomment', document.getElementById('scrollcon').scrollTop);
	        },
	        init: function init() {
	            var that = this;
	            if (that.userCommonTop > 0) {
	                document.getElementById('scrollcon').scrollTop = that.userCommonTop;
	            } else {
	                document.getElementById('scrollcon').scrollTop = document.getElementById('scrollcon').scrollHeight;
	            }
	            this.scroolEvent();
	        },
	        scroolEvent: function scroolEvent() {
	            var that = this;
	            $('#scrollcon').on("scroll", function () {
	                if (document.getElementById('scrollcon').scrollTop < 100 && that.updataflag) {
	                    that.$emit('getupdata', that.updataflag);
	                }
	            });
	        },

	        getTime: function getTime(second) {
	            var s = new Date(second).getSeconds();
	            var m = new Date(second).getMinutes();
	            var h = new Date(second).getHours();
	            var str;
	            if (h) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else if (m) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            }
	            return str;
	        },
	        getFullTime: function getFullTime(second) {
	            var y = new Date(second).getFullYear();
	            var monthtime = new Date(second).getMonth();
	            var daytime = new Date(second).getDate();
	            var s = new Date(second).getSeconds();
	            var m = new Date(second).getMinutes();
	            var h = new Date(second).getHours();
	            var str;
	            var fullTime;
	            if (h) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else if (m) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            }
	            fullTime = y + '年' + (monthtime + 1) + '月' + daytime + '日' + str;

	            return fullTime;
	        }
	    }
	    // </script>
	    // <!-- 组建内改变全局css样式 -->
	    // <style>
	    //
	    // </style>
	    // <!-- 组建内部css样式，不会改变全局样式 -->
	    // <style lang='sass' scoped>
	    // 	@import "../../../stylesheet/yo/usage/core/reset";
	    // 	@import "../../../stylesheet/yo/usage/module/commonList";
	    //     .mask{
	    //         width: 100%;
	    //         height: 100%;
	    //         /*left: 50%;*/
	    //         max-width: 640px;
	    //         margin: 0 auto;
	    //         position: fixed;
	    //         z-index: 106;
	    //         background: rgba(0,0,0,0.5);
	    //         .mask_con{
	    //           position: fixed;
	    //           bottom:0;
	    //           width:100%;
	    //           z-index: 100;
	    //           height:73%;
	    //           background: #fff;
	    //           .close{
	    //             position:absolute;
	    //             height:30px;
	    //             width:30px;
	    //             right:0;
	    //             z-index:105;
	    //             top:-40px;
	    //             img{
	    //               width:30px;
	    //               height:40px;
	    //             }
	    //           }
	    //           .common{
	    //             height: 100%;
	    //             overflow: hidden;
	    //             .scrollcon{
	    //                 width: 100%;
	    //                 height: 100%;
	    //                 overflow: scroll;
	    //                 -webkit-overflow-scrolling: touch;
	    //             }
	    //           }
	    //         }
	    //     }
	    //     .mask_con_mask{
	    //         position: fixed;
	    //         top: 0;
	    //         width: 100%;
	    //         height: 160px;
	    //         z-index: 100;
	    //     }
	    //     .commonbottom{
	    //         width: 100%;
	    //         height: 10px;
	    //     }
	    // </style>

	};

/***/ },

/***/ 1516:
/***/ function(module, exports) {

	module.exports = "\n<div id=\"userCommon\" _v-ce500d8e=\"\">\n    <div class=\"mask\" v-if=\"commonShow\" _v-ce500d8e=\"\">\n        <div class=\"mask_con_mask\" @click=\"close_comment\" _v-ce500d8e=\"\"></div>\n        <div class=\"mask_con\" _v-ce500d8e=\"\">\n            <!--关闭按钮-->\n            <div class=\"close\" @click=\"close_comment\" _v-ce500d8e=\"\">\n                <img src=\"//pic.davdian.com/free/2016/12/22/60_80_543e7ae3b77c0ce52ebeee2a210dbdf6.png\" alt=\"\" _v-ce500d8e=\"\">\n            </div>\n            <!--弹出层列表-->\n            <div class=\"common\" id=\"common\" _v-ce500d8e=\"\">\n                <div class=\"scrollcon\" id=\"scrollcon\" _v-ce500d8e=\"\">\n                    <div class=\"commonList-container\" _v-ce500d8e=\"\">\n                        <div class=\"end\" v-if=\"refreshtxt\" _v-ce500d8e=\"\">拉取更多</div>\n                        <div class=\"class_introduce_con\" v-for=\"(common, index) in commonList\" :key=\"common.uuid\" _v-ce500d8e=\"\">\n                            <div class=\"comment_tit\" _v-ce500d8e=\"\">\n                                <img class=\"img\" :src=\"common.speaker.avatar || defaultAvatar\" alt=\"\" _v-ce500d8e=\"\">\n                                <div class=\"comment_dis\" _v-ce500d8e=\"\">\n                                    <span class=\"commentname\" _v-ce500d8e=\"\">{{decodeURIComponent(common.speaker.name)}}</span>\n                                    <span v-if=\"new Date()-common.msg.time < 60*60*12*1000\" _v-ce500d8e=\"\">{{getTime(parseInt(common.msg.time))}}</span>\n                                    <span v-if=\"new Date()-common.msg.time >= 60*60*12*1000\" _v-ce500d8e=\"\">{{getFullTime(parseInt(common.msg.time))}}</span>\n                                </div>\n                            </div>\n                            <div class=\"class_introduce_text\" _v-ce500d8e=\"\">\n                                <p _v-ce500d8e=\"\">{{decodeURIComponent(common.msg.content)}}</p>\n                            </div>\n                        </div>\n                        <div class=\"commonbottom\" _v-ce500d8e=\"\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 1517:
/***/ function(module, exports) {

	module.exports = "\n<div id=\"socail_container\" _v-60c3a804=\"\">\n    <social-title :rightshow=\"true\" :id=\"communityId\" :data=\"title\" _v-60c3a804=\"\"></social-title>\n    <speak v-on:send=\"sendMsg\" _v-60c3a804=\"\"></speak>\n    <social-switch :data=\"userCommonRoomData\" :total=\"total\" v-on:usercomment=\"openUserComment\" _v-60c3a804=\"\"></social-switch>\n    <common v-if=\"commonRoomData[0]\" :id=\"communityId\" :flag=\"updataflagteacher\" :data=\"commonRoomData\" v-on:getupdatateacher=\"getupdatateacher\" _v-60c3a804=\"\"></common>\n    <user-common v-if=\"userCommonFlag\" :user-common-top=\"userCommonTop\" :getupdataflag=\"getupdataflag\" :flag=\"userCommonFlag\" :data=\"userCommonRoomData\" v-on:closeusercomment=\"closeUserComment\" v-on:getupdata=\"getupdata\" _v-60c3a804=\"\"></user-common>\n</div>\n";

/***/ },

/***/ 1518:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1519)
	__webpack_require__(1521)
	__vue_script__ = __webpack_require__(1523)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/social/social_manage.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1534)
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
	  var id = "_v-bc029a14/social_manage.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1519:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1520);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-bc029a14&scoped=true!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./social_manage.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-bc029a14&scoped=true!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./social_manage.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1520:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.weui-cell__ft[_v-bc029a14]:after:after{\n  height: 8px;\n  width: 8px;\n  border-width: 1px 1px 0 0;\n  color: #999;\n}\n\n.avatar_outer[_v-bc029a14]{\n  height: 70px;\n}\n\n.avatar_con[_v-bc029a14] {\n  width: 50px;\n  border-radius: 50px;\n}\n\n.v-middle[_v-bc029a14] {\n  vertical-align: middle;\n}\n\n.mr6[_v-bc029a14] {\n  margin-right: 6px;\n}\n.mr10[_v-bc029a14] {\n  margin-right: 10px;\n}\n\n.avatar_list[_v-bc029a14] {\n  position: absolute;\n  left: 4.5em;\n}\n\n.avatar_list .avatar_con[_v-bc029a14] {\n  width: 30px;\n}\n@media screen and (max-width: 374px){\n  .avatar_list .avatar_con[_v-bc029a14] {\n    width: 26px;\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 1521:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1522);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./social_manage.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./social_manage.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1522:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.social_manage .vux-label, .social_manage .weui-cell__ft, .social_manage .v-middle {\n  font-size: 14px;\n  line-height: 24px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1523:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _webStorageCache = __webpack_require__(358);

	var _webStorageCache2 = _interopRequireDefault(_webStorageCache);

	var _index = __webpack_require__(1073);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(917);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(1011);

	var _index6 = _interopRequireDefault(_index5);

	var _index7 = __webpack_require__(974);

	var _index8 = _interopRequireDefault(_index7);

	var _index9 = __webpack_require__(973);

	var _index10 = _interopRequireDefault(_index9);

	var _cell = __webpack_require__(1524);

	var _cell2 = _interopRequireDefault(_cell);

	var _baseTitle = __webpack_require__(1529);

	var _baseTitle2 = _interopRequireDefault(_baseTitle);

	var _common = __webpack_require__(96);

	var _common2 = _interopRequireDefault(_common);

	var _utils = __webpack_require__(94);

	var _utils2 = _interopRequireDefault(_utils);

	var _layout = __webpack_require__(91);

	var _layout2 = _interopRequireDefault(_layout);

	var _dialog = __webpack_require__(969);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var axios = __webpack_require__(282);
	__webpack_require__(308).polyfill();

	Vue.use(_index10.default);
	var socialManageCache = new _webStorageCache2.default({ storage: 'sessionStorage' });
	exports.default = {
	  components: {
	    Group: _index4.default,
	    Cell: _cell2.default,
	    CellBox: _index6.default,
	    baseTitle: _baseTitle2.default,
	    Toast: _index8.default,
	    Scroller: _index2.default
	  },
	  data: function data() {
	    return {
	      socialId: "",
	      communityHolderName: "", //群主昵称
	      communityHolderImage: "//pic.davdian.com/free/default_head_icon_0419.png", // 群主头像
	      communityTitle: "", //群名称
	      communityMemberList: [], //群成员
	      showMenus: false,
	      communityIntro: null,
	      describe: "未设置",
	      momGrowUpTitle: "",
	      monGrowUpContent: "javascript:void(0)",
	      avatarNum: 0
	    };
	  },

	  computed: {
	    sessionKey: function sessionKey() {
	      return "social_manage_" + this.socialId;
	    },
	    nextSessionKey: function nextSessionKey() {
	      return "social_manage_member_" + this.socialId;
	    }
	  },
	  mounted: function mounted() {
	    var that = this;
	    if (localStorage.getItem('equipment')) {
	      window.history.back();
	    }
	    this.setId();
	    this.getData();
	    that.setAvatarNum();
	    window.onresize = function () {
	      that.setAvatarNum();
	    };
	  },

	  methods: {
	    setAvatarNum: function setAvatarNum() {
	      var that = this;
	      var w = document.body.clientWidth;
	      var w0 = w < 375 ? 36 : 40;
	      setTimeout(function () {
	        var w2 = document.body.clientWidth;
	        if (w == w2) {
	          that.avatarNum = Math.floor((w - 100) / w0);
	        }
	      }, 100);
	    },
	    goToGroup: function goToGroup() {
	      socialManageCache.set("socialManageFlag", 1);
	      window.location = this.monGrowUpContent;
	    },
	    setId: function setId() {
	      this.socialId = this.$route.params.id || 0;
	    },

	    /**
	    *  预加载数据
	    */
	    preloadData: function preloadData() {
	      var that = this;
	      var obj = { communityId: that.socialId, pageIndex: 0, pageSize: 50 };
	      var dataUrl = '/api/mg/community/group/member_list';
	      axios.post(dataUrl, _layout2.default.strSign('socialmanage', obj)).then(function (respone) {
	        if (respone.data && !+respone.data.code) {
	          socialManageCache.set(that.nextSessionKey, respone.data.data);
	        } else {}
	      }).catch(function (error) {});
	    },
	    getData: function getData() {
	      var that = this;
	      var data = this.getDataFromSession();
	      if (!data) {
	        that.getDataFromNetwork(function (data) {
	          that.setData(data);
	        });
	      } else {
	        that.setData(data);
	      }
	    },
	    getDataFromSession: function getDataFromSession() {
	      return socialManageCache.get(this.sessionKey);
	    },
	    getDataFromNetwork: function getDataFromNetwork(callback) {
	      var that = this;
	      if (typeof callback === "function") {
	        var obj = { communityId: that.socialId };
	        var dataUrl = '/api/mg/community/group/info';

	        axios.post(dataUrl, _layout2.default.strSign('socialmember', obj)).then(function (respone) {
	          var result = respone.data;
	          if (+result.code) {
	            _dialog2.default.alert('网络异常，请稍后重试(', result.code, ")");
	          } else {
	            callback(result.data);
	          }
	        }).catch(function (error) {
	          _dialog2.default.alert('网络异常');
	        });
	      }
	    },
	    setData: function setData(data) {
	      var that = this;
	      var communityHolderName = data.communityHolderName,
	          communityHolderImage = data.communityHolderImage,
	          communityTitle = data.communityTitle,
	          list = data.communityMember.list,
	          communityIntro = data.communityIntro,
	          _data$momGrowUp = data.momGrowUp,
	          title = _data$momGrowUp.title,
	          content = _data$momGrowUp.command.content;

	      this.communityHolderName = communityHolderName;
	      this.communityHolderImage = communityHolderImage;
	      this.communityTitle = communityTitle;
	      this.communityMemberList = list;
	      this.communityIntro = communityIntro.replace(/\n/g, "<br/>");
	      if (communityIntro) {
	        this.describe = "";
	      }
	      if (!communityTitle || communityTitle === "") {
	        this.communityTitle = "未设置";
	      }
	      this.momGrowUpTitle = title;
	      this.monGrowUpContent = content;
	      this.$nextTick(function () {
	        that.preloadData();
	        that.$refs.manage.reset();
	      });
	    }
	  }
	};

/***/ },

/***/ 1524:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1525)
	__vue_script__ = __webpack_require__(1527)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/vux-fix/cell.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1528)
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
	  var id = "_v-225247f1/cell.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1525:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1526);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/less-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./cell.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/less-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./cell.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1526:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.vux-tap-active {\n  tap-highlight-color: rgba(0, 0, 0, 0);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.vux-tap-active:active {\n  background-color: #ECECEC;\n}\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.41176471;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 100%;\n      -ms-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells__title {\n  margin-top: 0.77em;\n  margin-bottom: 0.3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: .3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.weui-cell:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n      -ms-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n      -ms-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n     -moz-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.weui-cell__bd {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n.vux-cell-primary {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.vux-label {\n  display: block;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n", ""]);

	// exports


/***/ },

/***/ 1527:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _inlineDesc = __webpack_require__(926);

	var _inlineDesc2 = _interopRequireDefault(_inlineDesc);

	var _router = __webpack_require__(931);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div class="weui-cell" :class="{'vux-tap-active': isLink || !!link, 'weui-cell_access': isLink || !!link}" @click="onClick">
	//         <div class="weui-cell__hd">
	//             <slot name="icon"></slot>
	//         </div>
	//         <div class="vux-cell-bd" :class="{'vux-cell-primary':primary==='title'}">
	//             <p>
	//                 <label class="vux-label" :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title">{{title}}</label>
	//                 <slot name="after-title"></slot>
	//             </p>
	//             <inline-desc v-html="inlineDesc"></inline-desc>
	//         </div>
	//         <div class="weui-cell__ft" :class="{'vux-cell-primary':primary==='content'}">
	//             {{value}}
	//       <slot name="value"></slot>
	//             <slot></slot>
	//         </div>
	//         <slot name="child"></slot>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    components: {
	        InlineDesc: _inlineDesc2.default
	    },
	    props: {
	        title: String,
	        value: [String, Number, Array],
	        isLink: Boolean,
	        inlineDesc: [String, Number],
	        primary: {
	            type: String,
	            default: 'title'
	        },
	        link: {
	            type: [String, Object]
	        }
	    },
	    methods: {
	        onClick: function onClick() {
	            (0, _router.go)(this.link, this.$router);
	        }
	    }
	    // </script>
	    //
	    // <style lang="less">
	    //     @import '../../node_modules/vux/src/styles/variable.less';
	    //     @import '../../node_modules/vux/src/styles/tap.less';
	    //     @import '../../node_modules/vux/src/styles/weui/base/mixin/setArrow.less';
	    //     @import '../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global';
	    //
	    //     .vux-cell-primary {
	    //         flex: 1;
	    //     }
	    //     .vux-label {
	    //         display: block;
	    //         word-wrap: break-word;
	    //         word-break: break-all;
	    //     }
	    // </style>

	};

/***/ },

/***/ 1528:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"weui-cell\" :class=\"{'vux-tap-active': isLink || !!link, 'weui-cell_access': isLink || !!link}\" @click=\"onClick\">\n    <div class=\"weui-cell__hd\">\n        <slot name=\"icon\"></slot>\n    </div>\n    <div class=\"vux-cell-bd\" :class=\"{'vux-cell-primary':primary==='title'}\">\n        <p>\n            <label class=\"vux-label\" :style=\"{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}\" v-if=\"title\">{{title}}</label>\n            <slot name=\"after-title\"></slot>\n        </p>\n        <inline-desc v-html=\"inlineDesc\"></inline-desc>\n    </div>\n    <div class=\"weui-cell__ft\" :class=\"{'vux-cell-primary':primary==='content'}\">\n        {{value}}\n  <slot name=\"value\"></slot>\n        <slot></slot>\n    </div>\n    <slot name=\"child\"></slot>\n</div>\n";

/***/ },

/***/ 1529:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1530)
	__vue_script__ = __webpack_require__(1532)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/baseTitle.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1533)
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
	  var id = "_v-5c6d1d36/baseTitle.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1530:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1531);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./baseTitle.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./baseTitle.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1531:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n.in_app .top_container{\n    display: none;\n}\n", ""]);

	// exports


/***/ },

/***/ 1532:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <style>
	//     .in_app .top_container{
	//         display: none;
	//     }
	// </style>
	// <template>
	//     <div class="top0">
	//         <div class="top_container">
	//             <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->
	//             <div class="top_left">
	//                 <a class="top_back" href="javascript:history.back();" data-dav-tj="order_list|back|back|1|back@order_list">
	//                     <span class="home_arrow"></span>
	//                 </a>
	//             </div>
	//             <div class="title_container">
	//                 {{title}}
	//             </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            title: this.value || document.title
	        };
	    },
	    props: ['value']
	    // </script>

	};

/***/ },

/***/ 1533:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n<div class=\"top0\">\n    <div class=\"top_container\">\n        <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->\n        <div class=\"top_left\">\n            <a class=\"top_back\" href=\"javascript:history.back();\" data-dav-tj=\"order_list|back|back|1|back@order_list\">\n                <span class=\"home_arrow\"></span>\n            </a>\n        </div>\n        <div class=\"title_container\">\n            {{title}}\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 1534:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"social_manage\" style=\"overflow: scroll;\" :style=\"{height:document.body.clientHeight-44+'px'}\" _v-bc029a14=\"\">\n  <base-title value=\"群信息\" _v-bc029a14=\"\"></base-title>\n  <div _v-bc029a14=\"\">\n    <group _v-bc029a14=\"\">\n      <cell title=\"群主\" class=\"avatar_outer\" _v-bc029a14=\"\">\n        <div slot=\"value\" _v-bc029a14=\"\">\n          <span class=\"v-middle mr6\" v-text=\"communityHolderName\" _v-bc029a14=\"\"></span>\n          <img class=\"avatar_con\" :src=\"communityHolderImage\" alt=\"\" _v-bc029a14=\"\">\n        </div>\n      </cell>\n      <cell title=\"群名称\" :value=\"communityTitle\" _v-bc029a14=\"\"></cell>\n      <cell title=\"群成员\" is-link=\"\" :link=\"{path:'/member/'+socialId}\" _v-bc029a14=\"\">\n                      <span slot=\"child\" class=\"avatar_list\" _v-bc029a14=\"\">\n                          <img v-for=\"(communityMemberItem,index) in communityMemberList\" class=\"avatar_con mr10\" :src=\"communityMemberItem.avatar\" v-if=\"index<avatarNum\" alt=\"\" _v-bc029a14=\"\">\n                      </span>\n      </cell>\n      <cell title=\"群介绍\" :inline-desc=\"communityIntro\" :value=\"describe\" _v-bc029a14=\"\">\n\n      </cell>\n    </group>\n\n    <group _v-bc029a14=\"\">\n      <div @click=\"goToGroup()\" _v-bc029a14=\"\">\n        <cell :title=\"momGrowUpTitle\" is-link=\"\" _v-bc029a14=\"\"></cell>\n      </div>\n    </group>\n    <div style=\"height: 40px\" _v-bc029a14=\"\"></div>\n  </div>\n\n\n\n</div>\n";

/***/ },

/***/ 1535:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1536)
	__vue_script__ = __webpack_require__(1538)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/social/social_member.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1549)
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
	  var id = "_v-853a04aa/social_member.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1536:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1537);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-853a04aa&scoped=true!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./social_member.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-853a04aa&scoped=true!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./social_member.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1537:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.member_container[_v-853a04aa]{\n    background-color: #fff;\n    padding: 0 5px;\n}\n.member_item[_v-853a04aa] {\n    padding: 10px;\n    position: relative;\n    border-bottom: 1px solid #eee;\n    line-height: 30px;\n}\n\n.avatar_con[_v-853a04aa] {\n    width: 30px;\n    height: 30px;\n    border-radius: 30px;\n}\n\n.invite_number[_v-853a04aa]{\n    font-size:10px;\n    position:absolute;\n    right:10px;\n    color:#999;\n}\n\n.mr6[_v-853a04aa] {\n    margin-right: 6px;\n}\n\n.member_name[_v-853a04aa]{\n    height: 26px;\n    overflow: hidden;\n    display: inline-block;\n    position: absolute;\n    right: 80px;\n    left: 46px;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n", ""]);

	// exports


/***/ },

/***/ 1538:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _baseTitle = __webpack_require__(1529);

	var _baseTitle2 = _interopRequireDefault(_baseTitle);

	var _common = __webpack_require__(96);

	var _common2 = _interopRequireDefault(_common);

	var _utils = __webpack_require__(94);

	var _utils2 = _interopRequireDefault(_utils);

	var _layout = __webpack_require__(91);

	var _layout2 = _interopRequireDefault(_layout);

	var _index = __webpack_require__(1073);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(917);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(922);

	var _index6 = _interopRequireDefault(_index5);

	var _index7 = __webpack_require__(1539);

	var _index8 = _interopRequireDefault(_index7);

	var _index9 = __webpack_require__(1544);

	var _index10 = _interopRequireDefault(_index9);

	var _webStorageCache = __webpack_require__(358);

	var _webStorageCache2 = _interopRequireDefault(_webStorageCache);

	var _dialog = __webpack_require__(969);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var axios = __webpack_require__(282);
	__webpack_require__(308).polyfill();

	var socialManageMemberCache = new _webStorageCache2.default({ storage: 'sessionStorage' });
	exports.default = {
	  components: {
	    baseTitle: _baseTitle2.default,
	    Scroller: _index2.default,
	    Group: _index4.default,
	    Cell: _index6.default,
	    LoadMore: _index8.default,
	    Divider: _index10.default
	  },
	  data: function data() {
	    return {
	      pullConfig: {
	        content: '上拉加载更多',
	        pullUpHeight: 60,
	        height: 40,
	        autoRefresh: false,
	        downContent: '释放以加载数据',
	        upContent: '加载中...',
	        loadingContent: '加载中...',
	        clsPrefix: 'xs-plugin-pullup-'
	      },
	      memberList: [],
	      socialId: "",
	      pageIndex: 0,
	      more: 1
	    };
	  },

	  computed: {
	    sessionKey: function sessionKey() {
	      return "social_manage_member_" + this.socialId;
	    }
	  },
	  mounted: function mounted() {
	    this.setId();
	    this.getData();
	  },

	  methods: {
	    setId: function setId() {
	      this.socialId = this.$route.params.id || 0;
	    },
	    getData: function getData() {
	      var that = this;
	      var data = this.getDataFromSession();
	      if (!data) {
	        that.getDataFromNetwork(function (data) {
	          that.setData(data);
	        });
	      } else {
	        that.setData(data);
	      }
	    },
	    getDataFromSession: function getDataFromSession() {
	      return socialManageMemberCache.get(this.sessionKey);
	    },
	    getDataFromNetwork: function getDataFromNetwork(callback) {
	      var that = this;
	      if (typeof callback === "function") {
	        var obj = { communityId: that.socialId, pageIndex: that.pageIndex, pageSize: 20 };
	        var dataUrl = '/api/mg/community/group/member_list';
	        axios.post(dataUrl, _layout2.default.strSign('socialmember', obj)).then(function (respone) {
	          var result = respone.data;
	          if (+result.code) {
	            _dialog2.default.alert('网络异常，请稍后重试(', result.code, ")");
	            that.done();
	          } else {
	            callback(result.data);
	          }
	        }).catch(function (error) {
	          _dialog2.default.alert('网络异常');
	          that.done();
	        });
	      }
	    },
	    done: function done() {
	      var that = this;
	      that.$refs.scroller.reset();
	      that.$refs.scroller.donePullup();
	      if (!that.more) {
	        that.$refs.scroller.disablePullup();
	      }
	    },
	    setData: function setData(data) {
	      var that = this;
	      this.memberList = this.memberList.concat(data.dataList);
	      this.more = +data.more;
	      this.pageIndex = data.nextPageIndex;
	      console.log(data.dataList, this.memberList);
	      this.$nextTick(function () {
	        that.done();
	      });
	    },
	    pullupCallback: function pullupCallback() {
	      var that = this;
	      this.getDataFromNetwork(function (data) {
	        that.setData(data);
	      });
	    }
	  }
	};

/***/ },

/***/ 1539:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1540)
	__vue_script__ = __webpack_require__(1542)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/load-more/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1543)
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
	  var id = "_v-9e555a2c/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1540:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1541);
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

/***/ 1541:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "/**\n* actionsheet\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/* alias */\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* form-preview\n*/\n/**\n* load-more\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* toast\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* search\n*/\n/**\n* radio\n*/\n.weui-loading {\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-animation: weuiLoading 1s steps(12, end) infinite;\n          animation: weuiLoading 1s steps(12, end) infinite;\n  background: transparent url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=\") no-repeat;\n  background-size: 100%;\n}\n.weui-loading.weui-loading_transparent {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHBhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8+PHJlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvPjwvc3ZnPgo=\");\n}\n@-webkit-keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n.weui-loadmore {\n  width: 65%;\n  margin: 1.5em auto;\n  line-height: 1.6em;\n  font-size: 14px;\n  text-align: center;\n}\n.weui-loadmore__tips {\n  display: inline-block;\n  vertical-align: middle;\n}\n.weui-loadmore_line {\n  border-top: 1px solid #E5E5E5;\n  margin-top: 2.4em;\n}\n.weui-loadmore_line .weui-loadmore__tips {\n  position: relative;\n  top: -0.9em;\n  padding: 0 .55em;\n  background-color: #FFFFFF;\n  color: #999999;\n}\n.weui-loadmore_dot .weui-loadmore__tips {\n  padding: 0 .16em;\n}\n.weui-loadmore_dot .weui-loadmore__tips:before {\n  content: \" \";\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background-color: #E5E5E5;\n  display: inline-block;\n  position: relative;\n  vertical-align: 0;\n  top: -0.16em;\n}\n", ""]);

	// exports


/***/ },

/***/ 1542:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="weui-loadmore" :class="{'weui-loadmore_line':!showLoading, 'weui-loadmore_dot': !showLoading && !tip}">
	//     <i class="weui-loading" v-if="showLoading"></i>
	//     <span class="weui-loadmore__tips" :style="getStyle()" v-show="tip || !showLoading">{{tip}}</span>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'load-more',
	  props: {
	    showLoading: {
	      type: Boolean,
	      default: true
	    },
	    tip: String,
	    backgroundColor: String
	  },
	  methods: {
	    getStyle: function getStyle() {
	      if (!this.showLoading && this.tip) {
	        return {
	          'background-color': this.backgroundColor
	        };
	      }
	    }
	  }
	  // </script>
	  //
	  // <style lang="less">
	  // @import '../../styles/weui/widget/weui-loading/weui-loading.less';
	  // @import '../../styles/weui/widget/weui_tips/weui-loadmore.less';
	  // </style>

	};

/***/ },

/***/ 1543:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"weui-loadmore\" :class=\"{'weui-loadmore_line':!showLoading, 'weui-loadmore_dot': !showLoading && !tip}\">\n  <i class=\"weui-loading\" v-if=\"showLoading\"></i>\n  <span class=\"weui-loadmore__tips\" :style=\"getStyle()\" v-show=\"tip || !showLoading\">{{tip}}</span>\n</div>\n";

/***/ },

/***/ 1544:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1545)
	__vue_script__ = __webpack_require__(1547)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/vux/src/components/divider/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1548)
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
	  var id = "_v-1679a6a7/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1545:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1546);
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

/***/ 1546:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n.vux-divider {\n  display: table;\n  white-space: nowrap;\n  height: auto;\n  overflow: hidden;\n  line-height: 1;\n  text-align: center;\n  padding: 10px 0;\n  color: #666;\n}\n\n.vux-divider:after,.vux-divider:before {\n  content: '';\n  display: table-cell;\n  position: relative;\n  top: 50%;\n  width: 50%;\n  background-repeat: no-repeat;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC)\n}\n\n.vux-divider:before {\n  background-position: right 1em top 50%\n}\n\n.vux-divider:after {\n  background-position: left 1em top 50%\n}\n", ""]);

	// exports


/***/ },

/***/ 1547:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <p class="vux-divider">
	//     <slot></slot>
	//   </p>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'divider'
	  // </script>
	  //
	  // <style>
	  // .vux-divider {
	  //   display: table;
	  //   white-space: nowrap;
	  //   height: auto;
	  //   overflow: hidden;
	  //   line-height: 1;
	  //   text-align: center;
	  //   padding: 10px 0;
	  //   color: #666;
	  // }
	  //
	  // .vux-divider:after,.vux-divider:before {
	  //   content: '';
	  //   display: table-cell;
	  //   position: relative;
	  //   top: 50%;
	  //   width: 50%;
	  //   background-repeat: no-repeat;
	  //   background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC)
	  // }
	  //
	  // .vux-divider:before {
	  //   background-position: right 1em top 50%
	  // }
	  //
	  // .vux-divider:after {
	  //   background-position: left 1em top 50%
	  // }
	  // </style>

	};

/***/ },

/***/ 1548:
/***/ function(module, exports) {

	module.exports = "\n<p class=\"vux-divider\">\n  <slot></slot>\n</p>\n";

/***/ },

/***/ 1549:
/***/ function(module, exports) {

	module.exports = "\n<div _v-853a04aa=\"\">\n    <base-title value=\"群成员\" _v-853a04aa=\"\"></base-title>\n    <scroller height=\"-44\" lock-x=\"\" scrollbar-y=\"\" ref=\"scroller\" :use-pullup=\"true\" :pullup-config=\"pullConfig\" @on-pullup-loading=\"pullupCallback\" _v-853a04aa=\"\">\n        <div _v-853a04aa=\"\">\n            <div class=\"member_container\" _v-853a04aa=\"\">\n                <div v-for=\"(member, index) in memberList\" class=\"member_item vux-1px-b\" :index=\"index\" _v-853a04aa=\"\">\n                    <img slot=\"icon\" class=\"avatar_con mr6\" :src=\"member.avatar\" _v-853a04aa=\"\">\n                    <span v-text=\"member.name\" class=\"member_name\" _v-853a04aa=\"\"></span>\n                    <span v-text=\"'邀'+member.inviteNum+'位好友'\" class=\"invite_number\" _v-853a04aa=\"\"></span>\n                </div>\n            </div>\n            <divider v-if=\"!more\" _v-853a04aa=\"\">没有更多了</divider>\n        </div>\n    </scroller>\n</div>\n";

/***/ }

/******/ });