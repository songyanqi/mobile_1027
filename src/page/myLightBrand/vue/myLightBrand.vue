<template>
  <div>
    <div class="all_list">
      <div class="list" v-for="(item,index) in dataList">
        <div class="list_b_img" @click.stop="go_detail(item.linkUrl)">
          <img :src="item.bandPic" alt="">
        </div>

        <div class="list_bottom" v-if="item.hotDay==-1">

          <template v-if="item.isCompleted!=1">
            <div class="list_start_border"></div>
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
          <div class="list_need" v-if="item.isCompleted==1">已有<span v-text="item.lightNum"></span>人点亮</div>


          <div class="list_margin">
            <div class="list_border" :style="{'background':'#FF6F97'}"></div>
            <div class="list_button">
              <div class="btn">
                <span><img src="//pic.davdian.com/free/2017/09/20/new.png" alt=""></span>
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
        isShow:-1,
        remainLight:[],
        isApp:util.utils.isApp()
      }
    },
    mounted(){
      var that=this;
      api("/api/mg/sale/bandLitUp/getMyBands")
        .then(function (result) {
            if(result.code==0){
              if(result.data){
                that.dataList=result.data;
                that.isShow=result.data.isShow;
                that.initIsLighted(that.dataList);
                that.initNeedCount(that.dataList);
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
            console.log(result.data);
        })
        .catch(function (e) {

        })
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
      },
      changeIsLighted(index){
        console.log(index);
        Vue.set(this.isLighted,index,1);
        //变异方法
      },
      changeNeedCount(index){
        if(this.remainLight[index]>0){
          Vue.set(this.remainLight,index,this.remainLight[index]-1);
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
    height: 0.87rem;
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
    margin-top: 0.05rem;
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
    border: 1px solid #DDDDDD;
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
    margin-top: 0.05rem;
    margin-right: 0.06rem;
  }
  .btn>span{
    display: inline-block;
    vertical-align: top;
    height: 100%;
    line-height: 0.28rem;
  }
  .red{
    color:#FFFFFF;
    font-size: 12px;
  }
</style>
