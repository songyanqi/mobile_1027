<template>
    <div class='articles_4_container' :style="{marginTop: data.marginTop +'px'}">
        <img :src="data.body.dataList[0].imageUrl" class='articles_4_img'>
        <div class='articles_4_content'>
        	<div class='articles_4_text' v-text='data.body.dataList[0].menuName'></div>
        	<div class='articles_4_share'>
	    		<span v-text='data.body.dataList[0].title'></span>
	    		<span class='articles_4_border'></span>
	    		<span><span v-text='data.body.dataList[0].shareNum'></span>&nbsp;分享</span>
	    	</div>
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
	    	console.log('articles2', this.data)
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
	.articles_4_container{
		height: 0.9rem;
		background: #fff;
	}
	.articles_4_img{
		height: 0.7rem;
		width: 0.7rem;
		margin: 0.1rem;
		vertical-align: top;
	}
	.articles_4_content{
		display: inline-block;
		vertical-align: top;
		width: 2.75rem;
		height: 0.4rem;
	}
	.articles_4_text{
		margin: .1rem 0 .1rem 0;
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
	.articles_4_share{
		margin: 0 .1rem .12rem 0rem;
		margin-top: 0.08rem;
	    font-size: 0.11rem;
	    height: 0.16rem;
	    line-height: 0.16rem;
	    color: #999;
	}
	.articles_4_border{
		border-left: 0.5px solid #999;
		margin-left: 0.05rem;
		margin-right: 0.07rem;
	}
</style>