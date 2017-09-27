<template>
  <div class="assistance_box" v-if="response && goodsdata">
    <!--呼朋唤友省更多-->
    <div v-if="response.type == '0'" class="title_img">
      <img style="width:1.8rem;" src="//pic.davdian.com/free/20170915_assistance/huhaoyou2.png">
      <div class="dtime" v-if="response.actType == 0">
        距助力结束：{{goodsdata.goods.overTime | formatRemainTime}}
      </div>
      <div class="qiqiu_ing">
        <img src="//pic.davdian.com/free/20170915_assistance/qiqiu.png">
        <img src="//pic.davdian.com/free/20170915_assistance/bangbangtang.png">
      </div>
    </div>
    <!--助好友0元购-->
    <div v-if="response.type == '1'" class="title_img">
      <img style="width: 2.57rem;" src="//pic.davdian.com/free/20170915_assistance/zhuhaoyou.png">
      <div class="dtime" v-if="response.actType == 0">距助力结束：{{goodsdata.goods.overTime | formatRemainTime}}</div>
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
    <a :href="goodsdata.goods.link" class="goods_info">
      <div class="goods_info_img">
        <img :src="goodsdata.goods.goodsImage" alt="">
      </div>
      <div class="goods_info_desc">
        <div class="goods_info_title">
          {{goodsdata.goods.goodsName}}
        </div>
        <div class="order_good_price"><span class="f_l">10.18到手价<em
          class="price_symbol">￥</em><span>{{goodsdata.goods.activityPrice}}</span></span>
          <span class="membership_crown_pre"><em>￥</em>{{goodsdata.goods.goodsPrice}}</span></div>
      </div>
    </a>
    <!--板-->
    <div class="rule_brand">
      <img @click="rule_form = true" title="0987654" src="//pic.davdian.com/free/20170915_assistance/rule.png">
      <img src="//pic.davdian.com/free/20170915_assistance/bear.png">
      <!--助力者页面按钮信息-->
      <section v-if="response.type == '1'">
        <!--助力活动结束-->
        <section v-if="response.actType != 0">
          <div class="ast_txt" style="padding:0.68rem 0 0.12rem;">助力省钱活动已结束<br>关注更多精彩活动</div>
          <!--1018活动期间-->
          <span @click="go_main('/act_1018_main.html')" class="share_btn bd_r"
                style="display: block;">去10.18周年庆主会场逛逛</span>
        </section>
        <section v-else>
          <!--进页面的时候已经助力过了-->
          <span v-if="response.supporter.isHelp == '1'">
            <div class="ast_bigtxt">本次助力帮TA省了<span
              style="font-size:0.24rem">{{response.supporter.friendsPrice}}</span>元</div>
            <div class="ast_bigtxt"
                 style="padding-top:0.1rem;">TA共得到好友{{response.supporter.supporterPrice}}元助力<span
              v-if="response.supporter.rate">，战胜了{{response.supporter.rate}}%的人</span></div>
            <div class="ast_txt" v-if="!date17" style="padding:0.1rem 0 0.2rem;">别忘啦，明天还可以帮好友助力哦</div>
            <!--展示抽奖-->
            <div class="awd_touch">
              <div class="awd_pre" :class="{'awd_no':response.supporter.isPrizes == 0,'awd_yes':response.supporter.isPrizes == 1}">
                  <!--未中奖-->
                  <section  v-if="response.supporter.isPrizes == 0">
                    <div class="awd_title">很遗憾 未中奖</div>
                    <div class="awd_tip">明天助力再赢iPhone8吧</div>
                  </section>
                  <!--中奖-->
                  <section v-if="response.supporter.isPrizes == 1">
                    <div class="awd_title">恭喜你被iPhone8砸中了</div>
                    <div class="awd_tip">您的大V账户会收到红包凭证，请等待工作人员联系您</div>
                  </section>
                <!--没抽奖时候-->
                <com-scratch-card v-if="response.supporter.isLottery == 0 && touch200 < 120" @touchmove="touch_move"
                                  @mousemove="touch_move" @touchstart="start_awd" @mousedown="start_awd"
                                  mask-tip="刮一刮，抽iPhone8大奖" font-color="#FFFFFF" font-size="20px"></com-scratch-card>
              </div>
            </div>
            <div style="height: 0.2rem;"></div>
          </span>
          <!--进页面时候还没有助力-->
          <span v-else>
          <!--没有其他好友给他助力呢-->
          <span v-if="response.supporter.supporterPrice == '0'">
           <div class="ast_bigtxt" style="padding: 0.49rem 0 0.2rem;">轻轻一点为TA赢得商品0元购</div>
            <div class="share_btn bd_r" @click="assistance">给TA助力  我赢iPhone8</div>
            <div class="ast_txt" style="font-size: 0.1rem;line-height: 0.14rem;padding-top: 0.06rem;">助力后即刻抽奖</div>
          </span>
            <!--已经得到好友的助力-->
          <span v-else>
           <!--获得0元购机会-->
            <span v-if="response.supporter.surplusPrice == '0'">
              <div class="ast_bigtxt">TA已得到好友<span
                style="font-size:0.24rem">{{response.supporter.supporterPrice}}</span>元助力<span
                v-if="response.supporter.rate">，<br>战胜{{response.supporter.rate}}%的人</span></div>
              <div class="ast_txt" style="padding-top:0.1rem;">获得10.18当天0元抢购的机会</div>
            </span>
            <!--没有获得0元购-->
            <span v-else>
              <div class="ast_bigtxt" style="padding-top:0.34rem;">TA已得到好友<span
                style="font-size: 0.24rem;">{{response.supporter.supporterPrice}}</span>元助力<span
                v-if="response.supporter.rate">，<br>战胜了{{response.supporter.rate}}%的人</span></div>
              <div class="ast_txt" style="padding: 0.1rem 0 0.04rem;">帮TA再接再厉赢得商品0元购 ！</div>
              <div class="share_btn bd_r" @click="assistance">给TA助力  我赢iPhone8</div>
              <div class="ast_txt" style="font-size: 0.1rem;line-height: 0.14rem;padding-top: 0.06rem;">助力后即刻抽奖</div>
            </span>
        </span>
        </span>
        </section>
      </section>

      <!--发起者页面信息-->
      <span v-if="response.type == '0'">
        <!--助力活动结束-->
        <section v-if="response.actType != 0">
          <span v-if="response.actType == 1">
            <!--没有好友支持-->
            <div v-if="response.source.supporterPrice == '0'" class="ast_txt" style="padding:0.68rem 0 0.32rem;">很遗憾没有得到好友的助力支持</div>
            <!--0元购-->
            <div v-else class="ast_deep" style="padding:0.72rem 0 0.21rem">已得到{{response.source.supporterPrice}}元助力快去
              <span v-if="response.source.surplusPrice == '0'" style="font-size: 0.24rem;">0元</span>抢购吧
            </div>
            <a :href="response.activityLink" class="share_btn bd_r" style="display: block;">立即抢购</a>
          </span>

           <span v-if="response.actType == 2">
              <div class="ast_txt" style="padding:0.72rem 0 0.14rem;">助力省钱活动已结束<br>关注更多精彩活动</div>
              <span @click="go_main('/act_1018_main.html')" class="share_btn bd_r" style="display: block;">去10.18周年庆主会场逛逛</span>
           </span>
        </section>
        <section v-else>
          <!--获得0元购机会-->
          <span v-if="response.source.surplusPrice == '0'">
              <div class="ast_deep" style="padding:0.49rem 0 0.08rem">恭喜你获得10.18当天0元抢购的机会</div>
              <div class="ast_bigtxt" style="padding: 0;">得到好友的{{response.source.supporterPrice}}元助力<span
                v-if="response.source.rate">，战胜了{{response.source.rate}}%的人</span></div>
              <div class="ast_txt" style="padding: 0.15rem 0 0.1rem;">10月18日开抢 数量有限 先到先得!</div>
          </span>
          <!--没有获得0元购机会-->
          <span v-else>
          <!--没有好友助力呢-->
          <span v-if="response.source.supporterPrice == '0'">
            <div class="no_ast ast_txt" style="padding: 0.48rem 0 0.34rem;">还没有好友帮你助力，快去召集好友助力省钱吧！</div>
            <div v-if="isApp" class="share_btn bd_r" @click="shares">喊人助力</div>
            <div v-if="isWx" class="share_btn bd_r">点击右上角“···”按钮分享</div>
            <div v-if="!isWx && !isApp" class="share_btn bd_r" @click="gowxorapp">喊人助力</div>
          </span>
            <!--已经得到好友的助力-->
          <span v-else>
            <div class="ast_bigtxt"
                 style="padding-top:0.34rem;">得到好友的{{response.source.supporterPrice}}元助力<span
              v-if="response.source.rate">，战胜了{{response.source.rate}}%的人</span></div>
            <div class="ast_txt" style="padding: 0.15rem 0 0.1rem;">10.18当天购买只需{{response.source.surplusPrice}}元，继续召集好友助力得0元抢购，加油吧！</div>
            <div v-if="isApp" class="share_btn bd_r" @click="shares">喊人助力</div>
            <div v-if="isWx" class="share_btn bd_r">点击右上角“···”按钮分享</div>
            <div v-if="!isWx && !isApp" class="share_btn bd_r" @click="gowxorapp">喊人助力</div>
          </span>
          </span>
        </section>
      </span>
    </div>

    <img class="table_brand" src="//pic.davdian.com/free/20170915_assistance/table_brand.png">
    <!--助力结束和助力发起页不显示这个-->
    <a @click="metoogo(response.supporter.myLink)" v-if="response.type == 1 && response.actType == 0"
       style="margin-bottom: 0.2rem;display: block;width: 1.8rem;" class="share_btn bd_p">我也想要商品0元购</a>
    <!--获奖好友轮播-->
    <div class="loop_my_friend_reward" v-if="goodsdata.notice.length">
      <swiper loop auto height="60px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
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
    <div v-if="response.actType != 2" @click="go_main('/act_1018_main.html')" class="main_btn">10.18周年庆主会场</div>
    <!--查看规则-->
    <div v-if="rule_form" class="com-popup-base2" @click="rule_form = false">
      <div class="table-cell">
        <div v-show="rule_form" class="box" @click.stop="events">
          <div>助力规则</div>
          <div>
            <p>1.助力时间：2017.10.01 00:00:00-2017.10.17 23:59:59；</p>
            <p>2.抢购时间：2017.10.18 00:00:00- 2017.10.18 23:59:59；</p>
            <p>3.活动仅限大V店会员参与；</p>
            <p>4.邀请好友助力可获得随机减钱；</p>
            <p>5.每天仅有1次给好友助力的机会，成功助力即可给好友随机减钱，还有机会抽取iphone8；</p>
            <p>6.10月18日当天以活动价支付购买活动商品，支付成功后该商品得到的助力金额将以返现的形式返到【我的】－【总额】－【待结算金额】－【其他收入】里，30天后如果没有退货将转到【待提现金额】；</p>
            <p>7.已发起的助力商品可在【我的10.18】中查看，商品库存有限，助力结束后10月18日当天请尽快购买支付，只有成功支付商品，助力减钱金额才能返现，最高返该商品的到手金额；</p>
            <p>8.其中爸爸的选择纸尿裤和羽绒服这两款商品助力所减金额，最晚于10月19日24点前返现到账，其他商品将在商品支付成功后实时返现；</p>
            <p>9.详情可咨询大V店客服。</p>
          </div>
          <div @click="rule_form = false"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import ua from '../../../common/js/module/ua.js';
  import share from '../../../common/js/module/share.js';
  import native from '../../../common/js/module/native.js';
  import {Swiper, SwiperItem} from 'vux'
  import login from '../../../common/js/module/login.js';
  /*时间格式化*/
  Date.prototype.format = function(format) {
    var date = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  };
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
        rule_form: false,
        addsupporterPrice: null,
        supporterData: null, //助力结果数据
        awd_type: 0,
        start_awd_al: false, //是否已经刮奖过,
        date17: false,  //是不是17号
        touch200: 0
      }
    },
    components: {
      Swiper,
      SwiperItem,
      'com-scratch-card': require('../../../component/com-scratch-card.vue')
    },
    computed: {},
    watch: {
      // 监听response变化
      goodsdata() {
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;
          // 设置分享信息
          if (ts.goodsdata) {
            /*如果是不是会员，不设置分享信息*/
            try {
              share.setShareInfo({
                "title": ts.goodsdata.goods.shareInfo.title,
                "desc": ts.goodsdata.goods.shareInfo.desc,
                "imgUrl": ts.goodsdata.goods.shareInfo.imgUrl,
                "link": ts.goodsdata.goods.shareInfo.link,
                success: function () {
                  ts.sharecallback();
                }
              });
              setTimeout(function () {
                native.custom.initHead({
                  'shareOnHead': '0'
                });
              }, 300);
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
            /*助力发起和助力者title变化*/
            if (response.data.type == '0') {
              ts.$emit("doctitle", "召集好友助力，最低0元购买商品");
            } else {
              ts.$emit("doctitle", response.data.supporter.nickName + "正在发起助力");
            }
            /*日期是否是17号*/
            if (new Date(parseInt(response.sys_time) * 1000).toLocaleString().split(" ")[0] == "2017/10/17") {
              ts.date17 = true;
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
        var ts = this;
        login.needLogin();
        ts.sharecallback();
        share.callShare();
      },
      /***
       * 给他助力
       * */
      assistance: function () {
        var that = this;
        login.needLogin();
        /*是否是已登录的会员，公司早晚被死佬扣，臧凯给搞没了*/
        if (login.isSeller()) {
          $.ajax({
            cache: false,
            async: true,
            url: that.moke + '/api/mg/sale/userhelpbuy/addHelpPrice?_=' + Date.now(),
            type: 'post',
            dataType: 'json',
            data: encrypt({goodsId: that.goodsId, shareUserId: that.shareUserId}),
            success(response) {
              if (response.data.code == '200') {
                /*初始化数据*/
                popup.toast("助力成功");
                that.getData();
              } else if (response.data.code == '100') {
                popup.toast("每天只能助力一次哦");
              }
            },
            error(error) {
              console.error('ajax error:' + error.status + ' ' + error.statusText);
            }
          });
        } else {
          popup.confirm({
            title: '您还没有成为会员不能参与该活动哦，成为会员即可参与～',
            text: '',
            okBtnTitle: '开通会员',
            okBtnCallback() {
              location.href = "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button";
            },
            cancelBtnTitle: '取消',
          });
        }
      },
      /***
       * 我也想要0元购
       * */
      metoogo: function (url) {
        var that = this;
        login.needLogin();
        if (login.isSeller()) {
          location.href = url || '/ast_' + that.goodsdata.goods.goodsId + '.html';
        } else {
          popup.confirm({
            title: '您还没有成为会员不能参与该活动哦，成为会员即可参与～',
            text: '',
            okBtnTitle: '开通会员',
            okBtnCallback() {
              location.href = "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button";
            },
            cancelBtnTitle: '取消',
          });
        }
      },
      /***
       * 刮奖
       * */
      start_awd: function () {
        var that = this;
        if (!that.start_awd_al) {
          that.start_awd_al = true;
          $.ajax({
            cache: false,
            async: true,
            url: that.moke + '/api/mg/sale/userhelpbuy/addPrizesLottery?_=' + Date.now(),
            type: 'post',
            dataType: 'json',
            data: encrypt({goodsId: that.goodsId, shareUserId: that.shareUserId}),
            success(response) {
              if (!response.code) {
                if (response.data.lotteryResult == 'success') {
                  that.response.supporter.isPrizes = 1
                } else {
                  that.response.supporter.isPrizes = 0
                }
              }
            },
            error(error) {
              console.error('ajax error:' + error.status + ' ' + error.statusText);
            }
          });
        }
      },
      /***
       * 记录分享回调
       * */
      sharecallback: function () {
        var that = this;
        $.ajax({
          cache: false,
          async: true,
          url: this.moke + '/api/mg/sale/userhelpbuy/userShareGoods?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: that.goodsId, shareUserId: that.shareUserId}),
          success() {

          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
      /***
       * 去主会场   关闭当前
       * */
      go_main: function (url) {
        if (ua.isDvdApp()) {
          event.preventDefault();
          native.Browser.close({})
        } else {
          location.href = url
        }
      },
      /***
       * 查看规则
       */
      check_rule: function () {
        this.rule_form = true;
      },
      events: function () {

      },
      close_what_invite: function () {
        this.rule_form = false;
      },
      touch_move: function () {
        var that = this;
        that.touch200++;
        console.log(that.touch200);
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
        var timestamp3 = now;
        var newDate = new Date();
        newDate.setTime(timestamp3 * 1000);
        return newDate.format('yyyy-MM-dd hh:mm:ss')
      }
    },
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .assistance_box {
    max-width: 640px;
    height: 100%;
    overflow: scroll;
  }

  .title_img {
    padding-top: 0.3rem;
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
    display: block;
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
    > img {
      position: absolute;
      z-index: 1;
    }
    > img:nth-of-type(1) {
      width: 0.87rem;
      right: 0.1rem;
      top: -0.04rem;
    }
    > img:nth-of-type(2) {
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
          position: relative;
          z-index: 1;
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
        left: 0;
        width: 100%;
        height: 1px;
        background: #FFFFFF;
        transform: scaleY(0.3);
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

  .awd_touch {
    background-image: url("//pic.davdian.com/free/20170915_assistance/awbg.png");
    width: 3.35rem;
    height: 0.76rem;
    margin: 0 auto;
    background-size: 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    > div {
      width: 2.95rem;
      height: 0.66rem;
      color: #FFFFFF;
      text-align: center;
      margin: 0.07rem 0 0 0.2rem;
      overflow: hidden;
      > div {
        width: 2.95rem;
        height: 0.66rem;
        top: -0.54rem;
      }
      .awd_title {
        font-size: 0.2rem;
        height: 0.28rem;
        line-height: 0.28rem;
        margin-top: 0.12rem;
      }
      .awd_tip {
        font-size: 0.1rem;
        height: 0.14rem;
        line-height: 0.14rem;
      }
    }
  }

  .awd_pre {
    background-color: #FFFFFF;
  }

  .awd_no {
    background-color: #FF9E9E;
  }

  .awd_yes {
    background-color: #FF5353;
  }

  // 动画
  @keyframes com-alert-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  .com-popup-base2 {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    line-height: 1;
  }

  .com-popup-base2 .table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .com-popup-base2 .table-cell .box {
    display: inline-block;
    border-radius: 0.04rem;
    animation: com-alert-animation 0.5s;
    width: 73.333%;
    /*min-height: 200px;*/
    position: relative;
    text-align: center;
    background-color: #FFFFFF;
    padding: 0 10px 15px;
    color: #FF4A7D;
    max-height: 4rem;
    /*min-height: auto;*/
    overflow: scroll;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(1) {
    font-size: 14px;
    text-align: center;
    padding: 12px 0;
    position: relative;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(2) {
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    padding-top: 5px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(3) {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    width: 36px;
    height: 36px;
    background-image: url("../img/clearInput.png");
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: 10px 10px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(2) p {
    display: inline-block;
    margin-top: 10px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(1):after {
    content: "";
    display: block;
    position: absolute;
    left: -50%;
    width: 200%;
    height: 1px;
    background: rgba(216, 216, 216, 0.51);
    -webkit-transform: scale(0.5);
    bottom: 0;
    z-index: 1;
  }
</style>
<style>
  html {
    min-height: 100%;
  }

  body {
    min-height: 100%;
    background: -webkit-linear-gradient(top, #F54B74, #FF9F8F);
    background: -webkit-gradient(linear, top top, bottom bottom, from(#F54B74), to(#FF9F8F));
    background: -webkit-linear-gradient(top, #F54B74, #FF9F8F);
    background: linear-gradient(to bottom, #F54B74, #FF9F8F);
  }

  .app {
    height: 100%;
  }

  .clearfix:before, .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }
</style>
