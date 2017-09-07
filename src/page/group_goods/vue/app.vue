<!--模板-->
<template>
  <div class="app" v-if="response">
    <!--头部标题-->
    <com-top-title title="大V店限时组团" home></com-top-title>

    <template v-if="response.data.goodsInfo">
      <!--商品信息-->
      <div class="goods-info">
        <div class="pic">
          <img v-lazy="goodsInfo.goodsImgUrl">>
          <div class="sold-out" v-if="parseInt(goodsInfo.goodsStock) <= 0">
            <p class="top">售罄</p>
            <div class="split-line"></div>
            <p class="bottom">SOLD OUT</p>
          </div>
          <div class="box-info">
            <div class="num">{{goodsInfo.pepoleNumber}}人团</div>
            <div class="privilege">省{{goodsInfo.discount}}元</div>
          </div>
        </div>
        <div class="info">
          <div class="top">
            <span class="group-price">¥<span class="num">{{goodsInfo.goodsPrice}}</span></span>
            <span class="price">单价买: ￥{{goodsInfo.realShopPrice}}</span>
            <span class="post" v-for="item in goodsInfo.actLabels">{{item}}</span>
          <span class="income" v-if="response.visitor_status == '3' && goodsInfo.sellerIncome">
            团长返: ¥ {{goodsInfo.sellerIncome}}
            <span class="times"
                  v-if="goodsInfo.sellerRadio && goodsInfo.sellerRadio != '0'">*{{goodsInfo.sellerRadio}}倍</span>
          </span>
          </div>
        </div>
        <div class="desc">{{goodsInfo.goodsName}}</div>
      </div>

      <!--团购信息-->
      <div class="group-info">
        <template v-if="goodsInfo.earliestList.length > 0">
          <div class="tip">有小伙伴正在发起组团，可以直接参加购买~</div>
          <div class="groups-wrapper">
            <ul class="groups">
              <li v-for="item in goodsInfo.earliestList">
                <a :href="item.command.content" @click="joinOtherGroupClick">
                  <img class="head" v-lazy="item.founderAvater">
                  <span class="nickname">{{item.founderName}}</span>
                  <span class="go-group">去参团</span>
                  <span class="remain-place">还差 <span class="num">{{item.leaveNumber}}</span> 人成团</span>
                </a>
              </li>
            </ul>
          </div>
        </template>
        <com-count-down :remain-second="goodsInfo.countDown"></com-count-down>
      </div>

      <!--tab按钮-->
      <div class="tab-btn">
      <span class="btn group" :class="{active: currentTab == 1}" @click="currentTab = 1">
        <span class="word">商品详情</span>
      </span>
        <i class="btn-split"></i>
      <span class="btn mine" :class="{active: currentTab == 2}" @click="currentTab = 2">
        <span class="word">活动须知</span>
      </span>
      </div>

      <div class="split-line"></div>

      <!--商品详情-->
      <div class="goods-detail" v-show="currentTab == 1" v-html="goodsInfo.goodsDesc"></div>

      <!--活动须知-->
      <div class="act-rule" v-show="currentTab == 2">
        <img v-for="(value,index) in goodsInfo.notice" v-lazy="value">
      </div>

      <!--底部购买按钮-->
      <group-bottom-btns :btn-array="goodsInfo.clickBtn" :is-login="response.data.isLogin" :is-intercept="goodsInfo.isIntercept"></group-bottom-btns>

      <!--至顶按钮-->
      <com-to-top-icon></com-to-top-icon>
    </template>

  </div>
</template>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/group_goods.scss";
</style>

<!--组件定义-->
<script>
  import param from '../../../common/js/module/param.js';
  import goods from '../json/goods.json';
  import layout from '../../../../module/index/layout.es6';
  import ua from '../../../common/js/module/ua.js';
  import native from '../../../common/js/module/native.js';
  import share from '../../../common/js/module/share.js';
  import popup from '../../../common/js/module/popup.js';
  import $ from '$';

  export default {
    components: {
      'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
      'com-top-title': require('../../../component/com-top-title.vue'),
      'com-count-down': require('./com-count-down.vue'),
      'group-bottom-btns': require('./group-bottom-btns.vue'),
    },
    props: {},
    data: function () {
      return {
        // 1显示商品详情,2活动须知
        currentTab: 2,
        response: null,
        goodsInfo: null,
        remainSecond: 5,
        comAlertIsShow: true,
      }
    },
    computed: {},
    created: function () {
      this.getData();
    },
    mounted: function () {
      // 设置app头部标题栏
      native.custom.initHead({
        shareOnHead: 1,
        homeOnHead: 1,
      });

      // 已下架
      if (!this.response.data.goodsInfo) {
        popup.alert({
          text: '<p>该商品组团已结束啦～</p>看看其他组团商品吧～',         // 文本（支持传入html。有则显示。）
          btnCallback(){    // 按钮点击回调（有则执行该回调）
            location.href = '/group_list.html';
          }
        });
      }

      try {
        // 设置分享信息
        share.setShareInfo(this.response.data.shareInfo);

        // 为0.5边框设置做的处理(设置.groups-wrapper高度为.groups缩小一半之后的实际高度)
        let groups = document.querySelector('.groups');
        groups && (groups.parentNode.style.height = (groups.clientHeight / 2) + 'px');
      } catch (err) {
      }
    },
    methods: {
      // wiki http://wiki.bravetime.net/pages/viewpage.action?pageId=16580732
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: false,
          url: '/api/mg/sale/reverse/getGoodsInfo?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('group_goods', {
            reverseId: param.get('reverse_id') || '', // || '3584',
            groupId: param.get('group_id') || '',
            sourceRefer: param.get('sourceRefer') || '',
          }),
          success: function (response) {
            // PHP控制页面跳转逻辑(3该商品已参团或参团)
            if (response && response.data.type == '3' && response.data.redirectUrl) {
              window.addEventListener('DOMContentLoaded', function () {
                location.replace(response.data.redirectUrl);
              }, false);
              return;
            }
            ts.response = response;
            ts.goodsInfo = ts.response.data.goodsInfo;
          }
        });
      },
      joinOtherGroupClick(){
        layout.statistics({
          production: 12,
          action: 1,
          action_type: 1,
        });
      },
    },
  }
</script>
