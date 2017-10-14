<style  lang="sass"  rel="stylesheet/scss">
  
</style>
<template>
	<div class = "luckDraw">
    <div class = "luckTitle">会员订单支付金额累计每满500元可抽奖一次</div>
    <div class = "luckNumNav">您有{{ luckNum }}次抽奖机会</div>
    <div class = "luckCont" id="lottery">
      <table border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td class="lottery-unit lottery-unit-0"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/avatar_poster/1018money.png"></td>
      <td class="lottery-unit lottery-unit-1"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/avatar_poster/1018money1.png"></td>
      <td class="lottery-unit lottery-unit-2"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/avatar_poster/luckbtn.png"></td>
      <td class="lottery-unit lottery-unit-3"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/avatar_poster/meme_icon.png"></td>
    </tr>
    <tr>
      <td class="lottery-unit lottery-unit-11"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/avatar_poster/mysterious_icon.png"></td>
      <td colspan="2" rowspan="2"><a href=""></a></td>
      <td class="lottery-unit lottery-unit-4"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/avatar_poster/renxing_icon.png"></td>
    </tr>
    <tr>
      <td class="lottery-unit lottery-unit-10"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/avatar_poster/suprice_icon.png"></td>
      <td class="lottery-unit lottery-unit-5"><img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/avatar_poster/thanks_icon.png"></td>
    </tr>
        <tr>
      <td class="lottery-unit lottery-unit-9"><img src="http://mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/modify_new_avatar.png"></td>
      <td class="lottery-unit lottery-unit-8"><img src="http://mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/modify_new_avatar.png"></td>
      <td class="lottery-unit lottery-unit-7"><img src="http://mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/modify_new_avatar.png"></td>
            <td class="lottery-unit lottery-unit-6"><img src="http://mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/modify_new_avatar.png"></td>
    </tr>
  </table>
    </div>
	</div>
</template>
<script type="text/javascript">
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import native from '../../../common/js/module/native.js';

  export default {
  	components: {

  	},
  	data () {
  		return {
  			luckNum: 0,

        index:-1,
        count:0,
        timer:0,
        speed:20,
        times:0,
        cycle:50,
        prize:-1,
  		}
  	},
    props: [],
  	created() {
  		// this.getData();
      this.init();
  	},
    mounted() {

    },
  	watch: {
      
  	},
  	methods: {
      getData() {
        lottery.init('lottery');
        $("#lottery a").click(function(){
          if(click) {
            return false;
          }
          else{
            lottery.speed=100;
            roll();
            click=true;
            return false;
          }
        });
      },
      init(id) {
        if ($("#"+id).find(".lottery-unit").length>0) {
          $lottery = $("#"+id);
          $units = $lottery.find(".lottery-unit");
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
        if (index>count-1) {
          index = 0;
        };
        $(lottery).find(".lottery-unit-"+index).addClass("active");
        this.index=index;
        return false;
      },
      stop(index) {
        this.prize=index;
        return false;
        console.log("this.price",this.prize);
      },
      getInit() {
        let that = this;
        that.times += 1;
          that.roll();
          if (that.times > that.cycle+10 && that.prize==that.index) {
            clearTimeout(that.timer);
            that.prize=-1;
            that.times=0;
            click=false;
            console.log(that.index);
          }else{
            if (that.times<that.cycle) {
              that.speed -= 10;
            }else if(that.times==that.cycle) {
              var index = Math.random()*(that.count)|0;
              that.prize = index;  
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
            that.timer = setTimeout(roll,that.speed);
          }
          return false;
      },





      isApp() {
        let u = navigator.userAgent;

        return !!u.match(/davdian|bravetime|vyohui/);
      },
      // 跳转方式
      handleJump(url) {
        this.isapp = this.isApp();
        if (this.isapp) {
          event.preventDefault();
          native.Browser.open({
            url: url
          });
        } else if (this.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      },
  		getData() {
  			
  		}
  	},
  }
</script>
