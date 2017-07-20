<style>
    .linear{
        width:100%;
        background:-moz-linear-gradient(top,#000000,#fafafa);
        /*background:-webkit-gradient(linear, 0% 100%, 0% 0%,from(#999999), to(#f1f1f1));*/

        text-align: center;
        position: absolute;
        bottom: 0px;
        height:20px;
        font-size: 14px;
        line-height:20px;
        color: #ffffff;

        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0.0)), color-stop(50%, rgba(0, 0, 0, 0.35)), color-stop(100%, rgba(0, 0, 0, 0.7)),color-stop(100%, #FFFFFF));


    }
    .teacher{
        color: #999999;
        margin-top: 5px;
    }
    .good_list_3_row{
        margin-bottom: 0px;
        padding-bottom: 10px;
        background-color: #ffffff;
    }
    .circle{
        background-color: #92FDE0;
        display: inline-block;
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
    .logo{
        position: absolute;
        right: 5px;
        top: 5px;
        width: 0.15rem;
    }
    .teacher .left{
        height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        display: -webkit-box;
        overflow: hidden;
        max-width: 89px;
    }
    .good_list_2_row .good_item .good_title {

        font-size: 12px;
        color: #333;
        text-overflow: ellipsis;
        white-space: pre-line;
        overflow: hidden;
        height: 24px;
        line-height: 12px;
        margin-bottom: 2px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
        padding-top: 6px;
    }
    .newImage {
        object-fit: cover;
        object-position: center;
    }
    .good_title{
        word-break: break-all;
    }
</style>
<template>
    <!--src="http://pic.davdian.com/free/2016/12/22/346_346_95d772212ba7dc702aaeabf7d32138cd.png"-->
    <div class="good_list_con">
        <div class="good_list_2_row" style="background-color: #f1f1f1">

            <div id="#topHeight"></div>

            <a :href="item.command.content" v-for="item in list" class="good_item good_list_3_row" style="padding: 0px 0px 10px 0px;margin:10px 5px 0px 5px;" :style="widthObject">
                <div class="good_img_container" :style="styleObject" style="background-color: #f1f1f1">
                    <img class="newImage" style="display: inline;border: none;" :style="styleObject" v-lazy="imgObject(item.imageUrl)" />
                    <div class="linear" v-if="livetext(item)">
                        <span v-if="livenow(item)" class="circle"></span><span style="font-size: 11px;">{{ livetext(item) }}</span>
                    </div>
                    <div class="logo">
                        <img style="border: none" v-if="item.type == 3" src="//pic.davdian.com/free/2016/12/15/30_30_3620b72f2e7067ba4e38c24f12982518.png" alt="">
                        <img style="border: none" v-if="item.type == 2" src="//pic.davdian.com/free/2016/12/20/30_30_be527f4fa311551091ac4ff336c5e83a.png" alt="">
                    </div>
                </div>
                <div class="good_con" style="box-sizing: border-box;width: 100%;display: block;">
                    <div class="good_title">
                        {{ item.title }}
                    </div>
                    <div class="teacher" style="font-size: 11px;">
                        <span class="left" style="float: left;" :style="spanWidth">{{ item.teacher }}</span>
                        <span style="float:right;">{{ item.pv }}人气</span>
                    </div>
                </div>
            </a>

            <div></div>

            <div style="clear: both"></div>
            <div class="no_more" style="display: none;">
                商品加载中
                <img src="//pic.davdian.com/free/loading_03252.svg" />
            </div>
            <div class="no_more" style="display: none;">
                没有更多商品了
            </div>
        </div>
        <div class="good_list_2_row" ng-model="goods">
            <div style="clear:both"></div>
        </div>
    </div>
</template>

<script>
    export default {
        el:'main',
        props: {
            list:[],
            height: {
                type: Number,
                default: 258
            },
            topHeights:null,
        },
        data() {
            return {
                lastScrollTop: null,
                distance: 44,
                lineTopHeight: 0,
                lineBottomHeight: 0,
                canLoadmore: true,
                previewList: [],
                displayCount: 0,
                styleHeight:192,
                relive:false,
            }
        },
        //数据初始化 dom没有加载之前
        created:function () {
            this.styleHeight = (document.body.offsetWidth - 30)/2;
            this.lineTopHeight = this.topHeights;
            //初始化顶部div的高度和显示的数据
            //this.change();
        },
        //dom加载之后 获取关于节点的数据
        mounted:function () {
            //添加滚动事件监听 重新计算顶部div的高度和显示的数据
            //this.scroll();
        },
//        updated:function () {
//            if( $(".good_list_3_row")[0] != undefined){
//                this.height = $(".good_list_3_row")[0].offsetHeight + 10;
//            }else{
//                this.height = 258;
//            }
//
//        },
        methods:{

            imgObject:function (imgSrc) {
                return{
                    src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                    error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                    loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
                }
            },


            /**
             *
             * 判断是否显示正在直播的圆圈
             */
            livenow:function (item) {
                var timestamp = Date.parse(new Date());

                if(item.startTimestamp*1000 < timestamp && item.endTimestamp == 0){
                    return true;
                }
            },
            /**
             *
             * 判断该显示哪些文案
             */
            livetext:function (item) {
                var startTimestamp = item.startTimestamp*1000;
                var endTimestamp = item.endTimestamp*1000;
                var timestamp = Date.parse(new Date());//当前时间

                var today = Date.parse(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1));//今天晚上23.59.59

                var tomorrow = Date.parse(new Date(new Date(new Date().toLocaleDateString()).getTime()+48*60*60*1000-1));//明天晚上23.59.59

                if(endTimestamp != 0){
                    return false;
                }
                if(startTimestamp < timestamp && endTimestamp == 0){
                    return "正在直播";
                }else if(startTimestamp <= today && startTimestamp > timestamp ){
                    return "今天 " + new Date(parseInt(startTimestamp)).toString().slice(15,24);
                }else if(startTimestamp <=tomorrow && startTimestamp> today){
                    return "明天 " + new Date(parseInt(startTimestamp)).toString().slice(15,24);
                }else if(startTimestamp > tomorrow){
                    var starttime = new Date(parseInt(startTimestamp));
                    return starttime.getUTCFullYear() + "-" + (starttime.getMonth()+1) +"-"+starttime.getDate()+" "+(starttime.getHours()<10?'0':'')+starttime.getHours()+":"+(starttime.getMinutes()<10?'0':'')+starttime.getMinutes()+":"+(starttime.getSeconds()<10?'0':'')+starttime.getSeconds();
                }
//                else{
//                    return new Date(parseInt(item.startTimestamp)).toLocaleString().replace(/:\d{1,2}$/,' ');
//                }


            },
            /**
             *
             * 滚动事件 重新计算顶部div的高度 和显示的数据
             */
//            scroll:function () {
//                var scope = this;
//                $(window).scroll(function () {
//
//                    this._rowsInWindow = Math.ceil(window.screen.height / scope.height),//一个屏幕中能放下几行item
//                    this._above = this._rowsInWindow * 2,//上面保留的个数
//                    this._below = this._rowsInWindow,//下面预留的个数
//                    this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
//
//                    let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
//
//                    if (scope.lastScrollTop === null || Math.abs(_scrollTop - scope.lastScrollTop) > scope._max) {//滚动的距离大于保留的item的高度
//                        scope.lastScrollTop = _scrollTop;//等于上次滚动条的高度
//                    } else {
//                        return;
//                    }
//                    let _from = parseInt(_scrollTop / scope.height) - this._above;
//                    if (_from < 0) {
//                        _from = 0;
//                    }
//                    let to = (_from + this._above + this._below + this._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
//                    let from = _from * 2;
//                    if (to > scope.list.length) {
//                        to = scope.list.length;
//                    }
//                    scope.previewList = [];
//                    for (; from < to; from++) {
//                        scope.previewList.push(scope.list[from])
//                    }
//                    scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
//                    scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
//                })
//            },
            /**
             *
             * 初始化数据时 计算顶部div的高度 和显示的数据
             */
//            change:function () {
//                var scope = this;
//                this._rowsInWindow = Math.ceil(window.screen.height / this.height),//一个屏幕中能放下几行item
//                        this._above = this._rowsInWindow * 2,//上面保留的个数
//                        this._below = this._rowsInWindow,//下面预留的个数
//                        this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
//                let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
//                let _from = parseInt(this.lineTopHeight / this.height) - this._above;
//                if (_from < 0) {
//                    _from = 0;
//                }
//                let to = (_from + scope._above + scope._below + scope._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
//                let from = _from * 2;
//                if (to > scope.list.length) {
//                    to = scope.list.length;
//                }
//                this.previewList = [];
//                for (; from < to; from++) {
//                    this.previewList.push(this.list[from])
//                }
////                scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
//                scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
//            },

        },

        computed:{
            styleObject:function () {
                return {
                    height:  (this.styleHeight/1.44) + 'px'
                }
            },
            widthObject:function () {
                return {
                    width:  this.styleHeight + 'px'
                }
            },
            spanWidth:function () {
                return {
                    width:  (this.styleHeight-70) + 'px'
                }
            }
        },
        watch: {
            /**
             *
             * 当整体数据变化时重新计算顶部div的高度和显示的数据
             */
//            list: function () {
//                var scope = this;
//
//                this._rowsInWindow = Math.ceil(window.screen.height / this.height),//一个屏幕中能放下几行item
//                        this._above = this._rowsInWindow * 2,//上面保留的个数
//                        this._below = this._rowsInWindow,//下面预留的个数
//                        this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
//                let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
//                let _from = parseInt(_scrollTop / this.height) - this._above;
//                if (_from < 0) {
//                    _from = 0;
//                }
//                let to = (_from + scope._above + scope._below + scope._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
//                let from = _from * 2;
//                if (to > scope.list.length) {
//                    to = scope.list.length;
//                }
//                this.previewList = [];
//                for (; from < to; from++) {
//                    this.previewList.push(this.list[from])
//                }
//                scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
//                scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
//                setTimeout(function () {
//                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 0});
//                },0)
//            },
//            previewList:function () {
//                setTimeout(function () {
//                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 0});
//                },0)
//            }
        }
    }
</script>