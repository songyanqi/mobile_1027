// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
// 业务模块
import native from '../../../common/js/module/native.js';
import login from '../../../common/js/module/login.js';
import ua from '../../../common/js/module/ua.js';
// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
    'login-container': require('../vue/login-container.vue'),
  },
  data() {
    return {
      title: "登录",
      btn: {
        "href": "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button"
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    if(login.isLogined()){
      setTimeout(function(){
        if(ua.isAndroid()){
          native.Browser.close();
        }else{
          history.back();
        }
      }, 500);
      return;
    }
    var that = this;
    /*如果是APP，跳转到原生登陆*/
    if (!!navigator.userAgent.match(/davdian|bravetime|vyohui/)) {
      native.Account.login({
        success: function (result) {
          if (typeof result === "string") {
            result = JSON.parse(result);
            const code = +result.code;
            alert(code);
            if (code === 0) {

            } else if (code === 1 || code === 2) {
              var getQueryString = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
              };
              var referer = getQueryString("referer");
              location.href = referer;
            }
          }
        },
        error: function(){
          history.back();
        }
      });
    }
  },
  created() {

  },
  methods: {
    titlename: function (msg) {
      this.title = msg;
    }
  }
});


