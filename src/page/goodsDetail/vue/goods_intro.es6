export default {
    data () {
        return {
          show: false,
          isOver: false,
          confirmTitle: '',
          confirmText: '',
          //是否为会员内容
          isMemContent: true,
          //省多少
          actTatio: 0,
          //显示的价格
          memPrice: 0,
          //未登陆显示的会员价
          unMemPrice: 0,
          //省的价格
          savePrice: 0,
          //从父组件获取的价格
          infoObj: {},
          // 倒计时
          remainTime: {
            day: '',
            hour: '00',
            minute: '00',
            second: '00',
          },
          // 是否是限时购
          isLimitBuy: false,
        }
    },
    // activitytypename去掉了
    props: ['infoobj', 'goodsname', 'shopurl', 'membercont', 'seckill', 'goodsstocknumber',
            'visitorstatus', 'singleactivity', 'isshowactive','actendtime','isshowa','isshowb'],
    created () {
        let that = this;
        this.$root.eventHub.$on('time_over',(isover) => {
            that.isOver = isover;
          if (that.isOver) {
            that.memPrice = that.infoobj.shopPrice;
            this.initMember(this.infoObj);
          }
        });
    },
    watch: {
      infoobj: {
        handler (newInfoObj,oldInfoObj) {
          this.infoObj = newInfoObj;
          this.initMember(newInfoObj);
          if (newInfoObj.isComingActivity) {
            this.isLimitBuy = true;
          }
        },
        deep: true,
      },
      goodsname: {
        handler () {
          this.initMember(this.infoObj);
          if (this.infoObj.isComingActivity) {
            this.isLimitBuy = true;
          }
        },
        deep: true,
      },
      singleactivity: {
        handler (newInfoObj,oldInfoObj) {
          this.cutDownTime(newInfoObj.lastTime);
          if (newInfoObj.typeId == '8') {
            this.isLimitBuy = true;
          }
        },
        deep: true,
      }
    },
    mounted () {
    },
    methods: {
      //会员价
      initMember (newInfoObj) {
        this.actTatio = newInfoObj.totalIncome;
        if (this.isOver) {
          this.memPrice = newInfoObj.shopPrice;
        } else {
          if (this.visitorstatus != 3) {
            this.memPrice = newInfoObj.finalPrice;
          } else {
            if (newInfoObj.memberGoods == '0') {
              this.memPrice = newInfoObj.finalPrice;
            } else {
              this.memPrice = newInfoObj.memberPrice;
            }
          }
        }

        //未登录计算会员价
        let regs = /\.[1-9]0$/ig;
        if (newInfoObj.memberGoods == '0') {
          this.unMemPrice = parseFloat(Number(this.memPrice) - Number(this.actTatio)).toFixed(2);
          if (this.unMemPrice.indexOf('.00') > -1) {
            this.unMemPrice = parseInt(this.unMemPrice);
          } else if (regs.test(this.unMemPrice)) {
            this.unMemPrice = this.unMemPrice.substring(0,this.unMemPrice.length - 1);
          }
          this.savePrice = this.actTatio;
        } else {
          this.unMemPrice = this.infoobj.memberPrice;
          if (this.memPrice == this.infoobj.memberPrice) {
            this.savePrice = parseFloat(Number(newInfoObj.finalPrice - this.unMemPrice)).toFixed(2);
          } else {
            this.savePrice = parseFloat(Number(this.memPrice - this.unMemPrice)).toFixed(2);
          }
          if (this.savePrice.indexOf('.00') > -1) {
            this.savePrice = parseInt(this.savePrice);
          } else if (regs.test(this.savePrice)) {
            this.savePrice = this.savePrice.substring(0,this.savePrice.length - 1);
          }
        }
      },
      //成为会员的链接
      handleMember () {
          window.location = this.shopurl;
      },
        //会员弹框
      showMember () {
        this.isMemContent = true;
        this.confirmTitle = '会员返现';
        this.confirmText = '购买商品可获得的返现金额，下单后直接返还到您的账户中，可到"我的奖励"里查看。获得的返现奖励可用于支付平台订单或提现哦。';
        $(".tax_cont .weui-dialog").show();
        $(".tax_cont .weui-mask").show();
      },
      //税弹框
      showTags () {
        this.isMemContent = false;
        this.confirmTitle = '价格详情';
        this.confirmText = `本商品含税${this.infoobj.taxPrice}元`;
          $(".tax_cont .weui-dialog").show();
          $(".tax_cont .weui-mask").show();
      },
      handleCloseTag () {
          $(".tax_cont .weui-dialog").hide();
          $(".tax_cont .weui-mask").hide();
      },
      handleMaskTask () {
          $(".tax_cont .weui-dialog").hide();
          $(".tax_cont .weui-mask").hide();
      },
      // 倒计时
      cutDownTime (time) {
        let oneMinute = 60,
            oneHour = 60 * 60,
            oneDay = 60 * 60 * 24;

        let numTime = Number(time),that = this;
        let newTime = numTime * 1000;
        let timeStr = "";

        let timer = setInterval(() => {
          if (numTime > 0) {
            numTime--;
           // 计算显示数值
            let day = parseInt(numTime / oneDay);
            let hour = parseInt(numTime % oneDay / oneHour);
            let minute = parseInt(numTime % oneDay % oneHour / oneMinute);
            let second = parseInt(numTime % oneDay % oneHour % oneMinute);

            that.remainTime.day = day >= 10 ? day : `${day}`;
            that.remainTime.hour = hour >= 10 ? hour : `0${hour}`;
            that.remainTime.minute = minute >= 10 ? minute : `0${minute}`;
            that.remainTime.second = second >= 10 ? second : `0${second}`;
          } else {
            clearInterval(timer);
            that.isOver = true;
            that.$root.eventHub.$emit('time_over',that.isOver);
            that.memPrice = that.infoobj.shopPrice;
            // 会员返的价格还没变
            
            // that.initMember(that.infoObj);
          }
        },1000);
      },
    },
    components: {
    }
}
