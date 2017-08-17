<template>
  <div>
    <com-wx-notopen></com-wx-notopen>
    <div v-if='isInisWechatOrAppFlag'>
      <audio preload="auto" class='allAudio'></audio>
      <div class="big_img" v-if='musicList[index] && musicList[index].imageUrl'>
        <img :src="musicList[index].imageUrl" alt="">
      </div>
      <div class="text" v-if='musicList[index] && musicList[index].music' v-text='musicList[index].music'></div>
      <div class="range">
        <div class="gray"></div>
        <div v-if='musicList[index] && musicList[index].time' class="red" :style='{width: playTime/musicList[index].time*100 + "%"}'></div>
      </div>
      <div class="time">
        <div v-text='timeFormat(playTime)'></div>
        <div v-if='musicList[index] && musicList[index].time' v-text='timeFormat(musicList[index].time)'></div>
      </div>
      <div class="btn">
        <div class="btn1"><img src="//pic.davdian.com/free/2017/08/16/time.png" alt="" @click='dialog'></div>
        <div class="btn2"><img src="//pic.davdian.com/free/2017/08/16/combinedShape2.png" alt=""></div>
        <div class="btn3"><img src="//pic.davdian.com/free/2017/08/16/playBtn.png" alt=""></div>
        <div class="btn4"><img src="//pic.davdian.com/free/2017/08/16/combinedShape.png" alt=""></div>
        <div class="btn5"><img src="//pic.davdian.com/free/2017/08/16/list.png" alt="" @click='openAudioList'></div>
      </div>
      <div class="look_more">
        <div class="look_count">查看合辑 ({{index}}/26)</div>
        <div class="look_icon"><img src="//pic.davdian.com/free/2017/08/16/entry.png" alt=""></div>
      </div>
      <div style="height: 0.1rem;background: #F8F7F7;"></div>
      <div class="bottom_text">
        父母不断重复唠叨，是因为孩子没有按自己说的去做。
        显而易见，这种无效的沟通方式，不仅无法达到父母的初衷，又会促使孩子与自己对抗。
        每个人都是只有内心认可，才能心甘情愿地去做事。如果父母没有足够的理由说服孩子，他也不可能完全听从。所以当孩子表现得总是不听话，父母就要想到：自己是否有足够的理由说服孩子，或者自己的要求是否真的不容质疑。
      </div>
      <div class="mask" v-if='audioListFlag'></div>
      <div class="mask_div" v-if='audioListFlag'>
        <div class="mask_top mask_padding">
          <div class="mi_left" @click='dialog'><img src="//pic.davdian.com/free/2017/08/16/playOrder.png" alt=""></div>
          <div class="play" @click='dialog'>顺序播放</div>
          <div class="sort" @click='dialog'>排序</div>
          <div class="mi_right" @click='dialog'><img src="//pic.davdian.com/free/2017/08/16/sorting.png" alt=""></div>
        </div>
        <div class="mask_banner">
          <div class="mask_padding mask_list">
            <div class="list_name">藏在故事里的数理化学习秘诀</div>
            <div class="list_img"><img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt=""></div>
          </div>
          <div class="mask_padding mask_list">
            <div class="list_name">藏在故事里的数理化学习秘诀</div>
            <div class="list_img"><img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt=""></div>
          </div>
          <div class="mask_padding mask_list">
            <div class="list_name">藏在故事里的数理化学习秘诀</div>
            <div class="list_img"><img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt=""></div>
          </div>
          <div class="mask_padding mask_list">
            <div class="list_name">藏在故事里的数理化学习秘诀</div>
            <div class="list_img"><img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt=""></div>
          </div>
          <div class="mask_padding mask_list">
            <div class="list_name">藏在故事里的数理化学习秘诀</div>
            <div class="list_img"><img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt=""></div>
          </div>
          <div class="mask_padding mask_list">
            <div class="list_name">藏在故事里的数理化学习秘诀</div>
            <div class="list_img"><img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt=""></div>
          </div>
          <div class="mask_padding mask_list">
            <div class="list_name">藏在故事里的数理化学习秘诀</div>
            <div class="list_img"><img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt=""></div>
          </div>
          <div class="mask_padding mask_list">
            <div class="list_name">藏在故事里的数理化学习秘诀</div>
            <div class="list_img"><img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt=""></div>
          </div>
        </div>
        <div class="mask_bottom" @click='closeAudioList'>关闭</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getQuery, isInisWechatOrApp } from "../../../../utils/utils.es6";
  import api from "../../../../utils/api.es6"
  import dialog from "../../../../utils/dialog.es6";
  // import wx from "../../../../utils/WXShare.es6"
  import comWxNotopen from '../../../component/com-wx-notopen.vue'
  // import common from '../../../common/js/common.js'
  export default {
    data: function () {
      return {
        isInisWechatOrAppFlag:isInisWechatOrApp(),
        audioListFlag: false,
        index: 0,
        musicList:[],
        playTime:0,

      }
    },
    computed: {},
    created: function () {

    },
    mounted: function () {
      var that =  this
      this.$nextTick(function(){
        if (that.isInisWechatOrAppFlag){
          that.musicList = require('../json/musicDetail.json').data.dataList
          console.log(that.musicList)
          // setInterval(function(){that.playTime = that.playTime + 1},1000)
        }else {
          console.log(456)
        }
      })
    },
    methods: {
      closeAudioList(){
        this.audioListFlag = false
      },
      openAudioList(){
        this.audioListFlag = true
      },
      dialog(){
        dialog.alert('打开大V店APP，体验更佳')
      },
      timeFormat(t){
        let time = parseInt(t)
        if (time<60){
          if (time<10){
            time = '0' + time
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
            console.log(minutes)
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
    },
    components:{
      comWxNotopen
    }
  }
</script>
<style scoped>
  .big_img img{
    width: 3.75rem;
    height: 3.75rem;

  }
  .text{
    height: 0.51rem;
    line-height: 0.51rem;
    text-align: center;
    color: #333333;
    font-size: 16px;
    background: #fff;
  }

  .range{
    /*padding: 0.19rem 0.1rem 0 0.1rem;*/
    position:relative;
    height: 0.26rem;
    margin: 0 0.1rem;
    background: #ffffff;
  }
  .gray{
    height: 0.04rem;
    background: #ECECEC;
    position:absolute;
    top: 0.11rem;
    width: 100%;
  }
  .red{
    height: 0.04rem;
    background:#FF613C;
    position: absolute;
    top: 0.11rem;
    width: 50%;
  }
  .icon img{
    height: 0.26rem;
    width: 0.26rem;
    position: absolute;
    top: 0;
  }
  .time{
    height: 0.17rem;
    font-size: 0;
    position:relative;
    padding:0 0.1rem;
    background: #fff;
  }
  .time>div{
    display: inline-block;
    vertical-align: top;
    color:#666666;
    font-size:12px;
    line-height:0.17rem;
    position: absolute;
    height: 0.17rem;
  }

  .time>div:nth-child(1){
    left: 0.1rem;
  }
  .time>div:nth-child(2){
    right: 0.1rem;
  }
  .btn{
    padding-top: 0.11rem;
    padding-left:0.2rem;
    padding-right:0.2rem;
    padding-bottom:0.2rem;
    width: 3.35rem;
    height: 0.46rem;
    font-size: 0;
    background: #ffffff;
  }
  .btn>div{
    display: inline-block;
    vertical-align: top;
  }
  .btn1 img{
    width: 0.26rem;
    height: 0.26rem;
    margin-top:0.1rem;
  }
  .btn2 img{
    width: 0.31rem;
    height: 0.21rem;
    margin-left:0.47rem;
    margin-top: 0.13rem;
  }
  .btn3 img{
    height: 0.46rem;
    width: 0.46rem;
    margin-left: 0.41rem;
  }
  .btn4 img{
    width: 0.3rem;
    height: 0.2rem;
    margin-left:0.42rem;
    margin-top: 0.14rem;
  }
  .btn5 img{
    width: 0.23rem;
    height: 0.18rem;
    margin-left:0.49rem;
    margin-top: 0.15rem;
  }
  .look_more{
    height: 0.4rem;
    padding-left:0.1rem;
    padding-right:0.1rem;
    font-size: 0;
    position: relative;
    background: #ffffff;
  }
  .look_more>div{
    display: inline-block;
    vertical-align: top;
  }
  .look_count{
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: left;
    color:#333333;
    font-size: 14px;
    position: absolute;
    left: 0.1rem;
  }
  .look_icon img{
    height: 0.14rem;
    width: 0.14rem;
    position: absolute;
    right: 0.1rem;
    margin-top:0.13rem;
  }
  .bottom_text{
    padding-left:0.1rem;
    padding-right:0.1rem;
    color:#666666;
    font-size: 12px;
    padding-top: 0.15rem;
    background: #fff;
    line-height: 0.18rem;
  }


  .mask{
    background: #000000;
    opacity: 0.5;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:2;

  }
  .mask_div{
    height: 4rem;
    position: fixed;
    bottom: 0;
    z-index: 3;
    background: #fff;
    width: 3.75rem;
  }
  .mask_top,.mask_bottom{
    height: 0.45rem;
    width: 3.75rem;
  }
  .mi_left img{
    width: 0.19rem;
    height: 0.16rem;
  }
  .mi_right img{
    width: 0.15rem;
    height: 0.16rem;
  }
  .mask_top{
    font-size: 0;
    padding-top: 0.14rem;
    box-sizing:border-box;
  }

  .mask_top>div{
    display: inline-block;
    vertical-align:top;
  }
  .play,.sort{
    color:#666666;
    font-size: 0.14rem;
  }
  .mask_padding{
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    border-bottom: 1px solid #DDDDDD;
  }

  .play{
    margin-left: 0.08rem;
  }
  .sort{
    margin-left: 2rem;
  }
  .mi_right{
    margin-left:0.07rem;
  }
  .mask_list{
    font-size: 0;
    width: 3.75rem;
    height: 0.45rem;
    padding-top: 0.13rem;
    position: relative;
    box-sizing: border-box;
  }
  .mask_list>div{
    display: inline-block;
    vertical-align: top;
  }
  .mask_list img{
    width: 0.2rem;
    height: 0.2rem;
  }
  .list_name{
    font-size: 12px;
    color:#666666;
    position:absolute;
    left: 0.2rem;
    line-height: 0.18rem;
  }
  .list_img{
    position: absolute;
    right: 0.2rem;
  }
  .mask_banner{
    height: 3.15rem;
    overflow: scroll;
  }
  .mask_bottom{
    line-height: 0.45rem;
    text-align: center;
    color: #333333;
    font-size: 14px;
  }
  .allAudio{
    height: 0;
  }
</style>
