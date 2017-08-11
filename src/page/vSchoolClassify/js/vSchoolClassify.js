// import {Vue} from '../../../common/js/common.js';
import Vue from 'Vue';
// 前后端分离需要
// import commonSeperateHtml from "../../../common/js/commonSeperateHtml.js";
window.aa = new Date().getTime()
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
    'v-school-classify': require('../vue/vSchoolClassIfy.vue'),
  },
  data() {
    return {
      response: null,
    }
  },
  computed: {},
  beforeCreate() {
  },
});
