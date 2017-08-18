<template>
  <div>
    <notopen></notopen>
    <lheader></lheader>
    <index_feed :data="data"></index_feed>
    <div class="empty" v-if="isFree==1"></div>
    <lfooter v-if="isFree==1"></lfooter>
  </div>

</template>
<script>
  import index_feed from '../../../../module/index/index_feed.vue'
  import notopen from "../../../component/com-wx-notopen.vue"
  import api from "../../../../utils/api.es6"
  import {getQuery} from '../../../../utils/utils.es6';
  import dialog from '../../../../utils/dialog.es6';
  import lheader from './header.vue'
  import lfooter from'./footer.vue'
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
        isFree:0,
        musicId:0
      }
    },
    created:function () {
      var result=require('../json/collect.json');
      this.data=result.data.feedList;
      this.isFree=result.data.isFree;
    },
    mounted:function () {
      this.init();
    },
    methods:{
        init(){
            this.getData();
            this.scro();
        },
        getData(){
          var that=this;
          if(this.pageFlag){
              this.pageFlag=false;
              var obj={
                "albumId":that.albumId
              };
            api("/api/mg/content/album/getAlbumData",obj)
              .then(function (result) {
                if(result.code==0){
                  this.data=this.data.concat(result.data.feedList);
                  result.data.feedList.map(function (item,index) {
                    if(item.body.dataList.contentList){
                      item.body.dataList.contentList.map(function (item2,index2) {
                        that.musicId=item2.musicId;
                      })
                    }
                  })
                  if (result.data.feedList.length >0){
                    that.pageFlag=true
                  }
                }else{
                  dialog.alert('code:'+result.code);
                }
              }).catch(function(e){
                that.pageFlag = true;
                console.log('e:', e)
            });
          }
        },
        getMoreList(){
          var that=this;
          if(this.pageFlag){
            this.pageFlag=false;
            var obj={
              "albumId":that.albumId,
              "musicId":that.musicId
            };
            api("/api/mg/content/music/getListData",obj)
              .then(function (result) {
                if(result.code==0){
                  this.data.push(result);

                  result.body.dataList.contentList.map(function (item,index) {
                    that.musicId=item.musicId;
                  });

                  if (result.data.feedList.length >0){
                    that.pageFlag=true
                  }

                }else{
                  dialog.alert('code:'+result.code);
                }
              }).catch(function(e){
                that.pageFlag = true;
                console.log('e:', e)
            });
          }
        },
        scro(){
          var _this=this;
          $(window).scroll(function(){
              var el = $("body").get(0);
              var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
              if (bottom<100){
                _this.getMoreList();
              }
            });
          }
        }
    }
</script>
<style scoped>
  .empty{
    height: 0.49rem;
  }
</style>
