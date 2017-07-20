<template>
  <div>
    <!--<div class="img_container" v-if="environment==`menu`">-->
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/theme_thu_img6.jpg" alt="">
    </div>
    <!--<div class="title_container" v-if="environment==`preview`||environment==`show`">-->
    <div class="title_container" v-if="environment=='preview'||environment=='show'">
      <span class="title_left"></span>
      <!--<span class="title_text" v-html="itemData.con||`请输入文字`"></span>-->
      <span class="title_text" v-html="itemData.con||'请输入文字'"></span>
      <span class="title_right"></span>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    props:['environment','itemData']
  }
</script>
<style scoped>
  .title_container{
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
  }
  .title_left{
    margin-right: 5px;display: inline-block;width: 50px;height: 1px;background-color: #333; vertical-align: middle;
  }
  .title_text{
    line-height: 20px;font-size: 14px;border-radius: 10px;display: inline-block;padding: 0 10px;
  }
  .title_right{
    margin-left: 5px;display: inline-block;width: 50px;height: 1px;background-color: #333; vertical-align: middle;
  }
</style>
