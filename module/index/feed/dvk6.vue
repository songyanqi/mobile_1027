<template>
    <div :style="{ marginTop:data.marginTop + 'px' }">
        <tt_com_0 :data="data"></tt_com_0>
        <div class='dvk6_container' :style="styleObject">
           <div class='dvk6_content1'>
                <a @click.stop="clickAnalysis" :href="data.body.dataList[0].command.content" :position="data.position">
                   <div class='dvk6_img'>
                        <img class="newImage" v-lazy="imgObject(data.body.dataList[0].imageUrl)"/>
                        <div class='dvk6_startTime'><img class='dvk6_img_title' src="//pic.davdian.com/free/2017/03/06/timeWhite.png"><span v-text='data.body.dataList[0].time'></span></div>
                   </div>
                   <div class='dvk6_text' v-text='data.body.dataList[0].title'></div>
                   <div class='dvk6_detail'>
                        <span class='dvk6_name' v-text='data.body.dataList[0].pv'></span>
                        <span class='dvk6_popular' v-text='data.body.dataList[0].type'></span>
                    </div>
                </a>
           </div>
           <div class='dvk6_content2'>
                <a @click.stop="clickAnalysis" :href="data.body.dataList[1].command.content" :position="data.position">
                   <div class='dvk6_img'>
                        <img class="newImage" v-lazy="imgObject(data.body.dataList[1].imageUrl)"/>
                        <div class='dvk6_startTime'><img class='dvk6_img_title' src="//pic.davdian.com/free/2017/03/06/timeWhite.png"><span v-text='data.body.dataList[1].time'></span></div>
                   </div>
                   <div class='dvk6_text' v-text='data.body.dataList[1].title'></div>
                   <div class='dvk6_detail'>
                        <span class='dvk6_name' v-text='data.body.dataList[1].pv'></span>
                        <span class='dvk6_popular' v-text='data.body.dataList[1].type'>
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
    .dvk6_container{
        width: 100%;
        height: 2.63rem;
        background: #fff;
    }
    .dvk6_content1{
        margin-top: 0.1rem;
        width: 1.74rem;
        height: 2.4rem;
        border: 0.5px solid #DDDDDD;
        margin-left: 0.1rem;
        float: left;
    }
    .dvk6_content2{
        margin-top: 0.1rem;
        width: 1.74rem;
        height: 2.4rem;
        border: 0.5px solid #DDDDDD;
        margin-right: 0.1rem;
        float: right;
    }
    .dvk6_img{
        height: 1.72rem;
        position: relative;
    }
    .dvk6_text{
        width: 1.52rem;
        /*height: 0.16rem;*/
        line-height: 0.16rem;
        color: #333333;
        margin-left: 0.1rem;
        font-size: 0.12rem;
        margin-top: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        margin-bottom: 0.05rem;
    }
    .dvk6_detail{
        font-size: 0.11rem;
        color: #999999;
        margin-left: 0.1rem;
        margin-top: 0.02rem;
        width: 1.52rem;
    }
    .dvk6_name{
        float: left;
        width: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
    }
    .dvk6_popular{
        float: right;
    }
    .dvk6_startTime{
        position: absolute;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        color: #fff;
        text-indent: 0.2rem;
        bottom: 0;
        background: -webkit-gradient(linear,left top,left bottom,color-stop(0,transparent),color-stop(50%,rgba(0,0,0,.1)),color-stop(100%,rgba(0,0,0,.2)),color-stop(100%,#fff));
    }
    .dvk6_img_title{
        width: 0.16rem;
        margin-bottom: 0.02rem;
        margin-right: 0.02rem;
    }
    .newImage {
        object-fit: cover;
        object-position: center;
        display: inline;
        border: none;
        width: 100%;
    }
</style>