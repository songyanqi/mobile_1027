<template>
    <div>
      <!--<div class="img_container" v-if="environment==`menu`">-->
      <div class="img_container" v-if="environment=='menu'">
        <img src="http://pic.davdian.com/free/theme_thu_img3.jpg" alt="">
      </div>
      <div v-if="environment=='preview'">
        <!--<div v-text="itemData.con ||`请在右侧输入内容`"></div>-->
        <div v-text="itemData.con ||'请在右侧输入内容'"></div>
      </div>
      <div v-if="environment=='show'">
        <div style="font-size: 14px;padding: 10px;line-height: 1.4;" v-html="itemData.con"></div>
      </div>
    </div>
</template>
<script>
  export default {
      data(){
          return{
            spaceHandle:"444"
          }
      },
    filters:{
      spaceHandle:function (value) {
        return value;
      }
    },
    name:"item8",
    props:['environment','itemData'],
    methods:{
      spaceHandle:function (value) {
          return value;
      }
    }
  }
</script>
