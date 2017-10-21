<style  lang="sass"  rel="stylesheet/scss">
  @import "../../../common/css/common.scss";
  @import "../css/act_1018_luck_draw.scss";
</style>
<template>
	<div class = "luckDraw"  :class = "{ luckPadding: isLogin && visitorStatus == '3' && Number(saleNum) != '0', luckMargin: isLogin && luckNum }">
    <img style = "display: none;" src="//pic.davdian.com/free/ydd1.png">
    <img style = "display: none;" src="//pic.davdian.com/free/ydd7.png">
    <img style = "display: none;" src="//pic.davdian.com/free/1022/iphone8_mask_icon.png">
    <div class = "luckTitle">
      <div>会员店铺订单支付金额累计每满500元可抽奖一次</div>
      <div>(不包含退货订单)</div>
    </div>

    <div v-if = "isLogin && visitorStatus == '3' && Number(saleNum) != '0'" class = "saleTitle">当前店铺销售额：{{ saleNum }}元</div>
    <div v-if = "isLogin && luckNum" class = "luckNumNav">您有{{ luckNum }}次抽奖机会</div>
    <div class = "luckCont" id="lottery">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td class="lottery-unit lottery-unit-0"><img src="//pic.davdian.com/avatar_poster/1018money.png"></td>
          <td class="lottery-unit lottery-unit-1"><img src="//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/1022/iphone8_icon.png"></td>
          <td class="lottery-unit lottery-unit-2"><img src="//pic.davdian.com/avatar_poster/1018money1.png"></td>
        </tr>
        <tr>
          <td class="lottery-unit lottery-unit-7"><img src="//pic.davdian.com/avatar_poster/mysterious_icon.png"></td>
          <td @click = "handleClick"><img src="//pic.davdian.com/avatar_poster/luckbtn.png"></td>
          <td class="lottery-unit lottery-unit-3"><img src="//pic.davdian.com/avatar_poster/meme_icon.png"></td>
        </tr>
        <tr>
          <td class="lottery-unit lottery-unit-6"><img src="//pic.davdian.com/avatar_poster/thanks_icon.png"></td>
          <td class="lottery-unit lottery-unit-5"><img src="//pic.davdian.com/avatar_poster/renxing_icon.png"></td>
          <td class="lottery-unit lottery-unit-4"><img src="//pic.davdian.com/avatar_poster/god_icon.png"></td>
        </tr>
      </table>
    </div>
    <!-- 活动规则 -->
    <div @click = "handleReserveRole" class = "bounsLuckRule">活动规则</div>
    
    <div @click = "handleMoney" v-show = "isMoney" class = "moneyCont">
      <div class = "moneyWrapper"></div>
      <!-- <img src="//note.youdao.com/yws/res/1629/WEBRESOURCEf68d2764a1c666f4414be7e3b4bfb29f"> -->
      <img src="//pic.davdian.com/free/ydd1.png">
      <div class = "moneyNum" v-if = "bounsNumMoney">
        <p>恭喜你抽中</p>
        <p><span class = "moneyNums_icon">{{ bounsNumMoney }}元</span>现金大奖</p>
      </div>
      <div class = "linkCont">
        <!-- 去购物 -->
        <div @click = "handleGoShlping" class = "goShopLink"></div>
        <!-- 查看账户  -->
        <div @click = "handleAccount" class = "lookLink"></div>
      </div>
    </div>
    <div v-show = "isBouns" class = "bounsCont" @click = "handleBouns">
      <div class = "bounsWrapper"></div>
      <img src="//pic.davdian.com/free/ydd7.png">
      <div class = "bounsNums_num" v-if = "bounsInfos && bounsInfos.bonusMoney">
        <p>恭喜你抽中</p>
        <p><span class = "bounsNums_w">{{ bounsInfos.bonusMoney }}元</span>红包</p>
      </div>
      <div class = "bounsInfo" v-if = "bounsInfos && bounsInfos.bonusMoney">
        <div class = "bounsNav">
          <div class = "bouns_Nums"><span class = "bouns_m">¥</span><span class = "bouns_N">{{ bounsInfos.bonusMoney }}</span>
          <!-- <span class = "bouns_nm">元</span> -->
          </div>
          <div class = "bouns_limit">满{{ bounsInfos.minConsumePrice }}元可用</div>
        </div>
        <div class = "bounsNav2">
          <!-- <div class = "bouns_b">仅购买</div> -->
          <div class = "bouns_l">{{ bounsInfos.bonusName }}</div>
          <div class = "bouns_d">{{ bounsInfos.useBeginTime }} - {{ bounsInfos.useEndTime }}</div>
        </div>
      </div>
      <div @click = "handleGoShlping" class = "bounsLink"></div>
    </div>
    <!-- iphone 8 弹框 -->
    <div @click = "handleIphone" class = "iphoneCont" v-show = "isIphone">
      <div class = "iphoneWrapper"></div>
      <img src="//pic.davdian.com/free/1022/iphone8_mask_icon.png">
      <div class = "iponeNums">
        <p>恭喜你抽中</p>
        <p><span class = "ipone_icon">iPhone8</span>惊喜大奖</p>
      </div>
      <div class = "iponeLink">
        <!-- 去购物 -->
        <div @click = "handleGoShlping" class = "goShopLink"></div>
        <!-- 查看账户  -->
        <div @click = "handleIphoneBouns" class = "lookLink"></div>
      </div>
    </div>

    <!--查看规则-->
    <div v-if="rule_form" class="com-popup-base2" @click="rule_form = false">
      <div class="table-cell">
        <div v-show="rule_form" class="box" @click.stop="events">
          <div>活动规则</div>
          <div>
            <p>1.抽奖时间：2017.10.22 00:00:00-2017.10.22 23:59:59；</p>
            <p>2.本活动仅限大V店会员参与；</p>
            <p>3.抽奖规则：10月18日至10月22日期间，会员购物或销售累计实际支付金额（含返现支付部分）每满500元在10月22日即有一次抽奖机会，奖品随机抽取，100%中奖；</p>
            <p>4.奖品发放方式：<br>
            抽中iPhone8，当天会有工作人员通过手机号联系您，请保持手机畅通，无法拨通电话视为放弃；</br>
            抽中现金，以返现方式实时返至【我的】－【总额】－【待结算金额】－【其他收入】中，30天后如无退货将转到【可提现金额】；</br>
            抽中红包，红包实时发放到会员的红包账户，抽奖获得的红包请在2017.10.31 23:59:59前使用，过期失效；</p>
            <p>5.如遇恶意订单、退货等导致不满足抽奖条件的，相应奖励将收回；</p>
            <p>6.开通会员订单不参与该活动；</p>
            <p>7.详情可咨询大V店客服。</p>
          </div>
          <div @click="close_what_invite"></div>
        </div>
      </div>
    </div>
	</div>
</template>
<script type="text/javascript">
  import login from '../../../common/js/module/login.js';
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import native from '../../../common/js/module/native.js';
  import layout from "../../../../module/index/layout.es6";
  
  export default {
    components: {

    },
    data () {
      return {
        luckNum: 0,
        // 是否有抽奖机会
        isluck: false,
        // 销售额
        saleNum: 0,

        index:-1,
        count:0,
        timer:0,
        speed:20,
        times:0,
        cycle:38,
        prize:-1,
        click: false,
        isLogin: false,
        visitorStatus: 1,
        isMoney: false,
        isBouns: false,
        isIphone: false,
        lotteryId: 0,

        bounsNumMoney: 0,
        bounsInfos: null,
        rule_form: false,
        // 是否是第一次请求ajax
        isFirstAjax: true,
        showMaskTime: null,
      }
    },
    props: [],
    created() {
      this.isLogin = login.isLogined();
      this.getData();
    },
    watch: {
      luckNum: {
        handler() {
          this.$nextTick(function() {
            this.init("lottery");
          })
        },
        deep: true,
      },
      rule_form: function () {
        var that = this;
        if (that.rule_form) {
          if (document.documentElement && document.documentElement.scrollTop) {
            this.scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            this.scrollTop = document.body.scrollTop;
          }
          document.body.style.top = -this.scrollTop + 'px';
          document.body.classList.add("bodyFix");

        } else {
          document.body.classList.remove("bodyFix");
          $(document).scrollTop(this.scrollTop);

        }
      }
    },
    methods: {
      handleReserveRole() {
        this.rule_form = true;
      },
      close_what_invite() {
        this.rule_form = false;
      },
      handleAccount() {
        location.href = "http://s.davdian.com/index.php?m=admin&c=newIncome&a=detail&status=0&cat=5";
      },
      handleMoney(e) {
        if(e.target.className == "") {
          this.isMoney = false;
          $("body,html").removeClass("fixedClass");
        }
      },
      handleBouns(e) {
        if (e.target.className == "") {
          this.isBouns = false;
          $("body,html").removeClass("fixedClass");
        }
      },
      handleIphone(e) {
        if (e.target.className == "") {
          this.isIphone = false;
          $("body,html").removeClass("fixedClass");
        }
      },
      handleIphoneBouns() {
        location.href = "/user_bonus.html";
      },
      handleGoShlping() {
        this.isMoney = false;
        this.isBouns = false;
        this.isIphone = false;
        $("body,html").removeClass("fixedClass");
      },
      getData() {
        let that = this;
        $.ajax({
          url: "/api/mg/sale/returnbonus/getBonusNumber",
          type: "POST",
          dataType: "JSON",
          data: layout.strSign('luck_draw',{}),
          success(res) {
            if (!res.code) {
              that.visitorStatus = res.visitor_status;
              if (res.data) {
                that.luckNum = Number(res.data.number);
                that.saleNum = res.data.amount;
              }

              if (res.data && res.data.number != '0') {
                that.isluck = true;
              }
            }
          },
          error(error) {
            console.log('error',error);
          },
        })
      },
      gitBounsInfo() {
        let that = this;
        $.ajax({
          url: "/api/mg/sale/returnbonus/lotteryBonus",
          type: "POST",
          async: false,
          dataType: "JSON",
          data: layout.strSign('lottory_luck',{}),
          success(res) {
            console.log("res",res);
            if (!res.code) {
              that.luckNum--;
              if (res.data.lotteryResult == 'success') {
                // 最后两个是现金，其它按次序排的,prize为1的时候是苹果
                switch(res.data.bonusInfo.bonusTypeId) {
                  case 3336: 
                    that.prize = 1;
                    break;
                  case 3138:
                    that.prize = 3;
                    break;
                  case 3140:
                    that.prize = 4;
                    break;
                  case 3135:
                    that.prize = 5;
                    break;
                  case 3137:
                    that.prize = 6;
                    break;
                  case 3136:
                    that.prize = 7;
                    break;
                  case 3192:
                    that.prize = 0;
                    break;
                  case 3191:
                    that.prize = 2;
                    break;
                }
                /*switch (res.data.bonusInfo.bonusTypeId) {
                  case 3303:
                    that.prize = 1;
                    break;
                  case 3306:
                    that.prize = 3;
                    break;
                  case 3308:
                    that.prize = 4;
                    break;
                  case 3307:
                    that.prize = 5;
                    break;
                  case 3305:
                    that.prize = 6;
                    break;
                  case 3304:
                    that.prize = 7;
                    break;
                  case 3311:
                    that.prize = 0;
                    break;
                  case 3310:
                    that.prize = 2;
                    break;
                }*/
                if (res.data.bonusInfo) {
                  res.data.bonusInfo.minConsumePrice = parseFloat(Number(res.data.bonusInfo.minConsumePrice));
                  res.data.bonusInfo.bonusMoney = parseFloat(Number(res.data.bonusInfo.bonusMoney));

                  that.bounsInfos = res.data.bonusInfo;
                }
              } else {
                // 不为success,为fail
                clearTimeout(that.timer);
                $(".lottery-unit").removeClass("active");
                popup.toast("抽奖失败,请刷新后重试");
              }
            } else {
              // popup.info()
            }
          },
          error(error) {
            console.log('error',error);
          },
        })
      },
      handleClick() {
        // 是否登陆
        if (!this.isLogin) {
          location.href = "/login.html?referer=" + encodeURI(location.href);
          return;
        }
        if (this.visitorStatus != 3) {
          popup.confirm({
            title: '您还没有成为会员，不能参与抽奖哟，成为会员立即抽1018元现金大奖吧～',
            text: '',
            okBtnTitle: '开通会员',
            okBtnCallback() {
              location.href = "/index.php?c=ShopGoods&a=index&id=348&rp=index&rl=shop_button";
            },
            cancelBtnTitle: '取消',
          });
          return;
        }
        // 是否有抽奖机会
        if (!this.isluck) {
          popup.toast("订单实际支付金额累计满500才能抽奖哦～");
          return;
        }

        if (this.luckNum == '0') {
          popup.toast("抽奖机会已用完，订单实际支付金额累计每满500才能抽一次奖哦～");
          return;
        }

        if(!this.click) {
          this.gitBounsInfo();
        }
        if(this.click) {
          return false;
        }
        else{
          this.speed=100;
          this.getInit();
          this.click=true;
          return false;
        }
      },
      init(id) {
        if ($("#"+id).find(".lottery-unit").length>0) {
          let $lottery = $("#"+id);
          let $units = $lottery.find(".lottery-unit");
          this.obj = $lottery;
          this.count = $units.length;
          $lottery.find(".lottery-unit-"+this.index).addClass("active");
        };
      },
      roll() {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-"+index).removeClass("active");
        index += 1;
        if (index>this.count-1) {
          index = 0;
        };
        $(lottery).find(".lottery-unit-"+index).addClass("active");
        this.index=index;
        return false;
      },
      getInit() {
        let that = this;
        that.times += 1;
        that.roll();
        if (that.times > that.cycle+8 && that.prize==that.index) {
            clearTimeout(that.showMaskTime);
            clearTimeout(that.timer);
            that.showMaskTime = setTimeout(() => {
              if (that.prize == 0 || that.prize == 2) {
                that.isMoney = true;
                $("body,html").addClass("fixedClass");
                if (that.prize == 0) {
                  that.bounsNumMoney = 10.18;
                } else {
                  that.bounsNumMoney = 1018;
                }
              } else if (that.prize == 1) {
                that.isIphone = true;
                $("body,html").addClass("fixedClass");
              } else {
                that.isBouns = true;
                $("body,html").addClass("fixedClass");
              }
              $(".lottery-unit").removeClass("active");
              that.prize=-1;
              that.times=0;
              that.click=false;
            }, 1000);
          
        }else{
          if (that.times<that.cycle) {
            that.speed -= 10;
          }else{
            if (that.times > that.cycle+8 && ((that.prize==0 && that.index==7) || that.prize==that.index+1)) {
              that.speed += 110;
            }else{
              that.speed += 35;
            }
          }
          if (that.speed<40) {
            that.speed=40;
          };
          clearTimeout(that.timer);
          that.timer = setTimeout(that.getInit,that.speed);
        }
        return false;
      },
    }
  }
</script>
