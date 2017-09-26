<template>
  <!--底部菜单栏-->
  <div class="com-act-subscribe">
    <!-- banner图 -->
    <img class="banner" src="[[static]]/page/act_1018_main/img/subscribe-banner.png">

    <!-- 场次tab -->
    <div class="swiper-container" v-if="list">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="swiperSlideClick(i, item)" v-for="(item, i) in list">
          <div class="item" :class="{selected: tabIndex === i}">
            <p>{{item.line1}}</p>
            <p>{{item.line2}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="g-goods-wrapper" v-if="list">
      <ul>
        <li v-for="(item, i) in list[tabIndex].goodsList" v-if="i < 3" @click="goodsClick(item.goodsId)">
          <img class="pic" v-lazy="item.imgUrl">
          <div class="price">
            <div class="act">抢购价:￥{{item.actPrice}}</div>
            <div class="origin">原价：￥{{item.originPrice}}</div>
          </div>
        </li>
      </ul>
      <!--更多-->
      <a href="/act_1018_main_subscribe.html">
        <img class="more" src="[[static]]/page/act_1018_main/img/subscribe-more.png">
      </a>
    </div>

  </div>
</template>

<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import date from '../../../common/js/module/date.js';
  import native from '../../../common/js/module/native.js';
  import util from '../../../common/js/module/util.js';
  import ua from '../../../common/js/module/ua.js';
  export default {
    props: {
      response: {
        type: Object,
        default: null
      },
      currentDate: {
        type: String,
        default: null
      },
    },
    data() {
      return {
        list: null,
        tabIndex: 0,
        date: date,
      }
    },
    computed: {},
    watch: {
      // 监听response变化
      list(){
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;

          // 初始化轮播tab
          this.swiper = new Swiper('.com-act-subscribe .swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            initialSlide: this.tabIndex,
          });
        });
      }
    },
    created(){
      this.getData();
    },
    mounted() {
    },
    methods: {
      getData() {
        let ts = this;

        // 测试数据
//        setTimeout(function(){
//          ts.list = require('../json/act-subscribe.json');
//        }, 1000);

        $.ajax({
          cache: false,
          async: true,
          url: `${location.protocol}//${util.getSecondDomain()}.davdian.com/t-14537.html?_=${Date.now()}`,
          type: 'get',
          dataType: 'json',
          data: {},
          success(response) {
            
            ts.list = response;
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /** tab切换 */
      swiperSlideClick(index, item) {
        this.swiper.slideTo(index - 2);
        this.tabIndex = index;
        this.screenings = item.screenings;
        this.$forceUpdate();
      },
      /** 商品点击 */
      goodsClick(goodsId) {
        let url = '';
        if (this.currentDate < '2017-10-19') {
          url = '/act_1018_main_subscribe.html';
        } else {
          url = '/' + goodsId + '.html';
        }
        // 跳转
        if (ua.isDvdApp()) {
          event.preventDefault();
          native.Browser.open({
            url: url,
          });
        } else {
          location.href = url;
        }
      },
    },
    filters: {}
    ,
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .com-act-subscribe {
    .banner {
      display: block;
      width: ptr(350);
      margin: ptr(10) auto;
    }

    .swiper-container {
      height: ptr(55);
      .swiper-wrapper {
        padding: ptr(8);
        .swiper-slide {
          width: ptr(94);
          height: ptr(35);
          &:last-of-type {
            margin-right: ptr(10);
          }
          .item {
            position: relative;
            box-sizing: border-box;
            padding: ptr(3) ptr(5) 0 0;
            width: ptr(94);
            height: ptr(35);
            background: url('[[static]]/page/act_1018_main/img/subscribe-tab-bg.png') no-repeat;
            background-size: contain;
            text-align: center;
            font-size: ptr(12);
            line-height: ptr(15);
            &.selected {
              background-image: url('[[static]]/page/act_1018_main/img/subscribe-tab-bg-active.png');
              color: white;
            }
          }
        }
      }
    }

    .g-goods-wrapper {
      margin: ptr(10) auto ptr(30);
      padding: ptr(8) 0 0;
      box-sizing: border-box;
      width: ptr(356);
      background: #fed406;
      border-radius: ptr(5);
      ul {
        text-align: center;
        li {
          position: relative;
          margin: 0 ptr(2);
          padding: 0;
          display: inline-block;
          width: ptr(110);
          border-radius: ptr(5);
          overflow: visible;
          font-size: 0;
          &:before {
            content: '';
            position: absolute;
            top: ptr(-6);
            left: ptr(-2);
            height: ptr(30);
            width: ptr(32);
            background: url([[static]]/page/act_1018_main/img/subscribe-icon.png) no-repeat;
            background-size: 100%;
          }
          .pic {
            width: 100%;
            height: ptr(110);
            border-top-left-radius: ptr(5);
            border-top-right-radius: ptr(5);
          }
          .price {
            background: #f83757;
            padding: ptr(10);
            line-height: 1.5;
            color: white;
            .act {
              font-size: ptr(13);
              @include ellipsis;
            }
            .origin {
              font-size: ptr(9);
              text-decoration: line-through;
              @include ellipsis;
            }
          }
        }
      }
      .more {
        position: relative;
        top: ptr(15);
        margin: auto;
        display: block;
        width: ptr(160);
      }
    }
  }
</style>
