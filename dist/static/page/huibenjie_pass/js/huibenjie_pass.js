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
/******/ 	__webpack_require__.p = "//fe-ws.davdian.com/wap/static/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _common = __webpack_require__(30);

	var _common2 = _interopRequireDefault(_common);

	var _Vue = __webpack_require__(41);

	var _Vue2 = _interopRequireDefault(_Vue);

	var _jsCookie = __webpack_require__(36);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _autoRootSize = __webpack_require__(40);

	var _autoRootSize2 = _interopRequireDefault(_autoRootSize);

	var _util = __webpack_require__(37);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 业务模块


	// 第三方模块
	(0, _autoRootSize2.default)(750);

	// 解决safari从答题也返回后不刷新问题
	// 基础模块
	window.addEventListener('pageshow', function () {
	  if (window.pageFirstTimeShow) {
	    location.reload();
	  }
	}, false);
	setTimeout(function () {
	  window.pageFirstTimeShow = true;
	}, 30 * 1000);

	new _Vue2.default({
	  components: {
	    app: __webpack_require__(816)
	  },
	  template: '<app />',
	  el: ".app"
	});

	// 清除cookie
	_jsCookie2.default.remove('force_domain', {
	  domain: _util2.default.getBaseDomain()
	});

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _native = __webpack_require__(31);

	var _native2 = _interopRequireDefault(_native);

	var _ua = __webpack_require__(32);

	var _ua2 = _interopRequireDefault(_ua);

	var _login = __webpack_require__(35);

	var _login2 = _interopRequireDefault(_login);

	var _jsCookie = __webpack_require__(36);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _util = __webpack_require__(37);

	var _util2 = _interopRequireDefault(_util);

	var _weixin = __webpack_require__(38);

	var _weixin2 = _interopRequireDefault(_weixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import scriptjs from 'scriptjs';
	__webpack_require__(40);


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
	_checkRedirect(_jsCookie2.default.get('force_domain'));

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

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _LiveVideo;

	var _ua = __webpack_require__(32);

	var _ua2 = _interopRequireDefault(_ua);

	var _$ = __webpack_require__(33);

	var _$2 = _interopRequireDefault(_$);

	var _config = __webpack_require__(34);

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

/***/ 32:
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

/***/ 33:
/***/ function(module, exports) {

	module.exports = $;

/***/ },

/***/ 34:
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

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsCookie = __webpack_require__(36);

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

/***/ 36:
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

/***/ 37:
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

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _scriptjs = __webpack_require__(39);

	var _scriptjs2 = _interopRequireDefault(_scriptjs);

	var _$ = __webpack_require__(33);

	var _$2 = _interopRequireDefault(_$);

	var _config = __webpack_require__(34);

	var _config2 = _interopRequireDefault(_config);

	var _jsCookie = __webpack_require__(36);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _util = __webpack_require__(37);

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
	    // var redirect_uri = `${location.protocol}//open.davdian.com/view_prod_/weixin_auth_redirect.html?env_num=&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;
	    // var redirect_uri = `${location.protocol}//open.davdian.com/view_gray_9/weixin_auth_redirect.html?env_num=&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;
	    // var redirect_uri = `${location.protocol}//open.davdian.com/view/weixin_auth_redirect.html?env_num=&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;
	    var redirect_uri = location.protocol + '//open.davdian.com/view/weixin_auth_redirect.html?referrer_protocal=' + encodeURIComponent(location.protocol) + '&referrer_host=' + encodeURIComponent(location.host) + '&referrer_path=' + encodeURIComponent(location.href.split(location.host)[1]);

	    // 微信授权页面url，davdian.com的appid=wx5f9796f55f5366b6，vyohui.cn的aooud=wx588f41c3ea092fe0
	    var url = '//open.weixin.qq.com/connect/oauth2/authorize?appid=wx5f9796f55f5366b6&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_' + (show ? 'userinfo' : 'base') + '&state=' + Date.now();

	    // 去微信授权页面
	    location.href = url;
	    throw new Error('\u5373\u5C06\u8DF3\u8F6C\u5FAE\u4FE1\u6388\u6743\u9875(' + location.href + ')\uFF0C\u5DF2\u4E3B\u52A8\u629B\u51FA\u5F02\u5E38\u4E2D\u65AD\u5F53\u524D\u9875\u9762js\u6267\u884C\uFF0C\u8BF7\u5FFD\u7565\u6B64\u5F02\u5E38\u4FE1\u606F~');
	  }
	};

/***/ },

/***/ 39:
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

/***/ 40:
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

/***/ 41:
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(44));
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

/***/ 44:
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

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ua = __webpack_require__(32);

	var _ua2 = _interopRequireDefault(_ua);

	var _native = __webpack_require__(31);

	var _native2 = _interopRequireDefault(_native);

	var _weixin = __webpack_require__(38);

	var _weixin2 = _interopRequireDefault(_weixin);

	var _Vue = __webpack_require__(41);

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
	        'com-share-pop-tip': __webpack_require__(47)
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

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(48)
	__vue_script__ = __webpack_require__(52)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-share-pop-tip.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(53)
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
	  var id = "_v-7718a21b/com-share-pop-tip.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(49);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(51)(content, {});
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

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(50)();
	// imports


	// module
	exports.push([module.id, ".com-share-pop-tip {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  max-width: 640px;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.8;\n  z-index: 99;\n  display: none; }\n  .com-share-pop-tip .arrow {\n    position: absolute;\n    top: 0;\n    right: 0.3rem; }\n  .com-share-pop-tip .tip {\n    margin-top: 1rem;\n    color: #ffffff;\n    font-size: 0.15rem;\n    padding: 0 0.3rem;\n    text-align: center;\n    line-height: 1.5; }\n", ""]);

	// exports


/***/ },

/***/ 50:
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

/***/ 51:
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

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ua = __webpack_require__(32);

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

/***/ 53:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"com-share-pop-tip\" :style=\"styleObject\" @click=\"close\" @touchmove=\"touchmove\">\n  <img class=\"arrow\" src=\"http://pic.davdian.com/free/pointer.png\">\n  <div class=\"tip\">\n    <template v-if=\"isWeixin\">\n      <p>请点击右上角“分享”按钮,</p>\n      <p>然后可以选择“发送给朋友”、“分享到朋友圈”或者“复制链接”后发送链接给朋友。</p>\n    </template>\n    <template v-if=\"!isWeixin\">\n      <p>请复制地址栏链接，将链接发送给朋友</p>\n    </template>\n  </div>\n</div>\n";

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(78)
	__vue_script__ = __webpack_require__(80)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-top-title.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(81)
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
	  var id = "_v-8892d76c/com-top-title.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(79);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(51)(content, {});
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

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(50)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes animation-top-title-hide {\n  0% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); } }\n\n@keyframes animation-top-title-hide {\n  0% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n  100% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); } }\n\n@-webkit-keyframes animation-top-title-show {\n  0% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n@keyframes animation-top-title-show {\n  0% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); } }\n\n.com-top-title {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  max-width: 640px;\n  height: 44px;\n  line-height: 44px;\n  background-color: #fafafa;\n  color: #333;\n  text-align: center;\n  font-size: 16px;\n  z-index: 1; }\n  .com-top-title.border-bottom {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.05); }\n  .com-top-title .back-btn {\n    position: absolute;\n    left: 0;\n    height: 100%;\n    width: 44px; }\n    .com-top-title .back-btn .back-arrow {\n      position: absolute;\n      top: 15px;\n      left: 15px;\n      display: inline-block;\n      width: 12px;\n      height: 12px;\n      border-bottom: 1px solid #333;\n      border-left: 1px solid #333;\n      -webkit-transform: rotate(45deg);\n          -ms-transform: rotate(45deg);\n              transform: rotate(45deg);\n      cursor: pointer; }\n  .com-top-title .title {\n    display: inline-block;\n    width: 60%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .com-top-title .home {\n    position: absolute;\n    top: 12px;\n    right: 12px;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    background: url(http://pic.davdian.com/free/home_icon_0825.png) no-repeat;\n    background-size: 100%;\n    cursor: pointer; }\n  .com-top-title.animate-hide {\n    -webkit-animation: animation-top-title-hide 0.2s forwards;\n            animation: animation-top-title-hide 0.2s forwards; }\n  .com-top-title.animate-show {\n    -webkit-animation: animation-top-title-show 0.2s forwards;\n            animation: animation-top-title-show 0.2s forwards; }\n", ""]);

	// exports


/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ua = __webpack_require__(32);

	var _ua2 = _interopRequireDefault(_ua);

	var _native = __webpack_require__(31);

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

/***/ 81:
/***/ function(module, exports) {

	module.exports = "\n<!--顶部标题-->\n<div class=\"com-top-title\" :class=\"classObject\" v-if=\"!isDvdApp\" :style=\"styleObject\">\n  <div class=\"back-btn\" @click=\"back\">\n    <i class=\"back-arrow\"></i>\n  </div>\n  <span class=\"title\">{{title}}</span>\n  <i class=\"home\" v-if=\"home !== undefined\" @click=\"goHome\"></i>\n  <slot></slot>\n</div>\n";

/***/ },

/***/ 154:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getbackData = exports.savebackData = exports.strSign = exports.getUserState = exports.isInisWechatOrApp = exports.getQuery = undefined;

	var _md = __webpack_require__(43);

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

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _md = __webpack_require__(43);

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

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _md = __webpack_require__(43);

	var _md2 = _interopRequireDefault(_md);

	var _utils = __webpack_require__(154);

	var _utils2 = _interopRequireDefault(_utils);

	var _$ = __webpack_require__(33);

	var _$2 = _interopRequireDefault(_$);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var common = __webpack_require__(264); // var crypto = require('crypto');


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

/***/ 787:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(788)
	__vue_script__ = __webpack_require__(790)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/component/com-pic-display-box.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(791)
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
	  var id = "_v-0fa092e7/com-pic-display-box.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 788:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(789);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(51)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-pic-display-box.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js!../../node_modules/sass-loader/index.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./com-pic-display-box.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 789:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(50)();
	// imports


	// module
	exports.push([module.id, ".pic-display-box {\n  position: fixed;\n  display: none;\n  width: 100%;\n  max-width: 640px;\n  height: 100%;\n  top: 0;\n  z-index: 2;\n  vertical-align: middle; }\n  .pic-display-box.show {\n    display: table; }\n  .pic-display-box.hide {\n    display: none; }\n  .pic-display-box .cell {\n    position: relative;\n    display: table-cell;\n    width: 100%;\n    height: 100%;\n    vertical-align: middle;\n    text-align: center; }\n    .pic-display-box .cell .mask {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      background: #000;\n      opacity: 0.5; }\n    .pic-display-box .cell .content {\n      position: relative;\n      display: inline-block;\n      width: 80%;\n      height: auto;\n      font-size: 0; }\n      .pic-display-box .cell .content .close-btn {\n        position: absolute;\n        width: .30rem;\n        height: .30rem;\n        top: -.15rem;\n        right: -.15rem;\n        border-radius: 50%;\n        background: #bcbbbb;\n        cursor: pointer; }\n        .pic-display-box .cell .content .close-btn .line {\n          position: absolute;\n          top: 50%;\n          left: 15%;\n          width: 70%;\n          border-top: 1px solid #fff; }\n          .pic-display-box .cell .content .close-btn .line:first-of-type {\n            -webkit-transform: rotate(45deg);\n                -ms-transform: rotate(45deg);\n                    transform: rotate(45deg); }\n          .pic-display-box .cell .content .close-btn .line:last-of-type {\n            -webkit-transform: rotate(-45deg);\n                -ms-transform: rotate(-45deg);\n                    transform: rotate(-45deg); }\n      .pic-display-box .cell .content img {\n        max-width: 100%; }\n", ""]);

	// exports


/***/ },

/***/ 790:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <!--顶部标题-->
	//   <div class="pic-display-box" :class="{show: isShow, hide: !isShow}">
	//     <div class="cell">
	//       <div class="mask" @click="close"></div>
	//       <div class="content">
	//         <img :src="src">
	//         <div class="close-btn" @click="close">
	//           <div class="line"></div>
	//           <div class="line"></div>
	//         </div>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <!--组件定义-->
	// <script>
	exports.default = {
	  data: function data() {
	    return {
	      isShow: false,
	      classObject: {},
	      styleObject: {}
	    };
	  },
	  props: {
	    src: {
	      type: String,
	      default: ''
	    }
	  },
	  methods: {
	    show: function show(picUrl) {
	      if (picUrl) {
	        this.src = picUrl;
	      }
	      this.isShow = true;
	    },
	    close: function close() {
	      this.isShow = false;
	    }
	  },
	  filters: {},
	  computed: {},
	  watch: {},
	  mounted: function mounted() {}
	  // </script>
	  //
	  // <!--样式-->
	  // <style lang="sass" lang="scss" rel="stylesheet/scss">
	  //   @import "../common/css/util/all";
	  //
	  //   .pic-display-box {
	  //     position: fixed;
	  //     display: none;
	  //     width: 100%;
	  //     max-width: $pageMaxWidth;
	  //     height: 100%;
	  //     top: 0;
	  //     z-index: 2;
	  //     vertical-align: middle;
	  //     &.show {
	  //       display: table;
	  //     }
	  //     &.hide {
	  //       display: none;
	  //     }
	  //     .cell {
	  //       position: relative;
	  //       display: table-cell;
	  //       width: 100%;
	  //       height: 100%;
	  //       vertical-align: middle;
	  //       text-align: center;
	  //       .mask {
	  //         position: absolute;
	  //         width: 100%;
	  //         height: 100%;
	  //         top: 0;
	  //         left: 0;
	  //         background: #000;
	  //         opacity: 0.5;
	  //         // z-index: -1;
	  //       }
	  //       .content {
	  //         position: relative;
	  //         display: inline-block;
	  //         width: 80%;
	  //         height: auto;
	  //         font-size: 0;
	  //         .close-btn {
	  //           position: absolute;
	  //           width: .30rem;
	  //           height: .30rem;
	  //           top: -.15rem;
	  //           right: -.15rem;
	  //           border-radius: 50%;
	  //           background: #bcbbbb;
	  //           cursor: pointer;
	  //           .line {
	  //             position: absolute;
	  //             top: 50%;
	  //             left: 15%;
	  //             width: 70%;
	  //             border-top: 1px solid #fff;
	  //             &:first-of-type {
	  //               transform: rotate(45deg);
	  //             }
	  //             &:last-of-type {
	  //               transform: rotate(-45deg);
	  //             }
	  //           }
	  //         }
	  //         img {
	  //           max-width: 100%;
	  //         }
	  //       }
	  //     }
	  //   }
	  // </style>

	};

/***/ },

/***/ 791:
/***/ function(module, exports) {

	module.exports = "\n<!--顶部标题-->\n<div class=\"pic-display-box\" :class=\"{show: isShow, hide: !isShow}\">\n  <div class=\"cell\">\n    <div class=\"mask\" @click=\"close\"></div>\n    <div class=\"content\">\n      <img :src=\"src\">\n      <div class=\"close-btn\" @click=\"close\">\n        <div class=\"line\"></div>\n        <div class=\"line\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 816:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(817)
	__vue_script__ = __webpack_require__(819)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/page/huibenjie_pass/vue/app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(820)
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
	  var id = "_v-c5cf04ec/app.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 817:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(818);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(51)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/sass-loader/index.js!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/sass-loader/index.js!../../../../node_modules/vux-loader/src/style-loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 818:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(50)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct display in IE 9-.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\ntemplate,\n[hidden] {\n  display: none; }\n\n/* Links\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0; }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Restore the font weight unset by the previous rule.\n */\noptgroup {\n  font-weight: bold; }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n* {\n  margin: 0;\n  padding: 0; }\n\nul {\n  list-style: none inside; }\n\na {\n  text-decoration: none;\n  color: inherit; }\n\nimg {\n  border-style: none; }\n\niframe {\n  border: none; }\n\n:before,\n:after {\n  vertical-align: middle; }\n\nbody {\n  background-color: #f5f5f5;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 0.14rem;\n  line-height: 1;\n  color: #333;\n  word-break: break-all;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none; }\n\n.app {\n  margin: auto;\n  min-width: 320px;\n  max-width: 640px;\n  position: relative;\n  overflow: auto; }\n\n/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct display in IE 9-.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline; }\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\ntemplate,\n[hidden] {\n  display: none; }\n\n/* Links\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0; }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Restore the font weight unset by the previous rule.\n */\noptgroup {\n  font-weight: bold; }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n* {\n  margin: 0;\n  padding: 0; }\n\nul {\n  list-style: none inside; }\n\na {\n  text-decoration: none;\n  color: inherit; }\n\nimg {\n  border-style: none; }\n\niframe {\n  border: none; }\n\n:before,\n:after {\n  vertical-align: middle; }\n\nbody {\n  background-color: #f5f5f5;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 0.14rem;\n  line-height: 1;\n  color: #333;\n  word-break: break-all;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none; }\n\n.app {\n  margin: auto;\n  min-width: 320px;\n  max-width: 640px;\n  position: relative;\n  overflow: auto; }\n\n.app {\n  font-size: 0; }\n\n.page {\n  position: relative; }\n\n.bg img {\n  max-width: 100%; }\n\n.content {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  font-size: 0.14rem;\n  color: white; }\n  .content .pass {\n    position: absolute;\n    left: 0rem;\n    top: 0rem;\n    text-align: center;\n    font-size: 0;\n    /*.title{\n      margin-top: ptr(4);\n      padding: 0 ptr(12);\n      @include height(ptr(60));\n      border: 1px solid #9bdfdd;\n      border-radius: ptr(30);\n      background-color: #fbf6d9;\n      font-size: ptr(28);\n      color: #6f6f6f;\n    }*/ }\n    .content .pass.pass1 {\n      left: 5.44rem;\n      top: 62.65rem; }\n    .content .pass.pass2 {\n      left: 2.08rem;\n      top: 59.45rem; }\n    .content .pass.pass3 {\n      left: 5.43rem;\n      top: 56.96rem; }\n    .content .pass.pass4 {\n      left: 1.3rem;\n      top: 52.96rem; }\n    .content .pass.pass5 {\n      left: 5.58rem;\n      top: 48.45rem; }\n    .content .pass.pass6 {\n      left: 1.9rem;\n      top: 45.24rem; }\n    .content .pass.pass7 {\n      left: 5.26rem;\n      top: 41.33rem; }\n    .content .pass.pass8 {\n      left: 1.65rem;\n      top: 36.86rem; }\n    .content .pass.pass9 {\n      left: 5.32rem;\n      top: 33.55rem; }\n    .content .pass.pass10 {\n      left: 1.57rem;\n      top: 29.94rem; }\n    .content .pass.pass11 {\n      left: 4.31rem;\n      top: 25.74rem; }\n    .content .pass.pass12 {\n      left: 1.57rem;\n      top: 23.31rem; }\n    .content .pass.pass13 {\n      left: 4.84rem;\n      top: 20.04rem; }\n    .content .pass.pass14 {\n      left: 1.91rem;\n      top: 17.08rem; }\n    .content .pass.pass15 {\n      left: 5.26rem;\n      top: 13.52rem; }\n    .content .pass.pass16 {\n      left: 1.7rem;\n      top: 10.21rem; }\n    .content .pass.pass17 {\n      left: 5.36rem;\n      top: 6.61rem; }\n    .content .pass.pass18 {\n      left: 1.86rem;\n      top: 3.59rem; }\n    .content .pass .head {\n      position: absolute;\n      top: -1.47rem;\n      left: 50%;\n      margin-left: -0.595rem;\n      width: 1.19rem;\n      max-width: none;\n      max-height: none;\n      display: none; }\n    .content .pass .circle {\n      position: relative;\n      display: inline-block;\n      width: 0.62rem;\n      height: 0.62rem;\n      line-height: 0.62rem;\n      border-radius: 50%;\n      background: #f6fffe; }\n      .content .pass .circle .point {\n        position: absolute;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        margin: auto;\n        display: inline-block;\n        width: 0.3rem;\n        height: 0.3rem;\n        line-height: 0.3rem;\n        border-radius: 50%;\n        background: #75e0d0; }\n  .content .pass.current .head {\n    display: inline-block; }\n  .content .pass.current .circle {\n    -webkit-animation: point-animation 1s infinite;\n            animation: point-animation 1s infinite; }\n\n@-webkit-keyframes point-animation {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  90% {\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes point-animation {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  90% {\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n  .content .pass.over .circle {\n    -webkit-animation: none;\n            animation: none; }\n    .content .pass.over .circle .point {\n      background: #ff6245; }\n  .content .cloud {\n    position: absolute; }\n    .content .cloud.cloud2 {\n      top: 58.01rem;\n      height: 3.42rem;\n      left: 0; }\n    .content .cloud.cloud3 {\n      top: 55.8rem;\n      height: 3.18rem;\n      right: 0; }\n    .content .cloud.cloud4 {\n      top: 50.98rem;\n      height: 3.98rem;\n      left: 0; }\n    .content .cloud.cloud5 {\n      top: 47rem;\n      height: 3.42rem;\n      right: 0; }\n    .content .cloud.cloud6 {\n      top: 43.62rem;\n      height: 3.51rem;\n      left: 0; }\n    .content .cloud.cloud7 {\n      top: 40.51rem;\n      height: 3.16rem;\n      right: 0; }\n    .content .cloud.cloud8 {\n      top: 35.54rem;\n      height: 4.06rem;\n      left: 0; }\n    .content .cloud.cloud9 {\n      top: 32.08rem;\n      height: 3.45rem;\n      right: 0; }\n    .content .cloud.cloud10 {\n      top: 28.44rem;\n      height: 3.48rem;\n      left: 0; }\n    .content .cloud.cloud11 {\n      top: 24.74rem;\n      height: 3.6rem;\n      right: 0; }\n    .content .cloud.cloud12 {\n      top: 21.35rem;\n      height: 4.02rem;\n      left: 0; }\n    .content .cloud.cloud13 {\n      top: 18.65rem;\n      height: 3.44rem;\n      right: 0; }\n    .content .cloud.cloud14 {\n      top: 15.57rem;\n      height: 3.46rem;\n      left: 0; }\n    .content .cloud.cloud15 {\n      top: 11.88rem;\n      height: 3.58rem;\n      right: 0; }\n    .content .cloud.cloud16 {\n      top: 8.45rem;\n      height: 4rem;\n      left: 0; }\n    .content .cloud.cloud17 {\n      top: 5.78rem;\n      height: 3.42rem;\n      right: 0; }\n    .content .cloud.cloud18 {\n      top: 2.22rem;\n      height: 3.44rem;\n      left: 0; }\n\n@-webkit-keyframes cloud-animation-left {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n  100% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%); } }\n\n@keyframes cloud-animation-left {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n  100% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%); } }\n\n@-webkit-keyframes cloud-animation-right {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%); } }\n\n@keyframes cloud-animation-right {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%); } }\n    .content .cloud.animation {\n      -webkit-animation: cloud-animation 2s 1s;\n              animation: cloud-animation 2s 1s;\n      -webkit-animation-fill-mode: forwards;\n              animation-fill-mode: forwards; }\n    .content .cloud.animation:nth-of-type(2n+1) {\n      -webkit-animation-name: cloud-animation-left;\n              animation-name: cloud-animation-left; }\n    .content .cloud.animation:nth-of-type(2n) {\n      -webkit-animation-name: cloud-animation-right;\n              animation-name: cloud-animation-right; }\n  .content .rule-btn {\n    position: absolute;\n    left: 0.18rem;\n    bottom: 0.78rem;\n    width: 1.64rem; }\n    .content .rule-btn:active {\n      opacity: 0.9; }\n  .content .music-btn-open, .content .music-btn-close {\n    position: absolute;\n    right: 0.18rem;\n    bottom: 0.78rem;\n    width: 0.66rem; }\n    .content .music-btn-open:active, .content .music-btn-close:active {\n      opacity: 0.9; }\n  .content .music-btn-open {\n    -webkit-animation: music-rotate-animation 6s infinite linear;\n            animation: music-rotate-animation 6s infinite linear; }\n\n@-webkit-keyframes music-rotate-animation {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes music-rotate-animation {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n  .content .pop-rule {\n    position: fixed;\n    top: 0;\n    width: 100%;\n    max-width: 640px;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 2;\n    display: none; }\n    .content .pop-rule.show {\n      display: block; }\n    .content .pop-rule .rule-pic {\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      margin: auto;\n      width: 5.86rem;\n      height: 11rem;\n      max-height: 80%;\n      text-align: center; }\n      .content .pop-rule .rule-pic span {\n        position: relative; }\n        .content .pop-rule .rule-pic span img {\n          max-width: 100%;\n          max-height: 100%; }\n    .content .pop-rule .close-btn {\n      position: absolute;\n      right: 0;\n      display: inline-block;\n      width: 0.9rem;\n      height: 0.9rem;\n      line-height: 0.9rem;\n      cursor: pointer; }\n  .content .pic-display-box.show .content > img {\n    -webkit-animation: pic-display-box-img-animation 0.5s;\n            animation: pic-display-box-img-animation 0.5s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-transform-origin: bottom;\n        -ms-transform-origin: bottom;\n            transform-origin: bottom; }\n\n@-webkit-keyframes pic-display-box-img-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes pic-display-box-img-animation {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n  .content .pic-display-box .cell .content .close-btn {\n    opacity: 0; }\n  .content .pic-display-box#pop-begin .cell .content img {\n    width: 5.18rem; }\n  .content .pic-display-box#pop-miss-pass .cell .content img {\n    width: 5.18rem; }\n  .content .pic-display-box#pop-miss-day .cell .content img {\n    width: 5.72rem; }\n  .content .pic-display-box#pop-miss-day .cell .content .close-btn {\n    right: 0.7rem;\n    top: 0.2rem;\n    width: 1rem;\n    height: 1rem; }\n", ""]);

	// exports


/***/ },

/***/ 819:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _layout = __webpack_require__(270);

	var _layout2 = _interopRequireDefault(_layout);

	var _$ = __webpack_require__(33);

	var _$2 = _interopRequireDefault(_$);

	var _share = __webpack_require__(46);

	var _share2 = _interopRequireDefault(_share);

	var _ua = __webpack_require__(32);

	var _ua2 = _interopRequireDefault(_ua);

	var _native = __webpack_require__(31);

	var _native2 = _interopRequireDefault(_native);

	var _util = __webpack_require__(37);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <!--模板-->
	// <template>
	//   <div class="app">
	//     <!--头部标题-->
	//     <com-top-title title="绘本知识大比拼" home v-show="isShowTitleBar"></com-top-title>
	//
	//     <!--容器-->
	//     <div class="page">
	//       <!--背景-->
	//       <div class="bg">
	//         <img :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/bg.jpg'" @load="bgPicOnLoad">
	//       </div>
	//
	//       <!--内容-->
	//       <div class="content">
	//         <!--关卡-->
	//         <div class="pass" v-for="(pass, i) in passList"
	//              :class="['pass' + (i + 1), (pass.status == '1' || pass.status == '3' || pass.status == '5' ? 'over' : '')]"
	//              @click="passClick(i + 1, pass.status)">
	//           <div class="circle">
	//             <div class="point"></div>
	//           </div>
	//           <img v-show="!isOpenEye" class="head" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/head.png'">
	//           <img v-show="isOpenEye" class="head" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/head-1.png'">
	//           <!--<div class="title">好饿的毛毛虫</div>-->
	//         </div>
	//
	//         <!--云彩-->
	//         <div ref="clouds">
	//           <img class="cloud" v-for="(pass, i) in passList" v-if="i !== 0"
	//                :class="['cloud'+(i+1)]"
	//                :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/cloud-' + ((i+1) >= 10 ? (i+1) : ('0'+(i+1))) + '.png'">
	//         </div>
	//
	//         <!--游戏规则按钮-->
	//         <img class="rule-btn" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/rule-btn.png'" @click="showPopRule(true)">
	//
	//         <!--音乐开关-->
	//         <img class="music-btn-open" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music-btn-open.png'" v-if="musicOpen" @click="closeMusic">
	//         <img class="music-btn-close" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music-btn-close.png'" v-if="!musicOpen" @click="openMusic">
	//         <audio ref="music" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music.mp3'" loop></audio>
	//
	//         <!--游戏规则浮层-->
	//         <div class="pop-rule" :class="{show: isPopRuleShow}" @click="showPopRule(false)">
	//           <div class="rule-pic" @click="$event.stopPropagation()">
	//             <span>
	//               <img :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-rule.png'">
	//               <div class="close-btn" @click="showPopRule(false)"></div>
	//             </span>
	//           </div>
	//         </div>
	//
	//         <!--各种弹窗-->
	//         <com-pic-display-box ref="pop-begin" id="pop-begin" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-begin.png'"></com-pic-display-box>
	//         <com-pic-display-box ref="pop-miss-pass" id="pop-miss-pass" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-miss-pass.png'"></com-pic-display-box>
	//         <com-pic-display-box ref="pop-miss-day" id="pop-miss-day" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-miss-day.png'"></com-pic-display-box>
	//         <com-pic-display-box ref="pop-all-over" id="pop-all-over" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-all-over.png'"></com-pic-display-box>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <!--组件定义-->
	// <script>
	exports.default = {
	  components: {
	    'com-top-title': __webpack_require__(77),
	    'com-pic-display-box': __webpack_require__(787)
	  },
	  props: {},
	  data: function data() {
	    return {
	      response: null,
	      passList: null,
	      isPopRuleShow: false,
	      // 音乐开关
	      musicOpen: false,
	      // 当前关卡序号,0表示已结束
	      currentPassNo: 0,
	      // 当前活动第几天序号,0表示已结束
	      currentDayNo: 0,
	      // 用户头像是否睁眼
	      isOpenEye: true,
	      isShowTitleBar: false
	    };
	  },
	  computed: {},
	  created: function created() {
	    this.getData();
	  },
	  mounted: function mounted() {
	    var ts = this;

	    // 3小时刷新一次
	    setInterval(function () {
	      location.reload();
	    }, 3 * 3600 * 1000);

	    // 页面标题
	    document.title = '绘本知识大比拼';

	    // 设置app头部标题栏
	    _native2.default.custom.initHead({
	      shareOnHead: 1
	    });

	    // 设置分享信息
	    _share2.default.setShareInfo({
	      title: '2017绘本节-绘本知识大比拼火热进行中！', // 分享标题
	      desc: '大V店|快来看看你的绘本知识脑容量有多大！和千万妈妈一起比一比，还能赢购物红包哦！', // 分享描述
	      link: location.origin + '/huibenjie_pass.html', // 分享链接
	      imgUrl: 'http://pic.davdian.com/free/huibenjie/huibenjie_pass/share-pic.jpeg' // 分享图标
	    });

	    // 计算当前关卡序号
	    for (var i = 0; i < ts.passList.length; i++) {
	      // 优先设置status == '2'的为当前关卡
	      if (ts.passList[i].status == '2') {
	        ts.currentPassNo = i + 1;
	        break;
	      }
	      // 其次设置第一个status === '4'之前的为当前关卡
	      if (ts.passList[i].status === '4') {
	        break;
	      }
	      ts.currentPassNo = i + 1;
	    }

	    // 计算当前活动第几天序号
	    if (ts.currentPassNo !== 0) {
	      ts.currentDayNo = parseInt(ts.currentPassNo / 3) + 1;
	    }

	    // 人头显示位置
	    (0, _$2.default)('.pass' + (ts.currentPassNo > 0 ? ts.currentPassNo : 1)).addClass('current');

	    // 开启音乐
	    if (!_ua2.default.isIos()) {
	      ts.openMusic();
	    }

	    // 眨眼
	    setInterval(function () {
	      ts.isOpenEye = !ts.isOpenEye;
	    }, 500);

	    // 页面状态切换时，控制音乐播放暂停
	    var musicOpenRecord = void 0;
	    var props = ts.getWindowActiveProperties();
	    document.addEventListener(props.eventName, function () {
	      // 离开页面
	      if (document[props.hiddenPropName] === true && document[props.visibilityStatePropName] == 'hidden') {
	        musicOpenRecord = ts.musicOpen;
	        ts.closeMusic();
	        // 进入页面
	      } else if (document[props.hiddenPropName] === false && document[props.visibilityStatePropName] == 'visible') {
	        if (musicOpenRecord) {
	          ts.openMusic();
	        }
	      }
	    }, false);

	    // 绘本节答题活动已结束
	    if (ts.response.code === 700008) {
	      ts.$refs['pop-all-over'].show();
	    }
	  },
	  methods: {
	    /**
	     * wiki
	     * http://wiki.bravetime.net/pages/viewpage.action?pageId=17039412
	     */
	    getData: function getData() {
	      var ts = this;
	      _$2.default.ajax({
	        cache: false,
	        async: false,
	        url: '/sale/api/picturebooksholiday/getLevelStatus?_=' + Date.now(),
	        type: 'post',
	        dataType: 'json',
	        data: _layout2.default.strSign('feed', {}),
	        success: function success(response) {
	          ts.response = response;
	          //            console.log('闯关列表接口 返回数据:');
	          //            console.log(ts.response);
	          ts.passList = ts.response.data.dataList;
	          //            console.log('闯关列表 数据:');
	          //            console.log(ts.passList);

	          //            for(let i in ts.passList){
	          //              ts.passList[i].status = 1;
	          //            }

	          // 假数据
	          /*ts.response = require('../json/list.json');
	          console.log('闯关列表接口 返回数据:');
	          console.log(ts.response);
	          ts.passList = ts.response.data.dataList;
	          console.log('闯关列表 数据:');
	          console.log(ts.passList);*/
	        },
	        error: function error() {}
	      });
	    },
	    showPopRule: function showPopRule(isShow) {
	      this.isPopRuleShow = isShow;
	    },
	    openMusic: function openMusic() {
	      this.musicOpen = true;
	      this.$refs.music.play();
	    },
	    closeMusic: function closeMusic() {
	      this.musicOpen = false;
	      this.$refs.music.pause();
	    },

	    // 关卡点击
	    passClick: function passClick(passNo, passStatus) {
	      // 绘本节答题活动已结束,弹窗提示
	      if (this.response.code === 700008) {
	        this.$refs['pop-all-over'].show();
	        return;
	      }

	      var pageUrl = './huibenjie_answer.html?';
	      // 已过关
	      if (passStatus == '1') {
	        var status = passNo % 3 === 0 ? 3 : 4;
	        var url = pageUrl + 'passNo=' + passNo + '&status=' + status;
	        // 是否连续通过
	        if (passNo === 16 || passNo === 17 || passNo === 18) {
	          var passAllBefore = this.passList.every(function (item, i) {
	            return i < 15 ? item.status === '1' : true;
	          });
	          if (passAllBefore) {
	            url += '&passAllBefore=1';
	          }
	        }
	        location.href = url;
	        // 未过关
	      } else if (passStatus == '5') {
	        var _url = pageUrl + 'passNo=' + passNo + '&status=5';
	        if (passNo === 18) {
	          _url += '&passAllBefore=0';
	        }
	        location.href = _url;
	        // 错过
	      } else if (passStatus == '3') {
	        this.$refs['pop-miss-pass'].show();
	        // 当前进度
	      } else if (passStatus == '2') {
	        var _url2 = pageUrl + 'passNo=' + passNo + '&status=0';
	        // 是否连续通过
	        if (passNo === 16 || passNo === 17 || passNo === 18) {
	          var _passAllBefore = this.passList.every(function (item, i) {
	            return i < 15 ? item.status === '1' : true;
	          });
	          if (_passAllBefore) {
	            _url2 += '&passAllBefore=1';
	          }
	        }
	        location.href = _url2;
	      }
	    },

	    /* 获取窗口激活相关属性 */
	    getWindowActiveProperties: function getWindowActiveProperties() {
	      var hidden = void 0,
	          visibilityState = void 0,
	          eventName = void 0;
	      if (typeof document.hidden !== "undefined") {
	        hidden = "hidden";
	        eventName = "visibilitychange";
	        visibilityState = "visibilityState";
	      } else if (typeof document.mozHidden !== "undefined") {
	        hidden = "mozHidden";
	        eventName = "mozvisibilitychange";
	        visibilityState = "mozVisibilityState";
	      } else if (typeof document.msHidden !== "undefined") {
	        hidden = "msHidden";
	        eventName = "msvisibilitychange";
	        visibilityState = "msVisibilityState";
	      } else if (typeof document.webkitHidden !== "undefined") {
	        hidden = "webkitHidden";
	        eventName = 'webkitvisibilitychange';
	        visibilityState = "webkitVisibilityState";
	      }
	      return {
	        hiddenPropName: hidden,
	        visibilityStatePropName: visibilityState,
	        eventName: eventName
	      };
	    },

	    // 背景图片加载结束
	    bgPicOnLoad: function bgPicOnLoad() {
	      var ts = this;

	      // 进入页面先看到底部
	      ts.isShowTitleBar = false;
	      var toBottomTimes = 20;
	      var toBottomInterval = setInterval(function () {
	        document.body.scrollTop = document.body.clientHeight;
	        toBottomTimes--;
	        if (toBottomTimes < 0) {
	          clearInterval(toBottomInterval);
	          ts.isShowTitleBar = true;
	        }
	      }, 40);

	      // 第一关提示
	      if (ts.currentPassNo === 1) {
	        ts.$refs['pop-begin'].show();
	        setTimeout(function () {
	          ts.$refs['pop-begin'].close();
	        }, 2000);
	      } else if (ts.currentPassNo > 1) {
	        setTimeout(function () {
	          // 滚动时在每关停留时间
	          var everyPassDurationTime = 200;

	          // 云彩散开
	          for (var i in ts.passList) {
	            var pass = ts.passList[i];
	            if (pass.status != '4') {
	              var $cloud = (0, _$2.default)('.cloud' + (i * 1 + 1));
	              $cloud.addClass('animation');
	              $cloud.css('animation-delay', (i - 1 - 1) * everyPassDurationTime / 1000 + 's');
	            }
	          }

	          // 滚动到当前关卡
	          var scrollTop = _util2.default.getOffsetTop((0, _$2.default)('.pass' + ts.currentPassNo)[0]) - document.documentElement.clientHeight / 2;
	          var scrollDurationTime = everyPassDurationTime * ts.currentPassNo;
	          ts.isShowTitleBar = false;
	          (0, _$2.default)('body').animate({ scrollTop: scrollTop }, scrollDurationTime, 'linear', function () {
	            // 滚动结束后,前一天未闯关提示
	            if (ts.currentDayNo > 1) {
	              var beforeDayNoAnswer = true;
	              var start = (ts.currentDayNo - 1) * 3 - 3;
	              start = start >= 0 ? start : 0;
	              var end = (ts.currentDayNo - 1) * 3 - 1;
	              for (var _i = start; _i < end; _i++) {
	                if (ts.passList[_i].status == '1') {
	                  beforeDayNoAnswer = false;
	                }
	              }

	              // 提示(当天只提醒一次)
	              if (beforeDayNoAnswer && !localStorage.getItem('pop-miss-day-' + ts.currentDayNo)) {
	                setTimeout(function () {
	                  ts.$refs['pop-miss-day'].show();
	                  localStorage.setItem('pop-miss-day-' + ts.currentDayNo, '1');
	                }, scrollDurationTime);
	              }
	            }
	            ts.isShowTitleBar = true;
	          });
	        }, 1000);
	      }
	    }
	  }
	  // </script>
	  //
	  // <!--样式-->
	  // <style lang="sass" lang="scss" rel="stylesheet/scss">
	  //   @import "../../../common/css/util/all";
	  //   @import "../css/huibenjie_pass";
	  // </style>

	};

/***/ },

/***/ 820:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"app\">\n  <!--头部标题-->\n  <com-top-title title=\"绘本知识大比拼\" home v-show=\"isShowTitleBar\"></com-top-title>\n\n  <!--容器-->\n  <div class=\"page\">\n    <!--背景-->\n    <div class=\"bg\">\n      <img :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/bg.jpg'\" @load=\"bgPicOnLoad\">\n    </div>\n\n    <!--内容-->\n    <div class=\"content\">\n      <!--关卡-->\n      <div class=\"pass\" v-for=\"(pass, i) in passList\"\n           :class=\"['pass' + (i + 1), (pass.status == '1' || pass.status == '3' || pass.status == '5' ? 'over' : '')]\"\n           @click=\"passClick(i + 1, pass.status)\">\n        <div class=\"circle\">\n          <div class=\"point\"></div>\n        </div>\n        <img v-show=\"!isOpenEye\" class=\"head\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/head.png'\">\n        <img v-show=\"isOpenEye\" class=\"head\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/head-1.png'\">\n        <!--<div class=\"title\">好饿的毛毛虫</div>-->\n      </div>\n\n      <!--云彩-->\n      <div ref=\"clouds\">\n        <img class=\"cloud\" v-for=\"(pass, i) in passList\" v-if=\"i !== 0\"\n             :class=\"['cloud'+(i+1)]\"\n             :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/cloud-' + ((i+1) >= 10 ? (i+1) : ('0'+(i+1))) + '.png'\">\n      </div>\n\n      <!--游戏规则按钮-->\n      <img class=\"rule-btn\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/rule-btn.png'\" @click=\"showPopRule(true)\">\n\n      <!--音乐开关-->\n      <img class=\"music-btn-open\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music-btn-open.png'\" v-if=\"musicOpen\" @click=\"closeMusic\">\n      <img class=\"music-btn-close\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music-btn-close.png'\" v-if=\"!musicOpen\" @click=\"openMusic\">\n      <audio ref=\"music\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music.mp3'\" loop></audio>\n\n      <!--游戏规则浮层-->\n      <div class=\"pop-rule\" :class=\"{show: isPopRuleShow}\" @click=\"showPopRule(false)\">\n        <div class=\"rule-pic\" @click=\"$event.stopPropagation()\">\n          <span>\n            <img :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-rule.png'\">\n            <div class=\"close-btn\" @click=\"showPopRule(false)\"></div>\n          </span>\n        </div>\n      </div>\n\n      <!--各种弹窗-->\n      <com-pic-display-box ref=\"pop-begin\" id=\"pop-begin\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-begin.png'\"></com-pic-display-box>\n      <com-pic-display-box ref=\"pop-miss-pass\" id=\"pop-miss-pass\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-miss-pass.png'\"></com-pic-display-box>\n      <com-pic-display-box ref=\"pop-miss-day\" id=\"pop-miss-day\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-miss-day.png'\"></com-pic-display-box>\n      <com-pic-display-box ref=\"pop-all-over\" id=\"pop-all-over\" :src=\"'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-all-over.png'\"></com-pic-display-box>\n    </div>\n  </div>\n</div>\n";

/***/ }

/******/ });