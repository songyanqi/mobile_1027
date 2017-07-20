<template>
  <!--顶部提示-->
  <div class="g-top-tip" v-if="(type == 'open' && isTipOpen) || (type == 'focus' && isTipFocus)">
    <div class="tip-wrapper" v-if="type == 'open' && isTipOpen">
      <img class="close" src="[[static]]/page/center/img/close.png" @click="type = ''">
      <span class="words">下载APP签到得红包,享会员特权</span>
      <span class="btn"><a @click="openApp">立即打开</a></span>
    </div>
    <div class="tip-wrapper" v-if="type == 'focus' && isTipFocus">
      <img class="close" src="[[static]]/page/center/img/close.png" @click="type = ''">
      <span class="words">关注公众号查订单,咨询售后</span>
      <span class="btn">
        <!--<a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMTIwOTkzMw==&scene=124#wechat_redirect">立即关注</a>-->
        <a @click="focus">立即关注</a>
      </span>
    </div>
    <!--二维码弹窗-->
    <div class="g-focus-qrcode" v-if="showQrCode">
      <div class="panel">
        <img class="close" src="[[static]]/page/center/img/focus-close.png" @click="showQrCode = 0;">
        <img class="qrcode" src="[[static]]/page/center/img/focusQrCode.jpeg">
        <div class="words">
          <p>长按二维码</p>
          <p>关注大V店公众号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import native from '../../../common/js/module/native.js';

  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        showQrCode: 0,
      }
    },
    computed: {
      // 立即打开
      isTipOpen(){
        let maxAge = localStorage.getItem('isTipOpen_maxAge');
        return this.type == 'open' && (!maxAge || Date.now() > maxAge) ? true : false;
      },
      // 立即关注
      isTipFocus(){
        let maxAge = localStorage.getItem('isTipFocus_maxAge');
        return this.type == 'focus' && (!maxAge || Date.now() > maxAge) ? true : false;
      },
    },
    created(){
    },
    mounted() {
      if ((this.type == 'open' && this.isTipOpen) || (this.type == 'focus' && this.isTipFocus)) {
        this.$parent.$refs.app.style.paddingTop = '44px';
        this.$parent.$refs.guide && (this.$parent.$refs.guide.style.paddingTop = '44px');
      }
//      alert(document.documentElement.clientHeight)
      document.querySelector('.app').style.minHeight = document.documentElement.clientHeight + 'px';
    },
    destroyed(){
    },
    methods: {
      openApp(){
        native.custom.invoke();
      },
      focus(){
        let guideTarget1 = document.querySelector('.g-guide-target-1');
        if (guideTarget1) {
          guideTarget1.style.zIndex = 0;
        }
        this.showQrCode = 1;
      }
    },
    filters: {},
    watch: {
      type(newVal, oldVal){
        debugger
        // 关闭提示
        if (!newVal) {
          // 去掉paddingTop
          this.$parent.$refs.app.style.paddingTop = null;
          this.$parent.$refs.guide && (this.$parent.$refs.guide.style.paddingTop = null);
          // 设置下次提醒时间
          if (oldVal == 'open') {
            localStorage.setItem('isTipOpen_maxAge', Date.now() + 24 * 60 * 60 * 1000);
//            localStorage.setItem('isTipOpen_maxAge', Date.now() + 2 * 60 * 1000);
          } else if (oldVal == 'focus') {
            localStorage.setItem('isTipFocus_maxAge', Date.now() + 24 * 60 * 60 * 1000);
//            localStorage.setItem('isTipFocus_maxAge', Date.now() + 10 * 1000);
          }
        }
      }
    },
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/_all.scss";

  // 顶部提示
  .g-top-tip {
    position: fixed;
    top: 0;
    width: 100%;
    background: #F1F1F1;
    max-width: 640px;
    .tip-wrapper {
      display: flex;
      @include height(44px);
      > * {
        vertical-align: middle;
      }
      .close {
        width: 40px;
      }
      .words {
        flex: 1;
        display: block;
        margin-left: 10px;
        font-size: 12px;
      }
      .btn {
        padding-right: 10px;
        a {
          margin-top: -3px;
          padding: 0 10px;
          display: inline-block;
          font-size: 11px;
          @include height(24px);
          color: white;
          background-image: linear-gradient(-90deg, #FF5B5B 0%, #FA1862 100%);
          border-radius: 100px;
          vertical-align: middle;
        }
      }
    }

    .g-focus-qrcode {
      position: fixed;
      top: 0;
      width: 100%;
      max-width: $pageMaxWidth;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      .panel {
        @include center;
        width: ptr(275);
        height: ptr(275);
        background: #fff;
        .close {
          position: absolute;
          top: ptr(10);
          right: ptr(10);
          @include square(ptr(16));
        }
        .qrcode {
          margin: ptr(25) auto ptr(10);
          @include square(ptr(180));
          display: block;
        }
        .words {
          margin: 0;
          font-size: ptr(14);
          line-height: ptr(20);
          text-align: center;
        }
      }
    }
  }
</style>
