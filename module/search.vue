<template>
    <div class="search_top clearfix">
        <a class="left_icon_container">
            <span class="home_arrow"></span>
        </a>
        <form type="search" action="" class="ng-pristine ng-valid">
            <div class="search_con search_button april_border hairlines ">
                <div class="border_inner"></div>
                <div class="search_input_con">
                    <span class="search_icon"></span>
                    <input type="search" name="q" placeholder="请输入商品名称" class="search_input" autocomplete="off">
                </div>
            </div>
            <a class="search_btn" data-dav-tj="">取消</a>
        </form>
    </div>
    <div class="search_like hide">
        <ul class="like_list">
            <li v-for  = "item in list">
                <a href="/goods_search.html?q={{item}}" v-if='!c_bind'>{{item}}</a>
                <a href="/goods_search.html?q={{item}}&c_bind={{c_bind}}" v-if='c_bind'>{{item}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        data:function(){
            return {
                searchInput: $(".search_input"),
                likeContainer: $(".search_like"),
                allButton: $(".all_category"),
                goodsList: $(".good_list_2_row"),
                searchResultPage:$(".search_result_page").length,
                goodsList:$(".good_list_2_row"),
                filterContainer:$(".filter_container"),
                list:[],
                dvd_index_search:$.cookie("dvd_index_search"),
                cateStaticStr:'dvd_search_category',
                c_bind:null
            }
        },
        ready:function () {
            var scope = this;
            setTimeout(function(){
                scope.searchLike();
                scope.onfocus();
                scope.onblur();
            },0);
            if (window.Units.getQuery('c_bind')){
                scope.c_bind = window.Units.getQuery('c_bind')
            }
            // 看看cookie里面有没有搜索记录
            var dvd_index_search = $.cookie("dvd_index_search");
            var searchResultPage = $(".search_result_page").length;
            if (dvd_index_search && dvd_index_search.length) {
                scope.list = dvd_index_search.split(",");
            }

            $("form").submit(function (e) {
                e.preventDefault()
                var v = $.trim($(this).find("input").val());
                if (v == "") {
                    bravetime.info("请输入搜索内容");
                    return false;
                }
                scope.addWord2List(v);
                scope.clearCategory();
                var str = location.href.split('?')[0] + '?q=' + $(".search_input").val()
                if (window.Units.getQuery('c_bind')){
                    str = location.href.split('?')[0] + '?q=' + encodeURIComponent($(".search_input").val()) + '&c_bind=' + encodeURIComponent(window.Units.getQuery('c_bind'))
                }
                console.log(str)
                window.location = str
            });

            setTimeout(function(){
                var body = $('body');
                if (searchResultPage) {
                    // 获取搜索词,异步获取数据
                    var searchWord = location.search.slice(1).split("&").filter(function (x) {
                        return x.indexOf("q=") > -1
                    })[0].split("=")[1];
                    if(scope.c_bind){
                         searchWord = searchWord.replace(/_/g,"%");
                    }
                    //返回键
                    var backButton = $(".left_icon_container");

                    backButton.click(function () {
                        if (body.hasClass("filtering")) {
                            body.removeClass("filtering");
                        } else {
                            history.back();
                        }
                    });
                    $(".search_input").val(decodeURIComponent(decodeURIComponent(searchWord)));
                    scope.addWord2List(decodeURIComponent(decodeURIComponent(searchWord)));
                } else {
                    scope.clearCategory();// 清除cookie中的'dvd_search_category'
                    if (scope.list.length) {
                        $(".history_list").empty();
                        for (var i = 0; i < scope.list.length; i++) {
                            $(".history_list").prepend($("<li><a href='/goods_search.html?q=" + scope.list[i] + "'>" + scope.list[i] + "</a></li>"))
                        }
                    } else {
                        $(".search_history").remove();
                    }

                    $(".delete_history_btn").on("click", function () {
                        $(".search_history").remove();
                        $.cookie("dvd_index_search", "");
                    });

                }
            },0)


        },
        methods:{
            // 输入时候向后台查询
            searchLike:function() {
                var scope = this;
                $(".search_input").on("input", function () {
                    var text = $.trim($(".search_input").val());
                    if (text == "") {
                        $(".search_like").addClass("hide");
                        $(".good_list_2_row").removeClass("hide");
                        return false;
                    }
                    var data = {q: text}
                    if (window.Units.getQuery('c_bind')){
                        data.c_bind = window.Units.getQuery('c_bind')
                    }
                    $.ajax({
                        url: window.likeUrl,
                        data: data,
                        dataType: "json",
                        success: function (result) {if (!result.code) {
                            if (result.data.length) {
                                scope.list = result.data;
                                $(".search_like").removeClass("hide");
                                $(".good_list_2_row").addClass("hide");
                            } else {
                                $(".search_like").addClass("hide");
                                $(".good_list_2_row").removeClass("hide");
                            }
                        }
                        }
                    })
                });
            },
            onfocus:function () {
                var body = $("body");
                $(".search_input").focus(function () {
                    body.addClass("searching");
                    body.removeClass("filtering");
                });
            },
            onblur:function(){
                var scope = this;
                var body = $("body");
                $(".search_input").blur(function () {
                    body.removeClass("searching")
                });
            },
            addWord2List:function(v){
                var index = -1;
                var scope = this;
                for (var i = 0; i < scope.list.length; i++) {
                    if (scope.list[i] == v) {
                        index = i;
                    }
                }
                if (index > -1) {
                    scope.list.splice(index, 1);
                }
                if (scope.list.length > 6) {
                    scope.list.splice(0, scope.list.length - 6);
                }
                scope.list.push(v);
                $.cookie("dvd_index_search", scope.list.join(","))
            },
            clearCategory:function () {
                var scope = this;
                $.removeCookie(scope.cateStaticStr);
            },
        }
    }
</script>