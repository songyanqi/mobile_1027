<template>
  <div class="com-box">
    <!--上边banner-->
    <div class="com-banner">
      <div href="http://murphylee.davdian.com/t-14124.html?rp=index&rl=timeshop_sub_img-511-385">
        <img v-lazy="'//pic.davdian.com/free/2017/09/12/pre_title.png'">
      </div>
      <a href="javascript:void(0)" @click="check_rule"></a>
    </div>
    <!--滚动公告-->
    <div class="rool_tip">
      <div class="marguee">
        <div class="marguee_innder">
          <p v-for="pr in response.notice">{{pr.message}}</p>
        </div>
      </div>
    </div>
    <!--助力商品-->
    <div>
      <ul>
        <li v-for="lis in response.goodsInfo" class="list_style online">
          <a :href="lis.activityLink">
            <div class="img_container">
              <div class="img_container_inner">
                <img v-lazy="lis.goodsImage">
              </div>
              <div class="order_good_info_container">
                <div class="order_good_name">
                  {{lis.goodsName}}
                </div>
                <div class="order_good_price">
                  <span class="f_l">10.18活动价<em class="price_symbol">￥</em><span>{{lis.activityPrice}}</span></span>
                  <span class="membership_crown_pre"><em>￥</em>{{lis.goodsPrice}}</span>
                </div>
              </div>
            </div>
          </a>
          <div class="progress_info" v-html="lis.activityMessage">
          </div>
          <a class="remain_btns">
            <a class="panic_buying_btn" @click="activebtn(lis.activityLink)" href="javascript:void(0)" v-if="lis.activityButton == '发起助力'">{{lis.activityButton}}</a>
            <a class="panic_buying_btn yellows" @click="activebtn(lis.activityLink)" href="javascript:void(0)" v-if="lis.activityButton == '继续助力'">{{lis.activityButton}}</a>
            <a class="panic_buying_btn big_1018" href="javascript:void(0)" v-if="lis.activityButton == '10.18当天0元抢'">{{lis.activityButton}}
            </a>
          </a>
        </li>
      </ul>
    </div>
    <!--查看规则-->
    <div v-if="rule_form" class="com-popup-base">
      <div class="table-cell">
        <div v-show="rule_form" class="box">
          <div>助力规则</div>
          <div>
            <p>1.助力时间：2017.10.01 00:00:00-2017.10.17 23:59:59；</p>
            <p>2.抢购时间：2017.10.18 00:00:00- 2017.10.18 23:59:59；</p>
            <p>3.活动仅限大V店会员参与；</p>
            <p>4.每个活动商品每人可发起1次助力，分享至微信好友或朋友圈获得好友助力;</p>
            <p>5. 每天仅有1次给好友助力的机会，成功助力后好友可获得随机减钱;</p>
            <p>6.10月18日当天已活动价支付购买，支付成功后，会将该商品得到的助力金额以返现的形式返到【我的】－【总额】－【待结算金额】－【其他收入】里30天后没有退货转到【待提现金额】，最高可0元抢购该商品。</p>
            <p>7.已发起的助力商品可在【我的10.18】中查看；</p>
          </div>
          <div @click="close_what_invite"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import login from '../../../common/js/module/login.js';
  export default {
    props: {
        response: {
          type: Object,
          default: null
        }
    },
    data() {
      return {
        rule_form: false
      }
    },
    components: {},
    computed: {},
    created() {
      var that = this;
      if (that.response.notice.length < 100) {
        let announcementData = [];
        announcementData = that.response.notice;
        let nums = 100 - that.response.notice.length;
        for (var i = 0; i < nums; i++) {
          announcementData.push(that.response.notice[i])
        }
        that.response.notice = announcementData;
      }
    },
    mounted() {
      console.log('mounted',this.response);
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
      activebtn:function (url) {
        login.needLogin();
        location.href = url;
      }
    },
    filters: {},
    watch: {},
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .com-box {
    /*background-image: url(//pic.davdian.com/free/2017/09/12/bg_1.png);*/
    background: #c80064;
    background-size: 0.31rem 0.67rem;
    padding-bottom: 60px;
    /*position: fixed;*/
    max-width: 640px;
    /*top: 44px;*/
    /*bottom: 0;*/
    /*overflow-y: scroll;*/
  }

  // banner
  .com-banner {
    width: 100%;
    min-height: 0.2rem;
    position: relative;
    a {
      position: absolute;
      bottom: 19%;
      right: 19%;
      display: block;
      height: 17%;
      width: 21%;
      /*background: tan;*/
    }
    div {
      width: 100%;
      display: block;
      img {
        width: 100%;
        display: block;
      }
    }
  }

  .remain_btns {
    a {
      display: block;
    }
  }

  .f_l {
    float: left;
  }

  .newOriginal_price {
    font-size: 0.14rem;
  }

  .com-box div ul {
    margin: 0.1rem;
    border-radius: 0.04rem;
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
    position: relative;
  }

  .com-box div ul li .img_container_inner img {
    width: 100%;
    height: 100%;
  }

  .com-box div ul li .order_good_info_container {
    position: absolute;
    padding-left: 0.9rem;
    top: 0;
    padding-top: 0.1rem;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .com-box div ul li.online:after {
    content: "";
    display: block;
    background-color: #DDDDDD;
    -webkit-transform: scale(0.5) translateX(280px);
    -ms-transform: scale(0.5) translateX(280px);
    transform: scale(0.5) translateX(280px);
    position: absolute;
    left: -50%;
    width: 200%;
    height: 0.01rem;
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
    padding-top: 0.05rem;
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
    font-size: 0.11rem;
    border: 0.05rem solid #E72664;
    border-radius: 0.05rem;
    box-sizing: border-box;
    background: #FFFFFF;
    margin: 0 0.1rem;
    padding: 0.1rem;
  }

  .rool_tip p {
    line-height: 0.16rem;
  }

  .marguee {
    height: 0.32rem;
    overflow: hidden;
  }

  .marguee_innder {
    animation: marguees 120s infinite linear;
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

  .com-popup-base {
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

  .com-popup-base .table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .com-popup-base .table-cell .box {
    display: inline-block;
    border-radius: 0.04rem;
    animation: com-alert-animation 0.5s;
    width: 73.333%;
    min-height: 200px;
    position: relative;
    text-align: center;
    background-color: #FFFFFF;
    padding: 0 10px 15px;
  }

  .com-popup-base .table-cell .box div:nth-of-type(1) {
    font-size: 14px;
    color: #666666;
    text-align: center;
    padding: 12px 0;
    position: relative;
  }

  .com-popup-base .table-cell .box div:nth-of-type(2) {
    font-size: 14px;
    color: #333333;
    text-align: left;
    line-height: 20px;
    padding-top: 5px;
  }

  .com-popup-base .table-cell .box div:nth-of-type(3) {
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

  .com-popup-base .table-cell .box div:nth-of-type(2) p {
    display: inline-block;
    margin-top: 10px;
  }

  .com-popup-base .table-cell .box div:nth-of-type(1):after {
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
