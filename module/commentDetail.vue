<template>
    <div>
        <div class="top0">
            <div class="top_container">
                <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->
                <div class="top_left">
                    <a class="top_back" href="javascript:history.back();">
                        <span class="home_arrow"></span>
                    </a>
                </div>
                <div class="title_container">
                    评价详情
                </div>
            </div>
        </div>
        <comment-detail-data></comment-detail-data>
    </div>
</template>
<style scoped>

</style>
<script>
    import commentDetailData from './orderList_comment_list.vue'
    export default{
        data(){
            return{
            }
        },
        components:{
            commentDetailData:commentDetailData
        },
    }
</script>
