<template>
  <div class="con" @click="go_landing">
    <tt_com_0 :data="data"></tt_com_0>
    <!--<div class="big_img">-->
      <!--<div class="list_line"></div>-->
      <!--<div class="list_date" v-text="title"></div>-->
      <!--<div class="list_line"></div>-->
      <!--<div class="fixed"><div style="color:#333333;font-size: 12px;">更多</div><div class="arrow"><img src="//pic.davdian.com/free/2017/08/16/entry.png" alt=""></div></div>-->
    <!--</div>-->
    <div class="all">
      <div class="list_all" v-for="item in dataList">
        <div class="list">
          <div class="list_left">
            <div class="list_content" v-text="item.title"></div>
            <div class="times">
              <div class="time" v-text="timeFormat(item.time)"></div>
              <div class="name" v-text="item.album"></div>
            </div>
          </div>

          <div class="list_right" v-if="item.isPlay==1">
            <div class="mask_stop" @click.stop="go_play(item.albumId,item.sortNo)" v-if="( item.albumId==albumId && item.sortNo==sortNo && btnStatus==1)"><img src="//pic.davdian.com/free/2017/08/28/listSuspend.png" alt=""></div>
            <div class="mask_play" @click.stop="go_play(item.albumId,item.sortNo)" v-if="!( item.albumId==albumId && item.sortNo==sortNo && btnStatus==1)"><img src="//pic.davdian.com/free/2017/08/28/listPlay2.png" alt=""></div>
            <div class='mask_play loading_play' v-if="item.sortNo==sortNo && item.albumId==albumId && btnStatus==2"><img src="//pic.davdian.com/free/2017/08/26/loading.png" alt=""></div>
            <div class="circle_mask"></div>
            <div><img :src="item.imageUrl" alt=""></div>
          </div>
          <div class="list_right" v-if="item.isPlay==0">
            <div class="disable" @click.stop="stop_info(item.albumId,item.sortNo)"><img src="//pic.davdian.com/free/2017/08/16/Group1.png" alt=""></div>
            <div class="circle_mask"></div>
            <div><img class="gray" :src="item.imageUrl" alt=""></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import util from "../../../utils/utils.es6";
  import native from "../../../src/common/js/module/native";
  import popup from "../../../src/common/js/module/popup";
  import tt_com_0 from './tt_com_0.vue'
  import { getQuery } from "../../../utils/utils.es6";
  import api from "../../../utils/api.es6"
  export default{
    props:["data"],
    components:{
      tt_com_0:tt_com_0
    },
    mounted:function () {
      this.dataList=this.data.body.dataList;
      this.$nextTick(function () {
        this.audioLocation();
      });
    },
    data(){
     return{
         dataList:[],
         isApp:util.utils.isApp(),
         childrenName:"bd_study_0",
         albumId:null,
         sortNo:null,
         btnStatus:0,
         title:""
     }
    },
    methods:{
      timeFormat(t){
        let time = Math.ceil(t);
        if (time<60){
          if (time<10){
            time = '0' + parseInt(t)
          }
          return '00:'+time
        }else {
          if (time<3600){
            let minutes = parseInt(time/60)
            let seconds = time - minutes*60
            if (minutes<10){
              minutes = '0' + minutes
            }
            if (seconds<10){
              seconds = '0' + seconds
            }
            return minutes + ':' + seconds
          }else {
            let hours = parseInt(time/3600)
            let minutes = parseInt((time-hours*3600)/60)
            let seconds = time - hours*3600 - minutes*60
            if (hours<10){
              hours = '0' + hours
            }
            if (minutes<10){
              minutes = '0' + minutes
            }
            if (seconds<10){
              seconds = '0' + seconds
            }
            return hours + ':' + minutes + ':' + seconds
          }
        }
      },
      stop_info(albumId,sortNo){
        var that=this;
        if(that.isApp){
          native.Audio.audioPlay({
            "sortNo":sortNo,
            "albumId":albumId
          })
        }else{
          popup.confirm({
            title: '提示',            // 标题（支持传入html。有则显示。）
            text: '订阅后才能继续收听哦',             // 文本（支持传入html。有则显示。）
            okBtnTitle: '马上订阅',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
            cancelBtnTitle: '取消',   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
            okBtnCallback: function(){
              if (this.isApp) {
                native.Browser.open({
                  "url": "/collect.html?albumId=" + albumId
                });
              } else {
                window.location.href = "/collect.html?albumId=" + albumId;
              }
              // that.Subscribe(albumId);
            },
            cancelBtnCallback: function(){
            }
          });
        }
      },
      nativePay(url, callback){
        var option = {};
        option.url = encodeURIComponent(url);
        if (url.split("app_pay/").length > 1) {
          var list = url.split("app_pay/")[1].split("&");
          for (var i = 0; i < list.length; i++) {
            var key = list[i].split("=")[0];
            var value = list[i].split("=")[1];
            option[key] = value;
          }
        }
        option.success = callback;
        native.Browser.pay(option)
      },
      Subscribe(albumId){
        var that=this;
        if (!that.isapp){
          window.location.href = '/collect.html?albumId=' + getQuery('albumId')
        }
        var obj={
          albumId:albumId,
          shareUserId:getQuery('shareUserId') || ''
        };
        api("/api/mg/content/album/subscription",obj)
          .then(function(result) {
            let {code, data: {msg, payUrl, jsApi}} = result;
            if (code == 0){
              if (result.data.code == 300) {
                if (jsApi) {
                  jsApi.jsApiParameters.dvdhref = location.href;
//                      window.location.href = "http://open.davdian.com/wxpay_t2/davke_pay.php?info=" + encodeURIComponent(JSON.stringify(jsApi.jsApiParameters))
                  window.location.href="http://open.vyohui.cn/wxpay_t3/davke_pay.php?info="+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters));
                } else if (payUrl) {
                  that.nativePay(payUrl, function (flag) {
                    if (flag) {

                      popup.confirm({
                        title: '提示',            // 标题（支持传入html。有则显示。）
                        text: '订阅成功',             // 文本（支持传入html。有则显示。）
                        okBtnTitle: '确定',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                        cancelBtnTitle: '取消',   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
                        okBtnCallback: function(){
                          window.location.reload();
                        },
                        cancelBtnCallback: function(){
                          window.location.reload();
                        }
                      });
                    }
                  });
                } else {
                  popup.confirm({
                    title: '提示',            // 标题（支持传入html。有则显示。）
                    text: '订阅成功',             // 文本（支持传入html。有则显示。）
                    okBtnTitle: '确定',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
                    cancelBtnTitle: '取消',   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
                    okBtnCallback: function(){
                      window.location.reload();
                    },
                    cancelBtnCallback: function(){
                      window.location.reload();
                    }
                  });
                }
              } else {
                if (result.data.code == 100){
                  if (that.isApp){
                    native.Account.login()
                  }else {
                    window.location.href = '/login.html?'+'referer=' + encodeURIComponent(window.location.href)
                  }
                } else {
                  popup.confirm({
                    title: '提示',
                    text: 'code:'+result.data.code+':msg'+result.data.msg, // 文本（支持传入html。有则显示。）
                    okBtnTitle: '确定',
                    cancelBtnTitle: '取消',
                    okBtnCallback: function(){},
                    cancelBtnCallback: function(){}
                  });
                }
              }
            }else {
              popup.confirm({
                title: '提示',
                text: 'code:'+result.data.code+':msg'+result.data.msg, // 文本（支持传入html。有则显示。）
                okBtnTitle: '确定',
                cancelBtnTitle: '取消',
                okBtnCallback: function(){},
                cancelBtnCallback: function(){}
              });
            }
          })
      },
      audioLocation(){
        if(this.isApp){
          native.Audio.audioLocation({
            "success":function (obj) {
              window.iosInterface.getAudioState(obj);
            }
          })
        }
      },
      go_play(albumId,sortNo){
        if(this.isApp){
          //调用app播放器
          native.Audio.audioPlay({
            "sortNo":sortNo,
            "albumId":albumId
          })
        }else{
          window.location.href="/musicDetail.html?albumId="+albumId+"&sortNo="+sortNo;
        }
      },
      go_landing(){
        if (this.isApp) {
          native.Browser.open({
            "url": "/landingPage.html"
          });
        } else {
          window.location.href = "/landingPage.html";
        }
      }
    }
  }
</script>
<style scoped>
  .con{
    background: white;
  }
  .title img{
    margin-top: 0.02rem;
    width: 2.5rem;
    height: 0.16rem;
  }
  .list{
    padding-top:0.1rem;
    padding-bottom:0.1rem;
    font-size: 0;
    position: relative;
  }
  .list>div{
    display:inline-block;
  }
  .list_left{
    font-size: 0.14rem;
  }
  .list_right{
    font-size:0.11rem;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -0.17rem;
    width: 0.34rem;
    height: 0.34rem;
  }

  .list_content{
    max-width: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.05rem;
  }
  .list_right img{
    height: 0.34rem;
    width: 0.34rem;
    border-radius: 47px;
  }

  .list_right>div{
    position: absolute;
    top: 0;
    left: 0;
    width: 0.34rem;
    height: 0.34rem;
  }
  .circle_mask{
    width: 0.34rem;
    height: 0.34rem;
    border-radius:50%;
    background: #000000;
    opacity:0.3;
    z-index:2;
  }
  .mask_play,.mask_stop{
    z-index:3;
  }


  .list_all{
    padding: 0 0.1rem;
    border-top: 1px solid #E1E1E1;
  }
  .times>div{
    display: inline-block;
    font-size: 0;
    line-height:0.16rem;
  }
  .times .time{
    padding-right: 0.1rem;
    border-right: 1px solid #999999;
    font-size:11px;
    margin-right:0.05rem;
  }
  .times .name{
    font-size: 0.11rem;
    max-width: 2.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
  }
  .all .list_all:nth-child(1){
    border: 0;
  }



  .big_img{
    text-align: center;
    height: 0.2rem;
    padding-top:0.15rem;
    padding-bottom:0.05rem;
    font-size: 0;
    position:relative;
  }
  .big_img>div{
    display:inline-block;
    vertical-align: top;
  }
  .list_date{
    color:#333333;
    font-size:16px;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
  }
  .list_line{
    height: 0.01rem;
    background: #333333;
    width: 0.15rem;
    margin-top: 0.08rem;
  }
  .fixed{
    position: absolute;
    right: 0.1rem;
    font-size: 0;
  }
  .fixed>div{
    display: inline-block;
    vertical-align: top;
  }
  .arrow{
    width: 0.14rem;
    height: 0.14rem;
  }
  .arrow img{
    width: 0.14rem;
    height: 0.14rem;
  }

  .disable{
    z-index: 5;
  }
  .gray {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
  }
</style>


