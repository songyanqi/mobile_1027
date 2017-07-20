$(function () {
    var height = document.body.scrollHeight;
    var width = Math.min(document.body.clientWidth, 640);
    $(".bg").css("height", height + "px");

    $(".jing").css("width", "100%").css("top", height * 0.38 + "px");
    var state = {};
    var num = 0;
    var clickState = [];
    var clickNum = 0;

    init();

    function init() {
        var img = new Image();
        img.style.display = "none";
        document.body.appendChild(img);
        img.src = "//pic.davdian.com/free/2016/11/29/l2.png";

        $(document.body).append($('<audio src="//pic.davdian.com/free/duang2.mp3" preload id="music"></audio>'));
    }

    // 0-2 0-2
    /**
     * 增加灰狼
     * @param x
     * @param y
     */
    function addLang(x, y) {
        var clicked = false;
        var dom = $('<div class="lang"><img src="//pic.davdian.com/free/2016/11/29/l.png" alt=""></div>');
        $(".game").append(dom);
        var w = Math.round(width * 0.18);
        var h = Math.round(w * 180 / 140);
        var l = Math.round(width * (x * 0.3333 + 0.08));
        var t = Math.round(width * 200 / 235 * (y * 0.3333 - 0.17));
        dom.css("width", w + "px").css("height", h + "px").css("left", l + "px").css("top", t + "px").addClass("moving");
        setTimeout(function () {
            dom.remove();
        }, 3000);

        // 打狼
        dom.find("img").on("touchstart click", function (e) {
            var dom = $(this).parents(".lang");
            if (dom.data("clicked")) {
                return false;
            }
            dom.data("clicked", 1);
            clicked = true;
            $(this).css("animation-play-state", "paused").attr("src", '//pic.davdian.com/free/2016/11/29/l2.png');
            setTimeout(function () {
                dom.find("img").css("animation-play-state", "running");
                clickState[num] = 1;
                setTimeout(function () {
                    dom.remove();
                }, 500)

            }, 500);
            $("#music").get(0).pause();
            $("#music").get(0).currentTime=0;
            $("#music").get(0).play();
            e.preventDefault();
            return false;
        });
    }


    function start() {
        var t = 200 + 2000 * Math.random();
        setTimeout(function () {
            if (num < (window.num || 30)) {
                pushOne();
                start();
            } else {
                setTimeout(function () {
                    stop();
                }, 1500);

            }
        }, t);

        num++;

    }

    function pushOne() {
        // 随机生成一个数
        var r = Math.floor(Math.random() * 8.9);
        if (!state[r]) {
            state[r] = true;
            addLang(Math.floor(r / 3), Math.floor(r % 3));
            setTimeout(function () {
                state[r] = false;
            }, 2000);
        }
    }

    /**
     * 开始
     */
    function play() {

        $(".rules").addClass("hide");
        dao(function () {
            start();
        });

    }

    /**
     * 倒计时
     */
    function dao(callback) {
        showTime(3, callback);
    }

    function showTime(num, callback) {
        var dd = $("<div class='dao_time'>" + num + "</div>")
        $('.jing').append(dd);
        if (num ) {
            setTimeout(function () {
                dd.remove();
                showTime(--num, callback);

            }, 1000);
        } else {
            dd.remove();
            callback && callback();
        }
    }

    function stop() {
        $(".btn2").removeClass("hide").addClass("stop").find("img").attr("src", '//pic.davdian.com/free/2016/11/28/button4.png');
        clickNum = clickState.filter(function (x) {
            return x;
        }).length;
        $.ajax({
            url: url,
            dataType: "json",
            success: function (result) {
                if (result.code) {
                    bravetime.newAlert(result.msg, function () {
                        window.location.reload();
                    })
                } else {
                    alertSuccess(result.data, clickNum);
                }
            }, error: function () {

            }
        })
    }

    // play()

    $(".btn1").click(function () {
        $(".my_prize").removeClass("hide");
        $(".mask").removeClass("hide");
    });

    $(".btn3").click(function () {
        $(".game_rules").removeClass("hide");
        $(".mask").removeClass("hide");
    });

    $(".btn2").click(function () {
        if (!$(this).hasClass("stop")) {
            $(this).addClass("hide");
            play();
            setTimeout(function () {
                bravetime.tj.pvSend("play_game", (window["tj_path"] || 'other_path'));
            }, 500);
        }

    });

    function alertSuccess(data, clickNum) {
        $(".con").addClass("hide");
        if (clickNum) {
            $(".success .text").text('打晕' + clickNum + '只大灰狼，成功拯救小猪! 赢得' + data.bonus_name);
        } else {
            $(".success .text").text('大灰狼未被打晕，再接再厉。送你' + data.bonus_name + "鼓励一下！");
        }
        $(".success").removeClass("hide");
        $(".mask").removeClass("hide");
        // 改变内容
        if ($(".my_prize .context").length) {
            $(".my_prize .context").remove();
            $(".my_prize").append($("<div class='bonus'></div>"));
        }
        var $use = $('<div class="use"> <img src="//pic.davdian.com/free/2016/11/29/use.png" alt="">' +
            '<div class="money">' + data.type_money + '</div><div class="info"><div class="info_m">满' + data.min_goods_amount + '元使用</div>' +
            '<div class="info_d">' + data.can_use_time + '</div><a class="btn_use">立即使用</a></div></div>');
        $(".my_prize").find(".bonus").prepend($use);
    }


    // 关闭弹窗
    $(".mask").on("click", ".close", function (e) {
        $(e.target).parents(".con").addClass("hide").parents(".mask").addClass("hide");
    });

    $(".reload").click(function () {
        var href = location.href;
        if(href.indexOf("?")==-1){
            href+="?t="+(Date.now());
        }else{
            href+="&t="+(Date.now());
        }
        location.replace(href);
    });

    $(document.body).on("touchmove",function (event) {
        if(!$(event.target).parents(".my_prize").length){
            event.preventDefault();
            return false;
        }
    })
});