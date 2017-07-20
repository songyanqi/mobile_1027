import scriptjs from 'scriptjs';
import autoRootSize from './module/autoRootSize.js';
import ua from './module/ua.js';
import login from './module/login.js';
import Cookies from 'js-cookie';
import Vue from 'Vue';
import native from './module/native.js';
import VueLazyload from 'VueLazyload';

// 懒加载全局设置
document.body.style.display = 'none';
Vue.use(VueLazyload, {
  loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
  error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
  try: 2,
  preLoad: 1.5
});
document.body.style.display = null;

// fastclick
// iPhone; CPU iPhone OS 10_3_2 like Mac OS X
// ios10以下才需要加fastclick
// window.addEventListener('load', function () {
//   // 延迟加载,提高页面显示速度
//   setTimeout(function () {
//     scriptjs('//cdn.davdian.com/fastclick/1.0.6/fastclick.min.js', function () {
//       FastClick.attach(document.body);
//     });
//   }, 3000);
// }, false);

// ios wkwebview返回上一页执行回调
native.custom.onWebviewBack();

export {
  Vue,
  autoRootSize,
}
