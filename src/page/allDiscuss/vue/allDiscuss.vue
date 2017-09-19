<template>
  <div class="container">
    <notopen></notopen>
    <div class="header" v-if='!isapp'>
      <div v-show="flag">
        <div class="title">
          <div class="back-btn">
            <i class="back-arrow" @click="back"></i>
          </div>
          <div class="text">
            <div class="left_text" :class="{color_pink:flag}">全部笔记
              <div class="red_line"></div>
            </div>
            <div class="right_text" @click="fn">我的笔记</div>
          </div>
        </div>
      </div>
      <div v-show="!flag">
        <div class="title">
          <div class="back-btn">
            <i class="back-arrow" @click="back"></i>
          </div>
          <div class="text">
            <div class="left_text" @click="fn">全部笔记
            </div>
            <div class="right_text" :class="{color_pink:!flag}">我的笔记
              <div class="red_line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="empty_div" v-if='!isapp'></div>

    <div class="banner">
      <div v-show="flag">
        <div v-if="all_note_data && all_note_data.length">
          <div class="sign">
            <div class="center" v-show="userWrite==1">报名后才能写笔记哟</div>
            <div class="center2" v-show="userWrite==0" @click="write_note">
              <span>写我的听课笔记</span><span><img src="//pic.davdian.com/free/2017/08/01/icon/write.png" alt=""></span>
            </div>
          </div>
          <div class="note" id='allNote'>
            <div class="note_border" v-for="(item,index) in all_note_data" @click="show_all(item)">
              <div class="note_container note_container1">
                <div class="note_title">
                  <div class="header_img">
                    <img :src="item.headImg" alt="">
                  </div>
                  <div class="name">{{ item.userName }}</div>
                  <div class="time">{{ startTimestamp(item.createTime) }}</div>
                  <div class="star"><img :src="init_star(item.score)" alt=""></div>
                </div>
                <p class="note_text note_text1" :class="{ a : show_list[index]==2}" v-html="item.content.replace(/\n/g,'<br/>')"></p>

                <div class="look_all" v-show="show_list[index]==1">
                  <div class="look_text" @click.stop="show_text(index)">查看全部</div>
                </div>

                <div class="look_all" v-show="show_list[index]==2">
                  <div class="look_text" @click.stop="show_text(index)">收起</div>
                </div>

                <div class="imgs" >
                  <div v-for="(v,index) in item.imgList">
                    <!--<img :src="v" alt="" @click.stop='showImg(index,item.imgList, v)'>-->
                    <div class="img_div" :style="{'background': 'url(' + v + ') center center / cover no-repeat' , 'background-size': 'cover'}" @click.stop='showImg(index,item.imgList, v)'></div>
                  </div>
                </div>

                <div class="note_share" v-if="isapp">
                  <div class="count"><span v-if="item.shareNum!=0">{{ item.shareNum }}</span></div>
                  <div class="icon" @click.stop='share(item)'><img src="http://pic.davdian.com/free/2017/02/07/material-share.png" alt=""></div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div v-if='dataFlag1'>
          <div class="no_class" >
            <div class="no_class_img">
              <img src="//pic.davdian.com/free/2017/08/01/no_class.png" alt="">
            </div>
            <div class="no_class_text">当前没有笔记</div>
            <div class="sign">
              <div class="center" v-show="userWrite==1">报名后才能写笔记哟</div>
              <div class="center2" v-show="userWrite==0" @click="write_note">
                <span>写我的听课笔记</span><span><img src="//pic.davdian.com/free/2017/08/01/icon/write.png" alt=""></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="!flag">
        <div v-if="my_note_data && my_note_data.length">
          <div class="sign">
            <div class="center" v-show="userWrite==1">报名后才能写笔记哟</div>
            <div class="center2" v-show="userWrite==0" @click="write_note">
              <span>写我的听课笔记</span><span><img src="//pic.davdian.com/free/2017/08/01/icon/write.png" alt=""></span>
            </div>
          </div>
          <div class="note" id='myNote'>
            <div class="note_border" v-for="(item2 , index) in my_note_data" @click="show_all(item2)">
              <div class="note_container note_container2">
                <div class="note_title">
                  <div class="header_img">
                    <img :src="note_header" alt="">
                  </div>
                  <div class="name">{{ note_name }}</div>
                  <div class="time">{{ startTimestamp(item2.createTime) }}</div>
                  <div class="star"><img :src="init_star(item2.score)" alt=""></div>
                </div>
                <p class="note_text note_text2" :class="{ a : show_list2[index]==2}" v-html="item2.content.replace(/\n/g,'<br/>')"></p>

                <div class="look_all" v-show="show_list2[index]==1">
                  <div class="look_text" @click.stop="show_text2(index)">查看全部</div>
                </div>

                <div class="look_all" v-show="show_list2[index]==2">
                  <div class="look_text" @click.stop="show_text2(index)">收起</div>
                </div>

                <div class="imgs">
                  <div v-for="(m,index) in item2.imgList">
                    <!--<img :src="m" alt="" @click.stop='showImg(index,item2.imgList,m)'>-->
                    <div class="img_div" :style="{'background': 'url(' + m + ') center center / cover no-repeat' , 'background-size': 'cover'}" @click.stop='showImg(index,item2.imgList, m)'></div>
                  </div>
                </div>

                <div class="end">
                  <div class="note_share" v-show="item2.status==1 && isapp" >
                    <div class="count"><span v-if="item2.shareNum!=0 ">{{ item2.shareNum }}</span></div>
                    <div class="icon" @click.stop='share(item2)'><img src="http://pic.davdian.com/free/2017/02/07/material-share.png" alt=""></div>
                  </div>
                  <div class="note_share" v-show="item2.status==0">
                    <div class="count2">
                      <div class="ing">(审核中，仅自己可见)</div>
                    </div>
                  </div>

                  <div class="note_share" v-show="item2.status==2">
                    <div class="count2">
                      <div>(审核未通过，还需努力哟)</div>
                      <div class="share_line"></div>
                      <div class="delete_note" @click.stop='delNote(item2, index)'>删除笔记</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if='dataFlag'>
          <div class="no_class" >
            <div class="no_class_img">
              <img src="//pic.davdian.com/free/2017/08/01/no_class.png" alt="">
            </div>
            <div class="no_class_text">还没有写过笔记呢</div>
            <div class="sign">
              <div class="center" v-show="userWrite==1">报名后才能写笔记哟</div>
              <div class="center2" v-show="userWrite==0" @click="write_note">
                <span>写我的听课笔记</span><span><img src="//pic.davdian.com/free/2017/08/01/icon/write.png" alt=""></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="mask_close && !isapp">
      <div class="sign_mask" @click="close"></div>
      <div class="btn" @click="close">知道啦

      <div class="all_mask">
        <div class="white_space">我的笔记</div>
        <div class="mask_img"><img src="//pic.davdian.com/free/2017/08/10/myNote.png" alt=""></div>
      </div>
    </div>
  </div>

    <div v-if='noLogin' class='noApply'>
      <img src="//pic.davdian.com/free/2017/09/01/Group.png">
      <p>登录后才能继续访问</p>
    </div>
  </div>
</template>
<script>
  import api from '../../../../utils/api.es6';
  import {getQuery} from '../../../../utils/utils.es6';
  import dialog from '../../../../utils/dialog.es6'
  import login from "../../../common/js/module/login.js"
  import native from '../../../common/js/module/native.js'
  import wx from "../../../../utils/WXShare.es6"
  import notopen from "../../../component/com-wx-notopen.vue"
  import common from '../../../common/js/common.js'
  export default{
      data:function () {
        return {
            flag: getQuery("flag"),
            note_header:"",
            note_name:"",
            all_note_height:0,
            my_note_height:0,
            all_note_data:[],
            my_note_data:[],
            userWrite:0,
            mask_close:true,
            pageIndex:0,
            pageFlag1: true,
            pageIndex2:0,
            pageFlag2: true,
            pageSize1: 10,
            pageSize2: 10,
            dataFlag: false,
            dataFlag1: false,
            isapp:!!navigator.userAgent.match(/davdian|bravetime|vyohui/),
            show_list:[],
            show_list2:[],
            noLogin:false

        }
      },
      updated:function () {

      },
      methods:{
        getStaus(){
          var token=login.getDvdsid().substr(32,8);
          if(token=="00000001"){
             return 0;
          }else{
              if(token.substr(7,1)==1){
                return 1;
              }else{
                return 3
              }
          }
        },
        startTimestamp:function (time) {
          return time.substring(0,16);
        },
          appUpData(){

            this.note_header="";
            this.note_name="";
            this.all_note_height=0;
            this. my_note_height=0;
            this.all_note_data=[];
            this.my_note_data=[];
            this. userWrite=0;
            this. mask_close=true;
            this. pageIndex=0;
            this. pageFlag1= true;
            this. pageIndex2=0;
            this.pageFlag2= true;
            this.pageSize1= 10;
            this. pageSize2= 10;
            this. dataFlag= false;
            this.dataFlag1= false;
            this.show_list=[];
            this.show_list2=[];

            var that=this;
            if(that.flag){
              this.allNote();
            }else{
              this.myNote();
            }
            $(window).scroll(function(){
              if (that.flag){
                var el = $("#allNote").get(0);
                var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
                if (bottom<100){
                  that.allNote();
                }
              } else {
                var el = $("#myNote").get(0);
                var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
                if (bottom<100){
                  that.myNote();
                }
              }
            })
            // localStorage
            if(localStorage.getItem("dialog")){
              this.mask_close=false;
            }else{
              localStorage.setItem("dialog","localStorage");
            }
          },
          auto_click(){
              for(var i=0;i<this.show_list.length;i++){
                if(this.show_list[i]==1){
                    this.show_text(i);
                    this.show_text(i);
                }
              }
          },
          auto_click2(){
            for(var i=0;i<this.show_list2.length;i++){
              if(this.show_list2[i]==1){
                this.show_text2(i);
                this.show_text2(i);
              }
            }
          },
          text_over1(start,end){
               var that=this;
              var note_text=$('.note_container1 .note_text1');
              var newarr=[];
              note_text=note_text.slice(start,end);
              note_text.map(function(index){
                if (this.offsetHeight < this.scrollHeight){
                  Vue.set(newarr,index,1);
                }else{
                  Vue.set(newarr,index,0);
                }
              })
              that.show_list=that.show_list.concat(newarr);
            },
          text_over2(start,end){
            var that=this;
            var note_text=$('.note_container2 .note_text2');
            var newarr=[];
            note_text=note_text.slice(start,end);
            note_text.map(function(index){
              if (this.offsetHeight < this.scrollHeight){
                Vue.set(newarr,index,1);
              }else{
                Vue.set(newarr,index,0);
              }
            })
            that.show_list2=that.show_list2.concat(newarr);
          },
          show_text(index){
            if(this.show_list[index]==1){
              Vue.set(this.show_list,index,2);
              console.log(index);
            }else if(this.show_list[index]==2){
              Vue.set(this.show_list,index,1);
              console.log(index);
            }
          },
          show_text2(index){
            if(this.show_list2[index]==1){
              Vue.set(this.show_list2,index,2);
            }else if(this.show_list2[index]==2){
              Vue.set(this.show_list2,index,1);
            }
          },
          back(){
            history.back();
          },
          wxShare(){
            // let shareInfo = {}
            // shareInfo.title = '课程分类|妈妈课堂'
            // shareInfo.link = window.location.href
            // shareInfo.imgUrl = 'http://pic.davdian.com/shop_logo/5/80_80_1426690299.jpg'
            // shareInfo.desc = '更便捷精准，抵达海量优质内容'
            // wx.init(shareInfo)
          },
          share(item){
            var that = this;
            var obj={
                notesId:item.notesId,
                courseId: getQuery('courseId'),
                headImg:item.headImg
            }
            api('/api/mg/content/course/courseNotesShareInfo',obj)
                .then(function (respone) {
                    native.custom.share({
                        "title":respone.data.shareTitle,
                        "linkDesc": '分享笔记至',
                        "desc": item.content,
                        "imgUrl": respone.data.imageUrl,
                        "link": window.location.host + respone.data.shareUrl +'&showFlag=1',
                        'log': {
                                'production':'20',
                                'action':'2',
                                'action_type':'0',
                                'production_data':{
                                    "courseId": getQuery('courseId')
                                }
                            }
                    })
                })
                .catch(function (error) {
                    console.log('error:',error)
                });
          },
          showImg(i,imgList,img){
            if(this.isapp){
              native.Browser.showBigImage({bigImages:imgList,showIndex:i})
            } else {
              window.wx.previewImage({
                current: img,
                urls: imgList
              });
              alert(wx.previewImage+ '123')
            }
          },
          myNote:function () {
            if(this.getStaus()==0){
              this.noLogin = true;
            }else{
              var that=this;
              if(this.pageFlag2){
                this.pageFlag2=false;
                var obj2={
                  "userId":login.getUserId(),
                  "courseId":getQuery('courseId'),
                  "pageIndex":this.pageIndex2,
                  "pageSize":this.pageSize2
                };
                api("/api/mg/content/course/myNotesList",obj2).then(function (my_discuss) {
//                alert("myNote"+my_discuss.code);
                  common.checkRedirect(my_discuss)
                  if(my_discuss.code==0){
                    that.pageIndex2= parseInt(that.pageIndex2) + parseInt(that.pageSize2);
                    that.userWrite=my_discuss.data.userWrite;
                    var start=that.my_note_data.length;
                    that.my_note_data= that.my_note_data.concat(my_discuss.data.dataList);
                    var end=start+my_discuss.data.dataList.length;
                    setTimeout(function () {
                      that.text_over2(start,end);
                      that.auto_click2();
                    },100);
                    that.note_name=my_discuss.data.userName;
                    that.note_header=my_discuss.data.headImg;
                    if (that.my_note_data.length==0){
                      that.dataFlag = true
                    }
                    if (my_discuss.data.dataList.length == that.pageSize2){
                      that.pageFlag2=true
                    }
                  }else{
//                    if(my_discuss.code == 30000) {
//                      that.noLogin = true;
//                    }else{
                      dialog.alert('code:' + my_discuss.code + ';msg:'+my_discuss.data.msg);
//                    }
                  }
                }).catch(function (e) {
                  that.pageFlag2 = true;
                  console.log('e:', e)
                });
              }
            }

          },
          write_note:function () {
            if (this.isapp){
                native.VoiceLive.callAppEnterWriteNote({'courseId':getQuery('courseId')})
            } else {
                window.location.href = '/course-notes-create-' + getQuery('courseId') + '.html'
            }
          },
          allNote:function(){
            var that = this
            if (this.pageFlag1){
              this.pageFlag1 = false
              var obj={
                "courseId":getQuery('courseId'),
                "pageIndex": this.pageIndex,
                "pageSize":this.pageSize1
              };
              api("/api/mg/content/course/notesList",obj).then(function (result) {
                common.checkRedirect(result)
                if (result.code == 0) {
                  that.pageIndex = parseInt(that.pageIndex) + parseInt(that.pageSize1);
                  that.userWrite=result.data.userWrite;
                  var start=that.all_note_data.length;
                  that.all_note_data= that.all_note_data.concat(result.data.dataList);
                  var end=start+result.data.dataList.length;
                  setTimeout(function () {
                    that.text_over1(start,end);
                    that.auto_click();
                  },100)
                  if (that.all_note_data.length==0){
                    that.dataFlag1 = true
                  }
                  if (result.data.dataList.length == that.pageSize1){
                    that.pageFlag1=true
                  }
                } else {
                  if(result.code == 30000){
                      that.noLogin=true;
                  }else{
                    dialog.alert('code:' + result.code + ';msg:'+result.data.msg);
                  }
                }
              }).catch(function(e){
                that.pageFlag1 = true
                console.log('e:', e)
              });
            }
          },
          delNote:function(item, index){
            var that = this
            var obj={
                "notesId": item.notesId,
              };
            api("/api/mg/content/course/notesDel",obj).then(function (result) {
              if (result.code == 0) {
                that.my_note_data.splice(index,1)
              } else {
                dialog.alert('code:'+result.code + ';msg:' + result.data.msg)
              }
            }).catch(function(e){
              console.log('e:', e)
            });
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
          fn:function (){
            var _this=this;

            if(this.flag){
                if(!_this.my_note_data[0]){
                  this.myNote();
                }
                this.all_note_height=$("body").scrollTop();
                this.flag=!this.flag;
                this.$nextTick(function () {
                  setTimeout(function(){
                    $("body").scrollTop(_this.my_note_height);
                  },100)
                });
            }else{
                if(!_this.all_note_data[0]){
                  this.allNote();
                }
                this.my_note_height=$("body").scrollTop();
                this.flag=!this.flag;
                this.$nextTick(function () {
                  setTimeout(function(){

                    $("body").scrollTop(_this.all_note_height);
                  },100)
                });
            }
          },

          show_all:function (item) {
            if(this.isapp){
              native.Browser.open({
                                    url: '/noteDetail.html?notesId=' + item.notesId + '&courseId=' + getQuery('courseId'),
                                    type:'0',
                                    headtype:'0'
                                    })
            } else {
                window.location.href = '/noteDetail.html?notesId=' + item.notesId + '&courseId=' + getQuery('courseId')
            }
          },
          close:function () {
            this.mask_close=false;
          },
          init(){
            var that=this;
            if(that.flag){
              this.allNote();
            }else{
              this.myNote();
            }
            $(window).scroll(function(){
              if (that.flag){
                var el = $("#allNote").get(0);
                var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
                if (bottom<100){
                  that.allNote();
                }
              } else {
                var el = $("#myNote").get(0);
                var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
                if (bottom<100){
                  that.myNote();
                }
              }
            })
            // localStorage
            if(localStorage.getItem("dialog")){
              this.mask_close=false;
            }else{
              localStorage.setItem("dialog","localStorage");
            }
          }

      },

      mounted:function(){

        var that = this;
        this.$nextTick(function(){
          that.init();
          setTimeout(function(){
            that.wxShare()
          },300)
        })

      },
      components:{
        notopen
      }
  }
</script>
<style>
  html body{
    background: #FFFFFF;
    user-select: inherit;
  }
  .title{
    height: 0.44rem;
    position: relative;
  }
  .back-btn {
    position: absolute;
    left: 0;
    height: 100%;
    width: 44px;
  }
  .back-arrow {
    position: absolute;
    top: 15px;
    left: 15px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-bottom: 1px solid #333;
    border-left: 1px solid #333;
    transform: rotate(45deg);
    cursor: pointer;
  }
  .text{
    width: 1.65rem;
    height: 0.44rem;
    margin: 0 auto;
    font-size: 0;
    position: relative;
  }
  .left_text{
    text-align: left;
    line-height: 0.44rem;
    display: inline-block;
    font-size:14px;
    position: absolute;
    left: 0;
  }
  .color_pink{
    color:#FD4A7C;
  }
  .right_text{
    text-align: right;
    line-height: 0.44rem;
    display: inline-block;
    font-size:14px;
    position: absolute;
    right: 0;
  }
  .red_line{
    border-top:1px solid #FD4A7C;
    height: 0.03rem;
    width:100%;
    position: absolute;
    bottom: 0;
    left: 0;

  }
  .sign{
    height: 0.24rem;
    position: relative;
    margin-top:0.2rem;
  }
  .center{
    width: 1.39rem;
    height: 0.24rem;
    border-radius:37px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.12rem;
    margin-left: -0.695rem;
    color: #999999;
    border:1px solid #999999;
    text-align: center;
    line-height: 0.24rem;
    font-size: 0.12rem;
    box-sizing: border-box;
  }
  .center2{
    width: 1.39rem;
    height: 0.24rem;
    border-radius:37px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.12rem;
    margin-left: -0.695rem;
    color: #FF4A7D;
    border:1px solid #FF4A7D;
    text-align: center;
    line-height: 0.24rem;
    font-size: 0.12rem;
    box-sizing: border-box;
  }
  .center2 span{
  }
  .center2 span img{
    height: 0.11rem;
    width: 0.11rem;
    position: relative;
    top: 0.015rem;
  }
  .note .note_border:nth-child(1){
    border-top: 0;
  }
  .note_border{
    border-top: 1px solid #DDDDDD;
  }
  .note_container{
    margin: 0 0.1rem;
  }
  .note_container .header_img img{
    height: 0.24rem;
    width: 0.24rem;
    border-radius: 50%;
  }
  .note_title{
    height: 0.24rem;
    margin-bottom: 0.07rem;
    margin-top:0.2rem;
  }
  .note_title div{
    float: left;
    height: 0.24rem;
    line-height: 0.24rem;
  }
  .note_title .name{
    font-size:0.14rem;
    margin-left: 0.05rem;
    max-width: 1.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#666666;
  }
  .note_title .time{
    font-size:0.12rem;
    margin-left: 0.01rem;
    color:#999999;
  }
  .note_title .star{
    float: right;
    margin-right: 0.01rem;
  }
  .note_title .star img{
    width: 59px;
    height: 11px;
  }
  .note_text{
    font-size: 13px;
    line-height: 15px;
    color: #333333;
    overflow : hidden;
    /*-o-text-overflow:ellipsis;*/
    text-overflow: clip;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    vertical-align: text-bottom;
  }
  .a{
    display: block;
  }
  .look_all{
    height: 0.18rem;
    margin-bottom: 0.1rem;
    margin-top: 0.1rem;
  }
  .look_text{
    height: 100%;
    display: inline-block;
    color:#FF4A7D;
    font-size: 0.13rem;
  }
  .imgs{
    width: 3rem;
    font-size: 0;
    margin-bottom: 0.1rem;
  }
  .imgs>div{
    display:inline-block;
    height: 0.9rem;
    width: 0.9rem;
    margin-right: 0.1rem;
    margin-top:0.1rem;
  }
  .img_div{
    height: 100%;
    width: 100%;
    border-radius:3px;
  }

  .note_share{
    height: 0.16rem;
    line-height: 0.16rem;

    margin-bottom: 0.21rem;
  }
  .note_share .count,.icon{
    float: right;
  }
  .icon{
    height: 0.16rem;
    width: 0.13rem;
    line-height: 0.16rem;
  }
  .icon img{
    height: 0.13rem;
    width: 0.13rem;
    margin-top: 0.015rem;
  }
  .count{
    font-size: 0.11rem;
    color: #999999;
    margin-left: 0.06rem;
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

  .header{
    position: fixed;
    top: 0;
    width: 3.75rem;
    z-index: 1;
    background: #FAFAFA;
  }
  .banner{
    overflow: hidden;
    background: #FFFFFF;
  }

  .no_class{
    margin-top: 1.44rem;
  }
  .no_class_img{
    height: 1.2rem;
    width: 1.2rem;
    margin: 0 auto;
  }
  .no_class_img img{
    height: 1.2rem;
    width: 1.2rem;
  }
  .no_class_text{
    text-align: center;
    font-size:0.14rem;
    height: 0.2rem;
    line-height:0.2rem;
    margin-top:0.3rem;
    margin-bottom:0.1rem;

  }
  .empty_div{
    height: 0.44rem;
  }
  .sign_mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity:0.6;
    background: #000000;
    z-index:1;
  }
  .btn{
    height: 0.4rem;
    width: 1.2rem;
    background: #FF7C7C;
    color:#FFFFFF;
    border-radius: 1rem;
    position: fixed;
    bottom: 0.5rem;
    left: 50%;
    margin-left: -0.6rem;
    line-height: 0.4rem;
    text-align: center;
    z-index:2;
  }
  .white_space{
    width: 0.9rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    color:#FF4A7D;
    background: #FFFFFF;
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0.86rem;
    border-radius: 1rem;
  }
  .red_border{
    width: 2.32rem;
    height: 0.95rem;
    z-index: 2;
    text-align:center;
    color:#FFFFFF;
    border: 0.5px solid #FF9494;
    border-radius:0.08rem;
    position: fixed;
    left: 0.71rem;
    top: 0.72rem;
    display: table;
  }
  .mask_icon{
    height: 0.51rem;
    width: 0.36rem;
    position: fixed;
    top: 0.22rem;
    right: 1.13rem;
    z-index:2;
  }
  .mask_icon img{
    width: 100%;
    height: 100%;
  }
  .table{
    display: table-cell;
    vertical-align: middle;
  }
  .mask_img{
    z-index:2;
    position: fixed;
    top: -0.04rem;
    left: 0.3rem;
  }
  .mask_img img{
    width: 3.17rem;
    height: 2.16rem;
  }
  .noApply{
    text-align: center;
  }
  .noApply img{
    width: 1.2rem;
    margin-top: 1rem;
  }
  .noApply p{
    color: #666;
    margin-top: 0.3rem;
    text-align: center;
  }
</style>
