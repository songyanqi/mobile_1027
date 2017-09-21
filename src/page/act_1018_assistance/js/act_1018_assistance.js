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
        goodsInfo:null,
        notice:null
      },
    }
  },
  computed: {

  },
  watch: {

  },
  beforeCreate() {

  },
  created() {
    this.getHelpList();
    this.getAnnouncement();
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
          ts.response.goodsInfo = response.data;
          console.log(ts.response);
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
          /*如果公告条数小于100，为了让css动画保持一致，将条数补充为100条*/
          if (response.data.length < 100) {
            let announcementData = [];
            announcementData = response.data;
            let nums = 100 - response.data.length;
            for (var i = 0; i < nums; i++) {
              announcementData.push(response.data[i])
            }
            ts.response.notice = announcementData;
          } else {
            ts.response.notice = response.data;
          }
          console.log(ts.response);
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
  },
  filters: {

  },
});
