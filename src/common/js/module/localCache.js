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
   * localCache.setItem({
      Date: Date.now(),   // 当前时间（不传则取设备当前时间，一般不需要这个参数，）
      Expires: {          // 缓存有效时长（从当前时间开始计算过多少毫秒缓存失效）
        d: 0,             // 天
        h: 0,             // 小时
        m: 0,             // 分钟
        s: 0,             // 秒
        ms: 0,            // 毫秒
      },
      key: '',        // 缓存key
      data: {             // 缓存data（可以传json或String）
      },
    });
   */
  setItem(param = {}) {
    // 参数检查-缓存key(不进行缓存的条件：key为空)
    if (!param.key || param.key && !(param.key + '')) {
      console.warn(`缓存失败，key不正确：${param.key}`);
      return;
    }

    // 参数检查-当前日期格式(不进行缓存的条件：传入该参数并且用该参数实例化Date对象异常)
    param.Date = param.Date || Date.now();
    if (param.Date) {
      try {
        new Date(param.Date);
      } catch (err) {
        console.warn(`缓存失败，Date参数错误：${param.Date}`);
        return;
      }
    }

    // 参数检查-过期时间
    param.Expires = param.Expires || {};
    let Expires = 0;
    Expires += param.Expires.d ? parseInt(param.Expires.d) * one.d : 0;
    Expires += param.Expires.h ? parseInt(param.Expires.h) * one.h : 0;
    Expires += param.Expires.m ? parseInt(param.Expires.m) * one.m : 0;
    Expires += param.Expires.s ? parseInt(param.Expires.s) * one.s : 0;
    Expires += param.Expires.ms ? parseInt(param.Expires.ms) * one.ms : 0;
    param.Expires = Expires;

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

    window.localStorage.setItem(param.key, JSON.stringify({
      Date: param.Date,
      Expires: param.Expires || 0,
      data: param.data,
    }));
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
    if (!value.Date || !value.Expires) return null;

    // 过期
    if (Date.now() > new Date(value.Date).valueOf() + value.Expires || param.get('noCache') !== undefined) {
      window.localStorage.removeItem(key);
      return null;
    }

    return value.data;
  }
}
