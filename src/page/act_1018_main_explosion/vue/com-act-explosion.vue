<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../../../common/css/common.scss";

  .com-act-explosion {
    background-color:#ce256d;
    position:relative;
    padding-top:ptr(5);

    .banner {
      width:100%;
    }
    .swiper-container {
      margin:ptr(-35) 0 1px;
      background-color:#ff6582;
      .swiper-slide {
        width:ptr(80);
      }
    }
    .item {
      height:ptr(50);
      width:ptr(80);
      background-color:#ff6582;
      color:#fff;
      text-align:center;
      font-size:ptr(10);

      .item-timer {
        font-size:ptr(16);
        font-weight:bold;
        padding:ptr(8) 0;
      }
      &.selected {
        color:#ff467a;
        background-color:#fff;
      }
    }
    .g-goods-wrapper {

      .goods-item {
        padding:ptr(4) ptr(15) ptr(4) ptr(13);
        background-color:#fff;
        position:relative;
        overflow:hidden;

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          border-bottom: 1px solid #ce256d;
          transform-origin: 0 0;
          transform: scale(0.5,0.5);
          box-sizing: border-box;
        }

        .goods-group {
          position:relative;
          float:left;
        }
        .item-pic {
          width:ptr(132);
          height:ptr(132);
        }
        .item-icon {
          width:ptr(31);
          height:ptr(31);
          position:absolute;
          top:ptr(15);
          left:ptr(10);
        }
        .stage-tip {
          width:ptr(50);
          @include height(ptr(50));
          text-align:center;
          font-size:ptr(10);
          color:#fff;
          border-radius:50%;
          background:rgba(0,0,0,.65);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
        .price {
          padding:ptr(22) 0 ptr(12) ptr(148);
           .item-name {
             font-size:ptr(12);
             color:#272727;
             line-height:ptr(14);
             border-bottom: 1px solid #dcdcdc;
             padding-bottom:ptr(3);
           }
          .item-detail {
            font-size:ptr(10);
            color:#272727;
            @include height(ptr(29));

            .detail-money {
              font-size:ptr(14);
              color:#f5475c;
            }
            .detail-reserve {
              color:#a3a3a3;
              padding-left:ptr(10);
            }
          }
          .item-lottery {
            font-size:ptr(14);
            color:#fff;
            font-weight:bold;
            display:block;
            box-sizing:border-box;
            position:relative;
            width:ptr(200);
            @include height(ptr(40));
            background:url([[static]]/page/act_1018_main_explosion/img/redBag-bg.png) no-repeat;
            background-size:ptr(200);
            padding:0 ptr(8);

            .lottery-tip {
              float:right;
            }
          }
        }
      }
    }
    .explosion-href {
      display:block;
      width:100%;
      @include height(ptr(50));
      color:#fff;
      font-size:ptr(18);
      font-weight:bold;
      text-align:center;
      background-color:#ff6582;
    }
  }

</style>
<template>
  <div class="com-act-explosion">
    <img class="banner" src="[[static]]/page/act_1018_main_explosion/img/explosion-header.png">

    <!-- 场次tab -->
    <div class="swiper-container" v-if="list">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="swiperSlideClick(i)" v-for="(item, key, i) in list">
          <div class="item" :class="{selected: tabIndex === i}">
            <p class="item-timer">{{timer[i]}}</p>
            <p>{{response.sys_time >= key ? '已开抢' : '待开抢'}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="g-goods-wrapper" v-if="list">
      <ul>
        <li v-for="(item, i) in list[screenings[tabIndex]].goodsList" v-if="i < 3" @click="goodsClick(item.goodsId)" class="goods-item">
          <div class="goods-group">
            <img  v-lazy="item.goodsImage" class="item-pic">
            <!--状态判断-->
            <p class="stage-tip" v-if="item.status == 2">已售罄</p>   <!--确定一下是否是商品处的status在未开抢状态下都是未开抢-->
            <p class="stage-tip" v-else-if="item.status == 0">未开始</p>
          </div>
          <img class="item-icon" src="[[static]]/page/act_1018_main_explosion/img/explosion-icon.png">

          <div class="price">
            <p class="item-name">{{item.goodsName}}</p>
            <p class="item-detail">到手价: <span class="detail-money">{{item.activityPrice}}元</span><span class="detail-reserve" v-if="item.status != 0">仅剩{{item.number}}件</span></p>
            <a :href="item.lotteryLink" class="item-lottery">{{item.lotteryPrice}}元无门槛红包<span class="lottery-tip">领券更省</span></a>
          </div>
        </li>
      </ul>
    </div>

    <!--更多-->
    <a href="/act_1018_explosion_list.html" class="explosion-href">爆品馆  >>></a>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import date from '../../../common/js/module/date.js';
  import native from '../../../common/js/module/native.js';
  import util from '../../../common/js/module/util.js';
  import ua from '../../../common/js/module/ua.js';
  import layout from "../../../../module/index/layout.es6";

  export default {
    props: {
      response: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        list: null,
        tabIndex: 0,
        timer: ['0:00','8:00','12:00','16:00','20:00'],
        screenings: [1508256000,1508284800,1508299200,1508313600,1508328000]
      }
    },
    watch: {
      // 监听response变化
      list() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;

          // 初始化轮播tab
          this.swiper = new Swiper('.com-act-explosion .swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            initialSlide: ts.tabIndex,
          });

          // 选中最近的已开抢
          let index = 0;
          for (let i in this.timer) {
            if (ts.response.sys_time >= ts.screenings[i]) {
              index = parseInt(i);
            }
          }
          this.swiperSlideClick(index);
        });
      }
    },
    created(){
      this.list = this.response.data.hotHelp;
    },
    mounted() {

    },
    methods: {
//      getData() {
//        let ts = this;
//
//        // 测试数据
//        //ts.list = require('../json/act-explosion.json');
//        //ts.list = ts.list.data;
//        $.ajax({
//          cache: false,
//          async: true,
//          url: '/api/mg/sale/userhelpgoods/getUserHelpGoods?_='+ Date.now(),
//          type: 'post',
//          dataType: 'json',
//          data: layout.strSign("explosiion",{
//
//          }),
//          success(response) {
//            ts.list = response;
//          },
//          error(error) {
//            console.error('ajax error:' + error.status + ' ' + error.statusText);
//          }
//        });
//      },
      /** tab切换 */
      swiperSlideClick(index) {
        this.swiper.slideTo(index - 2);
        this.tabIndex = index;
        //this.screenings = this.list[index].screenings;
        this.$forceUpdate();
      },
      /** 商品点击 */
      goodsClick(goodsId) {
        let url = '/' + goodsId + '.html';
        // 跳转
        if (ua.isDvdApp()) {
          event.preventDefault();
          native.Browser.open({
            url: url,
          });
        } else {
          location.href = url;
        }
      }
    }
  }
</script>

