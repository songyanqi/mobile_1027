// 基础模块
import common from '../../../common/js/common.js';

require("../../../../javascript/base.js");
require("../../../../stylesheet/base.css");
// 第三方模块
import Vue from 'Vue';
import $ from '$';
import Cookies from 'js-cookie';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import util from '../../../common/js/module/util.js';
import tj from '../../../common/js/module/tj.js';
import popup from '../../../common/js/module/popup.js';
import login from '../../../common/js/module/login.js';
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
        "href": "www.baidu.com"
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
    // this.getData();
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData: function () {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          js_wx_info: 1,
        }),
        success(response) {
          ts.response = response;
        },
        error(error) {
          ts.response = require('../json/login.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    titlename: function (msg) {
      this.title = msg;
    }
  }
});
