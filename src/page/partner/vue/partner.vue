<template>
    <div class='container'>
        <div class='guide1'>
            <img src="//pic.davdian.com/free/2017/06/27/partner_bg.png?x-oss-process=image/quality,Q_80/format,jpg" class='guide1Bg'>
            <div class='guide1Title guide1all'>您已成功开通大V店会员</div>
            <p class='p1'>请选择您所在的区域</p>
            <p class='p2'>我们将据此为您推荐合适的线下活动</p>
            <div class='p3' v-if='dataList.area_rank_city' v-text='dataList.area_rank_city.region_name'>北京</div>
            <select class='p4' v-model='type' v-bind:class="{ p4Select: type!='-1' }">
                <option value ="-1" selected = "true">请选择您所在的区域</option>
                <option :value ="item.region_id" v-for='item in dataList.area_rank_county' v-text='item.region_name'></option>
              <!-- <option value ="saab" selected = "true">Saab</option>
              <option value="opel" selected = "false">Opel</option>
              <option value="audi">Audi</option> -->
            </select>
            <span class='p7' v-if='type == -1'></span>
            <div class='p5'></div>
            <div class="p6">*请认真选择，提交后不支持修改</div>
            <div class='guide1Btn guide1all' @click='goProfile'>提交并领取239元红包</div>
        </div>
    </div>
</template>

<script>
    let axios = require("axios");
    require('es6-promise').polyfill();
    import { strSign } from "../../../../utils/utils.es6";
    import app from "../../../../utils/appInterface.es6";
    import dialog from '../../../../utils/dialog.es6';
    export default{
        data:function(){
            return{
                app: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
                type:-1,
                dataList:{}
            }
        },
        created:function () {
            this.remSize()
            this.init()
            var that = this
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
            init(){
                var that = this
                axios.post('/api/mg/user/cityinvite/area',strSign())
                    .then(function (respone) {
                        if(respone.data.code == 0){
                            // respone.data.data.area_rank_county.unshift({"region_id":"-1","region_name":"请选择您所在的区域"})
                            that.dataList = respone.data.data
                        }else {
                            window.location.href = window.location.host
                        }
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            goProfile(){
                var that = this
                if (that.type == -1){
                    dialog.alert("请选择一个地址！！！");
                    return
                }
                axios.post('/api/mg/user/cityinvite/commitArea',strSign({cityId:that.dataList.area_rank_city.region_id,'countyId':that.type}))
                    .then(function (respone) {
                        console.log('data-->', respone)
                        if(respone.data.code == 0){
                            if (respone.data.data.isCommit == 1){
                                window.location.href = respone.data.data.url
                            } else {
                                dialog.alert("isCommit:"+respone.data.data.isCommit);
                            }
                        } else {
                            dialog.alert(respone.data.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            }
        },
        components:{
        }
    }
</script>
<style type="text/css">
    body{
        background: url('//pic.davdian.com/free/2017/06/24/partner_bg2.png');
        font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;
    }
</style>
<style scoped lang='sass'>
    .container{
        width: 100%;
        position: relative;
        max-width: 640px;
        .guide3Container1{
            width: 100%;
            height: 0.7rem;
            background: #fff;
        }
        .bottomImg{
            position: absolute;
            top: 4.65rem;
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
            .p1{
                position: absolute;
                top: 1.91rem;
                font-size: 0.14rem;
                color: #333333;
                width: 100%;
                max-width: 640px;
                text-align: center;
            }
            .p2{
                position: absolute;
                top: 2.1rem;
                font-size: 0.14rem;
                color: #333333;
                width: 100%;
                max-width: 640px;
                text-align: center;
            }
            .p3{
                position: absolute;
                top: 2.57rem;
                width: 2.95rem;
                height: 0.4rem;
                line-height: 0.4rem;
                left: 50%;
                margin-left: -1.475rem;
                background: #F9F9F9;
                border-radius: 100px;
                /*text-indent: 0.2rem;*/
                padding-left: 0.2rem;
                color: #BBBBBB;
                font-size: 0.14rem;
                box-sizing: border-box;
            }
            .p4{
                position: absolute;
                top: 3.1rem;
                width: 2.95rem;
                height: 0.4rem;
                line-height: 0.4rem;
                left: 50%;
                margin-left: -1.475rem;
                background: #F9F9F9;
                border-radius: 100px;
                /*text-indent: 0.2rem;*/
                padding-left: 0.2rem;
                color: #999999;
                font-size: 0.14rem;
                border: 0px;
                appearance:none;
                -moz-appearance:none;
                -webkit-appearance:none;
            }
            .p4Select{
                color: #333;
            }
            .p5{
                position: absolute;
                top: 3.28rem;
                width: 0;
                height: 0;
                right: 0.55rem;
                border-width:0.06rem 0.06rem 0;
                border-style:solid;
                border-color:#999999 transparent transparent;/*黄 透明 透明 */
                position:absolute;
            }
            .p6{
                position:absolute;
                top: 4.37rem;
                color:#666;
                font-size: 0.12rem;
                width: 100%;
                max-width: 640px;
                text-align: center;
            }
            .p7{
                position: absolute;
                top: 3.21rem;
                left: 0.6rem;
                height: 0.18rem;
                border-right: 2px solid #00A0E9;
            }
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
            .guide1Btn{
                width: 2.75rem;
                height: 0.4rem;
                line-height: 0.4rem;
                border-radius: 200px;
                background: -webkit-linear-gradient(left, #FF5B5B, #FB1C62);
                top: 3.8rem;
                left: 50%;
                transform: translate(-50%,0);
                color: #FFFFFF;
                font-size: 0.14rem;
                text-align: center;
                box-shadow: 0px 3px 8px #FEC2CE;
                font-weight: bolder;

            }
        }
    }
</style>