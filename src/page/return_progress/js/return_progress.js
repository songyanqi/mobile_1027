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
import OrderTop from "../../cancle_order/vue/order_top.vue";
import progressList from "../vue/progress_list.vue";
import layout from "../../../../module/index/layout.es6";
import popup from '../../../common/js/module/popup.js';
import loading from '../../cancle_order/vue/loading.vue';

new Vue({
	el: ".app",
	components: {
		OrderTopTitle: OrderTopTitle,
		OrderTop: OrderTop,
		progressList: progressList,
		loading: loading,
	},
	props: {},
	data() {
		return {
			response: null,
			progressList: [],
			isapp: false,
			objUrl: {},
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
		// 当状态改变的时候，头部也改变
		handleStatus(statusList) {
			this.progressList = statusList;
		},
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
			this.isLoad = true;
			let that = this;
			let queryObj = layout.strSign('create',{
					cancelId: this.objUrl.cancelId
				});
			$.ajax({
				url: "/api/mg/order/cancelOrder/detail",
				data: queryObj,
				type: "POST",
				dataType: "JSON", 
				success (res) {
					common.checkRedirect(res);
					that.isLoad = false;
					if (!res.code) {
						that.response = res;
						that.getProgress(that.response.data.statusList);
						// 存储到localstorage里面,没用到
						if (localStorage.getItem('returnProgress')) {
							localStorage.removeItem('returnProgress');
						}
						localStorage.setItem('returnProgress',JSON.stringify(that.response));
					} else {
						popup.toast(res.data.msg);
					}
				},
				error (err) {
					that.isLoad = false;
					popup.toast('网络异常，请稍后');
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
				if (item.showType == 1 || item.showType == 3) {
					this.progressList.push(item);
				}
			});
		},
	}
})