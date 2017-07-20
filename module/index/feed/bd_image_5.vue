<template>
    <div class="hot_activity_cotnainer index_model" style="position: relative" :style="{ marginTop:data.marginTop }">

        <tt_com_0 :data = 'data'></tt_com_0>

        <div class="model_con">
            <div class="dvd-index-module clearfix">
                <div class="index_activity" style="padding:0;margin:0;" :style="styleObject">
                    <a :href="data.body.dataList[0].command.content" style="padding:0;margin:0;" @click="clickAnalysis" position = "0">
                        <!-- <img class="newImage" src="//pic.davdian.com/free/2016/12/02/750_562_a0376febab4bafa94a6e0e4c3b6c87b4.png" :data-original="data.body.dataList[0].imageUrl" style="width:100%;height: 2.81rem; overflow: hidden;"> -->
                        <img class="newImage" v-lazy="imgObject(data.body.dataList[0].imageUrl)" style="width:100%;height: 2.81rem; overflow: hidden;">
                    </a>

                    <div class="df_new_model_con" style="position: absolute;bottom: 0;width:100%;">
                        <div class="clearfix" style="padding:0px 7.5px 5px 7.5px;">
                            <div class="dvd-new-index-module-child dvd-col-4" style="padding: 0 2.5px;box-sizing: border-box;height: 1.31rem; overflow: hidden;">
                                <a :href="data.body.dataList[1].command.content" @click="clickAnalysis" position = "1">
                                    <!-- <img class="newImage" src="//pic.davdian.com/free/2016/12/12/346_346_95d772212ba7dc702aaeabf7d32138cd.png" :data-original="data.body.dataList[1].imageUrl" style="height: 1.31rem;"> -->
                                    <img class="newImage" v-lazy="imgObject(data.body.dataList[1].imageUrl)" style="height: 1.31rem;">
                                </a>
                            </div>
                            <div class="dvd-new-index-module-child dvd-col-4" style="padding: 0 2.5px;box-sizing: border-box;height: 1.31rem; overflow: hidden;">
                                <a :href="data.body.dataList[2].command.content" @click="clickAnalysis" position = "2">
                                    <!-- <img class="newImage" src="//pic.davdian.com/free/2016/12/12/346_346_95d772212ba7dc702aaeabf7d32138cd.png" :data-original="data.body.dataList[2].imageUrl" style="height: 1.31rem;"> -->
                                    <img class="newImage" v-lazy="imgObject(data.body.dataList[2].imageUrl)" style="height: 1.31rem;">
                                </a>
                            </div>
                            <div class="dvd-new-index-module-child dvd-col-4" style="padding: 0 2.5px;box-sizing: border-box;height: 1.31rem; overflow: hidden;">
                                <a :href="data.body.dataList[3].command.content" @click="clickAnalysis" position = "3">
                                    <!-- <img class="newImage" src="//pic.davdian.com/free/2016/12/12/346_346_95d772212ba7dc702aaeabf7d32138cd.png" :data-original="data.body.dataList[3].imageUrl" style="height: 1.31rem;"> -->
                                    <img class="newImage" v-lazy="imgObject(data.body.dataList[3].imageUrl)" style="height: 1.31rem;">
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
    import './bd_image_5.scss'
    import bd_image_5 from './bd_image_5.es6'
    export default bd_image_5
</script>