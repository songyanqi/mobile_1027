<template>
    <div id='discuss'>
        <discuss-title :rightshow='rightshow' v-if='!inApp'></discuss-title>
        <div class='inAppBlock' v-if='!inApp'></div>
        <div class='discuss_no' v-if='rightshow==1'>报名后才能评论哦</div>
        <div class='container' v-for='item in feedList'>
            <div class='title'>
                <div class='title_img title_all' :style="{'background': 'url(' + item.headImg + ') center center / cover no-repeat' , 'background-size': 'cover'}"></div>    
                <div class='title_name title_all' v-text='item.userName'></div>
                <div class='title_time title_all' v-text='item.createTime'></div>
                <img class='title_star title_all' v-if='item.score == 1' src="//pic.davdian.com/free/2017/05/09/star_1.png">
                <img class='title_star title_all' v-if='item.score == 2' src="//pic.davdian.com/free/2017/05/09/star_2.png">
                <img class='title_star title_all' v-if='item.score == 3' src="//pic.davdian.com/free/2017/05/09/star_3.png">
                <img class='title_star title_all' v-if='item.score == 4' src="//pic.davdian.com/free/2017/05/09/star_4.png">
                <img class='title_star title_all' v-if='item.score == 5' src="//pic.davdian.com/free/2017/05/09/star_5.png">
            </div>
            <div class='content' v-html="item.content.replace(/\n/g,'<br/>')"></div>
            <!-- <div class='content' v-text='item.content'></div> -->
        </div>
        <div class='error' v-if='noDataFlag'>
            <img src="//pic.davdian.com/free/2017/05/10/error_img.png">
            <div>还没有笔记</div>
        </div>
    </div>
</template>


<script>
    import layout from "./index/layout.es6"
    import lay from "./layout/api.es6"
    import common from "./common/common.es6";
    var discussTitle = require("../module/discussTitle.vue");
    let axios = require("axios");
    require('babel-polyfill');
    require('es6-promise').polyfill();

    export default{
        data:function(){
            return{
                rightshow:2,
                feedList:[],
                pageIndex: 0,
                noDataFlag: false,
                scroolFlag: true,
                getNewDataFlag: true,
                pageSize: 10,
                inApp:!!navigator.userAgent.match(/davdian|bravetime|vyohui/)
            }
        },
        created:function () {
            
        },
        mounted:function () {
            this.init()
            this.remSize();
        },
        methods:{
            remSize(){
                (function(doc, win) {
                    var docEl = doc,
                        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
                        dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
                        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
                    docEl.documentElement.dataset.dpr = dpr;
                    var recalc = function() {
                        var width = docEl.body.clientWidth;

                        if (width / dpr > 750) {
                            width = 750 * dpr;
                        }
                        docEl.documentElement.dataset.width = width;
                        docEl.documentElement.dataset.percent = 200 * (width / 750);
                        docEl.documentElement.style.fontSize = 200*(width/750) + 'px';
                        docEl.body.style.fontSize = '14px';
                        var list = document.querySelectorAll("[base-on-rem]");
                        for(var i=0;i<list.length;i++){
                            list[i].removeAttribute('base-on-rem');
                        }
                        $(".need_js_height").css("height",Math.floor((width-20)/2*600/531)+"px");
                        $(".need_js_height_seckill").css("height",Math.floor((width-25)/2*362/350)+"px");
                    };
                    recalc();
                    if (!doc.addEventListener) return;
                    win.addEventListener(resizeEvt, recalc, false);
                })(document, window);
            },
            init(){
              var that = this
              var obj = {}
              obj.obj={
                courseId: window.courseId,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
              }
              axios.post('/api/mg/content/course/notesList',lay.strSign(obj))
                .then(function (respone) {
                    console.log(respone)
                    that.pageIndex = that.pageIndex + respone.data.data.dataList.length
                    that.rightshow = respone.data.data.userWrite
                    if (respone && respone.data && respone.data.data && respone.data.data.dataList){
                        that.feedList = respone.data.data.dataList
                        if (respone.data.data.dataList == 0){
                            that.noDataFlag = true
                        }
                        if (respone.data.data.dataList.length<that.pageSize){
                            that.getNewDataFlag = false
                        }
                    } else {
                        that.getNewDataFlag = false
                    }
                })
                .catch(function (error) {
                    console.log('error:',error)
                });
                $(window).scroll(function(){
                    if($(document).scrollTop() >= $(document).height() - $(window).height() - 100) {
                        if (that.getNewDataFlag && that.scroolFlag){
                            that.scroolFlag = false
                            that.getNewData()
                            // setTimeout(function(){
                            //     that.scroolFlag = true
                            // }, 2000)
                        }

                    }  
                });  
            },
            getNewData(){
                var that = this
                var obj = {}
                obj.obj={
                    courseId: window.courseId,
                    pageIndex: that.pageIndex,
                    pageSize: that.pageSize
                }
                axios.post('/api/mg/content/course/notesList',lay.strSign(obj))
                .then(function (respone) {
                    that.pageIndex = that.pageIndex + respone.data.data.dataList.length
                    if (respone && respone.data && respone.data.data && respone.data.data.dataList){
                        that.feedList = that.feedList.concat(respone.data.data.dataList)
                        if (respone.data.data.dataList.length<that.pageSize){
                            that.getNewDataFlag = false
                        }
                    } else {
                        that.getNewDataFlag = false
                    }
                    that.scroolFlag = true
                })
                .catch(function (error) {
                    console.log('error:',error)
                });
            }
        },
        components:{
            discussTitle:discussTitle
        }
    }
</script>
<style>
    body{
        padding-top: 0;
    }
</style>
<style scoped lang='sass'>
    .container{
        padding-top: 0.21rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        padding-bottom: 0.15rem;
        font-size: 0;
        background: #fff;
        border-bottom: 0.5px solid #F1F1F1;
    }
    .title{
        .title_all{
            display: inline-block;
            vertical-align: middle;
        }
        .title_img{
            width: 0.24rem;
            height: 0.24rem;
            border-radius: 50%;
            background: red;
        }
        .title_name{
            font-size: 0.14rem;
            color: #666666;
            margin-left: 0.05rem;
        }
        .title_time{
            font-size: 0.12rem;
            margin-left: 0.03rem;
            color: #999999;
        }
        .title_star{
            width: 0.59rem;
            float: right;
            margin-top: 0.06rem;
        }
    }
    .content{
        font-size: 0.13rem;
        color: #333333;
        margin-top: 0.1rem;
    }
    .error{
        img{
            width: 1.2rem;
            margin-top: 1rem;
            margin-left: 1.28rem;
        }
        div{
            color: #666666;
            margin-top: 0.3rem;
            width: 100%;
            text-align: center;
            font-size: 0.14rem;
        }
    }
    .discuss_no{
        position: fixed;
        width: 100%;
        max-width: 640px;
        height: 0.3rem;
        line-height: 0.3rem;
        background: #000;
        opacity: 0.6;
        color: #fff;
        text-align: center;
        font-size: 0.14rem;
    }
    .inAppBlock{
        height: 44px;
        width: 100%;
    }
</style>