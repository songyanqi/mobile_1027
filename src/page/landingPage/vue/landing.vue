<template>
  <div>
    <lheader class="top" v-if="!isApp"></lheader>
    <div class="empty_div" v-if="!isApp"></div>
    <index_feed :data="data"></index_feed>
    <maskk v-if="isApp && maskFlag"></maskk>
    <maskk2 v-if="!isApp && maskFlag"></maskk2>
  </div>
</template>
<script>


  import index_feed from '../../../../module/index/index_feed.vue'
  import dialog from '../../../../utils/dialog.es6';
  import api from "../../../../utils/api.es6"
  import appInterface from "../../../../utils/appInterface.es6"
  import native from '../../../common/js/module/native.js';
  import lheader from './header.vue'
  import util from "../../../../utils/utils.es6"
  import maskk from "./mask.vue"
  import maskk2 from "./mask2.vue"
  export default {
    components:{
      index_feed:index_feed,
      lheader:lheader,
      maskk:maskk,
      maskk2:maskk2,
      maskFlag:false

    },
    data(){
        return {
            data:[],
            pageFlag:true,
            upTime:0,
            name:"landingPage",
            isApp:util.utils.isApp(),
            maskFlag:false
        }
    },

    mounted:function () {
        this.getinitData();
        this.scrol();
        native.Browser.setHead({
          'title':'标题',
          'backBtn':'1',
          'shareBtn':"1"
        })
    },
    methods:{
        getinitData(){
          var that=this;
          api("/api/mg/content/indexAlbum/getContent")
            .then(function (result) {
              if(result.code==0){
                if(result.data && result.data.feedList){
                  that.data=that.data.concat(result.data.feedList);
                  result.data.feedList.map(function (item,index) {
                    if(item.body.upTime){
                      that.upTime=item.body.upTime;
                    }
                  })
                }else{
                  that.maskFlag=true;
                }
              }else{
                if(result.data.msg){
                  dialog.alert('code:'+result.code+ ":msg"+result.data.msg);
                }else{
                  dialog.alert('code:'+result.code);
                }
              }
            }).catch(function(e){
              that.maskFlag=true;
              console.log('e:', e)
          });
        },
        getData(){
          var that=this;
          if(that.pageFlag){
            console.log(that.pageFlag);
            that.pageFlag=false;
            var obj={
                "upTime":that.upTime
            };
            api("/api/mg/content/indexAlbum/getMoreContent",obj)
              .then(function (result) {
                if(result.code==0){
                  if(result.data && result.data.feedList){
                    that.data=that.data.concat(result.data.feedList);
                    result.data.feedList.map(function (item,index) {
                      if(item.body.upTime){
                        that.upTime=item.body.upTime;
                      }
                    })
                    if (result.data){
                      that.pageFlag=true;
                    }
                  }else{
                    //是显示错误页么？
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
                console.log('e:', e)
            });
          }
        },
        scrol(){
          var that=this;
          $(window).scroll(function(){
            var el = $("body").get(0);
            var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
            if (bottom<100){
              that.getData();
            }
          });
        }
    }
  }
</script>
<style scoped>
  .top{
    position: fixed;
    top: 0;
    background: #fff;
    z-index:999;
  }
  .empty_div{
    height: 44px;
  }
</style>
