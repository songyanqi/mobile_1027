<template>
  <div>
    <!--登录表单-->

    <!--正常登陆-->
    <div v-if="login_form">
      <div class="inputbox" style="margin-top: 50px">
        <input type="tel" placeholder="请输入您的手机号" v-model="mobile" name="mobile" autofocus="autofocus">
        <img src="../img/clearInput.png" v-if="mobile != ''" v-on:click="mobile = ''">
      </div>
      <div class="inputbox">
        <input type="password" placeholder="请输入密码" v-model="password" name="password" autocomplete="new-password">
        <img src="../img/clearInput.png" v-if="password != ''" v-on:click="password = ''">
      </div>
      <!--登录或注册按钮-->
      <div v-if="mobile == '' || password == '' || password.length < 6" class="loginbtn" style="opacity: 0.4">登录</div>
      <div v-else class="loginbtn" v-on:click="login">{{loginBtn}}</div>
      <!--忘记密码和注册账号按钮-->
      <div class="forget_sign">
        <a class="forgets" @click="go_forget">忘记密码</a>
        <a class="sign" v-on:click="go_sign">注册会员</a>
      </div>
    </div>

    <!--注册账号-->
    <div v-if="sign_form">
      <div class="inputbox" style="margin-top: 50px">
        <input v-if="get_check" type="tel" v-model="mobile" name="mobile" disabled style="color:#333333;">
        <input v-else type="tel" placeholder="请输入您的手机号" v-model="mobile" name="mobile" autofocus="autofocus">
        <img src="../img/clearInput.png" v-if="mobile != '' && !get_check" v-on:click="mobile = ''">
      </div>
      <div class="inputbox check_input">
        <div>
          <input type="tel" placeholder="请输入验证码" v-model="check_code" name="mobile">
          <img src="../img/clearInput.png" v-if="check_code != ''" v-on:click="check_code = ''">
        </div>
        <div v-if="mobile=='' || get_check || mobile.length < 11" class="get_check_code disable">{{get_checkbtnname}}</div>
        <div v-else class="get_check_code" @click="get_check_codes(1,1,function() {})">{{get_checkbtnname}}</div>
      </div>
      <div class="inputbox">
        <input type="password" placeholder="设置密码，不少于6位" v-model="password" name="password" autocomplete="new-password">
        <img src="../img/clearInput.png" v-if="password != ''" v-on:click="password = ''">
      </div>
      <div v-if="Invite" class="inputbox">
        <input type="text" placeholder="请输入邀请码（非必填）" v-model="invitation_code">
        <img src="../img/clearInput.png" v-if="invitation_code != ''" v-on:click="invitation_code = ''">
      </div>
      <div v-if="Invite" class="what_invitation_code">
        <a @click="what_invite_code">什么是邀请码?</a>
      </div>
      <!--注册-->
      <div v-if="mobile=='' || check_code == '' || password == '' || password.length < 6" class="loginbtn"
           style="opacity: 0.4">注册
      </div>
      <div v-else class="loginbtn" @click="registers">注册</div>
      <!--已有账号登录-->
      <div class="forget_sign voice_check">
        <a v-on:click="go_login">已有账号登录</a>
      </div>

      <!--邀请码规则-->
    </div>

    <div v-if="rule_form" class="com-popup-base">
      <div class="table-cell">
        <div v-show="rule_form" class="box">
          <div>邀请码规则</div>
          <div>
            <p>1. 每个大V店会员都有一个专属邀请码，您可以向身边的大V店会员索取邀请码；</p>
            <p>2. 邀请码为6位数字+字母组合，或邀请人大V店账户手机号；</p>
            <p>3. 绑定邀请人后，您在大V店APP及果敢时代大V店公众号内都将访问邀请人店铺；</p>
            <p>4. 一个用户只能有一个邀请人，在您绑定邀请人后，可在7天内更换一次邀请人。</p>
          </div>
          <div v-on:click="close_what_invite"></div>
        </div>
      </div>
    </div>

    <!--输入邀请码-->
    <div v-if="invite_form">
      <div class="inputbox" style="margin-top: 50px">
        <input type="tel" placeholder="请输入邀请码" v-model="invitation_code" name="mobile" autofocus="autofocus">
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
        验证码已发送到 <span style="color: #FF4A7D">{{mobile}}</span>
      </div>
      <div class="inputbox check_input">
        <div>
          <input type="tel" placeholder="请输入验证码" v-model="check_code" name="mobile" autofocus="autofocus">
          <img src="../img/clearInput.png" v-if="check_code != ''" v-on:click="check_code = ''">
        </div>
        <div v-if="get_check" class="get_check_code disable">{{get_checkbtnname}}</div>
        <div v-else class="get_check_code" @click="get_check_codes(1,2,function() {})">{{get_checkbtnname}}</div>
      </div>
      <div class="inputbox">
        <input type="password" placeholder="设置密码，不少于6位" v-model="password" name="password" autocomplete="new-password">
        <img src="../img/clearInput.png" v-if="password != ''" v-on:click="password = ''">
      </div>
      <!--确定-->
      <div v-if="check_code == '' || password == '' || password < 6" class="loginbtn" style="opacity: 0.4">确定</div>
      <div v-else class="loginbtn" @click="reset_password">确定</div>
      <!--语音验证-->
      <div class="forget_sign voice_check">
        <a @click="get_check_codes(2,2,function() {})">短信收不到？试试语音验证</a>
      </div>
    </div>
  </div>
</template>
<script>
  import popup from '../../../common/js/module/popup.js';
  import ua from '../../../common/js/module/ua.js';
  import strSign from '../../../common/js/module/encrypt.js';

  export default {
    props: {},
    data() {
      return {
        login_form: true,  //登录显示
        sign_form: false,  //注册显示
        forget_form: false,  //忘记密码显示
        invite_form: false,  //输入邀请码显示
        rule_form: false,  //邀请码规则显示
        mobile: '',
        password: '',
        invitation_code: '',
        check_code: '',
        get_check: false, /*正在获取验证码中......*/
        Invite: true, /*不展示邀请码*/
        get_checkbtnname: '获取验证码',
        response: null,
        loginBtn: "登录"
      }
    },
    computed: {
      referer: function () {
        return this.getQueryString("referer");
      },
      hname: function () {
        return location.hostname.split(".")[0];
      },
      origin: function () {
        return location.origin;
      }
    },
    created() {
    },
    mounted() {
      var that = this;
    },
    methods: {
      /*登录*/
      login: function () {
        var that = this;
        if (!that.isTel(that.mobile)) {
          popup.toast("请输入正确的手机号");
        } else {
          var tData = {
            mobile: that.mobile,
            password: that.password
          };
          that.loginBtn = "正在登录...";
          $.ajax({
            url: '/api/mg/auth/user/login?_=' + Date.now(),
            type: 'post',
            dataType: 'json',
            data: strSign(tData),
            success(response) {
              if (response.code) {
                popup.toast(response.data.msg || response.msg);
                that.loginBtn = "登录";
              } else {
                that.response = response;
                if (response.data.hasSellerRel || response.visitor_status == '3' || that.hname != 'bravetime') {
                  that.go_shop();
                } else {
                  that.promptconfirm();
                }
              }
            },
            error(error) {
              console.error('ajax error:' + error.status + ' ' + error.statusText);
              that.loginBtn = "登录";
            }
          });
        }
      },
      /*注册*/
      registers: function () {
        var that = this;
        if (!that.isTel(that.mobile)) {
          popup.toast("请输入正确的手机号");
          return false;
        }
        if (that.password.length < 6) {
          popup.toast("密码不少于6位");
          return false;
        }
        var regiserData = {
          mobile: that.mobile,
          captcha: that.check_code,
          password: that.password
        };
        if (that.Invite) {
          regiserData.inviteCode = that.invitation_code
        }
        /*发送注册请求*/
        $.ajax({
          url: '/api/mg/auth/user/register?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: strSign(regiserData),
          success(response) {
            that.response = response;
            if (response.code) {
              popup.toast(response.data.msg || response.msg);
            } else {
              /*注册*/
              that.go_shop();
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      go_shop: function () {
        var that = this;
        /*如果是体验店或者APP*/
        if ((that.hname == 'bravetime' || ua.isDvdApp()) && that.response.visitor_status != 3) {
          /*登录成功后跳转到refer页*/
          if (that.referer) {
            location.href = that.referer.replace(that.origin, that.response.shop_url);
          } else {
            location.href = that.response.shop_url
          }
        } else {
          location.href = that.referer || '/';
        }
      },
      /*重置密码*/
      reset_password: function () {
        var that = this;
        var tData = {
          mobile: that.mobile,
          password: that.password,
          captcha: that.check_code,
        };
        $.ajax({
          url: '/api/mg/auth/user/resetPassword?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: strSign(tData),
          success(response) {
            that.response = response;
            if (response.code) {
              popup.toast(response.data.msg || response.msg);
            } else {
              /*密码重置成功相当于登录*/
              that.go_shop();
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /*去注册*/
      go_sign: function () {
        var that = this;
        that.sign_form = true;
        that.login_form = false;
        /*只要是体验店地址，展示邀请码*/
        var hname = location.hostname.split(".");
        if (hname[0] != "bravetime") {
          that.Invite = false;
        }
        /*初始化数据*/
        that.password = '';
        that.invitation_code = '';
        that.check_code = '';
        that.get_check = false;
        that.get_checkbtnname = '获取验证码';
        that.$emit("titlename", "注册");
        document.title = "注册";
      },
      /*去登陆*/
      go_login: function () {
        var that = this;
        that.sign_form = false;
        that.login_form = true;
        /*初始化数据*/
        that.password = '';
        that.$emit("titlename", "登录");
        document.title = "登录";
      },
      /*忘记密码*/
      go_forget: function () {
        var that = this;
        if (that.mobile == '') {
          popup.toast("请输入手机号");
          return false;
        }
        if (that.isTel(that.mobile)) {

        } else {
          popup.toast("请输入正确的手机号");
          return false;
        }
        /*发送验证码成功后跳转到修改密码页*/
        that.check_phone(function () {
          /*发送验证码*/
          that.get_check_codes(1, 2, function () {
            /*初始化数据*/
            that.$emit("titlename", "忘记密码");
            document.title = "忘记密码";
            that.login_form = false;
            that.forget_form = true;
            that.get_check = true;
            that.check_code = '';
            that.password = '';
          })
        });
      },
      /*添加邀请人*/
      modify_inviter: function (code) {
        var that = this;
        $.ajax({
          url: '/api/mg/auth/inviter/edit?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: strSign({"inviteCode": code}),
          success(response) {
            if (response.code) {
              popup.toast(response.data.msg || response.msg);
              that.promptconfirm();
            } else {
              location.href = response.shop_url;
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /*什么是邀请码*/
      what_invite_code: function () {
        var that = this;
        that.rule_form = true;
      },
      /*关闭邀请码介绍*/
      close_what_invite: function () {
        var that = this;
        that.rule_form = false;
      },
      /*获取验证码*/
      get_check_codes: function (smsType, sendType, callback) {
        var that = this;
        if (that.isTel(that.mobile)) {
          if (that.get_check) {
            popup.toast("获取验证码过于频繁，一分钟内只能获取一次");
            return false;
          }
          let sData = {
            mobile: that.mobile,
            smsType: smsType,
            sendType: sendType
          };
          $.ajax({
            url: '/api/mg/auth/user/sendSms?_=' + Date.now(),
            type: 'post',
            dataType: 'json',
            data: strSign(sData),
            success(response) {
              that.response = response;
              if (that.response.code) {
                popup.toast(that.response.data.msg || response.msg);
              } else {
                callback();
                popup.toast("发送成功");
                that.get_check = true;
                that.sendLock();
              }
            },
            error(error) {
              console.error('ajax error:' + error.status + ' ' + error.statusText);
            }
          });
        } else {
          popup.toast("请输入正确的手机号");
        }
      },
      sendLock: function () {
        var that = this;
        var t = 60;
        t--;
        // 倒计时
        if (window.interval) {
          clearInterval(window.interval);
        }
        that.get_checkbtnname = t + "s";
        window.interval = setInterval(function () {
          t--;
          that.get_checkbtnname = t + "s";
          if (t <= 0) {
            that.get_checkbtnname = "重新发送";
            that.get_check = false;
            clearInterval(window.interval);
          }
        }, 1000);
      },
      isTel: function (t) {
        var tel = $.trim(t);
        var reg = /^1\d{10}$/;
        return reg.test(tel);
      },
      getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      /*没有绑定关系的邀请码弹框*/
      promptconfirm: function () {
        var that = this;
        var input_html = '<div class="text">\n' +
          '<input type="text" placeholder="请输入邀请码" id="inviteCode" class="input" style="width: 2.4rem;"><div id="invite_boxs" class="invite_boxs top"><div class="invite_title" onclick="stren_invite_boxs()">什么是邀请码？<i class="icon"></i></div><div class="invite_info"><p>1. 每个大V店会员都有一个专属邀请码，您可以向身边的大V店会员索取邀请码；</p>\n' +
          '<p>2. 邀请码为6位数字+字母组合，或邀请人大V店账户手机号；</p>\n' +
          '<p>3. 绑定邀请人后，您在大V店APP及果敢时代大V店公众号内都将访问邀请人店铺；</p>\n' +
          '<p>4. 一个用户只能有一个邀请人，在您绑定邀请人后，可在7天内更换一次邀请人。</p></div></div></div>';
        popup.confirm({
          title: '<span style="color:#666666;font-size: 14px;">邀请码</span>',            // 标题（支持传入html。有则显示。）
          text: input_html,             // 文本（支持传入html。有则显示。）
          okBtnTitle: '提交',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
          cancelBtnTitle: '跳过',   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
          placeholder: '请输入邀请码',
          okBtnCallback() {     // 确定按钮点击回调（有则执行该回调）
            that.modify_inviter(document.getElementById('inviteCode').value);
          },
          cancelBtnCallback() {    // 取消按钮点击回调（有则执行该回调）
            var referer = that.getQueryString("referer");
            /*登录成功后跳转到refer页*/
            that.go_shop();
          },
        });
      },
      /*验证手机号*/
      check_phone:function (callback) {
        var that = this;
        $.ajax({
          url: '/api/mg/auth/user/mobileExists?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: strSign({"mobile": that.mobile}),
          success(response) {
            if (response.code == '80006') {
              callback()
            } else {
              popup.toast(response.data.msg || response.msg);
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      }
    }
  }

  function stren_invite_boxs() {
    var invite_boxs = document.getElementById('invite_boxs');
    if (invite_boxs.className.match(new RegExp('(\\s|^)' + 'top' + '(\\s|$)'))) {
      var reg = new RegExp('(\\s|^)' + 'top' + '(\\s|$)');
      invite_boxs.className = invite_boxs.className.replace(reg, ' ');
    } else {
      invite_boxs.className += " " + "top";
    }
  }
  window.stren_invite_boxs = stren_invite_boxs;
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
    background-color: #F8F8F8;
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
    box-sizing: border-box;
  }

  .inputbox.check_input .get_check_code.disable:after {
    border-color: #D5D5D5;
  }

  .inputbox.check_input .get_check_code.disable {
    color: #D5D5D5;
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
    box-shadow: 0 3px 8px rgba(255, 68, 105, 0.4);
    border-radius: 20px;
    font-weight: normal;
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
    font-weight: normal;
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
    padding-left: 8px;
    margin: 50px auto 0;
    color:#666666;
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

  // 动画
  @keyframes com-alert-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  .com-popup-base {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    line-height: 1;
  }

  .com-popup-base .table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .com-popup-base .table-cell .box {
    display: inline-block;
    border-radius: 0.04rem;
    animation: com-alert-animation 0.5s;
    width: 73.333%;
    min-height: 200px;
    position: relative;
    text-align: center;
    background-color: #FFFFFF;
    padding: 0 10px 15px;
  }

  .com-popup-base .table-cell .box div:nth-of-type(1) {
    font-size: 14px;
    color: #666666;
    text-align: center;
    padding: 12px 0;
    position: relative;
  }

  .com-popup-base .table-cell .box div:nth-of-type(2) {
    font-size: 14px;
    color: #333333;
    text-align: left;
    line-height: 20px;
    padding-top: 5px;
  }

  .com-popup-base .table-cell .box div:nth-of-type(3) {
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

  .com-popup-base .table-cell .box div:nth-of-type(2) p {
    display: inline-block;
    margin-top: 10px;
  }

  .com-popup-base .table-cell .box div:nth-of-type(1):after {
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

  .invite_boxs .invite_title {
    font-size: 12px;
    color: #666666;
    margin-top: 5px;
  }

  .invite_boxs .invite_title .icon {
    display: inline-block;
    vertical-align: 0;
    width: 7px;
    height: 7px;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    margin-right: 10px;
    background: none;
    position: relative;
    left: 2px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    bottom: -2px;
  }

  .invite_boxs.top .invite_title .icon {
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    bottom: 2px;
  }

  .invite_boxs .invite_info {
    font-size: 12px;
    color: #999999;
    text-align: left;
    overflow: hidden;
    font-weight: normal;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -ms-transition: all 1s ease;
    -o-transition: all 1s ease;
    transition: all 1s ease;
    max-height: 300px;
  }

  .invite_boxs.top .invite_info {
    max-height: 0;
  }

  .invite_boxs .invite_info p {
    line-height: 17px;
    margin-top: 8px;
  }
  .com-top-title:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.05);
    -webkit-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
</style>
