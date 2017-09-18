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
import param from '../../../common/js/module/param.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

login.needLogin();
// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: '.app',
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue')
  },
  data() {
    return {
      type: param.get('type',window.location.href), //type为1时是我的预定奖励，type为2时是我预约的商品，type为3时是我预定的商品
      response: null,
      ajaxing: false,
      list: [],
      url: ''
    }
  },
  mounted() {
    let ts = this;
    ts.getData();
    //页面滚动加载
    window.onscroll = function() {
      var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);//真实内容高度
      //视窗高度
      var viewportHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 0;
      //隐藏高度即滚动的高度
      var scrollHeight = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;
      if(pageHeight - viewportHeight - scrollHeight <= 5) {
        ts.getData();
      }
    }
  },
  methods: {
    /**
     * type为1时
     * 接口名称: 服务人群
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547189
     * type为2时
     * 接口名称: 我的预约列表
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547288
     * type为3时
     * 接口名称: 预定商品
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547187
     */
    getData() {
      // 已经结尾,不要再调接口
      if (this.response && (this.response.data.more == '0' || this.response.data.more == undefined)) return;
      // 正在请求接口中,不要再调接口
      if (this.ajaxing) return;
      this.ajaxing = true;
      let ts = this;
      if(ts.type == 1){
        ts.url = '/api/mg/sale/advance/getAwardList?_=';
      } else if(ts.type == 2) {
        ts.url = '/api/mg/sale/explosion/getMyBespeakList?_='
      } else if(ts.type == 3) {
        ts.url = '/api/mg/sale/advance/getAdvanceList?_='
      }
      $.ajax({
        cache: false,
        async: true,
        url: ts.url + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          pageIndex: ts.response ? ts.response.data.nextPageIndex : 0,
          pageSize: 10
        }),
        success(response) {
          ts.ajaxing = false;
          ts.response = response;
          common.checkRedirect(ts.response);
          if(ts.response.data) {
            ts.list = ts.list.concat(ts.response.data.dataList || ts.response.data);
          }
        },
        error(error) {
          // if(ts.type == 1){
          //   ts.response = require('../json/getAwardList.json');
          //   ts.list = ts.list.concat(ts.response.data.dataList);
          // }else if(ts.type == 2) {
          //   ts.response = require('../json/getMyBespeakList.json');
          //   ts.list = ts.list.concat(ts.response.data.dataList);
          // }else if(ts.type == 3) {
          //   ts.response = require('../json/getAdvanceList.json');
          //   ts.list = ts.list.concat(ts.response.data);
          // }
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          ts.ajaxing = false;
        }
      });
    }
  }
});
