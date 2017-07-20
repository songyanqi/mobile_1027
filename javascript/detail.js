var native = require('../src/common/js/module/native.js').default;

$(document).ready(function ($) {
    var goodName,  //商品名称
        height, // 页面高度
        w, // 页面宽度
        bottom, // 底部容器
        commitType, //提交类型
        finalTypeStr,// 最终子属性
        finalNum, //最终库存
        buttonList = [], // 全部按钮列表
        main, //页面主体容器
        currentTypeStatus = {}, // 所有类型对应名称
        defaultMinCount = 1, // 默认最小数量
        defaultMaxCount = 99999,// 默认最大数量
        allTypeLength, // 所有类型长度
        defaultTypeStr = "", // 默认类型字符串
        alertContainer, // 弹出框容器
        typePrice, // 弹出中价格容器
        typeTitle, // 弹出中商品标题容器
        typeStock, // 弹出中库存容器
        buttonListByLi = {}, // li对应的其他li 的按钮列表
        numberInput, // 输入框容器
        okButton, // 确定按钮容器
        needToChoice = [], // 未选择属性
        newGoodDetailList, // 子属性详情结果列表
        newGoodDetail, // 子属性详情
        newTypeData, // 子属性数据列表
        defaultTypeStock, // 默认库存字符串
        defaultPriceStr,  // 默认价格字符串
        cartButton, // 加入购物车按钮
        buyButton, // 直接购买按钮
        tipCartLink, // 弹出结算提示
        selectButton,
        selectTitle,
        selectContent,
        buyNowButton; // 直接购买按钮


    try{
        init(); // 页面初始化
    }catch (e){
        window.bughd&&bughd("notifyException", e);
        console.error(e);
    }

    /**
     * 页面初始化
     */
    function init() {
        goodName = $(".top_container").find(".title").text().trim();
        height = $(window).height(); //页面高度
        w = Math.min(document.body.clientWidth, 360);
        bottom = $(".detail_bottom");
        cartButton = bottom.find(".btn-cart");
        buyButton = bottom.find(".btn-buy");
        main = $(".detail_main");
        tipCartLink = $(".detail_settle");
        selectButton = $(".buy_introduction");
        selectTitle = $(".buy_introduction_title_con");
        selectContent = $(".buy_introduction_con");

        initActivity(); //初始化活动模块
        initInfomation(); //初始化子详情模块
        initClick2Refresh(); //初始化点击刷新功能
        initCollect(); //初始化收藏功能
        initCommend(); //推荐功能
        initSlider();  // 初始化偷图轮播
        initMiao(); //初始化秒杀
        initOtherShare(); //

        //点击选择属性
        selectButton.click(alertTypeChoiceContainer);
        selectTitle.html("请选择");
        selectContent.html(defaultTypeStr);

        if (window.goodDetail && window.goodType && window.goodOtherInfo) {
            initChildType(); //初始化子属性
        } else {
            buyButton.click(detailBuyNormal);
            cartButton.click(detailCartNormalTodo);
        }



        window.qh = qh;
        window.buy_now_confirm = buy_now_confirm;

        //商品详情和服务说明切换
        $("#good_information_title").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $("#good_information").removeClass("hide").siblings().addClass("hide");
        });
        $("#service_explanation_title").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $("#service_explanation").removeClass("hide").siblings().addClass("hide");
        });

        //商品详情区块加载数据
        goodsdetail();

    }

    /**
     * 初始化商品详情区块
     */
    function goodsdetail() {
        var ajaxgoods = 0;
        //滚动条滑到商品详情区块的时候加载数据
        $(document).on("scroll", function () {
            var fold = $(window).height() + $(window).scrollTop();
            if (fold >= $(".good_information_title").offset().top) {
                if (ajaxgoods == 0) {
                    ajaxgoods = 1;
                    window.disabledGoodsLoading = true;
                    $.ajax({
                        type: "get",
                        url: goodsdetailUrl,
                        data: {},
                        dataType: "json",
                        success: function (result) {
                            detail(result)
                            window.disabledGoodsLoading = false;
                        },error:function () {
                            window.disabledGoodsLoading = false;
                        }
                    });
                }
            }
        });
        //打开页面已经在商品详情区块的时候加载数据(指当前查看商品详情,然后当前页面刷新的时候)
        $(function () {
            var fold = $(window).height() + $(window).scrollTop();
            if (fold >= $(".good_information_title").offset().top) {
                if (ajaxgoods == 0) {
                    ajaxgoods = 1;
                    $.ajax({
                        type: "get",
                        url: goodsdetailUrl,
                        data: {},
                        dataType: "json",
                        success: function (result) {
                            detail(result)
                        }
                    });
                }
            }
        });
    }

    /**
     * 商品详情区块内容加载数据
     */
    function detail(result) {
        if (result.code == 0) {
            var pattern = /(data-original=\'http:\/\/pic\.davdian\.com\/[a-z_\/0-9]+\.(jpg|png))/g;
            // 左侧数据
            var left = result.data.left;
            if (left.length > 0) {
                for (var i = 0; i < left.length; i++) {
                    $("#good_information").append($('<div class="item">' +
                        '<div class="info_main">' +
                        '<div class="info_title">' + left[i].title + '</div>' + '<span class="arrow-up info_up_arrow"></span>' + '</div>' +
                        '<div class="info_detail">' + left[i].con + '</div>' +
                        '</div>' +
                        '</div>').toggleClass("droped", !left[i].droped));
                }
            }
            else {
                $("#good_information").append('<div class="detail_no_data">暂无商品详情信息</div>');
            }

            // 右侧数据
            var right = result.data.right;
            if (right.length > 0) {
                for (var i = 0; i < right.length; i++) {
                    $("#service_explanation").append($('<div class="item">' +
                        '<div class="info_main">' +
                        '<div class="info_title">' + right[i].title + '</div>' + '<span class="arrow-up info_up_arrow"></span>' + '</div>' +
                        '<div class="info_detail">' + right[i].con.replace(pattern,"$1@q1_w640") + '</div>' +
                        '</div>' +
                        '</div>').toggleClass("droped", !right[i].droped));
                }
            }
            else {
                $("#service_explanation").append('<div class="detail_no_data">暂无服务说明</div>');
            }

            // 品牌馆数据
            var brand = result.data.brand;
            var link = brand.link;
            if (!isEmptyObject(brand)) {
                $(".good_information_con").after($('<div>' +
                    '<a class="brand_hall clearfix" ' + (link != "" ? ('href="' + link + '"') : "") + '>' +
                    '<img src="' + brand.img + '" class="pull-left">' +

                    '<div class="shop_name pull-left">' + '<div class="name">' + brand.title + '</div>' + '</div>' + '<span class=" dav_icon_arrow brand_hall_arrow"></span>' +
                    '</a>' +

                    '<div class="brand_hall_con">' + brand.con.replace(pattern,"$1@q1_w640") + '</div>'));
            }

            $("#good_information").find("img[data-original]").lazyload({effect: "fadeIn", threshold: 100, failure_limit: 100});
            $("#service_explanation").find("img[data-original]").lazyload({effect: "fadeIn", threshold: 100, failure_limit: 100});

            //加载数据成功后执行点击展开收起事件
            initInfomation();
            setTimeout(function () {
                if(window.Units&&Units.isApp()){
                    $(".good_information_con").find("iframe").each(function (i, d) {
                        d.onload = function(){
                            window.bravetime.initHead();
                            setTimeout(function () {
                                initOtherShare();
                            },50);
                        };
                    })
                }
            },100);


        }
        else {
            bravetime.info(result.msg)
        }
    }

    /**
     * 初始化推荐商品到首页
     */
    function initCommend() {
        var comCon = $(".recommend_container");
        comCon.click(function () {
            var isCom = $(this).hasClass("is_recommend");
            if (!isCom) {
                // 已推荐
                $.ajax({
                    url: window.commonendUrl,
                    dataType: "json",
                    data: {
                        id: window.goodsId,
                        recommend: 0
                    }, success: function (result) {
                        if (result["error"]) {
                            bravetime.info(result["msg"]);
                        } else {
                            comCon.toggleClass("is_recommend");
                            bravetime.info("取消推荐成功");
                        }
                    }, error: function () {
                        bravetime.removeLoader();
                        bravetime.ajaxError(36);
                    }
                });
            } else {
                // 未推荐
                $.ajax({
                    url: window.commonendUrl,
                    dataType: "json",
                    data: {
                        id: window.goodsId,
                        recommend: 1
                    }, success: function (result) {
                        bravetime.removeLoader();
                        if (result["error"]) {
                            bravetime.info(result["msg"]);
                        } else {
                            comCon.toggleClass("is_recommend");
                            bravetime.info("推荐成功");
                        }
                    }, error: function () {
                        bravetime.removeLoader();
                        bravetime.ajaxError(36);
                    }
                });
            }
        });
    }

    /**
     * 初始化收藏功能
     */
    function initCollect() {
        var collectContainer = bottom.find(".collect");
        // 向前面版本兼容
        if (collectContainer.length) {
            var ico = collectContainer.find(".icon");
            var txt = collectContainer.find(".collect_text");
            collectContainer.click(function () {
                bravetime.addLoader({little: true});
                if (ico.hasClass("collect_icon")) {
                    // 未收藏
                    $.ajax({
                        url: window.collectUrl,
                        dataType: "json",
                        data: {
                            id: window.goodsId,
                            collect: 1
                        }, success: function (result) {
                            bravetime.removeLoader();
                            if (result["error"] == -1) {
                                bravetime.goto(result["url"]);
                            } else if (result["error"]) {
                                bravetime.info(result["msg"]);
                            } else {
                                ico.removeClass("collect_icon").addClass("favorited_icon");
                                txt.html("已收藏");
                                bravetime.info("收藏成功");
                            }

                        }, error: function () {
                            bravetime.removeLoader();
                            bravetime.ajaxError(36);
                        }
                    });
                } else {
                    // 已收藏
                    $.ajax({
                        url: window.collectUrl,
                        dataType: "json",
                        //type:"POST",
                        data: {
                            id: window.goodsId,
                            collect: 0
                        }, success: function (result) {
                            bravetime.removeLoader();
                            if (result["error"]) {
                                bravetime.info(result["msg"]);
                            } else {
                                ico.addClass("collect_icon").removeClass("favorited_icon");
                                txt.html("收藏");
                            }
                        }, error: function () {
                            bravetime.removeLoader();
                            bravetime.ajaxError(36);
                        }
                    });
                }
            });
        }

    }

    /**
     * 初始化头图滚动
     */
    function initSlider() {
        if($(".swiper-slide").size()==1){

        }else {
          if(window.Swiper){
            // 顶部轮播图滚动
            new Swiper('.iosslider_container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                centeredSlides: true,
                loop: true,
                preloadImages:false,
                lazyLoading : true
            });
          }
        }
    }

    /**
     * 初始化其他分享
     */
    function initOtherShare() {
            if(window.Units&&Units.isApp()){
                if(window.brokerage&&brokerage>0){

                    // window.bravetime&&bravetime.setHead({shareMoney:brokerage+""});
                    // modify by swg native 2017-05-19
                    native.Browser.setHead({
                      shareMoney: brokerage + "",
                      shareMoneyStr: '赚' + brokerage + '元',
                    });

                    window.moreShareInfo = {shareTitle:"分享至少赚"+brokerage+"元", shareDesc:"只要有好友在您分享的链接中购物，您就可以得到对应的商品返现。通过链接还能直接进入您的店铺，好友购物您就赚钱~"};
                }
            }
        }

    /**
     * 初始化限时抢购秒杀详情页
     */
    function initMiao() {
        //限时抢购秒杀详情页  剩余时间  倒计时
        var merchandiseDetail = $(".detail_sec");
        if (merchandiseDetail.length) {
            var merchandiseList = merchandiseDetail.find(".skill_dao");
            window.mechandiseInterval = setInterval(function () {
                var second = +merchandiseDetail.attr("data-skill-time");
                if (second > 0) {
                    merchandiseList.html("剩余时间：" + calculateTime(second));
                    merchandiseDetail.attr("data-skill-time", second - 1);
                } else if(second == 0) {
                    merchandiseList.html("此商品秒杀已结束");
                }

            }, 1000);
        }

        function calculateTime(second) {
            var s = second % 60, m = Math.floor(second / 60) % 60,
                h = Math.floor(second / 60 / 60);
            var str = '';
            if (h) {
                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
            } else if (m) {
                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
            } else {
                str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
            }
            return str;
        }
    }

    /**
     * 初始化活动模块
     */
    function initActivity() {
        $(".js-need-drop").find(".item").each(function (i, d) {
            $(d).click(function () {
                $(this).parents(".js-need-drop").toggleClass('droped');
            })

        });
    }

    /**
     * 初始化子详情模块
     */
    function initInfomation() {
        $(".good_information").find(".item").each(function (i, d) {
            $(d).find("iframe").each(function (index, el) {
                var $me = $(this);
                if ($me.attr("src").indexOf("v.qq.com/iframe") > -1) {
                    $me.height($me.width() / 3 * 2);
                }
            });
            $(d).find(".info_main").click(function () {
                var isDroped = $(d).hasClass("droped");
                // 如果当前没展开   把其他合并并取消fix，把当前展开，当前变为fix，当前移动到最上面
                if (isDroped) {
                    // 把其他合并，并取消fix
                    $(".good_information").find(".item").addClass("droped");//.removeClass("fix");

                    // 当前变为fix，
                    // $(d).addClass("fix");
                    // 当前移动到最上面
                    if (window.scrollY > $(d).offset().top - 41) {
                        // $('html,body').animate({scrollTop: $(d).offset().top-41}, 500);
                        window.scrollTo(0, $(d).offset().top - 41);
                    } else {
                        window.scrollTo(0, window.scrollY);
                    }
                    // 把当前展开，
                    $(d).removeClass('droped');
                    $(window).scroll();
                } else {
                    // 如果当前展开,把所有合并
                    $(".good_information").find(".item").addClass("droped");//.removeClass("fix");
                }
            });
        });
        $(".good_introduction").find(".item").each(function (i, d) {
            $(d).click(function () {
                introduceClick(i);
            });
        });
        introduceClick(0);
    }

    /**
     * 点击子详情介绍
     * @param {Number} index
     */
    function introduceClick(index) {
        var goodIntroduction = $(".good_introduction");
        $(goodIntroduction.find(".item").removeClass("active").get(index)).addClass("active");
        $(goodIntroduction.find(".item").find("i").removeClass("active").get(index)).addClass("active");
        $(goodIntroduction.find(".con").addClass("hide").get(index)).removeClass('hide');
    }

    /**
     * 初始化点击刷新功能
     */
    function initClick2Refresh() {
        var ajaxing = 0; //标记是否在ajax请求
        var pageIndex = pageIndexStart || 2;
        $(".recommendation").find(".more").click(function () {
            var me = this;

            if (ajaxing == 0) {
                $(this).html("<div class='uil-default-css-normal' style='-webkit-transform:scale(0.15);-moz-transform:scale(0.15);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;width:30px;height: 30px;display: inline-block;'><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div></div>");

                //发起ajax请求
                ajaxing = 1;
                $.ajax({
                    data: {
                        page: pageIndex,
                        pagesize: pagesize,
                        id: goodsId,
                        t: Date.now()
                    },
                    url: refreshUrl,
                    success: function (d) {
                        $(me).html("点击加载更多...");
                        if (typeof d == "string") {
                            var data = JSON.parse(d);
                        } else {
                            var data = d;
                        }
                        if (+data["error_code"]) {
                            warning_info(data["error_msg"]);
                            ajaxing = 0;
                        } else if (data["data"].length) {
                            var good, i = 0, list = $(".recommendation .good_list");
                            for (; good = data["data"][i++];) {
                                $('<a href="' + good["url"] + '" class="good_item"><div class="good_img_container">' +
                                    '<img src="' + good["goods_img"] + '">' +
                                    ((good["sale_status"] == "offline" || good["sale_status"] == "soldout") ? ('<div class="good_list_sell_out">' + {
                                        offline: "下架",
                                        soldout: "售罄"
                                    }[good["sale_status"]] + '</div>' ) : "") +

                                    (good["tag"] ? ('<div class="' + good["tag"].toString() + '"></div>') : "") +
                                    '</div><div class="good_title">' + good["goods_name"] + '</div><div class="good_price">¥' + good["shop_price"] + '</div></a>').appendTo(list);
                            }
                            pageIndex++;
                            ajaxing = 0;
                            if (!data["has_more"]) {
                                ajaxing = 1;
                                $(me).html("没有更多商品了！");
                            }
                        } else {
                            $(me).html("没有更多商品了！");
                        }

                    },
                    error: function () {
                        $(me).html("点击加载更多...");
                        // $(".refresh").empty();
                        bravetime.ajaxError(13);
                        ajaxing = 0;
                    }
                });
            }
        });
    }

    /**
     * 购买前确认
     * @param {Number} index
     */
    function buy_now_confirm(index) {
        var cfg = {};
        cfg["okText"] = "继续购买";
        cfg["okLink"] = function () {
            buy_now(index);
        };
        window.bravetime.newConfirm($(".warning_info").html(), cfg);
    }

    /**
     * 初始化缺货登记功能
     */
    function qh() {
        if (window.tel) {
            window.bravetime.info("缺货信息提交中");
            $.ajax({
                url: window.qhurl,
                data: {
                    goodId: window.good_id,
                    tel: window.tel
                }, success: function (d) {
                    if (typeof d == "string") {
                        d = JSON.parse(d);
                    }
                    if (d["error_code"] == 0) {
                        window.bravetime.info(d["error_msg"]);
                    } else {
                        window.bravetime.info(d["error_msg"]);
                    }

                }, error: function () {
                    bravetime.ajaxError(14);
                }
            });
        } else {
            var cfg = {};
            cfg["okText"] = "提交";
            cfg["okLink"] = function () {
                var tel = $("#qh_form").find("input").val();
                window.bravetime.info("缺货信息提交中");
                $.ajax({
                    url: window.qhurl,
                    data: {
                        goodId: window.good_id,
                        tel: tel
                    }, success: function (d) {
                        if (typeof d == "string") {
                            d = JSON.parse(d);
                        }
                        if (d["error_code"] == 0) {
                            window.bravetime.info("信息登记成功");
                        } else {
                            window.bravetime.info(d["error_msg"]);
                        }

                    }, error: function () {
                        bravetime.ajaxError(14);
                    }
                });
            };
            var formStr = '<form id="qh_form" style="margin:0;">' +

                '<input  style="padding:4px;font-size:14px;line-height:1.5;margin-bottom: 0;margin-top: 15px;width: auto;border-radius: 0;box-shadow: none;  text-align: center;" type="tel" placeholder="请填写手机号">' +
                '</form>';
            window.bravetime.newConfirm(formStr, cfg);
        }

    }


    /**
     * 初始化子属性
     */
    function initChildType() {
        alertContainer = $(".s-decision-wrapper");
        numberInput = alertContainer.find("input");
        okButton = alertContainer.find(".option").find(".ok");
        buyNowButton = alertContainer.find(".option").find(".buy_now");
        typePrice = alertContainer.find('.priceContainer');
        typeTitle = alertContainer.find(".title");
        typeStock = alertContainer.find(".stock-control");
        newGoodDetailList = handlerGoodDetailData(goodDetail, goodType);
        newGoodDetail = newGoodDetailList[0];
        newTypeData = newGoodDetailList[4];
        allTypeLength = goodType.length;
        defaultTypeStock = newGoodDetailList[3];
        defaultPriceStr = (newGoodDetailList[1] == newGoodDetailList[2]) ? (newGoodDetailList[1].toFixed(2)) : ( "￥" + newGoodDetailList[1].toFixed(2) + " ~ " + "￥" + newGoodDetailList[2].toFixed(2));
        typeTitle.html("请选择" + defaultTypeStr);
        typePrice.html(defaultPriceStr);
        typeStock.html("库存：" + defaultTypeStock + "件");

        for (var i = 0; i < goodType.length; i++) {
            currentTypeStatus[goodType[i]["id"]] = null;
            defaultTypeStr += " " + goodType[i]["title"];
            needToChoice[i] = goodType[i]["title"];
        }

        buyButton.click(detailBuy);
        cartButton.click(detailCart);
        // 监听数量按钮
        alertContainer.find(".change_num").click(changeNumber);

        // 监听数量输入
        numberInput.blur(changeNumber);

        // 监听确定按钮
        okButton.click(clickOkButton);

        // 监听立即购买按钮
        buyNowButton.click(clickbuyNowButton);

        handlerTypeDom(goodType);
        alertContainer.click(function (event) {
            var className = event["target"]["className"];
            if (className == "s-decision-wrapper" || className == "dav_icon_detail_close_btn") {
                removeAlertContainer();
            } else if (className.indexOf("button") > -1) {
                buttonClick(event["target"]);

                ////请选择弹出层后
                //var Select_data = [];
                //var selected = $(".sku-control").find(".items");
                //for(var i=0;i<selected.size();i++){
                //    var select =  $(".sku-control").find(".items:eq("+i+")").find(".active").html();
                //    if(select == undefined){
                //
                //    }else{
                //        Select_data.push(select);
                //    }
                //
                //}
                //console.log(Select_data);
                //if(Select_data.length !== 0){
                //    var Html="";
                //    for(var j=0;j<Select_data.length;j++){
                //        var htmls = '<span>'+Select_data[j]+'</span>';
                //        Html+=htmls
                //    }
                //    selectContent.html(Html);
                //    selectTitle.html("已选择");
                //}else{
                //    selectTitle.html("请选择");
                //    selectContent.html(defaultTypeStr);
                //}


            }
        });

        // 默认点击的情况
        if (window.defaultKey && newGoodDetail[window.defaultKey][1]) {
            fireClick(defaultKey);
        }
    }


    /**
     * 模拟点击
     * @param {Array} key 模拟点击的key
     */
    function fireClick(key) {
        var keyList = key.split(":");
        for (var i = 0, l = buttonList.length; i < l; i++) {
            for (var j = 0, len = keyList.length; j < len; j++) {
                var $button = buttonList[i];
                var btnId = $button.data("data-for-key");
                if (btnId == keyList[j]) {
                    buttonClick($button[0]);
                }
            }
        }
    }

    /**
     * 点击确定按钮
     * @returns {boolean}
     */
    function clickOkButton() {
        var commitType =1;
        // 禁止点击时候再点击就直接拒绝
        if (okButton.hasClass("disabled")) {
            return false;
        }
        // 如果所有属性都已经选择了
        if (needToChoice.length == 0) {
            // 先检查当前商品数量和库存对比，过大则提示
            var currentNum = numberInput.val();
            if (currentNum > finalNum) {
                bravetime.info("您选择的商品数量过大，请更改");
                return false;
            } else {
                var goodsId = goodOtherInfo[finalTypeStr][2];
                var sag_id = goodOtherInfo[finalTypeStr][0];
                var goods_price = goodDetail[finalTypeStr][0];
                var goods_name = goodOtherInfo[finalTypeStr][1];
                var number = currentNum;

                // 发请求
                var goods = {};
                var spec_arr = [];

                goods.quick = commitType;
                goods.spec = spec_arr;
                goods.goods_id = goodsId;
                goods.number = number;
                goods.sag_id = sag_id;
                goods.price = goods_price;
                goods.name = goods_name;

                disableButtonForLoading(okButton, commitType ? "&nbsp;&nbsp;&nbsp;加入中" : "&nbsp;&nbsp;&nbsp;跳转中");

                $.ajax({
                    url:window.buyUrl,
                    type:"post",
                    dataType:"json",
                    data:{
                        goods: JSON.stringify(goods)
                    },
                    success:function (data) {
                        if (typeof  data == "string") {
                            data = JSON.parse(data);
                        }
                        if (data.error > 0) {
                            if(data.url){
                                window.bravetime.newAlert(data.message,function () {
                                    window.nativeLoginFunction(data.url,function () {
                                        location.reload();
                                    })
                                });
                            }else{
                                // 如果失败的话，首先弹出错误信息
                                window.bravetime.info(data.message);
                                // 然后刷新子属性数量和价格
                                // refreshTypeContainer(data.newInfo, !!data.disable);
                                // 恢复确定按钮
                                enableButtonForLoading(okButton, "确定")
                            }

                        } else {

                            // 如果成功的话,先让弹出框消失
                            removeAlertContainer();

                            // 然后操作
                            if (commitType == 0) {  // 购买就直接跳走
                                var callback = 'index.php?m=default&c=cart&a=cart';
                                window.bravetime.goto(callback);
                            } else if (commitType == 1) { // 购物车增加一系列动画
                                // 恢复确定按钮
                                enableButtonForLoading(okButton, "确定");
                                setTimeout(function () {
                                    addCartAnimate(+data["cart_number"]);
                                }, 200);
                            }

                        }
                    },error:function () {
                        window.bravetime.info("网络异常，请稍后重试");
                        // 恢复确定按钮
                        enableButtonForLoading(okButton, "确定")
                    }
                });
                if (commitType == 0) {
                    if (window.buyCallback && typeof window.buyCallback == "function") {
                        window.buyCallback(goodsId);
                    }
                } else if (commitType == 1) {
                    if (window.cartCallback && typeof window.cartCallback == "function") {
                        window.cartCallback(goodsId);
                    }
                }

            }


        } else {
            bravetime.info("请选择 " + needToChoice.join(" "));
        }
    }

    /**
     * 点击立即购买按钮
     * @returns {boolean}
     */
    function clickbuyNowButton() {
        // 禁止点击时候再点击就直接拒绝
        if (buyNowButton.hasClass("disabled")) {
            return false;
        }
        // 如果所有属性都已经选择了
        if (needToChoice.length == 0) {
            // 先检查当前商品数量和库存对比，过大则提示
            var currentNum = numberInput.val();
            if (currentNum > finalNum) {
                bravetime.info("您选择的商品数量过大，请更改");
                return false;
            } else {
                var goodsId = goodOtherInfo[finalTypeStr][2];
                var sag_id = goodOtherInfo[finalTypeStr][0];
                var goods_price = goodDetail[finalTypeStr][0];
                var goods_name = goodOtherInfo[finalTypeStr][1];
                var number = currentNum;

                // 发请求
                var goods = {};
                var spec_arr = [];

                goods.quick = commitType;
                goods.spec = spec_arr;
                goods.goods_id = goodsId;
                goods.number = number;
                goods.sag_id = sag_id;
                goods.price = goods_price;
                goods.name = goods_name;

                disableButtonForLoading(buyNowButton, commitType ? "&nbsp;&nbsp;&nbsp;加入中" : "&nbsp;&nbsp;&nbsp;跳转中");

                $.ajax({
                    url:window.buyUrl,
                    type:"post",
                    dataType:"json",
                    data:{
                        goods: JSON.stringify(goods)
                    },success:function (data) {
                        if (typeof  data == "string") {
                            data = JSON.parse(data);
                        }
                        if (data.error > 0) {
                            if(data.url){
                                window.bravetime.newAlert(data.message,function () {
                                    window.nativeLoginFunction(data.url,function () {
                                        location.reload();
                                    })
                                });
                            }else{
                                // 如果失败的话，首先弹出错误信息
                                window.bravetime.info(data.message);
                                // 然后刷新子属性数量和价格
                                // refreshTypeContainer(data.newInfo, !!data.disable);
                                // 恢复确定按钮
                                enableButtonForLoading(buyNowButton, "立即购买")
                            }

                        } else {
                            // 购买就直接跳走
                            var callback = 'index.php?m=default&c=cart&a=cart';
                            window.bravetime.goto(callback);
                        }
                    },error:function () {
                        window.bravetime.info("网络异常，请稍后重试");
                        // 恢复确定按钮
                        enableButtonForLoading(buyNowButton, "立即购买")
                    }
                });
                if (window.buyCallback && typeof window.buyCallback == "function") {
                    window.buyCallback(goodsId);
                }
            }


        } else {
            bravetime.info("请选择 " + needToChoice.join(" "));
        }
    }

    /**
     * 商品加入购物车动画
     * @param {Number} cartNumber
     */
    function addCartAnimate(cartNumber) {
        // 取第一个头图
        var imgUrl = ttUrl || main.find(".iosSlider").find("img").attr("src");
        // 初始化
        var img = $('<img src="' + imgUrl + '"/>').css({position: "fixed", "z-index": 99, border: "#ccc solid 1px"});
        if ($(window).width() < 640) {
            img.css("width", "150px").css("bottom", "300px").css("left", "50%").css("margin-left", "-75px");
            $("body").append(img);
            // 动画来了
            img.animate({width: "10px", bottom: "35px", left: "10%", "margin-left": "0px"}, 800);
        } else {
            img.css("width", "150px").css("bottom", "300px").css("margin-left", "245px");
            $("body").append(img);
            // 动画来了
            img.animate({width: "10px", bottom: "35px", "margin-left": "0px"}, 800);
        }

        setTimeout(function () {
            // 更改购物车内商品数量展示
            bottom.find(".cart_link").html('<i class="menu-i menu-i-3"></i><b>' + cartNumber + "</b>");
            img.remove();
            addOtherAnimate();
        }, 801);

        function addOtherAnimate() {
            if (tipCartLink) {
                tipCartLink.removeClass("hide").addClass("show");
                setTimeout(function () {
                    tipCartLink.addClass("hide").removeClass("show");
                }, 2500);
            }
        }
    }

    /**
     * 刷新子属性数量和价格
     * @param data
     * @param flag
     */
    /*
    function refreshTypeContainer(data, flag) {
        // 更新下改的那些数据
        goodDetail[finalTypeStr] = data[0];
        goodOtherInfo[finalTypeStr] = data[1];
        // 重复初始化的那些
        newGoodDetailList = handlerGoodDetailData(goodDetail, goodType);
        newGoodDetail = newGoodDetailList[0];
        newTypeData = newGoodDetailList[4];
        defaultTypeStock = newGoodDetailList[3];
        defaultPriceStr = (newGoodDetailList[1] == newGoodDetailList[2]) ? (newGoodDetailList[1].toFixed(2)) : ( "￥" + newGoodDetailList[1].toFixed(2) + " ~ " + "￥" + newGoodDetailList[2].toFixed(2));
        var key = finalTypeStr;
        fireClick(key);
        if (!flag) {
            fireClick(key);
        }
    }
     */

    /**
     * 弹层中修改商品数量
     * @param el
     * @param flag
     */
    function changeNumber(el, flag) {
        var currentTarget = $(el.target),
            goodItem = $(el.target).parents(".number"),
            numberInput = goodItem.find("input"),
            minusButton = goodItem.find(".minus"),
            plusButton = goodItem.find(".plus"),
            currentCount = parseInt(numberInput.val()),
            step = 0,
            minCount = +goodItem.attr("min-count") || defaultMinCount,
            maxCount = +goodItem.attr("max-count") || defaultMaxCount;
        if (currentTarget.hasClass("disable")) {
            return;
        }

        //判断商品数量是否合法
        if (isNaN(currentCount)) {
            currentCount = 1;
        }

        if (currentTarget.hasClass("plus")) {
            step = 1;
        } else if (currentTarget.hasClass("minus")) {
            step = -1;
        }
        currentCount += step;

        numberInput.val(currentCount);

        plusButton.toggleClass('disable', currentCount >= maxCount);
        minusButton.toggleClass('disable', currentCount <= minCount);
    }

    /**
     * 立即购买按钮被点击
     */
    function detailBuy() {
        commitType = 0;
        alertTypeChoiceContainer();
    }

    /**
     * 加入购物车按钮被点击
     */
    function detailCart() {
        commitType = 1;
        //addCartAnimate(11);
        alertTypeChoiceContainer();
    }

    /**
     * 弹出弹出框
     * @param type
     */
    function alertTypeChoiceContainer(type) {
        if (type) { // 点击属性时候弹出
            buyNowButton.removeClass("hide");
            okButton.removeClass("ok2").find("span").text("加入购物车")
        } else { // 点击底部按钮
            buyNowButton.addClass("hide");
            okButton.addClass("ok2").find("span").text("确定");
            if (commitType == 0 && needToChoice.length == 0) { // 立即购买时候判断是不是所有属性都选了
                // 先检查当前商品数量和库存对比，过大则提示
                var currentNum = numberInput.val();
                if (currentNum > finalNum) {
                    bravetime.info("您选择的商品数量过大，请更改");
                    return false;
                } else {
                    var goodsId = goodOtherInfo[finalTypeStr][2];
                    var sag_id = goodOtherInfo[finalTypeStr][0];
                    var goods_price = goodDetail[finalTypeStr][0];
                    var goods_name = goodOtherInfo[finalTypeStr][1];
                    var number = currentNum;

                    // 发请求
                    var goods = {};
                    var spec_arr = [];

                    goods.quick = commitType;
                    goods.spec = spec_arr;
                    goods.goods_id = goodsId;
                    goods.number = number;
                    goods.sag_id = sag_id;
                    goods.price = goods_price;
                    goods.name = goods_name;

                    disableButtonForLoading(buyButton, commitType ? "&nbsp;&nbsp;&nbsp;加入中" : "&nbsp;&nbsp;&nbsp;跳转中");
                    $.ajax({
                        url:window.buyUrl,
                        type:"post",
                        dataType:"json",
                        data:{
                            goods: JSON.stringify(goods)
                        },
                        success:function (data) {
                            if (typeof  data == "string") {
                                data = JSON.parse(data);
                            }
                            if (data.error > 0) {
                                // 如果失败的话，首先弹出错误信息
                                if(data.url){
                                    window.bravetime.newAlert(data.message,function () {
                                        window.nativeLoginFunction(data.url,function () {
                                            location.reload();
                                        })
                                    });
                                }else{
                                    bravetime.info(data.message);
                                    showIt();
                                }


                                // 然后刷新子属性数量和价格
                                // refreshTypeContainer(data.newInfo, !!data.disable);
                                // 恢复确定按钮
                                enableButtonForLoading(buyButton, "立即购买")
                            } else {
                                var callback = 'index.php?m=default&c=cart&a=cart';
                                window.bravetime.goto(callback);

                            }
                        },error:function () {
                            window.bravetime.info("网络异常，请稍后重试");
                            // 恢复确定按钮
                            enableButtonForLoading(buyButton, "立即购买")
                        }
                    });

                }

                return false
            }

        }
        showIt()

        function showIt() {
            var inner = alertContainer.find(".s-decision");
            alertContainer.css("opacity", 0);
            inner.css("bottom", -height + "px");
            alertContainer.removeClass("hide");
            alertContainer.animate({opacity: 1}, 200);
            inner.animate({bottom: "0px"}, 250);
            main.addClass("lock");
        }

    }

    /**
     * 关闭弹出框
     */
    function removeAlertContainer() {
        main.removeClass("lock");
        var inner = alertContainer.find(".s-decision");
        alertContainer.animate({opacity: 0}, 200);
        inner.animate({bottom: "-500px"}, 250, "linear", function () {
            alertContainer.addClass("hide");
        });

    }

    /**
     * 处理详细信息数据
     * @param detailData
     * @param typeData
     * @returns {*[]}
     */
    function handlerGoodDetailData(detailData, typeData) {
        var min = Infinity, max = 0, all = 0;
        var newDetailData = {};
        var newTypeData = {};
        for (var i = 0, len = typeData.length; i < len; i++) {
            newTypeData["__" + typeData[i]["id"]] = typeData[i]["title"];
            for (var j = 0, detailLen = typeData[i]["detail"].length; j < detailLen; j++) {
                newTypeData[typeData[i]["detail"][j]["key"]] = typeData[i]["detail"][j]["value"];
            }
        }
        for (var i in detailData) {
            // then analysis data
            var keys = i.split(":"),  r = [];
            // add new_activity item ,and link it with other in array
            for (var j = 0; j < keys.length; j++) {
                var len = r.length;
                r.push(keys[j].toString());
                for (var k = 0; k < len; k++) {
                    r.push(r[k] + ":" + keys[j]);
                }
            }
            // 处理数据
            for (var m = 0; m < r.length; m++) {
                if (newDetailData[r[m]] && typeof newDetailData[r[m]][1] != "undefined") {
                    if (detailData[i][1] != 0) { // 价格为0就不加入
                        if (newDetailData[r[m]][0]) {
                            newDetailData[r[m]][0] = newDetailData[r[m]][0].toString() + "," + detailData[i][0].toString();
                        } else {
                            newDetailData[r[m]][0] = detailData[i][0];
                        }

                    }
                    // 数量相加
                    newDetailData[r[m]][1] += detailData[i][1];
                    // 限购导致的剩余数量和不限购的总数量的和
                    if (detailData[i][1] == 0) {
                        newDetailData[r[m]][6] += 0;
                    } else if (detailData[i][3] < 0) {
                        // 不限购的话增加商品数量
                        newDetailData[r[m]][6] += detailData[i][1];
                    } else {
                        // 限购的话增加剩余限购数量
                        newDetailData[r[m]][6] += Math.max(0, detailData[i][3] - detailData[i][4]);
                    }
                } else {
                    newDetailData[r[m]] = [];
                    // 价格为0就不加入
                    if (detailData[i][1] != 0) {
                        newDetailData[r[m]][0] = detailData[i][0];
                    }
                    newDetailData[r[m]][1] = detailData[i][1];
                    newDetailData[r[m]][2] = detailData[i][2];
                    newDetailData[r[m]][5] = detailData[i][4];
                    newDetailData[r[m]][4] = detailData[i][3];
                    if (detailData[i][1] == 0) {
                        newDetailData[r[m]][6] = 0;
                    } else if (detailData[i][3] < 0) {
                        newDetailData[r[m]][6] = detailData[i][1];
                    } else {
                        newDetailData[r[m]][6] = Math.max(0, (detailData[i][3]||0) - (detailData[i][4]||0));
                    }

                }
            }

            if (detailData[i][0] > max && detailData[i][1] != 0 && (detailData[i][3] < 0 || (detailData[i][4] < detailData[i][3]))) {
                max = detailData[i][0];
            }
            if (detailData[i][0] < min && detailData[i][1] != 0 && (detailData[i][3] < 0 || (detailData[i][4] < detailData[i][3]))) {
                min = detailData[i][0];
            }
            all += detailData[i][1];
        }

        for (var i in newDetailData) {
            var array = i.split(":");
            for (var j = 0, len = array.length; j < len; j++) {
                array[j] = newTypeData[array[j]];
            }
            newDetailData[i][3] = array;
        }
        return [newDetailData, min, max, all, newTypeData];
    }

    /**
     * 新增类型按钮
     * @param goodTypeData
     */
    function handlerTypeDom(goodTypeData) {
        var ul = alertContainer.find(".s-decision").find("ul").html("");
        // 设置中间位置高度
        alertContainer.find(".sku-control").css("height", (Math.floor(height * 0.7) - 85) + "px");
        // clear ul;
        for (var i = 0, l = goodTypeData.length; i < l; i++) {
            var li = $("<li></li>").html('<div class="s-decision_title">' + goodTypeData[i]["title"] + '</div><div class="items"></div></div> ');
            ul.append(li); // add li
            $.data(li[0], "data-for-id", goodTypeData[i]["id"]);
            buttonListByLi[goodTypeData[i]["id"]] = [];
            var item = li.find(".items");
            var detail = goodTypeData[i]["detail"], detailLength = detail.length;
            for (var j = 0; j < detailLength; j++) {
                var key = detail[j]["key"];
                var button = $("<span></span>").addClass("button").html(detail[j]["value"]);
                $.data(button[0], "data-for-key", key);
                if (newGoodDetail[key][1] == 0 || newGoodDetail[key][6] == 0) {
                    button.addClass("disabled")
                }
                buttonListByLi[goodTypeData[i]["id"]].push(button[0]);
                item.append(button); // add button
                buttonList.push(button);
            }
        }
    }

    /**
     * 点击子属性按钮
     * @param {Object} button
     * @returns {boolean}
     */
    function buttonClick(button) {
        var id = $.data(button.parentNode.parentNode, "data-for-id"), key = $.data(button, "data-for-key"), $button = $(button);
        // 如果不可点击，直接返回
        if ($button.hasClass("disabled")) {
            return false;
        } else if ($button.hasClass("active")) {
            // 已经选中的话 取消选中
            $button.removeClass("active");
            currentTypeStatus[id] = null;
            updateButtonDom($button);
            return false;
        }
        // 可以点击的话，把同属性设置为未点击，当前设置为已点击
        $button.parent().find("span.button").removeClass("active");
        $button.addClass("active");
        // 记录当前选中情况
        currentTypeStatus[id] = key;
        updateButtonDom($button);

    }

    /**
     * 更新按钮
     * @param $button
     */
    function updateButtonDom($button) {
        var currentLength = 0, typeArray = [], choice = [], toChoice = [];

        for (var i in currentTypeStatus) {
            if (currentTypeStatus[i]) {
                currentLength++;
                typeArray.push(currentTypeStatus[i]);
                choice.push([i, currentTypeStatus[i]]);
            } else {
                toChoice.push(newTypeData["__" + i]);
            }

        }
        needToChoice = toChoice;
        var typeStr = typeArray.sort(function (a, b) {
            return a - b;
        }).join(":");
        finalTypeStr = typeStr;
        if (typeStr.length) {
            newGoodDetail[typeStr] = newGoodDetail[typeStr] || [9999, 0, 0, ""];
            var newGood = newGoodDetail[typeStr];
            var taxes =  '0.00';
            var isLimit =false;
            if(goodsTaxesAndLimitInfo[typeStr]){
                taxes = goodsTaxesAndLimitInfo[typeStr][0];
                isLimit = goodsTaxesAndLimitInfo[typeStr][1];
            }

            typeTitle.html("您已选择：" + newGood[3].join(' '));
            selectTitle.html("已选择");
            selectContent.html('<span>' + newGood[3].join('</span><span>') + '</span>');
            // 所有属性都选完了以后，更新价格和库存
            if (currentLength == allTypeLength) {
                // 活动信息
                var otherInfo = "";
                if (newGood[2] == 1) {
                    otherInfo = '<span style="margin-left: 4px; font-size: 12px;">（参与“秒杀”活动）</span>';
                } else if (newGood[4] > -1&&isLimit) {
                    // 有限购
                    if (newGood[5] > 0) {
                        otherInfo = '<span style="margin-left: 4px; font-size: 12px;">（本商品限量购买' + newGood[4] + '件，您已经购买了' + newGood[5] + '件）</span>';
                    } else {
                        otherInfo = '<span style="margin-left: 4px; font-size: 12px;">（本商品限量购买' + newGood[4] + '件）</span>';
                    }

                }
                else if (newGood[2] == 2) {
                    otherInfo = '<span style="margin-left: 4px; font-size: 12px;">（参与“团购”活动）</span>';
                }else if(taxes!="0.00"){
                    otherInfo = '<span style="margin-left: 4px; font-size: 12px;"> (含税 ￥'+taxes+') </span>';
                }
                // 更改价格
                typePrice.html("￥" + newGood[0].toFixed(2) + otherInfo);
            } else {
                // 更改价格
                var priceList = newGood[0].toString().split(",");
                var priceMax = Math.max.apply(null, priceList);
                var priceMin = Math.min.apply(null, priceList);
                if (priceMax == priceMin) {
                    typePrice.html("￥" + priceMin.toFixed(2));
                } else {
                    typePrice.html("￥" + priceMin.toFixed(2) + " ~ " + "￥" + priceMax.toFixed(2));
                }
            }
            // 更改库存
            typeStock.html("库存：" + newGood[1] + "件");
            finalNum = newGood[1];
            // 更改数量范围
            alertContainer.find(".number").attr("max-count", Math.min(newGood[6], newGood[1]));
            if (newGood[2] == 1) {
                alertContainer.find(".number").attr("max-count", 1);
            }
            // 更新加减号状态
            changeNumber({target: alertContainer.find("input")[0]});
        } else {
            typeTitle.html("请选择" + defaultTypeStr);
            typePrice.html(defaultPriceStr);
            typeStock.html("库存：" + defaultTypeStock + "件");
            selectTitle.html("请选择");
            selectContent.html(defaultTypeStr);
        }


        // 每次选择，更新其他属性价格
        // 需要更新的按钮
        var buttonListToUpdate = filterButtonByButton($button);
        updateOtherButtonStatus(buttonListToUpdate, choice);

    }

    /**
     * 更新其他按钮状态
     * @param list
     * @param c
     */
    function updateOtherButtonStatus(list, choice) {

        for (var i = 0, l = list.length; i < l; i++) {
            var button = list[i];
            var id = $.data(button.parentNode.parentNode, "data-for-id");
            var c = [];
            for (var j = 0, len = choice.length; j < len; j++) {
                if (choice[j][0] != id) {
                    c.push(choice[j][1]);
                }
            }
            var str = c.concat($.data(button, "data-for-key")).sort(function (a, b) {
                return a - b;
            }).join(":");
            newGoodDetail[str] = newGoodDetail[str] || [9999, 0, 0, ""];
            var num = newGoodDetail[str][1];
            var numEnable = newGoodDetail[str][6];
            if (num == 0 || numEnable == 0) {
                $(button).addClass("disabled");
            } else {
                $(button).removeClass("disabled");
            }
        }
    }

    /**
     * 筛选要更新的按钮,结果是所有其他列的按钮
     */
    function filterButtonByButton($btn) {
        var buttonListToUpdate = [];
        var liId = $.data($btn.parent().parent()[0], "data-for-id");
        for (var i in buttonListByLi) {
            if (i != liId) {
                buttonListToUpdate = buttonListToUpdate.concat(buttonListByLi[i]);
            }
        }
        return buttonListToUpdate;
    }

    /**
     * 普通商品购买
     */
    function detailBuyNormal() {
        var goods = {};
        var spec_arr = [];
        var number = 1;
        var quick = 0;

        goods.quick = quick;
        goods.spec = spec_arr;
        goods.goods_id = goodsId;
        goods.number = number;
        goods.sag_id = sag_id;
        goods.price = goods_price;
        goods.name = goods_name;

        disableButtonForLoading(buyButton, "&nbsp;&nbsp;&nbsp;跳转中");

        $.ajax({
            url:window.buyUrl,
            type:"post",
            dataType:"json",
            data:{
                goods: JSON.stringify(goods)
            },
            success:function (data) {
                if (data.error > 0) {
                    if(data.url){
                        window.bravetime.newAlert(data.message,function () {
                            window.nativeLoginFunction(data.url,function () {
                                location.reload();
                            })
                        });
                    }else{
                        bravetime.info(data.message)
                    }

                    enableButtonForLoading(buyButton, "立即购买");
                } else {
                    var callback = 'index.php?m=default&c=cart&a=cart&rp=goods_detail&rl=add';
                    window.bravetime.goto(data.url||callback);
                }
            },error:function () {
                window.bravetime.info("网络异常，请稍后重试");
                enableButtonForLoading(buyButton, "立即购买");
            }
        });
        if (window.buyCallback && typeof window.buyCallback == "function") {
            window.buyCallback(goodsId);
        }
    }

    /**
     * 普通商品加入购物车
     */
    function detailCartNormalTodo() {
        var goods = {};
        var spec_arr = [];
        var number = 1;
        var quick = 1;

        goods.quick = quick;
        goods.spec = spec_arr;
        goods.goods_id = goodsId;
        goods.number = number;
        goods.sag_id = sag_id;
        goods.price = goods_price;
        goods.name = goods_name;

        disableButtonForLoading(cartButton, "&nbsp;&nbsp;&nbsp;加入中...");

        $.ajax({
            url:window.buyUrl,
            type:"post",
            dataType:"json",
            data:{
                goods: JSON.stringify(goods)
            },
            success:function (data) {
                enableButtonForLoading(cartButton, "加入购物车");
                if (data.error > 0) {
                    if (data.error == 2) {
                        window.bravetime.confirm("商品已经在购物车中", {
                            okText: "再逛逛",
                            // okLink:"/", //点击再逛逛跳到的链接
                            cancelText: "去购物车",
                            cancelLink: "/cart.html" //点击去结算跳到的链接
                        });
                    } else {
                        window.bravetime.info(data.message);
                    }
                } else {
                    addCartAnimate(data["cart_number"]);
                }
            },
            error:function () {
                window.bravetime.info("网络异常，请稍后重试");
                enableButtonForLoading(cartButton, "加入购物车");
            }
        });


        if (window.cartCallback && typeof window.cartCallback == "function") {
            window.cartCallback(goodsId);
        }
    }

    /**
     * loading时禁止按钮
     * @param el
     * @param text
     */
    function disableButtonForLoading(el, text) {
        el.addClass("disabled");
        el.find("span.text").html(text);
    }

    /**
     * loading结束解除按钮禁止
     * @param el
     * @param text
     */
    function enableButtonForLoading(el, text) {
        el.removeClass("disabled");
        el.find("span.text").html(text);
    }

    /**
     * 初始化收藏功能
     */
    function initCollect() {
        var collectContainer = bottom.find(".collect");
        // 向前面版本兼容
        if (collectContainer.length) {
            var ico = collectContainer.find(".icon");
            var txt = collectContainer.find(".collect_text");
            collectContainer.click(function () {
                bravetime.addLoader({little: true});
                if (ico.hasClass("collect_icon")) {
                    // 未收藏
                    $.ajax({
                        url: window.collectUrl,
                        dataType: "json",
                        data: {
                            id: window.goodsId,
                            collect: 1
                        }, success: function (result) {
                            bravetime.removeLoader();
                            if (result["error"] == -1) {
                                if(Units.isApp()){
                                    var callback = function (r) {
                                        if(typeof r == "string"){
                                            r = JSON.parse(r);
                                        }
                                        var code = r.code;
                                        if(code==0){
                                            // 没登录
                                        }else if(code == 1){
                                            location.reload();
                                        }
                                    };
                                    bravetime.nativeLogin(callback)
                                }
                                else {
                                    bravetime.goto(result["url"]);
                                }
                            } else if (result["error"]) {
                                bravetime.info(result["msg"]);
                            } else {
                                ico.removeClass("collect_icon").addClass("favorited_icon");
                                txt.html("已收藏");
                                bravetime.info("收藏成功");
                            }

                        }, error: function () {
                            bravetime.removeLoader();
                            bravetime.ajaxError(36);
                        }
                    });
                } else {
                    // 已收藏
                    $.ajax({
                        url: window.collectUrl,
                        dataType: "json",
                        //type:"POST",
                        data: {
                            id: window.goodsId,
                            collect: 0
                        }, success: function (result) {
                            bravetime.removeLoader();
                            if (result["error"]) {
                                bravetime.info(result["msg"]);
                            } else {
                                ico.addClass("collect_icon").removeClass("favorited_icon");
                                txt.html("收藏");
                            }
                        }, error: function () {
                            bravetime.removeLoader();
                            bravetime.ajaxError(36);
                        }
                    });
                }
            });
        }

    }



});


//引入 猜你喜欢 模块
var maybeYouLike = require("../module/maybeYouLike.vue");
var common = require("../module/common/common.es6");
common.default.initShare(5);

new Vue({
    el: "#detail",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        maybeYouLike:maybeYouLike
    }
});
//单品倒计时
var seckillContainer = $(".seckillCountdown");
var time = $(".time");
var timestamp = Date.parse(new Date()) / 1000;

if(seckillContainer.length){
    var seckillTime = + indexSeckillCountdown;
    seckillTime = seckillTime - timestamp ;


    if(seckillTime<0){
        time.html("<div class = 'super_price' style='float:right;font-size:18px;margin-right: 5px'>活动已结束</div>")
    }else{
        time.html(seckillCountdown(seckillTime));
    }

    var  ts = setInterval(function () {
        if(seckillTime<0){
            time.html("<div class = 'super_price' style='float:right;font-size:18px;margin-right: 5px'>活动已结束</div>")
            clearInterval(ts);
        }else{
            time.html(seckillCountdown(seckillTime));
        }
        seckillTime--;
    },1000);
}



function seckillCountdown(second) {
    var s = second % 60, m = Math.floor(second / 60) % 60,
        h = Math.floor(second / 60 / 60);
    var str = '';
    str = '<div class = "fz_13" style="text-align: center;">活动倒计时</div> <div> <div class="seckillCountdown"> <span class="seckill_bg">' + (h < 10 ? '0' : '') + h + '</span>' + '<span class="seckill_semicolon">' + ' : ' + '</span>' + '<span class="seckill_bg">' + (m < 10 ? '0' : '') + m +'</span>' + '<span class="seckill_semicolon">' + ' : ' + '</span>' + '<span class="seckill_bg">' + (s < 10 ? '0' : '') + s+'</span> </div> </div>'
    //str ="<span class='seckill_bg'>" + (h < 10 ? "0" : "") + h + "</span>" + "<span class='seckill_semicolon'>" + " : " + "</span>" + "<span class='seckill_bg'>" + (m < 10 ? "0" : "") + m +"</span>" + "<span class='seckill_semicolon'>" + " : " + "</span>" + "<span class='seckill_bg'>" + (s < 10 ? "0" : "") + s+"</span>";
    return str;
}
