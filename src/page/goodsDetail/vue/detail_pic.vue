<style>
  .videoPlayer {
    position: relative;
  }
  .controls {
    opacity: 0;
    width: 100%;
    height: 44px;
    position: absolute;
    left: 0;
    bottom: -44px;
    z-index: 99;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    display: none;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
  }

  .controlUp {
    opacity: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    bottom: 0;
  }
  .progressCont {
    overflow: hidden;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    height: 20px;
  }
  .progress {
    height: 3px;
    border-radius: 50px;
    background-color: #555;
    margin: 0 10px;
    cursor: pointer;
    position: relative;
    top: 8px;
    z-index: 100;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .progress .loaded {
    position: absolute;
    z-index: 10;
    width: 0;
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(to right,#FF5B5B,#FA1862);
    background: -moz-linear-gradient(right,#FF5B5B,#FA1862);
    background: -o-linear-gradient(right,#FF5B5B,#FA1862);
    background: -webkit-linear-gradient(left,#FF5B5B,#FA1862);
  }

  .progress .line {
    width: 0;
    height: 100%;
    border-radius: 50px;
    background-color: #FFF;
    position: absolute;
    top: 0;
    left: 0;
  }

  .progress .bar {
    width: 10px;
    height: 10px;
    position: absolute;
    top: -3px;
    border-radius: 50%;
    background: #fff;
    z-index: 10;
  }

  .allTimer {

  }
  .endTimer {
    margin-right: 10px;
    color: #FFF;
    font-size: 12px;
  }
  .playIcon,.pauseIcon {
    display: inline-block;
    width: 40px;
    height: 44px;
  }
  .playIcon {
    background: url('//pic.davdian.com/free/goodsDetail/play_icon.png') center;
    background-size: 100%;
  }
  .pauseIcon {
    background: url('//pic.davdian.com/free/goodsDetail/pause_icon.png') center;
    background-size: 100%;
  }
  .record,.loadIcon {
    width: 60px;
    height: 60px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
  .record {
    background: url("//pic.davdian.com/free/goodsDetail/record_icon.png");
    background-size: 100%;
  }
  .loadIcon {
    /*background: url("//pic.davdian.com/free/goodsDetail/loadingS.gif");*/
    background: url("//pic.davdian.com/free/goodsDetail/spin.gif");
    background-size: 100%;

  }
  .liveTips {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    color: #FA1862;
    margin-left: -60px;
  }
  .videoCont {
    position: relative;
    background: #000;
  }
  .total {
    color: #fff;
    font-size: 12px;
  }
  .videoC {
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-size: cover;
  }
  .videoPoster {
    position: absolute;
    top: 0;
    width: 100%;
    background: #fff;
    height: 212px;
  }
  .videoPoster img {
    width: 100%;
  }
</style>

<template>
    <div>
        <div class = "picContVideo">
            <div v-if = "videoobj.videoUrl && !isapp"
                 class = "videoCont"
                 @click = "handleVideo">
              <video preload="none"
                     @timeupdate = "ontimeUpdate($event)"
                     @waiting = "handleWait"
                     @pause = "handlePause"
                     @ended = "handleEnded"
                     @playing = "handlePlaying"
                     id="swiperVideo"
                     height ="210px"
                     ref = "player"
                      :poster = "videoobj.videoImage"
                     width="100%"
                     class = "videoC"
                     webkit-playsinline="true"
                     playsinline="true">
                <source :src="videoobj.videoUrl" type='video/mp4' />
              </video>
              <loading v-if = "isLoad"></loading>
              <div class="record" v-if = "!isPlay"></div>
              <div v-if = "isDuration" class="controls" :class = "{ controlUp: isShowControl }">
                <a href="javascript:;"
                   @click = "handlePlay"
                   :class="{ playIcon: isPlay, pauseIcon: !isPlay }"></a>
                <div class="total">{{ currTime }}</div>
                <div class = "progressCont"
                     @mousedown = "handleMouseD"
                     @mousemove = "handleMouseM"
                     @mouseup = "handleMouseU"
                     @touchmove = "handleMove"
                     @touchend = "handleEnd"
                     @touchstart = "handleStart"
                     @durationchange = "handleDurationChange"
                     @loadedmetadata = "handleLoadedmetadata"
                >
                  <div class="progress">
                    <div class="loaded" :style = "{ width: Math.ceil(barLeft) + '%' }"></div>
                    <div class="line" :style = "{ width: Math.ceil(buffPro) + '%' }"></div>
                    <div class="bar" :style = "{ left: barLeft + '%' }"></div>
                  </div>
                </div>
                <div class="endTimer">
                  <span class="current">{{ duration }}</span>
                </div>
              </div>
              <div v-else class="controls" :class = "{ controlUp: isShowControl }">
                <a href="javascript:;"
                   @click = "handlePlay"
                   :class="{ playIcon: isPlay, pauseIcon: !isPlay }"></a>
                <div class="total">{{ currTime }}</div>
                <span class = "liveTips">现场直播</span>
              </div>
            </div>
            <div v-if = "videoobj.videoIframe">
              <iframe :src="videoobj.videoIframe"
                      frameborder="0"
                      scrolling = "0"
                      allowfullscreen
                      style = "overflow: hidden;z-index: 1;display:block!important;opacity:1!important;"
                      width="100%"
                      height = "210px"></iframe>
            </div>
            <div v-for = "item of picdetails">
                <img v-lazy="item.detailUrl">
            </div>
            <div class = "mt_10" @click = "periodtj">
                <!-- <div class="df_new_title_2" style="border-bottom: none">
                    <span class="df_new_font">猜你喜欢</span>
                </div> -->
                <tt_com_1 :data = "mayyoulikeData"></tt_com_1>
                <maybeyoulike
                  :no_more = "mayyoulikenomore"
                  :list = "mayyoulikelist"></maybeyoulike>
            </div>
        </div>
      <confirm v-if="isConfirm"
               @on-cancel="handleConfirmCancel"
               :confirm-text = 'confirmText'
               :cancel-text = 'cancelText'
               @on-confirm="handleConfirmOk">
        <p style="text-align:center;">{{ confirmMsg }}</p>
      </confirm>
    </div>
</template>

<script>
    import DetailPic from './detail_pic.es6';
    export default DetailPic;
</script>
