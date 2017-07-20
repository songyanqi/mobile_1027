<style>
    .popularity{
        width: 100%;
        background-color: #FFFFFF;
        text-align: center;
        padding-top: 44px;
        color: #FF4A7D;
        height:37px;
        line-height: 37px;
        font-size: 14px;
    }
    .popimage1{
        width: 60px;
        height: 60px;
        border-radius: 30px;
        border: #FFD97F 1px solid;
    }
    .popimage2{
        width: 60px;
        height: 60px;
        border-radius: 30px;
        border: #E9E4DA 1px solid;
    }
    .popimage3{
        width: 60px;
        height: 60px;
        border-radius: 30px;
        border: #FDD7A8 1px solid;
    }
    .other{
        position: relative;
        height:61px;
        padding: 10px 0px;
        left: 10px;
        background-color: #ffffff;
    }
    .other_image{
        position: absolute;
        left:10px;

    }
    .other_message{
        position: absolute;
        left: 90px;
        background-color: #ffffff;
    }
    .popimage{
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    .other1{
        position: relative;
        left:10px;
        height:41px;
        padding: 10px 0px;
        background-color: #ffffff;
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
    .other_image1{
        position: absolute;
        left:10px;

    }
    .other_message1{
        position: absolute;
        left: 60px;
        background-color: #ffffff;
    }
    .top_three{
        max-width:72px;
        width: 72px;
        position: absolute;
        bottom: 1px;
        left: -7px;
    }
    .text_hide{
        width: 140px;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
    }
    .list_top{
        padding-top: 172px;
        overflow:hidden;
        background-color: #FFFFFF;
    }
    .in_app .list_top{
        padding-top: 128px;
    }
    .no_more {
        text-align: center;
        padding: 10px;
        background: #f1f1f1;
        color: #666666;
        margin: 0px;
        font-size: 12px;
    }
</style>
<template>
    <div>
        <div class="list_top">
            <div class ="other" v-if="topList[0]">
                <div class="other_image">
                    <img class="popimage1" :src="imgObject(topList[0].avatar)" alt="">
                    <img class="top_three" src="//pic.davdian.com/free/2016/12/21/144_32_bd67acb047a39393a241c38737b23105.png" alt="">
                </div>
                <div class="other_message">
                    <p class="fz_15 text_hide" style="color: #333333;height: 20px;line-height: 20px;padding-top: 10px;">{{topList[0].name}}</p>
                    <p class="fz_12" style="color:#999999;height: 30px;line-height: 30px;">推荐了<span style="color:#FF4A7D ">{{topList[0].inviteNum}}</span>个朋友过来听课</p>
                </div>
                <div class="thin_line"></div>
            </div>
            <div class ="other"  v-if="topList[1]">
                <div class="other_image">
                    <img class="popimage2" :src="imgObject(topList[1].avatar)" alt="">
                    <img class="top_three" src="//pic.davdian.com/free/2016/12/21/144_36_fcf2cf34fa22e3218d62052fe8ad63c9.png" alt="">
                </div>
                <div class="other_message">
                    <p class="fz_15 text_hide" style="color: #333333;height: 20px;line-height: 20px;padding-top: 10px">{{topList[1].name}}</p>
                    <p class="fz_12" style="color:#999999;height: 30px;line-height: 30px;">推荐了<span style="color:#FF4A7D ">{{topList[1].inviteNum}}</span>个朋友过来听课</p>
                </div>
                <div class="thin_line"></div>
            </div>
            <div class ="other"  v-if="topList[2]">
                <div class="other_image">
                    <img class="popimage3" :src="imgObject(topList[2].avatar)" alt="">
                    <img class="top_three" src="//pic.davdian.com/free/2016/12/21/144_32_764dc74bb6b60fc1c4eddb4bad998724.png" alt="">
                </div>
                <div class="other_message">
                    <p class="fz_15 text_hide" style="color: #333333;height: 20px;line-height: 20px;padding-top: 10px">{{topList[2].name}}</p>
                    <p class="fz_12" style="color:#999999;height: 30px;line-height: 30px;">推荐了<span style="color:#FF4A7D ">{{topList[2].inviteNum}}</span>个朋友过来听课</p>
                </div>
                <div class="thin_line"></div>
            </div>

            <div id="#topHeight" :style="{height: lineTopHeight +'px'}"></div>


            <div v-for="item in previewList" class ="other1">
                <div class="other_image1">
                    <img class="popimage" :src="imgObject(item.avatar)" alt="">
                </div>
                <div class="other_message1">
                    <p class="fz_15 text_hide" style="color: #333333; height: 20px;">{{item.name}}</p>
                    <p class="fz_12" style="color:#999999;">推荐了<span style="color:#FF4A7D ">{{item.inviteNum}}</span>个朋友过来听课</p>
                </div>
                <div class="thin_line"></div>
            </div>


            <div :style="{height: lineBottomHeight +'px'}"></div>

            <div style="clear: both"></div>
            <div v-if="loading" class="no_more"> 加载中 <img src="//pic.davdian.com/free/loading_03252.svg"> </div>
            <div v-if="more == '0' && no_data == false" class="no_more"> 没有更多了 </div>
        </div>
        <div v-if="no_data" style="text-align: center;position: relative;top: 80px;">
            <img style="width:18%;" src="//pic.davdian.com/free/2016/12/19/200_298_0d6a638b6549b3dba2ab709ac72a3db1.png" alt="">
            <div style="margin-top: 20px;color: #666666">
                    <span>
                        马上分享邀请卡，占领榜单吧!
                    </span>
            </div>
        </div>
    </div>
</template>

<script>
    import common from "./common/common.es6";
    export default{
        data:function () {
            return{
                topList:[],
                list:[],
                ajaxing:true,
                page:0,
                loading:false,
                more:"1",
                height:62,
                lineBottomHeight:0,
                lineTopHeight:0,
                previewList:[],
                lastScrollTop:null,
                no_data:false,
                localData:{},
                dataUrl:window.shareTopList,
            }
        },
        props:['showed'],
        created:function () {
            this.getData(true);
            this.scroll();
        },
        methods:{
            getData:function (flags) {
                //确定当前的状态
                let scope = this
                //判断是否请求数据
                if(scope.more == "1"){
                    if(scope.ajaxing){
                        scope.ajaxing = false;
                        scope.loading = true;
                        scope.error = false;
                        common.getDataWithSign({
                            updata:{courseId:window.courseId,pageIndex:scope.page,pageSize:10},
                            flag:flags,
                            url:scope.dataUrl,
                            success:function (data) {
                                scope.loading = false;
                                if(data.code == 0){
                                    //不是下拉加载
                                    if(flags){
                                        if(data == undefined){
                                            scope.no_data = true;
                                            scope.loading = false;
                                        }else if(data.data == undefined){
                                            scope.no_data = true;
                                            scope.loading = false;
                                        }else if(data.data.dataList == undefined ){
                                            scope.no_data = true;
                                            scope.loading = false;
                                        } else if(data.data.dataList.dataList == undefined ){
                                            scope.no_data = true;
                                            scope.loading = false;
                                        }
                                        else if(data.data.dataList.dataList.length == 0 ){
                                            scope.no_data = true;
                                            scope.loading = false;
                                        }else{
                                            scope.topList = data.data.dataList.dataList.slice(0,3);
                                            scope.list = data.data.dataList.dataList.slice(3,data.data.dataList.length);
                                            scope.page = data.data.dataList.nextPageIndex;
//                                            scope.more = data.data.dataList.more;
                                            scope.more = "1";
                                            if(!isPrivateMode){
                                                sessionStorage.setItem("vClassroomPopularityOther", JSON.stringify(data));
                                            }
                                        }
                                    }else{

                                        if(data == undefined){
                                            scope.more = "0";
                                            scope.loading = false;
                                        }else if(data.data == undefined){
                                            scope.more = "0";
                                            scope.loading = false;
                                        }else if(data.data.dataList == undefined ){
                                            scope.more = "0";
                                            scope.loading = false;
                                        } else if(data.data.dataList.dataList == undefined ){
                                            scope.more = "0";
                                            scope.loading = false;
                                        }else{
                                            scope.list = scope.list.concat(data.data.dataList.dataList);
                                            scope.page = data.data.dataList.nextPageIndex;
                                            scope.more = data.data.dataList.more;
                                            if(!isPrivateMode){
                                                let localKey = common.md5LocalKey(scope.dataUrl,{courseId:window.courseId,pageIndex:0,pageSize:10});
                                                let localdata = JSON.parse(localStorage.getItem(localKey));
                                                localdata.data_version = data.data_version;
                                                localdata.data.dataList.nextPageIndex = data.nextPageIndex;
                                                localdata.data.dataList.more = data.data.more;
                                                localdata.data.dataList.dataList = localdata.data.dataList.dataList.concat(data.data.dataList.dataList);
                                                scope.localData = localdata;
                                                localStorage.setItem(localKey,JSON.stringify(localdata));
                                                sessionStorage.setItem("vClassroomPopularityOther", JSON.stringify(scope.localData));
                                            }
                                        }
                                    }
                                }else{
                                    scope.shows();
                                }
                                scope.ajaxing = true;
                            }, error: function () {
                                if(flags){
                                    scope.shows();
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
            scroll:function(){
                var scope = this;
                $(window).scroll(function(){//滚动条滚动事件
                    var offset = window.pageYOffset;//文档现在的位置加上窗口的高度
                    var offsetTop = document.body.scrollHeight;//整个页面的高度
                    if(offsetTop-offset-window.screen.availHeight<100 && offsetTop > window.screen.availHeight){//如果滚动条到一定位置
                        scope.getData(false);
                    }



                    this._rowsInWindow = Math.ceil(window.screen.height / scope.height),//一个屏幕中能放下几行item
                            this._above = this._rowsInWindow * 2,//上面保留的个数
                            this._below = this._rowsInWindow,//下面预留的个数
                            this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度

                    let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度


                    console.log(this._max);

                    if (scope.lastScrollTop === null || Math.abs(_scrollTop - scope.lastScrollTop) > this._max) {//滚动的距离大于保留的item的高度
                        scope.lastScrollTop = _scrollTop;//等于上次滚动条的高度
                    } else {
                        return;
                    }
                    let _from = parseInt(_scrollTop / scope.height) - this._above;
                    if (_from < 0) {
                        _from = 0;
                    }
                    let to = _from + this._above + this._below + this._rowsInWindow;//初始化的高度 两行的时候的个数
                    let from = _from;
                    if (to > scope.list.length) {
                        to = scope.list.length;
                    }
                    scope.previewList = [];
                    for (; from < to; from++) {
                        scope.previewList.push(scope.list[from])
                    }
                    scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
                    scope.lineBottomHeight = (scope.list.length - to) * scope.height ;//底部的填充div的高度
                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 0});
                })
            },
            shows:function () {
                this.$emit('showed');
            },
            imgObject:function (imgSrc) {
                if(imgSrc){
                    return imgSrc
                }else{
                    return '//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png'
                }
            },
        },
        watch: {
            list: function () {
                var scope = this;

                this._rowsInWindow = Math.ceil(window.screen.height / this.height),//一个屏幕中能放下几行item
                        this._above = this._rowsInWindow * 2,//上面保留的个数
                        this._below = this._rowsInWindow,//下面预留的个数
                        this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
                let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
                let _from = parseInt(_scrollTop / this.height) - this._above;
                if (_from < 0) {
                    _from = 0;
                }
                let to = _from + scope._above + scope._below + scope._rowsInWindow;//初始化的高度 两行的时候的个数
                let from = _from;
                if (to > scope.list.length) {
                    to = scope.list.length;
                }
                this.previewList = [];
                console.log(this.list);
                for (; from < to; from++) {
                    this.previewList.push(this.list[from])
                }
                console.log(this.previewList);
                scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
                scope.lineBottomHeight = (scope.list.length - to) * scope.height ;//底部的填充div的高度
                $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 0});
            },
            'showed':function () {
                if(this.showed){
                    this.getData(true);
                }
            }
        }
    }
</script>