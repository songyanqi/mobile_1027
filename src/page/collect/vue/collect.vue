<template>
  <div>
    <notopen></notopen>
    <lheader title="标题" class="top"></lheader>
    <index_feed :data="data"></index_feed>
    <div class="empty"></div>
    <lfooter :income="income" :issub="isSub" :userstatus="userStatus" :albumid="albumId" :price="price"></lfooter>
  </div>

</template>
<script>
  import index_feed from '../../../../module/index/index_feed.vue'
  import notopen from "../../../component/com-wx-notopen.vue"
  import api from "../../../../utils/api.es6"
  import {getQuery} from '../../../../utils/utils.es6';
  import dialog from '../../../../utils/dialog.es6';
//  import lheader from '../../../component/com-top-title.vue'
  import lheader from './header.vue'
  import lfooter from'./footer.vue'
  import appInterface from "../../../../utils/appInterface.es6"
  export default {
    components:{
      index_feed:index_feed,
      notopen:notopen,
      lheader:lheader,
      lfooter:lfooter
    },
    data(){
      return {
        data:[],
        albumId:getQuery("albumId"),
        pageFlag:true,
        userStatus:0,
        income:0,
        isSub:0,
        price:0,
        name:"collect"
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
                    that.userStatus=result.visitor_status;
                    that.data=that.data.concat(result.data.feedList);
                    if (result.data.feedList.length >0){
                      that.pageFlag=true
                    }
                  }else{
                    //显示错误页面
                  }

                }else{
                  if(result.data.msg){
                    dialog.alert('code:'+result.code+":msg"+result.data.msg);
                  }else{
                    dialog.alert('code:'+result.code);
                  }
                }
              }).catch(function(e){
                 //显示错误页面
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
    height: 0.49rem;
  }
  .top{
    position: fixed;
    top: 0;
    z-index: 999;
  }
</style>
