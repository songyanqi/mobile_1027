<template>
  <div class="com-box">
    <!--上边banner-->
    <div class="com-banner">
      <a href="http://murphylee.davdian.com/t-14124.html?rp=index&rl=timeshop_sub_img-511-385">
        <img
          src="http://pic.davdian.com/activity/2017/09/05/1125_420_78328383b6cea53680ae037448709531.jpg?x-oss-process=image/format,webp"
          alt="">
      </a>
      <div>活动规则></div>
    </div>
    <!--滚动公告-->
    <div>
      <swiper auto loop height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
        <swiper-item><p>义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>
        <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
        <swiper-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></swiper-item>
        <swiper-item><p>做迎而為 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
        <swiper-item><p>只知道不知道 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
        <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
      </swiper>
    </div>
    <!--助力商品-->
    <div>
      <ul>
        <li class="list_style online">
          <a href="/490812.html?rp=index&amp;rl=timeshop_goods-511-490812">
            <div class="img_container">
              <div class="img_container_inner">
                <img src="http://pic.davdian.com/supplier/2017/07/20/1000_1000_a37751ad619ac1dd3a02a1b4d09000a2.jpg?x-oss-process=image/format,webp" lazy="loaded">
              </div>
              <div class="order_good_info_container">
                <div class="order_good_name">
                  健康小超人（精装5册，我要长高，保护视力，拒绝蛀牙，拒绝肥胖，小心过敏，帮助孩子提升自控力，快速养成健康的生活习惯，杜绝不良行为习惯，附赠孩子们无比喜爱的贴纸，以及记录孩子成长的身高尺。3~6岁适读）
                </div>
                <div class="order_good_name order_good_name_in">
                  健康好习惯养成书
                </div>
                <div class="order_good_price">
                  <span class="f_l"><em class="price_symbol">￥</em><span>99</span></span>
                  <span class="membership_crown">限时返 <em>￥</em>32
              <span class="membership_crown_pre">平日返<em>￥</em>5.2</span></span>
                </div>
                <div class="progress_info">
                  仅剩 148 件
                </div>
              </div>
            </div>
          </a>
          <a class="remain_btns">
            <div class="panic_buying_btn">立即抢购</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {Swiper, SwiperItem} from 'vux'

  export default {
    props: {},
    data() {
      return {}
    },
    components: {
      Swiper,
      SwiperItem
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      /**
       * 接口名称:
       * 接口文档:
       */
//      getData(){
//        let ts = this;
//        $.ajax({
//          cache: false,
//          async: true,
//          url: '/?_=' + Date.now(),
//          type: 'post',
//          dataType: 'json',
//          data: encrypt({}),
//          success(response) {
//            ts.response = response;
//          },
//          error(error) {
////            ts.response = require('../json/center.json');
//            console.error('ajax error:' + error.status + ' ' + error.statusText);
//          }
//        });
//      },
    },
    filters: {},
    watch: {},
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  // banner
  .com-banner {
    width: 100%;
    min-height: 20px;
    position: relative;
    div {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
    a {
      width: 100%;
      display: inline-block;
      img {
        width: 100%;
      }
    }
  }

  .f_l {
    float: left;
  }

  .newOriginal_price {
    font-size: 14px;
  }

  .list_style {
    height: 130px;
  }

  ul li {
    padding: 10px 10px;
    position: relative;
    overflow: hidden;
    background-color: #FFFFFF;
  }

  /*ul li.online:after {
    content: "";
    display: block;
    background-color: #DDDDDD;
    -webkit-transform: scale(0.5) translateX(280px);
    -ms-transform: scale(0.5) translateX(280px);
    transform: scale(0.5) translateX(280px);
    position: absolute;
    left: -50%;
    width: 200%;
    height: 1px;
    bottom: 0;
    z-index: 1;
  }
  */

  ul li .img_container {
    position: relative;
  }

  ul li .img_container_inner {
    width: 130px;
    position: relative;
  }
  ul li .img_container_inner img{
    width: 100%;
    height: 100%;
  }

  ul li .order_good_info_container {
    position: absolute;
    padding-left: 140px;
    top: 0;
    padding-top: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .order_good_name {
    font-size: 14px;
   @include ellipsis(1);
    height: 20px;
    line-height: 20px;
    color: #333333;
  }

  .order_good_name_in {
    font-size: 12px;
    color: #999999;
  }

  .order_good_price {
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    color: #FF4A7D;
    padding-top: 5px;
  }

  .price_symbol {
    font-size: 12px;
    font-style: normal;
  }

  .progress_info {
    position: absolute;
    width: 100%;
    bottom: 14px;
    font-size: 12px;
    color: #999999;
  }

  .market_price {
    text-decoration: line-through;
    color: #999;
    margin-left: 0px;
    font-size: 11px !important;
  }

  .progress_bar_bg {
    background-color: #EAEAEA;
    border-radius: 8px;
    height: 8px;
    width: 21.3333333%;
    position: relative;
    overflow: hidden;
  }

  .progress_container {
    height: 8px;
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

  .panic_buying_btn.seteds {
    color: #999999;
  }

  .panic_buying_btn.seteds:after {
    border-color: #999999;
  }

  .progress_bar_percentage.wall {
    width: 100%;
    min-width: 10px;
  }

  .finish_percentage {
    font-size: 11px;
    color: #FF4A7D;
    line-height: 11px;
    margin-top: 5px;
  }

  .panic_buying_btn {
    width: 70px;
    height: 25px;
    font-size: 11px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 10px;
    bottom: 21px;
    border-radius: 12px;
    background: -webkit-linear-gradient(left top, #FF7676, #FF4A8F); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #FF7676, #FF4A8F); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #FF7676, #FF4A8F); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #FF7676, #FF4A8F); /* 标准的语法 */
  }

  .panic_buying_btn2 {
    background: none;
    color: #ff4a7d;
    border-radius: 20px;
    line-height: 26px;
  }

  .panic_buying_btn2:after {
    content: "";
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: #FF4A7D solid 1px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: 0 0;
    border-radius: 50px;
  }

  .membership_crown_pre {
    color: #999999;
    text-decoration: line-through;
    font-size: 11px;
  }

  .membership_crown .membership_crown_pre em {
    font-size: 10px;
  }

  .membership_crown {
    font-size: 11px;
    color: #D6B471;
    display: inline-block;
    padding-left: 5px;
    position: relative;
    bottom: -1px;
    float: left;
  }

  .membership_crown em {
    font-size: 10px;
    font-style: normal;
  }
</style>
