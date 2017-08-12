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

	__webpack_require__(33);
	__webpack_require__(37);
	__webpack_require__(451);


	__webpack_require__(419);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(83);
	__webpack_require__(453);

/***/ },

/***/ 33:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 37:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 42:
/***/ function(module, exports) {

	$(document).ready(function () {
	  if (window.Units && Units.isApp()) {
	    return false;
	  }
	  var top0Container = $(".top0");

	  // if (top0Container.length > 0 && window.tj_path != 'index') {
	  //   // sticky
	  //   // top0Container[0].style.position = '-webkit-sticky !important';
	  //   // top0Container[0].style.position = 'sticky !important';
	  //   top0Container[0].setAttribute('style', 'position: -webkit-sticky !important');
	  //   top0Container[0].setAttribute('style', 'position: sticky !important');
	  //   // top0Container[0].setAttribute('style', 'color: red');
	  //   alert(top0Container[0].style.position);
	  //   if (top0Container[0].style.position == '-webkit-sticky' || top0Container[0].style.position == 'sticky') {
	  //     document.body.style.paddingTop = '0';
	  //   } /*else {
	  //     top0Container[0].style.position = 'fixed';
	  //     document.body.style.paddingTop = '44px';
	  //   }*/
	  // }

	  /* var $body = $(document.body);*/
	  if (top0Container && top0Container.length) {


	    $(".top_menu_button").click(function () {
	      $(".top_menu_detail").toggleClass('hide');
	    });
	    $(window).on("scroll", function () {
	      $(".top_menu_detail").addClass("hide");
	    });

	    //页面滚动时候操作
	    $(window).scroll(scrollCallback);

	    //初始化页面的时候也要操作下scrollCallback
	    scrollCallback();

	    $("*").on("DOMNodeInserted", function () {
	      allHeight = $(document).height() - $(window).height();
	    })
	  }
	  var allHeight, lastY = window.scrollY;

	  function scrollCallback() {
	    allHeight = allHeight || $(document).height() - $(window).height();
	    var top = window.scrollY;
	    // 解决ios中下拉不跟随问题，只有ios中才window.scrollY才会小于0
	    if (top < 0) {
	      top0Container.css('position', 'absolute');
	    } else {
	      top0Container.css('position', 'fixed');
	    }

	    var bottom = allHeight - top;

	    //如果有限时购  也即是 首页
	    if (document.getElementById("ts_menu")) {
	        //限时购时间条 外固定
	        var objHeight = document.getElementById("ts_menu_wrap").offsetTop,
	        //猜你喜欢title 外固定
	        likeHeight = document.getElementById("tt_com_1_wrap").offsetTop,
	        obtop = objHeight - top,
	        liketop = likeHeight - top,
	        showheader = false; //出现顶部搜索条
	      if (top < 40 || bottom < 40) {
	        showHeader();
	        showheader = true;
	      } else if (top < lastY) {
	        showHeader();
	        showheader = true;
	      } else if (top > lastY) {
	        hideHeader();
	        showheader = false;
	      }
	      lastY = top;
	      var top_container = document.getElementById("top_container"),
	        ts_menu = document.getElementById("ts_menu"),
	        ts_menu_wrap = document.getElementById("ts_menu_wrap"),
	        v_menu = document.getElementById("v_menu"),
	        tt_com_1 = document.getElementById("tt_com_1"),
	        tt_com_1_wrap = document.getElementById("tt_com_1_wrap"),
	        comon = document.getElementById("comon");

	      if (0 < obtop) {
	        if (obtop <= 36) {
	          if (showheader) {
	            top_container.style.top = "0";
	            ts_menu.style.zIndex = "2";
	          } else {
	            // if(document.getElementById("ts_menu_wrap").innerHTML == ""){
	            //
	            // }else{
	              top_container.style.top = -(36 - obtop) + "px";
	            // }
	          }
	        }
	        if (obtop >= 44) {
	          if (showheader) {
	            if (document.getElementById("ts_menu_wrap").innerHTML == "") {
	              ts_menu_wrap.appendChild(ts_menu);
	              // v_menu.style.display = "block";
	              v_menu.style.visibility = "visible";
	              v_menu.style.marginTop= "0";
	              ts_menu.style.zIndex = "12";
	            }
	          }
	        }
	      } else {
	        top_container.appendChild(ts_menu);
	        // v_menu.style.display = "none";
	        v_menu.style.visibility = "hidden";
	        v_menu.style.marginTop = "-40px";
	        if (showheader) {

	        } else {
	          top_container.style.top = "0";
	        }
	      }
	      //猜你喜欢
	      if (liketop < 0) {
	        top_container.appendChild(tt_com_1);
	        ts_menu.style.display = "none";
	        tt_com_1.style.zIndex = "2";
	        comon.style.zIndex = "2";
	        if (showheader) {

	        } else {
	          top_container.style.top = "0";
	        }
	      } else {
	        //猜你喜欢是否悬浮
	        var tt_come_1_fixed = document.getElementById("tt_com_1_wrap").innerHTML == "";
	        if (liketop <= 50) {
	          if (showheader) {
	            top_container.style.top = "0";
	            if (tt_come_1_fixed) {
	              tt_com_1.style.zIndex = "2";
	              comon.style.zIndex = "2";
	            }
	          } else {
	            if (tt_come_1_fixed) {

	            } else {
	              top_container.style.top = -(50 - liketop) + "px";
	            }
	          }
	        }
	        if (liketop >= 44) {
	          if (showheader) {
	            if (tt_come_1_fixed) {
	              tt_com_1_wrap.appendChild(tt_com_1);
	              tt_com_1.style.zIndex = "13";
	              comon.style.zIndex = "13";
	              ts_menu.style.display = "block";
	            }
	          }
	        }
	        if (liketop >= 94) {
	          tt_com_1.style.zIndex = "2";
	          comon.style.zIndex = "2";
	        }
	      }

	    } else {
	      //其他二极管页面
	      if (top < 40 || bottom < 40) {
	        showHeader();
	      } else if (top < lastY) {
	        showHeader();
	      } else if (top > lastY) {
	        hideHeader();
	      }
	      lastY = top;
	    }
	  }


	  function showHeader() {
	    if (top0Container.hasClass("top_show") || top0Container.hasClass("animate")) {
	      return false;
	    }
	    if (top0Container.hasClass("top_hide")) {
	      top0Container.removeClass("top_hide").addClass("top_show").addClass("animate");
	      //商品详情页及文章详情未开店用户提示开店
	      if ($(".kd_prompt_con").length) {
	        $(".kd_prompt_con").css("top", "40px")
	      }
	      setTimeout(function () {
	        top0Container.removeClass("animate");
	      }, 200)
	    }

	  }

	  function hideHeader() {
	    if (top0Container.hasClass("top_hide") || top0Container.hasClass("animate")) {
	      return false;
	    }
	    top0Container.addClass("top_hide").removeClass("top_show").addClass("animate");
	    //商品详情页及文章详情未开店用户提示开店
	    if ($(".kd_prompt_con").length) {
	      $(".kd_prompt_con").css("top", "0px")
	    }
	    setTimeout(function () {
	      top0Container.removeClass("animate");
	    }, 200)
	  }


	  function isWechat() {

	    var ua = window.navigator.userAgent.toLowerCase();
	    if (ua.match(/MicroMessenger/i) == "micromessenger") {
	      return true;
	    } else {
	      return false;
	    }
	  }


	  var h = window.screen.availHeight;
	  if ($(".search_result").length) {
	    $(".search_result").css("height", h + "px");

	    // $(".search_input").click(add);


	    function add() {
	      $(".dav-buyer-bottom").addClass("hide");
	      $(".search_result").removeClass('hide');
	      $(".top_container").addClass("active");
	      $(".top0").addClass("fixed");
	      $(".fuck_SB").addClass("hide");
	      if (isWechat() && !$(".top0").hasClass("animating")) {
	        $(".top0").addClass('animating').addClass('firsting').delay(4500).removeClass('animating');
	        $(".top_fix").css('height', "45px").delay(4500).animate({"height": "0px"}, 250);
	        $(".search_result").css("top", "45px").delay(4500).animate({"top": "0px"}, 250);
	      }
	    }

	    $(".search_input").focus(add);

	    $(".cancel").click(function () {
	      $(".fuck_SB").removeClass("hide");
	      $(".search_result").addClass('hide');
	      $(".top_container").removeClass("active");
	      $(".top0").removeClass("fixed").removeClass("firsting");
	      setTimeout(function () {
	        $(".dav-buyer-bottom").removeClass("hide");
	      }, 1000);

	    });
	    $(".search_form").on("submit", function () {
	      if ($(".input_container").find("input").val() == "") {
	        bravetime.info("请输入商品名称");
	        return false;
	      } else {
	        return true;
	      }
	    });
	  }


	});





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

/***/ 95:
/***/ function(module, exports) {

	module.exports = $;

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
	  var id = "_v-3d91a158/com-maybeyoulike.vue"
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
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.clearfix:after {\n  content: '';\n  display: block;\n clear: both;\n}\n.no_more {\n  margin-bottom: 20px;\n}\n.good_list_2_row {\n  background: #f1f1f1;\n  padding: 10px 5px 0 5px;\n}\n.good_list_2_row .good_img_container {\n  padding: 0;\n  position: relative;\n  background-color: #fff;\n  min-height:145px;\n}\n.font-weight {\n  font-weight: 500;\n}\n.goods4_price_bar em {\n  font-style: normal;\n  font-size: 12px;\n  display: inline-block;\n  margin-right: 2px;\n}\n\n.good_list_2_row .good_item {\n  padding: 0 5px;\n  margin-bottom: 10px;\n  float: left;\n  width: 50%;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n}\n\n.good_list_2_row .good_item .good_img_container img {\n  border: none;\n}\n\n.good_con {\n  display: block;\n  background-color: #FFF;\n  padding: 10px;\n  padding-top: 0;\n  overflow: hidden;\n}\n\n.good_con .fz_14 {\n  font-size: 14px;\n}\n\n.good_con .fz_12 {\n  overflow: hidden;\n  height: 16px;\n  line-height: 16px;\n}\n\n.good_con .fz_12 .dav-color-price {\n  display: inline-block;\n}\n\n.good_con .nowPrice {\n  font-size: 16px;\n}\n\n.good_list_2_row .good_item .lable {\n  color: #FF4A7D;\n  font-size: 10px;\n  display: inline-block;\n  margin-left: 4px;\n  font-family: sans-serif;\n  background-color: #FFF;\n  float: right;\n   -webkit-box-sizing: border-box;\n  position: relative;\n  top: 7.89473%;\n  padding: 0 2px;\n  border: 1px solid #FF4A7D;\n  line-height: 15px;\n  border-radius: 4px;\n}\n\n.good_list_2_row .good_item .lable .border {\n   -webkit-transform: scale(0.5);\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  position: absolute;\n  border: 1px solid #FF4A7D;\n  top: -50%;\n  right: -50%;\n  bottom: -50%;\n  left: -50%;\n  border-radius: 7px;\n}\n\n.good_list_2_row .good_item .good_title {\n  margin-bottom: 4px;\n   -webkit-line-clamp: 2;\n  line-clamp: 2;\n  line-height: 19px;\n  font-size: 12px;\n  color: #333;\n  text-overflow: ellipsis;\n  white-space: pre-line;\n  height: 36px;\n  -webkit-box-orient: vertical;\n  display: -webkit-box;\n  overflow: hidden;\n  padding-top: 6px;\n}\n.dav-color-price {\n  color: #FF4A7D;\n}\n.goods4_price_bar {\n  overflow: hidden;\n  height: 19px;\n  width: 200%;\n  font-size: 14px;\n}\n.good_list_sell_out{\n  font-size: 15px;\n  color: #fff;\n  background-color: rgba(0,0,0,.7);\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  line-height: 60px;\n  top: 50%;\n  position: absolute;\n  z-index: 2;\n  margin-top: -30px;\n  left: 50%;\n  margin-left: -30px;\n  text-align: center;\n}\n.img_label{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n.img_container{\n  position: relative;\n}\n.vip_return{\n  line-height: 1;\n  font-size: 0;\n  color: #BF9D51;\n  padding-left: 4px;\n  position: relative;\n  display: inline-block;\n   -webkit-transform: scale(0.5);\n   -webkit-transform-origin: 0 60%;\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  -ms-transform-origin: 0 60%;\n      transform-origin: 0 60%;\n  vertical-align: middle;\n  margin-bottom: 4px;\n}\n.vip_return .vip_return_title{\n  font-size: 22px;\n}\n.vip_return .vip_return_f{\n  font-size: 18px;\n  padding: 0 2px 0 4px;\n}\n.vip_return .vip_return_price{\n  font-size: 24px;\n}\n@media screen and (max-width:374px){\n  .vip_return{\n    padding-left:0;\n    margin-bottom: 3px;\n  }\n  .vip_return .vip_return_title{\n    font-size: 20px;\n  }\n  .vip_return .vip_return_f{\n    font-size: 14px;\n    padding: 0 2px 0 4px;\n  }\n  .vip_return .vip_return_price{\n    font-size: 20px;\n  }\n}\n\n.logo_left {\n  display                 : inline-block;\n  width                   : 162px;\n  height                  : 39px;\n  background-size         : 100%;\n  background-image        : url(data:image/png;base64,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);\n}\n\n@-webkit-keyframes plus {\n  0% {\n    -webkit-transform : rotate(0deg);\n    transform         : rotate(0deg);\n  }\n  50% {\n    -webkit-transform : rotate(360deg);\n    transform         : rotate(360deg);\n  }\n  100% {\n    -webkit-transform : rotate(360deg);\n    transform         : rotate(360deg);\n  }\n}\n\n@keyframes plus {\n  0% {\n    -webkit-transform : rotate(0deg);\n    transform         : rotate(0deg);\n  }\n  50% {\n    -webkit-transform : rotate(360deg);\n    transform         : rotate(360deg);\n  }\n  100% {\n    -webkit-transform : rotate(360deg);\n    transform         : rotate(360deg);\n  }\n}\n\n.logo_right {\n  display                 : inline-block;\n  width                   : 39px;\n  height                  : 39px;\n  -webkit-animation       : plus 2s linear 0s infinite;;\n  animation               : plus 2s linear 0s infinite;\n  background-size         : 100%;\n  background-image        : url(data:image/png;base64,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);\n}\n.logo_container {\n  margin-top : 20px;\n  width      : 100%;\n  text-align : center;\n  max-width  : 640px;\n}\n\n.good_list_2_row .column3Con {\n  padding-bottom: 0;\n}\n.good_list_2_row .column3 {\n  width: 33.3%;\n}\n.good_list_2_row .column3Cont {\n  height: auto;\n}\n.good_list_2_row .column3Price {\n  display: block;\n  width: 50%;\n  text-align: center;\n}\n.good_list_2_row .column3VipReturn {\n  display: block;\n  text-align: center;\n}\n", ""]);

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
	  //     background-image        : url(data:image/png;base64,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);
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
	  //     background-image        : url(data:image/png;base64,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);
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

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Vue-Lazyload.js v1.0.5
	 * (c) 2017 Awe <hilongjw@gmail.com>
	 * Released under the MIT License.
	 */
	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.VueLazyload=t()}(this,function(){"use strict";function e(e,t){if(e.length){var n=e.indexOf(t);return n>-1?e.splice(n,1):void 0}}function t(e,t){if(!e||!t)return e||{};if(e instanceof Object)for(var n in t)e[n]=t[n];return e}function n(e,t){for(var n=!1,i=0,r=e.length;i<r;i++)if(t(e[i])){n=!0;break}return n}function i(e,t){if("IMG"===e.tagName&&e.getAttribute("data-srcset")){var n=e.getAttribute("data-srcset"),i=[],r=e.parentNode,o=r.offsetWidth*t,a=void 0,s=void 0,u=void 0;n=n.trim().split(","),n.map(function(e){e=e.trim(),a=e.lastIndexOf(" "),a===-1?(s=e,u=999998):(s=e.substr(0,a),u=parseInt(e.substr(a+1,e.length-a-2),10)),i.push([u,s])}),i.sort(function(e,t){if(e[0]<t[0])return-1;if(e[0]>t[0])return 1;if(e[0]===t[0]){if(t[1].indexOf(".webp",t[1].length-5)!==-1)return 1;if(e[1].indexOf(".webp",e[1].length-5)!==-1)return-1}return 0});for(var d="",l=void 0,c=i.length,h=0;h<c;h++)if(l=i[h],l[0]>=o){d=l[1];break}return d}}function r(e,t){for(var n=void 0,i=0,r=e.length;i<r;i++)if(t(e[i])){n=e[i];break}return n}function o(){if(!f)return!1;var e=!0,t=document;try{var n=t.createElement("object");n.type="image/webp",n.style.visibility="hidden",n.innerHTML="!",t.body.appendChild(n),e=!n.offsetWidth,t.body.removeChild(n)}catch(t){e=!1}return e}function a(e,t){var n=null,i=0;return function(){if(!n){var r=Date.now()-i,o=this,a=arguments,s=function(){i=Date.now(),n=!1,e.apply(o,a)};r>=t?s():n=setTimeout(s,t)}}}function s(){if(f){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",null,t)}catch(e){}return e}}function u(e){return null!==e&&"object"===("undefined"==typeof e?"undefined":l(e))}function d(e){if(!(e instanceof Object))return[];if(Object.keys)return Object.keys(e);var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},c=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},h=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),f="undefined"!=typeof window,p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return f&&window.devicePixelRatio||e},v=s(),y={on:function(e,t,n){v?e.addEventListener(t,n,{passive:!0}):e.addEventListener(t,n,!1)},off:function(e,t,n){e.removeEventListener(t,n)}},g=function(e,t,n){var i=new Image;i.src=e.src,i.onload=function(){t({naturalHeight:i.naturalHeight,naturalWidth:i.naturalWidth,src:i.src})},i.onerror=function(e){n(e)}},m=function(e,t){return"undefined"!=typeof getComputedStyle?getComputedStyle(e,null).getPropertyValue(t):e.style[t]},b=function(e){return m(e,"overflow")+m(e,"overflow-y")+m(e,"overflow-x")},L=function(e){if(f){if(!(e instanceof HTMLElement))return window;for(var t=e;t&&t!==document.body&&t!==document.documentElement&&t.parentNode;){if(/(scroll|auto)/.test(b(t)))return t;t=t.parentNode}return window}},w={},k=function(){function e(t){var n=t.el,i=t.src,r=t.error,o=t.loading,a=t.bindType,s=t.$parent,u=t.options,d=t.elRenderer;c(this,e),this.el=n,this.src=i,this.error=r,this.loading=o,this.bindType=a,this.attempt=0,this.naturalHeight=0,this.naturalWidth=0,this.options=u,this.filter(),this.initState(),this.performanceData={init:Date.now(),loadStart:null,loadEnd:null},this.rect=n.getBoundingClientRect(),this.$parent=s,this.elRenderer=d,this.render("loading",!1)}return h(e,[{key:"initState",value:function(){this.state={error:!1,loaded:!1,rendered:!1}}},{key:"record",value:function(e){this.performanceData[e]=Date.now()}},{key:"update",value:function(e){var t=e.src,n=e.loading,i=e.error,r=this.src;this.src=t,this.loading=n,this.error=i,this.filter(),r!==this.src&&(this.attempt=0,this.initState())}},{key:"getRect",value:function(){this.rect=this.el.getBoundingClientRect()}},{key:"checkInView",value:function(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad&&this.rect.right>0}},{key:"filter",value:function(){var e=this;d(this.options.filter).map(function(t){e.options.filter[t](e,e.options)})}},{key:"renderLoading",value:function(e){var t=this;g({src:this.loading},function(n){t.render("loading",!1),e()})}},{key:"load",value:function(){var e=this;return this.attempt>this.options.attempt-1&&this.state.error?void(this.options.silent||console.log("error end")):this.state.loaded||w[this.src]?this.render("loaded",!0):void this.renderLoading(function(){e.attempt++,e.record("loadStart"),g({src:e.src},function(t){e.naturalHeight=t.naturalHeight,e.naturalWidth=t.naturalWidth,e.state.loaded=!0,e.state.error=!1,e.record("loadEnd"),e.render("loaded",!1),w[e.src]=1},function(t){e.state.error=!0,e.state.loaded=!1,e.render("error",!1)})})}},{key:"render",value:function(e,t){this.elRenderer(this,e,t)}},{key:"performance",value:function(){var e="loading",t=0;return this.state.loaded&&(e="loaded",t=(this.performanceData.loadEnd-this.performanceData.loadStart)/1e3),this.state.error&&(e="error"),{src:this.src,state:e,time:t}}},{key:"destroy",value:function(){this.el=null,this.src=null,this.error=null,this.loading=null,this.bindType=null,this.attempt=0}}]),e}(),A="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",E=["scroll","wheel","mousewheel","resize","animationend","transitionend","touchmove"],T=function(s){return function(){function d(e){var t=this,n=e.preLoad,i=e.error,r=e.preLoadTop,s=e.dispatchEvent,u=e.loading,l=e.attempt,h=e.silent,f=e.scale,v=e.listenEvents,y=(e.hasbind,e.filter),g=e.adapter;c(this,d),this.version="1.0.5",this.ListenerQueue=[],this.TargetIndex=0,this.TargetQueue=[],this.options={silent:h||!0,dispatchEvent:!!s,preLoad:n||1.3,preLoadTop:r||0,error:i||A,loading:u||A,attempt:l||3,scale:f||p(f),ListenEvents:v||E,hasbind:!1,supportWebp:o(),filter:y||{},adapter:g||{}},this._initEvent(),this.lazyLoadHandler=a(function(){var e=!1;t.ListenerQueue.forEach(function(t){t.state.loaded||(e=t.checkInView(),e&&t.load())})},200)}return h(d,[{key:"config",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this.options,e)}},{key:"performance",value:function(){var e=[];return this.ListenerQueue.map(function(t){e.push(t.performance())}),e}},{key:"addLazyBox",value:function(e){this.ListenerQueue.push(e),f&&(this._addListenerTarget(window),e.$el&&e.$el.parentNode&&this._addListenerTarget(e.$el.parentNode))}},{key:"add",value:function(e,t,r){var o=this;if(n(this.ListenerQueue,function(t){return t.el===e}))return this.update(e,t),s.nextTick(this.lazyLoadHandler);var a=this._valueFormatter(t.value),u=a.src,d=a.loading,l=a.error;s.nextTick(function(){u=i(e,o.options.scale)||u;var n=Object.keys(t.modifiers)[0],a=void 0;n&&(a=r.context.$refs[n],a=a?a.$el||a:document.getElementById(n)),a||(a=L(e));var c=new k({bindType:t.arg,$parent:a,el:e,loading:d,error:l,src:u,elRenderer:o._elRenderer.bind(o),options:o.options});o.ListenerQueue.push(c),f&&(o._addListenerTarget(window),o._addListenerTarget(a)),o.lazyLoadHandler(),s.nextTick(function(){return o.lazyLoadHandler()})})}},{key:"update",value:function(e,t){var n=this,i=this._valueFormatter(t.value),o=i.src,a=i.loading,u=i.error,d=r(this.ListenerQueue,function(t){return t.el===e});d&&d.update({src:o,loading:a,error:u}),this.lazyLoadHandler(),s.nextTick(function(){return n.lazyLoadHandler()})}},{key:"remove",value:function(t){if(t){var n=r(this.ListenerQueue,function(e){return e.el===t});n&&(this._removeListenerTarget(n.$parent),this._removeListenerTarget(window),e(this.ListenerQueue,n)&&n.destroy())}}},{key:"removeComponent",value:function(t){t&&(e(this.ListenerQueue,t),t.$parent&&t.$el.parentNode&&this._removeListenerTarget(t.$el.parentNode),this._removeListenerTarget(window))}},{key:"_addListenerTarget",value:function(e){if(e){var t=r(this.TargetQueue,function(t){return t.el===e});return t?t.childrenCount++:(t={el:e,id:++this.TargetIndex,childrenCount:1,listened:!0},this._initListen(t.el,!0),this.TargetQueue.push(t)),this.TargetIndex}}},{key:"_removeListenerTarget",value:function(e){var t=this;this.TargetQueue.forEach(function(n,i){n.el===e&&(n.childrenCount--,n.childrenCount||(t._initListen(n.el,!1),t.TargetQueue.splice(i,1),n=null))})}},{key:"_initListen",value:function(e,t){var n=this;this.options.ListenEvents.forEach(function(i){return y[t?"on":"off"](e,i,n.lazyLoadHandler)})}},{key:"_initEvent",value:function(){var t=this;this.Event={listeners:{loading:[],loaded:[],error:[]}},this.$on=function(e,n){t.Event.listeners[e].push(n)},this.$once=function(e,n){function i(){r.$off(e,i),n.apply(r,arguments)}var r=t;t.$on(e,i)},this.$off=function(n,i){return i?void e(t.Event.listeners[n],i):void(t.Event.listeners[n]=[])},this.$emit=function(e,n,i){t.Event.listeners[e].forEach(function(e){return e(n,i)})}}},{key:"_elRenderer",value:function(e,t,n){if(e.el){var i=e.el,r=e.bindType,o=void 0;switch(t){case"loading":o=e.loading;break;case"error":o=e.error;break;default:o=e.src}if(r?i.style[r]="url("+o+")":i.getAttribute("src")!==o&&i.setAttribute("src",o),i.setAttribute("lazy",t),this.$emit(t,e,n),this.options.adapter[t]&&this.options.adapter[t](e,this.options),this.options.dispatchEvent){var a=new CustomEvent(t,{detail:e});i.dispatchEvent(a)}}}},{key:"_valueFormatter",value:function(e){var t=e,n=this.options.loading,i=this.options.error;return u(e)&&(e.src||this.options.silent||console.error("Vue Lazyload warning: miss src with "+e),t=e.src,n=e.loading||this.options.loading,i=e.error||this.options.error),{src:t,loading:n,error:i}}}]),d}()},_=function(e){return{props:{tag:{type:String,default:"div"}},render:function(e){return this.show===!1?e(this.tag):e(this.tag,null,this.$slots.default)},data:function(){return{state:{loaded:!1},rect:{},show:!1}},mounted:function(){e.addLazyBox(this),e.lazyLoadHandler()},beforeDestroy:function(){e.removeComponent(this)},methods:{getRect:function(){this.rect=this.$el.getBoundingClientRect()},checkInView:function(){return this.getRect(),f&&this.rect.top<window.innerHeight*e.options.preLoad&&this.rect.bottom>0&&this.rect.left<window.innerWidth*e.options.preLoad&&this.rect.right>0},load:function(){this.show=!0,this.state.loaded=!0,this.$emit("show",this)}}}},$={install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=T(e),r=new i(n),o="2"===e.version.split(".")[0];e.prototype.$Lazyload=r,n.lazyComponent&&e.component("lazy-component",_(r)),o?e.directive("lazy",{bind:r.add.bind(r),update:r.update.bind(r),componentUpdated:r.lazyLoadHandler.bind(r),unbind:r.remove.bind(r)}):e.directive("lazy",{bind:r.lazyLoadHandler.bind(r),update:function(e,n){t(this.vm.$refs,this.vm.$els),r.add(this.el,{modifiers:this.modifiers||{},arg:this.arg,value:e,oldValue:n},{context:this.vm})},unbind:function(){r.remove(this.el)}})}};return $});

/***/ },

/***/ 419:
/***/ function(module, exports) {

	/*
	 * 统计页面
	 */

	"use strict";
	// function statistics (obj, callback) {
	//   var host = '/appapi'
	//   var feedList = JSON.parse(localStorage.getItem('feedList'))
	//   var listData = {
	//     "ip": "",                             //ip
	//     "nxtime": "",                               //ng时间
	//     "timestamp": new Date().getTime(),                      //日志时间
	//     "production": '8',                         //业务线 数据字典稍后定
	//     "log_source": '1',                         //日志来源 数据字典稍后定
	//     "user_agent": navigator.userAgent,                     //浏览器UA
	//     "market": "",                         //来源市场
	//     "uid": parseInt(feedList.sess_key.substring(feedList.sess_key.length-8,feedList.sess_key.length-1), 10).toString(),      //用户id
	//     "session": feedList.sess_key.substring(0,feedList.sess_key.length-8),                        //session id
	//     "status": feedList.visitor_status,                             //卖家状态 (0：游客 1:买家 3:卖家)
	//     "device": "",                         //设备类型
	//     "device_id": "",                      //设备号
	//     "sys_version": "",                    //设备版本号
	//     "resolution": window.screen.width + '*' + window.screen.height,      //分辨率
	//     "location": "",                       //当前位置
	//     "app_version": feedList.data_version || "",                    //APP版本号
	//     "action": '2',                             //操作action 数据字典稍后定，click，view，
	//     "action_type": "2",                    //操作类型（元素）
	//     "object_id": obj.objectId || "",                      //操作对象id（url）
	//     "production_data": {                     //详细信息
	//       "action": '2',                              //1：点击
	//       "action_type": "2",                       //1：模板
	//       "object_id": window.tj_id+"" || "",
	//       "share_type": obj.shareType
	//     }
	//   }
	//   try{
	//     $.ajax({
	//       url:host,
	//         type:"post",
	//         data:JSON.stringify(listData),
	//         success:function (result) {
	//         if(result=="success_1"){
	//             callback&&callback()
	//         }
	//         },error:function () {
	            
	//         }
	//     });
	//   }catch (e){
	//       console.error(e);
	//   }
	// }
	// window.tlShareCallback = function(){
	//     statistics({shareType:1})
	//     $.post('/index.php?c=class&a=ajax_share&id=' + window.page_id,{},function(){
	//        var share_num = parseInt($(".share-num").html());
	//        share_num = share_num + 1;
	//        $(".share-num").html(share_num);
	//    });
	// }
	// window.sendShareCallback = function () {
	//     statistics({shareType:2})
	//     $.post('/index.php?c=class&a=ajax_share&id=' + window.page_id,{},function(){
	//        var share_num = parseInt($(".share-num").html());
	//        share_num = share_num + 1;
	//        $(".share-num").html(share_num);
	//     });
	// }
	// window.QQShareCallback = function () {
	//     statistics({shareType:4})
	//     $.post('/index.php?c=class&a=ajax_share&id=' + window.page_id,{},function(){
	//        var share_num = parseInt($(".share-num").html());
	//        share_num = share_num + 1;
	//        $(".share-num").html(share_num);
	//     });
	// }
	// window.weiboShareCallback = function () {
	//     statistics({shareType:7})
	// }
	var _slicedToArray = (function () {
	    function sliceIterator(arr, i) {
	        var _arr = [];
	        var _n = true;
	        var _d = false;
	        var _e = undefined;
	        try {
	            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	                _arr.push(_s.value);
	                if (i && _arr.length === i) break;
	            }
	        } catch (err) {
	            _d = true;
	            _e = err;
	        } finally {
	            try {
	                if (!_n && _i["return"]) _i["return"]();
	            } finally {
	                if (_d) throw _e;
	            }
	        }
	        return _arr;
	    }

	    return function (arr, i) {
	        if (Array.isArray(arr)) {
	            return arr;
	        } else if (Symbol.iterator in Object(arr)) {
	            return sliceIterator(arr, i);
	        } else {
	            throw new TypeError("Invalid attempt to destructure non-iterable instance");
	        }
	    };
	})();

	(function () {

	    if (window["dav-tj"]) {
	        return false;
	    }

	    window["dav-tj"] = true;

	    var delayTime = 150; // 延迟等待时间
	    var cnzz = window.cnzz && false; // 是否使用cnzz
	    var baidu = window.baidu && true; // 是否使用百度统计
	    var google = window.google && true; // 是否使用google统计
	    var dvd_tj = window.dvd_tj && true; // 是否使用dvd统计

	    init();

	    /**
	     * 初始化统计
	     */
	    function init() {
	        initCode();

	        if (cnzz || baidu || google || dvd_tj) {
	            getEvent();
	            pvSend();
	            jqSend();
	            wxShare();
	        }
	    }

	    /**
	     * 统计代码
	     */
	    function initCode() {
	    }

	    /**
	     * 获取埋点事件
	     */
	    function getEvent() {
	        window.jQuery && $(document).on("click", "[data-dav-tj]", clickAnalysis);
	    }

	    /**
	     * 微信分享统计
	     */
	    function wxShare() {
	        var path = window["tj_path"] || "other_path";

	        var list = ['tl', 'send', 'QQ', 'qZone'];

	        for (var i = 0; i < list.length; i++) {
	            (function () {
	                var name = list[i];
	                if (window[name + 'ShareCallback']) {
	                    window['s_' + name + 'ShareCallback'] = window[name + 'ShareCallback'];
	                }
	                window[name + 'ShareCallback'] = function () {
	                    eventSend({
	                        category: path,
	                        action: 'share_to_' + name,
	                        label: "share_to_" + name + "_success",
	                        value: 1
	                    });
	                    window['s_' + name + 'ShareCallback']&&window['s_' + name + 'ShareCallback']();
	                };

	                if (window[name + 'ShareCallbackCancel']) {
	                    window['s_' + name + 'ShareCallbackCancel'] = window[name + 'ShareCallbackCancel'];
	                }
	                window[name + 'ShareCallbackCancel'] = function () {
	                    eventSend({
	                        category: path,
	                        action: 'share_to_' + name,
	                        label: "share_to_" + name + "_cancel",
	                        value: 1
	                    });
	                    window['s_' + name + 'ShareCallbackCancel']&&window['s_' + name + 'ShareCallbackCancel']();
	                };
	            })();


	        }
	    }

	    /**
	     * 点击统计
	     */
	    function clickAnalysis(event) {
	        var me = this,
	            $el = $(me);

	        // a标签单独处理，先阻止跳转，过段时间再跳转
	        if (me["tagName"] === "A") {
	            var href = $el.attr("href");
	            if (href) {
	                setTimeout(function () {
	                    if (href.indexOf("javascript:") == 0) {
	                        eval(href.replace("javascript:", ""));
	                    } else {
	                        bravetime.goto(href);
	                    }
	                }, delayTime);
	            }
	            event.preventDefault();
	        }

	        var tjData = $el.attr("data-dav-tj") || "";
	        var data = tjData.split("|");

	        var _data = _slicedToArray(data, 5);

	        var _data$0 = _data[0];
	        var category = _data$0 === undefined ? "默认分类" : _data$0;
	        var _data$1 = _data[1];
	        var action = _data$1 === undefined ? "默认行为" : _data$1;
	        var label = _data[2];
	        var value = _data[3];
	        var nodeid = _data[4];

	        eventSend({category: category, action: action, label: label, value: value, nodeid: nodeid});
	    }

	    /**
	     * 事件发送
	     * @param event
	     */
	    function eventSend(event) {
	        var category = event.category;
	        var action = event.action;
	        var label = event.label;
	        var value = event.value;
	        var nodeid = event.nodeid;

	        if (dvd_tj) {
	            setHttp(1, category, action + "@" + category, label + "@" + category);
	        }

	        if (cnzz && window["_czc"]) {
	            _czc.push(["_trackEvent", category, action, label, value, nodeid]);
	        }
	        if (baidu && window["_hmt"]) {
	            _hmt.push(["_trackEvent", category, action + "@" + category, label + "@" + category, value]);
	        }
	        if(google && window.ga){
	            ga('send', 'event', category, action, label);
	        }

	    }

	    /**
	     * pv统计
	     */
	    function pvSend() {
	        var path = arguments[0] === undefined ? window["tj_path"] || "other_path" : arguments[0];
	        var path_detail = arguments[1] === undefined ? window["tj_path_detail"] || path : arguments[1];
	        var shop_name = location.href.split("//")[1].split("/")[0].split(".")[0];

	        if (dvd_tj) {
	            setHttp(2, path, path_detail, shop_name);
	        }

	        if (baidu && window["_hmt"]) {
	            _hmt.push(["_trackPageview", "/" + path]);
	        }

	        if (google){
	            ga('set', 'page', '/'+path);
	            ga('send', 'pageview', '/'+path);
	        }

	    }

	    /**
	     * jquery 统计
	     */
	    function jqSend() {
	        eventSend({
	            category: window.tj_path || "other_path",
	            action: "jquery_tj",
	            label: "jquery_" + (window.jQuery ? "ok" : "error"),
	            value: 1
	        });
	    }

	    /**
	     * 发送请求
	     * @param type
	     * @param a
	     * @param b
	     * @param c
	     */
	    function setHttp(type, a, b, c) {
	        var httpUrl = "//tj.davdian.com/tj.gif?t=" + type + "&a=" + a + "&b=" + b + "&c=" + c + "&tt=" + (Date.now() + Math.random());
	        var img = document.createElement('img');
	        document.body.appendChild(img);
	        img.style.display = "none";
	        img.src = httpUrl;
	    }

	    window.bravetime = window.bravetime || {};
	    window.bravetime.tj = {pvSend: pvSend, evSend: eventSend};
	})();



/***/ },

/***/ 451:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

	var title = __webpack_require__(454);
	var kindsort = __webpack_require__(459);
	var dvdBottom = __webpack_require__(462);
	var  VueLazyload = __webpack_require__(418);
	Vue.use(VueLazyload, {
	  try: 3,
	  preload:2,
	});
	new Vue({
	    el: "#cat",
	    data:function(){
	        return{
	            msg:'hello vue'
	        }
	    },
	    components:{
	        dvdBottom:dvdBottom,
	        title:title,
	        kindsort:kindsort
	    }
	});


/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(455)
	__vue_script__ = __webpack_require__(457)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/title.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(458)
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
	  var id = "_v-651911dc/title.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(456);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./title.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./title.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n.in_app .top_container{\n    display: none;\n}\n", ""]);

	// exports


/***/ },

/***/ 457:
/***/ function(module, exports) {

	"use strict";

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
	//             <div class="top_right">
	//                 <a href="/" class="top_home" data-dav-tj="order_list|home|home|1|home@order_list">
	//                     <span class="home_icon"></span>
	//                 </a>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            title: document.title
	        };
	    }
	    // </script>

	};

/***/ },

/***/ 458:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n<div class=\"top0\">\n    <div class=\"top_container\">\n        <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->\n        <div class=\"top_left\">\n            <a class=\"top_back\" href=\"javascript:history.back();\" data-dav-tj=\"order_list|back|back|1|back@order_list\">\n                <span class=\"home_arrow\"></span>\n            </a>\n        </div>\n        <div class=\"title_container\">\n            {{title}}\n        </div>\n        <div class=\"top_right\">\n            <a href=\"/\" class=\"top_home\" data-dav-tj=\"order_list|home|home|1|home@order_list\">\n                <span class=\"home_icon\"></span>\n            </a>\n        </div>\n    </div>\n</div>\n";

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(460)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/kindsort.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(461)
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
	  var id = "_v-047f3768/kindsort.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="kind_sort">
	//         <a :class="{'selected':selected==1}" href="javascript:void(0)" @click = "a"><span>新品</span></a><a :class="{'selected':selected==2}" href="javascript:void(0)" @click = "b"><span>销量</span></a><a class="price" :class="{'selected':selected==3}" href="javascript:void(0)" @click = "c"><span>价格</span></a>
	//     </div>
	//     <!--<categorys :referer="referer"></categorys>-->
	//     <categorys :referer="referer"></categorys>
	// </template>
	//
	//
	//
	// <script>
	//    var categorys = require("../module/new_category.vue");
	var categorys = __webpack_require__(150);
	exports.default = {
	    data: function data() {
	        return {
	            selected: 0,
	            even: '',
	            currentType: +location.href.substr(location.href.indexOf("sort=") + 5, 1) || 0,
	            current: false,
	            list: [],
	            no_more: false,
	            ajaxing: true,
	            loading: false,
	            url: "",
	            pageSize: syncPageSize,
	            page: "",
	            allData: [[], [], []],
	            typePage: [1, 1, 1],
	            anymore: [{ flag: false }, { flag: false }, { flag: false }], // 下拉刷新标识
	            referer: {}
	        };
	    },
	    components: {
	        categorys: categorys
	    },

	    created: function created() {
	        var scope = this;
	        var ua = navigator.userAgent.toLowerCase();
	        if (!isPrivateMode) {
	            //浏览器中能存储session storage
	            var patharr = JSON.parse(sessionStorage.history); //获取路径path
	            if (patharr.length > 2) {
	                //从标签页直接进入也会发出请求
	                var lastPath = patharr[patharr.length - 2].path;
	                if (lastPath == 'detail') {
	                    //判断是否是浏览器上的返回键回到这个页面
	                    this.selected = sessionStorage.getItem('goodSelected');
	                    this.allData = eval(sessionStorage.getItem('gooddata')); //获取session的数据
	                    this.typePage = JSON.parse(sessionStorage.getItem('goodTypePage'));
	                    if (eval(sessionStorage.getItem('good_no_more')) != undefined) {
	                        this.anymore = eval(sessionStorage.getItem('good_no_more'));
	                    };
	                    this.list = this.allData[this.selected - 1];
	                    scope.current = true;
	                    if (/iphone|ipad|ipod/.test(ua)) {
	                        setTimeout(function () {
	                            document.body.scrollTop = eval(sessionStorage.getItem('goodTop'));
	                        }, 0);
	                    }
	                    this.referer = JSON.parse(sessionStorage.getItem("categoryReferer"));
	                } else {
	                    // 清空数据
	                    sessionStorage.removeItem("gooddata");
	                    sessionStorage.removeItem("goodTypePage");
	                    sessionStorage.removeItem("good_no_more");
	                    sessionStorage.removeItem("goodSelected");
	                    sessionStorage.removeItem("categoryReferer");
	                }
	            }
	        };
	        if (!scope.current) {
	            if (this.currentType == 2) {
	                this.b();
	            } else if (this.currentType == 3) {
	                this.c();
	            } else {
	                this.a();
	            }
	        };
	        this.scroll();
	    },
	    methods: { //点击不同的a标签，替换不同的ajax链接，刷新页面，但是浏览器上的返回不能返回上一个点击a标签的网页
	        a: function a() {
	            var vm = this;
	            vm.selected = 1;
	            var number = vm.selected - 1;
	            vm.even = vm.selected;
	            sessionStorage.setItem('goodSelected', vm.selected);
	            vm.no_more = vm.anymore[number].flag;
	            if (vm.allData[number].length == 0) {
	                vm.getData();
	            } else {
	                vm.list = vm.allData[number];
	            }
	        },
	        b: function b() {
	            var vm = this;
	            vm.selected = 2;
	            this.even = vm.selected;
	            var number = vm.selected - 1;
	            sessionStorage.setItem('goodSelected', vm.selected);
	            vm.no_more = vm.anymore[number].flag;
	            vm.ajaxing = true;
	            if (vm.allData[number].length == 0) {
	                vm.getData();
	            } else {
	                vm.list = vm.allData[number];
	            }
	        },
	        c: function c() {
	            var vm = this;
	            vm.selected = 3;
	            var number = vm.selected - 1;
	            this.even = vm.selected;
	            sessionStorage.setItem('goodSelected', vm.selected);
	            vm.no_more = vm.anymore[number].flag;
	            vm.ajaxing = true;
	            if (vm.allData[number].length == 0) {
	                vm.getData();
	            } else {
	                vm.list = vm.allData[number];
	            }
	        },
	        getData: function getData() {
	            var scope = this;
	            var currentType = scope.selected - 1;
	            if (scope.ajaxing) {
	                scope.ajaxing = false;
	                //请求数据
	                if (!scope.no_more) {
	                    scope.loading = true;
	                    $.ajax({
	                        url: goodsUrl,
	                        dataType: "json",
	                        data: {
	                            sort: scope.selected,
	                            _t: Date.now() + Math.random(),
	                            page_size: scope.pageSize,
	                            page: scope.typePage[currentType]
	                        },
	                        success: function success(result) {
	                            scope.loading = false;
	                            if (!result["error"]) {
	                                //返回数据没有问题
	                                scope.ajaxing = true;
	                                if (result["data"].length) {
	                                    //返回函数中有数据
	                                    scope.allData[currentType] = scope.allData[currentType].concat(result.data);
	                                    scope.list = scope.allData[currentType];
	                                    scope.typePage[currentType] = scope.typePage[currentType] + 1; //ajax中的参数中页数加1
	                                    scope.referer = result.referer;
	                                    sessionStorage.setItem('gooddata', JSON.stringify(scope.allData));
	                                    sessionStorage.setItem('goodTypePage', JSON.stringify(scope.typePage));
	                                    sessionStorage.setItem('categoryReferer', JSON.stringify(scope.referer));
	                                } else {
	                                    scope.no_more = true; //显示 没有更多商品了
	                                    scope.anymore[currentType] = true;
	                                    sessionStorage.setItem('good_no_more', JSON.stringify(scope.anymore));
	                                }
	                            }
	                        }, error: function error() {
	                            bravetime.ajaxError();
	                            scope.loading = false;
	                            scope.no_more = true;
	                            scope.ajaxing = true;
	                        }
	                    });
	                }
	            }
	        },
	        scroll: function scroll() {
	            var scope = this;
	            $(window).scroll(function () {
	                //滚动条滚动事件
	                if (window.disabledGoodsLoading) {
	                    return false;
	                }
	                var top = document.body.scrollTop;
	                sessionStorage.setItem('goodTop', top);
	                var offset = window.pageYOffset; //文档现在的位置加上窗口的高度
	                var offsetTop = document.body.scrollHeight; //整个页面的高度
	                if (offsetTop - offset - window.screen.availHeight < 100) {
	                    //如果滚动条到一定位置
	                    scope.getData();
	                }
	            });
	        },
	        change: function change() {
	            this.$broadcast('changeData', this.list);
	        },
	        loadings: function loadings() {
	            this.$broadcast('loadings', this.loading);
	        },
	        no_mores: function no_mores() {
	            this.$broadcast('no_mores', this.no_more);
	        }
	    },
	    watch: {
	        'list': 'change',
	        'loading': 'loadings',
	        'no_more': 'no_mores'
	    }
	    // </script>

	};

/***/ },

/***/ 461:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"kind_sort\">\n    <a :class=\"{'selected':selected==1}\" href=\"javascript:void(0)\" @click = \"a\"><span>新品</span></a><a :class=\"{'selected':selected==2}\" href=\"javascript:void(0)\" @click = \"b\"><span>销量</span></a><a class=\"price\" :class=\"{'selected':selected==3}\" href=\"javascript:void(0)\" @click = \"c\"><span>价格</span></a>\n</div>\n<!--<categorys :referer=\"referer\"></categorys>-->\n<categorys :referer=\"referer\"></categorys>\n";

/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(463)
	__vue_script__ = __webpack_require__(465)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/bottom.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(466)
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
	  var id = "_v-2df5153e/bottom.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 463:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(464);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./bottom.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./bottom.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.dav_icon_cart_44_40{\n    background-size: 24px;\n    background-image: url(\"//pic.davdian.com/free/new_shoppingCartBtm_0803.png\");\n}\n\n.dav_icon_cart_44_40.active{\n    background-size: 24px;\n    background-image: url(\"//pic.davdian.com/free/new_shoppingCartBtmActive_0803.png\");\n}\n.dav_icon_home_44_40{\n    background-size: 24px;\n    background-image: url(\"//pic.davdian.com/free/new_home_0803.png\");\n}\n.dav_icon_home_44_40.active{\n    background-size: 24px;\n    background-image: url(\"//pic.davdian.com/free/new_homeActive_0803.png\");\n}\n\n.dav_icon_me_44_40{\n    background-size: 24px;\n    background-image: url(\"//pic.davdian.com/free/new_mine_0803.png\");\n}\n\n.dav_icon_me_44_40.active{\n    background-size: 24px;\n    background-image: url(\"//pic.davdian.com/free/new_mineActive_0803.png\");\n}\n\n.dav_icon_search_44_40{\n    background-size: 22px;\n    margin-left: 2px;\n    margin-top: 1px;\n    background-image: url(\"//pic.davdian.com/free/2017/05/11/footer_course1.png\");\n}\n\n.dav_icon_search_44_40.active{\n    background-size: 22px;\n    margin-left: 2px;\n    margin-top: 1px;\n    background-image: url(\"//pic.davdian.com/free/2017/05/11/footer_course2.png\");\n}\n", ""]);

	// exports


/***/ },

/***/ 465:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="dav-buyer-bottom clearfix">
	//         <div class="bottom-menu">
	//             <a class="menu-item" :class="{'active':active==0}" :href="active==0?'javascript:void();':'./'" data-dav-tj="{{page}}|index|index|1|index@{{page}}">
	//                 <i class="icon dav_icon_home_44_40" :class="{'active':active==0}" ></i>
	//                 <div class="menu-text">首页</div>
	//             </a>
	//             <a class="menu-item" :class="{'active':active==1}" :href="active==1?'javascript:void();':'./course.html'" data-dav-tj="{{page}}|category_search|index|1|index@{{page}}">
	//                 <i class="icon dav_icon_search_44_40" :class="{'active':active==1}" ></i>
	//                 <div class="menu-text" style='margin-top:-1px'>学院</div>
	//             </a>
	//             <a class="menu-item" :class="{'active':active==2}" :href="active==2?'javascript:void();':'./cart.html'" data-dav-tj="{{page}}|cart|cart|1|cart@{{page}}">
	//                 <i class="icon dav_icon_cart_44_40" :class="{'active':active==2}" ></i>
	//                 <div class="menu-text">购物车</div>
	//                 <b v-if='cart' v-text="cart"></b>
	//             </a>
	//             <a class="menu-item" :class="{'active':active==3}" :href="active==3?'javascript:void();':'./center.html'" data-dav-tj="{{page}}|user|user|1|user@{{page}}">
	//                 <i class="icon dav_icon_me_44_40" :class="{'active':active==3}" ></i>
	//                 <div class="menu-text">我的</div>
	//             </a>
	//
	//         </div>
	//     </div>
	// </template>
	// <style>
	//     .dav_icon_cart_44_40{
	//         background-size: 24px;
	//         background-image: url("//pic.davdian.com/free/new_shoppingCartBtm_0803.png");
	//     }
	//
	//     .dav_icon_cart_44_40.active{
	//         background-size: 24px;
	//         background-image: url("//pic.davdian.com/free/new_shoppingCartBtmActive_0803.png");
	//     }
	//     .dav_icon_home_44_40{
	//         background-size: 24px;
	//         background-image: url("//pic.davdian.com/free/new_home_0803.png");
	//     }
	//     .dav_icon_home_44_40.active{
	//         background-size: 24px;
	//         background-image: url("//pic.davdian.com/free/new_homeActive_0803.png");
	//     }
	//
	//     .dav_icon_me_44_40{
	//         background-size: 24px;
	//         background-image: url("//pic.davdian.com/free/new_mine_0803.png");
	//     }
	//
	//     .dav_icon_me_44_40.active{
	//         background-size: 24px;
	//         background-image: url("//pic.davdian.com/free/new_mineActive_0803.png");
	//     }
	//
	//     .dav_icon_search_44_40{
	//         background-size: 22px;
	//         margin-left: 2px;
	//         margin-top: 1px;
	//         background-image: url("//pic.davdian.com/free/2017/05/11/footer_course1.png");
	//     }
	//
	//     .dav_icon_search_44_40.active{
	//         background-size: 22px;
	//         margin-left: 2px;
	//         margin-top: 1px;
	//         background-image: url("//pic.davdian.com/free/2017/05/11/footer_course2.png");
	//     }
	// </style>
	// <script>
	exports.default = {
	    props: {
	        active: 0,
	        cart: 0
	    },
	    data: function data() {
	        return {
	            msg: 'hello vue',
	            page: window.tj_path
	        };
	    },

	    components: {}
	    // </script>

	};

/***/ },

/***/ 466:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"dav-buyer-bottom clearfix\">\n    <div class=\"bottom-menu\">\n        <a class=\"menu-item\" :class=\"{'active':active==0}\" :href=\"active==0?'javascript:void();':'./'\" data-dav-tj=\"{{page}}|index|index|1|index@{{page}}\">\n            <i class=\"icon dav_icon_home_44_40\" :class=\"{'active':active==0}\" ></i>\n            <div class=\"menu-text\">首页</div>\n        </a>\n        <a class=\"menu-item\" :class=\"{'active':active==1}\" :href=\"active==1?'javascript:void();':'./course.html'\" data-dav-tj=\"{{page}}|category_search|index|1|index@{{page}}\">\n            <i class=\"icon dav_icon_search_44_40\" :class=\"{'active':active==1}\" ></i>\n            <div class=\"menu-text\" style='margin-top:-1px'>学院</div>\n        </a>\n        <a class=\"menu-item\" :class=\"{'active':active==2}\" :href=\"active==2?'javascript:void();':'./cart.html'\" data-dav-tj=\"{{page}}|cart|cart|1|cart@{{page}}\">\n            <i class=\"icon dav_icon_cart_44_40\" :class=\"{'active':active==2}\" ></i>\n            <div class=\"menu-text\">购物车</div>\n            <b v-if='cart' v-text=\"cart\"></b>\n        </a>\n        <a class=\"menu-item\" :class=\"{'active':active==3}\" :href=\"active==3?'javascript:void();':'./center.html'\" data-dav-tj=\"{{page}}|user|user|1|user@{{page}}\">\n            <i class=\"icon dav_icon_me_44_40\" :class=\"{'active':active==3}\" ></i>\n            <div class=\"menu-text\">我的</div>\n        </a>\n\n    </div>\n</div>\n";

/***/ }

/******/ });