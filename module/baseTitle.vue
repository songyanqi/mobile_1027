<style>
    .in_app .top_container{
        display: none;
    }
</style>
<template>
    <div class="top0">
        <div class="top_container">
            <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->
            <div class="top_left">
                <a class="top_back" href="javascript:history.back();" data-dav-tj="order_list|back|back|1|back@order_list">
                    <span class="home_arrow"></span>
                </a>
            </div>
            <div class="title_container">
                {{title}}
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data:function(){
            return{
                title:this.value||document.title,
            }
        },
        props:['value']
    }
</script>