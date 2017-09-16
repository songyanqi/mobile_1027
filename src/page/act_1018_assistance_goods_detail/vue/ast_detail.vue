<template>
  <div style="font-weight: normal;" v-if="response">
    <!--商品详情主图-->
    <div v-for="good in response.data">
      <img class="main_banner" :src="good.goodsImage">
      <div class="count_down">
        <span>10.18周年庆0元抢爆品</span><br>
        <span>距助力结束：{{overTimee}}</span>
      </div>
      <!--商品名称-->
      <div class="goods_title">
        {{good.goodsName}}
      </div>
      <!--价格信息-->
      <div class="price_info">
        <div>
          <span>10.18活动价</span>
          <span>¥</span>
          <span>{{good.activityPrice}}</span>
          <span>¥{{good.goodsPrice}}</span>
        </div>
        <div v-html="good.activityMessage"></div>
      </div>
      <!--流程-->
      <div class="flow_path">
        <div>省钱助力流程</div>
        <div>
          <span>➊ 分享助力&nbsp;&nbsp;</span>
          <span>➋ 好友来助力&nbsp;&nbsp; </span>
          <span>➌ 10.18当天省钱购买</span>
        </div>
      </div>
      <!--detail_rule-->
      <div class="detail_rule">
        详细规则：<br>
        助力省钱时间：2017年10月1日0:00:00-2017年10月17日23:59:59
        助力省钱时间：2017年10月1日0:00:00-2017年10月17日23:59:59
        助力省钱时间：2017年10月1日0:00:00-2017年10月17日23:59:59
        助力省钱时间：2017年10月1日0:00:00-2017年10月17日23:59:59
      </div>
      <!--按钮-->
      <div v-if="isWeixin" class="main_btn">点击右上角“···”按钮发起助力</div>
      <div v-if="isDvdApp" @click="shares" class="main_btn">喊人助力</div>
      <div class="good_detail_imgs">
        <img v-for="imgs in good.details" v-lazy="imgs.detailUrl" v-if="imgs.detailUrl" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import ua from '../../../common/js/module/ua.js';
  import native from '../../../common/js/module/native.js';
  // 业务模块
  import vueLazyload from '../../../common/js/module/vueLazyload.js';

  vueLazyload.init(true);
  export default {
    props: {},
    data() {
      return {
        moke: 'http://www.easy-mock.com/mock/59b92127e0dc663341a8cccd',
        response: null,
        overTimes: null,
        shareInfo: null,
        isWeixin: ua.isWeiXin(),
        isDvdApp: ua.isDvdApp()
      }
    },
    components: {},
    computed: {
      goodsId: function () {
        return location.pathname.split("_")[1].split(".")[0];
      },
      overTimee: function () {
        return this.formatRemainTime(this.overTimes);
      }
    },
    watch: {
      // 监听response变化
      response() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;
          // 设置分享信息
          if (shareInfo) {
            try {
              native.custom.setShareInfo({
                "title": ts.shareInfo.title,
                "desc": ts.shareInfo.desc,
                "imgUrl": ts.shareInfo.imgUrl,
                "link": ts.shareInfo.link,
                "shareDesc": ts.shareInfo.desc,
                success:function () {

                }
              });
            } catch (err) {
              console.error(err);
            }
          }
        });
      }
    },
    created() {
      this.getData();
    },
    mounted() {

    },
    methods: {
      /**
       * 接口名称:
       * 接口文档:
       */
      getData() {
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: this.moke + '/api/mg/sale/userHelpBuy/getHelpGoodsDetail?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: ts.goodsId}),
          success(response) {
            ts.response = response;
            ts.overTimes = response.data[0].overTime;
            ts.deltime();
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /**
       * 格式化倒计时
       */
      formatRemainTime(second) {
        let format = '';
        let oneMinute = 60,
          oneHour = 60 * 60,
          oneDay = 60 * 60 * 24;
        if (second >= oneDay) {
          format = `剩余时间: ${parseInt(second / oneDay)}天${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second >= oneHour) {
          format = `剩余时间: ${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second >= oneMinute) {
          format = `剩余时间: ${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second > 0) {
          format = `剩余时间: ${second}秒`;
        } else if (second <= 0) {
          format = '已开始';
        }
        return format;
      },
      deltime: function () {
        var ts = this;
        setInterval(function () {
          ts.overTimes--;
        }, 1000)
      },
      /***
       * 分享
       * */
      shares: function () {
        var that = this;
        native.custom.share({
          title: that.shareInfo.title,
          desc: that.shareInfo.desc,
          imgUrl: that.shareInfo.imgUrl,
          link: that.shareInfo.link,
          shareDesc: that.shareInfo.desc,
          success: function () {

          }
        })
      }
    },
    filters: {},
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .main_banner {
    width: 100%;
    display: block;
    max-width: 450px;
    margin: 0 auto;
  }

  .count_down {
    height: 56px;
    background-image: url("//pic.davdian.com/free/2017/09/11/Oval.png");
    background-size: 100% 100%;
    text-align: center;
    color: #ffffff;
    span:nth-of-type(1) {
      font-size: 18px;
      display: inline-block;
      margin-top: 5px;
      line-height: 25px;
      height: 25px;
    }
    span:nth-of-type(2) {
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
  }

  .goods_title {
    padding: 0 10px;
    min-height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #333333;
    margin-top: 10px;
  }

  .price_info {
    width: 100%;
    height: 36px;
    overflow: hidden;
    div:nth-of-type(1) {
      color: #FF4A7D;
      float: left;
      margin-left: 10px;
      line-height: 36px;
      span:nth-of-type(1) {
        font-size: 14px;
      }
      span:nth-of-type(2) {
        font-size: 14px;
      }
      span:nth-of-type(3) {
        font-size: 25px;
      }
      span:nth-of-type(4) {
        font-size: 11px;
        color: #999999;
      }
    }
    div:nth-of-type(2) {
      float: right;
      margin-right: 10px;
      font-size: 11px;
      color: #999999;
      position: relative;
      top: 17px;
      span {
        color: #FF4A7D
      }
    }
  }

  .flow_path {
    background-color: #FFF0F0;
    color: #FF4A7D;
    font-size: 12px;
    position: relative;
    margin: 5px 10px 0;
    padding: 10px;
    line-height: 17px;
    :after {
      content: "";
      -webkit-transform: scale(0.5);
      -ms-transform: scale(0.5);
      transform: scale(0.5);
      width: 200%;
      height: 200%;
      border: #FF4A7D solid 1px;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      transform-origin: 0 0;
      border-radius: 8px;
    }
  }

  .detail_rule {
    font-size: 12px;
    color: #666666;
    margin: 10px;
    line-height: 17px;
  }

  .main_btn {
    height: 50px;
    background: -webkit-linear-gradient(left top, #FF5C5C, #FA1862);
    background: -webkit-gradient(linear, left top, right bottom, from(#FF5C5C), to(#FA1862));
    background: -webkit-linear-gradient(top left, #FF5C5C, #FA1862);
    background: linear-gradient(to bottom right, #FF5C5C, #FA1862);
    line-height: 50px;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
  }

  .good_detail_imgs {
    img {
      width: 100%;
      display: inherit;
    }
  }
</style>
