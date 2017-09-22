<template>
  <div>
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_img_25.png" alt="">
    </div>

    <div v-if="environment=='preview'" class="goods_group_con">
      <div v-for="(item, index) in previewData" :key="index"
           class="cross_goods_item goods_cross goods_cross2">
        <div class="goods_img">
          <img :src="item.goods_img" :alt="item.goods_name" >
          <span class="img_label" v-if="item.goods_label&&item.goods_label.length" v-text="item.goods_label"></span>
        </div>
        <div class="goods_info">
          <div v-text="item.goods_name" class="goods_title"></div>
          <div class="goods_price_outer">
            <span class="price"><small>¥</small>{{item.shop_price}}</span>
            <span class="vip_return" v-if = "item.seller_income && item.seller_income != '0'">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.seller_income}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="environment=='show'" class="goods_group_con">
      <a :href="item.url" v-for="(item, index) in previewData" :key="index"
         class="cross_goods_item goods_cross goods_cross2">
        <div class="goods_img">
          <!--<x-img v-if="index>6" :src="item.goods_img" default-src="http://pic.davdian.com/free/2017/06/08/160_160_4d0f1e2009fdfd8bb0c430cda8e22a82.png" container="#vux_view_box_body"></x-img>-->
          <!--<img v-else  :src="item.goods_img">-->
          <img :src="item.goods_img">
          <span class="img_label" v-if="item.actInfo!=''" v-text="item.actInfo"></span>
            <span class="img_label" v-if="item.actInfo==''&&+item.ratio" v-text="'返现'+item.ratio+'倍'"></span>
        </div>
        <div class="goods_info">
          <div v-text="item.goods_name" class="goods_title"></div>
          <div class="goods_price_outer">
            <span v-if="item.price && item.price != '0'" class="price" ><small>¥</small>{{item.price[0]}}<small>{{item.price[1]}}</small></span>
            <span class="vip_return" v-if = "item.seller_income && item.seller_income != '0'">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.seller_income}}</span>
            </span>
          </div>
        </div>
      </a>
    </div>

  </div>
</template>
<style src="../goods/goods.css" scoped></style>
<style scoped="">
  .goods_group_con {
    overflow: hidden;
    background-color: #f1f1f1;
  }

  .cross_goods_item {
    display: block;
    height: 100px;
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .cross_goods_item:nth-last-child(1) {
    margin-bottom: 0;
  }

  .cross_goods_item .goods_img {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 0;
  }

  .cross_goods_item .goods_info {
    margin-left: 90px;
    padding: 10px;
  }

  .goods_cross .goods_title {
    font-size: 14px;
    color: #333;
    line-height: 19px;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    height: 38px;
    overflow: hidden;
  }

  .goods_cross .goods_price_outer {
    margin-top: 24px;
    font-size: 16px;
    line-height: 16px;
    width: 200%;
  }

  .goods_cross .price {
    color: #ff4a7d;
  }

  .goods_cross .label {
    border-radius: 8px;
    color: #fff;
    padding: 0 5px;
    background-color: #ff4a7d;
    font-size: 10px;
    display: inline-block;
    margin-left: 4px;
    font-family: sans-serif;
    line-height: 16px;
    height: 16px;
    vertical-align: middle;
  }

  .img_label {
    font-weight: bold;
    left: 0;
    bottom: 0;
    position: absolute;
    font-size: 10px;
    opacity: 0.8;
    background: linear-gradient(90deg, #ff5b5b, #fa1862);
    background: -webkit-linear-gradient(left, #ff5b5b, #fa1862);
    color: #fff;
    line-height: 16px;
    padding: 1px 8px 0 6px;
    border-top-right-radius: 8px;
  }

  .img_label:after {
    content: "";
    width: 0;
    height: 0;
    border-width: 0 4px 10px 0;
    border-style: solid;
    border-color: transparent transparent #fa1862 transparent;
    position: absolute;
    margin-left: 8px;
    bottom: 0;
  }

  .cross_goods_item:nth-child(2n) .goods_img {
    right: 10px;
    left: inherit;
  }


  .cross_goods_item:nth-child(2n) .goods_info {
    margin-right: 90px;
    margin-left: 0;
  }

  small {
    padding: 0 1px;
  }
</style>
<script>
  import goodsItemHandler from '../goods/goodsItemHandler';
  import { XImg } from 'vux'
  export default {
      name:"item25",
    data(){
      return {
        previewData: null
      }
    },
    watch: {
      itemData: {
        deep: true,
        handler: function (val, oldVal) {
          this.getData();
        }
      },
    },
    mounted(){
      this.initData();
      this.getData();
    },
    methods: {
      getData(){
        let that = this,el=this.$el;
        goodsItemHandler.handler(this.itemData, {limit: 2,el})
          .then(function (data) {
            that.previewData = data.data;
          });
      },
      initData(){
        this.previewData = goodsItemHandler.init(this.itemData);
      },
    },
    props: ['environment', "itemData"],
    components:{
      XImg
    }
  }
</script>
