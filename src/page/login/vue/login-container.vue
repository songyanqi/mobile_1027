<template>
  <!--登录表单-->
  <!--正常登陆-->
  <div>
    <div class="inputbox" style="margin-top: 50px">
      <input type="tel" placeholder="请输入您的手机号" v-model="mobile" name="mobile">
      <img src="../img/clearInput.png" v-if="mobile != ''" v-on:click="mobile = ''">
    </div>
    <div class="inputbox">
      <input type="tel" placeholder="请输入密码" v-model="password" name="password">
      <img src="../img/clearInput.png" v-if="password != ''" v-on:click="password = ''">
    </div>
    <!--登录或注册按钮-->
    <div v-if="mobile == '' || password == ''" class="loginbtn" style="opacity: 0.4">登录</div>
    <div v-else class="loginbtn">登录</div>
    <!--忘记密码和注册账号按钮-->
    <div class="forget_sign">
      <a class="forgets">忘记密码</a>
      <a class="sign">注册会员</a>
    </div>
  </div>
</template>
<script>
  export default {
    props: {},
    data() {
      return {
        mobile: '',
        password:''
      }
    },
    computed: {},
    created() {
    },
    mounted() {

    },
    methods: {}
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
  .inputbox {
    width: 78.666%;
    height: 40px;
    background-color: #F8F8F8;
    margin: 15px auto;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }

  .inputbox input {
    background-color: #F8F8F8F8;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    padding: 10px 30px 10px 16px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 1px;
    border: none;
  }

  .inputbox img {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 12px;
    right: 12px;
  }

  *:focus {
    outline: none;
  }

  ::-webkit-input-placeholder {
    color: #999;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #999;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #999;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #999;
  }
  .loginbtn{
    width: 73.3333%;
    height: 40px;
    margin: 25px auto;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #FFFFFF;
    background: -webkit-linear-gradient(left, #FF5C5C, #FA1862);
    background: linear-gradient(to right, #FF5C5C, #FA1862);
    border-radius: 20px;
    font-weight: 300;
  }
  .disablebtn{
    opacity: 0.4;
  }
  .forget_sign{
    width: 78.666%;
    height: 17px;
    line-height: 17px;
    padding-top: 17px;
    margin: 0 auto;
    font-size:12px;
  }
  .forget_sign a{
    display: inline-block;
    font-size:12px;
    color:#999999;
  }
  .forgets{
    float: left;
  }
  .sign{
    float: right;
  }
</style>
<style>
  body, html {
    background-color: #FFFFFF;
  }
</style>
