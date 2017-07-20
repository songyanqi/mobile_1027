<template>
  <div>
    <!--<div class="img_container" v-if="environment==`menu`">-->
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_img1.jpg" alt="">
    </div>
    <div v-if="environment=='preview'">
      <!--<img :src="itemData.imgList[0].imgUrl||`https://dummyimage.com/600x300.png&text=click%20mea`" alt="">-->
      <img :src="itemData.imgList[0].imgUrl||'https://dummyimage.com/600x300.png&text=click%20mea'" alt="">
    </div>
    <div v-if="environment=='show'">
      <swiper loop auto :aspect-ratio="ratio" :list="list" :show-desc-mask="false" :show-dots="false">
      </swiper>
    </div>
  </div>
</template>
<script>
  import {Swiper, SwiperItem} from 'vux'
  export default {
    name: "item26",
    data(){
      return {list: [], ratio: 0.5}
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: ['environment', 'fid', 'itemData'],
    created(){
      let that = this;
      for (let i = 0, d; d = this.itemData.imgList[i++];) {
        if (d.imgUrl && d.link) {
          this.list.push({img: d.imgUrl, url: d.link})
        }

      }
      const imgUrl = this.list[0].img;
      let imgObj = new Image();
      imgObj.onload = function () {
        that.ratio = imgObj.height / imgObj.width;
      };
      imgObj.src = imgUrl;
    }
  }
</script>
