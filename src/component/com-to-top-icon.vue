<template>
  <!--滚动至顶图标-->
  <img class="to-top-icon" @click="toTop" :style="{display: display}"
       :src="'http://pic.davdian.com/free/back_top_icon_0803.png'">
</template>

<!--样式-->
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";


  .to-top-icon {
    position: fixed;
    /*right: .07rem;*/
    margin-left: 3.25rem;
    bottom: .7rem;
    width: .44rem;
    z-index: 5;
  }
</style>

<!--组件定义-->
<script>
  import $ from '$';

  export default {
    props: {},
    data: function () {
      return {
        display: 'none'
      }
    },
    methods: {
      toTop() {
        $('html,body').animate({scrollTop: 0}, 500);
      }
    },
    filters: {},
    computed: {},
    watch: {},
    mounted: function () {
      let ts = this;
      window.addEventListener('scroll', function () {
        if (document.body.scrollTop >= 200) {
          ts.display = 'block';
        } else {
          ts.display = 'none';
        }
      }, false);
    }
  }
</script>
