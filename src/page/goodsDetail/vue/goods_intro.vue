<template>
  <div class="good_introduce_con">
    <div class="good_introduce">
      <!-- 商品名 -->
      <div class = "goods_name">{{ goodsname }}</div>

      <!--六一活动-->
     <!--  <div v-if = "isshowa" class = "partys">
        <a href="/t-12091.html?dp=goods_detail_618">618年中会员狂欢省钱攻略来袭>></a>
      </div>
      <div v-if = "isshowb" class = "partys">
        <a href="/t-12091.html?dp=goods_detail_618">618年中会员狂欢！领取45元红包>></a>
      </div> -->

      <!--商品名下方文案，818需求-->
      <!--预热-->
      <div class = "partys" v-if="Date.now() >= new Date(2017,7,17) && Date.now() < new Date(2017,7,18)">
        <a href="/class_detail-11165.html">开学季省钱有招，最强攻略来袭>></a>
      </div>
      <!--正式-->
      <div class = "partys" v-if="Date.now() >= new Date(2017,7,18) && Date.now() < new Date(2017,7,24)">
        <a href="/t-13685.html">开学季满359返60元无门槛红包，全场返现翻倍>></a>
      </div>

      <div class = "clearfix introPrice">
        <div style = "display: none">{{ membercont }}</div>
        <div>
          <span class = "memPrice"><span class = "font14">¥ </span>{{ memPrice }}</span><span class="originPrice">¥{{ infoobj.marketPrice }}</span> 
          
          <div class = "commission comissionInline" v-if = "visitorstatus == 3 && isLimitBuy">
            <div class = "memBack comissionInline"><span v-if="infoobj.taxPrice != 0" class = "member_iconCont"><span class = "question_ico question_icon_m" @click = "showTags('middle')"></span></span><span v-if = "infoobj.memberGoods == '0'">会员返：¥ {{ infoobj.sellerIncome }}</span><span class = "memColor" v-else>分享奖励：¥ {{ infoobj.normalIncome }}</span><span class = "sellerTiems" v-if = "infoobj.activityRatio != 0"><span style = "display:inline-block; margin:0 3px;">*</span>{{ infoobj.activityRatio }}倍</span><span class = "member_iconCont" @click = "showMember('middle')"><span v-if = "infoobj.memberGoods == '0'" class = "question_ico"></span><span v-if = "infoobj.labelTag && infoobj.labelTag.length"><span v-for = "item of infoobj.labelTag" class = "labelList"><span class = "tags">{{ item.goodsLabel }}</span></span></span></span></div>
          </div>
        </div>
      </div>
      <div class = "commission" v-if = "visitorstatus == 3 && !isLimitBuy">
        <div class = "memBack"><span v-if = "infoobj.memberGoods == '0'">会员返：¥ {{ infoobj.sellerIncome }}</span><span class = "memColor" v-else>分享奖励：¥ {{ infoobj.normalIncome }}</span><span class = "sellerTiems" v-if = "infoobj.activityRatio != 0"><span style = "display:inline-block; margin:0 3px;">*</span>{{ infoobj.activityRatio }}倍</span><span v-if = "infoobj.memberGoods == '0'" class = "member_iconCont"><span class = "question_ico question_icon_m question_icon_m5" @click = " showMember('middle')"></span></span></div>
      </div>
      
      <!--预告开始-->
      <div class = "limitBuy" v-if = "visitorstatus == '3' && infoobj.isComingActivity">
        <span class = "limitBuy_icon"></span>
        <span class = "limitBuy_tips">{{ infoobj.comingBegTime }}正式开抢，会员返<span class = "rColor"> ¥ {{ infoobj.comingActIncome }}</span></span>
      </div>
      <!-- 限时购预告 -->
      <div class = "limitBuy" v-if = "visitorstatus == '3' && !isOver && isshowactive == '1' && singleactivity && singleactivity.typeId == 8">
        <span class = "limitBuy_icon"></span>
        <span class = "limitBuy_tips">{{ infoobj.comingBegTime }}还剩 <span v-if = "Number(remainTime.day) != 0">{{ remainTime.day }}天</span>{{ remainTime.hour }}:{{ remainTime.minute }}:{{ remainTime.second }} 会员返恢复为<span class = "rColor"> ¥ {{ infoobj.normalIncome }}</span></span>
      </div>

      <div class = "salesCount clearfix">
        <span class = "goodsStock"><span v-if = "seckill">秒杀库存</span><span v-else><span v-if = "infoobj.isActivity">活动剩余库存</span><span v-else>库存</span></span> {{ goodsstocknumber }}</span>
        <span class = "already_sale">已售 {{ infoobj.salesNumber }}</span>
      </div>
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
