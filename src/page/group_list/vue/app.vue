<!--模板-->
<template>
  <div class="app" v-if="response">
    <!--头部标题-->
    <com-top-title title="大V店组团" border-bottom home></com-top-title>
    <!--广告-->
    <div class="group_ad">
      <template v-for="ad in response.data.banner">
        <a v-if="ad.isClick == '0'" :href="ad.command.content">
          <img class="adPic" v-lazy="ad.imageUrl" v-if="ad.imageUrl" @click="adClick(ad)">
        </a>
        <img class="adPic" v-lazy="ad.imageUrl" v-if="ad.isClick == '1'" @click="showPopPic(ad.smallImageUrl)">
      </template>
      <com-pic-display-box ref="com-pic-display-box"></com-pic-display-box>
    </div>
    <!--tab按钮-->
    <div class="tab-btn">
      <span class="btn group" :class="{active: currentList == 1}" @click="tabBtnClick(1)">
        <span class="word">团购精选</span>
      </span>
      <i class="btn-split"></i>
      <span class="btn mine" :class="{active: currentList == 2}" @click="tabBtnClick(2)">
        <span class="word">
        <template v-if="response.visitor_status == '3'">我的店铺组团</template>
        <template v-if="response.visitor_status != '3'">我的组团</template>
        </span>
      </span>
    </div>

    <!--列表-->
    <keep-alive>
      <!--组团商品-->
      <goods-list v-if="currentList == 1" ref="goods-list" :prop-response="response"></goods-list>
      <!--我的(店铺)组团-->
      <mine-list v-if="currentList == 2" ref="mine-list"
                 :is-seller="response.visitor_status == '3' ? true : false"
                 @go-goods-tab="tabBtnClick(1)"></mine-list>
    </keep-alive>

    <!--至顶按钮-->
    <com-to-top-icon></com-to-top-icon>

    <!--浮动活动-->
    <div class="float-act" v-if="window.float_act_img_url">
      <a :href="window.float_act_jump_url">
        <img :src="window.float_act_img_url">
      </a>
    </div>
  </div>
</template>

<!--组件定义-->
<script>
  import layout from "../../../../module/index/layout.es6";
  import $ from '$';

  import share from '../../../common/js/module/share.js';
  import ua from '../../../common/js/module/ua.js';
  import native from '../../../common/js/module/native.js';
  import util from '../../../common/js/module/util.js';
  import Units from '../../../../javascript/units.js';
  export default {
    components: {
      'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
      'com-top-title': require('../../../component/com-top-title.vue'),
      'com-pic-display-box': require('../../../component/com-pic-display-box.vue'),
      'goods-list': require('./group-goods-list.vue'),
      'mine-list': require('./group-detail-list.vue'),
    },
    props: {},
    data: function () {
      return {
        response: null,
        currentList: 1, // 1显示组团列表,2显示我的组团列表
      }
    },
    computed: {},
    created: function () {
      this.getData();
    },
    mounted: function () {
      let ts = this;
      // 设置app头部标题栏
      native.custom.initHead({
        shareOnHead: 1,
      });

      // 设置分享信息
      share.setShareInfo({
        title: '大V店组团包邮',
        desc: '一件包邮！定期上新，好货低价又包邮，抢到就省到！',
        link: location.href,
        imgUrl: 'http://pic.davdian.com/free/2016/04/09/320_320_0fc3e0dbbadd249b7f1b93a525f0adf0.jpg', // 分享图标
      });

      // 触底通知当前列表加载更多
      util.pageScrollToBottom(function () {
        if (ts.currentList === 1) {
          ts.$refs['goods-list'].getData();
        } else if (ts.currentList === 2) {
          ts.$refs['mine-list'].getData();
        }
      });
    },
    methods: {
      // wiki
      // http://wiki.bravetime.net/pages/viewpage.action?pageId=16580718
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/sale/reverse/getList?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {
            bpId: 14,
            pageIndex: ts.response ? ts.response.data.reverseGroup.nextPageIndex : 0,
            pageSize: 10,
            reverseType: 1,
          })
        }).then(function (response) {
          ts.response = response;
//          console.log('组团列表页顶部 接口返回数据:');
//          console.log(response);
        });
      },
      showPopPic(url){
        this.$refs['com-pic-display-box'].show(url);
      },
      tabBtnClick(num){
        // 我的组团,如果未登录,则跳转登录页
        if (num == 2 && this.response.data.isLogin !== '1') {
//            微信登录
//          if(Units.isWechat()){
//            var host = window.location.host;
//            var hostarr = host.split(".");
//            location.href = "http://open."+hostarr[1]+"."+hostarr[2]+"/WechatLogin/index?referer=" + location.href;
//          }else {
//            location.href = '/login.html?referer=${encodeURIComponent(location.href)}';
//          }
          location.href = '/login.html?referer=${encodeURIComponent(location.href)}';
          return;
        }
        this.currentList = num;
      },
    },
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/group_list.scss";
</style>
