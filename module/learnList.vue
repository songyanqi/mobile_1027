<style>
    .linear{
        width:100%;
        background:-moz-linear-gradient(top,#000000,#fafafa);
        text-align: center;
        position: absolute;
        bottom: 0px;
        height:20px;
        font-size: 14px;
        line-height:20px;
        color: #ffffff;
        opacity: 0.5;
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0.0)), color-stop(50%, rgba(0, 0, 0, 0.35)), color-stop(100%, rgba(0, 0, 0, 0.7)),color-stop(100%, #FFFFFF));


    }
    .teacher{
        color: #999999;
        margin-top: 5px;
    }
    .circle{
        background-color: #92FDE0;
        display: inline-block;
        margin-right: 5px;
        width: 5px;
        height: 5px;
        vertical-align: middle;
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
    .good_title{
        word-break: break-all;
    }
    .good_list_2_row{
        padding:0;
    }
    .good_list_2_row .good_item{
        margin:0;
        padding:0;
        border-top: 0.5px solid #E1E1E1;
    }
    .good_list_3_row{
        width: 3.75rem;
        height: 1.08rem;
        margin-bottom: 0px;
        padding-bottom: 10px;
        background-color: #ffffff;
        position: relative;
    }
    .good_img_container{
        position:absolute;
        top: 0.1rem;
        left: 0.1rem;
        width: 1.27rem;
        height: 0.88rem;
    }
    .newImage {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
    }
    .learnList-content{
        position: absolute;
        width: 2.2rem;
        height: 0.88rem;
        top: 10px;
        right: 10px;
    }
    .title{
        width: 2.2rem;
        font-size: 0.14rem;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
    }
    .doctor{
        width: 2.2rem;
        height: 0.22rem;
        line-height: 0.22rem;
        position: absolute;
        bottom: 0.25rem;
        color: #999999;
        font-size: 0.12rem;
    }
    .money{
        width: 2.2rem;
        height: 0.22rem;
        line-height: 0.22rem;
        position: absolute;
        bottom: 0;
    }
    .money span{
        display: inline-block;
        vertical-align: top;
        height: 0.22rem;
        line-height: 0.22rem;
    }
    .money-rmb{
        color:#FF4A7D;
        font-size: 0.16rem;
    }
    .money-yj{
        color: #999999;
        font-size: 0.11rem;
    }
    .money .money-yj{
        line-height: 0.24rem;
    }
    .money .money-yj span{
        line-height: 0.24rem;
    }
    .first{
        height: 1.13rem;
        border-top: 0!important;
    }
    .titleFirst{
        padding-top: 0.05rem!important;
        background-color: #fff!important;
    }
    .good_list_con{
        border-bottom: 0.5px solid #e1e1e1;
    }
</style>
<template>
    <!--src="http://pic.davdian.com/free/2016/12/22/346_346_95d772212ba7dc702aaeabf7d32138cd.png"-->
    <div class="good_list_con">
        <div class="good_list_2_row" style="background-color: #f1f1f1">

            <div id="#topHeight"></div>
            <a :href="item.command.content" v-for="(item, index) in list" class="good_item good_list_3_row" style="width:3.75rem" :class="{'first':index==0}">
                <div class="good_img_container" style="background-color: #f1f1f1" :class="{'titleFirst':index==0}">
                    <img class="newImage"  style="display: inline-block;border: none;" v-lazy="imgObject(item.imageUrl)" />
                    <div class="linear" v-if='parseInt(new Date().getTime()/1000) > item.startTimestamp'>
                        <span class="circle"></span><span style="font-size: 11px;">直播中</span>
                    </div>
                    <div class="linear" v-if='parseInt(new Date().getTime()/1000) < item.startTimestamp && item.startTimestamp-parseInt(new Date().getTime()/1000) < 60*60*2'>
                        <span style="font-size: 11px;">即将开始:</span>
                        <span style="font-size: 11px;">
                            {{getFullTime(parseInt(item.startTimestamp-parseInt(new Date().getTime()/1000)))}}
                        </span>
                    </div>
                    <div class="linear" v-if='parseInt(new Date().getTime()/1000) < item.startTimestamp && item.startTimestamp-parseInt(new Date().getTime()/1000) > 60*60*2'>
                        <span style="font-size: 11px;">{{getFullTimeDay(parseInt(item.startTimestamp))}}</span>
                    </div>
                    <div class="linear" v-if='item.endTimestamp > 0'>
                        <span style="font-size: 11px;">精彩回放</span>
                    </div>
                </div>
                <div class='learnList-content' :class="{'titleFirst':index==0}">
                    <div class='title' v-text='item.title'></div>
                    <div class='doctor' v-text='item.teacher'></div>
                    <div class='money'>
                        <span class='money-rmb'>¥&nbsp;<span v-text='item.course_price'></span></span>
                        <span class='money-yj' v-if='visitor==3 &&item.share_income && item.share_income!="0.00"'>&nbsp;&nbsp;分享奖励:&nbsp;¥&nbsp;<span v-text='item.share_income'></span></span>
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
            visitor:null
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
            // setTimeout(function(){
            //       $('.good_list_2_row .good_list_3_row:first')
            //         .css({
            //             'padding-top':'0.05rem',
            //             'height':'1.1rem',
            //         })
            //         $('.title:first').css({
            //             'padding-top':'0.05rem'
            //         })
            //     },100)
        },
        methods:{
            getFullTimeDay: function (num) {
                var second = num * 1000
                var y = new Date(second).getFullYear();
                var monthtime = new Date(second).getMonth() + 1;
                var daytime = new Date(second).getDate();
                var s = new Date(second).getSeconds();
                var m = new Date(second).getMinutes();
                var h = new Date(second).getHours();
                return y + '-' + this.toDou(monthtime) + '-' + this.toDou(daytime) + ' ' + this.toDou(h) + ':' + this.toDou(m)
            },
            getFullTime: function (timer) {
                let sec = parseInt(timer)
                let h = Math.floor(sec / 3600)
                let m = Math.floor((sec - h * 3600) / 60)
                let s = Math.floor((sec - h * 3600 - m * 60))
                return this.toDou(h)+ ':' + this.toDou(m) + ':' + this.toDou(s)
            },
            toDou: function (num) {
                var n = parseInt(num)
                if (n < 10) {
                    return "0" + n
                } else {
                    return n
                }
            },
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
            },
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
            
        }
    }
</script>