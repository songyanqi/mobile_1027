<template>
    <div class='container'>
        <div class='guide1'>
            <img src="//pic.davdian.com/free/2017/06/28/partner_bg2.png" v-if='!giftButton' class='guide1Bg'>
            <img src="//pic.davdian.com/free/2017/06/28/partner_bg1.png" v-if='giftButton' class='guide1Bg'>
            <div class='exit' @click='goProfile1'></div>
            <div class='guide1Title guide1all'><span v-if='bonus && bonus.bonusCountMoney' v-text='bonus.bonusCountMoney'></span>元红包已到账</div>
            <div class='guide1Img guide1all' v-if='bonusFlag'>
                <img src="//pic.davdian.com/free/2017/06/07/ticket.png" class='guide1all' @click='linkUrl(bonus.linkUrl)'>
                <div class='guide1Img1 guide1all'><span>¥&nbsp;</span>{{bonus.bonusMoney}}</div>
                <div class='guide1Img3 guide1all'>满{{bonus.limit}}元可用</div>
                <div class='guide1Img2 guide1all' v-text='bonus.bonusName'></div>
                <div class='guide1Img4 guide1all' v-text='bonus.useCat'></div>
                <div class='guide1Img5 guide1all'>有效期倒计时：<span>{{time}}</span></div>
            </div>
            <div class='guide1Text guide1all' v-if='bonusFlag'>240邮费抵用券正在路上～</div>
            <div class='guide1Btn guide1all' @click='goProfile'>马上开始购物</div>
            <div class='bottomImg' v-if='giftButton' @click='linkUrl(giftButton.linkUrl)' :style="{'background': 'url(' + giftButton.imageUrl + ') center center / cover no-repeat' , 'background-size': 'cover'}"></div>
            <!-- <div class='bottomImg' @click='linkUrl(giftButton.linkUrl)' style='background:red'></div> -->
        </div>
        <!-- <div class='guide2' v-if='goodsList'>会员专享，限时抢购中</div>
        <div class='guide3' v-if='goodsList'>
            <div v-if='goodsList' class='guide3Container' @click='linkUrl(goods.linkUrl)' v-for='goods in goodsList'>
                <img :src="goods.imageUrl" class='guide3img'>

                <div class='guide3price'>
                    <span v-text='goods.actInfo'></span>
                    <img src="//pic.davdian.com/free/2017/06/22/activityBg1.png">
                </div>
                <div class='guide3Container1'>
                    <div class='guide3title' v-text='goods.title'></div>
                    <div class='guide3money'><span>¥&nbsp;</span>{{goods.price}}</div>
                    <div class='guide3inComeMoney'>会员返{{goods.saveMoney}}</div>
                </div>
                
            </div>
        </div> -->
    </div>
</template>

<script>
    let axios = require("axios");
    require('es6-promise').polyfill();
    import { strSign, getQuery } from "../../../../utils/utils.es6";
    import native from '../../../common/js/module/native.js'
    import app from "../../../../utils/appInterface.es6";
    import wx from "../../../../utils/WXShare.es6"
    export default{
        data:function(){
            return{
                app: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
                bonusFlag:false,
                bonus:{},
                goodsList:false,
                giftButton: false
            }
        },
        created:function () {
            this.remSize()
            this.init()
            this.wxshare()
        },
        computed: {
            time(){
                var  m = this.bonus.leftTime
                var that =  this
                if (m < 0){
                    return '00:00:00';
                } else {
                    var hours = parseInt(this.bonus.leftTime/3600)
                    var minutes = parseInt((this.bonus.leftTime - hours*3600)/60)
                    var seconds = this.bonus.leftTime- hours*3600-minutes*60
                    setTimeout(function () {
                        that.bonus.leftTime = that.bonus.leftTime - 1 
                    },1000)
                    if (hours<10){
                        hours = '0' + hours
                    }
                    if (minutes<10){
                        minutes = '0' + minutes
                    }
                    if (seconds<10){
                        seconds = '0' + seconds
                    }
                    return hours +':' + minutes +':'+ seconds
                }
            }
        },
        mounted:function () {
            
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
                        if (width >640){
                            width = 640
                        }
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
            wxshare(){
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
                shareInfo.title = '我加入大V店会员啦~'
                shareInfo.link = window.location.host
                shareInfo.imgUrl = 'http://pic.vyohui.cn/free/2017/06/16/800_800_6c36fd66f4c95aa7d0e4d7b00cb05667.png?x-oss-process=image/resize,m_fill,w_100,h_100/quality,Q_90&'
                shareInfo.desc = '你也快来加入吧，超多特权等你享哦~'
                wx.init(shareInfo)
            },
            init(){
                var that = this
                axios.post('/api/mg/user/memberbuy/success',strSign({orderId:getQuery('order_id')}))
                    .then(function (respone) {
                        if(respone.data.code == 0){
                            if (respone.data && respone.data.data && respone.data.data.bonus){
                                that.bonus = respone.data.data.bonus
                                that.bonusFlag = true
                            }
                            if (respone.data && respone.data.data && respone.data.data.giftButton)
                            that.giftButton = respone.data.data.giftButtongoNativeHomePage
                            if (respone.data && respone.data.data && respone.data.data.goodsList)
                            that.goodsList = respone.data.data.goodsList
                            if (respone.data && respone.data.data && respone.data.data.giftButton)
                            that.giftButton = respone.data.data.giftButton
                        }else {
                            // alert('code='+respone.data.code+':'+respone.data.data.msg)
                            window.location.href = window.location.host
                        }
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            linkUrl(linkurl){
                window.location.href = linkurl;
            },
            goProfile1(){
                window.location.reload()
            },
            goProfile(){
                if (this.app) {
                    native.Browser.goNativeHomePage()
                }else {
                    window.location.href = window.location.host
                }
                
            },
        },
        components:{
        }
    }
</script>
<style type="text/css">
    body{
        background: #f0f0f0;
        font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;
    }
</style>
<style scoped lang='sass'>
    .container{
        width: 100%;
        .guide3Container1{
            width: 100%;
            height: 0.7rem;
            background: #fff;
        }
        .bottomImg{
            position: absolute;
            top: 4.3rem;
            width: 85%;
            height: 0.7rem;
            max-width: 384px;
            left: 50%;
            transform: translate(-50%,0);
            border-radius: 4px;
        }
        .exit{
            position: absolute;
            width: 0.3rem;
            height: 0.3rem;
            top: 0.05rem;
            left: 0.05rem;
        }
        .guide1{
            width: 100%;
            vertical-align: center;
            .guide1all{
                position: absolute;
            }
            .guide1Bg{
                width: 100%;
                vertical-align: top;
            }
            .guide1Title{
                width: 100%;
                max-width: 640px;
                color: #BF9D51;
                font-size: 0.25rem;
                top: 1.3rem;
                text-align: center;
                font-weight: bolder;
            }
            .guide1Content{
                width: 100%;
                max-width: 640px;
                color: #FF4A7D;
                font-size: 0.18rem;
                text-align: center;
                top: 2.01rem;
                span{
                    color: #333333;
                }
            }
            .guide1Img{
                width: 100%;
                max-width: 640px;
                height: 0.99rem;
                top: 2rem;
                img{
                    width: 3.15rem;
                    height: 0.99rem;
                    left: 50%;
                    transform: translate(-50%,0);
                }
                .guide1Img1{
                    top: 0.20rem;
                    left: 0.40rem;
                    width: 0.8rem;
                    text-align: center;
                    color: #fff;
                    font-size: 0.3rem;
                    span{
                        font-size: 0.2rem;
                    }
                }
                .guide1Img2{
                    top:0.20rem;
                    left: 1.55rem;
                    color: #333333;
                    font-size: 0.16rem;
                    width: 1.5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    display: -webkit-box;
                }
                .guide1Img3{
                    top:0.65rem;
                    left: 0.43rem;
                    color: #fff;
                    font-size: 0.12rem;
                }
                .guide1Img4{
                    top:0.42rem;
                    left: 1.55rem;
                    color: #666666;
                    font-size: 0.12rem;
                    width: 1.5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    display: -webkit-box;
                }
                .guide1Img5{
                    top:0.66rem;
                    left: 1.55rem;
                    color: #FF4A7D;
                    font-size: 0.11rem;
                    span{
                        font-weight: bolder;
                    }
                }
            }
            .guide1Text{
                color: #666666;
                font-size: 0.12rem;
                top: 3.1rem;
                width: 100%;
                max-width: 640px;
                text-align: center;
            }
            .guide1Btn{
                width: 2.75rem;
                height: 0.4rem;
                line-height: 0.4rem;
                border-radius: 200px;
                background: -webkit-linear-gradient(left, #FF5B5B, #FB1C62);
                top: 3.57rem;
                left: 50%;
                transform: translate(-50%,0);
                color: #FFFFFF;
                font-size: 0.14rem;
                text-align: center;
                box-shadow: 0px 3px 8px #FEC2CE;
                font-weight: bolder;

            }
        }
        .guide2{
            color:#333333;
            font-size: 0.14rem;
            text-align: center;
            width: 100%;
            background: #fff;
            height: 0.4rem;
            line-height: 0.4rem;
        }
        .guide3{
            width: 3.55rem;
            margin-left: 0.1rem;
            font-size: 0;
            margin-top: 0.1rem;
            margin-bottom: 0.2rem;
            .guide3Container{
                position: relative;
                width: 1.73rem;
                height: 2.43rem;
                font-size: 0.14rem;
                float: left;
                overflow: hidden;
                margin-bottom: 0.1rem;
                .guide3img{
                    width: 1.73rem;
                    height: 1.73rem;
                    vertical-align: top;
                }
                .guide3price{
                    position: absolute;
                    left: 0;
                    top: 1.55rem;
                    color: #fff;
                    height: 0.18rem;
                    line-height: 0.18rem;
                    border-top-right-radius: 16px;
                    font-size: 0;
                    background-size: inherit;
                    span{
                        vertical-align: top;
                        background: -webkit-linear-gradient(left, #FF7477, #FF5589);
                        display: inline-block;
                        height: 100%;
                        font-size: 0.1rem;
                        padding-left: 0.05rem;
                        line-height: 0.2rem;
                        font-weight: bold;
                    }
                    img{
                        vertical-align: top;
                        height: 100%;
                    }
                }
                .guide3title{
                    color: #666666;
                    font-size: 0.12rem;
                    padding-left: 0.1rem;
                    padding-right: 0.07rem;
                    padding-top: 0.02rem;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    overflow: hidden;
                }
                .guide3money{
                    color: #FF4A7D;
                    font-size: 0.16rem;
                    padding-left: 0.1rem;
                    margin-top: 0.07rem;
                    display: inline-block;
                    vertical-align: top;
                    font-weight: 400;
                    span{
                        font-size: 0.12rem;
                    }
                }
                .guide3inComeMoney{
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 0.11rem;
                    font-size: 0.11rem;
                    /*margin-left: 0.06rem;*/
                    color: #BF9D51;
                }
            }
            .guide3Container:nth-child(2n){
                float: right;
            }
            /*.left{
                float: left;
            }
            .right{
                float: right;
            }*/
        }
        .guide3:after{
            content:".";
            display:block;
            height:0;
            clear:both;
            visibility:hidden;
        }
    }
</style>