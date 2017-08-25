// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import popup from '../../../common/js/module/popup.js';
import login from '../../../common/js/module/login.js';
import native from '../../../common/js/module/native.js';

// login.needLogin();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue')
  },
  data() {
    return {
      response: null,
      show_tel: false,
      show_wx: false
    }
  },
  computed: {},
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;
        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

      });
    }
  },
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData() {
      let that = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/adviser/getByAdviserId?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({}),
        success(response) {
          that.response = response;
        },
        error(error) {
          that.response = require('../json/my_adviser.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
  },
  filters: {},
});
