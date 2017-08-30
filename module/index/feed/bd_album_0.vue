<template>
  <div class="box">
    <div @click="go_collect(item.albumId)" v-for="item in dataList">
      <div class="circle" :style="{'background-image':styleObject(item.imageUrl)}"></div>
    </div>
  </div>
</template>
<script>
  import util from "../../../utils/utils.es6";
  import native from "../../../src/common/js/module/native";
  export default {
      props:["data"],
      mounted:function () {
        this.dataList=this.data.body.dataList;
      },
      data(){
          return {
              dataList:[],
              isApp:util.utils.isApp()
          }
      },
      methods:{
        styleObject(item){
            return "url("+ item +")";
        },
        go_collect(albumId){
          if(this.isApp){
            native.Browser.open({
              "url":"/collect.html?albumId="+albumId
            });
          }else{
            window.location.href="/collect.html?albumId="+albumId;
          }
        }
      }
  }
</script>
<style scoped lang="sass">
  .box{
    height: 1.86rem;
    width: 100%;
    font-size: 0;
    background: #fff;
    margin-bottom: 0.1rem;
  }
  .box>div{
    display: inline-block;
    width: 25%;
    height: 0.93rem;
    vertical-align: top;
    text-align: center;
  }
  .circle{
    display: inline-block;
    width: 100%;
    height: 0.93rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>
