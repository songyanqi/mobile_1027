import * as tt_com_0 from './tt_com_0.vue';
import layout from "../layout.es6";
import category from "../../../src/component/com-maybeyoulike.vue";

import WebStorageCache from 'web-storage-cache';

let socialCache = new WebStorageCache({storage: 'sessionStorage'});
export default {
  data() {
    return {
      loading: false,
      no_more: false,
      ajaxing: true,
      errors: false,
      beforeFirstLoading: false,
      list: [],
      apiURL: "/api/mg/sale/index/getPageSecond",
      sData: {},
      z_index: 0,
      v_index: {},
      begin_time: 0,
      end_time: 0,
      menuId: this.getQuery('menuId') || 8
    }
  },
  props: ['menuids'],
  watch: {
    menuids: function () {
      let scope = this;
      scope.menuId = this.menuids;
      scope.beforeinit();
      scope.inits();
    }
  },
  created: function () {
    var scope = this;
    scope.inits();
  },
  computed: {
    styleObject: function () {
      var scope = this;
      return layout.styleObject(scope.menuId);
    }
  },
  created: function () {
    var scope = this;
    scope.beforeinit();
    /*先看看内存里有没有，有的话直接渲染*/
    scope.inits();
  },
  mounted: function () {

  },
  components: {
    tt_com_0: tt_com_0,
    category: category,
  },
  methods: {
    beforeinit: function () {
      var scope = this;
      scope.list = [];
      if (scope.menuId && scope.menuId != 8) {
        scope.no_more = false;
        scope.apiURL = "/api/mg/sale/channel/getGuessBody";
        scope.sData = {
          "menuId": scope.menuId,
          "pageIndex": 1
        }
      } else {
        scope.apiURL = "/api/mg/sale/index/getPageSecond";
        scope.sData = {}
      }
    },
    inits: function () {
      var scope = this;
      if (socialCache.get('likeList' + scope.menuId || 0) && window.tj_path == 'index') {
        scope.list = JSON.parse(socialCache.get('likeList' + scope.menuId)).data.feedList[0].body.dataList;
        scope.beforeFirstLoading = false;
        /*如果是首页没有更多是 true 如果不是首页 需要知道猜你喜欢是否加载完毕*/
        if (scope.menuId && scope.menuId != 8) {
          //存储的页码
          scope.sData.pageIndex = sessionStorage.getItem('pageIndex' + scope.menuId);
          /*是否已经是最后一页*/
          if (sessionStorage.getItem('lastPage' + scope.menuId) == 1) {
            scope.no_more = true;
          } else {
            scope.no_more = false;
          }
        } else {
          scope.no_more = true;
        }
        scope.errors = false
      }
      scope.wscroll();
    },
    imgObject: function (imgSrc) {
      return {
        src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
        error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
        loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
      }
    },
    clickAnalysis: function (item) {
      layout.clickAnalysis(item, this, 'body');
    },
    wscroll: function () {
      var scope = this;
      scope.begin_time = 0;
      scope.end_time = 0;
      $(window).off('scroll');
      $(window).scroll(function () {//滚动条滚动事件
        if (window.disabledGoodsLoading) {
          return false;
        }
        var offset = window.pageYOffset;
        var offsetTop = document.body.scrollHeight;
        /*统计部分 猜你喜欢页面停留时长*/
        let recommendBox = document.getElementById("comon");
        if (recommendBox) {
          let offtop = recommendBox.offsetTop - document.documentElement.scrollTop;
          if (offtop < 50) {
            if (!scope.begin_time) {
              scope.begin_time = (new Date()).valueOf();
            }
          }
          if (offtop > 50) {
            if (scope.begin_time) {
              if (!scope.end_time) {
                scope.end_time = (new Date()).valueOf();
                var laytime = scope.end_time - scope.begin_time;
                if (laytime < 500) {
                  scope.begin_time = 0;
                  scope.end_time = 0;
                  return false;
                }
                let tiData = {
                  "production": 22,
                  "period": laytime,
                  "page": 1,
                  "menu_id": scope.sData.menuId || scope.menuId
                };
                layout.statistics(tiData, function () {
                });
                scope.begin_time = 0;
                scope.end_time = 0;
              }
            }
          }
        }
        if (offsetTop - offset - window.screen.availHeight < 100) {
          scope.getData();
        }
      });
    },
    getData: function () {
      var scope = this;
      if (!scope.no_more) {
        if (scope.ajaxing) {
          scope.beforeFirstLoading = true;
          scope.ajaxing = false;
          $.ajax({
            type: "POST",
            url: scope.apiURL,
            data: layout.strSign("like", scope.sData),
            dataType: 'json',
            success: function (data) {
              if (data.data) {
                /*如果不是首页*/
                if (scope.menuId && scope.menuId != 8) {
                  /*如果有数据*/
                  if (data.data.feedList[0].body.dataList.length) {
                    scope.list = scope.list.concat(data.data.feedList[0].body.dataList);
                    data.data.feedList[0].body.dataList = scope.list;
                    /*不确定新添加进来的数据是否联动了*/
                    socialCache.set('likeList' + scope.menuId, JSON.stringify(data), {exp: 60});
                    /*页码加1*/
                    scope.sData.pageIndex++;
                    sessionStorage.setItem('pageIndex' + scope.menuId, scope.sData.pageIndex);
                    /*如果是最后一页*/
                    if (data.data.feedList[0].body.lastPage == 1) {
                      scope.no_more = true;
                      /*存储最后一页*/
                      sessionStorage.setItem('lastPage' + scope.menuId, 1);
                    } else {
                      scope.no_more = false;
                      sessionStorage.setItem('lastPage' + scope.menuId, 0);
                    }
                  }
                  /*如果没有数据*/
                  else {
                    scope.no_more = true;
                    sessionStorage.setItem('lastPage' + scope.menuId, 1);
                  }
                  scope.beforeFirstLoading = false;
                }
                /*如果是首页*/
                else {
                  localStorage.setItem('likeList' + scope.menuId, JSON.stringify(data));
                  socialCache.set('likeList' + scope.menuId, JSON.stringify(data), {exp: 60});
                  scope.list = data.data.feedList[0].body.dataList;
                  scope.no_more = true;
                  scope.beforeFirstLoading = false;
                }
              } else {
                scope.list = JSON.parse(socialCache.get('likeList' + scope.menuId)).data.feedList[0].body.dataList;
                scope.beforeFirstLoading = false;
                if (!scope.menuId) {
                  scope.no_more = true
                } else {
                  scope.no_more = false
                }
              }
              scope.ajaxing = true;
              scope.errors = false
            },
            error: function (e) {
              scope.errors = true;
              scope.ajaxing = false;
              scope.beforeFirstLoading = false;
              setTimeout(function () {
                scope.ajaxing = true;
              }, 1000)
            }
          })
        }
      }
    },
    periodtj: function () {
      var scope = this;
      if (scope.begin_time) {
        if (!scope.end_time) {
          scope.end_time = (new Date()).valueOf();
          var laytime = scope.end_time - scope.begin_time;
          if (laytime < 500) {
            scope.begin_time = 0;
            scope.end_time = 0;
            return false;
          }
          let tiData = {
            "production": 22,
            "period": laytime,
            "page": 1,
            "menu_id": scope.sData.menuId || scope.menuId
          };
          layout.statistics(tiData, function () {
          });
          scope.begin_time = 0;
          scope.end_time = 0;
        }
      }
    },
    getQuery: function (name) {
      var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.match(reg)
      if (r != null) return decodeURIComponent(r[2]);
      return null
    }
  }
}
