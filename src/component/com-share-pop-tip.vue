<!--分享提示浮层-->
<template>
  <div class="com-share-pop-tip" :style="styleObject" @click="close">
    <img class="arrow" src="http://pic.davdian.com/free/pointer.png">
    <div class="tip">
      <template v-if="isWeixin">
        <p>请点击右上角“分享”按钮,</p>
        <p>然后可以选择“发送给朋友”、“分享到朋友圈”或者“复制链接”后发送链接给朋友。</p>
      </template>
      <template v-if="!isWeixin">
        <p>请复制地址栏链接，将链接发送给朋友</p>
      </template>
    </div>
  </div>
</template>

<script>
  import ua from '../common/js/module/ua.js';

  export default {
    data: function () {
      return {
        styleObject: {
          display: 'block'
        },
        isWeixin: ua.isWeiXin(),
      }
    },
    props: {
      classObject: {

      },
      type: String  // 取值weixin
    },
    components: {},
    methods: {
      show(){
//        this.styleObject.display = 'block';
      },
      close(){
//        this.styleObject.display = 'none';
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    filters: {},
    computed: {},
    watch: {},
    created: function () {
    },
    mounted: function () {
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  @import "../common/css/util/all";

  // 分享提示浮层
  .com-share-pop-tip {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    height: 100%;
    background-color: #000;
    opacity: 0.8;
    z-index: 99;
    display: none;
    .arrow {
      position: absolute;
      top: 0;
      right: ptr(30);
    }
    .tip {
      margin-top: ptr(100);
      color: #ffffff;
      font-size: ptr(15);
      padding: 0 ptr(30);
      text-align: center;
    }
  }

</style>
