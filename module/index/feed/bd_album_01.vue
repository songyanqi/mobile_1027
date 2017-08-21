<template>
  <div class="all">
    <div class="big_img">
      <img id="uuu" :src="dataList.imageUrl" alt="">
    </div>
    <div class="content">
      <div class="content_title" v-text="dataList.album"></div>
      <div class="content_price" v-if="isFree==1">
        <div class="pri_left">
          <span v-text="dataList.income"></span>
        </div>
        <div class="pri_right" v-text="dataList.memberMsg"></div>
      </div>
      <div class="content_text" v-text="dataList.comment"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props:["data"],
    created:function () {
      this.dataList=this.data.body.dataList[0];
      this.isFree=this.data.body.isFree;
    },
    data(){
        return{
            dataList:[],
            isFree:0
        }
    }
  }
</script>
<style scoped>
  .all {
    padding-bottom: 0.12rem;
    background: white;
  }

  .big_img {
    margin-bottom: 0.1rem;
  }

  .content {
    padding: 0.1rem 0.1rem 0 0.1rem;
  }

  .big_img img {
    width: 3.75rem;
  }

  .content_title {
    font-size: 14px;
    color: #333333;
    margin-bottom: 0.15rem;
  }

  .content_price {
    margin-bottom: 0.15rem;
  }

  .content_text {
    color: #999999;
    font-size: 12px;
  }

  .content_price .pri_left {
    color: #FF4A7D;
    font-size: 18px;
  }

  .content_price > div {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
  }

  .content_price .pri_right {
    color: #BF9D51;
    font-size: 11px;
    margin-top: 0.04rem;
  }
</style>
