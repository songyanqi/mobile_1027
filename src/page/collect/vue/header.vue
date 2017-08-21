<template>
  <div>
    <div class="top">
      <div class="header">
        <div class="head_img" @click="history">
          <i class="back-arrow"></i>
        </div>
        <div class="head_title">合辑页</div>
      </div>
    </div>
  </div>
</template>
<script>
 export default {
     methods:{
       history(){
           history.back();
       }
     }
 }
</script>
<style scoped>
  .top{
    position: fixed;
    top: 0;
  }
  .header{
    height: 44px;
    position: relative;
    width: 3.75rem;
    background: #fff;
    z-index: 999;
  }
  .head_img{
    position: absolute;
    left: 0;
    height: 100%;
    width: 44px;
  }
  .back-arrow{
    position: absolute;
    top: 15px;
    left: 15px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-bottom: 1px solid #333;
    border-left: 1px solid #333;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    cursor: pointer;
    font-size: 16px;
  }
  .head_title{
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
  }
</style>
