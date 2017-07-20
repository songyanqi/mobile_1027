<style>
    .other_info{
        width:100%;
    }
    .unLoad{
        width: 100%;
        height: 400px;
        position: fixed;
        top: 180px;
        z-index: 101;
        max-width: 640px;
        color: #333;
    }
    .unLoad-img{
        width: 122px;
        height: 140px;
        top: 0;
        margin: auto;
        background: url('//pic.davdian.com/free/2016/12/08/no_sign.png') no-repeat;
        background-size: contain;
    }
    .unLoad-title{
        width: 150px;
        height: 20px;
        margin: 30px auto;
        text-align: center;
    }
    .unLoad-btn{
        width: 140px;
        height: 33px;
        text-align: center;
        line-height: 33px;
        margin: 20px auto;
        border: 1px solid #999999;
        border-radius: 2.5px;
    }
    .no_more_style{
        height: 0.5rem;
        background: #fff;
        margin:0;
        padding-top: 20px;
    }
</style>
<template>
    <div>
    <v-school-title v-if='!isapp'></v-school-title>

    <!-- <v-school-banner :list="bannerList"></v-school-banner> -->

    <learn-list :list="list" :visitor="visitor" :top-heights="topHeights"></learn-list>

    <div style="clear: both"></div>
    <div v-if="loading" class="no_more"> 加载中 <img src="//pic.davdian.com/free/loading_03252.svg"> </div>
    <div v-if="more=='0' && no_data == false" class="no_more no_more_style" style="color: #999999;font-size: 12px;"> 没有更多了 </div>
    <div v-if = "no_data" style="text-align: center;position: relative;top: 80px;">
        <img style="width:18%;" src="//pic.davdian.com/free/2016/12/19/200_298_0d6a638b6549b3dba2ab709ac72a3db1.png" alt="">
        <div style="margin-top: 20px;color: #666666">
            <span>
                还没有课程哦
            </span>
        </div>
    </div>
    <div class="other_info">
        <div class='unLoad' v-if="error">
            <div class='unLoad-img'></div>
            <div class='unLoad-title'>网络异常，请重新加载</div>
            <div class='unLoad-btn' @click='getData(true)'>点击重新加载</div>
        </div>
    </div>
    </div>
</template>

<script>
    var vSchoolTitle = require("../module/vSchoolTitle.vue");
    var learnList = require("../module/learnList.vue");
    import common from "./common/common.es6";

    export default{
        data:function(){
            return{
                selected:0,
                ajaxing:true,
                list:[],
                visitor:0,
                bannerList:[],
                allData:[],
                anymore:false,
                dataUrl:'/api/mg/content/course/pay_course_list',
                topHeights:0,
                top:0,
                page:0,
                more:"1",
                loading:false,
                error:false,
                localData:{},
                no_data:false,
                isapp:window.Units.isApp()
            }
        },
        created:function () {
            common.md5LocalKey(window.index,{pageIndex:this.page,pageSize:10});
            var scope = this;
            //判断是否是火狐浏览器，来 选择滚动条滚动的方式
            scope.isFirefox=navigator.userAgent.toUpperCase().indexOf("FIREFOX")>0?true:false;
            //判断是否是由上一个页面返回时返回读取缓存的数据 有缓存数据时获取到需要填充的高度 否则为0
            this.init();
            if(scope.isFirefox){
                document.documentElement.scrollTop = scope.top;
            }else {
                document.body.scrollTop = scope.top;
            }
            if(!isPrivateMode){
                sessionStorage.setItem('vSchoolTop',JSON.stringify(scope.top));
                sessionStorage.setItem('vSchoolTopHeight',JSON.stringify(scope.topHeights));
                sessionStorage.setItem('vSchoolMore',JSON.stringify(scope.more));
            }
            document.title = '培训'
            console.log(this.isapp)
        },
        mounted:function () {
            var scope = this;
            //添加滚动事件
            this.scroll();
            //添加高度
            document.getElementById("#topHeight").style.height = scope.topHeights+"px";
            if(scope.isFirefox){
                document.documentElement.scrollTop = scope.top;
            }else {
                document.body.scrollTop = scope.top;
            }
        },
//        updated:function () {
//            if(this.list.length == 0){
//                this.no_data = true;
//            }
//        },
        methods:{
            /**
             * 获取数据
             */
            getData:function (flags) {
                //确定当前的状态
                let scope = this
                //判断是否请求数据
                if(scope.more == "1"){
                    if(scope.ajaxing){
                        scope.ajaxing = false;
                        scope.loading = true;
                        scope.error = false;
                        console.log("getDataWithSign");
                        common.getDataWithSign({
                            updata:{pageIndex:scope.page,pageSize:10},
                            flag:flags,
                            url:scope.dataUrl,
                            success:function (data) {
                                console.log('dataList--->', data)
                                if(data && data.visitor_status)
                                scope.visitor = data.visitor_status
                                scope.loading = false;
                                if(data.code == 0){
                                    //不是下拉加载
                                    if(flags){
                                        //无banner 无course的情况 此时无data节点
                                        if(data.data == undefined){
                                            scope.bannerList = [];
                                            scope.list = [];
                                            scope.no_data = true;
                                            scope.loading = false;
                                            scope.ajaxing = true;
                                        }else{
                                            if(data.data.banner == undefined){//无banner节点时
                                                scope.bannerList = []
                                            }else{
                                                scope.bannerList = data.data.banner.dataList;
                                            }
                                            if(data.data.course == undefined){
                                                scope.list = [];
                                                scope.no_data = true;
                                            }else{
                                                data.data.course.more = "1";
                                                scope.list = scope.list.concat(data.data.course.dataList);
                                                scope.page = data.data.course.nextPageIndex;
                                                scope.more = data.data.course.more;
                                                if(!isPrivateMode){
                                                    sessionStorage.setItem("vSchool", JSON.stringify(data));
                                                }
                                                if(data.data.course.dataList.length == 0){
                                                    scope.no_data = true;
                                                }
                                            }
                                        }
                                    }else{//下拉加载时没有banner数据

                                        if(data.data == undefined){
                                            if(scope.list.length >=4 ){
                                                scope.more = "0";
                                            }else{
                                                scope.more = "1";
                                            }
                                        }else{
                                            scope.list = scope.list.concat(data.data.course.dataList);
                                            scope.page = data.data.course.nextPageIndex;

                                            // if(scope.list.length >=4 ){
                                            //     data.data.course.more = "0";
                                            // }else{
                                            //     data.data.course.more = "1";
                                            // }

                                            scope.more = data.data.course.more;

                                            if(!isPrivateMode){
                                                let localdata = JSON.parse(sessionStorage.getItem("vSchool"));
                                                localdata.data_version = data.data_version;
                                                localdata.data.course.dataList = localdata.data.course.dataList.concat(data.data.course.dataList);
                                                localdata.data.course.nextPageIndex = data.data.course.nextPageIndex;
                                                localdata.data.course.more = data.data.course.more;

                                                scope.localData = localdata;
                                                let localKey = common.md5LocalKey(scope.dataUrl,{pageIndex:0,pageSize:10});
                                                localStorage.setItem(localKey,JSON.stringify(scope.localData));
                                                sessionStorage.setItem("vSchool", JSON.stringify(scope.localData));
                                            }

                                        }
                                    }
                                    scope.ajaxing = true;
                                }
                                else{
                                    if(flags){
                                        scope.error = true;
                                        scope.ajaxing = true;
                                    }else{
                                        bravetime.info("加载失败了");
                                        setTimeout(function () {
                                            scope.ajaxing = true;
                                        },1000);
                                    }
                                }
                            },error:function () {
                                scope.loading = false;
                                if(flags){
                                    scope.error = true;
                                }else{
                                    bravetime.info("加载失败了")
                                }
                                setTimeout(function () {
                                    scope.ajaxing = true;
                                },1000);
                            }
                        })
                    }
                }
            },
            /**
             * 滚动判断
             */
            scroll:function(){
                console.log("scroll");
                var scope = this;
                $(window).scroll(function(){//滚动条滚动事件

                    var top = document.body.scrollTop;


                    if(scope.isFirefox){
                       top = document.documentElement.scrollTop;
                    }else {
                       top = document.body.scrollTop;
                    }

                    var topHeight = document.getElementById("#topHeight").offsetHeight;
                    if(!isPrivateMode){
                        sessionStorage.setItem('vSchoolTop',top);
                        sessionStorage.setItem('vSchoolTopHeight',topHeight);
                    }
                    var offset = window.pageYOffset;//文档现在的位置加上窗口的高度
                    var offsetTop = document.body.scrollHeight;//整个页面的高度
                    if(offsetTop-offset-window.screen.availHeight<100){//如果滚动条到一定位置
                        scope.getData(false);
                    }
                })
            },
            /**
             * 初始化数据
             */
            init:function () {
                var scope = this;
                let getIt = true;
                var ua = navigator.userAgent.toLowerCase();
                if(!isPrivateMode){//浏览器中能存储session storage
                    var patharr = JSON.parse(sessionStorage.history);//获取路径path
                    if(patharr.length > 2){//从标签页直接进入也会发出请求
                        var lastPath = patharr[patharr.length-2].path;
                        if(lastPath == 'introduce') {//判断是否是浏览器上的返回键回到这个页面
                            scope.localData = JSON.parse(sessionStorage.getItem('vSchool'));

                            if(!scope.localData){
                                if(scope.localData.data.banner == undefined){
                                    scope.bannerList = [];
                                }else{
                                    scope.bannerList = scope.localData.data.banner.dataList;
                                }
                                scope.list = scope.localData.data.course.dataList;
                                scope.page = scope.localData.data.course.nextPageIndex;
                                scope.more = scope.localData.data.course.more;
                                scope.top = eval(sessionStorage.getItem('vSchoolTop'));
                                scope.topHeights = eval(sessionStorage.getItem('vSchoolTopHeight'));

                                getIt = false;
                            }

                        }else{
                            // 清空数据
                            sessionStorage.removeItem("vSchool");
                            sessionStorage.removeItem("vSchoolTop");
                            sessionStorage.removeItem("vSchoolTopHeight");
                        }
                    }
                };

                if(getIt){
                    this.getData(true);
                }
            }
        },
        components:{
            vSchoolTitle:vSchoolTitle,
            learnList:learnList
        }
    }
</script>