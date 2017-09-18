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
    </div>
    <img class="table_brand" src="//pic.davdian.com/free/20170915_assistance/table_brand.png">
    <!--获奖好友轮播-->
    <div class="loop_my_friend_reward">

    </div>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import ua from '../../../common/js/module/ua.js';
  import native from '../../../common/js/module/native.js';

  export default {
    props: {},
    data() {
      return {
        moke: 'http://www.easy-mock.com/mock/59b92127e0dc663341a8cccd',
        response: null,
        shareInfo: null,
        ask_assists: true, //呼唤朋友助攻
        assists_friend: false //助朋友0元购
      }
    },
    components: {},
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
          url: this.moke + '/api/mg/sale/userHelpBuy/getHelpGoodsDetail?_=' + Date.now(),
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
      background: tan;
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
        font-size: 14px;
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
  }

  .loop_my_friend_reward {
    width: 3.55rem;
    height: 0.6rem;
    margin: 0 auto;
    position: relative;
    background-color: #FF7B9B;
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
      background-color: tan;
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
    line-height: 0.16rem;
    color: #FFFFFF;
    overflow: hidden;
    font-style: normal;
    .fl {
      font-size: 0.14rem;
    }
    .membership_crown_pre {
      font-size: 0.11rem;
      text-decoration: line-through;
      em {
        font-style: normal;
      }
    }
  }
</style>
