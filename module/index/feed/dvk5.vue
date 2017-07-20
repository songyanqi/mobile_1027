<template>
    <div :style="{ marginTop:data.marginTop + 'px' }">
        <tt_com_0 :data="data"></tt_com_0>
        <div class='dvk5_container' :style="styleObject">
           <div class='dvk5_content1'>
                <a @click.stop="clickAnalysis" :href="data.body.dataList[0].command.content" :position="data.position">
                   <div class='dvk5_img'>
                        <img src="//pic.davdian.com/free/video_camera.png" class='video'>
                        <img class="newImage" v-lazy="imgObject(data.body.dataList[0].imageUrl)"/>
                        <div class='dvk5_money' v-if='data.body.dataList[0].category==2'>店主专享</div>
                        <div class='circle' v-if='data.body.dataList[0].category==2'></div>
                        <div class='dvk5_startTime'> 
                            <img src="//pic.davdian.com/free/2017/03/06/location.png" class='dvk5_img_location'> 
                            <span v-if='data.body.dataList[0].address' v-text='data.body.dataList[0].address'></span>
                            <span v-else='data.body.dataList[0].address'>大V星球</span>
                        </div>
                        <img src="//pic.davdian.com/free/2017/03/06/broadcasting.png" class='dvk5_img_statue' v-if='data.body.dataList[0].status==1'>
                        <img src="//pic.davdian.com/free/2017/03/06/recorded.png" class='dvk5_img_statue' v-if='data.body.dataList[0].status==2 || data.body.dataList[0].status==3'>
                   </div>
                   <div class='dvk5_text' v-text='data.body.dataList[0].title'></div>
                   <div class='dvk5_detail'>
                        <span class='dvk5_name'> <span class='dvk5_name_spanContainer'> <span class='dvk5_name_span' v-text='data.body.dataList[0].teacherName'></span></span> <img src="//pic.davdian.com/free/2017/03/06/official.png" class='dvk5_img_official' v-if='data.body.dataList[0].verify==1'> </span>
                        <span class='dvk5_popular'><span v-text='data.body.dataList[0].pv'></span></span>
                    </div>
                </a>
           </div>
           <div class='dvk5_content2'>
               <a @click.stop="clickAnalysis" :href="data.body.dataList[1].command.content" :position="data.position">
                   <div class='dvk5_img'>
                        <img src="//pic.davdian.com/free/video_camera.png" class='video'>
                        <img class="newImage" v-lazy="imgObject(data.body.dataList[1].imageUrl)"/>
                        <div class='dvk5_money' v-if='data.body.dataList[1].category==2'>店主专享</div>
                        <div class='circle' v-if='data.body.dataList[1].category==2'></div>
                        <div class='dvk5_startTime'> 
                            <img src="//pic.davdian.com/free/2017/03/06/location.png" class='dvk5_img_location'> 
                            <span v-if='data.body.dataList[1].address' v-text='data.body.dataList[1].address'></span>
                            <span v-else='data.body.dataList[1].address'>大V星球</span>
                        </div>
                        <img src="//pic.davdian.com/free/2017/03/06/broadcasting.png" class='dvk5_img_statue' v-if='data.body.dataList[1].status==1'>
                        <img src="//pic.davdian.com/free/2017/03/06/recorded.png" class='dvk5_img_statue' v-if='data.body.dataList[1].status==2 || data.body.dataList[1].status==3'>
                   </div>
                   <div class='dvk5_text' v-text='data.body.dataList[1].title'></div>
                   <div class='dvk5_detail'>
                        <span class='dvk5_name'> <span class='dvk5_name_spanContainer'> <span class='dvk5_name_span' v-text='data.body.dataList[1].teacherName'></span></span> <img src="//pic.davdian.com/free/2017/03/06/official.png" class='dvk5_img_official' v-if='data.body.dataList[1].verify==1'></span>
                        <span class='dvk5_popular'><span v-text='data.body.dataList[1].pv'></span></span>
                    </div>
               </a>
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
            }
        }
    }
</script>
<style scoped>
    .dvk5_container{
        width: 100%;
        height: 2.63rem;
        background: #fff;
    }
    .dvk5_content1{
        margin-top: 0.1rem;
        width: 1.74rem;
        height: 2.4rem;
        border: 0.5px solid #DDDDDD;
        margin-left: 0.1rem;
        float: left;
    }
    .dvk5_content2{
        margin-top: 0.1rem;
        width: 1.74rem;
        height: 2.4rem;
        border: 0.5px solid #DDDDDD;
        margin-right: 0.1rem;
        float: right;
    }
    .dvk5_img{
        height: 1.72rem;
        position: relative;
    }
    .dvk5_text{
        width: 1.52rem;
        /*height: 0.31rem;*/
        line-height: 0.17rem;
        color: #333333;
        margin-left: 0.1rem;
        font-size: 0.12rem;
        margin-top: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        text-indent: 0.2rem;
    }
    .dvk5_detail{
        font-size: 0.11rem;
        color: #999999;
        margin-left: 0.1rem;
        margin-top: 0.02rem;
        width: 1.52rem;
    }
    .dvk5_name{
        float: left;
    }
    .dvk5_name_spanContainer{
        max-width: 0.7rem;
        display: inline-block;
        vertical-align: top;
    }
    .dvk5_name_span{
        max-width: 0.7rem;
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .dvk5_popular{
        float: right;
    }
    .dvk5_money{
        position: absolute;
        top: 0.1rem;
        left: 0;
        padding-left: 0.03rem;
        padding-right: 0.03rem;
        height: 0.18rem;
        line-height: 0.2rem;
        text-indent: 0.03rem;
        color: #fff;
        font-size: 0.11rem;
        background: #FF4A7D;
        display: inline-block;
        z-index: 1;
    }
    .circle{
        width: 0.18rem;
        height: 0.18rem;
        top: 0.1rem;
        left: 0.36rem;
        position: absolute;
        color: #fff;
        border-radius: 50%;
        background: #FF4A7D;
        display: inline-block;
    }
    .dvk5_startTime{
        position: absolute;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        color: #fff;
        text-indent: 0.2rem;
        bottom: 0;
        background: -webkit-gradient(linear,left top,left bottom,color-stop(0,transparent),color-stop(50%,rgba(0,0,0,.1)),color-stop(100%,rgba(0,0,0,.2)),color-stop(100%,#fff));
    }
    .dvk5_img_statue{
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        height: 0.17rem;
    }
    .dvk5_img_location{
        width: 0.11rem;
        margin-bottom: 0.02rem;
    }
    .dvk5_img_official{
        width: 0.11rem;
    }
    .newImage {
        object-fit: cover;
        object-position: center;
        display: inline;
        border: none;
        width: 100%;
    }
    .video{
        position: absolute;
        width: 0.12rem;
        top: 1.85rem;
        left: 0.12rem;
    }
</style>