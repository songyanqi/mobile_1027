/**
 * Created by nemolee on 15/11/27.
 */
$(function () {
    var ajaxing = 0, pageIndex = pageIndexStart;
    var refreshContainer = $(".refresh");
    var pageName = "collect";
    var list = $(".good_list_2_row");
    // 店主推荐
    if ($(".shop_keeper").length) {
        pageName = "shopManage";
    }

    var allGoodsList = [],p=pageName;
    var goodsListDataAndPage = getGoodsListFromCache(p);
    if(goodsListDataAndPage){
        allGoodsList = goodsListDataAndPage.goods;
        pageIndex = goodsListDataAndPage.page;
        addDataToPage({has_more:true,data:allGoodsList});
        getYCache(pageName);
    }

    setTimeout(function () {
        addListener(); // 增加监听器
    },500);



    /**
     * 增加监听
     */
    function addListener(){
        $(document).on("click",".delete_btn",removeCollect);
        $(window).on("scroll", function () {
            var bodyHeight = $(document.body).height();
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            var bottom = bodyHeight - scrollTop - windowHeight;
            if (bottom < 100 && $(".refresh").length) {
                down2refresh();
            }
        });
        list.on("click","a",function () {
            setYCache(pageName);
        });
    }

    /**
     * 下拉刷新
     */
    function down2refresh() {
        if (ajaxing) {
            return false;
        } else {
            ajaxing = 1;
            $.ajax({
                url: down2refreshUrl,
                dataType: "json",
                data: {
                    page: pageIndex,
                    pagesize: pagesize,
                    t: Date.now()
                },
                success: function (result) {


                    if (result["error"]) {
                        bravetime.info(result["msg"]);
                        ajaxing = 0;
                    } else {
                        if (result["data"].length) {
                            ajaxing = 0;
                            addDataToPage(result);
                            allGoodsList = allGoodsList.concat(result.data);
                            var saveData = {};
                            saveData.goods = allGoodsList;
                            saveData.page = pageIndex-1;
                            setGoodsListToCache(p,saveData);
                        } else {
                            if (pageName == "collect") {
                                refreshContainer.html("没有更多收藏");
                            } else if (pageName == "shopManage") {
                                refreshContainer.html("没有更多店主推荐商品");
                            }

                        }
                    }
                    // window.bravetime.tj.pvSend('collect_d2refresh','collect_d2refresh_p'+pageIndex);
                }, error: function () {
                    bravetime.ajaxError(37);
                    ajaxing = 0;
                }
            });
        }
    }

    /**
     * 把数据渲染到页面
     */
    function addDataToPage(data) {
        var goodsData = data["data"], good, i = 0;
        for (; good = data["data"][i++];) {
            if (pageName == "collect") {
                $('<div  class="good_item" data-for-id="' + good["goods_id"] + '"><a href="' + good["url"] + '"><div class="good_img_container">' +
                    '<img src="' + good["goods_img"] + '">' +
                    ((good["sale_status"] == "offline" || good["sale_status"] == "soldout") ? ('<div class="good_list_sell_out">' + {
                        offline: "下架",
                        soldout: "售罄"
                    }[good["sale_status"]] + '</div>' ) : "") +

                    (good["tag"] ? ('<div class="' + good["tag"].toString() + '"></div>') : "") +
                    '</div></a><div class="good_con"><a href="' + good["url"] + '"><div class="good_title">' + good["goods_name"] + '</div></a><span class="fz_12"><span class="dav-color-price"><a href="' + good["url"] + '">¥' + good["shop_price"] + '</a></span>' +
                    '<span class="pull-right delete_btn">删除</span>' +
                    '</div></div></div>').appendTo(list);
            } else if (pageName == "shopManage") {
                $('<a href="' + good["url"] + '" class="good_item">' +
                    '<div class="good_img_container">' +
                    '<img src="' + good["goods_img"] + '">' +
                    ((good["sale_status"] == "offline" || good["sale_status"] == "soldout") ? ('<div class="good_list_sell_out">' + {
                        offline: "下架",
                        soldout: "售罄"
                    }[good["sale_status"]] + '</div>' ) : "") +
                    (good["tag"] ? ('<div class="' + good["tag"].toString() + '"></div>') : "") +
                    '</div>' +
                    '<div class="good_con">' +
                    '<div class="good_title">' + good["goods_name"] + '</div>' +
                    '<div class="fz_12">' +
                    '<span class="dav-color-price">¥ ' + good["shop_price"] + '</span>' +
                    '<span class="market_price">¥ ' + good["market_price"] + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</a>').appendTo(list);
            }

        }

        pageIndex++;
        ajaxing = 0;
        if (!data["has_more"]) {
            ajaxing = 1;
            refreshContainer.html("没有更多商品了！");
        }
    }

    /**
     * 取消收藏
     */
    function removeCollect(){
        var item = $(this).parents(".good_item");
        var id = item.attr("data-for-id");
        bravetime.addLoader({little:true});
        $.ajax({
            url:window.collectUrl,
            dataType:"json",
            //type:"POST",
            data:{
                collect:0,
                id:id
            },
            success: function (result) {
                bravetime.removeLoader();
                if(result["error"]){
                    bravetime.info(result["msg"]);
                }else{
                    item.remove();
                }
            },
            error: function () {
                bravetime.removeLoader();
                bravetime.ajaxError(37);
            }
        });
    }
});
