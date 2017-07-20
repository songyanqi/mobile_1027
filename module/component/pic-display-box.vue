<template>
  <!--顶部标题-->
  <div class="pic-display-box" :class="{show: isShow, hide: !isShow}">
    <div class="cell">
      <div class="mask"></div>
      <div class="content">
        <div class="close-btn" @click="close">
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <img :src="picUrl">
      </div>
    </div>
  </div>
</template>

<!--组件定义-->
<script>
  export default {
    data: function () {
      return {
        isShow: false,
        picUrl: null,
        classObject: {},
        styleObject: {}
      }
    },
    props: {},
    methods: {
      show(picUrl){
        this.picUrl = picUrl;
        this.isShow = true;
      },
      close(){
        this.isShow = false;
      }
    },
    filters: {},
    computed: {},
    watch: {},
    mounted: function () {
    }
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  .pic-display-box {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    vertical-align: middle;
    &.show {
      display: table;
    }
    &.hide {
      display: none;
    }
    .cell {
      position: relative;
      display: table-cell;
      width: 100%;
      height: 100%;
      vertical-align: middle;
      text-align: center;
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        z-index: -1;
      }
      .content {
        position: relative;
        display: inline-block;
        width: 80%;
        font-size: 0;
        .close-btn {
          position: absolute;
          width: .30rem;
          height: .30rem;
          top: -.15rem;
          right: -.15rem;
          border-radius: 50%;
          background: #bcbbbb;
          cursor: pointer;
          .line {
            position: absolute;
            top: 50%;
            left: 15%;
            width: 70%;
            border-top: 1px solid #fff;
            &:first-of-type {
              transform: rotate(45deg);
            }
            &:last-of-type {
              transform: rotate(-45deg);
            }
          }
        }
        img {
          max-width: 100%;
        }
      }
    }
  }
</style>
