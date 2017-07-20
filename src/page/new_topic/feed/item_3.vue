<template>
  <div>
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_img10.jpg" alt="">
    </div>
    <div v-if="environment=='preview'" class="goods_group">
      <div v-for="(item, index) in previewData" :key="index" class="goods_item">
        <img :src="item.goods_img" :alt="item.goods_name" class="goods_img">
        <div v-text="item.goods_name" class="goods_name"></div>
        <div class="goods_price">
          <!--<span class="price" v-text="`¥${item.shop_price}`"></span>-->
          <span class="price" v-text="'¥'+item.shop_price"></span>
          <span class="buy_btn">立即购买</span>
        </div>
      </div>
    </div>

    <div v-if="environment=='show'" class="goods_group">
      <a :href="item.url" v-for="(item, index) in previewData" :key="index" class="goods_item">
        <img :src="item.goods_img" :alt="item.goods_name" class="goods_img">
        <div v-text="item.goods_name" class="goods_name"></div>
        <div class="goods_price">
          <!--<span class="price" v-text="`¥${item.shop_price}`"></span>-->
          <span class="price" v-text="'¥'+item.shop_price"></span>
          <span class="buy_btn">立即购买</span>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
  import goodsItemHandler from '../goods/goodsItemHandler';

  export default {
    name: "item3",
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
    created(){
      this.getData();
    },
    methods: {
      getData(){
        let that = this;
        goodsItemHandler.handler(this.itemData, {limit: 4})
          .then(function (data) {
            that.previewData = data.data;
          });
      }
    },
    props: ['environment', "itemData"]
  }
</script>
<style src="../goods/goods.css" scoped></style>
<style scoped="">
  .buy_btn{
    float: right;
    background-color: #FF4A7D;
    color: #fff;
    padding: 0 5px;
    border-radius: 2px;
  }
</style>
