<template>
  <div class="com-act-explosion">
    <img class="banner" src="[[static]]/page/act_1018_main_explosion/img/explosion-header.png">

    <!-- 场次tab -->
    <div class="swiper-container" v-if="list">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="swiperSlideClick(i)" v-for="(item, i) in list">
          <div class="item" :class="{selected: tabIndex === i}">
            <p>{{timer[i]}}</p>
            <p>{{response.sys_time > screenings[i] ? '已开抢' : '待开抢'}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="g-goods-wrapper" v-if="list">
      <ul>
        <li v-for="(item, i) in list[screenings[tabIndex]].goodsList" v-if="i < 3" @click="goodsClick(item.goodsId)">
          <img class="pic" v-lazy="item.goodsImage">
          <div class="price">
            <p>{{item.goodsName}}</p>
            <p class="act">抢购价:￥{{actPrice[i]}}</p>
            <p class="origin">原价：￥{{item.goodsPrice}}</p>
            <a :href="item.lotteryLink">{{item.lotteryPrice}}元无门槛红包</a>
            <a :href="item.link">立即抢购</a>
          </div>
        </li>
      </ul>
    </div>

    <!--更多-->
    <a href="/act_1018_main_subscribe.html">爆品馆</a>
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
      }
    },
    data() {
      return {
        list: null,
        tabIndex: 0,
        timer: [8,11,14,17,20],
        screenings: [1508284800,1508299200],
        actPrice: [199,199,118,120,11,12,13,14,14,16,17]
      }
    },
    watch: {
      // 监听response变化
      list() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;

          // 初始化轮播tab
          this.swiper = new Swiper('.com-act-subscribe .swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            initialSlide: ts.tabIndex,
          });

          // 选中最近的已开抢
          let index = 0;
          for (let i in ts.list) {
            if (ts.response.sys_time > screenings[i]) {
              index = parseInt(i);
            }
          }
          this.swiperSlideClick(index);
        });
      }
    },
    created(){
      this.getData();
    },
    methods: {
      getData() {
        let ts = this;

        // 测试数据
        setTimeout(function(){
          ts.list = require('../json/act-explosion.json');
        }, 1000);

//        $.ajax({
//          cache: false,
//          async: true,
//          url: `${location.protocol}//${util.getSecondDomain()}.davdian.com/t-14537.html?_=${Date.now()}`,
//          type: 'get',
//          dataType: 'json',
//          data: {},
//          success(response) {
//            ts.list = response;
//          },
//          error(error) {
//            console.error('ajax error:' + error.status + ' ' + error.statusText);
//          }
//        });
      },
      /** tab切换 */
      swiperSlideClick(index) {
        this.swiper.slideTo(index - 2);
        this.tabIndex = index;
        //this.screenings = this.list[index].screenings;
        this.$forceUpdate();
      },
      /** 商品点击 */
      goodsClick(goodsId) {
        let url = '';
        if (this.currentDate < '2017-10-18') {
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
      }
    }
  }
</script>
<style>

</style>
