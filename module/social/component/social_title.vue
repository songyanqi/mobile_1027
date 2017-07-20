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
            <div class="top_right" style="width:40px;right:10px" v-if="rightshow||false" @click='manage'>
                <a class="top_back">
                    <img style="width:26px;margin-top:12px;" class="back_home" src="http://pic.davdian.com/free/2017/04/06/social_title.png"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:['data','rightshow','id'],
        data:function(){
            return{
                msg:document.title,
            }
        },
        methods:{
            manage(){
                localStorage.setItem('social_reload', '1')
                window.location.href = '#/manage/'+this.id
            }
        },
        ready: function () {
        }
    }
</script>