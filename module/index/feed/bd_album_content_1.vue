<template>
  <div>
    <div class="list1">
      <div class="big_img">
        <div class="list_line"></div>
        <div class="list_date" v-text="week"></div>
        <div class="list_line"></div>
      </div>
      <div class="list" v-for="item in dataList">
        <div class="left_img">
          <img :src="item.imageUrl" alt="">
        </div>
        <div class="list_content">
          <div class="list_title" v-text="item.music"></div>
          <div class="list_name" v-text="item.album"></div>
          <div class="list_time" v-text="item.time"></div>
        </div>
        <div class="right_img" @click="">
            <div @click="go_href(item.command.content)"></div>
            <img :src="item.imageUrl" alt="">
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
      props:["data"],
      data(){
          return {
              dataList:[],
              upTime:"",
              week:""
          }
      },
      created:function () {
        this.dataList=this.data.body.dataList;
        this.upTime=this.data.body.upTime;
        this.week=this.getLocalTime(this.upTime);
//         console.log(this.getLocalTime(this.upTime));
//         console.log(new Date(parseInt(this.upTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '));
//         console.log(new Date(2017,7,11).getDay());
      },
      methods:{
        getLocalTime(nS){
          let time= new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
          let timestamp=time.split(" ")[0].split("/");
          let y=parseInt(timestamp[0]);
          let m=parseInt(timestamp[1]);
          let d=parseInt(timestamp[2]);
          let year=new Date().getFullYear();
          let month=new Date().getMonth()+1;
          let day=new Date().getDate();
          let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
          let week=new Date(y,m-1,d).getDay();
          if(y === year && m === month && d === day){
              return "今日更新";
          }else {
              return m + "月" + d + "日" + " " + weekDay[week];
          }
        },
        go_href(href){
            window.location.href=href;
        }
      }
  }
</script>
<style scoped>
  .big_img{
    text-align: center;
    height: 0.2rem;
    padding-top:0.13rem;
    padding-bottom:0.15rem;
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

  .list1{
    border-bottom: 1px solid #E1E1E1;
    background: #ffffff;
  }
  .list1 .list:nth-child(2){
    margin-bottom: 0.2rem;
  }


  .list{
    font-size: 0;
    height: 0.76rem;
    padding:0 0.1rem;
    margin-bottom:0.27rem;
    position: relative;
  }

  .list>div{
    display: inline-block;
    vertical-align: top;
  }
  .left_img img{
    width:0.76rem;
    height: 0.76rem;
    border-radius:4px;
  }
  .list_content{
    margin-left: 0.1rem;
    height: 0.76rem;
  }
  .list_title{
    font-size:14px;
    line-height:0.2rem;
    color:#333333;
    max-width:2.15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
  }
  .list_name,.list_time{
    font-size:11px;
    line-height:0.16rem;
    color:#999999;
  }
  .list_name{
    margin-bottom:0.07rem;
  }
  .right_img img{
    width: 0.34rem;
    height: 0.34rem;
    border-radius:50%;

  }
  .right_img{
    position: absolute;
    right: 0.1rem;
    margin-top: 0.24rem;
  }
</style>
