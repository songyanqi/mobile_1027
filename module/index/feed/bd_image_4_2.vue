<!--四图八图模板-->
<template>
    <div :style="{ marginTop:data.marginTop + 'px' }">
        <tt_com_0 :data="data"></tt_com_0>
        <div v-if="show" class="bd_icon_0 index_links" :style="styleObject">
            <a class="link_item" v-for="item in data.body.dataList" :href="item.command.content" @click="clickAnalysis" :position="item.position">
                <img class="link_img newImage" :src="item.imageUrl">
            </a>
        </div>
    </div>
</template>

<script>
    import bd_icon from './bd_icon_0.es6'
    export default bd_icon
</script>
<style scoped>
    .index_links {
        width:100%;
        overflow: hidden;
        min-height:50px;
        background-color:#FFFFFF;
    }
    .bd_icon_0 {
        overflow: hidden;
         padding-top: 0px;
        background-color: #fff;
         margin-top: 0px;
    }
    .bd_icon_0 .link_item {
        float: left;
        width: 25%;
        text-align: center;
         padding-bottom: 0px;
         padding-top: 0px;
    }
    .bd_icon_0 .link_item .link_img {
        width:100%;
        margin-bottom: 0;
        max-width: 100%;
        max-height: 100%;
        display: inline-block;
    }
</style>
