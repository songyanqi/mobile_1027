<template>
    <div class='container'>
        <loading v-model="loadingShow"></loading>
        <div class="top0">
            <div class="top_container">
                <div class="top_left" style="width: 40px">
                    <a class="top_back" href="javascript:history.back();">
                        <span class="home_arrow"></span>
                    </a>
                </div>
                <div class="title_container" v-text='title'></div>
                <div class="top_right" style="width:40px;">
                    分享
                </div>
            </div>
        </div>
        <div class='topBlock'></div>
        <div class='swiper-container'>
            <div class='pageIndex'>
                <img src="//pic.davdian.com/free/2017/06/03/pageindex1.png" v-if='index == 1 || index == 6'>
                <img src="//pic.davdian.com/free/2017/06/03/pageindex2.png" v-if='index == 2'>
                <img src="//pic.davdian.com/free/2017/06/03/pageindex3.png" v-if='index == 3'>
                <img src="//pic.davdian.com/free/2017/06/03/pageindex4.png" v-if='index == 4'>
                <img src="//pic.davdian.com/free/2017/06/03/pageindex5.png" v-if='index == 5 || index == 0'>
            </div>
            <div class="swiper-wrapper">
                <div class="swiper-slide slide1 slide" v-for='item in sort' v-bind:class="{ slide1: item=='1', slide2: item=='2', slide3: item=='3', slide4: item=='4', slide5: item=='5', }">
                    <div v-if="item=='1'">
                        <div class='title'>购物省钱</div>
                        <div class='content'>
                            <p>低到无法想象的会员价，买到就是赚！</p>
                            <p>每周上新多热门商品，</p>
                            <p>一年至少为您<span class='color1'>省</span> <span class='color2'>1497.6</span><span class='color1'>元</span></p>
                            <p><span class='color1'>轻松省出会员费</span></p>
                        </div>
                        <div class='contentData'>
                            <div class='contentDataGood' v-for='(item, index) in savingMoneyList'>
                                <img :src="item.imageUrl" class='img'>
                                <div class='goodtitle' v-text='item.title'></div>
                                <div class='price'>¥ <span class='text' v-text='item.price'>20.00</span></div>
                                <div class='btn'>会员省¥ {{item.saveMoney}}</div>
                            </div>
                        </div>
                    </div>

                    <div v-if="item=='2'">
                        <div class='title'>学习免费</div>
                        <div class='content'>
                            <p>超过 <span class='color2'>1000堂</span> 课程，会员<span class='color2'>全部免费听</span></p>
                            <p>内容终身有效，随时想听就听</p>
                            <p><span class='color1'>课程分享奖励不止</span><span class='color2'>50%</span></p>
                        </div>
                        <div class='contentData'>
                            <div class='textcontent' v-for='(item, index) in freeStudyList'>
                                <img :src="item.imageUrl" class='img'>
                                <div class='price'>¥ <span v-text='item.price'></span></div>
                                <div class='coursetitle' v-text='item.title'></div>
                                <div class='teacher' v-text='item.teacher'></div>
                                <div class='btn'><span class='size'>会员免费</span>分享赚钱¥ {{item.shareIncome}}</div>
                            </div>
                        </div>
                    </div>

                    <div v-if="item=='3'">
                        <div class='title'>亲子社群</div>
                        <div class='content'>
                            <p>全国共 <span class='color2'>300+</span>  妈妈社群，<span class='color2'>150000+</span> 妈妈加入</p>
                            <p>在社群中给您最贴心的育儿建议、和您一起</p>
                            <p>陪孩子亲子阅读、发现更多平台优惠</p>
                        </div>
                        <div class='contentData'>
                           <div class='text' v-for='(item, index) in communityList'>
                               <div class='img'>
                                   <img :src="item.imageUrl">
                               </div>
                               <div class='slide3content'>
                                   <span v-text='item.title'>哈哈哈哈哈哈哈哈哈哈</span>
                               </div>
                           </div>
                        </div>
                    </div>

                    <div v-if="item=='4'">
                        <div class='title'>分享赚钱</div>
                        <div class='content'>
                            <p>所有商品均参与返现，没有上限！</p>
                            <p>全平台超过 <span class='color2'>1000000+</span> 商品、<span class='color2'>1000+</span> 课程</p>
                            <p>一年轻松 <span class='color1'>返现</span>  <span class='color2'>921.53</span>元</p>
                            <p> <span class='color1'>赚到会员费</span></p>
                        </div>
                        <div class='contentData'>
                            <div class='contentDataGood' v-for='(item, index) in goodsList'>
                                <img :src="item.imageUrl" class='img'>
                                <div class='price'>¥ <span class='text' v-text='item.price'></span></div>
                                <div class='btn'>分享赚¥ {{item.shareIncome}}</div>
                            </div>
                            <div class='slide4course'>
                                <img :src="courseList.imageUrl" class='slide4img'>
                                <div class='slide4price'>¥ {{courseList.price}}</div>
                                <div class='slide4content' v-text='courseList.title'></div>
                                <div class='slide4btn'>会员免费 <span class='size'>分享赚￥ {{courseList.shareIncome}}</span></div>
                            </div>
                        </div>
                    </div>

                    <div v-if="item=='5'">
                        <div class='title'>会员福利</div>
                        <div class='content'>
                            <p>现在加入会员，即可获得新会员大礼包</p>
                            <p class='slidep'><span class='color1 color3'><span class='color2 color3'>239</span>元红包</span></p>
                            <p class='slidep'><span class='color1 color3'>+</span></p>
                            <p class='slidep'><span class='color1 color3'><span class='color2 color3'>240</span>元运费抵用券</span></p>
                        </div>
                        <div class='contentData'>
                            <h1>会员独享：退换无忧</h1>
                            <div>会员退货
                                <span class='size'>第一时间退回货款</span>，换货则会为您
                                <span class='size'>优先发货</span> ，商品问题将由平台承担全部退换货运费
                            </div>
                        </div>
                        <div class='notice'>*购买会员后，如不满意7天内可无条件退款</div>
                    </div>
                </div>
            </div>
        </div>
        <div class='footer-btn'>
            <div v-if="visitor_status=='1'" class='btn1 btn' @click='goShop'>先进店逛逛>></div>
            <div v-if="visitor_status=='1'" class='btn2 btn' @click='setShop'>
                <p class='p1'>立即购买会员</p>
                <p class='p2'><span style='text-decoration:line-through;'>￥299</span> ￥<span v-text='setShopMoney'></span>/年</p>
            </div>
            <div v-if="visitor_status=='3'" class='btn3'>邀请好友开通会员 <span>(限时特价中:¥239)</span> </div>
        </div>
        <img src="//pic.davdian.com/free/2017/06/03/arrow.png" class='arrow'>
    </div>
    

</template>


<script>
    import { Loading } from 'vux';
    let axios = require("axios");
    require('es6-promise').polyfill();
    import { strSign, getQuery } from "../../../../utils/utils.es6";
    export default{
        data:function(){
            return{
                index:1,
                title:document.title,
                app: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
                setShopMoney: 239,
                visitor_status: null,
                savingMoneyList:[],
                freeStudyList:[],
                communityList:[],
                courseList:{},
                goodsList:[],
                sort:[],
                loadingShow:true
            }
        },
        created:function () {
            this.getSort()
            this.remSize()
            this.getData()
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
            init(){
                var that = this;
                var mySwiper = new Swiper('.swiper-container', {
                    initialSlide:0,
                    direction:'vertical',
                    autoHeight: true,
                    height: document.documentElement.clientHeight - 94,
                    loop:true,
                    onSlideChangeEnd:function(swiper){ 
                        that.index = swiper.activeIndex
                    }
                })
            },
            getSort(){
                this.sort = getQuery('sort') && getQuery('sort').split('-') || ['1', '2', '3', '4', '5']
                console.log(this.sort)
            },
            getData(){
                var that = this
                axios.post('/api/mg/user/memberBuy/savingMoney',strSign())
                    .then(function (respone) {
                        that.savingMoneyList = respone.data.data.dataList
                        setTimeout(function(){
                            that.init()
                            that.loadingShow = false
                            that.visitor_status = respone.data.visitor_status
                        },1000)
                        
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
                axios.post('/api/mg/user/memberBuy/memberPrice',strSign())
                    .then(function (respone) {
                        that.setShopMoney = respone.data.data.price
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
                axios.post('/api/mg/user/memberBuy/freeStudy',strSign())
                    .then(function (respone) {
                        that.freeStudyList = respone.data.data.dataList
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
                axios.post('/api/mg/user/memberBuy/community',strSign())
                    .then(function (respone) {
                        that.communityList = respone.data.data.dataList
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
                axios.post('/api/mg/user/memberBuy/shareMakeMoney',strSign())
                    .then(function (respone) {
                        that.courseList = respone.data.data.courseList[0]
                        that.goodsList = respone.data.data.goodsList
                        console.log(that.courseList, that.goodsList)
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            goShop(){
                window.location.href = window.location.host
            },
            setShop(){

            }
            
        },
        components:{
            Loading: Loading
        }
    }
</script>
<style>
    /*body{
        max-width: 375px;
    }
    .top0{
        max-width: 375px;
    }*/
</style>
<style scoped lang='sass'>
    .swiper-container{
        position: relative;
        background: url('//pic.davdian.com/free/2017/06/05/bg.jpg');
        background-size: 100% 100%;  
    }
    .swiper-wrapper{
        height: 100%;
        .slide1{
            background: url('//pic.davdian.com/free/2017/06/05/shopbg1.png') no-repeat;
            /*background: url('//pic.davdian.com/free/2017/06/05/mmmbg1.png') no-repeat;*/
            .contentData{
                width: 2.65rem;
                height: 1.5rem;
                top: 3.27rem;
                font-size: 0;
                .contentDataGood{
                    display: inline-block;
                    vertical-align: top;
                    text-align: center;
                    width: 0.84rem;
                    height: 1.46rem;
                    margin-top: 0.03rem;
                    margin-left: 0.03rem;
                    .img{
                        width: 100%;
                        height: 0.84rem;
                    }
                    .goodtitle{
                        font-size: 0.12rem;
                        color: #333333;
                        height: 0.17rem;
                        line-height: 0.17rem;
                        overflow: hidden;
                    }
                    .price{
                        font-size: 0.11rem;
                        line-height: 0.2rem;
                        color: #613A36;
                        height: 0.2rem;
                        .text{
                            font-size: 0.14rem;
                            font-weight: 500;
                        }
                    }
                    .btn{
                        width: 0.75rem;
                        height: 0.18rem;
                        border-radius: 100px;
                        background: #BDA073;
                        color: #FFFFFF;
                        font-size: 0.11rem;
                        margin: auto;
                    }
                }
            }
        }
        .slide2{
            background: url('//pic.davdian.com/free/2017/06/05/shopbg2.png') no-repeat;
            .contentData{
                width: 2.65rem;
                height: 1.88rem;
                top: 2.97rem;
                font-size: 0;
                .textcontent{
                    display: inline-block;
                    vertical-align: top;
                    width: 1.23rem;
                    height: 1.76rem;
                    margin-top: 0.07rem;
                    margin-left: 0.04rem;
                    margin-right: 0.04rem;
                    font-size: 0.14rem;
                    position: relative;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 0.85rem;
                    }
                    .price{
                        position: absolute;
                        height: 0.16rem;
                        line-height: 0.16rem;
                        padding-right: 0.1rem;
                        left: -0.1rem;
                        top: 0.69rem;
                        color: #fff;
                        text-indent: 0.13rem;
                        border-radius: 8px;
                        font-size: 0.09rem;
                        background: -webkit-linear-gradient(left, #FF5B5B, #FB1C62);
                    }
                    .coursetitle{
                        color: #333333;
                        font-size: 0.12rem;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        display: -webkit-box;
                        overflow: hidden;
                        line-height: 0.16rem;
                        margin-top: 0.05rem;
                    }
                    .teacher{
                        color:#999999;
                        font-size: 0.11rem;
                        margin-top: 0.04rem;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        display: -webkit-box;
                        overflow: hidden;
                    }
                    .btn{
                        position:absolute;
                        bottom: 0;
                        background: #BDA073;
                        width: 100%;
                        height: 0.24rem;
                        line-height: 0.24rem;
                        text-align: center;
                        border-radius: 100px;
                        color: #fff;
                        font-size: 0.11rem;
                        overflow: hidden;
                        .size{
                            font-size: 0.13rem;
                        }
                    }
                }
                .textcontent:last-child{
                    margin-left: 0.06rem;
                }
            }
        }
        .slide3{
            background: url('//pic.davdian.com/free/2017/06/05/shopbg3.png') no-repeat;
            .contentData{
                width: 2.65rem;
                height: 1.85rem;
                top: 2.99rem;
                .text{
                    width: 2.45rem;
                    height: 0.45rem;
                    margin-left: 0.1rem;
                    font-size: 0;
                    padding-top: 0.1rem;
                    padding-bottom: 0.05rem;
                    .img{
                        width: 0.45rem;
                        height: 0.45rem;
                        display: inline-block;
                        vertical-align: top;
                        font-size: 0;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .slide3content{
                        width: 2rem;
                        height: 0.45rem;
                        display: inline-block;
                        vertical-align: top;
                        position: relative;
                        span{
                            font-size: 0.13rem;
                            padding-left: 0.10rem;
                            position: absolute;
                            top: 50%;
                            margin:auto;
                            transform: translate(0,-50%);
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            display: -webkit-box;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
        .slide4{
            background: url('//pic.davdian.com/free/2017/06/05/shopbg4.png') no-repeat;
            .contentData{
                width: 2.65rem;
                height: 2.14rem;
                top: 2.94rem;
                .slide4course{
                    width: 2.45rem;
                    height: 0.72rem;
                    margin-left: 0.1rem;
                    margin-top: 0.14rem;
                    position: relative;
                    overflow: hidden;
                    .slide4img{
                        width: 1rem;
                        height: 100%;
                    }
                    .slide4price{
                        position: absolute;
                        padding-right: 0.1rem;
                        height: 0.16rem;
                        line-height: 0.16rem;
                        left: -0.1rem;
                        top: 0.56rem;
                        color: #fff;
                        text-indent: 0.13rem;
                        border-radius: 8px;
                        font-size: 0.09rem;
                        background: -webkit-linear-gradient(left, #FF5B5B, #FB1C62);
                    }
                    .slide4content{
                         position: absolute;
                         top: 0;
                         left: 1.08rem;
                         width: 1.35rem;
                         font-size: 0.13rem;
                    }
                    .slide4btn{
                        width: 1.35rem;
                        height: 0.22rem;
                        line-height: 0.22rem;
                        position: absolute;
                        background: -webkit-linear-gradient(left, #BDA073, #B88E5B);
                        top: 0.5rem;
                        border-radius: 100px;
                        left: 1.08rem;
                        font-size: 0.13rem;
                        text-align: center;
                        color: #fff;
                        .size{
                            font-size: 0.11rem;
                        }
                    }
                }
                .contentDataGood{
                    height: 1.14rem;
                    .img{
                        width: 0.75rem;
                        height: 0.75rem;
                    }
                }
            }
        }
        .slide5{
            background: url('//pic.davdian.com/free/2017/06/05/shopbg5.png') no-repeat;
            .contentData{
                width: 2.65rem;
                height: 1.16rem;
                top: 3.42rem;
                h1{
                    font-size: 0.14rem;
                    color:#613A36;
                    width: 100%;
                    margin-top: 0.15rem;
                    height: 0.2rem;
                    line-height: 0.2rem;
                    font-weight: 500;
                    text-align: center;
                }
                div{
                    width: 100%;
                    padding-left: 0.12rem;
                    padding-right: 0.11rem;
                    margin-top: 0.06rem;
                    height: 0.6rem;
                    color:#764807;
                    font-size: 0.13rem;
                    text-align: center;
                    box-sizing: border-box;
                    .size{
                        color:#613A36;
                        font-size: 0.14rem;
                        font-weight: 500;
                    }
                }
            }
            .notice{
                position: absolute;
                font-size: 0.11rem;
                color: #764807;
                width: 100%;
                text-align: center;
                height: 0.2rem;
                line-height: 0.2rem;
                top: 4.9rem;
            }
        }
        .slide{
            background-size: 100% 100%;
            background-size: contain;
            background-position: center center; 
            position: relative;            
            .contentData{
                position: absolute;
                border:1px solid #C5A888;
                background: #fff;
                border-radius: 3px;
                left: 50%;
                transform: translate(-50%,0);
                overflow: hidden;
            }
            .title{
                position: absolute;
                font-size: 0.44rem;
                color: #603A36;
                width: 100%;
                text-align: center;
                top: 1.15rem;
            }
            .content{
                position: absolute;
                color: #764807;
                text-align: center;
                top: 1.93rem;
                width: 100%;
                .slidep{
                    margin-top: 0.08rem;
                }
                p{
                    height: 0.23rem;
                    line-height: 0.23rem;
                    font-size: 0.13rem;
                    .color1{
                        color:#613A36;
                        font-size: 0.14rem;
                        font-weight: 500;
                    }
                    .color2{
                        color:#FF4A7D;
                        font-size: 0.14rem;
                    }
                    .color3{
                        font-size: 0.2rem;
                    }
                }
            }
        }
    }
    .topBlock{
        width: 100%;
        height: 44px;
    }
    .top_right{
        width: 44px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color:#FF4A7D;
        margin-right: 10px;
        font-size: 14px;
    }
    .footer-btn{
        height: 50px;
        font-size: 0;
        .btn1{
            width: 2.25rem;
            font-size: 0.14rem;
            text-align: center;
            line-height: 50px;
            color: #FF4A7D;
            background: #F9F7F8;
        }
        .btn2{
            width: 1.5rem;
            background: -webkit-linear-gradient(left, #FF5B5B, #FA1862);
            .p1{
                font-size: 0.14rem;
                padding-top: 0.07rem;
                box-sizing: border-box;
            }
            .p2{
                font-size: 0.11rem;
            }
            p{
                width: 100%;
                height: 50%;
                color: #fff;
                text-align: center;
            }
        }
        .btn3{
            width: 100%;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            font-size: 0.14rem;
            background: -webkit-linear-gradient(left, #FF5B5B, #FA1862);
            color: #fff;
            span{
                font-size: 0.11rem;
            }
        }
        .btn{
            height: 100%;
            display: inline-block;
            vertical-align: top;
        }
    }
    .pageIndex{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 3.55rem;
        width: 0.14rem;
        height: 0.76rem;
        z-index: 10;
        overflow: hidden;
        margin: auto;
    }
    .pageIndex img{
        width: 100%;
        height: 100%;
    }
    .arrow{
        position: fixed;
        width: 31px;
        height: 18px;
        left: 50%;
        transform: translate(-50%,-50%);
        bottom: 50px;
        z-index: 11;
    }
    /*pc端适配*/
    @media only screen and (min-width: 640px) {
        .swiper-container{
            .swiper-wrapper{
                .slide{
                    font-size: 102px;
                    .title{
                        font-size: 0.44em;
                        top: 3em;
                    }
                    .content{
                        top: 1.93em;
                        .slidep{
                            margin-top: 8px;
                        }
                        p{
                            height: 23px;
                            line-height: 23px;
                            font-size: 13px;
                            .color1{
                                font-size: 14px;
                            }
                            .color2{
                                font-size: 14px;
                            }
                            .color3{
                                font-size: 20px;
                            }
                        }
                    }
                    .contentData{

                    }
                }
                .slide1{
                    .contentData{
                        width: 265px;
                        height: 154px;
                        top: 327px;
                        .contentDataGood{
                            width: 84px;
                            height: 46px;
                            margin-top: 3px;
                            margin-left: 3px;
                            .img{
                                width: 100%;
                                height: 84px;
                            }
                            .goodtitle{
                                font-size: 12px;
                                height:17px;
                                line-height: 17px;
                            }
                            .price{
                                font-size: 11px;
                                line-height: 20px;
                                height: 20px;
                                .text{
                                    font-size: 14px;
                                    font-weight: 500;
                                }
                            }
                            .btn{
                                width: 75px;
                                height: 18px;
                                font-size: 11px;
                            }
                        }
                    }
                }
                .slide2{
                    .contentData{
                        width: 265px;
                        height: 190px;
                        top: 297px;
                        .textcontent{
                            width: 123px;
                            height: 176px;
                            margin-top: 7px;
                            margin-left: 4px;
                            margin-right: 4px;
                            font-size: 14px;
                            img{
                                height: 85px;
                            }
                            .price{
                                padding-right: 10px;
                                height: 16px;
                                line-height: 16px;
                                left: -10px;
                                top: 69px;
                                text-indent: 13px;
                                border-radius: 8px;
                                font-size: 9px;
                            }
                            .coursetitle{
                                font-size: 12px;
                                line-height: 16px;
                                margin-top: 5px;
                            }
                            .teacher{
                                font-size: 11px;
                                margin-top: 4px;
                            }
                            .btn{
                                height: 24px;
                                line-height: 24px;
                                font-size: 11px;
                                .size{
                                    font-size: 13px;
                                }
                            }
                        }
                        .textcontent:last-child{
                            margin-left: 6px;
                        }
                    }
                }
                .slide3{
                    .contentData{
                        width: 265px;
                        height: 185px;
                        top: 299px;
                        .text{
                            width: 245px;
                            height: 45px;
                            margin-left: 10px;
                            padding-top: 10px;
                            padding-bottom: 5px;
                            .img{
                                width: 45px;
                                height: 45px;
                            }
                            .slide3content{
                                width: 200px;
                                height: 45px;
                                span{
                                    font-size: 13px;
                                    padding-left: 10px;
                                }
                            }
                        }
                    }
                }
                .slide4{
                    .contentData{
                        width: 265px;
                        height: 214px;
                        top: 294px;
                        .slide4course{
                            width: 245px;
                            height: 72px;
                            margin-left: 10px;
                            margin-top: 14px;
                            .slide4img{
                                width: 100px;
                            }
                            .slide4price{
                                padding-right: 10px;
                                height: 16px;
                                line-height: 16px;
                                left: -10px;
                                top: 56px;
                                text-indent: 13px;
                                font-size: 9px;
                            }
                            .slide4content{
                                 left: 108px;
                                 width: 135px;
                                 font-size: 13px;
                            }
                            .slide4btn{
                                width: 135px;
                                height: 22px;
                                line-height: 22px;
                                top: 50px;
                                left: 108px;
                                font-size: 13px;
                                .size{
                                    font-size: 11px;
                                }
                            }
                        }
                        .contentDataGood{
                            height: 114px;
                            .img{
                                width: 75px;
                                height: 75px;
                            }
                        }
                    }
                }
                .slide5{
                    .contentData{
                        width: 265px;
                        height: 116px;
                        top: 342px;
                        h1{
                            font-size: 14px;
                            margin-top: 15px;
                            height: 20px;
                            line-height: 20px;
                        }
                        div{
                            padding-left: 12px;
                            padding-right: 11px;
                            margin-top: 6px;
                            height: 60px;
                            font-size: 13px;
                            .size{
                                font-size: 14px;
                            }
                        }
                    }
                    .notice{
                        font-size: 11px;
                        height: 20px;
                        line-height: 20px;
                        top: 490px;
                    }
                }
                
            }
        }
        .footer-btn{
            .btn1{
                font-size: 14px;
            }
            .btn2{
                .p1{
                    font-size: 14px;
                    padding-top: 7px;
                }
                .p2{
                    font-size: 13px;
                }
            }
            .btn3{
                height: 50px;
                line-height: 50px;
                font-size: 14px;
                span{
                    font-size: 11px;
                }
            }
        }
        .pageIndex{
            left: 485px;
            width: 14px;
            height: 76px;
        }
    }
    /*兼容小屏手机*/
    @media only screen and (max-width: 320px) and (max-height: 480px){
        .swiper-container{
            .swiper-wrapper{
                .slide{
                    font-size: 55px;
                    .title{
                        font-size: 0.44em;
                        top: 3em;
                    }
                    .content{
                        top: 113px;
                        p{
                            height: 17px;
                            line-height: 17px;
                            font-size: 12px;
                            .color1{
                                font-size: 13px;
                            }
                            .color2{
                                font-size: 13px;
                            }
                            .color3{
                                font-size: 16px;
                            }
                        }
                    }
                    .contentData{

                    }
                }
                .slide1{
                    background: url('//pic.davdian.com/free/2017/06/05/smallbg2.png') no-repeat;
                    .contentData{
                        width: 215px;
                        height: 134px;
                        top: 200px;
                        left: 50%;
                        transform: translate(-50%,0);
                        .contentDataGood{
                            width: 68px;
                            height: 46px;
                            margin-top: 3px;
                            margin-left: 3px;
                            .img{
                                width: 100%;
                                height: 68px;
                            }
                            .goodtitle{
                                font-size: 12px;
                                height:17px;
                                line-height: 17px;
                                margin-top: 4px;
                            }
                            .price{
                                font-size: 11px;
                                line-height: 18px;
                                height: 18px;
                                .text{
                                    font-size: 14px;
                                    font-weight: 500;
                                }
                            }
                            .btn{
                                width: 68px;
                                height: 17px;
                                margin-top: 2px;
                                line-height: 18px;
                                font-size: 11px;
                            }
                        }
                    }
                }
                .slide2{
                    background: url('//pic.davdian.com/free/2017/06/05/smallbg5.png') 8px no-repeat;
                    .contentData{
                        width: 225px;
                        height: 160px;
                        top: 180px;
                        .textcontent{
                            width: 103px;
                            height: 148px;
                            margin-top: 7px;
                            margin-left: 4px;
                            margin-right: 4px;
                            font-size: 14px;
                            img{
                                height: 70px;
                            }
                            .price{
                                padding-right: 10px;
                                height: 16px;
                                line-height: 16px;
                                left: -10px;
                                top: 54px;
                                text-indent: 13px;
                                border-radius: 8px;
                                font-size: 9px;
                            }
                            .coursetitle{
                                font-size: 12px;
                                line-height: 16px;
                                margin-top: 5px;
                            }
                            .teacher{
                                font-size: 11px;
                                margin-top: 3px;
                            }
                            .btn{
                                height: 19px;
                                line-height: 19px;
                                font-size: 11px;
                                .size{
                                    font-size: 13px;
                                }
                            }
                        }
                        .textcontent:last-child{
                            margin-left: 6px;
                        }
                    }
                }
                .slide3{
                    background: url('//pic.davdian.com/free/2017/06/05/smallbg6.png') 3px no-repeat;
                    .contentData{
                        width: 225px;
                        height: 143px;
                        top: 182px;
                        .text{
                            width: 205px;
                            height: 35px;
                            margin-left: 10px;
                            padding-top: 7px;
                            padding-bottom: 5px;
                            .img{
                                width: 35px;
                                height: 35px;
                            }
                            .slide3content{
                                width: 170px;
                                height: 35px;
                                span{
                                    font-size: 12px;
                                    padding-left: 10px;
                                }
                            }
                        }
                    }
                }
                .slide4{
                    background: url('//pic.davdian.com/free/2017/06/05/smallbg1.png') 5px no-repeat;
                    .content{
                        top: 113px;
                    }
                    .contentData{
                        width: 215px;
                        height: 157px;
                        top: 191px;
                        .slide4course{
                            width: 215px;
                            height: 52px;
                            margin-left: 10px;
                            margin-top: 6px;
                            .slide4img{
                                width: 80px;
                            }
                            .slide4price{
                                padding-right: 10px;
                                height: 16px;
                                line-height: 16px;
                                left: -10px;
                                top: 36px;
                                text-indent: 13px;
                                font-size: 9px;
                            }
                            .slide4content{
                                 left: 88px;
                                 width: 105px;
                                 font-size: 11px;
                                 line-height: 15px;
                            }
                            .slide4btn{
                                width: 105px;
                                height: 16px;
                                line-height: 17px;
                                top: 35px;
                                left: 88px;
                                font-size: 13px;
                                .size{
                                    font-size: 11px;
                                }
                            }
                        }
                        .contentDataGood{
                            height: 93px;
                            .img{
                                width: 54px;
                                height: 54px;
                            }
                            .btn{
                                width: 58px;
                                height: 16px;
                                font-weight: 200;
                            }
                        }
                    }
                }
                .slide5{
                    background: url('//pic.davdian.com/free/2017/06/05/smallbg3.png') no-repeat;
                    .content{
                        .slidep{
                            margin-top: 4px;
                        }
                    }
                    .contentData{
                        width: 225px;
                        height: 100px;
                        top: 205px;
                        h1{
                            font-size: 14px;
                            margin-top: 6px;
                            height: 20px;
                            line-height: 20px;
                        }
                        div{
                            padding-left: 12px;
                            padding-right: 11px;
                            /*margin-top: 6px;*/
                            height: 60px;
                            font-size: 12px;
                            .size{
                                font-size: 13px;
                            }
                        }
                    }
                    .notice{
                        font-size: 11px;
                        height: 20px;
                        line-height: 20px;
                        top: 318px;
                    }
                }
                .footer-btn{
                    .btn1{
                        font-size: 14px;
                    }
                    .btn2{
                        .p1{
                            font-size: 14px;
                            padding-top: 7px;
                        }
                        .p2{
                            font-size: 13px;
                        }
                    }
                    .btn3{
                        font-size: 14px;
                        span{
                            font-size: 11px;
                        }
                    }
                }
            }
        }
        .pageIndex{
            width: 14px;
            height: 76px;
            left: 300px;
        }
    }
</style>