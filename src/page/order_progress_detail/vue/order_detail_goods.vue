<template>
	<div v-if = "response && response.data">
		<div class = "detail_goods">
			<div>订单号：{{ response.data.orderSn }}</div>
	  	<div>退款原因：{{ response.data.reasonName }}</div>
	  	<div>退款金额：¥{{ response.data.refundMoney }}</div>
	  	<div v-if = "response.data.issueDescription">问题描述：{{ response.data.issueDescription }}</div>
		</div>
		<!-- <div class = "detail_img">
		</div> -->
		<div class = "progressCont">
			<div class = "progressList" :class = "{progressNavs: index+1 == progresslist.length }" v-for = "(item,index) of progresslist">
				<div class = "porgressTitle">
					<span :class = "{ currentProgress: index == '0' && response.data.status != '7',overReturn: index == '0' && response.data.status == '7',oldProgress: index != '0' }"></span>
					<span v-if = "index != progresslist.length-1" class = "progressLine"></span>
					<span v-if = "index != progresslist.length-1" class = "progressBLine"></span>
					<span class = "progressDesc">{{ item.desc }}</span>
					<span class = "listDate">{{ item.time }}</span>	
				</div>
				<div v-if = "item.text && item.text != ''" class = "reasonTips">{{ item.text }}</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// response: null,
			}
		},
		props: ["response","progresslist"],
		created() {
			
		},
		mounted() {

		},
		methods: {
			getData() {
				
			}
		}
	}
</script>