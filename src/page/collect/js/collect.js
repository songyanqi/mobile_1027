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
// import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

// 懒加载初始化
vueLazyload.init();

// 在微信中时，立即调用接口判断是否需要微信授权
if (ua.isWeiXin()) {
  // alert(ts.initResponse.data.needWxAuth === '1');
  // alert(Cookies.get('act_baby_weixin_auth'));
  if (ts.initResponse.data.needWxAuth === '1' && Cookies.get('act_baby_weixin_auth') === undefined) {
    Cookies.set('act_baby_weixin_auth', 1, {
      // domain: util.getBaseDomain(),
      // path: '/',
      // expires: 1,   // 有效时间1天
      expires: 1 / 24 / 60    // 有效时间1分钟
    });
    // weixin.goAuthPage(true);
    // ts.initResponse.data.authUrl值为http://open.davdian.com/WechatAPI/auth?access_key=davdian@)!$!)!*&get_open_id=1
    location.href = ts.initResponse.data.authUrl + '&refer=' + location.href;
    throw new Error(`即将跳转微信授权页(${location.href})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
  }
}

// 渲染页面
window.collect=new Vue({
  el: ".app",
  components: {
    'collect':require('../vue/collect.vue')
  },
  data() {
    return {
      response: null,
    }
  },
  computed: {},
  watch: {
    // 监听response变化
    response(){
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置app头部标题栏
        // native.custom.initHead({
        //   'shareOnHead': '1',
        //   'isShowAudio':1,
        //   'isAudioAbsorb':1
        // });

        // 设置分享信息
        // try {
        //   share.setShareInfo({
        //     title: ts.response.data.shareTitle,
        //     desc: ts.response.data.shareDesc,
        //     link: location.href,
        //     imgUrl: ts.response.data.shareImg
        //   });
        // } catch (err) {
        //   console.error(err);
        // }
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
     * 接口名称:
     * 接口文档:
     */
    getData(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          js_wx_info: 1,
        }),
        success(response) {
          ts.response = response;
        },
        error(error) {
          ts.response = require('../json/collect.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
  },
  filters: {},
});
