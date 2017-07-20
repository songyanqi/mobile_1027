<template>
  <!--顶部标题-->
  <div class="top-title" :class="classObject" :style="{display: display, width: width}">
    <i class="back-arrow" @click="back"></i>
    {{title}}
  </div>
</template>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  // 动画
  @keyframes animation-top-title-hide {
    0%{
      transform: translateY(0);
    }
    100%{
      transform: translateY(-.44rem);
    }
  }
  @keyframes animation-top-title-show {
    0%{
      transform: translateY(-.44rem);
    }
    100%{
      transform: translateY(0);
    }
  }

  // 顶部标题
  .top-title {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #fafafa;
    color: #333;
    text-align: center;
    font-size: 16px;
    z-index: 1;
    // 箭头
    .back-arrow {
      position: absolute;
      display: block;
      width: 12px;
      height: 12px;
      border-bottom: 1px solid #333;
      border-left: 1px solid #333;
      transform: rotate(45deg);
      top: 15px;
      left: 15px;
    }
    &.animate-hide{
      animation: animation-top-title-hide 0.2s forwards;
    }
    &.animate-show{
      animation: animation-top-title-show 0.2s forwards;
    }
  }
</style>

<!--组件定义-->
<script>
  export default {
//    name: 'top-title',
    data: function () {
      return {
        classObject: {
          'animate-show': false,
          'animate-hide': false,
        },
        display: 'block',
        width: '50px'
      }
    },
    props: {
      title: String
    },
    methods: {
      back() {
        history.back();
      }
    },
    filters: {},
    computed: {},
    watch: {},
    mounted: function () {
      let ts = this;

      // 初始化设置大小与父元素相同,window.resize时也重新设置
      let setWidth = function(){
        ts.width = `${ts.$el.parentNode.clientWidth}px`;
      };
      window.addEventListener('resize', setWidth, false);
      setWidth();

      // 控制隐藏出现
      let titleBarHeight = ts.$el.clientHeight;
      let lastY = 0;
      window.addEventListener('scroll', function () {
        let y = document.body.scrollTop;
        // 页面向下滚动
        if(y - lastY > 0){
          // 滚动距离大于topbar高度
          if (y > titleBarHeight) {
            // top-title向上滑出
            ts.classObject['animate-show'] = false;
            ts.classObject['animate-hide'] = true;
          }
        // 页面向上滚动
        }else if(y - lastY < 0){
          // top-title向下滑入
          ts.classObject['animate-show'] = true;
          ts.classObject['animate-hide'] = false;
        }
        lastY = document.body.scrollTop;
      }, false);
    }
  }
</script>
