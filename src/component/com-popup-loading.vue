<template>
  <div class="com-popup-loading">
    <!--居中容器-->
    <div class="middle-wrapper">
      <div class="loadEffect">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},
    data() {
      return {}
    },
    computed: {},
    created(){
    },
    mounted() {
    },
    methods: {},
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";

  // 动画
  @keyframes com-popup-loading-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  // 顶部标题
  .com-popup-loading {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $pageMaxWidth;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.05);
    z-index: 9;
    line-height: 1;
    .middle-wrapper {
      display: table-cell;
      vertical-align: middle;
      text-align: center;

      // 先用着,后期再优化
      .loadEffect{
        width: 100px;
        height: 100px;
        position: relative;
        margin: 0 auto;
      }
      .loadEffect span{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #FF4A7D;
        position: absolute;
        -webkit-animation: load 1.04s ease infinite;
      }
      @-webkit-keyframes load{
        0%{
          opacity: 1;
        }
        100%{
          opacity: 0.2;
        }
      }
      .loadEffect span:nth-child(1){
        left: 0;
        top: 50%;
        margin-top:-8px;
        -webkit-animation-delay:0.13s;
      }
      .loadEffect span:nth-child(2){
        left: 14px;
        top: 14px;
        -webkit-animation-delay:0.26s;
      }
      .loadEffect span:nth-child(3){
        left: 50%;
        top: 0;
        margin-left: -8px;
        -webkit-animation-delay:0.39s;
      }
      .loadEffect span:nth-child(4){
        top: 14px;
        right:14px;
        -webkit-animation-delay:0.52s;
      }
      .loadEffect span:nth-child(5){
        right: 0;
        top: 50%;
        margin-top:-8px;
        -webkit-animation-delay:0.65s;
      }
      .loadEffect span:nth-child(6){
        right: 14px;
        bottom:14px;
        -webkit-animation-delay:0.78s;
      }
      .loadEffect span:nth-child(7){
        bottom: 0;
        left: 50%;
        margin-left: -8px;
        -webkit-animation-delay:0.91s;
      }
      .loadEffect span:nth-child(8){
        bottom: 14px;
        left: 14px;
        -webkit-animation-delay:1.04s;
      }


      .loadEffect{
        width: 100px;
        height: 100px;
        position: relative;
        margin: 0 auto;
      }
      .loadEffect span{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #FF4A7D;
        position: absolute;
        -webkit-animation: load 1.04s ease infinite;
      }
      @-webkit-keyframes load{
        0%{
          -webkit-transform: scale(1.2);
          opacity: 1;
        }
        100%{
          -webkit-transform: scale(.3);
          opacity: 0.5;
        }
      }
      .loadEffect span:nth-child(1){
        left: 0;
        top: 50%;
        margin-top:-10px;
        -webkit-animation-delay:0.13s;
      }
      .loadEffect span:nth-child(2){
        left: 14px;
        top: 14px;
        -webkit-animation-delay:0.26s;
      }
      .loadEffect span:nth-child(3){
        left: 50%;
        top: 0;
        margin-left: -10px;
        -webkit-animation-delay:0.39s;
      }
      .loadEffect span:nth-child(4){
        top: 14px;
        right:14px;
        -webkit-animation-delay:0.52s;
      }
      .loadEffect span:nth-child(5){
        right: 0;
        top: 50%;
        margin-top:-10px;
        -webkit-animation-delay:0.65s;
      }
      .loadEffect span:nth-child(6){
        right: 14px;
        bottom:14px;
        -webkit-animation-delay:0.78s;
      }
      .loadEffect span:nth-child(7){
        bottom: 0;
        left: 50%;
        margin-left: -10px;
        -webkit-animation-delay:0.91s;
      }
      .loadEffect span:nth-child(8){
        bottom: 14px;
        left: 14px;
        -webkit-animation-delay:1.04s;
      }
    }

  }
</style>
