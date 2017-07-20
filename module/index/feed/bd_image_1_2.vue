<template>
    <div class="hot_activity_cotnainer index_model" :style="[{ marginTop:data.marginTop },styleObject]">

        <tt_com_0 :data="data"></tt_com_0>

        <div class="model_con">
            <div class="dvd-index-module clearfix">
                <div class="index_activity" style="padding:0;margin:0;overflow:hidden;">
                    <a :href="data.body.dataList[0].command.content" style="padding:0;margin:0;" @click="clickAnalysis" position="0">
                        <!-- <img :src="data.body.dataList[0].imageUrl" :style="{width:'100%', height:data.body.height + 'px'}"> -->
                        <img class = "newImage" :src="data.body.dataList[0].imageUrl" style="width:100%;">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './bd_image_0.scss'
    import bd_image_0 from './bd_image_0.es6'
    export default bd_image_0
</script>