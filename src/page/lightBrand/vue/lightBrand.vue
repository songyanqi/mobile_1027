<template>
  <div>
    <template v-if="isShow==1">
      <div class="banner">
        <div class="big_img"><img src="//pic.davdian.com/free/2017/09/09/banner.png" alt=""></div>
        <div class="banner_title">2017最受欢迎的TOP品牌</div>
        <div class="banner_name">点亮品牌 10.18 优惠由你定</div>
        <div class="banner_r">
          <div class="banner_rute"></div>
          <div class="banner_rute2"></div>
        </div>
        <div class="rute_title">点亮规则</div>
        <div class="rute_list">
          <div class="rute_1">1. 10.18周年庆期间(10.18-10.22),为了回馈我们的妈妈们,品牌活动优惠力度由大家点亮来决定。</div>
          <div class="rute_1">2. 每个品牌都设定了最高优惠的指定点亮人数,达到最高人数即可享最高优惠。</div>
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

            <div class="list_need" v-if="item.isCompleted==-1">还需<span v-text="remainLight[index]"></span>人点亮</div>
            <div class="list_need" v-if="item.isCompleted==1">已有<span v-text="haveCount[index]"></span>人点亮</div>


            <div class="list_margin" v-if="isLighted[index]!=1" @click.stop="light(item.bandId,index,item.isCompleted)">
              <div class="list_border"></div>
              <div class="list_button">
                <div class="btn" >
                  <span><img :class="{'animated':animateArr[index]==1,'bounceIn':animateArr[index]==1}" src="//pic.davdian.com/free/2017/09/19/gray.png" alt=""></span>
                  <span class="gray">我要点亮</span>
                </div>
              </div>
            </div>
            <div class="list_margin" v-if="isLighted[index]==1">
              <div class="list_border" :style="{'border':'0.5px solid #FF4A7D'}"></div>
              <div class="list_button">
                <div class="btn">
                  <span><img :class="{'animated':animateArr[index]==1,'bounceIn':animateArr[index]==1}" src="//pic.davdian.com/free/2017/09/20/red.png" alt=""></span>
                  <span class="red">我已点亮</span>
                </div>
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
          haveCount:[],
          isApp:util.utils.isApp(),
          animateArr:[],
          appVersion:util.utils.getAppVersion_new()
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
          that.remainLight.push(item.remainLight);
        });
        data.map(function (item) {
          that.haveCount.push(item.lightNum);
        });
      },
      changeNeedCount(index,isCompleted){
        if(isCompleted==-1){
          if(this.remainLight[index]>0){
            Vue.set(this.remainLight,index,this.remainLight[index]-1);
          }
        }else if(isCompleted==1){
          Vue.set(this.haveCount,index,this.haveCount[index]+1);
        }
      },
      changeIsLighted(index){
          Vue.set(this.isLighted,index,1);
          //变异方法
      },
      changeAnimateFn(index){
        Vue.set(this.animateArr,index,1);
        //变异方法
      },
      light(bandId,index,isCompleted){
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
                  that.changeNeedCount(index,isCompleted);
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
//          dialog.alert(e);
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
  @import '../css/animate.scss';
  body{
    background: #F1F1F1;
  }
  .banner{
    width: 3.75rem;
    height: 2.75rem;
    position:relative;
  }
  .big_img img{
    width: 3.75rem;
    height: 2.75rem;
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
    height: 1.24rem;
    width: 3.45rem;
    position: absolute;
    top: 1rem;
    left:0.15rem;
  }
  .banner_rute{
    height: 1.24rem;
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
    height: 2.48rem;
    width: 6.89rem;
    position: absolute;
    top: -0.63rem;
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
    border: 1px solid #DDDDDD;
    border-radius:200px;
    top: -0.14rem;
    left: -0.76rem;
    transform: scale(0.5);
    box-sizing: border-box;
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

</style>
