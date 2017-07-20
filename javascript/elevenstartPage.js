/**
 * Created by Murphy.lee on 16/11/2.
 */
$(function () {
    if ($(".swiper-slide").size() > 5) {
        $(".swiper-slide").css("box-sizing", "border-box");
        // 小喇叭
        new Swiper('.fund_user_list', {
            noSwiping: true,
            autoplay: 4000,
            slidesPerView: 5,
            slidesPerGroup: 1,
            autoplayDisableOnInteraction: false,
            loop: true,
            direction: 'vertical'
        });
    }
    //发起组队00
    $("#begin_group").on("click", function () {
        if (window.logined) {
            if (window.status == 3) {
                window.bravetime.addLoader();
                $.ajax({
                    url: window.begingroupUrl,
                    type: 'get',
                    dataType: 'json',
                    data: {},
                    success: function (result) {
                        if (result.code) {
                            window.bravetime.removeLoader();
                            window.bravetime.info(result.msg);
                        } else {
                            window.bravetime.removeLoader();
                            window.location.reload();
                        }
                    },
                    error: function () {
                        window.bravetime.removeLoader();
                        bravetime.ajaxError(24);
                    }
                });
            } else {
                window.bravetime.info("只有店主才能发起哦");
            }
        } else {
            window.nativeLoginFunction(window.loginUrl);
        }
    });
    //确认加入
    $("#confirm_join").on("click", function () {
        if (window.logined) {
            if (window.status == 1) {
                window.bravetime.addLoader();
                $.ajax({
                    url: window.confirmJoinUrl,
                    type: 'get',
                    dataType: 'json',
                    data: {},
                    success: function (result) {
                        if (result.code) {
                            window.bravetime.removeLoader();
                            if (result.url && result.url != "") {
                                window.bravetime.newAlert(result["msg"], function () {
                                    window.nativeLoginFunction(result["url"]);
                                });
                            } else {
                                window.bravetime.info(result["msg"])
                            }
                        } else {
                            window.bravetime.removeLoader();
                            window.location = result.url;
                        }
                    },
                    error: function () {
                        window.bravetime.removeLoader();
                        bravetime.ajaxError(24);
                    }
                });
            } else {
                window.bravetime.info("只有买家能加入");
            }
        } else {
            window.nativeLoginFunction(window.loginUrl);
        }
    });
    //拉好友集结金额
    $("#pull_friends").on("click", function () {
        window.bravetime.info("分享页面给好友即可参加");
    });
});
