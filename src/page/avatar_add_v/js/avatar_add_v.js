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
import share from '../../../common/js/module/share.js';

new Vue({
	el: ".app",
	components: {
		'com-top-title': require('../../../component/com-top-title.vue'),
    'avatar-upload': require('../vue/avatar_upload.vue'),
	},
	props: {},
	data() {
		return {
			data: null,
			response: null,
			isapp: false,
			isShowDot: false,
		}
	},
	created () {
		this.getData();
		this.isapp = this.isApp();
	},
	watch: {
		response: {
			handler() {
				this.$nextTick(function () {
					if ($(".avatarNavs").height() >= $(".avatarLists").height()) {
						this.isShowDot = true;
					}
				})
			},
			deep: true,
		}
	},
	mounted() {
		// 设置app头部标题栏
    native.custom.initHead({
      shareOnHead: 1,
      isAudioAbsorb:1,
      isShowAudio:1
    });
        
    share.setShareInfo({
    	title: '大V店组团包邮',
      desc: '一件包邮！每天上新！好货低价又包邮，抢到了就赚翻啦',
      link: location.href,
      imgUrl: 'http://mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Bouns/avatarShare.jpg',
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
	}
})
