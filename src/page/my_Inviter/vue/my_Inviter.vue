<template>
  <div>
    <!--我的邀请人-->
    <div class="myInviter">
      <div class="myInviter_img">
        <img src="../img/WechatIMG82.jpeg" alt="">
      </div>
      <div class="myInviter_name">
        苹果甜大事件
      </div>
    </div>
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
 .myInviter{
   width: 89.333%;;
   height: 100px;
   margin: 20px auto 0;
   background-color: #FFFFFF;
   border-radius: 8px;
   box-shadow: 0 4px 6px rgba(255, 74, 125, 0.11);
   overflow: hidden;
 }
  .myInviter_img{
    width: 60px;
    height: 60px;
  }
</style>

