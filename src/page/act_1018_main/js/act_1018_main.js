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
import localCache from '../../../common/js/module/localCache.js';
import util from '../../../common/js/module/util.js';
import ua from '../../../common/js/module/ua.js';
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
    'com-act-reserve': require('../../act_1018_reserve/vue/com-act-reserve.vue'),
  },
  data() {
    return {
      response: null,
      topics: [
        // 头图
        {id: param.get('t1') || '14376', content: null},
        // 上方专题
        {id: param.get('t2') || '14377', content: null},
        // 下方专题
        {id: param.get('t3') || '14378', content: null}
      ],
      actBeginTime: new Date(2017, 10, 18),
      countDown: date.getCountDown(new Date(2017, 10, 18)),
      isShowBeginPop: false,
      isShowBeginPopCloseAnimation: false,
      start_1018_flag: false,
      ua: ua,
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

        // 头图自动播放
        let video = document.querySelector('video');
        if (video) {
          video.muted = true;
          function playVideo() {
            video.play();
          }

          document.addEventListener("WeixinJSBridgeReady", playVideo, false);
          document.addEventListener('touchstart', playVideo, false);
          setTimeout(playVideo, 1000);
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

        // alert(document.querySelector('.gif'));
        // alert(document.querySelector('video'));

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

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
          shareBtn: '1',
        });

        // 开启10.18弹窗
        setTimeout(function () {
          ts.isShowBeginPop = localStorage.getItem('start_1018_flag') ? false : true;
        }, 3000);
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
          let title = null;
          let desc = null;
          if (ts.currentDate <= '2017-10-08') {
            title = '大V店这次玩大啦！3周年庆必杀技提前大揭秘！';
            desc = '大V店|3周年庆玩转全攻略，省钱有招，剁手不疼，快来助力0元抢牛听听>>';
          } else if (ts.currentDate <= '2017-10-11') {
            title = '最受欢迎的100个品牌贺3周年庆，这是要搞大事情！';
            desc = '大V店周年庆|这次玩大了！点亮100个品牌，周年庆优惠由你定，快去参加>>';
          } else if (ts.currentDate <= '2017-10-13') {
            title = '这次玩的就是心跳！低倍通用券限量疯抢！提前预约牛货抢货无忧！';
            desc = '大V店|拼手速抢低倍通用券！好货提前预约，再也不用担心抢不到牛货了>>';
          } else {
            title = '这！么！便宜！怪我咯？大V店3周年庆爆品预定火到爆炸！';
            desc = '大V店|100款明星单品提前预定，预付10元定金最高可抵100元！划算到心花怒放';
          }
          share.setShareInfo({
            title: title,
            desc: desc,
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
    let ts = this;

    this.getData();
    this.getTopics();

    // app下拉异步刷新
    window.iosInterface = window.iosInterface || {};
    window.iosInterface.asynRefresh = function () {
      ts.getData();
      ts.getTopics();
    }
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
        url: '/api/mg/sale/thethirdyears/index?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          js_wx_info: 1,
        }),
        success(response) {
          ts.response = response;

          // 刷新页面
          ts.$forceUpdate();
        },
        error(error) {
          // ts.response = require('../json/act_1018_main.json');
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
        let url = `${location.protocol}//${util.getSecondDomain()}.davdian.com/t-${topic.id}.html?_=${Date.now()}`;
        $.ajax({
          cache: false,
          async: true,
          url: url,
          // url: `http://18686604386.vyohui.cn/t-9919.html?_=${Date.now()}`,
          // url: `http://18686604386.bravetime.net/t-13451.html?_=${Date.now()}`,
          type: 'get',
          dataType: 'text',
          data: {},
          success(response) {
            try {
              if (topic.id == (param.get('t1') || '14376')) {
                response = JSON.parse(response);
              }
              topic.content = response;
              // 刷新页面
              ts.$forceUpdate();
            } catch (err) {

            }
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
