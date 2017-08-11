<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">

        <tt_com_0 :data = 'data'></tt_com_0>

        <div class="df_new_model_con" :style="styleObject">
            <div class="df_new_model_con">
                <div class="df_new_title_3" style="height:1.8rem;overflow: hidden;">
                    <a :href="data.body.command.content" @click="clickAnalysis" style="height: 1.8rem;" position="0">
                        <img class="newImage" style="display: inline;height: 1.8rem" v-lazy="imgObject(data.body.imageUrl)">
                    </a>
                    <span class="up_arrow" :style="styleSpan"></span>
                </div>
                <bd_goods_0 :data = 'data'></bd_goods_0>
            </div>
        </div>
    </div>
</template>

<script>
//    import './bd_goods_2.scss'
    import bd_goods_2 from './bd_goods_2.es6'
    export default bd_goods_2
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_goods_2.scss";
</style>
