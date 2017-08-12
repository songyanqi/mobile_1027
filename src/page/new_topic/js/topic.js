// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

vueLazyload.init();

new Vue({
  components: {
    app: require('../vue/app.vue')
  },
  template: '<app/>',
  el: ".app",
});
