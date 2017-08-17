<!--模板-->
<template>
  <div>
    <com-wx-notopen></com-wx-notopen>
    <div class="activity_container" v-if='isInisWechatOrAppFlag'>
      <div class='activity_container_search' v-bind:style="{ top: upTop + 'px' }">
        <!-- 搜索框 -->
        <div class="search_top clearfix">
          <a class="left_icon_container" href="javascript:history.back();">
            <span class="home_arrow"></span>
          </a>
          <form type="search" action="" class="ng-pristine ng-valid">
            <div class="search_con search_button april_border hairlines ">
              <div class="border_inner"></div>
              <div class="search_input_con">
                <span class="search_icon"></span>
                <input type="search" v-model="kewwords" @click='goSerach' name="q" placeholder="请输入课程名称" class="search_input" autocomplete="off">
              </div>
            </div>
          </form>
        </div>
        <!-- 一级菜单 -->
        <div class='uptitle'>
          <div class='classifyOne' @click='classIfyAll'>
            <div class="classifyOneTag">
              <span class='classifyOneTagText' :class='{titleFirstStyle : titleFirst != "分类"}'>{{titleFirst}}</span>
              <img class='classifyOneTagImg' v-if='!classIfyAllFlag' src="//pic.davdian.com/free/2017/07/20/arrowdown1.png">
              <img class='classifyOneTagImg' v-if='classIfyAllFlag' src="//pic.davdian.com/free/2017/07/20/arrowup1.png">
            </div>
          </div>
          <div class='classifyOne' @click='timeSortF'>
            <div class="classifyOneTag">
              <span class='classifyOneTagText'>时间</span>
              <img class='classifyOneTagImg' v-if='timeSort == 2' src="//pic.davdian.com/free/2017/07/20/arrowdown2.png">
              <img class='classifyOneTagImg' v-if='timeSort == 1' src="//pic.davdian.com/free/2017/07/20/arrowup2.png">
              <img class='classifyOneTagImg' v-if='timeSort == 0' src="//pic.davdian.com/free/2017/07/20/arrowno2.png">
            </div>
          </div>
          <div class='classifyOne' @click='pvSortF'>
            <div class="classifyOneTag">
              <span class='classifyOneTagText'>人气</span>
              <img class='classifyOneTagImg' v-if='pvSort==2' src="//pic.davdian.com/free/2017/07/20/arrowdown3.png">
              <img class='classifyOneTagImg' v-if='pvSort==0' src="//pic.davdian.com/free/2017/07/20/arrowno3.png">
            </div>
          </div>
        </div>
        <div class='uptitle2' v-if='classIfyAllFlag'>
          <div class='uptitle2_left'>
            <div :class='{select: fId == item1.fId}' class='uptitle2_left_classify' @click='classIfyAll2(index, item1.fId)' v-for='(item1, index) in dataList'>{{item1.fTitle}}</div>
          </div>
          <div class='uptitle2_right'>
            <div class='right_containerAll'>
              <div :class='{divSelect: item.cId == cId}' class='div' v-for='(item, index) in dataList[selectIndex].list' @click='classIfyAll3(item.cId, item.cTitle, dataList[selectIndex].fTitle)'>
                <span v-text='item.cTitle'></span>
                <img v-if='item.cId == cId' src="//pic.davdian.com/free/2017/07/20/selectCid.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='serach_black'></div>
        <div class='containerAll' v-if='data'>
          <div class='container' v-for='(item, index) in data' @click='goHref(item.command.content)'>
            <div class='containerImg' :style="{'background': 'url(' + item.imageUrl + ') center center / cover no-repeat' , 'background-size': 'cover'}"></div>
            <div class='content'>
              <p class='contentTitle' v-text='item.title'></p>
              <p class="contentTeacher" v-text='item.teacher'></p>
              <p class="contentPv">{{item.pv}}人气
                <span class='borderRight' v-if='livetext(item)'></span>
                <span v-if='livenow(item)' class="circle"></span>
                <span v-if='livetext(item)'>{{ livetext(item) }}</span>
                <!-- <span v-if='!livetext(item)' v-text='startTimestamp(item.startTime)'></span> -->
              </p>
            </div>
          </div>
        </div>
        <div class='mask' v-if='classIfyAllFlag'></div>
      </div>
      <div class='noData' v-if='isNoData'>
        <img src="//pic.davdian.com/free/2017/08/08/noDataClassify.png">
        <p>没找到呦，换个关键词试试吧～</p>
      </div>
  </div>
  

</template>

<!--组件定义-->
<script>
  import { getQuery, isInisWechatOrApp } from "../../../../utils/utils.es6";
  import api from "../../../../utils/api.es6"
  import dialog from "../../../../utils/dialog.es6";
  import wx from "../../../../utils/WXShare.es6"
  import comWxNotopen from '../../../component/com-wx-notopen.vue'
  import common from '../../../common/js/common.js'
  export default {
    data: function () {
      return {
        successData:{},
        state:null,
        isapp:!!navigator.userAgent.match(/davdian|bravetime|vyohui/),
        kewwords: '',
        data:[],
        upTop:0,
        scroolY: 0,
        classIfyAllFlag: false,
        dataList: [],
        selectIndex: 0,
        cId: getQuery('cId') ||  -1,
        timeSort: getQuery('timeSort') || 0,
        pvSort: getQuery('pvSort') ||  0,
        pageIndex: 0,
        oldfId:getQuery('fId') ||  -1,
        oldcId:getQuery('cId') ||  -1,
        oldselectIndex:0,
        fId: getQuery('fId') ||  -1,
        getCategoryRetFlag : true,
        more: 1,
        webUrl: '/api/mg/content/course/allCourseList',
        titleFirst: getQuery('title') || '分类',
        isInisWechatOrAppFlag: isInisWechatOrApp(),
        isNoData: false
      }
    },
    computed: {},
    created: function () {

    },
    mounted: function () {
      if (this.isInisWechatOrAppFlag){
        this.scroolF()
        this.init()
        if (getQuery('cId') && getQuery('fId') ||getQuery('pvSort') ||getQuery('timeSort')){
          this.webUrl = '/api/mg/content/course/getCategoryRet'
        }else {
          this.webUrl = '/api/mg/content/course/allCourseList'
        }
        this.getCategoryRet()
        this.wxShare()
      }
    },
    methods: {
      startTimestamp:function (time) {
        return time.substring(0,16);
      },
      goHref(href){
        window.location.href=  href
      },
      livenow:function (item) {
        var timestamp = Date.parse(new Date());

        if(item.startTimestamp*1000 < timestamp && item.endTimestamp == 0){
          return true;
        }
      },
      livetext:function (item) {
        var startTimestamp = item.startTimestamp*1000;
        var endTimestamp = item.endTimestamp*1000;
        var timestamp = Date.parse(new Date());//当前时间
        var localeDate = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
        var today = Date.parse(new Date(new Date(localeDate).getTime()+24*60*60*1000-1));//今天晚上23.59.59
        var tomorrow = Date.parse(new Date(new Date(localeDate).getTime()+48*60*60*1000-1));//明天晚上23.59.59
        if(endTimestamp != 0){
            return false;
        }
        if(startTimestamp < timestamp && endTimestamp == 0){
            return "正在直播";
        }else if(startTimestamp <= today && startTimestamp > timestamp ){
            // return "今天 " + new Date(parseInt(startTimestamp)).toString().slice(15,24);
            return "今天 " + new Date(parseInt(startTimestamp)).toString().slice(15,21);
        }else if(startTimestamp <=tomorrow && startTimestamp> today){
            // return "明天 " + new Date(parseInt(startTimestamp)).toString().slice(15,24);
            return "明天 " + new Date(parseInt(startTimestamp)).toString().slice(15,21);
        }else if(startTimestamp > tomorrow){
            var starttime = new Date(parseInt(startTimestamp));
            return starttime.getUTCFullYear() + "-" + (starttime.getMonth()+1) +"-"+starttime.getDate()+" "+(starttime.getHours()<10?'0':'')+starttime.getHours()+":"+(starttime.getMinutes()<10?'0':'')+starttime.getMinutes()
        }
      },
      init(){
        var that = this
        api('/api/mg/content/course/getCourseCategoryList')
          .then(function(respone){
            if (respone.code == 0){
              // that.dataList = [{
              //   fId:-100,
              //   fTitle:'全部课程',
              //   list:[{'cId':0,'cTitle':'全部','sort':0}]
              // }]
              that.dataList = that.dataList.concat(respone.data.dataList)
              that.fId = getQuery('fId') || 0
            } else {
              dialog.alert('code:' + respone.code+';msg:'+respone.data.msg)
            }
          }).catch(function(e){
            console.log('error:', e)
          })
      },
      wxShare(){
        var that = this
        let shareLink = window.location.host + '/vSchoolClassify.html?'
        if (that.cId>-1){
          shareLink += 'cId=' + that.cId + '&'
        }
        if (that.fId>-1){
          shareLink += 'fId=' + that.fId + '&'
        }
        if (that.timeSort>-1){
          shareLink += 'timeSort=' + that.timeSort + '&'
        }
        if (that.pvSort>-1){
          shareLink += 'pvSort=' + that.pvSort + '&'
        }
        let shareInfo = {}
        shareInfo.title = '课程分类|妈妈课堂'
        shareInfo.link = shareLink
        shareInfo.imgUrl = 'http://pic.davdian.com/free/2017/04/07/640_640_c04f341e77963fcbad86a4e42df8bb83.jpg?x-oss-process=image/resize,m_fill,w_100,h_100/quality,Q_90&'
        shareInfo.desc = '更便捷精准，抵达海量优质内容'
        wx.init(shareInfo)
      },
      getCategoryRet(){
        if (!this.getCategoryRetFlag && this.more == 1)
          return
        var that = this
        that.getCategoryRetFlag = false
        let obj = {
          pageIndex: that.pageIndex,
          pageSize: 10,
          fId: that.fId,
          cId : that.cId,
          timeSort: that.timeSort,
          pvSort: that.pvSort,
        }
        if (that.cId < 0){
          obj.cId = 0
        }
        if (that.fId < 0){
          obj.fId = 0
        }
        api(that.webUrl, obj)
          .then(function(respone){
            common.checkRedirect(respone)
            that.getCategoryRetFlag = true
            if (respone.code == 0){
              if (that.pageIndex == 0){
                window.scrollTo(0, 0)
                that.data = respone.data.course.dataList
              } else {
                that.data = that.data.concat(respone.data.course.dataList)
              }
              if (that.data.length>0){
                that.isNoData = false
              }else {
                that.isNoData = true
              }
              that.more = respone.data.course.more
              that.pageIndex = that.pageIndex + 10
            } else {
              dialog.alert('code:' + respone.code+';msg:'+respone.data.msg)
            }
          }).catch(function(e){
            console.log('error:', e)
          })
      },
      getCategoryRetInit(){
        this.pageIndex = 0
        this.fId = 0
        this.cId = -1
        this.timeSort = 0
        this.pvSort = 0
        this.webUrl = '/api/mg/content/course/allCourseList'
        this.getCategoryRet()
      },
      scroolF(){
        var that = this
        $(window).scroll(function () {
          var el = $(".containerAll").get(0);
          var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
          if(bottom<100){
            if (that.more == 1)
            that.getCategoryRet()
          }
          if (that.upTop>=-44 && that.upTop<=0){
            that.upTop = that.upTop - (window.scrollY - that.scroolY)
            if (that.upTop<-44){
              that.upTop = -44
            }
            if (that.upTop>0){
              that.upTop = 0
            }
          }
          if (window.scrollY<44){
            that.upTop = 0
          }
          console.log(window.scrollY)
          that.scroolY = window.scrollY
        })
      },
      goSerach(href){
        window.location.href = '/course_search.html'
      },
      classIfyAll(){
        this.classIfyAllFlag = !this.classIfyAllFlag
        if (this.classIfyAllFlag){
          $('.containerAll').css({
            'height':document.documentElement.clientHeight - 105 + "px",
            "overflow":"hidden"
          });
        } else {
          $('.containerAll').css({
            'height':"auto",
            "overflow":"auto"
          });
          this.selectIndex = this.oldselectIndex
          this.fId = this.oldfId
          this.cId = this.oldcId
        }
      },
      classIfyAll2(index, fId){
        this.selectIndex = index
        this.fId = fId
        this.cId = -1
      },
      classIfyAll3(id, t, f){
        this.cId = id
        this.classIfyAllFlag = false
        if (id == 0){
          this.titleFirst = f
        } else {
          this.titleFirst = t
        }
        $('.containerAll').css({
          'height':"auto",
          "overflow":"auto"
        });
        this.oldselectIndex = this.selectIndex
        this.oldfId = this.fId
        this.oldcId = this.cId
        if (this.fId == 0){
          this.titleFirst = '分类'
          this.getCategoryRetInit()
        }else {
          this.webUrl = '/api/mg/content/course/getCategoryRet'
          if (this.getCategoryRetFlag){
            this.pageIndex = 0
            this.getCategoryRet()
          }
        }
        
      },
      timeSortF(){
        this.pvSort = 0
        this.webUrl = '/api/mg/content/course/getCategoryRet'
        this.classIfyAllFlag = false
        // if (this.getCategoryRetFlag){
        //   this.pageIndex = 0
        //   this.getCategoryRet()
        // }
        if (parseInt(this.timeSort) == 0){
          this.timeSort = 2
        } else if (parseInt(this.timeSort) == 1){
          this.timeSort = 2
        }else if (parseInt(this.timeSort) == 2){
          this.timeSort = 1
        }
        if (this.getCategoryRetFlag){
          this.pageIndex = 0
          this.getCategoryRet()
        }
      },
      pvSortF(){
        if (parseInt(this.pvSort) == 2){
          return
        }
        this.timeSort =0
        this.classIfyAllFlag = false
        if (parseInt(this.pvSort) == 0){
          this.pvSort = 2
        }
        // else {
        //   this.pvSort = 0
        // }
        this.webUrl = '/api/mg/content/course/getCategoryRet'
        if (this.getCategoryRetFlag){
          this.pageIndex = 0
          this.getCategoryRet()
        }
      }
    },
    components:{
      comWxNotopen
    }
  }
</script>
<style>
  html body{
    background: #fff;
    user-select: inherit;
  }
  .search_button{
    height: 30px;
  }
  .activity_container_search{
    position: fixed;
    width: 100%;
    max-width: 640px;
    top: 0;
    height: 84px;
    z-index: 2;
  }
  .activity_container .search_top .search_con{
    padding-left: 45px;
    padding-right: 10px;
  }
</style>
<style lang='sass' scoped>
  .borderRight{
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    border-right: 1px solid #e1e1e1;
  }
  .circle{
      background-color: #92FDE0;
      display: inline-block;
      margin-right: 2px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
  }
  .activity_container{
    max-width: 640px;
  }
  .uptitle{
    height: 40px;
    border-bottom: 1px solid #eee;
    background: #fff;
    font-size: 0;
    .classifyOne{
      width: 1.25rem;
      box-sizing: border-box;
      /*float: left;*/
      display: inline-block;
      vertical-align: top;
      color: #333333;
      height: 40px;
      text-align: center;
      .classifyOneTag{
        display: inline-block;
        vertical-align: top;
        height: 20px;
        margin-top:10px;
        width: 100%;
        border-right: 1px solid #eee;
        font-size: 0;
        .classifyOneTagText{
          font-size: 14px;
          height: 20px;
          display: inline-block;
          vertical-align: top;
        }
        .classifyOneTagImg{
          width: 20px;
          display: inline-block;
          vertical-align: top;
        }
        .titleFirstStyle{
          color: #FF4A7D;
        }
      }
      .classifyOneTagLast{
        border-right: 0;
      }
    }
  }
  .uptitle2{
    font-size: 0;
    background: #fff;
    position: relative;
    .uptitle2_left{
      width: 0.98rem;
      display: inline-block;
      vertical-align: top;
      max-height: 3.5rem;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .uptitle2_left_classify{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        box-sizing: border-box;
      }
      .select{
        border-right:0;
        color: #FF4A7D;
      }
    }
    .uptitle2_right{
      width: 2.75rem;
      vertical-align: top;
      display: inline-block;
      font-size: 12px;
      height: 100%;
      position: absolute;
      left: 1rem;
      top: 0;
      bottom: 0;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .right_containerAll{
        width: 2.4rem;
        font-size: 0;
        margin-left: 20px;
        margin-top: 10px;
        .div{
          background: #F2F2F2;
          height: 33px;
          line-height: 33px;
          width: 0.98rem;
          color:#333333;
          display: inline-block;
          vertical-align: top;
          text-align: center;
          font-size: 12px;
          margin-right: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        .div:first-child{
          margin-right: 1.5rem;
        }
        .divSelect{
          background: #FFE7EE;
          color: #FF4A7D;
          position: relative;
          img{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 18px;
          }
        }
      }
    }
  }
  .containerAll{
    padding-bottom: 0.2rem;
  }
  .container{
    width: 3.5rem;
    height: 0.77rem;
    margin-left: 0.1rem;
    margin-right: 0.15rem;
    margin-top: 0.2rem;
    font-size: 0;
    .containerImg{
      width: 1.1rem;
      height: 0.77rem;
      display: inline-block;
      vertical-align: top;
      border-radius: 4px;
    }
    .content{
      width:  2.3rem;
      margin-left: 0.1rem;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      .contentTitle{
        color: #333333;
        line-height: 0.18rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
      }
      .contentTeacher{
        color: #999999;
        font-size: 12px;
        line-height: 0.12rem;
        margin-top: 0.08rem;
        margin-bottom: 0.08rem;
      }
      .contentPv{
        color: #999999;
        font-size: 12px;
        line-height: 0.12rem;
      }
    }
  }
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.4;
    z-index: 1;
  }
  .serach_black{
    width: 100%;
    height: 84px;
  }
  .noData{
    text-align: center;
    margin-top: 100px;
    img{
      width: 120px;
      margin-bottom: 30px;
    }
    p{
      width: 100%;
      color: #666;
    }
  }
</style>
