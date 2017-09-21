<template>
  <div>
    <div class="banner">
      <div class="big_img"><img v-lazy="'//pic.davdian.com/free/2017/09/09/banner.png'"></div>
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
      <div class="list" v-for="(item,index) in response">
        <div class="list_b_img" @click.stop="go_detail(item.linkUrl)">
          <img v-lazy="item.bandPic">
        </div>

        <div class="list_bottom" v-if="item.hotDay==-1">

          <template v-if="item.isCompleted!=1">
            <div class="list_start">
              <img class="start" v-lazy="'//pic.davdian.com/free/2017/09/09/start_icon.png'">
              <span class="start_value" v-text="item.lowDiscount"></span>
            </div>
            <div class="line"></div>
          </template>

          <template v-if="item.isCompleted==1">
            <div class="success">
              <div style="position: absolute;">
                <img v-lazy="'//pic.davdian.com/free/2017/09/09/com.png'">
              </div>
              <div class="text">目标达成</div>
            </div>
            <div class="line_suc"></div>
          </template>

          <div class="list_end">
            <img class="start2" v-lazy="'//pic.davdian.com/free/2017/09/09/end_icon.png'">
            <span class="start_value2" v-text="item.highDiscount"></span>
          </div>

          <div class="list_need">还需<span v-text="need[index]"></span>人点亮</div>

          <div class="list_margin" v-if="lightArr[index]!=1" @click.stop="light(item.bandId,index,$event)">
            <div class="list_border"></div>
            <div class="list_button">
              <div class="btn" >
                <span><img :class="{'animated':animateArr[index]==1,'bounceIn':animateArr[index]==1}" v-lazy="'//pic.davdian.com/free/2017/09/19/gray.png'"></span>
                <span class="gray">我要点亮</span>
              </div>
            </div>
          </div>
          <div class="list_margin" v-if="lightArr[index]==1">
            <div class="list_border" :style="{'border':'0.5px solid #FF4A7D'}"></div>
            <div class="list_button">
              <div class="btn">
                <span><img :class="{'animated':animateArr[index]==1,'bounceIn':animateArr[index]==1}" v-lazy="'//pic.davdian.com/free/2017/09/20/red.png'"></span>
                <span class="red">我已点亮</span>
              </div>
            </div>
          </div>

        </div>

        <div class="list_bottom_complete" v-if="item.hotDay==1">
          <div class="list_end_complete">
            <img class="start2" v-lazy="'//pic.davdian.com/free/2017/09/09/end_icon.png'">
            <span class="start_value2" v-text="item.finalDiscount"></span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import api from "../../../../utils/api.es6"
  import dialog from "../../../../utils/dialog.es6"
  import native from '../../../../src/common/js/module/native.js'
  import util from "../../../../utils/utils.es6"
  export default{
    props:["currentDate","response"],
    data(){
      return {
        lightArr:this.returnLight(),
        need:this.returnCount(),
        isApp:util.utils.isApp(),
        animateArr:[],
        isLighted:[]
      }
    },
    computed:{

    },
    mounted(){

    },
    methods:{
      go_detail(linkUrl){
        if(this.isApp){
          native.Browser.open({
            url: linkUrl
          })
        }else{
          window.location.href=linkUrl;
        }
      },
      returnLight(){
        var arr=[];
        this.response.map(function (item,index) {
          arr.push(item.isLighted);
        });
        return arr;
      },
      returnCount(){
        var arr=[];
        this.response.map(function (item,index) {
          arr.push(item.remainLight);
        });
        return arr;
      },
      changeIsLighted(index){
        Vue.set(this.lightArr,index,1);
        //变异方法
      },
      changeNeedCount(index){
        if(this.need[index]>0){
          Vue.set(this.need,index,this.need[index]-1);
        }
        //变异方法
      },
      changeAnimateFn(index){
        Vue.set(this.animateArr,index,1);
        //变异方法
      },
      light(bandId,index){
        var that=this;
        var obj={
            "bandId":bandId
        };
        api("/api/mg/sale/bandLitUp/lightUp",obj)
          .then(function (result) {
            if(result.code==0){
              if(result.data.success==1){
                that.changeAnimateFn(index);
                setTimeout(function(){
                  that.changeIsLighted(index);
                },100);
                setTimeout(function(){
                  that.changeNeedCount(index);
                },600);
              }else{
                if(result.data.msg){
                  dialog.alert('code:'+result.code+":msg"+result.data.msg);
                }else{
                  dialog.alert('code:'+result.code);
                }
              }
            }else{
              if(result.code==30000){
                if (that.isApp){
                  native.Account.login()
                }else {
                  window.location.href = '/login.html?'+'referer=' + encodeURIComponent(window.location.href)
                }
              }else{
                if(result.data.msg){
                  dialog.alert('code:'+result.code+":msg"+result.data.msg);
                }else{
                  dialog.alert('code:'+result.code);
                }
              }
            }
          })
          .catch(function (e) {
          })
       }
//      autoFontSize(){
//        var html=$("html").css("fontSize").replace("px","");
//        $(".start_value").css("transform","scale("+ html/100 +")")
//      }
    }

  }
</script>

<style scoped>
  @import "../css/animate.scss";
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
    top: 0;
    left: 0;
    position: absolute;
  }
  .list_border{
    width: 3.04rem;
    height: 0.56rem;
    position: absolute;
    border: 1px solid #DDDDDD;
    border-radius:200px;
    top: -0.14rem;
    left: -0.76rem;
    transform: scale(0.5);
  }
  .list_margin{
    width: 1.52rem;
    height: 0.28rem;
    margin-left: 0.1rem;
    margin-top: 0.15rem;
    position: relative;
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
</style>
