<template>
    <div :style="{ marginTop:data.marginTop + 'px' }">
        <tt_com_0 :data="data"></tt_com_0>
        <div class='dvk1_container' :style="styleObject">
            <a @click.stop="clickAnalysis" :href="data.body.dataList[0].command.content" :position="data.position">
                <div class='dvk1_img'>
                    <img class="newImage" v-lazy="imgObject(data.body.dataList[0].courseCover)" />
                    <div class='dvk1_money' v-if='data.body.dataList[0].price && data.body.dataList[0].price!="¥ 0.00"' v-text='data.body.dataList[0].price'></div>
                </div>
                <div class='dvk1_content'>
                    <div class='dvk1_text' v-text='data.body.dataList[0].courseTitle'></div>
                    <div class='dvk1_name'>
                        <span v-text='data.body.dataList[0].teacherName'></span>
                    </div>
                    <div class='dvk1_share'>
                        <span class='dvk1_share_left'>
                            <span v-if="livenow(data.body.dataList[0])" class="circle"></span> 
                            <span v-if='livetext(data.body.dataList[0])'>{{ livetext(data.body.dataList[0]) }}</span>
                            <span v-if='!livetext(data.body.dataList[0])' v-text='data.body.dataList[0].startTimestamp'></span>
                        </span>
                        <span class='dvk1_share_right'><span v-text='data.body.dataList[0].readTimes'></span></span>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>


<script>
    import layout from "../layout.es6"
    import * as tt_com_0 from './tt_com_0.vue'
    export default {
        data(){
            return {
                msg: 'hello vue',
                flag: true
            }
        },
        props: ['data'],
        computed:{
            dataList: function () {
                return this.data || []
            },
            marginTop:function () {
                return this.data.marginTop || 0;
            }

        },
        created(){
            this.styleObject = layout.styleObjectDvk(this.data);
        },
        components: {
            tt_com_0:tt_com_0
        },
        methods:{
            imgObject:function (imgSrc) {
                return{
                    src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                    error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                    loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
                }
            },
            clickAnalysis:function(item) {
                layout.clickAnalysis(item,this,'body');
            },
            livenow:function (item) {
                var timestamp = Date.parse(new Date());

                if(item.startTime*1000 < timestamp && item.endTime == 0){
                    return true;
                }
            },
            livetext:function (item) {
                var startTimestamp = item.startTime*1000;
                var endTimestamp = item.endTime*1000;
                var timestamp = Date.parse(new Date());//当前时间
                var localeDate = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
                var today = Date.parse(new Date(new Date(localeDate).getTime()+24*60*60*1000-1));//今天晚上23.59.59
                var tomorrow = Date.parse(new Date(new Date(localeDate).getTime()+48*60*60*1000-1));//明天晚上23.59.59
                if(endTimestamp != 0){
                    return false;
                }
                if(startTimestamp < timestamp && endTimestamp == 0){
                    return "正在直播";
                }else if(startTimestamp <= today && startTimestamp > timestamp ){
                    // return "今天 " + new Date(parseInt(startTimestamp)).toString().slice(15,24);
                    return "今天 " + new Date(parseInt(startTimestamp)).toString().slice(15,21);
                }else if(startTimestamp <=tomorrow && startTimestamp> today){
                    // return "明天 " + new Date(parseInt(startTimestamp)).toString().slice(15,24);
                    return "明天 " + new Date(parseInt(startTimestamp)).toString().slice(15,21);
                }else if(startTimestamp > tomorrow){
                    var starttime = new Date(parseInt(startTimestamp));
                    return starttime.getUTCFullYear() + "-" + (starttime.getMonth()+1) +"-"+starttime.getDate()+" "+(starttime.getHours()<10?'0':'')+starttime.getHours()+":"+(starttime.getMinutes()<10?'0':'')+starttime.getMinutes()
                }
            }
        }
    }
</script>
<style scoped>
    .dvk1_container{
        height: 1.08rem;
        position: relative;
    }
    .dvk1_img{
        height: 0.88rem;
        width: 1.27rem;
        margin: 0.1rem;
        position: relative;
        vertical-align: top;
        display: inline-block;
        overflow: hidden;
        background: #fff;
    }
    .dvk1_content{
        display: inline-block;
        vertical-align: top;
        width: 2.18rem;
    }
    .dvk1_text{
        margin: .1rem 0 0 0;
        max-height: 3em;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        font-size: 0.14rem;
        color: #333333;
        margin-bottom: 0.05rem;
    }
    .dvk1_name{
        font-size: 0.12rem;
        height: 0.17rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .dvk1_share{
        width: 2.1rem;
        margin: 0 .1rem .12rem 0rem;
        margin-top: 0.15rem;
        font-size: 0.11rem;
        height: 0.16rem;
        position: absolute;
        line-height: 0.16rem;
        bottom: 0;
        color: #999;
    }
    .dvk1_border{
        border-left: 0.5px solid #999;
        margin-left: 0.05rem;
        /*margin-right: 0.07rem;*/
    }
    .dvk1_imgNav{
        position: absolute;
        top: 0.3rem;
        left: 0.3rem;
        width: 0.3rem;
        height: 0.3rem;
    }
    .dvk1_share_left{
        float: left;
        width: 1.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .dvk1_share_right{
        float: right;
    }
    .dvk1_money{
        position: absolute;
        top: 0.05rem;
        left: 0.05rem;
        height: 0.18rem;
        line-height: 0.2rem;
        padding-left: 0.03rem;
        padding-right: 0.03rem;
        text-align: center;
        color: #fff;
        font-size: 0.11rem;
        background: #FF4A7D;
    }
    .circle{
        background-color: #92FDE0;
        display: inline-block;
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
    .newImage {
        object-fit: cover;
        object-position: center;
        display: inline;
        border: none;
        width: 100%;
    }
</style>