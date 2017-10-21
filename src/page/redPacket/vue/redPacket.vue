<template>
  <div class="background">

      <template v-if="!isLogin">
        <!--未登录-->
        <div class="text textMiddle">登录后查看活动详情哦</div>
        <div class="btn" @click="login"></div>
      </template>

      <template v-if="isLogin">

        <template v-if='isHotDay==2'>
          <template v-if="isRedPacket!=1">
            <!--活动中获得-->
            <div class="text textTop">已获得100红包</div>
            <div class="text textBottom">购物用红包 买得更畅快</div>
            <div class="btn2" @click="goActMain"></div>
          </template>
          <template v-if="isRedPacket==1">
            <!--活动中未获得-->
            <div class="text textTop">还未获得100红包</div>
            <div class="text textBottom">单笔支付满100即可获得</div>
            <div class="btn2" @click="goActMain"></div>
          </template>
        </template>

        <template v-if="isHotDay==3">
          <template v-if="isRedPacket!=1">
            <!--活动结束获得-->
            <div class="text textTop">活动结束啦</div>
            <div class="text textBottom">已获得100红包</div>
            <div class="btn3" @click="goActMain"></div>
          </template>
          <template v-if="isRedPacket==1">
            <!--活动结束未获得-->
            <div class="text textTop">活动结束啦</div>
            <div class="text textBottom">很遗憾您错过了这次活动</div>
            <div class="btn3" @click="goActMain"></div>
          </template>
        </template>

      </template>

      <div class="rute">
        <div style="text-align: center">活动规则</div>
        <div>1.活动时间：2017.10.19 00:00:00-2017.10.19 23:59:59；</div>
        <div>2.满返规则：购物单笔订单实际支付金额（包括返现支付部分）≥100元即可返100元红包，每个用户仅享1次满返机会，下单后红包将在30分钟左右返到账户；红包共计2张：图书专享红包50元满249可用，除图书外其他品类通用红包50元满249可用；</div>
        <div>3.本次满返活动获得的红包请在2017.10.31 23:59:59前使用，过期失效；</div>
        <div>4.因退货、换货等原因导致单笔订单实际支付金额不足100元，视为主动放弃该活动；</div>
        <div>5.开通会员订单不参与该活动；</div>
        <div style="margin-bottom: 0">6.详情可咨询大V店客服。</div>
      </div>
  </div>
</template>
<script>
  import native from "../../../../src/common/js/module/native.js"
  import util from "../../../../utils/utils.es6"
  import login from "../../../../src/common/js/module/login.js"
  import api from "../../../../utils/api.es6"
  import share from "../../../../src/common/js/module/share.js"
  import common from "../../../../src/common/js/common.js"
  export default{
    mounted(){
        native.Browser.setHead({
          shareBtn:"1"
        });
        share.setShareInfo({
          title: "单笔支付满100返100元红包",
          desc: "每个用户只限一次，快来买买买~",
          link: window.location.href,
          imgUrl: "http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2017/09/30/redPacket.jpg"
        });
        window.iosInterface.getShareInfo = function () {
          var shareInfo = {
            title: "单笔支付满100返100元红包",
            desc: "每个用户只限一次，快来买买买~",
            link: window.location.href,
            imgUrl: "http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2017/09/30/redPacket.jpg"
          }
          return JSON.stringify(shareInfo);
        };
        this.init();
    },
    data(){
      return {
          isApp:util.utils.isApp(),
          isRedPacket:null,
          isHotDay:null,
          isLogin:null
      }
    },
    methods:{
      getStaus(){
        var token=login.getDvdsid().substr(32,8);
        if(token=="00000001"){
          return 0;
        }else{
          if(token.substr(7,1)==1){
            return 1;
          }else{
            return 3;
          }
        }
      },
      init(){
        var that=this;
        if(this.getStaus()==0){
          this.isLogin=false;
        }else{
          this.isLogin=true;

          api("/api/mg/sale/coupon/getNineteen")
            .then(function (result) {
                common.checkRedirect(result);
                if(result.code==0){
                    if(result.data.activeStatus && result.data.couponStatus){
                      that.isRedPacket=result.data.couponStatus;
                      that.isHotDay=result.data.activeStatus;
                    }
                }else{
                   alert(result.code);
                }
            })
            .catch(function (e) {

            })
//
//          var result=require('../json/redPacket.json');
//          this.isRedPacket=result.data.couponStatus;
//          this.isHotDay=result.data.activeStatus;
//          console.log(this.isRedPacket);
//          console.log(this.isHotDay);
        }

      },
      login(){
        if (this.isApp) {
          native.Account.login()
        } else {
          window.location.href = '/login.html?' + 'referer=' + encodeURIComponent(window.location.href)
        }
      },
      goActMain(){
        if(this.isApp){
          native.Browser.open({
            url: "/act_1018_main.html"
          })
        }else{
          window.location.href="/act_1018_main.html";
        }
      }
    }
  }
</script>
<style scoped>
  .background{
    width: 3.75rem;
    height: 8.66rem;
    position: relative;
    background-size: 3.75rem 8.66rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/bg1125.jpg');
  }
  .btn{
    width: 1.28rem;
    height: 0.3rem;
    position: absolute;
    top: 2.85rem;
    left: 1.235rem;
    background-size: 1.28rem 0.3rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/%E7%AB%8B%E5%8D%B3%E7%99%BB%E5%BD%95.png');
  }
  .btn2{
    width: 1.28rem;
    height: 0.3rem;
    position: absolute;
    top: 2.85rem;
    left: 1.235rem;
    background-size: 1.28rem 0.3rem;
    background-image: url('//pic.davdian.com/free/2017/10/11/%E5%BF%AB%E5%8E%BB%E4%B9%B0%E4%B9%B0%E4%B9%B0.png');
  }
  .btn3{
    width: 1.28rem;
    height: 0.3rem;
    position: absolute;
    top: 2.85rem;
    left: 1.235rem;
    background-size: 1.28rem 0.3rem;
    background-image: url('//pic.davdian.com/free/2017/10/11/%E6%9F%A5%E7%9C%8B%E6%9B%B4%E5%A4%9A%E6%B4%BB%E5%8A%A8.png');
  }
  .text{
    font-size: 0.16rem;
    color:#ffd5bb;
    position: absolute;
    width: 100%;
    text-align: center;
  }
  .textTop{
    top: 2.4rem;
  }
  .textMiddle{
    top: 2.5rem;
  }
  .textBottom{
    top: 2.6rem;
  }
  .rute{
    position: absolute;
    top: 3.7rem;
    padding-left: 0.42rem;
    padding-right: 0.42rem;

  }
  .rute>div{
    width: 100%;
    color:#fbfbfb;
    font-size: 0.14rem;
    line-height: 0.15rem;
  }
</style>
