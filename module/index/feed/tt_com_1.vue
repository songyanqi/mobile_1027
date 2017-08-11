<template>
  <div id="tt_com_1_wrap" :style="[styleObject,styleTop]">
    <div id="tt_com_1" class="tt_com_1">
      <div>
        <span>
          {{data.title.name}}
          <!--为你推荐-->
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import layout from "../layout.es6"
  export default {
    data(){
      return {
        msg: 'hello vue',
      }
    },
    props: ['data'],
    created: function () {

    },
    computed: {
      styleObject: function () {
        let scope = this;
        let bgColor = scope.data.title.bgColor;
        return {
          backgroundColor: "#" +
          bgColor.slice(2, 8)
        }
      },
      styleTop: function () {
        let scope = this;
        return {
          marginTop: scope.data.marginTop + 'px'
        }
      }
    }
  }
</script>
<style lang="sass" rel="stylesheet/scss">
  .tt_com_1 {
    height: 40px;
    font-size: 16px;
    color: #FF4A7D;
    text-align: center;
    line-height: 40px;
    background: #FFF;
    z-index:5;
    width:100%;
    max-width: 640px;
    position: relative;
    div{
      height: 40px;
      width: 100%;
      span {
        display: inline-block;
        /*background-image: url("//pic.davdian.com/free/2017/06/10/tt_com_1.png");*/
        background-image: url("//pic.davdian.com/free/2017/07/25/heart.png");
        padding-right: 21px;
        background-position: 100% 12px;
        background-repeat: no-repeat;
        background-size: 16px 16px;
      }
    }
    div:after{
      content: "";
      display: block;
      position: absolute;
      left: -50%;
      width: 200%;
      height: 1px;
      background: rgba(216, 216, 216, 0.51);
      -webkit-transform: scale(0.5);
      bottom: 0;
    }
  }
  #tt_com_1_wrap {
    height: 40px;
    width: 100%;
  }

  .like_title_fixed {
    position: fixed;
    top: 0;
    width: 100%;
    -webkit-transition: top .2s;
    -moz-transition: top .2s;
    -ms-transition: top .2s;
    -o-transition: top .2s;
    transition: top .2s;
  }

  .like_title_slide {
    position: fixed;
    top: 44px;
  }
</style>
