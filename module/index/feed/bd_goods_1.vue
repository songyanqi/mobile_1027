<template>

  <div id="comon" @click="periodtj">

    <!--<div class="good_list_con">-->
      <!--<div class="good_list_2_row">-->
        <!--&lt;!&ndash;单个商品模版&ndash;&gt;-->
        <!--<a v-for="item in list" @click="clickAnalysis" :position="item.position" data-id="item.goodsId"-->
           <!--:href="item.command.content" class="good_item">-->
          <!--<div class="good_img_container">-->
            <!--<div class="img_container">-->
              <!--<img :src="item.imageUrl" style="display: inline;">-->
              <!--<span class="img_label" v-if="item.actInfo!=''" v-text="item.actInfo"></span>-->
              <!--<span class="img_label" v-if="item.actInfo==''&&item.incomeInfo!=''" v-text="item.incomeInfo"></span>-->
            <!--</div>-->
            <!--<div v-if="item.sale_status" class="good_list_sell_out ng-scope">-->
              <!--<span v-if="item.statusInfo" class="ng-scope">{{ item.statusInfo }}</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="good_con">-->
            <!--<div class="good_title">{{item.title}}</div>-->
            <!--<div class="goods4_price_bar">-->
              <!--<span class="dav-color-price font-weight"><em class="fz_14">¥</em><span-->
                <!--class="nowPrice"><span>{{(item.nowPrice+'').split(".")[0]}}</span><span class="fz_14" v-if="(item.nowPrice+'').split('.').length == 2">.{{(item.nowPrice+"").split(".")[1]}}</span></span></span>-->
              <!--<span class="vip_return" v-if = "item.timeshopIncome != 0">-->
              <!--<span class="vip_return_title">会员返</span>-->
              <!--<span class="vip_return_f">¥</span>-->
              <!--<span class="vip_return_price">{{item.timeshopIncome}}</span>-->
            <!--</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</a>-->
        <!--<div style="clear: both;">-->
        <!--</div>-->
        <!--<div class="logo_container" v-if="beforeFirstLoading">-->
          <!--<div class="logo_left"></div>-->
          <!--<div class="logo_right"></div>-->
        <!--</div>-->
        <!--<div class="no_more" v-if="errors">-->
          <!--<span>（ &gt;_&lt; ）加载失败了</span>-->
        <!--</div>-->
        <!--<div v-if="no_more" class="no_more">-->
          <!--没有更多商品了-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->
    <category
              :list = "list"
              :no_more = "no_more"
              :errors = "errors"
              :loading = "beforeFirstLoading"></category>
  </div>
</template>

<script>
//  import './bd_goods_1.scss'
  import bd_goods_1 from './bd_goods_1.es6'
  export default bd_goods_1
</script>


<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_goods_1.scss";
</style>
