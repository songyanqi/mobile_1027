<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">
        <tt_com_0 :data = 'data'></tt_com_0>
        <div class="df_new_model_con">
            <div class="clearfix">
                <div class="dvd-col-12">

                    <div v-for = "item in data.body.dataList" class="dvd-new-index-module-child dvd-col-6" style="height: 1rem;overflow: hidden;" :style="styleObject">
                        <a :href="item.command.content" @click="clickAnalysis" :position="item.position" style="height: 1rem;">
                            <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/374_200_8f1bcdbd06f1e4345047fb3bfad2741d.png" :data-original="item.imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(item.imageUrl)">
                            <div v-if = "item.position == 0 || item.position == 2" class="right_border"  :style="styleObject"></div>
                            <div v-if = "item.position == 3 || item.position == 2" class="top_border"  :style="styleObject"></div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './bd_image_4.scss'
    import bd_image_4 from './bd_image_4.es6'
    export default bd_image_4
</script>