<template>
    <div class="hot_activity_cotnainer index_model" :style="[{ marginTop:data.marginTop },styleObject]">

        <tt_com_0 :data = "data"></tt_com_0>

        <div class="model_con">
            <div class="dvd-index-module clearfix">
                <div class="dvd-index-module clearfix" style="padding:6px 3px;" :style="styleObject">
                    <div v-for = "item in data.body.dataList" class="pull-left" style=" width: calc(33.3333333% - 8px);overflow: hidden;padding: 4px;">
                        <a :href="item.command.content" target="_self" @click="clickAnalysis" :position="item.position">
                            <!-- <img class="newImage" src="//pic.davdian.com/free/2016/12/07/246_246_06ffdb6b71c128464a35bae721bedae7.png" :data-original="item.imageUrl" style="width: 100%;display: inline;"> -->
                            <img class="newImage" v-lazy="imgObject(item.imageUrl)" style="width: 100%;display: inline;">
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './bd_image_1.scss'
    import bd_image from './bd_image_1.es6'
    export default bd_image
</script>