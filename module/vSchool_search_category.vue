<template>
  <div class="vschool_searchlist">
    <a v-for="(item, index) in list" :class="{classroom:(item.courseType == 2 || item.courseType == 3)}" :href="item.command.content">
      <div>
        <div class="vschool_listImg" :style="'background-image: url('+item.courseCover+')'">
          <span v-show="item.coursePrice != ''" v-if="item.courseType == 1">￥{{item.coursePrice}}</span>
        </div>
        <div class="vschool_listText">
          <div :class="{vschool_headertitle:item.courseType == 2}">{{item.courseTitle}}</div>
          <div>{{item.teacherName}}</div>
          <div>
            <span class="text_l">{{item.startTime*1000 | timemmss}}</span>
            <span class="text_r">{{item.readTimes}}</span>
          </div>
        </div>
      </div>
    </a>
    <div v-show = "loading" class="no_more">
      课程加载中 <img src="//pic.davdian.com/free/loading_03252.svg">
    </div>
    <div v-show="no_more" class="no_more">
      没有更多课程了
    </div>
  </div>
</template>
<script>
  //过滤器
  Vue.filter('timemmss', function(value) {
    var newDate = new Date(value);
    Date.prototype.format = function(format) {
      var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1
            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    };
    return newDate.format("yyyy-MM-dd hh:mm")
  });
  export default{
    data:function(){
      return{
      }
    },
    props:["list","loading","no_more"],
    created:function () {
    },
    methods:{

    }
  }
</script>
<style scoped>
  .vschool_searchlist{
    width: 100%;
    min-height: 10px;
  }
  .vschool_searchlist > a{
    display: block;
    height: 1.08rem;
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 1px;
    overflow: hidden;
  }
  .vschool_searchlist > a > div{
    width: 3.55rem;
    height: .88rem;
    margin: .1rem;
  }
  .vschool_listImg{
    float: left;
    height: 100%;
    width: 1.27rem;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .vschool_listImg span{
    display: inline-block;
    background-color: #FF4A7D;
    color: #FFF;
    font-size: .11rem;
    border-radius: 3px;
    height: .18rem;
    padding: 0 2px;
    text-align: center;
    line-height: .18rem;
    margin: .05rem;
  }
  .vschool_listText{
    width: 2.18rem;
    height: 100%;
    margin-left: .1rem;
    float: left;
    position: relative;
  }
  .classroom .vschool_listImg{
    width: .88rem;
  }
  .classroom .vschool_listText{
    width: 2.57rem;
  }
  .classroom .vschool_listText .vschool_headertitle{
    background-image: url(//pic.davdian.com/free/video_camera.png);
    background-repeat: no-repeat;
    text-indent: .18rem;
    background-size: .14rem .08rem;
    background-position: 0 .06rem;
  }
  .vschool_listText > div:nth-of-type(1){
    height: .4rem;
    overflow: hidden;
    line-height: 1.5;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: .14rem;
    color: #333;
  }
  .vschool_listText > div:nth-of-type(1) img{
    width: .14rem;
    height: .08rem;
  }
  .vschool_listText > div:nth-of-type(2){
    color: #999999;
    font-size: .12rem;
  }
  .vschool_listText > div:nth-of-type(3){
    position: absolute;
    bottom: 0;
    color: #999999;
    font-size: .12rem;
    width: 100%;
  }
  .vschool_listText > div:nth-of-type(3) > span{
    display: inline-block;
    width: 50%;
    float: left;
  }
</style>
