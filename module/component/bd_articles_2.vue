<template>
    <div class='articles_2_container'>
    <!-- <div class='articles_2_container' :style="{marginTop: data.marginTop +'px'}"> -->
	    <a :href="data.body.dataList[0].command.content" @click.stop="clickAnalysis"  :position="data.position">
	    	<div :style="{'background': 'url(' + data.body.dataList[0].imageUrl + ') center center / cover no-repeat' , 'background-size': 'cover'}" class='articles_2_img'></div>
	        <img v-if='data.body.dataList[0].pageType == 3' src="http://pic.davdian.com/free/2017/02/07/material-listen.png" class='articles_2_imgNav'>
	        <div class='articles_2_content'>
	        	<div class='articles_2_text' v-text='data.body.dataList[0].title'></div>
	        	<div class='articles_2_share'>
		    		<span v-text='data.body.dataList[0].menuName' v-if='data.body.dataList[0].isShowTime!=1'></span>
		    		<span v-if='data.body.dataList[0].isShowTime==1'>{{getFullTime(data.body.dataList[0].ctime)}}</span>
		    		<span class='articles_2_border'>&nbsp;</span>
		    		<span><span v-text='data.body.dataList[0].readTimes'></span>&nbsp;阅读数</span>
		    	</div>
	        </div>
	    </a>
    </div>
</template>
<script>
	import layout from "../layout/api.es6";
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
	    	// console.log('articles2', this.data)
	    },
	    components: {},
	    methods:{
	        clickAnalysis:function(item) {
	        	let obj = {
	        		top: window.scrollY

	        	}
	        	layout.sStorageSet('v_list', obj)
	            // layout.clickAnalysis(item,this,'body');
	        },
	        clickGo: function(){
	        	let obj = {
	        		top: window.scrollY

	        	}
	        	layout.sStorageSet('v_list', obj)
	        	window.location = this.data.body.dataList[0].command.content
	        },
	        getFullTime: function (second) {
	        	var second = parseInt(second) * 1000
                var y = new Date(second).getFullYear();
                var monthtime = new Date(second).getMonth();
                var daytime = new Date(second).getDate();
                return y + '-' + (monthtime + 1) + '-' + daytime;
            }
	    }
	}
</script>
<style type="text/css">
	.articles_2_container{
		height: 0.9rem;
		background: #fff;
		position: relative;
	}
	.articles_2_img{
		height: 0.7rem;
		width: 0.7rem;
		margin: 0.1rem;
		float: left;
	}
	.articles_2_content{
	    margin-left: 0.9rem;
	    padding-top: 0.5px;
	}
	.articles_2_text{
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
	.articles_2_share{
		margin: 0 .1rem .12rem 0rem;
		margin-top: 0.15rem;
	    font-size: 0.11rem;
	    height: 0.16rem;
	    line-height: 0.16rem;
	    color: #999;
	}
	.articles_2_border{
		border-left: 0.5px solid #999;
		margin-left: 0.05rem;
		/*margin-right: 0.07rem;*/
	}
	.articles_2_imgNav{
		position: absolute;
		top: 0.3rem;
		left: 0.3rem;
		width: 0.3rem;
		height: 0.3rem;
	}
</style>