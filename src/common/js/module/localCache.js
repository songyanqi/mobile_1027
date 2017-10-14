import param from './param.js';

export default {
  /**
   * 存缓存数据
   * 调用方法：
   * localCache.setItem({
      Date: Date.now(),   // 当前时间（不传则取设备当前时间，一般不需要这个参数，）
      Expires: 10 * 1000, // 过期时间（从当前时间开始计算过多少毫秒缓存失效）
      key: 'okok',        // 缓存key
      data: {             // 缓存data（可以传json或String）
      },
    });
   */
  setItem(param = {}) {
    // 参数检查
    if (!param.key || param.key && !(param.key + '')) {
      console.log(`缓存失败，key不正确：${param.key}`);
      return;
    }

    // 参数检查
    if (param.Date) {
      try {
        new Date(param.Date);
      } catch (err) {
        throw new Error('Date参数错误')
      }
    }

    if (!param.data || param.data && !(param.data + '')) {
      console.log(`缓存失败，data不正确：${param.key}`);
      return;
    }

    let value = {
      Date: param.Date || Date.now(),
      Expires: param.Expires || 0,
      data: param.data,
    };

    window.localStorage.setItem(param.key, JSON.stringify(value));
  },
  /**
   * 取缓存数据
   * 调用方法：
   * localCache.getItem(key)
   */
  getItem(key) {
    if(!key) {
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
