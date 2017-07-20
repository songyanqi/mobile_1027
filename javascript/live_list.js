/**
 * Created by xuzelian on 16/4/20.
 */

$(function () {
    // 顶部轮播图滚动
    new Swiper('.index_ads', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        loop: true,
        preloadImages:false,
        lazyLoading : true
    });

    /*未登录点击店主专享*/
    $(".exclusiveOwner").click(function(){
        window.bravetime.newConfirm("这是店主专享的独家课程，需要成为店主后才能看呦~~",{
            okText:"马上开店",
            okLink:"/348.html" ,//点击去开店的链接
            cancelText: ""
        });
    });

    /*点击关注主播*/
    if($(".list_attention").is(":visible")){
        $(".list_attention").click(function(){
            bravetime.addLoader({little:true});
            $.ajax({
                url: attentionUrl,
                type: 'post',
                dataType: 'json',
                data: {userId:userId},
                success: function (result) {
                    bravetime.removeLoader();
                    if (result.code == 0) {
                        $(".list_attention").addClass("hide");
                        $(".already_attention").removeClass("hide")
                    }
                    else {
                        bravetime.info(result.msg)
                    }
                },
                error: function () {
                    bravetime.info("网络异常,请重试")
                }
            });
        })
    }

    if($(".attention").is(":visible")){
        $(".attention").click(function(){
            bravetime.addLoader({little:true});
            $.ajax({
                url: attentionUrl,
                type: 'post',
                dataType: 'json',
                data: {userId:userId},
                success: function (result) {
                    bravetime.removeLoader();
                    if (result.code == 0) {
                        $(".attention").addClass("hide");
                        bravetime.info("您已关注主播");
                    }
                    else {
                        bravetime.info(result.msg)
                    }
                },
                error: function () {
                    bravetime.info("网络异常,请重试")
                }
            });
        })
    }

   /* 妈妈课堂语音回顾*/
    $(".partake").each(function () {
        var type = $(this).attr("type");
        var isapply = $(this).attr("isapply");
        var status = $(this).attr("status");
        var tab = tabs(type, isapply, status);
        if (tab == "") {
            $(this).addClass("hide")
        }
        else {
            $(this).removeClass("hide");
            $(this).html(tab)
        }
    });
    $(".time").each(function () {
        var startTime = $(this).attr("startTime");
        var nowTime = $(this).attr("nowTime");
        var prefix = $(this).attr("prefix");
        var status = $(this).attr("status");
        setShowTime(this);
    });

    var limit = 10;
    //绑定指定页面的scroll事件，进行加载
    var ajaxing_review = 0;
    //绑定商品管理页面
    //$(document).off("scroll");
    $(document).on("scroll", function () {
        //判断是否快到页面底部
        var bodyHeight = $(document.body).height();
        var scrollTop = $(document).scrollTop();
        var windowHeight = $(window).height();
        //判断是否在加载中
        var live_type = 3;
        var offset = $("#review_list").find("a").size();

        if ((bodyHeight - scrollTop - windowHeight) <= -40) {
            if (ajaxing_review == 0 && live_type == 3) {
                //发起ajax请求
                ajaxing_review = 1;
                $("body").append('<div class="loading-con"><span class="loading-wrap" ></span><span class="loading-text">' + "正在加载更多数据..." + '</span></div>');
                $.ajax({
                    type: "get",
                    data: {
                        limit: limit,
                        type: live_type,
                        offset: offset
                    },
                    url: window.live_list,
                    dataType: "json",
                    success: function (datas) {
                        if (datas.data.length > 0) {
                            $(".loading-con").remove();
                            for (var i = 0; i < datas.data.length; i++) {
                                var li_a = $('<a href="/index.php?m=default&c=live&a=liveinfo&source=list&id='+datas.data[i].id+'"></a>');
                                $("#review_list").append(li_a);
                                var tab = tabs(live_type, datas.data[i].isapply, datas.data[i].status);
                                var hide = tab == "" ? "hide" : "";
                                var small_imgurl = datas.data[i].small_imgurl;
                                var name = datas.data[i].name;
                                var pv = datas.data[i].pv;
                                if (pv > 100000) {
                                    pv = (pv / 10000).toFixed(0) + '万';
                                }
                                var type_name = datas.data[i].type_name;
                                var html = '<li>' +
                                    '<div class="list_pic">' +
                                    '<img src=' + small_imgurl + '>' +
                                    '<div class="partake ' + hide + '">' + tab + '</div>' +
                                    '<div class="time" data-remain-second="0" startTime="' + datas.data[i].start_time + '" nowTime="' + datas.now_time + '" prefix="" status="' + datas.data[i].status + '">' + '</div>' +
                                    '</div>' +
                                    '<div class="list_con">' +
                                    '<div class="clearfix title">' + name + '</div>' +
                                    '<div class="clearfix">' + '<span class="listen_number">' + pv + '</span>' + '<span class="pull-right c6">' + type_name + '</span>' + '</div>' +
                                    '</div>' +
                                    '</li>';
                                li_a.html(html);
                                var showLable = li_a.find(".time");
                                setShowTime(showLable);
                            }
                            if (limit == datas.data.length) {
                                    ajaxing_review = 0;
                            }
                            else {
                                    ajaxing_review = 2;
                            }
                        }
                        else {
                            ajaxing_review = 2;
                            $(".loading-con").remove();
                            bravetime.info("没有更多了呦 ~~");
                        }
                    },
                    error: function () {
                        bravetime.info("网络错误");
                    }
                });

            }
            else if(live_type == 3 && ajaxing_review == 2){
                $(".loading-con").remove();
                bravetime.info("没有更多了呦 ~~");
            }
        }
    });


});

function tabs(type, isapply, status) {
    var text = "";
    if (type == 3) {
        if (status == 3) {
            text = "整理中";
        }
        else {
            if (isapply) {
                text = "已参与";
            }
        }
    }
    return text
}

/**
 * 设置显示时间
 * @param startTime
 * @param nowTime
 * @param showLable 显示标签
 * @param prefix 前缀
 */
function setShowTime(showLable) {
    var second = $(showLable).attr("data-remain-second");
    var prefix = $(showLable).attr("prefix");
    var status = parseInt($(showLable).attr("status"));
    if (parseInt(second) == 0) {
        var startTime = $(showLable).attr("startTime");
        var nowTime = $(showLable).attr("nowTime");
        second = parseInt(startTime) - parseInt(nowTime);
    }

    var text_time = "";

    var zb_date = new Date(startTime * 1000);
    var current = new Date();
    if ((current.getFullYear() == zb_date.getFullYear()) && (current.getMonth() == zb_date.getMonth()) && (current.getDate() == zb_date.getDate())) {
        text_time = "今天 " + (zb_date).Format('hh:mm');
    }
    else if ((current.getFullYear() == zb_date.getFullYear()) && (current.getMonth() == zb_date.getMonth()) && ((current.getDate() + 1) == zb_date.getDate())) {
        text_time = "明天 " + (zb_date).Format('hh:mm');
    }
    else if ((current.getFullYear() == zb_date.getFullYear()) && (current.getMonth() == zb_date.getMonth()) && ((current.getDate() - 1) == zb_date.getDate())) {
        text_time = "昨天 " + (zb_date).Format('hh:mm');
    }
    else if ((current.getFullYear() == zb_date.getFullYear())) {
        if ((current.getMonth() != zb_date.getMonth()) || ((current.getDate() - 1) != zb_date.getDate())) {
            text_time = (zb_date).Format('MM-dd hh:mm');
        }
    }
    else {
        text_time = (zb_date).Format('yyyy-MM-dd hh:mm');
    }

    $(showLable).text(prefix + text_time);

    //return text_time;
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
Date.prototype.Format = function (fmt) { //author: yyyy/MM/dd
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};