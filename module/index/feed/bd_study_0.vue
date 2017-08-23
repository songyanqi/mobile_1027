<template>
  <div class="con" @click="go_landing">
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
              <div class="time" v-text="item.time"></div>
              <div class="name" v-text="item.album"></div>
            </div>
          </div>
          <div class="list_right">
            <div class="disable" @click.stop="stop_info" v-if="item.isPlay==0"><img src="//pic.davdian.com/free/2017/08/16/Group1.png" alt=""></div>
            <div class="mask_stop" @click.stop="go_play(item.albumId,item.sortNo)" v-if="item.isPlay==1 && ( item.albumId==albumId && item.sortNo==sortNo && btnStatus==1)"><img src="//pic.davdian.com/free/2017/08/16/b_stop.png" alt=""></div>
            <div class="mask_play" @click.stop="go_play(item.albumId,item.sortNo)" v-if="item.isPlay==1 &&  !( item.albumId==albumId && item.sortNo==sortNo && btnStatus==1)" ><img src="//pic.davdian.com/free/2017/08/16/b_play.png" alt=""></div>
            <div class="circle_mask"></div>
            <div><img :src="item.imageUrl" alt=""></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import util from "../../../utils/utils.es6";
  import native from "../../../src/common/js/module/native";
  import dialog from "../../../utils/dialog.es6";
  export default{
    props:["data"],
    mounted:function () {
      this.dataList=this.data.body.dataList;
      this.title=this.data.title.name;
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
      stop_info(){
        dialog.alert("订阅后才可收听");
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
    margin-top: 0.05rem;
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
    font-size: 11px;
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

</style>


