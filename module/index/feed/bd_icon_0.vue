<template>
    <div v-if="show" class="bd_icon_0 index_links" :style="styleObject">
        <a class="link_item" v-for="item in data.body.dataList" :href="item.command.content" @click="clickAnalysis" :position="item.position" style="height: 72px;">
            <div style="height: 46px;">
                <img class="link_img newImage" :src="item.imageUrl">
            </div>
            <div class="link_text" v-text="item.title"></div>
        </a>
    </div>
</template>
<script>
//    import './bd_icon_0.scss'
    import bd_icon from './bd_icon_0.es6'
    export default bd_icon
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_icon_0.scss";
</style>
