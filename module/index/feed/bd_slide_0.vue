<template>
    <div class="bd_slide_0 swiper-container"  v-if='data && data.body && data.body.dataList && data.body.dataList[0]'>
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in data.body.dataList">
                <a :href="item.command.content" @click.stop="clickAnalysis" :position="item.position">
                    <img class="swiper-lazy newImage" :src="item.imageUrl">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
//    import './bd_slide_0.scss'
    import slide from './bd_slide_0.es6'
    export default slide
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_slide_0.scss";

  .newImage{
    width: 100%;
  }
</style>
