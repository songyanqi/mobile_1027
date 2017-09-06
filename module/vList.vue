<template>
  <div class="classroom_container">
    <div class="top0 true_top" v-if='!inApp'>
      <div class="top_container" v-if="!isShow">
        <div class="top_left">
          <a class="top_back" href="javascript:history.back();">
            <span class="home_arrow"></span>
          </a>
        </div>
        <div class="title_container" v-if='haveMenu'>
          动态
        </div>
        <div class="title_container" v-text='menuName' v-if='!haveMenu'></div>
        <div class="top_right" v-if='haveMenu'>
          <a class="top_back" href="class_category.html"
             data-dav-tj="classroom|category|category|1|category@classroom">
            <span class="classification_search_ico"></span>
          </a>
        </div>
      </div>
      <div class="top_container" v-if="isShow">
        <div class="top_left">
          <a class="top_back" href="javascript:history.back();">
            <span class="home_arrow"></span>
          </a>
        </div>
        <div class="title_container" v-if='haveMenu'>
          亲子时光
        </div>
        <div class="title_container" v-text='menuName' v-if='!haveMenu'></div>
      </div>
      <v-list-switcher v-if='haveMenu' class="out_switch" :list="switcherListDate" :init-category="category" v-on:category="changeCategory"></v-list-switcher>
    </div>
    <div class='content-top' v-if='!inApp && haveMenu'></div>
    <div class='content-top1' v-if='!inApp && !haveMenu'></div>
    <v-list-switcher v-if='inApp && haveMenu' class="out_switch out_switch_top" :list="switcherListDate" :init-category="category" v-on:category="changeCategory"></v-list-switcher>
    <div class='content-top-top' v-if='inApp && haveMenu'></div>
    <v-list-content :init-list="contentListData" :has-more="hasMore" :category="category" v-on:top="changeTop" v-on:praise="praise"></v-list-content>
    <div class="refresh" v-if='dataAllNull'>
      <div v-if="hasMore" class="uil-default-css-normal" style="-webkit-transform:scale(0.15);-moz-transform:scale(0.15);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;width:30px;height: 30px;display: inline-block;">
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
        <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
      </div>
      <div v-if="hasMore">数据加载中...</div>
      <div v-else>没有更多</div>
    </div>
    <com-footer active="dynamic" v-if='haveMenu && !isShow'></com-footer>
  </div>
</template>
<style>
  /*.classroom_container{
      margin-top:40px;
  }*/
  .in_app .classroom_container{
    margin-top:0;
  }
  .content-top{
    width: 100%;
    height: 84px;
  }
  /*.in_app .v_menu{
      position: fixed;
      top: 0;
      z-index: 9;
  }*/
  /*body.in_app{
      padding-top:40px;
  }*/
  body{
    padding-top: 0;
  }
  .in_app .top_left {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
  }
  .top0 .top_container {
    font-size: 16px;
    background-color: hsla(0,0%,98%,.95);
    text-align: center;
    position: relative;
    border-bottom: 0.5px solid rgba(0,0,0,0.05);
  }
  body.in_app .top0.true_top{
    position: fixed;
    top: 0;
    display: block;
    width: 100%;
    max-width: 640px;
    z-index: 11;
  }
  .out_switch_top{
    position: fixed;
    top: 0;
  }
  .content-top1{
    width: 100%;
    height: 46px;
  }
  .content-top-top{
    width: 100%;
    height: 39px;
  }
</style>
<script>
  import vListSwitcher from './vListSwitcher.vue'
  import vListContent from './vListContent.vue'
  import comFooter from '../src/component/com-footer.vue'
  import layout from "./layout/api.es6";
  import {getQuery} from "../utils/utils.es6"
  import share from "../src/common/js/module/share.js"
  import native from "../src/common/js/module/native.js"
  import appInterface from "../utils/appInterface.es6"
  export default{
    data(){
      return{
        pageSize:window.pagesize||10,
        sort:window.sort||0,
        category:window.category||0,
        pageIndex: 0,
        getNewDataFlag: true,
        hasMore:true,
        ajaxing:true,
        contentListData:[], // 列表数据
        switcherListDate:[], // 列表名称数据
        bannerListData:[],
        pos:0,
        inApp:true,
        scrollFlag:true,
        dataAllNull:true,
        haveMenu: true,
        menuName: document.title || '动态',
        needSaveParas:['pageIndex','category','hasMore','contentListData','switcherListDate','bannerListData','pos'],
        isShow:getQuery("isShow")
      }
    },
    watch:{

    },
    created(){
      this.inApp = Units.isApp();
      this.init()
      if(this.isShow){
        if (sessionStorage.getItem("v_list")){
          this.category = layout.sStorageGet('v_list','category');
        }else{
          this.category=this.isShow.split("-")[0];
        }
        document.title="亲子时光";
      }
    },
    updated(){

    },
    mounted(){

      try {
        share.setShareInfo({
          title: "亲子时光|妈妈商学院",
          desc: "睡前故事|早安音乐|有声绘本|家庭百科，全都在这里",
          link: window.location.href,
          imgUrl: "http://pic.davdian.com/free/2017/08/30/210_210_f115620a5e0d745863faaa11f7b49aa3.jpeg"
        })
      } catch (err) {
        alert(err)
      }
      if(this.isShow){
        setTimeout(function(){
          native.Browser.setHead({
            title:"亲子时光",
            backBtn:"1",
            shareBtn:"1",
          });
        },400);
        setTimeout(function(){
          window.iosInterface.getShareInfo = function () {
            var shareInfo = {
              title: "亲子时光|妈妈商学院",
              desc: "睡前故事|早安音乐|有声绘本|家庭百科，全都在这里",
              link: window.location.href,
              imgUrl: "http://pic.davdian.com/free/2017/08/30/210_210_f115620a5e0d745863faaa11f7b49aa3.jpeg"
            };
            return JSON.stringify(shareInfo);
          };
        },300);
      }
    },
    components:{
      vListSwitcher:vListSwitcher,
      vListContent:vListContent,
      'com-footer':comFooter,
    },
    methods:{
      //split isShow

      isShowFn(){
        if(this.isShow){
          return this.isShow.split("-")
        }
      },
      // 初始化数据
      init(){
        this.haveMenu = ! window.Units.getQuery('isMenu')
        this.getData()
      },
      getData(){
        var that = this
        var allData = this.getDataFromLocal();
        let data = {
          pageIndex:this.pageIndex,
          pageSize:10,
          menuId:that.isShow?that.isShowFn()[0]:0,
          needMenu: 1
        }
        let obj = {
          method:'post',
          data: data
        }
        if (this.inApp && window.Units.getQuery('isMenu')){
          setTimeout(function(){
            window.appData.showHead = 1
            window.appData.backOnHead = 1
            window.bravetime.initHead()
          },500)
        }
        if (window.Units.getQuery('menuId') || window.Units.getQuery('menuId')==0){
          data.menuId = window.Units.getQuery('menuId')
          this.category = window.Units.getQuery('menuId')
          that.getDataByApi(obj)
        }else {
          let sessionList = JSON.parse(sessionStorage.getItem("history"))
          if (sessionList&&sessionList.length>=2 && JSON.parse(sessionStorage.getItem("history"))[JSON.parse(sessionStorage.getItem("history")).length-1].path==JSON.parse(sessionStorage.getItem("history"))[JSON.parse(sessionStorage.getItem("history")).length-2].path){
            setTimeout(function(){
              window.scrollTo(0, 0)
            },150)
            for (var a in sessionStorage){
              if (!(a == 'history' || a == 'v_list'))
                sessionStorage.removeItem(a)
            }
            if (sessionStorage.getItem("v_list")){
              data.menuId = JSON.parse(sessionStorage.getItem("v_list"))['category']
              that.category = JSON.parse(sessionStorage.getItem("v_list"))['category']
            }
          }
          if(allData&&allData.page=="classroom_detail"){
            that.category = layout.sStorageGet('v_list','category')
            that.pageIndex = layout.sStorageGet('localTop_' + that.category, 'pageIndex')
            that.getNewDataFlag = layout.sStorageGet('localTop_' + that.category, 'getNewDataFlag')
            that.hasMore = layout.sStorageGet('localTop_' + that.category, 'hasMore')
            that.dataAllNull = layout.sStorageGet('localTop_' + that.category, 'dataAllNull')
            that.contentListData = layout.sStorageGet('list_' + that.category)
            that.switcherListDate = JSON.parse(sessionStorage.getItem('switcherListDate'))
          }else{
            that.getDataByApi(obj)
          }
        }
        $(window).on("scroll",function(){
          if (that.scrollFlag){
            that.scrollFlag = false
            setTimeout(function(){
              that.scrollFlag = true
              var el = $(".classroom_container").get(0);
              var bottom = el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY);
              if(bottom<100){
                that.getNewData();
              }
            },500)
          }
        });
      },
      getNewData(){
        var that = this
        if (this.getNewDataFlag){
          this.getNewDataFlag = false;
          that.hasMore = true
          let data = {
            pageIndex:this.pageIndex,
            pageSize:10,
            menuId:this.category,
            needMenu: 0
          }
          let obj = {
            method:'post',
            data: data
          }
          this.getDataByApi(obj)
        }
      },
      //切换nav方法
      changeCategory(category){
        var that = this
        let o = {
          top: window.scrollY,
          pageIndex: this.pageIndex,
          getNewDataFlag: this.getNewDataFlag,
          hasMore: this.hasMore,
          dataAllNull: this.dataAllNull
        }
        var oldcategory = this.category
        this.category = category
        let obj = {
          category: this.category
        }
        layout.sStorageSet('v_list', obj)
        var key = 'list_' + category
        if (sessionStorage.getItem(key)){
          this.contentListData = JSON.parse(sessionStorage.getItem(key))
          this.pageIndex = layout.sStorageGet('localTop_' + this.category, 'pageIndex')
          this.getNewDataFlag = layout.sStorageGet('localTop_' + this.category, 'getNewDataFlag')
          this.hasMore = layout.sStorageGet('localTop_' + this.category, 'hasMore')
          this.dataAllNull = layout.sStorageGet('localTop_' + this.category, 'dataAllNull')
          if (layout.sStorageGet('localTop_' + this.category, 'top') ||layout.sStorageGet('localTop_' + this.category, 'top') == 0){
            setTimeout(function(){
              window.scrollTo(0, layout.sStorageGet('localTop_' + that.category, 'top'))
            },150)
          }
        }else {
          this.changeTagGetDate()
        }
        layout.sStorageSet('localTop_' + oldcategory, o);
        let objStatistics = {
          "actionType": "1",
          "listId": category
        };
        layout.statistics(objStatistics,function () {});
      },
      changeTagGetDate(){
        var that = this
        this.pageIndex=0;
        this.contentListData=[];
        this.hasMore = true;
        this.ajaxing = false;
        let data = {
          pageIndex:0,
          pageSize:10,
          menuId:this.category,
          needMenu:0
        }
        let obj = {
          method:'post',
          data: data
        }
        this.getDataByApi(obj)
      },
      getMenuName(data){
        for (let i=0;i<data.length;i++){
          if (data[i].menuId == this.category){
            this.menuName = data[i].title;
            // document.title = data[i].title
            setTimeout(function () {
              window.Units.setTitle = data[i].title
            },100)

            if (this.inApp && window.bravetime&&bravetime.setHead){
              window.bravetime&&bravetime.setHead({title: data[i].title})
            }
          }
        }
      },
      getDataByApi(obj){
        var that = this
        layout.api('/api/mg/content/page/list', obj, function(result){
          if (result.code == '0'){
            if (result.data && result.data.menuData && result.data.menuData.menuList){
              that.getMenuName(result.data.menuData.menuList)
            }
            that.pageIndex = that.pageIndex + 1
            that.getNewDataFlag = true
            if (result.data && result.data.feedList && result.data.feedList.length == 0){
              that.dataAllNull = false
            } else {
              that.dataAllNull = true
            }
            if(result.data && result.data.feedList && result.data.feedList.length<10){
              that.hasMore = false
              that.getNewDataFlag = false
            }
            if (result.data && result.data.feedList){
              that.contentListData = that.contentListData.concat(result.data.feedList)
              that.setDataToLocal(that.contentListData)
            }
            if (result.data && result.data.menuData && result.data.menuData.menuList){
              if(that.isShow){
                var allMenuData=result.data.allMenuList;
                console.log(allMenuData);
                var arr=that.isShowFn();
                var newarr=[];
                arr.map(function (item,index) {
                  allMenuData.map(function (item2,index2) {
                    if(item==item2.menuId){
                      newarr.push(item2);
                    }
                  })
                })
                console.log(newarr);
                that.switcherListDate = newarr;
              }else {
                that.switcherListDate = result.data.menuData.menuList
              }
              sessionStorage.setItem('switcherListDate', JSON.stringify(that.switcherListDate))
            }
            if (!result.data || !result.data.feedList){
              that.dataAllNull = false
              that.hasMore = false
              that.getNewDataFlag = false
            }
            let o = {
              top: window.scrollY,
              pageIndex: that.pageIndex,
              getNewDataFlag: that.getNewDataFlag,
              hasMore: that.hasMore,
              dataAllNull: that.dataAllNull
            }
            layout.sStorageSet('localTop_' + that.category, o)
            let ol = {
              category: that.category
            }
            layout.sStorageSet('v_list', ol)
            that.setDataToLocal('list_'+that.category,that.contentListData)
          } else {
            if (result.data && result.data.msg){
              bravetime.newAlert(result.data.msg, function () {
                for (var a in sessionStorage){
                  sessionStorage.removeItem(a)
                }
                window.location = window.location.href;
              })
            } else {
              bravetime.newAlert(result.code, function () {
                for (var a in sessionStorage){
                  sessionStorage.removeItem(a)
                }
                window.location = window.location.href;
              })
            }

          }
        })
      },
      getDataFromLocal(){
        var result = null;
        if (!window.isPrivateMode && window.sessionStorage) {
          var data = sessionStorage.getItem("v_list")
          var his = sessionStorage.getItem("history")
          if (his) {
            var historyList = JSON.parse(his);
          }
          if(data && historyList && historyList.length && historyList[historyList.length - 2]){
            var lastPath = historyList[historyList.length-2].path; // 上一页路径
            if(lastPath=="classroom"||lastPath=="classroom_detail"){
              result = {};
              result.data = JSON.parse(data);
              result.page = lastPath;
            }
          }
        }
        return result;
      },
      setDataToLocal(key,data){
        if (!window.isPrivateMode && window.sessionStorage) {
          if (data) {
            sessionStorage.setItem(key, JSON.stringify(data));
          }
        }
      },
      praise(index){
        this.contentListData[index].has_been_like=1;
        this.contentListData[index].active_praise = 1;
        this.contentListData[index].thumb_up_num++;
      },
      changeTop(top){
        this.pos = top;
        // this.saveData();
      }
    }

  }

</script>
