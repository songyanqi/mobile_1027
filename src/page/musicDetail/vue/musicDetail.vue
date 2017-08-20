<template>
  <div>
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
      <div class="btn2"><img src="//pic.davdian.com/free/2017/08/16/combinedShape2.png" alt="" @click='playAudio(index-1)'></div>
      <div class="btn3" >
        <img v-if='!isPlay' src="//pic.davdian.com/free/2017/08/16/playBtn.png" alt="" @click='playAudio(-100)'>
        <img v-if='isPlay' src="//pic.davdian.com/free/2017/08/18/timeOut.png" alt="" @click='playAudio(-100)'>
      </div>
      <div class="btn4"><img src="//pic.davdian.com/free/2017/08/16/combinedShape.png" alt="" @click='playAudio(index+1)'></div>
      <div class="btn5"><img src="//pic.davdian.com/free/2017/08/16/list.png" alt="" @click='openAudioList'></div>
    </div>
    <div class="look_more" @click='goAlbumId'>
      <div class="look_count">查看合辑 (<span v-if='musicList[index]  && musicList[index].sortNo' v-text='parseInt(musicList[index].sortNo) + 1'></span>/<span v-text='allAudio'></span>)</div>
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
        <div class='mask_banner_content'>
          <div class="mask_padding mask_list" v-for='(item, i) in musicList' @click='playAudio(i)'>
            <div class="list_name" v-text='item.music' :class='{list_name_select: i==index}'></div>
            <div class="list_img">
              <img src="//pic.davdian.com/free/2017/08/16/listPlay.png" alt="" v-if='i!=index'>
              <img src="//pic.davdian.com/free/2017/08/18/playing.png" alt="" v-if='i==index' class='list_img_select'>
            </div>
          </div>
          <div v-if='musicListBlock'>
            <div class="mask_padding1 mask_list1"  v-for='(item, i) in musicListBlock'></div>
          </div>
        </div>
      </div>
      <div class="mask_bottom" @click='closeAudioList'>关闭</div>
    </div>
  </div>
</template>
<script>
  import { getQuery } from "../../../../utils/utils.es6";
  import api from "../../../../utils/api.es6"
  import util from "../../../../utils/utils.es6";
  import dialog from "../../../../utils/dialog.es6";
  // import wx from "../../../../utils/WXShare.es6"
  import native from '../../../common/js/module/native.js'
  // import common from '../../../common/js/common.js'
  export default {
    data: function () {
      return {
        audioListFlag: false,
        index: 0,
        musicList:[],
        playTime:0,
        isPlay:false,
        playTimer: null,
        allAudio: null,
        getDataFlag:true,
        scrollTop:1,
        isapp: util.utils.isApp()
      }
    },
    computed: {
      musicListBlock(){
        let arr = []
        if (this.musicList>=7){
          return null
        }else {
          if (7-this.musicList.length<1){
            return null
          }else {
            arr.length = 7-this.musicList.length
          }
        }
        return arr
      }
    },
    created: function () {
    },
    mounted: function () {
      var that =  this
      this.$nextTick(function(){
        let obj = {
          albumId:getQuery('albumId')|| 0,
          sort:'0',
          sortNo:getQuery('sortNo') || '0'
        }
        api('/api/mg/content/music/getListData', obj).then(function(data){
          if (data.code ==0){
            if (data.data && data.data.dataList){
              that.musicList = that.musicList.concat(data.data.dataList)
              that.allAudio = data.data.attr.count
            } else {
              dialog.alert('接口返回feedlist数据为null')
            }
          } else {
            if (data.data && data.data.msg){
              dialog.alert('code='+data.code + ';msg='+data.data.msg)
            } else {
              dialog.alert('code='+data.code)
            }
          }
        })
      })
    },
    methods: {
      goAlbumId(){
        if (this.isapp){
          native.Browser.open({
            'url': '/collect.html?albumId=' + getQuery('albumId') || 0
          })
        } else {
          window.location.href = '/collect.html?albumId=' + getQuery('albumId') || 0
        }
        
      },
      closeAudioList(){
        this.audioListFlag = false
        $('body').css({
          'height':'auto',
          "overflow":"hidden"
        });
      },
      openAudioList(){
        var that = this
        this.audioListFlag = true
        $('body').css({
          'height':document.documentElement.clientHeight - 105 + "px",
          "overflow":"hidden"
        });
        setTimeout(function(){
          $('.mask_banner').get(0).scrollTop = that.scrollTop
          $('.mask_banner').scroll(function(e){
            that.scrollTop = $('.mask_banner').get(0).scrollTop
            if ($('.mask_banner').get(0).scrollTop<1){
              $('.mask_banner').get(0).scrollTop = 1
              if (that.musicList[0].sortNo == 0){
                // dialog.info('已经是第一首了')
              }else {
                that.getData(-1,that.musicList[0].sortNo, false)
              }
            }
            if ($('.mask_banner').get(0).scrollTop > $('.mask_banner_content').height()-$('.mask_banner').height()-1){
              $('.mask_banner').get(0).scrollTop = $('.mask_banner_content').height()-$('.mask_banner').height()-1

              if (that.musicList[that.musicList.length-1].sortNo == that.allAudio-1){
                // dialog.info('已经是最后一首了')
              } else {
                that.getData(1,that.musicList[that.musicList.length-1].sortNo, false)
              }
            }
          })
        },300)
      },
      dialog(){
        dialog.alert('打开大V店APP，体验更佳')
      },
      loadAudio(src, callback) {
          var audio = new Audio(src);
          audio.onloadedmetadata = callback;
          audio.src = src;
      },
      playAudio(index){
        var that = this
        //不传index代表点击当前歌曲
        if (index !=-100){
          if (index==-1){
            if (that.musicList[0].sortNo == 0){
              dialog.info('已经是第一首了')
              return
            }else {
              that.getData(-1,that.musicList[that.index].sortNo, true)
              return
            }
          }
          if (index==that.musicList.length){
            if (that.musicList[that.musicList.length-1].sortNo == that.allAudio-1){
              dialog.info('已经是最后一首了')
              return
            } else {
              that.getData(1,that.musicList[that.index].sortNo, true)
              return
            }
          }
        }
        if (that.playTimer){
          clearInterval(that.playTimer)
        }
        if (index >= 0){
          that.playTime = 0
          that.index = index
          //传index代表播放别的歌
          that.isPlay = true
          $('.allAudio').get(0).src = that.musicList[that.index].fileLink
          $('.allAudio').get(0).play()
          $('.allAudio').get(0).onloadedmetadata = function(){
            that.musicList[that.index].time = $('.allAudio').get(0).duration
            that.playTimer = setInterval(function(){
              that.playTime = parseInt(that.playTime) + 1
            },1000)
          }
          $('.allAudio').get(0).onended = function () {
            that.isPlay = false
            that.playAudio(that.index + 1)
          }
        } else {
          if (that.isPlay){
            that.isPlay = false
            $('.allAudio').get(0).pause()
          }else {
            that.isPlay = true
            $('.allAudio').get(0).src = that.musicList[that.index].fileLink


            $('.allAudio').get(0).onloadedmetadata = function(){
              that.musicList[that.index].time = $('.allAudio').get(0).duration
              $('.allAudio').get(0).currentTime = that.playTime;
              $('.allAudio').get(0).play()
              that.playTimer = setInterval(function(){
                that.playTime = parseInt(that.playTime) + 1
              },1000)
            }
            $('.allAudio').get(0).onended = function () {
              that.isPlay = false
              that.playAudio(that.index + 1)
            }
          }
        }
      },
      getData(sort,sortNo, flag){
        var that = this
        if (that.getDataFlag){
          console.log('hello')
          that.getDataFlag = false
          let obj = {
            albumId:getQuery('albumId'),
            sort:sort,
            sortNo:sortNo
          }
          api('/api/mg/content/music/getListData', obj).then(function(data){
            if (data.code ==0){
              if (data && data.data && data.data.dataList){
                if (sort == -1){
                  that.musicList = data.data.dataList.concat(that.musicList)
                  if (flag){
                    that.index = that.index + data.data.dataList.length-2
                  }else {
                    that.index = that.index + data.data.dataList.length
                  }
                  
                }else {
                  that.musicList = that.musicList.concat(data.data.dataList)
                }
                if (flag){
                  that.playAudio(that.index + 1)
                }
              }
            } else { 
              if (data.data && data.data.msg){
                dialog.alert('code='+data.code + ';msg='+data.data.msg)
              } else {
                dialog.alert('code='+data.code)
              }
            }
            setTimeout(function(){
              that.getDataFlag = true
            },1000)
          })
        }else {
          console.log(456)
        }
      },
      timeFormat(t){
        let time = parseInt(t) + 1
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
    }
  }
</script>
<style scoped lang='sass'>
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
    position: relative;
  }
  .btn>div{
    display: inline-block;
    vertical-align: top;
    position: absolute;
  }
  .btn1{
    top: 0.1rem;
    left: 0.2rem;
  }
  .btn1 img{
    width: 0.26rem;
    height: 0.26rem;
    margin-top:0.1rem;
  }
  .btn2{
    top: 0.25rem;
    left: 0.93rem;
  }
  .btn2 img{
    width: 0.31rem;
    height: 0.21rem;
  }
  .btn3{
    top: 0.11rem;
    left: 50%;
    margin-left: -0.23rem;
  }
  .btn3 img{
    height: 0.46rem;
    width: 0.46rem;
  }
  .btn4{
    top: 0.25rem;
    right: 0.92rem;
  }
  .btn4 img{
    width: 0.3rem;
    height: 0.2rem;
  }
  .btn5{
    top: 0.26rem;
    right: 0.2rem;
  }
  .btn5 img{
    width: 0.23rem;
    height: 0.18rem;
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
  .mask_padding1{
    padding-left: 0.2rem;
    padding-right: 0.2rem;
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
  .mask_list1{
    width: 3.75rem;
    height: 0.46rem;
    padding-top: 0.13rem;
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
  .list_name_select{
    color: #FF4A7D;
  }
  .list_img{
    position: absolute;
    right: 0.2rem;
    .list_img_select{
      width: 0.15rem;
      height: 0.15rem;
      margin-right: 0.03rem;
      margin-top: 0.03rem;
    }
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
