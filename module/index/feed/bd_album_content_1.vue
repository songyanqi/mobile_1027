<template>
  <div>
    <div class="list1">
      <div class="big_img">
        <div class="list_line"></div>
        <div class="list_date">
          <div v-text="week" class="text"></div>
          <div v-text="week2" v-if="week2!=''" class="entry"></div>
        </div>
        <div class="list_line"></div>
      </div>
      <div class="flist" v-for="(item,index) in dataList">
        <div class="list" @click.stop="go_href(item.albumId,item.sortNo)">
          <div class="left_img" :style="{'background-image':styleObject(item.imageUrl)}">
            <!--<img :src="item.imageUrl" alt="">-->
          </div>
          <div class="list_content">
            <div class="list_title" v-text="item.music"></div>
            <div class="list_name" v-text="item.album"></div>
            <div class="new_time">
              <!--<div class="audio_count" v-if="item.number!=0"><span v-text="item.number"></span>次播放</div>-->
              <div class="list_time">
                <span class="clock"></span><span v-text="timeFormat(item.time)" class="se_text"></span>
              </div>
            </div>
          </div>
          <div class="right_img" v-if="item.isPlay==1">
            <div class="mask_stop" @click.stop="go_play(item.albumId,item.sortNo)" v-if="(item.sortNo==sortNo && item.albumId==albumId && btnStatus==1)"><img src="//pic.davdian.com/free/2017/08/28/listSuspend.png" alt=""></div>
            <div class="mask_play" @click.stop="go_play(item.albumId,item.sortNo)" v-if="!(item.sortNo==sortNo && item.albumId==albumId && btnStatus==1)"><img src="//pic.davdian.com/free/2017/08/28/listPlay2.png" alt=""></div>
            <div class='mask_play loading_play' v-if="item.sortNo==sortNo && item.albumId==albumId && btnStatus==2"><img src="//pic.davdian.com/free/2017/08/26/loading.png" alt=""></div>
            <div class="circle_mask"></div>
            <div><img :src="item.imageUrl" alt=""></div>
          </div>
          <div class="right_img" v-if="item.isPlay==0">
            <div class="disable" @click.stop="stop_info(item.albumId,item.sortNo)"><img src="//pic.davdian.com/free/2017/08/16/Group1.png" alt=""></div>
            <div class="circle_mask"></div>
            <div class="a"><img class="gray" :src="item.imageUrl" alt=""></div>
          </div>
        </div>
        <div class="line"></div>
      </div>

    </div>
  </div>

</template>
<script>
  import util from "../../../utils/utils.es6";
  import native from "../../../src/common/js/module/native.js";
  import popup from "../../../src/common/js/module/popup"
  import {getQuery} from "../../../utils/utils.es6";
  import api from "../../../utils/api.es6"

  export default {
    props:["data"],
    data(){
      return {
        upTime:"",
        week:"",
        week2:"",
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
      this.week2=this.getLocalTime2(this.upTime);
      this.$nextTick(function () {
        setTimeout(function () {
          that.audioLocation();
        },2000)
      });
    },
    methods:{
      styleObject(item){
        return "url("+ item +")";
      },
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
              that.Subscribe(albumId);
            },
            cancelBtnCallback: function(){}
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
      add0(m){
        return m<10?'0'+m:m;
      },
      getLocalTime(nS){
        var time = new Date(nS*1000);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var day=time.getDay();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        if (new Date().getMonth() + 1 == m && new Date().getFullYear() == y && new Date().getDate() == d){
          return "今日更新"
        } else {
          return m+"月"+d+"日";
        }
      },
      getLocalTime2(nS){
        var time = new Date(nS*1000);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        var day=time.getDay();
        var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        if (new Date().getMonth() + 1 == m && new Date().getFullYear() == y && new Date().getDate() == d){
          return "";
        } else {
          return week[day];
        }
      },
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
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    font-size: 0;
    height:0.2rem;
    line-height:0.2rem;
  }
  .list_date>div{
    display: inline-block;
    vertical-align: top;
  }
  .list_line{
    height: 0.01rem;
    background: #333333;
    width: 0.15rem;
    margin-top: 0.095rem;
  }

  .list1{
    margin-bottom: 0.1rem;
    background: #ffffff;
  }
  .list1 .flist:last-child .line{
    background: #fff;
  }

  .list{
    font-size: 0;
    height: 0.7rem;
    padding:0 0.1rem;
    position: relative;
  }

  .list>div{
    display: inline-block;
    vertical-align: top;
  }
  .left_img{
    width:0.7rem;
    height: 0.7rem;
    border-radius:4px;

    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  /*.left_img img{*/
    /*width:0.7rem;*/
    /*height: 0.7rem;*/
    /**/
  /*}*/
  .list_content{
    margin-left: 0.1rem;
    height: 0.7rem;
    max-width: 2.15rem;
  }
  .list_title{
    font-size:0.14rem;
    line-height:0.2rem;
    color:#333333;
    max-width:2.15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    margin-top: -0.03rem;

  }
  .list_time{
    margin-bottom: -0.03rem;
    height: 0.1rem;
    font-size:0.11rem;
    line-height:0.1rem;
    color:#999999;
  }
  .list_name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 2.15rem;
    font-size:0.11rem;
    line-height:0.16rem;
    color:#999999;
    margin-top: 0.03rem;
  }
  .right_img img{
    width: 0.34rem;
    height: 0.34rem;
    border-radius:50%;
  }
  .right_img{
    position: absolute;
    right: 0.1rem;
    margin-top: 0.18rem;
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
  .gray {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
  }
  .loading_play{
    animation:rotating 1.2s linear infinite
  }
  @keyframes rotating{
    from{transform:rotate(0)}
    to{transform:rotate(360deg)}
  }
  .entry{
    width: 0.46rem;
    height: 0.16rem;
    border-radius: 8px;
    border:1px solid #e1e1e1;
    color: #999999;
    line-height:0.15rem;
    font-size: 0.11rem;
    box-sizing: border-box;
    margin-top: 0.02rem;
  }


  .text{
    font-size:0.16rem;
  }
  .line{
    position: relative;
    left: -50%;
    width: 7.1rem;
    margin-left: 0.2rem;
    height: 1px;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    background:#E1E1E1;
    -webkit-transform:scale(0.5);
  }
  .clock{
    display: inline-block;
    height: 0.1rem;
    width: 0.1rem;
    background-image: url(//pic.davdian.com/free/2017/05/04/history.png);
    background-size: 0.1rem 0.1rem;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .se_text{
    height: 0.1rem;
    margin-left: 0.05rem;
  }
  .new_time{
    font-size: 0;
    height: 0.1rem;
    position: absolute;
    bottom: 0;
    margin-bottom: -0.01rem;
  }
  .new_time>div{
    display: inline-block;
    vertical-align: top;
  }
  .audio_count{
    color:#999999;
    font-size: 0.11rem;
    height: 0.1rem;
    line-height: 0.1rem;
    padding-right: 0.1rem;
    border-right: 1px solid #999999;
    margin-right: 0.09rem;
  }

</style>
