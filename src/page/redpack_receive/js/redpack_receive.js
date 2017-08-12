// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import VueRouter from 'VueRouter';

Vue.use(VueRouter);

new Vue({
  router: new VueRouter({
    routes: [
      {
        path: '/',
        component: require('../vue/redpack_receive.vue')
      }
    ]
  }),
  el: "router-view",
});
