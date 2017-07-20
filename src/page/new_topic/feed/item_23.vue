<template>
    <div>
      <!--<div class="img_container" v-if="environment==`menu`">-->
      <div class="img_container" v-if="environment=='menu'">
        <img src="http://pic.davdian.com/free/2017/01/16/750_88_00ba53166b249f80458d6e25fd824934.png" alt="">
      </div>
      <div v-if="environment=='preview'||environment=='show'">
        <div class="titText">
          <span class="title_left">//</span>
          <span v-text="itemData.navigationTitle"></span>
          <span class="title_right">//</span>
        </div>
      </div>
    </div>
</template>
<style scoped="">
  .titText {
    background: #FFEDF2;
    color: #FF4A7D;
  }
</style>
<script>
  import '../title/title.css';
  export default {
    data(){
      return {}
    },
    props: ['environment', "itemData"]
  }
</script>
