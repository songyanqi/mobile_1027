"use strict";

$(function () {
    var form = $("form.add_review_form");
    if (form.length) {
        var addText = form.find(".add_reviews_text");
        var textView = form.find("textarea.add_reviews_textarea");
        textView.bind("input propertychange", function () {
            var textValue = $.trim(textView.val());
            addText.toggleClass("hide", textValue.length < 190).toggleClass("error", textValue.length > 200).html(200 - textValue.length);
        });
        var button = form.find(".add_reviews_sendbtn");
        button.click(function () {
            if (button.hasClass("disable")) {
                return false;
            }
            var value = $.trim(textView.val());
            if (value == "") {
                bravetime.info("未填写推荐理由哟~");
                return false;
            }
            if (value.length > 200) {
                bravetime.info("不能超过200字哦");
                return false;
            }
            button.addClass("disable").html("<img src=\"//pic.davdian.com/free/loading_32.gif\"/>提交中...");
            form.ajaxSubmit({ dataType: "json", type: "post", data: { content: value }, success: success, error: error });
            function success(result) {
                button.removeClass("disable").html("提交");
                var error = result.error;
                var msg = result.msg;
                var callbackUrl = result.callbackUrl;

                if (error) {
                    bravetime.info(msg);
                } else {
                    bravetime.info("提交成功");
                    bravetime.goto(callbackUrl);
                }
            }

            function error() {
                button.removeClass("disable").html("提交");
                bravetime.ajaxError(27);
            }
        });
    }

    var singleReview = $(".single_review");
    singleReview.find(".delete").click(function () {
        var me = this;
        var id = $(this).parents(".reviews_list").attr("data-id");
        bravetime.newConfirm("您确定要删除么?", {
            okLink: function okLink() {
                bravetime.addLoader({ little: true });
                $(this).addClass("disable");
                $.ajax({
                    url: deleteReviewUrl,
                    data: { id: id },
                    dataType: "json",
                    success: success,
                    error: error
                });
                function success(result) {
                    bravetime.removeLoader();
                    var error = result.error;
                    var msg = result.msg;

                    if (error) {
                        bravetime.info(msg);
                    } else {
                        //bravetime.info(`删除成功`);
                        singleReview.find(".reviewed").addClass("hide");
                        singleReview.find(".to_review").removeClass("hide");
                    }
                }

                function error() {
                    bravetime.ajaxError(28);
                    bravetime.removeLoader();
                    $(me).removeClass("disable");
                }
            }
        });
    });

    var reviewGroup = $(".review_group");
    if (reviewGroup.length) {
        reviewGroup.find(".delete").click(function () {
            var me = this;
            var id = $(this).parents(".reviews_list").attr("data-id");
            bravetime.newConfirm("您确定要删除么?", {
                okLink: function okLink() {
                    bravetime.addLoader({ little: true });
                    $(this).addClass("disable");
                    $.ajax({
                        url: deleteReviewUrl,
                        data: { id: id },
                        dataType: "json",
                        success: success,
                        error: error
                    });
                    function success(result) {
                        bravetime.removeLoader();
                        $(me).removeClass("disable");
                        var error = result.error;
                        var msg = result.msg;

                        if (error) {
                            bravetime.info(msg);
                        } else {
                            //bravetime.info(`删除成功`);
                            $(me).parents(".reviews_list").addClass("hide");
                        }
                        // 添加评论按钮展示
                        $(".right_icon_container").removeClass("hide");
                    }

                    function error() {
                        bravetime.ajaxError(28);
                        bravetime.removeLoader();
                        $(me).removeClass("disable");
                    }
                }
            });
        });
        var loadingContainer = $(".loading_container");
        // 下拉刷新
        var ajaxing = 0;
        $(window).scroll(function () {
            if (ajaxing == 0) {
                var bodyHeight = $("body").height();
                var scrollTop = $(document).scrollTop();
                var windowHeight = $(window).height();
                if (bodyHeight - scrollTop - windowHeight < 100) {
                    var success = function success(result) {
                        // window.bravetime.tj.pvSend('reviews_d2refresh','reviews_d2refresh_id'+lastId);
                        var error = result.error;
                        var msg = result.msg;
                        var list = result.list;
                        var hasMore = result.hasMore;

                        if (error) {
                            bravetime.info(msg);
                        } else {
                            if (list.length) {
                                for (var i = 0, d = undefined; d = list[i++];) {
                                    var commentId = d.commentId;
                                    var imgUrl = d.imgUrl;
                                    var name = d.name;
                                    var date = d.date;
                                    var con = d.con;

                                    var str = "<div class=\"reviews_list\" data-id=\"" + commentId + "\"><div class=\"list_title\"><div class=\"pull-right\"><span class=\"pull-right dav-color9\">" + date + "</span></div><img src=\"" + imgUrl + "\" class=\"pull-left\"><div class=\"shop_name pull-left\">" + name + "</div></div><div class=\"list_text\">" + con + "</div></div>";
                                    reviewGroup.append($(str));
                                }
                            } else {
                                loadingContainer.html("没有更多了");
                            }
                            if (hasMore == 1) {
                                ajaxing = 0;
                            } else {
                                loadingContainer.html("没有更多了");
                            }
                        }
                    };

                    var error = function error() {
                        bravetime.ajaxError(29);
                        ajaxing = 0;
                    };

                    ajaxing = 1;
                    var lastId = $(reviewGroup[0]["lastElementChild"]).attr("data-id");
                    var data = { lastId: lastId };
                    $.ajax({
                        url: refreshUrl,
                        data: data,
                        cache: false,
                        dataType: "json",
                        success: success,
                        error: error
                    });
                }
            }
        });
    }
});
