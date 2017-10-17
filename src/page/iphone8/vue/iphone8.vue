<template>
  <div class="background">
    <div class="text" style="top: 1.87rem;">10月18日当天</div>
    <div class="text" style="top: 2.1rem;">妈妈顾问服务人群销售额满<span v-text="awardMoney"></span>元</div>
    <div class="text" style="top: 2.36rem;">妈妈顾问赢iPhone8一部</div>
    <div class="text" style="top: 2.61rem;">仅<span v-text="allCount"></span>个名额，先到先得</div>
    <!--未登录-->
    <template v-if="!isLogin">
      <div class="nologin" style="top: 3.73rem;">还未登录哦</div>
      <div class="btnLogin" @click="login"></div>
    </template>
    <!--不是妈妈顾问-->
    <template v-if="isLogin">
      <template v-if="isAdviser==0">
        <div class="nologin" style="top: 3.6rem;">您还不是妈妈顾问哦</div>
        <div class="nologin" style="top: 3.85rem;">成为妈妈顾问才可以参与此活动哦</div>
        <div class="btn2" @click="beMother"></div>
      </template>
      <!--妈妈顾问-->
      <template v-if="isAdviser==1">

        <template v-if="isHotDay==1">
          <!--有名额，没获得iphone8-->
          <template v-if="getAward==0 && remainCount>0">
            <div class="nologin" style="top: 3.18rem;">仅剩<span v-text="remainCount" style="font-size: 0.3rem;"></span>个名额</div>
            <div class="nologin" style="top: 3.55rem;">当前顾问服务人群销售额:<span v-text="sales" style="font-size: 0.3rem;"></span>元</div>
            <div class="nologin" style="top: 3.9rem;">还差<span v-text="awardMoney-sales" style="font-size: 0.3rem;"></span>元达到<span v-text="awardMoney"></span>元</div>
            <div class="nologin" style="top: 4.24rem;">即可赢得iPhone8</div>
            <div class="btn3" @click="goActMain"></div>
          </template>

          <!--有名额，获得iphone8-->
          <template v-if="getAward==1 && remainCount>0">
            <div class="nologin" style="top: 3.18rem;">仅剩<span v-text="remainCount" style="font-size: 0.3rem;"></span>个名额</div>
            <div class="nologin" style="top: 3.55rem;">当前顾问服务人群销售额:<span v-text="sales" style="font-size: 0.3rem;"></span>元</div>
            <div class="nologin" style="top: 4rem;">恭喜，您已获得iPhone8一部</div>
            <div class="nologin" style="top: 4.24rem;font-size: 0.1rem;">11月18日有工作人员联系您,请保持手机畅通</div>
            <div class="btn3" @click="goActMain"></div>
          </template>

          <!--没名额了-->
          <template v-if="remainCount==0">
            <div class="nologin" style="top: 3.4rem;">没有名额啦</div>
            <div class="nologin" style="top: 3.6rem;">当前顾问服务人群销售额:<span v-text="sales" style="font-size: 0.3rem;"></span>元</div>
            <div class="nologin" style="top: 4rem;">没有名额啦，很遗憾您错过了这次活动</div>
            <div class="btn" @click="goActMain"></div>
          </template>
        </template>

        <template v-if="isHotDay==0">
          <!--活动结束获得了-->
          <template v-if="remainCount>0 && sales>=awardMoney">
            <div class="nologin" style="top: 3.3rem;">活动结束啦</div>
            <div class="nologin" style="top: 3.55rem;">当前顾问服务人群销售额:<span v-text="sales" style="font-size: 0.3rem;"></span>元</div>
            <div class="nologin" style="top: 4rem;">恭喜，您已获得iPhone8一部</div>
            <div class="nologin" style="top: 4.24rem;font-size: 0.1rem;color:#a68d41;">11月18日有工作人员联系您，请保持手机畅通</div>
          </template>

          <!--活动结束没获得-->
          <template v-if="remainCount<0 || sales<awardMoney">
            <div class="nologin" style="top: 3.6rem;">活动结束啦</div>
            <div class="nologin" style="top: 3.8rem;">很遗憾您错过了这次活动</div>
            <div class="btn" @click="goActMain"></div>
          </template>

        </template>

        <div style="height: 5.64rem;"></div>
        <div class="list">
          <div class="bg"></div>
          <div class="title">获iPhone8名单</div>
          <div class="item" v-for="(item,index) in awardList">
            <div><img :src="item.avatar" alt=""></div>
            <div class="time">
              <div v-text="item.userName"></div>
              <div class="timeStamp"><span v-text="item.awardTime"></span></div>
            </div>
            <div class="number" style="position: absolute;right: 0;">第<span v-text="index+1"></span>位获奖</div>
          </div>
          <div class="title" v-if="awardList[0]==null" style="font-size: 0.12rem;">还没有人获奖哦</div>
        </div>

      </template>
    </template>



    <div class="rute" :class="{'class1':isAdviser==1 ? true : false}">
      <div style="margin-top: 0;text-align: center;">活动规则</div>
      <div>1.活动时间：2017.10.18 00:00:00-2017.10.18 23:59:59；</div>
      <div>2.仅妈妈顾问才可以参与该活动；</div>
      <div>3.妈妈顾问的服务人群包括服务的会员与非会员；</div>
      <div>4.销售额统计方法：服务人群实际支付金额+使用返现部分；</div>
      <div>5.换货等原因导致服务人群销售额不足10万，视为会员主动放弃该活动；</div>
      <div>6.本活动仅有<span v-text="allCount"></span>个名额，最先完成10万销售额的妈妈顾问获得，名单会公布在【我的10.18】中,获奖名单更新有五分钟的延时；</div>
      <div>7.获得iPhone8奖励的妈妈顾问，11月18日会有工作人员通过手机号联系您，请保持手机畅通，无法拨通电话视为放弃；</div>
      <div>8.支付会员费用不参与该活动；</div>
      <div>9.详情可咨询大V店客服。</div>
    </div>
  </div>
</template>
<script>
  import api from "../../../../utils/api.es6"
  import dialog from "../../../../utils/dialog.es6"
  import login from "../../../../src/common/js/module/login.js"
  import util from "../../../../utils/utils.es6"
  import native from "../../../../src/common/js/module/native.js"
  import share from "../../../../src/common/js/module/share.js"
  import common from "../../../../src/common/js/common.js"
  export default{
    data(){
        return {
            allCount:null,
            remainCount:null,
            awardMoney:null,
            sales:null,
            isAdviser:null,
            isHotDay:-1,
            awardList:[],
            isApp:util.utils.isApp(),
            isLogin:null,
            getAward:null
        }
    },
    mounted(){
        native.Browser.setHead({
        'title': document.title,
          shareBtn:"1"
        });
        share.setShareInfo({
          title: "大V店周年庆，妈妈顾问赢IPhone 8",
          desc: "妈妈顾问服务人群销售额达到10万，有机会获得IPhone 8一部，仅此一天哦~",
          link: window.location.href,
          imgUrl: "//pic.davdian.com/free/2017/10/11/%E8%B5%A2iphone8%E5%88%86%E4%BA%ABicon.jpg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp"
        });
        this.init();
        this.$nextTick(function () {

        })
    },
    methods:{
      beMother(){
        if(this.isApp){
          native.Browser.open({
            url: "//s.davdian.com/index.php?m=admin&c=station&a=advisor"
          })
        }else{
          window.location.href="//s.davdian.com/index.php?m=admin&c=station&a=advisor";
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
      },
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
            var obj={
              'awardType':'iphone8'
            };
            api("/api/mg/user/adviser/activityAward",obj)
              .then(function (result) {
                common.checkRedirect(result)
                if(result.code==0){
                  if(result.data){
                    that.allCount=result.data.awardCount;
                    that.remainCount=result.data.remainCount;
                    that.awardMoney=result.data.awardMoney;
                    that.sales=result.data.sales;
                    that.isAdviser=result.data.isAdviser;
                    that.getAward=result.data.getAward;
                    var now = new Date().getTime().toString().substr(0,10);
                    var startTime = result.data.startTime;
                    var endTime = result.data.endTime;
                    if (parseInt(startTime) <= parseInt(now) && parseInt(endTime) > parseInt(now)) {
                      that.isHotDay=1;
                    }else{
                      that.isHotDay=0;
                    }
                    that.awardList=result.data.awardList;
                  }
                }else{
                  if(result.data.msg){
                    dialog.alert('code:'+result.code+":msg"+result.data.msg);
                  }else{
                    dialog.alert('code:'+result.code);
                  }
                }
              })
              .catch(function (e) {

              })


//            var data=require("../json/iphone8.json");
//            this.allCount=data.data.awardCount;
//            this.remainCount=data.data.remainCount;
//            this.awardMoney=data.data.awardMoney;
//            this.sales=data.data.sales;
//            this.isAdviser=data.data.isAdviser;
//            var now = new Date().getTime().toString().substr(0,11);
//            var startTime = data.data.startTime;
//            var endTime = data.data.endTime;
//            if (parseInt(startTime) <= parseInt(now) && parseInt(endTime) > parseInt(now)) {
//              this.isHotDay=0;
//            }else{
//              this.isHotDay=1;
//            }
//            this.awardList=data.data.awardList;
          }

      }
    }
  }
</script>
<style scoped>
  .background{
    position: relative;
    width: 3.75rem;
    /*height: 12.96rem;*/
    background-image:url('//pic.davdian.com/free/2017/10/16/bg_new.jpg');
    background-size: 3.75rem 12.96rem;
    background-repeat: no-repeat;
  }
  .text{
    position: absolute;
    font-size: 0.14rem;
    color:#ffffff;
    width: 100%;
    text-align: center;
  }
  .nologin{
    position: absolute;
    font-size: 0.14rem;
    color:#ff4a7d;
    width: 100%;
    text-align: center;
  }
  .btnLogin{
    position: absolute;
    display: inline-block;
    top: 4.89rem;
    left: 0.6rem;
    width: 2.53rem;
    height: 0.75rem;
    background-size: 2.53rem 0.75rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/%E7%AB%8B%E5%8D%B3%E7%99%BB%E5%BD%95_3x.png');
  }
  .btn{
    position: absolute;
    display: inline-block;
    top: 4.89rem;
    left: 0.6rem;
    width: 2.53rem;
    height: 0.75rem;
    z-index: 2;
    background-size: 2.53rem 0.75rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/%E6%9F%A5%E7%9C%8B%E6%9B%B4%E5%A4%9A%E6%B4%BB%E5%8A%A8_3x.png');
  }
  .btn2{
    position: absolute;
    display: inline-block;
    top: 4.89rem;
    left: 0.6rem;
    width: 2.53rem;
    height: 0.75rem;
    background-size: 2.53rem 0.75rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/%E5%A6%82%E4%BD%95%E6%88%90%E4%B8%BA%E5%A6%88%E5%A6%88%E9%A1%BE%E9%97%AE_3x.png');
  }
  .btn3{
    position: absolute;
    display: inline-block;
    top: 4.89rem;
    z-index: 2;
    left: 0.6rem;
    width: 2.53rem;
    height: 0.75rem;
    background-size: 2.53rem 0.75rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/%E5%BC%80%E5%90%AF%E4%B9%B0%E4%B9%B0%E4%B9%B0%E4%B9%8B%E6%97%85_3x.png');
  }
  .rute{
    /*position: absolute;*/
    width: 3.18rem;
    display: inline-block;
    margin-left: 0.27rem;
    margin-bottom: 0.2rem;
    margin-top: 5.65rem;
  }
  .class1{
    margin-top: 0;
  }
  .rute>div{
    color:#ffffff;
    font-size: 0.12rem;
    line-height: 0.15rem;
  }
  .list{
    position: relative;
    width: 3.18rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
    padding-bottom: 0.01rem;
    margin: 0 auto;
    margin-bottom: 0.186rem;
  }
  .bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffeade;
    opacity: 0.75;
  }
  .title{
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
    color:#ffffff;
    font-size: 0.14rem;
  }
  .item{
    height: 0.36rem;
    margin-bottom: 0.186rem;
    font-size: 0;
    position: relative;
    width: 2.78rem;
  }
  .item>div{
    display: inline-block;
    vertical-align: top;
    color:#ffffff;
    font-size: 0.14rem;
    height: 0.36rem;
  }
  .item .number{
    line-height: 0.36rem;
  }

  .item img{
    width: 0.36rem;
    height: 0.36rem;
    border-radius: 50%;
    margin-right: 0.07rem;
  }
  .time>div{
    height:50%;
    line-height: 0.18rem;
  }

  .timeStamp{
    font-size: 0.11rem;
  }
</style>
