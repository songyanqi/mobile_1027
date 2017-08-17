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

import OrderTopTitle from "../../cancle_order/vue/order_topTitle.vue";
import returnList from "../vue/return_list.vue";

new Vue({
	el: ".app",
	components: {
		OrderTopTitle: OrderTopTitle,
		returnList: returnList,
	},
	props: {},
	data() {
		return {
			isapp: false,
		}
	},
	created () {
		this.getData();
		this.isapp = this.isApp();
	},
	mounted() {
		// 设置app头部标题栏
    native.custom.initHead({
      homeOnHead: 1,
      shareOnHead: 0,
    });
	},
	methods: {
		isApp() {
			let u = navigator.userAgent;

			return !!u.match(/davdian|bravetime|vyohui/);
		},
		getData() {
			
		},
	}
})
