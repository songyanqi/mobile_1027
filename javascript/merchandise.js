"use strict";

$(function () {
    //组团状态提示语
    if(window.groupState){
        bravetime.info(groupState);
    }

    // 倒计时
    function calculateTime(second) {
        var s = second % 60, m = Math.floor(second / 60) % 60,
            h = Math.floor(second / 60 / 60) % 24,
            d = Math.floor(second / 60 / 60 / 24);
        var str = '';
        if (d) {
            str = d + "天"+ h + "小时" + (m < 10 ? "0" : "") + m + "分";
        } else if (h) {
            str = h + "小时" + (m < 10 ? "0" : "") + m + "分" + (s < 10 ? "0" : "") + s + "秒";
        } else if (m) {
            str = (m < 10 ? "0" : "") + m + "分" + (s < 10 ? "0" : "") + s + "秒";
        } else {
            str = (s < 10 ? "0" : "") + s + "秒";
        }
        return str;
    }
    var remainTimeContainer = $(".surplus_time");
    if(remainTimeContainer.length){

        var timer = setInterval(function () {
            remainTimeContainer.each(function () {
                var $this = $(this);
                var second = $this.attr("data-remain-second");

                if (second < 0) {
                    $this.html("团购已结束");
                } else {
                    $this.html("剩余时间：" + calculateTime(second));

                    $this.attr("data-remain-second", second - 1);
                }
            })

        }, 1000);
    }


    var timers = setInterval(function () {
    //组团详情页倒计时
    var remainTimeContainers = $(".surplus_times");
    if(remainTimeContainers.length){

            remainTimeContainers.each(function () {
                var $this = $(this);
                var second = $this.attr("data-remain-second");

                if (second < 0) {
                    $this.html("团购已结束");
                } else {
                    $this.html("剩余时间：" + calculateTime(second));

                    $this.attr("data-remain-second", second - 1);
                }
            })


    }
    }, 1000);


    //
    $(".switcher_1").click(function () {
        $(".groups_merchandise_title").find(".desc").removeClass("active");
        $(this).find(".desc").addClass("active");
        $(".switcher_con_2").addClass("hide");
        $(".switcher_con_1").removeClass("hide");
    });
    $(".switcher_2").click(function () {
        $(".groups_merchandise_title").find(".desc").removeClass("active");
        $(this).find(".desc").addClass("active");
        $(".switcher_con_1").addClass("hide");
        $(".switcher_con_2").removeClass("hide");
    });

    //组团成员超出宽度隐藏,并在右边显示总人数
    if($(".merchandise_detail").length){
            var height = $(".group_people_head").find("ul").height();
            var length = $(".group_people_head").find("img").length;
            if (height > 40) {
                $(".group_people_head").append($('<a href="'+ link +'"><span class="pull-right fz_12 dav-color9">' + length + '人<i class="sell_info_arrow"></i></span></a>'));
                $(".group_people_head").css("height", "40px");
            };

    }


    if($.cookie("dvd_cart_to_confirm")){
        setTimeout(function () {
            $.removeCookie("dvd_cart_to_confirm");
            location.reload();
        },300);
    }
});

//# sourceMappingURL=merchandise.js.map