// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import Cookies from 'js-cookie';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import param from '../../../common/js/module/param.js';
import tj from '../../../common/js/module/tj.js';
import popup from '../../../common/js/module/popup.js';
import ua from '../../../common/js/module/ua.js';
import login from '../../../common/js/module/login.js';
import date from '../../../common/js/module/date.js';
import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

// 懒加载初始化
vueLazyload.init(true);

// 页面需要登录
login.needLogin();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
  },
  data() {
    return {
      response: null,
      date: date,
      isBuyer: login.isBuyer(),
      isSeller: login.isSeller(),
      ua: ua,
      error: false
    }
  },
  computed: {
    currentDate(){
      let now = '';
      if (param.get('deviceTime') !== undefined) {
        now = Date.now();
      } else if (this.response) {
        now = this.response.sys_time + '000';
      }
      return date.format(now, 'yyyy-MM-dd');
    },
    isAdviser(){
      return true;
    }
  },
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置app头部标题栏
        native.custom.initHead({
          homeOnHead: 1,
        });

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
        });

        // 初始化轮播图
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          // spaceBetween: 10,
          freeMode: true
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

        // app跳转打开新webview
        if (ua.isDvdApp()) {
          $(document).on('click', 'a', function (event) {
            event.preventDefault();
            native.Browser.open({
              url: `${this.href}`,
            });
          });
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
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/thethirdyears/myWishList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          js_wx_info: 1,
        }),
        success(response) {
          common.checkRedirect(response);
          ts.response = response;
        },
        error(error) {
          // ts.response = require('../json/act_1018_mine.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          ts.error = true;
        }
      });
    },
  },
  filters: {},
});
