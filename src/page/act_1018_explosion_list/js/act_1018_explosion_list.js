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
import vueLazyload from '../../../common/js/module/vueLazyload.js';
import layout from "../../../../module/index/layout.es6";
import util from '../../../common/js/module/util.js';
import ua from '../../../common/js/module/ua.js';

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
      timer: ['0点早教专场','8点爸爸专场','12点教育专场','16点居家专场','20点暖心专场'],
      screenings: [1508256000,1508284800,1508299200,1508313600,1508328000],
      response: null
    }
  },
  created() {
  },
  mounted() {
    this.getData();
  },
  methods: {
    /**
     * 接口名称: 助力爆品抢购
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18548318#
     */
    getData() {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/userhelpgoods/getUserHelpGoods?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: layout.strSign("explosiion",{

         }),
        success(response) {
          ts.response = response;
        },
        error(error) {
          ts.response = require('../json/act-explosion.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /** 商品点击 */
    goodsClick(goodsId) {
      let url = '/' + goodsId + '.html';
      // 跳转
      if (ua.isDvdApp()) {
        event.preventDefault();
        native.Browser.open({
          url: url,
        });
      } else {
        location.href = url;
      }
    }
  },
  watch: {
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        // // 设置app头部标题栏
        // native.custom.initHead({
        //   shareOnHead: 0,
        //   btnOnHead: '0'
        // });
        //
        // // 设置app头部标题栏
        // native.custom.setHead({
        //   title: document.title,
        //   homeBtn: '1',
        //   shareBtn: '0',
        //   rightBtn: {    // rightBtn会覆盖其他字段
        //     text: '',
        //     textColor: '#ff4a7d',
        //     action: ''
        //   },
        // });


        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
          homeBtn: '0',
          shareBtn: '1',
        });
      });
    }
  }
});
