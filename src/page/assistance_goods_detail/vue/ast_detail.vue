<template>
  <div style="font-weight: normal;">
    <!--商品详情主图-->
    <div>
      <img class="main_banner"
           src="//pic.davdian.com/supplier/2017/03/23/800_800_15cae0a30dcf4759484440e72b6390b2.jpg?x-oss-process=image/resize,m_fill,w_640,h_640/format,webp">
      <div class="count_down">
        <span>10.18周年庆0元抢爆品</span><br>
        <span>距助力结束：7天</span>
      </div>
      <!--商品名称-->
      <div class="goods_title">
        棕色的熊、棕色的熊，你在看什么？（纸板书，拼贴画大师艾瑞卡尔的处女作，全球畅销40余年，备受家长和老师推崇的阅读启蒙书。适合0-3岁）
      </div>
      <!--价格信息-->
      <div class="price_info">
        <div>
          <span>10.18活动价</span>
          <span>¥</span>
          <span>19.76</span>
          <span>¥29.90</span>
        </div>
        <div>已有<span>283789</span>人参与</div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    props: {},
    data() {
      return {

      }
    },
    components: {

    },
    computed: {
      goodsId: function () {
        return location.pathname.split("_")[1].split(".")[0];
      }
    },
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

  .main_banner {
    width: 100%;
    display: block;
  }

  .count_down {
    height: 56px;
    background-image: url("//pic.davdian.com/free/2017/09/11/Oval.png");
    background-size: 100% 100%;
    text-align: center;
    color: #ffffff;
    span:nth-of-type(1) {
      font-size: 18px;
      display: inline-block;
      margin-top: 5px;
      line-height: 25px;
      height: 25px;
    }
    span:nth-of-type(2) {
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
  }

  .goods_title {
    padding: 0 10px;
    min-height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #333333;
    margin-top: 10px;
  }
  .price_info{
    width: 100%;
    height: 36px;
    overflow: hidden;
    div:nth-of-type(1){
      color: #FF4A7D;
      float: left;
      margin-left: 10px;
      line-height: 36px;
      span:nth-of-type(1){
        font-size: 14px;
      }
      span:nth-of-type(2){
        font-size: 14px;
      }
      span:nth-of-type(3){
        font-size: 25px;
      }
      span:nth-of-type(4){
        font-size: 11px;
        color: #999999;
      }
    }
    div:nth-of-type(2){
      float: right;
      margin-right: 10px;
      font-size: 11px;
      color:#999999;
      position: relative;
      top: 17px;
      span{
        color:#FF4A7D
      }
    }
  }
</style>
