<template>
  <div>
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_img11.jpg" alt="">
    </div>

    <div v-if="environment=='preview'" class="goods_group_con">
      <div v-for="(item, index) in previewData" :key="index" class="goods_item">
        <img class="goods_img" :src="item.goods_img">
        <div class="goods_title" v-text="item.goods_name"></div>
        <div class="goods_price_outer">
          <!--<span class="price" v-text="`¥${item.shop_price}`"></span>-->
          <span class="price" v-text="'¥'+item.shop_price"></span>
          <span class="market_price"
                v-text="'¥'+item.market_price"></span>
          <span class="buy_btn">立即购买</span>
        </div>
      </div>
    </div>

    <div v-if="environment=='show'" class="goods_group_con">
      <a :href="item.url" v-for="(item, index) in previewData" :key="index" class="goods_item">
        <div class="goods_img">
          <!--<x-img v-if="index>3" :src="item.goods_img" default-src="http://pic.davdian.com/free/2017/06/08/160_160_4d0f1e2009fdfd8bb0c430cda8e22a82.png" container="#vux_view_box_body"></x-img>-->
          <!--<img v-else  :src="item.goods_img">-->
          <img :src="item.goods_img">
          <span class="img_label" v-if="item.goods_label&&item.goods_label.length" v-text="item.goods_label"></span>
        </div>
        <div class="goods_title" v-text="item.goods_name"></div>
        <div class="goods_price_outer">
          <span v-if="item.price" class="price">
            <small>¥</small>{{item.price[0]}}<small>{{item.price[1]}}</small>
          </span>
          <span class="vip_return">
            <span class="vip_return_title">会员返</span>
            <span class="vip_return_f">¥</span>
            <span class="vip_return_price">{{item.seller_income}}</span>
          </span>
        </div>
      </a>
    </div>

  </div>
</template>
<style src="../goods/goods.css" scoped></style>
<style scoped="">
  .goods_group_con{
    background-color: #f1f1f1;
  }
  .goods_item {
    font-size: 12px;
    line-height: 16px;
    background-color: #fff;
    display:block;
    margin-bottom: 10px;
    padding: 0 10px;
  }
  .goods_item:nth-last-child(1){
    margin-bottom: 0;
  }

  .goods_img {
    width: 100%;
    position:relative;
  }
  .goods_item img{
    width: 100%;
  }

  .goods_title {
    overflow: hidden;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    font-size: 14px;
    line-height: 20px;
    margin-top: 10px;
  }

  .market_price {
    margin-left: 5px;
    text-decoration: line-through;
    color: #666;
  }

  .price {
    color: #ff4a7d
  }

  .buy_btn {
    float: right;
    background-color: #FF4A7D;
    color: #fff;
    padding: 0 5px;
    border-radius: 2px;
  }

  .img_label{
    font-weight: bold;
    left: 0;
    bottom:0;
    position:absolute;
    font-size: 10px;
    opacity: 0.8;
    background: linear-gradient(90deg,#ff5b5b,#fa1862);
    background: -webkit-linear-gradient(left,#ff5b5b,#fa1862);
    color:#fff;
    line-height: 16px;
    padding:1px 8px 0 6px;
    border-top-right-radius: 8px;
  }
  .img_label:after{
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
  small{
    padding:0 1px;
  }

  .goods_price_outer {
    margin-top: 10px;
    font-size: 16px;
    line-height: 16px;
    padding-bottom: 10px;
  }

</style>
<script>
  import goodsItemHandler from '../goods/goodsItemHandler';
  import { XImg } from 'vux'
  export default {
    name: "item10",
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
      let that = this;
      this.initData();
      this.getData();
      that.$nextTick(function (){
        that.$el.querySelectorAll(".goods_img").forEach(function (el, index, listObj) {
          el.style.height=el.clientWidth+"px";
        });
      });

    },
    methods: {
      getData(){
        let that = this, el = this.$el;
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
