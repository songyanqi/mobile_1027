<template>
    <div>
        <div class="search_top clearfix">
            <a class="left_icon_container" href="javascript:history.back();">
                <span class="home_arrow"></span>
            </a>
            <form type="search" action="" class="ng-pristine ng-valid">
                <div class="search_con search_button april_border hairlines ">
                    <div class="border_inner"></div>
                    <div class="search_input_con">
                        <span class="search_icon"></span>
                        <input type="search" v-model="kewwords" name="q" placeholder="请输入课程名称" class="search_input" autocomplete="off">
                    </div>
                </div>
                <a class="search_btn" href="javascript:history.back();">取消</a>
            </form>
        </div>
        <vcategory :list="list" :loading="loading" :no_more="no_more"></vcategory>
        <div v-if="historylist.length && ifshowhistory" class="search_history">
            <h2>历史记录 :</h2>
            <ul class="history_list">
                <li v-for="item in historylist" v-on:click="addList(item)">{{item}}</li>
            </ul>
            <div class="april_border hairlines">
                <span class="border_inner delete_history_btn" v-on:click="clearCategory">删除历史记录</span>
            </div>
        </div>
    </div>
</template>

<script>
    import layout from "./index/layout.es6";
    var vcategory = require("../module/vSchool_search_category.vue");
    export default{
        data: function () {
            return {
                searchInput: $(".search_input"),
                list: [],
                loading: false,
                kewwords:'',
                no_more: false,
                historylist: [],
                vscholl_search_historytData: {},
                c_bind: null,
                dvd_vschool_search: [],
                historyname: 'dvd_vschool_search',
                ifshowhistory: true
            }
        },
        components: {
            vcategory: vcategory
        },
        mounted: function () {
            var scope = this;
            setTimeout(function () {
                scope.onfocus();
                scope.onblur();
            }, 0);
            // 看看cookie里面有没有搜索记录
            var dvd_index_search = $.cookie("dvd_vschool_search");
            if (dvd_index_search && dvd_index_search.length) {
                scope.historylist = dvd_index_search.split(",");
            }
            /*判断是否是从课程详情页返回来的是的话，调用缓存数据*/
            var urlHistoryList = JSON.parse(sessionStorage.getItem("history"));
            if (urlHistoryList.length > 1) {
                var reSeconds = urlHistoryList.length,
                    Hurl = urlHistoryList[reSeconds - 2].path;
                if (Hurl == 'live_review'
                    || Hurl == 'live_trailer'
                    || Hurl == 'live'
                    || Hurl == 'live_review_h5'
                    || Hurl == 'video_live'
                    || Hurl == 'video_playback'
                    || Hurl == 'introduce'
                    || Hurl == 'video_playback_list'
                ) {
                    /*获取缓存数据*/
                    var vscholl_search_historytData = sessionStorage.getItem("vscholl_search_historytData");
                    scope.vscholl_search_historytData = JSON.parse(vscholl_search_historytData);
                    /*渲染列表*/
                    scope.list = scope.vscholl_search_historytData.arry;
                    /*不显示历史记录*/
                    scope.ifshowhistory = false;
                    scope.no_more = scope.vscholl_search_historytData.no_more === 'true';
                    setTimeout(function () {
                        $(window).on("scroll", function () {
                            var page = scope.vscholl_search_historytData.page;
                            if (scope.no_more) {

                            } else {
                                var bodyHeight = $(document.body).height();
                                var scrollTop = $(document).scrollTop();
                                var windowHeight = $(window).height();
                                var bottom = bodyHeight - scrollTop - windowHeight;
                                if (bottom < 100) {
                                    if (scope.loading == false) {
                                        page++;
                                    }
                                    scope.refreshlist(scope.vscholl_search_historytData.keyword, page);
                                }
                            }
                        });
                    }, 500);
                }
            }
            $("form").submit(function (e) {
                /*获取搜索历史记录再搜索append*/
                var dvd_index_search = $.cookie("dvd_vschool_search");
                if (dvd_index_search && dvd_index_search.length) {
                    scope.historylist = dvd_index_search.split(",");
                }
                /*清空缓存*/
                scope.historytData = {};
                /*清空页面数据*/
                scope.list = [];
                /*不显示历史记录*/
                scope.ifshowhistory = false;
                /*关闭没有更多*/
                scope.no_more = false;
                e.preventDefault();
                var v = scope.kewwords;
                if (v == "") {
                    bravetime.info("请输入搜索内容");
                    return false;
                }
                /*存储搜索记录*/
                scope.addWord2List(v);
                /*获取数据*/
                scope.addList(v);
            });
        },
        methods: {
            onfocus: function () {
                var body = $("body");
                $(".search_input").focus(function () {
                    body.addClass("searching");
                    body.removeClass("filtering");
                });
            },
            onblur: function () {
                var body = $("body");
                $(".search_input").blur(function () {
                    setTimeout(function () {
                        body.removeClass("searching")
                    }, 300)
                });
            },
            addWord2List: function (v) {
                var index = -1;
                var scope = this;
                for (var i = 0; i < scope.historylist.length; i++) {
                    if (scope.historylist[i] == v) {
                        index = i;
                    }
                }
                if (index > -1) {
                    scope.historylist.splice(index, 1);
                }
                if (scope.historylist.length > 6) {
                    scope.historylist.splice(6, scope.historylist.length);
                }
                scope.historylist.unshift(v);
                $.cookie("dvd_vschool_search", scope.historylist.join(","))
            },
            clearCategory: function () {
                var scope = this;
                $.removeCookie(scope.historyname);
                scope.historylist = [];
            },
            addList: function (v) {
                var page = 1;
                var scope = this;
                scope.historylist = [];
                scope.refreshlist(v, page);
                $(window).off("scroll");
                setTimeout(function () {
                    $(window).on("scroll", function () {
                        if (scope.no_more) {

                        } else {
                            var bodyHeight = $(document.body).height();
                            var scrollTop = $(document).scrollTop();
                            var windowHeight = $(window).height();
                            var bottom = bodyHeight - scrollTop - windowHeight;
                            if (bottom < 100) {
                                if (scope.loading == false) {
                                    page++;
                                }
                                scope.refreshlist(v, page);
                            }
                        }
                    });
                }, 500);
            },
            refreshlist: function (v, page) {
                var scope = this,
                    data = {};
                data.keywords = v;
                data.page = page;
                data.pageSize = 20;
                if (scope.loading == false) {
                    scope.loading = true;
                    $.ajax({
                        type: 'post',
                        url: window.searchUrl,
                        data: layout.strSign('course_search', data),
                        dataType: "json",
                        success: function (result) {
                            if (result.code == 0) {
                                if (result.data && result.data.dataList.length) {
                                    var arry = scope.list;
                                    for (var i = 0; i < result.data.dataList.length; i++) {
                                        arry.push(result.data.dataList[i])
                                    }
                                    scope.list = arry;
                                    /*total如果大于20就是有下一页*/
                                    if (result.data.total > 20) {
                                        var totalpage = Math.ceil(result.data.total / 20);
                                        if (totalpage == page) {
                                            scope.no_more = true;
                                        }
                                    } else {
                                        scope.no_more = true;
                                    }
                                    scope.loading = false;
                                } else {
                                    scope.loading = false;
                                    scope.no_more = true;
                                }
                            }else{
                                bravetime.info()
                            }
                            /*存储缓存*/
                            var arry_main = {};
                            arry_main.keyword = v;
                            arry_main.no_more = scope.no_more;
                            arry_main.page = +page + 1;
                            arry_main.arry = arry;
                            var vscholl_search_historytData = $.extend(scope.historytData, arry_main);
                            sessionStorage.setItem("vscholl_search_historytData", JSON.stringify(vscholl_search_historytData));
                        },
                        error: function () {
                            scope.loading = false;
                            scope.no_more = false;
                        }
                    })
                }
            }
        }
    }
</script>