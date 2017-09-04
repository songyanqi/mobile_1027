// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import popup from '../../../common/js/module/popup.js';
import login from '../../../common/js/module/login.js';
import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
import nativeAncestry from '../../../common/js/module/nativeAncestor.js';

login.needLogin();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue')
  },
  data() {
    return {
      rule_form: false,
      response: null,
      login_form: true,  //登录显示
      isApp: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
      show_pop: false
    }
  },
  computed: {},
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let that = this;
        // 设置app头部标题栏
        native.custom.initHead({
          showHead: 1,    // 是否展示头部
          backOnHead: 1,  // 头部返回按钮
          btnText: ""
        });
        native.Browser.setHead({
          'title': '邀请好友安装大V店APP',
          'rightBtn': {
            'text': ''
          }
        });
        // 设置分享信息
        try {
          share.setShareInfo({
            imgUrl: that.response.data.imgUrl
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
     * 接口名称:
     * 接口文档:
     */
    getData() {
      let that = this;
      $.ajax({
        url: '/api/mg/auth/inviter/shareInviteCode?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({}),
        success(response) {
          that.response = response;
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /*原生复制*/
    copyText: function (text) {
      native.BrowserTouch.copyText({
        "text": text,
        success: function (result) {
          popup.toast("邀请码已复制到剪切板");
        },
        error: function (result) {
          popup.toast("复制失败，请手动复制");
        }
      })
    },
    /*分享*/
    shareto: function () {
      var that = this;
      native.custom.shareImg({"bigImageUrl": that.response.data.shareUrl, "shareType": '3',})
    },
    /*什么是邀请码*/
    what_invite_code: function () {
      var that = this;
      that.rule_form = true;
    },
    /*关闭邀请码介绍*/
    close_what_invite: function () {
      var that = this;
      that.rule_form = false;
    },
    gtouchstart: function (img) {
      var that = this;
      window.timeOutEvent = setTimeout(function () {
        that.longPress(img);
      }, 300);
      return false;
    },
    gtouchend: function () {
      clearTimeout(window.timeOutEvent);//清除定时器
    },
    gtouchmove: function () {
      clearTimeout(window.timeOutEvent);//清除定时器
      window.timeOutEvent = 0;
    },
    longPress: function (img) {
      window.timeOutEvent = 0;
      nativeAncestry.savePic(img);
    }
  },
  filters: {},
});
