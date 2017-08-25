// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import Cookies from 'js-cookie';

// 业务模块
import login from '../../../common/js/module/login.js';
login.needLogin();
// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'myinviter': require('../vue/my_Inviter.vue'),
  },
  data() {
    return {
      response: null,
      title:"邀请人信息"
    }
  },
  computed: {},
  watch: {

  },
  beforeCreate() {

  },
  created() {

  },
  mounted:function () {

  },
  methods: {
    titlename:function (msg) {
      var that = this;
      that.title = msg;
    }
  },
  filters: {},
});
