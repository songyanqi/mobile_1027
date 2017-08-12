<template>
  <div :style="styleObject">
    <a v-if="data.body.tplId == 'bd_goods_0'" href="javascript:void(0)" class="index_group_buy" style="margin-top: 0px;"
       :style="styleTop">
      <tt_com_0 :data="data"></tt_com_0>
      <div class="df_new_model_con" :style="styleObject">
        <div class="swiper-container related-item-list swiper-container-horizontal swiper-container-free-mode">
          <div class="swiper-wrapper" style="transform: translate3d(10px, 0px, 0px); transition-duration: 0ms;">
            <div v-for="item in data.body.dataList" class="detail swiper-slide" style="width: 124.382px;">
              <a :href="item.command.content" @click="clickAnalysis" :position="item.position">
                <div class="goods_img_size">
                  <img :src="item.imageUrl">
                </div>
                <div class="name1" :class="{'he36':(wrapline == 1)}">{{ item.title }}</div>
                <div class="price1">
                  <span class="current-price1">¥{{item.nowPrice}}</span><span
                  class="original-price1">¥{{item.prePrice}}</span>
                </div>
              </a>

            </div>
          </div>
        </div>
      </div>
    </a>

    <div v-if="data.body.tplId == 'bd_goods_2'" class="df_new_model_con" :style="styleObject">
      <div class="swiper-container related-item-list swiper-container-horizontal swiper-container-free-mode">
        <div class="swiper-wrapper" style="transform: translate3d(10px, 0px, 0px); transition-duration: 0ms;">
          <div v-for="item in data.body.dataList" class="detail swiper-slide" style="width: 124.382px;">
            <a :href="item.command.content" @click.stop="clickAnalysis" :position="item.position">
              <div class="goods_img_size">
                <img :src="item.imageUrl">
              </div>
              <!-- <div class="name" :class="{'he36':(wrapline == 1)}">{{ item.title </div> -->
              <div class="name1">{{ item.title }}</div>
              <div class="price1">
                <span class="current-price1">¥{{ item.nowPrice }}</span>
                <span class="original-price1">¥{{ item.prePrice }}</span>
              </div>
            </a>
          </div>


          <div class="detail swiper-slide" style="width: 124.382px;">
            <a :href="data.body.command.content" @click.stop="clickAnalysis" position="more">
              <div class="goods_img_size">
                <img src="//pic.davdian.com/free/2016/12/20/300_300_2f12c4229c5444864431d2cd8cd1bdb3.jpg">
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>

    <div v-if="data.body.tplId == 'bd_ts_goods_0'" class="df_new_model_con" :style="styleObject">
      <div
        class="swiper-container related-item-list2 swiper-container-horizontal swiper-container-free-mode">
        <div class="swiper-wrapper" style="transform: translate3d(10px, 0px, 0px); transition-duration: 0ms;">
          <div v-for="item in data.body.dataList" class="detail swiper-slide" style="width: 124.382px;">
            <a :href="item.command.content" @click.stop="clickAnalysis" :position="item.position">
              <div class="goods_img_size">
                <img :src="item.imageUrl">
                <div v-if="item.limitTag" class="limitTag">{{item.limitTag}}</div>
              </div>
              <div class="name1">{{ item.title }}</div>
              <div class="price1">
                <span class="current-price1"><em>¥</em><span>{{(item.nowPrice+"").split(".")[0]}}</span><span class="fz_14" v-if="(item.nowPrice+'').split('.').length == 2">.{{(item.nowPrice+"").split(".")[1]}}</span></span>
              </div>
              <div class="membership_crown">会员返 <em _v-e9830e04="">￥</em>{{item.timeshopIncome}}</div>
            </a>
          </div>
          <div class="detail swiper-slide" style="width: 124.382px;">
            <a :href="data.body.command.content" @click.stop="clickAnalysis" position="more">
              <div class="goods_img_size">
                <img src="//pic.davdian.com/free/2016/12/20/300_300_2f12c4229c5444864431d2cd8cd1bdb3.jpg">
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  import './bd_goods_0.scss'
  import bd_goods_0 from './bd_goods_0.es6'
  export default bd_goods_0
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_goods_0.scss";
</style>
