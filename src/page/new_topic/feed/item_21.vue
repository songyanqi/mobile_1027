<template>
  <div>
    <!--<div class="img_container" v-if="environment==`menu`">-->
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/2017/01/16/750_88_b7b867f88cbbe333120de933699abefe.png" alt="">
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
    background: #F5FEFF;
    color: #26B6F9;
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
