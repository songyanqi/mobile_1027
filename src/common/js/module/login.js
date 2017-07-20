import Cookies from 'js-cookie';

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
  getUserStatus(){
    return this.getDvdsid().substr(39, 1);
  },
}
