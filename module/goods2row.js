
// angular 加载数据
var app = angular.module("categoryApp", []);
app.directive('goods2row', function ($window, $sce) {
    var url = $sce.trustAsResourceUrl(window.baseFeUrl + "/module/goods2row.html");
    return {
        restrict: "EA",
        require: ['^ngModel'],
        replace: true,
        scope: false,
        templateUrl: url,
        link: function (scope, element) {
            var ajaxing = true;
            if($(".good_list_2_row").find(".good_item").length<window.firstPageSize){
                ajaxing = false;
                return false;
            }
            angular.element($window).on('scroll', function () {
                var offset = $window.pageYOffset + $window.innerHeight;
                var offsetTop = element[0].offsetTop+$(element[0]).height();
                if (offsetTop - offset < 200) {
                    getData();
                }
            });
            var page = pageIndexStart;

            function getData() {
                if (ajaxing) {
                    ajaxing = false;
                    $.ajax({
                        url: goodsUrl,
                        dataType: "json",
                        data: {
                            page: page
                        },
                        success: function (result) {
                            if (result.code) {
                                ajaxing = false;
                                bravetime.info(result.msg);
                            } else {
                                ajaxing = true;
                                page++;
                                scope.goods =(scope.goods||[]).concat( result.data);
                                scope.has_more = result.data.length == window.syncPageSize;
                                scope.tj_page = window.tj_path||'category';
                                scope.$apply();
                                if(!scope.has_more){
                                    ajaxing = false;
                                }
                            }
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