<template>
  <div class="myInviter_wrap" v-if="response">
    <div v-if="show_code_input">
      <div class="login_text">请输入邀请码</div>
      <div class="inputbox check_input">
        <div><input type="tel" placeholder="请输入验证码" v-model="mobile" name="mobile"></div>
        <div class="get_check_code" v-if="mobile != ''" @click="verification">验证</div>
        <div class="get_check_code greybtn" v-else>验证</div>
      </div>
    </div>
    <!--我的邀请人-->
    <div v-if="my_inviterPage" class="myInviter">
      <div class="myInviter_img">
        <img :src="response.data.headImage" alt="">
      </div>
      <div class="myInviter_name">
        {{response.data.mobile.substr(0,3)+"****"+response.data.mobile.substr(7)}}
      </div>
    </div>
    <!--修改邀请人-->
    <div class="bottoms">
      <div v-if="trun_grey" class="changeBtn greybtn">{{btnName}}</div>
      <div v-else class="changeBtn" @click="modify_inviter">{{btnName}}</div>
      <div class="change_time" v-if="response.data && response.data.editTime && show_edntime">{{response.data.editTime}}后不可再修改</div>
    </div>

    <!--什么是邀请码-->
    <div v-if="show_code_input" class="invitation_info" :class="{'bottom':info_bottom}">
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
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';

  export default {
    props: {},
    data() {
      return {
        response: null,
        my_inviterPage: false, //显示我的邀请人页
        show_code_input: false,  //显示邀请码输入框
        trun_grey: false,   //按钮置灰
        btnName: '',
        show_edntime: true,
        mobile: '',
        inviteCode: '',
        info_bottom:false
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
            debugger
            that.response = response;
            if (response.code) {
              popup.toast(response.data.msg);
            }
            if (response.data) {
              that.$emit("titlename", "我的邀请人");
              document.title = "我的邀请人";
              that.my_inviterPage = true;
              that.btnName = '修改邀请人';
            } else {
              that.$emit("titlename", "添加邀请人");
              document.title = "添加邀请人";
              that.show_code_input = true;
              that.add_inviterPage = true;
              that.btnName = '添加邀请人';
              that.trun_grey = true;
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /*去修改邀请人*/
      to_modify: function () {
        var that = this;
        that.show_code_input = true;  //显示邀请码输入框
        that.my_inviterPage = false; //隐藏我的邀请人
        that.show_edntime = false; //不显示截至修改时间
        that.trun_grey = true;  //置灰按钮
        that.btnName = '确认修改';
        that.$emit("titlename", "修改邀请人");
        document.title = "修改邀请人";
        that.mobile = '';
        that.info_bottom = false;
      },
      /*验证*/
      verification: function () {
        var that = this;
        $.ajax({
          url: 'api/mg/auth/inviter/check?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({"inviteCode": that.mobile}),
          success(response) {
            if (response.code) {
              popup.toast(response.data.msg);
            } else {
              that.my_inviterPage = true; //显示我的邀请人
              that.trun_grey = false;  //按钮可用
              that.response = response;
              if(window.screen.height < 580){
                that.info_bottom = true;
              }
            }
            that.inviteCode = that.mobile;
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /*修改邀请人*/
      modify_inviter: function () {
        var that = this;
        if (!that.show_code_input) {
          that.to_modify()
        } else {
          $.ajax({
            url: '/api/mg/auth/inviter/edit?_=' + Date.now(),
            type: 'post',
            dataType: 'json',
            data: encrypt({"inviteCode": that.mobile}),
            success(response) {
              if (response.code) {
                popup.toast(response.data.msg);
                return false;
              }
              that.show_code_input = false;  //显示邀请码输入框
              that.my_inviterPage = true; //隐藏我的邀请人
              that.show_edntime = false; //不显示截至修改时间
              that.trun_grey = false;  //置灰按钮
              that.btnName = '修改邀请人';
              that.$emit("titlename", "我的邀请人");
              document.title = "我的邀请人";
            },
            error(error) {
              console.error('ajax error:' + error.status + ' ' + error.statusText);
            }
          });
        }
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

  .invitation_info {
    font-size: 12px;
    font-weight: 300;
    padding: 0 20px;
    color: #999999;
    line-height: 17px;
    position: fixed;
    bottom: 15px;
    margin: 50px auto 0;
    left:0;
    right:0;
    max-width: 467px;
  }
  .invitation_info.bottom{
    position: static;
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
</style>

