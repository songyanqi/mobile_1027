<template>
    <div id='comment'>
        <comment-title :rightshow='starIndex && textLength>0' v-on:submit='submit' v-on:back='back'></comment-title>
        <div class='container'>
            <textarea class='text' placeholder="输入你想说的话" v-model.trim='text' maxlength="500"></textarea>
            <div class='number'>
                <span>{{textLength}}/{{500-textLength}}</span>
            </div>
        </div>
        <div class='star'>
            <span class='title'>课程评分</span>
            <div class='starImg'>
                <img :src="starImg">
                <div class='starImg1 starImg_btn' @click='starImg_btn1'></div>
                <div class='starImg2 starImg_btn' @click='starImg_btn2'></div>
                <div class='starImg3 starImg_btn' @click='starImg_btn3'></div>
                <div class='starImg4 starImg_btn' @click='starImg_btn4'></div>
                <div class='starImg5 starImg_btn' @click='starImg_btn5'></div>
            </div>
            
        </div>
        <div class='mask' @click='cancel' v-if='alertContainer'></div>
        <div class='alertContainer' v-if='alertContainer'>
            <div class='alertContent'>评论还没提交呢，确定离开吗？</div>
            <div class='alertBtnAll'>
                <div class='alertBtn1' @click='btn_no'>取消</div>
                <div class='alertBtn2' @click='btn_yes'>确定</div>
            </div>
        </div>
        <div class='alertContainer1' v-if='alertFlag'>还没写文字/评分哦</div>
        <div class='alertContainer1' v-if='alertFlag1'>笔记至少12个字哦</div>
        <div class='alertContainer1' v-if='alertFlag2'>保存草稿成功</div>
        <div class='alertContainer1' v-if='alertFlag3'>评论成功</div>
    </div>
</template>


<script>
    import layout from "./index/layout.es6"
    import lay from './layout/api.es6'
    import common from "./common/common.es6";
    var commentTitle = require("../module/dvkcommentTitle.vue");
    let axios = require("axios");
    require('babel-polyfill');
    require('es6-promise').polyfill();

    export default{
        data:function(){
            return{
                feedList:[],
                text:'',
                textLength:0,
                starIndex:0,
                alertContainer: false,
                alertFlag:false,
                alertFlag1:false,
                alertFlag2:false,
                alertFlag3:false,
                userId: 931126,
                starImg:'//pic.davdian.com/free/2017/05/11/commentStarnew.png',
                inApp:window.Units&&Units.isApp()
            }
        },
        created:function () {
            
        },
        mounted:function () {
            this.init()
            this.remSize();
        },
        watch:{
            text:function(val,oldval){
                this.textLength = val.length
            }
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
                $('.text')[0].focus()
                if (lay.sStorageGet('commentList', this.userId)){
                    this.text = lay.sStorageGet('commentList', this.userId)
                }
            },
            submit(b){
                var that = this
                if (b){
                    if (this.textLength<12){
                        this.alertFlag1 = true
                        setTimeout(function(){
                            that.alertFlag1 = false
                        },2000)
                    } else{
                        var obj = {}
                        obj.obj = {
                            courseId: window.courseId,
                            content: that.text,
                            score: that.starIndex 
                        }
                        axios.post('/api/mg/content/course/lectureNotes',lay.strSign(obj))
                            .then(function (respone) {
                                if (respone.data.code == 0){
                                    that.alertFlag3 = true
                                    sessionStorage.removeItem('commentList')
                                    setTimeout(function(){
                                        window.history.back()
                                    },1000)
                                } else {
                                    alert(respone.data.data.msg)
                                }
                                console.log(respone, 22222222)
                            })
                            .catch(function (error) {
                                console.log(error,11111111)
                            });
                    }
                }else {
                    this.alertFlag = true
                    setTimeout(function(){
                        that.alertFlag = false
                    },2000)
                }
            },
            cancel(){
                this.alertContainer = false
            },
            starImg_btn1(){
                this.starIndex = 1
                this.starImg = '//pic.davdian.com/free/2017/05/11/commentStar1.png'
            },
            starImg_btn2(){
                this.starIndex = 2
                this.starImg = '//pic.davdian.com/free/2017/05/11/commentStar2.png'
            },
            starImg_btn3(){
                this.starIndex = 3
                this.starImg = '//pic.davdian.com/free/2017/05/11/commentStar3.png'
            },
            starImg_btn4(){
                this.starIndex = 4
                this.starImg = '//pic.davdian.com/free/2017/05/11/commentStar4.png'
            },
            starImg_btn5(){
                this.starIndex = 5
                this.starImg = '//pic.davdian.com/free/2017/05/11/commentStar5.png'
            },
            back(){
                if (this.textLength > 0){
                    this.alertContainer = true
                } else {
                    let obj = {}
                    obj[this.userId] = this.text
                    lay.sStorageSet('commentList', obj)
                    window.history.back()
                }
            },
            btn_yes(){
                let obj = {}
                obj[this.userId] = this.text
                lay.sStorageSet('commentList', obj)
                setTimeout(function(){
                    window.history.back()
                },1000)
                this.alertContainer = false
                this.alertFlag2 = true
            },
            btn_no(){
                let obj = {}
                obj[this.userId] = ''
                lay.sStorageSet('commentList', obj)
                window.history.back()
            }
        },
        components:{
            commentTitle:commentTitle
        }
    }
</script>
<style scoped lang='sass'>
    .container{
        width: 3.55rem;
        margin-top: 0.1rem;
        margin-left: 0.1rem;
        height: 2rem;
        background: #fff;
        border-radius: 0.4px;
        position: relative;
        .text{
            width: 3.35rem;
            height: 1.6rem;
            margin-top: 0.1rem;
            margin-left: 0.1rem;
            color: #333333;
            font-size: 0.14rem;
            resize: none;
            color:#333333;
        }
        .number{
            position: absolute;
            right: 0.1rem;
            bottom: 0.1rem;
            font-size: 0.14rem;
            color: #D0D0D0;
        }
        input:-moz-placeholder,textarea:-moz-placeholder {   
            color: #D0D0D0;   
        }   
          
        input:-ms-input-placeholder,textarea:-ms-input-placeholder {   
            color: #D0D0D0;   
        }   
        input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {   
            color: #D0D0D0;   
        }
    }
    .star{
        margin-top: 0.2rem;
        margin-left: 0.1rem;
        font-size: 0;
        .title{
            color: #333333;
            font-size: 0.14rem;
            display: inline-block;
            vertical-align: middle;
        }
        .starImg{
            width: 1.4rem;
            margin-left: 0.2rem;
            display: inline-block;
            vertical-align: middle;
            position: relative;
            img{
                width: 100%;
            }
            .starImg_btn{
                width: 0.28rem;
                height: 0.26rem;
                opacity: 0;
                position: absolute;
                top: 0;
            }
            .starImg2{
                left: 0.28rem;
            }
            .starImg3{
                left: 0.56rem;
            }
            .starImg4{
                left: 0.84rem;
            }
            .starImg5{
                left: 1.12rem;
            }
        }
    }
    .mask{
        background: #000;
        opacity: 0.4;
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .alertContainer{
        position: fixed;
        z-index: 2;
        width: 2.7rem;
        height: 1.16rem;
        background: #fff;
        margin-left:0.52rem;
        border-radius: 6px;
        .alertContent{
            width: 100%;
            height: 0.75rem;
            line-height: 0.75rem;
            text-align: center;
            font-size: 0.14rem;
            color: #666;
            border-bottom: 0.5px solid #eee;
        }
        .alertBtnAll{
            font-size: 0;
            .alertBtn1{
                display: inline-block;
                vertical-align: top;
                width: 50%;
                box-sizing: border-box;
                font-size: 0.17rem;
                color: #666;
                height: 0.4rem;
                line-height: 0.4rem;
                text-align: center;
            }
            .alertBtn2{
                display: inline-block;
                vertical-align: top;
                width: 50%;
                box-sizing: border-box;
                font-size: 0.17rem;
                height: 0.4rem;
                line-height: 0.4rem;
                color:#FF4A7D;
                text-align: center;
                border-left: 0.5px solid #eee;
            }
        }
    }
    .alertContainer1{
        position: fixed;
        display: inline-block;
        background: #000;
        padding-left: 0.15rem;
        z-index: 2;
        padding-right: 0.15rem;
        height: 0.4rem;
        line-height: 0.4rem;
        opacity: 0.65;
        color: #fff;
        left: 50%;
        border-radius: 4px;
        transform: translate(-50%,-50%);
    }
</style>