// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
// 业务模块
import native from '../../../common/js/module/native.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

// 懒加载初始化
vueLazyload.init();

import layout from "../../../../module/index/layout.es6";
import popup from '../../../common/js/module/popup.js';
// import loading from '../vue/loading.vue';

new Vue({
	el: ".app",
	components: {
		'com-top-title': require('../../../component/com-top-title.vue'),
    'avatar-upload': require('../vue/avatar_upload.vue')
	},
	props: {},
	data() {
		return {
			data: null,
			response: null,
			isapp: false,
			isLoad: false,
		}
	},
	created () {
		// this.getParmas();
		this.getData();
		this.isapp = this.isApp();
	},
	mounted() {
		// 设置app头部标题栏
    native.custom.initHead({
      homeOnHead: 1,
      shareOnHead: 1,
    });
	},
	methods: {
		getData () {
			let that = this;
			$.ajax({
				url: '/api/mg/sale/avatarmake/getAvatarList',
				type: "POST",
				data: layout.strSign('avatarAddv',{}),
				dataType: "JSON",
				success (res) {
					common.checkRedirect(res);
					if (!res.code) {
						that.response = res;
					} else {
						popup.toast(res.data.msg);
					}
					console.log(1234,res);
				},
				error (error) {
					console.log(error)
				},
			})
		},
		isApp() {
			let u = navigator.userAgent;

			return !!u.match(/davdian|bravetime|vyohui/);
		},
		// 获取参数
		/*getParmas() {
			let search = location.search;

			if (search.indexOf("?") != -1) {
				let newUrl = search.substr(1);
				let substrUrl = newUrl.split("&");
				substrUrl.map((item,index) => {
					this.objUrl[item.split("=")[0]] = unescape(item.split("=")[1]);
				});
			};
		}
		*/
	}
})
