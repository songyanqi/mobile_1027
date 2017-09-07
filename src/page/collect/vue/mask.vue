<template>
  <div>
    <div class="mask"></div>
    <div class="banner">
      <div class="big_img"><img src="//pic.davdian.com/free/2017/08/21/Group5.png" alt=""></div>
      <div style="text-align: center;margin-top: 0.3rem;">合辑没有音频</div>
      <!--<div class="btn" style="margin-top: 0.2rem;" @click="reload">点击重新加载</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    methods:{
      reload(){
          window.location.reload();
      }
    }
  }
</script>
<style scoped>
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #F1F1F1;
    z-index: 12;
  }
  .banner{
    margin-top: 1rem;

  }
  .btn{
    width: 1.44rem;
    height: 0.33rem;
    border-radius: 100px;
    border:1px solid #999999;
    color: #333333;
    font-size: 12px;
    text-align: center;
    line-height: 0.33rem;
    margin: 0 auto;
  }

  .banner{
    position: fixed;
    top: 0;
    z-index: 13;
    text-align: center;
    width: 3.75rem;
  }
  .big_img{
    height: 1.2rem;
    width: 1.2rem;
    margin: 0 auto;
  }
  .big_img img{
    height: 1.2rem;
    width: 1.2rem;
  }
</style>
