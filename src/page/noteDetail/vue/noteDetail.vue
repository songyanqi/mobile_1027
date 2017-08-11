<template>
  <div>
    <!--<div class="empty_div" v-show="!isapp"></div>-->
    <notopen></notopen>
    <div class="note_container" v-if="close">
      <div class="note_title">
        <div class="header_img">
          <img :src="note_header" alt="">
        </div>
        <div class="name">{{ note_author }}</div>
        <div class="time">{{ note_time }}</div>
        <div class="star"><img :src="init_star(note_score)" alt=""></div>
      </div>
      <p class="note_text" v-html="note_content.replace(/\n/g,'<br/>')"></p>
      <div>
        <div class="note_pic1" v-for="(v,index) in img_list">
          <img :src="v" alt="" @click.stop='showImg(index, img_list, v)'>
        </div>
      </div>
      <div>
        <div class="note_share" v-show="status==1 && isapp">
          <div class="count"><span v-if="shareNum!=0">{{ shareNum }}</span></div>
          <div class="icon" @click='share(item)'><img src="http://pic.davdian.com/free/2017/02/07/material-share.png" alt=""></div>
        </div>
        <div class="note_share" v-show="status==0">
          <div class="count2">
            <div class="ing">(审核中，仅自己可见)</div>
          </div>
        </div>

        <div class="note_share" v-show="status==2">
          <div class="count2">
            <div>(审核未通过，还需努力哟)</div>
            <div class="share_line"></div>
            <div class="delete_note">删除笔记</div>
          </div>
        </div>
      </div>

    </div>

    <div class="gray" v-if="showFlag"></div>
    <div class="good_list_con" v-if="showFlag">
      <div class="good_list_2_row">
        <div class="dvk_container">
          <div class="tab_div">这么好的课，快来听听吧</div>
          <div class="dvk4_detail">
            <div class='dvk4_detail_content'>
              <div class='dvk4_detail_content_img'>
                <img class="newImage" :src="item.imageUrl"/>
              </div>
              <div class='dvk4_detail_content_text' @click='goHref(item.command.content)'>
                <div class='dvk4_detail_content_title' v-text='item.title'></div>
                <div class='dvk4_detail_content_name' v-text='item.teacher'></div>
                <div class='dvk4_detail_content_time'>
                  <span class='dvk4_detail_content_popular'><span v-text='item.pv'></span></span>
                  <span class='dvk4_detail_content_line'></span>
                  <span class='dvk4_detail_content_times'>
                      <span>{{ item.startTime }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
  import api from "../../../../utils/api.es6";
  import util from "../../../../utils/utils.es6";
  import dialog from '../../../../utils/dialog.es6'
  import {getQuery, isInisWechatOrApp} from "../../../../utils/utils.es6";
  import native from '../../../common/js/module/native.js'
  import wxF from "../../../../utils/WXShare.es6"
  import share from '../../../common/js/module/share.js'
  import notopen from "../../../component/com-wx-notopen.vue"
  import common from '../../../common/js/common.js'
  export default {
      data:function () {
        return {
            note_header:"",
            note_author:"",
            note_time:"",
            note_content:"",
            note_score:0,
            shareNum:0,
            status:-1,
            href:"",
            img_list:[],
            isapp: util.utils.isApp(),
            item:{},
            courseId: getQuery('courseId'),
            showFlag: getQuery('showFlag'),
            close:isInisWechatOrApp()
        }
      },
      mounted(){
        if(this.close){
          this.init();
        }
      },
      methods:{
        init(){
          var _this=this;
          var obj = {
            notesId: getQuery('notesId')
          }
          if (getQuery('courseId')){
            obj.courseId = getQuery('courseId')
          }
          api('/api/mg/content/course/notesDetail', obj)
            .then(function (result) {
              // console.log(result.data.course.dataList);
              common.checkRedirect(result)
              if (result.code==0){
                _this.item=result.data.courseInfo;
                _this.note_header=result.data.dataInfo.headImg;
                _this.note_author=result.data.dataInfo.userName;
                _this.note_time=result.data.dataInfo.createTime;
                _this.note_content=result.data.dataInfo.content;
                _this.note_score=result.data.dataInfo.score;
                _this.shareNum=result.data.dataInfo.shareNum;
                _this.status=result.data.dataInfo.status;
                _this.img_list=result.data.dataInfo.imgList;
                _this.wxShare()

              } else {
                dialog.alert('code:'+result.code + ';msg:' + result.data.msg)
              }
            });

          // 获取json

          // var result = require('../json/noteDetail.json');

        },
        wxShare(){
          var that= this
          var obj={
              notesId:getQuery('notesId'),
              courseId: this.courseId,
              headImg:this.note_header,
              js_wx_info: 1
          }
            api('/api/mg/content/course/courseNotesShareInfo',obj)
                .then(function (respone) {
                    share.setShareInfo({
                      title: respone.data.shareTitle,
                      desc: that.note_content.substring(0,45),
                      link: location.href +'&showFlag=1',
                      imgUrl: respone.data.imageUrl
                    }, respone);

                    window.iosInterface.getShareInfo = function () {
                      var shareInfo = {
                        title: respone.data.shareTitle,
                        desc: that.note_content,
                        link: window.location.host + respone.data.shareUrl+'&showFlag=1',
                        imgUrl: respone.data.imageUrl
                      };
                      return JSON.stringify(shareInfo);
                    };
                    native.Browser.setHead({
                      shareBtn:'1'
                    })
                })
                .catch(function (error) {
                    console.log('error:',error)
                });
            
          },
        share(item){
          var that = this
          var obj={
              notesId:getQuery('notesId'),
              courseId: that.courseId,
              headImg:this.note_header
          }
          api('/api/mg/content/course/courseNotesShareInfo',obj)
              .then(function (respone) {
                  native.custom.share({
                      // 'shareTitle': '分享给你<<'+ respone.data.shareTitle+">>的听课笔记，我们一起成长",
                  //     "shareDesc": _this.note_content,
                      "linkDesc": '分享笔记至',
                      "title":respone.data.shareTitle,
                      "desc": that.note_content,
                      "imgUrl": respone.data.imageUrl,
                      "link": window.location.host + respone.data.shareUrl +'&showFlag=1',
                      'log': {
                              'production':'20',
                              'action':'2',
                              'action_type':'0',
                              'production_data':{
                                  "courseId": that.courseId
                              }
                          }
                  })
              })
              .catch(function (error) {
                  console.log('error:',error)
              });
        },
        showImg(i,imgList, img){
          if(this.isapp){
            native.Browser.showBigImage({bigImages:imgList,showIndex:i})
          } else {
            window.wx.previewImage({
              current: img,
              urls: imgList
            });
            alert(window.wx.previewImage)
          }
        },
        goHref(href){
          if (this.isapp){
             native.VoiceLive.openVoiceIntro({courseId:this.courseId,fromPush:0})
           }else {
            window.location.href = href
           }
        },
        init_star:function (score) {
          if(score==1){
              return "//pic.davdian.com/free/2017/05/09/star_1.png"
          }else if(score==2){
              return "//pic.davdian.com/free/2017/05/09/star_2.png"
          }else if(score==3){
              return "//pic.davdian.com/free/2017/05/09/star_3.png"
          }else if(score==4){
              return "//pic.davdian.com/free/2017/05/09/star_4.png"
          }else if(score==5){
              return "//pic.davdian.com/free/2017/05/09/star_5.png"
          }
        },
        imgObject:function (imgSrc) {
          return{
            src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
            error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
            loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
          }
        }

      },
      components:{
        notopen
      }
  }
</script>
<style>
  .com-top-title{
    /*position: fixed!important;*/
  }
</style>
<!--<style src="../css/noteDetail.css" scoped>-->

<!--</style>-->
<style>
  html body{
    background: white;
    user-select: inherit;
  }
  .good_list_con{
    margin: 0;
    padding: 0;
  }
  .good_list_2_row{
    padding:0 10px;
  }
  .newImage {
    object-fit: cover;
    object-position: center;
  }
  .dvk4_detail{
    width: 100%;
    height: 76px;
    margin-top:10px;
    margin-bottom:10px;
  }
  .dvk4_detail_content{
    width: 100%;
    height: 76px;
    font-size: 0;
  }
  .dvk4_detail_content_img{
    width: 110px;
    height: 76px;
    vertical-align: top;
    position: relative;
    float: left;
  }
  .dvk4_detail_content_text{
    vertical-align: top;
    height: 76px;
    margin-left:120px;
    position: relative;
  }
  .dvk4_detail_content_title{
    color: #333333;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    margin-bottom: 5px;
  }
  .dvk4_detail_content_name{
    color: #999999;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    line-height:12px;
  }
  .dvk4_detail_content_time{
    font-size: 12px;
    color: #999999;
    margin-top: 5px;
  }
  .dvk4_detail_content_times{
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    height: 100%;
    line-height: 12px;
    color:#999999;
    margin-left: 10px;
  }
  .dvk4_detail_content_line{
    width: 1px;
    height: 12px;
    float:left;
    background: #E1E1E1;
    margin-left:10px;
  }
  .dvk4_detail_content_popular{
    float: left;
    height: 100%;
    line-height: 12px;
    color:#999999;
  }
  .newImage {
    object-fit: cover;
    object-position: center;
    display: inline;
    border: none;
    width: 100%;
    border-radius: 4px;
  }


  .note_share{
    height: 0.16rem;
    line-height: 0.16rem;
    margin-top: 0.1rem;
    margin-bottom: 0.21rem;
  }
  .count2{
    color: #666666;
    height: 100%;
    line-height: 0.16rem;
  }
  .count2 div{
    float: left;
    height: 0.16rem;
    text-align: center;
    line-height: 0.16rem;
    font-size: 0.13rem;
  }
  .count2 .ing{
    font-size: 0.13rem;
  }
  .share_line{
    width: 1px;
    background: #D8D8D8;
    margin-left: 0.06rem;
  }
  .delete_note{
    margin-left: 0.12rem;
  }
  .tab_div{
    height: 20px;
    text-align:left;
    line-height: 20px;
    margin-bottom: 10px;
    padding-top: 10px;
    font-size:14px;
  }
  .gray{
    background: #F1F1F1;
    height: 0.1rem;
  }
</style>
