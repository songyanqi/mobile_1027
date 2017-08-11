// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';

// 业务模块
import autoRootSize from '../../../common/js/module/autoRootSize';

autoRootSize(750);

new Vue({
  components: {
    app: require('../vue/app.vue')
  },
  template: '<app />',
  el: ".app",
});
