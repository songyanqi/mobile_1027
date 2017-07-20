<template>
    <div class='container'>
        <img src="//pic.davdian.com/free/2017/06/26/privile_bg.png?x-oss-process=image/quality,Q_60/format,jpg">
        <div v-if='state!=3' class='btn1'></div>
        <div class='btn' @click='beNumber' v-if='state!=3'>马上成为会员</div>
    </div>
    

</template>


<script>
    let axios = require("axios");
    require('es6-promise').polyfill();
    import { strSign } from "../../../../utils/utils.es6";
    import utils from "../../../../utils/utils.es6";
    export default{
        data:function(){
            return{
                app: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
                state:null
            }
        },
        created:function () {
            this.remSize()
            this.init()
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
                console.log('init',utils.utils.getUserState())
                this.state = utils.utils.getUserState()
            },
            beNumber(){
                window.location.href = '/index.php?c=ShopGoods&a=index&id=348&c=ShopGoods&a=index&id=348'
            }
        },
        components:{
        }
    }
</script>

<style scoped lang='sass'>
    .container{
        width: 100%;
        img{
            width: 100%;
            vertical-align: top;
        }
        .btn{
            width: 100%;
            height: 48px;
            max-width: 640px;
            vertical-align: top;
            background: -webkit-linear-gradient(left, #FF5B5B, #FA1862);
            font-size: 14px;
            line-height: 48px;
            text-align: center;
            color: #fff;
            position: fixed;
            bottom: 0;
        }
        .btn1{
            width: 100%;
            height: 48px;
            vertical-align: top;
            font-size: 14px;
            line-height: 48px;
            text-align: center;
        }
    }
</style>