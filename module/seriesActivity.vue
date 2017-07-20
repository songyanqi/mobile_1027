<template>
    <div id="seriesActivity">
        <div class='container'>
            <img src="//pic.davdian.com/free/2017/04/26/series1.jpg">
            <img src="//pic.davdian.com/free/2017/04/26/series2.jpg">
            <img src="//pic.davdian.com/free/2017/04/26/series3.jpg">
            <img src="//pic.davdian.com/free/2017/04/26/series4.jpg">
            <img src="//pic.davdian.com/free/2017/04/26/series5.jpg">

            <img src="//pic.davdian.com/free/2017/04/26/series_course_01.jpg" @click='goHref1'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_02.jpg" @click='goHref2'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_03.jpg" @click='goHref3'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_04.jpg" @click='goHref4'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_05.jpg" @click='goHref5'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_06.jpg" @click='goHref6'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_07.jpg" @click='goHref7'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_08.jpg" @click='goHref8'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_09.jpg" @click='goHref9'>
            <img src="//pic.davdian.com/free/2017/04/26/series_course_10.jpg" @click='goHref10'>

            <img src="//pic.davdian.com/free/2017/04/26/series6.jpg">
            <img src="//pic.davdian.com/free/2017/04/26/series7.jpg">
            <img src="//pic.davdian.com/free/2017/04/26/series8.jpg">
            <!-- <img src="//pic.davdian.com/free/2017/04/26/series9.jpg"> -->
            <div class='price'>
                <img src="//pic.davdian.com/free/2017/04/26/series_001.jpg">
                <div class='price_btn' @click='hrefPrice'></div>
            </div>
            
            <img src="//pic.davdian.com/free/2017/05/09/series_img.jpg">
            <div class='seriesBtn'>
                <img src="//pic.davdian.com/free/2017/04/27/series_btn_2.jpg" v-if='state == 3'@click='share'><!-- 
                 --><img src="//pic.davdian.com/free/2017/04/27/series_btn_4.jpg" v-if='state == 3 && userTicket==0' @click='apply'><!-- 
                  --><img src="//pic.davdian.com/free/2017/04/27/series_btn_1.jpg" v-if='state != 3' @click='beNumber' ><!--
                 --><img src="//pic.davdian.com/free/2017/04/27/series_btn_3.jpg" v-if='state != 3 && userTicket==0' @click='apply'><!-- 
                  --><img src="//pic.davdian.com/free/2017/04/28/series_btn_success.jpeg"  v-if='userTicket==1' @click='goSeries'>
            </div>
            <!-- <img src="//pic.davdian.com/free/2017/04/26/series11.jpg"> -->
            <div class='shareToastMark' v-if='shareToastFlag' @click='share'></div>
            <div class='shareToast' v-if='shareToastFlag'>
                <div class='shareToastTitle'>点击右上角即可分享，当好友通过您的分享报名课程，并在您的店铺下单，您便可获得{{seriesShareIncome}}元分享奖金</div>
                <div class='shareToastBtn' @click='share'>确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    let axios = require("axios");
    require('babel-polyfill');
    require('es6-promise').polyfill();
    import lay from './index/layout.es6'
    import dialog from "../utils/dialog.es6";
    import util from "../utils/utils.es6";

    import app from "../utils/appInterface.es6";
    import wx from "../utils/WXShare.es6"
    import layout from "./layout/api.es6"
    export default {
        data () {
            return {
                shareToastFlag:false,
                state:null,
                userTicket:null,
                seriesId:window.seriesId,
                shareUserId:window.shareUserId,
                //公开课
                courseTypeSwitch:null,
                //付费课
                coursePriceSwitch:null,
                //系列课类型
                seriesType:null,
                seriesPrice:'',
                seriesShareIncome: '',
                seriesCover:'',
                //系列课课程列表
                dataList:[],
                deleteFlag: true,
                isApp: !!navigator.userAgent.match(/davdian|bravetime/)
            }
        },
        ready:function(){

        },
        computed: {},
        mounted () {
            window.appData = {
                showHead: 1,     // 是否展示头部
                showFoot: 0,     // 是否展示底部
                backOnHead: 1,   // 头部返回按钮
                homeOnHead: 0,   // 头部首页按钮
                shareOnHead: 1,  // 头部分享按钮
                btnOnHead: 0,    // 头部文字按钮
                btnText: "",     // 头部文字按钮文字
                btnLink: ""      // 头部文字按钮链接
            }
            
            app.init()
            this.remSize()
            this.init()
        },
        methods: {
            goHref1(){
                window.location.href = '/course-995.html'
            },
            goHref2(){
                window.location.href = '/course-996.html'
            },
            goHref3(){
                window.location.href = '/course-997.html'
            },
            goHref4(){
                window.location.href = '/course-998.html'
            },
            goHref5(){
                window.location.href = '/course-999.html'
            },
            goHref6(){
                window.location.href = '/course-1000.html'
            },
            goHref7(){
                window.location.href = '/course-1002.html'
            },
            goHref8(){
                window.location.href = '/course-1003.html'
            },
            goHref9(){
                window.location.href = '/course-1004.html'
            },
            goHref10(){
                window.location.href = '/course-1005.html'
            },
            hrefPrice(){
                window.location.href = '/428999.html'
            },
            dvkHref(item){
                window.location.href=item.command.content
            },
            goSeries(){
                window.location.href = '/course-series-'+this.seriesId+'.html'
            },
            init(){
                if(window.seriesId != 25){
                    window.location.href = window.location.host
                    return
                }
                var that = this
                var obj = {seriesId:this.seriesId}
                axios.post('/api/mg/content/series_course/detail',lay.strSign('series', obj))
                    .then(function (respone) {
                        if (respone.data && respone.data.code==30024){
                            if (JSON.parse(sessionStorage.getItem('history')).length > 1){
                                window.history.back()
                            } else {
                                window.location.href = window.location.host
                            }
                        } else {
                            if (respone.data.data && respone.data.code==0){
                            if (respone.data){
                                    that.seriesCover = respone.data.data.seriesCover
                                    that.dataList = respone.data.data
                                    that.state = respone.data.visitor_status
                                    that.userTicket = respone.data.data.userTicket
                                    that.courseTypeSwitch = respone.data.data.courseTypeSwitch
                                    that.coursePriceSwitch = respone.data.data.coursePriceSwitch
                                    that.seriesType = respone.data.data.seriesType
                                    that.seriesPrice = respone.data.data.seriesPrice
                                    that.seriesShareIncome = respone.data.data.seriesShareIncome
//                                    window.imgUrl = that.seriesCover
//                                    window.descContent = respone.data.data.seriesDesc
//                                    window.shareTitle = respone.data.data.seriesTitle
                                    that.setTitle(that.seriesShareIncome)
                                    var shareInfo = {
                                        successTimelineShare: function () {
                                            layout.statisticsShare({shareType:1,shareSource:18})
                                        },
                                        successAppMessageShare: function () {
                                            layout.statistics({shareType:2,shareSource:18})
                                        },
                                        successQqMessageShare: function () {
                                            layout.statistics({shareType:4,shareSource:18})
                                        },
                                        successWeiboMessageShare: function (){
                                            layout.statistics({shareType:7,shareSource:18})
                                        }
                                    }
                                    wx.init(shareInfo)
                                }
                            } else {
                                if (respone.data){
                                    dialog.alert('detail code:'+ respone.data.code);
                                } else {
                                    dialog.alert('detail接口无data')
                                }
                                
                            }
                        }
                        
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            setTitle(brokerage){
                if(!!navigator.userAgent.match(/davdian|bravetime/)){
                    var str = brokerage.substring(1,brokerage.length)
                    if(str>0){
                        app.setHead({shareMoney:str+""});
                        window.moreShareInfo = {shareTitle:"分享至少赚"+brokerage+"元", shareDesc:"只要有好友在您分享的链接中购物，您就可以得到对应的商品返现。通过链接还能直接进入您的店铺，好友购物您就赚钱~"};
                    }
                }
            },
            beNumber(){
                window.location.href = '/t-10838.html?rp=course_detail&rl=inv_button'
            },
            apply(){
                var that = this
                var obj = {seriesId:this.seriesId,shareUserId:this.shareUserId}
                axios.post('/api/mg/content/series_course/join',lay.strSign('series', obj))
                    .then(function (respone) {
                        console.log('respone12312321->>', respone)
                        if (respone.data && respone.data.code==0){
                            if (respone.data.data){
                                if(respone.data.data.jsApi){
                                    let jsApi = respone.data.data.jsApi
                                    jsApi.jsApiParameters.dvdhref=location.href;
                                    window.location = 'http://open.davdian.com/wxpay_t2/davke_pay.php?info='+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters))
                                    // window.location = 'http://open.vyohui.cn/wxpay_t3/davke_pay.php?info='+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters))
                                }else if (respone.data.data.payUrl){
                                    window.location.href = respone.data.data.payUrl
                                } else{
                                    that.userTicket = 1
                                }
                                if (that.state == 3){
                                    window.location.href = '/course-series-'+that.seriesId+'.html'
                                }
                                
                            }
                        } else {
                            if (respone.data){
                                dialog.alert('message_list code:'+ respone.data.code);
                            } else {
                                dialog.alert('message_list接口无data')
                            }
                            
                        }
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            share(){
                if (this.isApp){
                    app.callAppShare()
                }else {
                    this.shareToastFlag = !this.shareToastFlag
                }
                
            },
            //rem单位
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
            }
        },
        components: {}
    }
</script>
<style type="text/css" scoped>
    .container{
        width: 100%;
    }
    .container img{
        width: 100%;
    }
    .seriesBtn{
        width: 100%;
    }
    .seriesBtn img{
        width: 50%;
        vertical-align: top;
    }
    .price{
        width: 100%;
        position: relative;
    }
    .price img{
        width: 100%;
    }
    .price_btn{
        width: 80%;
        left: 10%;
        height: 0.5rem;
        position: absolute;
        top: 1.7rem;
    }
    .shareToastMark{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        background: #000;
        opacity: 0.6;
    }
    .shareToast{
        width: 2.7rem;
        height: 1.65rem;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin:auto;
        border-radius: 0.12rem;
        z-index: 13;
        background: #fff;
    }
    .shareToastTitle{
        width: 100%;
        height: 1.15rem;
        border-bottom: 1px solid #4D4D4D;
        color: #030303;
        box-sizing: border-box;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        padding-left: 0.36rem;
        padding-right: 0.36rem;
        font-size: 0.14rem;
    }
    .shareToastBtn{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #0076FF;
        text-align: center;
    }
</style>

