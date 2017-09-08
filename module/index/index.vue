<template>
  <div class="index_inner">
    <!--头部-->
    <index-head :usersta="usersta" :menudata='menudata' :data='headData' v-if='!app' v-on:categorya="changeCategory"></index-head>
    <div style='height: 80px' v-if='!app'></div>
    <n-progress></n-progress>
    <!--内容-->
    <index-feed :data="feedData" v-if='!loadFlag && !unLoadFlag'></index-feed>

    <bd_goods_1 :menuids="menuId"></bd_goods_1>
    <!--底部-->
    <!--<index-foot :data='footData' v-if='!app'></index-foot>-->
    <index-foot active="home" v-if='!app' style="z-index: 13;"></index-foot>

    <!--其他展示信息：签到 弹红包等-->
    <div class="other_info">
      <div class='unLoad' v-if='unLoadFlag'>
        <div class='unLoad-img'></div>
        <div class='unLoad-title'>无法连接网络啦</div>
        <div class='unLoad-btn' v-on:click='loadBtn'>点击重新加载</div>
      </div>
      <div v-on:click='clickAdvert1' class='mask_activity1' v-if='advertFlag[0] && advert.topBar'
           :style="{'background': 'url(' + advert.topBar.imageUrl + ') no-repeat center' , 'background-size': 'cover'}"></div>

      <div class='mask_activity2_f' v-if='advertFlag[1] && advert.layer'>
        <div class='mask_activity2' v-on:click='clickAdvert2'
             :style="{'background': 'url(' + advert.layer.imageUrl + ') no-repeat center' , 'background-size': 'contain'}">
          <div class="exit" v-on:click='exit($event)'>X</div>
        </div>
        <div class='mask_activity2_mask' v-on:click='exit($event)' v-if='advertFlag[1] && advert.layer'></div>
      </div>


      <div class='mask_sign' v-if='advertFlag[2]'
           :style="{'background': 'url(' + signData.sign.imageUrl + ') no-repeat' , 'background-size': 'cover'}">
        <div class='mask_sign_title'>签到成功</div>
        <div class='mask_sign_content' v-if='signData.sign'>
          <span v-text='signData.sign.msgArr[0]'></span><br/>
          <span v-text='signData.sign.msgArr[1]'></span>
        </div>
      </div>

      <!--单次提示用户下载APP和关注公众号-->
      <div class="downAppWrap" v-if="iftips&&!app" v-on:click="closeTips">
        <div class="downApp" v-on:click.stop="events">
          <img v-if="isWechart" src="//pic.davdian.com/free/2017/06/13/index_erweima.png">
          <img v-else src="//pic.davdian.com/free/2017/06/13/index_erweima.png" alt="" @touchstart="tipstouchstart"
               @touchmove="tipstouchmove" @touchend="tipstouchend">
          <a href="https://itunes.apple.com/cn/app/dav-dian-rang-ma-ma-qing-song/id1042582462?l=en&mt=8"></a>
          <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller"></a>
          <div class="close8" @click="closeTips"></div>
        </div>
      </div>
      <!--领取赠品弹窗-->
      <div class="getReward" v-if="getRewardtips && rewardData.imgUrl != ''">
        <a :href="rewardData.command.content">
          <img :src="rewardData.imgUrl" alt="">
          <!--<img src="http://pic.davdian.com/goods/2017/06/06/800_384_b7862b07fef7e7dcd0c806e5e648f542.jpg" alt="">-->
          <div class="rewardiv_close" @click="close_rewardtip"></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
//  import "./index.css"
  import index from "./index.es6"
  export default index
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../node_modules/nprogress/nprogress.css";
  @import "./index.css";

  #nprogress .spinner {
    display: none !important;
  }
</style>
