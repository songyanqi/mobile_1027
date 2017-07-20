import Vue from 'Vue';

// 全局开关
if(window.isShowLottery === '1' || window.isShowLottery === '2'){
  require('../../../common/js/module/autoRootSize.js');
  new Vue({
    components: {
      app: require('../vue/app.vue')
    },
    template: '<app />',
    el: ".activity_container",
  });
}
