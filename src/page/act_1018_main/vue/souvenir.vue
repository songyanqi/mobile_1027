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
      computed:{
          now(){
              return this.currentDate;
          }
      },
      mounted(){
          this.init();
      },
      data(){
        return{
            isApp:util.utils.isApp(),
            url:"",
            isShow:null
        }
      },
      methods:{
        init(){
          if(this.now >= '2017-10-19' && this.now <= '2017-10-21'){
            this.isShow=true;
            if(this.now >= '2017-10-19' && this.now <= '2017-10-20'){
              this.url='/t-15071.html';
            }else if( this.now == '2017-10-21'){
              this.url='/souvenir.html';
            }
          }else{
            this.isShow=false;
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
