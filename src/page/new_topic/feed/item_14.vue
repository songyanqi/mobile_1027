<template>
    <div>
      <!--<div class="img_container" v-if="environment==`menu`">-->
      <div class="img_container" v-if="environment=='menu'">
        <img src="http://pic.davdian.com/free/theme_thu_img14.jpg" alt="">
      </div>

    </div>
</template>
<script>
  export default {
      data(){
          return{

          }
      },
    props:['environment']
  }
</script>
