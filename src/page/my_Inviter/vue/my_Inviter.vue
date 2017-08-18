<template>
  <div class="myInviter_wrap">
    <!--我的邀请人-->
    <div class="myInviter">
      <div class="myInviter_img">
        <img src="../img/WechatIMG82.jpeg" alt="">
      </div>
      <div class="myInviter_name">
        苹果甜大事件
      </div>
    </div>
    <!--修改邀请人-->
    div.
    <div class="changeBtn">修改邀请人</div>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';

  export default {
    props: {},
    data() {
      return {
        login_form: true,  //登录显示
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      var that = this;
    },
    methods: {}
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
  .myInviter_wrap{
    min-height: 110px;
  }
  .myInviter {
    width: 89.333%;;
    height: 100px;
    margin: 20px auto 0;
    background-color: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(255, 74, 125, 0.11);
    overflow: hidden;
  }

  .myInviter div {
    float: left;
  }

  .myInviter_img {
    width: 60px;
    height: 60px;
    margin: 20px 0 0 20px;
  }

  .myInviter_img img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .myInviter_name{
    font-size: 14px;
    color: #666666;
    margin: 40px 0 0 10px;
  }
  .changeBtn{
    width: 91px;
    height: 24px;
    color: #FF4A7D;
    font-size: 12px;
    margin: 0 auto;
    line-height: 24px;
    position: fixed;
    bottom: 100px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .changeBtn:after{
    content: "";
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: 1px solid;
    border-color: #FF4A7D;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>

