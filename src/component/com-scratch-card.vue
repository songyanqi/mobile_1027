<!--
  名称:刮奖组件
  用法:<com-scratch-card>恭喜您中奖了</com-scratch-card>
  说明:dom内容在调用处使用slot方式插入,样式写在父组件即可
-->
<template>
  <!--顶部标题-->
  <div class="com-scratch-card">
    <canvas ref="canvas" v-show="showMask"></canvas>
    <slot></slot>
  </div>
</template>

<script>
  import util from '../common/js/module/util.js';
  import ua from '../common/js/module/ua.js';
  import type from '../common/js/module/type.js';

  export default {
    props: {
      // 浮层上提示刮奖文字,有则显示
      maskTip: {
        type: String,
        default: ''
      },
      // 浮层上提示刮奖图片,有则显示
      maskImg: {
        type: String,
        default: ''
      },
      // 刮奖文字颜色
      fontColor: {
        type: String,
        default: 'black'
      },
      // 刮奖文字尺寸
      fontSize: {
        type: String,
        default: '14px'
      },
      // 刮奖文字尺寸
      maskColor: {
        type: String,
        default: '#ddd'
      },
      showMask: {
        type: Boolean,
        default: true
      },
      // 是否能刮开
      canScratch: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    computed: {},
    created(){
    },
    mounted() {
      this.init();
    },
    methods: {
      getClientLeft(node){
        if (node.offsetParent) {
          return node.offsetLeft + this.getClientLeft(node.offsetParent);
        } else {
          return node.offsetLeft;
        }
      },
      getClientTop(node){
        if (node.offsetParent) {
          return node.offsetTop + this.getClientTop(node.offsetParent);
        } else {
          return node.offsetTop;
        }
      },
      init(){
        let ts = this;
        let canvas = ts.$refs.canvas;

        // 设置canvas宽高等于父元素
        canvas.width = canvas.parentNode.clientWidth;
        canvas.height = canvas.parentNode.clientHeight;

        if (canvas.getContext) {
          // 2d绘制容器
          var context = canvas.getContext('2d');

          // 绘制刮奖图层背景
          context.fillStyle = ts.maskColor;
          context.fillRect(0, 0, canvas.width, canvas.height);

          // 绘制刮奖蒙层-文字
          if (ts.maskTip) {
            context.fillStyle = ts.fontColor;
            context.font = ts.fontSize + ' sans-serif';
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillText(ts.maskTip, canvas.width / 2, canvas.height / 2);
          }

          // 绘制刮奖蒙层-图像
          if (ts.maskImg) {
            var img = new Image();
            img.onload = function () {
              context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = ts.maskImg;
          }

          // 绘制透明圆
          function drawTransparentCircle(centerX, centerY) {
            // 绘制
            context.moveTo(centerX, centerY);
            context.fillStyle = '#ddd';
            context.globalCompositeOperation = 'destination-out';
            context.arc(centerX, centerY, 15, 0, Math.PI * 2);
            context.fill();
          }

          //
          function scrollD(direction) {
            if (direction == "top") {
              return util.getDocumentScrollTop();
            }
            if (direction == "left") {
              return util.getDocumentScrollLeft();
            }
          }

          // m端擦除
          function mobile(event) {
            if (ts.canScratch) {
              // canvas的位置
              let clientLeft = ts.getClientLeft(canvas);
              let clientTop = ts.getClientTop(canvas);
              // 圆心坐标
              let centerX = event.changedTouches[0].clientX + scrollD("left") - clientLeft;
              let centerY = event.changedTouches[0].clientY + scrollD("top") - clientTop;
              drawTransparentCircle(centerX, centerY);
            }
          }

          // pc端擦除
          function pc(event) {
            if (ts.canScratch) {
              // canvas的位置
              let clientLeft = ts.getClientLeft(canvas);
              let clientTop = ts.getClientTop(canvas);
              // 圆心坐标
              let centerX = event.clientX + scrollD("left") - clientLeft;
              let centerY = event.clientY + scrollD("top") - clientTop;
              if (event.which === 1) {
                drawTransparentCircle(centerX, centerY);
              }
            }
          }

          // 擦除图层时机,手机端
          canvas.addEventListener('touchstart', function (event) {
            mobile(event);
            ts.$emit('touchstart');
            /*// 解决安卓app中刮奖时页面跟随滚动问题
            if (ua.isDvdApp() && ua.isAndroid() && window.paySuccessInterface && type.isFunction(window.paySuccessInterface.requestDisallowScroll)) {
              window.paySuccessInterface.requestDisallowScroll('1');
            }*/
          }, false);
          canvas.addEventListener('touchmove', function (event) {
            mobile(event);
            event.preventDefault();
            ts.$emit('touchmove');
          }, false);
          canvas.addEventListener('touchend', function (event) {
            mobile(event);
            ts.$emit('touchend');
            /*// 解决安卓app中刮奖时页面跟随滚动问题
            if (ua.isDvdApp() && ua.isAndroid() && window.paySuccessInterface && type.isFunction(window.paySuccessInterface.requestDisallowScroll)) {
              window.paySuccessInterface.requestDisallowScroll('0');
            }*/
          }, false);

          // 擦除图层时机,PC端
          canvas.addEventListener('mousedown', function (event) {
            pc(event);
            ts.$emit('mousedown');
          }, false);
          canvas.addEventListener('mousemove', function (event) {
            pc(event);
            ts.$emit('mousemove');
          }, false);
          canvas.addEventListener('mouseup', function (event) {
            pc(event);
            ts.$emit('mouseup');
          }, false);
        }
      }
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";

  .com-scratch-card {
    position: relative;
    user-select: none;
    canvas {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
