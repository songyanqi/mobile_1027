<template>
    <div id='series_course' :style="{'marginTop':dataList.marginTop + 'px'}">
        <a :href="dataList.body.command.content" @click.stop="clickAnalysis"  :position="dataList.position">
            <div class='series_title'>所属系列课</div>
            <div class='series_container'>
                <div class='series_img' :style="{'background': 'url(' + dataList.body.seriesImgUrl + ') center center / cover no-repeat' , 'background-size': 'cover'}" ></div>
                <div class='series_content'>
                    <div class='series_content_title' v-text='dataList.body.seriesTitle'></div>
                    <div class='series_content_course_number'><span v-text='dataList.body.courseNum'></span>节课</div>
                    <img class='series_content_img' src="//pic.davdian.com/free/2017/05/03/goSeriesCourse.png">
                </div>
            </div>
        </a>
    </div>
</template>
<script>
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
        created(){
        },
        components: {},
        methods:{
            clickAnalysis:function(item) {
                layout.clickAnalysis(item,this,'body');
            }
        }
    }
</script>
<style type="text/css" scoped>
    #series_course{
        width: 100%;
        background: #fff;
        /*margin-top: 0.1rem;*/
    }
    .series_title{
        width: 100%;
        padding-top:0.1rem;
        padding-left: 0.1rem;
        padding-bottom: 0.1rem;
        font-size: 0.14rem; 
        color: #333;
    }
    .series_container{
        width: 100%;
        padding-bottom: 0.1rem;
        padding-left: 0.1rem;
        font-size: 0;
    }
    .series_img{
        width: 1.15rem;
        height: 0.8rem;
        background: red;
        display: inline-block;
        vertical-align: top;
    }
    .series_content{
        width: 2.3rem;
        height: 0.8rem;
        display: inline-block;
        vertical-align: top;
        font-size: 0.14rem;
        position: relative;
    }
    .series_content_title{
        width: 100%;
        margin-left: 0.1rem;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
    }
    .series_content_course_number{
        position: absolute;
        bottom: 0;
        left: 0.1rem;
        font-size: 0.11rem;
        color: #999999;
    }
    .series_content_img{
        position: absolute;
        width: 0.64rem;
        bottom: 0;
        right: -0.1rem;
    }
</style>