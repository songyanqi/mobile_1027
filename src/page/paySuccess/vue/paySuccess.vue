<!--模板-->
<template>
  <div class="activity_container">
    <div class='activity_success' :class='{activity_success_app: isapp}'>
      
      <div class='container1' v-if='!isapp'>
        <img class='successImg' src="//pic.davdian.com/free/2017/06/20/Successful.png">
        <div class='success_btn_all'>
        <div class='success_btn' @click='goLink(successData.orderInfo.command.content)'>订单详情</div>
          <div class='success_btn' @click='goLink(successData.indexInfo.command.content)'>回到首页</div>
        </div>
      </div>
      <div class='container2' v-if='!isapp'></div>
      <div class='container3'>
        <div class='success_text_top' v-if='state==3'>相比非会员，本次购物帮您多省<span v-if='successData && successData.orderInfo && successData.orderInfo.orderIncome' v-text='successData.orderInfo.orderIncome'></span>元</div>
        <div class='success_text_top1' v-if='state==3'>累计已为您节省<span v-text='successData.orderInfo.totalIncome'></span>元</div>
        <p class='success_text_top2' v-if='state==3'>有好事别忘了朋友！</p>
        <p class='success_text_top3' v-if='state==3'>推荐朋友成为会员，您也能获得丰厚奖励</p>
        <p class='success_text_top2' v-if='state==0 || state==1'>您刚刚与 <span v-text='successData.orderInfo.orderIncome'></span>元返现擦肩而过</p>
        <p class='success_text_top3' v-if='state==0 || state==1'>立即加入会员，获得更多优惠</p>
        <div class='success_btn1' v-if='state==3' @click='goLink(successData.memberInfo.command.content)'>邀请好友</div>
        <div class='success_btn1'  v-if='state==0 || state==1' @click='goLink(successData.memberInfo.command.content)'>加入会员</div>
      </div>
      
    </div>
  </div>
</template>

<!--组件定义-->
<script>
  import layout from "../../../../module/index/layout.es6";
  import $ from '$';

  import tongji from '../../../common/js/module/tjAncestor.js';
  import popup from '../../../common/js/module/popup.js';

  let axios = require("axios");
  require('es6-promise').polyfill();
  import { strSign } from "../../../../utils/utils.es6";

  export default {
    components: {
      'com-scratch-card': require('../../../component/com-scratch-card.vue'),
    },
    props: {},
    data: function () {
      return {
        successData:{},
        state:null,
        isapp:!!navigator.userAgent.match(/davdian|bravetime|vyohui/)
      }
    },
    computed: {},
    created: function () {

    },
    mounted: function () {
      this.successPage()
    },
    methods: {
      successPage(){
        var that = this
        console.log(strSign({orderId:window.location.pathname.split('.')[0].split('-')[2]}))
        axios.post('/api/mg/order/info/income',strSign({orderId:window.location.pathname.split('.')[0].split('-')[2]}))
          .then(function (respone) {
            console.log('respone-->', respone)
              if(respone.data.code == 0){
                that.successData = respone.data.data
                that.state = respone.data.visitor_status
              }else {
                  alert('code='+respone.data.code+':'+respone.data.data.msg)
              }
          })
          .catch(function (error) {
              console.log(error,11111111)
          });
      },
      goLink(href){
        window.location.href = href
      }
    },
  }
</script>
<style>
  body{
    background: #fff;
  }
</style>
<style lang='sass' scoped>
  .container1{
    position: absolute;
    top: 0;
    width: 100%;
  }
  .container2{
    width: 100%;
    height: 1.73rem;
  }
  .container3{
    width: 100%;
    position: relative;
    height: 2.5rem;
  }
  .activity_success{
    width: 100%;
    height: 4.28rem;
    position: relative;
    .successImg{
      width: 1.13rem;
      position: absolute;
      top: 0.6rem;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .success_btn_all{
      position: absolute;
      top:1.18rem;
      left: 50%;
      transform: translate(-50%, 0);
      width: 2.55rem;
      font-size: 0;
      .success_btn{
        display: inline-block;
        vertical-align: top;
        font-size: 0.14rem;
        width: 1.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        border: 1px solid #FF4A7D;
        color: #FF4A7D;
        border-radius: 0.64rem;
      }
      .success_btn:first-child{
        margin-right: 0.1rem;
      }
    }
    .success_text_top{
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 0.14rem;
      color: #666666;
      top: 0;
      span{
        color: #FF4A7D;
        font-size: 0.2rem;
        font-weight: 300;
      }
    }
    .success_text_top1{
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 0.14rem;
      color: #666666;
      top: 0.3rem;
      span{
        color: #FF4A7D;
        font-weight: 300;
        font-size: 0.2rem;
      }
    }
    .success_text_top2{
      width: 100%;
      text-align: center;
      position: absolute;
      top:1.3rem;
      color: #666666;
      font-size: 0.14rem;
      span{
        color: #FF4A7D;
        font-weight: 300;
        font-size: 0.2rem;
      }
    }
    .success_text_top3{
      width: 100%;
      text-align: center;
      position: absolute;
      top:1.55rem;
      color: #666666;
      font-size: 0.14rem;
    }
    .success_btn1{
      position: absolute;
      top: 1.85rem;
      width: 2rem;
      height: 0.4rem;
      line-height: 0.4rem;
      left:50%;
      transform: translate(-50%, 0);
      color: #FF4A7D;
      font-size: 0.14rem;
      border: 1px solid #FF4A7D;
      border-radius: 0.67rem;
      text-align: center;
    }
  }
  .activity_success_app{
    height: 2.55rem;
  }
</style>
