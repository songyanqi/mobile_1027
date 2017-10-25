<!--模板-->
<template>
  <div class="activity_container">
    <div class="activity_huibenjie_scratch">
      <!--刮免单背景图-->
      <img class="bg-pic" src="//pic.davdian.com/free/scratch-bg-1018.png"
           v-if="window.isShowLottery === '1'">
      <!--刮现金背景图-->
      <img class="bg-pic" src="//pic.davdian.com/free/huibenjie/scratch/scratch-bg-money.png"
           v-if="window.isShowLottery === '2'">
      <!--刮奖-->
      <com-scratch-card :show-mask="showMask" :can-scratch="valid" mask-tip="" mask-img="//pic.davdian.com/free/scratch-mask-1018.png" font-size="30px" font-color="#e7e7e7"
                        @touchstart="bindCoupon(); addScratchTimes(); tongji('hbj_scratch');isValid(this);"
                        @mousedown="bindCoupon(); addScratchTimes(); tongji('hbj_scratch');"
                        @touchmove="addScratchTimes" @touchmove="addScratchTimes">
        <!--免单刮刮卡文案-->
        <template v-if="window.isShowLottery === '1'">
          <img class="result-bg" src="//pic.davdian.com/free/scratch-yes-1018.png" v-if="window.isFreeOfCharge === '1'">
          <img class="result-bg" src="//pic.davdian.com/free/scratch-no-1018.jpg" v-else>
        </template>
        <!--现金刮刮卡文案-->
        <template v-if="window.isShowLottery === '2'">
          <template v-if="window.lotteryMoney > 0">恭喜您抽中{{window.lotteryMoney}}元现金！</template>
          <template v-else>没中奖！再接再厉！</template>
        </template>
      </com-scratch-card>
      <!--刮免单规则-->
      <div class="rule" v-if="window.isShowLottery === '1'">
        <p class="title">刮刮乐活动规则：</p>
        <p>1.活动时间：2017.10.18 00:00:00-2017.10.18 23:59:59；</p>
        <p>2.该活动仅限大V店会员参与；</p>
        <p>3.朋友代付的订单不参与抽免单活动；</p>
        <p>4.活动期间，会员完成订单支付后，即有1次免单抽奖的机会，若抽中免单，则免当前订单的实际支付金额（包含返现支付部分）；</p>
        <p>5.免单奖励将实时以返现形式返至【我的】－【总额】－【待结算金额】－【其他收入】里，30天后如果没有退货将转到【可提现金额】；</p>
        <p>6.开通会员订单、组团订单不参与该活动；</p>
        <p>7.违规处理：如遇退货，相应免单奖励将予以取消。</p>
      </div>
      <!--刮现金规则-->
      <div class="rule" v-if="window.isShowLottery === '2'">
        <p class="title">刮刮乐活动规则：</p>
        <p>1.使用APP下单参与抽奖的大V店会员（店主）请提前升级到3.8.0及以上版本；</p>
        <p>2.活动期间，会员完成订单支付后，在支付成功页面可进行一次刮奖，金额随机，刮开涂层可100%中奖，中奖金额将于次月的19日以返现形式返回，每个成功支付后的订单（组团和开通会员不参与该活动）都有一次刮奖机会；</p>
        <p>3.违规处理：如遇退货或取消订单，相应中奖金额将予以取消。</p>
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

  export default {
    components: {
      'com-scratch-card': require('../../../component/com-scratch-card.vue'),
    },
    props: {},
    data: function () {
      return {
        response: null,
        // 是否已经绑定成功奖券
        isBinded: false,
        // 绑定奖券尝试次数
        bindCouponTryTimes: 0,
        // 刮奖触发次数
        scratchTimes: 0,
        // 是否显示刮奖蒙层
        showMask: true,
        // 是否有效
        valid: true,
      }
    },
    computed: {},
    created: function () {

    },
    mounted: function () {
      let ts = this;
      // 刮现金
      if (window.isShowLottery === '2') {
        setTimeout(function () {
          if (ts.bindCouponTryTimes === 0) {
            ts.valid = false;
          }
        }, 1000 * 60 * 20);
//        }, 1000 * 10);
      }
    },
    methods: {
      /**
       * 绑定奖券接口
       * wiki
       * http://wiki.bravetime.net/pages/viewpage.action?pageId=17039449
       */
      bindCoupon(){
        let ts = this;


        // 如果没有中奖、已经绑定成功了、或尝试3次之后,则不调用绑定接口
//        if (window.isFreeOfCharge !== '1' || ts.isBinded || ts.bindCouponTryTimes >= 3 || !ts.valid) return;
        if (ts.isBinded || ts.bindCouponTryTimes >= 3 || !ts.valid) return;

        // 绑定
        ts.bindCouponTryTimes++;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/sale/lottery/bindBonus?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {
            // 活动type
            lotteryActId: window.lotteryActId,
            // 订单id
            orderSn: window.orderSn,
          }),
          success(response) {
            ts.response = response;
//            console.log('抽奖活动接口 返回数据:');
//            console.log(ts.response);

            // 切换状态,置为已绑定
            if (ts.response.code === 0) {
              ts.isBinded = true;
            }
          },
          error(error) {
//          ts.response = require('../json/lottery.json');
//          console.log('抽奖活动接口 返回数据:');
//          console.log(ts.response);
          }
        });
      },
      // 增加刮奖触发次数,一定次数后展开刮奖区域
      addScratchTimes(){
        this.scratchTimes++;

        // 埋点
        if (this.scratchTimes === 1) {
          this.tongji('hbj_scratch');
        }

        if (this.scratchTimes > 100 && this.valid) {
          this.showMask = false;
        }
      },
      // 埋点
      tongji(key){
        // 埋点
        if (this.scratchTimes === 1) {
          tongji.pvSend(key);
        }
      },
      // 是否有效
      isValid(){
        if (!this.valid) {
          popup.toast('来慢啦！影响了您的抽奖机会哦～');
        }
      }
    },
  }
</script>

<!--样式-->
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/pay_result_scratch";
</style>
