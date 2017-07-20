<template>
  <div class="com-popup-confirm">
    <!--居中容器-->
    <div class="middle-wrapper">
      <!--alert提示框-->
      <div class="alert-box">
        <div class="title" v-html="html"></div>
        <div class="btns">
          <div class="btn" @click="ok(); destroy();">确定</div>
          <div class="btn" @click="cancel(); destroy();">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // html
      html: {
        type: String,
        default: ''
      },
      // 确定后的回调
      ok: {
        type: Function,
        default: function () {
        }
      },
      // 取消后的回调
      cancel: {
        type: Function,
        default: function () {
        }
      }
    },
    data() {
      return {}
    },
    computed: {},
    created(){
    },
    mounted() {
    },
    methods: {
      // 销毁自身
      destroy(){
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    filters: {},
    watch: {}
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  @import "../common/css/util/all";

  // 动画
  @keyframes com-popup-confirm-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  // 顶部标题
  .com-popup-confirm {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $pageMaxWidth;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9;
    line-height: 1;
    .middle-wrapper {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
    .alert-box {
      $radius: ptr(5);
      display: inline-block;
      width: ptr(270);
      background: white;
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
      animation: com-popup-confirm-animation 0.3s;
      .title {
        padding: ptr(25) ptr(15);
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
        font-size: ptr(14);
        line-height: 1.5;
      }
      .btns {
        display: flex;
        border-top: 1px solid #E1E1E1;
        padding: ptr(7);
        .btn {
          /*padding: ptr(7);*/
          flex: 1;
          @include height(ptr(30));
          color: #FF4A7D;
          font-size: ptr(16);
          &:first-of-type {
            border-right: 1px solid #ddd;
          }
        }
      }
    }
  }
</style>
