jQuery(document).ready(function ($) {
    if(window.haveMask){
        $("body,html").css({"overflow":"hidden"});
    }
    $(".alertStyleMask").on('touchmove',function(e){
        e.preventDefault();
    })
    $(".alertStyle").on('touchmove',function(e){
        e.preventDefault();
    })
    $(".alertStyle1").on('touchmove',function(e){
        e.preventDefault();
    })
    $('.alertStyleMask').on('click', function () {
        $('.alertStyle').css({
            display:'none'
        })
        $('.alertStyleMask').css({
            display:'none'
        })
        $('.alertStyle1').css({
            display:'none'
        })
        $("body,html").css({"overflow":"visible"});
    })




    if ($(".order_detail_container").length) {
        //订单详情页面点击确认收货、评价、追加评价之后返回来刷新页面
        if(sessionStorage.getItem('orderDetail')){
            sessionStorage.removeItem('orderDetail');
            location.reload();
        }

        if (location.href.indexOf("change_address=1") > -1) {
            bravetime.info("地址修改成功");
        }
        $.cookie('PassOrderDetail', 1);

        var isOldOrder = window.isOldOrder;
        //提醒发货
        var time = Date.now();
        $(".order-tx").click(function (el) {
            var id = $(this).attr("data-for-order-id");
            id = window.deliveryId ? window.deliveryId : id;
            window.bravetime.addLoader();
            $.ajax({
                url: txUrl,
                type: 'POST',
                dataType: 'json',
                data: {id: id, time: time},
                success: function (result) {
                    if (result["error"] == 0) {
                        window.bravetime.removeLoader();
                        window.bravetime.newAlert("提醒成功");
                    } else {
                        window.bravetime.removeLoader();
                        window.bravetime.newAlert(result["msg"]);
                    }
                },
                error: function () {
                    window.bravetime.removeLoader();
                    bravetime.ajaxError(24);
                }
            });

        });

        // 关闭订单
        $(".order-close-order").click(function () {
            window.bravetime.newConfirm("您确定要关闭订单么？", {
                okLink: function () {
                    window.bravetime.addLoader();
                    $.ajax({
                        url: closeOrderUrl,
                        dataType: "json",
                        data: {
                            id: window.orderId
                        },
                        success: function (result) {
                            if (result["error"] == 0) {
                                // 有refer才返回
                                if (document.referrer && document.referrer != "") {
                                    window.history.go(-1);
                                } else {
                                    location.reload();
                                }
                            } else {
                                window.bravetime.removeLoader();
                                window.bravetime.newAlert(result["msg"]);
                            }
                        }, error: function () {
                            window.bravetime.removeLoader();
                            bravetime.ajaxError(25);
                        }
                    });
                }
            })
        });

        // 确认收货
        $(".order-arrive").click(function () {
            var id = $(this).attr("data-for-order-id");
            id = window.deliveryId ? window.deliveryId : id;
            window.bravetime.newConfirm("您确定收到商品了么？", {
                okLink: function () {
                    bravetime.addLoader({little:true});
                    $.ajax({
                        url: arriveUrl,
                        dataType: "json",
                        data: {
                            id: id
                        },
                        success: function (result) {
                            bravetime.removeLoader();
                            if (result["error"] == 0) {
                                //成功之后跳转到确认收货页面
                                bravetime.goto(result.data.redirect_link);
                                //一进页面在最上面代码获取下面的orderList，如果有就刷新页面
                                sessionStorage.setItem('orderDetail',"Refresh");
                            } else {
                                bravetime.info(result["msg"]);
                            }
                        }, error: function () {
                            bravetime.removeLoader();
                            bravetime.ajaxError(26);
                        }
                    });
                }
            });
        });

        // 删除订单
        $(".order-delete-order").click(function () {
            window.bravetime.newConfirm("您确定要删除订单么？", {
                okLink: function () {
                    window.bravetime.addLoader();
                    $.ajax({
                        url: deleteOrderUrl,
                        dataType: "json",
                        data: {
                            id: window.orderId
                        },
                        success: function (result) {
                            if (result["error"] == 0) {
                                var cookieIndex = $.cookie("order_list_index");
                                window.bravetime.goto(orderListUrl + "#tag" + cookieIndex);
                            } else {
                                window.bravetime.removeLoader();
                                window.bravetime.newAlert(result["msg"]);
                            }
                        }, error: function () {
                            window.bravetime.removeLoader();
                            bravetime.ajaxError(26);
                        }
                    });
                }
            });
        });

        // 取消订单
        $(".cancel_order").click(function () {
            var me = this;
            bravetime.newConfirm("您确定要取消订单么？", {
                okLink: function () {
                    bravetime.addLoader({little: true});
                    $.ajax({
                        url: cancelOrderUrl,
                        dataType: "json",
                        data: {
                            id: window.orderId
                        },
                        success: function (result) {
                            bravetime.removeLoader();
                            if (result["error"]) {
                                bravetime.info(result["msg"]);
                            } else {
                                var info = {success: "取消成功", error: "取消失败", wait: "取消审核中"}[result["flag"]] || "取消审核中";
                                $(me).parents(".order_goods_state").html('<a class="dav-btn btn-white btn-disable">' + info + '</a>');
                                var myDate = new Date();
                                var time_mon = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1);
                                var time_d = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate();
                                var time_h = myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours();
                                var time_min = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes();
                                var time_sec = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds();
                                var time = myDate.getFullYear() + '-' + time_mon + '-' + time_d + ' ' + time_h + ':' + time_min + ':' + time_sec;
                                if (result["flag"] == "wait") {
                                    $(".order_id").find(".pull-right").html("已冻结");
                                    var wait_html = '<li><span class="line"></span><div class="left"><img src="//img.davdian.com/free/order_head_pic_xss.png" style=" border-radius:32px;"></div>'
                                        + '<div class="right"><p class="dav-color9">' + time + '</p><p class="dav-color6 fz_14">申请取消订单，待客服审核</p></div></li>';
                                    $(".order_handle ul").append($(wait_html));
                                    $('.order-tx').remove();
                                } else if (result["flag"] == "success") {
                                    // $(".order_id").find(".pull-right").html("已关闭");
                                    var success_html = '<li><span class="line"></span><div class="left"><img src="//img.davdian.com/free/order_head_pic_xss.png" style=" border-radius:32px;"></div>'
                                        + '<div class="right"><p class="dav-color9">' + time + '</p><p class="dav-color6 fz_14">' + result["success_text"] + '</p></div></li>';
                                    $(".order_handle ul").append($(success_html));
                                    $('.order-tx').remove();
                                } else if (result["flag"] == "error") {
                                    bravetime.info(result["msg"]);
                                }
                            }

                        },
                        error: function () {
                            bravetime.removeLoader();
                            bravetime.ajaxError(32);

                        }
                    });
                }
            });

        });

        // 跳评价编辑页面
        $(".commentBtn").click(function () {
            var href = $(".commentBtn").attr("data-href");
            if(window.Units && Units.isApp()){
                window.evaCallback = function () {
                    setTimeout(function () {
                        location.reload();
                    },300);
                };
            }
            else {
                sessionStorage.setItem('orderDetailRefresh',"Refresh");
            }
            bravetime.openNewPage({type:1,url:href,jsMethod:'evaCallback()'});
            return false;
        });

        // 跳评价列表页面
        $(".commentListBtn").click(function () {
            var href = $(".commentListBtn").attr("data-href");
            bravetime.goto(href);
            sessionStorage.setItem('orderDetailRefresh', "Refresh");
            return false;
        });

    }
    //退货换货
    $(".order_goods_item").on("click", "returnGoodsMoneyButton", function (event) {
        event.stopPropagation();
    });

    if ($(".order_list_container").length) {

        function refresh(i, notag) {

            $(".order_list_group").removeClass("hide");
            var index = (typeof i == "undefined") ? 0 : i;
            var el = $(".switcher_item")[index];
            $(".switcher_item").removeClass('selected');
            $(el).addClass('selected');
            if (index) {
                $(".order_list_item").addClass('hide');
                $(".type_" + index).removeClass('hide');

                if ($(".type_" + index).length == 0) {
                    $(".no-order").html("没有" + ["", "待收货", "待发货", "未付款", "已关闭"][index] + "订单").removeClass("hide");

                } else {
                    $(".no-order").addClass("hide");
                }
            } else {
                $(".order_list_item").removeClass('hide');

                if ($(".order_list_item").length == 0) {
                    $(".no-order").html("没有订单").removeClass("hide");
                } else {
                    $(".no-order").addClass("hide");
                }
            }


            $.cookie("order_list_index", index);
            if (!notag) {
                window.location.hash = "#tag" + index;
            }

            $("img").each(function (index, element) {
                var $el = $(this);
                if ($el.attr("data-original") && ($el.attr("data-original") != $el.attr("src"))) {
                    $el.attr("src", $el.attr("data-original"));
                }
            });
        }

        // 只有从订单详情回来才需要刷新页面
        var passOrderDetail = !!$.cookie('PassOrderDetail');
        var url = location.href;
        var urlIndex = url.indexOf("#tag");
        if (passOrderDetail) {
            $.removeCookie('PassOrderDetail');
            location.reload();
        } else if (urlIndex < 0) {
            refresh(0, true);
        } else {
            var tag = +url.substr(urlIndex + 4);
            refresh(tag);
        }

        window.onpopstate = function () {
            console.log(arguments);
            refresh(+window.location.hash.replace("#tag", ""), true);
        };


        $(".switcher_item").each(function (index, el) {
            $(el).click(function (event) {
                // $(document).scrollTo(0,0);
                refresh(index);
            });
        });
        $(".order_list_group").each(function (index, el) {
            var height = $(el).find(".img_container_inner").height();
            var length = $(el).find(".img_container_inner").find("img").length;
            if (height > 60) {
                $(el).find(".order_good_list").append($('<div class="pull-right text-container">共' + length + '件<br/>商品</div>'));
                $(el).find(".img_container_inner").css("height", "60px");
            }
            var href = $(el).find(".order_good_list").attr("href");
            $(el).click(function (event) {
                /* Act on the event */
                var tag = event.target.tagName;
                if (tag == "A") {

                } else {
                    window.bravetime.goto(href);
                }
            });
        });

        // 已发货的情况
        // 查看物流

        // 待发货

        // 未付款
        // 关闭订单
        $(".order-close-order").each(function (index, el) {
            var id = $(el).find(".order_list_item").attr("data-for-id");
            $(el).click(function (event) {
                window.bravetime.newConfirm("您确定要关闭订单么？", {
                    okLink: function () {
                        bravetime.addLoader();
                        $.ajax({
                            url: closeOrderUrl,
                            // type: 'POST',
                            dataType: 'json',
                            data: {id: id},
                            success: function (result) {
                                if (result["error"]) {
                                    bravetime.removeLoader();
                                    bravetime.newAlert(result["msg"]);
                                } else {
                                    if (window.debug) {
                                        setTimeout(function () {
                                            location.reload();
                                        }, 1500);
                                    } else {
                                        location.reload();
                                    }

                                }
                            },
                            error: function () {
                                bravetime.removeLoader();
                                bravetime.ajaxError(25);
                            }
                        });
                    }
                });
            });
        });

        // 已关闭
        // 删除订单
        $(".order-delete-order").each(function (index, el) {
            var id = $(el).parents(".order_list_item").attr("data-for-id");
            $(el).click(function (event) {
                window.bravetime.newConfirm("您确定要删除订单么？", {
                    okLink: function () {
                        bravetime.addLoader();
                        $.ajax({
                            url: deleteOrderUrl,
                            // type: 'POST',
                            dataType: 'json',
                            data: {id: id},
                            success: function (result) {
                                if (result["error"]) {
                                    bravetime.removeLoader();
                                    bravetime.newAlert(result["msg"]);
                                } else {
                                    if (window.debug) {
                                        setTimeout(function () {
                                            $(el).parents(".order_list_group").remove();
                                            bravetime.removeLoader();
                                        }, 1500);
                                    } else {
                                        $(el).parents(".order_list_group").remove();
                                        bravetime.removeLoader();
                                    }
                                }
                            },
                            error: function () {
                                bravetime.removeLoader();
                                bravetime.ajaxError(26);
                            }
                        });
                    }
                });
            });
        });

        // // 点击抖动
        // $(".order_good_list").each(function(index,el){
        //     $(el).addClass('shake').addClass('shake-slow');
        // });


    }

    //物流详情
    if ($(".order_delivery_container").length) {
        var orderListIndex = +$.cookie("order_list_index");
        $.cookie("order_list_index", 0);
        window.backButtonClickCallback = function (backUrl, backFunction) {
            if (backUrl == -1) {
                $.cookie("order_list_index", orderListIndex);
                $.cookie('PassOrderDetail', 1);
            }
            if (typeof backFunction == "function") {
                backFunction();
            }
        };

        //提醒发货
        var orderDeliveryOrderId = $(".order_list_child").attr("data-for-order-id");
        var orderDeliverytime = Date.now();
        $(".order-tx").click(function (e) {
            window.bravetime.addLoader();
            $.ajax({
                url: txUrl,
                type: 'POST',
                dataType: 'json',
                data: {id: orderDeliveryOrderId, time: orderDeliverytime},
                success: function (result) {
                    if (result["error"] == 0) {
                        window.bravetime.removeLoader();
                        window.bravetime.newAlert("提醒成功");
                    } else {
                        window.bravetime.removeLoader();
                        window.bravetime.newAlert(result["msg"]);
                    }
                },
                error: function () {
                    window.bravetime.removeLoader();
                    bravetime.ajaxError(24);
                }
            });
            e.preventDefault();
            window.event.returnValue = false;
            return false;
        });


        $(".order_good_list").each(function (index, el) {
            var height = $(el).find(".img_container_inner").height();
            var length = $(el).find(".img_container_inner").find("img").length;
            if (height > 60) {
                $(el).append($('<div class="pull-right text-container">共' + length + '件<br/>商品</div>'));
                $(el).find(".img_container_inner").css("height", "60px");
            }
            if (length == 1) {
                $(el).css("padding-right", "12px");
            }
        });

        // 展开收起物流
        $(".order_list_child").each(function (index, el) {
            var y;
            $(el).find(".order_goods_group_button").click(function (event) {
                /* Act on the event */

                if ($(el).find(".order_goods_group_wl_con").hasClass('hide')) {
                    $(el).find(".order_goods_group_wl_con").removeClass('hide');
                    $(el).find(".order_goods_group_button").find("span").html("收起物流信息");
                    y = window.scrollY;
                } else {
                    $(el).find(".order_goods_group_wl_con").addClass('hide');
                    $(el).find(".order_goods_group_button").find("span").html("展开物流信息");
                    if (y) {
                        window.scrollTo(0, y);
                    }
                }
            });
        });

        $.ajax({
            url: deliveryAjaxUrl,
            data: deliveryAjaxData,
            dataType: "jsonp",
            success: function (data) {
                if (data.error == 0) {
                    var list = data.data;
                    for (var i = 0; i < list.length; i++) {
                        var item = $(".order_list_child[data-for-order-id=" + list[i].delivery_id + "]");
                        item.find(".loading").remove();
                        if (list[i].info && list[i].info[0] && list[i].info[0].Traces) {
                            if (list[i].info[0].Traces.length == 0) {
                                item.find(".order_goods_inf_none").removeClass("hide");
                            } else {
                                item.find(".order_goods_inf_none").remove();
                                for (var j = 0; j < list[i].info[0].Traces.length; j++) {
                                    var trace = list[i].info[0].Traces[j];
                                    var traceHtml = $('<div class="order_goods_group_wl_item"><div class="order_goods_group_wl_inner"><div class="order_goods_group_wl_text">' +
                                        '<div class="dav-normal">' + trace.AcceptStation + '</div>' +
                                        '<div>' + trace.AcceptTime + '</div></div></div></div>')
                                    item.find(".order_goods_group_wl_con").append(traceHtml);
                                }
                            }

                        }
                    }
                    $(".loading").each(function () {
                        $(this).parents(".order_goods_group_wl_con").find(".order_goods_inf_none").removeClass("hide");
                        $(this).remove();
                    });
                } else {
                    bravetime.info(data.msg);
                }
            }, error: function () {
                bravetime.info("网络异常,获取物流信息失败")
            }
        });
    }
    if ($(".publish_pic_view").length) {
        var mySwiper = new Swiper('.publish_pic_preview', {
            pagination: '.swiper-pagination',
            paginationType: 'fraction'
            // paginationType: 'progress',
            // paginationType: 'custom',
        })

    }
    //提交退货物流信息
    if ($(".subdeliver").length) {
        $(".subdeliver").on("click", function () {
            //return_express_company  return_express_num  退货物流公司 和 退货物流单号
            var company = $(".return_express_company").val(),
                num = $(".return_express_num").val();
            if (company == '' || num == '') {
                window.bravetime.info("请补全物流信息")
            } else {
                var data = {
                    "express_company": company,
                    "express_num": num,
                    "return_id": window.return_id
                };
                $.ajax({
                    url: window.deliverNumUrl,
                    data: data,
                    dataType: "json",
                    type: "post",
                    success: function (result) {
                        if (result.code) {
                            bravetime.info(result.msg);
                        } else {
                            bravetime.goto(result.url);
                        }
                    }, error: function () {
                        bravetime.info("网络异常,请重试");
                    }
                });
            }
        })
    }
    //催一下按钮
    if ($(".urgeButton").length) {
        $(".urgeButton").on("click", function () {
            var data = {};
            $.ajax({
                url: window.urgeUrl,
                data: data,
                dataType: "json",
                type: "post",
                success: function (result) {
                    if (result.code) {
                        bravetime.info(result.msg);
                    } else {
                        bravetime.info(result.msg);
                    }
                }, error: function () {
                    bravetime.info("网络异常,请重试");
                }
            });
        })
    }
    //提交退款信息
    if ($(".returnGoodsInfoButton").length) {
        $(".returnGoodsInfoButton").on("click", function () {
            var number = +$(".js_return_goodsNum").find("input").val(),
                remark = $(".return_remark").val();
            img = [],
                imgs = $(".img").find("img");
            imgs.each(function () {
                var pic = $(this).attr("data-show-src");
                img.push(pic);
            });
            if(imgs.length < 2){
                bravetime.info("请提供至少两张照片以便核实商品信息");
                return false;
            }
            var urldata = getUrlArgObject();
            var data = {
                "delivery_id": window.delivery_id,
                "goods_id": window.goods_id,
                "number": number,
                "remark": remark,
                "img": img.join(","),
                "return_id":urldata.return_id || 0
            };
            $.ajax({
                url: window.returnGoodsUrl,
                data: data,
                dataType: "json",
                type: "post",
                success: function (result) {
                    if (result.code) {
                        bravetime.info(result.msg);
                    } else {
                        bravetime.goto(result.url);
                    }
                }, error: function () {
                    bravetime.info("网络异常,请重试");
                }
            });
        });
        // //删除图片按钮
        // $(".return_refund_container").on("click",".closeBtn",function () {
        //     $(this).parents().find("li").remove();
        //     $(".add_comment_con").find(".add").removeClass("hide");
        // })
    }

    //退货数量按钮

    if ($(".js_return_goodsNum").length) {
        var js_return_goodsNum = $(".js_return_goodsNum"),
            inputcon = $(".input_control"),
            changenum = inputcon.find(".change_num"),
            minus = inputcon.find(".minus"),
            plus = inputcon.find(".plus"),
            input_num = js_return_goodsNum.find("input"),
            input_num_max = +input_num.attr("max"),
            re_money = $(".js_re_money"),
            re_money_val = $(".js_re_money").html();
        endclick();
        js_return_goodsNum.on("click", ".change_num", function () {
            bravetime.addLoader();
            var num = +input_num.val();
            if ($(this).hasClass('plus')) {
                if (num >= input_num_max) {
                    input_num.val(input_num_max);
                    re_money.html(returnFloat(re_money_val * input_num_max));
                } else {
                    input_num.val(num + 1);
                    re_money.html(returnFloat(re_money_val * (num + 1)));
                }

            } else {
                if (num <= 1) {
                    input_num.val(1);
                    re_money.html(returnFloat(re_money_val * 1));
                } else {
                    input_num.val(num - 1);
                    re_money.html(returnFloat(re_money_val * (num - 1)));
                }

            }
            endclick();
            bravetime.removeLoader();
        });
        js_return_goodsNum.on("keyup", "input", function (event) {
            var e = event ? event : window.event;
            if (e.keyCode == 8) {
                this.value += " ";
                changenum.addClass("backcolor_E");
            }else{
                var num = +input_num.val();
                input_num.val(parseInt(num));
                if (num >= input_num_max) {
                    input_num.val(input_num_max);
                    re_money.html(returnFloat(re_money_val * input_num_max));
                }else if(num > 0 && num < input_num_max){
                    re_money.html(returnFloat(re_money_val * num));
                }else if(num <= 0) {
                    input_num.val(1);
                    re_money.html(returnFloat(re_money_val));
                }
            }
            endclick();
        });
        function endclick() {
            if(input_num.val() == input_num_max){
                if(!plus.hasClass("backcolor_E")){
                    plus.addClass("backcolor_E");
                }
            }else{
                if(plus.hasClass("backcolor_E")){
                    plus.removeClass("backcolor_E");
                }
            }
            if(input_num.val() == 1){
                if(!minus.hasClass("backcolor_E")){
                    minus.addClass("backcolor_E");
                }
            }else{
                if(minus.hasClass("backcolor_E")){
                    minus.removeClass("backcolor_E");
                }
            }
        }
    }
    //退货备注字数限制
    $("body").on("input propertychange", ".return_remark", function () {
        var $return_remark = $(".return_remark"),
            $return_remark_num = $(".return_remark_num");
        checkLength($return_remark,200,$return_remark_num)
    });
    /*限制字数长度*/
    function checkLength(gm, num, numtip) {
        var remain = gm.val().length;
        if (remain > num) {
            var gms = gm.val().substr(0, num);
            gm.val(gms);
            numtip.html("0");
        } else if (remain == num) {
            numtip.html("0");
        } else {
            var result = num - remain;
            numtip.html(result);
        }
    }
    function returnFloat(value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
    }


});