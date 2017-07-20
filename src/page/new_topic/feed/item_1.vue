<template>
  <div class="img_item">
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_img1.jpg" alt="">
    </div>
    <div v-if="environment=='preview'">
      <img :src="itemData.imgUrl||'https://dummyimage.com/600x300.png&text=click%20mea'" alt="">
    </div>
    <div v-if="environment=='show'" style="position: relative">
      <a v-if="itemData.link&&itemData.link.length" :href="itemData.link">
        <img :src="itemData.imgUrl||'https://dummyimage.com/600x300.png&text=click%20mea'" alt="">
      </a>
      <img style="position: relative;left: 0;top: 0;" v-else :src="itemData.imgUrl||'https://dummyimage.com/600x300.png&text=click%20mea'" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: "item1",
    data(){
      return {
        h: 100
      }
    },
    props: ['environment', 'fid', 'itemData'],
    mounted(){

      let img = new Image(), that = this;
      img.onload = function () {
        let el = that.$el;
        el.style.height = (el.clientWidth / img.width * img.height) + "px";
      };

      this.$nextTick(function () {
        img.src = this.itemData.imgUrl;
      });
    }
  }
</script>
<style scoped>

</style>
