// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
// import $ from '$';
// import Cookies from 'js-cookie';

// 业务模块
// import encrypt from '../../../common/js/module/encrypt.js';
// import util from '../../../common/js/module/util.js';
// import tj from '../../../common/js/module/tj.js';
// import popup from '../../../common/js/module/popup.js';
// import login from '../../../common/js/module/login.js';
import param from '../../../common/js/module/param.js';
import native from '../../../common/js/module/native.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

// 懒加载初始化
vueLazyload.init();

// 设置app头部标题栏
native.custom.initHead({
  showHead: 0,     // 是否展示头部
  showFoot: 1,     // 是否展示底部
  backOnHead: 0,   // 头部返回按钮
  homeOnHead: 0,   // 头部首页按钮
  shareOnHead: 0,  // 头部分享按钮
  btnOnHead: 0,    // 头部文字按钮
  btnText: "",     // 头部文字按钮文字
  btnLink: ""      // 头部文字按钮链接
});

// app回退时首页二极管地址为/channel.html
if (location.pathname == '/channel.html') {
  window.queryPathType = false;
  window.menuId = param.get('menu_id') || '8';
} else {
  window.queryPathType = true;
  window.menuId = '8';
}

new Vue({
  el: "#index_fe_container",
  components: {
    index: require("../../../../module/index/index.vue")
  }
});
