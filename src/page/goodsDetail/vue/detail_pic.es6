/**
 * create by dony in 2017.03.16
 */
import isWifi from '../js/isWifi.js';
import confirm from './confirm.vue';
import loading from './loading.vue';

//猜你喜欢模块
import maybeyoulike from '../../../component/com-maybeyoulike.vue';
import tt_com_1 from '../../../../module/index/feed/tt_com_1.vue';
import layout from "../../../../module/index/layout.es6";

const DetailPic = {
    components: {
      confirm: confirm,
      loading: loading,
      maybeyoulike: maybeyoulike,
      tt_com_1: tt_com_1,
    },
    props: ['picdetails','mayyoulikelist','mayyoulikenomore',
            'isapp', 'isprompt','videoobj','goodsid'],
    data () {
        return {
          goodsList: null,
          no_more:false,
          isLoader: false,

          duration: "00:00",
          currTime: "00:00",
          playIcon: "播放",
          isPlay: false,
          // preRate: 0,
          offsetX: 0,
          //bar点的left;
          barLeft: 0,
          startX: 0,
          //整个进度条的宽度和距离左边的距离
          progressW: 0,
          progressL: 0,
          buffPro: 0,
          //是否显示进度条
          isShowControl: false,
          timeVideo: null,
          //loading加载
          isLoad: false,
          //真个容器距离浏览器左边的距离
          wrapL: 0,
          isWifi: true,
          isConfirm: false,
          confirmText: '取消播放',
          cancelText: '继续观看',
          confirmMsg: '温馨提示：您正处于非 wifi 环境，继续观看将消耗流量',
          //视频总长为infination时
          isDuration: true,
          isWaitTime: true,
          isShowToast: false,
          isMouseDown: false,
          showText: '当前网络环境较差',
          mayyoulikeData: {
            title: {
              name: "相似商品 为你推荐",
              bgColor: "0xFFFFFF"
            }
          },
          begin_time: 0,
          end_time: 0,
        }
    },
    mounted () {
        let scope = this;
        scope.begin_time = 0;
        scope.end_time = 0;
        $(window).scroll(() => {
          if (!scope.isLoader) {
              if (document.body.scrollTop >= 200) {
                  scope.isLoader = true;
                  scope.$emit('loadmayyoulike', 1);
              }
          };
          /*统计部分 猜你喜欢页面停留时长*/
          let recommendBox = document.querySelector(".mt_10");
          let scrollTop = 0;
          if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            scrollTop = document.body.scrollTop;
          }

          if (recommendBox) {
            let offtop = recommendBox.offsetTop - scrollTop;
            if (offtop < 50) {
              if (!scope.begin_time) {
                scope.begin_time = (new Date()).valueOf();
                console.log("开始计算时间：",scope.begin_time);
              }
            }
            if (offtop > 50) {
              if (scope.begin_time) {
                if(!scope.end_time){
                  scope.end_time = (new Date()).valueOf();
                  console.log("结束计算时间：",scope.end_time);
                  var laytime = scope.end_time - scope.begin_time;
                  if(laytime < 500){
                    scope.begin_time = 0;
                    scope.end_time = 0;
                    return false;
                  }
                  let tiData = {
                    "period":laytime,
                    "page":2,
                    "goods_id": scope.goodsid
                  };
                  layout.statistics(tiData,function () {});
                  scope.begin_time = 0;
                  scope.end_time = 0;
                }
              }
            }
          }
        });
    },
  // watch: {
  //   isShowToast(val) {
  //     if (val) {
  //       clearTimeout(this.timeout);
  //       this.timeout = setTimeout(() => {
  //         this.isShowToast = false
  //       }, 3000)
  //     }
  //   },
  // },
    methods: {
      handleVideo () {
        clearTimeout(this.timeVideo);
        let videoCont = document.querySelector("video");
        this.isWifi = isWifi();

        if (videoCont.paused) {
          if (this.isWifi) {
            videoCont.play();
            this.isPlay = true;

            clearTimeout(this.timeVideo);
            this.isShowControl = true;
            this.timeVideo = setTimeout(() => {
              this.isShowControl = false;
            }, 6000);
          }else {
            this.isConfirm = true;
          }
        } else {
          clearTimeout(this.timeVideo);
          this.isShowControl = true;
          this.timeVideo = setTimeout(() => {
            this.isShowControl = false;
          }, 6000);
        }
      },
      //暂停
      handlePause () {
        this.isPlay = false;
      },
      handlePlay (e) {
        e.preventDefault();
        e.stopPropagation();

        clearTimeout(this.timeVideo);
        this.isShowControl = true;
        this.timeVideo = setTimeout(() => {
          this.isShowControl = false;
        },6000);

        let videoCont = document.querySelector("video");
        if (videoCont.paused) {
          videoCont.play();
          this.isPlay = true;
        } else {
          videoCont.pause();
          this.isPlay = false;
          this.isLoad = false;
        }
        // this.isShowControl = true;
        // this.timeVideo = setTimeout(() => {
        //   this.isShowControl = false;
        // },6000)
      },
      handleLoadedmetadata() {
        this.duration = this.$refs.player.duration;
      },
      //时长发生变化
      handleDurationChange() {
        this.duration = this.$refs.player.duration;
      },
      ontimeUpdate (e) {
        this.currTime = this.getFormatTime(this.$refs.player.currentTime);  //当前播放时间
        if (this.$refs.player.duration == 'Infinity') {
          this.isDuration = false;
          return;
        }
        this.duration = this.getFormatTime(this.$refs.player.duration);       // 视频总时长
        //百分比
        this.barLeft = (this.$refs.player.currentTime / this.$refs.player.duration) * 100;
        //获取要缓冲的进度
        let buffered = this.$refs.player.buffered.end(0);          //当前已缓冲长度
        for(var i= 0; i<this.$refs.player.buffered.length; i++){
          buffered  = this.$refs.player.buffered.end(i);
        }
        this.buffPro = parseInt((buffered/this.$refs.player.duration)*100);
      },
      //正在加载等待时出现loading
      handleWait() {
        this.isLoad = true;
        // this.isShowToast = false;
        setTimeout(() => {
          if (this.isWaitTime) {
            // this.isShowToast = true;
            popup.toast(this.showText,3000);
          }
        },5000);
      },
      //播放时消失loading
      handlePlaying() {
        this.isWaitTime = false;
        this.isLoad = false;
      },
      handleStart (e) {
        e.preventDefault();
        e.stopPropagation();

        clearTimeout(this.timeVideo);
        this.isShowControl = true;

        this.offsetX = 0;

        let progress = document.querySelector('.progress');

        this.progressW = progress.offsetWidth;
        this.progressL = progress.offsetLeft;
        if (this.duration != "00:00") {
          this.startX = e.touches[0].pageX;
          this.$refs.player.currentTime = ((e.touches[0].pageX - this.progressL) / this.progressW) * this.$refs.player.duration;
          this.currTime = this.getFormatTime(this.$refs.player.currentTime);
          this.barLeft = (this.$refs.player.currentTime / this.$refs.player.duration) * 100;
        }
      },
      handleMove (e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.timeVideo) {
          clearTimeout(this.timeVideo);
        }

        if (this.duration != "00:00") {
          this.offsetX = e.targetTouches[0].pageX - this.startX;
          this.$refs.player.currentTime = ((e.targetTouches[0].pageX - this.progressL) / this.progressW) * this.$refs.player.duration;
          this.currTime = this.getFormatTime(this.$refs.player.currentTime);
          this.barLeft = (this.$refs.player.currentTime / this.$refs.player.duration) * 100;

          if (this.barLeft <= 0) {
            this.barLeft = 0;
          }

          if (this.barLeft >= 100) {
            this.barLeft = 100;
          }
        }
      },
      handleEnd (e) {
        e.preventDefault();
        e.stopPropagation();

        clearTimeout(this.timeVideo);
        this.isShowControl = true;
        this.timeVideo = setTimeout(() => {
          this.isShowControl = false;
        },6000);
      },
      //播放完毕
      handleEnded() {
        this.$refs.player.currentTime = 0;
        this.currTime = this.getFormatTime();
        this.barLeft = 0;
        this.isPlay = false;
        this.isShowControl = true;
        this.isLoad = false;
      },
      getFormatTime(time) {
        let times = time || 0;

        let h = parseInt(times/3600),
          m = parseInt(times%3600/60),
          s = parseInt(times%60);
        h = h < 10 ? "0"+h : h;
        m = m < 10 ? "0"+m : m;
        s = s < 10 ? "0"+s : s;

        return m+":"+s;
      },
      // handleIdxChange(index) {
      //   if (index != 3) {
      //     if (document.querySelector("video")) {
      //       let videoCont = document.querySelector("video");
      //       videoCont.pause();
      //       this.isPlay = false;
      //       this.isLoad = false;
      //     }
      //   }
      // },
      //鼠标事件
      handleMouseD (e) {
        this.isMouseDown = true;
        e.preventDefault();
        e.stopPropagation();

        clearTimeout(this.timeVideo);
        this.isShowControl = true;

        this.offsetX = 0;

        let progress = document.querySelector('.progress');

        this.progressW = progress.offsetWidth;
        this.progressL = progress.offsetLeft;
        this.wrapL = document.querySelector('#goodsDetail').offsetLeft;
        if (this.duration != "00:00") {
          this.startX = e.pageX;
          this.$refs.player.currentTime = ((e.pageX - this.wrapL - this.progressL) / this.progressW) * this.$refs.player.duration;
          this.currTime = this.getFormatTime(this.$refs.player.currentTime);
          this.barLeft = (this.$refs.player.currentTime / this.$refs.player.duration) * 100;
        }
      },
      handleMouseM (e) {
        if (this.isMouseDown) {
          e.preventDefault();
          e.stopPropagation();

          if (this.timeVideo) {
            clearTimeout(this.timeVideo);
          }
          let progress = document.querySelector('.progress');

          this.progressW = progress.offsetWidth;
          this.progressL = progress.offsetLeft;
          this.wrapL = document.querySelector('#goodsDetail').offsetLeft;
          if (this.duration != "00:00") {
            this.offsetX = e.pageX - this.wrapL - this.startX;
            this.$refs.player.currentTime = ((e.pageX - this.wrapL - this.progressL) / this.progressW) * this.$refs.player.duration;
            this.currTime = this.getFormatTime(this.$refs.player.currentTime);
            this.barLeft = (this.$refs.player.currentTime / this.$refs.player.duration) * 100;

            if (this.barLeft <= 0) {
              this.barLeft = 0;
            }

            if (this.barLeft >= 100) {
              this.barLeft = 100;
            }
          }
        }
      },
      handleMouseU (e) {
        this.isMouseDown = false;
        e.preventDefault();
        e.stopPropagation();

        clearTimeout(this.timeVideo);
        this.isShowControl = true;
        this.timeVideo = setTimeout(() => {
          this.isShowControl = false;
        },6000);
      },
      handleConfirmCancel () {
        let videoCont = document.querySelector("video");
        videoCont.play();
        this.isPlay = true;

        clearTimeout(this.timeVideo);
        this.isShowControl = true;
        this.timeVideo = setTimeout(() => {
          this.isShowControl = false;
        }, 6000);
        this.isConfirm = false;
      },
      handleConfirmOk () {
        this.isConfirm = false;
      },
      // 点击猜你喜欢结束时间
      periodtj: function () {
      let scope = this;
      if (scope.begin_time) {
        if(!scope.end_time){
          scope.end_time = (new Date()).valueOf();
          console.log("结束计算时间：",scope.end_time);
          let laytime = scope.end_time - scope.begin_time;
          if(laytime < 500){
            scope.begin_time = 0;
            scope.end_time = 0;
            return false;
          }
          let tiData = {
            "period":laytime,
            "page":2,
            "goods_id": scope.goodsid
          };
          layout.statistics(tiData,function () {});
          scope.begin_time = 0;
          scope.end_time = 0;
        }
      }
    }
    }
};

export default DetailPic;
