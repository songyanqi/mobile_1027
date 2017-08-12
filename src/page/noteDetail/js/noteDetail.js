//import common from '../../../common/js/common.js';
// import Vue from 'vue';

// 前后端分离需要
// import commonSeperateHtml from "../../../common/js/commonSeperateHtml.js";

// 第三方
import $ from '$';
import Cookies from 'js-cookie';

// 工具模块
import encrypt from '../../../common/js/module/encrypt.js';
import util from '../../../common/js/module/util.js';
import tj from '../../../common/js/module/tj.js';
import popup from '../../../common/js/module/popup.js';
import share from '../../../common/js/module/share.js';
import ua from '../../../common/js/module/ua.js';
import native from '../../../common/js/module/native.js';
import param from '../../../common/js/module/param.js';
import login from '../../../common/js/module/login.js';

new Vue({
  el: ".app",
  components: {
    'com-top-title': require("../../../component/com-top-title.vue"),
    'noteDetail':require('../vue/noteDetail.vue')
  },
  data() {
    return {
      response: null,
    }
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

        // 设置分享信息
        // try {
        //   share.setShareInfo({
        //     title: ts.response.data.shareTitle,
        //     desc: ts.response.data.shareDesc,
        //     link: location.href,
        //     imgUrl: ts.response.data.shareImg
        //   });
        // } catch (err) {
        //   console.error(err);
        // }
      });
    }
  },
  beforeCreate() {
  },
  created() {
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
  },
  filters: {},
});
