<template>
	<div v-if = "data">
		<div class = "orderList">
			<a v-for = "item of data.data.goodsList" 
			@click = "handleOrder(item)"
			class="order_goods_item"
			href="javascript:void(0)">
		    <div class="order_good_img_container">
		      <img :src="item.imageUrl">
		    </div>
		    <div class="order_good_info_container dav-small">
		      <div class="order_good_name">{{ item.title }}</div>
		      <div class="order_good_price">¥{{ item.nowPrice }} <span class = "f14">X</span>{{ item.goodsNum }}</div>
		    </div>
		  </a>
	  </div>
	  <div class = "common sumMoney">
	  	<div>实付金额</div>
	  	<div class = "moneyNum">¥ {{ data.data.moneyPaid }}</div>	
	  </div>
	  <!-- 退款原因 -->
	  <div class = "common m10" @click = "handleReasion">
	  	<div>退款原因：</div>
	  	<div class = "reasonIpts" :class = "{ color6: isConfirmBtn }">{{ reasonName }}</div>
	  	<div class = "arrowIcon"></div>
	  </div>
	  <!-- 退款金额 -->
		<div class = "moneyCont m10">
			<div class = "flex1 common moneyTitle">
				<div>退款金额：<span class = "refundNum"><span class = "f13">¥</span> {{ data.data.refundMoney }}</span></div>
				<div class = "returnExplain flex1" @click = "handleExplain">退款说明?</div>	
			</div>
			<div class = "reasonList">
				<span class = "listCont">
					<span class = "listDot">*</span>此订单在线支付的金额：<span class = "color3">¥{{ data.data.moneyPaid }}</span><span v-if = "data.data.shipFee != '0'">（含运费{{ data.data.shipFee }}元）</span>，将原路返回您支付账户</span>
			</div>
			<div v-if = "data.data.income != '0'" class = "reasonList">
				<span class = "listCont">
					<span class = "listDot">*</span>此订单使用奖励支付的金额：<span class = "color3">¥{{ data.data.income }}</span>，将退回您的App中，可在“我的收入”中查看</span>
			</div>
			<div v-if = "data.data.bonus && data.data.bonus != '0'" class = "reasonList">
				<span class = "listCont">
					<span class = "listDot">*</span>此订单使用的优惠券将不会退回</span>
			</div>
		</div>
		<!-- 问题描述 -->
		<div class = "commonQuestion m10">
			<div class = "questionTitle">问题描述：</div>
			<div class = "flex1 reasonIpt">
				<input v-model = "reasonQestion" v-on:input = "handleIpt"  type="text" placeholder="选填">
			</div>
		</div>
		<div @click = "handleApply" class = "submitApply">提交申请</div>		
	  <!-- 取消订单弹框 -->
  	<div class="modalMask" @click = "handleCloseModal" :class = "{ showMask: isShowModal }" v-show = "isShowModal"></div>
	  <div class="modalWrapper" :class = "{ showModal: isShowModal }" v-show = "isShowModal">
	    <div class="modalCloseWrapper" @click = "handleCloseModal">
	        <span class="modal-close"></span>
	    </div>
	    <div class = "modalTitle">退款原因</div>
	    <div class = "modalCont">
				<label
					v-for = "item of data.data.reasonList"
					class = 'navLabel'
					:for="item.reasonId">
          <div @click = "handleReason" :data-name = "item.reasonName" :data-id = "item.reasonId" class = 'navList'>
            <span>{{ item.reasonName }}</span>
              <input class = 'reasonIpt' :data-name = "item.reasonName" :data-id = "item.reasonId" :id = "item.reasonId" type='radio' name = 'reason'>
              <i></i>
          </div>
        </label>
	    </div>
	    <div class = "disabledModal"
	    	@click = "handleConfirm"
	     :class = "{ modalConfirm: isDisabled }">确定</div>
	  </div>
	  <loading v-if = "isLoad"></loading>
	</div>
</template>
<script>
	import popup from '../../../common/js/module/popup.js';
	import layout from "../../../../module/index/layout.es6";
	import native from '../../../common/js/module/native.js';
	import loading from "./loading";

	export default	{
		data() {
			return {
				isShowModal: false,
				isDisabled: false,
				//点击原因时还没点击确定的原因和id
				beforeReasonName: "",
				reasonId: 0,
				reasonQestion: "",
				reasonName: "请选择退款原因",
				afterReasonId: 0,
				// 是否点击了确定
				isConfirmBtn: false,
				scrollTop: 0,
				isLoad: false,
			}
		},
		components: {
		},
		mounted() {
		},
		props: ["data","queryurl","isapp"],
		methods: {
			// 出现弹框给body添加fixed
			addFixed() {
				if (document.documentElement && document.documentElement.scrollTop) {
          this.scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          this.scrollTop = document.body.scrollTop;
        }
        document.body.style.top = -this.scrollTop + 'px';
        document.body.classList.add("bodyFix");
			},
			// 移除fixed
			removeFixed() {
				document.body.classList.remove("bodyFix");
        document.body.scrollTop = this.scrollTop;
			},
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
			// 输入问题原因
			handleIpt() {
				if (this.reasonQestion.length > 200) {
					popup.toast("最多输入200字");
					this.reasonQestion = this.reasonQestion.substr(0,200);
				}
			},
			handleReasion() {
				this.isShowModal = true;
				this.addFixed();
			},
			handleCloseModal() {
				this.isShowModal = false;
				this.removeFixed();
			},
			handleReason(e) {
				this.isDisabled = true;
				this.reasonId = e.target.getAttribute("data-id");
				this.beforeReasonName = e.target.getAttribute("data-name");
			},
			handleOrder(item) {
				this.handleJump(`/${item.goodsId}.html`);
			},
			// 退款说明
			handleExplain() {
				// location.href = "/t-13407.html";
				this.handleJump("/t-13407.html");
			},
			handleConfirm(e) {
				if (!this.isDisabled) {

				} else {
					this.isShowModal = false;
					this.reasonName = this.beforeReasonName;
					this.afterReasonId = this.reasonId;
					this.isConfirmBtn = true;

					this.removeFixed();
				}
			},
			handleApply() {
				let that = this;
				if (!this.isConfirmBtn) {
					popup.toast('请选择退款原因');
					return;
				}
				this.isLoad = true;
				let obj = layout.strSign('create',{
					orderId: this.queryurl.orderId,
					deliveryId: this.queryurl.deliveryId,
					reasonId: this.afterReasonId,
					describe: this.reasonQestion
				});
				$.ajax({
					url:"/api/mg/order/cancelOrder/cancelByDel",
					type: "POST",
					data: obj,
					dataType: "JSON",
					success(res) {
						that.isLoad = false;

						if (!res.code) {
							let cancelId = res.data.cancelId;
							popup.toast("提交成功");
							let url = `/return_progress.html?cancelId=${cancelId}`;
							// that.handleJump(url);
							location.href = url;
						} else if (res.code == 499) {
							let cancelId = res.data.cancelId;
							popup.toast(res.data.msg);
							let url = `/return_progress.html?cancelId=${cancelId}`;
							// that.handleJump(url);
							location.href = url;
						} else {
							popup.toast(res.data.msg);
						}
					},
					error(err) {
						that.isLoad = false;
						console.log("err",err);
					}
				})
			},
		}
	}
</script>