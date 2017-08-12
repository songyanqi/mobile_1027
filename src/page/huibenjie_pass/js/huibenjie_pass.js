// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import Cookies from 'js-cookie';

// 业务模块
import autoRootSize from '../../../common/js/module/autoRootSize';
import util from '../../../common/js/module/util.js';

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


// 清除cookie
Cookies.remove('force_domain', {
  domain: util.getBaseDomain()
});
