<template>
  <div class="top" id="top">
    <div class="tab" id="tab2" :class="{ tab_fixed2 :empty_tab }" v-if="isApp">
      <div class="tab_list" v-if="flag" @click="fn">
        <div class="border color1" v-text="dataList.content"></div>
        <div class="b_right" v-text="dataList.recommend"></div>
        <div class="line"></div>
      </div>
      <div class="tab_list" v-if="!flag" @click="fn">
        <div class="border" v-text="dataList.content"></div>
        <div class="b_right color1" v-text="dataList.recommend"></div>
        <div class="line2"></div>
      </div>
    </div>
    <div class="tab" id="tab" :class="{ tab_fixed :empty_tab }" v-if="!isApp">
      <div class="tab_list" v-if="flag" @click="fn">
        <div class="border color1" v-text="dataList.content"></div>
        <div class="b_right" v-text="dataList.recommend"></div>
        <div class="line"></div>
      </div>
      <div class="tab_list" v-if="!flag" @click="fn">
        <div class="border" v-text="dataList.content"></div>
        <div class="b_right color1" v-text="dataList.recommend"></div>
        <div class="line2"></div>
      </div>
    </div>
    <div class="empty_tab" v-if="empty_tab"></div>
    <div v-if="flag">
      <div class="update">
        <div class="up">
          已更新<span class="color1" v-text="dataList.up"></span>期，计划更新<span class="color1" v-text="dataList.ex"></span>期
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item,index) in contentList" @click="go_href.stop(item.albumId,item.sortNo)" >
          <div class="last">上次听到这里 2017-07-11 21:09</div>
          <div class="rea">
            <div class="item_left">
              <div class="item_title" v-text="item.music"></div>
              <div class="item_timee">
                <div class="item_date" v-text="getLocalTime(item.update_time)"></div>
                <div class="item_count"><span v-text="item.number"></span>次播放</div>
                <div class="item_time">
                  <div class="clock"></div>
                  <div class="times" v-text="item.time"></div>
                </div>
              </div>
            </div>
            <div class="item_right" v-if="item.isFree==1">
              <div class="disable" v-if="item.isPlay==0 && isSub==0" @click.stop="stop_info"><img src="//pic.davdian.com/free/2017/08/16/Group1.png" alt=""></div>
              <div class="mask_stop" v-if="isSub==1 && item.isPlay==1 && (item.albumId==albumId && item.sortNo==sortNo && btnStatus==1)" @click.stop="go_play(item.albumId,item.sortNo)"><img src="//pic.davdian.com/free/2017/08/16/b_stop.png" alt=""></div>
              <div class="mask_play" v-if="isSub==1 && item.isPlay==1 && !(item.albumId==albumId && item.sortNo==sortNo && btnStatus==1)" @click.stop="go_play(item.albumId,item.sortNo)"><img src="//pic.davdian.com/free/2017/08/16/b_play.png" alt=""></div>
              <div class="circle_mask"></div>
              <div><img :src="item.imageUrl" alt=""></div>
            </div>
            <div class="item_right2" v-if="item.isFree==0 && isSub==0" @click="go_href(item.albumId,item.sortNo)">
              <div class="free">免费试听</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!flag" v-html="dataList.recommendData">

    </div>

  </div>
</template>
<script>
  import util from "../../../utils/utils.es6";
  import native from "../../../src/common/js/module/native.js"
  import dialog from '../../../utils/dialog.es6';
  import api from "../../../utils/api.es6"
  import {getQuery} from '../../../utils/utils.es6';
  export default {
      props:["data"],
      mounted:function () {
        var that = this
        this.dataList=this.data.body.dataList;
        this.contentList=this.data.body.dataList.contentList;
        this.isSub=this.data.body.isSub;
        this.initSortNoIndex();
        this.$nextTick(function () {
          this.scro();
        })
//        window.audioPlayHistoryFn = function(obj){
//          console.log(obj.sortNo, obj.date)
//          console.log(that.name);
//        }
//        ////////todo
//
//
//        this.$nextTick(function () {
//          native.Audio.audioPlayHistory({
//            "albumId":this.pageAlbumId,
//            "result":'audioPlayHistoryFn'
//          })
//        });

        this.$nextTick(function () {
          this.audioLocation();
        });
      },
      data(){
          return {
              dataList:{},
              contentList:[],
              flag:true,
              isApp:util.utils.isApp(),
              btnStatus:null,
              name:"bd_album_03",
              albumId:null,
              sortNo:null,
              sortNoIndex:0,
              pageFlag:true,
              isSub:0,
              pageAlbumId:getQuery("albumId"),
              empty_tab:false
          }
      },
      methods:{
          audioLocation(){
            if(this.isApp){
              native.Audio.audioLocation({
                "success":function (obj) {
                  alert(11123123123);
                  window.iosInterface.getAudioState(obj);
                }
              })
            }
          },
          go_play(albumId,sortNo){
            if(this.isApp){
              //调用app播放器
                native.Audio.audioPlay({
                  "sortNo":sortNo,
                  "albumId":albumId
                })
            }else{
              window.location.href="/musicDetail.html?albumId="+albumId+"&sortNo="+sortNo;
            }
          },
          initSortNoIndex(){
              var that=this;
              this.contentList.map(function (item,index) {
                if(item.sortNo){
                  that.sortNoIndex=item.sortNo;
                }
              });
          },
          stop_info(){
            dialog.alert("订阅后才可收听");
          },
          fn(){
              this.flag=!this.flag;
          },
          getLocalTime(nS) {
            let time= new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            let timestamp=time.split(" ")[0].split("/");
            let y=parseInt(timestamp[0]);
            let m=parseInt(timestamp[1]);
            let d=parseInt(timestamp[2]);
            return y + "-" + m + "-" + d;
          },
          go_href(albumId,sortNo){
              if(this.isApp){
                //调用app播放器
                native.Audio.goAudioDetail({
                  "sortNo":sortNo,
                  "albumId":albumId
                })
              }else{
                window.location.href="/musicDetail.html?albumId="+albumId+"&sortNo="+sortNo;
              }

          },
          getMoreList(){
            var that=this;
            if(this.pageFlag){
              this.pageFlag=false;
              var obj={
                "albumId":that.pageAlbumId,
                "sort":-1,
                "sortNo":that.sortNoIndex
              };
              localS
              api("/api/mg/content/music/getListData",obj)
                .then(function (result) {
                  if(result.code==0){
                    if(result.data && result.data.dataList){
                      that.contentList=that.contentList.concat((result.data.dataList).reverse());
                      result.data.dataList.map(function (item,index) {
                        if(item.sortNo){
                          that.sortNoIndex=item.sortNo;
                        }
                      });
                      if (result.data.dataList.length >0){
                        that.pageFlag=true;
                      }
                    }else{
                        //显示请求接口错误页
                    }
                  }else{
                    if(result.data.msg){
                      dialog.alert('code:'+result.code+":msg"+result.data.msg);
                    }else{
                      dialog.alert('code:'+result.code);
                    }
                  }
                }).catch(function(e){
                  console.log('e:', e)
                  //显示请求接口错误页
              });
            }
          },
          scro(){
            var _this=this;
            var top=0;
            document.getElementById('uuu').onload = function () {
              if(_this.isApp){
                top=document.getElementById('tab2').offsetTop;
              }else{
                top=document.getElementById('tab').offsetTop-44;
              }
              console.log(top);
            };
            $(window).scroll(function(){
              console.log($("body").scrollTop())
              if($("body").scrollTop()>=top){
                _this.empty_tab=true;
              }else{
                _this.empty_tab=false;
              }

              var el = $("#top").get(0);
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
  .tab {
    padding-top: 0.14rem;
    height: 0.36rem;
    background: white;
  }

  .tab .tab_list {
    height: 0.36rem;
  }

  .tab_list {
    font-size: 0;
    vertical-align: top;
    position: relative;
  }


  .update {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    height: 0.36rem;
    position: relative;
    padding-bottom: 0.1rem;
    background: #fff;
  }

  .tab_list .border {
    border-right: 0.01rem solid rgba(0, 0, 0, 0.1);
    font-size: 14px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .tab_list .border, .b_right {
    display: inline-block;
    height: 0.3rem;
    width: 1.87rem;
    line-height: 0.2rem;
    text-align: center;
  }

  .tab_list .b_right {
    font-size: 14px;
  }

  .line {
    height: 0.0365rem;
    width: 0.58rem;
    background: #FF4A7D;
    position: absolute;
    bottom: 0;
    left: 0.66rem;
  }
  .line2 {
    height: 0.0365rem;
    width: 0.58rem;
    background: #FF4A7D;
    position: absolute;
    bottom: 0;
    right: 0.64rem;
  }
  .up {
    position: absolute;
    bottom: 0.1rem;
    left: 0.1rem;
  }
  .color1 {
    color: #FF4A7D;
  }




  .item {
    font-size: 0;
    vertical-align: top;
    background: white;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    border-bottom: 1px solid #E1E1E1;
    position: relative;
  }
  .rea>div{
    display: inline-block;
    vertical-align: top;
  }
  .item_title{
    color: #333333;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    max-width: 2.6rem;
    margin-bottom: 0.08rem;
    line-height: 0.2rem;
  }
  .item_timee{
    font-size: 0;
  }
  .item_timee>div{
    display: inline-block;
    vertical-align: top;
  }
  .item_date{
    color: #999999;
    font-size: 11px;
    line-height: 0.1rem;
    padding-right: 0.1rem;
    border-right: 1px solid #999999;
    margin-right: 0.1rem;
  }
  .item_count{
    color: #999999;
    font-size: 11px;
    line-height: 0.1rem;
    padding-right: 0.1rem;
    border-right: 1px solid #999999;
    margin-right: 0.1rem;
  }
  .item_time{
    color: #999999;
    font-size: 11px;
    height: 0.1rem;
  }
  .clock{
    display: inline-block;
    height: 0.1rem;
    width: 0.1rem;
    background-image: url(//pic.davdian.com/free/2017/05/04/history.png);
    background-size: 0.1rem 0.1rem;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .times{
    display: inline-block;
    height: 0.1rem;
    line-height: 0.1rem;
    vertical-align: top;
  }
  .item_right{
    position: absolute;
    right: 0;
    top: 50%;
    width: 0.34rem;
    height: 0.34rem;
    margin-top: -0.17rem;
  }
  .item_right2{
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -0.12rem;
  }
  .item_right img{
    height: 0.34rem;
    width: 0.34rem;
    border-radius: 50%;
  }
  .item_right>div{
    position: absolute;
    top: 0;
    left: 0;
    width: 0.34rem;
    height: 0.34rem;
  }
  .circle_mask{
    width: 0.34rem;
    height: 0.34rem;
    border-radius:50%;
    background: #000000;
    opacity:0.3;
    z-index:2;
  }
  .mask_play,.mask_stop,.disable{
    z-index:3;
  }



  .free{
    width: 0.64rem;
    height: 0.22rem;
    border-radius: 37px;
    color: #FF4A7D;
    border: 0.5px solid #FF4A7D;
    font-size: 12px;
    text-align: center;
    line-height: 0.22rem;
  }
  .last{
    width: 3.55rem;
    height: 0.2rem;
    border-radius:4px;
    background: #FFF2E1;
    color:#CC8B3F;
    font-size:10px;
    margin-bottom: 0.1rem;
    text-align: center;
    line-height:0.2rem;

  }
  .rea{
    position: relative;
  }


  .top{
    margin-top: 0.12rem;
    height: 10rem;
  }
  .empty_tab{
    height: 0.5rem;
  }
  .tab_fixed{
    position: fixed;
    top: 44px;
    z-index:999;
  }
  .tab_fixed2{
    position: fixed;
    top:0;
    z-index:999;
  }
</style>
