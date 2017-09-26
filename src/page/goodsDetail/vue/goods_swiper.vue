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
    /*width: 100%;*/
    overflow: hidden;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    height: 20px;
  }
  /*进度条*/
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

  /*下载进度*/
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

  /*播放进度*/
  .progress .line {
    width: 0;
    height: 100%;
    border-radius: 50px;
    background-color: #FFF;
    position: absolute;
    top: 0;
    left: 0;
  }

  /**/
  .progress .bar {
    width: 10px;
    height: 10px;
    position: absolute;
    top: -3px;
    z-index: 10;
    border-radius: 50%;
    background: #fff;
  }

  /*时间*/
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
  .spinner {
    width: 40px;
    height: 40px;
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
    height: 375px;
  }
  .videoPoster img {
    width: 100%;
  }
  #goodsDetail .videoBackground {
    background: #fff;
  }
  .good_top_wraper .left-bottom-logo {
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: .5rem;
    width: .9rem;
  }
</style>
<template>
    <div class = "good_top_wraper">
      <!--商品图左下角开学季icon，818需求-->
      <img class="left-bottom-logo" src="//pic.davdian.com/activity/2017/08/15/282_150_1aefb7e936ed666bf77e8303f8ba7d46.png"
           v-if="Date.now() >= new Date(2017,7,17) && Date.now() < new Date(2017,7,24)">

      <!--跨境标志-->
      <div v-if = "swiperinfo.crossBorder"
             class = "crossBorder"
             :class = "{ appCrossBorder: isapp }"
            >
            <span v-if = "swiperinfo.crossBorder.length == 5" style = "font-size: 12px;">
                <span style="position:relative;top:2px;display: block;">{{ swiperinfo.crossBorder.slice(0,2)}}</span>
                <span style="position:relative;top:-2px;">{{ swiperinfo.crossBorder.slice(2)}}</span>
            </span>
            <span v-else>
                <span style="position:relative;top:2px;display: block;">{{ swiperinfo.crossBorder.slice(0,2)}}</span>
                <span>{{ swiperinfo.crossBorder.slice(2)}}</span>
            </span>
        </div>
        <swiper
                height = '375px'
                class = "swiperCont"
                loop
                :auto = "!isapp && !isWechat"
                dots-position = 'center'
                @on-index-change = "handleIdxChange"
        >
          <swiper-item
            @click.native = "handleSavePic"
            @touchstart.native = "handleTouchStart"
            @touchmove.native = "handleTouchMove"
            @touchend.native = "handleTouchEnd"
            @touchcancle.native = "handleTouchCancle"
            v-for = "(item,index) of goodsimglist" :key="index">
            <img :src="item.img" alt="">
          </swiper-item>
          <swiper-item v-if = "videoobj.videoUrl && isapp && (goodstatusonsale == 1 && Number(goodstatus.goodsStocks) > 0)"
                       class = "videoPlayer"
                       :class = "{ videoBackground: isPoster }"
                       @click.native = "handleVideo">
            <!--@pause = "handlePause"-->
            <video preload="none"
                   @timeupdate = "ontimeUpdate($event)"
                   @waiting = "handleWait"
                   @ended = "handleEnded"
                   @playing = "handlePlaying"
                   id="swiperVideo"
                   height ="100%"
                   ref = "player"
                   poster
                   width="100%"
                   webkit-playsinline
                   playsinline>
              <source :src="videoobj.videoUrl" type='video/mp4' />
            </video>
            <loading v-if = "isLoad"></loading>
            <div v-if = "isShowRecord">
              <div class="record" v-if = "!isPlay"></div>
            </div>
            <div v-if = "isNewIos">
              <div v-if = "isDuration" class="controls" :class = "{ controlUp: isShowControl }">
                  <a href="javascript:;"
                     @click = "handlePlay"
                     :class="{ playIcon: isPlay, pauseIcon: !isPlay }"></a>
                  <div class="total">{{ currTime }}</div>
                  <div class = "progressCont"
                       @mousedown = "handleMouseD"
                       @pause = "handlePause"
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
            <div v-if = "isPoster" class = "videoPoster" style = "height: 375px;">
              <img :src="goodsimglist[0].img" alt="">
            </div>
          </swiper-item>
        </swiper>
        <!--促销标签 actendtime-->
        <!-- <div class = "promote_wrapper" v-if = "isshowactive == '1' && singleactivity"> -->
        <div class = "promote_wrapper" v-if = "isshowactive == '1' && singleactivity && singleactivity.typeId != '8'">
            <div class = "promote_type" :class = "{ limitPro: singleactivity.typeId == 5,sellKill_type: singleactivity.typeId == 1 || singleactivity.typeId == 4 }">
                <!--秒杀-->
                <div v-if = "singleactivity.typeId == 1" class="secKill"></div>
                <div v-if = "singleactivity.typeId == 2" class = "timeGroup"></div>
                <!--促销活动-->
                <!-- <div v-if = "singleactivity.typeId == 8" class = "timeBuy"></div> -->
                <div v-if = "singleactivity.typeId == 4" class = "memPricde"></div>
                <div v-if = "singleactivity.typeId == 5" style = "height: 44px;">
                    <div v-if = "singleactivity.actTypeId == 6">
                        <span class = "timeLimit"></span>
                        <span class = "limit_num">{{ infoobj.price.discountRatio }}</span>
                        <span class = "timeLimitz"></span>
                    </div>
                </div>
            </div>
            <div class = "promote_cont" :class = "{ limit_cont: singleactivity.typeId == 5,sellKill_cont: singleactivity.typeId == 1,member_cont: singleactivity.typeId == 4 }">
                <div v-if = "actendtime">
                    <div v-if = "(singleactivity.typeId == 5 || singleactivity.typeId == 2 || singleactivity.typeId == 4) && !isOver" class = "price_show">价格将恢复 ¥ {{ infoobj.price.shopPrice }}</div>
                    <div class = "overTimes" v-if ="isOver">
                        活动已结束
                    </div>
                    <div class = "timeConts"
                         v-else
                         :class = "{price_show: singleactivity.typeId == '5' || singleactivity.typeId == 2 || singleactivity.typeId == 4 }">
                        <div class = "fontWeight">距离结束：</div>
                        <div class = "time_cont countLimit" v-if = "actendtime" :class = "{ countSize: singleactivity.typeId == 1 }">
                            <clocker :time="actendtime.toString()" @on-finish = "handleFish">
                                <span class = "countDown">%D</span>
                                <span>天</span>
                                <span class = "countDown">%H</span>:
                                <span class = "countDown">%M</span>:
                                <span class = "countDown">%S</span>
                            </clocker>
                        </div>
                    </div>
                </div>
                <div v-else style = "flex: 1; -webkit-flex: 1; -webkit-box-flex: 1; text-align: right;">活动已结束</div>
            </div>
        </div>
        <!--上架状态-->
      <div v-if = "goodstatusonsale == '1'">
            <div v-if = "Number(goodstatus.goodsStocks) <= 0" class = "goods_status_wrapper">
                <div style = "padding: 18px 0;">
                    <span class = "status_title">售罄</span>
                    <span class = "status_device"></span>
                    <span style = "display: block;padding-top: 5px;">SOLD OUT</span>
                </div>
            </div>
        </div>
        <div v-else class = "goods_status_wrapper">
            <div style = "padding: 18px 0;">
                <span class = "status_title">未上架</span>
                <span class = "status_device"></span>
                <span style = "display: block;padding-top: 5px;">NO SHELVES</span>
            </div>
        </div>
      <confirm v-if="isConfirm"
               @on-cancel="handleConfirmCancel"
               :confirm-text = 'confirmText'
               :cancel-text = 'cancelText'
               @on-confirm="handleConfirmOk">
        <p style="text-align:center;">{{ confirmMsg }}</p>
      </confirm>
      <!--<div v-if = "isShowToast" class = "tipWrapper">{{ showText }}</div>-->
    </div>
</template>
<script>
    import GoodsSwiper from './goods_swiper.es6';

    export default GoodsSwiper;
</script>
