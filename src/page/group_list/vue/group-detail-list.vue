<!--模板-->
<template>
  <!--我的团购列表-->
  <div class="wrapper" v-if="response">
    <template v-if="list.length > 0">
      <!--列表-->
      <ul class="group-detail-list">
        <li v-for="data in list">
          <a @click="listItemClick(data.command.content, $event)">
            <div class="pic">
              <img v-lazy="data.imgUrl">
              <div class="sold-out" v-if="parseInt(data.goodsStock) <= 0">
                <p class="top">售罄</p>
                <div class="split-line"></div>
                <p class="bottom">SOLD OUT</p>
              </div>
              <div class="box-info">
                <div class="num">{{data.pepoleNumber}}人团</div>
                <div class="privilege">省{{data.discount}}元</div>
              </div>
            </div>
            <div class="desc">{{data.goodsName}}</div>
            <div class="info">
            <span class="left-info">
              <div v-if="data.groupStatus == '0'">还差 {{data.leaveNumber}} 人成团</div>
              <div v-if="data.groupStatus == '1'">组团成功</div>
              <div v-if="data.groupStatus == '2'">组团失败</div>
              <div>{{formatRemainTime(data.remainSecond)}}</div>
            </span>
            <span class="right-info">
              <div v-if="response.visitor_status == '3' && data.sellerIncome">
                预计成团返现:<span class="light"> {{data.sellerIncome}} 元</span>
                <span v-if="data.radioIncome && data.radioIncome != '0'">*{{data.radioIncome}}倍</span>
              </div>
              <div>团长: {{data.consignee}}</div>
            </span>
            </div>
          </a>
        </li>
      </ul>

      <!--列表加载结束-->
      <div class="no-more" v-if="response && response.data.reverseGroup.more == '0'">没有更多啦!</div>
    </template>

    <template v-if="list.length == 0">
      <!--没有任何组团-->
      <div class="no-group">
        您还未发起组团
        <div class="btn" @click="$emit('go-goods-tab')">马上发起组团</div>
      </div>
    </template>
  </div>
</template>

<!--组件定义-->
<script>
  import response from '../json/list.json';
  import encrypt from '../../../common/js/module/encrypt.js';
  import native from '../../../common/js/module/native.js';
  import ua from '../../../common/js/module/ua.js';
  import $ from '$';

  export default {
    components: {},
    props: {
      isSeller: Boolean
    },
    data: function () {
      return {
        ajaxing: false,
        response: null,
        list: [],
        remainTimeInterval: null,
      }
    },
    computed: {},
    created: function () {
      this.getData();
      this.createRemainTimeInterval();
    },
    mounted: function () {
      /*let ts = this;
       // 触底加载更多
       window.addEventListener('scroll', function () {
       if (ts.response && ts.response.data.reverseGroup.more == '1') {
       if (document.documentElement.clientHeight + document.body.scrollTop >= document.body.clientHeight) {
       ts.getData();
       }
       }
       }, false);*/
    },
    destroyed: function () {
      // 清除倒计时interval
      clearInterval(this.remainTimeInterval);
    },
    methods: {
      getData(){
        // 已经结尾,不要再调接口
        if (this.response && this.response.data.reverseGroup.more == '0') return;
        // 正在请求接口中,不要再调接口
        if (this.ajaxing) return;
        this.ajaxing = true;
        // 获取数据
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/mg/sale/reverse/getList?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({
//            bpId: 14,
            pageIndex: ts.response ? ts.response.data.reverseGroup.nextPageIndex : 0,
            pageSize: 30,
            reverseType: ts.isSeller ? 4 : 2,
          })
        }).then(function (response) {
          ts.ajaxing = false;
//          alert('组团:'+JSON.stringify(response.data.reverseGroup.dataList));
          ts.response = response;
          if (ts.response.data.reverseGroup) {
            ts.list = ts.list.concat(ts.response.data.reverseGroup.dataList);
          }
//          console.log('我的组团|我的店铺组团 接口返回数据:');
//          console.log(response);
        }).fail(function () {
          ts.ajaxing = false;
        });
      },
      // 倒计时格式化
      formatRemainTime(second){
        let format = '';
        let oneMinute = 60,
          oneHour = 60 * 60,
          oneDay = 60 * 60 * 24;
        if (second >= oneDay) {
          format = `剩余时间: ${parseInt(second / oneDay)}天${parseInt(second % oneDay / oneHour)}小时`
        } else if (second >= oneHour) {
          format = `剩余时间: ${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分`
        } else if (second >= oneMinute) {
          format = `剩余时间: ${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second > 0) {
          format = `剩余时间: ${second}秒`;
        } else if (second <= 0) {
          format = `团购已结束`;
        }
        return format;
      },
      // 创建倒计时器
      createRemainTimeInterval(){
        let ts = this;
        ts.remainTimeInterval = window.setInterval(function () {
          // 当前时间与上次时间差
          let secondDiff = Date.now() - ts.lastSecondTimestamp;
          ts.lastSecondTimestamp = Date.now();
          for (let obj of ts.list) {
            // 精确时间计算
            if (obj.remainMillionSecond === undefined) {
              obj.remainMillionSecond = obj.remainSecond * 1000;
            } else {
              obj.remainMillionSecond -= secondDiff
            }
            // 显示时间,此处不是1000,因为虽然设定是1000毫秒执行一次,但中间可能会有误差
            if (secondDiff > 1100) {
              obj.remainSecond = parseInt(obj.remainMillionSecond / 1000);
            } else {
              obj.remainSecond = obj.remainSecond - 1;
            }
          }
          ts.$forceUpdate();
        }, 1000);
      },
      listItemClick(url, event){
        event.preventDefault();
        if (ua.isDvdApp()) {
          native.Browser.open({
            url: url
          });
        } else if (ua.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      }
    },
  }
</script>

<!--样式-->
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  // 页面红色部分
  $red: #FF4A7D;

  // 我的团购列表
  .wrapper {
    min-height: ptr(300);
    .group-detail-list {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin-top: ptr(10);
        padding: ptr(10);
        background: #fff;
        cursor: pointer;
        a {
          color: inherit;
          text-decoration: none;
        }
        .pic {
          position: relative;
          text-align: center;
          font-size: 0;
          > img {
            height: ptr(150);
          }
          .sold-out {
            @include center;
            @include circle(ptr(90));
            background: rgba(0, 0, 0, 0.5);
            color: white;
            font-size: 0;
            line-height: 1;
            text-align: center;
            transform: scale(0.7);
            .top{
              position: absolute;
              top: ptr(22);
              width: 100%;
              font-size: ptr(18);
            }
            .split-line{
              margin: ptr(50) auto;
              width: ptr(70);
              border-top: 1px solid white;
              transform: translateY(0.5);
            }
            .bottom{
              position: absolute;
              top: ptr(58);
              width: 100%;
              font-size: ptr(12);
            }
          }
          .box-info {
            position: absolute;
            bottom: 0;
            left: 0;
            display: inline-block;
            border: 1px solid $red;
            border-top-left-radius: ptr(04);
            border-top-right-radius: ptr(04);
            font-size: ptr(12);
            .num {
              color: $red;
            }
            .privilege {
              padding: 0 ptr(02);
              background: $red;
              color: #fff;
            }
          }
        }
        .desc {
          margin-top: ptr(10);
          font-size: ptr(14);
          @include ellipsis(2);
        }
        .info {
          @include clearfix;
          margin-top: ptr(10);
          font-size: ptr(14);
          color: #999;
          .left-info {
            display: inline-block;
            width: 50%;
            float: left;
          }
          .right-info {
            display: inline-block;
            width: 50%;
            float: right;
            text-align: right;
          }
          .light {
            color: $red;
          }
        }
      }
    }

    // 加载结束提示
    .no-more {
      text-align: center;
      padding: ptr(20);
      font-size: ptr(12);
      color: #666;
    }

    // 没有任何组团
    .no-group {
      text-align: center;
      margin-top: ptr(100);
      color: #666666;
      font-size: ptr(14);
      .btn {
        width: ptr(150);
        @include height(ptr(30));
        border: 1px solid #FF4A7D;
        margin: ptr(12) auto;
        color: #FF4A7D;
        display: block;
        border-radius: ptr(3);
      }
    }
  }
</style>
