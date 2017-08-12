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
            <div class="top_right" style="width:40px;" v-if="rightshow||false">
                <a class="top_back" href="./course.html">
                    <img style="width:26px;margin-top:12px;" class="back_home" src="//pic.davdian.com/free/2017/01/17/75_60_7d48bf0ba35cf3ea029bab4d709558f3.png"/>
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
        ready: function () {
        }
    }
</script>
<style scoped>
</style>
