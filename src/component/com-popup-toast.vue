<!--
  功能: toast提示
  用法:
    import popup from '../../../common/js/module/popup.js';
    popup.toast(html, duration);
-->
<template>
  <div class="com-popup-toast">
    <div class="cell">
      <div class="box">
        <div class="html" v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // toast内容，可传html
      html: {
        type: String,
        default: ''
      },
      // toast存在时长，毫秒
      duration: {
        type: Number,
        default: 2000
      },
    },
    data() {
      return {}
    },
    computed: {},
    created(){
    },
    mounted() {
      let ts = this;
      setTimeout(function () {
        ts.destroy();
      }, ts.duration);
    },
    watch: {},
    filters: {},
    methods: {
      // 销毁自身
      destroy(){
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";

  // 动画
  @keyframes com-alert-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  // 顶部标题
  .com-popup-toast {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $pageMaxWidth;
    height: 100%;
    display: table;
    z-index: 99;
    line-height: 1;
    .cell {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      .box {
        display: inline-block;
        box-sizing: border-box;
        padding: ptr(10) ptr(15);
        min-width: ptr(120);
        max-width: ptr(200);
        min-height: ptr(40);
        border-radius: ptr(4);
        background: rgba(0, 0, 0, 0.65);
        color: #fff;
        font-size: ptr(14);
        line-height: ptr(20);
        animation: com-alert-animation 0.3s;
        .html {
          display: inline-block;
          text-align: left;
        }
      }
    }
  }
</style>
