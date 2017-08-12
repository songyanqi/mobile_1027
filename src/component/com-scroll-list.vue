<!--
  名称:滚动列表
  用法:<com-scroll-list><li></li><li></li><li></li></com-scroll-list>
  说明:向上滚动的列表
-->
<template>
  <div class="com-scroll-list">
    <ul ref="ul">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      // 显示几个
      showNum: {
        type: Number,
        default: 5,
      },
      // 几秒钟滚动一个
      speed: {
        type: Number,
        default: 2,
      },
      // 延迟几秒滚动
      delay: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {}
    },
    computed: {},
    created(){
    },
    mounted() {
      let liArr = this.$el.querySelectorAll('li');

      // 大于0行时,设置容器高度为行高 X this.showNum
      if (liArr.length > 0) {
        this.$el.style.height = liArr[0].clientHeight * this.showNum + 'px';
      }
      // 实际行数大于显示行数时滚动
      if (liArr.length >= this.showNum) {
        let duration = liArr.length * this.speed + 's';
        let delay = this.delay + 's';
        let style = this.$refs['ul'].style;
        style.webkitAnimation = 'com-scroll-list-animation '+duration+' '+delay+' linear infinite';
        style.animation = 'com-scroll-list-animation '+duration+' '+delay+' linear infinite';
      }
    },
    methods: {},
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";

  .com-scroll-list {
    overflow: hidden;
    ul {
      @keyframes com-scroll-list-animation {
        100% {
          transform: translateY(-100%);
        }
      }
      /*animation: com-scroll-list-animation linear infinite;*/
    }
  }
</style>
