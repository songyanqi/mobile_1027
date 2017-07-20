// angular 加载底部数据
//var app = angular.module("maybeYouLike", []);
//app.directive('goods2row', function ($window, $sce) {
//    var url = $sce.trustAsResourceUrl(window.baseFeUrl + "/module/goods3row.html");
//    return {
//        restrict: "EA",
//        require: ['^ngModel'],
//        replace: true,
//        scope: false,
//        templateUrl: url,
//        link: function (scope, element) {
//            var ajaxing = true;
//            getGoods(scope,ajaxing);
//            $("body").on("click", ".has_mores", function () {
//                getGoods(scope,ajaxing);
//            })
//        }
//    }
//});
//
//function getGoods(scope,ajaxing) {
//    if (ajaxing) {
//        ajaxing = false;
//        $.ajax({
//            url: maybeYouLikeUrl,
//            dataType: "json",
//            success: function (result) {
//                if (result.code) {
//                    ajaxing = true;
//                    bravetime.info("网络异常,猜你喜欢数据获取失败");
//                } else {
//                    scope.goods = result.data;
//                    scope.has_more = result.has_more;
//                    scope.$apply();
//                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 100, failure_limit: 100})
//                }
//            }, error: function () {
//                ajaxing = true;
//            }
//        });
//    }
//}


// angular 加载数据
var app = angular.module("maybeYouLike", []);
app.directive('goods2row', function ($window, $sce) {
    var url = $sce.trustAsResourceUrl(window.baseFeUrl + "/module/goods3row.html");
    return {
        restrict: "EA",
        require: ['^ngModel'],
        replace: true,
        scope: false,
        templateUrl: url,
        link: function (scope, element) {
            var ajaxing = true;
            var page = 1;

            getData();

            $(".good_list_2_row").on("click",".has_mores",function(){
                var imgs = '<img src="//pic.davdian.com/free/loading_03252.svg">';
                $(this).html(imgs);
                getData();
            });

            function getData() {
                if (ajaxing) {
                    ajaxing = false;
                    $.ajax({
                        url: maybeYouLikeUrl,
                        dataType: "json",
                        data: {
                            page: page,
                            pagesize:4,
                            id:goodsid
                        },
                        success: function (result) {
                            if (result.code) {
                                ajaxing = false;
                                bravetime.info(result.msg);
                            } else {
                                ajaxing = true;
                                page++;

                                scope.goods = (scope.goods || []).concat(result.data);

                                scope.has_more = result.has_more;
                                scope.$apply();
                                $("img[data-original]").lazyload({
                                    effect: "fadeIn",
                                    threshold: 100,
                                    failure_limit: 100
                                });
                                if (!scope.has_more) {
                                    ajaxing = false;
                                }
                            }
                            $(".has_mores").html("点击加载更多");
                        }, error: function () {
                            ajaxing = false;
                            bravetime.info("网络异常,数据获取失败");
                        }
                    });
                }
            }

        }
    }
});
//引入 猜你喜欢 模块
var maybeYouLike = require("../module/maybeYouLike.vue");


new Vue({
    el:'body',
    data:function(){
        return{
            msg:'hello vue',
        }
    },
    components:{
        maybeYouLike:maybeYouLike,
    }
});



