<template>
  <div style="font-weight: normal;background-color: #FFFFFF;padding-bottom: 50px;" v-if="response">
    <!--商品详情主图-->
    <div>
      <img class="main_banner" :src="response.goodsImage">
      <div class="count_down">
        <span>10.18周年庆0元抢爆品</span><br>
        <span>距助力结束：{{overTimes | formatRemainTime}}</span>
      </div>
      <!--商品名称-->
      <div class="goods_title">
        {{response.goodsName}}
      </div>
      <!--价格信息-->
      <div class="price_info">
        <div>
          <span>10.18到手价</span>
          <span>¥</span>
          <span>{{response.activityPrice}}</span>
          <span>¥{{response.goodsPrice}}</span>
        </div>
        <div v-html="response.activityMessage"></div>
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
        1.助力时间：2017.10.01 00:00:00-2017.10.17 23:59:59；<br>
        2.抢购时间：2017.10.18 00:00:00- 2017.10.18 23:59:59；<br>
        3.活动仅限大V店会员参与；<br>
        4.邀请好友助力可获得随机减钱；<br>
        5.每天仅有1次给好友助力的机会，成功助力即可给好友随机减钱，还有机会抽取iphone8；<br>
        6.10月18日当天以活动价支付购买活动商品，支付成功后该商品得到的助力金额将以返现的形式返到【我的】－【总额】－【待结算金额】－【其他收入】里，30天后如果没有退货将转到【待提现金额】；<br>
        7.已发起的助力商品可在【我的10.18】中查看，商品库存有限，助力结束后10月18日当天请尽快购买支付，只有成功支付商品，助力减钱金额才能返现，最高返该商品的到手金额；<br>
        8.其中爸爸的选择纸尿裤和羽绒服这两款商品助力所减金额，最晚于10月19日24点前返现到账，其他商品将在商品支付成功后实时返现；<br>
        9.详情可咨询大V店客服。
      </div>
      <!--按钮-->
      <div v-if="isWeixin" class="main_btn">点击右上角“···”按钮发起助力</div>
      <div v-if="isDvdApp" @click="shares" class="main_btn">喊人助力</div>
      <div v-if="!isDvdApp&&!isWeixin" @click="gowxapp" class="main_btn">喊人助力</div>
      <!--商品详情-->
      <div class="good_detail_title">图文详情</div>
      <div class="good_detail_imgs">
        <img v-for="imgs in response.details" v-lazy="imgs.imgOriginal" v-if="imgs.imgOriginal" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import ua from '../../../common/js/module/ua.js';
  import share from '../../../common/js/module/share.js';
  import native from '../../../common/js/module/native.js';
  import login from '../../../common/js/module/login.js';
  login.needLogin();
  // 业务模块
  import vueLazyload from '../../../common/js/module/vueLazyload.js';
  vueLazyload.init(true);
  export default {
    props: {},
    data() {
      return {
        moke: '',
        response: null,
        overTimes: null,
        shareInfo: null,
        shareUserId: ua.getQuery("shareUserId"),
        isWeixin: ua.isWeiXin(),
        isDvdApp: ua.isDvdApp(),
        visitor_status: null,
      }
    },
    components: {},
    computed: {
      goodsId: function () {
        return location.pathname.split("_")[1].split(".")[0];
      }
    },
    watch: {
      // 监听response变化
      response() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;
          // 设置分享信息
          if (ts.shareInfo) {
            try {
              share.setShareInfo({
                "title": ts.shareInfo.title,
                "desc": ts.shareInfo.desc,
                "imgUrl": ts.shareInfo.imgUrl,
                "link": ts.shareInfo.link,
                success:function () {
                  ts.sharecallback();
                }
              });
            } catch (err) {
              console.error(err);
            }
          };
          setTimeout(function () {
            native.custom.initHead({
              'shareOnHead': '0'
            });
          },300);
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
          url: this.moke + '/api/mg/sale/userhelpbuy/getHelpGoodsDetail?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: ts.goodsId}),
          success(response) {
            ts.visitor_status = response.visitor_status;
            if(response.data){
              ts.response = response.data;
              ts.overTimes = response.data.overTime;
              ts.shareInfo = response.data.shareInfo;
              ts.deltime();
            }else{
              popup.toast("没有该商品");
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
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
        var ts = this;
        if (ts.visitor_status == 3) {
          ts.sharecallback();
          share.callShare();
        }else{
          popup.confirm({
            className:'',
            title: '您还没有成为会员不能参与该活动哦，成为会员即可参与～',
            text: '',
            okBtnTitle: '开通会员',
            okBtnCallback() {
              location.href = "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button";
            },
            cancelBtnTitle: '取消',
          });
        }
      },
      /***
       * 记录分享回调
       * */
      sharecallback: function () {
        var that = this;
        $.ajax({
          cache: false,
          async: true,
          url: this.moke + '/api/mg/sale/userhelpbuy/userShareGoods?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: that.goodsId,shareUserId:that.shareUserId}),
          success() {

          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      gowxapp:function () {
        popup.toast("复制地址栏链接在微信中打开或直接打开大V店APP发起助力");
      }
    },
    filters: {
      /**
       * 格式化时间
       * */
      formatRemainTime(second) {
        let format = '';
        let oneMinute = 60,
          oneHour = 60 * 60,
          oneDay = 60 * 60 * 24;
        if (second >= oneDay) {
          format = `${parseInt(second / oneDay)}天${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second >= oneHour) {
          format = `${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second >= oneMinute) {
          format = `${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second > 0) {
          format = `${second}秒`;
        } else if (second <= 0) {
          format = '已开始';
        }
        return format;
      }
    },
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
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
        text-decoration: line-through;
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
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;
  }

  .good_detail_imgs {
    img {
      width: 100%;
      display: inherit;
    }
  }
  .good_detail_title{
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #ff4a7d;
    text-align: center;
    border-top: 10px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
</style>
