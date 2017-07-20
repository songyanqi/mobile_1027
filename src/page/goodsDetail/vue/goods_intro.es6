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
          infoObj: {}
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
        },
        deep: true,
      }
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
    },
    components: {
    }
}
