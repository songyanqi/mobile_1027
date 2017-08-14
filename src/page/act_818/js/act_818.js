// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import login from '../../../common/js/module/login.js';
import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
import date from '../../../common/js/module/date.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
    'act-info': require('../vue/act-info.vue'),
    'act-btn': require('../vue/act-btn.vue'),
  },
  data() {
    return {
      response: null,
      state: 1,
      isLogined: login.isLogined(),
      isBuyer: login.isBuyer(),
      isSeller: login.isSeller(),
    }
  },
  computed: {
    nowDate(){
      return date.format(`${this.response.sys_time}000`, `yyyy-MM-dd`);
    },
    todayInfo(){
      let todayInfo = {
        no: 0,
        money: '0',
      };
      switch (this.nowDate) {
        case '2017-07-27':
          todayInfo.no = 1;
          todayInfo.money = '50';
          break;
        case '2017-07-28':
          todayInfo.no = 2;
          todayInfo.money = '40';
          break;
        case '2017-07-29':
          todayInfo.no = 3;
          todayInfo.money = '30';
          break;
        case '2017-07-30':
          todayInfo.no = 4;
          todayInfo.money = '30';
          break;
        case '2017-07-31':
          todayInfo.no = 5;
          todayInfo.money = '30';
          break;
        case '2017-08-01':
          todayInfo.no = 6;
          todayInfo.money = '30';
          break;
      }
      return todayInfo;
    },
  },
  watch: {
    // 监听response变化
    response(){
      // 检测是否需要强制跳转
      common.checkRedirect(this.response);

      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置app头部标题栏
        native.custom.initHead({
          homeOnHead: 1,
          shareOnHead: 1,
        });

        // 设置分享信息
        try {
          share.setShareInfo({
            title: '会员购物返120万无门槛红包',
            desc: '20000个名额120万无门槛红包！限量开抢！',
            link: location.href,
            imgUrl: `${location.protocol}[[static]]/page/act_million/img/share-icon.png`
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
     * 接口名称: 百万返现
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18123210
     */
    getData(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/returnmoney/getData?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({}),
        success(response) {
          ts.response = response;
          // ts.response = require('../json/act_818.json');
          common.checkRedirect(ts.response);
        },
        error(error) {
          // ts.response = require('../json/act_818.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    // 差多少元满足金额
    needMoney(need, current){
      return (parseInt(need * 100) - parseInt(current * 100)) / 100;
    }
  },
  filters: {},
});
