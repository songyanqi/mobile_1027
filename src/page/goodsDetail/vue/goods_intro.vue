<template>
  <div class="good_introduce_con">
    <div class="good_introduce">
      <!-- 商品名 -->
      <div class = "goods_name">{{ goodsname }}</div>

      <!--六一活动-->
      <div v-if = "isshowa" class = "partys">
        <a href="/t-12091.html?dp=goods_detail_618">618年中会员狂欢省钱攻略来袭>></a>
      </div>
      <div v-if = "isshowb" class = "partys">
        <a href="/t-12091.html?dp=goods_detail_618">618年中会员狂欢！领取45元红包>></a>
      </div>
      <div class = "clearfix introPrice">
        <div style = "display: none">{{ membercont }}</div>
        <div>
          <span class = "memPrice"><span class = "font14">¥ </span>{{ memPrice }}</span><span class="originPrice">¥{{ infoobj.marketPrice }}</span><span class = "member_iconCont" @click = "showTags('middle')"><span v-if="infoobj.taxPrice != 0" class = "question_ico"></span><span v-if = "infoobj.labelTag && infoobj.labelTag.length"><span v-for = "item of infoobj.labelTag" class = "labelList"><span class = "tags">{{ item.goodsLabel }}</span></span></span></span>
        </div>
      </div>
      <div class = "commission" v-if = "visitorstatus == 3">
        <div class = "memBack"><span v-if = "infoobj.memberGoods == '0'">会员返：¥ {{ infoobj.sellerIncome }}</span><span style = "color: #666;" v-else>分享奖励：¥ {{ infoobj.normalIncome }}</span><span class = "sellerTiems" v-if = "infoobj.activityRatio != 0"><span style = "display:inline-block; margin:0 3px;">*</span>{{ infoobj.activityRatio }}倍</span><span v-if = "infoobj.memberGoods == '0'" class = "member_iconCont"><span class = "question_ico" style = "margin-left: 5px;" @click = "showMember('middle')"></span></span></div>
      </div>
      <!--<div v-else @click = "handleMember" class = "newMemberTips">
        <div class = "memCont">
          <span class = "mem_f_icon"></span><span>会员价: ¥{{ unMemPrice }}，节省{{ savePrice }}元</span>
        </div>
        <div>
          <span>开通会员</span><span class = "openMem_icon"></span>
        </div>
      </div>-->

      <div class = "salesCount clearfix">
        <span class = "goodsStock"><span v-if = "seckill">秒杀库存</span><span v-else><span v-if = "infoobj.isActivity">活动剩余库存</span><span v-else>库存</span></span> {{ goodsstocknumber }}</span>
        <span class = "already_sale">已售 {{ infoobj.salesNumber }}</span>
      </div>
    </div>
    <!--预告提示-->
    <div class = "limitBuy" v-if = "infoobj.isComingActivity">
      <span class = "limitBuy_icon"></span>
      <span class = "limitBuy_tips"><span class = "limit_cont">此商品{{ infoobj.comingBegTime }}参加{{ infoobj.comingTypeName }}，会员返现¥{{ infoobj.comingActIncome }}，可提前加入购物车</span></span>
    </div>
    <!--库存不足-->
    <div class = "stock_tips_wrapper">
      <span class = "stock_tips">库存不多了，要买尽快哦</span>
    </div>

    <div class = "tax_cont">
      <div @click = "handleMaskTask" style = "display: none;" class = "weui-mask"></div>
      <div class = "weui-dialog">
        <p class = "dialog-title">
          <!--价格详情-->
          {{ confirmTitle }}
        </p>
        <p class = "dialog-content" :class = "{ alignLeft: isMemContent }">
          <!--本商品含税{{ infoobj.taxPrice }}元-->
          {{ confirmText }}
        </p>
        <span class="vux-close tax-close" @click="handleCloseTag"><span class = "taxBtn"></span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import GoodsIntro from './goods_intro.es6';
  export default GoodsIntro;
</script>
