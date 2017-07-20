<template>
  <div class="app">
    <!--头部标题-->
    <com-top-title title="团成员列表" border-bottom home></com-top-title>
    <!--全部成员列表-->
    <ul class="all-group-people">
      <template v-for="(member, i) in memberList">
        <li>
          <group-head-portrait :type="member.parendId === '0' ? 'leader' : 'normal'" :src="member.founderAvater"></group-head-portrait>
          <span class="nickname">{{member.founderName}}</span>
          <span class="begin-time">{{member.uTime}} {{member.parendId === '0' ? '开团' : '参团'}}</span>
        </li>
        <div class="split-line"></div>
      </template>
    </ul>
  </div>
</template>

<script>
  import layout from "../../../../module/index/layout.es6"
  import $ from '$';
  import util from '../../../common/js/module/util.js';
  import native from '../../../common/js/module/native.js';
  import share from '../../../common/js/module/share.js';
  import param from '../../../common/js/module/param.js';

  export default {
    components: {
      'com-top-title': require('../../../component/com-top-title.vue'),
      'group-head-portrait': require('../../group_detail/vue/group-head-portrait.vue'),
    },
    props: {},
    data: function () {
      return {
        ajaxing: false,
        response: null,
        memberList: []
      }
    },
    computed: {},
    created: function () {
      this.getData();
    },
    mounted: function () {
      let ts = this;

      // 设置app头部标题栏
      native.custom.initHead();

      // 设置分享信息
      share.setShareInfo(ts.response.data.shareInfo);

      // 触底通知当前列表加载更多
      util.pageScrollToBottom(function () {
        ts.getData();
      });
    },
    methods: {
      getData(){
        // 已经结尾,不要再调接口
        if (this.response && this.response.data.groupList.more == '0') return;
        // 正在请求接口中,不要再调接口
        if (this.ajaxing) return;
        this.ajaxing = true;
        let ts = this;
        $.ajax({
          cache: false,
          async: false,
          url: '/sale/api/reverse/getGroupUsers?_='+Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {
            pageIndex: ts.response ? ts.response.data.groupList.nextPageIndex : 0,
            pageSize: 20,
            groupId: param.get('group_id'),// || 1161193,
            reverseId: param.get('reverse_id'),// || 1161193,
          }),
          success: function (response) {
            debugger
            ts.ajaxing = false;
            ts.response = response;
            ts.memberList = ts.memberList.concat(ts.response.data.groupList.dataList);
//            console.log('组团成员列表数据:');
//            console.log(response);
          },
          error: function(){
            ts.ajaxing = false;
          }
        });
      }
    },
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/group_detail_all.scss";
</style>
