<template>
  <div>
    <!--<div class="img_container" v-if="environment==`menu`">-->
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_img4.jpg" alt="">
    </div>
    <!--<div v-if="environment==`preview`" class="btn_container">-->
    <div v-if="environment=='preview'" class="btn_container">
      <span v-text="itemData.con|| '回到首页'" class="btn"></span>
    </div>

    <!--<div v-if="environment==`show`" class="btn_container">-->
    <div v-if="environment=='show'" class="btn_container">
      <a :href="itemData.link" v-if="itemData.link&&itemData.link.length">
        <span v-text="itemData.con" class="btn"></span>
      </a>
      <span v-text="itemData.con" class="btn" v-else></span>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    props: ['environment', 'itemData']
  }
</script>
<style scoped="">
  .btn_container {
    text-align: center;
    background: #f1f1f1;
    min-height:80px;
  }

  .btn {
    color: #d73c6b;
    border: 1px solid #d73c6b;
    padding: 0 20px;
    border-radius: 3px;
    font-size: 12px;
    display: inline-block;
    line-height: 22px;
    background-color: #fff;
    box-sizing: border-box;
  }
</style>
