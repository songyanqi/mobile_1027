/**
 * Created by nemo on 16/9/9.
 */
$(function () {
    $(".submit").click(function () {
        var tel = $.trim($("input").val());
        if (window.Units && !Units.isTel(tel)) {
            bravetime.newAlert("请输入正确的手机号");
            return false;
        }
        bravetime.addLoader({little: true});
        $.ajax({
            url: window.submitUrl,
            data: {
                tel: tel
            },
            dataType: "json",
            type: "POST",
            success: function (result) {
                bravetime.removeLoader();
                if (result.code) {
                    bravetime.newAlert(result.msg, function () {
                        location.reload();
                    });
                } else {
                    bravetime.newAlert("您已成功赠送，被赠送者会收到短信提醒，请告知用户退出重新登录大V店，即可变为店主",function () {
                        location.reload();
                    });
                }
            }, error: function () {
                bravetime.removeLoader();
                bravetime.newAlert("网络异常，请刷新重试", function () {
                    location.reload();
                });
            }

        });
    });
});