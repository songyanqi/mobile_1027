/**
 * Created by luming on 2016/11/22.
 */
/**
 * Created by xuzelian on 16/3/22.
 */

var cateStaticStr = 'dvd_search_category';

$(function () {
    var searchInput = $(".search_input");
    var likeContainer = $(".search_like");
    var allButton = $(".all_category");


    searchLike();

    function h5ClassroomSearch() {

        if (Units.isWechat() && !$(".search_top").hasClass("animating")) {
            if (!$(".top_fix").length) {
                $("body").prepend($('<div class="top_fix"></div>'))
            }
            $(".search_top").addClass("animating").delay(4500).removeClass('animating');
            $(".top_fix").css('height', "45px").delay(4500).animate({"height": "0px"}, 250);
        }
    }

    // 输入时候向后台查询
    function searchLike() {
        searchInput.on("input", function () {
            var text = $.trim(searchInput.val());
            if (text == "") {
                likeContainer.addClass("hide");
                goodsList.removeClass("hide");
                return false;
            }
            $.ajax({
                url: window.likeUrl,
                data: {q: text},
                dataType: "json",
                success: function (result) {
                    if (!result.code) {
                        if (result.data.length) {
                            var ul = likeContainer.find(".like_list").empty();
                            for (var i = 0; i < result.data.length; i++) {
                                ul.append($("<li></li>").html('<a href="/goods_search.html?q=' + result.data[i] + '">' + result.data[i] + '</a>'))
                            }
                            likeContainer.removeClass("hide");
                            goodsList.addClass("hide")
                        } else {
                            likeContainer.addClass("hide");
                            goodsList.removeClass("hide");
                        }
                    }
                }
            })
        });
    }


    var searchResultPage = $(".search_result_page").length;
    var body = $("body");
    var goodsList = $(".good_list_2_row");
    var filterContainer = $(".filter_container");


    // 看看cookie里面有没有搜索记录
    var list = [];
    var dvd_index_search = $.cookie("dvd_index_search");
    if (dvd_index_search && dvd_index_search.length) {
        list = dvd_index_search.split(",");
    }

    $("form").submit(function () {
        var v = $.trim($(this).find("input").val());
        if (v == "") {
            bravetime.info("请输入搜索内容");
            return false;
        }
        addWord2List(v);
        clearCategory();
    });

    /**
     * 清除选中的一些东西
     */
    function clearCategory() {
        $.removeCookie(cateStaticStr);
    }


    function addWord2List(v) {
        var index = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == v) {
                index = i;
            }
        }
        if (index > -1) {
            list.splice(index, 1);
        }
        if (list.length > 6) {
            list.splice(0, list.length - 6);
        }
        list.push(v);
        $.cookie("dvd_index_search", list.join(","))
    }

    if (searchResultPage) {
        // 获取搜索词,异步获取数据
        var searchWord = location.search.slice(1).split("&").filter(function (x) {
            return x.indexOf("q=") > -1
        })[0].split("=")[1];

        var backButton = $(".left_icon_container");

        backButton.click(function () {
            if (body.hasClass("filtering")) {
                body.removeClass("filtering");
            } else {
                history.back();
            }
        });

        searchInput.val(decodeURIComponent(decodeURIComponent(searchWord)));
        addWord2List(decodeURIComponent(decodeURIComponent(searchWord)));

        searchInput.focus(function () {
            body.addClass("searching");
            body.removeClass("filtering");
        });
        searchInput.blur(function () {
            body.removeClass("searching")
        });


        // 切换筛选
        $(".filter_toggle_btn").click(function () {
            body.toggleClass("filtering")
        });


        // 点重置 清除筛选条件
        $(".filter_reset_btn").click(function () {
            categoryBtn.removeClass("selected");
            allButton.addClass("selected");
        });

        // 点分类 选中
        var categoryBtn = $(".category_btn_list").find(".category_btn");
        categoryBtn.click(function () {
            var currentButton = $(this);
            // 点击全部就取消所有
            if (currentButton.hasClass("all_category")) {
                categoryBtn.removeClass("selected");
                currentButton.addClass("selected");
            } else {
                // 否则,去掉全部按钮,选择当前按钮
                currentButton.toggleClass("selected");
                allButton.toggleClass("selected", !categoryBtn.hasClass("selected"));
            }

        });
    } else {

        clearCategory();
        if (list.length) {
            $(".history_list").empty();
            for (var i = 0; i < list.length; i++) {
                $(".history_list").prepend($("<li><a href='/goods_search.html?q=" + list[i] + "'>" + list[i] + "</a></li>"))
            }
        } else {
            $(".search_history").remove();
        }

        $(".delete_history_btn").on("click", function () {
            $(".search_history").remove();
            $.cookie("dvd_index_search", "");
        });

    }
});

function getSearchData(data, callback) {
    $.ajax({
        url: "",
        data: data,
        dataType: "json",
        success: function (result) {
            if (result["code"]) {
                bravetime.info(result.msg);
            } else {
                callback(result.data)
            }
        },
        error: function () {
            bravetime.info("获取数据失败,请刷新");
        }
    })
}

var app = angular.module("indexApp", []);
app.controller("SearchController", ['$scope', '$window', function ($scope, $window) {
    // 直接获取数据


    var searchWord = location.search.slice(1).split("&").filter(function (x) {
        return x.indexOf("q=") > -1
    })[0].split("=")[1];

    var data = {};
    data.q = searchWord;
    data.page = 1;

    $scope.sort = function (type) {
        $scope.sortType = type;
        change();
    };


    $scope.beforeFirstLoading = true;
    $scope.has_more = true;
    var ajaxing = true;

    angular.element($window).on('scroll', function () {
        scrollListener();
    });

    init();

    $scope.$watch('minPrice', function (v) {
        if (v < 0) {
            $scope.minPrice = -v;
        }
    });

    $scope.$watch('maxPrice', function (v) {
        if (v < 0) {
            $scope.maxPrice = -v;
        }
    });

    $scope.filter = function () {
        if ($scope.minPrice > $scope.maxPrice) {
            bravetime.info("您输入的价格有误，请重新输入");
            return false;
        }
        $(document.body).removeClass("filtering");
        var type = $.makeArray($(".category_btn_list").find(".category_btn.selected")).map(function (x) {
            return $(x).attr("data-for-id")
        }).join(",");
        data.type = type;
        data.min = $scope.minPrice || null;
        data.max = $scope.maxPrice || null;
        change();
    };

    $scope.resetValue = function () {
        $scope.minPrice = null;
        $scope.maxPrice = null;
    };

    function change() {
        data = {};
        var type = $.makeArray($(".category_btn_list").find(".category_btn.selected")).map(function (x) {
            return $(x).attr("data-for-id")
        }).join(",");
        data.type = type;
        data.min = $scope.minPrice || null;
        data.max = $scope.maxPrice || null;
        data.sort = $scope.sortType;
        $scope.beforeFirstLoading = true;
        data.q = searchWord;
        data.page = 1;
        $scope.goods = [];
        scrollListener(true);
        $.cookie(cateStaticStr, JSON.stringify(data));
    }

    function init() {
        var str = $.cookie(cateStaticStr);
        var his;
        if (!window.isPrivateMode && window.localStorage) {
            his= JSON.parse(sessionStorage.history);
        }

        if (str && str.length&&his&&(his.length>1&&his[his.length - 2].path == "detail")) {
            var obj = JSON.parse(str);
            $scope.sortType = obj.sort;
            if (obj.type != 0) {
                var flag = false;
                $(".category_btn_list").find(".category_btn").each(function (index, el) {
                    var t = $(el).attr("data-for-id");
                    if (obj.type.split(",").filter(function (x) {
                            return x == t;
                        }).length > 0) {
                        $(el).addClass("selected");
                        flag = true;
                    }
                });
                if(flag){
                    $(".all_category").removeClass("selected");
                }
            }
            $scope.minPrice = obj.min;
            $scope.maxPrice = obj.max;
            data = obj;
            scrollListener(true);
        }else{
            $.removeCookie(cateStaticStr);
            scrollListener(true);

        }
    }

    function scrollListener(flag) {


        if (flag) {
            getGoodsData(data, function (data) {
                var searchWord = window.keywords||"";


                $scope.goods = data;
                $scope.has_more = data.length > 9;
                $scope.refer = 'search';
                $scope.k = searchWord;
                $scope.$apply();
            });
        } else {
            var offset = angular.element(".good_list_2_row").height();
            var offsetTop = window.scrollY + window.innerHeight;
            if (offset - offsetTop < 800) {
                getGoodsData(data, function (data) {
                    $scope.has_more = data.length > 9;
                    $scope.refer = 'search';
                    $scope.k = decodeURIComponent(decodeURIComponent(searchWord));
                    $scope.goods = ($scope.goods || []).concat(data);
                    $scope.$apply();
                });
            }
        }
    }

    function getGoodsData(data, callback) {
        if (ajaxing) {
            ajaxing = false;
            data._t = Date.now();
            $.ajax({
                url: window.searchUrl,
                data: data,
                dataType: "json",
                success: function (result) {
                    if (result["code"]) {
                        bravetime.info(result.msg);
                        ajaxing = true;
                    } else {
                        callback(result.data);
                        data.page++;
                        ajaxing = true;
                    }
                },
                error: function () {
                    bravetime.info("获取数据失败,请刷新");
                    ajaxing = true;
                }
            });
        }

    }

}]);
app.directive('goods2row', function ($window, $sce) {
    // var url = $sce.trustAsResourceUrl(window.baseFeUrl + "/module/goods2row.html");
    return {
        restrict: "EA",
        replace: true,
        scope: false,
        template:'<div class=\"good_list_2_row\"><div ng-if=\"beforeFirstLoading\" class=\"logo_container\"><div class=\"logo_left\"></div><div class=\"logo_right\"></div></div><a ng-if=\"goods.length\" href=\"/{{item.goods_id}}.html?_refer={{refer||\'index\'}}&_refer_val={{k}}\" ng-click=\"goodsClick()\" class=\"good_item\" ng-repeat=\"(key,item) in goods\" data-dav-tj=\"{{tj_page}}|hot_good|hot_good_{{item.goods_id}}|1|hot_good@{{tj_page}}\" data-url=\"/{{item.goods_id}}.html?_refer={{refer||\'index\'}}&_refer_val={{k}}\"><div class=\"good_img_container\"><img ng-src=\"{{item.goods_img}}\" style=\"display:inline\"><div ng-if=\"!item.sale_status==\'\'|| !item.sale_status==\'undefined\'\" class=\"good_list_sell_out\"><span ng-if=\"item.sale_status==\'soldout\'\">售罄</span> <span ng-if=\"item.sale_status==\'offline\'\">未上架</span></div><div class=\"pic_info\" ng-if=\"item.pic_info\">{{item.pic_info}}</div></div><div class=\"good_con\"><div class=\"good_title\">{{item.goods_name}}</div><div class=\"fz_12\"><span class=\"dav-color-price\">¥{{item.shop_price}}</span> <span ng-if=\"item.goods_label&&item.goods_label!=\'\'\" class=\"lable\">{{item.goods_label}}</span></div></div></a><div style=\"clear:both\"></div><div ng-if=\"goods&&!has_more\" class=\"no_more\">没有更多商品了</div><div ng-if=\"has_more\" class=\"no_more\">商品加载中 <img src=\"//pic.davdian.com/free/loading_03252.svg\"></div></div>',
        link: function (scope, element) {

        }
    }
});