<template>
  <div class="myInviter_wrap">
    <div v-if="modify_show || add_show">
      <div class="login_text">请输入邀请码</div>
      <div class="inputbox check_input">
        <div><input type="tel" placeholder="请输入验证码" v-model="mobile" name="mobile"></div>
        <div class="get_check_code" v-if="mobile" @click="verification">验证</div>
        <div class="get_check_code greybtn" v-else>验证</div>
      </div>
    </div>
    <!--我的邀请人-->
    <div v-if-="checked || response.data" class="myInviter">
      <div class="myInviter_img">
        <img :src="response.data.headImage" alt="">
      </div>
      <div class="myInviter_name">
        {{response.data.shopName}}
      </div>
    </div>
    <!--修改提示-->
    <div v-if="modify_show" class="changeTip">
      提示：邀请人只能修改一次，本次修改后，
      TA将作为您的终身邀请人，不可再更改
    </div>
    <div v-if="false" class="changeTip">
      提示：邀请人添加后，您在大V店APP及公众号内，
      将固定访问TA的店铺，7天内您可以再修改一次。
    </div>
    <!--修改邀请人-->
    <div class="bottoms">
        <span v-if="modify_show || add_show">
          <span v-if="modify_show">
            <div v-if="checked" class="changeBtn" @click="modify_inviter">确认修改</div>
            <div v-if="!checked" class="greybtn changeBtn">确认修改</div>
          </span>
          <span v-if="add_show">
            <div v-if="checked" class="changeBtn">确认添加</div>
            <div class="changeBtn greybtn">确认添加</div>
          </span>
        </span>
      <div v-else class="changeBtn" @click="to_modify">修改邀请人</div>
      <div class="change_time" v-if="response.data.editTime">{{response.data.editTime}}后不可再修改</div>
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
        response:null,
        login_form: true,  //登录显示
        mobile: '',
        modify_show: false, //修改邀请人展示
        add_show: false, //添加邀请人展示
        de_time: '',  //修改截止时间
        checked: false, //是否验证过
        invite_code: ''
      }
    },
    computed: {},
    created() {
      var that = this;
      that.getData()
    },
    mounted() {
    },
    methods: {
      /*获取邀请人信息*/
      getData() {
        let that = this;
        $.ajax({
          url: 'api/mg/auth/inviter/getInviter?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({}),
          success(response) {
            that.response = response;
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /*去修改邀请人*/
      to_modify: function () {
        var that = this;
        that.modify_show = true;
      },
      /*验证*/
      verification: function () {
        var that = this;
        that.checked = true;
        that.invite_code = that.mobile;
      },
      /*修改邀请人*/
      modify_inviter: function () {
        console.log(this.invite_code);
      },
      isTel: function (t) {
        var tel = $.trim(t);
        var reg = /^1\d{10}$/;
        return reg.test(tel);
      },
    }
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
  .myInviter_wrap {
    padding-bottom: 10px;
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

  .myInviter_name {
    font-size: 14px;
    color: #666666;
    margin: 40px 0 0 10px;
  }

  .bottoms {
    margin-top: 40px;
  }

  .changeBtn {
    width: 91px;
    height: 24px;
    color: #FF4A7D;
    font-size: 12px;
    margin: 0 auto;
    line-height: 24px;
    text-align: center;
    position: relative;
  }

  .changeBtn.greybtn {
    color: #333333;
  }

  .changeBtn.greybtn:after {
    border-color: #E1E1E1;
  }

  .changeBtn:after {
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

  .change_time {
    height: 24px;
    color: #666666;
    font-size: 12px;
    margin: 10px auto 0;
    line-height: 24px;
    text-align: center;
  }

  .inputbox {
    width: 78.666%;
    height: 40px;
    margin: 15px auto 0;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    margin-bottom: 15%;
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

  .inputbox input {
    background-color: #FFFFFF;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    padding: 10px 30px 10px 16px;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 1px;
    border: none;
  }

  .inputbox.check_input .get_check_code {
    float: right;
    width: 27.79%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #FF4A7D;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
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
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .inputbox.check_input .get_check_code.greybtn {
    color: #333333;
  }

  .inputbox.check_input .get_check_code.greybtn:after {
    border-color: #E1E1E1;
  }

  .login_text {
    width: 73.3333%;
    height: 14px;
    text-align: left;
    font-size: 14px;
    padding-left: 10px;
    margin: 50px auto 0;
  }

  .changeTip {
    font-size: 12px;
    color: #666666;
    text-align: center;
    width: 228px;
    margin: 20px auto 0;
    line-height: 17px;
  }
</style>

