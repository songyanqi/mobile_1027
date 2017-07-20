<!--模板-->
<template>
  <div class="app main" v-if="response">
    <!--标题-->
    <com-top-title title="编辑资料" :back-btn-click="titleBackClick"></com-top-title>

    <!--所有编辑项-->
    <div class="edit-items">
      <!--头像-->
      <div class="item head" @click="upload(1)">
        <span class="name">修改头像</span>
        <span class="value">
          <img ref="headImg" class="pic"
               :src="response.data.headImage || '[[static]]/page/center/img/default-head.png'">
        </span>
      </div>
      <!--昵称-->
      <a href="#/nickname">
        <div class="item nickname">
          <span class="name">昵称</span>
          <span class="value">{{response.data.nickName || '请设置昵称'}}</span>
        </div>
      </a>
      <!--卖家显示-->
      <template v-if="response.visitor_status === 3">
        <!--店铺名称-->
        <a href="#/shop-name">
          <div class="item shop-name">
            <span class="name">店铺名称</span>
            <span class="value">{{response.data.shopName || '请设置店铺名称'}}</span>
          </div>
        </a>
        <!--店铺简介-->
        <a href="#/shop-desc">
          <div class="item shop-desc">
            <span class="name">店铺简介</span>
            <span class="value">{{response.data.shopIntro || '请设置店铺简介'}}</span>
          </div>
        </a>
        <!--店铺网址-->
        <a href="#/shop-url" @click="shopUrlClick">
          <div class="item shop-url">
            <span class="name">店铺网址</span>
            <span
              class="value">{{response.data.shopDomain ? response.data.shopDomain + '.davdian.com' : '请设置店铺网址'}}</span>
          </div>
        </a>
        <!--店铺背景-->
        <div class="item shop-bg" @click="upload(9);">
          <span class="name">店铺背景</span>
          <span class="value">
          <img ref="shopBg" class="pic"
               :src="response.data.shopBackground || '[[static]]/page/center/img/default-shop-bg.png'">
            <!--<div class="pic"-->
            <!--:style="{'background-image': 'url('+(response.data.shopBackground || '[[static]]/page/center/img/default-shop-bg.png')+')'}"></div>-->
        </span>
        </div>
      </template>
      <!--个人资料-->
      <a href="/index.php?m=default&c=userDetail&a=detail">
        <div class="item info">
          <span class="name">个人资料</span>
          <!--<span class="value">请设置</span>-->
        </div>
      </a>
    </div>

  </div>
</template>

<!--组件定义-->
<script>
  // 前后端分离需要
  import commonSeperateHtml from "../../../common/js/commonSeperateHtml.js";

  // 第三方
  import $ from '$';

  // 工具模块
  import encrypt from '../../../common/js/module/encrypt.js';
  import share from '../../../common/js/module/share.js';
  import ua from '../../../common/js/module/ua.js';
  import native from '../../../common/js/module/native.js';
  import util from '../../../common/js/module/util.js';
  import param from '../../../common/js/module/param.js';
  import ajaxFileUpload from '../../../common/js/module/ajaxFileUpload.js';
  import popup from '../../../common/js/module/popup.js';
  import login from '../../../common/js/module/login.js';

  export default {
    components: {
      'com-top-title': require('../../../component/com-top-title.vue'),
    },
    props: {},
    data() {
      return {
        response: null,
      }
    },
    computed: {},
    watch: {
      // 监听response变化
      response(){
        let ts = this;

        // 检测强制跳转
        commonSeperateHtml.checkRedirect(ts.response);

        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {

          /*// 设置app头部标题栏
           native.custom.initHead({
           shareOnHead: 1,
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
           }*/

        });
      }
    },
    // 检测是否登录
    beforeCreate(){
      if (!login.isLogined()) {
        location.href = '/login.html?referer=' + encodeURIComponent(location.href);
      }
    },
    created() {
      this.getData();
    },
    methods: {
      /**
       * 接口名称: 获取用户信息
       * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=17041929
       */
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/user/center/getUserInfo?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({}),
          success(response) {
            ts.response = response;
          },
          error(error) {
            debugger
//            ts.response = require('../json/center_edit.json');
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      // 上传头像
      upload(type){
        let ts = this;
        ajaxFileUpload.upload({
          owner_id: ts.response.data.userId,
          success: function (response) {
            if (response.errorCode === 0) {
              if (type === 1) {
                ts.update(type, response.data.shop_logo.s);
              } else if (type === 9) {
                ts.update(type, response.data.shop_logo.src);
              }
            } else {
              popup.toast(response.errorMsg);
            }
          },
          error: function (error) {
            debugger
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /**
       * 接口名称: 更新用户信息
       * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=17041931
       */
      update(type, value){
        let ts = this;
        // 后端参数匹配逻辑
        let map = {
          1: 'headImage',
          2: 'nickName',
          3: 'address',
          4: 'personalSign',
          5: 'shopLogo',
          6: 'shopDomain',
          7: 'shopIntro',
          8: 'shopName',
          9: 'shopBackground',
        };
        let param = {
          update: type,
        };
        param[map[type]] = value;

        // 请求修改接口
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/user/center/update?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt(param),
          success: function (response) {
            debugger
            if (response.code === 0) {
              if (type === 1) {
                // 更新头像
                ts.$refs.headImg.src = value;
              } else if (type === 9) {
                // 更新店铺背景
                ts.$refs.shopBg.src = value;
              }
            }
          },
          error: function (error) {
            debugger
            console.error('ajax error:' + error.status + ' ' + error.statusText);

            let response = require('../json/center_edit_input.json');
            // 后端更新成功后更新页面头像
            if (response.code === 0) {
              if (type === 1) {
                // 更新头像
                ts.$refs.headImg.src = value;
              } else if (type === 9) {
                // 更新店铺背景
                ts.$refs.shopBg.src = value;
              }
            }
          }
        });
      },
      // 设置店铺点击
      shopUrlClick(event){
        if (this.response.data.shopDomain != this.response.data.mobile) {
          popup.toast('域名只能修改一次哦');
          event.preventDefault();
        }
      },
      // 左上角标题栏返回点击
      titleBackClick(){
        location.replace('/center.html');
      }
    },
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
</style>
