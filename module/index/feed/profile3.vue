<!--bg_goods_2两行模板-->
<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">

        <tt_com_0 :data = 'data'></tt_com_0>

        <div class="df_new_model_con" :style="styleObject">
            <div class="df_new_model_con">
                <div class="df_new_title_3" style="height:1.8rem;overflow: hidden;">
                    <a :href="data.body.command.content" @click="clickAnalysis" style="height: 1.8rem;" position="0">
                        <!-- <img class="newImage" src="//pic.davdian.com/free/2016/12/13/750_562_a9f7f336457533dc078691a41340f775.png" :data-original="data.body.imageUrl" style="display: inline;height: 1.8rem"> -->
                        <img class="newImage" v-lazy="imgObject(data.body.imageUrl)" style="display: inline;height: 1.8rem">
                    </a>
                    <span class="up_arrow" :style="styleSpan"></span>
                </div>
                <bd_goods_0 :data = 'data'></bd_goods_0>
            </div>
        </div>
    </div>
</template>

<script>
    import './bd_goods_2.scss'
    import bd_goods_2 from './bd_goods_2.es6'
    export default bd_goods_2
</script>
<style>
    .swiper-container .related-item-list .detail .name{
        font-size: 12px;
        padding-top: 7px;
        padding-right: 10px;
        text-overflow: ellipsis;
        white-space: pre-line;
        line-height: 18px;
        margin-bottom: 2px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
    }
</style>