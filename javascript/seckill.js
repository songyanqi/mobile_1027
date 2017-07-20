/**
 * Created by Murphy.lee on 16/3/29.
 */
$(function () {
    swiper_time();

});

function swiper_time() {

    var swiper_slide = $(".swiper-slide");
    var preview = swiper_slide.size();
    //限时抢购时间列默认选中的在最中间
    var select = 0;
    swiper_slide.each(function () {
        if ($(this).hasClass("hover")) {
            return false;
        } else {
            select++;
        }
    });

    //初始化swiper
    if (preview < 5) {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: preview,
            grabCursor: true
        });
    } else {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 5,
            initialSlide: select - 2,
            grabCursor: true
        });
    }


    //异步加载初始页面
    // load_seckill_page(true);
    scroll_seckill_other();

    var $body = $('body');
    //限时时段点击事件
    $body.on('click', '.swiper-slide', function () {
        $(this).addClass('hover').siblings().removeClass('hover');
    });
    //精选分类点击事件
    $body.on('click', '.seckill_list_title li', function () {
        if ($(this).hasClass("hover")) {

        } else {
            $(this).addClass('hover').siblings().removeClass('hover');
            $(".no_more").remove();

            load_seckill_page();
        }

    });
    $body.on('click', '.remain_btns', function (event) {
        event.stopPropagation();
        var $this = $(this);
        $(".swiper-wrapper").find("li").each(function () {
            if ($(this).hasClass("hover")) {
                timeNum = $(this).attr("value");
            }
        });
        var statues = $this.find("div").attr("class");
        var goods_num = $this.parent().attr("id");
        if (statues == "panic_buying_btn") {
            window.location.href = $this.parent().find("a:eq(0)").attr("href");
        } else if (statues == "remind_cancel_btn") {
            $.ajax({
                type: "get",
                url: window.remainds,
                data: {
                    goods_id: goods_num,
                    time:timeNum,
                    remaind: 1
                },
                success: function (datas) {
                    if(typeof datas == "string"){
                        var data = JSON.parse(datas);
                    }else{
                        var data = datas;
                    }
                    if (data.code == 0) {
                        $this.find("div").addClass("remind_me_btn").removeClass("remind_cancel_btn").html("提醒我");
                    } else if(data.code == 2) {
                        window.location.href = data.url;
                    }else{
                        bravetime.info(data.msg);
                    }
                },
                error: function () {
                    bravetime.info("网络错误");
                }
            });
        } else if (statues == "remind_me_btn") {
            $.ajax({
                type: "get",
                url: window.remainds,
                data: {
                    goods_id: goods_num,
                    time:timeNum,
                    remaind: 0
                },
                success: function (datas) {
                    if(typeof datas == "string"){
                        var data = JSON.parse(datas);
                    }else{
                        var data = datas;
                    }
                    if (data.code == 0) {
                        $this.find("div").addClass("remind_cancel_btn").removeClass("remind_me_btn").html("取消提醒");
                        bravetime.info("设置成功");
                    } else if(data.code == 2) {
                        window.location.href = data.url;
                    }else{
                        bravetime.info(data.msg);
                    }
                },
                error: function () {
                    bravetime.info("网络错误");
                }
            });
        } else if (statues == "more_concessions_btn") {
            window.location.href = $this.parent().find("a:eq(0)").attr("href");
        }
    });
}

//异步加载初始页面
function load_seckill_page(flag) {
    $("body").append('<div class="loading-wrap">' + '</div>');
    ajaxing = 1;
    var timeNum = 0,
        lableNum = 0;
    $(".no_more").remove();
    $(".swiper-wrapper").find("li").each(function () {
        if ($(this).hasClass("hover")) {
            timeNum = $(this).attr("value");
        }
    });
    // $(".seckill_list_title").find("li").each(function () {
    //     if ($(this).hasClass("hover")) {
    //         lableNum = $(this).attr("value");
    //     }
    // });
    var Data = {
        time: timeNum,
        // lable: lableNum
    };
    var $ul = $(".seckill_list").find("ul");
    $.ajax({
            type: "get",
            url: window.loadPages,
            data: Data,
            success: function (datas) {
                if(typeof datas == "string"){
                    var data = JSON.parse(datas);
                }else{
                    var data = datas;
                }
                if (data.code == 0) {
                    $ul.empty();
                    addGoods(data, $ul);
                    $(".loading-wrap").remove();
                    animate_bar();
                    //上拉加载更多
                    scroll_seckill(data);
                    if(data.has_more == true){
                        $(".no_more").remove();
                    }else{
                        $(".no_more").remove();
                        $("body").append('<div class="no_more">' + "没有更多商品" + '</div>');
                    }

                //    倒计时时间判断



                }else{
                    $(".loading-wrap").remove();
                    $("body").append('<div class="no_more" style="margin: 55px">' + "没有更多秒杀商品了~" + '</div>');
                }
            },
            error: function () {
                $(".loading-wrap").remove();
                bravetime.info("网络错误");
            }
        }
    );
}

function scroll_seckill(data) {
    var pages = pageStartIndex||1;
    //绑定指定页面的scroll事件，进行加载
    var ajaxing = 0; //标记是否在ajax请求
    //绑定商品管理页面
    $(document).off("scroll");
    $(document).on("scroll", function () {
        //动态加载进度条
        animate_bar();
        //判断是否在加载中
        if (ajaxing == 0) {
            //判断是否快到页面底部
            var bodyHeight = $(document.body).height();
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            if ((bodyHeight - scrollTop - windowHeight) < 100) {
                //发起ajax请求
                $("body").append('<div class="loading-wrap">' + '</div>');
                if(data.has_more == false){
                    $(".loading-wrap").remove();
                    $(".no_more").remove();
                    $("body").append('<div class="no_more">' + "没有更多商品" + '</div>');
                    ajaxing = 1;
                    return false;
                }
                ajaxing = 1;
                // 当前页数
                pages += 1;
                $(".swiper-wrapper").find("li").each(function () {
                    if ($(this).hasClass("hover")) {
                        timeNum = $(this).attr("value");
                    }
                });
                // $(".seckill_list_title").find("li").each(function () {
                //     if ($(this).hasClass("hover")) {
                //         lableNum = $(this).attr("value");
                //     }
                // });

                $.ajax({
                    type: "get",
                    data: {
                        time: timeNum,
                        // lable: lableNum,
                        page_num: pages
                    },
                    url: window.loadPages,
                    dataType: "json",
                    success: function (datas) {
                        if(typeof datas == "string"){
                            var data = JSON.parse(datas);
                        }else{
                            var data = datas;
                        }
                        if(data.code == 0){
                            ajaxing = 0;
                            var $ul = $(".seckill_list").find("ul");
                            addGoods(data, $ul);
                            bravetime.removeLoader();
                            $(".loading-wrap").remove();
                            if(data.has_more == true){

                            }else{
                                ajaxing = 1;
                                $(".loading-wrap").remove();
                                $("body").append('<div class="no_more">' + "没有更多商品" + '</div>');
                            }
                        }else{
                            $(".loading-wrap").remove();
                            bravetime.info(data.msg);
                        }
                    },
                    error: function () {
                        $(".loading-wrap").remove();
                        bravetime.info("网络错误");
                    }
                })

            }
        }
    });
}


//加载商品数据
function addGoods(data, ul) {
    for (var i = 0; i < data.goods_data.length; i++) {
        var $li = $('<li class="list_style"></li>').attr("id", data.goods_data[i].goods_id);
        var anniversaryLogo="";
        if(window.anniversary==1){
            anniversaryLogo='<span class="anniversary_logo"></span>';
        }
        if(window.start == 1){
            var html = '<a href=' + data.goods_data[i].href + '>' +
                '<div class="img_container">' +
                '<div class="img_container_inner">' +
                '<img src=' + data.goods_data[i].goods_img + '>' + anniversaryLogo +
                '</div>' +
                '<div class="order_good_info_container">' +
                '<div class="order_good_name">' + data.goods_data[i].good_name + '</div>' +
                '<div class="order_good_price">' +
                '<span class="price_symbol">'+"￥"+'</span>' + data.goods_data[i].panic_buy +
                '<span class="market_price dav-small">' + "￥" + data.goods_data[i].market_price + '</span>' + '</div>' +
                '<div class="progress_bar">' +
                '<div class="progress_bar_bg">' +
                '<div class="progress_container" style="position:relative;width: ' + data.goods_data[i].finish_percentage + "%" + '"><div class="progress_bar_percentage">' + '</div></div> ' +
                '<div class="finish_percentage">' + "已售" + data.goods_data[i].finish_percentage + "%" + '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</a>';
        }else{
            var html = '<a href=' + data.goods_data[i].href + '>' +
                '<div class="img_container">' +
                '<div class="img_container_inner">' +
                '<img src=' + data.goods_data[i].goods_img + '>' + anniversaryLogo +
                '</div>' +
                '<div class="order_good_info_container">' +
                '<div class="order_good_name">' + data.goods_data[i].good_name + '</div>' +
                '<div class="order_good_price">' +
                '<span class="price_symbol">'+"￥"+'</span>' + data.goods_data[i].panic_buy +
                '<span class="market_price dav-small">' + "￥" + data.goods_data[i].market_price + '</span>' + '</div>' +
                '<div class="fucure">' + '<span style="font-size: 11px;color: #00c7c0;">' + startTime + '准时开抢' + '</span>' + '</div>' +
                '</div>' +
                '</div>' +
                '</a>';
        }
        $li.html(html);
        ul.append($li);
        if (data.goods_data[i].remain_status == 1) {
            //var $a = $('<a href="###" class="remain_btns"></a>');
            //var htms_1 = '<div class="remind_me_btn">' + "提醒我" + '</div>';
            //$a.html(htms_1);
            //$li.append($a);
        } else if (data.goods_data[i].remain_status == 2) {
            //var $a = $('<a href="###" class="remain_btns"></a>');
            //var htms_1 = '<div class="remind_cancel_btn">' + "取消提醒" + '</div>';
            //$a.html(htms_1);
            //$li.append($a);
        }
        else if (data.goods_data[i].remain_status == 3 && start == 1) {//未卖完
            var $a = $('<a href="###" class="remain_btns"></a>');
            var htms_1 = '<div class="panic_buying_btn">' + "立即抢" + '</div>';
            $a.html(htms_1);
            $li.append($a);
        } else if (data.goods_data[i].remain_status == 4 && start == 1) {//已经卖完
            var $a = $('<a href="###" class="remain_btns"></a>');
            var htms_1 = '<div class="more_concessions_btn">' + "更多优惠" + '</div>';
            $a.html(htms_1);
            $li.append($a);
            $li.find(".img_container_inner").append('<span class="sold_lable">' + "已抢光" + '</span>');
            $a.parent().find(".progress_container").css("width","100%");
            $a.parent().find(".finish_percentage").html("已售100%");
        }
        bravetime.removeLoader();
    }
}
//给销售进度条加上动画
function animate_bar() {
    $(".progress_bar_percentage").each(function () {
        //屏幕可视区域的高度 + 上滚隐藏的距离
        var fold = $(window).height() + $(window).scrollTop();

        if (fold >= $(this).offset().top) {
            $(this).addClass("wall");
        }
    });
}

function stopEvent(event){ //阻止冒泡事件
    //取消事件冒泡
    var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
    if (e && e.stopPropagation) {
        // this code is for Mozilla and Opera
        e.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}

function scroll_seckill_other() {
    var pages = pageStartIndex||1;
    //绑定指定页面的scroll事件，进行加载
    var ajaxing = 0; //标记是否在ajax请求
    //绑定商品管理页面
    animate_bar();
    $(document).off("scroll");
    $(document).on("scroll", function () {
        //动态加载进度条
        animate_bar();
        // 小于50条就什么都不操作
        if($(".seckill_list ul li").length<firstPageSize){
            return false;
        }
        //判断是否在加载中
        if (ajaxing == 0) {
            //判断是否快到页面底部
            var bodyHeight = $(document.body).height();
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            if ((bodyHeight - scrollTop - windowHeight) < 100) {
                //发起ajax请求
                $("body").append('<div class="loading-wrap">' + '</div>');
                ajaxing = 1;
                // 当前页数
                pages += 1;
                $(".swiper-wrapper").find("li").each(function () {
                    if ($(this).hasClass("hover")) {
                        timeNum = $(this).attr("value");
                    }
                });
                // $(".seckill_list_title").find("li").each(function () {
                //     if ($(this).hasClass("hover")) {
                //         lableNum = $(this).attr("value");
                //     }
                // });

                $.ajax({
                    type: "get",
                    data: {
                        time: timeNum,
                        // lable: lableNum,
                        page_num: pages
                    },
                    url: window.loadPages,
                    dataType: "json",
                    success: function (datas) {
                        if(typeof datas == "string"){
                            var data = JSON.parse(datas);
                        }else{
                            var data = datas;
                        }
                        if(data.code == 0){
                            ajaxing = 0;
                            var $ul = $(".seckill_list").find("ul");
                            addGoods(data, $ul);
                            bravetime.removeLoader();
                            $(".loading-wrap").remove();
                            if(data.has_more == true){

                            }else{
                                ajaxing = 1;
                                $(".loading-wrap").remove();
                                $("body").append('<div class="no_more">' + "没有更多商品" + '</div>');
                            }
                        }else{
                            $(".loading-wrap").remove();
                            bravetime.info(data.msg);
                        }
                    },
                    error: function () {
                        $(".loading-wrap").remove();
                        bravetime.info("网络错误");
                    }
                })

            }
        }
    });
}


//倒计时
var seckillContainer = $(".seckillCountdown");
var time = $(".time");
var timestamp = Date.parse(new Date()) / 1000;

if(seckillContainer.length){
    var seckillTime = + indexSeckillCountdown;
    seckillTime = seckillTime - timestamp ;

    if(seckillTime<0){
        time.html("本场活动已结束");
        clearInterval(ts);
    }else{
        time.html(seckillCountdown(seckillTime));
    }

    var  ts = setInterval(function () {
        if(seckillTime<0){
            time.html("本场活动已结束");
            clearInterval(ts);
        }else{
            time.html(seckillCountdown(seckillTime));
        }
        seckillTime--;
    },1000);
}

function seckillCountdown(second) {
    var s = second % 60, m = Math.floor(second / 60) % 60,
        h = Math.floor(second / 60 / 60);
    var str = '';
    if(start == 0){
        str = '<div class = "fz_12" style="text-align:center;float: left;height: 40px;line-height: 42px;">距离本场开始</div> <div style="float: right;padding-left: 10px;"> <div class="seckillCountdown" style="height:40px;line-height: 40px;"> <span class="seckill_bg">' + (h < 10 ? '0' : '') + h + '</span>' + '<span class="seckill_semicolon">' + ':' + '</span>' + '<span class="seckill_bg">' + (m < 10 ? '0' : '') + m +'</span>' + '<span class="seckill_semicolon">' + ':' + '</span>' + '<span class="seckill_bg">' + (s < 10 ? '0' : '') + s+'</span> </div> </div>'
    }else{
        str = '<div class = "fz_12" style="text-align:center;float: left;height: 40px;line-height: 42px;">距离本场结束</div> <div style="float: right;padding-left: 10px;"> <div class="seckillCountdown" style="height:40px;line-height: 40px;"> <span class="seckill_bg">' + (h < 10 ? '0' : '') + h + '</span>' + '<span class="seckill_semicolon">' + ':' + '</span>' + '<span class="seckill_bg">' + (m < 10 ? '0' : '') + m +'</span>' + '<span class="seckill_semicolon">' + ':' + '</span>' + '<span class="seckill_bg">' + (s < 10 ? '0' : '') + s+'</span> </div> </div>'
    }
    return str;
}