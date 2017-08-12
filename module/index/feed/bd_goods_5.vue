<template>
  <div :style="[{ marginTop:data.marginTop + 'px'},styleObject]">
    <tt_com_0 :data="data"></tt_com_0>
    <div>
        <div class="swiper-container related-item-list-new swiper-container-horizontal swiper-container-free-mode">
          <div class="swiper-wrapper">
            <div v-for="item in data.body.dataList" class="detail swiper-slide" style="width: 124.382px;">
              <a :href="item.command.content" @click="clickAnalysis" :position="item.position">
                <div class="goods_img_size">
                  <img :src="item.imageUrl">
                  <div v-if="item.promotionLabel" class="limitTag">{{item.promotionLabel}}</div>
                </div>
                <div class="new_name1">{{ item.title }}</div>
                <div class="price1">
                  <span class="current-price1"><span style="font-size: 12px;">¥ </span>{{item.nowPrice}}</span>
                </div>
              </a>
            </div>
            <div v-if="data.body.more" class="detail swiper-slide" style="width: 124.382px;">
              <a :href="data.body.command.content" position="more">
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
  import layout from "../layout.es6";
  import * as tt_com_0 from './tt_com_0.vue'
  export default {
    data(){
      return {
        msg: 'hello vue',
        wrapline: 0
      }
    },
    props: ['data'],
    created: function () {
      /**
       * 数据排序
       */
      layout.sort(this.data);

      // 商品图片左右滚动
      this.$nextTick(function () {
        var pmwidth = document.documentElement.dataset.width;
        var goodnum = pmwidth / 145;
        new Swiper('.related-item-list-new', {
          slidesOffsetBefore: 10,
          slidesPerView: goodnum,
          paginationClickable: true,
          freeMode: true,
          lazyLoading: true
        });

        var text = this.data.body.dataList;
        var num = 0;
        for (var i = 0; i < text.length; i++) {
          if (text[i].title.length > 8) {
            num++;
          }
        }
        if (num > 0) {
          this.wrapline = 1;
        } else {
          this.wrapline = 0;
        }
      })
    },
    components:{
      tt_com_0:tt_com_0
    },
    computed: {
      styleObject: function () {
        let scope = this;
        return layout.styleObject(scope.data);
      },
      wrapline: function () {
        let text = this.data.body.dataList;
        let num = 0;
        for (let i = 0; i < text.length; i++) {
          if (text[i].title.length > 8) {
            num++;
          }
        }
        if (num > 0) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    methods: {
      imgObject: function (imgSrc) {
        return {
          src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
          error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
          loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
        }
      },
      clickAnalysis: function (item) {
        layout.clickAnalysis(item, this, 'body');
      }
    }
  }

</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .index_group_buy{
    margin-top: 10px;
    display: block;

  .detail{
    width: 100%;
    display: block;
    position: relative;
  }

  .df_new_model_con{

  }
  }

  .related-item-list-new.swiper-container{
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .related-item-list-new{

  .detail.swiper-slide{
    background: transparent;
    line-height: inherit;
  }

  .detail{
    text-align: left;
  .goods_img_size{
    width: 120px;
    height: 120px;
    position: relative;
  .limitTag{
    height: 16px;
    background: url(//pic.davdian.com/free/2017/06/07/limitTag.png) 0 0 no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 1px;
    bottom: 0;
    font-size: 10px;
    color: #FFF;
    text-align: center;
    line-height: 16px;
    display: inline-block;
    padding: 0 11px 0 6px;
  }
  }

  .goods_img_size:before{
    content: '';
    position: absolute;
    top:0;
    left: 0;
    border: 1px solid #ddd;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .new_name1{
    font-size: 13px;
    margin: 10px 0;
    text-overflow: ellipsis;
    height: 18px;
    white-space: nowrap;
    line-height: 18px;
    overflow: hidden;
    color: #666;
    padding-right: 25px;
  }
  .price1 {
    line-height: 21px;
    height: 21px;
    overflow: hidden;
    margin-bottom: 4px;
  .current-price1{
  // font-size: 0.17rem;
    font-size: 17px;
    color: #FF4A7D;
    float: left;
  }

  .original-price1{
    font-size: 9px;
    color: #999;
    text-decoration: line-through;
    float: left;
    padding-left: 5px;
    padding-top: 0.02rem;
  }
  }
  }

  }

  /*Retina屏为2的时候调用下面的样式*/
  @media
  only screen and (-webkit-min-device-pixel-ratio:2),
  only screen and (min-device-pixel-ratio:2),
  only screen and (min--moz-device-pixel-ratio:2),
  only screen and (-o-min-device-pixel-ratio:4/2),
  only screen and (min-resolution:2dppx)
  {
    .related-item-list-new .detail .goods_img_size:before{
      width: 200%;
      height: 200%;
      transform: scale(0.5);
      transform-origin: left top;

      -ms-transform: scale(0.5); 		/* IE 9 */
      -ms-transform-origin: left top; 		/* IE 9 */

      -webkit-transform: scale(0.5);	/* Safari 和 Chrome */
      -webkit-transform-origin: left top;	/* Safari 和 Chrome */

      -moz-transform: scale(0.5);		/* Firefox */
      -moz-transform-origin: left top;		/* Firefox */

      -o-transform: scale(0.5);		/* Opera */
      -o-transform-origin: left top;		/* Opera */
      border-radius: 8px;
    }
  }

  .df_new_title{
    position: relative;
    height: 44px;
  }
  .df_new_title:after{
    content: "";
    border-left: 8px solid #FF4A7D;
    border-bottom:8px solid transparent;
    border-top:8px solid transparent;
    display: inline-block;
    width: 0;
    height: 0;
    left: 3px;
    top:0;
    position: absolute;
  }
  .df_new_title:before{
    content: "";
    border-left: 28px solid #f0f0f0;
    border-bottom:28px solid transparent;
    display: inline-block;
    width: 0;
    height: 0;
    left:0;
    top:0;
    position: absolute;
  }
  .df_new_title_font{
    font-size: 16px;
    margin-left: 20px;
    line-height: 44px;
  }
  .df_new_title_font:before{
    content: "";
    position: absolute;
    background-color: #F2F0EC;
    width: 6px;
    top:0;
    right: 74px;
    height: 110%;
    -webkit-transform: skew(-45deg);
    transform: skew(-45deg);
  }
  .df_new_title_font:after{
    content: "";
    position: absolute;
    background-color: #F2F0EC;
    width: 3px;
    bottom: -30px;
    right: 24px;
    height: 110%;
    -webkit-transform: skew(-45deg);
    transform: skew(-45deg);
  }
  .df_new_title .more {
    position: absolute;
    right: 1px;
    top: 0;
    display: block;
    line-height: 16px;
    width: 50px;
    padding-top: 14px;
    height: 100%;
    box-sizing: border-box;
    overflow: inherit;
  }
  .df_new_title .more span {
    font-size: 12px;
  }
</style>
