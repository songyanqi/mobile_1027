<template>
  <div class="assistance_box" v-if="response && goodsdata">
    <!--呼朋唤友省更多-->
    <div v-if="response.type == '0'" class="title_img">
      <img style="width:1.8rem;" src="//pic.davdian.com/free/20170915_assistance/huhaoyou2.png">
      <div class="dtime">{{goodsdata.goods.overTime | formatRemainTime}}</div>
      <div class="qiqiu_ing">
        <img src="//pic.davdian.com/free/20170915_assistance/qiqiu.png">
        <img src="//pic.davdian.com/free/20170915_assistance/bangbangtang.png">
      </div>
    </div>
    <!--助好友0元购-->
    <div v-if="response.type == '1'" class="title_img">
      <img style="width: 2.57rem;" src="//pic.davdian.com/free/20170915_assistance/zhuhaoyou.png">
      <div class="dtime">距助力结束：{{goodsdata.goods.overTime | formatRemainTime}}</div>
      <div class="friend_mark">
        <div>
          <img :src="response.supporter.imageUrl" alt="">
        </div>
        <div>
          {{response.supporter.nickName}} <br>
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
        <img :src="goodsdata.goods.goodsImage" alt="">
      </div>
      <div class="goods_info_desc">
        <div class="goods_info_title">
          {{goodsdata.goods.goodsName}}
        </div>
        <div class="order_good_price"><span class="f_l">10.18活动价<em
          class="price_symbol">￥</em><span>{{goodsdata.goods.activityPrice}}</span></span>
          <span class="membership_crown_pre"><em>￥</em>{{goodsdata.goods.goodsPrice}}</span></div>
      </div>
    </div>
    <!--板-->
    <div class="rule_brand">
      <img src="//pic.davdian.com/free/20170915_assistance/rule.png">
      <img src="//pic.davdian.com/free/20170915_assistance/bear.png">
      <!--助力者页面按钮信息-->
      <span v-if="response.type == '1'">
        <!--展示抽奖-->
        <span v-if="!addsupporterPrice">
          <div class="ast_bigtxt">本次助力帮TA省了<span style="font-size:0.24rem">{{addsupporterPrice}}</span>元</div>
          <div class="ast_bigtxt"
               style="padding-top:0.1rem;">TA共得到好友{{+response.source.supporterPrice + addsupporterPrice}}元助力，战胜了{{response.source.rate}}%的人</div>
          <div class="ast_txt" style="padding-top:0.1rem;">别忘啦，明天还可以帮好友助力哦</div>
          <div class="awd_touch">
            <div :class="['awd_pre','awd_no','awd_yes'][awd_type]">
              <div v-if="awd_type == 0" class="awd_title"></div>
              <div v-if="awd_type == 0" class="awd_tip"></div>
              <div v-if="awd_type == 1" class="awd_title">很遗憾 未中奖</div>
              <div v-if="awd_type == 1" class="awd_tip">明天助力再赢iPhone8吧</div>
               <div v-if="awd_type == 2" class="awd_title">恭喜你被iPhone8砸中了</div>
              <div v-if="awd_type == 2" class="awd_tip">您的大V账户会收到红包凭证，请等待工作人员联系您</div>
              <com-scratch-card></com-scratch-card>
            </div>
          </div>
        </span>
        <span v-else>
          <!--没有好友助力呢-->
          <span v-if="response.source.isSupporter == '0'">
           <div class="ast_bigtxt">轻轻一点为TA赢得商品0元购</div>
            <div class="share_btn bd_r" @click="assistance">给TA助力  我赢iPhone8</div>
          </span>
          <!--已经得到好友的助力-->
          <span v-else>
           <!--获得0元购机会-->
            <span v-if="response.source.surplusPrice == '0'">
              <div class="ast_bigtxt">TA已得到好友<span style="font-size:0.24rem">{{response.source.supporterPrice}}</span>元助力，<br>战胜{{response.source.rate}}%的人</div>
              <div class="ast_txt" style="padding-top:0.1rem;">获得10.18当天0元抢购的机会</div>
            </span>
            <span v-else>
              <div class="ast_bigtxt" style="padding-top:0.34rem;">TA已得到好友<span
                style="font-size: 0.24rem;">{{response.supporter.supporterPrice}}</span>元助力，战胜了{{response.supporter.rate}}%的人</div>
              <div class="ast_txt" style="padding: 0.1rem 0 0.04rem;">帮TA再接再厉赢得商品0元购 ！</div>
              <div class="share_btn bd_r" @click="assistance">给TA助力  我赢iPhone8</div>
              <div class="ast_txt" style="font-size: 0.1rem;line-height: 0.14rem;padding-top: 0.06rem;">助力后即刻抽奖</div>
            </span>
        </span>
        </span>
      </span>
      <!--发起者页面信息-->
      <span v-if="response.type == '0'">
        <!--获得0元购机会-->
        <span v-if="response.source.surplusPrice == '0'">
            <div class="ast_deep">恭喜你获得10.18当天0元抢购的机会</div>
            <div class="ast_bigtxt">得到好友的{{response.source.supporterPrice}}元助力，战胜了{{response.source.rate}}%的人</div>
            <div class="ast_txt" style="padding: 0.15rem 0 0.1rem;">10月18日开抢 数量有限 先到先得!</div>
        </span>
        <!--没有获得0元购机会-->
        <span v-else>
        <!--没有好友助力呢-->
        <span v-if="response.source.isSupporter == '0'">
          <div class="no_ast ast_txt" style="padding: 0.48rem 0 0.34rem;">还没有好友帮你助力，快去召集好友助力省钱吧！</div>
          <div v-if="isApp" class="share_btn bd_r" @click="shares">喊人助力</div>
          <div v-if="isWx" class="share_btn bd_r">点击右上角“···”按钮分享</div>
          <div v-if="!isWx && !isApp" class="share_btn bd_r" @click="gowxorapp">喊人助力</div>
        </span>
          <!--已经得到好友的助力-->
        <span v-else>
          <div class="ast_bigtxt"
               style="padding-top:0.34rem;">得到好友的{{response.source.supporterPrice}}元助力，战胜了{{response.source.rate}}%的人</div>
          <div class="ast_txt" style="padding: 0.15rem 0 0.1rem;">10.18当天购买只需{{response.source.surplusPrice}}元，继续召集好友助力得0元抢购，加油吧！</div>
          <div v-if="isApp" class="share_btn bd_r">喊人助力</div>
          <div v-if="isWx" class="share_btn bd_r">点击右上角“···”按钮分享</div>
          <div v-if="!isWx && !isApp" class="share_btn bd_r" @click="gowxorapp">喊人助力</div>
        </span>
      </span>
      </span>
    </div>

    <img class="table_brand" src="//pic.davdian.com/free/20170915_assistance/table_brand.png">
    <a :href="'/ast_'+goodsdata.goods.goodsId+'.html'" v-if="response.type == '1'"
       style="margin-bottom: 0.2rem;display: block" class="share_btn bd_p">我也想要商品0元购</a>
    <!--获奖好友轮播-->
    <div class="loop_my_friend_reward" v-if="goodsdata.notice.length">
      <swiper auto height="60px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
        <swiper-item v-for="notice in goodsdata.notice">
          <div class="swiperItem">
            <div>
              <img :src="notice.imageUrl" alt="">
            </div>
            <div>
              {{notice.message}}
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <!--共得到几位好友支持-->
    <div class="friend_list" v-if="goodsdata.friendsNum">
      <div class="friend_list_title">共得到{{goodsdata.friendsNum}}位好友支持：</div>
      <div class="friend_desc">
        <div class="swiperItem" v-for="friend in goodsdata.friends">
          <div>
            <img :src="friend.imageUrl" alt="">
          </div>
          <div>
            <span><span>{{friend.nickName}}</span><span>助力时间：{{friend.dateTime | formatDate}}</span></span>
            <span>帮Ta省下{{friend.price}}元，{{friend.title}}</span>
          </div>
        </div>
      </div>
    </div>

    <!--去主会场-->
    <a href="/act_1018_main.html" class="main_btn">10.18周年庆主会场</a>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import ua from '../../../common/js/module/ua.js';
  import share from '../../../common/js/module/share.js';
  import {Swiper, SwiperItem} from 'vux'
  import login from '../../../common/js/module/login.js';

  login.needLogin();
  export default {
    props: {},
    data() {
      return {
        moke: '',
        response: null,
        shareInfo: null,
        isWx: ua.isWeiXin(),
        isApp: ua.isDvdApp(),
        goodsId: ua.getQuery("goodsId"),
        shareUserId: ua.getQuery("shareUserId"),
        goodsdata: null,
        visitor_status: null,
        addsupporterPrice: null,
        awd_type:2
      }
    },
    components: {
      Swiper,
      SwiperItem,
      'com-scratch-card':require('../../../component/com-scratch-card.vue')
    },
    computed: {},
    watch: {
      // 监听response变化
      response() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;
          // 设置分享信息
          try {
            share.setShareInfo({
              "title": "大V店10.18周年庆 猛点一下帮我0元抢爆品，你抽iPhone8！",
              "desc": '好友助力随机减钱，助力越多越省钱',
              "imgUrl": "//pic.davdian.com/free/20170915_assistance/assistance.png",
              "link": location.href
            });
          } catch (err) {
            console.error(err);
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
       * 接口名称:用户助力数据项
       * 接口文档:
       */
      getData() {
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: this.moke + '/api/mg/sale/userhelpbuy/getUserHelpInfo?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: ts.goodsId, shareUserId: ts.shareUserId}),
          success(response) {
            ts.response = response.data;
            ts.visitor_status = response.visitor_status;
            /*助力发起和助力者title变化*/
            if (response.data.type == '0') {
              ts.$emit("doctitle", "召集好友助力，最低0元购买商品");
            } else {
              ts.$emit("doctitle", response.data.source.nickName + "正在发起助力");
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
        $.ajax({
          cache: false,
          async: true,
          url: this.moke + '/api/mg/sale/userhelpbuy/getUserHelpActivity?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: ts.goodsId, shareUserId: ts.shareUserId}),
          success(response) {
            ts.goodsdata = response.data;
            ts.deltime();
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      gowxorapp: function () {
        popup.toast("复制地址栏链接在微信中打开或直接打开大V店APP发起助力");
      },
      deltime: function () {
        var ts = this;
        setInterval(function () {
          ts.goodsdata.goods.overTime--;
        }, 1000)
      },
      /***
       * 分享
       * */
      shares: function () {
        var that = this;
        share.setShareInfo({
          "title": "大V店10.18周年庆 猛点一下帮我0元抢爆品，你抽iPhone8！",
          "desc": '好友助力随机减钱，助力越多越省钱',
          "imgUrl": "//pic.davdian.com/free/20170915_assistance/assistance.png",
          "link": location.href,
          success: function () {
            that.sharecallback();
          }
        })
      },
      /***
       * 给他助力
       * */
      assistance: function () {
        var that = this;
        if (that.visitor_status != 3) {
          popup.toast("您还没有成为会员不能参与该活动哦，成为会员即可参与～");
          return;
        }
        $.ajax({
          cache: false,
          async: true,
          url: that.moke + '/api/mg/sale/userhelpbuy/addHelpPrice?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: that.goodsId, shareUserId: that.shareUserId}),
          success(response) {
            if (response.data.code == '200') {
              popup.toast("助力成功");
            } else if (response.data.code == '100') {
              popup.toast("每天只能助力一次哦");
            }
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
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
          format = `${parseInt(second / oneDay)}天${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second >= oneHour) {
          format = `${parseInt(second % oneDay / oneHour)}小时${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second >= oneMinute) {
          format = `${parseInt(second % oneDay % oneHour / oneMinute)}分${parseInt(second % oneDay % oneHour % oneMinute)}秒`
        } else if (second > 0) {
          format = `${second}秒`;
        } else if (second <= 0) {
          format = '已开始';
        }
        return format;
      },
      formatDate(now) {
        now = new Date(now / 1000);
        let year = now.getYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
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
    overflow-y: scroll;
    position: fixed;
    top: 44px;
    bottom: 0;
    max-width: 640px;
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
    z-index: 1;
    >img {
      position: absolute;
      z-index: 3;
    }
    >img:nth-of-type(1) {
      width: 0.87rem;
      right: 0.1rem;
      top: -0.04rem;
    }
    >img:nth-of-type(2) {
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
      min-height: 0.25rem;
      text-align: center;
      margin: 0 auto;
      padding: 0.34rem 0 0;
    }
    .ast_deep {
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
      overflow: hidden;
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
    margin: 0.03rem auto 0.1rem;
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

  .friend_list {
    margin: 0 0.1rem;
    position: relative;
    .friend_list_title {
      font-size: 0.14rem;
      height: 0.2rem;
      text-align: left;
      line-height: 0.2rem;
      color: #FFFFFF;
    }
    .friend_desc {
      .swiperItem {
        height: 0.5rem;
        position: relative;
        div {
          height: 0.5rem;
          float: left;
        }
        div:nth-of-type(1) {
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 100%;
          float: left;
          margin: 0.1rem;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        div:nth-of-type(2) {
          position: absolute;
          height: 0.3rem;
          left: 0.5rem;
          top: 0.1rem;
          right: 0.1rem;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #FFFFFF;
          span {
            display: block;
          }
          span:nth-of-type(1) {
            font-size: 0.1rem;
            height: 0.14rem;
            line-height: 0.14rem;
            span:nth-of-type(1) {
              display: inline-block;
              float: left;
            }
            span:nth-of-type(2) {
              display: inline-block;
              float: right;
              font-size: 0.1rem;
            }
          }
          span:nth-of-type(2) {
            height: 0.17rem;
            font-size: 0.12rem;
          }
        }
      }
      .swiperItem:after {
        content: "";
        display: block;
        position: absolute;
        left: -50%;
        width: 200%;
        height: 1px;
        background: #FFFFFF;
        transform: scale(0.5);
        bottom: 0;
        z-index: 1;
      }
    }
  }

  .main_btn {
    width: 3.55rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    color: #FFFFFF;
    font-size: 0.16rem;
    margin: 0.15rem auto 0.6rem;
    background: -webkit-linear-gradient(left, #FF5C5C, #FA1862);
    background: -webkit-gradient(linear, left left, right right, from(#FF5C5C), to(#FA1862));
    background: -webkit-linear-gradient(left, #FF5C5C, #FA1862);
    background: -webkit-gradient(linear, left top, right top, from(#FF5C5C), to(#FA1862));
    background: linear-gradient(to right, #FF5C5C, #FA1862);
    display: block;
    border-radius: 0.04rem;
  }
  .awd_touch{
    background-image: url("//pic.davdian.com/free/20170915_assistance/awbg.png");
    width: 3.35rem;
    height: 0.76rem;
    margin: 0 auto;
    background-size: 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    >div{
      width:2.95rem;
      height: 0.66rem;
      color:#FFFFFF;
      text-align: center;
      margin: 0.07rem 0 0 0.2rem;
      overflow: hidden;
      >div{
        width:2.95rem;
        height: 0.66rem;
        top: -0.54rem;
      }
      .awd_title{
        font-size: 0.2rem;
        height: 0.28rem;
        line-height: 0.28rem;
        margin-top: 0.12rem;
      }
      .awd_tip{
        font-size: 0.1rem;
        height: 0.14rem;
        line-height: 0.14rem;
      }
    }
  }
  .awd_pre{
    background-color: #FFFFFF;
  }
  .awd_no{
    background-color: #FF9E9E;
  }
  .awd_yes{
    background-color: #FF5353;
  }
</style>
