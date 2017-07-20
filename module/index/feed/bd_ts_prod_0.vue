<template>
  <div :style="[{ marginTop:data.marginTop },styleObject]">
    <ul>
      <li class="list_style" :class="{online:item.showLine == '1'}" v-for="(item, index) in data.body.dataList">
        <a :href="item.command.content">
          <div class="img_container">
            <div class="img_container_inner">
              <img v-lazy="imgObject(item.imageUrl)">
              <div v-if="item.buttonStatus == 3">已抢光</div>
            </div>
            <div class="order_good_info_container">
              <div class="order_good_name">{{item.title}}</div>
              <div class="order_good_price">
                <!--<em class="price_symbol">￥</em>{{item.nowPrice}}-->
                <!--<span class="membership_crown">会员返 <em>￥</em>{{item.timeshopIncome}}</span>-->
                <em class="price_symbol">￥</em><span>{{(item.nowPrice+"").split(".")[0]}}</span><span v-if = "(item.nowPrice+'').split('.').length == 2" class = "newOriginal_price">.{{(item.nowPrice+"").split(".")[1]}}</span>
                <span class="membership_crown">会员返 <em>￥</em>{{item.timeshopIncome}}</span>
              </div>

              <div class="progress_bar" v-if="(item.buttonStatus != 0)&&(item.buttonStatus != 1)">
                <div class="progress_bar_bg">
                  <div class="progress_container" :style="{width:item.percentage+'%'}">
                  </div>
                </div>
                <div class="finish_percentage">已售{{item.percentage}}%</div>
              </div>
            </div>
          </div>
        </a>
        <a class="remain_btns">
          <div class="panic_buying_btn"
               :class="{panic_buying_btn2:item.buttonStatus < 2,buy_gray:item.buttonStatus == '3'}">{{item.buttonName}}
          </div>
          <div @click="Panicbuying(item,index)" class="remain_btns_click"></div>
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
  .newOriginal_price {
    font-size: 14px;
  }
  ul li {
    padding: 10px;
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
    width: 130px;
    position: relative;
  }
  ul li .img_container_inner div{
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
    padding-left: 140px;
    top: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .order_good_name {
    font-size: 15px;
    max-height: 37px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 20px;
    color: #666666;
  }

  .order_good_price {
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    color: #FF4A7D;
    padding-top: 10px;
  }

  .price_symbol {
    font-size: 13px;
    font-style: normal;
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
  .panic_buying_btn.buy_gray{
    background: -webkit-linear-gradient(left top, #DBDADA, #C5C5C5); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #DBDADA, #C5C5C5); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #DBDADA, #C5C5C5); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #DBDADA, #C5C5C5); /* 标准的语法 */
  }
  .progress_bar_percentage.wall {
    width: 100%;
    min-width: 10px;
  }

  .finish_percentage {
    font-size: 11px;
    color: #FF4A7D;
    line-height: 11px;
    margin-top:5px;
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

  .panic_buying_btn2:after{
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

  .membership_crown {
    font-size: 12px;
    color: #D6B471;
    display: inline-block;
    padding-left: 6px;
    position: relative;
    bottom: 1px;
  }

  .membership_crown em {
    font-size: 12px;
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
  .progress_bar{
    position: absolute;
    width: 100%;
    bottom: 20px;
  }
  .remain_btns_click{
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
  export default {
    data(){
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
    components: {},
    methods: {
      Panicbuying: function (item, index) {
        if(window.visitor_status == 0){
           location.href = 'login.html?referer='+location.href
        }
        var that = this;
        if (item.buttonStatus == 2) {
          location.href = item.command.content;
        }
        if (item.buttonStatus == 0) {
          //剩余6分钟之内不在发出提醒请求，提示等待抢购
          var dateTime = Date.parse(new Date())/1000;
          var closetime = item.shopStartTime - dateTime;
          if(closetime < 360){
            bravetime.info("活动马上就要开始了，等待抢购比提醒更重要哦~");
          }else{
            if (that.isWechart) {
              bravetime.info("将在活动开始前5分钟进行提醒~");
            } else {
              bravetime.info("活动开始前5分钟会在微信公众号中进行提醒~");
            }
          }
        }
        if (item.buttonStatus == 1) {
          //剩余6分钟之内不在发出提醒请求，提示等待抢购
          var dateTime = Date.parse(new Date())/1000;
          var closetime = item.shopStartTime - dateTime;
          if(closetime < 360){
            bravetime.info("活动马上就要开始了，等待抢购比提醒更重要哦~");
            return false;
          }else{
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
                  item.buttonName = '等待提醒';
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
      imgObject:function (imgSrc) {
        return{
          src: imgSrc || '//pic.davdian.com/free/2017/06/23/260_260_359b8152fdd76bfc7a4b0679909d59c3.png',
          error: '//pic.davdian.com/free/2017/06/23/260_260_359b8152fdd76bfc7a4b0679909d59c3.png',
          loading: '//pic.davdian.com/free/2017/06/23/260_260_359b8152fdd76bfc7a4b0679909d59c3.png'
        }
      },
      events:function () {
        
      }
    }
  }
</script>
