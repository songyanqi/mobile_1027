<template>
    <div>
      <!--<div class="img_container" v-if="environment==`menu`">-->
      <div class="img_container" v-if="environment=='menu'">
        <img src="http://pic.davdian.com/free/2017/01/16/750_88_abe221dc815fe2c81c4bbc34ac9c7142.png" alt="">
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
    background: #FFF9E3;
    color: #F3A100;
  }
  @import "../title/title.css";
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
