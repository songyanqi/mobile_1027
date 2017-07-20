<template>
    <div>
      <!--<div class="img_container" v-if="environment==`menu`">-->
      <div class="img_container" v-if="environment=='menu'">
        <img src="http://pic.davdian.com/free/theme_thu_img13.jpg" alt="">
      </div>
      <!--<div class="video_container" v-if="environment==`preview`">-->
      <div class="video_container" v-if="environment=='preview'">
        <!--<img v-if="!itemData.con||itemData.con==``" src="https://dummyimage.com/600x300.png&text=click%20me%20to%20input" alt="">-->
        <img v-if="!itemData.con||itemData.con==''" src="https://dummyimage.com/600x300.png&text=click%20me%20to%20input" alt="">
        <div v-html="itemData.con" v-else></div>
      </div>

      <!--<div v-if="environment==`show`&&itemData.con&&itemData.con.length">-->
      <div v-if="environment=='show'&&itemData.con&&itemData.con.length">
        <div v-html="itemData.con"></div>
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
