<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">

        <tt_com_0 :data = 'data'></tt_com_0>

        <div class="df_new_model_con">
            <div class="clearfix">
                <div class="dvd-col-12" style="height: 2rem; overflow: hidden;">
                    <div class="dvd-new-index-module-child dvd-col-6" style="height: 2rem;overflow: hidden;" :style="styleObject">
                        <a :href="data.body.dataList[0].command.content" @click="clickAnalysis" position = "0" style="height: 2rem;">
                            <!-- <img class="newImage" style="height: 2rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/374_400_9dd7740d145f63fcc1bb45acd3ca5562.png" :data-original="data.body.dataList[0].imageUrl"> -->
                            <img class="newImage" style="height: 2rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[0].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="dvd-new-index-module-child dvd-col-6">
                        <div class="dvd-col-12" style="height: 1rem;overflow: hidden;" :style="styleObject">
                            <a :href="data.body.dataList[1].command.content" @click="clickAnalysis" position = "1" style="height: 1rem;">
                                <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/374_200_8f1bcdbd06f1e4345047fb3bfad2741d.png" :data-original="data.body.dataList[1].imageUrl"> -->
                                <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[1].imageUrl)">
                            </a>
                        </div>
                        <div class="dvd-col-12">
                            <div class="dvd-new-index-module-child dvd-col-6"  style="height: 1rem;overflow: hidden;" :style="styleObject">
                                <a :href="data.body.dataList[2].command.content" @click="clickAnalysis" position="2"  style="height: 1rem;">
                                    <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/186_200_fbaa0fc666e72f32a471934ce7621324.png" :data-original="data.body.dataList[2].imageUrl"> -->
                                    <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[2].imageUrl)">
                                    <div class="right_border" :style="styleObject"></div>
                                    <div class="top_border" :style="styleObject"></div>
                                </a>
                            </div>
                            <div class="dvd-new-index-module-child dvd-col-6"  style="height: 1rem;overflow: hidden;" :style="styleObject">
                                <a :href="data.body.dataList[3].command.content" @click="clickAnalysis" position="3" style="height: 1rem;">
                                    <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/186_200_fbaa0fc666e72f32a471934ce7621324.png" :data-original="data.body.dataList[3].imageUrl"> -->
                                    <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[3].imageUrl)">
                                    <div class="top_border" :style="styleObject"></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './bd_image_3.scss'
    import bd_image_3 from './bd_image_3.es6'
    export default bd_image_3
</script>