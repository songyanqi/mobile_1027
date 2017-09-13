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
import ua from '../../../common/js/module/ua.js';
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
  },
  data() {
    return {
      response: null,
      swiper: null,
      tabIndex: 0,
      tipType: null,
      screenings: null,
      isDvdApp: ua.isDvdApp(),
      date: date,
      subscribe_1018_goods_ids: localStorage.getItem('subscribe_1018_goods_ids') ? JSON.parse(localStorage.getItem('subscribe_1018_goods_ids')) : [],
    }
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 页面初始化时，设置最近的已开抢tab为默认
        let menuList = this.response.data.menuList;
        for (let i in menuList) {
          if (menuList[i].menu == '已开抢') {
            this.tabIndex = i * 1;
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
          if (screenings === 0) {
            ts.response = response;
          } else {
            ts.response.data.dataList = response.data.dataList;
            ts.$forceUpdate();
          }
        },
        error(error) {
          if (screenings === 0) {
            ts.response = require('../json/list.json');
          } else {
            ts.response.data.dataList = require('../json/list-1.json').data.dataList;
            ts.$forceUpdate();
          }
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
          callback(response);
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);

          callback(require('../json/subscribe.json'));
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
      if (ua.isWeiXin()) {
        if (this.response.data.isFollow === '1') {
          // 调接口
          this.subscribe(goods, function (response) {
            if (response.code == '0') {
              popup.toast('将在活动开始前3分钟进行提醒 可在“我的10.18”中查看已预约的商品', 3000);
              goods.buttonName = '已设预约';
            } else {
              popup.toast('预约失败:' + response.data.msg);
            }
          });
        } else {
          this.tipType = 'weixin-no-focus';
        }
      } else if (ua.isDvdApp()) {
        native.Browser.goodsBook({
          goodsId: goods.goodsId,
          goodsTitle: goods.goodsName,
          goodsImage: goods.imageUrl,
          goodsStartTime: goods.startTime,
          goodsUrl: `${location.origin}/${goods.goodsId}.html`,
          goodsListUrl: location.href,
          success() {
            // 放入localStorage
            this.subscribe_1018_goods_ids.push(goods.goodsId);
            localStorage.setItem('subscribe_1018_goods_ids', JSON.stringify(this.subscribe_1018_goods_ids));
            popup.toast('将在活动开始前3分钟进行提醒 可在“我的10.18”中查看已预约的商品', 3000);
            goods.buttonName = '已设预约';
          },
          error() {
            debugger
          }
        });
      } else {
        if (this.response.data.isFollow === '1') {
          // 调接口
          this.tipType = 'web-focus';
          item.buttonName = '已设预约';
        } else {
          this.tipType = 'web-no-focus';
        }
      }
    },
    /** 已设预约 */
    btnClickSubscribed() {
      popup.toast('将在活动开始前3分钟进行提醒 可在“我的10.18”中查看已预约的商品', 3000);
    },
    /** 等待抢购 */
    btnClickWaitBuy() {
      popup.toast('活动马上就开始抢购了，不要走开～');
    },
    /** 判断是否已经在app中预约 */
    isSubscribedInApp(goodsId) {
      for(let i in this.subscribe_1018_goods_ids){
        if(goodsId == this.subscribe_1018_goods_ids[i]){
          return true;
        }
      }
      return false;
    }
  },
  filters: {},
});
