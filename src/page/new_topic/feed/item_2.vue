<!--<template>
  <div>
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_image_2.jpg" alt="">
    </div>

    <div v-if="environment=='preview'" class="goods_group">
      <div  v-for="(item, index) in previewData" :key="index" class="goods_item">
        <div class="goods_img">
          <img :src="item.goods_img" :alt="item.goods_name" >
          <span class="img_label" v-if="item.goods_label&&item.goods_label.length" v-text="item.goods_label"></span>
        </div>
        <div v-text="item.goods_name" class="goods_name"></div>
        <div class="goods_price">
          <span class="price" ><small>¥</small>{{item.shop_price}}</span>
          <span class="vip_return">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.seller_income}}</span>
            </span>
        </div>
      </div>
    </div>

    <div v-if="environment=='show'" class="goods_group">
      <div  v-for="(item, index) in previewData" :key="item.goods_id" class="goods_item">
        <a :href="item.url">
          <div class="goods_img">
            <img :src="item.goods_img">
            <span class="img_label" v-if="item.goods_label&&item.goods_label.length" v-text="item.goods_label"></span>
          </div>
          <div v-text="item.goods_name" class="goods_name"></div>
          <div class="goods_price">
            <span class="price" v-if="item.price"><small>¥</small>{{item.price[0]}}<small>{{item.price[1]}}</small></span>
            <span class="vip_return">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.seller_income}}</span>
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import goodsItemHandler from '../goods/goodsItemHandler';
  import { XImg } from 'vux'

  export default {
    name: "item2",
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
      previewData:{
        deep: true,
        handler: function (val, oldVal) {
          let that = this;
          this.$nextTick(function(){
            that.$el.querySelectorAll(".goods_img").forEach(function(el){
              el.style.height=el.offsetWidth+"px";
            })
          })
        }
      }
    },
    mounted(){
      this.initData();
      this.getData();
    },
    methods: {
      getData(){
        let that = this;
        let el = this.$el;
        goodsItemHandler.handler(this.itemData, {limit: 4,el})
          .then(function (data) {
            that.previewData = data.data;
          });
      },
      initData(){
        this.previewData = goodsItemHandler.init(this.itemData);
      },
      success (src, ele) {
        console.log('success load', src,ele)
      },
      error (src, ele, msg) {

      }
    },
    props: ['environment', "itemData"],
    components:{
      XImg
    }
  }
</script>
<style src="../goods/goods.css" scoped></style>-->


<template>
  <div>
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_image_2.jpg" alt="">
    </div>

    <div v-if="environment=='preview'" class="goods_group">
      <div  v-for="(item, index) in itemData.previewData" :key="index" class="goods_item">
        <div class="goods_img">
          <img :src="item.goods_img" :alt="item.goods_name" >
          <span class="img_label" v-if="item.goods_label&&item.goods_label.length" v-text="item.goods_label"></span>
        </div>
        <div v-text="item.goods_name" class="goods_name"></div>
        <div class="goods_price">
          <span class="price" ><small>¥</small>{{item.shop_price}}</span>
          <span class="vip_return" v-if = "item.seller_income && item.seller_income != '0'">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.seller_income}}</span>
            </span>
        </div>
      </div>
    </div>
    <div v-if="environment=='show'" class="goods_group">
      <category :list = "itemData.previewData"></category>
    </div>
  </div>
</template>
<script>
  import category from "../../../component/com-maybeyoulike.vue";
  import { XImg } from 'vux'

  export default {
    name: "item2",
    data(){
      return {
      }
    },
    props: ['environment', "itemData"],
    watch: {
      itemData:{
        deep: true,
        handler(val, oldVal) {
          debugger;
          console.log(val);
          let that = this;
          this.$nextTick(function(){
            that.$el.querySelectorAll(".goods_img").forEach(function(el){
              el.style.height=el.offsetWidth+"px";
            })
          })
        }
      }
    },
    mounted(){
    },
    methods: {
      success (src, ele) {
        console.log('success load', src,ele)
      },
      error (src, ele, msg) {

      }
    },
    components:{
      XImg: XImg,
      category: category,
    }
  }
</script>
