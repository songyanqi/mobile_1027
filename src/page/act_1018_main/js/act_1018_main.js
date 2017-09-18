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
import login from '../../../common/js/module/login.js';
import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';
import date from '../../../common/js/module/date.js';
// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
    'com-footer': require('../../../component/com-footer.vue'),
    'com-act-subscribe': require('../vue/com-act-subscribe.vue'),
    'com-act-lightbrand': require('../vue/lightBrand.vue'),
    'com-act-assistance': require('../../act_1018_assistance/vue/com-act-assistance.vue'),
  },
  data() {
    return {
      response: null,
      topics: [
        {id: '14376', content: null},
        {id: '14377', content: null},
        {id: '14378', content: null}
      ],
      actBeginTime: new Date(2017, 10, 18),
      countDown: date.getCountDown(new Date(2017, 10, 18)),
      isShowBeginPop: false,
      isShowBeginPopCloseAnimation: false,
      start_1018_flag: false,
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
  },
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        let video = document.querySelector('video');
        video.muted = true;
        // alert(video);
        video.play();

        //微信必须加入Weixin JSAPI的WeixinJSBridgeReady才能生效
        document.addEventListener("WeixinJSBridgeReady", function () {
          // alert('WeixinJSBridgeReady');
          video.play(); //视频自动播放
        }, false);

        // var options = {};
        //
        // var player = videojs('aaa', options, function onPlayerReady() {
        //   videojs.log('Your player is ready!');
        //
        //   debugger
        //   // In this context, `this` is the player that was created by Video.js.
        //   this.play();
        //
        //   // How about an event listener?
        //   this.on('ended', function() {
        //     videojs.log('Awww...over so soon?!');
        //   });
        // });

        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

        // 开启10.18弹窗
        setTimeout(function () {
          ts.isShowBeginPop = localStorage.getItem('start_1018_flag') ? false : true;
        }, 5000);
        // ts.isShowBeginPop = 1;

        // 我的10.18弹窗
        setTimeout(function () {
          ts.start_1018_flag = localStorage.getItem('start_1018_flag');
        }, 1000);

        // 刷新倒计时
        setInterval(function () {
          ts.countDown = date.getCountDown(ts.actBeginTime);
          // ts.$forceUpdate();
        }, 1000);

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
    this.getTopics();
  },
  mounted() {
  },
  methods: {
    /**
     * 接口名称: 获取主会场活动信息
     * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=18546916
     */
    getData(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/theThirdYears/index?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          js_wx_info: 1,
        }),
        success(response) {
          ts.response = response;
        },
        error(error) {
          ts.response = require('../json/act_1018_main.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /**
     * 获取头图图片地址
     * 默认头图地址: http://pic.davdian.com/free/2017/09/13/750_895_fef7e55d54bb1a61d6598bdcbfc523ff.jpg
     */
    getTopics(){
      let ts = this;
      for (let i in ts.topics) {
        let topic = ts.topics[i];
        $.ajax({
          cache: false,
          async: true,
          url: `http://18686604386.davdian.com/t-${topic.id}.html?_=${Date.now()}`,
          // url: `http://18686604386.vyohui.cn/t-9919.html?_=${Date.now()}`,
          // url: `http://18686604386.bravetime.net/t-13451.html?_=${Date.now()}`,
          type: 'get',
          dataType: 'text',
          data: {},
          success(response) {
            topic.content = response;
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      }
    },
    /** 关闭1018弹窗 */
    closeBeginPop(){
      let ts = this;
      ts.isShowBeginPopCloseAnimation = true;
      setTimeout(function () {
        ts.isShowBeginPop = false;
        localStorage.setItem('start_1018_flag', 1);
        ts.start_1018_flag = 1;
        ts.$forceUpdate();
      }, 1000);
    }
  },
  filters: {},
});
