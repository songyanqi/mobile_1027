<template>
  <div class="btn">
    <div class="btn_left" v-if="userstatus==1 || userstatus==0">成为会员免费听</div>
    <div class="btn_left" v-if="userstatus==3"><span>邀请赚</span><span v-text="price"></span></div>
    <div class="btn_right">
      <img src="//pic.davdian.com/free/2017/08/16/Rectangle.png" alt="">
      <div class="btn_text" @click="Subscribe" v-if="issub==0 && (userstatus==1 || userstatus==0)">
        <span><span>订阅合辑:</span><span v-text="price"></span></span>
      </div>
      <div class="btn_text" @click="Subscribe" v-if="issub==0 && userstatus==3">
        <span>会员免费订阅</span>
      </div>
      <div class="btn_text2" v-if="issub==1">
        <span>已订阅</span>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "../../../../utils/api.es6"
  export default {
    props:["income","issub","userstatus","albumid","price"],
    methods:{
      Subscribe(){
        var that=this;
        var obj={
            "albumId":that.albumid
        };
        api("/api/mg/content/album/subscription",obj)
          .then(function(result){
            let {data:{payUrl,jsApi}}=result;
            if(this.userStatus==3){
                this.issub=1;
                bravetime.info("订阅成功");
            }else if(this.userStatus==1){
              if(jsApi){
                jsApi.jsApiParameters.dvdhref=location.href;
                bravetime.goto("http://open.davdian.com/wxpay_t2/davke_pay.php?info="+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters)));
              }else if(payUrl){
                bravetime.nativePay(payUrl,function (flag) {
                  if(flag){
                    that.issub = 1;
                    bravetime.info("订阅成功");
                  }
                });
              }
            }
          }).catch(function(){

          })

      }
    }
  }
</script>
<style scoped>
  .btn{
    font-size: 0;
    height: 50px;
    position: fixed;
    bottom: 0;
    z-index:10;
  }
  .btn>div{
    display: inline-block;
    vertical-align: top;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .btn_left{
    width: 1.6rem;
    font-size: 14px;
    background: #F9F7F8;
  }
  .btn_right{
    width: 2.15rem;
    font-size: 14px;
    background: red;
    color: white;
    position: relative;
  }
  .btn_right img{
    width: 2.15rem;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .btn_text{
    text-align: center;
    width: 2.15rem;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
  }
  .btn_text2{
    text-align: center;
    width: 2.15rem;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: gray;
    color:#fff;
  }

</style>
