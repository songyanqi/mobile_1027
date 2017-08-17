<template>
  <div>
    <notopen></notopen>
    <index_feed :data="data"></index_feed>
  </div>

</template>
<script>
  import index_feed from '../../../../module/index/index_feed.vue'
  import notopen from "../../../component/com-wx-notopen.vue"
  import api from "../../../../utils/api.es6"
  import {getQuery} from '../../../../utils/utils.es6';
  import dialog from '../../../../utils/dialog.es6'
  export default {
    components:{
      index_feed:index_feed,
      notopen:notopen
    },
    data(){
      return {
        data:[],
        albumId:getQuery("albumId"),
        pageFlag:true,
        pageIndex:0,
        pageSize:10
      }
    },
    created:function () {
      var result=require('../json/collect.json');
      this.data=result.data.feedList;
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
          console.log(666666);
          var that=this;
          if(this.pageFlag){
              this.pageFlag=false;
              var obj={
                "albumId":getQuery('albumId'),
                "pageIndex": this.pageIndex,
                "pageSize":this.pageSize
              };

          }
          api("/api/mg/content/album/getAlbumData",obj)
            .then(function (result) {
              if(result.code==0){
                that.pageIndex = parseInt(that.pageIndex) + parseInt(that.pageSize);
                this.data=this.data.concat(result.data.feedList);
                if (result.data.feedList.length == that.pageSize){
                  that.pageFlag=true
                }
              }else{
                dialog.alert('code:'+result.code);
              }
          }).catch(function(e){
            that.pageFlag = true;
            console.log('e:', e)
          });
        },
        scro(){
          var _this=this;
          $(window).scroll(function(){
              var el = $("body").get(0);
              var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
              if (bottom<100){
                _this.getData();
              }
            });
          }
        }

    }
</script>
<style scoped>

</style>
