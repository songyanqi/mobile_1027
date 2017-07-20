<!--模板-->
<template>
  <div class="app" v-if="response">
    <!--头部标题-->
    <!--<com-top-title :title="groupInfo.goodsName" border-bottom home></com-top-title>-->
    <com-top-title title="大V店限时组团" border-bottom home></com-top-title>

    <!--PHP控制页面跳转逻辑-->
    <div class="php-redirect-tip" v-if="response.data.type == '3'">
      <img v-lazy="'http://pic.davdian.com/free/prompt_ico_2015918_2x.png'">
      <a :href="response.data.redirectUrl">您已有这个商品的组团记录，点击跳转到您的组团界面!</a>
      <i></i>
    </div>

    <!--商品信息-->
    <a :href="groupInfo.goodsInfoUrl">
      <div class="goods-info">
          <span class="pic">
            <img class="goods-img" v-lazy="groupInfo.goodsImgUrl">
              <!--<group-state-icon v-if="response.data.groupStatus == '1'" type="success" :src="groupInfo.founderAvater"></group-state-icon>-->
              <!--<group-state-icon v-if="response.data.groupStatus == '0'" type="wait" :src="groupInfo.founderAvater"></group-state-icon>-->
              <!--<group-state-icon v-if="response.data.groupStatus == '2'" type="fail" :src="groupInfo.founderAvater"></group-state-icon>-->
            <img class="group-state-img" v-if="response.data.groupStatus == '1'" src="http://pic.davdian.com/free/group/group-status-success.png">
            <img class="group-state-img" v-if="response.data.groupStatus == '0'" src="http://pic.davdian.com/free/group/group-status-wait.png">
            <img class="group-state-img" v-if="response.data.groupStatus == '2'" src="http://pic.davdian.com/free/group/group-status-fail.png">
          </span>
          <span class="info">
            <div class="top">
              <span class="num">[{{groupInfo.pepoleNumber}}人团]</span> {{groupInfo.goodsName}}
            </div>
            <div class="middle">
              <span class="group-price">¥ <span class="big">{{groupInfo.goodsPrice}}</span></span>
              <template v-if="response.visitor_status == '3'">
                <span class="income" v-if="groupInfo.sellerIncome && groupInfo.sellerIncome != '0'">团长返 ¥ {{groupInfo.sellerIncome}}</span>
                <span class="income-times" v-if="groupInfo.sellerRadio && groupInfo.sellerRadio != '0'">*{{groupInfo.sellerRadio}}倍</span>
              </template>
            </div>
            <div class="bottom">单价买: ¥ {{groupInfo.realShopPrice}}</div>
          </span>
      </div>
    </a>

    <!--组团信息-->
    <div class="group-info">
      <!--组团人数-->
      <div class="group">
        <template v-if="response.data.type == '8' || response.data.type == '10'">
          <div class="title">
            还有<span class="num">{{groupInfo.leaveNumber}}</span>个名额，赶快参团吧～
          </div>
        </template>
        <template v-else>
          <div class="title" v-if="response.data.groupStatus == '1'">
            {{groupInfo.pepoleNumber}}人团已组团成功，好棒哦~
          </div>
          <div class="title" v-if="response.data.groupStatus == '0' || response.data.groupStatus == '2'">
            还差 <span class="num">{{groupInfo.leaveNumber}}</span> 人，快喊小伙伴一起组团吧~
          </div>
        </template>
        <div class="heads">
          <!--团长或团员(最多5个)-->
          <group-head-portrait
            v-for="(member, i) in groupInfo.tourList"
            v-if="i < 5"
            :type="member.parendId === '0' ? 'leader' : 'normal'"
            :src="member.founderAvater"></group-head-portrait>
          <!--空位置(算上团员最多5个)-->
          <group-head-portrait
            v-for="(value, i) in emptyGroupNum"
            type="empty"></group-head-portrait>
          <!--更多-->
          <!--v-if="groupInfo.tourList.length > 5"-->
          <group-head-portrait
            v-if="parseInt(groupInfo.pepoleNumber) - parseInt(groupInfo.leaveNumber) > 5"
            type="more"
            :href="'/group_detail_all.html?group_id='+(response.data.groupId||'')+'&reverse_id='+(response.data.reverseId||'')"></group-head-portrait>
        </div>
      </div>

      <!--倒计时-->
      <com-count-down :remain-second="groupInfo.countDown" :group-status="response.data.groupStatus"></com-count-down>

      <!--展开组团详情-->
      <div class="detail-list" :class="{show: detailIsShow}" v-if="groupInfo.tourList.length > 0">
        <div class="title" @click="detailIsShow = !detailIsShow">
          <template v-if="!detailIsShow">展开组团详情</template>
          <template v-if="detailIsShow">收起组团详情</template>
          <span class="arrow"></span>
        </div>
        <div class="line"></div>
        <div class="list">
          <div class="arrow"></div>
          <ul>
            <!--团员-->
            <template v-for="(member, i) in groupInfo.tourList" v-if="i < 5">
              <div class="split-line" v-if="i !== 0"></div>
              <li>
                <group-head-portrait :type="member.parendId === '0' ? 'leader' : 'normal'"
                                     :src="member.founderAvater"></group-head-portrait>
                <span class="nickname">{{member.founderName}}</span>
                <span class="begin-time">{{member.uTime}} {{member.parendId === '0' ? '开团' : '参团'}}</span>
              </li>
            </template>
            <!--更多-->
            <template v-if="groupInfo.tourList.length >= 5">
              <div class="split-line"></div>
              <li class="more">
                <a :href="'/group_detail_all.html?group_id='+(response.data.groupId||'')+'&reverse_id='+(response.data.reverseId||'')">查看更多</a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>

    <!--热门组团-->
    <div class="hot-groups">
      <div class="title">
        <i class="arrow"></i>
        <span class="text">热门组团</span>
      </div>
      <ul class="list">
        <li v-for="(hot,i) in response.data.hotList">
          <a :href="hot.command.content" @click="hotGroupsItemClick">
            <img class="pic" v-lazy="hot.imgUrl">
            <div class="goods-name">
              <span class="num">[{{hot.pepoleNumber}}人团]</span> {{hot.goodsName}}
            </div>
            <div class="goods-price">
              <span class="group-price">￥{{hot.goodsPrice}}</span>
              <span class="single-price">单买价￥{{hot.realShopPrice}}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!--底部购买按钮-->
    <group-bottom-btns :btn-array="groupInfo.clickBtn" :is-login="response.data.isLogin" :is-intercept="groupInfo.isIntercept"></group-bottom-btns>

    <!--至顶按钮-->
    <!--<com-to-top-icon></com-to-top-icon>-->
  </div>
</template>

<!--组件定义-->
<script>
  import param from '../../../common/js/module/param.js';
  import layout from '../../../../module/index/layout.es6';
  import ua from '../../../common/js/module/ua.js';
  import share from '../../../common/js/module/share.js';
  import native from '../../../common/js/module/native.js';
  import $ from '$';

  export default {
    components: {
      'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
      'com-top-title': require('../../../component/com-top-title.vue'),
      'com-count-down': require('../../group_goods/vue/com-count-down.vue'),
      'group-state-icon': require('./group-state-icon.vue'),
      'group-head-portrait': require('./group-head-portrait.vue'),
      'group-bottom-btns': require('../../group_goods/vue/group-bottom-btns.vue'),
    },
    props: {},
    data: function () {
      return {
        response: null,
        groupInfo: null,
        detailIsShow: false,
      }
    },
    computed: {
      emptyGroupNum(){
        debugger
        // 最大5个空位置
        let maxEmptyNum = 5 - this.groupInfo.tourList.length;
        maxEmptyNum = maxEmptyNum > 0 ? maxEmptyNum : 0;
        // 需求空位置
        let emptyNum = parseInt(this.groupInfo.pepoleNumber) - this.groupInfo.tourList.length;
        // 实际显示空位置
        emptyNum = emptyNum < maxEmptyNum ? emptyNum : maxEmptyNum;
        emptyNum = emptyNum > 0 ? emptyNum : 0;
        return emptyNum;
      }
    },
    created: function () {
      this.getData();
    },
    mounted: function () {
      // 设置app头部标题栏
      native.custom.initHead({
        shareOnHead: 1
      });

      // 设置分享信息
      share.setShareInfo(this.response.data.shareInfo);
    },
    methods: {
      // wiki http://wiki.bravetime.net/pages/viewpage.action?pageId=16580736
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: false,
          url: '/api/mg/sale/reverse/getDetail?_='+Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {
            reverseId: param.get('reverse_id') || '',
            groupId: param.get('group_id') || '',
//            currentPageUrl: encodeURIComponent(location.href),
          }),
          success: function (response) {
            debugger
            // PHP控制页面跳转逻辑(1未开始)
//            if(response.data.type == '1' && response.data.redirectUrl){
//              window.addEventListener('DOMContentLoaded', function(){
//                location.replace(response.data.redirectUrl);
//              }, false);
//              return;
//            }
//            console.log('组团详情页 接口返回数据:');
//            console.log(response);
//            console.log('组团详情页groupInfo:');
//            console.log(response.data.goodsInfo)
            ts.response = response;
            ts.groupInfo = ts.response.data.goodsInfo;
//            document.title = ts.groupInfo.goodsName;
          }
        });
      },
      hotGroupsItemClick(){
        debugger
        layout.statistics({
          production: 12,
          action: 1,
          action_type: 1,
        });
      },
    },
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/group_detail.scss";
</style>
