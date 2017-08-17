<template>
  <div class="con">
    <div class="big_img">
      <div class="list_line"></div>
      <div class="list_date">今日更新</div>
      <div class="list_line"></div>
    </div>
    <div class="all">
      <div class="list_all" v-for="item in dataList">
        <div class="list">
          <div class="list_left">
            <div class="list_content" v-text="item.title"></div>
            <div class="times">
              <div class="time" v-text="item.time"></div>
              <div class="name" v-text="item.album"></div>
            </div>
          </div>
          <div class="list_right" @click="music_detail(item.musicContent)">
            <img :src="item.imageUrl" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:["data"],
    created:function () {
      this.dataList=this.data.body.dataList;
    },
    data(){
     return{
         dataList:[]
     }
    },
    methods:{
      music_detail(link){
          window.location.href=link;
      }
    }
  }
</script>
<style scoped>
  .con{
    background: white;
  }
  .container{
    margin-top: 0.1rem;
    text-align:right;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
  .title{
    padding-top: 0.15rem;
    padding-bottom: 0.05rem;
    height: 0.22rem;
  }
  .title img{
    margin-top: 0.02rem;
    width: 2.5rem;
    height: 0.16rem;
  }
  .list{
    padding-top:0.1rem;
    padding-bottom:0.1rem;
    font-size: 0;
    position: relative;
  }
  .list>div{
    display:inline-block;
  }
  .list_left{
    font-size: 0.14rem;
  }
  .list_right{
    font-size:0.11rem;
    position: absolute;
    right: 0;
    margin-top: 0.05rem;
  }
  .list_content{
    max-width: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.05rem;
  }
  .list_right img{
    height: 0.34rem;
    width: 0.34rem;
    border-radius: 47px;
  }
  .list_all{
    padding: 0 0.1rem;
    border-top: 1px solid #E1E1E1;
  }
  .times>div{
    display: inline-block;
    font-size: 0;
    line-height:0.16rem;
  }
  .times .time{
    padding-right: 0.1rem;
    border-right: 1px solid #999999;
    font-size:11px;
    margin-right:0.05rem;
  }
  .times .name{
    font-size: 11px;
  }
  .all .list_all:nth-child(1){
    border: 0;
  }



  .big_img{
    text-align: center;
    height: 0.2rem;
    padding-top:0.15rem;
    padding-bottom:0.05rem;
    font-size: 0;
  }
  .big_img>div{
    display:inline-block;
    vertical-align: top;
  }
  .list_date{
    color:#333333;
    font-size:16px;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
  }
  .list_line{
    height: 0.01rem;
    background: #333333;
    width: 0.15rem;
    margin-top: 0.1rem;
  }
</style>


