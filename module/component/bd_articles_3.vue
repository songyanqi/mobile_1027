<template>
    <div class='articles_3_container' :style="{marginTop: data.marginTop +'px'}">
    	<img :src="data.body.dataList[0].imageUrl" class='articles_3_img'>
    	<img src="http://pic.davdian.com/free/2017/02/07/material-recorded.png" class='articles_3_imgNav'>
    	<!-- <div class='articles_3_minutes'> -->
    		<img src="http://pic.davdian.com/free/2017/02/07/material-audio.png" class='articles_3_minutes-img'>
    		<span class='articles_3_minutes-span'>2:45</span>
		<!-- </div> -->
    	<div class='articles_3_text' v-text='data.body.dataList[0].menuName'></div>
    	<div class='articles_3_share'>
    		<span v-text='data.body.dataList[0].title'></span>
    		<span class='articles_3_border'></span>
    		<span><span v-text='data.body.dataList[0].shareNum'></span>&nbsp;分享</span>
    	</div>
    </div>
</template>
<script>
    export default {
	    data(){
	        return {
	            msg: 'hello vue',
	            dataList:{},
	            mySwiper1:"1",
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
	    	console.log('articles1', this.data)
	    },
	    components: {},
	    methods:{
	        clickAnalysis:function(item) {
	            layout.clickAnalysis(item,this,'body');
	        }
	    }
	}
</script>
<style type="text/css">
	.articles_3_container{
		width: 3.75rem;
		height: 2.90rem;
		position: relative;
		background: #fff;
	}
	.articles_3_img{
		width: 3.75rem;
		height: 2rem;
	}
	.articles_3_text{
		margin: .1rem;
	    max-height: 3em;
	    overflow: hidden;
	    line-height: 1.5;
	    text-overflow: ellipsis;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	    display: -webkit-box;
	    font-size: 0.14rem;
	    color: #333333;
	    height: 0.39rem;
	}
	.articles_3_share{
		margin: 0 .1rem .12rem .1rem;
		margin-top: 0.08rem;
	    font-size: 0.11rem;
	    height: 0.16rem;
	    line-height: 0.16rem;
	    color: #999;
	}
	.articles_3_border{
		border-left: 0.5px solid #999;
		margin-left: 0.05rem;
		margin-right: 0.07rem;
	}
	.articles_3_imgNav{
		position: absolute;
		top: 0.8rem;
		left: 1.6rem;
		width: 0.6rem;
		height: 0.6rem;
	}
	.articles_3_minutes{
		position: absolute;
		top: 1.78rem;
		right: 0.1rem;
		height: 0.15rem;
		line-height: 0.15rem;
	}
	.articles_3_minutes-img{
		position: absolute;
		top: 1.78rem;
		right: 0.4rem;
		height: 0.15rem;
	}
	.articles_3_minutes-span{
		position: absolute;
		top: 1.78rem;
		right: 0.1rem;
		height: 0.15rem;
		vertical-align: bottom;
		font-size: 0.12rem;
		color: #fff;
	}
</style>