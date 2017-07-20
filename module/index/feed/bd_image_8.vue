<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">
        <tt_com_0 :data="data"></tt_com_0>
        <div class="df_new_model_con">
            <div class="clearfix">
                <div class="dvd-col-12" style="overflow: hidden;">
                    <div class="dvd-new-index-module-child dvd-col-6" style="height: 2.34rem;overflow: hidden;"  :style="styleObject">
                        <a :href="data.body.dataList[0].command.content" @click.stop="clickAnalysis" position="0" style="height: 2.34rem;">
                            <!-- <img class="newImage" style="height: 2.34rem;overflow: hidden;" src="//pic.davdian.com/free/loading_320_400_1216.png" :data-original="data.body.dataList[0].imageUrl"> -->
                            <img class="newImage" style="height: 2.34rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[0].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                        </a>
                    </div>

                    <div class="dvd-new-index-module-child dvd-col-6">
                        <div class="dvd-col-6 dvd-new-index-module-child"  style="height: 1.17rem;overflow: hidden;"  :style="styleObject">
                            <a :href="data.body.dataList[1].command.content" @click.stop="clickAnalysis" position="1" style="height: 1.17rem;">
                                <!-- <img class="newImage" style="height: 1.17rem;overflow: hidden;" src="//pic.davdian.com/free/loading_160_200_1216.png" :data-original="data.body.dataList[1].imageUrl"> -->
                                <img class="newImage" style="height: 1.17rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[1].imageUrl)">
                                <div class="right_border" :style="styleObject"></div>
                            </a>
                        </div>
                        <div class="dvd-col-6 dvd-new-index-module-child" style="height: 1.17rem;overflow: hidden;"  :style="styleObject">
                            <a :href="data.body.dataList[2].command.content" @click.stop="clickAnalysis" position="2" style="height: 1.17rem;" >
                                <!-- <img class="newImage" style="height: 1.17rem;overflow: hidden;" src="//pic.davdian.com/free/loading_160_200_1216.png" :data-original="data.body.dataList[2].imageUrl"> -->
                                <img class="newImage" style="height: 1.17rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[2].imageUrl)">
                            </a>
                        </div>
                        <div class="dvd-col-6 dvd-new-index-module-child" style="height: 1.17rem;overflow: hidden;"  :style="styleObject">
                            <a :href="data.body.dataList[3].command.content" @click.stop="clickAnalysis" position="3" style="height: 1.17rem;">
                                <!-- <img class="newImage" style="height: 1.17rem;overflow: hidden;" src="//pic.davdian.com/free/loading_160_200_1216.png" :data-original="data.body.dataList[3].imageUrl"> -->
                                <img class="newImage" style="height: 1.17rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[3].imageUrl)">
                                <div class="right_border" :style="styleObject"></div>
                                <div class="top_border" :style="styleObject"></div>
                            </a>
                        </div>
                        <div class="dvd-col-6 dvd-new-index-module-child" style="height: 1.17rem;overflow: hidden;" :style="styleObject">
                            <a :href="data.body.dataList[4].command.content" @click.stop="clickAnalysis"  style="height: 1.17rem;">
                                <!-- <img class="newImage" style="height: 1.17rem;overflow: hidden;" src="//pic.davdian.com/free/loading_160_200_1216.png" :data-original="data.body.dataList[4].imageUrl"> -->
                                <img class="newImage" style="height: 1.17rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[4].imageUrl)">
                                <div class="top_border" :style="styleObject"></div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import './bd_image_8.scss'
    import bd_image_8 from './bd_image_8.es6'
    export default bd_image_8
</script>