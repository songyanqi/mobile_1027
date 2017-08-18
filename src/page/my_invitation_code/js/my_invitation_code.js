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

login.needLogin();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue')
  },
  data() {
    return {
      response: null,
      login_form: true,  //登录显示
      isApp: !!navigator.userAgent.match(/davdian|bravetime|vyohui/)
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
          if (typeof result === "string") {
            result = JSON.parse(result);
            const code = +result.code;
            if (code === 0) {
              popup.toast("复制到剪切板失败，请手动复制")
            } else if (code === 1) {
              /*复制成功*/
              popup.toast("已复制到剪切板");
            } else {

            }
          }
        }
      })
    },
    /*分享*/
    shareto:function () {
      var that = this;
      native.custom.shareImg({"bigImageUrl":that.response.data.imgUrl})
    }
  },
  filters: {},
});
