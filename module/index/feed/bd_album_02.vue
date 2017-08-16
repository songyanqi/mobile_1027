<template>
  <div class="content2">
    <div class="content_buy">
      <div class="count"><span v-text="data.body.purchase"></span><span>人订阅</span></div>
      <div class="content_header">
          <div v-for="item in dataList">
            <img :src="item.imageUrl" alt="">
          </div>
        <div><img src="//pic.davdian.com/free/2017/08/16/Group4.png" alt=""
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:["data"],
    data(){
      return{
          dataList:[]
      }
    },
    created:function () {
      this.dataList=this.data.body.dataList;
    }
  }
</script>
<style scoped>
  .content2 {
    padding: 0 0.1rem 0.12rem 0.1rem;
    background: white;
  }

  .content_buy {
    position: relative;
    height: 0.25rem;
  }

  .content_buy .count {
    color: #666666;
    font-size: 14px;
    margin-top: 0.03rem;
    line-height: 0.2rem;
  }

  .content_buy > div {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
  }

  .content_header {
    position: absolute;
    right: 0;
  }

  .content_header > div {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
    margin-left: 0.05rem;
  }

  .content_header img {
    border-radius: 50%;
    height: 0.25rem;
    width: 0.25rem;
  }
</style>
