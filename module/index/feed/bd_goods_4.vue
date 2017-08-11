<template>
  <div class="good_list_con" :style="{ marginTop:data.marginTop + 'px' }">
    <div class="good_list_2_row">
      <a v-for="item in data.body.dataList" data-id="item.goods_id" :href="item.command.content"
         class="good_item">
        <div class="good_img_container">
          <div class="img_container">
            <img v-lazy="imgObject(item.imageUrl)" style="display: inline;">
            <span class="img_label" v-if="item.actInfo!=''" v-text="item.actInfo"></span>
             <span class="img_label" v-if="item.actInfo==''&&+item.ratio" v-text="'返现'+item.ratio+'倍'"></span>
          </div>
          <div v-if="item.statusInfo&&item.statusInfo != ''" class="good_list_sell_out"><span>{{item.statusInfo}}</span></div>
          <div v-if="item.pic_info && item.ratio != 0" class="pic_info">{{item.ratio}}</div>
        </div>
        <div class="good_con">
          <div class="good_title">{{item.title}}</div>
          <div class="goods4_price_bar">
            <span class="dav-color-price font-weight"><em class="fz_14">￥</em><span class = "nowPriceCont"><span class="nowPrice">{{(item.nowPrice+'').split(".")[0]}}</span><span class="fz_14" v-if="(item.nowPrice+'').split('.').length == 2">.{{(item.nowPrice+"").split(".")[1]}}</span></span></span>
            <span class="vip_return" v-if = "item.income && item.income != 0">
              <span class="vip_return_title">会员返</span>
              <span class="vip_return_f">¥</span>
              <span class="vip_return_price">{{item.income}}</span>
            </span>
          </div>
        </div>
      </a>
    </div>
  </div>
  <!--<category :list = "data.body.dataList"></category>-->
</template>
<script>
  import layout from "../layout.es6"
  import category from "../../../src/component/com-maybeyoulike.vue";
  export default{
    data: function () {
      return {}
    },
    components: {
      category: category,
    },
    props: ["data"],
    created: function () {
      /**
       * 数据排序
       */
      layout.sort(this.data);
    },
    computed: {

    },
    methods: {
      imgObject: function (imgSrc) {
        return {
          src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
          error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
          loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
        }
      }
    },
    events: {
      'changeData': function (msg) {
        this.list = msg;
      },
      'loadings': function (msg) {
        this.loading = msg;
      },
      'no_mores': function (msg) {
        this.no_more = msg;
      }
    }
  }
</script>
<style scoped >
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
.img_container{
  position: relative;
}

  .good_list_2_row {
    background: none;
    padding: 0 5px;
  }

  .font-weight {
    font-weight: 500;
  }
  .goods4_price_bar em {
    font-style: normal;
    font-size: 12px;
    display: inline-block;
    margin-right: 2px;
    
  }

  .good_list_2_row .good_item {
    padding: 0 5px;
    margin-bottom: 0;
  }

  .good_list_2_row .good_item .good_img_container img {
    border: none;
  }

  .good_con {
    display: block;
    background-color: #FFF;
    padding: 10px;
    padding-top: 0;
    overflow: hidden;
  }

  .good_con .fz_12 {
    overflow: hidden;
    height: 16px;
    line-height: 16px;
  }

  .good_con .fz_12 .dav-color-price {
    display: inline-block;
  }
.good_con .nowPriceCont {
  font-size: 0;
}
  .good_con .nowPrice {
    font-size: 16px;
  }

  .good_list_2_row .good_item .lable {
    color: #FF4A7D;
    font-size: 10px;
    display: inline-block;
    margin-left: 4px;
    font-family: sans-serif;
    background-color: #FFF;
    float: right;
    -webkit-box-sizing: border-box;
    position: relative;
    top: 7.89473%;
    padding: 0 2px;
    border: 1px solid #FF4A7D;
    line-height: 15px;
    border-radius: 4px;
  }

  .good_list_2_row .good_item .lable .border {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    position: absolute;
    border: 1px solid #FF4A7D;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 7px;
  }

  .good_list_2_row .good_item .good_title {
    margin-bottom: 4px;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    line-height: 19px;
  }

  .goods4_price_bar {
    overflow: hidden;
    height: 19px;
    width: 200%;
  }
  .good_list_sell_out{
    z-index: 0;
  }

  .vip_return{
  line-height: 1;
  font-size: 0;
  color: #BF9D51;
  padding-left: 4px;
  position: relative;
  display: inline-block;
    -webkit-transform: scale(0.5);
  -webkit-transform-origin: 0 60%;
  transform: scale(0.5);
  transform-origin: 0 60%;
  vertical-align: middle;
  margin-bottom: 4px;
}
.vip_return .vip_return_title{
  font-size: 22px;
}
.vip_return .vip_return_f{
  font-size: 18px;
  padding: 0 2px 0 4px;
}
.vip_return .vip_return_price{
  font-size: 24px;
}
 @media screen and (max-width:374px){
    .vip_return{
      padding-left:0;
      margin-bottom: 3px;
    }
    .vip_return .vip_return_title{
      font-size: 20px;
    }
    .vip_return .vip_return_f{
      font-size: 14px;
      padding: 0 2px 0 4px;
    }
    .vip_return .vip_return_price{
      font-size: 20px;
    }
 }
</style>

