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

	// require('../../stylesheet/yo/usage/module/vClassPopList.scss');
	__webpack_require__(83);
	__webpack_require__(43);
	__webpack_require__(1696);


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

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	// 弹窗组件
	if (true) {
	  window.popup = __webpack_require__(44).default;
	}

	//商品详情页及文章详情未开店用户提示开店
	if ($(".kd_prompt_con").length) {
	  $(".kd_prompt_con .close").on("click", function () {
	    $(".kd_prompt_con").addClass("hide");
	  });
	}

	var js = document.scripts;
	for (var i = 0; i < js.length; i++) {
	  var src = js[i].src;
	  if (src.indexOf("base.js") > -1) {
	    var baseFeUrl = src.substring(0, src.indexOf('/javascript/base.js'));
	    window.baseFeUrl = baseFeUrl;
	  }
	  if (src.indexOf("dist") > -1) {
	    var baseFeUrl = src.substring(0, src.indexOf('/dist'));
	    window.baseFeUrl = baseFeUrl;
	  }
	}
	window.Units = window.Units || {};
	var u = navigator.userAgent;
	Units.getQuery = function (name) {
	  var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
	  var r = window.location.search.match(reg)
	  if (r != null) return decodeURIComponent(r[2])
	  return null
	}
	Units.setTitle = function (name) {
	  // document.title = name
	  // if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	  //     var  i = document.createElement('iframe')
	  //     i.src = '/favicon.ico'
	  //     i.style.display = 'none'
	  //     i.onload = function() {
	  //       setTimeout(function(){
	  //         i.remove();
	  //       }, 10)
	  //     }
	  //     document.body.appendChild(i)
	  // }
	  document.title = name;
	  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	    var i = document.createElement('iframe');
	    i.src = '/favicon.ico';
	    i.style.display = 'none';
	    i.onload = function () {
	      setTimeout(function () {
	        i.remove();
	      }, 9)
	    }
	    document.body.appendChild(i);
	  }

	}

	Units.isIOS = function () {
	  if (u.match(/ios/i)) {
	    return true;
	  }
	  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	};
	Units.isWechat = function () {
	  var ua = window.navigator.userAgent.toLowerCase();
	  if (ua.match(/MicroMessenger/i) == "micromessenger") {
	    return true;
	  } else {
	    return false;
	  }
	};
	Units.isMobileIOS = function () {
	  return /iPhone|iPad|iPod/i.test(u);
	};
	Units.getAppVersion = function () {
	  // 空格分所有
	  var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) || u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i) || u.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
	  if (versionStr == null) {
	    return 0;
	  } else {
	    var v = versionStr[2].split(".").reduce(function (a, b) {
	      return +a * 10 + +b
	    });
	  }
	  return +v;
	};
	Units.isAndroid = function () {
	  if (u.match(/(android|linux)/i)) {
	    return true;
	  }
	  return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	};
	Units.isApp = function () {
	  return !!u.match(/davdian|bravetime|vyohui/)
	};

	// 统一加 数据统计
	window.cnzz = false; // 是否使用cnzz
	window.baidu = true; // 是否使用百度统计

	window.google = false; // 是否使用google统计
	window.dvd_tj = true; // 大V店统计


	if (window.cnzz || window.baidu || window.google || window.dvd_tj) {
	  if (!window.bravetime || !window.bravetime.tj) {
	    var js = document.scripts;
	    var tjscr = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1) + "tongji.js";
	    tjscr = tjscr.replace("dist", "javascript");
	    var oScript = document.createElement("script");
	    oScript.type = "text/javascript";
	    oScript.src = tjscr;
	    var s = document.getElementsByTagName('head')[0].getElementsByTagName("link")[0];
	    s.parentNode.insertBefore(oScript, s);
	    window.bravetime = window.bravetime || {};
	  }
	}

	if (window.google) {

	  (function (i, s, o, g, r, a, m) {
	    i['GoogleAnalyticsObject'] = r;
	    i[r] = i[r] || function () {
	        (i[r].q = i[r].q || []).push(arguments)
	      }, i[r].l = 1 * new Date();
	    a = s.createElement(o),
	      m = s.getElementsByTagName(o)[0];
	    a.async = 1;
	    a.src = g;
	    m.parentNode.insertBefore(a, m)
	  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

	  ga('create', 'UA-61684246-2', 'auto');


	}

	if (window.cnzz) {
	  var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	  document.write(unescape("%3Cspan id='cnzz_stat_icon_1255599577'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1255599577' type='text/javascript'%3E%3C/script%3E"));
	}
	if (window.baidu) {
	  var _hmt = window._hmt || [];
	  if (window["tj_path"]) {
	    _hmt.push(['_setAutoPageview', false]);
	  }
	  window._hmt = _hmt;
	  (function () {
	    var hm = document.createElement("script");
	    hm.src = "//hm.baidu.com/hm.js?9b39bbe0b5396b90787c80447d337d58";
	    var s = document.getElementsByTagName('head')[0].getElementsByTagName("link")[0];
	    s.parentNode.insertBefore(hm, s);
	  })();
	}


	$(document).ready(function () {

	  window.iosInterface = window.iosInterface || {};

	  // add by swg ios新内核返回上一页回调js
	  window.iosInterface.nativeWebviewBack = function () {
	    window.bravetime.initHead();
	  };
	  window.iosInterface.refreshPreviousPageData = function () {
	    backNewData.$children[0].appUpData()
	  }
	  window.iosInterface.alreadyCached = function(){
	    window.backNewData.$children[0].cache = true
	  }

	  window.iosInterface.setCookie = function (_name, _value) {
	    var setCookie = function (name, value) {
	      console.log("_before set:" + document.cookie);
	      var domainList = location.hostname.split(".");
	      var domainStr = "." + domainList[domainList.length - 2] + "." + domainList[domainList.length - 1];
	      document.cookie = name + "=" + value + ";domain=" + domainStr;
	      console.log("_after set:" + document.cookie);
	    };
	    var getCookie = function (name) {
	      var cookieObj = {};
	      var cookieList = document.cookie.split(";");
	      for (var i = 0, item; item = cookieList[i++];) {
	        var k = item.split("=")[0].replace(" ", ""), v = item.split("=")[1];
	        cookieObj[k] = v;
	      }
	      return cookieObj[name];
	    };

	    try {
	      if (getCookie(_name) == _value) {
	        return JSON.stringify({code: 0, msg: "success"});
	      } else {
	        setCookie(_name, _value);

	        if (getCookie(_name) == _value) {
	          location.reload();
	          return JSON.stringify({code: 0, msg: "success"});
	        } else {
	          return JSON.stringify({code: 1, msg: "set fail"});
	        }

	      }
	    } catch (e) {
	      return JSON.stringify({code: -1, msg: e.message});
	    }


	  };

	  window.iosInterface.getHeadAndFootData = function () {
	    var defaultData = {
	      showHead: 1,     // 是否展示头部
	      showFoot: 0,     // 是否展示底部
	      backOnHead: 1,   // 头部返回按钮
	      homeOnHead: 0,   // 头部首页按钮
	      shareOnHead: 0,  // 头部分享按钮
	      btnOnHead: 0,    // 头部文字按钮
	      btnText: "",     // 头部文字按钮文字
	      btnLink: ""      // 头部文字按钮链接
	    };
	    var formatData = {
	      showHead: 0,     // 是否展示头部
	      showFoot: 0,     // 是否展示底部
	      backOnHead: 0,   // 头部返回按钮
	      homeOnHead: 0,   // 头部首页按钮
	      shareOnHead: 0,  // 头部分享按钮
	      btnOnHead: 0,    // 头部文字按钮
	      btnText: "",     // 头部文字按钮文字
	      btnLink: ""      // 头部文字按钮链接
	    };
	    if (window.appData) {
	      return JSON.stringify($.extend(formatData, window.appData));
	    } else {
	      return JSON.stringify(defaultData);
	    }

	  };
	  window.getNewLineLink = function(href){
	    if (href && href.length > 5 && href.substring(0,4) && href.substring(0,5)){
	      var str = href.substring(0,4)
	      var str1 = href.substring(0,5)
	      // console.log(str =='http' && str1 != 'https')
	      if (str =='http' && str1 != 'https'){
	        return href.replace('http', 'https')
	      } else {
	        return href
	      }
	    }
	  }
	  window.lineLink = getNewLineLink(window.lineLink)
	  window.iosInterface.getShareInfo = function () {
	    var shareInfo = {
	      title: window.shareTitle || "MAMA+|大V店",
	      desc: window.descContent || "MAMA+|大V店",
	      link: window.lineLink || window.location.href,
	      imgUrl: window.imgUrl ? window.imgUrl.replace("https", "http") : "//pic.davdian.com/free/index0925_icon1.png?x-oss-process=image/resize,m_fill,w_80"
	    };
	    return JSON.stringify($.extend(shareInfo, window.moreShareInfo));
	  };

	  window.iosInterface.netWorkGetShareInfo = window.iosInterface.getShareInfo;

	  window.bravetime = window.bravetime || {};


	  /**
	   * 调用原生方法
	   * @param callback
	   * @param error
	   * @param className
	   * @param method
	   * @param argumentsList
	   */
	  window.bravetime.callNative = function (callback, error, className, method, argumentsList) {
	    var t = Date.now();
	    window["callback_" + t] = callback;
	    window["error_" + t] = error;
	    var str = "neng:\/\/call.app.com?v=" + [encodeURIComponent("callback_" + t), encodeURIComponent("error_" + t), className, method, JSON.stringify(argumentsList)].join("|||").replace(/\"/g, "'");
	    window.bravetime.goto(str);
	  };


	  window.bravetime.callNative2 = function (host, action, params, callback, minv, minCallback) {
	    var callback = callback || function () {
	      };

	    if (window.Units && Units.getAppVersion() >= minv.split(".").reduce(function (a, b) {
	        return +a * 10 + +b
	      })) {
	      var t = Date.now() + "_" + Math.round(Math.random() * 10000);
	      window["callback_" + t] = callback;

	      var str = "davdian:\/\/call." + host + ".com?action=" + encodeURIComponent(action) + "&params=" + encodeURIComponent(JSON.stringify(params)) + "&callback=" + encodeURIComponent("callback_" + t) + "&minv=" + encodeURIComponent(minv);
	      window.bravetime.goto(str);
	    } else {
	      if (minCallback) {
	        minCallback();
	      } else {
	        bravetime.newAlert("请升级您的APP")
	      }
	    }
	  };


	  window.bravetime.callAPPNative = function (host, action, para) {
	    if (window.Units && Units.isIOS()) {
	      var href = location.href;
	      var baseHref;
	      if (href.indexOf("davdian.com") > 0) {
	        baseHref = "davdian.com";
	      } else if (href.indexOf("vyohui.cn") > 0) {
	        baseHref = "vyohui.cn"
	      } else {
	        baseHref = "bravetime.net";
	      }
	      window.d_callback = function () {
	      };

	      location.href = "https://invoke." + baseHref + "?cmd=" + encodeURIComponent('davdian://call.' + host + '.com?action=' + action + '&params=' + encodeURIComponent(JSON.stringify(para)) + '&callback=d_callback&minv=2.5.0');
	    } else if (window.Units && Units.isAndroid() && !Units.isWechat()) {
	      var baseHref = "davdian.com";
	      window.d_callback = function () {
	      };
	      location.href = "davdian://invoke." + baseHref + "?cmd=" + encodeURIComponent('davdian://call.' + host + '.com?action=' + action + '&params=' + encodeURIComponent(JSON.stringify(para)) + '&callback=d_callback&minv=2.5.0');
	      setTimeout(function () {
	        location.href = '//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller';
	      }, 1500);
	    } else {
	      location.href = '//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller';
	    }
	  };

	  /**
	   * app外唤起大V课
	   */
	  window.bravetime.callAppEnteroom = function (courseId) {
	    bravetime.callAPPNative("VoiceLive", "enterRoom", {courseId: courseId});
	  };

	  window.bravetime.callAppLive = function () {
	    var para = {
	      "liveId": window.liveId,
	      "isPlaying": "1",// 1表示直播中，2是回放，3是整理中
	      "fromPush": "0" // 0表示不来自于推送，1表示来自推送
	    };
	    bravetime.callAPPNative('LiveVideo', 'enterRoom', para);
	  };

	  window.bravetime.setHead = function (opt, callback) {
	    setTimeout(function () {
	      bravetime.callNative2("Browser", "setHead", opt, callback, '2.6.0');
	    }, 100);

	  };

	  window.bravetime.selectIdentity = function (callback, mincallback) {
	    var cardName = {
	      "cardName": sessionStorage.getItem("Addressee")
	    };
	    bravetime.callNative2("Browser", "selectIdentity", cardName, callback, '3.7.0', mincallback);
	  };

	  window.bravetime.enterVoiceRoom = function (courseId) {
	    // if (!window.enterVoiceRoomFlag) {
	      // window.enterVoiceRoomFlag = true;
	      bravetime.callNative2("VoiceLive", "enterRoom", {courseId: courseId}, function () {
	        // location.reload();
	      }, "3.4.0");
	    // }

	  };

	  window.bravetime.nativeLogin = function (callback, minCallback) {
	    bravetime.callNative2("Account", "login", {}, callback, '2.4.0', minCallback);
	  };

	  /**
	   * app支付
	   */
	  window.bravetime.nativePay = function (url, callback) {
	    var option = {};
	    option.url = encodeURIComponent(url);
	    if (url.split("app_pay/").length > 1) {
	      var list = url.split("app_pay/")[1].split("&");
	      for (var i = 0; i < list.length; i++) {
	        var key = list[i].split("=")[0];
	        var value = list[i].split("=")[1];
	        option[key] = value;
	      }
	    }

	    var callFunction = function (result) {
	      if (typeof result == "string") {
	        result = JSON.parse(result);
	      }
	      callback(+result.code, result.order_id);
	    };
	    bravetime.callNative2('Browser', 'pay', option, callFunction, '3.1.0', function () {
	      bravetime.goto(url);
	    });
	  };

	  /**
	   * 回到app首页
	   */
	  window.bravetime.goAppHome = function () {
	    bravetime.callNative(function () {
	    }, function () {
	      alert("系统异常，请退出app重试")
	    }, "base", "home", []);
	  };

	  window.bravetime.openNewPage = function (opt, callback) {
	    bravetime.callNative2('Browser', 'open', opt, callback, '3.1.0', function () {
	      bravetime.goto(opt.url);
	    });
	  };
	  /**
	   * 回到上一个页面
	   * @constructor
	   */
	  window.bravetime.Nativeback = function () {
	    var callback = function () {

	    };
	    bravetime.callNative2("BrowserTouch", "goBackToRootPage", {}, callback, '3.9.0');
	  };

	  window.bravetime.initHead = function (callback) {
	    if (window.dataUrl == "index.php?c=Index&a=getCatNavList" || window.tj_id == 55) {
	      return false;
	    }
	    bravetime.callNative2('Browser', 'initHead', {content: JSON.parse(iosInterface.getHeadAndFootData())}, callback, '3.4.0', function () {

	    });
	  };

	  /**
	   * 旧版分享
	   * @param opt
	   */
	  window.bravetime.callAppShare = function (opt) {
	    bravetime.callNative(function () {
	      var result = JSON.parse(r);
	      var code = result["code"];
	      if (code == 0) {
	        // 分享成功
	        bravetime.info("分享成功");
	      } else if (code == 1) {
	        bravetime.info("分享失败");
	      } else {
	        alert("系统异常，请重试");
	      }
	    }, function () {
	      alert("系统异常，请退出app重试")
	    }, "base", "share", []);
	  };

	  /**
	   * 新版分享
	   * @param type
	   * @param info
	   * @param callback
	   * @param errorCallback
	   */
	  window.bravetime.callAppShareInfo = function (type, info, callback, errorCallback) {
	    var shartInfo = window.iosInterface.netWorkGetShareInfo();
	    var option = info || JSON.parse(shartInfo);
	    ;
	    option.shareType = '0';
	    if (type == -1) {
	      option.show = '1';
	    } else {
	      option.show = '0';
	      option.sharePlatform = type + "";
	    }

	    var callFunction = function (code) {
	      if (code == 0) {
	        errorCallback && errorCallback();
	      } else {
	        callback && callback();
	      }
	    };

	    bravetime.callNative2('Share', 'shareInfo', option, callFunction, '3.3.0');

	  };

	  window.bravetime.callAppShareImg = function (type, imgUrl, callback, errorCallback) {

	    var shartInfo = window.iosInterface.netWorkGetShareInfo();

	    var option = JSON.parse(shartInfo);
	    option.bigImageUrl = imgUrl;
	    option.shareType = "1";

	    if (type == -1) {
	      option.show = "1";
	    } else {
	      option.show = "0";
	      option.sharePlatform = type + "";
	    }


	    var callFunction = function (result) {
	      var code = result.code, msg = result.msg;
	      if (code == 0) {
	        errorCallback && errorCallback(msg);
	      } else {
	        callback && callback();
	      }
	    };

	    bravetime.callNative2('Share', 'shareInfo', option, callFunction, '3.3.0', function () {
	      bravetime.newAlert('当前版本过低不支持此功能，请尽快升级，或长按保存图片');
	    });
	  };


	  window.bravetime.callAppShareToTimeline = function () {
	    bravetime.callNative(function () {
	      var result = JSON.parse(r);
	      var code = result["code"];
	      if (code == 0) {
	        // 分享成功
	        bravetime.info("分享成功");
	      } else if (code == 1) {
	        bravetime.info("分享失败");
	      } else {
	        alert("系统异常，请重试");
	      }
	    }, function () {
	      alert("系统异常，请退出app重试")
	    }, "base", "share_to_wechat_timeline", []);
	  };

	  window.bravetime.callAppShareToFriend = function () {
	    bravetime.callNative(function () {
	      var result = JSON.parse(r);
	      var code = result["code"];
	      if (code == 0) {
	        // 分享成功
	        bravetime.info("分享成功");
	      } else if (code == 1) {
	        bravetime.info("分享失败");
	      } else {
	        alert("系统异常，请重试");
	      }
	    }, function () {
	      alert("系统异常，请退出app重试")
	    }, "base", "share_to_wechat_friend", []);
	  };

	  window.bravetime.callNativeHoldPic = function (src) {
	    bravetime.callNative(function () {

	    }, function () {

	    }, "base", "savePic", [src]);
	  };

	  /**
	   * app分享卡
	   */
	  window.bravetime.callCardShare = function (courseId) {
	    var callback = function () {

	    };
	    bravetime.callNative2("Share", "cardShare", {courseId: courseId}, callback, '3.4.0');
	  };

	  window.bravetime.callNativeReady = function () {
	    // 如果是订单确认页,而且是等待刷新的,就不发这个了
	    if (window.tj_id == 21 && $.cookie && $.cookie("no_refresh")) {
	      $.removeCookie("no_refresh");
	      return false;
	    }
	    bravetime.callNative(function () {

	    }, function () {

	    }, "base", "ready", []);
	  };

	  /**
	   * 调用原生确认框
	   * @param msg
	   * @param opt
	   */
	  window.bravetime.callNativeConfirm = function (msg, opt) {
	    bravetime.callNative(opt.okLink, opt.cancelLink, "base", "confirm", [msg, JSON.stringify(opt)]);
	  };

	  if (window.Units && Units.isApp()) {
	    setTimeout(function () {
	      $("img").each(function (index, element) {
	        var flag = false, timer = null, already = false;
	        $(element).on("touchstart", function () {
	          already = false;
	          flag = true;
	          timer = setTimeout(function () {
	            if (flag) {
	              already = true;
	              window.bravetime.callNativeHoldPic($(element).attr("src"));
	            }
	          }, 500);
	        });
	        $(element).on("touchend", function () {
	          flag = false;
	          clearTimeout(timer);
	        });
	        $(element).on("touchmove", function () {
	          flag = false;
	          clearTimeout(timer);
	        });
	        $(element).on("touchcancel", function () {
	          flag = false;
	          clearTimeout(timer);
	        });
	        var a = $(element).parents("a");
	        a.on("touchend", function (e) {
	          if (already) {
	            e.preventDefault();
	            return false;
	          }
	        });
	        a.on("click", function (e) {
	          if (already) {
	            e.preventDefault();
	            return false;
	          }
	        });
	      });
	    }, 1);

	  }

	  function singlePicHold(dom) {
	    var flag = false, timer = null, already = false;
	    $(dom).on("touchstart", function () {
	      flag = true;
	      timer = setTimeout(function () {
	        if (flag) {
	          window.bravetime.callNativeHoldPic($(dom).attr("src"));
	        }
	      }, 500);
	    });
	    $(dom).on("touchend", function () {
	      flag = false;
	      clearTimeout(timer);
	    });
	    $(dom).on("touchmove", function () {
	      flag = false;
	      clearTimeout(timer);
	    });
	    $(dom).on("touchcancel", function () {
	      flag = false;
	      clearTimeout(timer);
	    });
	    var a = $(dom).parents("a");
	    a.on("touchend", function (e) {
	      if (already) {
	        e.preventDefault();
	        return false;
	      }
	    });
	  }

	  window.singlePicHold = singlePicHold;


	  /**
	   * 自定义确认框
	   * @param msg 提示信息
	   * @param opt 配置信息  b
	   * @returns {boolean} 返回值
	   */

	  /**
	   * 自定义确认框
	   * @param msg 提示信息
	   * @param opt 配置信息  b
	   * @returns {boolean} 返回值
	   */
	  window.bravetime.newConfirm = function (msg, opt) {
	    var msg = msg || "",
	      opt = opt || {},
	      okText = opt.okText || "确定",
	      cancelText = opt.cancelText || "取消",
	      callback = opt.okLink || function () {
	        },
	      cancelCallback = opt.cancelLink || function () {
	        },
	      hideCancel = opt.hideCancel || false,
	      hideOkAndCancel = opt.hideOkAndCancel || false,
	      showPrompt = opt.showPrompt || false,
	      closeButton = opt.hasClostButton || false,
	      hideOnClick = opt.hideOnClick || false,
	      promptInput;

	    var $elAlert = $('.modal_dialog_wrap');
	    if ($elAlert.length < 1) {
	      $(['<div class="dialog_mask" style="display:block">', '<div class="modal_dialog_wrap">', '<div class="modal_dialog">', '<div class="modal_body"></div>', '<div class="modal_footer">', '<a class="confirm">确定</a>', '<a class="cancel">取消</a>', '</div>', '</div>', '</div>', '</div>'].join('')).appendTo(document.body);

	      $elAlert = $('.modal_dialog_wrap');
	      $elAlert.find('.confirm').click(function () {
	        $('.dialog_mask').hide();
	        var callback = $(this).data('callback');
	        if (callback) {
	          if (typeof callback === 'string') {
	            window.bravetime.goto(callback);
	          } else {
	            promptInput = $(".prompt");
	            if (showPrompt && promptInput.val()) {
	              callback(promptInput.val());
	            } else {
	              callback();
	            }
	          }
	        }
	      });
	      $elAlert.find('.cancel').click(function () {
	        var callback = $(this).data('cancel_callback');
	        if (callback) {
	          if (typeof callback === 'string') {
	            window.bravetime.goto(callback);
	          } else {
	            callback();
	          }
	        }
	        $('.dialog_mask').hide();
	      });
	    } else {
	      $('.dialog_mask').css('display', 'block');
	    }
	    if (hideOnClick) {
	      $('.dialog_mask').click(function (e) {
	        if ($(e.target).hasClass("dialog_mask")) {
	          $('.dialog_mask').hide();
	        }
	      });
	    }
	    $elAlert.toggleClass('modal_dialog_confirm_wrap', !hideCancel);
	    $elAlert.toggleClass('modal_dialog_info_wrap', hideOkAndCancel);
	    $elAlert.find('.modal_body').html(msg);
	    if (showPrompt) {
	      promptInput = $("<input>").addClass("prompt");
	      if (opt.placeholder) {
	        promptInput.attr("placeholder", opt.placeholder);
	      }
	      $elAlert.find('.modal_body').append($("<div class='input_container that_input'></div>").append(promptInput));
	      promptInput.focus(function () {
	        if (window.Units && Units.isWechat() && Units.isIOS()) {
	          $(".top0").addClass("hide");
	        }
	      }).blur(function () {
	        setTimeout(function () {
	          $(".top0").removeClass("hide");
	        }, 50);

	      })
	    }
	    if (closeButton) {
	      var closeBtn = $('<div class="modal_close"></div>');
	      $elAlert.find('.modal_body').append(closeBtn);
	      closeBtn.click(function () {
	        $('.dialog_mask').hide();
	      })
	    }
	    $elAlert.find('.confirm').html(okText).data('callback', callback || null);
	    $elAlert.find('.cancel').html(cancelText).data('cancel_callback', cancelCallback || null);
	    $elAlert.css('margin-top', $elAlert.height() * -0.5);
	  };

	  window.bravetime.newAlert = function (msg, callback) {
	    if (typeof callback == "function") {
	      window.bravetime.newConfirm(msg, {
	        hideCancel: true,
	        okLink: callback
	      });
	    } else {
	      var opt = callback || {};
	      opt["hideCancel"] = true;
	      window.bravetime.newConfirm(msg, opt);
	    }

	  };

	  window.bravetime.newInfo = function (msg, opt) {
	    var o = opt || {};
	    o.hideOkAndCancel = true;
	    window.bravetime.newConfirm(msg, o);
	  };

	  window.bravetime.newPrompt = function (msg, opt) {
	    var o = opt || {};
	    o.showPrompt = true;
	    window.bravetime.newConfirm(msg, o);
	  }


	  window.bravetime.hideNew = function () {
	    $('.dialog_mask').hide();
	  };


	  window.bravetime.info = function (msg) {
	    if (!msg) {
	      return false;
	    }
	    if (window.popup && window.Vue) {
	      window.popup.toast(msg);
	    } else {
	      /*
	       var delayTime = Math.max(1500, msg.length * 150);
	       var infoContainer = $(".bravetime-info");
	       if (infoContainer.length) {
	       infoContainer.removeClass("hide").find('.inner').html(msg);
	       } else {
	       infoContainer = $('<div style="width:100%;z-index: 99999;max-width:640px;position: fixed;top: 200px;text-align: center;"><div class="inner" style="display:inline-block;padding:12px 14px;max-width:80%;background: #FF4A7D;color:#fff;border-radius: 3px;">' + msg + '</div></div>')
	       .addClass("bravetime-info");
	       $("body").append(infoContainer);
	       }
	       clearTimeout(window.st1);
	       clearTimeout(window.st2);
	       infoContainer.css("opacity", 1).stop();
	       window.st1 = setTimeout(function () {
	       infoContainer.css("opacity", 1).animate({opacity: 0}, 500);
	       window.st2 = setTimeout(function () {
	       infoContainer.css("opacity", 1).addClass("hide");
	       }, 1000);
	       }, delayTime);*/
	      var html =
	        '<div class="com-popup-toast">' +
	        '<div class="cell">' +
	        '<div class="box">' +
	        '<div class="html">'+msg+'</div>' +
	        '</div>' +
	        '</div>' +
	        '</div>'
	      ;
	      var div = document.createElement('div');
	      div.innerHTML = html;
	      var toast = document.body.appendChild(div.querySelector('.com-popup-toast'));
	      setTimeout(function () {
	        toast.parentNode.removeChild(toast);
	      }, 2000);
	    }
	  };

	  window.bravetime.addLoader = function (opt) {
	    var h = window.screen.availHeight;
	    opt = opt || {};
	    if ($(".loader_container").length) {
	      $(".loader_container").removeClass('hide');
	    } else {
	      $("body").append($("<div class='loader_container'><div class='loader'><div class='uil-default-css-normal' style='-webkit-transform:scale(0.25);-moz-transform:scale(0.25);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;'><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div></div></div>"));
	      $(".loader_container").css("height", h + "px").click(window.bravetime.removeLoader);
	    }
	    var little = opt["little"] || opt["small"] || false;
	    if (little) {
	      $(".loader_container").addClass("little");
	    } else {
	      $(".loader_container").removeClass("little");
	    }

	  };
	  window.bravetime.removeLoader = function () {
	    $(".loader_container").addClass("hide");
	  };

	  window.bravetime.goto = function (url) {
	    window.location.href = url;
	  };

	  window.bravetime.ajaxError = function (c, info, callback) {
	    var code = c || 0,
	      info = info || "网络异常，请稍后重试";
	    bravetime.newAlert(info, callback);
	    var e1 = new Error("netWorkError");
	    e1.stack = 'Error: network_error';
	    window.bughd && bughd("notifyException", e1, {code: code, info: info});

	  };

	  // 滚动到顶部
	  if ($("body.scroll_flag").length) {
	    $(window).on("scroll", function () {
	      var scrollTop = $(document).scrollTop();
	      if (scrollTop > 200) {
	        if ($(".to-top").length == 0) {
	          $("body").append('<div class="to-top"><a href="javascript:void(0);" id="to-top"><i class="icon dav_icon_up2top_80_80" style="width:44px;height:44px;"></i></a></div>');
	          $("#to-top")
	            .on("click", function () {
	              $('html,body').animate({scrollTop: 0}, 500);
	              if (window.up2topCallback && typeof window.up2topCallback == "function") {
	                up2topCallback(scrollTop);
	              }
	            });
	        }

	      } else {
	        $(".to-top").remove();
	      }
	    });
	  }
	  // 分享模块
	  var shareButton = $(".share_to_web");
	  if (shareButton && shareButton.length) {
	    shareToWeb(shareButton);
	  }

	  function shareToWeb(shareButton) {


	    if (window.Units && Units.isApp()) {
	      var useMMB = 0;
	      shareButton.click(function () {
	        if (window.moreShareInfo && window.moreShareInfo.cmd) {
	          bravetime.goto(moreShareInfo.cmd);
	          return false;
	        }
	        bravetime.callAppShare({
	          title: shareTitle, // 分享标题
	          link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	          imgUrl: imgUrl.replace("https", "http"), // 分享图标
	          success: function () {
	            // 用户确认分享后执行的回调函数
	            if (window.appShareCallback && typeof window.appShareCallback == "function") {
	              window.appShareCallback();
	            }
	          },
	          cancel: function () {
	            // 用户取消分享后执行的回调函数
	            if (window.appShareCallbackCancel && typeof window.appShareCallbackCancel == "function") {
	              window.appShareCallbackCancel();
	            }
	          }
	        });
	        bravetime.tj.pvSend(window.tj_path + "_share")
	      });

	      return false;
	    }

	    if (window.Units && Units.isWechat()) {
	      var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>点击右上角“分享”按钮</p>' + '<p>选择“发送给朋友”或者“分享到朋友圈”' + (!!window.disableCopyToShare ? '' : '或者“复制链接”后发送链接给朋友') + '</p>' + ((window.shareStr && window.shareStr != "") ? ('<p class="big">推荐语：</p><p>' + window.shareStr + '</p><p>（长按选中后复制推荐语）</p>') : ("")) + '</div>');
	    } else if (window.Units && Units.isQQ()) {
	      var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>点击右上角“分享”按钮</p>' + '<p>选择QQ好友、QQ空间、微信、朋友圈进行分享' + (!!window.disableCopyToShare ? '' : '或者“复制链接”后发送链接给朋友') + '</p>' + ((window.shareStr && window.shareStr != "") ? ('<p class="big">推荐语：</p><p>' + window.shareStr + '</p><p>（长按选中后复制推荐语）</p>') : ("")) + '</div>');
	    } else {
	      var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>复制链接分享</p>' + '<p>复制地址栏链接，将链接发送给朋友</p>' + '</div>');
	    }
	    $("body").append(msk.addClass("hide"));
	    shareButton.click(function () {
	      msk.removeClass("hide");
	      if (window.shareButtonClickCallback && typeof window.shareButtonClickCallback == "function") {
	        window.shareButtonClickCallback();
	      }
	      bravetime.tj.pvSend(window.tj_path + "_share")
	    });
	    msk.click(function (event) {
	      msk.addClass('hide');
	    });

	  }

	  // 收藏模块
	  var favButton = $(".favorite_to_web");
	  if (favButton && favButton.length) {
	    favToWeb(favButton);
	  }
	  function favToWeb(favButton) {
	    if (window.Units && Units.isWechat()) {
	      var msk = $('<div class="mask-to-favorite">' +
	        '<div class="fake fake-favorite-we">' +
	        '<div class="top">' +
	        '<div class="favorite-title">微信中如何收藏店铺?</div> ' +
	        '<div class="favorite-con">右上角按钮选择“收藏”</div>' +
	        '</div>' +
	        '<div class="bottom">' +
	        '<div class="favorite-title">以后如何访问?</div>' +
	        '<div class="favorite-con">' +
	        '<img src="//pic.davdian.com/free/fav-wechat_2x.png">' +
	        '<div class="fav-text">点击微信底部菜单中的“我”，在菜单中选择“收藏”，即可看到已经收藏的店铺。</div>' +
	        ' </div>' +
	        '</div>' +
	        '</div>' +
	        '</div>');
	    } else if (window.Units && Units.isQQ()) {
	      var msk = $('<div class="mask-to-favorite">' +
	        '<div class="fake fake-favorite-qq">' +
	        '<div class="top">' +
	        '<div class="favorite-title">手机QQ如何收藏店铺?</div> ' +
	        '<div class="favorite-con">点击下方<div class="icon-small-qq-fav"></div>收藏</div>' +
	        '</div>' +
	        '<div class="bottom">' +
	        '<div class="favorite-title">以后如何访问?</div>' +
	        '<div class="favorite-con">' +
	        '<img src="//pic.davdian.com/free/fav-qq_2x.png">' +
	        '<div class="fav-text">在手机QQ中点击左上角自己头像，在菜单中选择“我的收藏”，即可看到已经收藏的店铺。</div>' +
	        ' </div>' +
	        '</div>' +
	        '</div>' +
	        '</div>');
	    } else {
	      var msk = $('<div class="mask-to-favorite">' +
	        '<div class="fake fake-favorite-bro">' +
	        '<div class="top">' +
	        '<div class="favorite-title">浏览器中如何收藏?</div> ' +
	        '<div class="favorite-con">在浏览器菜单中选择“收藏”或者“发送到主屏幕”、“桌面”。不同的浏览器，操作方法不同。</div>' +
	        '</div>' +
	        '<div class="bottom">' +
	        '<div class="favorite-title">以后如何访问?</div>' +
	        '<div class="favorite-con">在浏览器中找到收藏页面或者点击桌面的图标（如果有）访问</div>' +
	        '</div>' +
	        '</div>' +
	        '</div>');
	    }
	    $("body").append(msk.addClass("hide"));
	    favButton.click(function () {
	      msk.removeClass("hide");
	      if (window.favButtonClickCallback && typeof window.favButtonClickCallback == "function") {
	        window.favButtonClickCallback();
	      }
	    });
	    msk.click(function (event) {
	      msk.addClass('hide');
	    });
	  }


	  // 微信里面分享
	  if (window.wx) {
	    if (window.shareTitle) {
	      if (window.wx_token === undefined) {
	        var url = window.location.href;
	        $.ajax({
	          url: './wechatJsToken',
	          type: 'GET',
	          dataType: 'json',
	          data: {url: encodeURIComponent(url)},
	          success: function (result) {
	            if (result["error"] == 0) {
	              wx.config({
	                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	                appId: result["data"]["appId"], // 必填，公众号的唯一标识
	                timestamp: result["data"]["timestamp"], // 必填，生成签名的时间戳
	                nonceStr: result["data"]["nonceStr"], // 必填，生成签名的随机串
	                signature: result["data"]["signature"],// 必填，签名，见附录1
	                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	              });
	            }

	          },
	          error: function () {
	            console.log("Error");
	          }
	        });

	      } else if (window.wx_token) {
	        wx.config({
	          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	          appId: window.wx_appid, // 必填，公众号的唯一标识
	          timestamp: window.wx_timestamp, // 必填，生成签名的时间戳
	          nonceStr: window.wx_nonceStr, // 必填，生成签名的随机串
	          signature: window.wx_signature,// 必填，签名，见附录1
	          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        });
	      }
	      wx.ready(function () {
	        window.imgUrl = window.imgUrl.replace("https", 'http');
	        var useMMB = 0;
	        if (window.doNotShare) {
	          return false;
	        }
	        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	        wx.onMenuShareTimeline({
	          title: shareTitle, // 分享标题
	          link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	          imgUrl: imgUrl, // 分享图标
	          success: function () {
	            // 用户确认分享后执行的回调函数
	            if (window.tlShareCallback && typeof window.tlShareCallback == "function") {
	              window.tlShareCallback();
	            }
	          },
	          cancel: function () {
	            // 用户取消分享后执行的回调函数
	            if (window.tlShareCallbackCancel && typeof window.tlShareCallbackCancel == "function") {
	              window.tlShareCallbackCancel();
	            }
	          }
	        });
	        wx.onMenuShareAppMessage({
	          title: shareTitle, // 分享标题
	          desc: descContent, // 分享描述
	          link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	          imgUrl: imgUrl, // 分享图标
	          success: function () {
	            // 用户确认分享后执行的回调函数
	            if (window.sendShareCallback && typeof window.sendShareCallback == "function") {
	              window.sendShareCallback();
	            }
	          },
	          cancel: function () {
	            // 用户取消分享后执行的回调函数
	            if (window.sendShareCallbackCancel && typeof window.sendShareCallbackCancel == "function") {
	              window.sendShareCallbackCancel();
	            }
	          }
	        });
	        wx.onMenuShareQQ({
	          title: shareTitle, // 分享标题
	          desc: descContent, // 分享描述
	          link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	          imgUrl: imgUrl, // 分享图标
	          success: function () {
	            // 用户确认分享后执行的回调函数
	            if (window.QQShareCallback && typeof window.QQShareCallback == "function") {
	              window.QQShareCallback();
	            }
	          },
	          cancel: function () {
	            // 用户取消分享后执行的回调函数
	            if (window.QQShareCallbackCancel && typeof window.QQShareCallbackCancel == "function") {
	              window.QQShareCallbackCancel();
	            }
	          }
	        });
	        wx.onMenuShareWeibo({
	          title: shareTitle, // 分享标题
	          desc: descContent, // 分享描述
	          link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	          imgUrl: imgUrl, // 分享图标
	          success: function () {
	            // 用户确认分享后执行的回调函数
	            if (window.weiboShareCallback && typeof window.weiboShareCallback == "function") {
	              window.weiboShareCallback();
	            }
	          },
	          cancel: function () {
	            // 用户取消分享后执行的回调函数
	            if (window.weiboShareCallbackCancel && typeof window.weiboShareCallbackCancel == "function") {
	              window.weiboShareCallbackCancel();
	            }
	          }
	        });
	        wx.onMenuShareQZone({
	          title: shareTitle, // 分享标题
	          desc: descContent, // 分享描述
	          link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	          imgUrl: imgUrl, // 分享图标
	          success: function () {
	            // 用户确认分享后执行的回调函数
	            if (window.qZoneShareCallback && typeof window.qZoneShareCallback == "function") {
	              window.qZoneShareCallback();
	            }
	          },
	          cancel: function () {
	            // 用户取消分享后执行的回调函数
	            if (window.qZoneShareCallbackCancel && typeof window.qZoneShareCallbackCancel == "function") {
	              window.qZoneShareCallbackCancel();
	            }
	          }
	        });

	        window.relink = function () {
	          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	          wx.onMenuShareTimeline({
	            title: shareTitle, // 分享标题
	            link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	            imgUrl: imgUrl, // 分享图标
	            success: function () {
	              // 用户确认分享后执行的回调函数
	              if (window.tlShareCallback && typeof window.tlShareCallback == "function") {
	                window.tlShareCallback();
	              }
	            },
	            cancel: function () {
	              // 用户取消分享后执行的回调函数
	              if (window.tlShareCallbackCancel && typeof window.tlShareCallbackCancel == "function") {
	                window.tlShareCallbackCancel();
	              }
	            }
	          });
	          wx.onMenuShareAppMessage({
	            title: shareTitle, // 分享标题
	            desc: descContent, // 分享描述
	            link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	            imgUrl: imgUrl, // 分享图标
	            success: function () {
	              // 用户确认分享后执行的回调函数
	              if (window.sendShareCallback && typeof window.sendShareCallback == "function") {
	                window.sendShareCallback();
	              }
	            },
	            cancel: function () {
	              // 用户取消分享后执行的回调函数
	              if (window.sendShareCallbackCancel && typeof window.sendShareCallbackCancel == "function") {
	                window.sendShareCallbackCancel();
	              }
	            }
	          });
	          wx.onMenuShareQQ({
	            title: shareTitle, // 分享标题
	            desc: descContent, // 分享描述
	            link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	            imgUrl: imgUrl, // 分享图标
	            success: function () {
	              // 用户确认分享后执行的回调函数
	              if (window.QQShareCallback && typeof window.QQShareCallback == "function") {
	                window.QQShareCallback();
	              }
	            },
	            cancel: function () {
	              // 用户取消分享后执行的回调函数
	              if (window.QQShareCallbackCancel && typeof window.QQShareCallbackCancel == "function") {
	                window.QQShareCallbackCancel();
	              }
	            }
	          });
	          wx.onMenuShareQZone({
	            title: shareTitle, // 分享标题
	            desc: descContent, // 分享描述
	            link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
	            imgUrl: imgUrl, // 分享图标
	            success: function () {
	              // 用户确认分享后执行的回调函数
	              if (window.qZoneShareCallback && typeof window.qZoneShareCallback == "function") {
	                window.qZoneShareCallback();
	              }
	            },
	            cancel: function () {
	              // 用户取消分享后执行的回调函数
	              if (window.qZoneShareCallbackCancel && typeof window.qZoneShareCallbackCancel == "function") {
	                window.qZoneShareCallbackCancel();
	              }
	            }
	          });
	        }
	      });
	    }
	  }
	  $("a.need_confirm[data-confirm-content]").click(function (event) {
	    var href = $(this).attr("href");
	    var con = $(this).attr("data-confirm-content");
	    bravetime.newConfirm(con, {
	      okLink: href
	    });
	    event.preventDefault();
	  });


	  var warning_time;
	  window.warning_info = function (text, position) {
	    if ($(".warning-info").length > 0) {
	      clearTimeout(warning_time);
	      $(".warning-info").remove();
	    }
	    var windowHeight = $(window).height();
	    var bottom;
	    switch (position || "middle") {
	      case "top":
	        bottom = windowHeight - 100;
	        break;
	      case "middle":
	        bottom = windowHeight / 2;
	        break;
	      case "bottom":
	        bottom = 50;
	        break;
	      default:
	        bottom = windowHeight / 2;
	        break;
	    }
	    $("body").append("<div class='warning-info' style='position:fixed;width:100%;text-align:center;bottom:" + bottom + "px;z-index:999;'><div class='label label-warning'>" + text + "</div></div>");
	    $(".label-warning").css("background-color", "#f89406").css("display", "inline").css("padding", "2px 5px").css("border-radius", "8px");
	    warning_time = setTimeout(function () {
	      $(".warning-info").fadeOut(2000);
	    }, 500);
	  };


	  /* *
	   * 点击立即购买按钮
	   */
	  window.buy_now = function (goodsId) {
	    var goods = {};
	    var spec_arr = [];
	    var number = document.getElementById('goods_number').value;
	    var quick = 0;

	    goods.quick = quick;
	    goods.spec = spec_arr;
	    goods.goods_id = goodsId;
	    goods.number = number;
	    goods.sag_id = sag_id;
	    goods.price = goods_price;
	    goods.name = goods_name;

	    $.post('index.php?m=default&c=flow&a=add_to_cart', {
	      goods: JSON.stringify(goods)
	    }, function (data) {
	      if (data.error > 0) {
	        window.bravetime.newAlert(data.message);
	      } else {
	        var callback = 'index.php?m=default&c=flow&a=cart';
	        window.bravetime.goto(callback);
	      }
	    }, 'json');
	    if (window.buyCallback && typeof window.buyCallback == "function") {
	      window.buyCallback(goodsId);
	    }
	  };

	  /**
	   * 点击 加入购物车 后弹出
	   */
	  window.cart = function (goodsId) {
	    var goods = {};
	    var spec_arr = [];
	    var number = document.getElementById('goods_number').value;
	    var quick = 1;

	    goods.quick = quick;
	    goods.spec = spec_arr;
	    goods.goods_id = goodsId;
	    goods.number = number;
	    goods.sag_id = sag_id;
	    goods.price = goods_price;
	    goods.name = goods_name;

	    $.post('index.php?m=default&c=flow&a=add_to_cart', {
	      goods: JSON.stringify(goods)
	    }, function (data) {
	      if (data.error > 0) {
	        if (data.error == 2) {
	          window.bravetime.confirm("商品已经在购物车中", {
	            okText: "再逛逛",
	            // okLink:"/", //点击再逛逛跳到的链接
	            cancelText: "去购物车",
	            cancelLink: "/cart.html" //点击去结算跳到的链接
	          });
	        } else {
	          window.bravetime.newAlert(data.message);
	        }
	      } else {
	        // 先ajax发送数据，成功后调用以下语句
	        window.bravetime.newConfirm("商品已经加入购物车", {
	          okText: "再逛逛",
	          // okLink:"/", //点击再逛逛跳到的链接
	          cancelText: "去结算",
	          cancelLink: "/cart.html" //点击去结算跳到的链接
	        });
	        $(".detail_bottom .cart_link").html('<i class="menu-i menu-i-3"></i><b>' + data["cart_number"] + "</b>");
	      }
	    }, 'json');

	    if (window.cartCallback && typeof window.cartCallback == "function") {
	      window.cartCallback(goodsId);
	    }
	  };


	  // 团购列表
	  var tuanListCon = $(".tuan_list");
	  if (tuanListCon && tuanListCon.length) {
	    tuanListCon.find("a").each(function (index, el) {
	      var $el = $(el);
	      var second = +$el.attr("data-remain-second");
	      var href = $(el).attr("href");
	      $el.attr("data-url", href);
	      $el.find(".time").html(calculateTime(second));
	      $el.find(".dao_time span").html(calculateTime(second));
	      $el.attr("data-remain-second", second - 1);
	      $el.click(function () {
	        if (window.tuanItemClickCallback && typeof window.tuanItemClickCallback == "function") {
	          window.tuanItemClickCallback($el, index);
	          // return false;
	        }
	      });
	    });
	    if (tuanListCon.find("a").find(".dao_time span").length || tuanListCon.find("a").find(".time").length) {
	      window.tuanInterval = setInterval(function () {
	        var flag = false;
	        tuanListCon.find("a").each(function (index, el) {
	          var second = +$(el).attr("data-remain-second");
	          if (second > 0) {
	            if (second < 60 * 60 * 24) {
	              $(el).find(".dao_time span").html(calculateTime(second));
	              $(el).find(".time").html(calculateTime(second));
	              $(el).attr("data-remain-second", second - 1);
	              flag = true;
	            }
	          } else {
	            $(el).find(".dao_time").html("团购已结束");
	            $(el).find(".time").html("团购已结束");
	          }
	        });
	        if (!flag) {
	          clearInterval(window.tuanInterval);
	        }
	      }, 1000);
	    }

	  }

	  // 逆向团购
	  var merchandiseDetail = $(".merchandise_detail");
	  if (merchandiseDetail.length) {
	    var merchandiseList = merchandiseDetail.find(".dao_time");
	    window.mechandiseInterval = setInterval(function () {
	      merchandiseList.each(function (index, el) {
	        var $el = $(el);
	        var second = +$el.attr("data-remain-second");
	        if (second > 0) {
	          $el.html("倒计时：" + calculateTime(second));
	          $(el).attr("data-remain-second", second - 1);
	        } else {
	          $(el).html("此商品组团已结束");
	        }
	      });
	    }, 1000);
	  }


	  function calculateTime(second) {
	    var s = second % 60, m = Math.floor(second / 60) % 60,
	      h = Math.floor(second / 60 / 60) % 24,
	      d = Math.floor(second / 60 / 60 / 24);
	    var str = '';
	    if (d) {
	      str = "剩 " + d + " 天";
	    } else {
	      str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	    }
	    return str;
	  }


	  // 商品列表
	  var goodList2 = $(".good_list_2_row");
	  if (goodList2 && goodList2.length) {
	    goodList2.each(function (index, el) {
	      $(el).find(".good_item").each(function (i, e) {
	        $(e).attr("data-url", $(e).attr("href"));
	      });
	      $(el).on("click", ".good_item", function (e) {
	        if (window.goodItemClickCallbak && typeof window.goodItemClickCallbak == "function") {
	          window.goodItemClickCallbak($(this), $(el));
	          // return false;
	        }
	      });
	    })
	  }

	  var addBounsContainer = $(".bonus_prompt");
	  if (addBounsContainer.length) {
	    addBouns(addBounsContainer);
	    var showBouns = false;
	  }

	  /**
	   * 页面弹红包
	   */
	  function addBouns(container) {
	    var height = screen.height;
	    $(window).scroll(function () {

	      var y = window.scrollY;
	      if (y > height * 0.3 && !showBouns) {

	        showBouns = true;

	        if (getBounsUrl) {
	          $.ajax({
	            url: getBounsUrl,
	            dataType: "json",
	            success: function (result) {
	              if (result["error"]) {
	                //bravetime.info(result["msg"]);
	              } else {
	                var type = result["data"]["type"];
	                var num = result["data"]["num"];
	                if (type == 0 || type == 1 || type == 3) {
	                  return false;
	                }
	                container.find(".bonus_prompt_bonus").html(num);
	                container.addClass("show_animate");
	                setTimeout(function () {
	                  container.addClass("bonus_d")
	                }, 400);
	              }
	            }
	          });
	        }
	      }
	    });

	    container.find(".bonus_prompt_close").click(function () {
	      container.addClass("hide");
	    });
	  }


	  if (window.isShowActivity) {
	    showActivityImg();
	    setTimeout(function () {
	      bravetime.tj.pvSend("alert_activity", (window["tj_path"] || 'other_path'));
	    }, 500);

	  }
	  /**
	   * 弹出活动图片
	   */
	  function showActivityImg() {
	    var $body = $(document.body);
	    var str = '<div class="dialog_mask">' +
	      '<div class="active_container">' +
	      '<div class="pic_container">' +
	      '<div class="close"><span></span></div>' +
	      '<a href="' + window.activityLink + '"><img src="' + window.activityImage + '" alt=""></a>' +
	      '</div>' +
	      '</div>' +
	      '</div>'
	    var ac = $(str);
	    var winHeight = $(window).height();
	    var winWidht = Math.min($(window).width(), 640);
	    var w = winWidht * 0.78;
	    var l = winWidht * 0.11;
	    var h = w * 410 / 290;
	    var t = Math.max(10, (winHeight - h) / 2);

	    ac.find(".pic_container").css("width", w + "px").css("top", t + "px").css("left", l + "px");
	    $body.append(ac);
	    ac.find(".active_container").click(function () {
	      ac.remove();
	    })
	  }


	// ios fix
	// ios fix
	  if (window.Units && Units.isIOS()) {
	    var flag = false;
	    $(document).on("touchstart", 'input', function () {
	      if (window.inputFocusFixFunction && typeof window.inputFocusFixFunction == "function") {
	        window.inputFocusFixFunction();
	      }
	    });

	    $(document).on('focus', 'input', function () {
	      flag = true;
	      if (window.inputFocusFixFunction && typeof window.inputFocusFixFunction == "function") {
	        window.inputFocusFixFunction();
	      }
	    });

	    $(document).on('blur', 'input', function () {
	      flag = false;
	      if (window.inputBlurFixFunction && typeof window.inputBlurFixFunction == "function") {
	        window.inputBlurFixFunction();
	      }
	    });

	    $(document).on("touchmove", 'input', function () {
	      if (!flag) {
	        if (window.inputBlurFixFunction && typeof window.inputBlurFixFunction == "function") {
	          window.inputBlurFixFunction();
	        }
	      }

	    });
	  }

	  if (window.app_need_update_flag) {
	    var html = "<p style='font-size: 17px;text-align: center;margin-bottom: 6px;'>更新2.0.0</p>" +
	      "<p style='font-size: 14px;text-align: left;margin-bottom: 6px;'>大V店重大更新啦~!</p>" +
	      "<p style='font-size: 12px;text-align: left;'>【妈妈课堂】强力入驻大V店学院板块!</p>" +
	      "<p style='font-size: 12px;text-align: left;'>在这里就可以直接报名、听课、追回顾!<p>" +
	      "<p style='font-size: 12px;text-align: left;'>蒋佩蓉、朱芳宜等大咖课程独家放送!<p>" +
	      "<p style='font-size: 12px;text-align: left;'>马上升级 APP 才能使用哟~<p>" +
	      "<p style='font-size: 12px;text-align: left;'>不要再等了！</p>";
	    window.bravetime.newAlert(html, {
	      okText: "<span style='color:#0076FF;font-size: 16px;'>马上升级</span>",
	      // okLink:"/", //点击再逛逛跳到的链接
	      cancelText: "<span style='color:#0076FF;font-size: 16px;'>马上升级</span>",
	      okLink: function () {
	        if (Units.isApp() && Units.isIOS() && Units.getAppVersion() < 200) {
	          window.location = "https://itunes.apple.com/cn/app/dav-dian-rang-ma-ma-qing-song/id1042582462?mt=8";
	        }
	        if (Units.isApp() && Units.isAndroid() && Units.getAppVersion() < 200) {
	          window.location = "//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller";
	        }

	      } //点击去结算跳到的链接
	    });
	  }

	  // 在cookie里写设备宽度
	  if (!!$.cookie) {
	    $.cookie('physical_width', $(document.body).width() * (window.devicePixelRatio || 1));
	  }

	  var cookieList = document.cookie.split(";").filter(function (x) {
	    return x.indexOf("dvdsid") > -1
	  });
	  var sid = cookieList.length && cookieList[0].split("=")[1];
	  sid && window.bughd && bughd("user", {sid: sid, ua: navigator.userAgent});


	  $("[url-for-login]").click(function (e) {
	    var url = $(this).attr("href");
	    nativeLoginFunction(url)
	    e.preventDefault();
	    return false;
	  });

	  function nativeLoginFunction(url, errorCallback) {
	    var refer = "/", login = false;
	    var list = url.split("?");
	    if (list.length >= 2) {
	      var list2 = list[1];
	      if (list2.indexOf("referer=") > -1) {
	        login = true;
	        refer = list2.substr(list2.indexOf("referer=") + 8)
	      }
	    }
	    if (!login) {
	      window.goto(url);
	      return false;
	    }
	    var callback = function (result) {
	      if (result["code"] == 1 || result["code"] == 2) {
	        // alert("I will go to "+ decodeURIComponent(refer)+", but i don't go");
	        bravetime.goto(decodeURIComponent(refer));
	      } else if (result["code"] == 0) {
	        errorCallback && errorCallback();
	      }
	    };
	    var minCallback = function () {
	      bravetime.goto(url);
	    };
	    window.bravetime.nativeLogin(callback, minCallback);
	  }

	  window.nativeLoginFunction = nativeLoginFunction;

	  window.bravetime.initHead();

	  if (window.Units && Units.isApp()) {
	    $(document.body).addClass("in_app");
	    $("iframe").each(function (i, d) {
	      d.onload = function () {
	        window.bravetime.initHead();
	      };
	      var i1 = 0;
	      var timer1 = setInterval(function () {
	        if (i1++ >= 6) {
	          clearInterval(timer1);
	        } else {
	          window.bravetime.initHead();
	        }
	      }, 1000);

	    })
	  }


	});

	// 错误统计白名单
	var whiteList = [
	  {
	    url: "/index.php?c=prize&a=send_bonus",
	    code: -1
	  },
	  {
	    url: "/index.php?c=prize&a=send_bonus",
	    code: -1
	  }
	];

	//备份jquery的ajax方法
	var _ajax = $.ajax;
	$.ajax = function (opt) {
	  //备份opt中error和success方法
	  var fn = {
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
	    },
	    success: function (data, textStatus) {
	    }
	  };
	  if (opt.error) {
	    fn.error = opt.error;
	  }
	  if (opt.success) {
	    fn.success = opt.success;
	  }

	  opt.data = opt.data || {};
	  if (typeof opt.data == "object") {
	    for (var i = 0, d; d = ["rp", 'rl', 'logDp','dp'][i++];) {
	      var tmp_value = window.Units && Units.getQuery(d);
	      if (tmp_value) {
	        opt.data[d] = tmp_value;
	      }
	    }
	  }


	  //扩展增强处理
	  var _opt = $.extend(opt, {
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
	      //错误方法增强处理

	      fn.error(XMLHttpRequest, textStatus, errorThrown);
	      var e1 = new Error("ajaxError");
	      e1.stack = 'Error: ajax_error';
	      window.bughd && bughd("notifyException", e1, {
	        tj_path: window.tj_path || "other_path",
	        ajax_url: opt.url || "other_url",
	        code: "-99",
	        msg: "网络异常"
	      })
	    },
	    success: function (data, textStatus) {
	      fn.success(data, textStatus);
	      var code = data["code"] || data["error"] || data["error_code"];
	      var msg = data["msg"] || data["error_msg"] || data["message"] || data["error_message"];
	      var flag = true;
	      for (var i = 0; i < whiteList.length; i++) {
	        if (whiteList[i].url == opt.url && whiteList[i].code == code) {
	          flag = false;
	          break;
	        }
	      }
	      if (code && flag) {
	        var e1 = new Error("ajaxApiError");
	        e1.stack = 'Error: ajax_api_error';
	        window.bughd && bughd("notifyException", e1, {
	          tj_path: window.tj_path || "other_path",
	          ajax_url: opt.url || "other_url",
	          code: code,
	          msg: msg
	        });
	      }
	    }
	  });
	  _ajax(_opt);
	};


	//判断对象是否为空
	function isEmptyObject(e) {
	  var t;
	  for (t in e)
	    return !1;
	  return !0
	}

	window.isEmptyObject = isEmptyObject;

	// 根据屏幕大小改变html字体大小
	/*
	 (function (doc, win) {
	 var docEl = doc,
	 resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	 recalc = function () {
	 var clientWidth = docEl.body.clientWidth;
	 if (!clientWidth) return;
	 docEl.documentElement.style.fontSize = 10 * (clientWidth / 375) + 'px';
	 };

	 if (!doc.addEventListener) return;
	 win.addEventListener(resizeEvt, recalc, false);
	 doc.addEventListener('DOMContentLoaded', recalc, false);
	 })(document, window);*/

	(function (doc, win) {
	  var docEl = doc,
	    isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	    dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
	    dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
	    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
	  docEl.documentElement.dataset.dpr = dpr;
	  var recalc = function () {
	    var width = docEl.body.clientWidth;

	    if (width / dpr > 750) {
	      width = 750 * dpr;
	    }
	    docEl.documentElement.dataset.width = width;
	    docEl.documentElement.dataset.percent = 200 * (width / 750);
	    docEl.documentElement.style.fontSize = 200 * (width / 750) + 'px';
	    docEl.body.style.fontSize = '14px';
	    var list = document.querySelectorAll("[base-on-rem]");
	    for (var i = 0; i < list.length; i++) {
	      list[i].removeAttribute('base-on-rem');
	    }
	    $(".need_js_height").css("height", Math.floor((width - 20) / 2 * 600 / 531) + "px");
	    $(".need_js_height_seckill").css("height", Math.floor((width - 25) / 2 * 362 / 350) + "px");
	  };
	  recalc();
	  if (!doc.addEventListener) return;
	  win.addEventListener(resizeEvt, recalc, false);
	})(document, window);

	try {
	  localStorage.setItem('isPrivateMode', '1');
	  localStorage.removeItem('isPrivateMode');
	  window.isPrivateMode = false;
	} catch (e) {
	  window.isPrivateMode = true;
	}
	if (!window.isPrivateMode && window.localStorage) {
	  var his = [];
	  if (sessionStorage.history) {
	    his = JSON.parse(sessionStorage.history);
	  }
	  his.push({href: location.href, path: window.tj_path || "other"});
	  sessionStorage.history = JSON.stringify(his);
	}

	function setYCache(page, y) {
	  if (!window.isPrivateMode && window.sessionStorage) {
	    var y = y || window.window.scrollY;
	    var page = page || window.tj_page;
	    sessionStorage[page + "_y"] = y;
	  }
	}
	window.setYCache = setYCache;

	function getYCache(page) {
	  var y = null;
	  if (!window.isPrivateMode && window.sessionStorage) {
	    var page = page || window.tj_page;
	    y = sessionStorage[page + "_y"];
	  }
	  if (y) {
	    window.scrollTo(0, y);
	  }
	  return y;
	}
	window.getYCache = getYCache;

	function getGoodsListFromCache(p) {
	  var result = null;
	  if (!window.isPrivateMode && window.sessionStorage) {
	    var data = sessionStorage.getItem("goods_list_" + p);
	    var his = sessionStorage.getItem("history"), historyList;
	    if (his) {
	      historyList = JSON.parse(his);
	    }
	    if (data && historyList && historyList.length && historyList[historyList.length - 2] && historyList[historyList.length - 2].path == "detail") {
	      result = JSON.parse(data);
	    }
	  }
	  return result;
	}

	function setGoodsListToCache(p, data) {
	  if (!window.isPrivateMode && window.sessionStorage) {
	    if (data && p) {
	      sessionStorage.setItem("goods_list_" + p, JSON.stringify(data));
	    }
	  }
	}
	window.getGoodsListFromCache = getGoodsListFromCache;
	window.setGoodsListToCache = setGoodsListToCache;

	//获取url参数
	function getUrlArgObject() {
	  var args = new Object();
	  var query = location.search.substring(1);//获取查询串
	  var pairs = query.split(",");//在逗号处断开
	  for (var i = 0; i < pairs.length; i++) {
	    var pos = pairs[i].indexOf('=');//查找name=value
	    if (pos == -1) {//如果没有找到就跳过
	      continue;
	    }
	    var argname = pairs[i].substring(0, pos);//提取name
	    var value = pairs[i].substring(pos + 1);//提取value
	    args[argname] = unescape(value);//存为属性
	  }
	  return args;//返回对象
	}


/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getEl = function getEl() {
	  return (document.querySelector('.app') || document.body).appendChild(document.createElement('div'));
	};

	var _loading = null;

	exports.default = {
	  /**
	   * 功能: toast提示
	   * @param html      toast内容，可传html
	   * @param duration  toast存在时长，毫秒
	   */
	  toast: function toast(html, duration) {
	    new Vue({
	      components: {
	        'com-popup-toast': __webpack_require__(45)
	      },
	      el: getEl(),
	      data: { html: html, duration: duration },
	      template: '<com-popup-toast :html="html" :duration="duration"/>'
	    });
	  },
	  alert: function alert(okText, ok, title) {
	    new Vue({
	      components: {
	        'com-popup-alert': __webpack_require__(51)
	      },
	      el: getEl(),
	      data: { okText: okText, ok: ok, title: title },
	      template: '<com-popup-alert :okText="okText" :ok="ok" :title="title" />'
	    });
	  },

	  /*confirm(html, ok, cancel){
	    new Vue({
	      components: {
	        'com-popup-confirm': require('../../../component/com-popup-confirm.vue')
	      },
	      el: getEl(),
	      data: {html, ok, cancel},
	      template: '<com-popup-confirm :html="html" :ok="ok" :cancel="cancel" />',
	    });
	  },*/
	  confirm: function confirm(okContent, ok, cancel, title, okText, cancleText) {
	    new Vue({
	      components: {
	        'com-popup-confirm': __webpack_require__(56)
	      },
	      el: getEl(),
	      data: { title: title, okContent: okContent, okText: okText, cancleText: cancleText, ok: ok, cancel: cancel },
	      template: '<com-popup-confirm :okContent = "okContent" :ok="ok" :cancel="cancel" :title= "title" :okText="okText" :cancleText = "cancleText" />'
	    });
	  },
	  loading: function loading(show) {
	    if (!show && !_loading) {
	      _loading = new Vue({
	        components: {
	          'com-popup-loading': __webpack_require__(61)
	        },
	        el: getEl(),
	        data: {},
	        template: '<com-popup-loading />'
	      });
	    } else if (_loading) {
	      // 销毁自身
	      _loading.$destroy();
	      _loading.$el.parentNode.removeChild(_loading.$el);
	      _loading = null;
	    }
	  }
	};

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(46)
	__vue_script__ = __webpack_require__(49)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-popup-toast.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(50)
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
	  var id = "_v-a0a1eaa0/com-popup-toast.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-popup-toast.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-popup-toast.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes com-alert-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes com-alert-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n.com-popup-toast {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  max-width: 640px;\n  height: 100%;\n  display: table;\n  z-index: 9;\n  line-height: 1; }\n  .com-popup-toast .cell {\n    display: table-cell;\n    vertical-align: middle;\n    text-align: center; }\n    .com-popup-toast .cell .box {\n      display: inline-block;\n      -webkit-box-sizing: border-box;\n         -moz-box-sizing: border-box;\n              box-sizing: border-box;\n      padding: 0.1rem 0.15rem;\n      min-width: 1.2rem;\n      max-width: 2rem;\n      min-height: 0.4rem;\n      border-radius: 0.04rem;\n      background: rgba(0, 0, 0, 0.65);\n      color: #fff;\n      font-size: 0.14rem;\n      line-height: 0.2rem;\n      -webkit-animation: com-alert-animation 0.3s;\n              animation: com-alert-animation 0.3s; }\n      .com-popup-toast .cell .box .html {\n        display: inline-block;\n        text-align: left; }\n", ""]);

	// exports


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

/***/ 49:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <!--
	//   功能: toast提示
	//   用法:
	//     import popup from '../../../common/js/module/popup.js';
	//     popup.toast(html, duration);
	// -->
	// <template>
	//   <div class="com-popup-toast">
	//     <div class="cell">
	//       <div class="box">
	//         <div class="html" v-html="html"></div>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  props: {
	    // toast内容，可传html
	    html: {
	      type: String,
	      default: ''
	    },
	    // toast存在时长，毫秒
	    duration: {
	      type: Number,
	      default: 2000
	    }
	  },
	  data: function data() {
	    return {};
	  },

	  computed: {},
	  created: function created() {},
	  mounted: function mounted() {
	    var ts = this;
	    setTimeout(function () {
	      ts.destroy();
	    }, ts.duration);
	  },

	  watch: {},
	  filters: {},
	  methods: {
	    // 销毁自身
	    destroy: function destroy() {
	      this.$destroy();
	      this.$el.parentNode.removeChild(this.$el);
	    }
	  }
	  // </script>
	  //
	  // <style lang="sass" lang="scss" rel="stylesheet/scss">
	  //   @import "../common/css/util/all";
	  //
	  //   // 动画
	  //   @keyframes com-alert-animation {
	  //     0% {
	  //       transform: scale(0);
	  //     }
	  //     100% {
	  //       transform: scale(1);
	  //     }
	  //   }
	  //
	  //   // 顶部标题
	  //   .com-popup-toast {
	  //     position: fixed;
	  //     top: 0;
	  //     width: 100%;
	  //     max-width: $pageMaxWidth;
	  //     height: 100%;
	  //     display: table;
	  //     z-index: 9;
	  //     line-height: 1;
	  //     .cell {
	  //       display: table-cell;
	  //       vertical-align: middle;
	  //       text-align: center;
	  //       .box {
	  //         display: inline-block;
	  //         box-sizing: border-box;
	  //         padding: ptr(10) ptr(15);
	  //         min-width: ptr(120);
	  //         max-width: ptr(200);
	  //         min-height: ptr(40);
	  //         border-radius: ptr(4);
	  //         background: rgba(0, 0, 0, 0.65);
	  //         color: #fff;
	  //         font-size: ptr(14);
	  //         line-height: ptr(20);
	  //         animation: com-alert-animation 0.3s;
	  //         .html {
	  //           display: inline-block;
	  //           text-align: left;
	  //         }
	  //       }
	  //     }
	  //   }
	  // </style>

	};

/***/ },

/***/ 50:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n<div class=\"com-popup-toast\">\n  <div class=\"cell\">\n    <div class=\"box\">\n      <div class=\"html\" v-html=\"html\"></div>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(52)
	__vue_script__ = __webpack_require__(54)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-popup-alert.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(55)
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
	  var id = "_v-48db5b65/com-popup-alert.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(53);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-popup-alert.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-popup-alert.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes com-popup-alert-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes com-popup-alert-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n.com-popup-alert {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  max-width: 640px;\n  height: 100%;\n  display: table;\n  background-color: rgba(0, 0, 0, 0.3);\n  z-index: 9;\n  line-height: 1; }\n  .com-popup-alert .middle-wrapper {\n    display: table-cell;\n    vertical-align: middle;\n    text-align: center; }\n  .com-popup-alert .alert-box {\n    display: inline-block;\n    width: 2.7rem;\n    background: white;\n    border-top-left-radius: 0.05rem;\n    border-top-right-radius: 0.05rem;\n    -webkit-animation: com-popup-alert-animation 0.5s;\n            animation: com-popup-alert-animation 0.5s;\n    /*.title {\n      padding: ptr(25) ptr(15);\n      border-top-left-radius: $radius;\n      border-top-right-radius: $radius;\n      font-size: ptr(14);\n      line-height: 1.5;\n    }*/ }\n    .com-popup-alert .alert-box .title {\n      color: #333;\n      font-size: 0.16rem; }\n    .com-popup-alert .alert-box .titleCont {\n      padding: 0.15rem 0.15rem;\n      border-top-left-radius: 0.05rem;\n      border-top-right-radius: 0.05rem;\n      font-size: 0.14rem;\n      line-height: 1.5;\n      color: #666; }\n    .com-popup-alert .alert-box .okText {\n      padding-top: 0.1rem; }\n    .com-popup-alert .alert-box .btn {\n      /*padding: ptr(7);*/\n      height: 0.44rem;\n      line-height: 0.44rem;\n      border-top: 1px solid #E1E1E1;\n      color: #FF4A7D;\n      font-size: 0.16rem; }\n", ""]);

	// exports


/***/ },

/***/ 54:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="com-popup-alert">
	//     <!--居中容器-->
	//     <div class="middle-wrapper">
	//       <!--alert提示框-->
	//       <div class="alert-box">
	//         <div class="titleCont">
	//           <div class="title" v-html="title" v-if = "!!title"></div>
	//           <div class="okText" v-html="okText"></div>
	//         </div>
	//         <div class="btn" @click="ok(); destroy();">确定</div>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  props: {
	    // html
	    html: {
	      type: String,
	      default: ''
	    },
	    title: {
	      type: String,
	      default: '提示'
	    },
	    okText: {
	      type: String,
	      default: ''
	    },
	    // 确定后的回调
	    ok: {
	      type: Function,
	      default: function _default() {}
	    }
	  },
	  data: function data() {
	    return {};
	  },

	  computed: {},
	  created: function created() {},
	  mounted: function mounted() {},

	  methods: {
	    // 销毁自身
	    destroy: function destroy() {
	      this.$destroy();
	      this.$el.parentNode.removeChild(this.$el);
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
	  //   @keyframes com-popup-alert-animation {
	  //     0% {
	  //       transform: scale(0);
	  //     }
	  //     100% {
	  //       transform: scale(1);
	  //     }
	  //   }
	  //
	  //   // 顶部标题
	  //   .com-popup-alert {
	  //     position: fixed;
	  //     top: 0;
	  //     width: 100%;
	  //     max-width: $pageMaxWidth;
	  //     height: 100%;
	  //     display: table;
	  //     background-color: rgba(0, 0, 0, 0.3);
	  //     z-index: 9;
	  //     line-height: 1;
	  //     .middle-wrapper {
	  //       display: table-cell;
	  //       vertical-align: middle;
	  //       text-align: center;
	  //     }
	  //     .alert-box {
	  //       $radius: ptr(5);
	  //       display: inline-block;
	  //       width: ptr(270);
	  //       background: white;
	  //       border-top-left-radius: $radius;
	  //       border-top-right-radius: $radius;
	  //       animation: com-popup-alert-animation 0.5s;
	  //       /*.title {
	  //         padding: ptr(25) ptr(15);
	  //         border-top-left-radius: $radius;
	  //         border-top-right-radius: $radius;
	  //         font-size: ptr(14);
	  //         line-height: 1.5;
	  //       }*/
	  //       .title {
	  //         color: #333;
	  //         font-size: ptr(16);
	  //       }
	  //       .titleCont {
	  //         padding: ptr(15) ptr(15);
	  //         border-top-left-radius: $radius;
	  //         border-top-right-radius: $radius;
	  //         font-size: ptr(14);
	  //         line-height: 1.5;
	  //         color: #666;
	  //       }
	  //       .okText {
	  //         padding-top: ptr(10);
	  //       }
	  //       .btn {
	  //         /*padding: ptr(7);*/
	  //         @include height(ptr(44));
	  //         border-top: 1px solid #E1E1E1;
	  //         color: #FF4A7D;
	  //         font-size: ptr(16);
	  //       }
	  //     }
	  //   }
	  // </style>

	};

/***/ },

/***/ 55:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"com-popup-alert\">\n  <!--居中容器-->\n  <div class=\"middle-wrapper\">\n    <!--alert提示框-->\n    <div class=\"alert-box\">\n      <div class=\"titleCont\">\n        <div class=\"title\" v-html=\"title\" v-if = \"!!title\"></div>\n        <div class=\"okText\" v-html=\"okText\"></div>\n      </div>\n      <div class=\"btn\" @click=\"ok(); destroy();\">确定</div>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(57)
	__vue_script__ = __webpack_require__(59)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-popup-confirm.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(60)
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
	  var id = "_v-0b77ce89/com-popup-confirm.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-popup-confirm.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-popup-confirm.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes com-popup-confirm-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes com-popup-confirm-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n.com-popup-confirm {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  max-width: 640px;\n  height: 100%;\n  display: table;\n  background-color: rgba(0, 0, 0, 0.3);\n  z-index: 9;\n  line-height: 1; }\n  .com-popup-confirm .middle-wrapper {\n    display: table-cell;\n    vertical-align: middle;\n    text-align: center; }\n  .com-popup-confirm .alert-box {\n    display: inline-block;\n    width: 2.7rem;\n    background: white;\n    border-top-left-radius: 0.05rem;\n    border-top-right-radius: 0.05rem;\n    -webkit-animation: com-popup-confirm-animation 0.3s;\n            animation: com-popup-confirm-animation 0.3s;\n    /*.title {\n      padding: ptr(25) ptr(15);\n      border-top-left-radius: $radius;\n      border-top-right-radius: $radius;\n      font-size: ptr(14);\n      line-height: 1.5;\n    }*/ }\n    .com-popup-confirm .alert-box .title {\n      color: #333;\n      font-size: 0.16rem; }\n    .com-popup-confirm .alert-box .titleCont {\n      padding: 0.15rem 0.15rem;\n      border-top-left-radius: 0.05rem;\n      border-top-right-radius: 0.05rem;\n      font-size: 0.14rem;\n      line-height: 1.5;\n      color: #666; }\n    .com-popup-confirm .alert-box .okText {\n      padding-top: 0.1rem; }\n    .com-popup-confirm .alert-box .btns {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: -ms-flexbox;\n      display: flex;\n      border-top: 1px solid #E1E1E1;\n      padding: 0.07rem; }\n      .com-popup-confirm .alert-box .btns .btn {\n        /*padding: ptr(7);*/\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n           -moz-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1;\n        height: 0.3rem;\n        line-height: 0.3rem;\n        color: #FF4A7D;\n        font-size: 0.16rem; }\n        .com-popup-confirm .alert-box .btns .btn:first-of-type {\n          border-right: 1px solid #ddd; }\n      .com-popup-confirm .alert-box .btns .colorGray {\n        color: #666; }\n", ""]);

	// exports


/***/ },

/***/ 59:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="com-popup-confirm">
	//     <!--居中容器-->
	//     <div class="middle-wrapper">
	//       <!--alert提示框-->
	//       <div class="alert-box">
	//         <!--<div class="title" v-html="html"></div>-->
	//         <div class="titleCont">
	//           <div class="title" v-html="title"></div>
	//           <div class="okText" v-html="okContent"></div>
	//         </div>
	//         <div class="btns">
	//           <div class="btn" @click="ok(); destroy();" v-html = "okText"></div>
	//           <div class="btn colorGray" @click="cancel(); destroy();" v-html = "cancleText"></div>
	//         </div>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  props: {
	    // html
	    //      html: {
	    //        type: String,
	    //        default: ''
	    //      },
	    title: {
	      type: String,
	      default: '提示'
	    },
	    okContent: {
	      type: String,
	      default: ''
	    },
	    cancleText: {
	      type: String,
	      default: '取消'
	    },
	    okText: {
	      type: String,
	      default: '确定'
	    },
	    // 确定后的回调
	    ok: {
	      type: Function,
	      default: function _default() {}
	    },
	    // 取消后的回调
	    cancel: {
	      type: Function,
	      default: function _default() {}
	    }
	  },
	  data: function data() {
	    return {};
	  },

	  computed: {},
	  created: function created() {},
	  mounted: function mounted() {},

	  methods: {
	    // 销毁自身
	    destroy: function destroy() {
	      this.$destroy();
	      this.$el.parentNode.removeChild(this.$el);
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
	  //   @keyframes com-popup-confirm-animation {
	  //     0% {
	  //       transform: scale(0);
	  //     }
	  //     100% {
	  //       transform: scale(1);
	  //     }
	  //   }
	  //
	  //   // 顶部标题
	  //   .com-popup-confirm {
	  //     position: fixed;
	  //     top: 0;
	  //     width: 100%;
	  //     max-width: $pageMaxWidth;
	  //     height: 100%;
	  //     display: table;
	  //     background-color: rgba(0, 0, 0, 0.3);
	  //     z-index: 9;
	  //     line-height: 1;
	  //     .middle-wrapper {
	  //       display: table-cell;
	  //       vertical-align: middle;
	  //       text-align: center;
	  //     }
	  //     .alert-box {
	  //       $radius: ptr(5);
	  //       display: inline-block;
	  //       width: ptr(270);
	  //       background: white;
	  //       border-top-left-radius: $radius;
	  //       border-top-right-radius: $radius;
	  //       animation: com-popup-confirm-animation 0.3s;
	  //       /*.title {
	  //         padding: ptr(25) ptr(15);
	  //         border-top-left-radius: $radius;
	  //         border-top-right-radius: $radius;
	  //         font-size: ptr(14);
	  //         line-height: 1.5;
	  //       }*/
	  //       .title {
	  //         color: #333;
	  //         font-size: ptr(16);
	  //       }
	  //       .titleCont {
	  //         padding: ptr(15) ptr(15);
	  //         border-top-left-radius: $radius;
	  //         border-top-right-radius: $radius;
	  //         font-size: ptr(14);
	  //         line-height: 1.5;
	  //         color: #666;
	  //       }
	  //       .okText {
	  //         padding-top: ptr(10);
	  //       }
	  //       .btns {
	  //         display: flex;
	  //         border-top: 1px solid #E1E1E1;
	  //         padding: ptr(7);
	  //         .btn {
	  //           /*padding: ptr(7);*/
	  //           flex: 1;
	  //           @include height(ptr(30));
	  //           color: #FF4A7D;
	  //           font-size: ptr(16);
	  //           &:first-of-type {
	  //             border-right: 1px solid #ddd;
	  //           }
	  //         }
	  //         .colorGray {
	  //           color: #666;
	  //         }
	  //       }
	  //     }
	  //   }
	  // </style>

	};

/***/ },

/***/ 60:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"com-popup-confirm\">\n  <!--居中容器-->\n  <div class=\"middle-wrapper\">\n    <!--alert提示框-->\n    <div class=\"alert-box\">\n      <!--<div class=\"title\" v-html=\"html\"></div>-->\n      <div class=\"titleCont\">\n        <div class=\"title\" v-html=\"title\"></div>\n        <div class=\"okText\" v-html=\"okContent\"></div>\n      </div>\n      <div class=\"btns\">\n        <div class=\"btn\" @click=\"ok(); destroy();\" v-html = \"okText\"></div>\n        <div class=\"btn colorGray\" @click=\"cancel(); destroy();\" v-html = \"cancleText\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(62)
	__vue_script__ = __webpack_require__(64)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-popup-loading.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(65)
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
	  var id = "_v-2dc3a9f6/com-popup-loading.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-popup-loading.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-popup-loading.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes com-popup-loading-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes com-popup-loading-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n.com-popup-loading {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  max-width: 640px;\n  height: 100%;\n  display: table;\n  background-color: rgba(0, 0, 0, 0.3);\n  z-index: 9;\n  line-height: 1; }\n  .com-popup-loading .middle-wrapper {\n    display: table-cell;\n    vertical-align: middle;\n    text-align: center; }\n    .com-popup-loading .middle-wrapper .loadEffect {\n      width: 100px;\n      height: 100px;\n      position: relative;\n      margin: 0 auto; }\n    .com-popup-loading .middle-wrapper .loadEffect span {\n      display: inline-block;\n      width: 16px;\n      height: 16px;\n      border-radius: 50%;\n      background: #FF4A7D;\n      position: absolute;\n      -webkit-animation: load 1.04s ease infinite; }\n\n@-webkit-keyframes load {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0.2; } }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(1) {\n      left: 0;\n      top: 50%;\n      margin-top: -8px;\n      -webkit-animation-delay: 0.13s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(2) {\n      left: 14px;\n      top: 14px;\n      -webkit-animation-delay: 0.26s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(3) {\n      left: 50%;\n      top: 0;\n      margin-left: -8px;\n      -webkit-animation-delay: 0.39s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(4) {\n      top: 14px;\n      right: 14px;\n      -webkit-animation-delay: 0.52s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(5) {\n      right: 0;\n      top: 50%;\n      margin-top: -8px;\n      -webkit-animation-delay: 0.65s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(6) {\n      right: 14px;\n      bottom: 14px;\n      -webkit-animation-delay: 0.78s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(7) {\n      bottom: 0;\n      left: 50%;\n      margin-left: -8px;\n      -webkit-animation-delay: 0.91s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(8) {\n      bottom: 14px;\n      left: 14px;\n      -webkit-animation-delay: 1.04s; }\n    .com-popup-loading .middle-wrapper .loadEffect {\n      width: 100px;\n      height: 100px;\n      position: relative;\n      margin: 0 auto; }\n    .com-popup-loading .middle-wrapper .loadEffect span {\n      display: inline-block;\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      background: #FF4A7D;\n      position: absolute;\n      -webkit-animation: load 1.04s ease infinite; }\n\n@-webkit-keyframes load {\n  0% {\n    -webkit-transform: scale(1.2);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.3);\n    opacity: 0.5; } }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(1) {\n      left: 0;\n      top: 50%;\n      margin-top: -10px;\n      -webkit-animation-delay: 0.13s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(2) {\n      left: 14px;\n      top: 14px;\n      -webkit-animation-delay: 0.26s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(3) {\n      left: 50%;\n      top: 0;\n      margin-left: -10px;\n      -webkit-animation-delay: 0.39s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(4) {\n      top: 14px;\n      right: 14px;\n      -webkit-animation-delay: 0.52s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(5) {\n      right: 0;\n      top: 50%;\n      margin-top: -10px;\n      -webkit-animation-delay: 0.65s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(6) {\n      right: 14px;\n      bottom: 14px;\n      -webkit-animation-delay: 0.78s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(7) {\n      bottom: 0;\n      left: 50%;\n      margin-left: -10px;\n      -webkit-animation-delay: 0.91s; }\n    .com-popup-loading .middle-wrapper .loadEffect span:nth-child(8) {\n      bottom: 14px;\n      left: 14px;\n      -webkit-animation-delay: 1.04s; }\n", ""]);

	// exports


/***/ },

/***/ 64:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="com-popup-loading">
	//     <!--居中容器-->
	//     <div class="middle-wrapper">
	//       <div class="loadEffect">
	//         <span></span>
	//         <span></span>
	//         <span></span>
	//         <span></span>
	//         <span></span>
	//         <span></span>
	//         <span></span>
	//         <span></span>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  props: {},
	  data: function data() {
	    return {};
	  },

	  computed: {},
	  created: function created() {},
	  mounted: function mounted() {},

	  methods: {},
	  filters: {},
	  watch: {}
	  // </script>
	  //
	  // <style lang="sass" lang="scss" rel="stylesheet/scss">
	  //   @import "../common/css/util/all";
	  //
	  //   // 动画
	  //   @keyframes com-popup-loading-animation {
	  //     0% {
	  //       transform: scale(0);
	  //     }
	  //     100% {
	  //       transform: scale(1);
	  //     }
	  //   }
	  //
	  //   // 顶部标题
	  //   .com-popup-loading {
	  //     position: fixed;
	  //     top: 0;
	  //     width: 100%;
	  //     max-width: $pageMaxWidth;
	  //     height: 100%;
	  //     display: table;
	  //     background-color: rgba(0, 0, 0, 0.3);
	  //     z-index: 9;
	  //     line-height: 1;
	  //     .middle-wrapper {
	  //       display: table-cell;
	  //       vertical-align: middle;
	  //       text-align: center;
	  //
	  //       // 先用着,后期再优化
	  //       .loadEffect{
	  //         width: 100px;
	  //         height: 100px;
	  //         position: relative;
	  //         margin: 0 auto;
	  //       }
	  //       .loadEffect span{
	  //         display: inline-block;
	  //         width: 16px;
	  //         height: 16px;
	  //         border-radius: 50%;
	  //         background: #FF4A7D;
	  //         position: absolute;
	  //         -webkit-animation: load 1.04s ease infinite;
	  //       }
	  //       @-webkit-keyframes load{
	  //         0%{
	  //           opacity: 1;
	  //         }
	  //         100%{
	  //           opacity: 0.2;
	  //         }
	  //       }
	  //       .loadEffect span:nth-child(1){
	  //         left: 0;
	  //         top: 50%;
	  //         margin-top:-8px;
	  //         -webkit-animation-delay:0.13s;
	  //       }
	  //       .loadEffect span:nth-child(2){
	  //         left: 14px;
	  //         top: 14px;
	  //         -webkit-animation-delay:0.26s;
	  //       }
	  //       .loadEffect span:nth-child(3){
	  //         left: 50%;
	  //         top: 0;
	  //         margin-left: -8px;
	  //         -webkit-animation-delay:0.39s;
	  //       }
	  //       .loadEffect span:nth-child(4){
	  //         top: 14px;
	  //         right:14px;
	  //         -webkit-animation-delay:0.52s;
	  //       }
	  //       .loadEffect span:nth-child(5){
	  //         right: 0;
	  //         top: 50%;
	  //         margin-top:-8px;
	  //         -webkit-animation-delay:0.65s;
	  //       }
	  //       .loadEffect span:nth-child(6){
	  //         right: 14px;
	  //         bottom:14px;
	  //         -webkit-animation-delay:0.78s;
	  //       }
	  //       .loadEffect span:nth-child(7){
	  //         bottom: 0;
	  //         left: 50%;
	  //         margin-left: -8px;
	  //         -webkit-animation-delay:0.91s;
	  //       }
	  //       .loadEffect span:nth-child(8){
	  //         bottom: 14px;
	  //         left: 14px;
	  //         -webkit-animation-delay:1.04s;
	  //       }
	  //
	  //
	  //       .loadEffect{
	  //         width: 100px;
	  //         height: 100px;
	  //         position: relative;
	  //         margin: 0 auto;
	  //       }
	  //       .loadEffect span{
	  //         display: inline-block;
	  //         width: 20px;
	  //         height: 20px;
	  //         border-radius: 50%;
	  //         background: #FF4A7D;
	  //         position: absolute;
	  //         -webkit-animation: load 1.04s ease infinite;
	  //       }
	  //       @-webkit-keyframes load{
	  //         0%{
	  //           -webkit-transform: scale(1.2);
	  //           opacity: 1;
	  //         }
	  //         100%{
	  //           -webkit-transform: scale(.3);
	  //           opacity: 0.5;
	  //         }
	  //       }
	  //       .loadEffect span:nth-child(1){
	  //         left: 0;
	  //         top: 50%;
	  //         margin-top:-10px;
	  //         -webkit-animation-delay:0.13s;
	  //       }
	  //       .loadEffect span:nth-child(2){
	  //         left: 14px;
	  //         top: 14px;
	  //         -webkit-animation-delay:0.26s;
	  //       }
	  //       .loadEffect span:nth-child(3){
	  //         left: 50%;
	  //         top: 0;
	  //         margin-left: -10px;
	  //         -webkit-animation-delay:0.39s;
	  //       }
	  //       .loadEffect span:nth-child(4){
	  //         top: 14px;
	  //         right:14px;
	  //         -webkit-animation-delay:0.52s;
	  //       }
	  //       .loadEffect span:nth-child(5){
	  //         right: 0;
	  //         top: 50%;
	  //         margin-top:-10px;
	  //         -webkit-animation-delay:0.65s;
	  //       }
	  //       .loadEffect span:nth-child(6){
	  //         right: 14px;
	  //         bottom:14px;
	  //         -webkit-animation-delay:0.78s;
	  //       }
	  //       .loadEffect span:nth-child(7){
	  //         bottom: 0;
	  //         left: 50%;
	  //         margin-left: -10px;
	  //         -webkit-animation-delay:0.91s;
	  //       }
	  //       .loadEffect span:nth-child(8){
	  //         bottom: 14px;
	  //         left: 14px;
	  //         -webkit-animation-delay:1.04s;
	  //       }
	  //     }
	  //
	  //   }
	  // </style>

	};

/***/ },

/***/ 65:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"com-popup-loading\">\n  <!--居中容器-->\n  <div class=\"middle-wrapper\">\n    <div class=\"loadEffect\">\n      <span></span>\n      <span></span>\n      <span></span>\n      <span></span>\n      <span></span>\n      <span></span>\n      <span></span>\n      <span></span>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 83:
/***/ function(module, exports) {

	/*
	 * Lazy Load - jQuery plugin for lazy loading images
	 *
	 * Copyright (c) 2007-2013 Mika Tuupola
	 *
	 * Licensed under the MIT license:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *
	 * Project home:
	 *   http://www.appelsiini.net/projects/lazyload
	 *
	 * Version:  1.9.3
	 *
	 */

	(function($, window, document, undefined) {
	    var $window = $(window);

	    $.fn.lazyload = function(options) {
	        var elements = this;
	        var $container;
	        var settings = {
	            threshold       : 500,
	            failure_limit   : 10,
	            event           : "scroll",
	            effect          : "show",
	            container       : window,
	            data_attribute  : "original",
	            skip_invisible  : true,
	            appear          : null,
	            load            : null,
	            placeholder     : "//pic.davdian.com/free/loading_640_280_v2.png"
	        };

	        function update() {
	            var counter = 0;

	            elements.each(function() {
	                var $this = $(this);
	                if (settings.skip_invisible && !$this.is(":visible")) {
	                    return;
	                }
	                if ($.abovethetop(this, settings) ||
	                    $.leftofbegin(this, settings)) {
	                    /* Nothing. */
	                } else if (!$.belowthefold(this, settings) &&
	                    !$.rightoffold(this, settings)) {
	                    $this.trigger("appear");
	                    /* if we found an image we'll load, reset the counter */
	                    counter = 0;
	                } else {
	                    if (++counter > settings.failure_limit) {
	                        return false;
	                    }
	                }
	            });

	        }

	        if(options) {
	            /* Maintain BC for a couple of versions. */
	            if (undefined !== options.failurelimit) {
	                options.failure_limit = options.failurelimit;
	                delete options.failurelimit;
	            }
	            if (undefined !== options.effectspeed) {
	                options.effect_speed = options.effectspeed;
	                delete options.effectspeed;
	            }

	            $.extend(settings, options);
	        }

	        /* Cache container as jQuery as object. */
	        $container = (settings.container === undefined ||
	        settings.container === window) ? $window : $(settings.container);

	        /* Fire one scroll event per scroll. Not one scroll event per image. */
	        if (0 === settings.event.indexOf("scroll")) {
	            $container.bind(settings.event, function() {
	                return update();
	            });
	        }

	        this.each(function() {
	            var self = this;
	            var $self = $(self);

	            self.loaded = false;

	            /* If no src attribute given use data:uri. */
	            if ($self.attr("src") === undefined || $self.attr("src") === false) {
	                if ($self.is("img")) {
	                    $self.attr("src", settings.placeholder);
	                }
	            }

	            /* When appear is triggered load original image. */
	            $self.one("appear", function() {
	                if (!this.loaded) {
	                    if (settings.appear) {
	                        var elements_left = elements.length;
	                        settings.appear.call(self, elements_left, settings);
	                    }
	                    $("<img />")
	                        .bind("load", function() {

	                            var original = $self.attr("data-" + settings.data_attribute);
	                            $self.hide();
	                            if ($self.is("img")) {
	                                $self.attr("src", original);
	                            } else {
	                                $self.css("background-image", "url('" + original + "')");
	                            }
	                            $self[settings.effect](settings.effect_speed);

	                            self.loaded = true;

	                            /* Remove image from array so it is not looped next time. */
	                            var temp = $.grep(elements, function(element) {
	                                return !element.loaded;
	                            });
	                            elements = $(temp);

	                            if (settings.load) {
	                                var elements_left = elements.length;
	                                settings.load.call(self, elements_left, settings);
	                            }
	                        })
	                        .attr("src", $self.attr("data-" + settings.data_attribute));
	                }
	            });

	            /* When wanted event is triggered load original image */
	            /* by triggering appear.                              */
	            if (0 !== settings.event.indexOf("scroll")) {
	                $self.bind(settings.event, function() {
	                    if (!self.loaded) {
	                        $self.trigger("appear");
	                    }
	                });
	            }
	        });

	        /* Check if something appears when window is resized. */
	        $window.bind("resize", function() {
	            update();
	        });

	        /* With IOS5 force loading images when navigating with back button. */
	        /* Non optimal workaround. */
	        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
	            $window.bind("pageshow", function(event) {
	                if (event.originalEvent && event.originalEvent.persisted) {
	                    elements.each(function() {
	                        $(this).trigger("appear");
	                    });
	                }
	            });
	        }

	        /* Force initial check if images should appear. */
	        $(document).ready(function() {
	            update();
	        });

	        return this;
	    };

	    /* Convenience methods in jQuery namespace.           */
	    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

	    $.belowthefold = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top + $(settings.container).height();
	        }

	        return fold <= $(element).offset().top - settings.threshold;
	    };

	    $.rightoffold = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.width() + $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left + $(settings.container).width();
	        }

	        return fold <= $(element).offset().left - settings.threshold;
	    };

	    $.abovethetop = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top;
	        }
	        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
	    };

	    $.leftofbegin = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left;
	        }

	        return fold >= $(element).offset().left + settings.threshold + $(element).width();
	    };

	    $.inviewport = function(element, settings) {
	        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
	            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	    };

	    /* Custom selectors for your convenience.   */
	    /* Use as $("img:below-the-fold").something() or */
	    /* $("img").filter(":below-the-fold").something() which is faster */

	    $.extend($.expr[":"], {
	        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
	        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
	        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
	        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
	        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
	        /* Maintain BC for couple of versions. */
	        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
	        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
	        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
	    });

	})(jQuery, window, document);

	jQuery(document).ready(function($){
	    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 10,skip_invisible : false })
	});

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

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Vue-Lazyload.js v1.0.5
	 * (c) 2017 Awe <hilongjw@gmail.com>
	 * Released under the MIT License.
	 */
	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.VueLazyload=t()}(this,function(){"use strict";function e(e,t){if(e.length){var n=e.indexOf(t);return n>-1?e.splice(n,1):void 0}}function t(e,t){if(!e||!t)return e||{};if(e instanceof Object)for(var n in t)e[n]=t[n];return e}function n(e,t){for(var n=!1,i=0,r=e.length;i<r;i++)if(t(e[i])){n=!0;break}return n}function i(e,t){if("IMG"===e.tagName&&e.getAttribute("data-srcset")){var n=e.getAttribute("data-srcset"),i=[],r=e.parentNode,o=r.offsetWidth*t,a=void 0,s=void 0,u=void 0;n=n.trim().split(","),n.map(function(e){e=e.trim(),a=e.lastIndexOf(" "),a===-1?(s=e,u=999998):(s=e.substr(0,a),u=parseInt(e.substr(a+1,e.length-a-2),10)),i.push([u,s])}),i.sort(function(e,t){if(e[0]<t[0])return-1;if(e[0]>t[0])return 1;if(e[0]===t[0]){if(t[1].indexOf(".webp",t[1].length-5)!==-1)return 1;if(e[1].indexOf(".webp",e[1].length-5)!==-1)return-1}return 0});for(var d="",l=void 0,c=i.length,h=0;h<c;h++)if(l=i[h],l[0]>=o){d=l[1];break}return d}}function r(e,t){for(var n=void 0,i=0,r=e.length;i<r;i++)if(t(e[i])){n=e[i];break}return n}function o(){if(!f)return!1;var e=!0,t=document;try{var n=t.createElement("object");n.type="image/webp",n.style.visibility="hidden",n.innerHTML="!",t.body.appendChild(n),e=!n.offsetWidth,t.body.removeChild(n)}catch(t){e=!1}return e}function a(e,t){var n=null,i=0;return function(){if(!n){var r=Date.now()-i,o=this,a=arguments,s=function(){i=Date.now(),n=!1,e.apply(o,a)};r>=t?s():n=setTimeout(s,t)}}}function s(){if(f){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",null,t)}catch(e){}return e}}function u(e){return null!==e&&"object"===("undefined"==typeof e?"undefined":l(e))}function d(e){if(!(e instanceof Object))return[];if(Object.keys)return Object.keys(e);var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},c=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},h=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),f="undefined"!=typeof window,p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return f&&window.devicePixelRatio||e},v=s(),y={on:function(e,t,n){v?e.addEventListener(t,n,{passive:!0}):e.addEventListener(t,n,!1)},off:function(e,t,n){e.removeEventListener(t,n)}},g=function(e,t,n){var i=new Image;i.src=e.src,i.onload=function(){t({naturalHeight:i.naturalHeight,naturalWidth:i.naturalWidth,src:i.src})},i.onerror=function(e){n(e)}},m=function(e,t){return"undefined"!=typeof getComputedStyle?getComputedStyle(e,null).getPropertyValue(t):e.style[t]},b=function(e){return m(e,"overflow")+m(e,"overflow-y")+m(e,"overflow-x")},L=function(e){if(f){if(!(e instanceof HTMLElement))return window;for(var t=e;t&&t!==document.body&&t!==document.documentElement&&t.parentNode;){if(/(scroll|auto)/.test(b(t)))return t;t=t.parentNode}return window}},w={},k=function(){function e(t){var n=t.el,i=t.src,r=t.error,o=t.loading,a=t.bindType,s=t.$parent,u=t.options,d=t.elRenderer;c(this,e),this.el=n,this.src=i,this.error=r,this.loading=o,this.bindType=a,this.attempt=0,this.naturalHeight=0,this.naturalWidth=0,this.options=u,this.filter(),this.initState(),this.performanceData={init:Date.now(),loadStart:null,loadEnd:null},this.rect=n.getBoundingClientRect(),this.$parent=s,this.elRenderer=d,this.render("loading",!1)}return h(e,[{key:"initState",value:function(){this.state={error:!1,loaded:!1,rendered:!1}}},{key:"record",value:function(e){this.performanceData[e]=Date.now()}},{key:"update",value:function(e){var t=e.src,n=e.loading,i=e.error,r=this.src;this.src=t,this.loading=n,this.error=i,this.filter(),r!==this.src&&(this.attempt=0,this.initState())}},{key:"getRect",value:function(){this.rect=this.el.getBoundingClientRect()}},{key:"checkInView",value:function(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad&&this.rect.right>0}},{key:"filter",value:function(){var e=this;d(this.options.filter).map(function(t){e.options.filter[t](e,e.options)})}},{key:"renderLoading",value:function(e){var t=this;g({src:this.loading},function(n){t.render("loading",!1),e()})}},{key:"load",value:function(){var e=this;return this.attempt>this.options.attempt-1&&this.state.error?void(this.options.silent||console.log("error end")):this.state.loaded||w[this.src]?this.render("loaded",!0):void this.renderLoading(function(){e.attempt++,e.record("loadStart"),g({src:e.src},function(t){e.naturalHeight=t.naturalHeight,e.naturalWidth=t.naturalWidth,e.state.loaded=!0,e.state.error=!1,e.record("loadEnd"),e.render("loaded",!1),w[e.src]=1},function(t){e.state.error=!0,e.state.loaded=!1,e.render("error",!1)})})}},{key:"render",value:function(e,t){this.elRenderer(this,e,t)}},{key:"performance",value:function(){var e="loading",t=0;return this.state.loaded&&(e="loaded",t=(this.performanceData.loadEnd-this.performanceData.loadStart)/1e3),this.state.error&&(e="error"),{src:this.src,state:e,time:t}}},{key:"destroy",value:function(){this.el=null,this.src=null,this.error=null,this.loading=null,this.bindType=null,this.attempt=0}}]),e}(),A="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",E=["scroll","wheel","mousewheel","resize","animationend","transitionend","touchmove"],T=function(s){return function(){function d(e){var t=this,n=e.preLoad,i=e.error,r=e.preLoadTop,s=e.dispatchEvent,u=e.loading,l=e.attempt,h=e.silent,f=e.scale,v=e.listenEvents,y=(e.hasbind,e.filter),g=e.adapter;c(this,d),this.version="1.0.5",this.ListenerQueue=[],this.TargetIndex=0,this.TargetQueue=[],this.options={silent:h||!0,dispatchEvent:!!s,preLoad:n||1.3,preLoadTop:r||0,error:i||A,loading:u||A,attempt:l||3,scale:f||p(f),ListenEvents:v||E,hasbind:!1,supportWebp:o(),filter:y||{},adapter:g||{}},this._initEvent(),this.lazyLoadHandler=a(function(){var e=!1;t.ListenerQueue.forEach(function(t){t.state.loaded||(e=t.checkInView(),e&&t.load())})},200)}return h(d,[{key:"config",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this.options,e)}},{key:"performance",value:function(){var e=[];return this.ListenerQueue.map(function(t){e.push(t.performance())}),e}},{key:"addLazyBox",value:function(e){this.ListenerQueue.push(e),f&&(this._addListenerTarget(window),e.$el&&e.$el.parentNode&&this._addListenerTarget(e.$el.parentNode))}},{key:"add",value:function(e,t,r){var o=this;if(n(this.ListenerQueue,function(t){return t.el===e}))return this.update(e,t),s.nextTick(this.lazyLoadHandler);var a=this._valueFormatter(t.value),u=a.src,d=a.loading,l=a.error;s.nextTick(function(){u=i(e,o.options.scale)||u;var n=Object.keys(t.modifiers)[0],a=void 0;n&&(a=r.context.$refs[n],a=a?a.$el||a:document.getElementById(n)),a||(a=L(e));var c=new k({bindType:t.arg,$parent:a,el:e,loading:d,error:l,src:u,elRenderer:o._elRenderer.bind(o),options:o.options});o.ListenerQueue.push(c),f&&(o._addListenerTarget(window),o._addListenerTarget(a)),o.lazyLoadHandler(),s.nextTick(function(){return o.lazyLoadHandler()})})}},{key:"update",value:function(e,t){var n=this,i=this._valueFormatter(t.value),o=i.src,a=i.loading,u=i.error,d=r(this.ListenerQueue,function(t){return t.el===e});d&&d.update({src:o,loading:a,error:u}),this.lazyLoadHandler(),s.nextTick(function(){return n.lazyLoadHandler()})}},{key:"remove",value:function(t){if(t){var n=r(this.ListenerQueue,function(e){return e.el===t});n&&(this._removeListenerTarget(n.$parent),this._removeListenerTarget(window),e(this.ListenerQueue,n)&&n.destroy())}}},{key:"removeComponent",value:function(t){t&&(e(this.ListenerQueue,t),t.$parent&&t.$el.parentNode&&this._removeListenerTarget(t.$el.parentNode),this._removeListenerTarget(window))}},{key:"_addListenerTarget",value:function(e){if(e){var t=r(this.TargetQueue,function(t){return t.el===e});return t?t.childrenCount++:(t={el:e,id:++this.TargetIndex,childrenCount:1,listened:!0},this._initListen(t.el,!0),this.TargetQueue.push(t)),this.TargetIndex}}},{key:"_removeListenerTarget",value:function(e){var t=this;this.TargetQueue.forEach(function(n,i){n.el===e&&(n.childrenCount--,n.childrenCount||(t._initListen(n.el,!1),t.TargetQueue.splice(i,1),n=null))})}},{key:"_initListen",value:function(e,t){var n=this;this.options.ListenEvents.forEach(function(i){return y[t?"on":"off"](e,i,n.lazyLoadHandler)})}},{key:"_initEvent",value:function(){var t=this;this.Event={listeners:{loading:[],loaded:[],error:[]}},this.$on=function(e,n){t.Event.listeners[e].push(n)},this.$once=function(e,n){function i(){r.$off(e,i),n.apply(r,arguments)}var r=t;t.$on(e,i)},this.$off=function(n,i){return i?void e(t.Event.listeners[n],i):void(t.Event.listeners[n]=[])},this.$emit=function(e,n,i){t.Event.listeners[e].forEach(function(e){return e(n,i)})}}},{key:"_elRenderer",value:function(e,t,n){if(e.el){var i=e.el,r=e.bindType,o=void 0;switch(t){case"loading":o=e.loading;break;case"error":o=e.error;break;default:o=e.src}if(r?i.style[r]="url("+o+")":i.getAttribute("src")!==o&&i.setAttribute("src",o),i.setAttribute("lazy",t),this.$emit(t,e,n),this.options.adapter[t]&&this.options.adapter[t](e,this.options),this.options.dispatchEvent){var a=new CustomEvent(t,{detail:e});i.dispatchEvent(a)}}}},{key:"_valueFormatter",value:function(e){var t=e,n=this.options.loading,i=this.options.error;return u(e)&&(e.src||this.options.silent||console.error("Vue Lazyload warning: miss src with "+e),t=e.src,n=e.loading||this.options.loading,i=e.error||this.options.error),{src:t,loading:n,error:i}}}]),d}()},_=function(e){return{props:{tag:{type:String,default:"div"}},render:function(e){return this.show===!1?e(this.tag):e(this.tag,null,this.$slots.default)},data:function(){return{state:{loaded:!1},rect:{},show:!1}},mounted:function(){e.addLazyBox(this),e.lazyLoadHandler()},beforeDestroy:function(){e.removeComponent(this)},methods:{getRect:function(){this.rect=this.$el.getBoundingClientRect()},checkInView:function(){return this.getRect(),f&&this.rect.top<window.innerHeight*e.options.preLoad&&this.rect.bottom>0&&this.rect.left<window.innerWidth*e.options.preLoad&&this.rect.right>0},load:function(){this.show=!0,this.state.loaded=!0,this.$emit("show",this)}}}},$={install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=T(e),r=new i(n),o="2"===e.version.split(".")[0];e.prototype.$Lazyload=r,n.lazyComponent&&e.component("lazy-component",_(r)),o?e.directive("lazy",{bind:r.add.bind(r),update:r.update.bind(r),componentUpdated:r.lazyLoadHandler.bind(r),unbind:r.remove.bind(r)}):e.directive("lazy",{bind:r.lazyLoadHandler.bind(r),update:function(e,n){t(this.vm.$refs,this.vm.$els),r.add(this.el,{modifiers:this.modifiers||{},arg:this.arg,value:e,oldValue:n},{context:this.vm})},unbind:function(){r.remove(this.el)}})}};return $});

/***/ },

/***/ 1696:
/***/ function(module, exports, __webpack_require__) {

	var poplist = __webpack_require__(1697);
	var  VueLazyload = __webpack_require__(418);

	Vue.use(VueLazyload, {
	    // error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	    // loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	    preload:2,
	    try: 3 // default 1
	})

	new Vue({
	    el: "#vPopList",
	    data:function(){
	        return{
	            msg:'hello vue'
	        }
	    },
	    components:{
	        poplist:poplist,
	    }
	});


/***/ },

/***/ 1697:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(1698)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/vClassroomPopList.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1709)
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
	  var id = "_v-7dbeba0c/vClassroomPopList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1698:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//         <app></app>
	// </template>
	//
	// <script>
	var vSchoolTitle = __webpack_require__(1699);
	var vSchoolList = __webpack_require__(1703);

	exports.default = {
	    data: function data() {
	        return {
	            msg: "hello"
	        };
	    },
	    components: {
	        app: vSchoolTitle,
	        vList: vSchoolList
	    }
	    // </script>

	};

/***/ },

/***/ 1699:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1700)
	__vue_script__ = __webpack_require__(1702)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/vClassroomPopListTop.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1708)
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
	  var id = "_v-381ca54e/vClassroomPopListTop.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1700:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1701);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./vClassroomPopListTop.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./vClassroomPopListTop.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1701:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n.index_con_menu {\n    display: -webkit-box;\n    display: -moz-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-flow: row;\n       -moz-box-orient: horizontal;\n       -moz-box-direction: normal;\n        -ms-flex-flow: row;\n            flex-flow: row;\n    max-width: 640px;\n    font-size: 13px;\n    line-height: 44px;\n    position: relative;\n    top: 0;\n    z-index: 11;\n    margin-top: 0;\n    position: absolute;\n    left:60px;\n    right: 60px;\n}\n.index_con_menu li {\n    color: #333;\n    text-align: center;\n    cursor: pointer;\n    word-break: keep-all;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.index_con_menu li.hover {\n    color: #ff4a7d;\n}\n.bottom_line{\n    height: 2px;\n    background: #ff4a7d;\n    width: 60px;\n    margin: auto;\n    margin-top: -2px;\n}\n.other_info{\n    width:100%;\n}\n.unLoad{\n    width: 100%;\n    height: 400px;\n    position: fixed;\n    top: 180px;\n    z-index: 101;\n    max-width: 640px;\n    color: #333;\n}\n.unLoad-img{\n    width: 122px;\n    height: 140px;\n    top: 0;\n    margin: auto;\n    background: url('//pic.davdian.com/free/2016/12/08/no_sign.png') no-repeat;\n    background-size: contain;\n}\n.unLoad-title{\n    width: 150px;\n    height: 20px;\n    margin: 30px auto;\n    text-align: center;\n}\n.unLoad-btn{\n    width: 140px;\n    height: 33px;\n    text-align: center;\n    line-height: 33px;\n    margin: 20px auto;\n    border: 1px solid #999999;\n    border-radius: 2.5px;\n}\n", ""]);

	// exports


/***/ },

/***/ 1702:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _common = __webpack_require__(96);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// <style>
	//     .index_con_menu {
	//         display: -webkit-box;
	//         display: -moz-box;
	//         display: -webkit-flex;
	//         display: -ms-flexbox;
	//         display: flex;
	//         flex-flow: row;
	//         max-width: 640px;
	//         font-size: 13px;
	//         line-height: 44px;
	//         position: relative;
	//         top: 0;
	//         z-index: 11;
	//         margin-top: 0;
	//         position: absolute;
	//         left:60px;
	//         right: 60px;
	//     }
	//     .index_con_menu li {
	//         color: #333;
	//         text-align: center;
	//         cursor: pointer;
	//         word-break: keep-all;
	//         white-space: nowrap;
	//         overflow: hidden;
	//         text-overflow: ellipsis;
	//     }
	//     .index_con_menu li.hover {
	//         color: #ff4a7d;
	//     }
	//     .bottom_line{
	//         height: 2px;
	//         background: #ff4a7d;
	//         width: 60px;
	//         margin: auto;
	//         margin-top: -2px;
	//     }
	//     .other_info{
	//         width:100%;
	//     }
	//     .unLoad{
	//         width: 100%;
	//         height: 400px;
	//         position: fixed;
	//         top: 180px;
	//         z-index: 101;
	//         max-width: 640px;
	//         color: #333;
	//     }
	//     .unLoad-img{
	//         width: 122px;
	//         height: 140px;
	//         top: 0;
	//         margin: auto;
	//         background: url('//pic.davdian.com/free/2016/12/08/no_sign.png') no-repeat;
	//         background-size: contain;
	//     }
	//     .unLoad-title{
	//         width: 150px;
	//         height: 20px;
	//         margin: 30px auto;
	//         text-align: center;
	//     }
	//     .unLoad-btn{
	//         width: 140px;
	//         height: 33px;
	//         text-align: center;
	//         line-height: 33px;
	//         margin: 20px auto;
	//         border: 1px solid #999999;
	//         border-radius: 2.5px;
	//     }
	// </style>
	// <template>
	//     <div id="main">
	//         <div class="top0" style="height: 44px;background-color: #FFFFFF">
	//             <div class="top_container">
	//                 <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->
	//                 <div class="top_left">
	//                     <a class="top_back" href="javascript:history.back();">
	//                         <span class="home_arrow"></span>
	//                     </a>
	//                 </div>
	//
	//                 <ul class="index_con_menu">
	//                     <li @click="liClick0" class="flex-1" :class="{hover:selected == 0}" style="background: rgb(255, 255, 255);">
	//                         <div class="span_outer fz_14" style="margin-right: 25px">
	//                             <span>已报名</span>
	//                             <div v-if="selected == 0" class="bottom_line">
	//                             </div>
	//                         </div>
	//                     </li>
	//                     <li @click="liClick1" class="flex-1" :class="{hover:selected == 1}" selected="1" style="background: rgb(255, 255, 255);">
	//                         <div class="span_outer fz_14" style="margin-left: 25px">
	//                             <span>我发起</span>
	//                             <div v-if="selected == 1" class="bottom_line"></div>
	//                         </div>
	//                     </li>
	//                 </ul>
	//             </div>
	//         </div>
	//         <div v-if = "no_data" style="text-align: center;position: relative;top: 80px;">
	//             <img style="width:18%;" src="//pic.davdian.com/free/2016/12/19/200_298_0d6a638b6549b3dba2ab709ac72a3db1.png" alt="">
	//             <div style="margin-top: 20px;color: #666666">
	//                 <span v-if="selected == 0">
	//                     还没有报名过课程哦
	//                 </span>
	//                 <span v-if="selected == 1">
	//                     还没有创建过课程哦
	//                 </span>
	//             </div>
	//         </div>
	//         <list :list="list" :top-heights="topHeights"></list>
	//         <div style="clear: both"></div>
	//         <div v-if="loading" class="no_more"> 加载中 <img src="//pic.davdian.com/free/loading_03252.svg"> </div>
	//         <div v-if="more == '0' && no_data == false" class="no_more" style="color: #666666;font-size: 12px;"> 没有更多了 </div>
	//
	//         <div class="other_info">
	//             <div class='unLoad' v-if="error">
	//                 <div class='unLoad-img'></div>
	//                 <div class='unLoad-title'>网络异常，请重新加载</div>
	//                 <div class='unLoad-btn' @click='getData'>点击重新加载</div>
	//             </div>
	//         </div>
	//
	//     </div>
	// </template>
	//
	// <script>
	var list = __webpack_require__(1703);
	exports.default = {
	    el: "#main",
	    data: function data() {
	        var _ref;

	        return _ref = {
	            selected: 0,
	            ajaxing: true,
	            list: [],
	            page: 0,
	            allData: [[], []],
	            allPage: [0, 0],
	            allMore: ["1", "1"],
	            allTop: [0, 0],
	            allTopHeight: [0, 0],
	            previewList: [],
	            no_data: false,
	            error: false,
	            more: "1",
	            loading: false,
	            top: 0,
	            topHeights: 0,
	            dataUrl: window.userJoinList,
	            isFirefox: false,
	            localData: [{}, {}],
	            all_no_data: [false, false]
	        }, _defineProperty(_ref, "error", false), _defineProperty(_ref, "all_error", [false, false]), _ref;
	    },
	    //初始化数据，dom没有建立之前
	    created: function created() {
	        var scope = this;
	        //判断是否是火狐浏览器，来选择滚动条滚动的方式
	        scope.isFirefox = navigator.userAgent.toUpperCase().indexOf("FIREFOX") > 0 ? true : false;
	        //判断是否是由上一个页面返回时返回读取缓存的数据 有缓存数据时获取到需要填充的高度 否则为0
	        this.init();
	        //存入初始化的数据（不需要包含getData获取到的数据）
	        if (!isPrivateMode) {
	            sessionStorage.setItem('vClassroomPoplistsort', this.selected);
	            sessionStorage.setItem('vClassroomPoplistTop', JSON.stringify(scope.allTop));
	            sessionStorage.setItem('vClassroomPoplistAllTopHeight', JSON.stringify(scope.allTopHeight));
	            sessionStorage.setItem('vClassroomPoplistMore', JSON.stringify(scope.allMore));
	        }
	    },
	    //dom建立之后，获取需要的参数
	    mounted: function mounted() {
	        var scope = this;
	        //添加滚动事件
	        this.scroll();
	        //添加高度
	        document.getElementById("#topHeight").style.height = scope.topHeights + "px";
	        if (scope.isFirefox) {
	            document.documentElement.scrollTop = scope.top;
	        } else {
	            document.body.scrollTop = scope.top;
	        }
	    },
	    methods: {
	        /**
	         * 交换显示数据
	         */
	        liClick0: function liClick0() {
	            var scope = this;
	            this.selected = 0;
	            this.list = [];
	            this.error = this.all_error[0];
	            if (!isPrivateMode) {
	                sessionStorage.setItem('vClassroomPoplistsort', this.selected);
	            }
	            this.more = this.allMore[0];
	            this.top = this.allTop[0];
	            this.topHeights = this.allTopHeight[0];
	            this.no_data = this.all_no_data[0];
	            if (this.allData[0].length == 0) {
	                this.dataUrl = window.userJoinList;
	                this.getData(true);
	            } else {
	                this.list = this.allData[0];
	            }
	            document.getElementById("#topHeight").style.height = scope.topHeights + "px";
	            //                if(scope.isFirefox){
	            //                    alert(scope.top);
	            //                    document.documentElement.scrollTop = scope.top;
	            //                }else {
	            //                    document.body.scrollTop = scope.top;
	            //                }
	            setTimeout(function () {
	                document.getElementById("#topHeight").style.height = scope.topHeights + "px";
	                if (scope.isFirefox) {
	                    document.documentElement.scrollTop = scope.top;
	                } else {
	                    document.body.scrollTop = scope.top;
	                }
	            }, 0);
	        },
	        liClick1: function liClick1() {
	            var scope = this;
	            this.selected = 1;
	            this.error = this.all_error[1];
	            this.list = [];
	            if (!isPrivateMode) {
	                sessionStorage.setItem('vClassroomPoplistsort', this.selected);
	            };
	            this.more = this.allMore[1];
	            this.top = this.allTop[1];
	            this.topHeights = this.allTopHeight[1];
	            this.no_data = this.all_no_data[1];
	            if (this.allData[1].length == 0) {
	                this.dataUrl = window.userCreateList;
	                this.getData(true);
	            } else {
	                this.list = this.allData[1];
	            }
	            document.getElementById("#topHeight").style.height = scope.topHeights + "px";
	            //                if(scope.isFirefox){
	            //                    document.documentElement.scrollTop = scope.top;
	            //                }else {
	            //                    document.body.scrollTop = scope.top;
	            //                }
	            setTimeout(function () {
	                document.getElementById("#topHeight").style.height = scope.topHeights + "px";
	                if (scope.isFirefox) {
	                    document.documentElement.scrollTop = scope.top;
	                } else {
	                    document.body.scrollTop = scope.top;
	                }
	            }, 0);
	        },
	        /**
	         * 获取数据
	         */
	        getData: function getData(flags) {
	            //确定当前的状态
	            var scope = this,
	                sort = this.selected;
	            //判断是否请求数据
	            if (scope.more == "1") {
	                if (scope.ajaxing) {
	                    scope.ajaxing = false;
	                    scope.loading = true;
	                    scope.error = false;
	                    _common2.default.getDataWithSign({
	                        updata: { pageIndex: scope.allPage[sort] },
	                        flag: flags,
	                        url: scope.dataUrl,
	                        success: function success(data) {
	                            if (data.code == 0) {
	                                //不是下拉加载.
	                                if (flags) {
	                                    if (data == undefined) {
	                                        scope.all_no_data[sort] = true;
	                                        scope.no_data = true;
	                                    } else if (data.data == undefined) {
	                                        scope.all_no_data[sort] = true;
	                                        scope.no_data = true;
	                                    } else {
	                                        scope.allData[sort] = scope.allData[sort].concat(data.data.course.dataList);
	                                        scope.allPage[sort] = data.data.course.nextPageIndex;
	                                        scope.allMore[sort] = "1";
	                                        scope.list = scope.allData[sort];
	                                        scope.page = scope.allPage[sort];
	                                        data.data.course.more = "1";
	                                        scope.localData[sort] = data;

	                                        if (!isPrivateMode) {
	                                            sessionStorage.setItem("vClassroomPopListTop", JSON.stringify(scope.localData));
	                                        }
	                                        if (data.data.course.dataList.length == 0) {
	                                            scope.all_no_data[sort] = true;
	                                            scope.no_data = true;
	                                        }
	                                    }
	                                } else {
	                                    if (data.data != undefined) {
	                                        scope.allData[sort] = scope.allData[sort].concat(data.data.course.dataList);

	                                        if (scope.allData[sort].length <= 4) {
	                                            data.data.course.more = "1";
	                                        }

	                                        scope.allPage[sort] = data.data.course.nextPageIndex;
	                                        scope.allMore[sort] = data.data.course.more;
	                                        scope.list = scope.allData[sort];
	                                        scope.page = scope.allPage[sort];

	                                        if (!isPrivateMode) {
	                                            var localdata = JSON.parse(sessionStorage.getItem("vClassroomPopListTop"))[sort];
	                                            localdata.data_version = data.data_version;
	                                            localdata.data.course.nextPageIndex = scope.allPage[sort];
	                                            localdata.data.course.more = data.data.course.more;
	                                            localdata.data.course.dataList = localdata.data.course.dataList.concat(data.data.course.dataList);
	                                            scope.localData[sort] = localdata;
	                                            var localKey = _common2.default.md5LocalKey(scope.dataUrl, { pageIndex: 0 });
	                                            localStorage.setItem(localKey, JSON.stringify(localdata));
	                                            sessionStorage.setItem("vClassroomPopListTop", JSON.stringify(scope.localData));
	                                        }
	                                    } else {
	                                        if (scope.list.length >= 4) {
	                                            scope.more = "0";
	                                        } else {
	                                            scope.more = "1";
	                                        }
	                                        scope.allMore[sort] = scope.more;
	                                    }
	                                }
	                                scope.ajaxing = true;
	                            } else {
	                                if (flags) {
	                                    scope.error = true;
	                                    scope.all_error[sort] = true;
	                                    scope.ajaxing = true;
	                                } else {
	                                    bravetime.info("加载失败了");
	                                    setTimeout(function () {
	                                        scope.ajaxing = true;
	                                    }, 1000);
	                                }
	                            }
	                            scope.loading = false;
	                            scope.more = scope.allMore[sort];
	                        },
	                        error: function error() {
	                            if (flags) {
	                                scope.error = true;
	                                scope.all_error[sort] = true;
	                            } else {
	                                bravetime.info("加载失败了");
	                            }
	                            setTimeout(function () {
	                                scope.ajaxing = true;
	                            }, 1000);
	                            scope.loading = false;
	                        }
	                    });
	                }
	            }
	        },
	        /**
	         * 滚动判断
	         */
	        scroll: function scroll() {
	            var scope = this;
	            $(window).scroll(function () {
	                //滚动条滚动事件
	                var top = document.body.scrollTop;
	                if (scope.isFirefox) {
	                    top = document.documentElement.scrollTop;
	                } else {
	                    top = document.body.scrollTop;
	                }
	                var topHeight = document.getElementById("#topHeight").offsetHeight;
	                scope.allTop[scope.selected] = top;
	                scope.allTopHeight[scope.selected] = topHeight;
	                if (!isPrivateMode) {
	                    sessionStorage.setItem('vClassroomPoplistTop', JSON.stringify(scope.allTop));
	                    sessionStorage.setItem('vClassroomPoplistAllTopHeight', JSON.stringify(scope.allTopHeight));
	                }
	                var offset = window.pageYOffset; //文档现在的位置加上窗口的高度
	                var offsetTop = document.body.scrollHeight; //整个页面的高度
	                if (offsetTop - offset - window.screen.availHeight < 100) {
	                    //如果滚动条到一定位置
	                    scope.getData(false);
	                }
	            });
	        },
	        /**
	         * 初始化数据 由直播间返回时才读取本地数据
	         */
	        init: function init() {
	            var getIt = true;
	            var scope = this;
	            var ua = navigator.userAgent.toLowerCase();
	            if (!isPrivateMode) {
	                //浏览器中能存储session storage
	                var patharr = JSON.parse(sessionStorage.history); //获取路径path
	                if (patharr.length > 2) {
	                    //从标签页直接进入也会发出请求
	                    var lastPath = patharr[patharr.length - 2].path;
	                    if (lastPath == 'introduce') {
	                        //判断是否是浏览器上的返回键回到这个页面
	                        //取本地的数据
	                        scope.localData = JSON.parse(sessionStorage.getItem('vClassroomPopListTop'));
	                        if (isEmptyObject(scope.localData[0])) {
	                            scope.allData[0] = [];
	                            scope.allPage[0] = 0;
	                            scope.allMore[0] = "1";
	                        } else {
	                            scope.allData[0] = scope.localData[0].data.course.dataList;
	                            scope.allPage[0] = scope.localData[0].data.course.nextPageIndex;
	                            scope.allMore[0] = scope.localData[0].data.course.more;
	                        }
	                        if (isEmptyObject(scope.localData[1])) {
	                            scope.allData[1] = [];
	                            scope.allPage[1] = 0;
	                            scope.allMore[1] = "1";
	                        } else {
	                            scope.allData[1] = scope.localData[1].data.course.dataList;
	                            scope.allPage[1] = scope.localData[1].data.course.nextPageIndex;
	                            scope.allMore[1] = scope.localData[1].data.course.more;
	                        }

	                        this.allTop = eval(sessionStorage.getItem('vClassroomPoplistTop'));
	                        this.allTopHeight = eval(sessionStorage.getItem('vClassroomPoplistAllTopHeight'));

	                        this.selected = eval(sessionStorage.getItem('vClassroomPoplistsort'));

	                        //植入值
	                        this.list = this.allData[this.selected];
	                        this.page = this.allPage[this.selected];
	                        this.more = this.allMore[this.selected];
	                        this.top = this.allTop[this.selected];
	                        this.topHeights = this.allTopHeight[this.selected];

	                        getIt = false;
	                    } else {
	                        // 清空数据
	                        sessionStorage.removeItem("vClassroomPopListTop");
	                        sessionStorage.removeItem("vClassroomPoplistTop");
	                        sessionStorage.removeItem("vClassroomPoplistAllTopHeight");
	                        sessionStorage.removeItem("vClassroomPoplistsort");
	                    }
	                }
	            };
	            if (getIt) {
	                this.getData(true);
	            }
	        }
	    },
	    components: {
	        list: list
	    }
	    // </script>

	};

/***/ },

/***/ 1703:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(1704)
	__vue_script__ = __webpack_require__(1706)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/vSchoolList.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(1707)
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
	  var id = "_v-7378bafc/vSchoolList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 1704:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1705);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./vSchoolList.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./vSchoolList.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 1705:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\nhtml{\n   background: white;\n }\n.good_list_con{\n  margin: 0;\n  padding: 0;\n}\n.good_list_2_row{\n  padding:0 10px;\n}\n .newImage {\n     -o-object-fit: cover;\n        object-fit: cover;\n     -o-object-position: center;\n        object-position: center;\n }\n .dvk4_detail{\n   width: 100%;\n   height: 76px;\n   margin-top:25px;\n }\n .dvk4_detail_content{\n   width: 100%;\n   height: 76px;\n   font-size: 0;\n }\n .dvk4_detail_content_img{\n   width: 110px;\n   height: 76px;\n   vertical-align: top;\n   position: relative;\n   float: left;\n }\n .dvk4_detail_content_text{\n   vertical-align: top;\n   height: 76px;\n   margin-left:120px;\n   position: relative;\n }\n .dvk4_detail_content_title{\n   color: #333333;\n   font-size: 14px;\n   overflow: hidden;\n   text-overflow: ellipsis;\n   -webkit-box-orient: vertical;\n   -webkit-line-clamp: 2;\n   display: -webkit-box;\n   margin-bottom: 6px;\n   line-height: 20px;\n }\n .dvk4_detail_content_name{\n   color: #999999;\n   font-size: 12px;\n   overflow: hidden;\n   text-overflow: ellipsis;\n   -webkit-box-orient: vertical;\n   -webkit-line-clamp: 1;\n   display: -webkit-box;\n   line-height:18px;\n }\n .dvk4_detail_content_time{\n   font-size: 12px;\n   color: #999999;\n   margin-top: 2px;\n }\n .dvk4_detail_content_times{\n   float: left;\n   overflow: hidden;\n   text-overflow: ellipsis;\n   -webkit-box-orient: vertical;\n   -webkit-line-clamp: 1;\n   display: -webkit-box;\n   height: 100%;\n   line-height: 14px;\n   color:#999999;\n   margin-left: 0.1rem;\n\n }\n .dvk4_detail_content_line{\n   width: 1px;\n   height: 12px;\n   float:left;\n   background: #E1E1E1;\n   margin-left:0.1rem;\n }\n .dvk_container .dvk4_detail:nth-child(1){\n   margin-top: 20px;\n }\n .dvk4_detail_content_popular{\n   float: left;\n   height: 100%;\n   line-height: 14px;\n   color:#999999;\n }\n .newImage {\n   -o-object-fit: cover;\n      object-fit: cover;\n   -o-object-position: center;\n      object-position: center;\n   display: inline;\n   border: none;\n   width: 100%;\n   border-radius: 4px;\n }\n", ""]);

	// exports


/***/ },

/***/ 1706:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <style>
	//    html{
	//       background: white;
	//     }
	//    .good_list_con{
	//      margin: 0;
	//      padding: 0;
	//    }
	//    .good_list_2_row{
	//      padding:0 10px;
	//    }
	//     .newImage {
	//         object-fit: cover;
	//         object-position: center;
	//     }
	//     .dvk4_detail{
	//       width: 100%;
	//       height: 76px;
	//       margin-top:25px;
	//     }
	//     .dvk4_detail_content{
	//       width: 100%;
	//       height: 76px;
	//       font-size: 0;
	//     }
	//     .dvk4_detail_content_img{
	//       width: 110px;
	//       height: 76px;
	//       vertical-align: top;
	//       position: relative;
	//       float: left;
	//     }
	//     .dvk4_detail_content_text{
	//       vertical-align: top;
	//       height: 76px;
	//       margin-left:120px;
	//       position: relative;
	//     }
	//     .dvk4_detail_content_title{
	//       color: #333333;
	//       font-size: 14px;
	//       overflow: hidden;
	//       text-overflow: ellipsis;
	//       -webkit-box-orient: vertical;
	//       -webkit-line-clamp: 2;
	//       display: -webkit-box;
	//       margin-bottom: 6px;
	//       line-height: 20px;
	//     }
	//     .dvk4_detail_content_name{
	//       color: #999999;
	//       font-size: 12px;
	//       overflow: hidden;
	//       text-overflow: ellipsis;
	//       -webkit-box-orient: vertical;
	//       -webkit-line-clamp: 1;
	//       display: -webkit-box;
	//       line-height:18px;
	//     }
	//     .dvk4_detail_content_time{
	//       font-size: 12px;
	//       color: #999999;
	//       margin-top: 2px;
	//     }
	//     .dvk4_detail_content_times{
	//       float: left;
	//       overflow: hidden;
	//       text-overflow: ellipsis;
	//       -webkit-box-orient: vertical;
	//       -webkit-line-clamp: 1;
	//       display: -webkit-box;
	//       height: 100%;
	//       line-height: 14px;
	//       color:#999999;
	//       margin-left: 0.1rem;
	//
	//     }
	//     .dvk4_detail_content_line{
	//       width: 1px;
	//       height: 12px;
	//       float:left;
	//       background: #E1E1E1;
	//       margin-left:0.1rem;
	//     }
	//     .dvk_container .dvk4_detail:nth-child(1){
	//       margin-top: 20px;
	//     }
	//     .dvk4_detail_content_popular{
	//       float: left;
	//       height: 100%;
	//       line-height: 14px;
	//       color:#999999;
	//     }
	//     .newImage {
	//       object-fit: cover;
	//       object-position: center;
	//       display: inline;
	//       border: none;
	//       width: 100%;
	//       border-radius: 4px;
	//     }
	// </style>
	// <template>
	//     <!--src="http://pic.davdian.com/free/2016/12/22/346_346_95d772212ba7dc702aaeabf7d32138cd.png"-->
	//
	//     <div class="good_list_con">
	//         <div class="good_list_2_row">
	//
	//           <div id="#topHeight"></div>
	//
	//           <div class="dvk_container">
	//             <div class="dvk4_detail" v-for="item in list">
	//               <a :href="item.command.content">
	//                 <div class='dvk4_detail_content'>
	//                   <div class='dvk4_detail_content_img'>
	//                     <img class="newImage" v-lazy="imgObject(item.imageUrl)"/>
	//                   </div>
	//                   <div class='dvk4_detail_content_text'>
	//                     <div class='dvk4_detail_content_title' v-text='item.title'></div>
	//                     <div class='dvk4_detail_content_name' v-text='item.teacher'></div>
	//                     <div class='dvk4_detail_content_time'>
	//                       <span class='dvk4_detail_content_popular'><span v-text='item.pv'></span>人气</span>
	//                       <span class='dvk4_detail_content_line'></span>
	//                       <span class='dvk4_detail_content_times'>
	//                          <span v-if='livenow(item)' class="circle"></span>
	//                          <span v-if='livetext(item)'>{{ livetext(item) }}</span>
	//                          <span v-if='!livetext(item)' v-text='startTimestamp(item.startTime)'></span>
	//                     </span>
	//                     </div>
	//                   </div>
	//                 </div>
	//               </a>
	//             </div>
	//           </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    el: 'main',
	    props: {
	        list: [],
	        height: {
	            type: Number,
	            default: 258
	        },
	        topHeights: null
	    },
	    data: function data() {
	        return {
	            lastScrollTop: null,
	            distance: 44,
	            lineTopHeight: 0,
	            lineBottomHeight: 0,
	            canLoadmore: true,
	            previewList: [],
	            displayCount: 0,
	            styleHeight: 192,
	            relive: false
	        };
	    },

	    //数据初始化 dom没有加载之前
	    created: function created() {
	        this.styleHeight = (document.body.offsetWidth - 30) / 2;
	        this.lineTopHeight = this.topHeights;
	        //初始化顶部div的高度和显示的数据
	        //this.change();
	    },
	    //dom加载之后 获取关于节点的数据
	    mounted: function mounted() {
	        console.log(676);
	        //添加滚动事件监听 重新计算顶部div的高度和显示的数据
	        //this.scroll();
	    },
	    methods: {

	        imgObject: function imgObject(imgSrc) {
	            return {
	                src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	                error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
	                loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
	            };
	        },

	        /**
	         *
	         * 判断是否显示正在直播的圆圈
	         */
	        livenow: function livenow(item) {
	            var timestamp = Date.parse(new Date());

	            if (item.startTime * 1000 < timestamp && item.endTime == 0) {
	                return true;
	            }
	        },
	        startTimestamp: function startTimestamp(time) {
	            return time.substring(0, 16);
	        },
	        livetext: function livetext(item) {
	            var startTimestamp = item.startTime * 1000;
	            var endTimestamp = item.endTime * 1000;
	            var timestamp = Date.parse(new Date()); //当前时间
	            var localeDate = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
	            var today = Date.parse(new Date(new Date(localeDate).getTime() + 24 * 60 * 60 * 1000 - 1)); //今天晚上23.59.59
	            var tomorrow = Date.parse(new Date(new Date(localeDate).getTime() + 48 * 60 * 60 * 1000 - 1)); //明天晚上23.59.59
	            if (endTimestamp != 0) {
	                return false;
	            }
	            if (startTimestamp < timestamp && endTimestamp == 0) {
	                return "正在直播";
	            } else if (startTimestamp <= today && startTimestamp > timestamp) {
	                // return "今天 " + new Date(parseInt(startTimestamp)).toString().slice(15,24);
	                return "今天 " + new Date(parseInt(startTimestamp)).toString().slice(15, 21);
	            } else if (startTimestamp <= tomorrow && startTimestamp > today) {
	                // return "明天 " + new Date(parseInt(startTimestamp)).toString().slice(15,24);
	                return "明天 " + new Date(parseInt(startTimestamp)).toString().slice(15, 21);
	            } else if (startTimestamp > tomorrow) {
	                var starttime = new Date(parseInt(startTimestamp));
	                return starttime.getUTCFullYear() + "-" + (starttime.getMonth() + 1) + "-" + starttime.getDate() + " " + (starttime.getHours() < 10 ? '0' : '') + starttime.getHours() + ":" + (starttime.getMinutes() < 10 ? '0' : '') + starttime.getMinutes();
	            }
	        }
	        /**
	         *
	         * 滚动事件 重新计算顶部div的高度 和显示的数据
	         */
	        //            scroll:function () {
	        //                var scope = this;
	        //                $(window).scroll(function () {
	        //
	        //                    this._rowsInWindow = Math.ceil(window.screen.height / scope.height),//一个屏幕中能放下几行item
	        //                    this._above = this._rowsInWindow * 2,//上面保留的个数
	        //                    this._below = this._rowsInWindow,//下面预留的个数
	        //                    this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
	        //
	        //                    let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
	        //
	        //                    if (scope.lastScrollTop === null || Math.abs(_scrollTop - scope.lastScrollTop) > scope._max) {//滚动的距离大于保留的item的高度
	        //                        scope.lastScrollTop = _scrollTop;//等于上次滚动条的高度
	        //                    } else {
	        //                        return;
	        //                    }
	        //                    let _from = parseInt(_scrollTop / scope.height) - this._above;
	        //                    if (_from < 0) {
	        //                        _from = 0;
	        //                    }
	        //                    let to = (_from + this._above + this._below + this._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
	        //                    let from = _from * 2;
	        //                    if (to > scope.list.length) {
	        //                        to = scope.list.length;
	        //                    }
	        //                    scope.previewList = [];
	        //                    for (; from < to; from++) {
	        //                        scope.previewList.push(scope.list[from])
	        //                    }
	        //                    scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
	        //                    scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
	        //                })
	        //            },
	        /**
	         *
	         * 初始化数据时 计算顶部div的高度 和显示的数据
	         */
	        //            change:function () {
	        //                var scope = this;
	        //                this._rowsInWindow = Math.ceil(window.screen.height / this.height),//一个屏幕中能放下几行item
	        //                        this._above = this._rowsInWindow * 2,//上面保留的个数
	        //                        this._below = this._rowsInWindow,//下面预留的个数
	        //                        this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
	        //                let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
	        //                let _from = parseInt(this.lineTopHeight / this.height) - this._above;
	        //                if (_from < 0) {
	        //                    _from = 0;
	        //                }
	        //                let to = (_from + scope._above + scope._below + scope._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
	        //                let from = _from * 2;
	        //                if (to > scope.list.length) {
	        //                    to = scope.list.length;
	        //                }
	        //                this.previewList = [];
	        //                for (; from < to; from++) {
	        //                    this.previewList.push(this.list[from])
	        //                }
	        ////                scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
	        //                scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
	        //            },

	    },

	    computed: {
	        styleObject: function styleObject() {
	            return {
	                height: this.styleHeight / 1.44 + 'px'
	            };
	        },
	        widthObject: function widthObject() {
	            return {
	                width: this.styleHeight + 'px'
	            };
	        },
	        spanWidth: function spanWidth() {
	            return {
	                width: this.styleHeight - 70 + 'px'
	            };
	        }
	    },
	    watch: {
	        /**
	         *
	         * 当整体数据变化时重新计算顶部div的高度和显示的数据
	         */
	        //            list: function () {
	        //                var scope = this;
	        //
	        //                this._rowsInWindow = Math.ceil(window.screen.height / this.height),//一个屏幕中能放下几行item
	        //                        this._above = this._rowsInWindow * 2,//上面保留的个数
	        //                        this._below = this._rowsInWindow,//下面预留的个数
	        //                        this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
	        //                let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
	        //                let _from = parseInt(_scrollTop / this.height) - this._above;
	        //                if (_from < 0) {
	        //                    _from = 0;
	        //                }
	        //                let to = (_from + scope._above + scope._below + scope._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
	        //                let from = _from * 2;
	        //                if (to > scope.list.length) {
	        //                    to = scope.list.length;
	        //                }
	        //                this.previewList = [];
	        //                for (; from < to; from++) {
	        //                    this.previewList.push(this.list[from])
	        //                }
	        //                scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
	        //                scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
	        //                setTimeout(function () {
	        //                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 0});
	        //                },0)
	        //            },
	        //            previewList:function () {
	        //                setTimeout(function () {
	        //                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 0});
	        //                },0)
	        //            }
	    }
	    // </script>

	};

/***/ },

/***/ 1707:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<!--src=\"http://pic.davdian.com/free/2016/12/22/346_346_95d772212ba7dc702aaeabf7d32138cd.png\"-->\n\n<div class=\"good_list_con\">\n    <div class=\"good_list_2_row\">\n\n      <div id=\"#topHeight\"></div>\n\n      <div class=\"dvk_container\">\n        <div class=\"dvk4_detail\" v-for=\"item in list\">\n          <a :href=\"item.command.content\">\n            <div class='dvk4_detail_content'>\n              <div class='dvk4_detail_content_img'>\n                <img class=\"newImage\" v-lazy=\"imgObject(item.imageUrl)\"/>\n              </div>\n              <div class='dvk4_detail_content_text'>\n                <div class='dvk4_detail_content_title' v-text='item.title'></div>\n                <div class='dvk4_detail_content_name' v-text='item.teacher'></div>\n                <div class='dvk4_detail_content_time'>\n                  <span class='dvk4_detail_content_popular'><span v-text='item.pv'></span>人气</span>\n                  <span class='dvk4_detail_content_line'></span>\n                  <span class='dvk4_detail_content_times'>\n                     <span v-if='livenow(item)' class=\"circle\"></span>\n                     <span v-if='livetext(item)'>{{ livetext(item) }}</span>\n                     <span v-if='!livetext(item)' v-text='startTimestamp(item.startTime)'></span>\n                </span>\n                </div>\n              </div>\n            </div>\n          </a>\n        </div>\n      </div>\n    </div>\n</div>\n";

/***/ },

/***/ 1708:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div id=\"main\">\n    <div class=\"top0\" style=\"height: 44px;background-color: #FFFFFF\">\n        <div class=\"top_container\">\n            <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->\n            <div class=\"top_left\">\n                <a class=\"top_back\" href=\"javascript:history.back();\">\n                    <span class=\"home_arrow\"></span>\n                </a>\n            </div>\n\n            <ul class=\"index_con_menu\">\n                <li @click=\"liClick0\" class=\"flex-1\" :class=\"{hover:selected == 0}\" style=\"background: rgb(255, 255, 255);\">\n                    <div class=\"span_outer fz_14\" style=\"margin-right: 25px\">\n                        <span>已报名</span>\n                        <div v-if=\"selected == 0\" class=\"bottom_line\">\n                        </div>\n                    </div>\n                </li>\n                <li @click=\"liClick1\" class=\"flex-1\" :class=\"{hover:selected == 1}\" selected=\"1\" style=\"background: rgb(255, 255, 255);\">\n                    <div class=\"span_outer fz_14\" style=\"margin-left: 25px\">\n                        <span>我发起</span>\n                        <div v-if=\"selected == 1\" class=\"bottom_line\"></div>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div v-if = \"no_data\" style=\"text-align: center;position: relative;top: 80px;\">\n        <img style=\"width:18%;\" src=\"//pic.davdian.com/free/2016/12/19/200_298_0d6a638b6549b3dba2ab709ac72a3db1.png\" alt=\"\">\n        <div style=\"margin-top: 20px;color: #666666\">\n            <span v-if=\"selected == 0\">\n                还没有报名过课程哦\n            </span>\n            <span v-if=\"selected == 1\">\n                还没有创建过课程哦\n            </span>\n        </div>\n    </div>\n    <list :list=\"list\" :top-heights=\"topHeights\"></list>\n    <div style=\"clear: both\"></div>\n    <div v-if=\"loading\" class=\"no_more\"> 加载中 <img src=\"//pic.davdian.com/free/loading_03252.svg\"> </div>\n    <div v-if=\"more == '0' && no_data == false\" class=\"no_more\" style=\"color: #666666;font-size: 12px;\"> 没有更多了 </div>\n\n    <div class=\"other_info\">\n        <div class='unLoad' v-if=\"error\">\n            <div class='unLoad-img'></div>\n            <div class='unLoad-title'>网络异常，请重新加载</div>\n            <div class='unLoad-btn' @click='getData'>点击重新加载</div>\n        </div>\n    </div>\n\n</div>\n";

/***/ },

/***/ 1709:
/***/ function(module, exports) {

	module.exports = "\n<app></app>\n";

/***/ }

/******/ });