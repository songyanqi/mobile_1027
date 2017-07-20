/**
 * Created by nemolee on 15/6/10.
 */
$(function () {
    $(".cashier_pay_type").find(".dav-item").click(function () {
        if ($(this).hasClass("i-am-jujuede")) {

        } else if ($(this).hasClass("i-am-zk")) {
            if (!$(this).hasClass("zd")) {
                $(this).addClass("zd");
                $(".bank-card").addClass('hide');
            } else {
                $(this).removeClass("zd");
                $(".bank-card").removeClass('hide');
            }

        }
        else {
            var name = $(this).attr("data-name");
            console.log(name);

            bravetime.newInfo("正在连接安全支付...");
            $.ajax({
                type: 'GET',
                url: url,
                data: {},
                dataType: "jsonp",
                success: function (result) {
                    $('.dialog_mask').hide(); //取消文字显示
                    if (result.error) {
                        bravetime.newAlert(result["errorMsg"]);
                    } else {
                        bravetime.newInfo("正在连接安全支付...");
                        window.location.href = result.url;
                    }
                },
                error: function () {
                    bravetime.ajaxError(16);
                }
            });

        }
    });

    $(".mask").click(function () {
        $(this).addClass("hide");
    });

    var sendContainer = $(".iep_send_con");
    if (sendContainer.length) {
        var btn = sendContainer.find(".iep_send_con_sendbtn");
        var txtCon = sendContainer.find(".iep_send_con_textarea");
        var linkCon = sendContainer.find(".send_link");
        btn.click(sendBtnClick);
        var type = sendContainer.find(".iep_send_con_title").find("li");
        type.click(typeClick);
        window.onpopstate = function () {
            var u = location.href;
            if (u.indexOf("-_-") == -1) {
                linkCon.addClass("hide");
                btn.removeClass("hide");
            }
        };
        txtCon.on("input propertychange", function () {
            window.descContent = txtCon.val();
            if(typeof window.relink == "function"){
                window.relink();
            }
        });
    }

    /**
     * 切换标签
     */
    function typeClick() {
        var me = this;
        // 先把当前内容赋给标签
        sendContainer.find(".iep_send_con_title").find("li.active").attr("data-for-str", txtCon.val());
        sendContainer.find(".iep_send_con_title").find("li").removeClass("active");
        var str = $(me).addClass("active").attr("data-for-str");
        txtCon.val(str);
        if($(me).html()=="自己留言"){
            txtCon.focus().get(0).setSelectionRange(999, 999);
        }
        window.descContent = txtCon.val();
        if(Units.isWechat()){
            if(typeof window.relink == "function"){
                window.relink();
            }
        }
    }

    /**
     * 发送图片
     */
    function sendBtnClick() {
        var con = txtCon.val();
        if (!Units.isWechat()) {
            $.ajax({
                url: sendUrl,
                dataType: "json",
                data: {
                    con: con
                },
                success: function (result) {
                    if (result["error"] != 0) {
                        bravetime.info(result["msg"]);
                    } else {

                        linkCon.find("p.link").html(lineLink);
                        // 首先我要增加一个假的历史纪录
                        history.pushState("data", "找人代付", "//" + location.host + "/-_-.html");
                        // 把button换成内容
                        btn.addClass("hide");
                        linkCon.removeClass("hide");

                    }

                },
                error: function () {
                    bravetime.ajaxError(17);
                }
            });
        }
    }

    /**
     * 分享回调函数
     */
    window.tlShareCallbackCancel = window.sendShareCallback = function () {
        // 分享成功请求新的地址
        $.ajax({
            url: sendUrl,
            dataType: "json",
            data: {
                con: window.descContent
            },
            success: function (result) {
                if (result["error"] != 0) {
                    bravetime.info(result["msg"]);
                } else {
                    window.lineLink = result["link"];
                    window.sendUrl = result["sendUrl"];
                }

            },
            error: function () {
                bravetime.info("网络异常，请稍后重试");
            }
        });
    }
});