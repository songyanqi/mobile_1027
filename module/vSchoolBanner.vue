<style>
    .swiper-pagination-bullet-active {
        background-color:#FF4A7D!important;
    }
    .swiper-pagination-bullet {
        background-color:#dedede;
        opacity: 1;
    }
    .newImage {
        object-fit: cover;
        object-position: center;
    }
</style>
<template>
    <!--:src="item.imageUrl"-->
    <!--src="http://pic.davdian.com/free/2016/12/29/750_280_a32c08a1380c5e5360fb61f3bf231bbe.png"-->
    <!--v-lazy="imgObject(item.imageUrl)"-->
    <!-- 轮播图 -->
    <swiper :options="swiperOption" ref="mySwiperA">
        <!-- 幻灯内容 -->
        <swiper-slide v-for="(item,index) in list">
            <a :href="item.command.content" :style="widthBanner">
                <img style="width: 100%;" class="newImage" :style="widthBanner" :src="item.imageUrl">
            </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!--<div class="swiper-container vSchool">-->
        <!--<div class="swiper-wrapper">-->
        <!--&lt;!&ndash;<div class="swiper-slide"><a href=""><img src="//pic.davdian.com/free/1111_pic1_1110.png"></a></div>&ndash;&gt;-->
        <!--<div v-for="item in list" class="swiper-slide">-->
            <!--<a :href="item.command.content" :style="widthBanner">-->
                <!--<img style="width: 100%;" class="swiper-lazy newImage" :style="widthBanner" :src="item.imageUrl">-->
            <!--</a>-->
        <!--</div>-->
    <!--</div>-->

        <!-- Add Pagination -->
        <!--<div class="swiper-pagination" style="bottom: 0.03rem;"></div>-->
    <!--</div>-->

</template>

<script>
    export default{
        data:function () {
            return{
                swiperOption: {
                    autoplay: 3500,
                    setWrapperSize :true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    mousewheelControl : true,
                    observe:true,
                    autoplayDisableOnInteraction: false,
                    centeredSlides: true,
                    loop:true,
                    initialSlide :1,
                    lazyload:true,
                },
            }
        },
        props:['list'],
        created:function () {
//            this.$nextTick(function () {
//                new Swiper('.vSchool', {
//                    pagination: '.swiper-pagination',
//                    paginationClickable: true,
//                    centeredSlides: true,
//                    autoplay: 2500,
//                    autoplayDisableOnInteraction: false,
//                    loop: true,
//                    preloadImages:false,
//                    lazyLoading : true
//                })
//            })
        },
        computed:{
            widthBanner:function () {
                return {
                    height:  (document.body.offsetWidth * 0.426666666) + 'px'
                }
            },
        },
        methods:{
            imgObject:function (imgSrc) {
                return{
                    src: imgSrc,
                    error: '//pic.davdian.com/free/2016/12/29/750_280_a32c08a1380c5e5360fb61f3bf231bbe.png',
                    loading: '//pic.davdian.com/free/2016/12/29/750_280_a32c08a1380c5e5360fb61f3bf231bbe.png'
                }
            },
        },
    }
</script>