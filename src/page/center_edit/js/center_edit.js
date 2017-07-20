import {Vue} from '../../../common/js/common.js';
import VueRouter from 'VueRouter';

Vue.use(VueRouter);

new Vue({
  router: new VueRouter({
    routes: [
      {
        path: '/',
        component: require('../vue/center_edit.vue')
      },
      {
        path: '/nickname',
        component: require('../vue/center_edit_input.vue')
      },
      {
        path: '/shop-name',
        component: require('../vue/center_edit_input.vue')
      },
      {
        path: '/shop-desc',
        component: require('../vue/center_edit_input.vue')
      },
      {
        path: '/shop-url',
        component: require('../vue/center_edit_input.vue')
      },
    ]
  }),
  el: "router-view",
});


// new Vue({
//   components: {
//     app: require('../vue/center_edit.vue')
//   },
//   template: '<app />',
//   el: ".app",
// });
