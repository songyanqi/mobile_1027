<template>
  <div :style="{ marginTop:data.marginTop + 'px' }">
    <tt_com_0 :data="data"></tt_com_0>
    <div class='dvk4_container' :style="styleObject">
       <div class='dvk4_title' v-if='flag'>
           <span class='dvk4_title_now active' v-text='data.body.leftTitle'></span>
           <span class='dvk4_title_bottom'></span>
           <span class='dvk4_title_tomorrow' @click='tomorrow' v-text='data.body.rightTitle'></span>
       </div>
       <div class='dvk4_title' v-if='!flag'>
           <span class='dvk4_title_now' @click='now' v-text='data.body.leftTitle'></span>
           <span class='dvk4_title_tomorrow active' v-text='data.body.rightTitle'></span>
           <span class='dvk4_title_bottom1'></span>
       </div>
       <!--  -->
       <div class='dvk4_content' v-if='flag'>
           <div class="dvk4_detail">
              <a @click.stop="clickAnalysis" :href="data.body.leftContent[0].command.content" :position="data.body.leftContent[0].position">
               <div class='dvk4_detail_content'>
                   <div class='dvk4_detail_content_img'>
                    <img class="newImage" v-lazy="imgObject(data.body.leftContent[0].courseCover)"/>
                     <div class='dvk4_money' v-if='data.body.leftContent[0].price && data.body.leftContent[0].price!="¥ 0.00"' v-text='data.body.leftContent[0].price'></div>
                   </div>
                   <div class='dvk4_detail_content_text'>
                       <div class='dvk4_detail_content_title' v-text='data.body.leftContent[0].courseTitle'></div>
                       <div class='dvk4_detail_content_name' v-text='data.body.leftContent[0].teacherName'></div>
                       <div class='dvk4_detail_content_time'>
                           <span class='dvk4_detail_content_times'>
                              <span v-if="livenow(data.body.leftContent[0])" class="circle"></span> 
                              <span v-if='livetext(data.body.leftContent[0])'>{{ livetext(data.body.leftContent[0]) }}</span>
                              <span v-if='!livetext(data.body.leftContent[0])' v-text='data.body.leftContent[0].startTimestamp'></span>
                           </span>
                           <span class='dvk4_detail_content_popular'><span v-text='data.body.leftContent[0].readTimes'></span></span>
                       </div>
                   </div>
               </div>
              </a>
           </div>
           <div class="dvk4_detail border">
              <a @click.stop="clickAnalysis" :href="data.body.leftContent[1].command.content" :position="data.body.leftContent[1].position">
               <div class='dvk4_detail_content'>
                   <div class='dvk4_detail_content_img'>
                    <img class="newImage" v-lazy="imgObject(data.body.leftContent[1].courseCover)"/>
                     <div class='dvk4_money' v-if='data.body.leftContent[1].price && data.body.leftContent[1].price!="¥ 0.00"' v-text='data.body.leftContent[1].price'></div>
                   </div>
                   <div class='dvk4_detail_content_text'>
                       <div class='dvk4_detail_content_title' v-text='data.body.leftContent[1].courseTitle'></div>
                       <div class='dvk4_detail_content_name' v-text='data.body.leftContent[1].teacherName'></div>
                       <div class='dvk4_detail_content_time'>
                           <span class='dvk4_detail_content_times'>
                              <span v-if="livenow(data.body.leftContent[1])" class="circle"></span> 
                              <span v-if='livetext(data.body.leftContent[1])'>{{ livetext(data.body.leftContent[1]) }}</span>
                              <span v-if='!livetext(data.body.leftContent[1])' v-text='data.body.leftContent[1].startTimestamp'></span>
                           </span>
                           <span class='dvk4_detail_content_popular'><span v-text='data.body.leftContent[1].readTimes'></span></span>
                       </div>
                   </div>
               </div>
             </a>
           </div>
           <div class="dvk4_detail border">
              <a @click.stop="clickAnalysis" :href="data.body.leftContent[2].command.content" :position="data.body.leftContent[2].position">
               <div class='dvk4_detail_content'>
                   <div class='dvk4_detail_content_img'>
                      <img class="newImage" v-lazy="imgObject(data.body.leftContent[2].courseCover)"/>
                     <div class='dvk4_money' v-if='data.body.leftContent[2].price && data.body.leftContent[2].price!="¥ 0.00"' v-text='data.body.leftContent[2].price'></div>
                   </div>
                   <div class='dvk4_detail_content_text'>
                       <div class='dvk4_detail_content_title' v-text='data.body.leftContent[2].courseTitle'></div>
                       <div class='dvk4_detail_content_name' v-text='data.body.leftContent[2].teacherName'></div>
                       <div class='dvk4_detail_content_time'>
                            <span class='dvk4_detail_content_times'>
                              <span v-if="livenow(data.body.leftContent[2])" class="circle"></span> 
                              <span v-if='livetext(data.body.leftContent[2])'>{{ livetext(data.body.leftContent[2]) }}</span>
                              <span v-if='!livetext(data.body.leftContent[2])' v-text='data.body.leftContent[2].startTimestamp'></span>
                            </span>
                           <span class='dvk4_detail_content_popular'><span v-text='data.body.leftContent[2].readTimes'></span></span>
                       </div>
                   </div>
               </div>
             </a>
           </div>
       </div>
       <div class='dvk4_content'>
           <div class="dvk4_detail" v-if='!flag'>
              <a @click.stop="clickAnalysis" :href="data.body.rightContent[0].command.content" :position="data.body.rightContent[0].position">
               <div class='dvk4_detail_content'>
                   <div class='dvk4_detail_content_img'>
                      <img class="newImage" v-lazy="imgObject(data.body.rightContent[0].courseCover)"/>
                     <div class='dvk4_money' v-if='data.body.rightContent[0].price && data.body.rightContent[0].price!="¥ 0.00"' v-text='data.body.rightContent[0].price'></div>
                   </div>
                   <div class='dvk4_detail_content_text'>
                       <div class='dvk4_detail_content_title' v-text='data.body.rightContent[0].courseTitle'></div>
                       <div class='dvk4_detail_content_name' v-text='data.body.rightContent[0].teacherName'></div>
                       <div class='dvk4_detail_content_time'>
                           <span class='dvk4_detail_content_times'>
                              <span v-if="livenow(data.body.rightContent[0])" class="circle"></span> 
                              <span v-if='livetext(data.body.rightContent[0])'>{{ livetext(data.body.rightContent[0]) }}</span>
                              <span v-if='!livetext(data.body.rightContent[0])' v-text='data.body.rightContent[0].startTimestamp'></span>
                           </span>
                           <span class='dvk4_detail_content_popular'><span v-text='data.body.rightContent[0].readTimes'></span></span>
                       </div>
                   </div>
               </div>
             </a>
           </div>
           <div class="dvk4_detail border" v-if='!flag'>
              <a @click.stop="clickAnalysis" :href="data.body.rightContent[1].command.content" :position="data.body.rightContent[1].position">
               <div class='dvk4_detail_content'>
                   <div class='dvk4_detail_content_img'>
                      <img class="newImage" v-lazy="imgObject(data.body.rightContent[1].courseCover)"/>
                     <div class='dvk4_money' v-if='data.body.rightContent[1].price && data.body.rightContent[1].price!="¥ 0.00"' v-text='data.body.rightContent[1].price'></div>
                   </div>
                   <div class='dvk4_detail_content_text'>
                       <div class='dvk4_detail_content_title' v-text='data.body.rightContent[1].courseTitle'></div>
                       <div class='dvk4_detail_content_name' v-text='data.body.rightContent[1].teacherName'></div>
                       <div class='dvk4_detail_content_time'>
                           <span class='dvk4_detail_content_times'>
                              <span v-if="livenow(data.body.rightContent[1])" class="circle"></span> 
                              <span v-if='livetext(data.body.rightContent[1])'>{{ livetext(data.body.rightContent[1]) }}</span>
                              <span v-if='!livetext(data.body.rightContent[1])' v-text='data.body.rightContent[1].startTimestamp'></span>
                           </span>
                           <span class='dvk4_detail_content_popular'><span v-text='data.body.rightContent[1].readTimes'></span></span>
                       </div>
                   </div>
               </div>
              </a>
           </div>
           <div class="dvk4_detail border" v-if='!flag'>
            <a @click.stop="clickAnalysis" :href="data.body.rightContent[2].command.content" :position="data.body.rightContent[2].position">
               <div class='dvk4_detail_content'>
                   <div class='dvk4_detail_content_img'>
                      <img class="newImage" v-lazy="imgObject(data.body.rightContent[2].courseCover)"/>
                     <div class='dvk4_money' v-if='data.body.rightContent[2].price && data.body.rightContent[2].price!="¥ 0.00"' v-text='data.body.rightContent[2].price'></div>
                   </div>
                   <div class='dvk4_detail_content_text'>
                       <div class='dvk4_detail_content_title' v-text='data.body.rightContent[2].courseTitle'></div>
                       <div class='dvk4_detail_content_name' v-text='data.body.rightContent[2].teacherName'></div>
                       <div class='dvk4_detail_content_time'>
                           <span class='dvk4_detail_content_times'>
                              <span v-if="livenow(data.body.rightContent[2])" class="circle"></span> 
                              <span v-if='livetext(data.body.rightContent[2])'>{{ livetext(data.body.rightContent[2]) }}</span>
                              <span v-if='!livetext(data.body.rightContent[2])' v-text='data.body.rightContent[2].startTimestamp'></span>
                           </span>
                           <span class='dvk4_detail_content_popular'><span v-text='data.body.rightContent[2].readTimes'></span></span>
                       </div>
                   </div>
               </div>
             </a>
           </div>
       </div>
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
            now: function () {
              this.flag = true
              window.scrollTo(0,window.scrollY+1)
              window.scrollTo(0,window.scrollY-1)
            },
            tomorrow: function (){
              this.flag = false
              window.scrollTo(0,window.scrollY+1)
              window.scrollTo(0,window.scrollY-1)
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
    .dvk4_container{
        width: 100%;
        height: 3.65rem;
        background: #fff;
    }
    .dvk4_title{
        width: 100%;
        height: 0.5rem;
        border-bottom: 0.005rem solid #E1E1E1;
        position: relative;
    }
    .dvk4_title_now{
        width: 1.86rem;
        height: 0.3rem;
        margin-top: 0.1rem;
        line-height: 0.3rem;
        text-align: center;
        border-right: 0.005rem solid #E1E1E1;
        display: block;
        float: left;
        position: relative;
    }
    .dvk4_title_bottom{
        position: absolute;
        top: 0.5rem;
        width: 1rem;
        left: 0.44rem;
        border-bottom: 1px solid #FF4A7D;
    }
    .dvk4_title_bottom1{
        position: absolute;
        top: 0.5rem;
        width: 1rem;
        left: 2.3rem;
        border-bottom: 1px solid #FF4A7D;
    }
    .dvk4_title_tomorrow{
        width: 1.87rem;
        height: 0.3rem;
        margin-top: 0.1rem;
        line-height: 0.3rem;
        text-align: center;
        display: block;
        float: left;
        position: relative;
    }
    .active{
        color: #FF4A7D;
    }
    .dvk4_content{
        height: 3rem;
        width: 3.55rem;
        margin-left: 0.1rem;
    }
    .border{
        border-top: 1px solid #E1E1E1;
    }
    .dvk4_detail{
        width: 100%;
        height: 0.98rem;
        padding-top: 0.06rem;
    }
    .dvk4_detail_content{
        width: 100%;
        height: 0.88rem;
    }
    .dvk4_detail_content_img{
        width: 1.26rem;
        height: 0.88rem;
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .dvk4_detail_content_text{
        display: inline-block;
        vertical-align: top;
        width: 2.18rem;
        height: 0.88rem;
        margin-left:0.06rem;
        position: relative;
    }
    .dvk4_detail_content_title{
        color: #333333;
        height: 0.39rem;
        font-size: 0.14rem;
        line-height: 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
    }
    .dvk4_detail_content_name{
        color: #999999;
        font-size: 0.12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .dvk4_detail_content_time{
        font-size: 0.12rem;
        color: #999999;
        height: 0.17rem;
        /*margin-top: 0.14rem;*/
        position: absolute;
        bottom: 0.02rem;
    }
    .dvk4_detail_content_times{
        float: left;
        width: 1.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .dvk4_detail_content_popular{
        float: right;
    }
    .dvk4_money{
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