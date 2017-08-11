<template>
  <div :style="[{ marginTop:data.marginTop + 'px'},styleObject]">
    <tt_com_0 :data="data"></tt_com_0>
    <a :href="item.command.content" v-for="item in data.body.dataList">
      <div class="hot_goods_index_md">
        <div class="goods_desc">
          <div class="img_left">
            <img :src="item.imageUrl" alt="">
            <img v-if="item.topImageUrl" class="topImageUrl" :src="item.topImageUrl" alt="">
          </div>
          <div class="goods_info_box">
            <div _v-5ed5d0b8="" class="order_good_name">{{item.title}}</div>
            <div class="goods_praice">
              <span><em class="price_symbol">￥</em><span>{{item.nowPrice}}</span></span>
            </div>
            <div class="comment_star">
              <span>好评度：{{item.rating*100 || 0}}% </span>
              <img v-for="item in parseInt((item.rating*100)/20)"
                   src="//pic.davdian.com/free/2017/07/24/%20starSelected.png" alt="">
            </div>
          </div>
        </div>
        <div v-if="item.comments.content" class="goods_comment">
          <div class="box_arrow"></div>
          <div class="user_img">
            <img :src="item.comments.avatar" alt="">
          </div>
          <div class="comment_txt">
            <span class="user_name">{{item.comments.nickName}}：</span>
            <span>{{item.comments.content}}</span>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<style scoped>
  .hot_goods_index_md {
    min-height: 130px;
    position: relative;
    padding: 15px 10px;
    /*background-color: #FFFFFF;*/
  }

  .hot_goods_index_md .goods_desc {
    position: relative;
  }

  .goods_desc .img_left {
    width: 120px;
    position: relative;
  }

  .goods_desc .goods_info_box {
    position: absolute;
    padding-left: 130px;
    top: 0;
    padding-top: 5px;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .order_good_name {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 20px;
    height: 40px;
    color: #666666;
  }

  .goods_info_box .goods_praice {
    height: 20px;
    line-height: 20px;
    color: #FF4A7D;
    margin-top: 15px;
    font-size: 20px;
  }

  .goods_info_box .goods_praice .price_symbol {
    font-size: 14px;
  }

  .comment_star {
    height: 12px;
    font-size: 12px;
    color: #FF4A7D;
    line-height: 12px;
    margin-top: 20px;
  }

  .comment_star img {
    height: 11px;
    width: 11px;
    position: relative;
    bottom: 1px;
    left: 2px;
    margin-left: 2px;
  }

  .goods_comment {
    margin-top: 10px;
    background-color: #f9f9f9;
    position: relative;
    padding: 10px 20px 10px 48px;
  }

  .goods_comment:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 200%;
    height: 200%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    transform: scale(0.5) translateX(-50%) translateY(-50%);
  }

  .box_arrow {
    width: 10px;
    height: 5px;
    background: url("//pic.davdian.com/free/2017/07/24/commentBox_arrow.png");
    background-size: 100%;
    position: absolute;
    top: -4px;
    left: 22px;
    z-index: 10;
  }

  .user_img {
    height: 28px;
    width: 28px;
    position: absolute;
    left: 10px;
    top: 6px;
    overflow: hidden;
    border-radius: 50%;
  }

  .comment_txt {
    font-size: 12px;
    color: #151515;
    text-overflow: ellipsis;
    white-space: pre-line;
    max-height: 60px;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
  }

  .comment_txt .user_name {
    color: #999999;
  }
  .img_left .topImageUrl{
    position: absolute;
    width: 52px;
    top:2px;
    left:2px;
  }
</style>
<script>
  import layout from "../layout.es6"
  import * as tt_com_0 from './tt_com_0.vue'
  export default {
    data() {
      return {
        msg: 'hello vue',
        wrapline: 0
      }
    },
    props: ['data'],
    created: function () {

    },
    computed: {
      styleObject: function () {
        let scope = this;
        return layout.styleObject(scope.data);
      }
    },
    components:{
      tt_com_0:tt_com_0
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
