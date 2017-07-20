<template>
    <div class='container'>
        <partner-title v-if='!app'></partner-title>
        <div class='listBlock' v-if='!app'></div>
        <div class='list'>
            <div class='listLi' @click='gohref'>
                <img src="//pic.davdian.com/free/2017/06/26/myincome.png" class='listImg'>
                <div class='listContent'>我的收入</div>
                <div class='listArrow'></div>
            </div>
        </div>
        <div class='pageAlert'>其它功能 敬请期待</div>
    </div>
</template>

<script>
    // let axios = require("axios");
    // require('es6-promise').polyfill();
    import partnerTitle from "./partner_manage_title.vue";
    import { strSign } from "../../../../utils/utils.es6";
    import app from "../../../../utils/appInterface.es6";
    // import wx from "../../../../utils/WXShare.es6"
    export default{
        data:function(){
            return{
                app: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
                type:'volvo',
            }
        },
        created:function () {
            this.remSize()
            var that = this
            // setInterval(function (){
            //     console.log(that.type)
            // },1000)
            // this.init()
            // this.wxshare()
        },
        computed: {
            
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
            gohref(){
                window.location.href = 'http://s.davdian.com/index.php?m=admin&c=invite&a=cityPartner'
            },
        },
        components:{
            partnerTitle:partnerTitle
        }
    }
</script>
<style type="text/css">
    body{
        background: #F7F7F7;
        font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;
    }
</style>
<style scoped lang='sass'>
    .container{
        width: 100%;
        max-width: 640px;
        .listBlock{
            height: 44px;
            width: 100%;
        }
        .list{
            width: 100%;
            font-size: 0;
            .listLi{
                width: 100%;
                height: 40px;
                background: #fff;
                .listImg{
                    display: inline-block;
                    vertical-align: top;
                    width: 15px;
                    height: 16px;
                    margin-top: 12px;
                    margin-left: 13px;
                    float: left;
                }
                .listContent{
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;
                    color: #333333;
                    height: 40px;
                    line-height: 41px;
                    margin-left: 11px;
                }
                .listArrow{
                    display: inline-block;
                    font-size: 14px;
                    margin-top: 16px;
                    margin-left: 10px;
                    vertical-align: 0;
                    float: right;
                    width: 10px;
                    height: 10px;
                    border-right: 1px solid #999999;
                    border-top: 1px solid #999999;
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    margin-right: 10px;
                }
            }
        }
        .pageAlert{
            position: fixed;
            width: 100%;
            text-align: center;
            font-size: 0.14rem;
            color: #666666;
            top: 50%;
            bottom: 0;
            right: 0;
            left: 0;
        }
    }
</style>