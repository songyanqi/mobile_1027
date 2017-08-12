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
import OrderDetailGoods from "../vue/order_detail_goods.vue";
import layout from "../../../../module/index/layout.es6";
import popup from '../../../common/js/module/popup.js';
import loading from '../../cancle_order/vue/loading.vue';

new Vue({
	el: ".app",
	components: {
		OrderTopTitle: OrderTopTitle,
		OrderDetailGoods: OrderDetailGoods,
		loading: loading,
	},
	props: {},
	data() {
		return {
			isapp: false,
			progressList: [],
			objUrl: {},
			response: null,
		}
	},
	mounted() {
		// 设置app头部标题栏
    native.custom.initHead({
      homeOnHead: 1,
      shareOnHead: 0,
    });
	},
	created () {
		this.getParmas();
		this.isapp = this.isApp();

		// if (localStorage.getItem("returnProgress")) {
		// 		this.response = JSON.parse(localStorage.getItem("returnProgress"));
		// 		this.getProgress(this.response.data.statusList);
		// 	} else {
				this.getData();
			// }
	},
	methods: {
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
		isApp() {
			let u = navigator.userAgent;

			return !!u.match(/davdian|bravetime|vyohui/);
		},
		getData() {
			this.loading = true;
			let that = this;
			let queryObj = layout.strSign('create',{
				cancelId: this.objUrl.cancelId
			});
			// /api/mg/order/cancelOrder/detail
			$.ajax({
				url: "/api/mg/order/cancelOrder/detail",
				data: queryObj,
				type: "POST",
				dataType: "JSON", 
				success (res) {
					common.checkRedirect(res);
					that.laoding = false;
					if (!res.code) {
						console.log("sus1",res);
						that.response = res;
						that.getProgress(that.response.data.statusList);
					} else {
						popup.toast(res.data.msg);
					}
				},
				error (err) {
					that.laoding = false;
					popup.toast('网络异常,请稍后');
					// that.response = require("../json/return_progress.json");
					// that.getProgress(that.response.data.statusList);
					// // // 存储到localstorage里面
					// localStorage.setItem('returnProgress',JSON.stringify(that.response));
				}
			})
		},
		// 提取出来进度需要显示的 进度
		getProgress(list) {
			list.map((item) => {
				if (item.showType == 2 || item.showType == 3) {
					this.progressList.unshift(item);
				}
			});
			console.log(this.progressList);
		},
	}
})
