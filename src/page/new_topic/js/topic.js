// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import vueLazyload from '../../../common/js/module/vueLazyload.js';
import native from "../../../../src/common/js/module/native.js"

vueLazyload.init();
// console.log(window.iosInterface);
new Vue({
  components: {
    app: require('../vue/app.vue')
  },
  template: '<app/>',
  el: ".app",
});
// console.log(window.iosInterface);
window.iosInterface.nativeWebviewBack=function () {
  native.custom.initHead({
    shareOnHead: 1,
    homeOnHead: 1,
  });
}
