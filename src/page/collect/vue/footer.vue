<template>
  <div class="btn">
    <div class="btn_left" v-if="userstatus==1 || userstatus==0">成为会员免费听</div>
    <div class="btn_left" v-if="userstatus==3"><span>邀请赚¥</span><span v-text="price"></span></div>
    <div class="btn_right">
      <img src="//pic.davdian.com/free/2017/08/16/Rectangle.png" alt="">
      <div class="btn_text" @click="Subscribe" v-if="isSub==0 && (userstatus==1 || userstatus==0)">
        <span><span>订阅合辑</span><span v-if="ifPrice">:¥</span><span v-text="isPrice"></span></span>
      </div>
      <div class="btn_text" @click="Subscribe" v-if="isSub==0 && userstatus==3">
        <span>会员免费订阅</span>
      </div>
      <div class="btn_text2" v-if="isSub==1">
        <span>已订阅</span>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "../../../../utils/api.es6"
  import native from "../../../../src/common/js/module/native.js"
  import dialog from "../../../../utils/dialog.es6";
  import {getQuery} from "../../../../utils/utils.es6";
  import util from "../../../../utils/utils.es6";
  export default {
    props:["income","sub","userstatus","albumid","price"],
    computed:{
      isSub:function () {
        return this.sub;
      },
      isPrice:function () {
        return this.price;
      }
    },
    data(){
      return {
        priceFlag:true,
        isapp: util.utils.isApp()
      }
    },
    mounted:function () {
      console.log(this.isPrice);
    },
    methods:{
      ifPrice(){
          if(this.isPrice=="0.00"){
              return false;
          }else{
              return true;
          }
      },
      nativePay(url, callback){
        var option = {};
        option.url = encodeURIComponent(url);
        if (url.split("app_pay/").length > 1) {
          var list = url.split("app_pay/")[1].split("&");
          for (var i = 0; i < list.length; i++) {
            var key = list[i].split("=")[0];
            var value = list[i].split("=")[1];
            option[key] = value;
          }
        }
        option.success = callback;
        native.Browser.pay(option)
      },
      Subscribe(){

        var that=this;
        var obj={
            albumId:that.albumid,
            shareUserId:getQuery('shareUserId') || ''
        };
        api("/api/mg/content/album/subscription",obj)
          .then(function(result) {
            let {code, data: {msg, payUrl, jsApi}} = result;
            if (code == 0) {
              if (result.data.code == 300) {
                if (jsApi) {
                  jsApi.jsApiParameters.dvdhref = location.href;
                  window.location.href = "http://open.davdian.com/wxpay_t2/davke_pay.php?info=" + encodeURIComponent(JSON.stringify(jsApi.jsApiParameters))
                  // bravetime.goto("http://open.vyohui.cn/wxpay_t3/davke_pay.php?info="+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters)));
                } else if (payUrl) {
                  that.nativePay(payUrl, function (flag) {
                    if (flag) {
                      that.sub=1;
                      // 报名成功(进不来)
                    }
                  });
                } else {
                  that.sub=1;
                  alert(123456);
                  // 报名成功
                }
              } else {
                that.sub=1;
                dialog.alert(result.data.msg);
                that.$emit("re");
              }
            }else {
              if (result.data.code == 400){
                if (that.isapp){
                  native.Account.login()
                }else {
                  window.location.href = '/login.html'
                }
              }
              dialog.alert('code:' + code + 'msg:'+ result.data.msg)
            }
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
    z-index:7;
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
