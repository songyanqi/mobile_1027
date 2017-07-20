$(document).ready(function () {
    var top0Container = $(".top0");
    var allHeight, lastY = window.scrollY;
    if (top0Container && top0Container.length) {


        $(".top_menu_button").click(function () {
            $(".top_menu_detail").toggleClass('hide');
        });
        $(window).on("scroll", function () {
            $(".top_menu_detail").addClass("hide");
        });

        $(window).scroll(scrollCallback);
        $("*").on("DOMNodeInserted", function () {
            allHeight = $(document).height() - $(window).height();
        })


    }


    function scrollCallback() {
        allHeight = allHeight || $(document).height() - $(window).height();
        var top = window.scrollY;
        var bottom = allHeight - top;
        //console.log(top,bottom,lastY);
        if (top < 40 || bottom < 40) {
            showHeader();
        } else if (top < lastY) {
            showHeader();
        } else if (top > lastY) {
            hideHeader();
        }

        lastY = top;
    }

    function showHeader() {
        if (top0Container.hasClass("top_show")) {
            return false;
        }
        if (top0Container.hasClass("top_hide")) {
            top0Container.removeClass("top_hide").addClass("top_show");
        }

    }

    function hideHeader() {
        if (top0Container.hasClass("top_hide")) {
            return false;
        }
        top0Container.addClass("top_hide").removeClass("top_show");
    }


    function isWechat() {

        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }


    var h = window.screen.availHeight;
    if ($(".search_result").length) {
        $(".search_result").css("height", h + "px");

        // $(".search_input").click(add);
        $(".search_input").focus(add);

        function add() {
            $(".dav-buyer-bottom").addClass("hide");
            $(".search_result").removeClass('hide');
            $(".top_container").addClass("active");
            $(".top0").addClass("fixed");
            $(".fuck_SB").addClass("hide");
            if (isWechat() && !$(".top0").hasClass("animating")) {
                $(".top0").addClass('animating').addClass('firsting').delay(4500).removeClass('animating');
                $(".top_fix").css('height', "45px").delay(4500).animate({"height": "0px"}, 250);
                $(".search_result").css("top", "45px").delay(4500).animate({"top": "0px"}, 250);
            }
        }

        $(".cancel").click(function () {
            $(".fuck_SB").removeClass("hide");
            $(".search_result").addClass('hide');
            $(".top_container").removeClass("active");
            $(".top0").removeClass("fixed").removeClass("firsting");
            setTimeout(function () {
                $(".dav-buyer-bottom").removeClass("hide");
            }, 1000);

        });
        $(".search_form").on("submit", function () {
            if ($(".input_container").find("input").val() == "") {
                warning_info("请输入商品名称", "top");
                return false;
            } else {
                return true;
            }
        });
    }


});
