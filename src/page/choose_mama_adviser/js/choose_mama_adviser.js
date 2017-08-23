// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import tj from '../../../common/js/module/tj.js';
import popup from '../../../common/js/module/popup.js';
import login from '../../../common/js/module/login.js';
import native from '../../../common/js/module/native.js';



// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-picker-address': require('../../../component/com-picker-address.vue')
  },
  data() {
    return {
      response: null,
      showaddress2:{showaddress: false},
      address:'',
      onces_desc:false
    }
  },
  computed: {},
  watch: {

  },
  beforeCreate() {
  },
  created() {
    // this.getData();
  },
  mounted(){
    var that = this;
    that.response = true;
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    // getData(){
    //   let ts = this;
    //   $.ajax({
    //     cache: false,
    //     async: true,
    //     url: '?_=' + Date.now(),
    //     type: 'post',
    //     dataType: 'json',
    //     data: encrypt({
    //       js_wx_info: 1,
    //     }),
    //     success(response) {
    //       ts.response = response;
    //     },
    //     error(error) {
    //       ts.response = require('../json/choose_mama_adviser.json');
    //       console.error('ajax error:' + error.status + ' ' + error.statusText);
    //     }
    //   });
    // },
    getaddress:function (msg) {
        this.address = msg;
        this.onces_desc = true;
    },
    showadselect:function () {
      this.showaddress2.showaddress = true;
    }
  },
  filters: {},
});
