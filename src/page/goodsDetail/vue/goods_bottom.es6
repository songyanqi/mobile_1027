/**
 * create by dony in 2017.03.13
 **/
import {  Group, Cell, XNumber,
  Scroller, XInput } from 'vux';

import Popup from "../../vux-fix/popup.vue";
import confirm from './confirm.vue';
import popup from '../../../common/js/module/popup.js';

const GoodsBottom = {
    components: {
      Popup: Popup,
      Group: Group,
      Cell: Cell,
      XNumber: XNumber,
      Scroller: Scroller,
      confirm: confirm,
      XInput: XInput,
    },
    props: ['goodstatus','goodstatusonsale','goodstags', 'ismultigoods','goodslimitnum',
        'goodsmodalobj', 'datarepresentid','isclose', 'handlechangenum',
        'mayyoulikelist','relativegoodslist', 'cartnum', 'visitorstatus','infoobj',
        'actendtime','isshowactive','islimitnum','spread','seckill',"parentid"],
    data: () => {
        return {
          cartModal: false,
          //购车数量
          cartNum: 1,
          //推荐展开和拉起
          isSlide: true,
          isOver: false,
          tipsShow: false,
          telVal: 0,
          cartUrl: cartURL,
          collected: 0,
          //弹框是否是点击立即购买跳出来的
          isBuyModal: false,
          allPrice: 0,
          modalHeight: `${window.innerHeight * 0.65}px`,
          skuTop: '70px',
        }
    },
    created () {
      let that = this;
      this.$root.eventHub.$on('time_over',(isover) => {
          that.isOver = isover;
      });
      this.$root.eventHub.$on('finalPrices',(finalPrice) => {
        that.allPrice = finalPrice;
      });
    },

    methods: {
      //弹框弹出时，给body添加position:fixed；width: 100%;并且让body跳到当前位置。
      handleModalShow() {
        if (document.documentElement && document.documentElement.scrollTop) {
          this.scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          this.scrollTop = document.body.scrollTop;
        }
        document.body.style.top = -this.scrollTop + 'px';
        document.body.classList.add("bodyFix");

      },
      //弹框消失时
      handleModalHide() {
        document.body.classList.remove("bodyFix");
        document.body.scrollTop = this.scrollTop;
      },
      handleGuess (item) {
        location.href = item.command.content;
      },
      //收藏
      handleCollect (e) {
          $.ajax({
              url: collectURL,
              type: 'GET',
              dataType: 'JSON',
              data: {
                  id: this.parentid,
                  collect: this.goodstatus.collected == 0 ? 1 : 0
              },
              success: (result) => {
                  if (result.error == -1) {
                      window.location.href = result.url;
                  } else if (result.error) {
                    popup.toast(result.msg,3000);

                  } else {
                    this.showToast = true;
                    if (this.goodstatus.collected == 0) {
                        this.goodstatus.collected = 1;
                      popup.toast("收藏成功",3000);
                    } else {
                        this.goodstatus.collected = 0;
                      popup.toast("取消成功",3000);
                    }
                  }
              },
              error (error) {
                  console.log(error);
              }
          })
      },
      //多个商品时弹框
      handleAddCart () {
        if (!window.navigator.onLine) {
          popup.toast('网络不太顺畅哦~');
          return;
        }
        if (this.infoobj.isComingActivity) {
          let contText;
          if (this.visitorstatus == '3') {
            contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
          } else {
            contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购";
          }
          // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
          let okFun = () => {
            //立即购买是否跳出弹框
            this.isBuyModal = false;
            this.cartModal = !this.cartModal;
          };
          let cancleFun = () => {

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
          //立即购买是否跳出弹框
          this.isBuyModal = false;
          this.cartModal = !this.cartModal;
        }

        //立即购买是否跳出弹框
        // this.isBuyModal = false;
        //
        // this.cartModal = !this.cartModal;
      },
      //立即购买没选择时
      handleAddCartBuy () {
        if (!window.navigator.onLine) {
          popup.toast('网络不太顺畅哦~');
          return;
        }
        if (this.infoobj.isComingActivity) {
          let contText;
          if (this.visitorstatus == '3') {
            contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
          } else {
            contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购";
          }
          // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
          let okFun = () => {
            //立即购买是否跳出弹框
            this.isBuyModal = true;
            this.cartModal = !this.cartModal;
          };
          let cancleFun = () => {

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
          //立即购买是否跳出弹框
          this.isBuyModal = true;
          this.cartModal = !this.cartModal;
        }
      },
      // 点击单个商品的加入购物车
      handleSingleCart() {
        if (!window.navigator.onLine) {
          popup.toast('网络不太顺畅哦~');
          return;
        }
        if (this.infoobj.isComingActivity) {
          let contText;
          if (this.visitorstatus == '3') {
            contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
          } else {
            contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购";
          }
          // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
          let okFun = () => {
            //立即购买是否跳出弹框
            this.$emit('confirm-id','', 0);
          };
          let cancleFun = () => {

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
          //立即购买是否跳出弹框
          this.$emit('confirm-id','', 0);
        }
      },
      // 立即付定金,bottom下面的按钮
      handleModalPresale () {
        if (!window.navigator.onLine) {
          popup.toast('网络不太顺畅哦~');
          return;
        }
        if (Number(this.goodstatus.goodsStocks) <= 0) {
          return;
        }
        if (this.ismultigoods) {
          this.isBuyModal = true;
          this.cartModal = !this.cartModal;
        } else {
          this.$emit('confirm-id','', 1);
        }
      },
      change (num) {
          if (Number(this.goodslimitnum) == 0) {
            this.goodslimitnum = 1;
          }
          if (num == 1) {
            $(".vux-number-selector-sub").css({"background":"#eee"});
            $(".vux-number-selector-sub path").css({"fill":"#bbb","stroke":"#bbb"});
          } else {
            $(".vux-number-selector-sub").css({"background":"#fff"});
              $(".vux-number-selector-sub path").css({"fill":"#666","stroke":"#666"});
          }
          if (Number(this.goodslimitnum) == Number(num)) {
              if (Number(num) != 1) {
                  // $(".isLimit").animate({"opacity":"1"},200);
                  $(".isLimit").addClass("isLimitShow");
              }
              $(".vux-number-selector-plus").css({"background":"#eee"});
              $(".vux-number-selector-plus path").css({"fill":"#bbb","stroke":"#bbb"});
          } else {
              // $(".isLimit").animate({"opacity":"0"},200);
              $(".isLimit").removeClass("isLimitShow");
              $(".vux-number-selector-plus").css({"background":"#fff"});
              $(".vux-number-selector-plus path").css({"fill":"#666","stroke":"#666"});
          }
           this.$emit('change-cartnum',num);
          this.cartNum = num;
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
        if (isClose) {
            this.cartModal = !this.cartModal;
        }

        //立即购买是否跳出弹框，区分是加入购物车还是立即购买
        if (this.isBuyModal) {
          this.$emit("confirm-id",dataId, 1);
        } else {
          this.$emit("confirm-id",dataId, 0);
        }
      },
      //关闭弹窗
      handleClose () {
          this.cartModal = !this.cartModal;
      },
      handleBuy (e) {
        if (!window.navigator.onLine) {
          popup.toast('网络不太顺畅哦~');
          return;
        }
        if (Number(this.goodstatus.goodsStocks) <= 0) {
          return;
        }
        let goodId = e.target.getAttribute('dataid');


        //新增的
        if (this.infoobj.isComingActivity) {
          let contText;
          if (this.visitorstatus == '3') {
            contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
          } else {
            contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购";
          }
          // let contText = "此商品将在"+ this.infoobj.comingBegTime +"参加限时购会员返现¥"+ this.infoobj.comingActIncome +"";
          let okFun = () => {

            if (this.seckill) {
              if (this.ismultigoods) {
                this.cartModal = !this.cartModal;
              } else {
                this.$emit('confirm-id', goodId, 1);
              }
            } else {
              this.cartModal = !this.cartModal;
            }
            this.isBuyModal = true;
          };
          let cancleFun = () => {

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
          if (this.seckill) {
            if (this.ismultigoods) {
              this.cartModal = !this.cartModal;
            } else {
              this.$emit('confirm-id', goodId, 1);
            }
          } else {
            this.cartModal = !this.cartModal;
          }
          this.isBuyModal = true;
        }
      },
      //点击推荐收起和展开
      handleRecommendGoods () {
          $(".other_goods").slideToggle();
          $(".self-mask").toggleClass("vux-popup-show");
          this.isSlide = !this.isSlide;

          if (this.isSlide)  {
              this.$emit('mask-modal',1);
          } else {
              this.$emit('mask-modal',0);
          }
      },
      handleMask () {
          $(".other_goods").slideUp();
          $(".self-mask").removeClass("vux-popup-show");
          this.isSlide = !this.isSlide;
      },
      //串商品
      handleRelativeGoods (item, list, e) {
          if (item.onSale == '0') {
              return;
          }
          this.$emit("relative-goods",item);
      },
      //推广
      handleSpread (e) {
          window.location = this.spread;
      },
      //到货提醒ajax
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
                  popup.toast(res.error_msg);
                } else {
                  popup.toast(res.error_msg);
                }
              },
              error (err) {
                  console.log(err);
              }
          })
      },
      //到货提醒
      handleTips () {
          if (window.loginTel) {
              this.getUrl(window.loginTel);
          } else {
              this.tipsShow = !this.tipsShow;
          }
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
      //再逛逛；
      handleLook () {
          window.location.href = '/';
      },
      // 预定商品跳转链接
      handlePresale () {
        location.href = this.infoobj.goPayAdvance.payUrl;
      }
    },
};
export default GoodsBottom;
