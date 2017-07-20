<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">

        <tt_com_0 :data = 'data'></tt_com_0>

        <div class="df_new_model_con">
            <div class="clearfix">


                <div v-for = 'item in data.body.dataList' class="dvd-new-index-module-child dvd-col-3"  style="height: 1rem;overflow: hidden;" :style="styleObject">
                    <a :href="item.command.content" @click.stop="clickAnalysis" :position="item.position" style="height: 1rem;">
                        <!-- <img src="//pic.davdian.com/free/2016/12/12/186_200_a6669de09ca5ea05bbb83d30293165b5.png" class="newImage" style="height: 1rem;overflow: hidden;" :data-original="item.imageUrl"> -->
                        <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(item.imageUrl)">
                        <div v-if = "item.position !=3" class="right_border" :style="styleObject"></div>
                    </a>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import './bd_image_6.scss'
    import bd_image_6 from './bd_image_6.es6'
    export default bd_image_6
</script>