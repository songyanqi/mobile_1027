<template>
  <div>

    <!--{{ historylist }} {{ hotList }}-->
    <!--　:::{{ menu_item  }}:::{{ ifshowhistory }}::::{{ ifshowhot }}:::{{ no_more }}-->
    <div class="search_top clearfix">
      <a class="left_icon_container" href="javascript:history.back();">
        <span class="home_arrow"></span>
      </a>
      <form type="search" action="" class="ng-pristine ng-valid">
        <div class="search_con search_button april_border hairlines ">
          <div class="border_inner"></div>
          <div class="search_input_con">
            <span class="search_icon"></span>
            <input type="search" v-model="kewwords" name="q" placeholder="请输入课程名称" class="search_input" autocomplete="off">
          </div>

        </div>
        <a class="search_btn" href="javascript:history.back();">取消</a>
      </form>
    </div>


    <vcategory :list="list" :loading="loading" :no_more="no_more" :flag="flag"></vcategory>

    <menu_item v-if="menu_item" :item_name="item_name" :item_link="item_command" class="menu_item"></menu_item>

    <div v-if="ifshowhistory" class="search_history first">
      <div>
        <span class="history">历史搜索 :</span>
        <span class="history_clear" @click="clearhistory">清空</span>
      </div>
      <ul class="history_list">
        <li v-for="item in historylist" v-on:click="addList(item)">{{item}}</li>
      </ul>
    </div>

    <div v-if="ifshowhot" class="search_history">
      <span class="hot">热门搜索 :</span>
      <ul class="history_list">
        <li v-for="item in hotList" :style="{color:color1(item.colorType)}"
            @click="searchs(item.name,item.command.content)"
            >{{item.name}}</li>
      </ul>
    </div>

    <!--<history_hot_list v-if="historylist.length" :hhlist_name="historyName" :clear="historyClear"-->
    <!--:item_list="historyList" @transferclear="clear2"-->
    <!--@transfertsearchs="getsearchinput">-->

    <!--</history_hot_list>-->
  </div>
</template>

<script>
  import layout from "./index/layout.es6";
  var vcategory = require("../module/vSchool_search_category.vue");
  var menu_item = require("../module/menu_items.vue");
  export default{
    data: function () {
      return {
        searchInput: $(".search_input"),
        list: [],
        loading: false,// 防止过快加载数据
        kewwords:'',
        no_more: false,// 判断是否还要继续加载数据
        historylist: [],
        ifhotList:true,
        vscholl_search_historytData: {},
        c_bind: null,
        dvd_vschool_search: [],
        historyname: 'dvd_vschool_search',
        ifshowhistory: true,
        ifshowhot: true,

        item_name: '',
        item_command: '',
        placeholder: '',
        hotList: [],
        menu_item:true,
        flag:false
      }
    },

    components: {
      vcategory: vcategory,
      menu_item:menu_item
    },
    mounted: function () {
      var scope = this;
      setTimeout(function () {
        scope.onfocus();
        scope.onblur();
      }, 0);
      // 看看cookie里面有没有搜索记录
      var dvd_index_search = $.cookie("dvd_vschool_search");
      if (dvd_index_search && dvd_index_search.length) {
        scope.historylist = dvd_index_search.split(",");
      }else{
          this.ifshowhistory=false;
      }
      /*判断是否是从课程详情页返回来的是的话，调用缓存数据*/
      var urlHistoryList = JSON.parse(sessionStorage.getItem("history"));
      if (urlHistoryList.length > 1) {
        var reSeconds = urlHistoryList.length,
          Hurl = urlHistoryList[reSeconds - 2].path;
        if (Hurl == 'live_review'
          || Hurl == 'live_trailer'
          || Hurl == 'live'
          || Hurl == 'live_review_h5'
          || Hurl == 'video_live'
          || Hurl == 'video_playback'
          || Hurl == 'introduce'
          || Hurl == 'video_playback_list'
        ) {
          /*获取缓存数据*/
          var vscholl_search_historytData = sessionStorage.getItem("vscholl_search_historytData");
          scope.vscholl_search_historytData = JSON.parse(vscholl_search_historytData);
          sessionStorage.getItem("no_more")=="true"?scope.no_more=true:scope.no_more=false
          console.log(sessionStorage.getItem("no_more")=="true");
          /*渲染列表*/
          scope.list = scope.vscholl_search_historytData.arry;
          /*不显示历史记录*/
          scope.menu_item=false;
          scope.ifshowhistory=false;
          scope.ifshowhot=false;
//          scope.no_more = scope.vscholl_search_historytData.no_more === 'true';
          setTimeout(function () {
            $(window).on("scroll", function () {
              var page = scope.vscholl_search_historytData.page;
              if (scope.no_more) {

              } else {
                var bodyHeight = $(document.body).height();
                var scrollTop = $(document).scrollTop();
                var windowHeight = $(window).height();
                var bottom = bodyHeight - scrollTop - windowHeight;
                if (bottom < 100) {
                  if (scope.loading == false) {
                    page++;
                  }
                  scope.refreshlist(scope.vscholl_search_historytData.keyword, page);
                }
              }
            });
          }, 500);
        }
      }
      $("form").submit(function (e) {
        /*获取搜索历史记录再搜索append*/
        var dvd_index_search = $.cookie("dvd_vschool_search");
        if (dvd_index_search && dvd_index_search.length) {
          scope.historylist = dvd_index_search.split(",");
        }
        /*清空缓存*/
        scope.historytData = {};
        /*清空页面数据*/
        scope.list = [];
        /*不显示历史记录*/
        scope.ifshowhistory = false;
        /*关闭没有更多*/
        scope.no_more = false;
        e.preventDefault();
        var v = scope.kewwords;
        if (v == "") {
          bravetime.info("请输入搜索内容");
          return false;
        }
        /*存储搜索记录*/
        scope.addWord2List(v);
        /*获取数据*/
        scope.addList(v);
      });
    },
    created:function () {
      this.getCourseHotwords();
    },
    methods: {
      clearhistory:function () {
        $.cookie('dvd_vschool_search', "");
        this.historylist = [];//修改dom
        this.ifshowhistory=false;
      },
      color1:function (color) {
        // 处理颜色的字符串
        return "#"+color.substring(2);
      },
      searchs: function (msg, url) {
        if (url == '') {
          this.addWord2List(msg);
          this.addList(msg);
        } else {
          this.addWord2List(msg);
          window.location.href = url;
        }
      },
      getCourseHotwords:function () {
        var scope = this;
        $.ajax({
          url: "/api/mg/content/course/getCourseSearchHotwords",
          type: "POST",
          data: layout.strSign("search", {}),
          dataType: "json",
          success: function (result) {
            if (!result.code) {
              if (result.data.list.length) {
                scope.hotList = result.data.list;
              } else {
                scope.hotList = [];
              }
              scope.item_name = result.data.buttonsInfo[0].name;
              scope.item_command = result.data.buttonsInfo[0].command.content;
              if (result.data.searchboxHotwords && result.data.searchboxHotwords != '') {
                scope.placeholder = result.data.searchboxHotwords;
              }
            } else {
              bravetime.info(result.msg);
            }
          },
          error: function (e) {
              console.log(e, 123)
          }
        });
      },
      onfocus: function () {
        var body = $("body");
        $(".search_input").focus(function () {
          body.addClass("searching");
          body.removeClass("filtering");
        });
      },
      onblur: function () {
        var body = $("body");
        $(".search_input").blur(function () {
          setTimeout(function () {
            body.removeClass("searching")
          }, 300)
        });
      },
      addWord2List: function (v) {
        var index = -1;
        var scope = this;
        for (var i = 0; i < scope.historylist.length; i++) {
          if (scope.historylist[i] == v) {
            index = i;
          }
        }
        if (index > -1) {
          scope.historylist.splice(index, 1);
        }
        if (scope.historylist.length > 14) {
          scope.historylist.splice(14, scope.historylist.length);
        }
        scope.historylist.unshift(v);
        $.cookie("dvd_vschool_search", scope.historylist.join(","))

      },
      clearCategory: function () {
        var scope = this;
        $.removeCookie(scope.historyname);
        scope.historylist = [];
      },
      addList: function (v) {
        var page = 1;
        var scope = this;
        scope.menu_item=false;
        scope.ifshowhistory=false;
        scope.ifshowhot=false;
        scope.refreshlist(v, page);
        $(window).off("scroll");
        setTimeout(function () {
          $(window).on("scroll", function () {
            if (scope.no_more) {
              // 没有数据就不判断bottom了
              $(window).off("scroll");
              console.log("没有数据了");
            } else {
              var bodyHeight = $(document.body).height();
              var scrollTop = $(document).scrollTop();
              var windowHeight = $(window).height();
              var bottom = bodyHeight - scrollTop - windowHeight;
              if (bottom < 100) {
                if (scope.loading == false) {
                  page++;
                }
                scope.refreshlist(v, page);
              }
            }
          });
        }, 500);
      },
      refreshlist: function (v, page) {
        var scope = this,
          data = {};
        data.keywords = v;
        data.page = page;
        data.pageSize = 20;
        if (!scope.loading) {
          scope.loading = true;
          $.ajax({
            type: 'post',
            url: window.searchUrl,
            data: layout.strSign('course_search', data),
            dataType: "json",
            success: function (result) {
              console.log(result.data);
              if (result.code == 0) {
                if (result.data && result.data.dataList.length) {
                  var arry = scope.list;
                  for (var i = 0; i < result.data.dataList.length; i++) {
                    arry.push(result.data.dataList[i])
                  }
                  scope.list = arry;
                  /*total如果大于20就是有下一页*/
                  if (result.data.total > 20) {
                    var totalpage = Math.ceil(result.data.total / 20);
                    if (totalpage == page) {
                      scope.no_more = true;
                    }
                  } else {
                    scope.no_more = true;
                  }
                  scope.loading = false;
                  scope.flag=false;
                } else {

                  scope.loading = false;
                  scope.no_more = true;
                  scope.flag=true;

                }
              }else{
                bravetime.info()
              }
              /*存储缓存*/

              var arry_main = {};
              arry_main.keyword = v;
              arry_main.no_more = scope.no_more;
              arry_main.page = +page + 1;
              arry_main.arry = arry;
              var vscholl_search_historytData = $.extend(scope.historytData, arry_main);
              sessionStorage.setItem("vscholl_search_historytData", JSON.stringify(vscholl_search_historytData));
              sessionStorage.setItem("no_more", scope.no_more);
            },
            error: function (e) {
              scope.loading = false;
              scope.no_more = false;
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .search_history .history_list li, .search_like .like_list li {
    display: block;
    float: left;
    font-size: 14px;
    color: #666666;
    background-color: #F8F8F8;
    padding: 5px 13px;
    border-radius: 14px;
    margin: 5px;
    cursor: pointer;
    max-width: 122px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .first{
    background: white;
    padding: 10px 0 10px 0;
    overflow: hidden;
  }
  .first .history_clear {
    float: right;
    padding-right: 10px;
    font-size: 12px;
    color: #999;
  }
  .search_history .history, .search_history .hot {
    display: inline-block;
    height: 20px;
    background-size: 16px 16px;
    background-position: 0 2px;
    background-repeat: no-repeat;
    padding-left: 20px;
    margin-left: 10px;
    font-size: 14px;
    line-height: 20px;

  }
  .search_history .history_list li, .search_like .like_list li {
    font-size: 14px;
    color: #666;
    line-height: 20px;
    border-bottom: 0;
  }
  .hot {
    background-image: url("//pic.davdian.com/free/2017/05/04/hot.png");
  }
  .history {
    background-image: url("//pic.davdian.com/free/2017/05/04/history.png");
  }
  .search_history{
    background: white;
    padding: 10px 0 10px 0;
    overflow: hidden;
  }
  .history_list {
    padding: 5px;
    overflow: hidden;
    background: white;
  }
</style>
