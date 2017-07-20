import ua from './module/ua.js';
import login from './module/login.js';
import Cookies from 'js-cookie';
import util from './module/util.js';

/**
 * 功能：检测是否需要去微信授权
 */
(function autoWeixinAuthorize() {

  // Cookies.remove('is_auto_login', {
  //   domain: util.getBaseDomain()
  // });
  // alert(Cookies.get('is_auto_login'));

  // Cookies.remove('weixinAuthTryTimes', {
  //   domain: util.getBaseDomain()
  // });
  // alert(Cookies.get('weixinAuthTryTimes'));
  // return;

  // 微信授权短时间内尝试次数
  let weixinAuthTryTimes = Cookies.get('weixinAuthTryTimes');

  // 完成微信授权之后会在cookie设置is_auto_login=1,有这个标识了不需要再走授权逻辑
  if (Cookies.get('is_auto_login') === undefined
    && (weixinAuthTryTimes === undefined || weixinAuthTryTimes < 1)
    && ua.isWeiXin()
    && login.isLogined()) {

    // 微信授权后回调页面url
    // var redirect_uri = `${location.protocol}//open.davdian.com/view_[[env_stage]]_[[env_num]]/weixin_auth_redirect.html?env_num=[[env_num]]&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;
    // var redirect_uri = `${location.protocol}//open.davdian.com/view_gray_9/weixin_auth_redirect.html?env_num=[[env_num]]&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;
    var redirect_uri = `${location.protocol}//open.davdian.com/view/weixin_auth_redirect.html?env_num=[[env_num]]&referrer_protocal=${encodeURIComponent(location.protocol)}&referrer_host=${encodeURIComponent(location.host)}&referrer_path=${encodeURIComponent(location.href.split(location.host)[1])}`;

    // 微信授权页面url，davdian.com的appid=wx5f9796f55f5366b6，vyohui.cn的aooud=wx588f41c3ea092fe0
    var url = `//open.weixin.qq.com/connect/oauth2/authorize?appid=wx5f9796f55f5366b6&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_base&state=${Date.now()}`;

    // 设置尝试授权次数，失败1次1天以后重新尝试
    Cookies.set('weixinAuthTryTimes', weixinAuthTryTimes ? parseInt(weixinAuthTryTimes) + 1 : 1, {
      domain: util.getBaseDomain(),
      path: '/',
      expires: 1,
      // expires: 1 / 24 / 60    // 有效时间1分钟
    });

    location.href = url;
    throw new Error(`即将跳转微信授权页(${location.href})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
  }
})();

/**
 * 功能：前后端(html)分离后，原有php的controller层自动跳转逻辑挪到前端来处理
 */
export default {
  /**
   * 功能：检测是否需要domain跳转
   * @param response 页面初始化接口返回的对象
   */
  checkRedirect(response) {
    let domain = response.forceDomain;
    // 当前域名与强制域名和小写强制域名都不符时，跳转到强制域名
    if (domain && domain !== location.host && ''.toLowerCase && new String(domain).toLowerCase() !== location.host) {
      location.href = location.href.replace(location.host, domain);
      throw new Error(`即将跳转强制域名(${location.href})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
    }
  },
  /**
   * 功能：需要登录的页面调用此方法，如未登录则跳转到登录页
   */
  needLogin(){
    if (!login.isLogined()) {
      location.href = '/login.html?referer=' + encodeURIComponent(location.href);
      throw new Error(`即将跳转登录页(${location.href})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
    }
  }
}
