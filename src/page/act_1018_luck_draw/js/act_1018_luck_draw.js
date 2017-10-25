// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import vueLazyload from '../../../common/js/module/vueLazyload.js';
// 懒加载初始化
vueLazyload.init();

new Vue({
	el: ".app",
	components: {
		'com-top-title': require('../../../component/com-top-title.vue'),
    'com-act-luck-draw': require('../vue/com-act-luck-draw.vue')
	},
	data() {
		return {
      response: null,
    }
	},
	computed: {

  },
  watch: {

  }
})
