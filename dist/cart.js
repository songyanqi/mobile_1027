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
	__webpack_require__(440);
	__webpack_require__(419);
	__webpack_require__(41);
	__webpack_require__(43);
	__webpack_require__(42);
	__webpack_require__(442);
	__webpack_require__(443);



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

/***/ 440:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 442:
/***/ function(module, exports) {

	var loginReady = function () {
	    //输入手机号,密码input出现清空按钮,同时下面按钮变成可点击
	    $(".into").each(function () {
	        var $this = $(this);
	        $this.parent().find(".clear").click(function () {
	            $this.val("");//清除输入的内容
	            $this.focus();//保留光标
	            $(this).hide();
	            var parents = $this.parent().parent().parent();
	            parents.find(".sure_btn").addClass("btn-disable");
	        });

	        $this.on("input propertychange",function(){
	            input_changse($this);
	        })



	    });

	    //验证码部分使用了单独的css来区别当两个表单都为空或者都不为空的时候操作按钮的disable
	    $(".code_inputs3").on("input propertychange",function(){
	        if($(".code_inputs3_value").val() != "" && $(this).val() != ""){
	            $(".code_inputs3_btn").removeClass("btn-disable");
	        }else{
	            $(".code_inputs3_btn").addClass("btn-disable");
	        }
	    });

	    var input_changse = function ($this) {
	        if ($this.val().trim() != "") {
	            $this.parent().find(".clear").show();
	            var code_thiss = $this.parent().parent().parent();
	            if (code_thiss.find(".code_inputs3").size()) {
	                if (code_thiss.find(".code_inputs3").val() == "") {

	                } else {
	                    $this.parent().parent().parent().find(".sure_btn").removeClass("btn-disable");
	                }
	            } else {
	                $this.parent().parent().parent().find(".sure_btn").removeClass("btn-disable");
	            }
	        }
	        else {
	            $this.parent().find(".clear").hide();
	            $this.parent().parent().parent().find(".sure_btn").addClass("btn-disable");
	        }
	    };

	    document.getElementById("phone").onkeyup = function(event) {
	        var e = event ? event : window.event;
	        var text_len = this.value.length;
	        if ((text_len === 3 || text_len === 8)&& e.keyCode !== 8) {
	            this.value += " ";
	        }
	    };


	    var container = $(".login_container");
	    var interval = null;
	    if (container.length) {
	        addListener();
	    }
	    // function init(){
	    // 	addListener();
	    // 	if(window.logined && window.loginTel){
	    // 		showTel();
	    // 	}else{
	    // 		showTelInput();
	    // 	}
	    // }

	    /**
	     * 发送语音验证码
	     */
	    function send_voice_code() {
	        $mobile = $(".type_4 .login_tel").html();
	        if ($mobile == '') {
	            alert("手机号不能为空");
	            return false;
	        }
	        $.ajax({
	            sms_code: window.sms_code || null,
	            url: voiceCodeUrl,
	            type: "POST",
	            data: {mobile: $mobile},
	            dataType: 'json',
	            success: function (result) {
	                bravetime.newAlert(result['msg']);
	            },
	            error: function () {
	                bravetime.ajaxError(20);
	            }
	        });
	    }

	    // 展示手机号
	    function showTel() {
	        container.find(".account_type").addClass("hide");
	        container.find(".type_1").removeClass('hide').find(".login_tel").html(window.loginTel);

	        if (window.loginCallback && typeof window.loginCallback == "function") {
	            window.loginCallback();
	        }
	    }

	    // 展示手机号输出框
	    function showTelInput() {
	        container.find(".account_type").addClass("hide");
	        container.find(".type_2").removeClass('hide').find(".change_account_button");
	        container.find(".type_2").find("input").val("");

	        if (window.unloginCallback && typeof window.unloginCallback == "function") {
	            window.unloginCallback();
	        }
	    }

	    // 禁止更换手机号
	    function alertNoChange() {
	        bravetime.newAlert("不支持更换账号，请到个人中心更换哦～");
	        return false
	    }

	    //  展示登录界面
	    function showLogin() {
	        container.find(".account_type").addClass("hide");
	        container.find(".type_3").removeClass('hide');
	        container.find(".type_3").find("input").val("");
	        container.find(".type_3").find(".login_tel").html(window.loginTel);

	        if (window.unloginCallback && typeof window.unloginCallback == "function") {
	            window.unloginCallback();
	        }
	    }

	    //  展示注册界面
	    function showRegister() {
	        container.find(".account_type").addClass("hide");
	        container.find(".type_4").removeClass('hide');
	        container.find(".type_4").find("input").val("");
	        container.find(".type_4").find(".login_tel").html(window.loginTel);
	        sendCode();

	        if (window.unloginCallback && typeof window.unloginCallback == "function") {
	            window.unloginCallback();
	        }
	    }

	    // 发送短信验证码
	    function sendCode() {
	        var button = container.find(".type_4").find(".code_container").find(".dav-btn");
	        if (button.hasClass('btn-disable')) {
	            return;
	        }
	        $.ajax({
	            sms_code: window.sms_code || null,
	            url: sendUrl,
	            type: "POST",
	            dataType: "json",
	            data: {mobile: window.loginTel},
	            success: function (result) {
	                if (result.status != 0) {
	                    bravetime.newAlert(result["msg"]);
	                }
	            }
	        });

	        var t = 60;
	        button.addClass("btn-disable").html(t-- + "s后重发");
	        // 倒计时
	        if (interval) {
	            clearInterval(interval);
	        }
	        interval = setInterval(function () {
	            button.html(t-- + "s后重发");
	            if (t <= 0) {
	                button.html("重新发送").removeClass('btn-disable');
	                clearInterval(interval);
	            }
	        }, 1000);
	    }

	    // 发送手机号
	    function sendTelNumber() {
	        var button = container.find(".type_2").find(".change_account_button");
	        var telnumber = container.find(".type_2").find("input").val().replace(/ /g,"");
	        if (button.hasClass("btn-disable")) {
	            return;
	        }

	        button.addClass("btn-disable");
	        if (Units.isTel(telnumber)) {
	            $.ajax({
	                sms_code: window.sms_code || null,
	                url: url1,
	                type: "POST",
	                dataType: "json",
	                data: {
	                    mobile: telnumber,
	                    sms_code: window.sms_code || null
	                },
	                success: function (result) {
	                    window.loginTel = telnumber;
	                    button.removeClass("btn-disable");
	                    if (result.status == -1) {
	                        bravetime.newAlert(result["msg"]);
	                    }
	                    if (result.status == 0) {
	                        if (result.act == "login") {
	                            showLogin();
	                        } else if (result.act == "register" || result.act == "init") {
	                            showRegister();
	                        }
	                    }
	                },
	                error: function () {
	                    button.removeClass("btn-disable");
	                    bravetime.ajaxError(21);
	                }
	            });
	        } else {
	            bravetime.newAlert("请输入正确的手机号");
	            button.removeClass("btn-disable");
	        }
	    }

	    // 登录
	    function login() {
	        var button = container.find(".type_3").find(".change_account_button");
	        if (button.hasClass("btn-disable")) {
	            return;
	        }
	        button.addClass("btn-disable");
	        var pw = container.find(".type_3").find("input.passwd").val();
	        if (pw.length) {
	            $.ajax({
	                url: url2,
	                type: "POST",
	                dataType: "json",
	                data: {
	                    sms_code: window.sms_code || null,
	                    password: pw,
	                    mobile: window.loginTel
	                },
	                success: function (result) {
	                    button.removeClass("btn-disable");
	                    if (result.status == -1) {
	                        bravetime.newAlert(result["msg"]);
	                    } else if (result.status == 0) {
	                        showTel();
	                    }
	                },
	                error: function () {
	                    button.removeClass("btn-disable");
	                    bravetime.ajaxError(22);
	                }
	            });
	        } else {
	            button.removeClass("btn-disable");
	            bravetime.newAlert("请输入密码");
	        }
	    }

	    // 注册
	    function register() {
	        var button = container.find(".type_4").find(".change_account_button");
	        if (button.hasClass("btn-disable")) {
	            return;
	        }
	        button.addClass("btn-disable");
	        var pw = container.find(".type_4").find("input.passwd").val();
	        var code = container.find(".type_4").find("input.code").val();

	        $.ajax({
	            url: registerUrl,
	            type: "POST",
	            dataType: "json",
	            data: {
	                sms_code: window.sms_code || null,
	                mobile: window.loginTel,
	                verify_code: code,
	                password: pw
	            },
	            success: function (result) {
	                button.removeClass("btn-disable");
	                if (result.status == -1) {
	                    bravetime.newAlert(result["msg"]);
	                } else if (result.status == 0) {
	                    showTel();
	                }
	            },
	            error: function () {
	                button.removeClass("btn-disable");
	                bravetime.ajaxError(23);
	            }
	        });
	    }


	    function addListener() {
	        container.find(".type_1").find(".change_account_button").click(alertNoChange);
	        container.find(".type_2").find(".change_account_button").click(sendTelNumber);
	        container.find(".type_3").find(".change_account_button").click(login);
	        container.find(".type_4").find(".change_account_button").click(register);

	        container.find(".type_3").find(".change_tel").click(showTelInput);
	        container.find(".type_3").find(".forget_pw").click(showRegister);
	        container.find(".type_4").find(".change_tel").click(showTelInput);
	        container.find(".type_4").find(".code_container").find(".dav-btn").click(sendCode);

	        container.find(".type_4").find(".send_voice_code").click(send_voice_code);

	    }

	};

	window.loginReady =loginReady;

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(444);
	var config = __webpack_require__(445);
	window.cartVUE = new Vue(config);

/***/ },

/***/ 444:
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },

/***/ 445:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(446)
	__vue_script__ = __webpack_require__(448)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] page/cart.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(449)
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
	  var id = "_v-788d9953/cart.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(447);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./cart.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/vux-loader/src/style-loader.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./cart.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ni.icon {\n  width: 36px;\n  height: 36px;\n  background-position: center;\n}\n.dav_icon_choice_selected_40_40 {\n  background-image: url(\"//pic.davdian.com/free/dav_icon_choice_selected_32_32_0822.png\");\n}\n\n.dav_icon_choice_no_selected_40_40 {\n  background-image: url(\"//pic.davdian.com/free/dav_icon_choice_no_selected_42_42_2x.png\");\n  background-size: 16px;\n  margin-right: 5px;\n}\n.loading {\n  text-align: center;\n  font-size: 16px;\n  line-height: 3;\n}\n\n.cart_empty_pic {\n  margin: 60px auto 30px;\n  width: 130px;\n}\n", ""]);

	// exports


/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//
	//   <div class="top0">
	//     <div class="top_container">
	//       <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->
	//       <div class="top_left">
	//         <a class="top_back" href="javascript:history.back();">
	//           <span class="home_arrow"></span>
	//         </a>
	//       </div>
	//       <div class="title_container">
	//         购物车<span class="cart_number" v-text="'('+cartInfo.sku_count_all+')'"
	//                  v-if="cartInfo.sku_count_all"></span>
	//       </div>
	//       <div class="top_right" @click="toggleEditMode">
	//         <a v-if="cartInfo.isEmpty" href="/" class="top_home">
	//           <span class="home_icon"></span>
	//         </a>
	//         <a v-else class="top_btn">
	//           <span class="text_btn" v-text="editMode?'完成':'编辑'">编辑</span>
	//         </a>
	//       </div>
	//     </div>
	//   </div>
	//
	//
	//   <!--商品列表部分-->
	//   <div class="goods_in_cart" v-if="!cartInfo.isEmpty">
	//     <!--循环输出商品组-->
	//     <div class="reduce_item_container"
	//          v-for="activity in cartInfo.activitys"
	//          track-by="$index"
	//          :class="{'fail':activity.act_id==-1}">
	//
	//       <!--活动标签-->
	//       <a class="reduce_item_title"
	//          :href="activity.act_url||'javascript:void()'"
	//          v-if="activity.act_id>0">
	//         <span class="dav-red">{{activity.act_type_name}}</span>
	//         {{activity.act_info}}
	//         <span class="icon_r_container">
	//                 <i v-if="activity.act_url != undefined && activity.act_url != null && activity.act_url != 0"
	//                    class="icon dav_icon_dayuhao_10_22 dav-border-red dav-border-red"></i>
	//             </span>
	//       </a>
	//
	//       <div class="goods_item_s">
	//
	//         <div class="good_item checked"
	//              v-for="goods in activity.goods"
	//              track-by="$index"
	//              :class="{'checked':goods.checked}"
	//              goods-id="{{goods.goods_id}}"
	//              max-count="{{goods.purchase_limit||200}}">
	//           <!--图标-->
	//           <div class="icon_container">
	//             <!--无效商品-->
	//             <span class="invalid_lable" v-if="activity.act_id==-1">失效</span>
	//             <!--非编辑模式-->
	//             <i class="icon" v-show="!editMode&&activity.act_id>=0"
	//                @click="toggleCheckStatus(goods,activity)"
	//                :class="{'dav_icon_choice_selected_40_40':goods.checked,'dav_icon_choice_no_selected_40_40':!goods.checked}"></i>
	//             <!--编辑模式-->
	//             <i class="icon" v-show="editMode&&activity.act_id>=0"
	//                @click="toggleEditStatus(goods)"
	//                :class="{'dav_icon_choice_selected_40_40':goods.edit_checked,'dav_icon_choice_no_selected_40_40':!goods.edit_checked}"></i>
	//           </div>
	//           <!--商品图-->
	//           <a class="pic_container" href="/{{goods.goods_id}}.html{{refererStr}}" @click="gotoGoods()">
	//             <img class="good_img" :src="goods.goods_thumb">
	//             <div class="sale_prompt_text" v-if="goods.pre_sale">预售</div>
	//             <span class="sold_out" v-if="goods.goods_stocks<=0">售罄</span>
	//           </a>
	//           <!--右侧-->
	//           <div class="right_container">
	//             <a class="good_title" href="/{{goods.goods_id}}.html{{refererStr}}" v-text="goods.goods_name"
	//                @click="gotoGoods()"></a>
	//             <div class="goods_infos_wrap">
	//               <div class="cart_format" :class = "{ cart_format_h: goods.goods_tags && goods.goods_tags.length }">
	//                 <span v-for="tag in goods.goods_tags" v-text="tag.tag_name"></span>
	//               </div>
	//               <!--优惠-->
	//               <!--<div class="price_info_reduce dav-red" v-if="goods.price_act_name"-->
	//                    <!--v-text="goods.price_act_name+'价'"></div>-->
	//               <div v-if = "goods.price_act_name == '限时'" class="price_info_reduce dav-red" v-if="goods.price_act_name"
	//                    v-text="goods.price_act_name+'购'"></div>
	//               <div v-else class="price_info_reduce dav-red" v-if="goods.price_act_name"
	//                    v-text="goods.price_act_name+'价'"></div>
	//
	//               <div class="price_info_reduce dav-red" v-if="!goods.price_act_name&&goods.purchase_limit"
	//                    v-text="'限购'+goods.purchase_limit+'件'"></div>
	//
	//               <!--价格-->
	//               <div class="good_price dav-color-price">
	//                 <span class="dav-red s_price_number"><em>￥</em>{{goods.goods_price}}</span>
	//               </div>
	//
	//               <!--会员返返现-->
	//               <div v-if="goods.seller_income != '0' && userStatus == 3" class="income_vip">会员返<em>￥</em>{{goods.seller_income}}</div>
	//
	//               <!--商品数量-->
	//               <div class="sold_out_collect" v-if="activity.act_id>=0&&!goods.goods_stocks"
	//                    @click="collect(goods)">
	//                 转到收藏
	//               </div>
	//
	//               <div class="good_number_container" v-if="activity.act_id>=0&&goods.goods_stocks">
	//                 <div class="input_control">
	//                   <div class="minus change_num" @click="changeGoodsNumber(goods,-1,activity)">-</div>
	//                   <input type="tel" v-model="goods.goods_number"
	//                          @change="changeGoodsNumber(goods,0,activity)">
	//                   <div class="plus change_num" :class="{'disable':goods.goods_number>=goods.max_amount}"
	//                        @click="changeGoodsNumber(goods,1,activity)">+
	//                   </div>
	//                 </div>
	//
	//               </div>
	//             </div>
	//           </div>
	//
	//           <!--超出库存-->
	//           <div class="seckill_countdown_right" v-if="goods.goods_stocks>0&&goods.goods_number>goods.goods_stocks"><span>商品数量超出库存</span>
	//           </div>
	//           <!--降价-->
	//           <div class="price_change" v-if="!(goods.sag_left_time > 0)&&!(goods.fsp_left_time > 0)&&!(goods.bkg_left_time > 0) && goods.reduce_money">比加入时降{{goods.reduce_money}}元</div>
	//
	//           <!--限时购倒计时和其他信息-->
	//           <!--秒杀商品-->
	//           <span v-if="goods.sag_left_time > 0">
	//             <!--秒杀和几倍返现同事存在-->
	//             <span v-if="goods.bkg_left_time > 0">
	//               <!--秒杀剩余时间少于翻倍返现剩余时间-->
	//               <div class="ts_info_limit seckill_countdown" v-if="goods.bkg_left_time > goods.sag_left_time"
	//                    style="color:#ff4a7d;">
	//                 {{goods.sag_left_time|datetimeFormat}}，可享受秒杀和{{goods.act_income.ratio}}倍返利优惠<span
	//                 v-if="goods.reduce_money">，比加入时降<span class="dav-red">{{goods.reduce_money}}元</span></span>
	//               </div>
	//               <!--秒杀剩余时间大于翻倍返现剩余时间-->
	//               <div class="ts_info_limit seckill_countdown" v-else style="color:#ff4a7d;">
	//                 {{goods.bkg_left_time|datetimeFormat}}，可享受秒杀和{{goods.act_income.ratio}}倍返利优惠<span
	//                 v-if="goods.reduce_money">，比加入时降<span class="dav-red">{{goods.reduce_money}}元</span></span>
	//               </div>
	//             </span>
	//             <!--只有秒杀-->
	//             <span v-else>
	//               <div class="ts_info_limit seckill_countdown dav-red" style="color:#ff4a7d;">
	//                 {{goods.sag_left_time|datetimeFormat}}<span v-if="goods.reduce_money">，比加入时降<span class="dav-red">{{goods.reduce_money}}元</span></span>
	//               </div>
	//             </span>
	//           </span>
	//
	//           <!--限时购商品-->
	//           <span v-if="goods.fsp_left_time > 0">
	//             <!--限时购和几倍返现同事存在-->
	//             <span v-if="goods.bkg_left_time > 0">
	//               <!--限时购剩余时间少于翻倍返现剩余时间-->
	//               <div class="ts_info_limit seckill_countdown" v-if="goods.bkg_left_time > goods.fsp_left_time">
	//                 在<span class="dav-red">{{goods.fsp_left_time|datetimeFormatNew}}</span>内<span v-if="userStatus == 3">支付
	//               </span><span v-else>成为会员</span>
	//                 ，可享受限时购和{{goods.act_income.ratio}}倍返利优惠
	//                 <span v-if="goods.reduce_money">，比加入时降<span class="dav-red">{{goods.reduce_money}}元</span></span>
	//               </div>
	//               <!--限时购剩余时间大于翻倍返现剩余时间-->
	//               <div class="ts_info_limit seckill_countdown" v-else>
	//                  在<span class="dav-red">{{goods.bkg_left_time|datetimeFormatNew}}</span>内<span
	//                 v-if="userStatus == 3">支付</span><span v-else>成为会员</span>，可享受限时购和{{goods.act_income.ratio}}倍返利优惠
	//                 <span v-if="goods.reduce_money">，比加入时降<span class="dav-red">{{goods.reduce_money}}元</span></span>
	//               </div>
	//             </span>
	//             <!--只有限时购-->
	//             <span v-else>
	//               <div class="ts_info_limit seckill_countdown">
	//                 在<span class="dav-red">{{goods.fsp_left_time|datetimeFormatNew}}</span>内<span
	//                 v-if="userStatus == 3">支付</span><span v-else>成为会员</span>，可享受限时购优惠<span
	//                 v-if="goods.reduce_money">，比加入时降<span class="dav-red">{{goods.reduce_money}}元</span></span>
	//               </div>
	//             </span>
	//           </span>
	//
	//           <!--只有返现翻倍-->
	//           <div class="ts_info_limit seckill_countdown"
	//                v-if="goods.bkg_left_time > 0 && !(goods.fsp_left_time > 0) && !(goods.sag_left_time > 0) ">
	//             在<span class="dav-red">{{goods.bkg_left_time|datetimeFormatNew}}</span>内<span
	//             v-if="userStatus == 3">支付</span><span v-else>成为会员</span>，可享受{{goods.act_income.ratio}}倍返利优惠<span
	//             v-if="goods.reduce_money">，比加入时降<span class="dav-red">{{goods.reduce_money}}元</span></span>
	//           </div>
	//
	//           <div class="ts_info_limit seckill_countdown" v-if="!(goods.sag_left_time > 0)&&!(goods.fsp_left_time > 0)&&!(goods.bkg_left_time > 0)&&goods.secondsp">
	//             <span style="color:#ff4a7d;">商品失效，请重新添加购物车</span>
	//           </div>
	//           <div class="buy_gift" v-if="goods.buy_gift&&goods.buy_gift.length">
	//             <span class="dav-red">[赠品]</span>
	//             <div class="buy_gift_con">
	//               <a v-for="g in goods.buy_gift" href="/{{g.gift_id}}.html">
	//                 <sapn class="text" v-text="g.goods_name"></sapn>
	//                 <span class="number" v-text="'X'+g.gift_number"></span>
	//               </a>
	//             </div>
	//
	//           </div>
	//         </div>
	//
	//       </div>
	//       <!--商品列表-->
	//
	//       <!--赠品 -->
	//       <div class="premiums" v-if="activity.gifts&&activity.gifts.length">
	//         <div class="premiums_con"
	//              @click="show_gift(gift)"
	//              v-for="gift in activity.gifts" v-if="gift.gift_stocks != 0">
	//           <span class="dav-red">[满送]</span> {{gift.goods_name}}
	//           <span class="premiums_con_number" v-if="gift.gift_stocks">X{{gift.gift_number||1}}</span>
	//           <span class="premiums_con_number dav-red" v-if="!gift.gift_stocks">[已赠完]</span>
	//         </div>
	//       </div>
	//       <!--清空失效-->
	//       <div class="clear_shop april_border hairlines" v-if="activity.act_id==-1">
	//         <div class="dav-btn btn-small border_inner" @click="clearInvalidGoods">清空失效商品</div>
	//       </div>
	//     </div>
	//
	//
	//     <div class="price_item">
	//       <span class="price_text">合计：</span>
	//       <span
	//         class="price_number">￥{{ cartInfo.order_amount}} ＝ ￥{{ cartInfo.goods_amount}}</span>
	//       <span class="reduce_info dav-price" v-if="cartInfo.discounts">
	//                 <span v-for="discount in cartInfo.discounts">-￥{{discount.discount}}({{discount.act_type_name}}) </span>
	//             </span>
	//     </div>
	//   </div>
	//
	//   <div class="center dav-small dav-red info59" v-if="!cartInfo.isEmpty&&cartInfo.goods_amount<59">
	//     <span>温馨提示：满 59 才包邮哦~ </span><a
	//     class="underline" href="/">再去逛逛</a></div>
	//
	//   <!--空购物车-->
	//   <div class="cart_blank" v-if="cartInfo.isEmpty&&!loading">
	//     <div class="cart_empty_pic">
	//       <img src="//pic.davdian.com/free/image_cart_empty.png">
	//     </div>
	//     <div class="dav-color6 center">购物车还是空的，您再去逛逛吧</div>
	//     <div class="button_container">
	//       <a href="/">
	//         <div class="dav-btn btn-red center">去逛逛</div>
	//       </a>
	//     </div>
	//     <div class="order dav-shadow" v-if="cartInfo.unpay_order.length">
	//       <div class="order_title">
	//         最近未支付订单
	//       </div>
	//       <a href="/o-{{cartInfo.unpay_order[0].order_id}}.html">
	//         <div class="order_name_state">
	//           <span class="order_name">{{cartInfo.unpay_order[0].user_name}}</span>
	//           <span class="order_state pull-right">
	//                         <span>订单状态：</span>
	//                         <span class="dav-red">待付款</span>
	//                     </span>
	//         </div>
	//
	//         <div class="good_container">
	//           <div class="img_container many_goods">
	//             <div class="img_container_inner" style="height: 60px;">
	//               <img v-for="item in cartInfo.unpay_order[0].unpay_goods_list" :src="item.goods_thumb">
	//             </div>
	//             <div class="pull-right text-container">共{{cartInfo.unpay_order[0].unpay_goods_list.length}}件<br>商品
	//             </div>
	//           </div>
	//         </div>
	//
	//         <div class="order_price">金额：￥{{cartInfo.unpay_order[0].order_amount}}</div>
	//       </a>
	//       <div class="out_button_container">
	//         <a class="dav-btn btn-small order-btn-red pull-right"
	//            href="/checkout.html?order_id={{cartInfo.unpay_order[0].order_id}}">立即支付</a>
	//         <a class="dav-btn btn-small pull-right"
	//            href="/index.php?c=AgentPay&amp;a=index&amp;order_id={{cartInfo.unpay_order[0].order_id}}">找人代付</a>
	//       </div>
	//     </div>
	//   </div>
	//   <div class="loading" v-if="loading">购物车商品读取中</div>
	//
	//   <!--登录部分-->
	//   <div class="account_in_cart login_container" v-show="!cartInfo.isEmpty">
	//     <slot></slot>
	//   </div>
	//
	//   <!--会员返现提示悬框-->
	//  <!--  <div v-if="cartInfo.total_income" class="income_bottom_fixed">
	//     <span v-if="userStatus == 3">本次购物可获得￥{{cartInfo.total_income}}返现，订单完成后在[我的]-[总额]中查看</span>
	//     <span v-else>会员下单立返￥{{cartInfo.total_income}}</span>
	//     <a v-if="userStatus != 3" :href="kdUrl">开通会员</a>
	//   </div> -->
	//   <div v-if="cartInfo.total_income && userStatus == 3" class="income_bottom_fixed">
	//     <span>本次购物可获得￥{{cartInfo.total_income}}返现，订单完成后在[我的]-[总额]中查看</span>
	//   </div>
	//   <!--购物车结算低栏-->
	//   <div class="cart_bottom" v-if="!cartInfo.isEmpty">
	//     <div class="select_all">
	//       <i class="icon"
	//          :class="[{'dav_icon_choice_no_selected_40_40':(!checkAll&&!editMode)||(!checkEditAll&&editMode)},{'dav_icon_choice_selected_40_40':(checkAll&&!editMode)||(checkEditAll&&editMode)}]"
	//          @click="checkAllCheck((!editMode&&!checkAll)||(editMode&&!checkEditAll))"></i>
	//       全选
	//     </div>
	//     <div class="price_con" v-if="!editMode">
	//       <div v-if="cartInfo.saving == 0" class="left_price" style="margin-top: 15px;">
	//         <span class="price_text" style="font-weight: bold">应付:</span><span class="price_number price_number_after">￥{{
	//         cartInfo.order_amount}}
	//       </span>
	//       </div>
	//       <div v-if="cartInfo.saving != 0" class="left_price">
	//         <span class="price_text" style="font-weight: bold">应付:</span><span class="price_number price_number_after">￥{{ cartInfo.order_amount}}  </span>
	//       </div>
	//       <div v-if="cartInfo.saving != 0" class="reduce_price">
	//         <span class="other_info">总额:￥{{ cartInfo.goods_amount}} <span
	//           class="ml_10">优惠:￥{{ cartInfo.saving}}</span></span>
	//       </div>
	//     </div>
	//     <div class="pay_button_container" @click="pay" v-show="!editMode">
	//       <div class="dav-btn2" :class="{'btn-disable':paying,'btn-red':!paying}" v-if="isLogin">
	//         <span class="text" v-if="paying">结算中...</span>
	//         <span class="text" v-else>结算<span class="f11">({{cartInfo.sku_count}})</span></span>
	//       </div>
	//       <div class="dav-btn2 btn-red" v-else>去登录</div>
	//     </div>
	//     <div class="delete_shop_btn" v-if="editMode" @click="doSome('del')">
	//       <div class="dav-btn btn-red">
	//         <span class="text">删除商品</span>
	//       </div>
	//     </div>
	//     <div class="go_collect_btn" v-if="editMode" @click="doSome('collect')">
	//       <div class="dav-btn btn-yellow">
	//         <span class="text">转到收藏</span>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style>
	//   i.icon {
	//     width: 36px;
	//     height: 36px;
	//     background-position: center;
	//   }
	//   .dav_icon_choice_selected_40_40 {
	//     background-image: url("//pic.davdian.com/free/dav_icon_choice_selected_32_32_0822.png");
	//   }
	//
	//   .dav_icon_choice_no_selected_40_40 {
	//     background-image: url("//pic.davdian.com/free/dav_icon_choice_no_selected_42_42_2x.png");
	//     background-size: 16px;
	//     margin-right: 5px;
	//   }
	//   .loading {
	//     text-align: center;
	//     font-size: 16px;
	//     line-height: 3;
	//   }
	//
	//   .cart_empty_pic {
	//     margin: 60px auto 30px;
	//     width: 130px;
	//   }
	// </style>
	// <script>
	var Vue = __webpack_require__(444);
	var second_tip = 0;
	exports.default = {
	  el: "#cart",
	  data: function data() {
	    return {
	      cartInfo: { isEmpty: true },
	      editMode: false,
	      checkAll: false,
	      checkEditAll: false,
	      paying: false,
	      loading: true,
	      editStatue: {},
	      isLogin: false,
	      referer: {},
	      userStatus: window.userStatus,
	      kdUrl: window.kdUrl
	    };
	  },

	  watch: {
	    'cartInfo.isEmpty': 'cartIsEmpty',
	    'cartInfo.sku_count_all': 'changeCount',
	    'cartInfo.total_income': 'cartIncome'
	  },
	  methods: {
	    changeCount: function changeCount(val) {
	      if (val) {
	        if (window.Units && Units.isApp() && Units.getAppVersion() >= 260) {
	          window.bravetime && bravetime.setHead && bravetime.setHead({ title: "购物车(" + val + ")" });
	        }
	      }
	    },
	    cartIsEmpty: function cartIsEmpty(val) {
	      if (val) {
	        if (window.Units && Units.isApp() && Units.getAppVersion() >= 320) {
	          window.bravetime && bravetime.setHead && bravetime.setHead({ title: "购物车", homeBtn: 1, rightBtn: 0 });
	        } else if (window.Units && Units.isApp() && Units.getAppVersion() >= 260) {
	          window.bravetime && bravetime.setHead && bravetime.setHead({ title: "购物车", homeBtn: 0, rightBtn: 0 });
	        }
	      }
	    },
	    cartIncome: function cartIncome(val) {
	      if (val) {
	        document.body.style.paddingBottom = "88px";
	      } else {
	        document.body.style.paddingBottom = "58px";
	      }
	    },
	    clearInvalidGoods: function clearInvalidGoods() {
	      var that = this;

	      function callback() {
	        var invalidGoodsList;
	        // 先清空无效商品数据
	        var activityList = that.cartInfo.activitys;
	        for (var i = 0; i < activityList.length; i++) {
	          if (activityList[i].act_id == -1) {
	            invalidGoodsList = activityList[i].goods;
	            activityList.splice(i, 1);
	          }
	        }
	        var delList = [];
	        for (var i in invalidGoodsList) {
	          var goods = invalidGoodsList[i];
	          delList.push({
	            act_id: -1,
	            goods_id: goods.goods_id,
	            price_act_id: goods.price_act_id,
	            price_act_type: goods.price_act_type,
	            deleted: 1
	          });
	        }
	        changeCart(delList, that);
	      }

	      bravetime.newConfirm('您确定要清空失效商品么?', {
	        okLink: callback
	      });
	    },
	    gotoGoods: function gotoGoods() {
	      window.setYCache();
	    },
	    toggleEditMode: function toggleEditMode() {
	      this.editMode = !this.editMode;
	      for (var i = 0, ac; ac = this.cartInfo.activitys[i++];) {
	        if (ac.act_id != -1) {
	          for (var j in ac.goods) {
	            var goods = ac.goods[j];
	            if (this.editMode) {
	              goods.edit_checked = false;
	            }
	          }
	        }
	      }
	      if (window.Units && Units.isApp() && Units.getAppVersion() >= 260) {
	        bravetime.setHead({
	          rightBtn: {
	            text: this.editMode ? "完成" : "编辑",
	            action: 'window.edit()',
	            textColor: "#ff4a7d"
	          }
	        });
	      }
	    },
	    toggleEditStatus: function toggleEditStatus(goods) {
	      goods.edit_checked = !goods.edit_checked;
	      this.editStatue[goods["goods_id"]] = goods.edit_checked;
	      this.checkEditAll = _checkAllCheck(false, this);
	    },
	    toggleCheckStatus: function toggleCheckStatus(goods, activity) {
	      // 切换选中状态
	      // 先切换自己的状态
	      goods.checked = !goods.checked;
	      // 然后看是否需要切换全选状态
	      this.checkAll = _checkAllCheck(false, this);

	      var data = [{
	        act_id: activity.act_id,
	        goods_id: goods.goods_id,
	        checked: +goods.checked,
	        price_act_id: goods.price_act_id,
	        price_act_type: goods.price_act_type
	      }];
	      changeCart(data, this);
	    },
	    checkAllCheck: function checkAllCheck(check) {
	      _checkAllCheck(true, this, check);
	      if (!this.editMode) {
	        var list = getAllGoods(this);
	        list.map(function (x) {
	          x.checked = +check;
	          return x;
	        });
	        if (list.length) {
	          changeCart(list, this);
	        }
	      }
	    },
	    changeGoodsNumber: function changeGoodsNumber(goods, number, activity) {
	      var that = this;
	      // 先改变显示的数量
	      goods.min_amount = goods.min_amount || 1;
	      var afterNumber = +goods.goods_number + (number || 0);
	      if (afterNumber > goods.max_amount) {
	        goods.goods_number = goods.max_amount;
	      } else if (afterNumber < goods.min_amount) {
	        goods.goods_number = goods.min_amount;
	        bravetime.newConfirm('确认删除商品么?', {
	          okLink: function okLink() {
	            var list = [{
	              goods_id: goods.goods_id,
	              act_id: goods.act_id,
	              deleted: 1,
	              editCheck: goods.edit_checked,
	              price_act_id: goods.price_act_id,
	              price_act_type: goods.price_act_type
	            }];
	            changeCart(list, that);
	          }
	        });
	        return false;
	      } else {
	        goods.goods_number = afterNumber;
	      }

	      var data = [{
	        act_id: activity.act_id,
	        goods_id: goods.goods_id,
	        goods_number: +goods.goods_number,
	        editCheck: goods.edit_checked,
	        price_act_id: goods.price_act_id,
	        price_act_type: goods.price_act_type
	      }];
	      changeCart(data, this);
	    },
	    pay: function pay() {
	      var flag = false;
	      for (var i = 0, ac; ac = this.cartInfo.activitys[i++];) {
	        if (ac.act_id != -1) {
	          for (var j in ac.goods) {
	            var goods = ac.goods[j];
	            if (goods.checked) {
	              flag = true;
	              break;
	            }
	          }
	        }
	      }
	      if (!flag) {
	        bravetime.newAlert("请至少选择一个商品");
	        return false;
	      }
	      if (Units.isApp() && Units.getAppVersion() >= 240) {
	        settlementNative(this);
	      } else {
	        settlement(this);
	      }
	    },
	    collect: function collect(goods) {
	      var data = [{
	        act_id: goods.act_id,
	        goods_id: goods.goods_id,
	        collected: 1,
	        price_act_id: goods.price_act_id,
	        price_act_type: goods.price_act_type
	      }];
	      changeCart(data, this);
	    },
	    doSome: function doSome(type, other) {
	      var list = getCheckedList(this);
	      if (!list.length) {
	        bravetime.newAlert("请至少选中一个商品");
	        return false;
	      }
	      for (var i = 0; i < list.length; i++) {
	        if (type == "del") {
	          list[i].deleted = 1;
	        } else if (type == 'collect') {
	          list[i].collected = 1;
	        } else if (type == 'check') {
	          list[i].checked = +other;
	        }
	      }
	      changeCart(list, this);
	    },
	    show_gift: function show_gift(gift) {
	      bravetime.newAlert('<div style="text-align:center"><p style="font-size:20px">赠品信息</p><img style="max-width:200px;margin-top: 4px;" src="' + gift.goods_thumb + '" alt=""><div style="text-align:left"><p style="-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box;overflow:hidden;font-size:14px;line-height:20px;max-height:40px;margin-top: 6px;">' + gift.goods_name + '</p><div class="dav-red" style="margin-top: 4px;font-size: 12px;">剩余数量：' + gift.gift_stocks + '</div><div style="margin-top: 4px;font-size: 12px;">' + gift.hint_info + '</div></div></div>');
	    }
	  },
	  ready: function ready() {
	    var that = this;
	    if (window.logined > 0) {
	      this.isLogin = true;
	    }
	    window.loginCallback = function () {
	      that.isLogin = true;
	      window.location.reload();
	    };
	    // 支付成功返回就刷新当前页面


	    // 每次先用缓存数据
	    var d = getCartInfoCache();
	    if (d) {
	      that.cartInfo = d;
	      that.loading = false;
	      that.$nextTick(function () {
	        window.getYCache();
	      });
	    }
	    $.ajax({
	      url: window.cartInfoUrl,
	      dataType: "json",
	      cache: false,
	      success: function success(result) {
	        that.loading = false;
	        if (result.code) {
	          bravetime.info(result.msg);
	        } else {
	          goodsListContainer.removeClass("hide");
	          that.cartInfo = handle(result.data.cart_info, that);
	          that.referer = result.referer;
	          var list = [],
	              str = "";
	          if (that.referer) {
	            for (var i in that.referer) {
	              list.push(i + "=" + that.referer[i]);
	            }
	          }
	          if (list.length) {
	            str = "?" + list.join("&");
	          }
	          that.refererStr = str;

	          setCartInfoCache(that.cartInfo);
	          that.$nextTick(function () {
	            if (Units.isAndroid()) {
	              $(".price_info_reduce").css("font-family", "serif");
	            }
	          });
	          timeReduce(that.cartInfo.activitys);
	          alertOverInfo(result.data.over_info);

	          setTimeout(function () {
	            if (!(window.Units && Units.isApp())) {
	              window.loginReady();
	            }
	          }, 100);
	          that.$nextTick(function () {
	            if (result.data.cart_info.sku_count_all) {
	              if (window.Units && Units.isApp() && Units.getAppVersion() >= 260) {
	                bravetime.setHead({ title: "购物车(" + result.data.cart_info.sku_count_all + ")" });
	                document.title = "购物车(" + result.data.cart_info.sku_count_all + ")";
	              }
	            } else {
	              if (window.Units && Units.isApp() && Units.getAppVersion() >= 320) {
	                bravetime.setHead({ title: "购物车", homeBtn: 1, rightBtn: 0 });
	              } else if (window.Units && Units.isApp() && Units.getAppVersion() >= 260) {
	                bravetime.setHead({ title: "购物车", homeBtn: 0, rightBtn: 0 });
	              }
	              window.appData = {
	                showHead: 1,
	                showFoot: 0,
	                backOnHead: 1, // 头部返回按钮
	                homeOnHead: 1, // 头部首页按钮
	                shareOnHead: 0
	              };
	            }
	          });
	        }
	      }, error: function error() {
	        bravetime.info("网络异常,请稍后重试");
	      }
	    });
	  }
	};

	Vue.filter("formatSmallPrice", function (va) {
	  var l = (va + "").split(".");
	  if (l.length == 1) {
	    l[1] = '00';
	  } else if (l[1].length == 1) {
	    l[1] += '' + '0';
	  }
	  return '￥' + l[0] + '.<span class="small_price">' + l[1] + '</span>';
	});

	Vue.filter('datetimeFormat', function (second) {
	  if (second == 0) {
	    return '支付超时，请重新添加购物车';
	  }
	  var s = second % 60,
	      m = Math.floor(second / 60) % 60,
	      h = Math.floor(second / 60 / 60) % 24,
	      d = Math.floor(second / 60 / 60 / 24);
	  var str = '';
	  if (d) {
	    str = d + "天" + h + "小时" + (m < 10 ? "0" : "") + m + "分";
	  } else if (h) {
	    str = h + "小时" + (m < 10 ? "0" : "") + m + "分" + (s < 10 ? "0" : "") + s + "秒";
	  } else if (m) {
	    str = (m < 10 ? "0" : "") + m + "分" + (s < 10 ? "0" : "") + s + "秒";
	  } else {
	    str = (s < 10 ? "0" : "") + s + "秒";
	  }
	  return '剩余支付时间：' + str;
	});
	// 倒计时 秒杀-限时购-返利翻倍
	Vue.filter('datetimeFormatNew', function (second) {
	  if (second == 0) {
	    return '支付超时，请重新添加购物车';
	  }
	  var s = second % 60,
	      m = Math.floor(second / 60) % 60,
	      h = Math.floor(second / 60 / 60);
	  if (h < 10) {
	    h = "0" + h;
	  }
	  var str = '';
	  if (h) {
	    str = h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + "";
	  } else if (m) {
	    str = "00:" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + "";
	  } else {
	    str = "00:00:" + (s < 10 ? "0" : "") + s + "";
	  }
	  return str;
	});

	var goodsListContainer = $(".goods_in_cart");
	var settlementContainer = $(".pay_button_container"),
	    settlementButton = settlementContainer.find(".dav-btn");

	/**
	 * 弹出超出商品确认框
	 */
	function alertOverInfo(data) {
	  if (!data || !data.length) {
	    return false;
	  }
	  var str = '<p style="font-size:20px">提示</p><div style="text-align:left"><p style="line-height:24px">您添加的商品已经超出了购物车数量限制(200),以下商品(' + data.length + '件)没有添加成功</p><div style="max-height:150px;overflow:scroll;margin-top:20px">';
	  for (var i = 0; i < Math.min(15, data.length); i++) {
	    str += '<div style="max-height:40px;margin-bottom:12px;line-height:20px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box;overflow:hidden"> 商品' + (i + 1) + ":" + data[i].goods_name + '</div>';
	  }
	  str += '<p style="text-align:center;color:#999;font-size:12px">"已经到底了,剩余商品请转到收藏查看~"</p></div></div>';

	  var list = data.map(function (x) {
	    return x.goods_id;
	  });
	  bravetime.newConfirm(str, {
	    okText: "删除商品",
	    cancelText: "<span class='dav-red'>转到收藏</span>",
	    okLink: function okLink() {
	      h(deleteOverUrl, list);
	    },
	    cancelLink: function cancelLink() {
	      h(collectOverUrl, list);
	    }
	  });

	  function h(url, data) {
	    bravetime.addLoader({ small: true });
	    $.ajax({
	      url: url,
	      dataType: "json",
	      data: { goods: JSON.stringify(data) },
	      success: function success(result) {
	        bravetime.removeLoader();
	        if (result.code) {
	          bravetime.newAlert(result.msg);
	        } else {}
	      }, error: function error() {
	        bravetime.removeLoader();
	        bravetime.info("网络异常,请稍后重试");
	      }
	    });
	  }
	}

	/**
	 * 购物车变更
	 */
	function changeCart(data, cart, info) {
	  if (!data.length) {
	    return false;
	  }
	  var newData = {};
	  for (var i = 0; i < data.length; i++) {
	    for (var j in data[i]) {
	      newData['goods[' + data[i]["goods_id"] + '][' + j + ']'] = data[i][j];
	    }
	  }

	  bravetime.addLoader({ little: true });
	  $.ajax({
	    url: cartChangeUrl,
	    cache: false,
	    data: newData,
	    type: "POST",
	    dataType: "json",
	    success: function success(result) {
	      bravetime.removeLoader();
	      if (result.code) {
	        bravetime.newAlert(result.msg, {
	          okLink: function okLink() {
	            location.reload();
	          }
	        });
	      } else {
	        if (info === true) {
	          bravetime.info("操作成功");
	        } else if (info) {
	          bravetime.info(info);
	        }
	        cart.cartInfo = handle(result.data.cart_info, cart);
	        setCartInfoCache(cart.cartInfo);
	        cart.$nextTick(function () {
	          if (Units.isAndroid()) {
	            $(".price_info_reduce").css("font-family", "serif");
	          }
	        });
	        timeReduce(cart.cartInfo.activitys);
	      }
	    },
	    error: function error() {
	      bravetime.removeLoader();
	      bravetime.info("网络异常,请稍后重试");
	    }
	  });
	}

	function getCheckedList(cart) {
	  var checkGoodsList = [];
	  var activityList = cart.cartInfo.activitys;
	  for (var i = 0; i < activityList.length; i++) {
	    if (activityList[i].act_id != -1) {
	      for (var j in activityList[i].goods) {
	        var goods = activityList[i].goods[j];
	        if (goods.edit_checked) {
	          checkGoodsList.push({
	            goods_id: goods.goods_id,
	            act_id: activityList[i].act_id,
	            price_act_id: goods.price_act_id,
	            price_act_type: goods.price_act_type
	          });
	        }
	      }
	    }
	  }
	  return checkGoodsList;
	}

	function getAllGoods(cart) {
	  var checkGoodsList = [];
	  var activityList = cart.cartInfo.activitys;
	  for (var i = 0; i < activityList.length; i++) {
	    if (activityList[i].act_id != -1) {
	      for (var j in activityList[i].goods) {
	        var goods = activityList[i].goods[j];

	        checkGoodsList.push({
	          goods_id: goods.goods_id,
	          act_id: activityList[i].act_id,
	          price_act_id: goods.price_act_id,
	          price_act_type: goods.price_act_type
	        });
	      }
	    }
	  }
	  return checkGoodsList;
	}

	/**
	 * 时间减少计算
	 */
	function timeReduce(activity) {
	  if (!activity) {
	    return false;
	  }
	  var flag = false;
	  for (var i = 0, ac; ac = activity[i++];) {
	    for (var id in ac.goods) {
	      var goods = ac.goods[id];
	      if (goods.sag_left_time > 0) {
	        goods.sag_left_time--;
	        goods.secondsp = true;
	        flag = true;
	      }
	      if (goods.fsp_left_time > 0) {
	        goods.fsp_left_time--;
	        second_tip++;
	        flag = true;
	      }
	      if (goods.bkg_left_time > 0) {
	        goods.bkg_left_time--;
	        second_tip++;
	        flag = true;
	      }
	    }
	  }
	  if (flag) {
	    setTimeout(function () {
	      timeReduce(activity);
	    }, 1000);
	  }
	}

	/**
	 * 检测所有的选择
	 */
	function _checkAllCheck(flag, cart, check) {
	  var all = true;
	  console.log("cart", cart, cart.cartInfo.activitys);
	  var activityList = cart.cartInfo.activitys;
	  for (var i = 0; i < activityList.length; i++) {
	    if (activityList[i].act_id != -1) {
	      for (var j in activityList[i].goods) {
	        var goods = activityList[i].goods[j];
	        if (flag == false) {
	          if (cart.editMode) {
	            if (!goods.edit_checked) {
	              all = false;
	              break;
	            }
	          } else {
	            if (!goods.checked) {
	              all = false;
	              break;
	            }
	          }
	        } else {
	          if (cart.editMode) {
	            goods.edit_checked = check;
	            cart.checkEditAll = check;
	          } else {
	            goods.checked = check;
	            cart.checkAll = check;
	          }
	        }
	      }
	    }
	  }
	  return all;
	}

	/**
	 * 处理数据
	 */
	function handle(data, cart) {
	  var all = true;
	  for (var i in data.activitys) {
	    for (var j in data.activitys[i].goods) {
	      var goods = data.activitys[i].goods[j];
	      goods.edit_checked = goods.edit_checked || cart.editStatue[goods.goods_id] || false;
	      goods.min_amount = 1;
	      goods.max_amount = goods.purchase_limit || 200;
	      goods.act_id = data.activitys[i].act_id;
	      if (goods.act_id != -1 && !goods.checked) {
	        all = false;
	      }
	    }
	  }
	  data.isEmpty = !data.sku_count_all;
	  cart.checkAll = all;
	  console.log("data", data);
	  return data;
	}

	/**
	 * 结算
	 */
	function settlement(cart) {
	  if (cart.isLogin) {
	    bravetime.addLoader({ small: true });
	    $.ajax({
	      url: window.selloutCheckUrl,
	      dataType: "json",
	      success: function success(result) {
	        bravetime.removeLoader();
	        if (result.code) {
	          var msg = "<div style='text-align:left;'>";
	          if (result.data.total > 1) {
	            msg += result.data.goods[0] + "<br/>" + result.data.goods[1] + '</div>';
	            msg += "<br/>等" + result.data.total + "件商品已售罄，请您取消勾选";
	          } else {
	            msg += result.data.goods[0] + "</div><br/>该商品已售罄，请您取消勾选";
	          }
	          bravetime.newAlert(msg);
	        } else {
	          bravetime.goto(result.url || "checkout.html");
	        }
	      }, error: function error() {
	        bravetime.removeLoader();
	        bravetime.goto("checkout.html");
	      }
	    });
	  } else {
	    bravetime.goto('login.html?referer=cart.html');
	    //            微信登录
	    //            if(Units.isWechat()){
	    //                var host = window.location.host;
	    //                var hostarr = host.split(".");
	    //                location.href = "http://open."+hostarr[1]+"."+hostarr[2]+"/WechatLogin/index?referer=" + location.href;
	    //            }else{
	    //              bravetime.goto('login.html?referer=cart.html');
	    //            }
	  }
	}

	/**
	 * 原生结算
	 */
	function settlementNative(cart) {
	  var callback = function callback(r) {
	    if (typeof r == "string") {
	      r = JSON.parse(r);
	    }
	    var code = r.code;
	    if (code == 0) {
	      // 没登录
	    } else if (code == 1) {
	      location.reload();
	    } else if (code == 2) {
	      settlement(cart);
	    }
	  };
	  bravetime.nativeLogin(callback);
	}

	function setCartInfoCache(data) {
	  if (!window.isPrivateMode && window.sessionStorage && data) {
	    sessionStorage.setItem("cart_info", JSON.stringify(data));
	  }
	}

	function getCartInfoCache() {
	  var data = null;
	  if (!window.isPrivateMode && window.sessionStorage) {
	    var patharr = JSON.parse(sessionStorage.history);
	    if (patharr.length > 2) {
	      var lastPath = patharr[patharr.length - 2].path;
	      if (lastPath == "detail") {
	        data = JSON.parse(sessionStorage.getItem("cart_info"));
	      }
	    }
	  }
	  return data;
	}

	/**
	 * 初始化
	 */
	function init() {
	  window.edit = function () {
	    cartVUE.toggleEditMode();
	  };
	}

	init();
	// </script>

/***/ },

/***/ 449:
/***/ function(module, exports) {

	module.exports = "\n\n <div class=\"top0\">\n   <div class=\"top_container\">\n     <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->\n     <div class=\"top_left\">\n       <a class=\"top_back\" href=\"javascript:history.back();\">\n         <span class=\"home_arrow\"></span>\n       </a>\n     </div>\n     <div class=\"title_container\">\n       购物车<span class=\"cart_number\" v-text=\"'('+cartInfo.sku_count_all+')'\"\n                v-if=\"cartInfo.sku_count_all\"></span>\n     </div>\n     <div class=\"top_right\" @click=\"toggleEditMode\">\n       <a v-if=\"cartInfo.isEmpty\" href=\"/\" class=\"top_home\">\n         <span class=\"home_icon\"></span>\n       </a>\n       <a v-else class=\"top_btn\">\n         <span class=\"text_btn\" v-text=\"editMode?'完成':'编辑'\">编辑</span>\n       </a>\n     </div>\n   </div>\n </div>\n\n\n <!--商品列表部分-->\n <div class=\"goods_in_cart\" v-if=\"!cartInfo.isEmpty\">\n   <!--循环输出商品组-->\n   <div class=\"reduce_item_container\"\n        v-for=\"activity in cartInfo.activitys\"\n        track-by=\"$index\"\n        :class=\"{'fail':activity.act_id==-1}\">\n\n     <!--活动标签-->\n     <a class=\"reduce_item_title\"\n        :href=\"activity.act_url||'javascript:void()'\"\n        v-if=\"activity.act_id>0\">\n       <span class=\"dav-red\">{{activity.act_type_name}}</span>\n       {{activity.act_info}}\n       <span class=\"icon_r_container\">\n               <i v-if=\"activity.act_url != undefined && activity.act_url != null && activity.act_url != 0\"\n                  class=\"icon dav_icon_dayuhao_10_22 dav-border-red dav-border-red\"></i>\n           </span>\n     </a>\n\n     <div class=\"goods_item_s\">\n\n       <div class=\"good_item checked\"\n            v-for=\"goods in activity.goods\"\n            track-by=\"$index\"\n            :class=\"{'checked':goods.checked}\"\n            goods-id=\"{{goods.goods_id}}\"\n            max-count=\"{{goods.purchase_limit||200}}\">\n         <!--图标-->\n         <div class=\"icon_container\">\n           <!--无效商品-->\n           <span class=\"invalid_lable\" v-if=\"activity.act_id==-1\">失效</span>\n           <!--非编辑模式-->\n           <i class=\"icon\" v-show=\"!editMode&&activity.act_id>=0\"\n              @click=\"toggleCheckStatus(goods,activity)\"\n              :class=\"{'dav_icon_choice_selected_40_40':goods.checked,'dav_icon_choice_no_selected_40_40':!goods.checked}\"></i>\n           <!--编辑模式-->\n           <i class=\"icon\" v-show=\"editMode&&activity.act_id>=0\"\n              @click=\"toggleEditStatus(goods)\"\n              :class=\"{'dav_icon_choice_selected_40_40':goods.edit_checked,'dav_icon_choice_no_selected_40_40':!goods.edit_checked}\"></i>\n         </div>\n         <!--商品图-->\n         <a class=\"pic_container\" href=\"/{{goods.goods_id}}.html{{refererStr}}\" @click=\"gotoGoods()\">\n           <img class=\"good_img\" :src=\"goods.goods_thumb\">\n           <div class=\"sale_prompt_text\" v-if=\"goods.pre_sale\">预售</div>\n           <span class=\"sold_out\" v-if=\"goods.goods_stocks<=0\">售罄</span>\n         </a>\n         <!--右侧-->\n         <div class=\"right_container\">\n           <a class=\"good_title\" href=\"/{{goods.goods_id}}.html{{refererStr}}\" v-text=\"goods.goods_name\"\n              @click=\"gotoGoods()\"></a>\n           <div class=\"goods_infos_wrap\">\n             <div class=\"cart_format\" :class = \"{ cart_format_h: goods.goods_tags && goods.goods_tags.length }\">\n               <span v-for=\"tag in goods.goods_tags\" v-text=\"tag.tag_name\"></span>\n             </div>\n             <!--优惠-->\n             <!--<div class=\"price_info_reduce dav-red\" v-if=\"goods.price_act_name\"-->\n                  <!--v-text=\"goods.price_act_name+'价'\"></div>-->\n             <div v-if = \"goods.price_act_name == '限时'\" class=\"price_info_reduce dav-red\" v-if=\"goods.price_act_name\"\n                  v-text=\"goods.price_act_name+'购'\"></div>\n             <div v-else class=\"price_info_reduce dav-red\" v-if=\"goods.price_act_name\"\n                  v-text=\"goods.price_act_name+'价'\"></div>\n\n             <div class=\"price_info_reduce dav-red\" v-if=\"!goods.price_act_name&&goods.purchase_limit\"\n                  v-text=\"'限购'+goods.purchase_limit+'件'\"></div>\n\n             <!--价格-->\n             <div class=\"good_price dav-color-price\">\n               <span class=\"dav-red s_price_number\"><em>￥</em>{{goods.goods_price}}</span>\n             </div>\n\n             <!--会员返返现-->\n             <div v-if=\"goods.seller_income != '0' && userStatus == 3\" class=\"income_vip\">会员返<em>￥</em>{{goods.seller_income}}</div>\n\n             <!--商品数量-->\n             <div class=\"sold_out_collect\" v-if=\"activity.act_id>=0&&!goods.goods_stocks\"\n                  @click=\"collect(goods)\">\n               转到收藏\n             </div>\n\n             <div class=\"good_number_container\" v-if=\"activity.act_id>=0&&goods.goods_stocks\">\n               <div class=\"input_control\">\n                 <div class=\"minus change_num\" @click=\"changeGoodsNumber(goods,-1,activity)\">-</div>\n                 <input type=\"tel\" v-model=\"goods.goods_number\"\n                        @change=\"changeGoodsNumber(goods,0,activity)\">\n                 <div class=\"plus change_num\" :class=\"{'disable':goods.goods_number>=goods.max_amount}\"\n                      @click=\"changeGoodsNumber(goods,1,activity)\">+\n                 </div>\n               </div>\n\n             </div>\n           </div>\n         </div>\n\n         <!--超出库存-->\n         <div class=\"seckill_countdown_right\" v-if=\"goods.goods_stocks>0&&goods.goods_number>goods.goods_stocks\"><span>商品数量超出库存</span>\n         </div>\n         <!--降价-->\n         <div class=\"price_change\" v-if=\"!(goods.sag_left_time > 0)&&!(goods.fsp_left_time > 0)&&!(goods.bkg_left_time > 0) && goods.reduce_money\">比加入时降{{goods.reduce_money}}元</div>\n\n         <!--限时购倒计时和其他信息-->\n         <!--秒杀商品-->\n         <span v-if=\"goods.sag_left_time > 0\">\n           <!--秒杀和几倍返现同事存在-->\n           <span v-if=\"goods.bkg_left_time > 0\">\n             <!--秒杀剩余时间少于翻倍返现剩余时间-->\n             <div class=\"ts_info_limit seckill_countdown\" v-if=\"goods.bkg_left_time > goods.sag_left_time\"\n                  style=\"color:#ff4a7d;\">\n               {{goods.sag_left_time|datetimeFormat}}，可享受秒杀和{{goods.act_income.ratio}}倍返利优惠<span\n               v-if=\"goods.reduce_money\">，比加入时降<span class=\"dav-red\">{{goods.reduce_money}}元</span></span>\n             </div>\n             <!--秒杀剩余时间大于翻倍返现剩余时间-->\n             <div class=\"ts_info_limit seckill_countdown\" v-else style=\"color:#ff4a7d;\">\n               {{goods.bkg_left_time|datetimeFormat}}，可享受秒杀和{{goods.act_income.ratio}}倍返利优惠<span\n               v-if=\"goods.reduce_money\">，比加入时降<span class=\"dav-red\">{{goods.reduce_money}}元</span></span>\n             </div>\n           </span>\n           <!--只有秒杀-->\n           <span v-else>\n             <div class=\"ts_info_limit seckill_countdown dav-red\" style=\"color:#ff4a7d;\">\n               {{goods.sag_left_time|datetimeFormat}}<span v-if=\"goods.reduce_money\">，比加入时降<span class=\"dav-red\">{{goods.reduce_money}}元</span></span>\n             </div>\n           </span>\n         </span>\n\n         <!--限时购商品-->\n         <span v-if=\"goods.fsp_left_time > 0\">\n           <!--限时购和几倍返现同事存在-->\n           <span v-if=\"goods.bkg_left_time > 0\">\n             <!--限时购剩余时间少于翻倍返现剩余时间-->\n             <div class=\"ts_info_limit seckill_countdown\" v-if=\"goods.bkg_left_time > goods.fsp_left_time\">\n               在<span class=\"dav-red\">{{goods.fsp_left_time|datetimeFormatNew}}</span>内<span v-if=\"userStatus == 3\">支付\n             </span><span v-else>成为会员</span>\n               ，可享受限时购和{{goods.act_income.ratio}}倍返利优惠\n               <span v-if=\"goods.reduce_money\">，比加入时降<span class=\"dav-red\">{{goods.reduce_money}}元</span></span>\n             </div>\n             <!--限时购剩余时间大于翻倍返现剩余时间-->\n             <div class=\"ts_info_limit seckill_countdown\" v-else>\n                在<span class=\"dav-red\">{{goods.bkg_left_time|datetimeFormatNew}}</span>内<span\n               v-if=\"userStatus == 3\">支付</span><span v-else>成为会员</span>，可享受限时购和{{goods.act_income.ratio}}倍返利优惠\n               <span v-if=\"goods.reduce_money\">，比加入时降<span class=\"dav-red\">{{goods.reduce_money}}元</span></span>\n             </div>\n           </span>\n           <!--只有限时购-->\n           <span v-else>\n             <div class=\"ts_info_limit seckill_countdown\">\n               在<span class=\"dav-red\">{{goods.fsp_left_time|datetimeFormatNew}}</span>内<span\n               v-if=\"userStatus == 3\">支付</span><span v-else>成为会员</span>，可享受限时购优惠<span\n               v-if=\"goods.reduce_money\">，比加入时降<span class=\"dav-red\">{{goods.reduce_money}}元</span></span>\n             </div>\n           </span>\n         </span>\n\n         <!--只有返现翻倍-->\n         <div class=\"ts_info_limit seckill_countdown\"\n              v-if=\"goods.bkg_left_time > 0 && !(goods.fsp_left_time > 0) && !(goods.sag_left_time > 0) \">\n           在<span class=\"dav-red\">{{goods.bkg_left_time|datetimeFormatNew}}</span>内<span\n           v-if=\"userStatus == 3\">支付</span><span v-else>成为会员</span>，可享受{{goods.act_income.ratio}}倍返利优惠<span\n           v-if=\"goods.reduce_money\">，比加入时降<span class=\"dav-red\">{{goods.reduce_money}}元</span></span>\n         </div>\n\n         <div class=\"ts_info_limit seckill_countdown\" v-if=\"!(goods.sag_left_time > 0)&&!(goods.fsp_left_time > 0)&&!(goods.bkg_left_time > 0)&&goods.secondsp\">\n           <span style=\"color:#ff4a7d;\">商品失效，请重新添加购物车</span>\n         </div>\n         <div class=\"buy_gift\" v-if=\"goods.buy_gift&&goods.buy_gift.length\">\n           <span class=\"dav-red\">[赠品]</span>\n           <div class=\"buy_gift_con\">\n             <a v-for=\"g in goods.buy_gift\" href=\"/{{g.gift_id}}.html\">\n               <sapn class=\"text\" v-text=\"g.goods_name\"></sapn>\n               <span class=\"number\" v-text=\"'X'+g.gift_number\"></span>\n             </a>\n           </div>\n\n         </div>\n       </div>\n\n     </div>\n     <!--商品列表-->\n\n     <!--赠品 -->\n     <div class=\"premiums\" v-if=\"activity.gifts&&activity.gifts.length\">\n       <div class=\"premiums_con\"\n            @click=\"show_gift(gift)\"\n            v-for=\"gift in activity.gifts\" v-if=\"gift.gift_stocks != 0\">\n         <span class=\"dav-red\">[满送]</span> {{gift.goods_name}}\n         <span class=\"premiums_con_number\" v-if=\"gift.gift_stocks\">X{{gift.gift_number||1}}</span>\n         <span class=\"premiums_con_number dav-red\" v-if=\"!gift.gift_stocks\">[已赠完]</span>\n       </div>\n     </div>\n     <!--清空失效-->\n     <div class=\"clear_shop april_border hairlines\" v-if=\"activity.act_id==-1\">\n       <div class=\"dav-btn btn-small border_inner\" @click=\"clearInvalidGoods\">清空失效商品</div>\n     </div>\n   </div>\n\n\n   <div class=\"price_item\">\n     <span class=\"price_text\">合计：</span>\n     <span\n       class=\"price_number\">￥{{ cartInfo.order_amount}} ＝ ￥{{ cartInfo.goods_amount}}</span>\n     <span class=\"reduce_info dav-price\" v-if=\"cartInfo.discounts\">\n               <span v-for=\"discount in cartInfo.discounts\">-￥{{discount.discount}}({{discount.act_type_name}}) </span>\n           </span>\n   </div>\n </div>\n\n <div class=\"center dav-small dav-red info59\" v-if=\"!cartInfo.isEmpty&&cartInfo.goods_amount<59\">\n   <span>温馨提示：满 59 才包邮哦~ </span><a\n   class=\"underline\" href=\"/\">再去逛逛</a></div>\n\n <!--空购物车-->\n <div class=\"cart_blank\" v-if=\"cartInfo.isEmpty&&!loading\">\n   <div class=\"cart_empty_pic\">\n     <img src=\"//pic.davdian.com/free/image_cart_empty.png\">\n   </div>\n   <div class=\"dav-color6 center\">购物车还是空的，您再去逛逛吧</div>\n   <div class=\"button_container\">\n     <a href=\"/\">\n       <div class=\"dav-btn btn-red center\">去逛逛</div>\n     </a>\n   </div>\n   <div class=\"order dav-shadow\" v-if=\"cartInfo.unpay_order.length\">\n     <div class=\"order_title\">\n       最近未支付订单\n     </div>\n     <a href=\"/o-{{cartInfo.unpay_order[0].order_id}}.html\">\n       <div class=\"order_name_state\">\n         <span class=\"order_name\">{{cartInfo.unpay_order[0].user_name}}</span>\n         <span class=\"order_state pull-right\">\n                       <span>订单状态：</span>\n                       <span class=\"dav-red\">待付款</span>\n                   </span>\n       </div>\n\n       <div class=\"good_container\">\n         <div class=\"img_container many_goods\">\n           <div class=\"img_container_inner\" style=\"height: 60px;\">\n             <img v-for=\"item in cartInfo.unpay_order[0].unpay_goods_list\" :src=\"item.goods_thumb\">\n           </div>\n           <div class=\"pull-right text-container\">共{{cartInfo.unpay_order[0].unpay_goods_list.length}}件<br>商品\n           </div>\n         </div>\n       </div>\n\n       <div class=\"order_price\">金额：￥{{cartInfo.unpay_order[0].order_amount}}</div>\n     </a>\n     <div class=\"out_button_container\">\n       <a class=\"dav-btn btn-small order-btn-red pull-right\"\n          href=\"/checkout.html?order_id={{cartInfo.unpay_order[0].order_id}}\">立即支付</a>\n       <a class=\"dav-btn btn-small pull-right\"\n          href=\"/index.php?c=AgentPay&amp;a=index&amp;order_id={{cartInfo.unpay_order[0].order_id}}\">找人代付</a>\n     </div>\n   </div>\n </div>\n <div class=\"loading\" v-if=\"loading\">购物车商品读取中</div>\n\n <!--登录部分-->\n <div class=\"account_in_cart login_container\" v-show=\"!cartInfo.isEmpty\">\n   <slot></slot>\n </div>\n\n <!--会员返现提示悬框-->\n<!--  <div v-if=\"cartInfo.total_income\" class=\"income_bottom_fixed\">\n   <span v-if=\"userStatus == 3\">本次购物可获得￥{{cartInfo.total_income}}返现，订单完成后在[我的]-[总额]中查看</span>\n   <span v-else>会员下单立返￥{{cartInfo.total_income}}</span>\n   <a v-if=\"userStatus != 3\" :href=\"kdUrl\">开通会员</a>\n </div> -->\n <div v-if=\"cartInfo.total_income && userStatus == 3\" class=\"income_bottom_fixed\">\n   <span>本次购物可获得￥{{cartInfo.total_income}}返现，订单完成后在[我的]-[总额]中查看</span>\n </div>\n <!--购物车结算低栏-->\n <div class=\"cart_bottom\" v-if=\"!cartInfo.isEmpty\">\n   <div class=\"select_all\">\n     <i class=\"icon\"\n        :class=\"[{'dav_icon_choice_no_selected_40_40':(!checkAll&&!editMode)||(!checkEditAll&&editMode)},{'dav_icon_choice_selected_40_40':(checkAll&&!editMode)||(checkEditAll&&editMode)}]\"\n        @click=\"checkAllCheck((!editMode&&!checkAll)||(editMode&&!checkEditAll))\"></i>\n     全选\n   </div>\n   <div class=\"price_con\" v-if=\"!editMode\">\n     <div v-if=\"cartInfo.saving == 0\" class=\"left_price\" style=\"margin-top: 15px;\">\n       <span class=\"price_text\" style=\"font-weight: bold\">应付:</span><span class=\"price_number price_number_after\">￥{{\n       cartInfo.order_amount}}\n     </span>\n     </div>\n     <div v-if=\"cartInfo.saving != 0\" class=\"left_price\">\n       <span class=\"price_text\" style=\"font-weight: bold\">应付:</span><span class=\"price_number price_number_after\">￥{{ cartInfo.order_amount}}  </span>\n     </div>\n     <div v-if=\"cartInfo.saving != 0\" class=\"reduce_price\">\n       <span class=\"other_info\">总额:￥{{ cartInfo.goods_amount}} <span\n         class=\"ml_10\">优惠:￥{{ cartInfo.saving}}</span></span>\n     </div>\n   </div>\n   <div class=\"pay_button_container\" @click=\"pay\" v-show=\"!editMode\">\n     <div class=\"dav-btn2\" :class=\"{'btn-disable':paying,'btn-red':!paying}\" v-if=\"isLogin\">\n       <span class=\"text\" v-if=\"paying\">结算中...</span>\n       <span class=\"text\" v-else>结算<span class=\"f11\">({{cartInfo.sku_count}})</span></span>\n     </div>\n     <div class=\"dav-btn2 btn-red\" v-else>去登录</div>\n   </div>\n   <div class=\"delete_shop_btn\" v-if=\"editMode\" @click=\"doSome('del')\">\n     <div class=\"dav-btn btn-red\">\n       <span class=\"text\">删除商品</span>\n     </div>\n   </div>\n   <div class=\"go_collect_btn\" v-if=\"editMode\" @click=\"doSome('collect')\">\n     <div class=\"dav-btn btn-yellow\">\n       <span class=\"text\">转到收藏</span>\n     </div>\n   </div>\n </div>\n";

/***/ }

/******/ });