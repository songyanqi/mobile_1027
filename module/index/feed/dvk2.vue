<template>
    <div :style="{ marginTop:data.marginTop + 'px' }">
        <tt_com_0 :data="data"></tt_com_0>
        <div class='dvk2_container' :style="styleObject">
            <a @click.stop="clickAnalysis" :href="data.body.dataList[0].command.content" :position="data.position">
               <div class='dvk2_img'>
                    <img class="newImage" v-lazy="imgObject(data.body.dataList[0].courseCover)"/>
                   <div class='dvk2_money' v-if='data.body.dataList[0].price && data.body.dataList[0].price!="¥ 0.00"' v-text='data.body.dataList[0].price'></div>
                   <div class='dvk2_startTime' v-if='livetext(data.body.dataList[0])'>
                       <span v-if="livenow(data.body.dataList[0])" class="circle"></span> 
                        <span v-if='livetext(data.body.dataList[0])'>{{ livetext(data.body.dataList[0]) }}</span>
                        <span v-if='!livetext(data.body.dataList[0])' v-text='data.body.dataList[0].startTimestamp'></span>
                   </div>
               </div>
               <div class='dvk2_text'>
                   <div class='dvk2_text_title' v-text='data.body.dataList[0].courseTitle'></div>
                   <div class='dvk2_text_content'>
                       <span class='dvk2_text_name' v-text='data.body.dataList[0].teacherName'></span>
                       <span class='dvk2_text_popular'><span v-text='data.body.dataList[0].readTimes'></span></span>
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
                msg: 'hello vue'
            }
        },
        props: ['data'],
        computed:{
            dataList: function () {
                return this.data || []
            }
        },
        computed: {
           
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
    .dvk2_container{
        height: 3.06rem;
        width: 100%;
        background: #fff;
        padding-top: 0.1rem;
    }
    .dvk2_img{
        width: 3.55rem;
        height: 2.52rem;
        margin-left: 0.1rem;
        position: relative;
    }
    .dvk2_money{
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
    .dvk2_startTime{
        position: absolute;
        width: 100%;
        height: 0.2rem;
        color: #fff;
        text-align: center;
        line-height: 0.2rem;
        background: -webkit-gradient(linear,left top,left bottom,color-stop(0,transparent),color-stop(50%,rgba(0,0,0,.35)),color-stop(100%,rgba(0,0,0,.7)),color-stop(100%,#fff));
        bottom: 0;
    }
    .dvk2_text{
        width: 3.55rem;
        height: 0.4rem;
        margin-left: 0.1rem;
        margin-top: 0.05rem;
    }
    .dvk2_text_title{
        width: 100%;
        height: 0.17rem;
        line-height: 0.17rem;
        font-size: 0.12rem;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .dvk2_text_content{
        width: 100%;
        height: 0.17rem;
        line-height: 0.17rem;
        font-size: 0.11rem;
        color: #999999;
    }
    .dvk2_text_name{
        float: left;
        width: 2.7rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .dvk2_text_popular{
        float: right;
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