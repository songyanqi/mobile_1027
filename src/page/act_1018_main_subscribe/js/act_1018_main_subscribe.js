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
  },
  data() {
    return {
      response: null,
      swiper: null,
    }
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        ts.swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 3.5,
          paginationClickable: true,
          spaceBetween: 30
        });

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
     * 接口名称: 获取爆款预约场次及商品列表
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547026
     */
    getData() {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/explosion/getGoodsList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          js_wx_info: 1,
          screenings: '',
        }),
        success(response) {
          ts.response = response;
        },
        error(error) {
          ts.response = require('../json/act_1018_main_subscribe.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /**
     * 接口名称: 商品预定提醒
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547021
     */
    subscribe(event, goodsId, goodsName, screenings) {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/explosionActive/subscribe?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          goodsId: '',
          goodsName: '',
          screenings: '',
        }),
        success(response) {
          ts.response = response;
        },
        error(error) {
          ts.response = require('../json/subscribe.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);

          if (ts.response.code == '0') {
            popup.toast('将在活动开始前3分钟进行提醒 可在“我的10.18”中查看已预约的商品', 3000);
          }
        }
      });
    },
    /** tab切换 */
    tabClickEvent() {
      this.swiper.slideTo();
    },
  },
  filters: {},
});
