import {Vue, autoRootSize} from '../../../common/js/common.js';

autoRootSize(750);

new Vue({
  components: {
    app: require('../vue/app.vue')
  },
  template: '<app />',
  el: ".app",
});
