<template>
  <div>
    <div class="list1">
      <div class="big_img">
        <div class="list_line"></div>
        <div class="list_date" v-text="week"></div>
        <div class="list_line"></div>
      </div>
      <div class="list" v-for="(item,index) in dataList" @click.stop="go_href(item.albumId,item.sortNo)">
        <div class="left_img">
          <img :src="item.imageUrl" alt="">
        </div>
        <div class="list_content">
          <div class="list_title" v-text="item.music"></div>
          <div class="list_name" v-text="item.album"></div>
          <div class="list_time" v-text="timeFormat(item.time)"></div>
        </div>
        <div class="right_img" v-if="(item.isFree==0 || (item.isFree==1 && item.isSub==1)) && item.isPlay==1">
          <div class="mask_stop" @click.stop="go_play(item.albumId,item.sortNo)" v-if="(item.sortNo==sortNo && item.albumId==albumId && btnStatus==1)"><img src="//pic.davdian.com/free/2017/08/16/b_stop.png" alt=""></div>
          <div class="mask_play" @click.stop="go_play(item.albumId,item.sortNo)" v-if="!(item.sortNo==sortNo && item.albumId==albumId && btnStatus==1)"><img src="//pic.davdian.com/free/2017/08/16/b_play.png" alt=""></div>
          <div class="circle_mask"></div>
          <div><img :src="item.imageUrl" alt=""></div>
        </div>
        <div class="right_img" v-if="item.isFree==1 && item.isSub==0 && item.isPlay==0">
          <div class="disable" @click.stop="stop_info(item.albumId)"><img src="//pic.davdian.com/free/2017/08/16/Group1.png" alt=""></div>
          <div class="circle_mask"></div>
          <div><img :src="item.imageUrl" alt=""></div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import util from "../../../utils/utils.es6";
  import native from "../../../src/common/js/module/native.js";
  import popup from "../../../src/common/js/module/popup"
  import {getQuery} from "../../../utils/utils.es6";

  export default {
      props:["data"],
      data(){
          return {
              upTime:"",
              week:"",
              isApp:util.utils.isApp(),
              btnStatus:null,
              dataList:[],
              albumId:null,
              sortNo:null,
              name:"bd_album_content_1"
          }
      },
      mounted:function () {
        var that=this;
        this.dataList=this.data.body.dataList;
        this.upTime=this.data.body.upTime;
        this.week=this.getLocalTime(this.upTime);
        this.$nextTick(function () {
          setTimeout(function () {
            that.audioLocation();
          },2000)
        });
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
        audioLocation(){
          if(this.isApp){
            native.Audio.audioLocation({
              success: function (obj) {
                 window.iosInterface.getAudioState(obj);
              }
            })
          }
        },
        stop_info(albumId){
          var that=this;
          popup.confirm({
            title: '提示',            // 标题（支持传入html。有则显示。）
            text: '订阅后才能继续收听哦',             // 文本（支持传入html。有则显示。）
            okBtnTitle: '马上订阅',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
            cancelBtnTitle: '取消',   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
            okBtnCallback: function(){
              that.Subscribe(albumId);
            },
            cancelBtnCallback: function(){}
          });
        },
        Subscribe(albumId){

          var that=this;
          var obj={
            albumId:albumId,
            shareUserId:getQuery('shareUserId') || ''
          };
          api("/api/mg/content/album/subscription",obj)
            .then(function(result) {
              let {code, data: {msg, payUrl, jsApi}} = result;
              if (code == 0) {
                if (result.data.code == 300) {
                  if (jsApi) {
                    jsApi.jsApiParameters.dvdhref = location.href;
                    // window.location.href = "http://open.davdian.com/wxpay_t2/davke_pay.php?info=" + encodeURIComponent(JSON.stringify(jsApi.jsApiParameters))
                    window.location.href = "http://open.vyohui.cn/wxpay_t3/davke_pay.php?info="+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters))
                  } else if (payUrl) {
                    that.nativePay(payUrl, function (flag) {
                      if (flag) {
                        that.sub=1;
                      }
                    });
                  } else {
                    that.sub=1;
                    setTimeout(function(){
                      that.$emit("re");
                    },500)
                  }
                } else {
                  if (result.data.code == 400){
                    if (that.isapp){
                    native.Account.login()
                  }else {
                    window.location.href = '/login.html'
                  }
                  }else {

                  }
                }
              }else {
//                dialog.alert('code:' + code + 'msg:'+ result.data.msg)
              }
            })
        },
        getLocalTime(nS){
          let time= new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
          let timestamp=time.split(" ")[0].split("/");
          let y=parseInt(timestamp[0]);
          let m=parseInt(timestamp[1]);
          let d=parseInt(timestamp[2]);
          let year=parseInt(new Date().getFullYear());
          let month=parseInt(new Date().getMonth()+1);
          let day=parseInt(new Date().getDate());
          let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
          let week=new Date(y,m-1,d).getDay();
          if(y === year && m === month && d === day){
              return "今日更新";
          }else {
              return m + "月" + d + "日" + " " + weekDay[week];
          }
        },
//        getLocalTime(nS){
//          let time= new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
//          let timestamp=time.split(" ")[0].split("/");
//          let y=parseInt(timestamp[0]);
//          let m=parseInt(timestamp[1]);
//          let d=parseInt(timestamp[2]);
//          let year=parseInt(new Date().getFullYear());
//          let month=parseInt(new Date().getMonth()+1);
//          let day=parseInt(new Date().getDate());
//          let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
//          let week=new Date(y,m-1,d).getDay();
//          if(y === year && m === month && d === day){
//            return "今日更新";
//          }else {
////            return Object.prototype.toString.call(time.split(" ")[0]);
//
//            return time.split(" ")[0];
//          }
//        },
        go_href(albumId,sortNo){
            if(this.isApp){
              //调app播放器
              native.Audio.goAudioDetail({
                "sortNo":sortNo,
                "albumId":albumId
              })
            }else {
              window.location.href="/musicDetail.html?albumId="+albumId+"&sortNo="+sortNo;
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
        }
      }
  }
</script>
<style scoped>
  .big_img{
    text-align: center;
    height: 0.2rem;
    padding-top:0.13rem;
    padding-bottom:0.15rem;
    font-size: 0;
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

  .list1{
    border-bottom: 1px solid #E1E1E1;
    background: #ffffff;
  }
  .list1 .list:nth-child(2){
    margin-bottom: 0.2rem;
  }


  .list{
    font-size: 0;
    height: 0.76rem;
    padding:0 0.1rem;
    margin-bottom:0.27rem;
    position: relative;
  }

  .list>div{
    display: inline-block;
    vertical-align: top;
  }
  .left_img img{
    width:0.76rem;
    height: 0.76rem;
    border-radius:4px;
  }
  .list_content{
    margin-left: 0.1rem;
    height: 0.76rem;
    max-width: 2.15rem;
  }
  .list_title{
    font-size:14px;
    line-height:0.2rem;
    color:#333333;
    max-width:2.15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
  }
  .list_name,.list_time{
    font-size:11px;
    line-height:0.16rem;
    color:#999999;
  }
  .list_name{
    margin-bottom:0.07rem;
  }
  .right_img img{
    width: 0.34rem;
    height: 0.34rem;
    border-radius:50%;
  }
  .right_img{
    position: absolute;
    right: 0.1rem;
    margin-top: 0.24rem;
    width: 0.34rem;
    height: 0.34rem;
  }
  .right_img > div{
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
  .mask_play,.mask_stop,.disable{
    z-index:3;
  }
</style>
