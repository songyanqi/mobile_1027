<style  lang="sass"  rel="stylesheet/scss">
  @import "../../../common/css/common.scss";
  @import "../css/act_1018_luck_draw.scss";
</style>
<template>
	<div class = "luckDraw">
    <div class = "luckTitle">会员订单支付金额累计每满500元可抽奖一次</div>
    <div v-if = "isLogin && luckNum" class = "luckNumNav">您有{{ luckNum }}次抽奖机会</div>
    <div class = "luckCont" id="lottery">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td class="lottery-unit lottery-unit-0"><img src="http://pic.davdian.com/avatar_poster/1018money.png"></td>
          <td class="lottery-unit lottery-unit-1"><img src="http://pic.davdian.com/avatar_poster/renxing_icon.png"></td>
          <td class="lottery-unit lottery-unit-2"><img src="http://pic.davdian.com/avatar_poster/1018money1.png"></td>
        </tr>
        <tr>
          <td class="lottery-unit lottery-unit-7"><img src="http://pic.davdian.com/avatar_poster/mysterious_icon.png"></td>
          <td @click = "handleClick"><img src="http://pic.davdian.com/avatar_poster/luckbtn.png"></td>
          <td class="lottery-unit lottery-unit-3"><img src="http://pic.davdian.com/avatar_poster/meme_icon.png"></td>
        </tr>
        <tr>
          <td class="lottery-unit lottery-unit-6"><img src="http://pic.davdian.com/avatar_poster/thanks_icon.png"></td>
          <td class="lottery-unit lottery-unit-5"><img src="http://pic.davdian.com/avatar_poster/suprice_icon.png"></td>
          <td class="lottery-unit lottery-unit-4"><img src="http://pic.davdian.com/avatar_poster/god_icon.png"></td>
        </tr>
      </table>
    </div>
    <!-- <div class = "mask"></div> -->
    <div @click = "handleMoney" v-if = "isMoney" class = "moneyCont">
      <div class = "moneyWrapper"></div>
      <!-- <img src="http://note.youdao.com/yws/res/1629/WEBRESOURCEf68d2764a1c666f4414be7e3b4bfb29f"> -->
      <img src="http://pic.davdian.com/free/ydd1.png">
      <div class = "moneyNum">
        <p>恭喜你抽中</p>
        <p><span>{{ bounsNumMoney }}元</span>现金大奖</p>
      </div>
      <div class = "linkCont">
        <!-- 去购物 -->
        <a @click = "handleGoShlping" class = "goShopLink" href="javascript:void(0)"></a>
        <!-- 查看账户  -->
        <a class = "lookLink" href=""></a>
      </div>
    </div>
    <div v-if = "isBouns" class = "bounsCont" @click = "handleBouns">
      <!-- <img src="http://note.youdao.com/yws/res/1627/WEBRESOURCE967a424bdc653fc1cc494478785b45ba"> -->
      <div class = "bounsWrapper"></div>
      <img src="http://pic.davdian.com/free/ydd2.png">
      <div class = "bounsInfo" v-if = "bounsInfos">
        <div class = "bounsNav">
          <div class = "bouns_Nums"><span class = "bouns_m">¥</span><span class = "bouns_N">{{ bounsInfos.bonusMoney }}</span><span class = "bouns_nm">元</span></div>
          <div class = "bouns_limit">满{{ bounsInfos.minConsumePrice }}元可用</div>
        </div>
        <div class = "bounsNav2">
          <div class = "bouns_b">仅购买</div>
          <div class = "bouns_l">{{ bounsInfos.bonusName }}</div>
          <div class = "bouns_d">{{ bounsInfos.useBeginTime }} - {{ bounsInfos.useEndTime }}</div>
        </div>
      </div>
      <div @click = "handleGoShlping" class = "bounsLink"></div>
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

        index:-1,
        count:0,
        timer:0,
        speed:20,
        times:0,
        cycle:25,
        prize:-1,
        click: false,
        isLogin: false,
        visitorStatus: 1,
        isMoney: false,
        isBouns: false,
        lotteryId: 0,

        bounsNumMoney: 0,
        bounsInfos: null,
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
    },
    methods: {
      handleMoney(e) {
        if(e.target.className != "moneyWrapper") {
          this.isMoney = false;
        }
      },
      handleBouns(e) {
        if (e.target.className != "bounsWrapper") {
          this.isBouns = false;
        }
        // console.log(e.target)
      },
      handleGoShlping() {
        this.isMoney = false;
        this.isBouns = false;
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
              that.luckNum = Number(res.data.number);
              that.visitorStatus = res.visitor_status;
              if (res.data.number != '0') {
                that.isluck = true;
              }
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
          popup.toast("订单累计实际支付金额满500元才能抽奖哦～");
          return;
        }

        if (this.luckNum == '0') {
          popup.toast("抽奖机会已用完，订单累计实际支付金额每满500元可抽奖一次～");
          return;
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
      // stop(index) {
      //   this.prize=index;
      //   return false;
      //   console.log("this.price",this.prize);
      // },
      getInit() {
        let that = this;
        that.times += 1;
          that.roll();
          if (that.times > that.cycle+10 && that.prize==that.index) {
            clearTimeout(that.timer);
            that.prize=-1;
            that.times=0;
            that.click=false;
            console.log(1111111,that.index);
            if (that.prize == 0 || that.prize == 2) {
              that.isMoney = true;
              if (that.prize == 0) {
                that.bounsNumMoney = 10.18;
              } else {
                that.bounsNumMoney = 1018;
              }
            } else {
              that.isBouns = true;
              // that.bounsInfos = res.data.bonusInfo;
            }
          }else{
            if (that.times<that.cycle) {
              that.speed -= 10;
            }else if(that.times==that.cycle) {
              // var index = Math.random()*(that.count)|0;
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
                      // 最后两个是现金，其它按次序排的
                      switch(res.data.bonusInfo.bonusTypeId) {
                        case 2594: 
                          that.prize = 1;
                          break;
                        case 2593:
                          that.prize = 3;
                          break;
                        case 2592:
                          that.prize = 4;
                          break;
                        case 2588:
                          that.prize = 5;
                          break;
                        case 2585:
                          that.prize = 5;
                          break;
                        case 2582:
                          that.prize = 6;
                          break;
                        case 2597:
                          that.prize = 0;
                          break;
                        case 2596:
                          that.prize = 2;
                          break;
                      }
                      if (res.data.bonusInfo) {
                        res.data.bonusInfo.minConsumePrice = parseFloat(Number(res.data.bonusInfo.minConsumePrice));
                        res.data.bonusInfo.bonusMoney = parseFloat(Number(res.data.bonusInfo.bonusMoney));

                        that.bounsInfos = res.data.bonusInfo;
                      }
                    } else {
                      // 不为success,为fail
                      popup.info(res.data.msg);
                    }
                  } else {
                    // popup.info()
                  }
                },
                error(error) {
                  console.log('error',error);
                },
              }) 
            }else{
              if (that.times > that.cycle+10 && ((that.prize==0 && that.index==7) || that.prize==that.index+1)) {
                that.speed += 110;
              }else{
                that.speed += 20;
              }
            }
            if (that.speed<40) {
              that.speed=40;
            };
            that.timer = setTimeout(that.getInit,that.speed);
          }
          return false;
      },
    }
  }
</script>
