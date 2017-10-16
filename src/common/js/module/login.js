import Cookies from 'js-cookie';
import ua from './ua.js';
import native from './native.js';

/**
 * 模块: 登录相关
 * 说明: 通过Cookie中dvdsid(后端又叫session_key、sess_key)判断登录相关状态
 */
export default {
  /**
   * 功能: 用户是否已登录
   * 说明: 取dvdsid33-39位7个0为未登录
   */
  getDvdsid(){
    let dvdsid = Cookies.get('dvdsid');
    return Object.prototype.toString.call(dvdsid) === '[object String]' ? dvdsid : '';
  },
  /**
   * 功能: 用户是否已登录
   * 说明: dvdsid第33-39位如果是7个0为未登录
   */
  isLogined(){
    let dvdsid = this.getDvdsid();
    return dvdsid && dvdsid.substr(32, 7) !== '0000000';
  },
  /**
   * 功能: 获取session id
   * 说明: 取dvdsid前32位
   */
  getSessionId(){
    return this.getDvdsid().substr(0, 32);
  },
  /**
   * 功能: 获取userId
   * 说明: 取dvdsid第33-39位,并转为10进制
   */
  getUserId(){
    let sessionId = this.getDvdsid().substr(32, 7);
    return sessionId ? parseInt(sessionId, 16) : '';
  },
  /**
   * 功能: 获取用户身份
   * 说明: 取dvdsid第40位
   */
  getUserStatusCode(){
    return this.getDvdsid().substr(39, 1);
  },
  /**
   * 功能: 跳转到登录页，登录后返回
   * 说明: 调用此方法说明当前页面需要登录，如果未登录跳转登录页
   */
  goLoginPage(param){
    if (ua.isDvdApp()) {
      native.Account.login(param);
    } else {
      location.href = '/login.html?referer=' + encodeURIComponent(location.href);
      throw new Error(`即将跳转登录页(${location.href})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
    }
  },
  /**
   * 功能: 自动跳转登录页
   * 说明: 调用此方法说明当前页面需要登录，如果未登录跳转登录页
   */
  needLogin(param){
    if (!this.isLogined()) {
      this.goLoginPage(param);
      return true;
    }
    return false;
  },
  /**
   * 功能: 登录
   * @param url 登录成功后的回跳地址
   */
  login(url){
    alert(1)
    // 如果已登录则不继续执行
    if (this.isLogined()) {
      // 如果有url则跳转url
      if (url) {
        location.href = url;
      }
      return;
    }

    if (ua.isDvdApp()) {
      // 唤起app登录
      native.Account.login({
        success(){
          if (url) {
            if (url.indexOf('/') === 0) {
              // 若果url是/xxx.html格式，则url前面自动补全协议和域名
              url = `${location.protocol}//${location.host}${url}`;
            }
            // 需要app把登录后的强制刷新当前页去掉才能生效
            location.href = url;
            throw new Error(`即将跳转${url}，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
            // native.Browser.open({
            //   url,
            // });
          } else {
            location.reload();
          }
        }
      });
    } else {
      // 登录成功回跳地址
      url = url || location.href;

      // 跳转H5登录页
      location.href = '/login.html?referer=' + encodeURIComponent(url);
      throw new Error(`即将跳转登录页(登录成功后回跳地址为：${url})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
    }
  },
  /**
   * 功能: 是否是已登录的买家
   */
  isBuyer(){
    return this.isLogined() && this.getUserStatusCode() === '1';
  },
  /**
   * 功能: 是否是已登录的卖家
   */
  isSeller(){
    return this.isLogined() && this.getUserStatusCode() === '3';
  },
}
