<template>
  <div class="com-box">
    <!--上边banner-->
    <div class="com-banner">
      <div>
        <img src="//pic.davdian.com/free/20170915_assistance/ass_banners.png">
      </div>
      <span @click="check_rule"></span>
    </div>
    <!--滚动公告-->
    <div class="rool_tip">
      <div class="marguee">
        <div>
          <swiper loop auto height="32px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
            <swiper-item v-for="(pr,index) in notices" v-if="index%2==0">
              <p v-if="notices[index]">{{notices[index].message}}</p>
              <p v-if="notices[index+1]">{{notices[index + 1].message}}</p>
            </swiper-item>
          </swiper>
        </div>
      </div>
    </div>
    <!--助力商品-->
    <div>
      <ul>
        <li v-for="lis in response.goodsInfo" class="list_style online" @click="activebtn(lis.activityLink)">
          <div class="img_container">
            <div class="img_container_inner">
              <img v-lazy="lis.goodsImage">
            </div>
            <div class="order_good_info_container">
              <div class="order_good_name">
                {{lis.goodsName}}
              </div>
              <div class="order_good_price">
                <span class="f_l">10.18到手价<em class="price_symbol">￥</em><span>{{lis.activityPrice}}</span></span>
                <span class="membership_crown_pre"><em>￥</em>{{lis.goodsPrice}}</span>
              </div>
            </div>
          </div>
          <div v-if="lis.buttonType > 2" class="progress_info" style="padding-right: 1.1rem;"
               v-html="lis.activityMessage"></div>
          <div v-else class="progress_info" v-html="lis.activityMessage"></div>
          <div class="remain_btns">
            <div class="panic_buying_btn" :class="{'yellows':lis.buttonType == 2,'big_1018':lis.buttonType == 3}">
              {{lis.activityButton}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--查看规则-->
    <div v-if="rule_form" class="com-popup-base2" @click="rule_form = false">
      <div class="table-cell">
        <div v-show="rule_form" class="box" @click.stop="events">
          <div>助力规则</div>
          <div>
            <p>1.助力时间：2017.10.01 00:00:00-2017.10.17 23:59:59；</p>
            <p>2.抢购时间：2017.10.18 00:00:00- 2017.10.18 23:59:59；</p>
            <p>3.活动仅限大V店会员参与；</p>
            <p>4.邀请好友助力可获得随机减钱；</p>
            <p>5.每天仅有1次给好友助力的机会，成功助力即可给好友随机减钱，还有机会抽取iPhone8；</p>
            <p>6.10月18日当天以活动价支付购买活动商品，支付成功后该商品得到的助力金额将以返现的形式返到【我的】－【总额】－【待结算金额】－【其他收入】里，30天后如果没有退货将转到【可提现金额】；</p>
            <p>7.其中爸爸的选择纸尿裤、成人/儿童羽绒服、熊北鼻鲑鱼酱助力所减金额，可用于购买其同款任一规格商品，最晚于10月23日24点前返现到账，其他商品将在商品支付成功后5分钟左右返现；</p>
            <p>8.已发起助力的商品可在【我的10.18】中查看，商品库存有限，助力结束后10月18日当天请尽快支付购买，最高返该商品的实际支付金额；</p>
            <p>9.只有在10月18日成功支付商品，助力减钱金额才能返现，若未及时支付购买，助力减钱金额将不会返现到账；</p>
            <p>10.详情可咨询大V店客服。</p>
          </div>
          <div @click="close_what_invite"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ua from '../../../common/js/module/ua.js';
  import login from '../../../common/js/module/login.js';
  import native from "../../../common/js/module/native";
  import popup from "../../../common/js/module/popup.js";
  import {Swiper, SwiperItem} from 'vux'

  export default {
    props: {
      response: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        rule_form: false,
        marguee: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    computed: {
      notices: function () {
        var that = this;
        if (that.response.notice) {
          return that.response.notice;
        }
      }
    },
    watch: {
      rule_form: function () {
        var that = this;
        if (that.rule_form) {
          if (document.documentElement && document.documentElement.scrollTop) {
            this.scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            this.scrollTop = document.body.scrollTop;
          }
          document.body.style.top = -this.scrollTop + 'px';
          document.body.classList.add("bodyFix");

        } else {
          document.body.classList.remove("bodyFix");
          $(document).scrollTop(this.scrollTop);

        }
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      /***
       * 查看规则
       */
      check_rule: function () {
        this.rule_form = true;
      },
      close_what_invite: function () {
        this.rule_form = false;
      },
      activebtn: function (url) {
        /*没登录去登录*/
        if (login.isLogined()) {
          /*如果不是会员提示他成为会员*/
          if (login.isSeller()) {
            if (ua.isDvdApp()) {
              event.preventDefault();
              native.Browser.open({
                url: url
              })
            } else {
              location.href = url;
            }
          } else {
            popup.confirm({
              className: '',
              title: '您还没有成为会员不能参与该活动哦，成为会员即可参与～',
              text: '',
              okBtnTitle: '开通会员',
              okBtnCallback() {
                if (ua.isDvdApp()) {
                  event.preventDefault();
                  native.Browser.open({
                    url: "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button"
                  })
                } else {
                  location.href = "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button";
                }
              },
              cancelBtnTitle: '取消',
              cancelBtnCallback() {

              }
            });
          }
        } else {
          login.needLogin();
        }
      },
      events: function () {

      }
    },
    filters: {}
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../common/css/util/all";

  .com-box {
    background: #c80064;
    background-size: 0.31rem 0.67rem;
    padding-bottom: 0.1rem;
    max-width: 640px;
  }

  .com-banner {
    width: 100%;
    min-height: 0.2rem;
    position: relative;
    span {
      position: absolute;
      bottom: 14%;
      right: 18%;
      display: block;
      height: 17%;
      width: 21%;
    }
    div {
      width: 3.55rem;
      display: block;
      margin: 0 auto;
      img {
        width: 100%;
        display: block;
      }
    }
  }

  .f_l {
    float: left;
  }

  .newOriginal_price {
    font-size: 0.14rem;
  }

  .com-box div ul {
    margin: 0 0.1rem;
    overflow: hidden;
    background-color: #FFFFFF;
  }

  .com-box div ul li {
    padding: 0.1rem 0.1rem;
    position: relative;
    overflow: hidden;
    background-color: #FFFFFF;
  }

  .com-box div ul li .img_container {
    position: relative;
  }

  .com-box div ul li .img_container_inner {
    width: 0.8rem;
    height: 0.8rem;
    position: relative;
  }

  .com-box div ul li .img_container_inner img {
    width: 0.8rem;
    height: 0.8rem;
  }

  .com-box div ul li .order_good_info_container {
    position: absolute;
    padding-left: 0.9rem;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .com-box div ul li.online:after {
    content: "";
    display: block;
    background-color: #DDDDDD;
    transform: scaleY(0.5) translateX(0.9rem);
    position: absolute;
    right: 0;
    width: 100%;
    height: 1px;
    bottom: 0;
    z-index: 1;
  }

  .order_good_name {
    font-size: 0.14rem;
    @include ellipsis(1);
    height: 0.2rem;
    line-height: 0.2rem;
    color: #666666;
  }

  .order_good_name_in {
    font-size: 0.12rem;
    color: #999999;
  }

  .order_good_price {
    font-size: 0.16rem;
    height: 0.16rem;
    line-height: 0.16rem;
    color: #FF4A7D;
    padding-top: 0.1rem;
  }

  .order_good_price {
    .f_l {
      font-size: 0.12rem;
      span {
        font-size: 0.16rem;
      }
    }

  }

  .price_symbol {
    font-size: 0.12rem;
    font-style: normal;
  }

  .progress_info {
    position: absolute;
    /* width: 100%; */
    bottom: 0.1rem;
    font-size: 0.12rem;
    color: #999999;
    left: 1rem;
    padding-right: 0.84rem;
    line-height: 0.13rem;
  }

  .market_price {
    text-decoration: line-through;
    color: #999;
    margin-left: 0;
    font-size: 0.11rem !important;
  }

  .progress_bar_bg {
    background-color: #EAEAEA;
    border-radius: 0.08rem;
    height: 0.08rem;
    width: 21.3333333%;
    position: relative;
    overflow: hidden;
  }

  .progress_container {
    height: 0.08rem;
    background: -webkit-linear-gradient(left top, #FF7676, #FF4A8F); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #FF7676, #FF4A8F); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #FF7676, #FF4A8F); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #FF7676, #FF4A8F); /* 标准的语法 */
    /*position: absolute;*/
    left: 0;
    top: 0;
  }

  .panic_buying_btn.buy_gray {
    background: -webkit-linear-gradient(left top, #DBDADA, #C5C5C5); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #DBDADA, #C5C5C5); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #DBDADA, #C5C5C5); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #DBDADA, #C5C5C5); /* 标准的语法 */
  }

  .panic_buying_btn.yellows {
    background: -webkit-linear-gradient(left top, #FFE138, #FF8700); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #FFE138, #FF8700); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #FFE138, #FF8700); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #FFE138, #FF8700); /* 标准的语法 */
  }

  .panic_buying_btn.big_1018 {
    background: -webkit-linear-gradient(left top, #FFA8A8, #FF3030); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #FFA8A8, #FF3030); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #FFA8A8, #FF3030); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #FFA8A8, #FF3030); /* 标准的语法 */
    width: 0.99rem;
  }

  .panic_buying_btn.seteds {
    color: #999999;
  }

  .panic_buying_btn.seteds:after {
    border-color: #999999;
  }

  .progress_bar_percentage.wall {
    width: 100%;
    min-width: 0.1rem;
  }

  .finish_percentage {
    font-size: 0.11rem;
    color: #FF4A7D;
    line-height: 0.11rem;
    margin-top: 0.05rem;
  }

  .panic_buying_btn {
    width: 0.7rem;
    height: 0.25rem;
    font-size: 0.11rem;
    line-height: 0.25rem;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 0.1rem;
    bottom: 0.1rem;
    border-radius: 0.12rem;
    background: -webkit-linear-gradient(left top, #FF7676, #FF4A8F); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #FF7676, #FF4A8F); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #FF7676, #FF4A8F); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #FF7676, #FF4A8F); /* 标准的语法 */
  }

  .panic_buying_btn2 {
    background: none;
    color: #ff4a7d;
    border-radius: 0.2rem;
    line-height: 0.26rem;
  }

  .panic_buying_btn2:after {
    content: "";
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: #FF4A7D solid 0.01rem;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: 0 0;
    border-radius: 0.5rem;
  }

  .membership_crown_pre {
    color: #999999;
    text-decoration: line-through;
    font-size: 0.1rem;
    padding-left: 0.09rem;
  }

  .membership_crown .membership_crown_pre em {
    font-size: 0.1rem;
  }

  .membership_crown {
    font-size: 0.11rem;
    color: #D6B471;
    display: inline-block;
    padding-left: 0.05rem;
    position: relative;
    bottom: -0.01rem;
    float: left;
  }

  .membership_crown em {
    font-size: 0.1rem;
    font-style: normal;
  }

  .rool_tip {
    color: #BA2424;
    font-size: 11px;
    border: 5px solid #ffc23e;
    box-sizing: border-box;
    background: #FFFFFF;
    margin: 0 0.1rem;
    padding: 10px;
  }

  .rool_tip p {
    line-height: 16px;
  }

  .marguee {
    height: 32px;
    overflow: hidden;
  }

  .marguee_innder {
    /*-webkit-animation: marguees 256s infinite linear;*/
    /*-o-animation: marguees 256s infinite linear;*/
    /*animation: marguees 256s infinite linear;*/
  }

  @keyframes marguees {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }

  // 动画
  @keyframes com-alert-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  .com-popup-base2 {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    line-height: 1;
  }

  .com-popup-base2 .table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .com-popup-base2 .table-cell .box {
    display: inline-block;
    border-radius: 0.04rem;
    animation: com-alert-animation 0.5s;
    width: 73.333%;
    min-height: 200px;
    position: relative;
    text-align: center;
    background-color: #FFFFFF;
    padding: 0 0 15px;
    color: #FF4A7D;
    /*max-height: 4rem;*/
    /*overflow-y: scroll;*/
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(1) {
    font-size: 14px;
    text-align: center;
    padding: 12px 0;
    position: relative;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(2) {
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    padding: 5px 10px 0;
    max-height: 4rem;
    overflow-y: scroll;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(3) {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    width: 36px;
    height: 36px;
    background-image: url("../img/clearInput.png");
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: 10px 10px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(2) p {
    display: inline-block;
    margin-top: 10px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(1):after {
    content: "";
    display: block;
    position: absolute;
    left: -50%;
    width: 200%;
    height: 1px;
    background: rgba(216, 216, 216, 0.51);
    -webkit-transform: scale(0.5);
    bottom: 0;
    z-index: 1;
  }
</style>
