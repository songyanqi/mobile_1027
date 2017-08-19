<!--<template>
  <div style="height:100%;" class="app">
    <view-box ref="viewBox">
      <com-top-title slot="header" :title="title" border-bottom home hide-disable></com-top-title>
      <feed environment="show" :feed-list="list"></feed>
    </view-box>
  </div>
</template>
<script>
  import layout from "../../../../module/index/layout.es6";
  import $ from '$';
  import share from '../../../common/js/module/share.js';
  import base from '../../../../utils/base.es6';
  import ua from '../../../common/js/module/ua.js';
  import Bus from '../js/bus.js';
  import native from '../../../common/js/module/native.js';
  import './feed.es6';
  import {ViewBox} from 'vux'
  import WebStorageCache from 'web-storage-cache';
  let topicCache = new WebStorageCache({storage: 'sessionStorage'});
  export default{
    data: function () {
      return {
        list: JSON.parse(dataStr).list,
        title:"大V店"
      }
    },
    components: {
      'com-top-title': require('../../../component/com-top-title.vue'),
      ViewBox
    },
    created(){
      window.tj_path = "new_topic";
      base.init();
      let that = this;
      Bus.$on('scroll', target => {
        that.$refs.viewBox.scrollTo(target);
    });
      if(ua.isDvdApp()){
        document.body.className = document.body.className+"is_dvd_app";
      }
    },
    mounted(){
      let that = this;

      const info = JSON.parse(dataStr).info;

      that.title=document.title=info.title;
      native.custom.initHead({
        shareOnHead: 1,
        homeOnHead: 1,
      });
      let shareImgUrl = info.shareImg.split("?")[0]+'?x-oss-process=image/resize,m_fill,w_100,h_100/quality,Q_90&';
      share.setShareInfo({
        title: info.shareTitle,
        desc: info.shareDesc,
        link: location.href,
        imgUrl: shareImgUrl // 分享图标
      });

      that.$nextTick(function () {
          if (ua.isIos() && ua.isWeiXin()) {
            document.querySelector(".app").style.height = window.innerHeight - 44 + "px";
          }
        setTimeout(function () {
          that.restorePosition();
        },10);
        that.addPositionListener();
      })
    },
    methods: {
      addPositionListener(){
        let that = this;
        $(document).on("click","a",function () {
          const y = that.$refs.viewBox.getScrollTop();
          topicCache.set("restoreY",y);
        });
      },
      restorePosition(){
        let that = this;
        let history = base.pathHistory.getPathHistoryList();
        if (history.length > 2) {
          if ( history[history.length - 2].path === "detail"&&history[history.length - 3].href === location.href) {
            const restoreY = +topicCache.get("restoreY");
            if(restoreY){
              that.$refs.viewBox.scrollTo(restoreY);
            }
          }
        }
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  #vux_view_box_body{
    /*padding-top: 44px;*/
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom:0;
  }

  body {
    background-color: #fff;
    padding-top: 0;
  }

  .is_dvd_app #vux_view_box_body{
    padding-top: 0;
  }
</style>


<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/topic.scss"
</style>-->


<template>
  <div style="height:100%;" class="app">
    <view-box ref="viewBox">
      <com-top-title slot="header" :title="title" border-bottom home hide-disable></com-top-title>
      <feed environment="show" :feed-list="list" ></feed>
    </view-box>
  </div>
</template>
<script>
  import axios from "axios";
  import layout from "../../../../module/index/layout.es6";
  import $ from '$';
  import share from '../../../common/js/module/share.js';
  import base from '../../../../utils/base.es6';
  import ua from '../../../common/js/module/ua.js';
  import Bus from '../js/bus.js';
  import native from '../../../common/js/module/native.js';
  import './feed.es6';
  import {ViewBox} from 'vux'
  import WebStorageCache from 'web-storage-cache';
  let topicCache = new WebStorageCache({storage: 'sessionStorage'});
  export default{
    data: function () {
      return {
        list: JSON.parse(dataStr).list,
        title:"大V店",
        isRender: false
      }
    },
    components: {
      'com-top-title': require('../../../component/com-top-title.vue'),
      ViewBox
    },
    created(){
      window.tj_path = "new_topic";
      base.init();
      let that = this;
      Bus.$on('scroll', target => {
        that.$refs.viewBox.scrollTo(target);
      });
      if(ua.isDvdApp()){
        document.body.className = document.body.className+"is_dvd_app";
      }
    },
    mounted(){
      let that = this;

      const info = JSON.parse(dataStr).info;

      that.title=document.title=info.title;
      native.custom.initHead({
        shareOnHead: 1,
        homeOnHead: 1,
      });
      share.setShareInfo({
        title: info.shareTitle,
        desc: info.shareDesc,
        link: location.href,
        imgUrl: info.shareImg // 分享图标
      });

      that.$nextTick(function () {
        /* 
        // 加上后ios微信有bug 暂时去掉
        if (ua.isIos() && ua.isWeiXin()) {
          document.querySelector(".app").style.height = window.innerHeight - 44 + "px";
        }
        */

        setTimeout(function () {
          that.restorePosition();
        },10);
        that.addPositionListener();
      })
    },
    methods: {
      getData(item){
        let url = "/index.php?m=default&c=topic&a=ajax_goods_by_ids";
        const requestGoods = item.goods.replace(/，/g, ",");

        axios.request({
          url,
          method: 'post',
          params: {
            list: requestGoods,
            table: "goods_id,goods_name,shop_price,goods_img,market_price,goods_brief"
          }
        }).then((res) => {
          item.previewData = res.data.data;
        }).catch(function (err) {
          reject(err);
        });
      },

      addPositionListener(){
        let that = this;
        $(document).on("click","a",function () {
          const y = that.$refs.viewBox.getScrollTop();
          topicCache.set("restoreY",y);
        });
      },
      restorePosition(){
        let that = this;
        let history = base.pathHistory.getPathHistoryList();
        if (history.length > 2) {
          if ( history[history.length - 2].path === "detail"&&history[history.length - 3].href === location.href) {
            const restoreY = +topicCache.get("restoreY");
            if(restoreY){
              that.$refs.viewBox.scrollTo(restoreY);
            }
          }
        }
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  #vux_view_box_body{
    /*padding-top: 44px;*/
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom:0;
  }

  body {
    background-color: #fff;
    padding-top: 0;
  }

  .is_dvd_app #vux_view_box_body{
    padding-top: 0;
  }
</style>


<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/topic.scss"
</style>


