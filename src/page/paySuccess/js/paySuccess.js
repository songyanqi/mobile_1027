import Vue from 'Vue';

// 全局开关
require('../../../common/js/module/autoRootSize.js');
new Vue({
components: {
  app: require('../vue/paySuccess.vue')
},
template: '<app />',
el: ".paySuccess",
});
