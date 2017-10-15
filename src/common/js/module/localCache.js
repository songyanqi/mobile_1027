import param from './param.js';

const one = {
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000,
};

export default {
  /**
   * 存缓存数据
   * 调用方法：
   localCache.setItem({
      key: '',            // 缓存key
      data: {},           // 缓存data（可以传json或String）
      expires: {          // 缓存有效时长（从当前时间开始计算过多少毫秒缓存失效）
        d: 0,             // 天
        h: 0,             // 小时
        m: 0,             // 分钟
        s: 0,             // 秒
        ms: 0,            // 毫秒
      }
    });
   */
  setItem(param = {}) {
    // 参数检查-缓存key(不进行缓存的条件：key为空)
    if (!param.key || param.key && !(param.key + '')) {
      console.warn(`缓存失败，key不正确：${param.key}`);
      return;
    }

    // 参数检查-过期时间
    param.expires = param.expires || {};
    let expires = 0;
    expires += param.expires.d ? parseInt(param.expires.d) * one.d : 0;
    expires += param.expires.h ? parseInt(param.expires.h) * one.h : 0;
    expires += param.expires.m ? parseInt(param.expires.m) * one.m : 0;
    expires += param.expires.s ? parseInt(param.expires.s) * one.s : 0;
    expires += param.expires.ms ? parseInt(param.expires.ms) * one.ms : 0;
    param.expires = expires;

    // 参数检查-数据格式(不进行缓存的条件：数据为空或者转换异常)
    if (!param.data || param.data && !(param.data + '')) {
      console.warn(`缓存失败，data不正确：${param.key}`);
      return;
    }
    try {
      JSON.stringify(param.data);
    } catch (err) {
      console.warn(`缓存失败，data参数错误：${param.data}`);
      return;
    }

    // 生成缓存value
    let value = JSON.stringify({
      now: Date.now(),
      expires: param.expires || 0,
      data: param.data,
    });

    // 存入localStorage
    window.localStorage.setItem(param.key, value);

    // 日志
    console.log(`调用localCache模块缓存完成：${param.key}=${value}`);
  },
  /**
   * 取缓存数据
   * 调用方法：
   * localCache.getItem(key)
   */
  getItem(key) {
    if (!key) {
      throw new Error('key不对');
      return;
    }
    let value = window.localStorage.getItem(key);

    // 参数不对
    if (!value) return null;

    // 数据转换异常
    try {
      value = JSON.parse(value);
    } catch (err) {
      return null;
    }

    // 不是本模块存的
    if (!value.expires) return null;

    // 过期
    if (Date.now() > new Date(value.now).valueOf() + value.expires || param.get('noCache') !== undefined) {
      window.localStorage.removeItem(key);
      return null;
    }

    return value.data;
  }
}
