<template>
    <div class="top0">
        <div class="top_container">
            <div class="top_left" style="width: 40px">
                <a class="top_back" href="javascript:history.back();">
                    <span class="home_arrow"></span>
                </a>
            </div>
            <div class="title_container">
                {{data||msg}}
            </div>
            <div class="top_right" style="width:40px;">
                <a class="top_back" @click='goComment' v-if='rightshow==0'>
                    <img style="width:26px;margin-top:12px;" class="back_home" src="//pic.davdian.com/free/2017/05/10/comment_yes.png"/>
                </a>
                <a class="top_back" v-if='rightshow==1'>
                    <img style="width:26px;margin-top:12px;" class="back_home" src="//pic.davdian.com/free/2017/05/10/comment_no.png"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:['data','rightshow'],
        data:function(){
            return{
                msg:document.title,
            }
        },
        methods:{
            goComment(){
                window.location = '/course-notes-create-'+ window.courseId +'.html';
            }
        },
        ready: function () {
        }
    }
</script>