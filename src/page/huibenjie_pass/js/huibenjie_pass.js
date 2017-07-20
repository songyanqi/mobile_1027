import {Vue, autoRootSize} from '../../../common/js/common.js';

autoRootSize(750);

// 解决safari从答题也返回后不刷新问题
window.addEventListener('pageshow', function(){
  if(window.pageFirstTimeShow){
    location.reload();
  }
}, false);
setTimeout(function(){
  window.pageFirstTimeShow = true;
}, 30 * 1000);

new Vue({
  components: {
    app: require('../vue/app.vue')
  },
  template: '<app />',
  el: ".app",
});
