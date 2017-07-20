/**
 * Created by Murphy.lee on 17/1/4.
 */
$(function () {
    if (!window.isPrivateMode) {
        var refreshs = getCookie("refresh");
        if (refreshs) {
            window.location.reload();
            delCookie("refresh");
        }
    }
    var playBtn = $(".js_music");
    var music = $("#bg_music");
    var height = $(window).height();
    $(".bg").css("height", height + "px");
    var mask = $(".mask"),
        get_gift = $(".get_gift"),
        money_con = $(".money_con");

    $(".overbg").css("height", height + "px");
    $(".promptbg").css("height", height + "px");

    var rule = $(".rule");
    $(".look_rule").on("click", function () {
        removehide(mask);
        removehide(rule)
    });
    // 关闭弹窗
    $(".close_btn").on("click", function (e) {
        if (!$(".get_gift").is(':hidden')) {
            window.location.reload();
        }
        $(e.target).parents(".con").addClass("hide").parents(".mask").addClass("hide");
    });
    //我的奖品
    $(".js_look_my_gift").on("click", function () {
        var my_gift_list = $(".my_gift_list");
        removehide(mask);
        if ($(".js_my_gift").length) {
            removehide($(".js_my_gift"));
            if ($(".my_gift_list li").size() > 3) {
                var liheight = $(".my_gift_list li").height() * 3;
                $(".my_gift_list").css({"overflow-y": "scroll", "overflow-x": "hidden", "height": liheight});
            }
        } else {
            removehide($(".no_gift"));
        }
    });
    if (music.length == 0) {
        return false;
    }
    playBtn.click(function () {
        var $t = $(this);
        if (!$t.hasClass("music_close_btn")) {
            $t.addClass("music_close_btn").removeClass("run_music");
            stop();
        } else {
            $t.removeClass("music_close_btn").addClass("run_music");
            play();
        }

    });
    //一般情况下，这样就可以自动播放了，但是一些奇葩iPhone机不可以
    document.getElementById('bg_music').play();
    //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
    document.addEventListener("WeixinJSBridgeReady", function () {
        document.getElementById('bg_music').play();
    }, false);
    document.getElementById('bg_music').addEventListener("playing", function () {
        playBtn.removeClass("music_close_btn").addClass("run_music");
    });

    function play() {
        music.get(0).play();
    }

    function stop() {
        music.get(0).pause();
    }

    //点击礼物/
    var ajaxing = 0;
    $(".js_gifts_wrap").on("click", function () {
        /*预加载*/
        /*请求抽奖结果*/
        if (ajaxing == 0) {
            ajaxing == 1;
            $.ajax({
                url: window.christmasLotteryDrawUrl,
                dataType: "json",
                data: {},
                success: function (result) {
                    //如果抽奖成功
                    if (result.code == 0) {
                        if (result.status == 1) {
                            removehide(mask);
                            removehide(get_gift);
                            money_con.find(".money").html(result.data.type_money);
                            money_con.find(".full_con").html(result.data.min_goods_amount);
                            money_con.find(".can_use_time").html(result.data.can_use_time);
                        }
                        //次数用完
                        if (result.status == 2) {
                            var lottery_done = $(".lottery_done");
                            removehide(lottery_done);
                            setTimeout(function () {
                                addhide(lottery_done);
                            }, 2000)
                        }
                        //积分不足
                        if (result.status == 3) {
                            removehide(mask);
                            removehide($(".integral_not_enough"));
                        }
                        //未登录
                        if (result.status == 4) {
                            // var url = window.location.pathname;
                            // window.location = "/login.html?referer=" + url;
                            bravetime.info(result.msg);
                        }
                        ajaxing == 0;
                    } else {
                        bravetime.info(result.msg);
                        ajaxing == 0;
                    }
                }, error: function () {
                    bravetime.ajaxError(36);
                    ajaxing == 0;
                }
            });
        }
    });
    function removehide(obj) {
        obj.removeClass("hide");
    }

    function addhide(obj) {
        obj.addClass("hide");
    }

//记录刷新
    if (!window.isPrivateMode) {
        $(".js_refresh").on("click", function () {
            setCookie("refresh", "2016");
        });
    }
//写cookies
    function setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
})