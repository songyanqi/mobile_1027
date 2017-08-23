// 基础模块
import common from '../../src/common/js/common.js';

import '../common/common.vue'
import indexHead from './index_header.vue'
import maybeYouLike from '../maybeYouLike.vue'
import bd_goods_1 from '../index/feed/bd_goods_1.vue'
import indexFeed from './index_feed.vue'
import indexFoot from '../../src/component/com-footer.vue'
import layout from "./layout.es6"
import {savebackData, getbackData} from "../../utils/utils.es6"
import NProgress from 'nprogress'
import share from '../../src/common/js/module/share.js'

export default{
  data(){
    return {
      dataUrl: '../data/index/index.json',
      contentData: {feedList: []},
      initCategory: 0,
      headData: {
        top: 1,
        head: {},
        tag: {},
        cart: 0
      },
      menuList: [],
      menuMore: {},
      footData: {
        active: 0
      },
      top: 10,
      headerFlag: true,
      directFlag: 'down',
      advert: {},
      advertFlag: [false, false, false],
      signData: {},
      loadFlag: false,
      unLoadFlag: false,
      state: 0,
      app: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
      initcate: window.menuId,
      queryPathType: window.queryPathType,
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      iftips: false,
      timeOutEvent: '',
      rewardData: {},
      getRewardtips: false,
      usersta: '',
      backTop: 0,
      menudata:{},
      page_index:0,
      menuId:8,
      likeNum:0
    }
  },
  computed: {
    feedData(){
      return this.contentData.feedList
    },
    isWechart: function () {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted: function () {
    // this.sessionHistory();
    var that = this;
    this.$nextTick(function () {
      getbackData(that, 'backTop');
      if (!getbackData(that, 'backTop')) {
        that.initHistory();
        that.initDate();
      }
      $(window).scroll(function () {
        that.backTop = window.scrollY;
        savebackData(that);

      })
      window.appData.isAudioAbsorb = 1
      setTimeout(function(){
        window.bravetime.initHead()
      },500)
    })
  },
  methods: {
    /**
     * 初始化，调用后开始获取数据
     *
     *
     */
    // sessionHistory(){
    //     if (window.Units.isMobileIOS() || window.Units.isAndroid()){
    //         if (sessionStorage.getItem('history') && JSON.parse(sessionStorage.getItem('history')).length >1){
    //             if (JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length-1].path != JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length-2].path){
    //                 window.location.reload()
    //             }
    //         }
    //     }
    // },
    sessionHistory(){
      if (window.Units.isMobileIOS() || window.Units.isAndroid()) {
        if (sessionStorage.getItem('history') && JSON.parse(sessionStorage.getItem('history')).length > 1) {
          if (JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length - 1].path != JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length - 2].path) {
            // window.location.reload()
            if (layout.sStorageGet('v_index', 'category'))
              this.initCategory = layout.sStorageGet('v_index', 'category')
          }
        }
      }
    },
    initHistory(){
      if (layout.sStorageGet('v_index', 'category') && (layout.sStorageGet('v_index', 'index') || layout.sStorageGet('v_index', 'index') == 0)) {
        if (layout.sStorageGet('v_index', 'index') == 0) {
          var str = "index_first"
        } else {
          var str = "first_" + layout.sStorageGet('v_index', 'category')
        }
        if (layout.sStorageGet(str, 'data')) {
          this.contentData = layout.sStorageGet(str, 'data')
          this.initcate = layout.sStorageGet('v_index', 'category')
          this.initCategory = layout.sStorageGet('v_index', 'index')
          if(+this.initCategory){
            this.channel(this.initcate)
          }else{
            this.getPageFirst();
          }
          
        } else {
          this.init()
        }
      } else {
        this.init()
      }
    },
    init(){
      let that = this
      let start = null
      if (localStorage.getItem('feedList') && JSON.parse(localStorage.getItem('feedList')) && JSON.parse(localStorage.getItem('feedList')).data && this.queryPathType) {
        this.contentData = JSON.parse(localStorage.getItem('feedList')).data
      } else {
        sessionStorage.removeItem('dataVersion')
      }
      this.app = this.isApp()
      var date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
      if (layout.sStorageGet('v_index', 'category')) {
        this.initcate = layout.sStorageGet('v_index', 'category')
      }
      if (this.queryPathType) {
        var strUrl = '/api/mg/sale/index/getPageFirst'
        var strData = layout.strSign('feed')
        var strStroageName = 'index_first'
      } else {
        var strUrl = '/api/mg/sale/channel/getPageFirst'
        var strData = layout.strSign('channelPageFirst', {menuId: this.initcate})
        var strStroageName = 'first_' + this.initcate
      }
      $.ajax({
        type: "POST",
        url: strUrl,
        // url: '../data/index_data.json',
        data: strData,
        dataType: 'json',
        success: function (data) {
          layout.dataVersion('feed', data);
          if (data.code == 0) {
            that.state = data.visitor_status;
            //todo feed数据流控制
            if (data.data) {
              //new
              let objData = {
                top: window.scrollY,
                data: data.data
              }
              layout.sStorageSet(strStroageName, objData);

              localStorage.setItem('feedList', JSON.stringify(data));
              let feedIndex = 3;
              for (let i = 0; i < data.data.feedList.length; i++) {
                if (data.data.feedList[i].body && data.data.feedList[i].body.tplId && (data.data.feedList[i].body.tplId == 'bd_slide_0')) {
                  feedIndex = i + 1
                }
              }
              setTimeout(function () {
                $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 10});
              }, 0)
              if (new Date().getTime() - new Date(2016, 11, 28).getTime() > 0 && new Date().getTime() - new Date(2017, 0, 1).getTime() < 0) {
                data.data.feedList.splice(feedIndex, 0, that.fireWordData())
              }
              that.contentData = data.data
            } else {
              let data = JSON.parse(localStorage.getItem('feedList')).data
              let feedIndex = 3
              for (let i = 0; i < data.feedList.length; i++) {
                if (data.feedList[i].body && data.feedList[i].body.tplId && (data.feedList[i].body.tplId == 'bd_slide_0')) {
                  feedIndex = i + 1
                }
              }
              if (new Date().getTime() - new Date(2016, 11, 28).getTime() > 0 && new Date().getTime() - new Date(2017, 0, 1).getTime() < 0) {
                data.feedList.splice(feedIndex, 0, that.fireWordData())
              }
              that.contentData = data
            }
            if (typeof that.advert == 'function') {
              that.advert()
            }
          } else {
            that.unLoadFlag = true
          }
          that.cart();
        },
        error: function (e) {
          that.unLoadFlag = true
          console.log("Oops, error", e)
        }
      })
    },
    advert: function () {
      if (!this.queryPathType) {
        return
      }
      var that = this
      if (new Date().getTime() - localStorage.getItem('advertTime') >= 3600000) {
        $.ajax({
          type: "POST",
          url: layout.config.advert,
          data: layout.strSign('advert'),
          dataType: 'json',
          success: function (data) {
            if (data.data_version == JSON.parse(sessionStorage.getItem('dataVersion'))['advert'] ? JSON.parse(sessionStorage.getItem('dataVersion'))['advert'] : 0) {
              that.advert = (localStorage.getItem('advertList') && JSON.parse(localStorage.getItem('advertList')) && JSON.parse(localStorage.getItem('advertList')).data) ? JSON.parse(localStorage.getItem('advertList')).data : {}
            } else {
              localStorage.removeItem('advertList')
            }
            layout.dataVersion('advert', data)
            if (data.data) {
              localStorage.setItem('advertList', JSON.stringify(data))
              that.advert = data.data
            }
            if (that.advert.layer) {
              if (!that.advert.topBar) {
                localStorage.setItem('advertTime', new Date().getTime())
              }
              if (!localStorage.getItem('layerId')) {
                that.advertFlag = [false, true, false]
              } else {
                if (localStorage.getItem('layerId') && JSON.parse(localStorage.getItem('layerId')) && JSON.parse(localStorage.getItem('layerId'))[that.date] && JSON.parse(localStorage.getItem('layerId'))[that.date].indexOf(that.advert.layer.id) == -1) {
                  that.advertFlag = [false, true, false]
                } else {
                  if (localStorage.getItem('layer') !== that.date) {
                    that.advertFlag = [false, true, false]
                  } else {
                    if (localStorage.getItem('topBarId') && JSON.parse(localStorage.getItem('topBarId')) && JSON.parse(localStorage.getItem('topBarId'))[that.date] && JSON.parse(localStorage.getItem('topBarId'))[that.date].indexOf(that.advert.topBar.id) == -1) {
                      that.topBar()
                    } else {
                      if ((localStorage.getItem('topBar') !== that.date) && that.advert.topBar) {
                        that.topBar()
                      }
                    }
                  }
                }
              }
              //有广告就要掉广告接口但是签到不弹出
              if (that.isApp()) {
                that.sign()
              }
            } else {
              //当没有layer广告情况
              if (that.advert.topBar) {
                if (!localStorage.getItem('topBarId')) {
                  that.topBar()
                } else {
                  if (localStorage.getItem('topBarId') && JSON.parse(localStorage.getItem('topBarId')) && JSON.parse(localStorage.getItem('topBarId'))[that.date] && JSON.parse(localStorage.getItem('topBarId'))[that.date].indexOf(that.advert.topBar.id) == -1) {
                    // if (localStorage.getItem('topBarId').indexOf(that.advert.topBar.id) == -1){
                    if (that.isApp()) {
                      that.sign()
                    }
                  } else {
                    if (localStorage.getItem('topBar') !== that.date) {
                      if (that.isApp()) {
                        that.sign()
                      }
                    }
                  }
                }
                //有广告就要掉广告接口但是签到不弹出
                if (that.isApp()) {
                  that.sign()
                }
              } else {
                //没有广告，这里只有签到逻辑，签到弹出
                if (that.isApp()) {
                  that.sign(true)
                }
              }
            }
          },
          error: function (e) {
            console.log("Oops, error", e)
          }
        })
      } else {
        if (that.isApp()) {
          that.sign(true)
        }
      }
    },
    cart: function () {
      var that = this
      $.ajax({
        type: "POST",
        url: layout.config.cart,
        data: layout.strSign('cart'),
        dataType: 'json',
        success: function (data) {
          if (data.code == 0) {
            layout.dataVersion('cart', data)
            if (data.data) {
              localStorage.setItem('cartList', JSON.stringify(data))
              that.headData.cart = data.data.goodsNum
            } else {
              that.headData.cart = JSON.parse(localStorage.getItem('cartList')).data.goodsNum
            }
          }
        },
        error: function (e) {
          console.log("Oops, error", e)
        }
      })
    },
    getPageFirst: function () {
      var that = this
      $.ajax({
        type: "POST",
        url: '/api/mg/sale/index/getPageFirst',
        data: layout.strSign('indexPageFirst'),
        success: function (data) {
          if (!data.code) {
            that.contentData = data.data
            let objData = {
              top: 0,
              data: that.contentData
            }
            layout.sStorageSet('index_first', objData)
            window.scrollTo(0, 0)
          } else {
            alert('/api/mg/sale/index/getPageFirst为->', data.code)
          }
        },
        error: function (e) {
          console.log(e)
        }
      })
    },
    channel: function (category) {
      var that = this
      $.ajax({
        type: "POST",
        url: '/api/mg/sale/channel/getPageFirst',
        data: layout.strSign('channelPageFirst', {menuId: category}),
        success: function (data) {
          if (!data.code) {
            if (data.data.webUrl) {
              location.href = data.data.webUrl
            } else if (data.data.feedList) {
              setTimeout(function () {
                that.contentData = data.data
              }, 100)
              let objData = {
                top: 0,
                data: that.contentData
              }
              layout.sStorageSet('first_' + category, objData)
            } else {

            }
            window.scrollTo(0, 0)
          } else {
            alert('/api/mg/sale/channel/getPageFirst为->', data.code, "menId->", category)
          }
        },
        error: function (e) {
          console.log(e)
        }
      })
    },
    history: function () {
      if (JSON.parse(sessionStorage.getItem("history"))[JSON.parse(sessionStorage.getItem("history")).length - 2] && JSON.parse(sessionStorage.getItem("history"))[JSON.parse(sessionStorage.getItem("history")).length - 1].path == JSON.parse(sessionStorage.getItem("history"))[JSON.parse(sessionStorage.getItem("history")).length - 2].path) {
        if (layout.sStorageGet('v_index')) {
          this.initCategory = layout.sStorageGet('v_index', 'index')
          if (layout.sStorageGet('v_index', 'index') == 0) {
            this.getPageFirst()
          } else {
            this.channel(layout.sStorageGet('v_index', 'category'))
          }
        }
      }
    },
    changeCategory: function (category, index) {
      this.page_index = index;
      this.menuId = category;
      if (category == '-1') {
        window.location.href = this.menuList[this.menuList.length - 1].command.content
        return
      }
      var that = this
      if (this.initCategory == index) {
        return
      }
      var oldCategory = this.initCategory
      var oldcate = this.initcate
      this.initCategory = index
      this.initcate = category
      let oldObj = {
        category: layout.sStorageGet('v_index').category,
        index: layout.sStorageGet('v_index').index
      }
      let obj = {
        category: category,
        index: index
      }
      layout.sStorageSet('v_index', obj)
      if (oldCategory == 0) {
        layout.sStorageSet('index_first', {top: window.scrollY})
      } else {
        layout.sStorageSet('first_' + oldcate, {top: window.scrollY})
      }
      if (index == 0) {
        if (layout.sStorageGet('index_first') && layout.sStorageGet('index_first').data) {
          that.contentData = layout.sStorageGet('index_first').data
          setTimeout(function () {
            window.scrollTo(0, layout.sStorageGet('index_first', 'top'))
          }, 150)
        } else {
          var flag_name = 'flag_' + Date.now();
          console.log(flag_name)
          window[flag_name] = false;
          setTimeout(function () {
            if (!window[flag_name]) {
              NProgress.start();
            }
          }, 200);
          $.ajax({
            type: "POST",
            url: '/api/mg/sale/index/getPageFirst',
            data: layout.strSign('indexPageFirst'),
            success: function (data) {
              window[flag_name] = true;
              NProgress.done();
              if (!data.code) {
                that.contentData = data.data;
                let objData = {
                  top: 0,
                  data: that.contentData
                };
                layout.sStorageSet('index_first', objData);
                window.scrollTo(0, 0)
              } else {

              }
            },
            error: function (e) {
              window[flag_name] = true;
              NProgress.done();
              console.log(e)
            }
          })
        }
        return
      }

      var objApi = {
        menuId: category
      }
      if (layout.sStorageGet('first_' + category) && layout.sStorageGet('first_' + category).data) {
        that.contentData = layout.sStorageGet('first_' + category).data
        setTimeout(function () {
          window.scrollTo(0, layout.sStorageGet('first_' + category, 'top'))
        }, 150)
      } else {
        var flag_name = 'flag_' + Date.now();
        console.log(flag_name)
        window[flag_name] = false;
        setTimeout(function () {
          if (!window[flag_name]) {
            NProgress.start();
          }
        }, 200)
        $.ajax({
          type: "POST",
          url: '/api/mg/sale/channel/getPageFirst',
          data: layout.strSign('channelPageFirst', objApi),
          success: function (data) {
            window[flag_name] = true;
            NProgress.done();
            if (!data.code) {
              if (data.data.webUrl) {
                layout.sStorageSet('v_index', oldObj)
                if (layout.sStorageGet('v_index', 'category')) {
                  that.changeCategory(layout.sStorageGet('v_index', 'category'), layout.sStorageGet('v_index', 'index'))
                }
                location.href = data.data.webUrl
              } else if (data.data.feedList) {
                that.contentData = data.data
                let objData = {
                  top: 0,
                  data: that.contentData
                }
                layout.sStorageSet('first_' + category, objData)
              } else {

              }
              window.scrollTo(0, 0)
            } else {

            }
          },
          error: function (e) {
            window[flag_name] = true;
            NProgress.done();
            console.log(e)
          }
        })
      }
    },
    getDataForUse: function (index) {
      let that = this
      let category = null;
      if (that.menuList[index]) {
        category = that.menuList[index].id
      }
      if (!category) {
        return;
      }
      let objApi = {
        menuId: category
      }
      $.ajax({
        type: "POST",
        url: '/api/mg/sale/channel/getPageFirst',
        data: layout.strSign('channelPageFirst', objApi),
        success: function (data) {
          if (!data.code) {
            if (data.data.feedList) {
              // that.contentData = data.data
              let objData = {
                top: 0,
                data: data.data
              }
              layout.sStorageSet('first_' + category, objData)
            }
          }
          that.getDataForUse(index + 1)
        },
        error: function (e) {
          that.getDataForUse(index + 1)
          console.log(e)
        }
      })
    },
    initDate: function () {
      var that = this
      $.ajax({
        type: "POST",
        url: '/api/mg/sale/index/getSearch',
        // url: '../data/index_getsearch.json',
        data: layout.strSign('shopInfo'),
        success: function (data) {
          that.headData.head = data.data;
          that.usersta = data.visitor_status;
          window.visitor_status = data.visitor_status;
        },
        error: function (e) {
          console.log(e)
        }
      })
      $.ajax({
        type: "POST",
        url: '/api/mg/sale/index/getMenu',
        // url: '../data/index_getmenu.json',
        // data: layout.strSign('indexMenu'),
        data: layout.strSign('indexMenu', {js_wx_info: 1}),
        success: function (data) {
          // check强制跳转
          common.checkRedirect(data);

          that.menudata = data.data;
          console.log(that.menudata);
          that.getDataForUse(0);
          that.checkdownTip(data.visitor_status);
          // 设置分享信息
          share.setShareInfo(data.data.shareInfo, data);
        },
        error: function (e) {
          console.log(e)
        }
      });
    },
    loadBtn: function () {
      sessionStorage.removeItem('dataVersion')
      window.location = window.location.href
    },
    exit: function (event) {
      this.advertFlag = [false, false, false]
      localStorage.setItem('advertTime', new Date().getTime())
      localStorage.setItem('layer', this.date)
      var that = this
      if (event) {
        event.stopPropagation()
      }
      if (this.advert.topBar) {
        if (localStorage.getItem('topBarId')) {
          if (JSON.parse(localStorage.getItem('topBarId')) && JSON.parse(localStorage.getItem('topBarId'))[this.date] && JSON.parse(localStorage.getItem('topBarId'))[this.date].indexOf(this.advert.topBar.id) == -1) {
            this.topBar()
          } else {
            if ((localStorage.getItem('topBar') !== this.date) && this.advert.topBar) {
              this.topBar()
            }
          }
        } else {
          this.topBar()
        }
      }
      if (localStorage.getItem('layerId')) {
        let obj = JSON.parse(localStorage.getItem('layerId'))
        if (obj[that.date]) {
          obj[that.date].push(that.advert.layer.id)
        } else {
          obj[that.date] = [that.advert.layer.id]
        }
        localStorage.setItem('layerId', JSON.stringify(obj))
      } else {
        let obj = {}
        obj[that.date] = [that.advert.layer.id]
        localStorage.setItem('layerId', JSON.stringify(obj))
      }
    },
    topBar: function () {
      this.advertFlag = [false, false, false]
      var that = this
      if (this.advert.topBar && !this.isApp()) {
        let timer = setInterval(function () {
          that.advertFlag = [true, false, false]
          clearInterval(timer)
        }, 3000)
        let timer1 = setInterval(function () {
          clearInterval(timer1)
          that.advertFlag = [false, false, false]
          localStorage.setItem('advertTime', new Date().getTime())
          localStorage.setItem('topBar', that.date)

          if (localStorage.getItem('topBarId')) {
            let obj = JSON.parse(localStorage.getItem('topBarId'))
            if (obj[that.date]) {
              obj[that.date].push(that.advert.topBar.id)
            } else {
              obj[that.date] = [that.advert.topBar.id]
            }
            localStorage.setItem('topBarId', JSON.stringify(obj))
          } else {
            let obj = {}
            obj[that.date] = [that.advert.topBar.id]
            localStorage.setItem('topBarId', JSON.stringify(obj))
          }
        }, 6000)
      }
    },
    clickAdvert1: function () {
      this.advertFlag = [false, false, false]
      var that = this
      window.location = this.advert.topBar.command.content
      localStorage.setItem('topBar', this.date)

      if (localStorage.getItem('topBarId')) {
        let obj = JSON.parse(localStorage.getItem('topBarId'))
        if (obj[that.date]) {
          obj[that.date].push(that.advert.topBar.id)
        } else {
          obj[that.date] = [that.advert.topBar.id]
        }
        localStorage.setItem('topBarId', JSON.stringify(obj))
      } else {
        let obj = {}
        obj[that.date] = [that.advert.topBar.id]
        localStorage.setItem('topBarId', JSON.stringify(obj))
      }
    },
    clickAdvert2: function () {
      this.advertFlag = [false, false, false]
      var that = this
      window.location = this.advert.layer.command.content
      localStorage.setItem('layer', this.date)

      if (localStorage.getItem('layerId')) {
        let obj = JSON.parse(localStorage.getItem('layerId'))
        if (obj[that.date]) {
          obj[that.date].push(that.advert.layer.id)
        } else {
          obj[that.date] = [that.advert.layer.id]
        }
        localStorage.setItem('layerId', JSON.stringify(obj))
      } else {
        let obj = {}
        obj[that.date] = [that.advert.layer.id]
        localStorage.setItem('layerId', JSON.stringify(obj))
      }
    },
    isApp: function () {
      return !!navigator.userAgent.match(/davdian|bravetime|vyohui/)
    },
    sign: function (f) {
      var flag = f || false
      var that = this
      $.ajax({
        type: "POST",
        url: layout.config.sign,
        data: layout.strSign('sign'),
        dataType: 'json',
        success: function (data) {
          layout.dataVersion('cart', data)
          if (data.code == 0 && data.data) {
            that.signData = data.data
            if (that.signData.sign && that.signData.sign.msg) {
              that.signData.sign.msgArr = that.signData.sign.msg.split('<br/>')
            }
            if (flag && that.signData && that.isApp()) {
              that.advertFlag = [false, false, true]
              let timer = setInterval(function () {
                that.advertFlag = [false, false, false]
                clearInterval(timer)
              }, 3000)
            }
          }
        },
        error: function (e) {
          console.log("Oops, error", e)
        }
      })
    },
    fireWordData: function () {
      let obj = new Object()
      obj.body = new Object()
      obj.body.tplId = 'fire_work'
      return obj
    },
    checkdownTip: function (status) {
      var that = this;
      if (status == 3) {
        var host = window.location.host,
          domain0 = host.split(".")[0];
        var iftips = localStorage.getItem(domain0 + "IDS");
        /*是否提示过下载APP*/
        if (iftips) {
          if (!sessionStorage.getItem("getrewards")) {
            that.getRewardss();
          }
        } else {
          localStorage.setItem(domain0 + "IDS", true);
          that.iftips = true;
        }
      } else {
        // if (!sessionStorage.getItem("getrewards")) {
        //   that.getRewardss();
        // }
      }
    },
    closeTips: function () {
      var that = this;
      that.iftips = false;
      if (sessionStorage.getItem("getrewards")) {

      } else {
        that.getRewardss();
      }
    },
    tipstouchstart: function (e) {
      var that = this;
      that.timeOutEvent = setTimeout(function () {
        that.longPress();
      }, 500);
      e.preventDefault();
    },
    tipstouchmove: function () {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
    },
    tipstouchend: function () {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {

      }
      return false;
    },
    longPress: function () {
      this.timeOutEvent = 0;
      if (!this.isWechart) {
        bravetime.newAlert("去微信公众号中搜索“果敢时代大V店”完成操作~")
      }
    },
    close_rewardtip: function (e) {
      this.getRewardtips = false;
      e.preventDefault();
    },
    getRewardss: function () {
      var that = this;
      if (that.isApp()) {

      } else {
        //奖品
        $.ajax({
          type: "POST",
          url: '/api/mg/sale/index/getPrize',
          data: layout.strSign('indexPrice'),
          success: function (data) {
            if (data.code == 0) {
              if (data.data.status == 0) {
                that.getRewardtips = true;
                that.rewardData = data.data;
              }
            }
            sessionStorage.setItem("getrewards", true);
          },
          error: function (e) {
            console.log(e)
          }
        })
      }
    },
    events: function () {

    }
  },
  components: {
    indexHead: indexHead,
    indexFeed: indexFeed,
    indexFoot: indexFoot,
    maybeYouLike: maybeYouLike,
    bd_goods_1: bd_goods_1,
    NProgress: NProgress
  },
  created: function () {
    (function (doc, win) {
      var docEl = doc,
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
      docEl.documentElement.dataset.dpr = dpr;
      var recalc = function () {
        var width = docEl.body.clientWidth;
        if (width / dpr > 750) {
          width = 750 * dpr;
        }
        docEl.documentElement.dataset.width = width;
        docEl.documentElement.dataset.percent = 200 * (width / 750);
        docEl.documentElement.style.fontSize = 200 * (width / 750) + 'px';
        docEl.body.style.fontSize = '14px';
        var list = document.querySelectorAll("[base-on-rem]");
        for (var i = 0; i < list.length; i++) {
          list[i].removeAttribute('base-on-rem');
        }
        $(".need_js_height").css("height", Math.floor((width - 20) / 2 * 600 / 531) + "px");
        $(".need_js_height_seckill").css("height", Math.floor((width - 25) / 2 * 362 / 350) + "px");
      };
      recalc();
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
    })(document, window);

    if (!Units.isApp()) {
      $('body').addClass('scroll_flag self_shop');
      $('body').css("paddingBottom", "48px")
    } else {
      $('body').css("paddingBottom", "0px")
    }
  },
  watch: {
    menuId:function () {
      var scope = this;
      this.likeNum++;
    }
  }
}
