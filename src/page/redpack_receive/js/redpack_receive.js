import {Vue} from '../../../common/js/common.js';
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

