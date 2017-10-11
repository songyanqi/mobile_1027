// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import encrypt from '../../../common/js/module/encrypt.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';
// 懒加载初始化
vueLazyload.init();
// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-act-assistance': require('../vue/com-act-assistance.vue')
  },
  data() {
    return {
      response: {
        goodsInfo: null,
        notice: null
      },
    }
  },
  computed: {},
  watch: {

  },
  beforeCreate() {
    try {
      share.setShareInfo({
        "title": '10.18周年庆喊好友助力，0元抢爆品！',
        "desc": '好友助力随机减钱，助力越多越省钱',
        "imgUrl": 'http://pic.davdian.com/free/20170915_assistance/assistance.png',
        "link": location.href
      });
      setTimeout(function () {
        native.custom.initHead({
          'shareOnHead': '1'
        });
      }, 300);
    } catch (err) {
      console.error(err);
    }
  },
  created() {
    this.getAnnouncement();
    this.getHelpList();
  },
  methods: {
    /**
     * 接口名称:获取助力列表
     * 接口文档:
     */
    getHelpList() {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/userhelpbuy/getHelpList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({}),
        success(response) {
          common.checkRedirect(response);
          ts.response.goodsInfo = response.data;
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /**
     * 接口名称:获取公告列表
     * 接口文档:
     */
    getAnnouncement() {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/userhelpbuy/getAnnouncement?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({}),
        success(response) {
          common.checkRedirect(response);
          ts.response.notice = response.data;
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
  },
  filters: {},
});
