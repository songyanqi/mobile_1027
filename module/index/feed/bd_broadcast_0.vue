<template>
    <div class="broadcast" style="height: 64px;">
        <div class="broadcast_img">
            <img :src = "data.body.titleImageUrl">
            <span class="broadcast_string"></span>
        </div>
        <div class="broadcast_title swiper-container swiper-container-vertical">
            <div class="swiper_wrap swiper-wrapper">
                <div v-for = "item in data.body.dataList" class="swiper-slide swiper-no-swiping" style="height: 64px;">
                    <a :href="item.command.content" class="swiper" @click="clickAnalysis" :position="item.position">
                        <div class = "broadcast_title_top">
                            <span class="headline">{{item.noticeText}}</span><span class="broadcast_title_txt">{{ item.title }}</span>
                        </div>
                        <p class="broadcast_title_bottom text_ellipsis">{{ item.subTitle }}</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//    import './bd_broadcast_0.scss'
    import bd_broadcast from './bd_broadcast_0.es6'
    export default bd_broadcast
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_broadcast_0.scss";
</style>
