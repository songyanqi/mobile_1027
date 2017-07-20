<style>
    .in_app .top_container{
        display: none;
    }
    body{
        padding-top: 44px;
    }
    .classification_search_ico {
        width: 18px;
        height: 18px;
        background-image: url(//pic.davdian.com/free/searchLiveIcon_0826.png);
        background-size: 100%;
        display: block;
        margin-top: 13px;
        margin-left: 11px;
        font-size: 14px;
    }
</style>
<template>
    <div class="top0">
        <div class="top_container">
            <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->
            <div class="top_left">
                <a class="top_back" href="javascript:history.back();">
                    <span class="home_arrow"></span>
                </a>
            </div>
            <div class="title_container">
                {{title}}
            </div>
            <div class="top_right">
                <a class="top_back" href="course_search.html">
                    <span class="classification_search_ico"></span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data:function(){
            return{
                title:document.title,
            }
        }
    }
</script>