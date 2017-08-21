<template>
  <div>
    <lheader title="标题" class="top" v-if="!isApp"></lheader>
    <div class="ndiv" v-if="!isApp"></div>
    <index_feed :data="data"></index_feed>
    <div class="empty"></div>
    <lfooter :income="income" :sub="isSub" :userstatus="userStatus" :albumid="albumId" :price="price"></lfooter>
    <maskk v-if="isApp && maskFlag"></maskk>
    <maskk2 v-if="!isApp && maskFlag"></maskk2>
    <data_mask></data_mask>
    <data_mask2></data_mask2>
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
  export default {
    components:{
      index_feed:index_feed,
      lheader:lheader,
      lfooter:lfooter,
      maskk:maskk,
      maskk2:maskk2,
      data_mask:data_mask,
      data_mask2:data_mask2
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
        maskFlag:false
      }
    },
    mounted:function () {
      this.getData();
    },
    methods:{
        getData(){
          var that=this;
          if(this.pageFlag){
              this.pageFlag=false;
              var obj={
                "albumId":that.albumId,
              };
            api("/api/mg/content/album/getAlbumData",obj)
              .then(function (result) {
                if(result.code==0){
                  if(result.data && result.data.feedList){
                    that.income=result.data.attr.income;
                    that.price=result.data.attr.price;
                    that.isSub=result.data.attr.isSub;
                    console.log("new=>>",that.isSub);
                    that.userStatus=result.visitor_status;
                    that.data=that.data.concat(result.data.feedList);
                    if (result.data.feedList.length >0){
                      that.pageFlag=true
                    }
                    native.Browser.setHead({
                      'title':'合辑页',
                      'backBtn':'1',
                      'shareBtn':"1",
                      'shareMoney':result.data.attr.income,
                    })
                  }else{
                    that.maskFlag=true;
                  }

                }else{
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
  .top{
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .ndiv{
    height: 44px;
  }
</style>
