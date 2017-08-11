<style>
   html{
      background: white;
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
      margin-top:25px;
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
      margin-bottom: 6px;
      line-height: 20px;
    }
    .dvk4_detail_content_name{
      color: #999999;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      line-height:18px;
    }
    .dvk4_detail_content_time{
      font-size: 12px;
      color: #999999;
      margin-top: 2px;
    }
    .dvk4_detail_content_times{
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      height: 100%;
      line-height: 14px;
      color:#999999;
      margin-left: 0.1rem;

    }
    .dvk4_detail_content_line{
      width: 1px;
      height: 12px;
      float:left;
      background: #E1E1E1;
      margin-left:0.1rem;
    }
    .dvk_container .dvk4_detail:nth-child(1){
      margin-top: 20px;
    }
    .dvk4_detail_content_popular{
      float: left;
      height: 100%;
      line-height: 14px;
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
</style>
<template>
    <!--src="http://pic.davdian.com/free/2016/12/22/346_346_95d772212ba7dc702aaeabf7d32138cd.png"-->

    <div class="good_list_con">
        <div class="good_list_2_row">

          <div id="#topHeight"></div>

          <div class="dvk_container">
            <div class="dvk4_detail" v-for="item in list">
              <a :href="item.command.content">
                <div class='dvk4_detail_content'>
                  <div class='dvk4_detail_content_img'>
                    <img class="newImage" v-lazy="imgObject(item.imageUrl)"/>
                  </div>
                  <div class='dvk4_detail_content_text'>
                    <div class='dvk4_detail_content_title' v-text='item.title'></div>
                    <div class='dvk4_detail_content_name' v-text='item.teacher'></div>
                    <div class='dvk4_detail_content_time'>
                      <span class='dvk4_detail_content_popular'><span v-text='item.pv'></span>人气</span>
                      <span class='dvk4_detail_content_line'></span>
                      <span class='dvk4_detail_content_times'>
                         <span v-if='livenow(item)' class="circle"></span>
                         <span v-if='livetext(item)'>{{ livetext(item) }}</span>
                         <span v-if='!livetext(item)' v-text='startTimestamp(item.startTime)'></span>
                    </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        el:'main',
        props: {
            list:[],
            height: {
                type: Number,
                default: 258
            },
            topHeights:null,
        },
        data() {
            return {
                lastScrollTop: null,
                distance: 44,
                lineTopHeight: 0,
                lineBottomHeight: 0,
                canLoadmore: true,
                previewList: [],
                displayCount: 0,
                styleHeight:192,
                relive:false,
            }
        },
        //数据初始化 dom没有加载之前
        created:function () {
            this.styleHeight = (document.body.offsetWidth - 30)/2;
            this.lineTopHeight = this.topHeights;
            //初始化顶部div的高度和显示的数据
            //this.change();
        },
        //dom加载之后 获取关于节点的数据
        mounted:function () {
            console.log(676);
            //添加滚动事件监听 重新计算顶部div的高度和显示的数据
            //this.scroll();
        },
        methods:{

            imgObject:function (imgSrc) {
                return{
                    src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                    error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                    loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
                }
            },


            /**
             *
             * 判断是否显示正在直播的圆圈
             */
            livenow:function (item) {
              var timestamp = Date.parse(new Date());

              if(item.startTime*1000 < timestamp && item.endTime == 0){
                return true;
              }
            },
          startTimestamp:function (time) {
            return time.substring(0,16);
          },
          livetext:function (item) {
            var startTimestamp = item.startTime*1000;
            var endTimestamp = item.endTime*1000;
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
          }
            /**
             *
             * 滚动事件 重新计算顶部div的高度 和显示的数据
             */
//            scroll:function () {
//                var scope = this;
//                $(window).scroll(function () {
//
//                    this._rowsInWindow = Math.ceil(window.screen.height / scope.height),//一个屏幕中能放下几行item
//                    this._above = this._rowsInWindow * 2,//上面保留的个数
//                    this._below = this._rowsInWindow,//下面预留的个数
//                    this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
//
//                    let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
//
//                    if (scope.lastScrollTop === null || Math.abs(_scrollTop - scope.lastScrollTop) > scope._max) {//滚动的距离大于保留的item的高度
//                        scope.lastScrollTop = _scrollTop;//等于上次滚动条的高度
//                    } else {
//                        return;
//                    }
//                    let _from = parseInt(_scrollTop / scope.height) - this._above;
//                    if (_from < 0) {
//                        _from = 0;
//                    }
//                    let to = (_from + this._above + this._below + this._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
//                    let from = _from * 2;
//                    if (to > scope.list.length) {
//                        to = scope.list.length;
//                    }
//                    scope.previewList = [];
//                    for (; from < to; from++) {
//                        scope.previewList.push(scope.list[from])
//                    }
//                    scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
//                    scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
//                })
//            },
            /**
             *
             * 初始化数据时 计算顶部div的高度 和显示的数据
             */
//            change:function () {
//                var scope = this;
//                this._rowsInWindow = Math.ceil(window.screen.height / this.height),//一个屏幕中能放下几行item
//                        this._above = this._rowsInWindow * 2,//上面保留的个数
//                        this._below = this._rowsInWindow,//下面预留的个数
//                        this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
//                let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
//                let _from = parseInt(this.lineTopHeight / this.height) - this._above;
//                if (_from < 0) {
//                    _from = 0;
//                }
//                let to = (_from + scope._above + scope._below + scope._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
//                let from = _from * 2;
//                if (to > scope.list.length) {
//                    to = scope.list.length;
//                }
//                this.previewList = [];
//                for (; from < to; from++) {
//                    this.previewList.push(this.list[from])
//                }
////                scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
//                scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
//            },

        },

        computed:{
            styleObject:function () {
                return {
                    height:  (this.styleHeight/1.44) + 'px'
                }
            },
            widthObject:function () {
                return {
                    width:  this.styleHeight + 'px'
                }
            },
            spanWidth:function () {
                return {
                    width:  (this.styleHeight-70) + 'px'
                }
            }
        },
        watch: {
            /**
             *
             * 当整体数据变化时重新计算顶部div的高度和显示的数据
             */
//            list: function () {
//                var scope = this;
//
//                this._rowsInWindow = Math.ceil(window.screen.height / this.height),//一个屏幕中能放下几行item
//                        this._above = this._rowsInWindow * 2,//上面保留的个数
//                        this._below = this._rowsInWindow,//下面预留的个数
//                        this._max = this._rowsInWindow * scope.height;//当前屏幕内item的高度
//                let _scrollTop = $(document).scrollTop();//当前滚动条距离顶部的高度
//                let _from = parseInt(_scrollTop / this.height) - this._above;
//                if (_from < 0) {
//                    _from = 0;
//                }
//                let to = (_from + scope._above + scope._below + scope._rowsInWindow) * 2;//初始化的高度 两行的时候的个数
//                let from = _from * 2;
//                if (to > scope.list.length) {
//                    to = scope.list.length;
//                }
//                this.previewList = [];
//                for (; from < to; from++) {
//                    this.previewList.push(this.list[from])
//                }
//                scope.lineTopHeight = _from * scope.height ;//顶部的填充div的高度
//                scope.lineBottomHeight = (scope.list.length - to) * scope.height/2 ;//底部的填充div的高度
//                setTimeout(function () {
//                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 0});
//                },0)
//            },
//            previewList:function () {
//                setTimeout(function () {
//                    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 500, failure_limit: 0});
//                },0)
//            }
        }
    }
</script>
