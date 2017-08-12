<template>
    <div id='series_course' :style="{'marginTop':dataList.marginTop + 'px'}">
        <a :href="dataList.body.command.content" @click.stop="clickAnalysis"  :position="dataList.position">
            <div class="series_title">所属系列课 <span>（第{{dataList.body.nowNo}}节 共{{dataList.body.courseNum}}节课）</span></div>
            <div class='series_container'>
                <img src="//pic.davdian.com/free/2017/08/01/seriesicon.png" class='icon'>
                <span v-text='dataList.body.seriesTitle'></span>
            </div>
            <div class='series_content_img1'>进入系列</div>
            <!-- <img class='series_content_img' src="//pic.davdian.com/free/2017/07/28/goSeriesCourse1.png"> -->
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
<style type="text/css" scoped lang='sass'>
    #series_course{
        width: 100%;
        background: #fff;
        position: relative;
        padding-bottom: 0.1rem;
    }
    .series_title{
        width: 100%;
        padding-top:0.14rem;
        padding-left: 0.1rem;
        padding-bottom: 0.1rem;
        font-size: 0.14rem; 
        color: #FF4A7D;
        span{
            font-size: 0.1rem;
            color:#999999;
        }
    }
    .series_container{
        width: 3rem;
        padding-left: 0.1rem;
        padding-right: 0.4rem;
        font-size: 0.14rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        color: #333333;
    }
    .series_content_img{
        position: absolute;
        height: 0.22rem;
        right: 0.1rem;
        top: 0.27rem;
    }
    .series_content_img1{
        position: absolute;
        width: 0.64rem;
        height: 0.22rem;
        right: 0.1rem;
        top: 0.27rem;
        font-size: 0.12rem;
        color: #FF4A7D;
        border:1px solid #FF4A7D;
        border-radius: 37px;
        text-align: center;
        line-height: 0.21rem;
    }
    .icon{
        width: 0.12rem;
        height: 0.12rem;
        vertical-align: top;
        margin-top: 0.03rem;
    }
</style>