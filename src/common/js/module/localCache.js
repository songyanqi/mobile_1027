import param from './param.js';

const one = {
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000,
};

const moduleName = `localCache模块`;

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
      console.warn(`${moduleName}-缓存失败，key不正确：${param.key}`);
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
      console.warn(`${moduleName}-缓存失败，data不正确：${param.key}`);
      return;
    }
    try {
      JSON.stringify(param.data);
    } catch (err) {
      console.warn(`${moduleName}-缓存失败，data参数错误：${param.data}`);
      return;
    }

    // 生成缓存value
    let value = {
      now: Date.now(),
      expires: param.expires || 0,
      data: param.data,
    };

    // 存入localStorage
    window.localStorage.setItem(param.key, JSON.stringify(value));

    // 设置缓存成功日志
    console.log(`%c${moduleName}-设置缓存：${param.key}`, `color: green;`);
    // console.log(value);
  },

  /**
   * 取缓存数据
   * 调用方法：
     localCache.getItem(key)
   */
  getItem(key) {
    // 取缓存
    let value = window.localStorage.getItem(key);

    // 参数不对
    if (!value) {
      console.warn(`${moduleName}-找不到key：${key}`);
      return null;
    }

    // 数据转换异常
    try {
      value = JSON.parse(value);
    } catch (err) {
      console.warn(`${moduleName}-缓存字符串转json异常：${key}`);
      return null;
    }

    // 不是本模块存的
    if (!value.expires) {
      console.warn(`${moduleName}-这条缓存不是本模块存储的：${key}`);
      return null;
    }

    // 缓存已过期
    if (Date.now() > new Date(value.now).valueOf() + value.expires || param.get('noCache') !== undefined) {
      console.warn(`${moduleName}-缓存已过期：${key}`);
      window.localStorage.removeItem(key);
      return null;
    }

    // 取缓存成功日志
    console.log(`%c${moduleName}-取缓存：${key}`, `color: green;`);
    // console.log(value.data);

    // 返回数据
    return value.data;
  }
}
