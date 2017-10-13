<template>
  <div class="back" @click="goDetail" v-if="isShow">
    <img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2017/10/12/%E8%B5%A0%E5%93%81_07.png" alt="">
  </div>
</template>
<script>
  import util from "../../../../utils/utils.es6"
  import native from "../../../../src/common/js/module/native.js"
  import date from "../../../../src/common/js/module/date.js"
  export default{
      props:['currentDate'],
      mounted(){
          console.log("hahaha",this.currentDate);
          this.timeStamp();
          this.show();
      },
      data(){
        return{
            isApp:util.utils.isApp(),
            url:"",
            isShow:null
        }
      },
      methods:{
        show(){
          if(this.currentDate >= 1508342400 && this.currentDate <= 1508601599){
            this.isShow=true;
          }else{
            this.isShow=false;
          }
        },
        timeStamp(){
          var now=date.format(this.currentDate+'000', 'yyyy-MM-dd');
          if(now >= '2017-10-19' && now <= '2017-10-20'){
            this.url='/t-15071.html';
          }else if( now == '2017-10-21'){
            this.url='/souvenir.html';
          }
        },
        goDetail(){
          var that=this;
          if(this.isApp){
            native.Browser.open({
              url:that.url
            })
          }else{
            window.location.href=that.url;
          }
        }
      }
  }
</script>
<style scoped>
  .back img{
    width: 3.75rem;
    height: 1.15rem;
  }
</style>
