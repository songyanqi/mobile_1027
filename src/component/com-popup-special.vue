<!--公共确认框-->
<template>
  <!--满屏容器-->
  <div class="com-popup-base">
    <!--居中容器-->
    <div class="table-cell">
      <!--弹窗-->
      <div class="box">
        <!--提示区域-->
        <div class="tip">
          <!--标题-->
          <div class="title" v-html="title" v-if="title"></div>
          <!--文案-->
          <div class="text" v-html="text" v-if="text"></div>
          <!--输入框-->
          <input class="input" ref="input" type="text" :placeholder="placeholder" v-if="type == 'prompt'">
        </div>

        <!--特殊按钮区域-->
        <div class="btns">
          <!--取消按钮-->
          <div class="btn cancel" v-html="cancelBtnTitle" @click="cancelBtnClick" v-if="type == 'confirm'"></div>
          <!--确定按钮-->
          <div class="btn btn-ok" v-html="okBtnTitle" @click="okBtnClick"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 取值范围，'alert' || 'confirm' || 'prompt'
      type: {
        type: String,
        default: 'alert'
      },
      // 标题
      title: {
        type: String,
        default: null
      },
      // 文本
      text: {
        type: String,
        default: ''
      },
      // 确定按钮-标题
      okBtnTitle: {
        type: String,
        default: '确定'
      },
      // 确定按钮-点击回调
      okBtnCallback: {
        type: Function,
        default: null
      },
      // 取消按钮-标题
      cancelBtnTitle: {
        type: String,
        default: '取消'
      },
      // 取消按钮-点击回调
      cancelBtnCallback: {
        type: Function,
        default: null
      },
      // 输入框占位符
      placeholder: {
        type: String,
        default: ''
      },
    },
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    mounted() {
      if (this.type == 'prompt') {
        this.$refs.input.focus();
      }
    },
    methods: {
      // 销毁自身
      destroy() {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      },
      // 确定按钮-点击事件
      okBtnClick() {
        if (this.okBtnCallback) {
          if (this.type == 'prompt') {
            this.okBtnCallback(this.$refs.input.value);
          } else {
            this.okBtnCallback();
          }
        }
        this.destroy();
      },
      // 取消按钮-点击事件
      cancelBtnClick() {
        this.cancelBtnCallback && this.cancelBtnCallback();
        this.destroy();
      }
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";

  @keyframes com-popup-base-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  .com-popup-base {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $pageMaxWidth;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    line-height: 1;
    * {
      background: transparent;
    }
    .table-cell {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      .box {
        display: inline-block;
        width: ptr(270);
        animation: com-popup-base-animation 0.5s;
        .tip {
          border-radius: ptr(4);
          background: white;
          align-items: center;
          box-sizing: border-box;
          padding: ptr(15) ptr(15);
          min-height: ptr(72);
          font-size: ptr(14);
          line-height: ptr(21);
          color: #666;
          > *:not(:first-child) {
            margin-top: ptr(10);
          }
          .title {
            width: 100%;
            color: #333;
            font-size: ptr(16);
          }
          .text {
            width: 100%;
            color: #666;
          }
          .input {
            box-sizing: border-box;
            padding-left: ptr(10);
            width: ptr(250);
            height: ptr(36);
            background: #F9F9F9;
            font-size: ptr(12);
            line-height: ptr(17);
            border: none;
            outline: none;
          }
        }
        .h-split {
          height: 1px;
          background: #E1E1E1;
          transform: scaleY(0.5);
        }
        .btns {
          display: flex;
          /*align-items: center;*/
          margin-top: ptr(27);
          line-height: ptr(40);
          .v-split {
            width: 1px;
            background: #E1E1E1;
            transform: scaleX(0.5);
          }
          .btn {
            flex: 1;
            color: #fff;
            font-size: ptr(14);
            text-align: center;
            line-height: ptr(40);
            border-radius: ptr(40);
            background: -webkit-gradient(linear, left top, right top, from(#ff613c), to(#fa1862));
            background: -o-linear-gradient(left, #ff613c, #fa1862);
            background: linear-gradient(to right, #ff613c, #fa1862);
            background: -o-linear-gradient(right, #ff613c, #fa1862);
            background: -webkit-linear-gradient(left, #ff613c, #fa1862);
            &.cancel {
              background: transparent;
              position: relative;
              &:after {
                content: "";
                width: 200%;
                height: 200%;
                border: #fff solid 1px;
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                border-radius: 1rem;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
              }
            }
          }
        }
      }
    }
  }
</style>
