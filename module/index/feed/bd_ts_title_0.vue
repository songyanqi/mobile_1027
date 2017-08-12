<template>
  <div class="hot_activity_cotnainer index_model" :style="[{ marginTop:data.marginTop },styleObject]">

    <div class="model_con">
      <div class="dvd-index-module clearfix">
        <!-- <div class="index_activity" style="padding:0;margin:0;height:1.4rem;overflow:hidden;">
            <a :href="data.body.dataList[0].command.content" style="height: 1.4rem;padding:0;margin:0;" @click="clickAnalysis" position="0">
                <img class = "newImage" :src="data.body.dataList[0].imageUrl" style="width:100%;height: 1.4rem;">
            </a>
        </div> -->
        <div class="index_activity" style="padding:0;margin:0;overflow:hidden;">
          <div style="padding:0;margin:0;" @click="clickAnalysis" position="0">
            <img class = "newImage" :src="data.body.dataList[0].imageUrl" style="width:100%;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import './bd_image_0.scss'
  import layout from "../layout.es6"
  export default {
    data(){
      return {
        msg: 'hello vue'
      }
    },
    props: ['data'],
    computed: {
      styleObject: function () {
        let scope = this;
        return layout.styleObject(scope.data);
      }
    },
    components: {

    },
    methods:{
      imgObject:function (imgSrc) {
        return{
          src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
          error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
          loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
        }
      },
      clickAnalysis:function(item) {
        layout.clickAnalysis(item,this,'body');
      }
    }
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_image_0.scss";
</style>
