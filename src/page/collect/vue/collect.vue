<template>
  <div>
    <lheader :title="title" class="top" v-if="!isApp"></lheader>
    <div class="ndiv" v-if="!isApp"></div>
    <index_feed :data="data"></index_feed>
    <div class="empty" v-if="isFree==1 && isSub==0" ></div>
    <div class="empty2" v-if="isFree==0 || (isFree==1 && isSub==1)"></div>
    <lfooter @re="reGetData" :share="shareInfo" v-if="isFree==1 && isSub==0" :income="income" :sub="isSub" :userstatus="userStatus" :albumid="albumId" :price="price"></lfooter>
    <maskk v-if="isApp && maskFlag"></maskk>
    <maskk2 v-if="!isApp && maskFlag"></maskk2>
    <data_mask v-if="isApp && maskFlag2"></data_mask>
    <data_mask2 v-if="!isApp && maskFlag2"></data_mask2>
    <top v-if="!isApp"></top>
  </div>

</template>
<script>
  import index_feed from '../../../../module/index/index_feed.vue'
  import api from "../../../../utils/api.es6"
  import {getQuery} from '../../../../utils/utils.es6';
  import dialog from '../../../../utils/dialog.es6';
//  import lheader from '../../../component/com-top-title.vue'
  import lheader from './header.vue'
  import lfooter from'./footer.vue'
  import appInterface from "../../../../utils/appInterface.es6"
  import util from "../../../../utils/utils.es6"
  import native from "../../../../src/common/js/module/native.js"
  import maskk from "./mask.vue"
  import maskk2 from "./mask2.vue"
  import data_mask from "./data_mask.vue"
  import data_mask2 from "./data_mask2.vue"
  import top from "../../../component/com-to-top-icon.vue"
  import share from '../../../common/js/module/share.js';
  import ua from '../../../common/js/module/ua.js';
  import Cookies from 'js-cookie'
  export default {
    components:{
      index_feed:index_feed,
      lheader:lheader,
      lfooter:lfooter,
      maskk:maskk,
      maskk2:maskk2,
      data_mask:data_mask,
      data_mask2:data_mask2,
      top:top
    },
    data(){
      return {
        data:[],
        albumId:getQuery("albumId"),
        pageFlag:true,
        userStatus:0,
        income:0,
        isSub:-1,
        price:0,
        name:"collect",
        isApp:util.utils.isApp(),
        maskFlag:false,
        maskFlag2:false,
        title:"",
        isFree:null,
        shareInfo:{}
      }
    },
    mounted:function () {
      this.getData();
    },
    methods:{
        reGetData(){
          window.location.reload();
        },
        getData(){
          var that=this;
          if(this.pageFlag){
              this.pageFlag=false;
              var obj={
                "albumId":that.albumId,
              };
            api("/api/mg/content/album/getAlbumData",obj)
              .then(function (result) {

                // 在微信中时，立即调用接口判断是否需要微信授权
                if (ua.isWeiXin()) {
                  // alert(ts.initResponse.data.needWxAuth === '1');
                  // alert(Cookies.get('act_baby_weixin_auth'));
                  if (result.data.needWxAuth === 1 && Cookies.get('act_baby_weixin_auth') === undefined) {
                    Cookies.set('act_baby_weixin_auth', 1, {
                      // domain: util.getBaseDomain(),
                      // path: '/',
                      // expires: 1,   // 有效时间1天
                      expires: 1 / 24 / 60    // 有效时间1分钟
                    });
                    // weixin.goAuthPage(true);
                    // ts.initResponse.data.authUrl值为http://open.davdian.com/WechatAPI/auth?access_key=davdian@)!$!)!*&get_open_id=1
                    location.href = result.data.authUrl + '&refer=' + location.href;
                    throw new Error(`即将跳转微信授权页(${location.href})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
                  }
                }

                if(result.code==0){
                  if (result.data && result.data.shareInfo){
                    try {
                      share.setShareInfo({
                        title: result.data.shareInfo.title,
                        desc: result.data.shareInfo.desc,
                        link: result.data.shareInfo.link,
                        imgUrl: result.data.shareInfo.imgUrl
                      });
                    } catch (err) {
                      alert(err)
                    }
                  }
                  if(result.data && result.data.feedList){
                    that.income=result.data.attr.income;
                    that.price=result.data.attr.price;
                    that.isSub=result.data.attr.isSub;
                    that.title=result.data.shareInfo.title;
                    that.isFree=result.data.attr.isFree;
                    that.shareInfo=result.data.shareInfo;

                    console.log("new=>>",that.isSub);
                    that.userStatus=result.visitor_status;
                    that.data=that.data.concat(result.data.feedList);
                    if (result.data.feedList.length >0){
                      that.pageFlag=true
                    }
                    window.iosInterface.getShareInfo = function () {
                      var shareInfo = {
                        title: that.shareInfo.title,
                        desc: that.shareInfo.desc,
                        link: that.shareInfo.link,
                        imgUrl: that.shareInfo.imgUrl
                      };
                      return JSON.stringify(shareInfo);
                    };
                  }else{
                    that.maskFlag2=true;
                  }
                  if (that.isFree==1 && that.isSub==0){
                    native.custom.initHead({
                      'shareOnHead': '1',
                      'isShowAudio':1,
                      'isAudioAbsorb':1
                    });
                  } else {
                    native.custom.initHead({
                      'shareOnHead': '1',
                      'isShowAudio':1,
                    });
                  }
                  setTimeout(function(){
                    native.Browser.setHead({
                      'title':that.title,
                      'backBtn':'1',
                      'shareBtn':"1",
                      'shareMoneyStr': result.data.attr.income
                    })
                  },300)
                }else{
                  that.maskFlag=true;
                  if(result.data.msg){
                    dialog.alert('code:'+result.code+":msg"+result.data.msg);
                  }else{
                    dialog.alert('code:'+result.code);
                  }
                }
              }).catch(function(e){
                that.maskFlag=true;
                that.pageFlag = true;
                console.log('e:', e)
            });
          }
        }
    }
  }
</script>
<style scoped>
  .empty{
    height:50px;
  }
  .empty2{
     height:10px;
   }
  .top{
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .ndiv{
    height: 44px;
  }
</style>
