import {Vue} from '../../../common/js/common.js';

new Vue({
  components: {
    app: require('../vue/app.vue')
  },
  template: '<app />',
  el: ".app",
});
