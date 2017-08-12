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

import OrderTopTitle from "../vue/order_topTitle.vue";
import OrderTop from "../vue/order_top.vue";
import OrderList from "../vue/order_list.vue";
import layout from "../../../../module/index/layout.es6";
import popup from '../../../common/js/module/popup.js';
import loading from '../vue/loading.vue';

new Vue({
	el: ".app",
	components: {
		OrderTopTitle: OrderTopTitle,
		OrderTop: OrderTop,
		OrderList: OrderList,
		loading: loading,
	},
	props: {},
	data() {
		return {
			data: null,
			objUrl: {},
			isapp: false,
			isLoad: false,
		}
	},
	created () {
		this.getParmas();
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
		// 获取参数
		getParmas() {
			let search = location.search;

			if (search.indexOf("?") != -1) {
				let newUrl = search.substr(1);
				let substrUrl = newUrl.split("&");
				substrUrl.map((item,index) => {
					this.objUrl[item.split("=")[0]] = unescape(item.split("=")[1]);
				});
			};
		},
		getData() {
			this.isLoad = true;
			let that = this;
			let isDev = true;
			if (isDev) {
				let queryObj = layout.strSign('create',{
					deliveryId: this.objUrl.deliveryId,
					orderId: this.objUrl.orderId
				});
				$.ajax({
					url: "/api/mg/order/cancelOrder/createDetail?_="+Date.now(),
					type: "POST",
					data: queryObj,
					dataType: "json",
					success (res) {
						common.checkRedirect(res);
						that.isLoad = false;
						if (!res.code) {
							that.data = res;
						}
					},
					error (err) {
						that.isLoad = false;
						popup.toast('网络异常，请稍后');
					}
				})
			} else {
				$.ajax({
					url: "",
					// type: "post",
					// data: layout.strSign("createDetail",{
					// 	deliveryId: 9542093
					// }),
					dataType: "json",
					success (res) {
					},
					error (err) {
						that.data = require("../json/createDetail.json");
						console.log(2,that.data);
						// console.log(1,err);
					}
				})
			}
		},
	}
})
