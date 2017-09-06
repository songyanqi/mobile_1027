<template>
  <!--底部菜单栏-->
  <div class="com-act-subscribe">
    爆品预约
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><a href=""><img v-lazy="'http://pic.davdian.com/free/project/seller_mobile/entry-1.png'"></a></div>
        <div class="swiper-slide"><a href=""><img v-lazy="'http://pic.davdian.com/free/project/seller_mobile/entry-1.png'"></a></div>
        <div class="swiper-slide"><a href=""><img v-lazy="'http://pic.davdian.com/free/project/seller_mobile/entry-1.png'"></a></div>
        <div class="swiper-slide"><a href=""><img v-lazy="'http://pic.davdian.com/free/project/seller_mobile/entry-1.png'"></a></div>
        <div class="swiper-slide"><a href=""><img v-lazy="'http://pic.davdian.com/free/project/seller_mobile/entry-1.png'"></a></div>
        <div class="swiper-slide"><a href="">查看更多</a></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
    },
    data() {
      return {
      }
    },
    computed: {},
    created(){
    },
    mounted() {
    },
    methods: {
      /**
       * 接口名称:
       * 接口文档:
       */
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({}),
          success(response) {
            ts.response = response;
          },
          error(error) {
//            ts.response = require('../json/center.json');
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  // 底部菜单栏
  .com-act-subscribe {

  }
</style>
