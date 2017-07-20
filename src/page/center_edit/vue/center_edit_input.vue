<!--模板-->
<template>
  <div class="app input" v-if="response">
    <!--昵称-->
    <template v-if="$route.path == '/nickname'">
      <!--标题-->
      <com-top-title title="昵称">
        <span class="save-btn" :class="{active: canSubmit}" @click="update(2, 'nickname');">保存</span>
      </com-top-title>
      <!--输入框-->
      <div class="input-nickname">
        <input ref="nickname" type="text" placeholder="请设置昵称（8个字最多）" maxlength="8" validate="" @input="onInputChange"
               v-once :value="response.data.nickName">
        <span class="count">{{characterNum !== -1 ? characterNum : response.data.nickName.length}}/8</span>
      </div>
    </template>

    <!--店铺名称-->
    <template v-if="$route.path == '/shop-name'">
      <!--标题-->
      <com-top-title title="店铺名称">
        <span class="save-btn" :class="{active: canSubmit}" @click="update(8, 'shopName');">保存</span>
      </com-top-title>
      <!--输入框-->
      <div class="input-shop-name">
        <input ref="shopName" type="text" placeholder="请设置店铺名称（8个字最多）" maxlength="8" @input="onInputChange" v-once
               :value="response.data.shopName"><span
        class="count">{{characterNum !== -1 ? characterNum : response.data.shopName.length}}/8</span>
      </div>
    </template>

    <!--店铺铺简介-->
    <template v-if="$route.path == '/shop-desc'">
      <!--标题-->
      <com-top-title title="店铺简介">
        <span class="save-btn" :class="{active: canSubmit}" @click="update(7, 'shopDesc');">保存</span>
      </com-top-title>
      <!--输入框-->
      <div class="input-shop-desc">
        <textarea ref="shopDesc" rows="10" placeholder="请设置店铺简介（无限制）" @input="onInputChange" v-once
                  :value="response.data.shopIntro"></textarea>
      </div>
    </template>

    <!--店铺地址-->
    <template v-if="$route.path == '/shop-url'">
      <!--标题-->
      <com-top-title title="店铺地址">
        <span class="save-btn" :class="{active: canSubmit}" @click="update(6, 'shopUrl');">保存</span>
      </com-top-title>
      <!--输入框-->
      <div class="input-shop-url">
        <input ref="shopUrl" type="text" placeholder="请输入4-11位字母或数字" @input="onInputChange" v-once
               :value="response.data.shopDomain" minlength="4" maxlength="11">.davdian.com
      </div>
      <div class="input-shop-url-warn"><i>i</i> 网址是您店铺的重要识别信息，只能修改一次呦</div>
    </template>

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
        characterNum: -1,
      }
    },
    computed: {
      // 能否保存
      canSubmit(){
        return this.characterNum > 0;
      },
    },
    watch: {
      // 监听response变化
      response(){
        let ts = this;

        // 检测强制跳转
        commonSeperateHtml.checkRedirect(ts.response);

        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {

          // 设置app头部标题栏
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
          }
        });

//        this.$refs.toast.show();
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
       * 接口名称:
       * 接口文档:
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
            ts.response = require('../json/center_edit.json');
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /**
       * 接口名称: 更新用户信息
       * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=17041931
       */
      update(type, ref){
        let ts = this;
        if (!ts.canSubmit) return;

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
        param[map[type]] = ts.$refs[ref].value;
//        param[map[type]] = encodeURIComponent(ts.$refs[ref].value);

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
              if (type === 6) {
                // 用新改的域名替换老域名
                let url = location.host.replace(/.*(\.bravetime\.net|\.vyohui\.cn|\.davdian\.com)/, `${param[map[type]]}$1/center_edit.html`);
                location.replace(url);
              } else {
                location.replace('/center_edit.html');
              }
            } else {
              popup.toast(response.data.msg);
            }
          },
          error: function (error) {
            debugger
            console.error('ajax error:' + error.status + ' ' + error.statusText);
//            let response = require('../json/center_edit_input.json');
            if (response.code === 0) {
              if (type === 6) {
                location.href = `${response.shop_url}/center_edit.html`;
              } else {
                location.href = '/center_edit.html';
              }
            } else {
              popup.toast(response.data.msg);
            }
          }
        });
      },
      // 输入框值发生变化
      onInputChange(event){
        this.characterNum = event.currentTarget.value.length;
      }
    },
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
</style>
