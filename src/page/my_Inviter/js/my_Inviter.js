// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import Cookies from 'js-cookie';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
    'myinviter': require('../vue/my_Inviter.vue'),
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
        try {
          share.setShareInfo({
            title: ts.response.data.shareTitle,
            desc: ts.response.data.shareDesc,
            link: location.href,
            imgUrl: ts.response.data.shareImg
          });
        } catch (err) {
          console.error(err);
        }
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
    getData(){
      let ts = this;
      // $.ajax({
      //   cache: false,
      //   async: true,
      //   url: '?_=' + Date.now(),
      //   type: 'post',
      //   dataType: 'json',
      //   data: encrypt({
      //     js_wx_info: 1,
      //   }),
      //   success(response) {
      //     ts.response = response;
      //   },
      //   error(error) {
      //     ts.response = require('../json/my_Inviter.json');
      //     console.error('ajax error:' + error.status + ' ' + error.statusText);
      //   }
      // });
    },
  },
  filters: {},
});
