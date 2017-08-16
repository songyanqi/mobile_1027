<template>
  <div class="box">
    <a :href="item.command.content" v-for="item in dataList"><div class="item"><img :src="item.imageUrl" alt=""></div></a>
  </div>
</template>
<script>
  export default {
      props:["data"],
      created:function () {
        this.dataList=this.data.body.dataList;
      },
      data(){
          return {
              dataList:[]
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
  .box>a>div{
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
