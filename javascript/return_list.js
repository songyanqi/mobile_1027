/**
 * Created by Murphy.lee on 16/11/8.
 */
/**
 * Created by luming on 2016/10/29.
 */
$(function(){
    var allData = []; // 数据
    // var page = 1;
    var page = 2;
    var refreshFlag = 0; // 下拉刷新标识
    var refreshContainer = $(".refresh");
    var container = $(".order_list_container");
    var refreshEndFlag = 0;//下拉结束标识
    // var pageSize = 3;
    var pageSize = 5;
    var height = $("body").height() - 100;

    if(height < $(window).height()){
        refreshContainer.html("没有更多退货订单");
    }

    /**
     * 增加监听
     */
    function addListener() {
        // 下拉刷新
        $(window).on("scroll", function () {
            var bodyHeight = $(document.body).height();
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            var bottom = bodyHeight - scrollTop - windowHeight;
            if (bottom < 100) {
                down2refresh();
            }
        });
    }

    /**
     * 下拉刷新
     */
    function down2refresh() {
        if (!refreshFlag) {
            refreshFlag = true;
            loadData(function (result) {
                if (result["error"]) {
                    refreshFlag = false;
                    bravetime.info(result["msg"]);
                } else {
                    if (result.data.length) {
                        refreshFlag = false;
                        page = page + 1;
                        // 展示页面内容,同时把数据存在内存里
                        var data = result.data;
                        addDataToPage(data);
                        if (result.data.length < pageSize) {
                            refreshContainer.html("没有更多退货订单");
                            refreshFlag = true;
                            refreshEndFlag = 1;
                        }
                    } else {
                        refreshContainer.html("没有更多退货订单");
                    }

                }
            }, function () {
                refreshFlag = false;
                bravetime.ajaxError(35);
            });
        }
    }
    /**
     * 加载数据
     * @param {function} callback
     * @param {function} error
     */
    function loadData(callback, error) {
        var url = window.returnListUrl;
        $.ajax({
            url: url,
            dataType: "json",
            data: {
                _t:Date.now()+Math.random(),
                page_size: pageSize,
                page: page
            },
            success: callback,
            error: error
        });
    }

    /**
     * 把数据渲染到页面
     * @param data
     */
    function addDataToPage(data) {
        if (data.length) {
            for (var i = 0, d; d = data[i++];) {
                var id = d["id"], cancel_type = d["cancel_type"];
                // 发货单标示
                var delivery_str = '';//不一定要加

                //订单列表状态
                var status = d["status"];

                var htmlStr =
                    "<div class='order_list_item dav-shadow'>" +
                    "<div class='order_name'>" +
                    "<a href='" + d["shop_url"] + "'><span class='shop_icon'></span>" +
                    "<span class='shop_title'>" + d["shop_name"] + "</span><span class='shop_arrow'></span>" +
                    "</a>" +
                    "<span class='pull-right dav-red'>" + status + "</span>" +
                    "</div>" +
                    '<a class="order_good_list" href="/refund-' + id + '.html">' +
                    '<div class="img_container"><div class="img_container_inner"></div></div>' +
                    '</a>' +
                    "<div class='order_buttons'>" +
                    "<div style = 'float: right;'>" +
                    "退款金额：<span class = 'span-right dav-red'>￥" + d["money"] + "</span>" +
                    "</div>" +
                    "<div style = 'float: right;margin-right: 10px;'>" +
                    "<span class = 'span-right'>交易金额：￥" + d["suggest_money"] + "</span>" +
                    "</div><div style='clear: both'></div>" +
                    "</div>";
                var item = $(htmlStr);
                container.append(item);
                // 商品部分

                item.find(".order_good_list").addClass("single_good");
                var good = d["goods"];
                var info = $('<div class="order_good_info_container dav-small">' +
                    '<div class="order_good_name">' + good.goods_name +
                    '</div><div class="order_good_price">￥' +
                    good.goods_price + ' X ' + good.amount +
                    '</div></div>');
                item.find(".img_container").append(info);
                var img = $('<img src="' + good.goods_pic + '"  style="display: inline;">');
                item.find(".img_container_inner").append(img);

                //多个图片？
                // else {
                //     for (var j = 0, good; good = d["goods"][j++];) {
                //         item.find(".img_container_inner").append($('<img src="' + good["goods_pic"] + '"  style="display: inline;">'));
                //     }
                // }
                // var height = item.find(".img_container_inner").height();
                // if (height > 60) {
                //     item.find(".order_good_list").append($('<div class="pull-right text-container">共' + d["goods"].length + '件<br/>商品</div>'));
                //     item.find(".img_container_inner").css("height", "60px");
                // }
                // loading 部分
                if (data.length < pageSize || refreshEndFlag) {
                    refreshContainer.html("没有更多退货订单");
                } else {
                    refreshContainer.html('<div class="uil-default-css-normal" style="-webkit-transform:scale(0.15);-moz-transform:scale(0.15);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;width:30px;height: 30px;display: inline-block;"><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;"></div></div><div>数据加载中...</div>');
                }

            }
        }
        else {
            refreshContainer.html("没有更多退货订单");
        }
    }
    addListener();
})
