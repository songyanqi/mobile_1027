let axios = require("axios");
require('es6-promise').polyfill();
let WebStorageCache = require("web-storage-cache");
let WXShareCache = new WebStorageCache({storage: 'sessionStorage'});
let _initShareInfo;

/**
 * 获取token
 * @param {boolean} forcedNetwork
 */
let getToken = (forcedNetwork) => {
    let tokenInfo = getTokenFromSession();
    if (!tokenInfo || forcedNetwork) {
        getTokenFromNetwork()
            .then(function (data) {
                tokenInfo = data.data;
                if (!tokenInfo.error) {
                    initWXShare(tokenInfo);
                    setTokenToSession(tokenInfo);
                } else {
                    console.log("get token error");
                }
            })
            .catch(function () {
                retry();
            })
    } else {
        initWXShare(tokenInfo);
    }
};

let retry = () => {
    let timesKey = "init_wx_share_error_times";
    let times = +WXShareCache.get(timesKey) || 0;
    // 签名失败更新签名 5秒内不超过5次
    if (times < 5) {
        WXShareCache.set(timesKey, times + 1, {exp: 5});
        getToken(true);
    }
};

let wxError = (res) => {
    if (res.errMsg == "config:invalid signature") {
        retry();
    }else {
        console.log("wx error: "+res.errMsg);
    }
};

let wxReady = () => {
    let shareInfo = getShareInfo();
    timelineShare(shareInfo);
    appMessageShare(shareInfo);
    qqMessageShare(shareInfo);
    onMenuShareQZone(shareInfo);
    weiboMessageShare(shareInfo);
};

/**
 * 分享到朋友圈
 */
let timelineShare = (shareInfo) => {
    wx.onMenuShareTimeline({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl, // 分享图标
        desc:shareInfo.desc,
        success: function () {
            // 用户确认分享后执行的回调函数
            if (shareInfo.successTimelineShare && typeof shareInfo.successTimelineShare == "function"){
                shareInfo.successTimelineShare()
            }
            if (shareInfo.alwaysTimelineShare && typeof shareInfo.alwaysTimelineShare == "function"){
                shareInfo.alwaysTimelineShare()
            }
          if(window.tlShareCallback){
            window.tlShareCallback();
          }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (shareInfo.cancelTimelineShare && typeof shareInfo.cancelTimelineShare == "function"){
                shareInfo.cancelTimelineShare()
            }
            if (shareInfo.alwaysTimelineShare && typeof shareInfo.alwaysTimelineShare == "function"){
                shareInfo.alwaysTimelineShare()
            }
        }
    });
};
let getNewLineLink = (href) => {
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
let appMessageShare = (shareInfo) => {
    wx.onMenuShareAppMessage({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl, // 分享图标
        desc:shareInfo.desc,
        success: function () {
            // 用户确认分享后执行的回调函数
            if (shareInfo.successAppMessageShare && typeof shareInfo.successAppMessageShare == "function"){
                shareInfo.successAppMessageShare()
            }
            if (shareInfo.alwaysAppMessageShare && typeof shareInfo.alwaysAppMessageShare == "function"){
                shareInfo.alwaysAppMessageShare()
            }
            if(window.sendShareCallback){
              window.sendShareCallback();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (shareInfo.cancelAppMessageShare && typeof shareInfo.cancelAppMessageShare == "function"){
                shareInfo.cancelAppMessageShare()
            }
            if (shareInfo.alwaysAppMessageShare && typeof shareInfo.alwaysAppMessageShare == "function"){
                shareInfo.alwaysAppMessageShare()
            }
        }
    });
};

let qqMessageShare = (shareInfo) => {
    wx.onMenuShareQQ({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl, // 分享图标
        desc:shareInfo.desc,
        success: function () {
            // 用户确认分享后执行的回调函数
            if (shareInfo.successQqMessageShare && typeof shareInfo.successQqMessageShare == "function"){
                shareInfo.successQqMessageShare()
            }
            if (shareInfo.alwaysQqMessageShare && typeof shareInfo.alwaysQqMessageShare == "function"){
                shareInfo.alwaysQqMessageShare()
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (shareInfo.cancelQqMessageShare && typeof shareInfo.cancelQqMessageShare == "function"){
                shareInfo.cancelQqMessageShare()
            }
            if (shareInfo.alwaysQqMessageShare && typeof shareInfo.alwaysQqMessageShare == "function"){
                shareInfo.alwaysQqMessageShare()
            }
        }
    });
}

let onMenuShareQZone = (shareInfo) => {
    wx.onMenuShareQZone({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl, // 分享图标
        desc:shareInfo.desc,
        success: function () { 
            if (shareInfo.successOnMenuShareQZone && typeof shareInfo.successOnMenuShareQZone == "function"){
                shareInfo.successOnMenuShareQZone()
            }
            if (shareInfo.successOnMenuShareQZone && typeof shareInfo.successOnMenuShareQZone == "function"){
                shareInfo.successOnMenuShareQZone()
            }
            if( window.QQShareCallback){
              window.QQShareCallback();
            }
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            if (shareInfo.cancelOnMenuShareQZone && typeof shareInfo.cancelOnMenuShareQZone == "function"){
                shareInfo.cancelOnMenuShareQZone()
            }
            if (shareInfo.cancelOnMenuShareQZone && typeof shareInfo.cancelOnMenuShareQZone == "function"){
                shareInfo.cancelOnMenuShareQZone()
            }
        }
    });
}

let weiboMessageShare = (shareInfo) => {
    wx.onMenuShareWeibo({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl, // 分享图标
        desc:shareInfo.desc,
        success: function () {
            // 用户确认分享后执行的回调函数
            if (shareInfo.successWeiboMessageShare && typeof shareInfo.successWeiboMessageShare == "function"){
                shareInfo.successWeiboMessageShare()
            }
            if (shareInfo.alwaysWeiboMessageShare && typeof shareInfo.alwaysWeiboMessageShare == "function"){
                shareInfo.alwaysWeiboMessageShare()
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (shareInfo.cancelWeiboMessageShare && typeof shareInfo.cancelWeiboMessageShare == "function"){
                shareInfo.cancelWeiboMessageShare()
            }
            if (shareInfo.alwaysWeiboMessageShare && typeof shareInfo.alwaysWeiboMessageShare == "function"){
                shareInfo.alwaysWeiboMessageShare()
            }
        }
    });
}

let initWXShare = (result) => {
    if (window.wx) {
        let wx = window.wx;
        wx.error(wxError);
        wx.ready(wxReady);
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: result["data"]["appId"], // 必填，公众号的唯一标识
            timestamp: result["data"]["timestamp"], // 必填，生成签名的时间戳
            nonceStr: result["data"]["nonceStr"], // 必填，生成签名的随机串
            signature: result["data"]["signature"],// 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
};

/**
 * 从缓存中获取token
 */
let getTokenFromSession = () => WXShareCache.get("dvd_wx_token");

/**
 * 向缓存中设置token
 * @param {object} info
 */
let setTokenToSession = (info) => WXShareCache.set("dvd_wx_token", info);

/**
 * 从网络上获取token
 */
let getTokenFromNetwork = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/wechatJsToken',{params:{url: encodeURIComponent(location.href)}})
            .then(function (respone) {
                resolve(respone)
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

let init = (shareInfo) => {
    _initShareInfo = shareInfo||{};
    getToken(false);
};

let getShareInfo = () =>{
    // 设置默认值，部分从window中取到
    let newShareInfo = {
        title:window.shareTitle||window.title||"大V店",
        link: getNewLineLink(window.lineLink||window.link||location.href),
        imgUrl:window.imgUrl||"http://pic.davdian.com/free/index0925_icon1.png?x-oss-process=image/resize,m_fill,w_80",
        desc:window.descContent||window.desc||"大V店"
    };
    Object.assign(newShareInfo,_initShareInfo);
    return newShareInfo;
};

export default {
    init,
    getShareInfo
}
