<template>
    <div :style="[{ marginTop:data.marginTop + 'px'},styleObject]">
      <tt_com_0 :data="data"></tt_com_0>
      <ul>
        <li class="list_style" :class="{online:item.showLine == '1'}" v-for="(item, index) in data.body.dataList">
          <a :href="item.command.content">
            <div class="img_container">
              <div class="img_container_inner">
                <img v-lazy="imgObject(item.imageUrl)">
              </div>
              <div class="order_good_info_container">
                <div class="order_good_name">{{item.title}}</div>
                <div class="order_good_name_in">{{item.msg}}</div>
                <div class="order_good_price">
                  <span><em class="price_symbol">￥</em><span>{{item.nowPrice}}</span></span><span v-if="item.memReturn" class="membership_crown">会员返<em>￥</em>{{item.memReturn}}</span><span
                  v-if="item.prePrice" class="membership_crown_pre">
                市场价<em>￥</em>{{item.prePrice}}</span>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <div v-if="ts_tips" class="tipswrap" @click="tipsconfirm">
        <div class="tipsdiv" @click.stop="events">
          <img v-if="isWechart" src="//pic.davdian.com/free/2017/06/14/tips2.png" alt="">
          <img v-else src="//pic.davdian.com/free/2017/06/14/tips1.png" alt="">
          <div v-if="!isWechart" @click="tipsconfirm"></div>
        </div>
      </div>
    </div>
</template>
<style scoped>
  .f_l {
    float: left;
  }

  .newOriginal_price {
    font-size: 14px;
  }

  .list_style {
    /*height: 130px;*/
  }

  ul li {
    padding: 0 10px 20px 10px;
    height:140px;
    position: relative;
    overflow: hidden;
  }

  ul li.online:after {
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

  ul li .img_container {
    position: relative;
  }

  ul li .img_container_inner {
    width: 140px;
    position: relative;
  }

  ul li .img_container_inner div {
    height: 60px;
    width: 60px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto auto;
    font-size: 14px;
    color: #FFF;
    text-align: center;
    line-height: 60px;
  }

  ul li .order_good_info_container {
    position: absolute;
    padding-left: 150px;
    top: 0;
    padding-top: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .order_good_name {
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 2;*/
    /*-webkit-box-orient: vertical;*/
    line-height: 20px;
    color: #333333;
  }

  .order_good_name_in {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 12px;
    overflow: hidden;
    color: #999999;
    height: 51px;
    line-height: 18px;
    padding-top: 10px;
    font-weight: 300;
  }

  .order_good_price {
    height: 28px;
    line-height: 28px;
    color: #FF4A7D;
    margin-top: 6px;
  }
  .order_good_price > span:nth-of-type(1){
    font-weight: 500;
  }

  .price_symbol {
    font-size: 14px;
    font-style: normal;
  }

  .price_symbol + span {
    font-size: 20px;
  }

  .membership_crown_pre {
    color: #999999;
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 5px;
  }

  .membership_crown .membership_crown_pre em {
    font-size: 10px;
  }

  .membership_crown {
    font-size: 12px;
    color: #D6B471;
    display: inline-block;
    margin-left: 5px;
    font-weight: 300;
  }

  .membership_crown em {
    font-size: 10px;
    font-style: normal;
  }

  .tipswrap {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.51);
    z-index: 99;
  }

  .tipswrap .tipsdiv {
    width: 72%;
    position: fixed;
    top: 50%;
    left: 50%;
    overflow: hidden;
    min-height: 20px;
    max-width: 480px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .tipswrap .tipsdiv img {
    width: 100%;
  }

  .tipswrap .tipsdiv div {
    width: 100%;
    height: 13%;
    position: absolute;
    bottom: 0;
  }

  .progress_bar {
    position: absolute;
    width: 100%;
    bottom: 20px;
  }

  .remain_btns_click {
    width: 90px;
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 13px;
    z-index: 2;
  }
</style>
<script>
  import layout from "../layout.es6";
  import * as tt_com_0 from './tt_com_0.vue'

  export default {
    data() {
      return {
        strUrl: "/api/mg/sale/timeshop/subscribe",
        ts_tips: false,
        newData: [],
      }
    },
    props: ['data'],
    created: function () {

    },
    mounted: function () {
    },
    components: {
      tt_com_0: tt_com_0
    },
    computed: {
      styleObject: function () {
        let scope = this;
        return layout.styleObject(scope.data);
      },
      isWechart: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      Panicbuying: function (item, index) {
        if (window.visitor_status == 0) {
          location.href = 'login.html?referer=' + location.href
        }
        var that = this;
        if (item.buttonStatus == 2) {
          location.href = item.command.content;
        }
        if (item.buttonStatus == 0) {
          //剩余6分钟之内不在发出提醒请求，提示等待抢购
          var dateTime = Date.parse(new Date()) / 1000;
          var closetime = item.shopStartTime - dateTime;
          if (closetime < 360) {
            bravetime.info("活动马上就要开始了，等待抢购比提醒更重要哦~");
          } else {
            if (that.isWechart) {
              bravetime.info("将在活动开始前5分钟进行提醒~");
            } else {
              bravetime.info("活动开始前5分钟会在微信公众号中进行提醒~");
            }
          }
        }
        if (item.buttonStatus == 1) {
          //剩余6分钟之内不在发出提醒请求，提示等待抢购
          var dateTime = Date.parse(new Date()) / 1000;
          var closetime = item.shopStartTime - dateTime;
          if (closetime < 360) {
            bravetime.info("活动马上就要开始了，等待抢购比提醒更重要哦~");
            return false;
          } else {
            //请求提醒接
            var datas = {
              "timeshopActId": item.timeshopActId,
              "goodsId": item.goodsId,
              "goodsName": item.title
            };
            var data = layout.strSign("notice", datas);
            $.ajax({
              type: "POST",
              url: that.strUrl,
              data: data,
              dataType: 'json',
              success: function (data) {
                if (data.code == 0) {
                  if (that.isWechart) {
                    bravetime.info("将在活动开始前5分钟进行提醒~");
                  } else {
                    bravetime.info("活动开始前5分钟会在微信公众号中进行提醒~");
                  }
                  item.buttonStatus = 0;
                  item.buttonName = '已设提醒';
                  that.data.body.dataList[index] = item;
                }
                else if (data.code == 64404) {
                  that.ts_tips = true;
                }
              }
            });
          }

        }
      },
      tipsconfirm: function () {
        this.ts_tips = false;
      },
      imgObject: function (imgSrc) {
        return {
          src: imgSrc || '//pic.davdian.com/free/2017/06/23/260_260_359b8152fdd76bfc7a4b0679909d59c3.png',
          error: '//pic.davdian.com/free/2017/06/23/260_260_359b8152fdd76bfc7a4b0679909d59c3.png',
          loading: '//pic.davdian.com/free/2017/06/23/260_260_359b8152fdd76bfc7a4b0679909d59c3.png'
        }
      },
      events: function () {

      }
    }
  }
</script>
