<template>
  <div>
    <template v-if="isShow==1">
      <div class="banner">
        <div class="big_img"><img src="//pic.davdian.com/free/2017/09/09/banner.png" alt=""></div>
        <div class="banner_title">2017最受欢迎的TOP品牌</div>
        <div class="banner_name">点亮品牌 10.18 优惠由你定</div>
        <div class="banner_rute"></div>
        <div class="rute_title">点亮规则</div>
        <div class="rute_list">
          <div class="rute_1">1. 10.18周年庆期间（10.18-10.22），为了回馈我们的妈妈们，品牌活动优惠力度由大家点亮来决定。</div>
          <div class="rute_1">2. 每个品牌都设定了最高优惠的指定点亮人数，达到最高人数即可享最高优惠。</div>
        </div>
      </div>
      <div class="all_list">
        <div class="list" v-for="(item,index) in dataList">
          <div class="list_b_img" @click.stop="go_detail(item.linkUrl)">
            <img :src="item.bandPic" alt="">
          </div>

          <div class="list_bottom" v-if="item.hotDay==-1">

            <template v-if="item.isCompleted!=1">
              <div class="list_start">
                <img class="start" src="//pic.davdian.com/free/2017/09/09/start_icon.png" alt="">
                <span class="start_value" v-text="item.lowDiscount"></span>
              </div>
              <div class="line"></div>
            </template>

            <template v-if="item.isCompleted==1">
              <div class="success">
                <div style="position: absolute;">
                  <img src="//pic.davdian.com/free/2017/09/09/com.png" alt="">
                </div>
                <div class="text">目标达成</div>
              </div>
              <div class="line_suc"></div>
            </template>

            <div class="list_end">
              <img class="start2" src="//pic.davdian.com/free/2017/09/09/end_icon.png" alt="">
              <span class="start_value2" v-text="item.highDiscount"></span>
            </div>

            <div class="list_need">还需<span v-text="remainLight[index]"></span>人点亮</div>

            <div class="list_button" v-if="isLighted[index]!=1" @click.stop="light(item.bandId,index,$event)">
              <div class="btn" >
                <!--<img src="//pic.davdian.com/free/2017/09/09/Group.png" alt="">-->
                <span><img class="light_icon" @click.stop="light(item.bandId,index,$event)" src="//pic.davdian.com/free/2017/09/19/gray.png" alt=""></span>
                <span @click.stop="light(item.bandId,index,$event)" class="gray">我要点亮</span>
              </div>
            </div>

            <div class="list_button" v-if="isLighted[index]==1">
              <div class="btn">
                <!--<img src="//pic.davdian.com/free/2017/09/09/Group2.png" alt="">-->
                <span><img src="//pic.davdian.com/free/2017/09/19/red.png" alt=""></span>
                <span class="red">我已点亮</span>
              </div>
            </div>

          </div>

          <div class="list_bottom_complete" v-if="item.hotDay==1">
            <div class="list_end_complete">
              <img class="start2" src="//pic.davdian.com/free/2017/09/09/end_icon.png" alt="">
              <span class="start_value2" v-text="item.finalDiscount"></span>
            </div>
          </div>

        </div>
      </div>
    </template>


    <div class="error" v-if="isShow==-1 && !isApp">
      <div class="mask"></div>
      <img class="mask_img" src="//pic.davdian.com/free/2017/09/16/nosale.png" alt="">
      <div class="mask_text">
        <div>活动已结束</div>
        <div>关注更多精彩活动</div>
      </div>
      <div class="button" @click="go_href">去店铺逛逛</div>
    </div>
    <div class="error" v-if="isShow==-1 && isApp">
      <div class="mask2"></div>
      <img class="mask_img" src="//pic.davdian.com/free/2017/09/16/nosale.png" alt="">
      <div class="mask_text">
        <div>活动已结束</div>
        <div>关注更多精彩活动</div>
      </div>
      <div class="button" @click="go_href">去店铺逛逛</div>
    </div>
  </div>
</template>
<script>
  import api from "../../../../utils/api.es6"
  import dialog from "../../../../utils/dialog.es6"
  import util from "../../../../utils/utils.es6"
  import native from "../../../../src/common/js/module/native.js"
  export default{
    data(){
        return {
           dataList:[],
           isLighted:[],
           isShow:0,
            remainLight:[],
            styleObject:{},
          isApp:util.utils.isApp()
        }
    },

    mounted(){
      var that=this;

      api("/api/mg/sale/bandLitUp/getCenterBands")
        .then(function (result) {
            if(result.code==0){
              if(result.data){
                that.dataList=result.data.dataList;
                that.isShow=result.data.is_show;
                if(that.isShow==-1){
                  $("body").css("overflow","hidden")
                }
                that.initIsLighted(result.data.dataList);
                that.initNeedCount(result.data.dataList);
              }
            }else{
              if(result.data.msg){
                dialog.alert('code:'+result.code+":msg"+result.data.msg);
              }else{
                dialog.alert('code:'+result.code);
              }
            }
            console.log(result.data);
        })
        .catch(function (e) {

        })

    },
    methods:{
      animateFn(){

      },
      go_detail(linkUrl){
        if(this.isApp){
          native.Browser.open({
            url: linkUrl
          })
        }else{
          window.location.href=linkUrl;
        }
      },
      go_href(){
        window.location.href="/";
      },
      initIsLighted(data){
          var that=this;
          data.map(function (item) {
            that.isLighted.push(item.isLighted);
          });
      },
      initNeedCount(data){
        var that=this;
        data.map(function (item) {
          console.log(item.remainLight);
          that.remainLight.push(item.remainLight);
        });
      },
      changeNeedCount(index){
        if(this.remainLight[index]>0){
          Vue.set(this.remainLight,index,this.remainLight[index]-1);
        }
      },
      changeIsLighted(index){
          Vue.set(this.isLighted,index,1);
          //变异方法
      },
      light(bandId,index,ev){
        var that=this;
        if (ev.target === ev.currentTarget) {
          //从绑定目标触发

        }
        console.log(1);
        $(ev.target).addClass("animated bounceln bounce");
//        var obj={
//            "bandId":bandId
//        };
//        api("/api/mg/sale/bandLitUp/lightUp",obj)
//          .then(function (result) {
//            if(result.code==0){
//              if(result.data.success==1){
//                that.changeIsLighted(index);
//                that.changeNeedCount(index);
//                that.animateFn();
//              }else{
//                if(result.data.msg){
//                  dialog.alert('code:'+result.code+":msg"+result.data.msg);
//                }else{
//                  dialog.alert('code:'+result.code);
//                }
//              }
//            }else{
//              if(result.code==30000){
//                if (that.isApp){
//                  native.Account.login()
//                }else {
//                  window.location.href = '/login.html?'+'referer=' + encodeURIComponent(window.location.href)
//                }
//
//              }else{
//                if(result.data.msg){
//                  dialog.alert('code:'+result.code+":msg"+result.data.msg);
//                }else{
//                  dialog.alert('code:'+result.code);
//                }
//              }
//            }
//          })
//          .catch(function (e) {
////          dialog.alert(e);
//          })
      }
//      autoFontSize(){
//        var html=$("html").css("fontSize").replace("px","");
//        $(".start_value").css("transform","scale("+ html/100 +")")
//      }
    }

  }
</script>
<style scoped>
  body{
    background: #F1F1F1;
  }
  .banner{
    width: 3.75rem;
    height: 2.35rem;
    position:relative;
  }
  .big_img img{
    width: 3.75rem;
    height: 2.35rem;
  }
  .banner_title{
    font-size:25px;
    color:#FFFFFF;
    position: absolute;
    top: 0.2rem;
    margin:0 auto;
    width: 100%;
    text-align:center;
  }
  .banner_name{
    font-size:18px;
    color:#FFFFFF;
    width: 100%;
    text-align:center;
    position: absolute;
    top: 0.6rem;
  }

  .banner_rute{
    height: 1.24rem;
    background: #FFFFFF;
    opacity:0.15;
    color:#FFFFFF;
    width: 3.45rem;
    text-align:center;
    position: absolute;
    top: 1rem;
    left:0.15rem;
  }
  .rute_title{
    font-size:14px;
    position:absolute;
    top: 1.1rem;
    width: 100%;
    text-align: center;
    color:white;
  }
  .rute_1{
    font-size:12px;
    width: 100%;
    text-align: center;
    margin-top: 0.08rem;
    max-width: 3.25rem;
    margin-left: 0.25rem;
    line-height: 0.17rem;
  }
  .rute_list{
    width: 100%;
    position:absolute;
    top: 1.3rem;
    color:#ffffff;
  }

  .all_list{
    padding-left: 0.11rem;
    font-size: 0;
  }
  .list{
    display: inline-block;
    vertical-align: top;
    width: 1.72rem;
    margin-right: 0.1rem;
    margin-top: 0.1rem;
    background: white;
  }
  .list_b_img{
    width: 100%;
    height: 2rem;
  }
  .list_b_img img{
    width: 100%;
    height: 2rem;
  }
  .list_bottom{
    height: 1.38rem;
    width: 100%;
    position:relative;
  }
  .list_bottom_complete{
    height: 0.61rem;
    width: 100%;
    position:relative;
  }
  .list_start{
    display: inline-block;
    width: 1.06rem;
    height: 0.2rem;
    border:0.5px solid #FF4A7D;
    border-radius:100px;
    margin-top: 0.02rem;
    margin-left: 0.33rem;
    box-sizing:border-box;
    position: relative;
    text-align: center;
    line-height: 0.2rem;
  }
  .success{
    display: inline-block;
    width: 1.06rem;
    height: 0.2rem;
    margin-top: 0.02rem;
    margin-left: 0.33rem;
    box-sizing:border-box;
    text-align: center;
    line-height: 0.2rem;
  }
  .text{
    width: 1.06rem;
    height: 0.2rem;
    text-align: center;
    line-height: 0.2rem;
    color:#C92800;
    font-size: 0.12rem;
    z-index: 2;
    position:absolute;
  }
  .success img{
    width: 1.06rem;
    height: 0.2rem;
    position: absolute;
  }
  .start{
    width: 0.20rem;
    height: 0.12rem;
    vertical-align: sub;
  }
  .start2{
    width: 0.20rem;
    height: 0.12rem;
    vertical-align: sub;
  }
  .start_value{
    display: inline-block;
    color:#333333;
    font-size:0.12rem;
  }
  .start_value2{
    display: inline-block;
    color:#FFFFFF;
    font-size:0.14rem;
    height: 100%;
  }
  .line{
    height: 0.15rem;
    background: #FF4A7D;
    width: 1px;
    margin-left: 0.86rem;
  }
  .line_suc{
    height: 0.15rem;
    background: #FFD48D;
    width: 1px;
    margin-left: 0.86rem;
  }
  .list_end{
    background-image:url("//pic.davdian.com/free/2017/09/09/bea.png");
    background-size: contain;
    background-repeat: no-repeat;
    width: 1.38rem;
    height: 0.32rem;
    margin-left:0.16rem;
    margin-top: -0.06rem;
    position:relative;
    text-align: center;
    line-height:0.37rem;
  }
  .list_end_complete{
    background-image:url("//pic.davdian.com/free/2017/09/09/bea.png");
    background-size: contain;
    background-repeat: no-repeat;
    width: 1.38rem;
    height: 0.32rem;
    margin-left:0.16rem;
    position:relative;
    text-align: center;
    line-height:0.37rem;
    margin-top: 0.05rem;
  }
  .list_need {
    height: 0.16rem;
    line-height: 0.16rem;
    color: #FF4A7D;
    font-size: 0.11rem;
    margin-top: 0.05rem;
    text-align: center;
  }
  .list_button{
    width: 1.52rem;
    height: 0.28rem;
    border: 1px solid #DDDDDD;
    border-radius:100px;
    margin-left: 0.1rem;
    margin-top: 0.15rem;
  }



  .btn{
    height: 100%;
    margin-left: 0.4rem;
  }
  .btn img{
    width: 0.18rem;
    height: 0.18rem;
    margin-top: 0.05rem;
    margin-right: 0.06rem;
  }
  .btn>span{
    display: inline-block;
    vertical-align: top;
    height: 100%;
    line-height: 0.28rem;
  }
  .gray{
    color:#666666;
    font-size: 12px;
  }
  .red{
    color:#FF4A7D;
    font-size: 12px;
  }




  .mask{
    background: #F1F1F1;
    position: fixed;
    top: 44px;
    left:0;
    right: 0;
    bottom: 0;
  }
  .mask2{
    background: #F1F1F1;
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    bottom: 0;
  }
  .mask_img{
    position: fixed;
    top: 1rem;
    left: 1.28rem;
    width: 1.19rem;
    height: 1.19rem;
  }
  .button{
    display: inline-block;
    width: 1.95rem;
    height: 0.4rem;
    background-image: url("//pic.davdian.com/free/2017/09/16/bg.png");
    background-size: 1.95rem 0.4rem;
    background-repeat: no-repeat;
    line-height: 0.4rem;
    text-align: center;
    position: fixed;
    top: 3.19rem;
    color:#FFFFFF;
    font-size:14px;
    margin-left: 0.9rem;
  }
  .mask_text{
    position: fixed;
    top: 2.49rem;
    width: 100%;
  }
  .mask_text>div{
    text-align: center;
    width: 100%;
    color:#666666;
    font-size: 14px;
    margin-top: 0.05rem;
  }




  @charset "UTF-8";

  /*!
   * animate.css -http://daneden.me/animate
   * Version - 3.5.2
   * Licensed under the MIT license - http://opensource.org/licenses/MIT
   *
   * Copyright (c) 2017 Daniel Eden
   */

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .animated.infinite {
    animation-iteration-count: infinite;
  }

  .animated.hinge {
    animation-duration: 2s;
  }

  .animated.flipOutX,
  .animated.flipOutY,
  .animated.bounceIn,
  .animated.bounceOut {
    animation-duration: .75s;
  }

  @keyframes bounce {
    from, 20%, 53%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transform: translate3d(0,0,0);
    }

    40%, 43% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -30px, 0);
    }

    70% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0,-4px,0);
    }
  }

  .bounce {
    animation-name: bounce;
    transform-origin: center bottom;
  }

  @keyframes flash {
    from, 50%, to {
      opacity: 1;
    }

    25%, 75% {
      opacity: 0;
    }
  }

  .flash {
    animation-name: flash;
  }

  /* originally authored by Nick Pettit - https://github.com/nickpettit/glide */

  @keyframes pulse {
    from {
      transform: scale3d(1, 1, 1);
    }

    50% {
      transform: scale3d(1.05, 1.05, 1.05);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  .pulse {
    animation-name: pulse;
  }

  @keyframes rubberBand {
    from {
      transform: scale3d(1, 1, 1);
    }

    30% {
      transform: scale3d(1.25, 0.75, 1);
    }

    40% {
      transform: scale3d(0.75, 1.25, 1);
    }

    50% {
      transform: scale3d(1.15, 0.85, 1);
    }

    65% {
      transform: scale3d(.95, 1.05, 1);
    }

    75% {
      transform: scale3d(1.05, .95, 1);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  .rubberBand {
    animation-name: rubberBand;
  }

  @keyframes shake {
    from, to {
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      transform: translate3d(-10px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      transform: translate3d(10px, 0, 0);
    }
  }

  .shake {
    animation-name: shake;
  }

  @keyframes headShake {
    0% {
      transform: translateX(0);
    }

    6.5% {
      transform: translateX(-6px) rotateY(-9deg);
    }

    18.5% {
      transform: translateX(5px) rotateY(7deg);
    }

    31.5% {
      transform: translateX(-3px) rotateY(-5deg);
    }

    43.5% {
      transform: translateX(2px) rotateY(3deg);
    }

    50% {
      transform: translateX(0);
    }
  }

  .headShake {
    animation-timing-function: ease-in-out;
    animation-name: headShake;
  }

  @keyframes swing {
    20% {
      transform: rotate3d(0, 0, 1, 15deg);
    }

    40% {
      transform: rotate3d(0, 0, 1, -10deg);
    }

    60% {
      transform: rotate3d(0, 0, 1, 5deg);
    }

    80% {
      transform: rotate3d(0, 0, 1, -5deg);
    }

    to {
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }

  .swing {
    transform-origin: top center;
    animation-name: swing;
  }

  @keyframes tada {
    from {
      transform: scale3d(1, 1, 1);
    }

    10%, 20% {
      transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    }

    30%, 50%, 70%, 90% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%, 60%, 80% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  .tada {
    animation-name: tada;
  }

  /* originally authored by Nick Pettit - https://github.com/nickpettit/glide */

  @keyframes wobble {
    from {
      transform: none;
    }

    15% {
      transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    }

    30% {
      transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    }

    45% {
      transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    }

    60% {
      transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    }

    75% {
      transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    }

    to {
      transform: none;
    }
  }

  .wobble {
    animation-name: wobble;
  }

  @keyframes jello {
    from, 11.1%, to {
      transform: none;
    }

    22.2% {
      transform: skewX(-12.5deg) skewY(-12.5deg);
    }

    33.3% {
      transform: skewX(6.25deg) skewY(6.25deg);
    }

    44.4% {
      transform: skewX(-3.125deg) skewY(-3.125deg);
    }

    55.5% {
      transform: skewX(1.5625deg) skewY(1.5625deg);
    }

    66.6% {
      transform: skewX(-0.78125deg) skewY(-0.78125deg);
    }

    77.7% {
      transform: skewX(0.390625deg) skewY(0.390625deg);
    }

    88.8% {
      transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
    }
  }

  .jello {
    animation-name: jello;
    transform-origin: center;
  }

  @keyframes bounceIn {
    from, 20%, 40%, 60%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    20% {
      transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
      transform: scale3d(.9, .9, .9);
    }

    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
      transform: scale3d(.97, .97, .97);
    }

    to {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }

  .bounceIn {
    animation-name: bounceIn;
  }

  @keyframes bounceInDown {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
      opacity: 0;
      transform: translate3d(0, -3000px, 0);
    }

    60% {
      opacity: 1;
      transform: translate3d(0, 25px, 0);
    }

    75% {
      transform: translate3d(0, -10px, 0);
    }

    90% {
      transform: translate3d(0, 5px, 0);
    }

    to {
      transform: none;
    }
  }

  .bounceInDown {
    animation-name: bounceInDown;
  }

  @keyframes bounceInLeft {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
      opacity: 0;
      transform: translate3d(-3000px, 0, 0);
    }

    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0);
    }

    75% {
      transform: translate3d(-10px, 0, 0);
    }

    90% {
      transform: translate3d(5px, 0, 0);
    }

    to {
      transform: none;
    }
  }

  .bounceInLeft {
    animation-name: bounceInLeft;
  }

  @keyframes bounceInRight {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    from {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }

    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }

    75% {
      transform: translate3d(10px, 0, 0);
    }

    90% {
      transform: translate3d(-5px, 0, 0);
    }

    to {
      transform: none;
    }
  }

  .bounceInRight {
    animation-name: bounceInRight;
  }

  @keyframes bounceInUp {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    from {
      opacity: 0;
      transform: translate3d(0, 3000px, 0);
    }

    60% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }

    75% {
      transform: translate3d(0, 10px, 0);
    }

    90% {
      transform: translate3d(0, -5px, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .bounceInUp {
    animation-name: bounceInUp;
  }

  @keyframes bounceOut {
    20% {
      transform: scale3d(.9, .9, .9);
    }

    50%, 55% {
      opacity: 1;
      transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }
  }

  .bounceOut {
    animation-name: bounceOut;
  }

  @keyframes bounceOutDown {
    20% {
      transform: translate3d(0, 10px, 0);
    }

    40%, 45% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }

    to {
      opacity: 0;
      transform: translate3d(0, 2000px, 0);
    }
  }

  .bounceOutDown {
    animation-name: bounceOutDown;
  }

  @keyframes bounceOutLeft {
    20% {
      opacity: 1;
      transform: translate3d(20px, 0, 0);
    }

    to {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0);
    }
  }

  .bounceOutLeft {
    animation-name: bounceOutLeft;
  }

  @keyframes bounceOutRight {
    20% {
      opacity: 1;
      transform: translate3d(-20px, 0, 0);
    }

    to {
      opacity: 0;
      transform: translate3d(2000px, 0, 0);
    }
  }

  .bounceOutRight {
    animation-name: bounceOutRight;
  }

  @keyframes bounceOutUp {
    20% {
      transform: translate3d(0, -10px, 0);
    }

    40%, 45% {
      opacity: 1;
      transform: translate3d(0, 20px, 0);
    }

    to {
      opacity: 0;
      transform: translate3d(0, -2000px, 0);
    }
  }

  .bounceOutUp {
    animation-name: bounceOutUp;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    animation-name: fadeIn;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInDown {
    animation-name: fadeInDown;
  }

  @keyframes fadeInDownBig {
    from {
      opacity: 0;
      transform: translate3d(0, -2000px, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInDownBig {
    animation-name: fadeInDownBig;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInLeft {
    animation-name: fadeInLeft;
  }

  @keyframes fadeInLeftBig {
    from {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInLeftBig {
    animation-name: fadeInLeftBig;
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInRight {
    animation-name: fadeInRight;
  }

  @keyframes fadeInRightBig {
    from {
      opacity: 0;
      transform: translate3d(2000px, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInRightBig {
    animation-name: fadeInRightBig;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInUp {
    animation-name: fadeInUp;
  }

  @keyframes fadeInUpBig {
    from {
      opacity: 0;
      transform: translate3d(0, 2000px, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInUpBig {
    animation-name: fadeInUpBig;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fadeOut {
    animation-name: fadeOut;
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }

  .fadeOutDown {
    animation-name: fadeOutDown;
  }

  @keyframes fadeOutDownBig {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, 2000px, 0);
    }
  }

  .fadeOutDownBig {
    animation-name: fadeOutDownBig;
  }

  @keyframes fadeOutLeft {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
  }

  .fadeOutLeft {
    animation-name: fadeOutLeft;
  }

  @keyframes fadeOutLeftBig {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0);
    }
  }

  .fadeOutLeftBig {
    animation-name: fadeOutLeftBig;
  }

  @keyframes fadeOutRight {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
  }

  .fadeOutRight {
    animation-name: fadeOutRight;
  }

  @keyframes fadeOutRightBig {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(2000px, 0, 0);
    }
  }

  .fadeOutRightBig {
    animation-name: fadeOutRightBig;
  }

  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
  }

  .fadeOutUp {
    animation-name: fadeOutUp;
  }

  @keyframes fadeOutUpBig {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, -2000px, 0);
    }
  }

  .fadeOutUpBig {
    animation-name: fadeOutUpBig;
  }

  @keyframes flip {
    from {
      transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
      animation-timing-function: ease-out;
    }

    40% {
      transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
      animation-timing-function: ease-out;
    }

    50% {
      transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
      animation-timing-function: ease-in;
    }

    80% {
      transform: perspective(400px) scale3d(.95, .95, .95);
      animation-timing-function: ease-in;
    }

    to {
      transform: perspective(400px);
      animation-timing-function: ease-in;
    }
  }

  .animated.flip {
    -webkit-backface-visibility: visible;
    backface-visibility: visible;
    animation-name: flip;
  }

  @keyframes flipInX {
    from {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      animation-timing-function: ease-in;
    }

    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    to {
      transform: perspective(400px);
    }
  }

  .flipInX {
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    animation-name: flipInX;
  }

  @keyframes flipInY {
    from {
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
      animation-timing-function: ease-in;
    }

    60% {
      transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }

    to {
      transform: perspective(400px);
    }
  }

  .flipInY {
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    animation-name: flipInY;
  }

  @keyframes flipOutX {
    from {
      transform: perspective(400px);
    }

    30% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      opacity: 1;
    }

    to {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      opacity: 0;
    }
  }

  .flipOutX {
    animation-name: flipOutX;
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
  }

  @keyframes flipOutY {
    from {
      transform: perspective(400px);
    }

    30% {
      transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      opacity: 1;
    }

    to {
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      opacity: 0;
    }
  }

  .flipOutY {
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    animation-name: flipOutY;
  }

  @keyframes lightSpeedIn {
    from {
      transform: translate3d(100%, 0, 0) skewX(-30deg);
      opacity: 0;
    }

    60% {
      transform: skewX(20deg);
      opacity: 1;
    }

    80% {
      transform: skewX(-5deg);
      opacity: 1;
    }

    to {
      transform: none;
      opacity: 1;
    }
  }

  .lightSpeedIn {
    animation-name: lightSpeedIn;
    animation-timing-function: ease-out;
  }

  @keyframes lightSpeedOut {
    from {
      opacity: 1;
    }

    to {
      transform: translate3d(100%, 0, 0) skewX(30deg);
      opacity: 0;
    }
  }

  .lightSpeedOut {
    animation-name: lightSpeedOut;
    animation-timing-function: ease-in;
  }

  @keyframes rotateIn {
    from {
      transform-origin: center;
      transform: rotate3d(0, 0, 1, -200deg);
      opacity: 0;
    }

    to {
      transform-origin: center;
      transform: none;
      opacity: 1;
    }
  }

  .rotateIn {
    animation-name: rotateIn;
  }

  @keyframes rotateInDownLeft {
    from {
      transform-origin: left bottom;
      transform: rotate3d(0, 0, 1, -45deg);
      opacity: 0;
    }

    to {
      transform-origin: left bottom;
      transform: none;
      opacity: 1;
    }
  }

  .rotateInDownLeft {
    animation-name: rotateInDownLeft;
  }

  @keyframes rotateInDownRight {
    from {
      transform-origin: right bottom;
      transform: rotate3d(0, 0, 1, 45deg);
      opacity: 0;
    }

    to {
      transform-origin: right bottom;
      transform: none;
      opacity: 1;
    }
  }

  .rotateInDownRight {
    animation-name: rotateInDownRight;
  }

  @keyframes rotateInUpLeft {
    from {
      transform-origin: left bottom;
      transform: rotate3d(0, 0, 1, 45deg);
      opacity: 0;
    }

    to {
      transform-origin: left bottom;
      transform: none;
      opacity: 1;
    }
  }

  .rotateInUpLeft {
    animation-name: rotateInUpLeft;
  }

  @keyframes rotateInUpRight {
    from {
      transform-origin: right bottom;
      transform: rotate3d(0, 0, 1, -90deg);
      opacity: 0;
    }

    to {
      transform-origin: right bottom;
      transform: none;
      opacity: 1;
    }
  }

  .rotateInUpRight {
    animation-name: rotateInUpRight;
  }

  @keyframes rotateOut {
    from {
      transform-origin: center;
      opacity: 1;
    }

    to {
      transform-origin: center;
      transform: rotate3d(0, 0, 1, 200deg);
      opacity: 0;
    }
  }

  .rotateOut {
    animation-name: rotateOut;
  }

  @keyframes rotateOutDownLeft {
    from {
      transform-origin: left bottom;
      opacity: 1;
    }

    to {
      transform-origin: left bottom;
      transform: rotate3d(0, 0, 1, 45deg);
      opacity: 0;
    }
  }

  .rotateOutDownLeft {
    animation-name: rotateOutDownLeft;
  }

  @keyframes rotateOutDownRight {
    from {
      transform-origin: right bottom;
      opacity: 1;
    }

    to {
      transform-origin: right bottom;
      transform: rotate3d(0, 0, 1, -45deg);
      opacity: 0;
    }
  }

  .rotateOutDownRight {
    animation-name: rotateOutDownRight;
  }

  @keyframes rotateOutUpLeft {
    from {
      transform-origin: left bottom;
      opacity: 1;
    }

    to {
      transform-origin: left bottom;
      transform: rotate3d(0, 0, 1, -45deg);
      opacity: 0;
    }
  }

  .rotateOutUpLeft {
    animation-name: rotateOutUpLeft;
  }

  @keyframes rotateOutUpRight {
    from {
      transform-origin: right bottom;
      opacity: 1;
    }

    to {
      transform-origin: right bottom;
      transform: rotate3d(0, 0, 1, 90deg);
      opacity: 0;
    }
  }

  .rotateOutUpRight {
    animation-name: rotateOutUpRight;
  }

  @keyframes hinge {
    0% {
      transform-origin: top left;
      animation-timing-function: ease-in-out;
    }

    20%, 60% {
      transform: rotate3d(0, 0, 1, 80deg);
      transform-origin: top left;
      animation-timing-function: ease-in-out;
    }

    40%, 80% {
      transform: rotate3d(0, 0, 1, 60deg);
      transform-origin: top left;
      animation-timing-function: ease-in-out;
      opacity: 1;
    }

    to {
      transform: translate3d(0, 700px, 0);
      opacity: 0;
    }
  }

  .hinge {
    animation-name: hinge;
  }

  @keyframes jackInTheBox {
    from {
      opacity: 0;
      transform: scale(0.1) rotate(30deg);
      transform-origin: center bottom;
    }

    50% {
      transform: rotate(-10deg);
    }

    70% {
      transform: rotate(3deg);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .jackInTheBox {
    animation-name: jackInTheBox;
  }

  /* originally authored by Nick Pettit - https://github.com/nickpettit/glide */

  @keyframes rollIn {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .rollIn {
    animation-name: rollIn;
  }

  /* originally authored by Nick Pettit - https://github.com/nickpettit/glide */

  @keyframes rollOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
    }
  }

  .rollOut {
    animation-name: rollOut;
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    50% {
      opacity: 1;
    }
  }

  .zoomIn {
    animation-name: zoomIn;
  }

  @keyframes zoomInDown {
    from {
      opacity: 0;
      transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
      animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }

    60% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
  }

  .zoomInDown {
    animation-name: zoomInDown;
  }

  @keyframes zoomInLeft {
    from {
      opacity: 0;
      transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);
      animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }

    60% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
  }

  .zoomInLeft {
    animation-name: zoomInLeft;
  }

  @keyframes zoomInRight {
    from {
      opacity: 0;
      transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);
      animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }

    60% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
  }

  .zoomInRight {
    animation-name: zoomInRight;
  }

  @keyframes zoomInUp {
    from {
      opacity: 0;
      transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
      animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }

    60% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
  }

  .zoomInUp {
    animation-name: zoomInUp;
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    to {
      opacity: 0;
    }
  }

  .zoomOut {
    animation-name: zoomOut;
  }

  @keyframes zoomOutDown {
    40% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
      animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }

    to {
      opacity: 0;
      transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);
      transform-origin: center bottom;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
  }

  .zoomOutDown {
    animation-name: zoomOutDown;
  }

  @keyframes zoomOutLeft {
    40% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);
    }

    to {
      opacity: 0;
      transform: scale(.1) translate3d(-2000px, 0, 0);
      transform-origin: left center;
    }
  }

  .zoomOutLeft {
    animation-name: zoomOutLeft;
  }

  @keyframes zoomOutRight {
    40% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);
    }

    to {
      opacity: 0;
      transform: scale(.1) translate3d(2000px, 0, 0);
      transform-origin: right center;
    }
  }

  .zoomOutRight {
    animation-name: zoomOutRight;
  }

  @keyframes zoomOutUp {
    40% {
      opacity: 1;
      transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
      animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }

    to {
      opacity: 0;
      transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);
      transform-origin: center bottom;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
  }

  .zoomOutUp {
    animation-name: zoomOutUp;
  }

  @keyframes slideInDown {
    from {
      transform: translate3d(0, -100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInDown {
    animation-name: slideInDown;
  }

  @keyframes slideInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInLeft {
    animation-name: slideInLeft;
  }

  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInRight {
    animation-name: slideInRight;
  }

  @keyframes slideInUp {
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInUp {
    animation-name: slideInUp;
  }

  @keyframes slideOutDown {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      transform: translate3d(0, 100%, 0);
    }
  }

  .slideOutDown {
    animation-name: slideOutDown;
  }

  @keyframes slideOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      transform: translate3d(-100%, 0, 0);
    }
  }

  .slideOutLeft {
    animation-name: slideOutLeft;
  }

  @keyframes slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      transform: translate3d(100%, 0, 0);
    }
  }

  .slideOutRight {
    animation-name: slideOutRight;
  }

  @keyframes slideOutUp {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      transform: translate3d(0, -100%, 0);
    }
  }

  .slideOutUp {
    animation-name: slideOutUp;
  }

</style>
