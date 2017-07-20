<template>
    <div class="kind_sort">
        <a class="default_sort" :class = "{selected:selected == 0}" @click="sort(0)"><span>综合</span></a>
        <a class="sales_sort" :class = "{selected:selected == 2 || selected == 3}" @click="sort(selected==2?3:2)"><span>销量</span>
            <span class="two_arrow" :class = "{up:selected == 3,down:selected == 2}">
            <span class="arrow-up"></span>
            <span class="arrow-up arrow-down"></span>
        </span>
        </a>
        <a class="price_sort" :class = "{selected:selected == 4 || selected == 5}" @click="sort(selected==4?5:4)"><span>价格</span>
            <span class="two_arrow" :class = "{up:selected == 4,down:selected == 5}">
            <span class="arrow-up"></span>
            <span class="arrow-up arrow-down"></span>
        </span>
        </a>
        <a class="filter_toggle_btn">
            <span>筛选</span>
            <span class="dav_icon_arrow"></span>
        </a>
    </div>
    <div class="filter_container">
        <div class="price_filter_container">
            <div class="price_filter_text">价格区间 (元) </div>
            <input type="number" id = "minPrice" v-model.number  = "minPrice" placeholder="最低价"><span class="to"></span><input id = "maxPrice" v-model.number="maxPrice" type="number" placeholder="最高价">
        </div>
        <div class="category_container">
            <div class="category_item">
                <label>选择分类</label>
                <div class="category_btn_list">
                    <a class="category_btn all_category selected" data-for-id="0">全部</a>
                </div>
            </div>
            <div class="category_item" v-for = "item in catIds">
                <label>{{item.label}}</label>
                <div class="category_btn_list">
                    <a v-for = "kind_item in item.info" class="category_btn" data-for-id={{kind_item.catId}}>{{kind_item.name}}</a>
                </div>
            </div>
        </div>
        <div class="filter_bottom_container">
            <div class="filter_reset_btn" ng-click="resetValue()">重置</div>
            <div class="filter_finish_btn" @click="filter()">完成</div>
        </div>
    </div>
    <div class = "bg">
        <category refer="search" :referer="referer"></category>
    </div>
</template>
<script>
    var category = require("../module/category.vue");
    export default{
        data:function(){
            return{
                data:{},
                minPrice:null,
                maxPrice:null,
                ajaxing:true,
                searchWord:window.keywords||"",
                selected:0,
                sortType:0,
                cateStaticStr:'dvd_search_category',
                goods:[],
                has_more:false,
                no_more:false,
                loading:false,
                catIds:[1,2,3],
                catId:[],
                allData:[[],[],[],[],[]],
                anymore:[{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
                typePage:[1,1,1,1,1],
                flag:true,//筛选信息加载标示
                current:true,
                type:[],
                referer:{}
            }
        },
        components:{
            category:category,
        },
        ready:function(){
            var scope = this;
            var body = $("body");

            var c_bind_str = window.Units.getQuery('c_bind');

            // 增加特殊处里逻辑
            if(c_bind_str){
                scope.searchWord = scope.searchWord.replace(/_/g,"%");
            }
            /**
             *
             *  @读取缓存判断及读取缓存
             */
            if (window.Units.getQuery('c_bind')){
                scope.data.c_bind = window.Units.getQuery('c_bind')
            }
            var ua = navigator.userAgent.toLowerCase();
            if(!isPrivateMode){
                var patharr = JSON.parse(sessionStorage.history);
                if(patharr.length > 2){
                    var lastPath = patharr[patharr.length-2].path;
                    if(lastPath == "detail") {

                        //获取了缓存的数据

                        scope.current = false;

                        scope.selected = JSON.parse(sessionStorage.getItem('sort'));
                        scope.selected = scope.selected - 0;
                        this.allData = eval(sessionStorage.getItem('sort_data'));//获取session的数据
                        this.typePage = eval(sessionStorage.getItem('sortTypePage'));
                        this.catIds = eval(sessionStorage.getItem('catIds'));
                        this.flag = false;


                        if (eval(sessionStorage.getItem('type')) != undefined) {
                            this.type = eval(sessionStorage.getItem('type'));
                            this.type = this.type.split(",");
                        }

                        if (eval(sessionStorage.getItem('sort_no_more')) != undefined) {
                            this.anymore = eval(sessionStorage.getItem('sort_no_more'));
                        };
                        if(eval(sessionStorage.getItem('sort_min')) != undefined) {
                            this.minPrice = eval(sessionStorage.getItem('sort_min'));
                        };
                        if(eval(sessionStorage.getItem('sort_max')) != undefined) {
                            this.maxPrice = eval(sessionStorage.getItem('sort_max'));
                        };
                        if(sessionStorage.getItem("category_page")){
                            this.data.page = +sessionStorage.getItem("category_page")+1;
                        }else{
                            this.data.page = 1;
                        }

                        if (this.selected != 0) {
                            this.selected = this.selected + 1;
                            this.goods = this.allData[this.selected - 1];
                            this.no_more = this.anymore[this.selected - 1].flag;
                        } else {
                            this.goods = this.allData[this.selected];
                            this.no_more = this.anymore[this.selected].flag;
                        };

                        var type = $.makeArray($(".category_btn_list").find(".category_btn.selected")).map(function (x) {
                            return $(x).attr("data-for-id")
                        }).join(",");
                        scope.data.type = type;
                        scope.data.min = scope.minPrice || null;
                        scope.data.max = scope.maxPrice || null;
                        scope.data.sort = scope.selected;
                        scope.data.q = scope.searchWord;
                        if (window.Units.getQuery('c_bind')){
                            scope.data.c_bind = window.Units.getQuery('c_bind')
                        }

                        setTimeout(function(){
                            var btn = $(".category_btn_list").find(".category_btn");
                            for(var i = 0 ;i<scope.type.length; i++){
                                for(var ii = 0;ii<btn.length;ii++){
                                    if(scope.type[i] == btn.eq(ii).attr("data-for-id")){
                                        $(".all_category").removeClass("selected");
                                        btn.eq(ii).addClass("selected");
                                    }
                                }
                            }
                        },50);
                        if (/iphone|ipad|ipod/.test(ua)) {
                            setTimeout(function(){
                                document.body.scrollTop = eval(sessionStorage.getItem('sortTop'));
                            },0);
                        }
                        this.referer = JSON.parse(sessionStorage.getItem("categorySortReferer"));
                    }
                    else {
                        sessionStorage.removeItem("sort_data");
                        sessionStorage.removeItem("sortTypePage");
                        sessionStorage.removeItem("sort_no_more");
                        sessionStorage.removeItem("sort");
                        sessionStorage.removeItem("type");
                        sessionStorage.removeItem("sort_min");
                        sessionStorage.removeItem("sort_max");
                        sessionStorage.removeItem("categorySortReferer");
                    }
                }
            };

            if(scope.current){
                this.sort(0);
            }
            this.scrollListener();
        },
        methods:{
            /**
             *
             * @切换状态（综合 销量 价格）
             */
            sort:function (type) {
                var scope = this;
                scope.sortType = type;
                if(type == 2){
                    scope.selected = 2;
                    var number = scope.selected - 1;
                    sessionStorage.setItem('sort',number);
                    scope.no_more = scope.anymore[number].flag;
                    scope.ajaxing = true;
                    if(scope.allData[number].length == 0){
                        scope.change();
                    }else{
                        scope.goods = scope.allData[number];
                        scope.data.sort = scope.selected;
                        scope.data.page = scope.typePage[number];
                    }
                }else if(type == 3){
                    scope.selected = 3;
                    var number = scope.selected - 1;
                    sessionStorage.setItem('sort',number);
                    scope.no_more = scope.anymore[number].flag;
                    scope.ajaxing = true;
                    if(scope.allData[number].length == 0){
                        scope.change();
                    }else{
                        scope.goods = scope.allData[number];
                        scope.data.sort = scope.selected;
                        scope.data.page = scope.typePage[number];
                    }
                }else if(type == 4){
                    scope.selected = 4;
                    var number = scope.selected - 1;
                    sessionStorage.setItem('sort',number);
                    scope.no_more = scope.anymore[number].flag;
                    scope.ajaxing = true;
                    if(scope.allData[number].length == 0){
                        scope.change();
                    }else{
                        scope.goods = scope.allData[number];
                        scope.data.sort = scope.selected;
                        scope.data.page = scope.typePage[number];
                    }
                }else if(type == 5){
                    scope.selected = 5;
                    var number = scope.selected - 1;
                    sessionStorage.setItem('sort',number);
                    scope.no_more = scope.anymore[number].flag;
                    scope.ajaxing = true;
                    if(scope.allData[number].length == 0){
                        scope.change();
                    }else{
                        scope.goods = scope.allData[number];
                        scope.data.sort = scope.selected;
                        scope.data.page = scope.typePage[number];
                    }
                }else if(type == 0){
                    scope.selected = 0;
                    var number = scope.selected;
                    sessionStorage.setItem('sort',scope.selected);
                    scope.no_more = scope.anymore[number].flag;
                    scope.ajaxing = true;
                    if(scope.allData[number].length == 0){
                        scope.change();
                    }else{
                        scope.goods = scope.allData[number];
                        scope.data.sort = scope.selected;
                        scope.data.page = scope.typePage[number];
                    }
                }
            },
            /**
             *
             * @筛选框提交判断
             */
            filter:function () {
                var scope = this;
                if (parseInt(scope.minPrice) > parseInt(scope.maxPrice)) {
                    bravetime.info("您输入的价格有误，请重新输入");
                    return false;
                }
                $(document.body).removeClass("filtering");
                var type = $.makeArray($(".category_btn_list").find(".category_btn.selected")).map(function (x) {
                    return $(x).attr("data-for-id")
                }).join(",");
                sessionStorage.setItem('type',JSON.stringify(type));
                scope.typePage = [1,1,1,1,1],
                scope.data.page = 1;
                scope.data.type = type;
                scope.data.min = scope.minPrice || null;
                sessionStorage.setItem('sort_min',JSON.stringify(scope.minPrice));
                scope.data.max = scope.maxPrice || null;
                sessionStorage.setItem('sort_max',JSON.stringify(scope.maxPrice));
                scope.no_more = false;
                scope.anymore = [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}];
                scope.allData = [[],[],[],[],[]];
                scope.change();
            },
            init: function () {
                var cateStaticStr = 'dvd_search_category';
                var str = $.cookie(cateStaticStr);
                var scope = this;
                var his;
                if (!window.isPrivateMode && window.localStorage) {
                    his= JSON.parse(sessionStorage.history);
                }

                if (str && str.length&&his&&(his.length>1&&his[his.length - 2].path == "detail")) {
                    var obj = JSON.parse(str);
                    scope.sortType = obj.sort;
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
                    scope.minPrice = obj.min;
                    scope.maxPrice = obj.max;
                    data = obj;
                    scope.scrollListener(true);
                }else{
                    $.removeCookie(cateStaticStr);
                    scope.scrollListener(true);
                }
            },
            //滚动事件
            scrollListener:function (flag) {
                var scope = this;
                if (flag) {
                    scope.getGoodsData(scope.data, function (data) {
                        var searchWord = window.keywords||"";
                        scope.goods = data;
                        scope.has_more = data.length > 9;
                        scope.no_more = data.length <= 9;
                        scope.refer = 'search';
                        scope.k = searchWord;

                        // 增加分类搜索
                        var c_bind_str = window.Units.getQuery('c_bind');
                        scope.data.c_bind = c_bind_str;

                        // 增加特殊处里逻辑
                        if(c_bind_str){
                            scope.k = searchWord.replace(/_/g,"%");
                        }

                        if(scope.selected != 0 ){
                            var number = scope.selected - 1;
                            scope.allData[number] = scope.allData[number].concat(data);
                            scope.anymore[number].flag = scope.no_more;
                        }else{
                            var number = scope.selected;
                            scope.allData[number] = scope.allData[number].concat(data);
                            scope.anymore[number].flag = scope.no_more;

                        }

                        sessionStorage.setItem('sort_no_more',JSON.stringify(scope.anymore));
                        sessionStorage.setItem('sort_data',JSON.stringify(scope.allData));
                        sessionStorage.setItem("category_page",scope.data.page);


                        //scope.$apply();
                    });
                } else {
                    var scope = this;
                    $(window).scroll(function(){//滚动条滚动事件
                        if(window.disabledGoodsLoading){
                            return false;
                        }
                        var top = document.body.scrollTop;
                        sessionStorage.setItem('sortTop',top);
                        var offset = window.pageYOffset;//文档现在的位置加上窗口的高度
                        var offsetTop = document.body.scrollHeight;//整个页面的高度
                        if(offsetTop-offset-window.screen.availHeight<100){//如果滚动条到一定位置

                            if(!scope.no_more){
                                scope.getGoodsData(scope.data, function (data) {
                                    scope.has_more = data.length > 9;
                                    scope.no_more = data.length <= 9;
                                    scope.refer = 'search';
                                    scope.k = decodeURIComponent(decodeURIComponent(scope.searchWord));
                                    scope.goods = (scope.goods || []).concat(data);
                                    if(scope.selected != 0 ){
                                        var number = scope.selected - 1;
                                        scope.allData[number] = scope.allData[number].concat(data);
                                        scope.anymore[number].flag = scope.no_more;
                                    }else{
                                        var number = scope.selected;
                                        scope.allData[number] = scope.allData[number].concat(data);
                                        scope.anymore[number].flag = scope.no_more;

                                    }

                                    sessionStorage.setItem('sort_no_more',JSON.stringify(scope.anymore));
                                    sessionStorage.setItem('sort_data',JSON.stringify(scope.allData));
                                    sessionStorage.setItem("category_page",scope.data.page);
                                });

                            }
                        }
                    })
//
//
//
//                    var offset = angular.element(".good_list_2_row").height();
//                    var offsetTop = window.scrollY + window.innerHeight;
//                    if (offset - offsetTop < 800) {
//
//                    }
                }
            },
            //获取数据函数
            getGoodsData:function(data, callback) {
                var scope = this;
                scope.loading = true;
                if (scope.ajaxing) {
                    scope.ajaxing = false;
                    data._t = Date.now();
                    $.ajax({

                        url: window.searchUrl,

                        data: data,

                        dataType: "json",

                        success: function (result) {

                            if (result["code"]) {

                                bravetime.info(result.msg);

                                scope.loading = false;

                                scope.ajaxing = true;

                                if(scope.selected != 0 ){
                                    var number = scope.selected - 1;
                                    scope.anymore[number].flag = true;
                                }else{
                                    var number = scope.selected;
                                    scope.anymore[number].flag = true;

                                }

                                scope.no_more = true;

                                sessionStorage.setItem('sort_no_more',JSON.stringify(scope.anymore));
                                sessionStorage.setItem('sort_data',JSON.stringify(scope.allData));



                            } else {

                                scope.loading = false;

                                if(scope.flag){
                                    scope.catIds = result.catIds;
                                    sessionStorage.setItem('catIds',JSON.stringify(scope.catIds));
                                    scope.flag = false;
                                }


                                callback(result.data);


                                scope.referer = result.referer;

                                scope.data.page++;


                                if(scope.selected != 0 ){
                                    var number = scope.selected - 1;
                                    scope.typePage[number] = scope.data.page;
                                }else{
                                    var number = scope.selected;
                                    scope.typePage[number] = scope.data.page;

                                }

                                sessionStorage.setItem('sortTypePage',JSON.stringify(scope.typePage));
                                sessionStorage.setItem('categorySortReferer',JSON.stringify(scope.referer));


                                scope.ajaxing = true;

                            }

                        },

                        error: function () {

//                            bravetime.info("获取数据失败,请刷新");
                            if(scope.flag){
                                scope.catIds = [];
                                sessionStorage.setItem('catIds',JSON.stringify(scope.catIds));
                                scope.flag = false;
                            }

                            scope.no_more = true;

                            scope.ajaxing = true;

                            scope.loading = false;

                            if(scope.selected != 0 ){
                                var number = scope.selected - 1;
                                scope.anymore[number].flag = true;
                            }else{
                                var number = scope.selected;
                                scope.anymore[number].flag = true;

                            }

                            sessionStorage.setItem('sort_no_more',JSON.stringify(scope.anymore));
                            sessionStorage.setItem('sort_data',JSON.stringify(scope.allData));

                        }

                    });
                }

            },
            change:function () {
                var scope = this;
                scope.data = {};
                var type = $.makeArray($(".category_btn_list").find(".category_btn.selected")).map(function (x) {
                    return $(x).attr("data-for-id")
                }).join(",");
                scope.data.type = type;
                scope.data.min = scope.minPrice || null;
                scope.data.max = scope.maxPrice || null;
                scope.data.sort = scope.selected;
                scope.beforeFirstLoading = true;
                scope.data.q = scope.searchWord;
                if (window.Units.getQuery('c_bind')){
                    scope.data.c_bind = window.Units.getQuery('c_bind')
                }
                if(scope.selected != 0 ){
                    var number = scope.selected - 1;
                    scope.data.page = scope.typePage[number];
                }else{
                    var number = scope.selected;
                    scope.data.page = scope.typePage[number];
                }

                scope.goods = [];
                scope.scrollListener(true);
                $.cookie(scope.cateStaticStr, JSON.stringify(scope.data));

            },
            changeData:function(){
                this.$broadcast('changeData',this.goods);
            },
            loadings:function () {
                this.$broadcast('loadings',this.loading);
            },
            no_mores:function () {
                this.$broadcast('no_mores',this.no_more);
            },
            /**
             * 筛选卡片添加
             */
            catid:function(){
                var body = $("body");
                var allButton = $(".all_category");
                var searchResultPage = $(".search_result_page").length;
                if (searchResultPage) {
                    // 切换筛选
                    $(".filter_toggle_btn").click(function () {
                        body.toggleClass("filtering")
                    });


                    // 点重置 清除筛选条件
                    $(".filter_reset_btn").click(function () {
                        categoryBtn.removeClass("selected");
                        allButton.addClass("selected");
                        scope.minPrice = '';
                        scope.maxPrice = '';

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

                    var minprice = $("#minPrice");
                    var maxprice = $("#maxPrice")

                    minprice.on("input", function () {

                        if(minprice.val() < 0){
                            minprice.val(0)
                        }

                    });
                    maxprice.on("input", function () {

                        if(maxprice.val() < 0){
                            maxprice.val(0)
                        }

                    });

                };
            },
        },

        watch:{
            'goods':'changeData',
            'loading':'loadings',
            'no_more':'no_mores',
            'catIds':'catid',
        },

    }
</script>
