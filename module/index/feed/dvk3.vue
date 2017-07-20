<template>
    <div :style="{ marginTop:data.marginTop + 'px' }">
        <tt_com_0 :data="data"></tt_com_0>
        <div class='dvk3_container' :style="styleObject">
               <div class='dvk3_content1'>
                    <a @click.stop="clickAnalysis" :href="data.body.dataList[0].command.content" :position="data.position">
                       <div class='dvk3_img'>
                             <img class="newImage" v-lazy="imgObject(data.body.dataList[0].courseCover)"/>
                            <div class='dvk3_money' v-if='data.body.dataList[0].price && data.body.dataList[0].price!="¥ 0.00"' v-text='data.body.dataList[0].price'></div>
                            <div class='dvk3_startTime' v-if='livetext(data.body.dataList[0])'>
                                <span v-if="livenow(data.body.dataList[0])" class="circle"></span> 
                                <span v-if='livetext(data.body.dataList[0])'>{{ livetext(data.body.dataList[0]) }}</span>
                                <span v-if='!livetext(data.body.dataList[0])' v-text='data.body.dataList[0].startTimestamp'></span>
                            </div>
                       </div>
                       <div class='dvk3_text' v-text='data.body.dataList[0].courseTitle'></div>
                       <div class='dvk3_detail'>
                            <span class='dvk3_name' v-text='data.body.dataList[0].teacherName'><img src="//pic.davdian.com/free/2017/03/06/official.png" class='dvk3_name_titlepic'></span>
                            <span class='dvk3_popular'><span v-text='data.body.dataList[0].readTimes'></span></span>
                        </div>
                    </a>
               </div>
               <div class='dvk3_content2'>
                   <a @click.stop="clickAnalysis" :href="data.body.dataList[1].command.content" :position="data.position">
                       <div class='dvk3_img'>
                            <img class="newImage" v-lazy="imgObject(data.body.dataList[1].courseCover)"/>
                            <div class='dvk3_money' v-if='data.body.dataList[1].price && data.body.dataList[1].price!="¥ 0.00"' v-text='data.body.dataList[1].price'></div>
                            <!-- <div class='dvk3_startTime'> -->
                                <div class='dvk3_startTime'  v-if='livetext(data.body.dataList[1])'>
                                    <span v-if="livenow(data.body.dataList[1])" class="circle"></span> 
                                    <span v-if='livetext(data.body.dataList[1])'>{{ livetext(data.body.dataList[1]) }}</span>
                                    <span v-if='!livetext(data.body.dataList[1])' v-text='data.body.dataList[1].startTimestamp'></span>
                                </div>
                            <!-- </div> -->
                       </div>
                       <div class='dvk3_text' v-text='data.body.dataList[1].courseTitle'></div>
                       <div class='dvk3_detail'>
                            <span class='dvk3_name' v-text='data.body.dataList[1].teacherName'><img src="//pic.davdian.com/free/2017/03/06/official.png" class='dvk3_name_titlepic'></span>
                            <span class='dvk3_popular'><span v-text='data.body.dataList[1].readTimes'></span></span>
                        </div>
                    </a>
               </div>
           
        </div>
    </div>
</template>
<script>
    import * as tt_com_0 from './tt_com_0.vue'
    import layout from "../layout.es6"
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
    .dvk3_container{
        height:2.15rem;
        width: 100%;
        background: #fff;
    }
    .dvk3_content1{
        margin-top: 0.1rem;
        width: 1.74rem;
        height: 1.95rem;
        border: 0.5px solid #DDDDDD;
        margin-left: 0.1rem;
        float: left;
    }
    .dvk3_content2{
        margin-top: 0.1rem;
        width: 1.74rem;
        height: 1.95rem;
        border: 0.5px solid #DDDDDD;
        margin-right: 0.1rem;
        float: right;
    }
    .dvk3_img{
        height: 1.2rem;
        background: #fff;
        position: relative;
    }
    .dvk3_text{
        width: 1.52rem;
        /*height: 0.31rem;*/
        line-height: 0.15rem;
        color: #333333;
        margin-left: 0.1rem;
        font-size: 0.12rem;
        margin-top: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
    }
    .dvk3_detail{
        font-size: 0.11rem;
        color: #999999;
        margin-left: 0.1rem;
        margin-top: 0.08rem;
        width: 1.52rem;
    }
    .dvk3_name{
        float: left;
        width: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .dvk3_popular{
        float: right;
    }
    .dvk3_money{
        position: absolute;
        top: 0.05rem;
        left: 0.05rem;
        padding-left: 0.03rem;
        padding-right: 0.03rem;
        height: 0.18rem;
        line-height: 0.2rem;
        text-align: center;
        color: #fff;
        font-size: 0.11rem;
        background: #FF4A7D;
    }
    .dvk3_startTime{
        position: absolute;
        width: 100%;
        height: 0.2rem;
        color: #fff;
        text-align: center;
        line-height: 0.2rem;
        background: -webkit-gradient(linear,left top,left bottom,color-stop(0,transparent),color-stop(50%,rgba(0,0,0,.35)),color-stop(100%,rgba(0,0,0,.7)),color-stop(100%,#fff));
        bottom: 0;
    }
    .dvk3_startTimeLine{
        position: absolute;
        width: 100%;
        height: 0.2rem;
        color: #fff;
        text-align: center;
        line-height: 0.24rem;
        background: url('//pic.davdian.com/free/2017/03/06/bg_line1.png');
        background-size:100% 100%;
        bottom: 0;
    }
    .dvk3_circle_green{
        width: 0.05rem;
        height: 0.05rem;
        margin-bottom: 0.02rem;
        margin-right: 0.04rem;
        border-radius: 50%;
        display: inline-block;
        border:0.5px solid #979797;
        background: #92FDE0;
    }
    .dvk3_name_titlepic{
        width: 0.14rem;
        margin-left: 0.03rem;
        margin-bottom: 0.02rem;
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