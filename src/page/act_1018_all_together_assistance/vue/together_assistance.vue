<template>
  <div class="assistance_box" v-if="response">
    <!--呼朋唤友省更多-->
    <div v-if="ask_assists" class="title_img">
      <img style="width:1.8rem;" src="//pic.davdian.com/free/20170915_assistance/huhaoyou2.png">
      <div class="dtime">距离结束：7天18时38分39秒</div>
      <div class="qiqiu_ing">
        <img src="//pic.davdian.com/free/20170915_assistance/qiqiu.png">
        <img src="//pic.davdian.com/free/20170915_assistance/bangbangtang.png">
      </div>
    </div>
    <!--助好友0元购-->
    <div v-if="assists_friend" class="title_img">
      <img style="width: 2.57rem;" src="//pic.davdian.com/free/20170915_assistance/zhuhaoyou.png">
      <div class="dtime">距离结束：7天18时38分39秒</div>
      <div class="friend_mark">
        <div></div>
        <div>
          13788927683 <br>
          正在呼朋唤友助力中…
        </div>
      </div>
      <div class="qiqiu_ing">
        <img class="qiqiua" src="//pic.davdian.com/free/20170915_assistance/qiqiu.png">
      </div>
    </div>

    <!--商品信息-->
    <div class="goods_info">
      <div class="goods_info_img">
        <img src="//pic.davdian.com/free/20170915_assistance/qiqiu.png" alt="">
      </div>
      <div class="goods_info_desc">
        <div class="goods_info_title">
          棕色的熊、棕色的熊，你在看什么？（纸板书，适合0-3岁）
        </div>
        <div class="order_good_price"><span class="f_l">10.18活动价<em class="price_symbol">￥</em><span>109</span></span>
          <span class="membership_crown_pre"><em>￥</em>199</span></div>
      </div>
    </div>
    <!--板-->
    <div class="rule_brand">
      <img src="//pic.davdian.com/free/20170915_assistance/rule.png">
      <img src="//pic.davdian.com/free/20170915_assistance/bear.png">
      <!--获得0元购机会-->
      <span v-if="isfree">
          <div class="ast_deep">恭喜你获得10.18当天0元抢购的机会</div>
          <div class="ast_bigtxt">得到好友的xx元助力，战胜了80%的人</div>
          <div class="ast_txt" style="padding: 0.15rem 0 0.1rem;">10月18日开抢 数量有限 先到先得!</div>
      </span>
      <!--没有获得0元购机会-->
      <span v-else>
        <!--没有好友助力呢-->
        <span v-if="!alreadyAst">
          <div class="no_ast ast_txt" style="padding: 0.48rem 0 0.34rem;">还没有好友帮你助力，快去召集好友助力省钱吧！</div>
          <div v-if="isApp" class="share_btn bd_r">喊人助力</div>
          <div v-if="isWx" class="share_btn bd_r">点击右上角“···”按钮分享</div>
          <div v-if="!isWx && !isApp" class="share_btn bd_r" @click="gowxorapp">喊人助力</div>
        </span>
          <!--已经得到好友的助力-->
        <span v-else>
          <div class="ast_bigtxt">得到好友的xx元助力，战胜了80%的人</div>
          <div class="ast_txt" style="padding: 0.15rem 0 0.1rem;">10.18当天购买只需yy元，继续召集好友助力得0元抢购，加油吧！</div>
          <div v-if="isApp" class="share_btn bd_r">喊人助力</div>
          <div v-if="isWx" class="share_btn bd_r">点击右上角“···”按钮分享</div>
          <div v-if="!isWx && !isApp" class="share_btn bd_r" @click="gowxorapp">喊人助力</div>
        </span>
      </span>
    </div>
    <img class="table_brand" src="//pic.davdian.com/free/20170915_assistance/table_brand.png">

    <div class="share_btn bd_p">我也想要商品0元购</div>
    <!--获奖好友轮播-->
    <div class="loop_my_friend_reward">
      <swiper auto height="60px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
        <swiper-item>
          <div class="swiperItem">
            <div>
              <img src="//pic.davdian.com/free/20170915_assistance/qiqiu.png" alt="">
            </div>
            <div>
              棕色的熊、棕色的熊，你在看什么？（纸板书，适合0-3岁）
              棕色的熊、棕色的熊，你在看什么？（纸板书，适合0-3岁）
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import ua from '../../../common/js/module/ua.js';
  import native from '../../../common/js/module/native.js';
  import {Swiper, SwiperItem} from 'vux'

  export default {
    props: {},
    data() {
      return {
        moke: 'http://www.easy-mock.com/mock/59b92127e0dc663341a8cccd',
        response: null,
        shareInfo: null,
        ask_assists: true, //呼唤朋友助攻
        assists_friend: false, //助朋友0元购
        isWx: ua.isWeiXin(),
        isApp: ua.isDvdApp(),
        alreadyAst: false, //好友已经助力
        isfree:false, //获得0元购机会
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    computed: {},
    watch: {
      // 监听response变化
      response() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;
          // 设置分享信息
          if (ts.shareInfo) {
            try {
              native.custom.setShareInfo({
                "title": ts.shareInfo.title,
                "desc": ts.shareInfo.desc,
                "imgUrl": ts.shareInfo.imgUrl,
                "link": ts.shareInfo.link,
                "shareDesc": ts.shareInfo.desc
              });
            } catch (err) {
              console.error(err);
            }
          }
        });
      }
    },
    created() {
      this.getData();
    },
    mounted() {

    },
    methods: {
      /**
       * 接口名称:
       * 接口文档:
       */
      getData() {
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: this.moke + '/api/mg/sale/userhelpbuy/getHelpGoodsDetail?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: ts.goodsId}),
          success(response) {
            ts.response = response;
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      gowxorapp: function () {
        popup.toast("请去微信或者APP分享");
      }

    },
    filters: {
      /***
       * 格式化时间
       * */
      formatRemainTime(second) {
        let format = '';
        let oneMinute = 60,
          oneHour = 60 * 60,
          oneDay = 60 * 60 * 24;
        if (second >= oneDay) {
          format = `剩余时间: ${parseInt(second / oneDay)}天${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second >= oneHour) {
          format = `剩余时间: ${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second >= oneMinute) {
          format = `剩余时间: ${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second > 0) {
          format = `剩余时间: ${second}秒`;
        } else if (second <= 0) {
          format = '已开始';
        }
        return format;
      }
    },
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .assistance_box {
    background: -webkit-linear-gradient(top, #F54B74, #FF9F8F);
    background: -webkit-gradient(linear, top top, bottom bottom, from(#F54B74), to(#FF9F8F));
    background: -webkit-linear-gradient(top, #F54B74, #FF9F8F);
    background: linear-gradient(to bottom, #F54B74, #FF9F8F);
    width: 100%;
    height: 1000px;
    overflow: hidden;
  }

  .title_img {
    margin-top: 0.3rem;
    text-align: center;
    overflow: hidden;
    img {
      display: inline-block;
    }
  }

  .dtime {
    width: 100%;
    display: block;
    text-align: center;
    font-size: 0.14rem;
    color: #FFFFFF;
    margin-top: 0.1rem;
  }

  .qiqiu_ing {
    height: 0.1rem;
    position: relative;
    img {
      bottom: -0.05rem;
      position: absolute;
    }
    img:nth-of-type(1) {
      width: 0.7rem;
      left: 0.1rem;
    }
    img:nth-of-type(2) {
      width: 0.78rem;
      right: 0.1rem;
    }
  }

  .title_img .qiqiu_ing .qiqiua {
    width: 0.78rem;
    right: 0.01rem;
    left: auto;
  }

  .goods_info {
    position: relative;
    margin: 0 0.1rem 0.1rem;
    padding: 0.1rem;
    height: 0.8rem;
    .goods_info_img {
      width: 0.8rem;
      height: 0.8rem;
      float: left;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .goods_info_desc {
      margin-left: 0.9rem;
      .goods_info_title {
        height: 0.4rem;
        line-height: 0.2rem;
        color: #FFFFFF;
        font-size: 0.14rem;
      }
    }
  }

  .goods_info:after {
    content: "";
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: #FFFFFF solid 0.01rem;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 0.08rem;
  }

  .rule_brand {
    background-color: #FFE677;
    width: 3.55rem;
    min-height: 1.76rem;
    border-radius: 0.04rem;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    img {
      position: absolute;
      z-index: 3;
    }
    img:nth-of-type(1) {
      width: 0.87rem;
      right: 0.1rem;
      top: -0.04rem;
    }
    img:nth-of-type(2) {
      width: 0.7rem;
      bottom: -0.3rem;
      left: -0.1rem;
    }
    .ast_txt {
      font-size: 0.14rem;
      color: #BA2424;
      line-height: 0.2rem;
      width: 2.64rem;
      text-align: center;
      margin: 0 auto;
    }
    .ast_bigtxt {
      font-size: 0.18rem;
      color: #BA2424;
      line-height: 0.25rem;
      height: 0.25rem;
      text-align: center;
      margin: 0.34rem auto 0;
    }
    .ast_deep{
      font-size: 0.18rem;
      color: #BA2424;
      line-height: 0.33rem;
      height: 0.33rem;
      text-align: center;
      margin: 0.39rem auto 0;
      font-weight: bold;
    }
  }

  .loop_my_friend_reward:after {
    content: "";
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: #FFE082 solid 0.01rem;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 0.08rem;
  }

  .table_brand {
    width: 100%;
    margin-top: -0.27rem;
  }

  .friend_mark {
    height: 0.4rem;
    margin-left: 0.1rem;
    margin-top: 0.2rem;
    div {
      float: left;
    }
    div:nth-of-type(1) {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      img {
        width: 100%;
      }
    }
    div:nth-of-type(2) {
      color: #FFFFFF;
      font-size: 0.14rem;
      line-height: 0.2rem;
      text-align: left;
      padding-left: 0.1rem;
    }
  }

  .order_good_price {
    height: 0.36rem;
    color: #FFFFFF;
    overflow: hidden;
    line-height: 0.5rem;
    .f_l {
      font-size: 0.14rem;
      em {
        font-style: normal;
      }
      span {
        font-size: 0.25rem;
      }
    }
    .membership_crown_pre {
      font-size: 0.11rem;
      text-decoration: line-through;
      margin-left: 0.04rem;
      em {
        font-style: normal;
      }
    }
  }

  .share_btn {
    width: 2.4rem;
    height: 0.32rem;
    border: 0.04rem solid #FFFFFF;
    border-radius: 0.32rem;
    text-align: center;
    line-height: 0.32rem;
    font-size: 0.14rem;
    color: #FFFFFF;
    margin: 0 auto;
  }

  .bd_r {
    background: -webkit-linear-gradient(left, #FF9636, #FA1862);
    background: -webkit-gradient(linear, left left, right right, from(#FF9636), to(#FA1862));
    background: -webkit-linear-gradient(left, #FF9636, #FA1862);
    background: linear-gradient(to right, #FF9636, #FA1862);
  }

  .bd_p {
    background: -webkit-linear-gradient(left, #E47CFF, #B26DE8);
    background: -webkit-gradient(linear, left left, right right, from(#E47CFF), to(#B26DE8));
    background: -webkit-linear-gradient(left, #E47CFF, #B26DE8);
    background: linear-gradient(to right, #E47CFF, #B26DE8);
  }

  .loop_my_friend_reward {
    width: 3.55rem;
    height: 60px;
    margin: 0 auto;
    position: relative;
    background-color: #FF7B9B;
  }

  .swiperItem {
    height: 60px;
    position: relative;
    div {
      height: 60px;
      float: left;
    }
    div:nth-of-type(1) {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      float: left;
      margin: 10px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    div:nth-of-type(2) {
      position: absolute;
      height: 40px;
      left: 60px;
      top: 10px;
      right: 10px;
      line-height: 20px;
      font-size: 14px;
      color: #FFFFFF;
      @include ellipsis(2);
    }
  }
</style>
