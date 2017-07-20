<template>
    <div id='speak_container'>
        <div class="bottominput">
            <div class="text_talk">
                <input v-if="discussStatus" class='text_talk_input' v-model="sentmassagetext" type="text" placeholder="向群主提问或参与讨论">
                <input v-if="!discussStatus" type="text" placeholder="评论关闭" disabled>
            </div>
            <div class="send" @click="sendMessage">
                <span>发送</span>
            </div>
        </div>
    </div>
</template>

<script>
    // import layout from "../layout/api.es6";
    export default {
        data(){
            return {
            	discussStatus:1,
            	sentmassagetext:'',
            }
        },
        created(){
        },
        mounted(){
            this.$nextTick(function () {
                this.init()
            })
        },
        components: {},
        methods:{
            sendMessage(){
            	this.$emit('send', this.sentmassagetext)
            	this.sentmassagetext = ''
            },
            init(){
            	$(".text_talk_input").focus(function(){
            		if(document.getElementById('scrollcon')){
            			document.getElementById('scrollcon').scrollTop=document.getElementById('scrollcon').scrollHeight
            		}
				  
				});
            }
        }
    }
</script>
<!-- 组建内改变全局css样式 -->
<style>
    
</style>
<!-- 组建内部css样式，不会改变全局样式 -->
<style lang='sass' scoped>
	@import "../../../stylesheet/yo/usage/core/reset";
	@import "../../../stylesheet/yo/usage/module/commonList";
    #speak_container{
        .bottominput{
		    max-width: 640px;
		    z-index: 112;
		    border-top: .5px solid #E3DFD8;
		    background: #F9F7F8;
		    @include border(1px 0 0 0,#e1e1e1);
		    height:45px;
		    width:100%;
		    @include flexbox();
		    @include justify-content(center);
		    @include align-items(center);
		    position:fixed;
		    bottom:0;
		    padding:8px;
		    .text_talk{
		       margin-left:0px;
		      @include flex();
		      height:34px;
		      @include border(1px 1px 1px 1px,#eee);
		      background: #FFFFFF;
		      @include border-radius(5px);
		      input{
		        height:100%;
		        width:100%;
		        text-indent: 10px;
		        border-radius: 5px;
		      }
		    }
		    .send{
		      width:70px;
		      height:34px;
		      line-height:34px;
		      margin-left:8px;
		      text-align: center;
		      color: #FFFFFF;
		      background: #FF4A7D;
		      @include border-radius(3px);
		    }
	  	}
    }
</style>