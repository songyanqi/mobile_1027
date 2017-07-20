var module = window.module || {};
var tuan = module.tuan = {};
tuan.init = function (id) {
        $(document).ready(function () {
            var tuanListCon = $(".tuan_list");
            if (tuanListCon && tuanListCon.length) {
                tuanListCon.find("a").each(function (index, el) {
                    var $el = $(el);
                    var second = +$el.attr("data-remain-second");
                    var href = $(el).attr("href");
                    $el.attr("data-url", href);
                    $el.find(".time").html(calculateTime(second));
                    $el.click(function () {
                        if (window.tuanItemClickCallback && typeof window.tuanItemClickCallback == "function") {
                            window.tuanItemClickCallback($el, index);
                            // return false;
                        }
                    });
                });
                if (tuanListCon.find("a").find(".time").length) {
                    window.tuanInterval = setInterval(function () {
                        tuanListCon.find("a").each(function (index, el) {
                            var second = +$(el).attr("data-remain-second");
                            if (second > 0) {
                                $(el).find(".time").html(calculateTime(second));
                                $(el).attr("data-remain-second", second - 1);
                            } else {
                                $(el).find(".time").html("团购已结束");
                            }
                        });
                    }, 1000);
                }

            }

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

        });
    };

