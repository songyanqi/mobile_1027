<style>
    .index_con_menu {
        display: -webkit-box;
        display: -moz-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        flex-flow: row;
        max-width: 640px;
        font-size: 13px;
        line-height: 44px;
        position: relative;
        top: 0;
        z-index: 11;
        margin-top: 0;
        position: absolute;
        left:60px;
        right: 60px;
    }
    .index_con_menu li {
        color: #333;
        text-align: center;
        cursor: pointer;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .index_con_menu li.hover {
        color: #ff4a7d;
    }
    .bottom_line{
        height: 2px;
        background: #ff4a7d;
        width: 60px;
        margin: auto;
        margin-top: -2px;
    }
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
</style>
<template>
    <div id="main">
        <div class="top0" style="height: 44px;background-color: #FFFFFF">
            <div class="top_container">
                <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->
                <div class="top_left">
                    <a class="top_back" href="javascript:history.back();">
                        <span class="home_arrow"></span>
                    </a>
                </div>

                <ul class="index_con_menu">
                    <li @click="liClick0" class="flex-1" :class="{hover:selected == 0}" style="background: rgb(255, 255, 255);">
                        <div class="span_outer fz_14" style="margin-right: 25px">
                            <span>已报名</span>
                            <div v-if="selected == 0" class="bottom_line">
                            </div>
                        </div>
                    </li>
                    <li @click="liClick1" class="flex-1" :class="{hover:selected == 1}" selected="1" style="background: rgb(255, 255, 255);">
                        <div class="span_outer fz_14" style="margin-left: 25px">
                            <span>我发起</span>
                            <div v-if="selected == 1" class="bottom_line"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if = "no_data" style="text-align: center;position: relative;top: 80px;">
            <img style="width:18%;" src="//pic.davdian.com/free/2016/12/19/200_298_0d6a638b6549b3dba2ab709ac72a3db1.png" alt="">
            <div style="margin-top: 20px;color: #666666">
                <span v-if="selected == 0">
                    还没有报名过课程哦
                </span>
                <span v-if="selected == 1">
                    还没有创建过课程哦
                </span>
            </div>
        </div>
        <list :list="list" :top-heights="topHeights"></list>
        <div style="clear: both"></div>
        <div v-if="loading" class="no_more"> 加载中 <img src="//pic.davdian.com/free/loading_03252.svg"> </div>
        <div v-if="more == '0' && no_data == false" class="no_more" style="color: #666666;font-size: 12px;"> 没有更多了 </div>

        <div class="other_info">
            <div class='unLoad' v-if="error">
                <div class='unLoad-img'></div>
                <div class='unLoad-title'>网络异常，请重新加载</div>
                <div class='unLoad-btn' @click='getData'>点击重新加载</div>
            </div>
        </div>

    </div>
</template>

<script>
    var list = require("./vSchoolList.vue");
    import common from "./common/common.es6";
    export default{
        el:"#main",
        data:function(){
            return{
                selected:0,
                ajaxing:true,
                list:[],
                page:0,
                allData:[[],[]],
                allPage:[0,0],
                allMore:["1","1"],
                allTop:[0,0],
                allTopHeight:[0,0],
                previewList:[],
                no_data:false,
                error:false,
                more:"1",
                loading:false,
                top:0,
                topHeights:0,
                dataUrl:window.userJoinList,
                isFirefox:false,
                localData:[{},{}],
                all_no_data:[false,false],
                error:false,
                all_error:[false,false],
            }
        },
        //初始化数据，dom没有建立之前
        created:function () {
            let scope = this;
            //判断是否是火狐浏览器，来选择滚动条滚动的方式
            scope.isFirefox=navigator.userAgent.toUpperCase().indexOf("FIREFOX")>0?true:false;
            //判断是否是由上一个页面返回时返回读取缓存的数据 有缓存数据时获取到需要填充的高度 否则为0
            this.init();
            //存入初始化的数据（不需要包含getData获取到的数据）
            if(!isPrivateMode){
                sessionStorage.setItem('vClassroomPoplistsort',this.selected);
                sessionStorage.setItem('vClassroomPoplistTop',JSON.stringify(scope.allTop));
                sessionStorage.setItem('vClassroomPoplistAllTopHeight',JSON.stringify(scope.allTopHeight));
                sessionStorage.setItem('vClassroomPoplistMore',JSON.stringify(scope.allMore));
            }
        },
        //dom建立之后，获取需要的参数
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
        methods:{
            /**
             * 交换显示数据
             */
            liClick0:function () {
                let scope = this;
                this.selected = 0;
                this.list = [];
                this.error = this.all_error[0];
                if(!isPrivateMode){
                    sessionStorage.setItem('vClassroomPoplistsort',this.selected);
                }
                this.more = this.allMore[0];
                this.top = this.allTop[0];
                this.topHeights = this.allTopHeight[0];
                this.no_data = this.all_no_data[0];
                if(this.allData[0].length == 0){
                    this.dataUrl = window.userJoinList;
                    this.getData(true);
                }else{
                    this.list = this.allData[0]
                }
                document.getElementById("#topHeight").style.height = scope.topHeights+"px";
//                if(scope.isFirefox){
//                    alert(scope.top);
//                    document.documentElement.scrollTop = scope.top;
//                }else {
//                    document.body.scrollTop = scope.top;
//                }
                setTimeout(function () {
                    document.getElementById("#topHeight").style.height = scope.topHeights+"px";
                    if(scope.isFirefox){
                        document.documentElement.scrollTop = scope.top;
                    }else {
                        document.body.scrollTop = scope.top;
                    }
                },0)
            },
            liClick1:function () {
                let scope =this;
                this.selected = 1;
                this.error = this.all_error[1];
                this.list = [];
                if(!isPrivateMode){
                    sessionStorage.setItem('vClassroomPoplistsort',this.selected);
                };
                this.more = this.allMore[1];
                this.top = this.allTop[1];
                this.topHeights = this.allTopHeight[1];
                this.no_data = this.all_no_data[1];
                if(this.allData[1].length == 0){
                    this.dataUrl = window.userCreateList;
                    this.getData(true);
                }else{
                    this.list = this.allData[1]
                }
                document.getElementById("#topHeight").style.height = scope.topHeights+"px";
//                if(scope.isFirefox){
//                    document.documentElement.scrollTop = scope.top;
//                }else {
//                    document.body.scrollTop = scope.top;
//                }
                setTimeout(function () {
                    document.getElementById("#topHeight").style.height = scope.topHeights+"px";
                    if(scope.isFirefox){
                        document.documentElement.scrollTop = scope.top;
                    }else {
                        document.body.scrollTop = scope.top;
                    }
                },0)
            },
            /**
             * 获取数据
             */
            getData:function (flags) {
                //确定当前的状态
                let scope = this, sort = this.selected;
                //判断是否请求数据
                if(scope.more == "1"){
                    if(scope.ajaxing){
                        scope.ajaxing = false;
                        scope.loading = true;
                        scope.error = false;
                        common.getDataWithSign({
                            updata:{pageIndex:scope.allPage[sort]},
                            flag:flags,
                            url:scope.dataUrl,
                            success:function (data) {
                                if(data.code == 0){
                                    //不是下拉加载.
                                    if(flags){
                                        if(data == undefined){
                                            scope.all_no_data[sort] = true;
                                            scope.no_data = true;
                                        }
                                        else if(data.data == undefined){
                                            scope.all_no_data[sort] = true;
                                            scope.no_data = true;
                                        }else{
                                            scope.allData[sort] = scope.allData[sort].concat(data.data.course.dataList);
                                            scope.allPage[sort] = data.data.course.nextPageIndex;
                                            scope.allMore[sort] = "1";
                                            scope.list = scope.allData[sort];
                                            scope.page = scope.allPage[sort];
                                            data.data.course.more = "1";
                                            scope.localData[sort] = data;

                                            if(!isPrivateMode){
                                                sessionStorage.setItem("vClassroomPopListTop", JSON.stringify(scope.localData));
                                            }
                                            if(data.data.course.dataList.length == 0){
                                                scope.all_no_data[sort] = true;
                                                scope.no_data = true;
                                            }
                                        }
                                    }else{
                                        if(data.data != undefined){
                                            scope.allData[sort] = scope.allData[sort].concat(data.data.course.dataList);

                                            if(scope.allData[sort].length <= 4){
                                                data.data.course.more = "1"
                                            }

                                            scope.allPage[sort] = data.data.course.nextPageIndex;
                                            scope.allMore[sort] = data.data.course.more;
                                            scope.list = scope.allData[sort];
                                            scope.page = scope.allPage[sort];

                                            if(!isPrivateMode){
                                                let localdata = JSON.parse(sessionStorage.getItem("vClassroomPopListTop"))[sort];
                                                localdata.data_version = data.data_version;
                                                localdata.data.course.nextPageIndex = scope.allPage[sort];
                                                localdata.data.course.more = data.data.course.more;
                                                localdata.data.course.dataList = localdata.data.course.dataList.concat(data.data.course.dataList);
                                                scope.localData[sort] = localdata;
                                                let localKey = common.md5LocalKey(scope.dataUrl,{pageIndex:0});
                                                localStorage.setItem(localKey,JSON.stringify(localdata));
                                                sessionStorage.setItem("vClassroomPopListTop", JSON.stringify(scope.localData));
                                            }
                                        }else{
                                            if(scope.list.length >=4 ){
                                                scope.more = "0";
                                            }else{
                                                scope.more = "1";
                                            }
                                            scope.allMore[sort] = scope.more;
                                        }
                                    }
                                    scope.ajaxing = true;
                                }else{
                                    if(flags){
                                        scope.error = true;
                                        scope.all_error[sort] = true;
                                        scope.ajaxing = true;
                                    }else{
                                        bravetime.info("加载失败了");
                                        setTimeout(function () {
                                            scope.ajaxing = true;
                                        },1000)
                                    }
                                }
                                scope.loading = false;
                                scope.more = scope.allMore[sort];
                            },
                            error:function () {
                                if(flags){
                                    scope.error = true;
                                    scope.all_error[sort] = true;
                                }else{
                                    bravetime.info("加载失败了")
                                }
                                setTimeout(function () {
                                    scope.ajaxing = true;
                                },1000);
                                scope.loading = false;
                            }
                        })
                    }
                }
            },
            /**
             * 滚动判断
             */
            scroll:function(){
                var scope = this;
                $(window).scroll(function(){//滚动条滚动事件
                    var top = document.body.scrollTop;
                    if(scope.isFirefox){
                        top = document.documentElement.scrollTop;
                    }else {
                        top = document.body.scrollTop;
                    }
                    var topHeight = document.getElementById("#topHeight").offsetHeight;
                    scope.allTop[scope.selected] = top;
                    scope.allTopHeight[scope.selected] = topHeight;
                    if(!isPrivateMode){
                        sessionStorage.setItem('vClassroomPoplistTop',JSON.stringify(scope.allTop));
                        sessionStorage.setItem('vClassroomPoplistAllTopHeight',JSON.stringify(scope.allTopHeight));
                    }
                    var offset = window.pageYOffset;//文档现在的位置加上窗口的高度
                    var offsetTop = document.body.scrollHeight;//整个页面的高度
                    if(offsetTop-offset-window.screen.availHeight<100){//如果滚动条到一定位置
                        scope.getData(false);
                    }
                })
            },
            /**
             * 初始化数据 由直播间返回时才读取本地数据
             */
            init:function () {
                let getIt = true;
                var scope = this;
                var ua = navigator.userAgent.toLowerCase();
                if(!isPrivateMode){//浏览器中能存储session storage
                    var patharr = JSON.parse(sessionStorage.history);//获取路径path
                    if(patharr.length > 2){//从标签页直接进入也会发出请求
                        var lastPath = patharr[patharr.length-2].path;
                        if(lastPath == 'introduce') {//判断是否是浏览器上的返回键回到这个页面
                            //取本地的数据
                            scope.localData = JSON.parse(sessionStorage.getItem('vClassroomPopListTop'));
                            if(isEmptyObject(scope.localData[0])){
                                scope.allData[0] = [];
                                scope.allPage[0] = 0;
                                scope.allMore[0] = "1";
                            }else{
                                scope.allData[0] = scope.localData[0].data.course.dataList;
                                scope.allPage[0] = scope.localData[0].data.course.nextPageIndex;
                                scope.allMore[0] = scope.localData[0].data.course.more;
                            }
                            if(isEmptyObject(scope.localData[1])){
                                scope.allData[1] = [];
                                scope.allPage[1] = 0;
                                scope.allMore[1] = "1";
                            }else{
                                scope.allData[1] = scope.localData[1].data.course.dataList;
                                scope.allPage[1] = scope.localData[1].data.course.nextPageIndex;
                                scope.allMore[1] = scope.localData[1].data.course.more;
                            }

                            this.allTop = eval(sessionStorage.getItem('vClassroomPoplistTop'));
                            this.allTopHeight = eval(sessionStorage.getItem('vClassroomPoplistAllTopHeight'));

                            this.selected = eval(sessionStorage.getItem('vClassroomPoplistsort'));


                            //植入值
                            this.list = this.allData[this.selected];
                            this.page = this.allPage[this.selected];
                            this.more = this.allMore[this.selected];
                            this.top = this.allTop[this.selected];
                            this.topHeights = this.allTopHeight[this.selected];

                            getIt = false;
                        }else{
                            // 清空数据
                            sessionStorage.removeItem("vClassroomPopListTop");
                            sessionStorage.removeItem("vClassroomPoplistTop");
                            sessionStorage.removeItem("vClassroomPoplistAllTopHeight");
                            sessionStorage.removeItem("vClassroomPoplistsort");
                        }
                    }
                };
                if(getIt){
                    this.getData(true);
                }
            },
        },
        components:{
            list:list
        }
    }
</script>