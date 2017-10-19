// 基础模块
import common from '../../../common/js/common.js';

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
import localCache from '../../../common/js/module/localCache.js';
import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
    'iphone8':require('../vue/iphone8.vue')
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

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
          homeBtn: '1',
        });

        // 设置分享信息
        try {
          share.setShareInfo({
            title: "大V店周年庆，妈妈顾问赢IPhone 8",
            desc: "妈妈顾问服务人群销售额达到10万，有机会获得IPhone 8一部，仅此一天哦~",
            link: window.location.href,
            imgUrl: "//pic.davdian.com/free/2017/10/11/%E8%B5%A2iphone8%E5%88%86%E4%BA%ABicon.jpg"
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
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData(){
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
          ts.response = require('../json/iphone8.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
  },
  filters: {},
});
