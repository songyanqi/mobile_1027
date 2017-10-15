<style  lang="sass"  rel="stylesheet/scss">
  
</style>
<template>
	<div class = "luckDraw">
    <div class = "luckTitle">会员订单支付金额累计每满500元可抽奖一次</div>
    <div class = "luckNumNav">您有{{ luckNum }}次抽奖机会</div>
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

            $.ajax({
              url: "/api/mg/sale/returnbonus/lotteryBonus",
              type: "POST",
              dataType: "JSON",
              data: layout.strSign('lottory_luck',{}),
              success(res) {
                console.log("res",res);
                if (!res.code) {
                  that.luckNum--;
                } else {
                  // popup.info()
                }
              },
              error(error) {
                console.log('error',error);
              },
            })


            console.log(1111111,that.index);
          }else{
            if (that.times<that.cycle) {
              that.speed -= 10;
            }else if(that.times==that.cycle) {
              // var index = Math.random()*(that.count)|0;
              that.prize = 4;  
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
