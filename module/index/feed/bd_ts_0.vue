<template>
  <div class="ts_feeds" :style="[{ marginTop:data.marginTop },styleObject]">
    <div id="ts_menu_wrap">
      <div :style="styleObject" class="swiper-container ts_menu" id="ts_menu">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item, index) in dataList" :class="{pitch_on:item.selected == 1}"
              @click="ts_tab(item,index)" :data="item.timeshopActId">
            <div class="" v-if='item && item.title'>
              <div class="time_state_span">{{item.title}}</div>
              <div class="statusInfo">{{item.statusInfo}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  //  import tsFeed from '../index_feed.vue';
  import layout from "../layout.es6";
  import WebStorageCache from 'web-storage-cache';
  let socialCache = new WebStorageCache({storage: 'sessionStorage'});
  export default {
    data(){
      return {
        feedData: [],
        timeout: '',
        timeshopActId: '',
        swiperIndex: 0,
        tsmenu: '',
        timestamp2: Date.parse(new Date()) / 1000,
        index_ts_data: "/api/mg/sale/index/getTimeshop"
//        index_ts_data: "../data/index_ts_data.json"
      }
    },
    props: ['data'],
    created: function () {

    },
    updated: function () {

    },
    mounted: function () {
      var that = this;
      that.init();
    },
    computed: {
      styleObject: function () {
        let scope = this;
        return layout.styleObject(scope.data);
      },
      dataList:function(){
        return this.data.body.dataList
      }
    },
    components: {},
    watch: {},
    methods: {
      init: function () {
        console.log("init");
        var that = this;
        var length = that.dataList.length;
        /**
         * 先遍历限时购场次
         * 判断有场次开始时间在5分钟之内
         * 定时，时间到了之后，变更文案状态，重新获取该场次数据并缓存到session里
         * 如果该场次处于选中状态，直接更新
         * 因为首页数据session缓存没有做过期销毁，所以需要同时更新缓存数据
         */
        for (var i = 0; i < that.dataList.length; i++) {
          //清除限时购缓存
          socialCache.set('timeshopAct' + that.dataList[i].timeshopActId, '');
          var minTime = that.dataList[i].startTime - that.timestamp2;
          /**
           * 如果minTime已经小于0就是该场次活动已经处于抢购中
           * 如果状态是即将开始，更改为抢购中
           * */
          if (minTime < 0) {
            if (that.dataList[i].statusInfo == "即将开始") {
              that.dataList[i].statusInfo = "抢购中";
            }
          } else {
            /**
             * 如果该场次的开始时间小于300秒 也即是五分钟 操作定时 到时间后更换状态
             */
            if (minTime < 300) {
              (function (a) {
                setTimeout(function () {
                  that.ts_timeUp(a);
                }, minTime * 1000 + 500);
              })(i);
            }
          }
          if (that.dataList[i].selected == 1) {
            that.swiperIndex = i;
          }
        }
        this.$nextTick(function () {
          if (length > 4) {
            this.mySwiper11 = new Swiper('.ts_menu', {
              slidesPerView: 4.65,
              grabCursor: true,
              initialSlide: that.swiperIndex - 2,
            });
          } else {
            this.mySwiper11 = new Swiper('.ts_menu', {
              slidesPerView: length,
              grabCursor: true
            });
          }
        });
      },
      ts_timeUp: function (i) {
        var that = this;
        that.dataList[i].statusInfo = "抢购中";
        if (that.dataList[i].selected == 1) {
          that.get_ts_data({"timeshopActId": that.dataList[i].timeshopActId});
        } else {
          var timeshopActCash = socialCache.get('timeshopAct' + that.dataList[i].timeshopActId);
          if (timeshopActCash) {
            socialCache.set('timeshopAct' + that.dataList[i].timeshopActId, '');
          }
        }
      },
      ts_tab: function (item, index) {
        var that = this;
        for (var i = 0; i < that.dataList.length; i++) {
          that.dataList[i].selected = 0;
        }
        if (item.selected != 1) {
          that.dataList[index].selected = 1;
          this.mySwiper11.slideTo(Math.max(0, index - 2));
          var objHeight = document.getElementById("ts_menu_wrap").offsetTop;
          var top = window.scrollY;
          //更新数据
          var timeshopActCash = socialCache.get('timeshopAct' + item.timeshopActId);
          if (timeshopActCash) {
            that.$emit("tsfeed", JSON.parse(timeshopActCash));
          } else {
            that.get_ts_data({"timeshopActId": item.timeshopActId});
          }
          if (objHeight < top) {
            // window.scroll(0, +objHeight - 20);
            window.scroll(0, +objHeight);
          }
        }
      },
      get_ts_data: function (datas) {
        var that = this;
        var data = layout.strSign("ts_data", datas);
        if (that.timeout) {
          clearTimeout(that.timeout);
        }
        $.ajax({
          type: "POST",
          url: that.index_ts_data,
          data: data,
          dataType: 'json',
          success: function (data) {
            layout.dataVersion('feed', data);
            if (data.code == 0) {
              that.state = data.visitor_status;
              //todo feed数据流控制
              if (data.data) {
                that.$emit("tsfeed", data.data.feedList);
                socialCache.set('timeshopAct' + datas.timeshopActId, JSON.stringify(data.data.feedList), {exp: 180});
              } else {

              }
            }
          },
          error: function (e) {
            console.log("Oops, error", e);
            bravetime.info("请求异常")
          }
        });
      }
    }
  }
</script>
<style scoped>
  .ts_feeds section .index_model {
    margin-top: 0;
  }

  #ts_menu_wrap {
    height: 50px;
    width: 100%;
    overflow: hidden;
  }

  .ts_menu {
    width: 100%;
    z-index: 2;
    background-color: #FDFCFC !important;
    position: relative;
  }

  .ts_menu:after {
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

  .ts_menu li {
    text-align: center;
    font-size: 14px;
    padding: 11px 0;
    color: #666666;
    background-color: #FDFCFC;
  }

  .ts_menu li.pitch_on {
    background: -webkit-linear-gradient(left top, #FF7676, #FF4A8F); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #FF7676, #FF4A8F); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #FF7676, #FF4A8F); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #FF7676, #FF4A8F); /* 标准的语法 */
    color: #FFF !important;
  }

  .ts_menu li > div .statusInfo {
    font-size: 10px;
  }

  .ts_menu li > div > div:nth-of-type(1) {
    line-height: 14px;
    margin-bottom: 4px;
  }

  .ts_menu li > div > div:nth-of-type(2) {
    line-height: 10px;
  }

  .ts_menu li:nth-of-type(1) > div:before {
    width: 0px;
  }

  .ts_menu li.pitch_on > div:before {
    width: 0px;
  }

  .ts_menu li.pitch_on + li > div:before {
    width: 0px;
  }

  .ts_menu li > div:before {
    content: "";
    display: block;
    position: absolute;
    top: -10%;
    height: 120%;
    width: 1px;
    background: #ededed;
    -webkit-transform: scale(0.5);
  }


</style>
<style>
  #comon {
    position: relative;
  }
</style>
