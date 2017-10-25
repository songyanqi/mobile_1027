<template>
  <!--顶部标题-->
  <div class="com-top-title" :class="classObject" v-if="!isDvdApp" :style="styleObject" ref="comTopTitle">
    <div class="back-btn" @click="back">
      <i class="back-arrow"></i>
    </div>
    <span class="title">{{title}}</span>
    <i class="home" v-if="home !== undefined" @click="goHome"></i>
    <slot></slot>
    <div v-if="btn !== undefined" class="top_right">
      <a class="top_btn" :href="btn.href">
        <span class="text_btn">{{btn.name}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  import ua from '../common/js/module/ua.js';
  import native from '../common/js/module/native.js';

  export default {
    props: {
      title: String,
      home: {
        type: String,
      },
      btn: {
        name: String,
        href: String
      },
      'back-btn-click': Function,
      'border-bottom': Boolean,
      'hide-disable': Boolean
    },
    data() {
      return {
        classObject: {
          'animate-show': false,
          'animate-hide': false,
          'border-bottom': this.borderBottom
        },
        styleObject: {},
        isDvdApp: ua.isDvdApp(),
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      // document.title与H5标题栏同步
      document.title = this.title;
      native.Browser.setHead({
        'title': document.title
      });

      // 非native环境下,要显示H5标题栏并且要设置.app的padding-top
      if (!ua.isDvdApp()) {
        let app = document.querySelector('.app');
        // 安卓微信有bug，弃用
//        this.$el.style.position = '-webkit-sticky';
//        this.$el.style.position = 'sticky';
//        if (this.$el.style.position == '-webkit-sticky' || this.$el.style.position == 'sticky') {
//        } else {
//          app.style.paddingTop = '44px';
//        }
        app.style.paddingTop = '44px';
        app.style.backgroundPosition = '0 44px';
        if (!this.hideDisable) {
          this.setAutoAnimation();
        }

        if (ua.isIos()) {
          this.iosDownPull();
        }
      }
    },
    methods: {
      back() {
        if (this.backBtnClick) {
          this.backBtnClick();
        } else {
          if (history.length > 1) {
            history.back();
          } else {
            if (ua.isWeiXin() && window.wx) {
              window.wx.closeWindow();
            } else {
              window.location.href = "about:blank";
              window.close();
            }
          }
        }
      },
      goHome() {
        location.href = this.home || '/';
      },
      setAutoAnimation() {
        let ts = this;
        // 控制隐藏出现
        let titleBarHeight = ts.$el.clientHeight;
        let lastY = 0;
        let downInSwitcher = true;
        let upOutSwitcher = true;
        window.addEventListener('scroll', function () {
          let y = document.body.scrollTop;

          // 页面向下滚动
          if (y - lastY > 0) {
            // 滚动距离大于topbar高度
            if (upOutSwitcher && y > titleBarHeight) {
              // top-title向上滑出
              ts.classObject['animate-show'] = false;
              ts.classObject['animate-hide'] = true;
              upOutSwitcher = false;
              setTimeout(function () {
                upOutSwitcher = true;
              }, 50);
            }
            // 页面向上滚动
          } else if (downInSwitcher && y - lastY < -0) {
            // top-title向下滑入
            ts.classObject['animate-show'] = true;
            ts.classObject['animate-hide'] = false;
            downInSwitcher = false;
            setTimeout(function () {
              downInSwitcher = true;
            }, 50);
          }
          lastY = document.body.scrollTop;
        }, false);
      },
      iosDownPull() {
        let ts = this;
        window.addEventListener('scroll', function () {
          let y = document.body.scrollTop;
          if (y < 0) {
            ts.$refs.comTopTitle.style.position = 'absolute';
          } else {
            ts.$refs.comTopTitle.style.position = 'fixed';
          }
        }, false);
      }
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";

  // 动画
  @keyframes animation-top-title-hide {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  @keyframes animation-top-title-show {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  // 顶部标题
  .com-top-title {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $pageMaxWidth;
    height: 44px;
    line-height: 44px;
    background-color: #fafafa;
    color: #333;
    text-align: center;
    font-size: 16px;
    z-index: 9;
    &.border-bottom {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    // 返回按钮
    .back-btn {
      position: absolute;
      left: 0;
      height: 100%;
      width: 44px;
      // 箭头
      .back-arrow {
        position: absolute;
        top: 15px;
        left: 15px;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-bottom: 1px solid #333;
        border-left: 1px solid #333;
        transform: rotate(45deg);
        cursor: pointer;
      }
    }
    // 标题
    .title {
      display: inline-block;
      width: 60%;
      @include ellipsis;
    }
    // 首页
    .home {
      position: absolute;
      top: 12px;
      right: 12px;
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(http://pic.davdian.com/free/home_icon_0825.png) no-repeat;
      background-size: 100%;
      cursor: pointer;
    }
    &.animate-hide {
      animation: animation-top-title-hide 0.2s forwards;
    }
    &.animate-show {
      animation: animation-top-title-show 0.2s forwards;
    }
  }

  .top_right {
    position: absolute;
    right: 0;
    top: 0;
  }

  .top_btn {
    float: right;
    margin-right: 15px;
  }

  .top_right .text_btn {
    font-size: 14px;
    display: block;
    line-height: 44px;
    padding-left: 12px;
    margin-right: -15px;
    cursor: pointer;
    padding-right: 12px;
    color: #FF4A7D;
  }
</style>
