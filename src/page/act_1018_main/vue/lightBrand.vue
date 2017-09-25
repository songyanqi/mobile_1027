<template>
  <div>
    <div class="banner">
      <div class="big_img"><img v-lazy="'//pic.davdian.com/free/2017/09/09/banner.png'"></div>
      <div class="banner_title">2017最受欢迎的TOP品牌</div>
      <div class="banner_name">点亮品牌 10.18 优惠由你定</div>
      <div class="banner_r">
        <div class="banner_rute"></div>
        <div class="banner_rute2"></div>
      </div>
      <div class="rute_list">
        <div class="rute_1">每个品牌都设定了最高优惠力度和目标点亮人数，达到目标点亮人数的品牌将在10.18周年庆期间享最高优惠力度</div>
      </div>
    </div>
    <div class="all_list">
      <div class="list" v-for="(item,index) in response"  :class="{'light':item.isCompleted==1}" @click="go_detail(item.linkUrl)">
        <div class="list_b_img">
          <img v-lazy="item.bandPic">
        </div>

        <div class="list_bottom" v-if="item.hotDay==-1">

          <template v-if="item.isCompleted!=1">
            <div class="list_start_border"></div>
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

          <div class="list_need" v-if="item.isCompleted==-1">还需<span v-text="need[index]"></span>人点亮</div>
          <div class="list_need" v-if="item.isCompleted==1">已有<span v-text="haveCount[index]"></span>人点亮</div>

          <div class="list_margin" v-if="lightArr[index]!=1" @click.stop="light(item.bandId,index,item.isCompleted)">
            <div class="list_border"></div>
            <div class="list_button">
              <div class="btn" >
                <span><img :class="{'animated':animateArr[index]==1,'bounceIn':animateArr[index]==1}" :style="{'transition-duration':'10s'}" v-lazy="'//pic.davdian.com/free/2017/09/20/red2.png'"></span>
                <span class="gray">我要点亮</span>
              </div>
            </div>
          </div>
          <div class="list_margin" v-if="lightArr[index]==1">
            <div class="list_border" :style="{'background':'#FF6F97'}"></div>
            <div class="list_button">
              <div class="btn">
                <span><img :class="{'animated':animateArr[index]==1,'bounceIn':animateArr[index]==1}" :style="{'transition-duration':'10s'}" v-lazy="'//pic.davdian.com/free/2017/09/20/new.png'"></span>
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
  import login from "../../../../src/common/js/module/login.js"
  export default{
    props:["currentDate","response"],
    data(){
      return {
        lightArr:this.returnLight(),
        need:this.returnCount(),
        isApp:util.utils.isApp(),
        animateArr:[],
        isLighted:[],
        haveCount:this.returnHaveCount()
      }
    },
    computed:{

    },
    mounted(){

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
            return 3
          }
        }
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
      returnHaveCount(){
        var arr=[];
        this.response.map(function (item,index) {
          arr.push(item.isCompleted);
        });
        return arr;
      },
      changeIsLighted(index){
        Vue.set(this.lightArr,index,1);
        //变异方法
      },
      changeNeedCount(index,isCompleted){
        if(isCompleted==-1){
          if(this.need[index]>0){
            Vue.set(this.need,index,this.need[index]-1);
          }
        }else if(isCompleted==1){
          Vue.set(this.haveCount,index,this.haveCount[index]+1);
        }
        //变异方法
      },
      changeAnimateFn(index){
        Vue.set(this.animateArr,index,1);
        //变异方法
      },
      light(bandId,index,isCompleted){
        var that = this;
        if(this.getStaus()==0){
          if (that.isApp) {
            native.Account.login()
          } else {
            window.location.href = '/login.html?' + 'referer=' + encodeURIComponent(window.location.href)
          }
        }else {
          setTimeout(function () {
            that.changeNeedCount(index, isCompleted);
          },600);
          that.changeAnimateFn(index);
          that.changeIsLighted(index);
          var obj = {
            "bandId": bandId
          };
          api("/api/mg/sale/bandLitUp/lightUp", obj)
            .then(function (result) {
              if (result.code == 0) {
                if (result.data.success == 1) {

                } else {
                  if (result.data.msg) {
                    dialog.alert('code:' + result.code + ":msg" + result.data.msg);
                  } else {
                    dialog.alert('code:' + result.code);
                  }
                }
              } else {
                if (result.code == 30000) {

                } else {
                  if (result.data.msg) {
                    dialog.alert('code:' + result.code + ":msg" + result.data.msg);
                  } else {
                    dialog.alert('code:' + result.code);
                  }
                }
              }

              // 清缓存
              localStorage.removeItem('act_1018_mine_data');
              localStorage.removeItem('act_1018_main_data');
              console.log('本地缓存act_1018_main_data、act_1018_mine_data已清除。');
            })
            .catch(function (e) {
            })
        }
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
    height: 2rem;
    position:relative;
  }
  .big_img img{
    width: 3.75rem;
    height: 2rem;
  }
  .banner_title{
    font-size:25px;
    color:#FFFFFF;
    position: absolute;
    top: 0.2rem;
    margin:0 auto;
    width: 100%;
    text-align:center;
    font-weight: 500;
  }
  .banner_name{
    font-size:18px;
    color:#FFFFFF;
    width: 100%;
    text-align:center;
    position: absolute;
    top: 0.6rem;
  }

  .banner_r{
    height: 0.6rem;
    width: 3.45rem;
    position: absolute;
    top: 1rem;
    left:0.15rem;
  }
  .banner_rute{
    height: 0.6rem;
    background: #FFFFFF;
    opacity:0.15;
    color:#FFFFFF;
    width: 3.45rem;
    text-align:center;
    position: absolute;
    border-radius: 4px;
    top: 0;
    left:0;
  }
  .banner_rute2{
    height: 1.2rem;
    width: 6.89rem;
    position: absolute;
    top: -0.3rem;
    left:-1.735rem;
    border-radius: 8px;
    border:1px solid rgba(255,255,255,0.2);
    transform: scale(0.5);
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
    margin-top: 0.13rem;
    max-width: 3.25rem;
    margin-left: 0.25rem;
    line-height: 0.17rem;
  }
  .rute_list{
    width: 100%;
    position:absolute;
    top: 1rem;
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
    border-radius: 6px;
  }
  .list_b_img{
    width: 100%;
    border-radius: 6px;
    height: 2rem;
  }
  .list_b_img img{
    width: 100%;
    height: 2rem;
    border-radius: 6px;
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
    margin-top: 0.02rem;
    margin-left: 0.33rem;
    box-sizing:border-box;
    position: relative;
    text-align: center;
    line-height: 0.2rem;
  }
  .list_start_border{
    display: inline-block;
    width: 2.12rem;
    height: 0.4rem;
    border:1px solid #FF4A7D;
    border-radius:200px;
    box-sizing:border-box;
    position: absolute;
    top: -0.08rem;
    left: -0.2rem;
    transform: scale(0.5);
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
    margin-right: 0.05rem;
  }
  .start2{
    width: 0.20rem;
    height: 0.12rem;
    vertical-align: sub;
    margin-right: 0.05rem;
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
    border: 1px solid #FF4A7D;
    border-radius:200px;
    top: -0.14rem;
    left: -0.76rem;
    box-sizing: border-box;
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
    margin-top: 0.04rem;
    margin-right: 0.06rem;
  }
  .btn>span{
    display: inline-block;
    vertical-align: top;
    height: 100%;
    line-height: 0.28rem;
  }
  .gray{
    color:#FF4A7D;
    font-size: 12px;
  }
  .red{
    color:#FFFFFF;
    font-size: 12px;
  }
  .light{
    background-size: 100% 100%;
    background-image: url("http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2017/09/20/%E6%94%BE%E5%B0%84%E5%85%89.png");
  }
</style>
