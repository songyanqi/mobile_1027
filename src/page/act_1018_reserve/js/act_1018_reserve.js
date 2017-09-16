// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

new Vue({
	el: ".app",
	components: {
		'com-top-title': require('../../../component/com-top-title.vue'),
    'com-act-reserve': require('../vue/com-act-reserve.vue')
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