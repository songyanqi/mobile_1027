/**
 * Created by Murphy.lee on 17/1/12.
 */
//异步加载红包列表
$(function () {
    if ($(".open_red").length >= 30) {
        init();
    }
    function init() {
        var ajaxing = 0, //标记是否在ajax请求
            pages = 1;
        //绑定商品管理页面
        $(document).on("scroll", function () {
            //判断是否在加载中
            if (ajaxing == 0) {
                //判断是否快到页面底部
                var $mian_box = $(".main_box2"),
                    bodyHeight = $mian_box.height(),
                    scrollTop = $(document).scrollTop(),
                    windowHeight = $(window).height();
                if ((bodyHeight - scrollTop - windowHeight) < 100) {
                    //发起ajax请求
                    ajaxing = 1;
                    // 当前页数
                    pages += 1;
                    $mian_box.append('<div class="loading-wrap">' + '</div>');
                    $.ajax({
                        type: "get",
                        data: {
                            "page_num": pages,
                            "page_size":30,
                            "id":window.userId
                        },
                        url: window.loadredlist,
                        dataType: "json",
                        success: function (data) {
                            if (data.code == 0) {
                                $(".loading-wrap").remove();
                                var list = data.data;
                                $.each(list, function (i) {
                                    var htmls = $('<div class="open_red ' + (list[i].overdue ? "open_red_grey" : "open_red_normal") + '"><div class="open_red_top"><div class="redlist_user f_l"><img src="' + list[i].img + '" alt=""></div><div class="f_l user_number"><span>' + list[i].name + '</span><br><span>' + (list[i].open ? "已开店" : "未开店") + '</span></div><div class="f_l red_amount"><span>' + list[i].account + '</span>元</div></div><div class="open_red_bottom">有效期：' + list[i].date + '</div></div>');
                                    $mian_box.append(htmls);
                                });
                                if(Math.ceil(data.total / 30) > pages){
                                    ajaxing = 0;
                                }
                            } else {
                                $(".loading-wrap").remove();
                                bravetime.info(data.msg);
                            }
                        },
                        error: function () {
                            $(".loading-wrap").remove();
                            bravetime.info("网络错误");
                        }
                    })

                }
            }
        });
    }

});