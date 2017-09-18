/**
 * create by dony in 2017.03.10
 * **/
import { Group, Cell, Icon, CellBox, XNumber, XInput } from 'vux';

import Popup from "../../vux-fix/popup.vue";
import confirm from './confirm.vue';
import popup from '../../../common/js/module/popup.js';

export default {
    data () {
        return {
          serverShow: false,
          //多个活动
          activityShow: false,
          //对规格弹框
          cartModal: false,
          //弹框中的商品数量
          isOver: false,
          activitySendShow: false,
          activitySendList: [],
          actInfo: null,
          cartNum: 1,

          telVal: 0,
          tipsShow: false,
          dialogText: '',
          bounsShow: false,
          scrollTop: 0,
          allPrice: 0,
          modalHeight: `${window.innerHeight * 0.65}px`
        }
    },
    props: ['activityinfo','activityslist','activitynum','goodslimitnum',
        'dataseller', 'goodsmodalobj', 'datarepresentid','isclose', 'seckill' ,'visitorstatus',
        'goodstags','handlechangenum', 'relativegoodslist', 'activityurl','infoobj',
        'actendtime','isshowactive', 'islimitnum','goodstatusonsale','goodstatus','activityindex'],
    created () {
      let that =this;
      this.$root.eventHub.$on('time_over',(isover) => {
          that.isOver = isover;
      });
      this.$root.eventHub.$on('finalPrices',(finalPrice) => {
        that.allPrice = finalPrice;
      });
      this.$root.eventHub.$on('xNumberBottom',(num) => {
        this.cartNum = num;
      })
    },
    watch: {
      datarepresentid: {
        handler (newInfoObj,oldInfoObj) {
          this.cartNum = 1;
        },
        deep: true,
      }
    },
    methods: {
      handleModalShow() {
        if (document.documentElement && document.documentElement.scrollTop) {
          this.scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          this.scrollTop = document.body.scrollTop;
        }
        document.body.style.top = -this.scrollTop + 'px';
        document.body.classList.add("bodyFix");

      },
      handleModalHide() {
        document.body.classList.remove("bodyFix");
        document.body.scrollTop = this.scrollTop;
      },
        handleActivity () {
            this.activityShow = !this.activityShow;
        },
        //多个赠品
        handleSend () {
            let activityslist = this.activityslist;
            if (activityslist.length) {
                if (activityslist.length > 1) {
                    this.activitySendShow = !this.activitySendShow;
                } else {
                    if (activityslist[0].command.content) {
                        window.location = activityslist[0].command.content;
                    }
                }
            } else {
                if (this.activityurl) {
                    window.location = this.activityurl;
                }
            }
        },
        handleAtySendClose () {
            this.activitySendShow = !this.activitySendShow;
        },
        handleServer () {
            this.serverShow = !this.serverShow;
        },
        handleClose () {
            this.serverShow = !this.serverShow;
        },
        handleAtyClose () {
            this.activityShow = !this.activityShow;
        },
        handleTypeClose () {
            this.cartModal = !this.cartModal;
        },
        handleBounsShow () {
          this.bounsShow = !this.bounsShow;
        },
      //红包列表
        handleBounsClose () {
          this.bounsShow = !this.bounsShow;
        },
        handleTypeModal () {
            this.cartModal = !this.cartModal;
        },
        //多规格弹框的购物数量
        handleChange (num) {
          // if (Number(this.goodslimitnum) == 0) {
          //   this.goodslimitnum = 1;
          // }
          // if (num == 1) {
          //   $(".vux-number-selector-sub").addClass("plusDisable");
          //   $(".vux-number-selector-sub path").addClass("plusPathDisable");
          // }
          // if (Number(this.goodslimitnum) == Number(num)) {
          //     if (Number(num) != 1) {
          //     }
          //     $(".vux-number-selector-plus").addClass("plusDisable");
          //     $(".vux-number-selector-plus path").addClass("plusPathDisable");
          // } else {
          //     $(".vux-number-selector-plus").removeClass("plusDisable");
          //     $(".vux-number-selector-plus path").removeClass("plusPathDisable");
          // }
          this.$emit('change-cartnum',num);
          this.cartNum = num;
          this.$root.eventHub.$emit('xNumberActive',num);
        },
        handleTypes (items, item, e) {
            if (item.isDisabled) {
                return;
            }
            this.$emit('change-type',item);
        },
        handleModalConfirm (e) {
          if (!window.navigator.onLine) {
            popup.toast('网络不太顺畅哦~');
            return;
          }
          let dataId = e.target.getAttribute('dataid');
          let isClose = e.target.getAttribute('isclose');
          // if (isClose) {
          //     this.cartModal = !this.cartModal;
          // }

          //新增
          if (this.infoobj.isComingActivity) {
            let contText;
            if (this.visitorstatus == '3') {
              contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
            } else {
              contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购";
            }
            // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
            let okFun = () => {
              this.$emit("confirm-id",dataId, 0);
              if (isClose) {
                this.cartModal = !this.cartModal;
              }
            };
            let cancleFun = () => {
              if (isClose) {
                this.cartModal = !this.cartModal;
              }
            };
            let Title = "限时购活动预告", okText = '任性买',cancleText = "再等等";
            // popup.confirm(contText,okFun,cancleFun,Title,okText,cancleText);
            popup.confirm({
              title: Title,            // 标题（支持传入html。有则显示。）
              text: contText,             // 文本（支持传入html。有则显示。）
              okBtnTitle: okText,       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
              cancelBtnTitle: cancleText,   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
              okBtnCallback: okFun,
              cancelBtnCallback: cancleFun,
            });
          } else {
            this.$emit("confirm-id",dataId, 0);
            if (isClose) {
              this.cartModal = !this.cartModal;
            }
          }

          // this.$emit("confirm-id",dataId, 0);
        },
        handleModalCart (e) {
          if (!window.navigator.onLine) {
            popup.toast('网络不太顺畅哦~');
            return;
          }
          let dataId = e.target.getAttribute('dataid');
          let isClose = e.target.getAttribute('isclose');
          // if (isClose) {
          //     this.cartModal = !this.cartModal;
          // }

          //新增
          if (this.infoobj.isComingActivity) {
            let contText;
            if (this.visitorstatus == '3') {
              contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
            } else {
              contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购";
            }
            // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
            let okFun = () => {
              this.$emit("confirm-id",dataId, 1);
              if (isClose) {
                this.cartModal = !this.cartModal;
              }
            };
            let cancleFun = () => {
              if (isClose) {
                this.cartModal = !this.cartModal;
              }
            };
            let Title = "限时购活动预告", okText = '任性买',cancleText = "再等等";
            // popup.confirm(contText,okFun,cancleFun,Title,okText,cancleText);
            popup.confirm({
              title: Title,            // 标题（支持传入html。有则显示。）
              text: contText,             // 文本（支持传入html。有则显示。）
              okBtnTitle: okText,       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
              cancelBtnTitle: cancleText,   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
              okBtnCallback: okFun,
              cancelBtnCallback: cancleFun,
            });
          } else {
            this.$emit("confirm-id",dataId, 1);
            if (isClose) {
              this.cartModal = !this.cartModal;
            }
          }

            // this.$emit('confirm-id',dataId, 1);
        },
        //串商品
        handleRelativeGoods (item, list, e) {
            if (item.onSale == '0') {
                return;
            }
            this.$emit("relative-goods",item);
        },

        handleLook () {
            location.href = "/";
        },
        handleTips () {
            if (window.loginTel) {
                this.getUrl(window.loginTel);
            } else {
                this.tipsShow = !this.tipsShow;
            }
        },
        getUrl (tel) {
            let that = this;
            let data = {
                "c": "goods",
                "a": "save_goods_stock_remind",
                "goodId": this.datarepresentid,
                "tel": tel,
                "logRefererPage": "goods_detail",
                "logRefererLocation": "guess"
            }
            $.ajax({
                url: '/index.php',
                type: "GET",
                dataType: "JSON",
                data,
                success (res) {
                    if (res.error_code) {
                      popup.toast(res.error_msg,3000);
                    } else {
                      popup.toast(res.error_msg,3000);
                    }
                },
                error (err) {
                    console.log(err);
                }
            })
        },
        handleConfirm () {
            this.getUrl(this.telVal);
            this.tipsShow = false;
        },
        handleConfirmCancel () {
          this.tipsShow = false;
        },
        hadleBlur (val) {
            this.telVal = val;
        },
        handleServices (item) {
            if (item.command.content) {
              location.href = item.command.content;
            } else if (item.servicePolicyRtf) {
                $(".dialogCont").animate({"right":"100%"},500);
                this.dialogText = item.servicePolicyRtf;
            }
        },
        handleBack() {
            $(".dialogCont").animate({"right": 0},500);
        },
        //点击立即购买
        handleBuy (e) {
          if (Number(this.goodstatus.goodsStocks) <= 0) {
            return;
          }
          let goodId = e.target.getAttribute('dataid');

          this.$emit('confirm-id',goodId, 1);
        },
    },
    components: {
        Group: Group,
        Cell: Cell,
        Icon: Icon,
        Popup: Popup,
        CellBox: CellBox,
        XNumber: XNumber,
        confirm: confirm,
        XInput: XInput,
    }
}
