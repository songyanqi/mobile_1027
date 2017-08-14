<template>
  <div>
    <!--登录表单-->

    <!--正常登陆-->
    <div v-if="login_form">
      <div class="inputbox" style="margin-top: 50px">
        <input type="tel" placeholder="请输入您的手机号" v-model="mobile" name="mobile">
        <img src="../img/clearInput.png" v-if="mobile != ''" v-on:click="mobile = ''">
      </div>
      <div class="inputbox">
        <input type="password" placeholder="请输入密码" v-model="password" name="password">
        <img src="../img/clearInput.png" v-if="password != ''" v-on:click="password = ''">
      </div>
      <!--登录或注册按钮-->
      <div v-if="mobile == '' || password == ''" class="loginbtn" style="opacity: 0.4">登录</div>
      <div v-else class="loginbtn" v-on:click="login">登录</div>
      <!--忘记密码和注册账号按钮-->
      <div class="forget_sign">
        <a class="forgets">忘记密码</a>
        <a class="sign">注册会员</a>
      </div>
    </div>

    <!--注册账号-->
    <div v-if="sign_form">
      <div class="inputbox" style="margin-top: 50px">
        <input type="tel" placeholder="请输入您的手机号" v-model="mobile" name="mobile">
        <img src="../img/clearInput.png" v-if="mobile != ''" v-on:click="mobile = ''">
      </div>
      <div class="inputbox check_input">
        <div>
          <input type="tel" placeholder="请输入验证码" v-model="check_code" name="mobile">
          <img src="../img/clearInput.png" v-if="check_code != ''" v-on:click="check_code = ''">
        </div>
        <div v-if="check_code=='' || get_check" class="get_check_code disable">{{get_checkbtnname}}</div>
        <div v-else class="get_check_code">获取验证码</div>
      </div>
      <div class="inputbox">
        <input type="password" placeholder="请设置密码" v-model="password" name="password">
        <img src="../img/clearInput.png" v-if="password != ''" v-on:click="password = ''">
      </div>
      <div class="inputbox">
        <input type="password" placeholder="请输入邀请码" v-model="invitation_code" name="password">
        <img src="../img/clearInput.png" v-if="invitation_code != ''" v-on:click="invitation_code = ''">
      </div>
      <div class="what_invitation_code">
        <a>什么是邀请码?</a>
      </div>
      <!--注册-->
      <div v-if="mobile=='' || check_code == '' || password == '' || invitation_code == ''"
           class="loginbtn" style="opacity: 0.4">注册
      </div>
      <div v-else class="loginbtn">注册</div>
      <!--已有账号登录-->
      <div class="forget_sign voice_check">
        <a>已有账号登录</a>
      </div>

      <!--邀请码规则-->
      <div v-if="false" class="invit_rule_wrap">
        <div class="invit_rule">
          <div>邀请码规则</div>
          <div>
            <p>1. 每个大V店会员都有一个专属邀请码，您可以向身边的大V店会员索取邀请码；</p>
            <p>2. 邀请码为6位数字+字母组合，或邀请人大V店账户手机号；</p>
            <p>3. 绑定邀请人后，您在大V店APP及果敢时代大V店公众号内都将访问邀请人店铺；</p>
            <p>4. 一个用户只能有一个邀请人，在您绑定邀请人后，可在7天内更换一次邀请人。</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <!--输入邀请码-->
    <div v-if="invite_form">
      <div class="inputbox" style="margin-top: 50px">
        <input type="tel" placeholder="请输入邀请码" v-model="invitation_code" name="mobile">
        <img src="../img/clearInput.png" v-if="invitation_code != ''" v-on:click="invitation_code = ''">
      </div>
      <!--完成-->
      <div v-if="invitation_code == ''" class="loginbtn" style="opacity: 0.4">完成</div>
      <div v-else class="loginbtn">完成</div>
      <!--什么是邀请码-->
      <div class="invitation_info">
        <div>
          <span>-</span>
          什么是邀请码？
          <span>-</span>
        </div>
        <div>
          <p>1. 每个大V店会员都有一个专属邀请码，您可以向身边的大V店会员索取邀请码；</p>
          <p>2. 邀请码为6位数字+字母组合，或邀请人大V店账户手机号；</p>
          <p>3. 绑定邀请人后，您在大V店APP及果敢时代大V店公众号内都将访问邀请人店铺；</p>
          <p>4. 一个用户只能有一个邀请人，在您绑定邀请人后，可在7天内更换一次邀请人。</p>
        </div>
      </div>
    </div>

    <!--忘记密码-->
    <div v-if="forget_form">
      <div class="login_text">
        验证码已发送到 <span style="color: #FF4A7D">17737701050</span>
      </div>
      <div class="inputbox check_input">
        <div>
          <input type="tel" placeholder="请输入验证码" v-model="check_code" name="mobile">
          <img src="../img/clearInput.png" v-if="check_code != ''" v-on:click="check_code = ''">
        </div>
        <div v-if="check_code=='' || get_check" class="get_check_code disable">{{get_checkbtnname}}</div>
        <div v-else class="get_check_code">获取验证码</div>
      </div>
      <div class="inputbox">
        <input type="password" placeholder="设置密码，不少于6位" v-model="password" name="password">
        <img src="../img/clearInput.png" v-if="password != ''" v-on:click="password = ''">
      </div>
      <!--确定-->
      <div v-if="check_code == '' || password == ''" class="loginbtn" style="opacity: 0.4">确定</div>
      <div v-else class="loginbtn">确定</div>
      <!--语音验证-->
      <div class="forget_sign voice_check">
        <a>短信收不到？试试语音验证</a>
      </div>
    </div>

  </div>
</template>
<script>

  export default {
    props: {},
    data() {
      return {
        login_form:true,  //登录显示
        sign_form:false,  //注册显示
        forget_form:false,  //忘记密码显示
        invite_form:false,  //输入邀请码显示
        rule_form:false,  //邀请码规则显示
        mobile: '',
        password: '',
        invitation_code: '',
        check_code: '',
        get_check: false,
        get_checkbtnname: '获取验证码'
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      login:function () {
        /*登录*/
        var that = this;
        if(!that.isTel(that.mobile)){
          bravetime.info("请输入正确的手机号")
        }else{
          var tData = {
            mobile:that.mobile,
            password:that.password
          };
          console.log(tData);
        }
      },
      isTel:function ( t ){
        var tel = $.trim(t);
        var reg = /^1\d{10}$/;
        return reg.test( tel );
      }
    }
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

  .inputbox.check_input {
    background-color: #FFFFFF;
    border-radius: 0;
  }

  .inputbox.check_input div:nth-of-type(1) {
    width: 68.8%;
    height: 100%;
    background-color: #F8F8F8;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    float: left;
  }

  .inputbox.check_input .get_check_code {
    float: left;
    width: 27.79%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #FF4A7D;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 10px;
    font-size: 12px;
    font-weight: normal;
    position: relative;
  }

  .inputbox.check_input .get_check_code:after {
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
    box-sizing: border-box;
  }

  .inputbox.check_input .get_check_code.disable:after {
    border-color: #D5D5D5;
  }

  .inputbox.check_input .get_check_code.disable {
    color: #D5D5D5;
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

  .loginbtn {
    width: 73.3333%;
    height: 40px;
    margin: 25px auto 0;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #FFFFFF;
    background: -webkit-linear-gradient(left, #FF5C5C, #FA1862);
    background: linear-gradient(to right, #FF5C5C, #FA1862);
    border-radius: 20px;
    font-weight: 300;
  }

  .disablebtn {
    opacity: 0.4;
  }

  .forget_sign {
    width: 78.666%;
    height: 17px;
    line-height: 17px;
    padding-top: 17px;
    margin: 0 auto;
    font-size: 12px;
  }

  .forget_sign a {
    display: inline-block;
    font-size: 12px;
    color: #999999;
  }

  .forgets {
    float: left;
    margin-left: 10px;
  }

  .sign {
    float: right;
    margin-right: 11px;
  }

  .invitation_info {
    font-size: 12px;
    font-weight: 300;
    padding: 0 20px;
    color: #999999;
    line-height: 17px;
    position: fixed;
    bottom: 15px;
  }

  .invitation_info div:nth-of-type(1) {
    text-align: center;
  }

  .invitation_info div:nth-of-type(1) span:nth-of-type(1) {
    transform: scale(30, 0.5);
    display: inline-block;
    position: relative;
    right: 45px;
  }

  .invitation_info div:nth-of-type(1) span:nth-of-type(2) {
    transform: scale(30, 0.5);
    display: inline-block;
    position: relative;
    left: 37px;
  }

  .invitation_info p {
    margin-top: 8px;
  }

  .invitation_info p:nth-of-type(1) {
    margin-top: 16px;
  }

  .login_text {
    width: 73.3333%;
    height: 14px;
    text-align: left;
    font-size: 14px;
    padding-left: 10px;
    margin: 50px auto 0;
  }

  .what_invitation_code {
    width: 73.3333%;
    height: 14px;
    text-align: right;
    font-size: 12px;
    margin: 0 auto;
    color: #999999;
  }

  .voice_check {
    text-align: center;
    padding-top: 20px;
  }

  .invit_rule_wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.51);
    max-width: 640px;
    margin: 0 auto;
  }

  .invit_rule {
    width: 73.333%;
    min-height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 0 10px 15px;
  }

  .invit_rule div:nth-of-type(1) {
    font-size: 14px;
    color: #666666;
    text-align: center;
    padding: 12px 0;
    position: relative;
  }

  .invit_rule div:nth-of-type(2) {
    font-size: 14px;
    color: #333333;
    text-align: left;
    line-height: 20px;
    padding-top: 5px;
  }

  .invit_rule div:nth-of-type(3) {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    width: 36px;
    height: 36px;
    background-image: url("../img/clearInput.png");
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: 10px 10px;
  }

  .invit_rule div:nth-of-type(2) p {
    display: inline-block;
    margin-top: 10px;
  }

  .invit_rule div:nth-of-type(1):after {
    content: "";
    display: block;
    position: absolute;
    left: -50%;
    width: 200%;
    height: 1px;
    background: rgba(216, 216, 216, 0.51);
    -webkit-transform: scale(0.5);
    bottom: 0;
    z-index: 1;
  }

</style>
<style>
  body, html {
    background-color: #FFFFFF;
  }
</style>
