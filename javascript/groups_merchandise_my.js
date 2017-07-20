/**
 * Created by Murphy.lee on 16/3/17.
 */
$(function () {
    if ($("#groups_merchandise_my")) {
        scrollsss();
    }
});
function scrollsss() {
    var pages = 0;
    //绑定指定页面的scroll事件，进行加载
    var ajaxing = 0; //标记是否在ajax请求
    //绑定商品管理页面
    //$(window).off("scroll");
    $(window).on("scroll", function () {
        //判断是否在加载中
        if (ajaxing == 0) {
            //判断是否快到页面底部
            var bodyHeight = $(document.body).height();
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            if ((bodyHeight - scrollTop - windowHeight) < 100) {
                //发起ajax请求
                var loading_div = $("<div></div>").addClass("loading-wrap").html("数据加载中...");
                $("#groups_merchandise_my").append(loading_div);
                ajaxing = 1;
                pages += 1;
                $.ajax({
                    url: window.groups_merchandise_myUrl,
                    type: "get",
                    data: {
                        page_num: pages,
                        page_size:10
                    },
                    dataType: 'json',
                    success: function (data) {
                        if(data.code == 0){
                            if(data.has_more == true){
                                add_group_loading(data);
                                ajaxing = 0;
                                $(".loading-wrap").remove();
                            }else{
                                $(".loading-wrap").remove();
                                var bottom_div = $('<div></div>').html("没有更多数据了!").addClass("bottom_div");
                                $("body").append(bottom_div);
                            }
                        }else{
                            $(".loading-wrap").remove();
                            window.bravetime.info(data.msg);
                        }

                    },
                    error: function () {

                    }
                });
                // 当前页数


            }
        }
    });
}

//添加新增的团购数据

function add_group_loading(data) {
    console.log(data);
    for (var i = 0; i < data.data.length; i++) {
        console.log(data.data.length);
        var $a = $('<a></a>').attr("href", data.data[i].href);
        var $li = $('<li></li>').addClass("mt_10");
        $a.append($li);
        var pic_div = $('<div></div>').addClass("groups_pic");
        var Img = $('<img />').attr("src", data.data[i].img_url);
        var discount = data.data[i].discount;
        discount = (+discount).toFixed(2);
        var groupInfo='<div class="group_info"><span class="right">'+ data.data[i].pepole_number + "人团" +'</span><span class="left">'+ "省" + discount + "元" + '</span></div>';
        pic_div.append(Img).append(groupInfo);
        var con_div = $('<div></div>').addClass("con");
        $li.append(pic_div).append(con_div);
        var goods_name='<div class="text"><p class="omission">'+ data.data[i].goods_name +'</p></div>';
        con_div.append(goods_name);

        var clearfix_div = $('<div></div>').addClass("mt_7").addClass("clearfix");
        con_div.append(clearfix_div);
        var pull_left = $('<div></div>').addClass("pull-left");
        var pull_right = $('<div></div>').addClass("pull-right");
        var right_html = '<div class="group_status_incomplete ta_r">'+'<p>'+"预计成团返现: "+'<span class="color_EC6890">'+ data.data[i].total_seller_income + "元" + '</span>'+'</p>'+'<p>' + "团长: " + '<span>' + data.data[i].consignee + '</span>'+ '</p>';
        pull_right.html(right_html);
        //如果组团成功
        if (data.data[i].g_status == 2) {
            var success_html = '<div class="group_status_success">' + "组团成功" + '</div>';
            pull_left.html(success_html);
        } else if(data.data[i].g_status == 3) {
            var incomplete_div = $('<div></div>').addClass("group_status_incomplete");
            var incomplete_p1 = $('<p>' + "还差" + data.data[i].leave_number + "人成团" + '</p>');
            var incomplete_p2 = $('<p>' + "剩余时间：---" + '</p>').addClass("surplus_times").attr("data-remain-second", data.data[i].left_time);
            incomplete_div.append(incomplete_p1).append(incomplete_p2);
            pull_left.append(incomplete_div);
        }else{
            var incomplete_div = $('<div></div>').addClass("group_status_incomplete");
            var incomplete_p1 = $('<p>' + "还差" + data.data[i].leave_number + "人成团" + '</p>');
            var incomplete_p11 = $('<p>' + "组团成功" + '</p>');
            var incomplete_p2 = $('<p>' + "剩余时间：---" + '</p>').addClass("surplus_times").attr("data-remain-second", 0);
            if(data.data[i].leave_number == 0){
                incomplete_div.append(incomplete_p11);
            }else{
                incomplete_div.append(incomplete_p1);
            }
            incomplete_div.append(incomplete_p2);
            pull_left.append(incomplete_div);
        }
        clearfix_div.append(pull_left).append(pull_right);
        var groups_merchandise_my = $("#groups_merchandise_my").find("ul");
        groups_merchandise_my.append($a);
    }


}

