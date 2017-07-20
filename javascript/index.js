$(document).ready(function(){

    var page = window.page || "首页";
    var pageyy = "首页for运营";

     // 顶部轮播图滚动


    if($(".index_ads .swiper-slide").size()==1){

    }
    else {
        var index_ads=new Swiper('.index_ads', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false,
            loop: true,
            preloadImages:false,
            lazyLoading : true
        });

        if(window.double11){
            index_ads.stopAutoplay();
            setTimeout(function () {
                index_ads.startAutoplay();
            },15000)
        }
    }

    // 小喇叭
    new Swiper('.broadcast_title', {
        paginationClickable: true,
        centeredSlides: true,
        noSwiping:true,
        autoplay: 3500,
        autoplayDisableOnInteraction: false,
        loop: true,
        direction: 'vertical'
    });

    // 商品图片左右滚动
    var pmwidth=document.documentElement.dataset.width;
    var goodnum=pmwidth/110;
    new Swiper('.related-item-list', {
        slidesOffsetBefore: 10,
        slidesPerView:goodnum,
        paginationClickable: true,
        freeMode: true,
        lazyLoading : true
    });


    /*//小喇叭,大V播报


    var Timer = null;//定义一个计时器
    var $index = 0; //定义当前下标值
    var $qiandex = 0;//定义前一个下标值
    var all_broadcast = $(".swiper1").size();
    //给第一个链接添加swiper_wrap
    $(".swiper_wrap").find("a:eq(0)").addClass("first_swiper");
    autoPlay();
    function autoPlay() {//自动切换图片
        Timer = setInterval(function () {
            $index++;
            if ($index > all_broadcast-1) {
                $index = 0;
                $qiandex = all_broadcast-1;
            }
            scrollPlay();
            $qiandex = $index;
        }, 3500);
    }

    function scrollPlay() {
        if ($index == 0 && $qiandex == all_broadcast-1) {
            $(".swiper").eq($qiandex).stop(true, true).animate({
                "top": "-60px"
            });
            $(".swiper").eq($index).css("top", "60px").stop(true, true).animate({
                "top": "0"
            });
        } else if ($index == all_broadcast-1 && $qiandex == 0) {
            $(".swiper").eq($qiandex).stop(true, true).animate({
                "top": "60px"
            });
            $(".swiper").eq($index).css("top", "-60px").stop(true, true).animate({
                "top": "0"
            });
        } else if ($index > $qiandex) { //左移
            $(".swiper").eq($qiandex).stop(true, true).animate({
                "top": "-60px"
            });
            $(".swiper").eq($index).css("top", "60px").stop(true, true).animate({
                "top": "0"
            });
        } else if ($index < $qiandex) { //右移
            $(".swiper").eq($qiandex).stop(true, true).animate({
                "top": "60x"
            });
            $(".swiper").eq($index).css("top", "-60px").stop(true, true).animate({
                "top": "0"
            });
        }
    }*/




    //下拉刷新
    var ajaxing = 0; //标记是否在ajax请求
     var pageIndex = window.pageIndexStart||2;
    if($(".good_list_2_row.hot").length){
        $(window).on("scroll", function(){
            if (ajaxing == 0){
                //判断是否快到页面底部
                var bodyHeight = $("body").height();
                var scrollTop = $(document).scrollTop();
                var windowHeight = $(window).height();
                if((bodyHeight - scrollTop - windowHeight) < 100 ){
                    //发起ajax请求
                    ajaxing = 1;
                    $.ajax({
                        data:{
                            page:pageIndex,
                            pagesize:pagesize,
                            userId:userId,
                            t:Date.now()
                        },
                        url:refreshUrl,
                        success:function(d){
                            window.bravetime.tj.pvSend('index_d2refresh','index_d2refresh_p'+pageIndex);
                            if(typeof d == "string"){
                                var data = JSON.parse(d);
                            }else{
                                var data = d;
                            }
                            if(+data["error_code"]){
                                warning_info(data["error_msg"]);
                                ajaxing = 0;
                            }else if(data["data"].length){
                                var goodsData = data["data"],good,i=0,list = $(".good_list_2_row.hot");
                                for(;good=data["data"][i++];){
                                    $('<a href="'+good["url"]+'" data-url="'+good["url"]+'" class="good_item"><div class="good_img_container">'+
                                        '<img src="'+good["img"]+'">'+
                                        ((good["sale_status"]=="offline"||good["sale_status"]=="soldout")?('<div class="good_list_sell_out">'+{offline:"下架",soldout:"售罄"}[good["sale_status"]] +'</div>' ):"")+
                                        (good["tag"]?('<div class="'+good["tag"].toString()+'"></div>'):"")+
                                        '</div><div class="good_title">'+good["title"]+'</div><div class="good_price">¥'+good["price"]+'</div></a>').appendTo(list);
                                }
                                pageIndex++;
                                ajaxing = 0;
                            }else{
                                $(".refresh").html("没有更多商品了！");
                            }
                        },
                        error:function(){
                            $(".refresh").empty();
                            bravetime.ajaxError(18);
                            ajaxing = 0;
                        }
                    });
                }
            }


        });
    }

    // 团购倒计时
    var tuanContainer = $(".countdown_con");
    if(tuanContainer.length){
        var tuanTime = +tuanContainer.attr("data-tuan-time");
        var  ts = setInterval(function () {
            if(tuanTime<0){
                tuanContainer.empty().addClass("hide");
                clearInterval(ts);
            }else{
                tuanContainer.removeClass("hide").html(calculateTime(tuanTime));
            }
            tuanTime--;
        },1000);
    }



    function calculateTime(second) {
        var s = second % 60, m = Math.floor(second / 60) % 60,
            h = Math.floor(second / 60 / 60) % 24,
            d = Math.floor(second / 60 / 60 / 24);
        var str = '';
        if (d) {
            str = "剩 " + d + " 天" ;
        } else {
            str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        }
        return str;
    }

    // 秒杀倒计时
    var seckillContainer = $(".seckillCountdown");
    if(seckillContainer.length){
        var seckillTime = + indexSeckillCountdown;
        var  ts = setInterval(function () {
            if(seckillTime<0){
                seckillContainer.empty().addClass("hide");
                clearInterval(ts);
            }else{
                seckillContainer.html(seckillCountdown(seckillTime));
            }
            seckillTime--;
        },1000);
    }



    function seckillCountdown(second) {
        var s = second % 60, m = Math.floor(second / 60) % 60,
            h = Math.floor(second / 60 / 60);
        var str = '';
        str ="<span class='seckill_bg'>" + (h < 10 ? "0" : "") + h + "</span>" + "<span class='seckill_semicolon'>" + ":" + "</span>" + "<span class='seckill_bg'>" + (m < 10 ? "0" : "") + m +"</span>" + "<span class='seckill_semicolon'>" + ":" + "</span>" + "<span class='seckill_bg'>" + (s < 10 ? "0" : "") + s+"</span>";
        return str;
    }
    // app 红包
  /*  var appRedContainer = $(".app_loginred_con_bg");
    if(appRedContainer.length && window.getAppBonusUrl && Units && Units.isApp()){
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        if(windowWidth<windowHeight){
            appRedContainer.css("top",(windowHeight-windowWidth)/2+"px");
        }

        $.ajax({
            url:getAppBonusUrl,
            dataType:"json",
            cache:false,
            success: function (result) {
                if(result["code"]){
                    bravetime.info(result["msg"]);
                }
            },error: function () {

            }
        });

        var appRed = $(".app_loginred_con");
        // cookie里有就写到localStrong里面
        if($.cookie("dvd_ios_first_01")=="1"){
            localStorage["dvd_ios_first_01"]="1";
        }


        // localStrong没有就显示
        if(!(localStorage["dvd_ios_first_01"]=="1")){
            var src = appRed.find("img").attr("src");
            var img = new Image();
            img.onload= function () {
                appRed.removeClass("hide");
                localStorage["dvd_ios_first_01"]="1";
                $.cookie("dvd_ios_first_01",1);
            };
            img.src= src;

        }
        appRedContainer.find(".app_loginred_con_close").click(function () {
            appRed.addClass("hide");
        });


    }*/
    if ($(".app_loginred_con").size()>0) {
        $(".app_loginred_con").removeClass("hide");
        setTimeout(function () {
            $(".app_loginred_con").addClass("hide");
        }, 3000)
    }


    $(".index_model").each(function (index, el) {
        // data-dav-tj="index|limit_tuan|limit_tuan|1|limit_tuan@index"
        $(el).find("a").each(function (i, e) {
            var $e = $(e);
            $e.attr('data-dav-tj','index|little_doufu|little_doufu_'+ (index+1) +'_'+ (i+1) +'|1|little_doufu_'+ (index+1) +'_'+ (i+1) +'@index')
        })
    })


});


// angular 加载底部数据
    var app = angular.module("indexApp", []);
app.directive('goods2row', ["$window","$sce",function ($window,$sce) {
    // var url = $sce.trustAsResourceUrl(window.baseFeUrl+"/module/goods2row.html");
    return {
        restrict: "EA",
        require: ['^ngModel'],
        replace: true,
        scope: false,
        template:'<div class=\"good_list_2_row\"><div ng-if=\"beforeFirstLoading\" class=\"logo_container\"><div class=\"logo_left\"></div><div class=\"logo_right\"></div></div><a ng-if=\"goods.length\" href=\"/{{item.goods_id}}.html?_refer={{refer||\'index\'}}&_refer_val={{k}}\" ng-click=\"goodsClick()\" class=\"good_item\" ng-repeat=\"(key,item) in goods\" data-dav-tj=\"{{tj_page}}|hot_good|hot_good_{{item.goods_id}}|1|hot_good@{{tj_page}}\" data-url=\"/{{item.goods_id}}.html?_refer={{refer||\'index\'}}&_refer_val={{k}}\"><div class=\"good_img_container\"><img ng-src=\"{{item.goods_img}}\" style=\"display:inline\"><div ng-if=\"!item.sale_status==\'\'|| !item.sale_status==\'undefined\'\" class=\"good_list_sell_out\"><span ng-if=\"item.sale_status==\'soldout\'\">售罄</span> <span ng-if=\"item.sale_status==\'offline\'\">未上架</span></div><div class=\"pic_info\" ng-if=\"item.pic_info\">{{item.pic_info}}</div></div><div class=\"good_con\"><div class=\"good_title\">{{item.goods_name}}</div><div class=\"fz_12\"><span class=\"dav-color-price\">¥{{item.shop_price}}</span> <span ng-if=\"item.goods_label&&item.goods_label!=\'\'\" class=\"lable\">{{item.goods_label}}</span></div></div></a><div style=\"clear:both\"></div><div ng-if=\"goods&&!has_more\" class=\"no_more\">没有更多商品了</div><div ng-if=\"has_more\" class=\"no_more\">商品加载中 <img src=\"//pic.davdian.com/free/loading_03252.svg\"></div></div>',
        link: function (scope, element) {
            scope.beforeFirstLoading = true;
            var ajaxing = true;
            scrollListener();
            angular.element($window).on('scroll', function() {
                scrollListener();
            });

            function scrollListener(){
                var offset = $window.pageYOffset+$window.innerHeight;//文档现在的位置加上窗口的大小
                var offsetTop = element[0].offsetTop;//整个页面的高度?


                if(offsetTop-offset<800){
                    getData();
                }
            }
            function getData(){
                if(ajaxing){
                    ajaxing = false;
                    $.ajax({
                        url:maybeYouLikeUrl,
                        dataType:"json",
                        success: function (result) {
                            scope.beforeFirstLoading = false;
                            if(result.code){
                                ajaxing = true;
                                bravetime.info("网络异常,猜你喜欢数据获取失败");
                            }else{
                                scope.goods = result.data;
                                scope.tj_page = window.tj_path||"index";
                                scope.tj_page_detail = window.tj_path_detail||null;
                                scope.$apply();
                            }
                        },error: function () {
                            ajaxing = true;
                        }
                    });
                }
            }
        }
    }
}]);
//vuejs 加载猜你喜欢数据



var dvdBottom = require("../module/bottom.vue");
var tuanList = require("../module/tuanList.vue");

//引入 猜你喜欢 模块
var maybeYouLike = require("../module/maybeYouLike.vue");

new Vue({
    el: "#index",
    data:function(){
        return{
            msg:'hello vue',
            tuanConfig:{
                url:window.tuanDataUrl
            }
        }
    },
    components:{
        dvdBottom:dvdBottom,
        tuanList:tuanList,
        maybeYouLike:maybeYouLike,
        app:app,
    }
});

