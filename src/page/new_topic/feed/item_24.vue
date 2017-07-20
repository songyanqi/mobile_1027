<template>
  <div>
    <!--<div class="img_container" v-if="environment==`menu`">-->
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/2017/01/17/750_20_9c94e8e5db15bafa28f32fcba2eb40c7.png" alt="">
    </div>
    <div v-if="environment=='preview'||environment=='show'">
      <div :style="{height:itemData.value+'px'}"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    props: ['environment', "itemData"]
  }
</script>
