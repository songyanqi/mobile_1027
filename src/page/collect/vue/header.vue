<template>
  <div>
    <div class="top">
      <div class="header">
        <div class="head_img" @click="history">
          <i class="back-arrow"></i>
        </div>
        <div class="head_title" v-text="title"></div>
        <!-- <div class="share">
          <div class="text">赚<span v-text="price"></span>元</div>
          <div class="icon"><img src="//pic.davdian.com/free/2017/08/28/homeShare.png" alt=""></div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
 export default {
     props:["title","price"],
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
    z-index: 80px;
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

    max-width: 2.15rem;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .share{
    position: absolute;
    right: 10px;
    display: inline-block;
    width: 73px;
    height: 28px;
    border: 1px solid #FF4A7D;
    border: 0.5px solid #FF4A7D;
    color: #FF4A7D;
    font-size: 14px;
    line-height: 20px;
    margin-top: 8px;
    top: 0;
    border-radius:2px;
    text-align: center;
    line-height: 28px;
  }
  .share>div{
    display: inline-block;

  }
  .icon img{
    height: 15px;
    width: 15px;
  }
</style>
