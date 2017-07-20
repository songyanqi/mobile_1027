import scriptjs from 'scriptjs';
import $ from '$';
import config from '../config.js';
const __debug = location.href.indexOf("localhost")>-1||(location.href.indexOf("//192.168")>-1);

// 项目所需所有微信接口列表
const jsApiList = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone',
];

/**
 * weixin模块
 * 微信相关设置
 */
export default {
  /**
   * 设置微信分享信息
   * 调用方法:
   share.setWeixinShareInfo({
      title: '大V店组团包邮', // 分享标题
      desc: '一件包邮！每天上新！好货低价又包邮，抢到了就赚翻啦', // 分享描述
      link: location.href, // 分享链接
      imgUrl: 'http://pic.davdian.com/free/2016/04/09/320_320_0fc3e0dbbadd249b7f1b93a525f0adf0.jpg', // 分享图标
    });
   */
  setShareInfo(param, appInfo) {
    // param分享参数覆盖默认分享信息
    let shareInfo = $.extend({}, config.defaultShareInfo, {
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {},  // 用户确认分享后执行的回调函数
      cancel: function () {}, // 用户取消分享后执行的回调函数
    }, param);

    // 加载微信jssdk
    scriptjs('//res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {

      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wx.ready(function () {
        console.log('微信验证成功');
        // 为每个分享平台设置相同的分享信息
        for (let api of jsApiList) {
          wx[api](shareInfo);
        }
      });

      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      wx.error(function(res){
        console.error('微信验证失败');
      });

      // 进行微信验证
      let verify = function(appInfo){
        // 通过config接口注入权限验证配置
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appInfo.appId, // 必填，公众号的唯一标识
          timestamp: appInfo.timestamp, // 必填，生成签名的时间戳
          nonceStr: appInfo.nonceStr, // 必填，生成签名的随机串
          signature: appInfo.signature,// 必填，签名，见附录1
          jsApiList: [].concat(jsApiList) // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      };

      // 优先使用通过参数传进来的app验证信息
      if(appInfo){
        verify(appInfo);
      }else{
        if(!__debug){
          // 从PHP获取微信token
          $.ajax({
            cache: false,
            async: true,
            url: '/wechatJsToken',
            type: 'get',
            dataType: 'json',
            data: {
              url: encodeURIComponent(location.href)
            },
            success: function (response) {
              let appInfo = response.data;
              verify(appInfo);
            },
            error: function(){
              console.log('调用/wechatJsToken接口error');
            }
          });
        }
      }
    });
  }
}
