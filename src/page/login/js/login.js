// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
// 业务模块
import native from '../../../common/js/module/native.js';
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
        "name": "会员介绍",
        "href": "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button"
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    /*如果是APP，跳转到原生登陆*/
    if (!!navigator.userAgent.match(/davdian|bravetime|vyohui/)) {
      native.Account.login({
        success: function (result) {
          if (typeof result === "string") {
            result = JSON.parse(result);
            const code = +result.code;
            alert(code);
            if (code === 0) {

            } else if (code === 1) {

            } else {

            }
          }
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
