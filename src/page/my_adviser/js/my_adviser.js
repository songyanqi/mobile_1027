// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import popup from '../../../common/js/module/popup.js';
import login from '../../../common/js/module/login.js';
import native from '../../../common/js/module/native.js';
import ua from '../../../common/js/module/ua.js';

login.needLogin();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue')
  },
  data() {
    return {
      response: null,
      show_tel: false,
      show_wx: false,
      show_go_shop_btn: false, //显示去大V店按钮
      inapp: ua.isDvdApp()
    }
  },
  computed: {
    vossion:function () {
      if(this.inapp){
        let nowv =  ua.getDvdAppVersion();
        let comper = ua.compareVersion(nowv,'4.1.0');
        if(comper == 1){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }
  },
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let that = this;
        // 设置app头部标题栏
        native.Browser.setHead({
          title: '我的顾问',
          rightBtn: ""
        });
      });
    }
  },
  beforeCreate() {
    var that = this;
    /*做个判断是不是从详情页和购物车页还有首页过来的*/
    // var historys = JSON.parse(sessionStorage.getItem("history"));
    // var num = historys.length;
    // if(num >= 3){
    //   var referrer = document.referrer.split("/").pop();
    //   if(referrer == 'choose_mama_adviser.html'){
    //     var history2 = historys[num-2].path;
    //     if(history2 == 'index' || history2 == 'detail' || history2 == 'cart'){
    //       that.show_go_shop_btn = true;
    //     }
    //   }
    // }
  },
  created() {
    var that = this;
    if (that.getQueryString("firsttime") == '1') {
      that.show_go_shop_btn = true;
    }
    this.getData();
  },
  methods: {
    dump2choose() {
      popup.toast("更换顾问算法正在更新中...");
      // location.replace("/choose_mama_adviser.html");
    },
    /**
     * 接口名称:
     * 接口文档:
     */
    getData() {
      let that = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/adviser/getAdviserInfo?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({}),
        success(response) {
          common.checkRedirect(response);
          if (response.code) {
            if (response.code == "92001") {
              popup.alert({
                title: "提示",
                text: "请您先选择妈妈顾问",
                btnCallback: function () {
                  location.replace("/choose_mama_adviser.html");
                }
              })
            } else {
              popup.toast(response.data.msg || response.msg);
            }
          } else {
            that.response = response;
          }
        },
        error(error) {
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /*原生复制*/
    copyText: function (wxapp,text) {
      var that = this;
      if(that.vossion){
        native.BrowserTouch.copyText({
          "text": text,
          success: function (result) {
            popup.toast("已复制到剪切板");
          },
          error: function (result) {
            popup.toast("复制失败，请手动复制");
          }
        })
      }else{
        if(wxapp == 'wx'){
          that.show_wx = true;
        }
        if(wxapp == 'tel'){
          that.show_tel = true;
        }
      }
    },
    getQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
  filters: {},
});
