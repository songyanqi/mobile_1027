<!--<template>
  <div>
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/2017/01/16/750_840_9e87809a2caf26a824c9306d3a7c6efd.png" alt="">
    </div>
    <div v-if="environment=='preview'" class="goods_group">
      <div v-for="(item, index) in previewData" :key="index" class="goods_item">
          <div class="goods_img">
            <img :src="item.goods_img" :alt="item.goods_name" >
            <span class="img_label" v-if="item.goods_label&&item.goods_label.length" v-text="item.goods_label"></span>
          </div>
          <div v-text="item.goods_name" class="goods_name"></div>
          <div class="goods_price"><small>¥</small>{{item.price[0]}}<small>{{item.price[1]}}</small></div>
          <span class="vip_return">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.seller_income}}</span>
            </span>
      </div>
    </div>
    <div v-if="environment=='show'" class="goods_group">
      <div v-for="(item, index) in previewData" :key="index" class="goods_item">
        <a :href="item.url" >
          <div class="goods_img">
            <img :src="item.goods_img">
            <span class="img_label" v-if="item.goods_label&&item.goods_label.length" v-text="item.goods_label"></span>
          </div>
          <div v-text="item.goods_name" class="goods_name"></div>
          <div v-if="item.price" class="goods_price">
            <small>¥</small>{{item.price[0]}}<small>{{item.price[1]}}</small>
          </div>
          <span class="vip_return">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.seller_income}}</span>
            </span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import goodsItemHandler from '../goods/goodsItemHandler';
  import { XImg } from 'vux'

  export default {
    data(){
      return {
        previewData: null
      }
    },
    watch:{
      itemData:{
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
    methods:{
        getData(){
          let that = this,el = this.$el;
          goodsItemHandler.handler(this.itemData, {limit: 6,el})
            .then(function (data) {
                console.log(data.data);
              that.previewData = data.data;
            });
        },initData(){
        this.previewData = goodsItemHandler.init(this.itemData);
      },
    },
    props: ['environment', "itemData"],
    components:{
      XImg
    }
  }
</script>
<style src="../goods/goods.css" scoped></style>
<style scoped>
  .goods_group .goods_item{
    width: 33.3%;
  }
  .goods_name{
    line-height:16px;
    height:32px;
  }
  .goods_price{
    width: inherit;
    text-align: center;
  }
  .vip_return{
    width: 200%;
    text-align: center;
    height: 12px;
    padding-bottom: 10px;
  }
</style>-->

<template>
  <div>
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/2017/01/16/750_840_9e87809a2caf26a824c9306d3a7c6efd.png" alt="">
    </div>
    <div v-if="environment=='preview'" class="goods_group">
      <div v-for="(item, index) in previewData" :key="index" class="goods_item">
        <div class="goods_img">
          <img :src="item.goods_img" :alt="item.goods_name" >
          <span class="img_label" v-if="item.goods_label&&item.goods_label.length" v-text="item.goods_label"></span>
        </div>
        <div v-text="item.goods_name" class="goods_name"></div>
        <div class="goods_price"><small>¥</small>{{item.price[0]}}<small>{{item.price[1]}}</small></div>
        <span class="vip_return">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.seller_income}}</span>
            </span>
      </div>
    </div>
    <div v-if="environment=='show'" class="goods_group">
      <category :list = "itemData.previewData" :column = "3 "></category>
    </div>
  </div>
</template>
<script>
  import { XImg } from 'vux'
  import category from "../../../component/com-maybeyoulike.vue";

  export default {
    data(){
      return {
        previewData: null
      }
    },
    watch:{
    },
    mounted(){
      let that = this;
      that.$nextTick(function (){
        that.$el.querySelectorAll(".goods_img").forEach(function (el, index, listObj) {
          el.style.height=el.clientWidth+"px";
        });
      });
    },
    methods:{
    },
    props: ['environment', "itemData"],
    components:{
      XImg: XImg,
      category: category
    }
  }
</script>
<style scoped>
  .goods_group .goods_item{
    width: 33.3%;
  }
  .goods_name{
    line-height:16px;
    height:32px;
  }
  .goods_price{
    width: inherit;
    text-align: center;
  }
  .vip_return{
    width: 200%;
    text-align: center;
    height: 12px;
    padding-bottom: 10px;
  }
</style>
