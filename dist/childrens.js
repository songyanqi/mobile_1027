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

	/**
	 * Created by Murphy.lee on 17/5/13.
	 */
	__webpack_require__(43);
	__webpack_require__(42);
	__webpack_require__(482);






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
	  var id = "_v-1a34eddb/com-popup-toast.vue"
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
	  var id = "_v-993d82e0/com-popup-alert.vue"
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
	  var id = "_v-27dcda18/com-popup-confirm.vue"
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
	  var id = "_v-6c902120/com-popup-loading.vue"
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

/***/ 482:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Murphy.lee on 17/5/13.
	 */
	var childrens = __webpack_require__(483);
	new Vue({
	  el: "#container",
	  data:{

	  },
	  components:{
	    childrens:childrens
	  },
	  mounted:function () {

	  }
	});


/***/ },

/***/ 483:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(484)
	__vue_script__ = __webpack_require__(486)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/childrens.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(487)
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
	  var id = "_v-33c1cb03/childrens.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(485);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-33c1cb03&scoped=true!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./childrens.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-33c1cb03&scoped=true!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./childrens.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 485:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.flip-list1-move[_v-33c1cb03] {\n  -webkit-transition: -webkit-transform 1s;\n  transition: -webkit-transform 1s;\n  transition: transform 1s;\n  transition: transform 1s, -webkit-transform 1s;\n}\n\n.flip-list2-move[_v-33c1cb03] {\n  -webkit-transition: -webkit-transform .7s;\n  transition: -webkit-transform .7s;\n  transition: transform .7s;\n  transition: transform .7s, -webkit-transform .7s;\n}\n\n.flip-list3-move[_v-33c1cb03] {\n  -webkit-transition: -webkit-transform .4s;\n  transition: -webkit-transform .4s;\n  transition: transform .4s;\n  transition: transform .4s, -webkit-transform .4s;\n}\n\n.flip-list4-move[_v-33c1cb03] {\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\n\n.flip-list5-move[_v-33c1cb03] {\n  -webkit-transition: -webkit-transform .2s;\n  transition: -webkit-transform .2s;\n  transition: transform .2s;\n  transition: transform .2s, -webkit-transform .2s;\n}\n\n.card[_v-33c1cb03] {\n  float: left;\n  list-style: none;\n  width: 24.58%;\n  margin-left: 6.51%;\n}\n\n.card img[_v-33c1cb03] {\n  width: 100%;\n}\n\n.playchildren[_v-33c1cb03] {\n  width: 79.2%;\n  min-height: 300px;\n  overflow: hidden;\n  position: absolute;\n  margin: 0 auto;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  border-radius: 2%;\n}\n\n.playchildren ul[_v-33c1cb03] {\n  background-color: #ffc5bb;\n  overflow: hidden;\n  background-image: url(\"//pic.davdian.com/free/2017/05/15/c_bg.png\");\n  background-size: 100% 100%;\n  padding: 5% 0;\n}\n\n.playchildren ul li[_v-33c1cb03]:nth-of-type(1) {\n  margin-left: 19.9%\n}\n\n.playchildren ul li[_v-33c1cb03]:nth-of-type(2) {\n  margin-left: 11%\n}\n\n.play[_v-33c1cb03] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  z-index: 14;\n  height: 13.7%;\n}\n\n.title_bottom[_v-33c1cb03] {\n  width: 100%;\n  background-color: #b4bb4b;\n  overflow: hidden;\n  min-height: 10px;\n  position: relative;\n}\n\n.card_img[_v-33c1cb03] {\n  width: 100%;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  background-position: 0 0;\n  background-image: url(\"//pic.davdian.com/free/2017/05/15/doors.png\");\n}\n\n.card_img.card_img2[_v-33c1cb03] {\n  background-image: url(\"//pic.davdian.com/free/2017/05/15/doorsno.png\");\n}\n\n.card_img img[_v-33c1cb03] {\n  width: 100%;\n}\n\n.closes[_v-33c1cb03] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 20%;\n  height: 100%;\n  opacity: 0;\n}\n\n.tips[_v-33c1cb03] {\n  position: absolute;\n  width: 100%;\n  text-align: center;\n  color: #FFF;\n  font-size: 0.16rem;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.start_play[_v-33c1cb03] {\n  width: 30.26%;\n  position: absolute;\n  bottom: 3.36%;\n  -webkit-animation: myredshankss .3s infinite;\n  animation: myredshankss .3s infinite;\n  background-position: 0 0;\n  background-size: 100% 100%;\n}\n\n.start_play img[_v-33c1cb03] {\n  width: 100%;\n}\n\n@keyframes myredshankss {\n  from {\n    background-image: url(\"//pic.davdian.com/free/2017/05/17/shank1.png\");\n  }\n  to {\n    background-image: url(\"//pic.davdian.com/free/2017/05/17/shank2.png\");\n  }\n}\n\n@-webkit-keyframes myredshankss /* Safari 和 Chrome */\n{\n  from {\n    background-image: url(\"//pic.davdian.com/free/2017/05/17/shank1.png\");\n  }\n  to {\n    background-image: url(\"//pic.davdian.com/free/2017/05/17/shank2.png\");\n  }\n}\n\n.result_wrap[_v-33c1cb03] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.6);\n  bottom: 0;\n  z-index: 12;\n  max-width: 640px;\n  margin: auto;\n}\n\n.playchildren_wrap[_v-33c1cb03] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.6);\n  bottom: 0;\n  z-index: 12;\n  max-width: 640px;\n  margin: auto;\n}\n\n.result_in[_v-33c1cb03] {\n  width: 79.2%;\n  min-height: 50px;\n  overflow: hidden;\n  position: absolute;\n  margin: 0 auto;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  border-radius: 2%;\n}\n\n.tips_btn[_v-33c1cb03] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 10%;\n  margin: auto;\n  height: 15%;\n}\n\n.tips_btn2[_v-33c1cb03] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 8%;\n  margin: auto;\n  width: 46%;\n}\n\n.get_continue[_v-33c1cb03] {\n  position: absolute;\n  height: 13%;\n  z-index: 9999;\n  bottom: 4%;\n  left: 0;\n  background-size: auto 100%;\n  background-repeat: no-repeat;\n  background-position: center 0;\n  right: 0;\n  margin: auto;\n  background-image: url(\"//pic.davdian.com/free/2017/05/18/cont.png\");\n}\n\n.get_continue.over[_v-33c1cb03] {\n  background-image: url(\"//pic.davdian.com/free/2017/05/18/Ikonw.png\");\n}\n\n.red_desc[_v-33c1cb03] {\n  position: absolute;\n  width: 67%;\n  height: 22%;\n  z-index: 9999;\n  bottom: 25%;\n  left: 0;\n  right: 0;\n  margin: auto;\n  color: #FFF;\n  font-weight: 200;\n}\n\n.red_desc > div[_v-33c1cb03]:nth-of-type(1) {\n  width: 25%;\n  height: 100%;\n  float: left;\n  position: relative;\n}\n\n.red_desc > div:nth-of-type(1) > div[_v-33c1cb03] {\n  text-align: center;\n  font-size: 0.25rem;\n  height: 0.25rem;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  margin: auto;\n}\n\n.red_desc em[_v-33c1cb03] {\n  font-style: normal;\n  font-size: 0.12rem;\n  font-weight: 100;\n}\n\n.red_desc > div[_v-33c1cb03]:nth-of-type(2) {\n  width: 73%;\n  height: 80%;\n  float: left;\n  font-size: 0.12rem;\n  line-height: 0.17rem;\n  margin-top: 4%;\n  margin-left: 2%;\n}\n\n.mian_bg[_v-33c1cb03] {\n  position: relative;\n}\n\n.check_rule[_v-33c1cb03] {\n  display: block;\n  width: 32%;\n  height: 4%;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: auto;\n  top: 44%;\n}\n\n.shank_redss[_v-33c1cb03] {\n  width: 100%;\n  min-height: 10px;\n  -webkit-animation: myredshank .3s infinite;\n  animation: myredshank .3s infinite;\n  background-position: 0 0;\n  background-size: 100% 100%;\n}\n\n@keyframes myredshank {\n  from {\n    background-image: url(\"//pic.davdian.com/free/2017/05/15/doors1.png\");\n  }\n  to {\n    background-image: url(\"//pic.davdian.com/free/2017/05/15/doors2.png\");\n  }\n}\n\n@-webkit-keyframes myredshank /* Safari 和 Chrome */\n{\n  from {\n    background-image: url(\"//pic.davdian.com/free/2017/05/15/doors1.png\");\n  }\n  to {\n    background-image: url(\"//pic.davdian.com/free/2017/05/15/doors2.png\");\n  }\n}\n", ""]);

	// exports


/***/ },

/***/ 486:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _layout = __webpack_require__(91);

	var _layout2 = _interopRequireDefault(_layout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    return {
	      items: [1, 2, 3, 4, 5],
	      flips: 1, //抽奖次数
	      accessrun: true,
	      rewardNum: parseInt(Math.random() * 5 + 1, 10),
	      not_started: true,
	      sharks: true,
	      shows: false, //游戏页面的显示,
	      canPlay: true,
	      animate_dey: 0,
	      result: false,
	      result2: false,
	      noreword: [true, true, true, true, true],
	      accessClick: false, //红包可点击
	      activeUrl: "/api/mg/sale/lottery/info", //活动信息接口
	      //        activeUrl: "../data/active_info.json", //活动信息接
	      getrewardUrl: "/api/mg/sale/lottery/get",
	      //        getrewardUrl: "../data/active_info.json",
	      tips: "", //提示
	      bonusMoney: 0, //红包金额
	      bonusName: "", //红包名字
	      timeline: "", //红包使用期间
	      minConsumePrice: "",
	      show_rule: false, //游戏规则
	      lotteryActId: window.lotteryActId, //活动ID,
	      last_day: false,
	      setTime1: "",
	      setTime2: "",
	      setTime3: ""
	    };
	  },
	  methods: {
	    init_play: function init_play(num) {
	      //开始游戏
	      if (num == 1) {
	        window.bravetime.tj.pvSend('children_begin_init_click', '');
	      }
	      //继续游戏
	      if (num == 2) {
	        window.bravetime.tj.pvSend('children_continue_begin', '');
	      }
	      var scope = this;
	      if (window.$user_status == 0) {
	        bravetime.goto('login.html?referer=' + location.href);
	      } else {
	        scope.start_init();
	      }
	    },
	    get_red_con: function get_red_con() {
	      var scope = this;
	      if (scope.flips == 5) {
	        scope.close();
	      } else {
	        scope.start_init();
	      }
	    },
	    begin: function begin() {
	      window.bravetime.tj.pvSend('children_play', '');
	      var scope = this;
	      scope.accessrun = false;
	      scope.tips = "红包位置会调换，注意力集中喽~";
	      /*告知用户奖品在哪里*/
	      scope.not_started = false;
	      window.setTime1 = setTimeout(function () {
	        scope.not_started = true;
	        /*翻转门*/
	        var run = 0;
	        window.setTime2 = setTimeout(function () {
	          scope.shufflecart();
	          window.cardrun = setInterval(function () {
	            scope.shufflecart();
	            run++;
	            if (run == 4) {
	              clearInterval(cardrun);
	              window.setTime3 = setTimeout(function () {
	                scope.tips = "选出红包所在位置吧~";
	                scope.accessClick = true;
	              }, 800);
	            }
	          }, scope.animate_dey);
	        }, 400);
	      }, 2000);
	    },
	    shufflecart: function shufflecart() {
	      var scope = this;
	      var itemss = [];
	      scope.shuffleArray(scope.items, itemss);
	      scope.items = itemss;
	    },
	    shuffleArray: function shuffleArray(arr, newArr) {
	      if (arr.length == 1) {
	        newArr.push(arr[0]);
	        return newArr;
	      }
	      var random = Math.ceil(Math.random() * arr.length) - 1;
	      newArr.push(arr[random]);
	      arr.splice(random, 1);
	      return this.shuffleArray(arr, newArr);
	    },
	    close: function close() {
	      var scope = this;
	      window.clearTimeout(window.setTime1);
	      window.clearTimeout(window.setTime2);
	      window.clearTimeout(window.setTime3);
	      window.clearInterval(window.cardrun);
	      scope.shows = false;
	      scope.result = false;
	      scope.result2 = false;
	      scope.items = [1, 2, 3, 4, 5];
	      scope.accessClick = false;
	      return false;
	    },
	    /*没有中奖*/
	    select_no: function select_no(num) {
	      var scope = this;
	      window.bravetime.tj.pvSend('children_select_red', '');
	      if (!scope.accessClick) {
	        return false;
	      }
	      scope.accessClick = false;
	      Vue.set(scope.noreword, num, false);
	      scope.shakaward();
	      //告知后台没有中奖
	      $.ajax({
	        url: scope.getrewardUrl,
	        type: "POST",
	        data: _layout2.default.strSign("children", { "lotteryActId": scope.lotteryActId, "distribute": "no" }),
	        dataType: "json",
	        success: function success(result) {
	          if (result.code) {
	            bravetime.info(result.info);
	          }
	        }
	      });
	      setTimeout(function () {
	        scope.result = true;
	        if (scope.flips == 5) {
	          if (scope.last_day) {
	            scope.tips = "每天只能玩儿5次哦~";
	          } else {
	            scope.tips = "每天只能玩儿5次哦，明天继续吧~";
	          }
	        } else {
	          scope.tips = "今天还有" + (5 - scope.flips) + "次玩游戏的机会呦~";
	        }
	      }, 700);
	    },
	    /*中奖*/
	    reward: function reward() {
	      var scope = this;
	      window.bravetime.tj.pvSend('children_select_red', '');
	      if (!scope.accessClick) {
	        return false;
	      }
	      scope.accessClick = false;
	      scope.not_started = false;
	      /*告知后台中奖*/
	      $.ajax({
	        url: scope.getrewardUrl,
	        type: "POST",
	        data: _layout2.default.strSign("children", { "lotteryActId": scope.lotteryActId }),
	        dataType: "json",
	        success: function success(result) {
	          if (result.code == 0) {
	            scope.bonusMoney = result.data.bonusInfo.bonusMoney;
	            scope.bonusName = result.data.bonusInfo.bonusName;
	            scope.minConsumePrice = result.data.bonusInfo.minConsumePrice;
	            scope.timeline = result.data.bonusInfo.useBeginTime + "-" + result.data.bonusInfo.useEndTime;
	          }
	        }
	      });
	      setTimeout(function () {
	        scope.result2 = true;
	        if (scope.flips == 5) {} else {
	          scope.tips = "今天还有" + (5 - scope.flips) + "次玩游戏的机会呦~";
	        }
	      }, 700);
	    },
	    shakaward: function shakaward() {
	      var scope = this;
	      scope.accessClick = false;
	      scope.not_started = false;
	    },
	    /*点击开始，初始化抽奖信息*/
	    start_init: function start_init() {
	      var scope = this;
	      $.ajax({
	        url: scope.activeUrl,
	        type: "POST",
	        data: _layout2.default.strSign("children", { "lotteryActId": scope.lotteryActId }),
	        dataType: "json",
	        success: function success(result) {
	          var now = scope.gettimeline(Date.parse(new Date()) / 1000);
	          var endTime = scope.gettimeline(result.data.endTime) || "";
	          if (now == endTime) {
	            scope.last_day = true;
	          } else {
	            scope.last_day = false;
	          }
	          if (result.code == 0) {
	            scope.shows = true;
	            if (result.data.joinLimit == "yes") {
	              /*超限*/
	              scope.canPlay = false;
	              if (scope.last_day) {
	                scope.tips = "每天只能玩儿5次哦~";
	              } else {
	                scope.tips = "每天只能玩儿5次哦，明天继续吧~";
	              }
	              scope.result = false;
	              scope.result2 = false;
	              scope.noreword = [true, true, true, true, true];
	              scope.rewardNum = parseInt(Math.random() * 5 + 1, 10);
	              scope.accessrun = true;
	              scope.not_started = true;
	              return false;
	            }
	            scope.canPlay = true;
	            scope.noreword = [true, true, true, true, true];
	            scope.result = false;
	            scope.result2 = false;
	            scope.rewardNum = parseInt(Math.random() * 5 + 1, 10);
	            scope.accessrun = true;
	            scope.not_started = true;
	            /*抽奖次数*/
	            scope.flips = 6 - result.data.remainingTimes;
	            scope.tips = "今天还有" + result.data.remainingTimes + "次玩游戏的机会呦~";
	            switch (scope.flips) {
	              case 1:
	                scope.animate_dey = 920;
	                break;
	              case 2:
	                scope.animate_dey = 630;
	                break;
	              case 3:
	                scope.animate_dey = 360;
	                break;
	              case 4:
	                scope.animate_dey = 280;
	                break;
	              case 5:
	                scope.animate_dey = 190;
	                break;
	            }
	          } else if (result.code == 63409) {
	            scope.shows = true;
	            /*超限*/
	            scope.canPlay = false;
	            if (scope.last_day) {
	              scope.tips = "每天只能玩儿5次哦~";
	            } else {
	              scope.tips = "每天只能玩儿5次哦，明天继续吧~";
	            }
	            return false;
	          } else {
	            bravetime.info(result.data.msg);
	          }
	        },
	        error: function error(e) {
	          console.log(e);
	        }
	      });
	    },
	    /*时间转换*/
	    gettimeline: function gettimeline(nS) {
	      return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10).replace(/-/g, ".");
	    },
	    /*游戏 规则*/
	    play_rule: function play_rule() {
	      this.show_rule = true;
	    },
	    close2: function close2() {
	      this.show_rule = false;
	    },
	    prevent_move: function prevent_move(e) {}
	  },
	  created: function created() {}
	  // </script>
	  // <style scoped>
	  //   .flip-list1-move {
	  //     transition: transform 1s;
	  //   }
	  //
	  //   .flip-list2-move {
	  //     transition: transform .7s;
	  //   }
	  //
	  //   .flip-list3-move {
	  //     transition: transform .4s;
	  //   }
	  //
	  //   .flip-list4-move {
	  //     transition: transform .3s;
	  //   }
	  //
	  //   .flip-list5-move {
	  //     transition: transform .2s;
	  //   }
	  //
	  //   .card {
	  //     float: left;
	  //     list-style: none;
	  //     width: 24.58%;
	  //     margin-left: 6.51%;
	  //   }
	  //
	  //   .card img {
	  //     width: 100%;
	  //   }
	  //
	  //   .playchildren {
	  //     width: 79.2%;
	  //     min-height: 300px;
	  //     overflow: hidden;
	  //     position: absolute;
	  //     margin: 0 auto;
	  //     top: 50%;
	  //     left: 50%;
	  //     -webkit-transform: translate(-50%, -50%);
	  //     -moz-transform: translate(-50%, -50%);
	  //     -ms-transform: translate(-50%, -50%);
	  //     -o-transform: translate(-50%, -50%);
	  //     transform: translate(-50%, -50%);
	  //     -webkit-border-radius: 2%;
	  //     -moz-border-radius: 2%;
	  //     border-radius: 2%;
	  //   }
	  //
	  //   .playchildren ul {
	  //     background-color: #ffc5bb;
	  //     overflow: hidden;
	  //     background-image: url("//pic.davdian.com/free/2017/05/15/c_bg.png");
	  //     background-size: 100% 100%;
	  //     padding: 5% 0;
	  //   }
	  //
	  //   .playchildren ul li:nth-of-type(1) {
	  //     margin-left: 19.9%
	  //   }
	  //
	  //   .playchildren ul li:nth-of-type(2) {
	  //     margin-left: 11%
	  //   }
	  //
	  //   .play {
	  //     position: absolute;
	  //     left: 0;
	  //     top: 0;
	  //     right: 0;
	  //     bottom: 0;
	  //     margin: auto;
	  //     z-index: 14;
	  //     height: 13.7%;
	  //   }
	  //
	  //   .title_bottom {
	  //     width: 100%;
	  //     background-color: #b4bb4b;
	  //     overflow: hidden;
	  //     min-height: 10px;
	  //     position: relative;
	  //   }
	  //
	  //   .card_img {
	  //     width: 100%;
	  //     background-size: 100% 100%;
	  //     background-repeat: no-repeat;
	  //     background-position: 0 0;
	  //     background-image: url("//pic.davdian.com/free/2017/05/15/doors.png");
	  //   }
	  //
	  //   .card_img.card_img2 {
	  //     background-image: url("//pic.davdian.com/free/2017/05/15/doorsno.png");
	  //   }
	  //
	  //   .card_img img {
	  //     width: 100%;
	  //   }
	  //
	  //   .closes {
	  //     position: absolute;
	  //     top: 0;
	  //     right: 0;
	  //     width: 20%;
	  //     height: 100%;
	  //     opacity: 0;
	  //   }
	  //
	  //   .tips {
	  //     position: absolute;
	  //     width: 100%;
	  //     text-align: center;
	  //     color: #FFF;
	  //     font-size: 0.16rem;
	  //     top: 50%;
	  //     transform: translateY(-50%);
	  //   }
	  //
	  //   .start_play {
	  //     width: 30.26%;
	  //     position: absolute;
	  //     bottom: 3.36%;
	  //     -webkit-animation: myredshankss .3s infinite;
	  //     -o-animation: myredshankss .3s infinite;
	  //     animation: myredshankss .3s infinite;
	  //     background-position: 0 0;
	  //     background-size: 100% 100%;
	  //   }
	  //
	  //   .start_play img {
	  //     width: 100%;
	  //   }
	  //
	  //   @keyframes myredshankss {
	  //     from {
	  //       background-image: url("//pic.davdian.com/free/2017/05/17/shank1.png");
	  //     }
	  //     to {
	  //       background-image: url("//pic.davdian.com/free/2017/05/17/shank2.png");
	  //     }
	  //   }
	  //
	  //   @-moz-keyframes myredshankss /* Firefox */
	  //   {
	  //     from {
	  //       background-image: url("//pic.davdian.com/free/2017/05/17/shank1.png");
	  //     }
	  //     to {
	  //       background-image: url("//pic.davdian.com/free/2017/05/17/shank2.png");
	  //     }
	  //   }
	  //
	  //   @-webkit-keyframes myredshankss /* Safari 和 Chrome */
	  //   {
	  //     from {
	  //       background-image: url("//pic.davdian.com/free/2017/05/17/shank1.png");
	  //     }
	  //     to {
	  //       background-image: url("//pic.davdian.com/free/2017/05/17/shank2.png");
	  //     }
	  //   }
	  //
	  //   @-o-keyframes myredshankss /* Opera */
	  //   {
	  //     from {
	  //       background-image: url("//pic.davdian.com/free/2017/05/17/shank1.png");
	  //     }
	  //     to {
	  //       background-image: url("//pic.davdian.com/free/2017/05/17/shank2.png");
	  //     }
	  //   }
	  //
	  //   .result_wrap {
	  //     position: fixed;
	  //     top: 0;
	  //     left: 0;
	  //     right: 0;
	  //     background-color: rgba(0, 0, 0, 0.6);
	  //     bottom: 0;
	  //     z-index: 12;
	  //     max-width: 640px;
	  //     margin: auto;
	  //   }
	  //
	  //   .playchildren_wrap {
	  //     position: fixed;
	  //     top: 0;
	  //     left: 0;
	  //     right: 0;
	  //     background-color: rgba(0, 0, 0, 0.6);
	  //     bottom: 0;
	  //     z-index: 12;
	  //     max-width: 640px;
	  //     margin: auto;
	  //   }
	  //
	  //   .result_in {
	  //     width: 79.2%;
	  //     min-height: 50px;
	  //     overflow: hidden;
	  //     position: absolute;
	  //     margin: 0 auto;
	  //     top: 50%;
	  //     left: 50%;
	  //     -webkit-transform: translate(-50%, -50%);
	  //     -moz-transform: translate(-50%, -50%);
	  //     -ms-transform: translate(-50%, -50%);
	  //     -o-transform: translate(-50%, -50%);
	  //     transform: translate(-50%, -50%);
	  //     -webkit-border-radius: 2%;
	  //     -moz-border-radius: 2%;
	  //     border-radius: 2%;
	  //   }
	  //
	  //   .tips_btn {
	  //     position: absolute;
	  //     left: 0;
	  //     right: 0;
	  //     bottom: 10%;
	  //     margin: auto;
	  //     height: 15%;
	  //   }
	  //
	  //   .tips_btn2 {
	  //     position: absolute;
	  //     left: 0;
	  //     right: 0;
	  //     bottom: 8%;
	  //     margin: auto;
	  //     width: 46%;
	  //   }
	  //
	  //   .get_continue {
	  //     position: absolute;
	  //     height: 13%;
	  //     z-index: 9999;
	  //     bottom: 4%;
	  //     left: 0;
	  //     background-size: auto 100%;
	  //     background-repeat: no-repeat;
	  //     background-position: center 0;
	  //     right: 0;
	  //     margin: auto;
	  //     background-image: url("//pic.davdian.com/free/2017/05/18/cont.png");
	  //   }
	  //
	  //   .get_continue.over {
	  //     background-image: url("//pic.davdian.com/free/2017/05/18/Ikonw.png");
	  //   }
	  //
	  //   .red_desc {
	  //     position: absolute;
	  //     width: 67%;
	  //     height: 22%;
	  //     z-index: 9999;
	  //     bottom: 25%;
	  //     left: 0;
	  //     right: 0;
	  //     margin: auto;
	  //     color: #FFF;
	  //     font-weight: 200;
	  //   }
	  //
	  //   .red_desc > div:nth-of-type(1) {
	  //     width: 25%;
	  //     height: 100%;
	  //     float: left;
	  //     position: relative;
	  //   }
	  //
	  //   .red_desc > div:nth-of-type(1) > div {
	  //     text-align: center;
	  //     font-size: 0.25rem;
	  //     height: 0.25rem;
	  //     position: absolute;
	  //     top: 0;
	  //     bottom: 0;
	  //     width: 100%;
	  //     margin: auto;
	  //   }
	  //
	  //   .red_desc em {
	  //     font-style: normal;
	  //     font-size: 0.12rem;
	  //     font-weight: 100;
	  //   }
	  //
	  //   .red_desc > div:nth-of-type(2) {
	  //     width: 73%;
	  //     height: 80%;
	  //     float: left;
	  //     font-size: 0.12rem;
	  //     line-height: 0.17rem;
	  //     margin-top: 4%;
	  //     margin-left: 2%;
	  //   }
	  //
	  //   .mian_bg {
	  //     position: relative;
	  //   }
	  //
	  //   .check_rule {
	  //     display: block;
	  //     width: 32%;
	  //     height: 4%;
	  //     position: absolute;
	  //     left: 0;
	  //     right: 0;
	  //     margin: auto;
	  //     top: 44%;
	  //   }
	  //
	  //   .shank_redss {
	  //     width: 100%;
	  //     min-height: 10px;
	  //     -webkit-animation: myredshank .3s infinite;
	  //     -o-animation: myredshank .3s infinite;
	  //     animation: myredshank .3s infinite;
	  //     background-position: 0 0;
	  //     background-size: 100% 100%;
	  //   }
	  //
	  //   @keyframes myredshank {
	  //     from {
	  //       background-image: url("//pic.davdian.com/free/2017/05/15/doors1.png");
	  //     }
	  //     to {
	  //       background-image: url("//pic.davdian.com/free/2017/05/15/doors2.png");
	  //     }
	  //   }
	  //
	  //   @-moz-keyframes myredshank /* Firefox */
	  //   {
	  //     from {
	  //       background-image: url("//pic.davdian.com/free/2017/05/15/doors1.png");
	  //     }
	  //     to {
	  //       background-image: url("//pic.davdian.com/free/2017/05/15/doors2.png");
	  //     }
	  //   }
	  //
	  //   @-webkit-keyframes myredshank /* Safari 和 Chrome */
	  //   {
	  //     from {
	  //       background-image: url("//pic.davdian.com/free/2017/05/15/doors1.png");
	  //     }
	  //     to {
	  //       background-image: url("//pic.davdian.com/free/2017/05/15/doors2.png");
	  //     }
	  //   }
	  //
	  //   @-o-keyframes myredshank /* Opera */
	  //   {
	  //     from {
	  //       background-image: url("//pic.davdian.com/free/2017/05/15/doors1.png");
	  //     }
	  //     to {
	  //       background-image: url("//pic.davdian.com/free/2017/05/15/doors2.png");
	  //     }
	  //   }
	  // </style>

	}; // <template>
	//   <div>
	//     <div class="mian_bg">
	//       <a class="check_rule" href="/t-11674.html"></a>
	//       <img src="//pic.davdian.com/free/2017/05/17/main_pic.png" alt="">
	//       <!--<img src="//pic.davdian.com/free/2017/05/17/main_pic.jpg" alt="">-->
	//       <div class="start_play" v-on:click="init_play(1)" style="right:12.1%;">
	//         <img src="//pic.davdian.com/free/2017/05/18/dot_shank_tran.png" alt="">
	//       </div>
	//       <div class="start_play" v-on:click="play_rule" style="left:12.1%;">
	//         <img src="//pic.davdian.com/free/2017/05/18/dot_shank_tran.png" alt="">
	//       </div>
	//     </div>
	//     <div @touchmove.prevent="prevent_move" v-if="shows" class="playchildren_wrap">
	//       <div class="playchildren">
	//         <img class="play" v-if="accessrun&&canPlay" v-on:click="begin" src="//pic.davdian.com/free/2017/05/15/start.png"
	//              alt="">
	//         <img class="play" v-show="accessrun&&!canPlay" @click="close"
	//              src="//pic.davdian.com/free/2017/05/18/fivetimeover.png"
	//              alt="">
	//         <div class="title_bottom">
	//           <img src="//pic.davdian.com/free/2017/05/15/caicaikan_title.png" alt="">
	//           <div class="closes" @click="close"></div>
	//         </div>
	//         <transition-group v-if="shows" :name="'flip-list'+flips" tag="ul">
	//           <li class="card" v-for="(item,index) in items" v-bind:key="item">
	//             <!--//中奖的-->
	//             <div v-if="item == rewardNum" class="card_img" :class="{shank_redss:!not_started}" @click="reward" alt="1">
	//               <img src="//pic.davdian.com/free/2017/05/18/tran_door.png" alt="">
	//             </div>
	//             <!--//未中奖的-->
	//             <div v-else class="card_img" :class="{card_img2:!noreword[item-1]}" @click="select_no(item-1)">
	//               <img src="//pic.davdian.com/free/2017/05/18/tran_door.png" alt="">
	//             </div>
	//           </li>
	//         </transition-group>
	//         <div class="title_bottom">
	//           <img class="title_bottom" src="//pic.davdian.com/free/2017/05/15/trans.png" alt="">
	//           <div class="tips">{{tips}}</div>
	//         </div>
	//       </div>
	//     </div>
	//     <!--游戏规则-->
	//     <div @touchmove.prevent="prevent_move" v-if="show_rule" class="playchildren_wrap">
	//       <div class="playchildren">
	//         <img src="//pic.davdian.com/free/2017/05/18/rule_new.png" alt="">
	//         <div style="height: 15%;" class="closes" @click="close2"></div>
	//       </div>
	//     </div>
	//     <div @touchmove.prevent="prevent_move" v-if="result" class="result_wrap">
	//       <div v-if="flips < 5" class="result_in">
	//         <img src="//pic.davdian.com/free/2017/05/15/regret1.png" alt="">
	//         <img @click="init_play(2)" class="tips_btn" src="//pic.davdian.com/free/2017/05/15/regret_tips1.png" alt="">
	//       </div>
	//       <div v-else class="result_in">
	//         <img src="//pic.davdian.com/free/2017/05/15/regret1.png" alt="">
	//         <img @click="close" class="tips_btn2" src="//pic.davdian.com/free/2017/05/15/regret_tips2.png" alt="">
	//       </div>
	//     </div>
	//     <div @touchmove.prevent="prevent_move" v-show="result2" class="result_wrap">
	//       <div class="result_in">
	//         <img src="//pic.davdian.com/free/2017/05/18/get_red3.png" alt="">
	//         <div @click="get_red_con" class="get_continue" :class="{over:flips == 5}"></div>
	//         <div class="red_desc">
	//           <div>
	//             <div><em>¥</em><span>{{bonusMoney}}</span></div>
	//           </div>
	//           <div>
	//             {{bonusName}}满{{minConsumePrice}}元可用 <br>
	//             有效期限： <br>
	//             {{timeline}}
	//           </div>
	//         </div>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <script>

/***/ },

/***/ 487:
/***/ function(module, exports) {

	module.exports = "\n<div _v-33c1cb03=\"\">\n  <div class=\"mian_bg\" _v-33c1cb03=\"\">\n    <a class=\"check_rule\" href=\"/t-11674.html\" _v-33c1cb03=\"\"></a>\n    <img src=\"//pic.davdian.com/free/2017/05/17/main_pic.png\" alt=\"\" _v-33c1cb03=\"\">\n    <!--<img src=\"//pic.davdian.com/free/2017/05/17/main_pic.jpg\" alt=\"\">-->\n    <div class=\"start_play\" v-on:click=\"init_play(1)\" style=\"right:12.1%;\" _v-33c1cb03=\"\">\n      <img src=\"//pic.davdian.com/free/2017/05/18/dot_shank_tran.png\" alt=\"\" _v-33c1cb03=\"\">\n    </div>\n    <div class=\"start_play\" v-on:click=\"play_rule\" style=\"left:12.1%;\" _v-33c1cb03=\"\">\n      <img src=\"//pic.davdian.com/free/2017/05/18/dot_shank_tran.png\" alt=\"\" _v-33c1cb03=\"\">\n    </div>\n  </div>\n  <div @touchmove.prevent=\"prevent_move\" v-if=\"shows\" class=\"playchildren_wrap\" _v-33c1cb03=\"\">\n    <div class=\"playchildren\" _v-33c1cb03=\"\">\n      <img class=\"play\" v-if=\"accessrun&amp;&amp;canPlay\" v-on:click=\"begin\" src=\"//pic.davdian.com/free/2017/05/15/start.png\" alt=\"\" _v-33c1cb03=\"\">\n      <img class=\"play\" v-show=\"accessrun&amp;&amp;!canPlay\" @click=\"close\" src=\"//pic.davdian.com/free/2017/05/18/fivetimeover.png\" alt=\"\" _v-33c1cb03=\"\">\n      <div class=\"title_bottom\" _v-33c1cb03=\"\">\n        <img src=\"//pic.davdian.com/free/2017/05/15/caicaikan_title.png\" alt=\"\" _v-33c1cb03=\"\">\n        <div class=\"closes\" @click=\"close\" _v-33c1cb03=\"\"></div>\n      </div>\n      <transition-group v-if=\"shows\" :name=\"'flip-list'+flips\" tag=\"ul\" _v-33c1cb03=\"\">\n        <li class=\"card\" v-for=\"(item,index) in items\" v-bind:key=\"item\" _v-33c1cb03=\"\">\n          <!--//中奖的-->\n          <div v-if=\"item == rewardNum\" class=\"card_img\" :class=\"{shank_redss:!not_started}\" @click=\"reward\" alt=\"1\" _v-33c1cb03=\"\">\n            <img src=\"//pic.davdian.com/free/2017/05/18/tran_door.png\" alt=\"\" _v-33c1cb03=\"\">\n          </div>\n          <!--//未中奖的-->\n          <div v-else=\"\" class=\"card_img\" :class=\"{card_img2:!noreword[item-1]}\" @click=\"select_no(item-1)\" _v-33c1cb03=\"\">\n            <img src=\"//pic.davdian.com/free/2017/05/18/tran_door.png\" alt=\"\" _v-33c1cb03=\"\">\n          </div>\n        </li>\n      </transition-group>\n      <div class=\"title_bottom\" _v-33c1cb03=\"\">\n        <img class=\"title_bottom\" src=\"//pic.davdian.com/free/2017/05/15/trans.png\" alt=\"\" _v-33c1cb03=\"\">\n        <div class=\"tips\" _v-33c1cb03=\"\">{{tips}}</div>\n      </div>\n    </div>\n  </div>\n  <!--游戏规则-->\n  <div @touchmove.prevent=\"prevent_move\" v-if=\"show_rule\" class=\"playchildren_wrap\" _v-33c1cb03=\"\">\n    <div class=\"playchildren\" _v-33c1cb03=\"\">\n      <img src=\"//pic.davdian.com/free/2017/05/18/rule_new.png\" alt=\"\" _v-33c1cb03=\"\">\n      <div style=\"height: 15%;\" class=\"closes\" @click=\"close2\" _v-33c1cb03=\"\"></div>\n    </div>\n  </div>\n  <div @touchmove.prevent=\"prevent_move\" v-if=\"result\" class=\"result_wrap\" _v-33c1cb03=\"\">\n    <div v-if=\"flips < 5\" class=\"result_in\" _v-33c1cb03=\"\">\n      <img src=\"//pic.davdian.com/free/2017/05/15/regret1.png\" alt=\"\" _v-33c1cb03=\"\">\n      <img @click=\"init_play(2)\" class=\"tips_btn\" src=\"//pic.davdian.com/free/2017/05/15/regret_tips1.png\" alt=\"\" _v-33c1cb03=\"\">\n    </div>\n    <div v-else=\"\" class=\"result_in\" _v-33c1cb03=\"\">\n      <img src=\"//pic.davdian.com/free/2017/05/15/regret1.png\" alt=\"\" _v-33c1cb03=\"\">\n      <img @click=\"close\" class=\"tips_btn2\" src=\"//pic.davdian.com/free/2017/05/15/regret_tips2.png\" alt=\"\" _v-33c1cb03=\"\">\n    </div>\n  </div>\n  <div @touchmove.prevent=\"prevent_move\" v-show=\"result2\" class=\"result_wrap\" _v-33c1cb03=\"\">\n    <div class=\"result_in\" _v-33c1cb03=\"\">\n      <img src=\"//pic.davdian.com/free/2017/05/18/get_red3.png\" alt=\"\" _v-33c1cb03=\"\">\n      <div @click=\"get_red_con\" class=\"get_continue\" :class=\"{over:flips == 5}\" _v-33c1cb03=\"\"></div>\n      <div class=\"red_desc\" _v-33c1cb03=\"\">\n        <div _v-33c1cb03=\"\">\n          <div _v-33c1cb03=\"\"><em _v-33c1cb03=\"\">¥</em><span _v-33c1cb03=\"\">{{bonusMoney}}</span></div>\n        </div>\n        <div _v-33c1cb03=\"\">\n          {{bonusName}}满{{minConsumePrice}}元可用 <br _v-33c1cb03=\"\">\n          有效期限： <br _v-33c1cb03=\"\">\n          {{timeline}}\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }

/******/ });