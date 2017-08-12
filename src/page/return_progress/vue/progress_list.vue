<template>
	<div v-if = "response">
		<div class = "listCont">
			<!-- 等待确认 -->
			<div v-if = "response.data.status == '1'">
				<div class = "p_titles">
					<span class = "p1_icon"></span>
					<span class = "list_title">{{ response.data.statusDec }}</span>
				</div>
				<div class = "list_cont">您的订单已经开始处理，订单拦截可能不成功，工作人员将尽量为您拦截，请耐心等待</div>
				<div class = "cancleApply"><span @click = "handleCancleApply" class = "cancleApplyBtn">撤销申请</span></div>	
			</div>
			<!-- 等待退款	 -->
			<div v-if = "response.data.status == '5' || response.data.status == '6'  || response.data.status == '3'">
				<div class = "p_titles">
					<span class = "p2_icon"></span>
					<span class = "list_title">{{ response.data.statusDec }}</span>
				</div>
				<div class = "list_cont">同意退款，2日内退款将退回您的支付账户</div>
			</div>
			<!-- 完成退款 -->
			<div v-if = "response.data.status == '7'">
				<div class = "p_titles">
					<span class = "p3_icon"></span>
					<span class = "list_title">{{ response.data.statusDec }}</span>
				</div>
				<div class = "list_cont">我们已经原路打款给您，请查看支付时的账户。</div>
				<div class = "return_detail">
					<div class = "return_tip">退款明细</div>
					<div>在线支付：¥{{ response.data.refundMoney }}</div> 
					<div v-if = "response.data.income != '0'">使用奖励：¥{{ response.data.income }}</div>
				</div>
				<div class = "return_nav">
					<span>*</span>在线支付款项退回您的银行卡，使用奖励款项退回您账户内，请在“我的收入”里查看
				</div>
			</div>
			<!-- 点击撤销后 -->
			<div v-if = "response.data.status == '2'">
				<div class = "p_titles">
					<span class = "p3_icon"></span>
					<span class = "list_title">{{ response.data.statusDec }}</span>
				</div>
				<div class = "list_cont">您已撤销本次退款申请</div>
			</div>
			<!-- 取消失败,后台返回原因 -->
			<div v-if = "response.data.status == '4'">
				<div class = "p_titles">
					<span class = "p4_icon"></span>
					<span class = "list_title">{{ response.data.statusDec }}</span>
				</div>
				<div class = "list_cont">{{ response.data.statusRemark }}</div>
			</div>
			<!-- 退款关闭，原型没有， -->
			<div v-if = "response.data.status == '退款关闭'">
				<div class = "p_titles">
					<span class = "p4_icon"></span>
					<span class = "list_title">{{ response.data.statusDec }}</span>
				</div>
				<div class = "list_cont">关闭原因订单取消失败，您购买的商品已出库，如还需退款可到订单详情关注最新近照，发货后可申请退款</div>
			</div>
		</div>
		<div v-for = "item of response.data.goodsList" class = "orderList">
		  <a @click = "handleGoods(item)" class="order_goods_item" href="javascript:void(0)">
		    <div class="order_good_img_container">
		      <img :src="item.imageUrl">
		    </div>
		    <div class="order_good_info_container dav-small">
		      <div class="order_good_name">{{ item.title }}</div>
		      <div class="order_good_price">¥{{ item.nowPrice }} <span class = "f14">X</span>{{ item.goodsNum }}</div>
		    </div>
		  </a>
	  </div>
		<div class = "bgf">
		  <div class = "order_list order_descript">
		  	<div>订单号：{{ response.data.orderSn }}</div>
		  	<div>退款原因：{{ response.data.reasonName }}</div>
		  	<div>退款金额：¥{{ response.data.refundMoney }}</div>
		  	<div v-if = "response.data.deliverySn != '' && response.data.issueDescription != ''">问题描述：{{ response.data.issueDescription }}</div>
		  </div>
	  </div>

	  <div v-if = "isModal" class = "modalWrapper">
	  	<div @click = "handleMaskCancle" class = "modalMask"></div>
	  	<div class = "modalCont">
		  	<div class = "modalBody">您确定要撤销申请？</div>
		  	<div class = "btnCont">
		  		<span @click = "handleCancle" class = "cancleBtn">不撤销</span>
		  		<span @click = "handleConfirm" class = "confirmBtn">确定</span>
		  	</div>
	  	</div>
	  </div>
	  <div class = "common mb20" @click = "handleDetail">
	  	<span class = "flex1">进度详情</span>
	  </div>
	</div>
</template>
<script>
import layout from "../../../../module/index/layout.es6";
import popup from '../../../common/js/module/popup.js';
import native from '../../../common/js/module/native.js';

	export default {
		data() {
			return {
				isModal: false,
			}
		},
		created() {
		},
		mounted() {

		},
		props: ["response","isapp"],
		watch: {
			response: {
				handler (newObj,oldObj) {
				},
				deep: true,
			}
		},
		methods: {
			// 是否为mobile
			isMobile() {
				let ua = navigator.userAgent;
				return !!ua.match(/Mobile/i);
			},
			// 跳转方式
			handleJump(url) {
				if (this.isapp) {
					native.Browser.open({
            url: url
          });
				} else if (this.isMobile()) {
					window.open(url, '_blank');
				} else {
					window.open(url, '_self');
				}
			},
			handleGoods(item) {
				this.handleJump(`/${item.goodsId}.html`);
			},
			handleCancleApply() {
				this.isModal = true;
			},
			handleCancle() {
				this.isModal = false;
			},
			handleConfirm() {
				let queryObj = layout.strSign('create',{
					cancelId: this.response.data.cancelId
				});
				let that = this;
				$.ajax({
					url: "/api/mg/order/cancelOrder/repeal",
					type: "POST",
					data: queryObj,
					dataType: "JSON",
					success (res) {
						if (!res.code) {
							let statusArr = [], dates = that.changeDate(Date.now());

							statusArr.push({"desc": "提交申请", "status": "history", "showType": 3},{desc: "等待客服确认", "time": that.response.data.statusList[1].time, "status": "history", "showType": 3},{desc: "售后申请撤销", "time": dates, "status": "now", "showType": 3});
							that.response.data.statusList = statusArr;
							that.$emit('status-list', statusArr);
							that.response.data.status = 2;
							that.response.data.statusDec = "售后申请撤销";
							// 存储到localstorage里面
							if (localStorage.getItem('returnProgress')) {
								localStorage.removeItem('returnProgress');
							}
							localStorage.setItem('returnProgress',JSON.stringify(that.response));
						} else {
							popup.toast(res.data.msg);
						}
						that.isModal = false;
					},
					error (err) {
						that.isModal = false;
					}
				})
			},
			handleMaskCancle(e) {
				this.isModal = false;
			},
			handleDetail() {
				let url = `/order_progress_detail.html?cancelId=${this.response.data.cancelId}`
				this.handleJump(url);
			},
			// 转换时间
			changeDate(date) {
				if (date) {
          date = new Date(Number(date));
            let year = date.getFullYear(),
              month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
              dates = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
              hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
              minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
              seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
            
            return `${year}-${month}-${dates} ${hours}:${minutes}:${seconds}`;
        } else {
        	return 0;
        }
			},
		}
	}
</script>