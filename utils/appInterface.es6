import utilsClass from "./utils.es6";
import wxShare from './WXShare.es6';
import dialog from './dialog.es6';

let utils = utilsClass.utils;
let iosInterface = window.iosInterface = {};

iosInterface.getHeadAndFootData = () => {
    let defaultData = {
        showHead: 1,     // 是否展示头部
        showFoot: 0,     // 是否展示底部
        backOnHead: 1,   // 头部返回按钮
        homeOnHead: 0,   // 头部首页按钮
        shareOnHead: 0,  // 头部分享按钮
        btnOnHead: 0,    // 头部文字按钮
        btnText: "",     // 头部文字按钮文字
        btnLink: ""      // 头部文字按钮链接
    };
    let formatData = {
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
        return JSON.stringify(Object.assign(formatData, window.appData));
    } else {
        return JSON.stringify(defaultData);
    }
};

iosInterface.getShareInfo = function () {
    let shareInfo = wxShare.getShareInfo();
    return JSON.stringify(Object.assign(shareInfo, window.moreShareInfo));
};
iosInterface.refreshPreviousPageData = function () {
    backNewData.$children[0].appUpData()
};
/**
 * 初始化头部
 */
let initHead = (callback) => {
    callApp('Browser', 'initHead', {content: JSON.parse(iosInterface.getHeadAndFootData())}, callback, '3.4.0', nullFunction);
};

/**
 * 空函数
 */
let nullFunction = () => {
};

/**
 * 调用2.4.0以前
 * @param callback
 * @param error
 * @param className
 * @param method
 * @param argumentsList
 */
let callAppOld = (callback, error, className, method, argumentsList) => {
    let t = Date.now();
    window["callback_" + t] = callback;
    window["error_" + t] = error;
    let str = "neng:\/\/call.app.com?v=" +
        [
            encodeURIComponent("callback_" + t),
            encodeURIComponent("error_" + t),
            className,
            method,
            JSON.stringify(argumentsList)
        ].join("|||").replace(/"/g, "'");
    utils.goTo(str);
};

/**
 * app外调用app
 * @param host
 * @param action
 * @param para
 */
let callAppNative = (host, action, para) => {
    let baseHref = getBaseHost(), url;
    window.d_callback = nullFunction;
    if (utils.isIOS()) {
        url = "https://invoke." + baseHref + "?cmd=" + encodeURIComponent('davdian://call.' + host +
                '.com?action=' + action + '&params=' + encodeURIComponent(JSON.stringify(para)) +
                '&callback=d_callback&minv=2.5.0');
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
let callAppEnteroom = (courseId) => {
    callAppNative("VoiceLive", "enterRoom", {courseId});
};

/**
 * 打开app并进入直播
 * @param liveId
 */
let callAppLive = (liveId) => {
    let para = {
        "liveId": liveId || window["liveId"],
        "isPlaying": "1",// 1表示直播中，2是回放，3是整理中
        "fromPush": "0" // 0表示不来自于推送，1表示来自推送
    };
    callAppNative('LiveVideo', 'enterRoom', para);
};

/**
 * 得到基础host
 * @returns {null}
 */
let getBaseHost = () => {
    let result = location.href.match("davdian.com|bravetime.net|vyohui.cn");
    if (result && result.length) {
        return result[0];
    } else {
        return null;
    }
};

/**
 * 调用app2.4.0以后
 */
let callApp = (host, action, params, callback = nullFunction, minv, minCallback) => {

    if (utils.getAppVersion() >= minv.split(".").reduce(function (a, b) {
            return +a * 10 + +b
        })) {
        let t = Date.now() + "_" + Math.round(Math.random() * 10000);
        window["callback_" + t] = callback;
        let url = "davdian:\/\/call." + host + ".com?" +
            "action=" + encodeURIComponent(action) + "&" +
            "params=" + encodeURIComponent(JSON.stringify(params)) + "&" +
            "callback=" + encodeURIComponent("callback_" + t) + "&" +
            "minv=" + encodeURIComponent(minv);
        utils.goTo(url);
    } else {
        if (minCallback) {
            minCallback();
        } else {
            alert("请升级您的APP")
        }
    }
};

/**
 * 设置app头部
 * @param opt
 * @param callback
 */
let setHead = function (opt, callback) {
    setTimeout(function () {
        callApp("Browser", "setHead", opt, callback, '2.6.0');
    }, 100);
};

/**
 * 选取身份证
 * @param callback
 * @param minCallback
 */
let selectIdentity = function (callback, minCallback) {
    let cardName = {
        "cardName": sessionStorage.getItem("Addressee")
    };
    callApp("Browser", "selectIdentity", cardName, callback, '3.7.0', minCallback);
};

/**
 * 调用app进入语音课程
 * @param courseId
 */
let enterVoiceRoom = function (courseId) {
    if (!window.enterVoiceRoomFlag) {
        window.enterVoiceRoomFlag = true;
        callApp("VoiceLive", "enterRoom", {courseId}, function () {
            location.reload();
        }, "3.4.0");
    }

};

/**
 * 调用app登录
 * @param callback
 * @param minCallback
 */
let nativeLogin = function (callback, minCallback) {
    callApp("Account", "login", {}, callback, '2.4.0', minCallback);
};

/**
 * app支付
 */
let nativePay = function (url, callback) {
    let option = {};
    option.url = encodeURIComponent(url);
    if (url.split("app_pay/").length > 1) {
        let list = url.split("app_pay/")[1].split("&");
        for (let i = 0; i < list.length; i++) {
            let key = list[i].split("=")[0];
            option[key] = list[i].split("=")[1];
        }
    }

    let callFunction = function (result) {
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
let goAppHome = function () {
    callAppOld(nullFunction, function () {
        alert("系统异常，请退出app重试")
    }, "base", "home", []);
};

/**
 * 在新标签打开页面
 * @param opt
 * @param callback
 */
let openNewPage = function (opt, callback) {
    callApp('Browser', 'open', opt, callback, '3.1.0', function () {
        utils.goTo(opt.url);
    });
};

/**
 * 旧版分享
 */
let callAppShare = function () {
    callAppOld(function (r) {
        let result = JSON.parse(r);
        let code = +result["code"];
        if (code === 0) {
            // 分享成功
            dialog.info("分享成功");
        } else if (code === 1) {
            dialog.info("分享失败");
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
let callAppShareInfo = function (type, info, callback, errorCallback) {
    let shartInfo = window.iosInterface.netWorkGetShareInfo();
    let option = info || JSON.parse(shartInfo);

    option.shareType = '0';
    if (+type === -1) {
        option.show = '1';
    } else {
        option.show = '0';
        option.sharePlatform = type + "";
    }

    let callFunction = function (code) {
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
let callAppShareImg = function (type, imgUrl, callback, errorCallback) {

    let shartInfo = window.iosInterface.netWorkGetShareInfo();

    let option = JSON.parse(shartInfo);
    option.bigImageUrl = imgUrl;
    option.shareType = "1";

    if (type === -1) {
        option.show = "1";
    } else {
        option.show = "0";
        option.sharePlatform = type + "";
    }


    let callFunction = function (result) {
        let code = +result.code, msg = result.msg;
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
let callAppShareToTimeline = function () {
    callAppOld(function () {
        let result = JSON.parse(r);
        let code = +result["code"];
        if (code === 0) {
            // 分享成功
            dialog.info("分享成功");
        } else if (code === 1) {
            dialog.info("分享失败");
        } else {
            alert("系统异常，请重试");
        }
    }, function () {
        alert("系统异常，请退出app重试")
    }, "base", "share_to_wechat_timeline", []);
};

/**
 * 唤起app分享给好友
 */
let callAppShareToFriend = function () {
    callAppOld(function () {
        let result = JSON.parse(r);
        let code = +result["code"];
        if (code === 0) {
            dialog.info("分享成功");
        } else if (code === 1) {
            dialog.info("分享失败");
        } else {
            alert("系统异常，请重试");
        }
    }, function () {
        alert("系统异常，请退出app重试")
    }, "base", "share_to_wechat_friend", []);
};

/**
 * 唤起原生保存图片
 * @param src
 */
let callNativeHoldPic = function (src) {
    callAppOld(nullFunction, nullFunction, "base", "savePic", [src]);
};

/**
 * app分享卡
 */
let callCardShare = function (courseId) {
    callApp("Share", "cardShare", {courseId}, nullFunction, '3.4.0');
};

/**
 * 告知app页面打开成功
 * @returns {boolean}
 */
let callNativeReady = function () {
    // 如果是订单确认页,而且是等待刷新的,就不发这个了
    if (window["tj_id"] === 21 && $ && $.cookie && $.cookie("no_refresh")) {
        $.removeCookie("no_refresh");
        return false;
    }
    callAppOld(function () {

    }, function () {

    }, "base", "ready", []);
};

/**
 * 调用原生确认框
 * @param msg
 * @param opt
 */
let callNativeConfirm = function (msg, opt) {
    callAppOld(opt.okLink, opt.cancelLink, "base", "confirm", [msg, JSON.stringify(opt)]);
};


/**
 * 初始化
 */
let init = () => {
    initHead();
};


export default {
    init,
    callNativeConfirm,
    callNativeReady,
    callCardShare,
    callNativeHoldPic,
    callAppShareToFriend,
    callAppShareToTimeline,
    callAppShare,
    callAppShareImg,
    callAppEnteroom,
    callAppShareInfo,
    callAppLive,
    setHead,
    selectIdentity,
    enterVoiceRoom,
    nativeLogin,
    nativePay,
    goAppHome,
    openNewPage
}