<template>
  <div class="box">
    <div class="item" v-for="item in dataList" @click.stop="go_collect(item.albumId)">
      <img :src="item.imageUrl" alt="">
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
        go_collect(albumId){
          if(this.isApp){
            native.Browser.open({
              "url":"/collect.html?albumId"+albumId
            });
          }else{
            window.location.href="/collect.html?albumId="+albumId;
          }
        }
      }
  }
</script>
<style>
  .box{
    font-size: 0;
    padding-bottom: 0.22rem;
    padding-right: 0.21rem;
    padding-left: 0.3rem;
    padding-top:0.02rem;
  }
  .box>div{
    display: inline-block;
    vertical-align: top;
    margin-top:0.12rem;
    margin-right:0.09rem;
    background: #D8D8D8;
    border:1px solid #979797;
    width: 0.72rem;
    height: 0.35rem;
    box-sizing: border-box;
  }
  .item img{
    width: 0.72rem;
    height: 0.35rem;
  }
</style>
