/**
 * create by dony in 2017.3.12
 */
import {Group, Cell, Tab, TabItem, Alert, Loading, Spinner} from 'vux';

// 页面打开时
import base from '../../../../utils/base.es6';
import common1 from '../../../../module/common/common.es6';
import native from '../../../common/js/module/native.js';
import confirm from './confirm.vue';
import popup from '../../../common/js/module/popup.js';
import share from '../../../common/js/module/share.js';
import {isTryShop} from "../../../../utils/utils.es6";

require('babel-polyfill');

window.tj_path = "detail";
base.init();
//引入utils.es6;
// import Utils from "../../../../utils/utils.es6";
import layout from "../../../../module/index/layout.es6";

import GoodsTop from './goods_top.vue';
import GoodsSwiper from './goods_swiper.vue';
import GoodsIntro from './goods_intro.vue';
import ActivityTypes from './activity_types.vue';
import GoodsEvaluate from './goods_evaluate.vue';
import GoodsBottom from './goods_bottom.vue';
import GoodsParams from './goods_params.vue';
import DetailPic from './detail_pic.vue';
import BrandType from './brand_type.vue';
import noFindGoods from './nofind_goods.vue';
import vueLazyload from '../../../common/js/module/vueLazyload.js';
import api from '../../../../utils/api.es6';

import ua from '../../../common/js/module/ua.js';

vueLazyload.init(true);

export default {
  data() {
    return {
      response: null,
      goodListTitle: ['商品详情'],
      selectedTitle: '商品参数',
      detailListTitle: ['图文详情', '商品参数'],
      detailListNav: ['图文详情'],
      detailTitle: '图文详情',
      brandType: '1',
      //第一个tab
      index: 0,
      isShow: true,
      detailIndex: 0,

      goodsImgList: [],
      swiperInfo: {},
      trendName: '',
      trendAvatar: '',
      trendInfo: '',

      goodsName: '',
      // 是否是预定善品也放到这里面了
      infoObj: {
        isActivity: false,
        //是否有预告活动
        isComingActivity: false,
        presale: null,
      },

      activityNum: 0,
      activityName: '',
      activityTypename: '',
      activityUrl: '',
      activityInfo: {},

      //商家信息
      dataSeller: null,
      //图文详情
      picDetails: null,

      //评论
      commentObj: {},
      //品牌
      brandList: [],

      //商品参数
      goodsParamName: '',
      goodsParamType: '',
      goodsParamObj: [],

      //是否上架
      goodStatus: {},
      goodStatusonSale: 1,

      //活动开始结束时间
      isShowActive: 0,
      actBeginTime: 0,
      actEndTime: 0,
      //显示时间的整个活动
      singleActivity: null,

      //tags
      goodsTags: [],
      //改变后的goodsTags,单一的一个tag，每次点击清空
      changeSingletags: [],
      //为true的tag
      selectedTag: [],
      //把跟选中后有关的剩下的tag放到这里，每次点击清空
      selectedTagList: [],

      //数据中的data.extra.dataList
      dataExtraList: '',
      dataBasis: '',
      dataRepresentId: '',
      goodsList: [],
      //判断是否为多规格商品
      isMultiGoods: false,

      //多规格弹框里的
      goodsModalObj: {},
      isClose: true,
      //弹框中的商品数量
      handleChangeNum: 1,
      //购物车标签上的数量
      cartNum: 0,
      //是否超过限购或者库存数量
      goodsLimitNum: 1,
      isLimitNum: false,
      loadingShow: false,
      confirmShow: false,
      confirmMsg: '',
      //confirm
      cancelText: '取消',
      confirmText: '确定',

      //猜你喜欢
      mayYouLikeList: null,
      mayYouLikeNoMore: false,
      isFirstLoad: true,
      //猜你喜欢传参
      mayLikeData: null,
      //是推荐商品时为tue,然后请求猜你喜欢，不然不请求
      isRecommend: false,

      //是否显示开店提示
      isPrompt: true,
      shopUrl: '',
      shopMemo: '',
      //是否是卖家
      visitorStatus: 1,

      //串商品
      relativeGoodsList: [],
      //动态条
      trendsList: [],
      //判断是否在app中
      isApp: false,
      //推广
      spread: '',
      activitysList: [],
      activityIndex: 0,
      // secKill: true,
      secKill: false,
      //商品图片
      cartGoodsImg: '',
      isDev: true,
      //商品页面是否存在
      isGoods: false,
      //titleBar改变
      isChange: false,
      parentId: 0,
      isMiddleTab: false,
      loadBefore: true,

      firstScreenFinish:false,
      type: 'ios',
      memberCont: {
        memberGoods: '',
        memberPrice: ''
      },
      //库存
      goodsStockNumber: 0,
      trendTime: null,
      timeHide: null,
      timeShow: null,
      videoObj: {},
      //有预告的活动
      isComingActive: 0,
      singleComeActivity: null,
      //六一八
      isShowa: false,
      isShowb: false,
      backTop: 0,
      //图文详情
      minHeight: window.innerHeight - 128,
      //分享卡id
      sellerId: "",
      goodsId: "",
      goodsDataBasis: null,
    }
  },
    created () {
      this.getUrl();
        $(window).scroll(() => {
          let topHead = $(".top_h_s_to");
          let scrollTop = $(window).scrollTop();

          topHead.css({"opacity": scrollTop * 0.01 < 1 ? scrollTop * 0.01 : 1});
          this.isChange = scrollTop * 0.01 > 1;

          $(".top_h_s").css({"background": "rgba(250,250,250,"+ 0.01 * scrollTop +")"})
          sessionStorage['goodsPagePos'] = scrollTop;
        });
      if (window.appData){
        window.appData.isAudioAbsorb = 1
        window.appData.isShowAudio = 1
      } else {
        window.appData = {
          'isAudioAbsorb':1,
          'isShowAudio':1
        }
      }
      this.getCartNum();
      this.getIsApp();
    },
    mounted () {
    },
    methods: {
      dumpToMamaAdviser() {
        if(isTryShop()){
            api('/api/mg/auth/inviter/checkAdviser', {
              dataType: "json",
              type: "post"
            }).then(function (result) {
              if (!result.code && result.data.needPop) {
                popup.specialAlert({
                  title: "<div style='width: 1.51rem;margin-left: auto;margin-right: auto;margin-top: -0.5rem;'><img src='http://pic.davdian.com/free/2017816/mamaguwen.png'></div>",
                  text: " <div style='text-align:left'>亲爱的大V妈妈，我们将给您分配一个1对1服务的妈妈顾问，您有任何关于购物、学习、育儿、活动等疑问，都可以向她寻求帮助</div>",
                  btnTitle: "马上选择",
                  btnCallback() {
                    location.replace('/choose_mama_adviser.html')
                  }
                })
              }
            })
              .catch(function (error) {
                console.log('error:', error)
              })

        }
      },
      getUrl () {
          if (this.isDev) {
            const locationUrl = window.location.href;
            let goods = locationUrl.match(/(\d+)\.html/ig)[0],
                goodsIdLen = goods.length,
                goodsId = goods.substring(0, goodsIdLen - 5);
            let query = {};
            if (locationUrl.indexOf('search_result') === -1) {
                query = {
                    goodsId,
                    searchKey: '',
                }
            } else {
                query = {
                    goodsId,
                    searchKey: 'search_result'
                }
            }
          this.getData(query);
          } else {
            this.getData();
          }
        },
        //判断是否在app中。isIOS
        getIsApp () {
            // this.isApp = Utils.utils.isApp();
          this.isApp = !!navigator.userAgent.match(/davdian|bravetime|vyohui/);
        },
        //购物车icon上的数量
        getCartNum () {
            const that = this;
            $.ajax({
                type : "POST",
                url : layout.config.cart,
                data : layout.strSign('cartNum'),
                dataType: 'JSON',
                success (res) {
                    if (res.code === 0) {
                        that.cartNum = res.data.goodsNum;
                    } else {
                      popup.toast(res.data.msg,3000);
                    }
                }
            });
        },
        //关闭开店提示
        handleClosePrompt () {
            this.isPrompt = false;
            this.isMiddleTab = false;
            $(".parmas_title").css({"top":0});
        },
        //加载mayyoulike
        handleMayYouLike () {
            if (this.isFirstLoad && !this.isRecommend) {
                if (this.mayLikeData) {
                    this.getYouLikeDate(this.mayLikeData);
                }
                this.isFirstLoad = false;
            }
        },
    //加入购物车动画
    addCartAnimate () {
        let imgUrl = this.cartGoodsImg;

      let goodsImg = $('<img class = "hideImg" src = ' + imgUrl + '>');
      $("body").append(goodsImg);
      $(".hideImg").animate({
        width: "10px",
        height: '10px',
        bottom: "35px",
        left: "10%",
        "margin-left": "0px"
      }, 800, () => {
        goodsImg.remove();
      });
    },
    //第一个tab,优化了
    handleChangeTab() {
      let goodsPagePos = window.sessionStorage.getItem("goodsPagePos");
      if (goodsPagePos > 200) {
        $('html,body').animate({scrollTop: 0}, 500);
      }
    },
    isMobile() {
      let ua = navigator.userAgent;
      return !!ua.match(/Mobile/i);
    },
  // 跳转方式
    handleJump(url) {
      // this.isapp = this.isApp();
      if (this.isApp) {
        native.Browser.open({
          url: url
        });
      } else if (this.isMobile()) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_self');
      }
    },
    //加入购物车封装的ajax;
    cartAjax(isBuy) {
      let that = this;
      if (!this.secKill) {
        if (isBuy == 1) {
          // 购买就直接跳走
          let goods = encodeURI(`goods[0][id]=${this.dataRepresentId}&goods[0][number]=${this.handleChangeNum}`);
          setTimeout(() => {
            
            window.location.href = `/${buyURL}&${goods}`;
            // that.handleJump(`/${buyURL}&${goods}`);
          }, 500);
          return;
        }
      }

      this.loadingShow = true;
      let goods = {
        number: this.handleChangeNum,
        goods_id: this.dataRepresentId
      };
      $.ajax({
        url: addURL,
        type: "POST",
        dataType: 'JSON',
        data: {goods: JSON.stringify(goods)},
        success: (data) => {
          that.loadingShow = false;
          if (data.error > 0) {
            if (data.error == 2) {
              that.confirmShow = true;
              that.confirmMsg = '商品已经在购物车中';
              that.confirmText = "再逛逛";
              that.cancelText = '去购物车';
            } else {
              popup.toast(data.message, 3000);
              if (data.url) {
                setTimeout(() => {
                  window.location = data.url;
                }, 500);
              }
            }
          } else {
            if (isBuy == '0') {
              that.addCartAnimate();
            } else {
              that.loadingShow = false;

              popup.toast('跳转中', 3000);
              // 购买就直接跳走,不是秒杀跳到购物车
              setTimeout(() => {
                window.location = secURL;
              }, 500);
            }
            that.cartNum = data.cart_number;
          }
        },
        error: (error) => {
          that.loadingShow = false;

          popup.toast(error.message, 3000);
        }
      })
    },
    //点击规格后的事件
    handleChangeType(value) {
      const that = this;
      //判断是否关闭弹框
      if (value.isActive) {
        this.isClose = false;
      } else {
        this.isClose = true;
      }
      //每次点击清空
      that.selectedTag = [];
      //清空就可以得到单一的勒
      that.changeSingletags = [];
      that.selectedTagList = [];
      //清空活动
      that.singleActivity = null;
      that.infoObj.isComingActivity = false;

      //更新全部的goodsTags，使其只有每个规格只有一个为true的
      this.goodsTags.map((item) => {
        //根据添加的parentId令这一类的isActive都为false
        if (item.id === value.parentId) {
          item.detail.map((list) => {
            if (list.id !== value.id) {
              list.isActive = false;
            }
          });
        }
        item.detail.map((list) => {
          if (list.id === value.id) {
            if (!value.isActive) {
              list.isActive = true;
            } else {
              list.isActive = false;
            }
          }
        });
      });
      //更新后的再判断是isActive是否为true就好了。
      this.goodsTags.map((item) => {
        item.detail.map((list) => {
          if (list.isActive) {
            that.selectedTag.push(list);
            //弹框中的选中
            that.goodsModalObj.goodsType = that.selectedTag;
          }
        })
      });

      //点击后representId也改变,位置不可改变
      let addSelectedTag = [];
      that.selectedTag.map((item) => {
        addSelectedTag.push(item.id);
      });

      // addSelectedTag = addSelectedTag.join(":");
      // that.goodsList.map((item) => {
      //     if (item.tag === addSelectedTag) {
      //         that.dataRepresentId = item.goodsId;
      //     } else {
      //         //如果规格没选够的话是否让dataRepresentId为空
      //         // that.dataRepresentId = 0;
      //     }
      // });
      that.goodsList.map((item) => {
        let listTag = item.tag.split(':'), listNum = 0;
        listTag.map((list) => {
          if (addSelectedTag.indexOf(list) != -1) {
            listNum++;
          }
        })
        if (listNum == addSelectedTag.length) {
          that.dataRepresentId = item.goodsId;
        }
      });

      //点击后判断是否置灰
      that.getDisabled(that.dataExtraList, that.goodsTags);
      if (that.dataRepresentId) {
        let dataExtra, that = this;
        this.dataExtraList.map((item) => {
          if (Number(item.goodsId) == Number(that.dataRepresentId)) {
            dataExtra = item;
          }
        });

        if (dataExtra) {
          //限购或者库存数量
          that.getChanges(dataExtra);
        } else {
          // that.getDataExtra(dataBasis);
        }
      }
    },
    //弹框中的数量改变
    handleCartNum(nums) {
      if (Number(this.goodsLimitNum) > Number(nums)) {
        this.handleChangeNum = Number(nums);
        this.isLimitNum = false;
      } else {
        this.handleChangeNum = Number(this.goodsLimitNum);
        this.isLimitNum = true;
      }
    },
    //点击弹框的确定后得到商品id,传goodsId和不传一样
    handleConfirmId(goodId, isBuy) {
      let isTitle, that = this;
      //二维数组判断其中二维数组中的一个都为false的时候，退出
      this.goodsTags.map((item, index) => {
        let itemArray = [];
        item.detail.map((list, idx) => {
          itemArray.push(list.isActive);
        });
        if (itemArray.indexOf(true) === -1) {
          isTitle = item.title;
        }
      });
      if (isTitle) {
        popup.toast('请选择' + isTitle, 3000);
        this.isClose = false;
      } else {
        that.cartAjax(isBuy);
        this.isClose = true;
      }
    },
    //点击串商品
    relativeGoods(list) {
      this.handleChangeNum = 1;

      const locationUrl = window.location.href;
      this.goodsTags = [];
      let query = {};
      if (locationUrl.indexOf('search_result') === -1) {
        query = {
          goodsId: list.id,
          searchKey: '',
        }
      } else {
        query = {
          goodsId: list.id,
          searchKey: 'search_result'
        }
      }
      this.getData(query);
    },
    getData(querys) {
      const that = this;
      let dataObj, type;

      if (this.isDev) {
        dataObj = layout.strSign("goodsDetailData", querys);
        type = "POST";
      } else {
        dataObj = "";
        type = "GET";
      }

      $.ajax({
        type: type,
        url: detailURL,
        data: dataObj,
        dataType: 'JSON',
        success(res) {
          that.loadBefore = false;

          //清空，不然有串商品会一直添加
          that.relativeGoodsList = [];
          that.goodsImgList = [];
          that.selectedTag = [];
          that.selectedTagList = [];
          that.brandList = [];
          that.goodsModalObj = {};
          that.isPrompt = false;
          that.spread = '';
          that.trendsList = [];
          that.videoObj = {};

          if (res.code == 15020) {
            that.isGoods = true;
            return;
          }
          if (res.code == 0) {
              let data = res.data,
                  dataExtra,
                  dataComment = data.comments,
                  goodsStockSales = data.extra.parent,
                  dataBasis = data.basis;

              that.goodsDataBasis = data.basis;
              that.response = res;
              //分享卡
              that.sellerId = data.shop.sellerId.toString();
              that.goodsId = data.representId == '0' ? dataBasis.goodsId : data.representId;

              //六一
              /*if (Number(res.sys_time) * 1000 > 1497369600000 && Number(res.sys_time) * 1000 < 1497456000000) {
                that.isShowa = true;
              } else {
                that.isShowa = false;
              }
              if (Number(res.sys_time) * 1000 > 1497456000000 && Number(res.sys_time) * 1000 < 1497888000000) {
                that.isShowb = true;
              } else {
                that.isShowb = false;
              }*/

              //商品轮播图
              that.goodsImgList.push({
                img: dataBasis.goodsImg,
              });
              dataBasis.pictures.map((item, index) => {
                that.goodsImgList.push({
                  img: `${item.imgUrl}`,
                });
              });
              //modal添加图片
              that.infoObj.goodsShortPic = dataBasis.goodsImg;

              //图文详情新增视频
              let detailPic = [];
              dataBasis.details.map((item) => {
                if (item.detailType == "1") {
                  detailPic.push(item);
                } else if (item.detailType == "2") {
                  that.videoObj.videoUrl = item.detailUrl;
                  that.videoObj.videoImage = item.videoImage;
                } else if (item.detailType == "3") {
                  that.videoObj.videoIframe = item.detailUrl;
                }
              })
              //图文详情
              that.picDetails = detailPic;
              // that.picDetails = dataBasis.details;

              //收藏Id
              if (dataBasis.parentId == '0') {
                that.parentId = dataBasis.goodsId;
              } else {
                that.parentId = dataBasis.parentId;
              }

              that.cartGoodsImg = dataBasis.goodsThumb;
              //开店提示
              if (data.shop && data.shop.shopGoods.shopGoodsMemo.length) {
                that.isPrompt = true;
              } else {
                that.isPrompt = false;
              }

              that.shopUrl = data.shop.shopGoods.command.content;
              that.shopMemo = data.shop.shopGoods.shopGoodsMemo;

              that.visitorStatus = res.visitor_status;
              //推广地址
              if (data.spread) {
                that.spread = data.spread.command.content;
              }
              Vue.nextTick(function () {
                that.firstScreenFinish = true;

                //串商品
                if (dataBasis.kinds) {
                  dataBasis.kinds.map((item, index) => {
                    if (item.onSale != '0') {
                      that.relativeGoodsList.push({
                        id: item.id,
                        onSale: item.onSale,
                        isActive: item.id == dataBasis.goodsId,
                        title: item.title
                      });
                    }
                  })
                }
                //动态条
                if (data.trends) {
                  that.trendsList = data.trends;
                }

                //猜你喜欢传过去参数
                let cateGory = [];
                dataBasis.cats.map((item, index) => {
                  cateGory.push(item.catId);
                });
                let mayYouLikeData = {
                  goodsShortName: dataBasis.goodsShortName,
                  category: cateGory.join(","),
                  goodsId: dataBasis.goodsId
                };
                that.mayLikeData = mayYouLikeData;

                //判断representId是否为0
                if (data.representId != '0') {
                  that.dataRepresentId = data.representId;
                } else {
                  that.dataRepresentId = dataBasis.goodsId;
                }

                that.dataExtraList = data.extra.dataList;
                that.goodsList = dataBasis.childs.list;

                //商家信息
                if (data.shop) {
                  that.dataSeller = data.shop;
                } else {
                  that.dataSeller = null;
                }

                //判断是否为多规格商品
                let representTag, tagArr;

                //当不是多规格时也显示赠品标签
                if (data.extra.dataList.length) {
                  data.extra.dataList.map((list, index) => {
                    if (list.goodsId == that.dataRepresentId) {
                      //弹框中的价格
                      that.goodsModalObj.activityName = list.activity;
                      that.goodsModalObj.goodsStocks = list.sales.goodsStocks;
                    }
                  });
                }
                ;

                if (dataBasis.childs.tags && dataBasis.childs.tags.length !== 0) {
                  that.isMultiGoods = true;
                  data.extra.dataList.map((item, index) => {
                    if (item.goodsId == that.dataRepresentId) {
                      dataExtra = item;
                      representTag = item.tag;
                    }
                  });

                  //tag
                  if (dataExtra) {

                    tagArr = representTag.split(":");
                    dataBasis.childs.tags.map((item, index) => {
                      //判断数组中是否存在id，存在的话为true
                      item.detail.map((list, idx) => {
                        if (tagArr.indexOf(list.id) !== -1) {
                          list.isActive = true;
                          that.selectedTag.push(list);
                          //弹框中的选中
                          that.goodsModalObj.goodsType = that.selectedTag;
                        } else {
                          list.isActive = false;
                        }
                        //添加父id，根据父id来使这一类规格的isActivity都为false;
                        list.parentId = item.id;
                      })
                    });
                    //判断规格是否要置灰,根据是否上架、库存为0
                    that.getDisabled(data.extra.dataList, dataBasis.childs.tags);
                  }
                } else {
                  that.isMultiGoods = false;
                  dataExtra = data.extra.dataList[0];
                }

                let swiperObj = {
                  crossBorder: dataBasis.crossBorder,
                  trendsList: data.trends
                };
                that.swiperInfo = swiperObj;

                that.goodsName = dataBasis.goodsName;

                that.activityInfo.bookAuthor = dataBasis.bookAuthor;
                that.activityInfo.bookPublishing = dataBasis.bookPublishing;

                //服务
                that.activityInfo.service = dataBasis.service;
                //是否为店主
                that.activityInfo.isShopper = res.visitor_status;
                that.activityInfo.shoppUrl = res.shop_url;

                let goodsStockSale = 0;
                if (goodsStockSales.constructor != Array) {
                  goodsStockSale = goodsStockSales.goodsStocks;
                  that.infoObj.salesNumber = goodsStockSales.salesNumber;
                } else {
                  goodsStockSale = dataExtra.sales.goodsStocks;
                  that.infoObj.salesNumber = dataExtra.sales.salesNumber;
                }

                //活动
                if (dataExtra) {
                  that.getChanges(dataExtra);
                } else {
                  that.getDataExtra(dataBasis);
                }
                //快讯
                that.activityInfo.notice = data.notice;
                //评论
                if (dataComment.dataList) {
                  that.getComment(dataComment);
                }
                //品牌
                that.getBrand(dataBasis);
                // 父商品下的子商品是否有要付尾款单的
                that.getFinalPay();
                //判断是否时未上架或者无货，如果是，请求猜你喜欢的接口，
                that.getMayLike(dataExtra, that.mayLikeData);

                //动态条
                clearTimeout(that.trendTime);
                that.trendTime = setTimeout(() => {
                  that.tendsShow();
                }, 1000);

                //库存不足提示
                if (dataExtra.status.onSale == '1' && Number(goodsStockSale) < 20 && Number(goodsStockSale) > 0) {
                  $(".stock_tips_wrapper").show().animate({"top": "58", "opacity": 1}, 1000, () => {
                      setTimeout(() => {
                          $(".stock_tips_wrapper").animate({"top": "0", "opacity": 0}, 1000);
                      }, 3000)
                  });
                }
                //是否上架,让提示先隐藏，不然刷新页面会闪现出来
                if (dataExtra.status.onSale == '0') {
                  $(".goods_status_wrapper").show();
                }
              });
              //分享
              // 异步获取数据后
              window.title = dataBasis.shareGoodsName;
              window.link = location.href;
              window.imgUrl = dataBasis.shareImg.replace('pic.davdian.com','pic1.davdian.com');
              window.desc = dataBasis.shareRecommend;

              } else {
                popup.toast(res.data.msg,3000);
              }
            },
            error (err) {
                that.loadBefore = false;
            }
          })
    },
      //评论
    getComment (dataComment) {
      let commentInfo = {
          commentRate: dataComment.commentRate,
          commentNum: dataComment.commentNum,
          commentUrl: dataComment.command.content,
      };
      this.commentObj = commentInfo;
      dataComment.dataList.map((item, index) => {
          item.commentUnRate = 5 - Number(item.commentRate);
      });

      if (dataComment.dataList.length > 3) {
        this.commentObj.commentList = dataComment.dataList.slice(0, 3);
      } else {
        this.commentObj.commentList = dataComment.dataList;
      }
    },
    //品牌
    getBrand(dataBasis) {
      let that = this, brand = dataBasis.brand;
      //品牌
      if (brand.brandLogo && brand.brandName && brand.brandDesc)
        that.brandList.push({
          src: brand.brandLogo,
          title: brand.brandName,
          desc: brand.brandDesc,
          url: brand.command.content ? brand.command.content : '',
        });
      //商品参数
      that.goodsParamObj = dataBasis.attributes;
    },
    // 父商品下的子商品是否有要付尾款单的
    getFinalPay() {
      let goPayAdvanceList = [];
      this.dataExtraList.map((item) => {
        if (Object.prototype.toString.call(item.goPayAdvance) == '[object Object]') {
          goPayAdvanceList.push(item.goPayAdvance);
        }
      });

      function campare(a, b) {
        return a.addTime - a.addTime;
      };

      if (goPayAdvanceList.length) {
        if (goPayAdvanceList.length == 1) {
          this.infoObj.goPayAdvance = goPayAdvanceList[0];
        } else {
          goPayAdvanceList.sort(campare);
          this.infoObj.goPayAdvance = goPayAdvanceList[0]
        }

      }
    },
    //判断是否要置灰
    getDisabled(dataExtraList, dataBasisTags) {
      let that = this;
      //分一种或多状态的时候(颜色，大小)
      if (dataBasisTags.length > 1) {
        that.selectedTag.map((item) => {
          dataExtraList.map((list) => {
            //等于representId的不循环
            if (list.goodsId == that.dataRepresentId) {
              //弹框中的价格
              that.goodsModalObj.activityName = list.activity;
              that.goodsModalObj.goodsStocks = list.sales.goodsStocks;
              return;
            }
            let listTag = list.tag.split(":");
            //多种状态的时候(颜色，大小)
            if (listTag.indexOf(item.id) !== -1) {
              //存在再判断是否上架，0,把除了item剩下tag放到that.selectedTagList中
              if (list.status.onSale == '0') {
                listTag.map((nav) => {
                  if (nav != item.id) {
                    that.selectedTagList.push(nav);
                  }
                })
              } else {
                if (list.sales.goodsStocks <= 0) {
                  listTag.map((nav) => {
                    if (nav != item.id) {
                      that.selectedTagList.push(nav);
                    }
                  })
                }
              }
            }
          });
        });
      } else {
        dataExtraList.map((list) => {
          //等于representId的不循环
          if (list.goodsId == that.dataRepresentId) {
            //弹框中的价格
            that.goodsModalObj.activityName = list.activity;
            that.goodsModalObj.goodsStocks = list.sales.goodsStocks;
            return;
          }
          let listTag = list.tag;

          //判断是否上架，0,把除了item剩下tag放到that.selectedTagList中
          if (list.status.onSale == '0') {
            that.selectedTagList.push(listTag);
          } else {
            if (Number(list.sales.goodsStocks) <= 0) {
              that.selectedTagList.push(listTag);
            }
          }

        });
      }
      dataBasisTags.map((item) => {
        item.detail.map((list) => {
          if (that.selectedTagList.indexOf(list.id) !== -1) {
            list.isDisabled = true;
          } else {
            list.isDisabled = false;
          }
        })
      });
      that.goodsTags = dataBasisTags;
    },
    //判断是否时未上架或者无货，如果是，请求猜你喜欢的接口
    getMayLike(dataExtra, mayLikeData) {
      let that = this;
      if (dataExtra) {
        if (dataExtra.status.onSale == '1') {
          if (Number(dataExtra.sales.goodsStocks) <= 0) {
            that.isRecommend = true;
          }
        } else {
          that.isRecommend = true;
        }
      } else {
        that.isRecommend = true;
      }
      //如果为true,请求ajax
      if (that.isRecommend) {
        if (mayLikeData) {
          that.getYouLikeDate(mayLikeData);
        }
      }
    },
    //点击多规格和首次要改变的所有，封装成一个
    getChanges(dataExtra) {
      let that = this;
      this.isLimitNum = false;
      this.handleChangeNum = 1;
      //限购或者库存数量,如果是预定商品，让其等于dataExtra.limitNum
      if (dataExtra.sales.limitNum) {
        that.goodsLimitNum = dataExtra.sales.limitNum;
      } else {
        that.goodsLimitNum = dataExtra.sales.goodsStocks;
      }
      if (that.goodsLimitNum <= 1) {
        this.isLimitNum = true;
      } else {
      }
      //信息
      $(".isLimit").removeClass("isLimitShow");
      that.infoObj.price = dataExtra.price;
      //将恢复为多少用到的normalIncome,正常的佣金sellerIncome,sellerIncome乘以倍数得到的佣金
      that.infoObj.goodsStockNumber = dataExtra.sales.goodsStocks;
      // 预定的限制数量
      that.infoObj.limitNum = dataExtra.sales.limitNum;
      // that.infoObj.goPayAdvance = dataExtra.goPayAdvance;

      that.goodsStockNumber = dataExtra.sales.goodsStocks;

      that.memberCont.memberGoods = dataExtra.price.memberGoods;
      that.memberCont.memberPrice = dataExtra.price.memberPrice;
      //多规格modal添加图片
      if (that.goodsList && that.goodsList.length) {
        that.goodsList.map((item, index) => {
          if (dataExtra.goodsId == item.goodsId) {
            if (item.image) {
              that.infoObj.goodsShortPic = item.image;
            } else {
              that.infoObj.goodsShortPic = that.goodsDataBasis.goodsImg;
            }
          }
        })
      }

      //判断是否有活动
      if (dataExtra.activity.length || dataExtra.labels.length) {
        that.infoObj.isActivity = true;
      }

      // 异步获取数据后
      if (that.isApp) {
        let shareMoney = 0;
        if (dataExtra.price.memberGoods == 0) {
          shareMoney = dataExtra.price.totalIncome;
        } else {
          if (dataExtra.price.activityRatio == 0) {
            shareMoney = dataExtra.price.normalIncome;
          } else {
            shareMoney = Number(dataExtra.price.normalIncome) * Number(dataExtra.price.activityRatio);
          }
        }

        common1.initShare(5);
        base.ready();
        if (shareMoney > 0&& that.visitorStatus == '3') {
          native.Browser.setHead({
            shareMoney: shareMoney + "",
            shareMoneyStr: '赚' + shareMoney + '元',
          });
          window.moreShareInfo = {
            shareTitle: "分享至少赚" + shareMoney + "元",
            shareDesc: "当好友点击您分享的链接，并进入您的店铺购物，您就可以获得对应的商品返现啦！",
            bigImgUrl: `http://img.davdian.com/add_qrcode.php?goods_id=${that.goodsId}&seller_id=${that.sellerId}&t=${Date.now()}`,};
        } else {
          native.custom.initHead({
            shareOnHead: 1,
            isAudioAbsorb:1,
            isShowAudio:1
          });
          share.setShareInfo({
            title: window.title, // 分享标题
            desc: window.desc, // 分享描述
            link: window.link, // 分享链接
            imgUrl: window.imgUrl, // 分享图标
          });
        }
      } else {
        native.custom.initHead({
          shareOnHead: 1,
          isAudioAbsorb:1,
          isShowAudio:1
        });
        share.setShareInfo({
          title: window.title, // 分享标题
          desc: window.desc, // 分享描述
          link: window.link, // 分享链接
          imgUrl: window.imgUrl, // 分享图标
        });
      }

      //活动
      this.activityNum = dataExtra.activity.length;
      if (this.activityNum) {
        let singleAct = dataExtra.activity[0];
        this.activityName = singleAct.actIntro;
        this.activityUrl = singleAct.command.content;

        if (dataExtra.activity[0].actTypeName == '') {
          this.activityTypename = singleAct.typeName;
        } else {
          this.activityTypename = singleAct.actTypeName;
        }
      }

      that.activityInfo.activitys = [];

      //是否是秒杀,单品赠
      let killArr = [];
      // 是否是预定商品
      that.infoObj.presale = null;
      dataExtra.activity.map((item, index) => {
        killArr.push(item.typeId);
        if (item.gifts.length) {
          that.activitysList = item.gifts;
        }

        if (item.typeId == 1 || item.typeId == 2 || item.typeId == 8 || item.typeId == 4 || item.typeId == 9) {

        } else {
          that.activityInfo.activitys.push(item);
        }

        // 是否是预定商品
        if (item.typeId == '9') {
          that.infoObj.presale = item;
          that.infoObj.presale.isLimit = true;
        }
      });
      if (killArr.indexOf('1') === -1) {
        this.secKill = false;
      } else {
        this.secKill = true;
      }
      //商品标签单独提出来了
      this.infoObj.labelTag = dataExtra.labels;
      //活动开始结束时间
      //默认为false
      that.isShowActive = 0;
      dataExtra.activity.map((item) => {
        if (item.showTime == 1) {
          that.singleActivity = item;
          that.isShowActive = Number(item.showTime);
          that.actEndTime = this.changeDate(item.endTime * 1000, 1);
        }
      });
      // 预告活动时间
      that.infoObj.isComingActivity = false;
      if (dataExtra.coming.length) {
        dataExtra.coming.map((item) => {
          if (item.showTime == '1') {
            that.infoObj.isComingActivity = true;
            that.infoObj.comingActIncome = item.actIncome;
            that.infoObj.comingBegTime = this.changeDate(item.begTime * 1000, 0);
            that.infoObj.comingTypeName = item.typeName;
          }
        })
      }
      //红包
      this.activityInfo.bonus = dataExtra.bonus;

      //弹框中售罄状态要改变,后来增加的
      that.goodStatusonSale = dataExtra.status.onSale;
      let goodStatusObj = {
        preSale: dataExtra.status.preSale,
        collected: dataExtra.status.collected,
        goodsLimit: dataExtra.status.goodsLimit,
        goodsStocks: dataExtra.sales.goodsStocks
      };
      that.goodStatus = goodStatusObj;

      // 判断妈妈顾问
      that.dumpToMamaAdviser();
      //判断限时购是否抢光提示。
      if (dataExtra.status.onSale == '1' && dataExtra.sales.goodsStocks > '0' && dataExtra.hints.hintsInfo && dataExtra.hints.hintsInfo.length && that.visitorStatus == '3') {
        popup.alert({
          title: '该商品限时购活动库存售罄',        // 标题（支持传入html。有则显示。）
          text: '会员返现已恢复平日金额，返现金额以当前页面为准',         // 文本（支持传入html。有则显示。）
        });
      }
    },
    //dataExtra为空的时候
    getDataExtra(dataBasis) {
      let that = this;
      //活动
      this.activityNum = 0;
      //移过来的
      that.goodStatusonSale = 1;
      let goodStatusObj = {
        goodsStocks: 0
      };
      that.goodStatus = goodStatusObj;
    },
    //动态条显示
    tendsShow() {
      let num = 0, isShow = true,
        that = this, trends = document.querySelector('#tends');

      if (trends && that.trendsList.length) {
        that.trendAvatar = that.trendsList[num].trendUserAvatar;
        that.trendInfo = that.trendsList[num].trendInfo;
        that.trendAnimate(num, isShow);
      }
    },
    trendAnimate(num, isShow) {
      let that = this;
      $(".tends_wrapper").show();
      if (isShow) {
        clearTimeout(that.timeHide);
        that.timeShow = setTimeout(() => {
          $("#tends").animate({"top": '10px'}, 300, function () {
            isShow = !isShow;
            that.trendAnimate(num, isShow);
          });
        }, 2000)
      } else {
        clearTimeout(that.timeShow);
        that.timeHide = setTimeout(() => {
          $("#tends").animate({"top": '-80px'}, 300, function () {
            num++;
            isShow = !isShow;
            if (num <= that.trendsList.length - 1) {
              $("#tends").css({"top": "65px"});
              that.trendAnimate(num, isShow);
              that.trendAvatar = that.trendsList[num].trendUserAvatar;
              that.trendInfo = that.trendsList[num].trendInfo;
            } else {
              clearTimeout(that.timeShow);
              clearTimeout(that.timeHide);
              $("#tends").css({"top": "65px"});
              $(".tends_wrapper").hide();
            }
          });
        }, 2000);
      }
    },
    //猜你喜欢
    getYouLikeDate(mayLikeData) {
      let that = this;
      $.ajax({
        url: mayYouLikeURL,
        type: 'POST',
        dataType: 'JSON',
        data: layout.strSign('mayYouLike', mayLikeData),
        success: (res) => {
          if (res.code == 0) {
            let data = res.data;
            let dataList = [];
            if (data && data.dataList.length) {
              dataList = data.dataList;
              
              if (dataList.length) {
                dataList.map((item, index) => {
                  item.imageUrl = `${item.imageUrl}`;
                });

                that.mayYouLikeList = data.dataList;
                that.mayYouLikeNoMore = true;//判定值 改为false
                that.isFirstLoad = false;
              }
            } else {
              $.ajax({
                url: '/api/mg/sale/index/getPageSecond',
                type: "POST",
                data: layout.strSign("detailLike", ""),
                dataType: "JSON",
                success(res) {
                  if (res.code == 0) {
                    dataList = res.data.feedList[0].body.dataList;

                    if (dataList.length) {
                      dataList.map((item, index) => {
                        item.imageUrl = `${item.imageUrl}`;
                      });

                      that.mayYouLikeList = dataList;
                      that.mayYouLikeNoMore = true;//判定值 改为false
                      that.isFirstLoad = false;
                    }
                  }
                }
              })
            }
          } else {
            popup.toast(res.data.msg, 3000);
          }
        },
        error: (err) => {
          that.mayYouLikeNoMore = true;
        }
      });
    },
    //时间转换
    changeDate(date, val) {
      if (date) {
        date = new Date(Number(date));

        if (date > new Date()) {
          let year = date.getFullYear(),
            month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
            dates = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
            hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
            minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
          if (val == 1) {
            return `${year}-${month}-${dates} ${hours}:${minutes}`;
          } else {
            return `${month}月${dates}日${hours}:${minutes}`
          }
        } else {
          return 0;
        }
      }
    },
    //alert弹框
    // handleAlertHide () {
    //     window.location.href = that.dataUrl;
    // },
    //confirm弹框
    handleConfirmCancel() {
      window.location.href = '/cart.html?logRefererPage=goods_detail&logRefererLocation=cart';
      this.confirmShow = false;
    },
    handleConfirmOk() {
      window.location.href = '/';
      this.confirmShow = false;
    },
  },
  components: {
    GoodsTop: GoodsTop,
    GoodsSwiper: GoodsSwiper,
    GoodsIntro: GoodsIntro,
    ActivityTypes: ActivityTypes,
    GoodsEvaluate: GoodsEvaluate,
    GoodsBottom: GoodsBottom,
    GoodsParams: GoodsParams,
    DetailPic: DetailPic,
    BrandType: BrandType,
    Group: Group,
    Cell: Cell,
    Tab: Tab,
    TabItem: TabItem,
    Alert: Alert,
    confirm: confirm,
    Loading: Loading,
    Spinner: Spinner,
    noFindGoods: noFindGoods,
    'ad-banner': require('./ad-banner.vue')
  }
};
