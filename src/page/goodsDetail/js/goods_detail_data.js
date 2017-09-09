// 基础模块
import common from '../../../common/js/common.js';

var layout = require("../../../../module/index/layout.es6").default;
var dialog = require("../../../../utils/dialog.es6").default;
// var base = require("../../../../utils/base.es6").default;
import share from '../../../common/js/module/share.js';
import native from '../../../common/js/module/native.js';
import ua from '../../../common/js/module/ua.js';
// import common1 from '../../../../module/common/common.es6';
// import weixin from '../../../common/js/module/weixin.js';

// base.init();

var isDev = true;

var detailData = function (query) {
  var type, dataObj,data;
  // query = query || {};
  // query.js_wx_info = 1;
  if (isDev) {
    dataObj = layout.strSign("goodsDetailData",query);
    type = "POST";
  } else {
    dataObj = "";
    type = "GET";
  }

  $.ajax({
    type: type,
    url : detailURL,
    data : dataObj,
    async : false,
    dataType: 'JSON',
    success: function(res) {
      // check强制跳转
      common.checkRedirect(res);

      renderData(res);
    },
    error: function (err) {
      dialog.info(err.msg);
    }
  })
};

function renderData(res) {
  window.loginTel = res.data.userMobile;
  if (window.vm && window.vm.$children[0]) {
    var that = window.vm.$children[0]._data,
      events = window.vm.$children[0];

    that.response = res;
    that.loadBefore = false;
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
      if (res.data.webUrl) {
        location.href = res.data.webUrl;
      } else {
        // window.goodsDetailData = res;
        var data = res.data,
            dataExtra,
            dataComment = data.comments,
            goodsStockSales = data.extra.parent,
            dataBasis = data.basis;

        that.goodsDataBasis = data.basis;

        that.sellerId = data.shop.sellerId.toString();
        // that.goodsId = dataBasis.goodsId;
        that.goodsId = data.representId == '0' ? dataBasis.goodsId : data.representId;

        //六一
        if (Number(res.sys_time) * 1000 > 1497369600000 && Number(res.sys_time) * 1000 < 1497456000000) {
          that.isShowa = true;
        } else {
          that.isShowa = false;
        }
        if (Number(res.sys_time) * 1000 > 1497456000000 && Number(res.sys_time) * 1000 < 1497888000000) {
          that.isShowb = true;
        } else {
          that.isShowb = false;
        }

        //商品轮播图
        that.goodsImgList.push({
          img: dataBasis.goodsImg,
        });
        dataBasis.pictures.map(function (item, index) {
          that.goodsImgList.push({
            img: item.imgUrl,
          });
        });

        that.infoObj.goodsShortPic = dataBasis.goodsImg;

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
            dataBasis.kinds.map(function (item, index) {
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
          var cateGory = [];
          dataBasis.cats.map(function (item, index) {
            cateGory.push(item.catId);
          });
          var mayYouLikeData = {
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
          //图文详情新增视频
          var detailPic = [];
          dataBasis.details.map(function(item) {
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

          //判断是否为多规格商品
          var representTag, tagArr;

          //当不是多规格时也显示赠品标签
          if (data.extra.dataList.length) {
            data.extra.dataList.map(function (list, index) {
              if (list.goodsId == that.dataRepresentId) {
                //弹框中的价格
                that.goodsModalObj.activityName = list.activity;
                that.goodsModalObj.goodsStocks = list.sales.goodsStocks;
              }
            });
          };

          if (dataBasis.childs.tags && dataBasis.childs.tags.length !== 0) {
            that.isMultiGoods = true;
            data.extra.dataList.map(function (item, index) {
              if (item.goodsId == that.dataRepresentId) {
                dataExtra = item;
                representTag = item.tag;
              }
            });

            //tag
            if (dataExtra) {

              tagArr = representTag.split(":");
              dataBasis.childs.tags.map(function (item, index) {
                //判断数组中是否存在id，存在的话为true
                item.detail.map(function (list, idx) {
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
              events.getDisabled(data.extra.dataList, dataBasis.childs.tags);
            }
          } else {
            that.isMultiGoods = false;
            dataExtra = data.extra.dataList[0];
            that.infoObj.salesNumber = dataExtra.sales.salesNumber;
          }

          var swiperObj = {
            crossBorder: dataBasis.crossBorder,
            // marketPrice: dataBasis.marketPrice,
            trendsList: data.trends
          };
          that.swiperInfo = swiperObj;

          that.goodsName = dataBasis.goodsName;

          // if (dataBasis.bookAuthor) {
          that.activityInfo.bookAuthor = dataBasis.bookAuthor;
          that.activityInfo.bookPublishing = dataBasis.bookPublishing;
          // }

          //服务
          that.activityInfo.service = dataBasis.service;
          //是否为店主
          that.activityInfo.isShopper = res.visitor_status;
          that.activityInfo.shoppUrl = res.shop_url;

          var goodsStockSale = 0;
          if (goodsStockSales.constructor != Array) {
            goodsStockSale = goodsStockSales.goodsStocks;
            that.infoObj.salesNumber = goodsStockSales.salesNumber;
          } else {
            goodsStockSale = dataExtra.sales.goodsStocks;
            that.infoObj.salesNumber = dataExtra.sales.salesNumber;
          }
          // that.infoObj.goodsStockNumber = goodsStockSale;

          //活动
          if (dataExtra) {
            events.getChanges(dataExtra);
          } else {
            events.getDataExtra(dataBasis);
          }
          //快讯
          that.activityInfo.notice = data.notice;
          //评论
          if (dataComment.dataList) {
            events.getComment(dataComment);
          }
          //品牌
          events.getBrand(dataBasis);
          //判断是否时未上架或者无货，如果是，请求猜你喜欢的接口，
          events.getMayLike(dataExtra, that.mayLikeData);

          //动态条
          that.trendTime;
          clearTimeout(that.trendTime);

          that.trendTime = setTimeout(function () {
            events.tendsShow();
          }, 1000);


          //库存不足提示
          if (dataExtra.status.onSale == '1' && Number(goodsStockSale) < 20 && Number(goodsStockSale) > 0) {
            $(".stock_tips_wrapper").show().animate({"top": "58", "opacity": 1}, 1000, function () {
              setTimeout(function () {
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
        share.setShareInfo({
            title: window.title, // 分享标题
            desc: window.desc, // 分享描述
            link: window.link, // 分享链接
            imgUrl: window.imgUrl, // 分享图标
        });
      }

    } else {
      dialog.info(res.data.msg);
    }
  }else{
    setTimeout(function () {
      renderData(res);
    },200)
  }
}

if (isDev) {
  var locationUrl = window.location.href;
  var goods = locationUrl.match(/(\d+)\.html/ig)[0],
    goodsIdLen = goods.length,
    goodsId = goods.substring(0, goodsIdLen - 5);
  var query = {};
  if (locationUrl.indexOf('search_result') === -1) {
    query = {
      goodsId: goodsId,
      searchKey: '',
    }
  } else {
    query = {
      goodsId: goodsId,
      searchKey: 'search_result'
    }
  }
  //记得加上goodsId
  detailData(query);
} else {
  detailData();
}




