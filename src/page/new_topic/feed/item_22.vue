<template>
    <div>
      <!--<div class="img_container" v-if="environment==`menu`">-->
      <div class="img_container" v-if="environment=='menu'">
        <img src="http://pic.davdian.com/free/2017/01/16/750_88_f0322789dc2ae0bdf52dc09fe4d29002.png" alt="">
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
    background: #FDF6FF;
    color: #DA7AF2;
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
