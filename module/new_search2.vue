<template>
  <!--移动端-->
  <div v-if="isMobile" @touchstart="closefastfilter">
    <new_searchbar class="searchbar" :class="{flashtop:flashtop}" :placeholder="placeholder"
                   :searchinput="search_input" @transfersearchtext="getsearchinput"
                   @transfertsearchs2="getsearchinput" @transfersearchlike="searchLike"></new_searchbar>
    <!--搜索联想词-->
    <inputsearchlist v-if="search_like" :searchlist="searchlist" @transferlinklike="getsearchinput"></inputsearchlist>
    <!--热词和历史搜索-->
    <div class="hot_history" v-if="search_start">
      <menu_item :item_name="item_name" :item_link="item_command"></menu_item>
      <history_hot_list v-if="historyList.length" :hhlist_name="historyName" :clear="historyClear"
                        :item_list="historyList" @transferclear="clear2"
                        @transfertsearchs="getsearchinput"></history_hot_list>
      <history_hot_list :hhlist_name="hotName" :clear="hotClear" :item_list="hotList"
                        @transfertsearchs="getsearchinput"></history_hot_list>
    </div>
    <!--筛选和搜索结果-->
    <div v-if="search_result">
      <new_kind_sort :urldata="data" :bodytouch="bodytouch" :flashtop="flashtop" :ismobile="isMobile"></new_kind_sort>
    </div>
  </div>
  <!--非移动端-->
  <div v-else @click="closefastfilter">
    <new_searchbar class="searchbar" :class="{flashtop:flashtop}" :placeholder="placeholder"
                   :searchinput="search_input" @transfersearchtext="getsearchinput"
                   @transfertsearchs2="getsearchinput" @transfersearchlike="searchLike"></new_searchbar>
    <!--搜索联想词-->
    <inputsearchlist v-if="search_like" :searchlist="searchlist" @transferlinklike="getsearchinput"></inputsearchlist>
    <!--热词和历史搜索-->
    <div class="hot_history" v-if="search_start">
      <menu_item :item_name="item_name" :item_link="item_command"></menu_item>
      <history_hot_list v-if="historyList.length" :hhlist_name="historyName" :clear="historyClear"
                        :item_list="historyList" @transferclear="clear2"
                        @transfertsearchs="getsearchinput"></history_hot_list>
      <history_hot_list :hhlist_name="hotName" :clear="hotClear" :item_list="hotList"
                        @transfertsearchs="getsearchinput"></history_hot_list>
    </div>
    <!--筛选和搜索结果-->
    <div v-if="search_result">
      <new_kind_sort :urldata="data" :bodytouch="bodytouch" :flashtop="flashtop" :ismobile="isMobile"></new_kind_sort>
    </div>
  </div>
</template>
<script>
  var new_search_bar = require("../module/new_search_bar.vue");
  var menu_item = require("../module/menu_items.vue");
  var history_hot_list = require("../module/history_hot_list.vue");
  var new_kind_sort = require("../module/new_kind_sort.vue");
  var inputsearchlist = require("../module/input_search_list.vue");
  import layout from "./layout/api.es6";
  export default{
    data: function () {
      return {
        historyName: "历史搜索",
        historyClear: true,
        hotClear: false,
        historyList: [],
        hotName: "热门搜索",
        hotList: [],
        searchData: {}, //搜索条件数据
        item_name: '',
        item_command: '',
        placeholder: '请输入商品名称',
        userId: window.userId,
        search_result: false, //是否是搜索结果页
        search_start: false, //是否是搜索初始也
        c_bind: null,
        search_input: '',
        filterlistdata: {},
        data: {},
        bodytouch: 0,
        flashtop: false,
        isMobile:Units.isAndroid() || Units.isMobileIOS() || Units.isApp() || Units.isWechat(),
        search_like:false,
        searchlist: [],
      }
    },
    components: {
      new_searchbar: new_search_bar,
      menu_item: menu_item,
      history_hot_list: history_hot_list,
      new_kind_sort: new_kind_sort,
      inputsearchlist:inputsearchlist
    },
    created:function () {
      var scope = this;
      scope.init();
    },
    mounted: function () {

    },
    methods: {
      //判断URL是否有搜索条件，如果有直接返回搜索结果页，没有则展示热词和历史搜索
      init: function () {
        var scope = this;
        var keywords = window.Units.getQuery('q');
        if (keywords) {
          scope.search_input = keywords;
          scope.search_result = true;
        } else {
          setTimeout(function () {
            scope.localStorage2();
            scope.gethotword();
            scope.search_start = true;
          }, 0);
        }
        // 滚动到顶部
        if ($("body.scroll_flag").length) {
            var tops = 0,
              sign = 85;
          $(window).on("scroll", function () {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > 85) {
              scope.flashtop = true;
              tops = scrollTop;
            } else {
              scope.flashtop = false;
            }

            if ( scrollTop > 85) {
              scope.flashtop = true;
              tops = scrollTop;
            }
            if ( scrollTop < 85) {
              scope.flashtop = false;
            }
            if ( scrollTop > sign) {
              sign = scrollTop;//更新scrollTop
              if(scrollTop > 85){
                scope.flashtop = true;
                tops = scrollTop;
              }
            }
            if ( scrollTop< sign) {
              sign = scrollTop//更新scrollTop
              if(scrollTop > 85){
                scope.flashtop = false;
              }
            }
          });
        }
      },
      //历史搜索记录
      addWord2List: function (v) {
        var index = -1;
        var scope = this;
        for (var i = 0; i < scope.historyList.length; i++) {
          if (scope.historyList[i] == v) {
            index = i;
          }
        }
        if (index > -1) {
          scope.historyList.splice(index, 1);
        }
        scope.historyList.unshift(v);
        scope.historyList = scope.historyList.splice(0, 15);
        localStorage.setItem("usersearchList" + scope.userId, scope.historyList.join(","));
      },
      //搜索的时候 添加历史记录
      getsearchinput: function (msg) {
        var scope = this;
        var v = msg;
        if (v.match(/^[ ]+$/)) {
          var allspace = true;
        } else {
          var allspace = false;
        }
        scope.search_like = false;
        document.documentElement.style.height = "";
        if (allspace) {
          bravetime.info("请输入搜索内容");
          scope.search_input = '';
          return false;
        } else if (v == "" && v.length == 0 && scope.placeholder != "请输入商品名称") {
          v = $.trim(scope.placeholder);
          scope.placeholder = "请输入商品名称";
        } else if (v == "" && v.length == 0 && scope.placeholder == "请输入商品名称") {
          bravetime.info("请输入搜索内容");
          scope.search_input = '';
          return false;
        }
        scope.addWord2List(v);
        scope.search_input = v;
        var str = location.href.split('?')[0] + '?q=' + v;
        Vue.set(scope.searchData, "keywords", v);
        if (window.Units.getQuery('c_bind')) {
          var c_bind = window.Units.getQuery('c_bind');
          str = location.href.split('?')[0] + '?q=' + encodeURIComponent(v) + '&c_bind=' + encodeURIComponent(c_bind);
          Vue.set(scope.searchData, "c_bind", c_bind);
        }
        //传递数据
        scope.data = Object.assign({}, scope.searchData);
        history.replaceState("", "", str);
        scope.search_result = true;
        scope.search_start = false;
        //传递数据
      },
      //获取热词
      gethotword: function () {
        var scope = this;
        $.ajax({
          url: window.getHotwordsUrl,
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
          }
        });
      },
      //清除历史记录
      clear2: function () {
        localStorage.setItem("usersearchList" + this.userId, '');
        this.historyList = '';
      },
      //输入框输入时查询联想词
      searchLike:function (msg) {
        var scope = this;
        var text = msg;
        if (text == "") {
          scope.search_like = false;
          document.documentElement.style.height = "";
          return false;
        }
        var data = {
          q: text,
          logRefererPage: "index",
          logRefererLocation: "search"
        };
        $.ajax({
          url: window.likeUrl,
          data: data,
          dataType: "json",
          success: function (result) {
            if (!result.code) {
              if (result.data.length) {
                scope.search_like = true;
                document.documentElement.style.height = "100%";
                scope.searchlist = result.data;
              }
            } else {
              bravetime.info(result.msg);
            }
          }
        })
      },
      //取出 存储的历史记录
      localStorage2: function () {
        var scope = this;
        // 看看location里面有没有搜索记录
        var usersearchList = localStorage.getItem("usersearchList" + scope.userId);
        if (usersearchList && usersearchList.length) {
          scope.historyList = usersearchList.split(",");
        }
      },
      closefastfilter: function () {
        this.bodytouch++;
      }
    }
  }
</script>
<style scoped>
  .searchbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
    max-width: 640px;
    -webkit-transition: 0.5s ease 0s;
    -moz-transition: 0.5s ease 0s;
    -ms-transition: 0.5s ease 0s;
    -o-transition: 0.5s ease 0s;
    transition: 0.5s ease 0s;
    transform: translateY(0px);
  }

  .searchbar.flashtop {
    transform: translateY(-85px);
  }

  .hot_history {
    margin-top: 44px;
  }
</style>
<style>
  .in_app .searchbar {
    display: none;
  }
  body {
    position: relative;
    min-width: 320px;
    margin: 0 auto;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  #container{
    height: 100%;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    position: relative;
    overflow: hidden;
  }
  #container > div{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
