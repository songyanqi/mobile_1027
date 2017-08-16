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
	__webpack_require__(532);


	__webpack_require__(534);
	__webpack_require__(41);
	__webpack_require__(43);
	__webpack_require__(535);
	__webpack_require__(42);

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

/***/ 41:
/***/ function(module, exports) {

	(function(){
	    var Units = window.Units = window.Units||{};
	    var u = navigator.userAgent;
	    Units.isIOS = function(){
	        if(u.match(/ios/i)) {
	            return true;
	        }
	        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	    };
	    Units.isMobileIOS = function () {
	        return /iPhone|iPad|iPod/i.test(u);
	    };
	    Units.getAppVersion = function () {
	        // 空格分所有
	        var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) ||  u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i)||  u.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
	        if(versionStr == null){
	            return 0;
	        }else{
	            var v = versionStr[2].split(".").reduce(function(a,b){return +a*10+ +b});
	        }
	        return +v;
	    };
	    Units.isAndroid = function () {
	        if(u.match(/(android|linux)/i)) {
	            return true;
	        }
	        return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	    };
	    Units.isApp = function () {
	        return !!u.match(/davdian|bravetime|vyohui/)
	    };
	    Units.isTel = function ( t ){
	        var tel = $.trim(t);
	        var reg = /^1\d{10}$/;
	        return reg.test( tel );
	    };
	    Units.isQQ = function(){
	        var ua = window.navigator.userAgent.toLowerCase();
	        if(ua.match(/qq\//i)=="qq/") {
	            return true;
	        } else {
	            return false;
	        }
	    };
	    Units.isWechat = function(){
	        var ua = window.navigator.userAgent.toLowerCase();
	        if(ua.match(/MicroMessenger/i)=="micromessenger") {
	            return true;
	        } else {
	            return false;
	        }
	    };
	    Units.isZipcode = function ( zipcode )
	    {
	        var reg = /^[0-9]{6}$/; //只允许为6位数字

	        return reg.test( zipcode );
	    };
	    Units.trim = function( text )
	    {
	        if (typeof(text) == "string")
	        {
	            return text.replace(/^\s*|\s*$/g, "");
	        }
	        else
	        {
	            return text;
	        }
	    };
	    Units.isIdcard = function ( idCard )
	    {
	        idCard = Units.trim(idCard);               //去掉字符串头尾空格                     
	        if (idCard.length == 15) {   
	            return Units.isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
	        } else if (idCard.length == 18) {   
	            var a_idCard = idCard.split("");                // 得到身份证数组   
	            if (Units.isValidityBrithBy18IdCard(idCard) && Units.isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
	                return true;   
	            } else {   
	                return false;   
	            }   
	        } else {   
	            return false;   
	        }
	    };

	    var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子   
	    var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X   
	    /**  
	     * 判断身份证号码为18位时最后的验证位是否正确  
	     * @param a_idCard 身份证号码数组  
	     * @return  
	     */  
	    Units.isTrueValidateCodeBy18IdCard = function(a_idCard) {   
	        var sum = 0;                          
	        if (a_idCard[17].toLowerCase() == 'x') {   
	            a_idCard[17] = 10; 
	        }   
	        for ( var i = 0; i < 17; i++) {   
	            sum += Wi[i] * a_idCard[i];            // 加权求和   
	        }   
	        valCodePosition = sum % 11;                // 得到验证码所位置
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
	    Units.isValidityBrithBy18IdCard = function(idCard18) {   
	        var year =  idCard18.substring(6,10);   
	        var month = idCard18.substring(10,12);   
	        var day = idCard18.substring(12,14);   
	        var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day), 13, 0, 0);   
	        // 这里用getFullYear()获取年份，避免千年虫问题   
	        if(temp_date.getFullYear()!=parseFloat(year)   
	              ||temp_date.getMonth()!=parseFloat(month)-1   
	              ||temp_date.getDate()!=parseFloat(day)){   
	            return false;   
	        }else{   
	            return true;   
	        }   
	    };
	       
	    /**  
	     * 验证15位数身份证号码中的生日是否是有效生日  
	     * @param idCard15 15位书身份证字符串  
	     * @return  
	     */  
	    Units.isValidityBrithBy15IdCard = function(idCard15) {   
	        var year =  idCard15.substring(6,8);   
	        var month = idCard15.substring(8,10);   
	        var day = idCard15.substring(10,12);   
	        var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
	        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
	        if(temp_date.getYear()!=parseFloat(year)   
	                ||temp_date.getMonth()!=parseFloat(month)-1   
	                ||temp_date.getDate()!=parseFloat(day)){   
	            return false;   
	        } else {   
	            return true;   
	        }   
	    }
	})();


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

/***/ 532:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 534:
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

	(function ($, window, document, undefined) {
	    var $window = $(window);

	    $.fn.lazyload = function (options) {
	        var elements = this;
	        var $container;
	        var settings = {
	            threshold: 500,
	            failure_limit: 10,
	            event: "scroll",
	            effect: "show",
	            container: window,
	            data_attribute: "original",
	            skip_invisible: true,
	            appear: null,
	            load: null,
	            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRFrKys9vb2l5eXwcHB6urqpaWl5OTkoqKi/f39qqqqnp6emJiY8fHx1dXVs7Oz7u7u3Nzc8/PzuLi40dHR2dnZkpKSkJCQyMjI+Pj44+Pjurq6kZGRzs7Oy8vL+/v7////kZFhOAAAACB0Uk5T/////////////////////////////////////////wBcXBvtAAACjUlEQVR42uzXbbOqIBAA4BUhjcCsU7B4PIf//y/vgmb2cicbtfvhwjSOUfLAtrwE/gMFEpKQhCQkIQlJSEIS8n8gx28zqXwfZyATDVJmIMZscELZGDMLwSkRx4T8IyRrdrtjti5SipCrolwVqbsZcVoV+ekQuypy6hC97m9SBKP4XTe7DtX5XB1WnyflkFplXvG1J+OB0vn8tS6ylzEH8nJFhO/6XaQqF0Y2w4LC2bBXAS6JKDBMPxjGbHE5xMUAHX/vDVrLsqWQn36vL/Z+v7vb3YOyAFI2l9PCmfd5NS5FtgCCMBxJ6oN8clIpstmIKobWvrLi6XlIqJnI6dr3Y7b9y6mrmIV85HD3kWNq+uuQkITcI8pdi6L32oXaXD/tDNCHDvB6oDTTECvhUmR4GGILYB8b0dbKxlpCqgrfRKg5nQ+3N4hzhsaHNu7snjsnWnpPzzb8bUQzGoYw/AEBMPRyoZ767zqkFSGy6EarmH2N5AK4R6H7kcTwsXDlsacXhFNHROhN6BJwB8NIYALiSMilu4SrGfIAPQ8I7xD6rAlhVZL2975iOoJ1Liopcz0KV18cC+30CMhuDMYjw0dku7253CI5pQwFhrd5h4CNRUUERoiHWofMlso2VCHDt0y4yNdIyC7GoO3DJZpomDhdbDVCNLOhB6qyDJ8gL7KrrSlZ6g5B02Vnh1TtCKFp29APhq1pvfLIh3BxNQGxlL8SuuzS0l8RZVREqOk2PEFIbVVDRyZwb0/G0JvahVtkdoRUFK2axUVBgKeYSooRiKrxDN9DbiZVI/wVcUzl4U/pkMLhDgQik/K9Ga/1+BYv4Y3Z5e4fcy7WoeVTVvO0aSUkIQlJSEISkpCEfAb5I8AAHVZ/+7SjOvEAAAAASUVORK5CYII="
	        };

	        function update() {
	            var counter = 0;

	            elements.each(function () {
	                var $this = $(this);
	                if (settings.skip_invisible && !$this.is(":visible")) {
	                    return;
	                }
	                if ($.abovethetop(this, settings) ||
	                    $.leftofbegin(this, settings)) {
	                    /* Nothing. */
	                } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
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

	        if (options) {
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
	            $container.bind(settings.event, function () {
	                return update();
	            });
	        }

	        this.each(function () {
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
	            $self.one("appear", function () {
	                if (!this.loaded) {
	                    if (settings.appear) {
	                        var elements_left = elements.length;
	                        settings.appear.call(self, elements_left, settings);
	                    }
	                    $("<img />")
	                        .bind("load", function () {

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
	                            var temp = $.grep(elements, function (element) {
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
	                $self.bind(settings.event, function () {
	                    if (!self.loaded) {
	                        $self.trigger("appear");
	                    }
	                });
	            }
	        });

	        /* Check if something appears when window is resized. */
	        $window.bind("resize", function () {
	            update();
	        });

	        /* With IOS5 force loading images when navigating with back button. */
	        /* Non optimal workaround. */
	        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
	            $window.bind("pageshow", function (event) {
	                if (event.originalEvent && event.originalEvent.persisted) {
	                    elements.each(function () {
	                        $(this).trigger("appear");
	                    });
	                }
	            });
	        }

	        /* Force initial check if images should appear. */
	        $(document).ready(function () {
	            update();
	        });

	        return this;
	    };

	    /* Convenience methods in jQuery namespace.           */
	    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

	    $.belowthefold = function (element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top + $(settings.container).height();
	        }

	        return fold <= $(element).offset().top - settings.threshold;
	    };

	    $.rightoffold = function (element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.width() + $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left + $(settings.container).width();
	        }

	        return fold <= $(element).offset().left - settings.threshold;
	    };

	    $.abovethetop = function (element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top;
	        }

	        return fold >= $(element).offset().top + settings.threshold + $(element).height();
	    };

	    $.leftofbegin = function (element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left;
	        }

	        return fold >= $(element).offset().left + settings.threshold + $(element).width();
	    };

	    $.inviewport = function (element, settings) {
	        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	    };

	    /* Custom selectors for your convenience.   */
	    /* Use as $("img:below-the-fold").something() or */
	    /* $("img").filter(":below-the-fold").something() which is faster */

	    $.extend($.expr[":"], {
	        "below-the-fold": function (a) {
	            return $.belowthefold(a, {threshold: 0});
	        },
	        "above-the-top": function (a) {
	            return !$.belowthefold(a, {threshold: 0});
	        },
	        "right-of-screen": function (a) {
	            return $.rightoffold(a, {threshold: 0});
	        },
	        "left-of-screen": function (a) {
	            return !$.rightoffold(a, {threshold: 0});
	        },
	        "in-viewport": function (a) {
	            return $.inviewport(a, {threshold: 0});
	        },
	        /* Maintain BC for couple of versions. */
	        "above-the-fold": function (a) {
	            return !$.belowthefold(a, {threshold: 0});
	        },
	        "right-of-fold": function (a) {
	            return $.rightoffold(a, {threshold: 0});
	        },
	        "left-of-fold": function (a) {
	            return !$.rightoffold(a, {threshold: 0});
	        }
	    });

	})(jQuery, window, document);

	jQuery(document).ready(function ($) {
	    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 0, failure_limit: 10})
	});

/***/ },

/***/ 535:
/***/ function(module, exports, __webpack_require__) {

	var native = __webpack_require__(154).default;

	$(document).ready(function ($) {
	    var goodName,  //商品名称
	        height, // 页面高度
	        w, // 页面宽度
	        bottom, // 底部容器
	        commitType, //提交类型
	        finalTypeStr,// 最终子属性
	        finalNum, //最终库存
	        buttonList = [], // 全部按钮列表
	        main, //页面主体容器
	        currentTypeStatus = {}, // 所有类型对应名称
	        defaultMinCount = 1, // 默认最小数量
	        defaultMaxCount = 99999,// 默认最大数量
	        allTypeLength, // 所有类型长度
	        defaultTypeStr = "", // 默认类型字符串
	        alertContainer, // 弹出框容器
	        typePrice, // 弹出中价格容器
	        typeTitle, // 弹出中商品标题容器
	        typeStock, // 弹出中库存容器
	        buttonListByLi = {}, // li对应的其他li 的按钮列表
	        numberInput, // 输入框容器
	        okButton, // 确定按钮容器
	        needToChoice = [], // 未选择属性
	        newGoodDetailList, // 子属性详情结果列表
	        newGoodDetail, // 子属性详情
	        newTypeData, // 子属性数据列表
	        defaultTypeStock, // 默认库存字符串
	        defaultPriceStr,  // 默认价格字符串
	        cartButton, // 加入购物车按钮
	        buyButton, // 直接购买按钮
	        tipCartLink, // 弹出结算提示
	        selectButton,
	        selectTitle,
	        selectContent,
	        buyNowButton; // 直接购买按钮


	    try{
	        init(); // 页面初始化
	    }catch (e){
	        window.bughd&&bughd("notifyException", e);
	        console.error(e);
	    }

	    /**
	     * 页面初始化
	     */
	    function init() {
	        goodName = $(".top_container").find(".title").text().trim();
	        height = $(window).height(); //页面高度
	        w = Math.min(document.body.clientWidth, 360);
	        bottom = $(".detail_bottom");
	        cartButton = bottom.find(".btn-cart");
	        buyButton = bottom.find(".btn-buy");
	        main = $(".detail_main");
	        tipCartLink = $(".detail_settle");
	        selectButton = $(".buy_introduction");
	        selectTitle = $(".buy_introduction_title_con");
	        selectContent = $(".buy_introduction_con");

	        initActivity(); //初始化活动模块
	        initInfomation(); //初始化子详情模块
	        initClick2Refresh(); //初始化点击刷新功能
	        initCollect(); //初始化收藏功能
	        initCommend(); //推荐功能
	        initSlider();  // 初始化偷图轮播
	        initMiao(); //初始化秒杀
	        initOtherShare(); //

	        //点击选择属性
	        selectButton.click(alertTypeChoiceContainer);
	        selectTitle.html("请选择");
	        selectContent.html(defaultTypeStr);

	        if (window.goodDetail && window.goodType && window.goodOtherInfo) {
	            initChildType(); //初始化子属性
	        } else {
	            buyButton.click(detailBuyNormal);
	            cartButton.click(detailCartNormalTodo);
	        }



	        window.qh = qh;
	        window.buy_now_confirm = buy_now_confirm;

	        //商品详情和服务说明切换
	        $("#good_information_title").click(function () {
	            $(this).addClass("active").siblings().removeClass("active");
	            $("#good_information").removeClass("hide").siblings().addClass("hide");
	        });
	        $("#service_explanation_title").click(function () {
	            $(this).addClass("active").siblings().removeClass("active");
	            $("#service_explanation").removeClass("hide").siblings().addClass("hide");
	        });

	        //商品详情区块加载数据
	        goodsdetail();

	    }

	    /**
	     * 初始化商品详情区块
	     */
	    function goodsdetail() {
	        var ajaxgoods = 0;
	        //滚动条滑到商品详情区块的时候加载数据
	        $(document).on("scroll", function () {
	            var fold = $(window).height() + $(window).scrollTop();
	            if (fold >= $(".good_information_title").offset().top) {
	                if (ajaxgoods == 0) {
	                    ajaxgoods = 1;
	                    window.disabledGoodsLoading = true;
	                    $.ajax({
	                        type: "get",
	                        url: goodsdetailUrl,
	                        data: {},
	                        dataType: "json",
	                        success: function (result) {
	                            detail(result)
	                            window.disabledGoodsLoading = false;
	                        },error:function () {
	                            window.disabledGoodsLoading = false;
	                        }
	                    });
	                }
	            }
	        });
	        //打开页面已经在商品详情区块的时候加载数据(指当前查看商品详情,然后当前页面刷新的时候)
	        $(function () {
	            var fold = $(window).height() + $(window).scrollTop();
	            if (fold >= $(".good_information_title").offset().top) {
	                if (ajaxgoods == 0) {
	                    ajaxgoods = 1;
	                    $.ajax({
	                        type: "get",
	                        url: goodsdetailUrl,
	                        data: {},
	                        dataType: "json",
	                        success: function (result) {
	                            detail(result)
	                        }
	                    });
	                }
	            }
	        });
	    }

	    /**
	     * 商品详情区块内容加载数据
	     */
	    function detail(result) {
	        if (result.code == 0) {
	            var pattern = /(data-original=\'http:\/\/pic\.davdian\.com\/[a-z_\/0-9]+\.(jpg|png))/g;
	            // 左侧数据
	            var left = result.data.left;
	            if (left.length > 0) {
	                for (var i = 0; i < left.length; i++) {
	                    $("#good_information").append($('<div class="item">' +
	                        '<div class="info_main">' +
	                        '<div class="info_title">' + left[i].title + '</div>' + '<span class="arrow-up info_up_arrow"></span>' + '</div>' +
	                        '<div class="info_detail">' + left[i].con + '</div>' +
	                        '</div>' +
	                        '</div>').toggleClass("droped", !left[i].droped));
	                }
	            }
	            else {
	                $("#good_information").append('<div class="detail_no_data">暂无商品详情信息</div>');
	            }

	            // 右侧数据
	            var right = result.data.right;
	            if (right.length > 0) {
	                for (var i = 0; i < right.length; i++) {
	                    $("#service_explanation").append($('<div class="item">' +
	                        '<div class="info_main">' +
	                        '<div class="info_title">' + right[i].title + '</div>' + '<span class="arrow-up info_up_arrow"></span>' + '</div>' +
	                        '<div class="info_detail">' + right[i].con.replace(pattern,"$1@q1_w640") + '</div>' +
	                        '</div>' +
	                        '</div>').toggleClass("droped", !right[i].droped));
	                }
	            }
	            else {
	                $("#service_explanation").append('<div class="detail_no_data">暂无服务说明</div>');
	            }

	            // 品牌馆数据
	            var brand = result.data.brand;
	            var link = brand.link;
	            if (!isEmptyObject(brand)) {
	                $(".good_information_con").after($('<div>' +
	                    '<a class="brand_hall clearfix" ' + (link != "" ? ('href="' + link + '"') : "") + '>' +
	                    '<img src="' + brand.img + '" class="pull-left">' +

	                    '<div class="shop_name pull-left">' + '<div class="name">' + brand.title + '</div>' + '</div>' + '<span class=" dav_icon_arrow brand_hall_arrow"></span>' +
	                    '</a>' +

	                    '<div class="brand_hall_con">' + brand.con.replace(pattern,"$1@q1_w640") + '</div>'));
	            }

	            $("#good_information").find("img[data-original]").lazyload({effect: "fadeIn", threshold: 100, failure_limit: 100});
	            $("#service_explanation").find("img[data-original]").lazyload({effect: "fadeIn", threshold: 100, failure_limit: 100});

	            //加载数据成功后执行点击展开收起事件
	            initInfomation();
	            setTimeout(function () {
	                if(window.Units&&Units.isApp()){
	                    $(".good_information_con").find("iframe").each(function (i, d) {
	                        d.onload = function(){
	                            window.bravetime.initHead();
	                            setTimeout(function () {
	                                initOtherShare();
	                            },50);
	                        };
	                    })
	                }
	            },100);


	        }
	        else {
	            bravetime.info(result.msg)
	        }
	    }

	    /**
	     * 初始化推荐商品到首页
	     */
	    function initCommend() {
	        var comCon = $(".recommend_container");
	        comCon.click(function () {
	            var isCom = $(this).hasClass("is_recommend");
	            if (!isCom) {
	                // 已推荐
	                $.ajax({
	                    url: window.commonendUrl,
	                    dataType: "json",
	                    data: {
	                        id: window.goodsId,
	                        recommend: 0
	                    }, success: function (result) {
	                        if (result["error"]) {
	                            bravetime.info(result["msg"]);
	                        } else {
	                            comCon.toggleClass("is_recommend");
	                            bravetime.info("取消推荐成功");
	                        }
	                    }, error: function () {
	                        bravetime.removeLoader();
	                        bravetime.ajaxError(36);
	                    }
	                });
	            } else {
	                // 未推荐
	                $.ajax({
	                    url: window.commonendUrl,
	                    dataType: "json",
	                    data: {
	                        id: window.goodsId,
	                        recommend: 1
	                    }, success: function (result) {
	                        bravetime.removeLoader();
	                        if (result["error"]) {
	                            bravetime.info(result["msg"]);
	                        } else {
	                            comCon.toggleClass("is_recommend");
	                            bravetime.info("推荐成功");
	                        }
	                    }, error: function () {
	                        bravetime.removeLoader();
	                        bravetime.ajaxError(36);
	                    }
	                });
	            }
	        });
	    }

	    /**
	     * 初始化收藏功能
	     */
	    function initCollect() {
	        var collectContainer = bottom.find(".collect");
	        // 向前面版本兼容
	        if (collectContainer.length) {
	            var ico = collectContainer.find(".icon");
	            var txt = collectContainer.find(".collect_text");
	            collectContainer.click(function () {
	                bravetime.addLoader({little: true});
	                if (ico.hasClass("collect_icon")) {
	                    // 未收藏
	                    $.ajax({
	                        url: window.collectUrl,
	                        dataType: "json",
	                        data: {
	                            id: window.goodsId,
	                            collect: 1
	                        }, success: function (result) {
	                            bravetime.removeLoader();
	                            if (result["error"] == -1) {
	                                bravetime.goto(result["url"]);
	                            } else if (result["error"]) {
	                                bravetime.info(result["msg"]);
	                            } else {
	                                ico.removeClass("collect_icon").addClass("favorited_icon");
	                                txt.html("已收藏");
	                                bravetime.info("收藏成功");
	                            }

	                        }, error: function () {
	                            bravetime.removeLoader();
	                            bravetime.ajaxError(36);
	                        }
	                    });
	                } else {
	                    // 已收藏
	                    $.ajax({
	                        url: window.collectUrl,
	                        dataType: "json",
	                        //type:"POST",
	                        data: {
	                            id: window.goodsId,
	                            collect: 0
	                        }, success: function (result) {
	                            bravetime.removeLoader();
	                            if (result["error"]) {
	                                bravetime.info(result["msg"]);
	                            } else {
	                                ico.addClass("collect_icon").removeClass("favorited_icon");
	                                txt.html("收藏");
	                            }
	                        }, error: function () {
	                            bravetime.removeLoader();
	                            bravetime.ajaxError(36);
	                        }
	                    });
	                }
	            });
	        }

	    }

	    /**
	     * 初始化头图滚动
	     */
	    function initSlider() {
	        if($(".swiper-slide").size()==1){

	        }else {
	          if(window.Swiper){
	            // 顶部轮播图滚动
	            new Swiper('.iosslider_container', {
	                pagination: '.swiper-pagination',
	                paginationClickable: true,
	                centeredSlides: true,
	                loop: true,
	                preloadImages:false,
	                lazyLoading : true
	            });
	          }
	        }
	    }

	    /**
	     * 初始化其他分享
	     */
	    function initOtherShare() {
	            if(window.Units&&Units.isApp()){
	                if(window.brokerage&&brokerage>0){

	                    // window.bravetime&&bravetime.setHead({shareMoney:brokerage+""});
	                    // modify by swg native 2017-05-19
	                    native.Browser.setHead({
	                      shareMoney: brokerage + "",
	                      shareMoneyStr: '赚' + brokerage + '元',
	                    });

	                    window.moreShareInfo = {shareTitle:"分享至少赚"+brokerage+"元", shareDesc:"只要有好友在您分享的链接中购物，您就可以得到对应的商品返现。通过链接还能直接进入您的店铺，好友购物您就赚钱~"};
	                }
	            }
	        }

	    /**
	     * 初始化限时抢购秒杀详情页
	     */
	    function initMiao() {
	        //限时抢购秒杀详情页  剩余时间  倒计时
	        var merchandiseDetail = $(".detail_sec");
	        if (merchandiseDetail.length) {
	            var merchandiseList = merchandiseDetail.find(".skill_dao");
	            window.mechandiseInterval = setInterval(function () {
	                var second = +merchandiseDetail.attr("data-skill-time");
	                if (second > 0) {
	                    merchandiseList.html("剩余时间：" + calculateTime(second));
	                    merchandiseDetail.attr("data-skill-time", second - 1);
	                } else if(second == 0) {
	                    merchandiseList.html("此商品秒杀已结束");
	                }

	            }, 1000);
	        }

	        function calculateTime(second) {
	            var s = second % 60, m = Math.floor(second / 60) % 60,
	                h = Math.floor(second / 60 / 60);
	            var str = '';
	            if (h) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else if (m) {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            } else {
	                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	            }
	            return str;
	        }
	    }

	    /**
	     * 初始化活动模块
	     */
	    function initActivity() {
	        $(".js-need-drop").find(".item").each(function (i, d) {
	            $(d).click(function () {
	                $(this).parents(".js-need-drop").toggleClass('droped');
	            })

	        });
	    }

	    /**
	     * 初始化子详情模块
	     */
	    function initInfomation() {
	        $(".good_information").find(".item").each(function (i, d) {
	            $(d).find("iframe").each(function (index, el) {
	                var $me = $(this);
	                if ($me.attr("src").indexOf("v.qq.com/iframe") > -1) {
	                    $me.height($me.width() / 3 * 2);
	                }
	            });
	            $(d).find(".info_main").click(function () {
	                var isDroped = $(d).hasClass("droped");
	                // 如果当前没展开   把其他合并并取消fix，把当前展开，当前变为fix，当前移动到最上面
	                if (isDroped) {
	                    // 把其他合并，并取消fix
	                    $(".good_information").find(".item").addClass("droped");//.removeClass("fix");

	                    // 当前变为fix，
	                    // $(d).addClass("fix");
	                    // 当前移动到最上面
	                    if (window.scrollY > $(d).offset().top - 41) {
	                        // $('html,body').animate({scrollTop: $(d).offset().top-41}, 500);
	                        window.scrollTo(0, $(d).offset().top - 41);
	                    } else {
	                        window.scrollTo(0, window.scrollY);
	                    }
	                    // 把当前展开，
	                    $(d).removeClass('droped');
	                    $(window).scroll();
	                } else {
	                    // 如果当前展开,把所有合并
	                    $(".good_information").find(".item").addClass("droped");//.removeClass("fix");
	                }
	            });
	        });
	        $(".good_introduction").find(".item").each(function (i, d) {
	            $(d).click(function () {
	                introduceClick(i);
	            });
	        });
	        introduceClick(0);
	    }

	    /**
	     * 点击子详情介绍
	     * @param {Number} index
	     */
	    function introduceClick(index) {
	        var goodIntroduction = $(".good_introduction");
	        $(goodIntroduction.find(".item").removeClass("active").get(index)).addClass("active");
	        $(goodIntroduction.find(".item").find("i").removeClass("active").get(index)).addClass("active");
	        $(goodIntroduction.find(".con").addClass("hide").get(index)).removeClass('hide');
	    }

	    /**
	     * 初始化点击刷新功能
	     */
	    function initClick2Refresh() {
	        var ajaxing = 0; //标记是否在ajax请求
	        var pageIndex = pageIndexStart || 2;
	        $(".recommendation").find(".more").click(function () {
	            var me = this;

	            if (ajaxing == 0) {
	                $(this).html("<div class='uil-default-css-normal' style='-webkit-transform:scale(0.15);-moz-transform:scale(0.15);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;width:30px;height: 30px;display: inline-block;'><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div></div>");

	                //发起ajax请求
	                ajaxing = 1;
	                $.ajax({
	                    data: {
	                        page: pageIndex,
	                        pagesize: pagesize,
	                        id: goodsId,
	                        t: Date.now()
	                    },
	                    url: refreshUrl,
	                    success: function (d) {
	                        $(me).html("点击加载更多...");
	                        if (typeof d == "string") {
	                            var data = JSON.parse(d);
	                        } else {
	                            var data = d;
	                        }
	                        if (+data["error_code"]) {
	                            warning_info(data["error_msg"]);
	                            ajaxing = 0;
	                        } else if (data["data"].length) {
	                            var good, i = 0, list = $(".recommendation .good_list");
	                            for (; good = data["data"][i++];) {
	                                $('<a href="' + good["url"] + '" class="good_item"><div class="good_img_container">' +
	                                    '<img src="' + good["goods_img"] + '">' +
	                                    ((good["sale_status"] == "offline" || good["sale_status"] == "soldout") ? ('<div class="good_list_sell_out">' + {
	                                        offline: "下架",
	                                        soldout: "售罄"
	                                    }[good["sale_status"]] + '</div>' ) : "") +

	                                    (good["tag"] ? ('<div class="' + good["tag"].toString() + '"></div>') : "") +
	                                    '</div><div class="good_title">' + good["goods_name"] + '</div><div class="good_price">¥' + good["shop_price"] + '</div></a>').appendTo(list);
	                            }
	                            pageIndex++;
	                            ajaxing = 0;
	                            if (!data["has_more"]) {
	                                ajaxing = 1;
	                                $(me).html("没有更多商品了！");
	                            }
	                        } else {
	                            $(me).html("没有更多商品了！");
	                        }

	                    },
	                    error: function () {
	                        $(me).html("点击加载更多...");
	                        // $(".refresh").empty();
	                        bravetime.ajaxError(13);
	                        ajaxing = 0;
	                    }
	                });
	            }
	        });
	    }

	    /**
	     * 购买前确认
	     * @param {Number} index
	     */
	    function buy_now_confirm(index) {
	        var cfg = {};
	        cfg["okText"] = "继续购买";
	        cfg["okLink"] = function () {
	            buy_now(index);
	        };
	        window.bravetime.newConfirm($(".warning_info").html(), cfg);
	    }

	    /**
	     * 初始化缺货登记功能
	     */
	    function qh() {
	        if (window.tel) {
	            window.bravetime.info("缺货信息提交中");
	            $.ajax({
	                url: window.qhurl,
	                data: {
	                    goodId: window.good_id,
	                    tel: window.tel
	                }, success: function (d) {
	                    if (typeof d == "string") {
	                        d = JSON.parse(d);
	                    }
	                    if (d["error_code"] == 0) {
	                        window.bravetime.info(d["error_msg"]);
	                    } else {
	                        window.bravetime.info(d["error_msg"]);
	                    }

	                }, error: function () {
	                    bravetime.ajaxError(14);
	                }
	            });
	        } else {
	            var cfg = {};
	            cfg["okText"] = "提交";
	            cfg["okLink"] = function () {
	                var tel = $("#qh_form").find("input").val();
	                window.bravetime.info("缺货信息提交中");
	                $.ajax({
	                    url: window.qhurl,
	                    data: {
	                        goodId: window.good_id,
	                        tel: tel
	                    }, success: function (d) {
	                        if (typeof d == "string") {
	                            d = JSON.parse(d);
	                        }
	                        if (d["error_code"] == 0) {
	                            window.bravetime.info("信息登记成功");
	                        } else {
	                            window.bravetime.info(d["error_msg"]);
	                        }

	                    }, error: function () {
	                        bravetime.ajaxError(14);
	                    }
	                });
	            };
	            var formStr = '<form id="qh_form" style="margin:0;">' +

	                '<input  style="padding:4px;font-size:14px;line-height:1.5;margin-bottom: 0;margin-top: 15px;width: auto;border-radius: 0;box-shadow: none;  text-align: center;" type="tel" placeholder="请填写手机号">' +
	                '</form>';
	            window.bravetime.newConfirm(formStr, cfg);
	        }

	    }


	    /**
	     * 初始化子属性
	     */
	    function initChildType() {
	        alertContainer = $(".s-decision-wrapper");
	        numberInput = alertContainer.find("input");
	        okButton = alertContainer.find(".option").find(".ok");
	        buyNowButton = alertContainer.find(".option").find(".buy_now");
	        typePrice = alertContainer.find('.priceContainer');
	        typeTitle = alertContainer.find(".title");
	        typeStock = alertContainer.find(".stock-control");
	        newGoodDetailList = handlerGoodDetailData(goodDetail, goodType);
	        newGoodDetail = newGoodDetailList[0];
	        newTypeData = newGoodDetailList[4];
	        allTypeLength = goodType.length;
	        defaultTypeStock = newGoodDetailList[3];
	        defaultPriceStr = (newGoodDetailList[1] == newGoodDetailList[2]) ? (newGoodDetailList[1].toFixed(2)) : ( "￥" + newGoodDetailList[1].toFixed(2) + " ~ " + "￥" + newGoodDetailList[2].toFixed(2));
	        typeTitle.html("请选择" + defaultTypeStr);
	        typePrice.html(defaultPriceStr);
	        typeStock.html("库存：" + defaultTypeStock + "件");

	        for (var i = 0; i < goodType.length; i++) {
	            currentTypeStatus[goodType[i]["id"]] = null;
	            defaultTypeStr += " " + goodType[i]["title"];
	            needToChoice[i] = goodType[i]["title"];
	        }

	        buyButton.click(detailBuy);
	        cartButton.click(detailCart);
	        // 监听数量按钮
	        alertContainer.find(".change_num").click(changeNumber);

	        // 监听数量输入
	        numberInput.blur(changeNumber);

	        // 监听确定按钮
	        okButton.click(clickOkButton);

	        // 监听立即购买按钮
	        buyNowButton.click(clickbuyNowButton);

	        handlerTypeDom(goodType);
	        alertContainer.click(function (event) {
	            var className = event["target"]["className"];
	            if (className == "s-decision-wrapper" || className == "dav_icon_detail_close_btn") {
	                removeAlertContainer();
	            } else if (className.indexOf("button") > -1) {
	                buttonClick(event["target"]);

	                ////请选择弹出层后
	                //var Select_data = [];
	                //var selected = $(".sku-control").find(".items");
	                //for(var i=0;i<selected.size();i++){
	                //    var select =  $(".sku-control").find(".items:eq("+i+")").find(".active").html();
	                //    if(select == undefined){
	                //
	                //    }else{
	                //        Select_data.push(select);
	                //    }
	                //
	                //}
	                //console.log(Select_data);
	                //if(Select_data.length !== 0){
	                //    var Html="";
	                //    for(var j=0;j<Select_data.length;j++){
	                //        var htmls = '<span>'+Select_data[j]+'</span>';
	                //        Html+=htmls
	                //    }
	                //    selectContent.html(Html);
	                //    selectTitle.html("已选择");
	                //}else{
	                //    selectTitle.html("请选择");
	                //    selectContent.html(defaultTypeStr);
	                //}


	            }
	        });

	        // 默认点击的情况
	        if (window.defaultKey && newGoodDetail[window.defaultKey][1]) {
	            fireClick(defaultKey);
	        }
	    }


	    /**
	     * 模拟点击
	     * @param {Array} key 模拟点击的key
	     */
	    function fireClick(key) {
	        var keyList = key.split(":");
	        for (var i = 0, l = buttonList.length; i < l; i++) {
	            for (var j = 0, len = keyList.length; j < len; j++) {
	                var $button = buttonList[i];
	                var btnId = $button.data("data-for-key");
	                if (btnId == keyList[j]) {
	                    buttonClick($button[0]);
	                }
	            }
	        }
	    }

	    /**
	     * 点击确定按钮
	     * @returns {boolean}
	     */
	    function clickOkButton() {
	        var commitType =1;
	        // 禁止点击时候再点击就直接拒绝
	        if (okButton.hasClass("disabled")) {
	            return false;
	        }
	        // 如果所有属性都已经选择了
	        if (needToChoice.length == 0) {
	            // 先检查当前商品数量和库存对比，过大则提示
	            var currentNum = numberInput.val();
	            if (currentNum > finalNum) {
	                bravetime.info("您选择的商品数量过大，请更改");
	                return false;
	            } else {
	                var goodsId = goodOtherInfo[finalTypeStr][2];
	                var sag_id = goodOtherInfo[finalTypeStr][0];
	                var goods_price = goodDetail[finalTypeStr][0];
	                var goods_name = goodOtherInfo[finalTypeStr][1];
	                var number = currentNum;

	                // 发请求
	                var goods = {};
	                var spec_arr = [];

	                goods.quick = commitType;
	                goods.spec = spec_arr;
	                goods.goods_id = goodsId;
	                goods.number = number;
	                goods.sag_id = sag_id;
	                goods.price = goods_price;
	                goods.name = goods_name;

	                disableButtonForLoading(okButton, commitType ? "&nbsp;&nbsp;&nbsp;加入中" : "&nbsp;&nbsp;&nbsp;跳转中");

	                $.ajax({
	                    url:window.buyUrl,
	                    type:"post",
	                    dataType:"json",
	                    data:{
	                        goods: JSON.stringify(goods)
	                    },
	                    success:function (data) {
	                        if (typeof  data == "string") {
	                            data = JSON.parse(data);
	                        }
	                        if (data.error > 0) {
	                            if(data.url){
	                                window.bravetime.newAlert(data.message,function () {
	                                    window.nativeLoginFunction(data.url,function () {
	                                        location.reload();
	                                    })
	                                });
	                            }else{
	                                // 如果失败的话，首先弹出错误信息
	                                window.bravetime.info(data.message);
	                                // 然后刷新子属性数量和价格
	                                // refreshTypeContainer(data.newInfo, !!data.disable);
	                                // 恢复确定按钮
	                                enableButtonForLoading(okButton, "确定")
	                            }

	                        } else {

	                            // 如果成功的话,先让弹出框消失
	                            removeAlertContainer();

	                            // 然后操作
	                            if (commitType == 0) {  // 购买就直接跳走
	                                var callback = 'index.php?m=default&c=cart&a=cart';
	                                window.bravetime.goto(callback);
	                            } else if (commitType == 1) { // 购物车增加一系列动画
	                                // 恢复确定按钮
	                                enableButtonForLoading(okButton, "确定");
	                                setTimeout(function () {
	                                    addCartAnimate(+data["cart_number"]);
	                                }, 200);
	                            }

	                        }
	                    },error:function () {
	                        window.bravetime.info("网络异常，请稍后重试");
	                        // 恢复确定按钮
	                        enableButtonForLoading(okButton, "确定")
	                    }
	                });
	                if (commitType == 0) {
	                    if (window.buyCallback && typeof window.buyCallback == "function") {
	                        window.buyCallback(goodsId);
	                    }
	                } else if (commitType == 1) {
	                    if (window.cartCallback && typeof window.cartCallback == "function") {
	                        window.cartCallback(goodsId);
	                    }
	                }

	            }


	        } else {
	            bravetime.info("请选择 " + needToChoice.join(" "));
	        }
	    }

	    /**
	     * 点击立即购买按钮
	     * @returns {boolean}
	     */
	    function clickbuyNowButton() {
	        // 禁止点击时候再点击就直接拒绝
	        if (buyNowButton.hasClass("disabled")) {
	            return false;
	        }
	        // 如果所有属性都已经选择了
	        if (needToChoice.length == 0) {
	            // 先检查当前商品数量和库存对比，过大则提示
	            var currentNum = numberInput.val();
	            if (currentNum > finalNum) {
	                bravetime.info("您选择的商品数量过大，请更改");
	                return false;
	            } else {
	                var goodsId = goodOtherInfo[finalTypeStr][2];
	                var sag_id = goodOtherInfo[finalTypeStr][0];
	                var goods_price = goodDetail[finalTypeStr][0];
	                var goods_name = goodOtherInfo[finalTypeStr][1];
	                var number = currentNum;

	                // 发请求
	                var goods = {};
	                var spec_arr = [];

	                goods.quick = commitType;
	                goods.spec = spec_arr;
	                goods.goods_id = goodsId;
	                goods.number = number;
	                goods.sag_id = sag_id;
	                goods.price = goods_price;
	                goods.name = goods_name;

	                disableButtonForLoading(buyNowButton, commitType ? "&nbsp;&nbsp;&nbsp;加入中" : "&nbsp;&nbsp;&nbsp;跳转中");

	                $.ajax({
	                    url:window.buyUrl,
	                    type:"post",
	                    dataType:"json",
	                    data:{
	                        goods: JSON.stringify(goods)
	                    },success:function (data) {
	                        if (typeof  data == "string") {
	                            data = JSON.parse(data);
	                        }
	                        if (data.error > 0) {
	                            if(data.url){
	                                window.bravetime.newAlert(data.message,function () {
	                                    window.nativeLoginFunction(data.url,function () {
	                                        location.reload();
	                                    })
	                                });
	                            }else{
	                                // 如果失败的话，首先弹出错误信息
	                                window.bravetime.info(data.message);
	                                // 然后刷新子属性数量和价格
	                                // refreshTypeContainer(data.newInfo, !!data.disable);
	                                // 恢复确定按钮
	                                enableButtonForLoading(buyNowButton, "立即购买")
	                            }

	                        } else {
	                            // 购买就直接跳走
	                            var callback = 'index.php?m=default&c=cart&a=cart';
	                            window.bravetime.goto(callback);
	                        }
	                    },error:function () {
	                        window.bravetime.info("网络异常，请稍后重试");
	                        // 恢复确定按钮
	                        enableButtonForLoading(buyNowButton, "立即购买")
	                    }
	                });
	                if (window.buyCallback && typeof window.buyCallback == "function") {
	                    window.buyCallback(goodsId);
	                }
	            }


	        } else {
	            bravetime.info("请选择 " + needToChoice.join(" "));
	        }
	    }

	    /**
	     * 商品加入购物车动画
	     * @param {Number} cartNumber
	     */
	    function addCartAnimate(cartNumber) {
	        // 取第一个头图
	        var imgUrl = ttUrl || main.find(".iosSlider").find("img").attr("src");
	        // 初始化
	        var img = $('<img src="' + imgUrl + '"/>').css({position: "fixed", "z-index": 99, border: "#ccc solid 1px"});
	        if ($(window).width() < 640) {
	            img.css("width", "150px").css("bottom", "300px").css("left", "50%").css("margin-left", "-75px");
	            $("body").append(img);
	            // 动画来了
	            img.animate({width: "10px", bottom: "35px", left: "10%", "margin-left": "0px"}, 800);
	        } else {
	            img.css("width", "150px").css("bottom", "300px").css("margin-left", "245px");
	            $("body").append(img);
	            // 动画来了
	            img.animate({width: "10px", bottom: "35px", "margin-left": "0px"}, 800);
	        }

	        setTimeout(function () {
	            // 更改购物车内商品数量展示
	            bottom.find(".cart_link").html('<i class="menu-i menu-i-3"></i><b>' + cartNumber + "</b>");
	            img.remove();
	            addOtherAnimate();
	        }, 801);

	        function addOtherAnimate() {
	            if (tipCartLink) {
	                tipCartLink.removeClass("hide").addClass("show");
	                setTimeout(function () {
	                    tipCartLink.addClass("hide").removeClass("show");
	                }, 2500);
	            }
	        }
	    }

	    /**
	     * 刷新子属性数量和价格
	     * @param data
	     * @param flag
	     */
	    /*
	    function refreshTypeContainer(data, flag) {
	        // 更新下改的那些数据
	        goodDetail[finalTypeStr] = data[0];
	        goodOtherInfo[finalTypeStr] = data[1];
	        // 重复初始化的那些
	        newGoodDetailList = handlerGoodDetailData(goodDetail, goodType);
	        newGoodDetail = newGoodDetailList[0];
	        newTypeData = newGoodDetailList[4];
	        defaultTypeStock = newGoodDetailList[3];
	        defaultPriceStr = (newGoodDetailList[1] == newGoodDetailList[2]) ? (newGoodDetailList[1].toFixed(2)) : ( "￥" + newGoodDetailList[1].toFixed(2) + " ~ " + "￥" + newGoodDetailList[2].toFixed(2));
	        var key = finalTypeStr;
	        fireClick(key);
	        if (!flag) {
	            fireClick(key);
	        }
	    }
	     */

	    /**
	     * 弹层中修改商品数量
	     * @param el
	     * @param flag
	     */
	    function changeNumber(el, flag) {
	        var currentTarget = $(el.target),
	            goodItem = $(el.target).parents(".number"),
	            numberInput = goodItem.find("input"),
	            minusButton = goodItem.find(".minus"),
	            plusButton = goodItem.find(".plus"),
	            currentCount = parseInt(numberInput.val()),
	            step = 0,
	            minCount = +goodItem.attr("min-count") || defaultMinCount,
	            maxCount = +goodItem.attr("max-count") || defaultMaxCount;
	        if (currentTarget.hasClass("disable")) {
	            return;
	        }

	        //判断商品数量是否合法
	        if (isNaN(currentCount)) {
	            currentCount = 1;
	        }

	        if (currentTarget.hasClass("plus")) {
	            step = 1;
	        } else if (currentTarget.hasClass("minus")) {
	            step = -1;
	        }
	        currentCount += step;

	        numberInput.val(currentCount);

	        plusButton.toggleClass('disable', currentCount >= maxCount);
	        minusButton.toggleClass('disable', currentCount <= minCount);
	    }

	    /**
	     * 立即购买按钮被点击
	     */
	    function detailBuy() {
	        commitType = 0;
	        alertTypeChoiceContainer();
	    }

	    /**
	     * 加入购物车按钮被点击
	     */
	    function detailCart() {
	        commitType = 1;
	        //addCartAnimate(11);
	        alertTypeChoiceContainer();
	    }

	    /**
	     * 弹出弹出框
	     * @param type
	     */
	    function alertTypeChoiceContainer(type) {
	        if (type) { // 点击属性时候弹出
	            buyNowButton.removeClass("hide");
	            okButton.removeClass("ok2").find("span").text("加入购物车")
	        } else { // 点击底部按钮
	            buyNowButton.addClass("hide");
	            okButton.addClass("ok2").find("span").text("确定");
	            if (commitType == 0 && needToChoice.length == 0) { // 立即购买时候判断是不是所有属性都选了
	                // 先检查当前商品数量和库存对比，过大则提示
	                var currentNum = numberInput.val();
	                if (currentNum > finalNum) {
	                    bravetime.info("您选择的商品数量过大，请更改");
	                    return false;
	                } else {
	                    var goodsId = goodOtherInfo[finalTypeStr][2];
	                    var sag_id = goodOtherInfo[finalTypeStr][0];
	                    var goods_price = goodDetail[finalTypeStr][0];
	                    var goods_name = goodOtherInfo[finalTypeStr][1];
	                    var number = currentNum;

	                    // 发请求
	                    var goods = {};
	                    var spec_arr = [];

	                    goods.quick = commitType;
	                    goods.spec = spec_arr;
	                    goods.goods_id = goodsId;
	                    goods.number = number;
	                    goods.sag_id = sag_id;
	                    goods.price = goods_price;
	                    goods.name = goods_name;

	                    disableButtonForLoading(buyButton, commitType ? "&nbsp;&nbsp;&nbsp;加入中" : "&nbsp;&nbsp;&nbsp;跳转中");
	                    $.ajax({
	                        url:window.buyUrl,
	                        type:"post",
	                        dataType:"json",
	                        data:{
	                            goods: JSON.stringify(goods)
	                        },
	                        success:function (data) {
	                            if (typeof  data == "string") {
	                                data = JSON.parse(data);
	                            }
	                            if (data.error > 0) {
	                                // 如果失败的话，首先弹出错误信息
	                                if(data.url){
	                                    window.bravetime.newAlert(data.message,function () {
	                                        window.nativeLoginFunction(data.url,function () {
	                                            location.reload();
	                                        })
	                                    });
	                                }else{
	                                    bravetime.info(data.message);
	                                    showIt();
	                                }


	                                // 然后刷新子属性数量和价格
	                                // refreshTypeContainer(data.newInfo, !!data.disable);
	                                // 恢复确定按钮
	                                enableButtonForLoading(buyButton, "立即购买")
	                            } else {
	                                var callback = 'index.php?m=default&c=cart&a=cart';
	                                window.bravetime.goto(callback);

	                            }
	                        },error:function () {
	                            window.bravetime.info("网络异常，请稍后重试");
	                            // 恢复确定按钮
	                            enableButtonForLoading(buyButton, "立即购买")
	                        }
	                    });

	                }

	                return false
	            }

	        }
	        showIt()

	        function showIt() {
	            var inner = alertContainer.find(".s-decision");
	            alertContainer.css("opacity", 0);
	            inner.css("bottom", -height + "px");
	            alertContainer.removeClass("hide");
	            alertContainer.animate({opacity: 1}, 200);
	            inner.animate({bottom: "0px"}, 250);
	            main.addClass("lock");
	        }

	    }

	    /**
	     * 关闭弹出框
	     */
	    function removeAlertContainer() {
	        main.removeClass("lock");
	        var inner = alertContainer.find(".s-decision");
	        alertContainer.animate({opacity: 0}, 200);
	        inner.animate({bottom: "-500px"}, 250, "linear", function () {
	            alertContainer.addClass("hide");
	        });

	    }

	    /**
	     * 处理详细信息数据
	     * @param detailData
	     * @param typeData
	     * @returns {*[]}
	     */
	    function handlerGoodDetailData(detailData, typeData) {
	        var min = Infinity, max = 0, all = 0;
	        var newDetailData = {};
	        var newTypeData = {};
	        for (var i = 0, len = typeData.length; i < len; i++) {
	            newTypeData["__" + typeData[i]["id"]] = typeData[i]["title"];
	            for (var j = 0, detailLen = typeData[i]["detail"].length; j < detailLen; j++) {
	                newTypeData[typeData[i]["detail"][j]["key"]] = typeData[i]["detail"][j]["value"];
	            }
	        }
	        for (var i in detailData) {
	            // then analysis data
	            var keys = i.split(":"),  r = [];
	            // add new_activity item ,and link it with other in array
	            for (var j = 0; j < keys.length; j++) {
	                var len = r.length;
	                r.push(keys[j].toString());
	                for (var k = 0; k < len; k++) {
	                    r.push(r[k] + ":" + keys[j]);
	                }
	            }
	            // 处理数据
	            for (var m = 0; m < r.length; m++) {
	                if (newDetailData[r[m]] && typeof newDetailData[r[m]][1] != "undefined") {
	                    if (detailData[i][1] != 0) { // 价格为0就不加入
	                        if (newDetailData[r[m]][0]) {
	                            newDetailData[r[m]][0] = newDetailData[r[m]][0].toString() + "," + detailData[i][0].toString();
	                        } else {
	                            newDetailData[r[m]][0] = detailData[i][0];
	                        }

	                    }
	                    // 数量相加
	                    newDetailData[r[m]][1] += detailData[i][1];
	                    // 限购导致的剩余数量和不限购的总数量的和
	                    if (detailData[i][1] == 0) {
	                        newDetailData[r[m]][6] += 0;
	                    } else if (detailData[i][3] < 0) {
	                        // 不限购的话增加商品数量
	                        newDetailData[r[m]][6] += detailData[i][1];
	                    } else {
	                        // 限购的话增加剩余限购数量
	                        newDetailData[r[m]][6] += Math.max(0, detailData[i][3] - detailData[i][4]);
	                    }
	                } else {
	                    newDetailData[r[m]] = [];
	                    // 价格为0就不加入
	                    if (detailData[i][1] != 0) {
	                        newDetailData[r[m]][0] = detailData[i][0];
	                    }
	                    newDetailData[r[m]][1] = detailData[i][1];
	                    newDetailData[r[m]][2] = detailData[i][2];
	                    newDetailData[r[m]][5] = detailData[i][4];
	                    newDetailData[r[m]][4] = detailData[i][3];
	                    if (detailData[i][1] == 0) {
	                        newDetailData[r[m]][6] = 0;
	                    } else if (detailData[i][3] < 0) {
	                        newDetailData[r[m]][6] = detailData[i][1];
	                    } else {
	                        newDetailData[r[m]][6] = Math.max(0, (detailData[i][3]||0) - (detailData[i][4]||0));
	                    }

	                }
	            }

	            if (detailData[i][0] > max && detailData[i][1] != 0 && (detailData[i][3] < 0 || (detailData[i][4] < detailData[i][3]))) {
	                max = detailData[i][0];
	            }
	            if (detailData[i][0] < min && detailData[i][1] != 0 && (detailData[i][3] < 0 || (detailData[i][4] < detailData[i][3]))) {
	                min = detailData[i][0];
	            }
	            all += detailData[i][1];
	        }

	        for (var i in newDetailData) {
	            var array = i.split(":");
	            for (var j = 0, len = array.length; j < len; j++) {
	                array[j] = newTypeData[array[j]];
	            }
	            newDetailData[i][3] = array;
	        }
	        return [newDetailData, min, max, all, newTypeData];
	    }

	    /**
	     * 新增类型按钮
	     * @param goodTypeData
	     */
	    function handlerTypeDom(goodTypeData) {
	        var ul = alertContainer.find(".s-decision").find("ul").html("");
	        // 设置中间位置高度
	        alertContainer.find(".sku-control").css("height", (Math.floor(height * 0.7) - 85) + "px");
	        // clear ul;
	        for (var i = 0, l = goodTypeData.length; i < l; i++) {
	            var li = $("<li></li>").html('<div class="s-decision_title">' + goodTypeData[i]["title"] + '</div><div class="items"></div></div> ');
	            ul.append(li); // add li
	            $.data(li[0], "data-for-id", goodTypeData[i]["id"]);
	            buttonListByLi[goodTypeData[i]["id"]] = [];
	            var item = li.find(".items");
	            var detail = goodTypeData[i]["detail"], detailLength = detail.length;
	            for (var j = 0; j < detailLength; j++) {
	                var key = detail[j]["key"];
	                var button = $("<span></span>").addClass("button").html(detail[j]["value"]);
	                $.data(button[0], "data-for-key", key);
	                if (newGoodDetail[key][1] == 0 || newGoodDetail[key][6] == 0) {
	                    button.addClass("disabled")
	                }
	                buttonListByLi[goodTypeData[i]["id"]].push(button[0]);
	                item.append(button); // add button
	                buttonList.push(button);
	            }
	        }
	    }

	    /**
	     * 点击子属性按钮
	     * @param {Object} button
	     * @returns {boolean}
	     */
	    function buttonClick(button) {
	        var id = $.data(button.parentNode.parentNode, "data-for-id"), key = $.data(button, "data-for-key"), $button = $(button);
	        // 如果不可点击，直接返回
	        if ($button.hasClass("disabled")) {
	            return false;
	        } else if ($button.hasClass("active")) {
	            // 已经选中的话 取消选中
	            $button.removeClass("active");
	            currentTypeStatus[id] = null;
	            updateButtonDom($button);
	            return false;
	        }
	        // 可以点击的话，把同属性设置为未点击，当前设置为已点击
	        $button.parent().find("span.button").removeClass("active");
	        $button.addClass("active");
	        // 记录当前选中情况
	        currentTypeStatus[id] = key;
	        updateButtonDom($button);

	    }

	    /**
	     * 更新按钮
	     * @param $button
	     */
	    function updateButtonDom($button) {
	        var currentLength = 0, typeArray = [], choice = [], toChoice = [];

	        for (var i in currentTypeStatus) {
	            if (currentTypeStatus[i]) {
	                currentLength++;
	                typeArray.push(currentTypeStatus[i]);
	                choice.push([i, currentTypeStatus[i]]);
	            } else {
	                toChoice.push(newTypeData["__" + i]);
	            }

	        }
	        needToChoice = toChoice;
	        var typeStr = typeArray.sort(function (a, b) {
	            return a - b;
	        }).join(":");
	        finalTypeStr = typeStr;
	        if (typeStr.length) {
	            newGoodDetail[typeStr] = newGoodDetail[typeStr] || [9999, 0, 0, ""];
	            var newGood = newGoodDetail[typeStr];
	            var taxes =  '0.00';
	            var isLimit =false;
	            if(goodsTaxesAndLimitInfo[typeStr]){
	                taxes = goodsTaxesAndLimitInfo[typeStr][0];
	                isLimit = goodsTaxesAndLimitInfo[typeStr][1];
	            }

	            typeTitle.html("您已选择：" + newGood[3].join(' '));
	            selectTitle.html("已选择");
	            selectContent.html('<span>' + newGood[3].join('</span><span>') + '</span>');
	            // 所有属性都选完了以后，更新价格和库存
	            if (currentLength == allTypeLength) {
	                // 活动信息
	                var otherInfo = "";
	                if (newGood[2] == 1) {
	                    otherInfo = '<span style="margin-left: 4px; font-size: 12px;">（参与“秒杀”活动）</span>';
	                } else if (newGood[4] > -1&&isLimit) {
	                    // 有限购
	                    if (newGood[5] > 0) {
	                        otherInfo = '<span style="margin-left: 4px; font-size: 12px;">（本商品限量购买' + newGood[4] + '件，您已经购买了' + newGood[5] + '件）</span>';
	                    } else {
	                        otherInfo = '<span style="margin-left: 4px; font-size: 12px;">（本商品限量购买' + newGood[4] + '件）</span>';
	                    }

	                }
	                else if (newGood[2] == 2) {
	                    otherInfo = '<span style="margin-left: 4px; font-size: 12px;">（参与“团购”活动）</span>';
	                }else if(taxes!="0.00"){
	                    otherInfo = '<span style="margin-left: 4px; font-size: 12px;"> (含税 ￥'+taxes+') </span>';
	                }
	                // 更改价格
	                typePrice.html("￥" + newGood[0].toFixed(2) + otherInfo);
	            } else {
	                // 更改价格
	                var priceList = newGood[0].toString().split(",");
	                var priceMax = Math.max.apply(null, priceList);
	                var priceMin = Math.min.apply(null, priceList);
	                if (priceMax == priceMin) {
	                    typePrice.html("￥" + priceMin.toFixed(2));
	                } else {
	                    typePrice.html("￥" + priceMin.toFixed(2) + " ~ " + "￥" + priceMax.toFixed(2));
	                }
	            }
	            // 更改库存
	            typeStock.html("库存：" + newGood[1] + "件");
	            finalNum = newGood[1];
	            // 更改数量范围
	            alertContainer.find(".number").attr("max-count", Math.min(newGood[6], newGood[1]));
	            if (newGood[2] == 1) {
	                alertContainer.find(".number").attr("max-count", 1);
	            }
	            // 更新加减号状态
	            changeNumber({target: alertContainer.find("input")[0]});
	        } else {
	            typeTitle.html("请选择" + defaultTypeStr);
	            typePrice.html(defaultPriceStr);
	            typeStock.html("库存：" + defaultTypeStock + "件");
	            selectTitle.html("请选择");
	            selectContent.html(defaultTypeStr);
	        }


	        // 每次选择，更新其他属性价格
	        // 需要更新的按钮
	        var buttonListToUpdate = filterButtonByButton($button);
	        updateOtherButtonStatus(buttonListToUpdate, choice);

	    }

	    /**
	     * 更新其他按钮状态
	     * @param list
	     * @param c
	     */
	    function updateOtherButtonStatus(list, choice) {

	        for (var i = 0, l = list.length; i < l; i++) {
	            var button = list[i];
	            var id = $.data(button.parentNode.parentNode, "data-for-id");
	            var c = [];
	            for (var j = 0, len = choice.length; j < len; j++) {
	                if (choice[j][0] != id) {
	                    c.push(choice[j][1]);
	                }
	            }
	            var str = c.concat($.data(button, "data-for-key")).sort(function (a, b) {
	                return a - b;
	            }).join(":");
	            newGoodDetail[str] = newGoodDetail[str] || [9999, 0, 0, ""];
	            var num = newGoodDetail[str][1];
	            var numEnable = newGoodDetail[str][6];
	            if (num == 0 || numEnable == 0) {
	                $(button).addClass("disabled");
	            } else {
	                $(button).removeClass("disabled");
	            }
	        }
	    }

	    /**
	     * 筛选要更新的按钮,结果是所有其他列的按钮
	     */
	    function filterButtonByButton($btn) {
	        var buttonListToUpdate = [];
	        var liId = $.data($btn.parent().parent()[0], "data-for-id");
	        for (var i in buttonListByLi) {
	            if (i != liId) {
	                buttonListToUpdate = buttonListToUpdate.concat(buttonListByLi[i]);
	            }
	        }
	        return buttonListToUpdate;
	    }

	    /**
	     * 普通商品购买
	     */
	    function detailBuyNormal() {
	        var goods = {};
	        var spec_arr = [];
	        var number = 1;
	        var quick = 0;

	        goods.quick = quick;
	        goods.spec = spec_arr;
	        goods.goods_id = goodsId;
	        goods.number = number;
	        goods.sag_id = sag_id;
	        goods.price = goods_price;
	        goods.name = goods_name;

	        disableButtonForLoading(buyButton, "&nbsp;&nbsp;&nbsp;跳转中");

	        $.ajax({
	            url:window.buyUrl,
	            type:"post",
	            dataType:"json",
	            data:{
	                goods: JSON.stringify(goods)
	            },
	            success:function (data) {
	                if (data.error > 0) {
	                    if(data.url){
	                        window.bravetime.newAlert(data.message,function () {
	                            window.nativeLoginFunction(data.url,function () {
	                                location.reload();
	                            })
	                        });
	                    }else{
	                        bravetime.info(data.message)
	                    }

	                    enableButtonForLoading(buyButton, "立即购买");
	                } else {
	                    var callback = 'index.php?m=default&c=cart&a=cart&rp=goods_detail&rl=add';
	                    window.bravetime.goto(data.url||callback);
	                }
	            },error:function () {
	                window.bravetime.info("网络异常，请稍后重试");
	                enableButtonForLoading(buyButton, "立即购买");
	            }
	        });
	        if (window.buyCallback && typeof window.buyCallback == "function") {
	            window.buyCallback(goodsId);
	        }
	    }

	    /**
	     * 普通商品加入购物车
	     */
	    function detailCartNormalTodo() {
	        var goods = {};
	        var spec_arr = [];
	        var number = 1;
	        var quick = 1;

	        goods.quick = quick;
	        goods.spec = spec_arr;
	        goods.goods_id = goodsId;
	        goods.number = number;
	        goods.sag_id = sag_id;
	        goods.price = goods_price;
	        goods.name = goods_name;

	        disableButtonForLoading(cartButton, "&nbsp;&nbsp;&nbsp;加入中...");

	        $.ajax({
	            url:window.buyUrl,
	            type:"post",
	            dataType:"json",
	            data:{
	                goods: JSON.stringify(goods)
	            },
	            success:function (data) {
	                enableButtonForLoading(cartButton, "加入购物车");
	                if (data.error > 0) {
	                    if (data.error == 2) {
	                        window.bravetime.confirm("商品已经在购物车中", {
	                            okText: "再逛逛",
	                            // okLink:"/", //点击再逛逛跳到的链接
	                            cancelText: "去购物车",
	                            cancelLink: "/cart.html" //点击去结算跳到的链接
	                        });
	                    } else {
	                        window.bravetime.info(data.message);
	                    }
	                } else {
	                    addCartAnimate(data["cart_number"]);
	                }
	            },
	            error:function () {
	                window.bravetime.info("网络异常，请稍后重试");
	                enableButtonForLoading(cartButton, "加入购物车");
	            }
	        });


	        if (window.cartCallback && typeof window.cartCallback == "function") {
	            window.cartCallback(goodsId);
	        }
	    }

	    /**
	     * loading时禁止按钮
	     * @param el
	     * @param text
	     */
	    function disableButtonForLoading(el, text) {
	        el.addClass("disabled");
	        el.find("span.text").html(text);
	    }

	    /**
	     * loading结束解除按钮禁止
	     * @param el
	     * @param text
	     */
	    function enableButtonForLoading(el, text) {
	        el.removeClass("disabled");
	        el.find("span.text").html(text);
	    }

	    /**
	     * 初始化收藏功能
	     */
	    function initCollect() {
	        var collectContainer = bottom.find(".collect");
	        // 向前面版本兼容
	        if (collectContainer.length) {
	            var ico = collectContainer.find(".icon");
	            var txt = collectContainer.find(".collect_text");
	            collectContainer.click(function () {
	                bravetime.addLoader({little: true});
	                if (ico.hasClass("collect_icon")) {
	                    // 未收藏
	                    $.ajax({
	                        url: window.collectUrl,
	                        dataType: "json",
	                        data: {
	                            id: window.goodsId,
	                            collect: 1
	                        }, success: function (result) {
	                            bravetime.removeLoader();
	                            if (result["error"] == -1) {
	                                if(Units.isApp()){
	                                    var callback = function (r) {
	                                        if(typeof r == "string"){
	                                            r = JSON.parse(r);
	                                        }
	                                        var code = r.code;
	                                        if(code==0){
	                                            // 没登录
	                                        }else if(code == 1){
	                                            location.reload();
	                                        }
	                                    };
	                                    bravetime.nativeLogin(callback)
	                                }
	                                else {
	                                    bravetime.goto(result["url"]);
	                                }
	                            } else if (result["error"]) {
	                                bravetime.info(result["msg"]);
	                            } else {
	                                ico.removeClass("collect_icon").addClass("favorited_icon");
	                                txt.html("已收藏");
	                                bravetime.info("收藏成功");
	                            }

	                        }, error: function () {
	                            bravetime.removeLoader();
	                            bravetime.ajaxError(36);
	                        }
	                    });
	                } else {
	                    // 已收藏
	                    $.ajax({
	                        url: window.collectUrl,
	                        dataType: "json",
	                        //type:"POST",
	                        data: {
	                            id: window.goodsId,
	                            collect: 0
	                        }, success: function (result) {
	                            bravetime.removeLoader();
	                            if (result["error"]) {
	                                bravetime.info(result["msg"]);
	                            } else {
	                                ico.addClass("collect_icon").removeClass("favorited_icon");
	                                txt.html("收藏");
	                            }
	                        }, error: function () {
	                            bravetime.removeLoader();
	                            bravetime.ajaxError(36);
	                        }
	                    });
	                }
	            });
	        }

	    }



	});


	//引入 猜你喜欢 模块
	var maybeYouLike = __webpack_require__(536);
	var common = __webpack_require__(96);
	common.default.initShare(5);

	new Vue({
	    el: "#detail",
	    data:function(){
	        return{
	            msg:'hello vue'
	        }
	    },
	    components:{
	        maybeYouLike:maybeYouLike
	    }
	});
	//单品倒计时
	var seckillContainer = $(".seckillCountdown");
	var time = $(".time");
	var timestamp = Date.parse(new Date()) / 1000;

	if(seckillContainer.length){
	    var seckillTime = + indexSeckillCountdown;
	    seckillTime = seckillTime - timestamp ;


	    if(seckillTime<0){
	        time.html("<div class = 'super_price' style='float:right;font-size:18px;margin-right: 5px'>活动已结束</div>")
	    }else{
	        time.html(seckillCountdown(seckillTime));
	    }

	    var  ts = setInterval(function () {
	        if(seckillTime<0){
	            time.html("<div class = 'super_price' style='float:right;font-size:18px;margin-right: 5px'>活动已结束</div>")
	            clearInterval(ts);
	        }else{
	            time.html(seckillCountdown(seckillTime));
	        }
	        seckillTime--;
	    },1000);
	}



	function seckillCountdown(second) {
	    var s = second % 60, m = Math.floor(second / 60) % 60,
	        h = Math.floor(second / 60 / 60);
	    var str = '';
	    str = '<div class = "fz_13" style="text-align: center;">活动倒计时</div> <div> <div class="seckillCountdown"> <span class="seckill_bg">' + (h < 10 ? '0' : '') + h + '</span>' + '<span class="seckill_semicolon">' + ' : ' + '</span>' + '<span class="seckill_bg">' + (m < 10 ? '0' : '') + m +'</span>' + '<span class="seckill_semicolon">' + ' : ' + '</span>' + '<span class="seckill_bg">' + (s < 10 ? '0' : '') + s+'</span> </div> </div>'
	    //str ="<span class='seckill_bg'>" + (h < 10 ? "0" : "") + h + "</span>" + "<span class='seckill_semicolon'>" + " : " + "</span>" + "<span class='seckill_bg'>" + (m < 10 ? "0" : "") + m +"</span>" + "<span class='seckill_semicolon'>" + " : " + "</span>" + "<span class='seckill_bg'>" + (s < 10 ? "0" : "") + s+"</span>";
	    return str;
	}


/***/ },

/***/ 536:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(537)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/maybeYouLike.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(543)
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
	  var id = "_v-e7137222/maybeYouLike.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 537:
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
	var category = __webpack_require__(538);
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

/***/ 538:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(539)
	__vue_script__ = __webpack_require__(541)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] module/category.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(542)
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
	  var id = "_v-104fe19f/category.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 539:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(540);
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

/***/ 540:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.good_list_2_row {\n    background: #f1f1f1;\n    padding: 10px 5px;\n  }\n\n  .font-weight {\n    font-weight: 500;\n  }\n  .goods4_price_bar em {\n    font-style: normal;\n    font-size: 12px;\n    display: inline-block;\n    margin-right: 2px;\n  }\n\n  .good_list_2_row .good_item {\n    padding: 0 5px;\n    margin-bottom: 10px;\n  }\n\n  .good_list_2_row .good_item .good_img_container img {\n    border: none;\n  }\n\n  .good_con {\n    display: block;\n    background-color: #FFF;\n    padding: 10px;\n    padding-top: 0;\n    overflow: hidden;\n  }\n\n  .good_con .fz_12 {\n    overflow: hidden;\n    height: 16px;\n    line-height: 16px;\n  }\n\n  .good_con .fz_12 .dav-color-price {\n    display: inline-block;\n  }\n\n  .good_con .nowPrice {\n    font-size: 16px;\n  }\n\n  .good_list_2_row .good_item .lable {\n    color: #FF4A7D;\n    font-size: 10px;\n    display: inline-block;\n    margin-left: 4px;\n    font-family: sans-serif;\n    background-color: #FFF;\n    float: right;\n    -webkit-box-sizing: border-box;\n    position: relative;\n    top: 7.89473%;\n    padding: 0 2px;\n    border: 1px solid #FF4A7D;\n    line-height: 15px;\n    border-radius: 4px;\n  }\n\n  .good_list_2_row .good_item .lable .border {\n    -webkit-transform: scale(0.5);\n    -ms-transform: scale(0.5);\n        transform: scale(0.5);\n    position: absolute;\n    border: 1px solid #FF4A7D;\n    top: -50%;\n    right: -50%;\n    bottom: -50%;\n    left: -50%;\n    border-radius: 7px;\n  }\n\n  .good_list_2_row .good_item .good_title {\n    margin-bottom: 4px;\n    -webkit-line-clamp: 2;\n    line-clamp: 2;\n    line-height: 19px;\n  }\n\n  .goods4_price_bar {\n    overflow: hidden;\n    height: 19px;\n    width: 200%;\n  }\n  .good_list_sell_out{\n    z-index: 0;\n  }\n.img_label{\n  font-weight: bold;\n  left: 0;\n  bottom:0;\n  position:absolute;\n  font-size: 10px;\n  opacity: 0.8;\n  background: -webkit-gradient(linear,left top, right top,from(#ff5b5b),to(#fa1862));\n  background: linear-gradient(90deg,#ff5b5b,#fa1862);\n  background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);\n  color:#fff;\n  line-height: 16px;\n  padding:1px 8px 0 6px;\n  border-top-right-radius: 8px;\n}\n.img_label:after{\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 0 4px 10px 0;\n  border-style: solid;\n  border-color: transparent transparent #fa1862 transparent;\n  position: absolute;\n  margin-left: 8px;\n  bottom: 0;\n}\n.img_container{\n  position: relative;\n}\n.vip_return{\n  line-height: 1;\n  font-size: 0;\n  color: #BF9D51;\n  padding-left: 4px;\n  position: relative;\n  display: inline-block;\n  -webkit-transform: scale(0.5);\n  -webkit-transform-origin: 0 60%;\n  -ms-transform: scale(0.5);\n      transform: scale(0.5);\n  -ms-transform-origin: 0 60%;\n      transform-origin: 0 60%;\n  vertical-align: middle;\n  margin-bottom: 4px;\n}\n.vip_return .vip_return_title{\n  font-size: 22px;\n}\n.vip_return .vip_return_f{\n  font-size: 18px;\n  padding: 0 2px 0 4px;\n}\n.vip_return .vip_return_price{\n  font-size: 24px;\n}\n @media screen and (max-width:374px){\n    .vip_return{\n      padding-left:0;\n      margin-bottom: 3px;\n    }\n    .vip_return .vip_return_title{\n      font-size: 20px;\n    }\n    .vip_return .vip_return_f{\n      font-size: 14px;\n      padding: 0 2px 0 4px;\n    }\n    .vip_return .vip_return_price{\n      font-size: 20px;\n    }\n }\n", ""]);

	// exports


/***/ },

/***/ 541:
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

/***/ 542:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"good_list_con\">\n    <div class=\"good_list_2_row\">\n        <!--单个商品模版template-->\n        <a v-for=\"item in list\" :data-id=\"item.goods_id\" :href=\"a_href(item.goods_id)\"\n                 class=\"good_item\">\n                <div class=\"good_img_container\">\n                    <div class=\"img_container\">\n                        <img :src=\"item.goods_img\" style=\"display: inline;\">\n                        <span class=\"img_label\" v-if=\"item.goods_label!=''\" v-text=\"item.goods_label\"></span>\n                        <span class=\"img_label\" v-if=\"item.goods_label==''&&item.ratio\" v-text=\"'返现'+item.ratio+'倍'\"></span>\n                    </div>\n                    <div v-if = \"item.sale_status\" class=\"good_list_sell_out ng-scope\">\n                        <span v-if = \"item.sale_status == 'soldout'\" class=\"ng-scope\">售罄</span>\n                        <span v-if = \"item.sale_status == 'presale'\" class=\"ng-scope\">预售</span>\n                        <span v-if = \"item.sale_status == 'offline'\" class=\"ng-scope\">未上架</span>\n                    </div>\n                </div>\n\n                <div class=\"good_con\">\n                  <div class=\"good_title\">{{item.goods_name}}</div>\n                  <div class=\"goods4_price_bar\">\n                    <span class=\"dav-color-price font-weight\"><em class=\"fz_14\">¥</em><span class=\"nowPrice\"><span>{{(item.shop_price+\"\").split(\".\")[0]}}</span><span class=\"fz_14\" v-if=\"(item.shop_price+'').split('.').length == 2\">.{{(item.shop_price+\"\").split(\".\")[1]}}</span></span></span>\n                    <span class=\"vip_return\" v-if = \"(item.seller_income && item.seller_income != 0) || (item.comm_income && item.comm_income != 0)\">\n                      <span class=\"vip_return_title\">会员返</span>\n                      <span class=\"vip_return_f\">¥</span>\n                      <span class=\"vip_return_price\">{{item.seller_income||item.comm_income}}</span>\n                    </span>\n                  </div>\n                </div>\n              </a>\n        <!--不到50个商品展示这个template-->\n        <div style=\"clear: both;\"></div>\n        <div v-show = \"loading\" class=\"no_more\">\n            商品加载中 <img src=\"//pic.davdian.com/free/loading_03252.svg\">\n        </div>\n        <div v-show = \"no_more\" class=\"no_more\">\n            没有更多商品了\n        </div>\n    </div>\n    <div class=\"good_list_2_row\" ng-model=\"goods\">\n        <div style=\"clear:both\"></div>\n    </div>\n</div>\n";

/***/ },

/***/ 543:
/***/ function(module, exports) {

	module.exports = "\n<div class = \"mt_10\" id = \"comon\">\n    <div class=\"df_new_title_2\" style=\"border-bottom: none\">\n        <span class=\"df_new_font\">猜你喜欢</span>\n    </div>\n    <div class=\"logo_container\"  v-show = \"beforeFirstLoading\">\n        <div class=\"logo_left\"></div>\n        <div class=\"logo_right\"></div>\n    </div>\n    <div style=\"clear: both;\">\n    </div>\n    <category refer=\"guess_detail\" :referer=\"referer\"></category>\n    <!--<category refer=\"guess_detail\"-->\n              <!--:referer=\"referer\"-->\n              <!--:list = \"list\"-->\n              <!--:loading = \"beforeFirstLoading\"></category>-->\n\n</div>\n";

/***/ }

/******/ });