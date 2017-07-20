<template>
    <!-- 轮播图 -->
    <div class="swiper-container index_ads mb_10">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list">
                <a :href="item.link">
                    <img :src="item.img">
                </a>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</template>
<style>

</style>
<script>
export default{
        props: ['list','category'],
        data(){
            return{
                msg:'hello vue'
            }
        },
        created(){

        },
        mounted(){
            new Swiper('.index_ads', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                centeredSlides: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false,
                loop: true,
                preloadImages: false,
                lazyLoading: true
            });
        },
        updated(){


        }
    }
</script>
