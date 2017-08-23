<template>
  <div class="all">
    <div class="big_top">
      <div class="big_img">
        <img id="uuu" :src="dataList.imageUrl" alt="">
      </div>
      <div class="history_mask" v-if="isApp && history_mask"></div>
      <div class="history" @click.stop="go_history" v-if="isApp && history_mask">
        <div>
          <div>上次听到</div>
          <div style="overflow: hidden;max-width: 96px;">{{ historyName }}</div>
          <div>...,点我继续收听</div>
        </div>
      </div>

    </div>

    <div class="content">
      <div class="content_title" v-text="dataList.album"></div>
      <div class="content_price" v-if="isFree==1">
        <div class="pri_left">
          <span v-text="dataList.income"></span>
        </div>
        <div class="pri_right" v-text="dataList.memberMsg"></div>
      </div>
      <div class="content_text" v-text="dataList.comment"></div>
    </div>
  </div>
</template>
<script>
  import native from "../../../src/common/js/module/native.js"
  import util from "../../../utils/utils.es6";
  import {getQuery} from '../../../utils/utils.es6';
  export default {
    props:["data"],
    mounted:function () {
      var that = this
      this.dataList=this.data.body.dataList[0];
      this.isFree=this.data.body.isFree;
      this.$nextTick(function () {
        this.audioPlayHistory();
      });
    },
    data(){
        return{
            dataList:[],
            isFree:0,
            historyName:"",
            sortNo:null,
            timestamp:null,
            isApp:util.utils.isApp(),
            albumId:getQuery("albumId"),
            history_mask:false
        }
    },
    methods:{
      go_history(){
        var _this=this;
        if(this.isApp){
          //调用app播放器
          native.Audio.audioPlay({
            "sortNo":_this.sortNo,
            "albumId":_this.albumId
          })
        }else{
          window.location.href="/musicDetail.html?albumId="+albumId+"&sortNo="+sortNo;
        }
      },
      audioPlayHistory(){
        var _this=this;
        if(_this.isApp){
          setTimeout(function(){
            native.Audio.audioPlayHistory({
              "albumId":_this.albumId,
              success: function (obj) {
                alert(obj.name +":"+ obj.sortNo+ ":" +obj.date );
                _this.historyName=obj.name;
                _this.sortNo=obj.sortNo;
                _this.timestamp=obj.date;
                _this.history_mask=true;
              }
            })
          },4000)
        }
      },
    }
  }
</script>
<style scoped>
  .all {
    padding-bottom: 0.12rem;
    background: white;
  }

  .big_img {
    margin-bottom: 0.1rem;
  }

  .content {
    padding: 0.1rem 0.1rem 0 0.1rem;
  }

  .big_img img {
    width: 3.75rem;
  }

  .content_title {
    font-size: 14px;
    color: #333333;
    margin-bottom: 0.15rem;
  }

  .content_price {
    margin-bottom: 0.15rem;
  }

  .content_text {
    color: #999999;
    font-size: 12px;
  }

  .content_price .pri_left {
    color: #FF4A7D;
    font-size: 18px;
  }

  .content_price > div {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
  }

  .content_price .pri_right {
    color: #BF9D51;
    font-size: 11px;
    margin-top: 0.04rem;
  }


  .big_top{
    position: relative;
  }
  .history_mask{
    height: 35px;
    background: #000000;
    opacity:0.6;
    position: absolute;
    bottom: 0;
    z-index:2;
    width:3.75rem;
  }
  .history{
    position: absolute;
    bottom: 0;
    height: 35px;
    z-index:3;
    line-height: 35px;
    font-size: 0;
    width: 3.75rem;
    text-align: center;
  }
  .history>div {
    display: inline-block;
    height: 35px;
  }
  .history div>div{
    color:#FFFFFF;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    height: 35px;
  }
</style>
