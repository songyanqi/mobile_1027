<template>
  <div class="input-container-wrap">
    <div class="input-container">
      <div class="tel-num">
        <input v-if="phone_access" placeholder="请填写手机号" v-model="phoneNum" oninput="value=value.replace(/[^\d]/g,'')"
               maxlength="11"
               type="tel">
        <input v-if="!phone_access" placeholder="请填写手机号" v-model="phoneNum" disabled>
      </div>
      <div class="check-number" :class="{abled:(phoneNum.length == 11) && phone_access}">
        <input placeholder="请输入验证码" v-model="checkNum" oninput="value=value.replace(/[^\d]/g,'')" type="tel">
        <div v-if="(phoneNum.length == 11) && phone_access" @click="checkNumber" v-text="checkBttext" alt="有点击事件"></div>
        <div v-else v-text="checkBttext" alt="无点击事件"></div>
      </div>
    </div>
    <div v-if="confirms" class="new-button abled" alt="yes" @click="sub">确定</div>
    <div v-if="!confirms" class="new-button" alt="no">确定</div>
  </div>
</template>
<style scoped>
  .input-container-wrap {
    position: fixed;
    max-width: 640px;
    margin: auto auto;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFFFFF !important;
    padding-top: 50px;
  }

  .input-container > div input {
    width: 100%;
    height: 100%;
    background-color: #F9F9F9;
    border-radius: 20px;
    text-indent: 20px;
    font-size: 14px;
  }

  .input-container > div {
    width: 79%;
    height: 40px;
    margin: 0 auto;
  }

  .input-container .check-number {
    margin-top: 15px;
  }

  .input-container .check-number input {
    width: 69%;
  }

  .input-container .check-number div {
    width: 28%;
    border-radius: 20px;
    border: 1px solid #E1E1E1;
    color: #D5D5D5;
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #FFF;
    float: right;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
  }

  .input-container .check-number.abled div {
    color: #FF4A7D;
    border: 1px solid #FF4A7D;
  }

  .new-button {
    width: 73%;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #E1E1E1;
    color: #D5D5D5;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    margin: 25px auto;
  }

  .new-button.abled {
    background: -webkit-linear-gradient(left, #FF5B5B, #FA1862); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF5B5B, #FA1862); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF5B5B, #FA1862); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF5B5B, #FA1862); /* 标准的语法 */
    -webkit-box-shadow: 0 3px 8px 0 #FF4469;
    -moz-box-shadow: 0 3px 8px 0 #FF4469;
    box-shadow: 0 3px 8px 0 #FF4469;
    border: none;
  }

</style>
<script>
  import layout from "./index/layout.es6";
  export default{
    data: function () {
      return {
        phoneNum: '',
        checkNum: '',
        phone_access: true,
        checkBttext: '验证手机号',
        sendCaptcha: '/api/mg/user/weixin/sendCaptcha',
        bindMobile: '/api/mg/user/weixin/bindMobile'
      }
    },
    mounted: function () {

    },
    methods: {
      checkNumber: function () {
        var scope = this;
        if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(scope.phoneNum))) {
          bravetime.info("请输入正确的手机号");
          return false;
        } else {
          $.ajax({
            type: 'POST',
            url: scope.sendCaptcha,
            data: layout.strSign("bind_phone", {mobile: scope.phoneNum}),
            dataType: "json",
            success: function (result) {
              if (result.code) {
                bravetime.info(result.data.msg);
              } else {
                scope.checkBttext = '60s';
                scope.phone_access = false;
                var seconds = 60;
                var checks = setInterval(function () {
                  seconds--;
                  scope.checkBttext = seconds + 's';
                  if (seconds < 0) {
                    scope.phone_access = true;
                    scope.checkBttext = '验证手机号';
                    clearInterval(checks);
                  }
                }, 1000)
              }
            },
            error: function () {
              bravetime.info("请求出错");
            }
          });
        }
      },
      sub: function () {
        var scope = this;
        if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(scope.phoneNum))) {
          bravetime.info("请输入正确的手机号");
          return false;
        }
        if (scope.checkNum == '') {
          bravetime.info("请输入验证码");
          return false;
        }
        $.ajax({
          type: 'POST',
          url: scope.bindMobile,
          data: layout.strSign("bind_phone", {mobile: scope.phoneNum, captcha: scope.checkNum}),
          dataType: "json",
          success: function (data) {
            if (data.code) {
              bravetime.info(data.data.msg);
            } else {
              location.href = "/settings.html"
            }
          },
          error: function () {
            bravetime.info("请求出错");
          }
        });

      }
    },
    computed: {
      confirms: function () {
        var scope = this;
        return (/^1[3|4|5|7|8][0-9]{9}$/.test(scope.phoneNum)) && (scope.checkNum.length > 0) && (scope.phoneNum.length == 11)
      }
    }
  }
</script>
