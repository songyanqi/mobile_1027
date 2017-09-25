// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import Cookies from 'js-cookie';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import util from '../../../common/js/module/util.js';
import param from '../../../common/js/module/param.js';
import popup from '../../../common/js/module/popup.js';
import login from '../../../common/js/module/login.js';
import ua from '../../../common/js/module/ua.js';
import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
import date from '../../../common/js/module/date.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

// 懒加载初始化
vueLazyload.init(true);

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
      tabIndex: 0,
      tipType: null,
      screenings: null,
      // app 5.1.0以上
      // isDvdApp: ua.isDvdApp() && ua.compareVersion(ua.getDvdAppVersion(), '5.1.0') >= 0,
      isDvdApp: false,
      date: date,
      // subscribe_1018_goods_ids: localStorage.getItem('subscribe_1018_goods_ids') ? JSON.parse(localStorage.getItem('subscribe_1018_goods_ids')) : [],
      subscribe_1018_goods: localStorage.getItem('subscribe_1018_goods') ? JSON.parse(localStorage.getItem('subscribe_1018_goods')) : [],
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

        // popup.debug({
        //   title: localStorage.getItem('subscribe_1018_goods')
        // });

        // 页面初始化时，设置最近的已开抢tab为默认
        let menuList = this.response.data.menuList;
        for (let i in menuList) {
          if (menuList[i].menu == '已开抢') {
            this.tabIndex = i * 1;
            this.screenings = menuList[i].screenings;
          }
          if (i == '0') {
            this.screenings = menuList[i].screenings;
          }
        }

        // 初始化轮播tab
        this.swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 0,
          initialSlide: this.tabIndex,
        });

        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

        // 设置app头部标题栏
        native.custom.setHead({
          title: document.title,
          shareBtn: '1',
        });

        // 设置分享信息
        try {
          share.setShareInfo({
            title: '周年庆抢不到牛货？快来跟我混！',
            desc: '大V店周年庆|谁说抢货要拼颜值？快来跟我混！提前预约，再也不用担心我抢不到牛货了>>',
            link: location.href,
            imgUrl: `${location.protocol}[[static]]/page/act_1018_main_subscribe/img/share.png`
          }, ts.response);
        } catch (err) {
          console.error(err);
        }
      });
    }
  },
  beforeCreate() {
  },
  created() {
    this.getData(0);
  },
  methods: {
    /**
     * 接口名称: 获取爆款预约场次及商品列表
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547026
     */
    getData(screenings) {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/explosion/getGoodsList?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          js_wx_info: 1,
          screenings: screenings,
        }),
        success(response) {
          common.checkRedirect(response);
          if (screenings === 0) {
            ts.response = response;
          } else {
            ts.response.data.dataList = response.data.dataList;
            ts.$forceUpdate();
          }
        },
        error(error) {
          // if (screenings === 0) {
          //   ts.response = require('../json/list.json');
          // } else {
          //   ts.response.data.dataList = require('../json/list-1.json').data.dataList;
          //   ts.$forceUpdate();
          // }
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /**
     * 接口名称: 商品预定提醒
     * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=18547021
     */
    subscribe(goods, callback) {
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/sale/explosion/subscribe?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          screenings: this.screenings,
        }),
        success(response) {
          common.checkRedirect(response);
          callback(response);
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
          // callback(require('../json/subscribe.json'));
        }
      });
    },
    /** tab切换 */
    swiperSlideClick(index, item) {
      this.swiper.slideTo(index - 2);
      this.tabIndex = index;
      this.screenings = item.screenings;
      this.getData(item.screenings);
    },
    /** 我要预约 */
    btnClickSubscribe(goods) {
      let ts = this;
      if (login.needLogin()) {
        return;
      }
      let startTimeDistance = goods.sTime + '000' - Date.now();
      if (startTimeDistance <= 0) {
        popup.toast('已经开抢啦，请返回重新进入~');
      }
      if (ts.isDvdApp) {
        if (startTimeDistance < 3 * 60 * 1000) {
          popup.toast('马上开抢啦，请返回重新进入~');
          return;
        }
        native.Browser.goodsBook({
          goodsId: goods.goodsId,
          goodsTitle: goods.goodsName,
          goodsImage: goods.imageUrl,
          goodsStartTime: goods.sTime,
          // goodsStartTime: parseInt(Date.now() / 1000 + 5 * 60), // 开始时间设置为5分钟后
          // goodsStartTime: tttt, // 开始时间设置为5分钟后
          // goodsUrl: `${location.origin}/${goods.goodsId}.html`,
          goodsUrl: `/${goods.goodsId}.html`,
          // goodsListUrl: location.href,
          goodsListUrl: location.pathname,
          success() {
            // 放入localStorage
            // ts.subscribe_1018_goods_ids.push(goods.goodsId);
            ts.subscribe_1018_goods.push(goods);
            // localStorage.setItem('subscribe_1018_goods_ids', JSON.stringify(ts.subscribe_1018_goods_ids));
            localStorage.setItem('subscribe_1018_goods', JSON.stringify(ts.subscribe_1018_goods));
            popup.toast('将在活动开始前3分钟进行提醒，可在“我的10.18”中查看已预约的商品', 3000);
            goods.buttonName = '已设预约';
            goods.bespeakNum = parseInt(goods.bespeakNum) + 1;
            ts.$forceUpdate();
          },
          error() {

          }
        });
      } else {
        if (startTimeDistance < 5 * 60 * 1000) {
          popup.toast('马上开抢啦，请返回重新进入~');
          return;
        }
        // 调接口
        ts.subscribe(goods, function (response) {
          if (response.code === 0) {
            if (ua.isWeiXin()) {
              popup.toast('将在活动开始前15分钟进行提醒 可在“我的10.18”中查看已预约的商品', 3000);
            } else {
              ts.tipType = 'web-focus';
            }
            goods.buttonName = '已设预约';
            goods.bespeakNum = parseInt(goods.bespeakNum) + 1;
            ts.$forceUpdate();
          } else if (response.code == 64404) {
            if (ua.isWeiXin()) {
              ts.tipType = 'weixin-no-focus';
            } else {
              ts.tipType = 'web-no-focus';
            }
          } else {
            popup.toast('预约失败:' + response.data.msg);
          }
        });
      }
    },
    /** 已设预约 */
    btnClickSubscribed() {
      if (this.isDvdApp) {
        popup.toast('将在活动开始前3分钟进行提醒 可在“我的10.18”中查看已预约的商品', 3000);
      } else {
        popup.toast('将在活动开始前15分钟进行提醒 可在“我的10.18”中查看已预约的商品', 3000);
      }
    },
    /** 等待抢购 */
    btnClickWaitBuy() {
      popup.toast('活动马上就开始抢购了，不要走开～');
    },
    /** 判断是否已经在app中预约 */
    isSubscribedInApp(goodsId) {
      // for (let i in this.subscribe_1018_goods_ids) {
      //   if (goodsId == this.subscribe_1018_goods_ids[i]) {
      //     return true;
      //   }
      // }
      for (let i in this.subscribe_1018_goods) {
        if (goodsId == this.subscribe_1018_goods[i].goodsId) {
          return true;
        }
      }
      return false;
    }
  },
  filters: {},
});
