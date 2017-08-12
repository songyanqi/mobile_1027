<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">

        <tt_com_0 :data="data"></tt_com_0>

        <div class="df_new_model_con">
            <div class="clearfix">
                <div class="dvd-col-12">
                    <div class="dvd-new-index-module-child dvd-col-12" style="height: 0.44rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[0].command.content" @click.stop="clickAnalysis" position="0" style="height: 0.44rem;">
                            <!-- <img class="newImage" style="height: 0.44rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/12/750_88_3a6da1d75a2ba5d1997647406a120450.png" :data-original="data.body.dataList[0].imageUrl"> -->
                            <img class="newImage" style="height: 0.44rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[0].imageUrl)">
                        </a>
                    </div>
                </div>
                <div class="dvd-col-12">
                    <div class="dvd-new-index-module-child dvd-col-6" style="height: 2rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[1].command.content" @click.stop="clickAnalysis" position="1" style="height: 2rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/374_400_78523437ab1a46593dc1e566d90bdfb9.png" class="newImage" style="height: 2rem;overflow: hidden;" :data-original="data.body.dataList[1].imageUrl"> -->
                            <img class="newImage" style="height: 2rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[1].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="dvd-new-index-module-child dvd-col-6" style="height: 2rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[2].command.content" @click.stop="clickAnalysis" position="2" style="height: 2rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/374_400_78523437ab1a46593dc1e566d90bdfb9.png" class="newImage" style="height: 2rem;overflow: hidden;" :data-original="data.body.dataList[2].imageUrl"> -->
                           <img class="newImage" style="height: 2rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[2].imageUrl)">
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                </div>
                <div class="dvd-col-12">
                    <div class="dvd-new-index-module-child dvd-col-4" style="height: 1.3rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[3].command.content" @click.stop="clickAnalysis" position="3" style="height: 1.3rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/250_260_83693415b776ca1e63240ba7aaf6fc96.png" class="newImage" style="height: 1.3rem;overflow: hidden;" :data-original="data.body.dataList[3].imageUrl"> -->
                            <img class="newImage" style="height: 1.3rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[3].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="dvd-new-index-module-child dvd-col-4" style="height: 1.3rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[4].command.content" @click.stop="clickAnalysis" position="4" style="height: 1.3rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/250_260_83693415b776ca1e63240ba7aaf6fc96.png" class="newImage" style="height: 1.3rem;overflow: hidden;" :data-original="data.body.dataList[4].imageUrl"> -->
                            <img class="newImage" style="height: 1.3rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[4].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="dvd-new-index-module-child dvd-col-4" style="height: 1.3rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[5].command.content" @click.stop="clickAnalysis" position="5" style="height: 1.3rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/250_260_83693415b776ca1e63240ba7aaf6fc96.png" class="newImage" style="height: 1.3rem;overflow: hidden;" :data-original="data.body.dataList[5].imageUrl"> -->
                            <img class="newImage" style="height: 1.3rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[5].imageUrl)">
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//    import './bd_image_10.scss'
    import bd_image_10 from './bd_image_10.es6'
    export default bd_image_10
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_image_10.scss";
</style>
