<template>
    <div class="hot_activity_cotnainer index_model" :style="styleTop">
        <tt_com_0 :data="data"></tt_com_0>
        <div class="df_new_model_con">
            <div class="box box-v">
                <div class="item box box-h">
                    <div class="item item-2 new_image" style="height: 1rem;" :style="styleObject">
                        <a :href="data.body.dataList[0].command.content" @click.stop="clickAnalysis" position="0" style="height: 1rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/374_200_73e4474b312a5d48acd31782b2f4c3a6.png" class="newImage" style="height: 1rem;overflow: hidden;" :data-original="data.body.dataList[0].imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[0].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="item item-2" style="height: 1rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[1].command.content" @click.stop="clickAnalysis" position="1" style="height: 1rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/374_200_73e4474b312a5d48acd31782b2f4c3a6.png" class="newImage" style="height: 1rem;overflow: hidden;" :data-original="data.body.dataList[1].imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[1].imageUrl)">
                        </a>
                    </div>
                </div>
                <div class="item box box-h" style="height: 1rem;overflow: hidden">
                    <div class="item" :style="styleObject">
                        <a :href="data.body.dataList[2].command.content" @click.stop="clickAnalysis" position="2" style="height: 1rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/186_200_a6669de09ca5ea05bbb83d30293165b5.png" class="newImage" style="height: 1rem;overflow: hidden;" :data-original="data.body.dataList[2].imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[2].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="item" style="height: 1rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[3].command.content" @click.stop="clickAnalysis" position="3" style="height: 1rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/186_200_a6669de09ca5ea05bbb83d30293165b5.png" class="newImage" style="height: 1rem;overflow: hidden;" :data-original="data.body.dataList[3].imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[3].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="item" style="height: 1rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[4].command.content" @click.stop="clickAnalysis" position="4" style="height: 1rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/186_200_a6669de09ca5ea05bbb83d30293165b5.png" class="newImage" style="height: 1rem;overflow: hidden;" :data-original="data.body.dataList[4].imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[4].imageUrl)">
                            <div class="right_border" :style="styleObject"></div>
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="item" style="height: 1rem;overflow: hidden" :style="styleObject">
                        <a :href="data.body.dataList[5].command.content" @click.stop="clickAnalysis" position="5" style="height: 1rem;">
                            <!-- <img src="//pic.davdian.com/free/2016/12/12/186_200_a6669de09ca5ea05bbb83d30293165b5.png" class="newImage" style="height: 1rem;overflow: hidden;" :data-original="data.body.dataList[5].imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[5].imageUrl)">
                            <div class="top_border" :style="styleObject"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//    import './bd_image_9.scss'
    import bd_image_9 from './bd_image_9.es6'
    export default bd_image_9
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_image_9.scss";
</style>
