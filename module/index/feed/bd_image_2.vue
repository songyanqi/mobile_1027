<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">

        <tt_com_0 :data="data"></tt_com_0>

        <div class="df_new_model_con">
            <div class="clearfix">
                <div class="dvd-col-12" style="height: 2rem; overflow: hidden;">
                    <div class="dvd-new-index-module-child dvd-col-6" style="height: 2rem; overflow: hidden;" :style="styleObject">
                        <a :href="data.body.dataList[0].command.content" @click="clickAnalysis" style="height: 2rem;" position="0">
                            <img class="newImage" v-lazy="imgObject(data.body.dataList[0].imageUrl)" style="height: 2rem; overflow: hidden;" >
                            <div class="right_border" :style="styleObject" ></div>
                        </a>
                    </div>
                    <div class="dvd-new-index-module-child dvd-col-6">
                        <div class="dvd-col-12" style="height: 1rem; overflow: hidden;" :style="styleObject">
                            <a :href="data.body.dataList[1].command.content" @click="clickAnalysis" style="height: 1rem;" position="1">
                                <img class="newImage" v-lazy="imgObject(data.body.dataList[1].imageUrl)" style="height: 1rem; overflow: hidden;">
                            </a>
                        </div>
                        <div class="dvd-col-12" style="height: 1rem; overflow: hidden;" :style="styleObject">
                            <a :href="data.body.dataList[2].command.content" @click="clickAnalysis" style="height: 1rem;" position="2">
                                <div class="top_border" :style="styleObject"></div>
                                <img class="newImage" v-lazy="imgObject(data.body.dataList[2].imageUrl)"  style="height: 1rem; overflow: hidden;">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//    import './bd_image_2.scss'
    import bd_image_2 from './bd_image_2.es6'
    export default bd_image_2
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_image_2.scss";
</style>
