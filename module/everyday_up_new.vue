<style>
    body{
        padding-top: 0px;
    }
    .top0{
        position: relative!important;
        font-size: 14px;
    }
    .top0.top_show {
        animation: top_show_animation 0s forwards;
        -webkit-animation: top_show_animation 0s forwards;
    }
    .index_links .link_item {
        float: left;
        width: 33.33333%;
        text-align: center;
        padding: 12px 0px;
        position: relative;
        background-color: #F7F7F7;
    }
    .link_bottom{
        width: 100%;
        height: 2px;
        background-color: #FF4A7D;
        position: absolute;
        bottom: -1px;
    }
    .index_links .active {
        background-color: #ffffff;
    }
    .index_links .link_img {
        width: 46px;
        height: 46px;
        display: inline-block;
        border-radius: 50%;
        border: solid 1px #f8cfcf;
    }
    .index_links .link_text{
        padding-top: 8px;
        font-size: 12px;
        color: #333333;
        font-weight: 400;
    }
    .order_good_name {
        font-size: 14px;
        height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        line-height: 20px;
    }
    .sale{
        font-size: 14px;
        float: right;
        height: 30px;
        color: #ff4a7d;
        margin-top: -3px;
        line-height: 30px;
        padding: 0 10px;
        position: relative;
        border-radius: 2px;
    }
    .thin_line{
        position: absolute;
        bottom: 0px;
        content: "";
        display: block;
        position: absolute;
        left: -50%;
        width: 200%;
        height: 1px;
        background: #e1e1e1;
        -webkit-transform:scale(0.5);
    }
    .yapiskan{
        top:-60px;
        max-width: 640px;
        margin: 0;
        padding: 0;
        position: fixed;
        width:100%;
        z-index:99;
    }
    .up {
        top: 0px;
    }
    .down {
        top:-60px;
        z-index: 9999;
    }
    .list_top{
        margin-top: 98px;
    }
    .number_text{
        position: absolute;
        padding: 55.4px 17.3px;
        color: #ffffff;
        font-size: 10px;
    }
    .number_text_2{
        position: absolute;
        padding: 55.4px 14px;
        color: #ffffff;
        font-size: 10px;
    }
    .dvd_text{
        color: #ff4a7d;
    }
    .no_more {
        text-align: center;
        margin: 10px;
        color: #666666;
        font-size: 12px;
    }

    .sale:before {
        width: 200%;
        height: 200%;
        transform: scale(.5);
        transform-origin: left top;
        -ms-transform: scale(.5);
        -ms-transform-origin: left top;
        -webkit-transform: scale(.5);
        -webkit-transform-origin: left top;
        -moz-transform: scale(.5);
        -moz-transform-origin: left top;
        -o-transform: scale(.5);
        -o-transform-origin: left top;
    }
    .sale:before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #ff4a7d;
        border-radius: 2px;
        width: 200%;
        height: 200%;
        box-sizing: border-box;
    }
    .in_app .top0{
        display: none;
    }
    .active .link_img{
        width: 46px;
        height: 46px;
        display: inline-block;
        border-radius: 50%;
        background: #fef5f5;
        border: none;
    }
</style>
<template>
    <div>
        <!--头部，在app中不显示-->
        <div class="top0">
            <div class="top_container">
                <div class="top_left">
                    <a class="top_back" href="javascript:history.back();">
                        <span class="home_arrow"></span>
                    </a>
                </div>

                <div class="title_container" style="font-weight: normal">大V店每日上新</div>
                <div class="top_right">
                    <a href="/" class="top_home" data-dav-tj="detail|home|home|1|home@detail">
                        <span class="home_icon"></span>
                    </a>
                </div>
            </div>
        </div>
        <!--banner图片-->
        <img ref="biubiu" id="bannerImg" src="//pic.davdian.com/free/2017/01/17/750_280_ab2fd27ce62cdeb06cd2da04487bba41.png" alt="">
        <!--三个icon-->
        <div class="hot_activity_cotnainer index_model">
            <div class="df_new_model_con">
                <div class="index_links">
                    <a v-for="(item,index) in type_list" class="link_item" @click="click(index)" :style="styleObject" :class="{active:selected == index}">
                        <img class="link_img" :src="item.cat_img">
                        <div class="link_text">{{item.cat_name}}</div>
                        <div v-if="selected == index" class="link_bottom"></div>
                    </a>
                </div>
            </div>
            <div style="clear: both;"></div>
        </div>
        <!--商品列表-->
        <div id="list">
            <a v-for="(item,index) in list" :href="a_href(item.goods_id)">
                <div style="position: relative;background-color: #FFFFFF;height: 140px;">
                    <div style="position: absolute;max-width: 120px;top: 10px;padding-left: 10px;">
                        <img style="" v-lazy="imgObject(item.goods_img)" alt="">
                    </div>
                    <div style="position: absolute;padding-left: 140px;top: 10px;padding-right: 10px;left: 0px;right:0px;">
                        <div class="order_good_name">{{ item.goods_name }}</div>
                        <div class="qqpp" style="padding-top: 10px;height: 26px;">
                            <div style="font-size: 22px;color: #FF4A7D;float: left;line-height: 26px;">
                                ￥{{ item.shop_price }}
                            </div>
                            <div class="sale">
                                <span>立即购买</span>
                            </div>
                        </div>
                    </div>
                    <div class="thin_line"></div>
                </div>
            </a>
        </div>
        <div v-if="loading" class="no_more"> 加载中 <img src="//pic.davdian.com/free/loading_03252.svg"></div>
        <to_shop v-if="more"></to_shop>
    </div>
</template>

<script>
    var to_shop = require("./to_shop.vue");
    var cache_info = require("./cache_info.vue");
    import common from "./common/common.es6";
    export default{
        data:function () {
            return{
                type_list:[],
                all_list:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
                list:[],
                all_top:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                top:null,
                all_more:[false,false,false,false,false,false,false,false,false,false],
                more:false,
                all_page:[1,1,1,1,1,1,1,1,1,1],
                page:1,
                ajaxing:true,
                selected:0,
                dataUrl:window.booksUrl,
                scrollTop:null,
                topicMenu:null,
                bannerHeight:null,
                isFirefox:false,
                loading:false,
            }
        },
        components:{
            to_shop:to_shop,
            cache_info:cache_info,
        },
        mounted:function() {
//            this.bannerHeight = (document.body.offsetWidth / 375 * 140) + 40 + 60;
//            if($('body').hasClass('in_app')){
//                this.bannerHeight = (document.body.offsetWidth / 375 * 140) + 60;
//            }
//            console.log(this.bannerHeight);
//            var scope = this;
//            this.scroll();
//            if(scope.isFirefox){
//                document.documentElement.scrollTop = scope.top;
//            }else {
//                document.body.scrollTop = scope.top;
//            }
        },
        created:function () {
            let scope = this;
            //判断是否是火狐浏览器，来选择滚动条滚动的方式
            scope.isFirefox=navigator.userAgent.toUpperCase().indexOf("FIREFOX")>0?true:false;
            //判断是否是由上一个页面返回时返回读取缓存的数据 有缓存数据时获取到需要填充的高度 否则为0
            this.init();
            //存入初始化的数据（不需要包含getData获取到的数据）
            if(!isPrivateMode){
                sessionStorage.setItem('everyday_up_new_selected',this.selected);
                sessionStorage.setItem('everyday_up_new_all_top',JSON.stringify(scope.all_top));
                sessionStorage.setItem('everyday_up_new_all_more',JSON.stringify(scope.all_more));
            }
            this.bannerHeight = (document.body.offsetWidth / 375 * 140) + 40 + 60;
            if($('body').hasClass('in_app')){
                this.bannerHeight = (document.body.offsetWidth / 375 * 140) + 60;
            }
            console.log(this.bannerHeight);
            this.scroll();
            if(scope.isFirefox){
                document.documentElement.scrollTop = scope.top;
            }else {
                document.body.scrollTop = scope.top;
            }
        },
        methods:{
            init:function () {
                var getIt = true;
                var scope = this;
                if(!isPrivateMode){//浏览器中能存储session storage
                    var patharr = JSON.parse(sessionStorage.history);//获取路径path
                    if(patharr.length > 2){//从标签页直接进入也会发出请求
                        var lastPath = patharr[patharr.length-2].path;
                        if(lastPath == 'detail') {//判断是否是浏览器上的返回键回到这个页面
                            //取本地的数据
                            scope.referer = JSON.parse(sessionStorage.getItem("everyday_up_new_referer"));
                            scope.type_list = JSON.parse(sessionStorage.getItem('everyday_up_new_type_list'));
                            scope.all_list = JSON.parse(sessionStorage.getItem('everyday_up_new_all_data'));
                            scope.all_top = JSON.parse(sessionStorage.getItem('everyday_up_new_all_top'));
                            scope.all_page = JSON.parse(sessionStorage.getItem('everyday_up_new_all_page'));
                            scope.all_more = JSON.parse(sessionStorage.getItem('everyday_up_new_all_more'));
                            scope.selected = eval(sessionStorage.getItem('everyday_up_new_selected'));


                            var sort = scope.selected;
                            //植入值
                            scope.list = this.all_list[sort];
                            scope.page = this.all_page[sort];
                            scope.more = this.all_more[sort];
                            scope.top = this.all_top[sort];

                            getIt = false;
                        }else{
                            // 清空数据
                            sessionStorage.removeItem("everyday_up_new_type_list");
                            sessionStorage.removeItem("everyday_up_new_all_data");
                            sessionStorage.removeItem("everyday_up_new_all_top");
                            sessionStorage.removeItem("everyday_up_new_all_page");
                            sessionStorage.removeItem("everyday_up_new_all_more");
                            sessionStorage.removeItem("everyday_up_new_selected");
                            sessionStorage.removeItem("everyday_up_new_referer");
                        }
                    }
                };
                if(getIt){
                    this.getData(true);
                }
            },
            getData:function(flags){
                var scope = this;
                var currentType = scope.selected;
                if(scope.ajaxing){
                    if(!scope.more){
                        scope.loading = true;
                        scope.ajaxing = false;
                        var dates={};

                        if(scope.type_list.length == 0){
                            dates = {
                                pageIndex: scope.all_page[currentType],
                                pageSize:10,
                            }
                        }else{
                            dates = {
                                type:scope.type_list[scope.selected].id,
                                pageIndex: scope.all_page[currentType],
                                pageSize:10,
                            }
                        }

                        common.getDataWithSign({
                            updata:dates,
                            flag:flags,
                            url:scope.dataUrl,
                            success:function (result) {
                                scope.loading = false;
                                if(result.code==0){
                                    if (result["data"].dataList.length) {//返回函数中有数据

                                        if(result.data.type.length != 0){
                                            scope.type_list = result.data.type;
                                        }

                                        scope.referer = result.data.referer||{};
                                        scope.all_list[currentType] = scope.all_list[currentType].concat(result.data.dataList);
                                        scope.list = scope.all_list[currentType];
                                        scope.all_page[currentType] = scope.all_page[currentType] + 1;//ajax中的参数中页数加1
                                        if(!isPrivateMode){
                                            sessionStorage.setItem('everyday_up_new_all_data',JSON.stringify(scope.all_list));
                                            sessionStorage.setItem('everyday_up_new_all_page',JSON.stringify(scope.all_page));
                                            sessionStorage.setItem('everyday_up_new_type_list',JSON.stringify(scope.type_list));
                                            sessionStorage.setItem('everyday_up_new_referer',JSON.stringify(scope.referer));
                                        }
//                                        scope.more = true;
//                                        scope.all_more[currentType] = true;
                                    }else{
                                        scope.more = true;//显示 没有更多商品了
                                        scope.all_more[currentType] = true;
                                        if(!isPrivateMode){
                                            sessionStorage.setItem('everyday_up_new_no_more',JSON.stringify(scope.all_more));
                                        }
                                    }
                                }else{
                                    bravetime.info(result.code);
                                };
                                scope.ajaxing = true;
                            },error:function () {
                                bravetime.info("加载失败了");
                                scope.loading = false;
                                setTimeout(function () {
                                    scope.ajaxing = true;
                                },100)
                            }
                        })
                    }
                }
            },
            scroll:function () {
                var scope = this;

                this.scrollTop = $(document).scrollTop();
                this.topicMenu = $('.yapiskan').outerHeight();

                $(window).scroll(function(){//滚动条滚动事件
                    var top = document.body.scrollTop;
                    var currentType = scope.selected;

                    if(scope.isFirefox){
                        top = document.documentElement.scrollTop;
                    }else {
                        top = document.body.scrollTop;
                    }

                    scope.all_top[currentType] = top;

                    if(!isPrivateMode){
                        sessionStorage.setItem('everyday_up_new_all_top',JSON.stringify(scope.all_top));
                    }
                    scope.top = $(document).scrollTop();
                    if(scope.top > scope.scrollTop){//往下滚

                        if(scope.top >=  (scope.bannerHeight)){
                            $(".index_model").removeClass("up");
                            $("#list").addClass("list_top");
                            $(".index_model").addClass("yapiskan");
                        }
                        if(scope.top >  (scope.bannerHeight + 20)){
                            $(".index_model").css("-webkit-transition","top 0.2s");
                            $(".index_model").css("transition","top 0.2s");
                        }
                    }else{//往上滚
                        if(scope.top <= (scope.bannerHeight - 60)){
                            $(".index_model").css("-webkit-transition","top 0s");
                            $(".index_model").css("transition","top 0s");
                            $(".index_model").removeClass("yapiskan");
                            $("#list").removeClass("list_top");
                        }else{
                            $(".index_model").addClass("up");
                        }
                    }
                    if(window.disabledGoodsLoading){
                        return false;
                    }

                    /**
                     * 滚动处理数据
                     */

                    var offset = window.pageYOffset;//文档现在的位置加上窗口的高度
                    var offsetTop = document.body.scrollHeight;//整个页面的高度
                    if(offsetTop-offset-window.screen.availHeight<100){//如果滚动条到一定位置
                        scope.getData(false);
                    }

                    scope.scrollTop = $(document).scrollTop();

                });

            },
            click:function (index) {
                var scope = this;
                this.selected = index;
                this.more = this.all_more[index];
                this.list = [];
                if(!isPrivateMode){
                    sessionStorage.setItem('everyday_up_new_selected',this.selected);
                };
                this.all_top[index] = 0;
                this.top = 0;
                if(this.all_list[index].length == 0){
                    this.dataUrl = window.booksUrl;
                    this.getData(true);
                }else{
                    this.list = this.all_list[index]
                }
                if(this.isFirefox){
                    document.documentElement.scrollTop = this.top;
                }else {
                    document.body.scrollTop = this.top;
                }
                setTimeout(function () {
                    if(scope.isFirefox){
                        document.documentElement.scrollTop = scope.top;
                    }else {
                        document.body.scrollTop = scope.top;
                    }
                },0)
            },
            imgObject:function (imgSrc) {
                return{
                    src: imgSrc || '//pic.davdian.com/free/2017/01/09/92_92_d44e21cb668d116859b8916ce041e5bf.png',
                    error: '//pic.davdian.com/free/2017/01/09/92_92_d44e21cb668d116859b8916ce041e5bf.png',
                    loading: '//pic.davdian.com/free/2017/01/09/92_92_d44e21cb668d116859b8916ce041e5bf.png'
                }
            },
            a_href:function (goods_id) {
                var list = [],str="";
                if(this.referer){
                    for(var i in this.referer){
                        list.push(i+"="+this.referer[i]);
                    }
                }
                if(list.length){
                    str = "?"+list.join("&");
                }
                return "/" + goods_id + ".html"+str;
            },


        },
        computed:{
            styleObject:function () {
                var scope = this;
                return {
                    width: (100 / scope.type_list.length ) + "%"
                }
            }
        }
    }
</script>
