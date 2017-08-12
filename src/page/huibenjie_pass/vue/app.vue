<!--模板-->
<template>
  <div class="app">
    <!--头部标题-->
    <com-top-title title="绘本知识大比拼" home v-show="isShowTitleBar"></com-top-title>

    <!--容器-->
    <div class="page">
      <!--背景-->
      <div class="bg">
        <img :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/bg.jpg'" @load="bgPicOnLoad">
      </div>

      <!--内容-->
      <div class="content">
        <!--关卡-->
        <div class="pass" v-for="(pass, i) in passList"
             :class="['pass' + (i + 1), (pass.status == '1' || pass.status == '3' || pass.status == '5' ? 'over' : '')]"
             @click="passClick(i + 1, pass.status)">
          <div class="circle">
            <div class="point"></div>
          </div>
          <img v-show="!isOpenEye" class="head" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/head.png'">
          <img v-show="isOpenEye" class="head" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/head-1.png'">
          <!--<div class="title">好饿的毛毛虫</div>-->
        </div>

        <!--云彩-->
        <div ref="clouds">
          <img class="cloud" v-for="(pass, i) in passList" v-if="i !== 0"
               :class="['cloud'+(i+1)]"
               :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/cloud-' + ((i+1) >= 10 ? (i+1) : ('0'+(i+1))) + '.png'">
        </div>

        <!--游戏规则按钮-->
        <img class="rule-btn" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/rule-btn.png'" @click="showPopRule(true)">

        <!--音乐开关-->
        <img class="music-btn-open" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music-btn-open.png'" v-if="musicOpen" @click="closeMusic">
        <img class="music-btn-close" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music-btn-close.png'" v-if="!musicOpen" @click="openMusic">
        <audio ref="music" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/music.mp3'" loop></audio>

        <!--游戏规则浮层-->
        <div class="pop-rule" :class="{show: isPopRuleShow}" @click="showPopRule(false)">
          <div class="rule-pic" @click="$event.stopPropagation()">
            <span>
              <img :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-rule.png'">
              <div class="close-btn" @click="showPopRule(false)"></div>
            </span>
          </div>
        </div>

        <!--各种弹窗-->
        <com-pic-display-box ref="pop-begin" id="pop-begin" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-begin.png'"></com-pic-display-box>
        <com-pic-display-box ref="pop-miss-pass" id="pop-miss-pass" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-miss-pass.png'"></com-pic-display-box>
        <com-pic-display-box ref="pop-miss-day" id="pop-miss-day" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-miss-day.png'"></com-pic-display-box>
        <com-pic-display-box ref="pop-all-over" id="pop-all-over" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_pass/pop-all-over.png'"></com-pic-display-box>
      </div>
    </div>
  </div>
</template>

<!--组件定义-->
<script>
  import layout from "../../../../module/index/layout.es6";
  import $ from '$';

  import share from '../../../common/js/module/share.js';
  import ua from '../../../common/js/module/ua.js';
  import native from '../../../common/js/module/native.js';
  import util from '../../../common/js/module/util.js';

  export default {
    components: {
      'com-top-title': require('../../../component/com-top-title.vue'),
      'com-pic-display-box': require('../../../component/com-pic-display-box.vue')
    },
    props: {},
    data: function () {
      return {
        response: null,
        passList: null,
        isPopRuleShow: false,
        // 音乐开关
        musicOpen: false,
        // 当前关卡序号,0表示已结束
        currentPassNo: 0,
        // 当前活动第几天序号,0表示已结束
        currentDayNo: 0,
        // 用户头像是否睁眼
        isOpenEye: true,
        isShowTitleBar: false,
      }
    },
    computed: {},
    created: function () {
      this.getData();
    },
    mounted: function () {
      let ts = this;

      // 3小时刷新一次
      setInterval(function(){
        location.reload();
      }, 3 * 3600 * 1000);

      // 页面标题
      document.title = '绘本知识大比拼';

      // 设置app头部标题栏
      native.custom.initHead({
        shareOnHead: 1
      });

      // 设置分享信息
      share.setShareInfo({
        title: '2017绘本节-绘本知识大比拼火热进行中！', // 分享标题
        desc: '大V店|快来看看你的绘本知识脑容量有多大！和千万妈妈一起比一比，还能赢购物红包哦！', // 分享描述
        link: location.origin + '/huibenjie_pass.html', // 分享链接
        imgUrl: 'http://pic.davdian.com/free/huibenjie/huibenjie_pass/share-pic.jpeg', // 分享图标
      });

      // 计算当前关卡序号
      for(let i=0;i<ts.passList.length;i++){
        // 优先设置status == '2'的为当前关卡
        if(ts.passList[i].status == '2'){
          ts.currentPassNo = i + 1;
          break;
        }
        // 其次设置第一个status === '4'之前的为当前关卡
        if(ts.passList[i].status === '4'){
          break;
        }
        ts.currentPassNo = i + 1;
      }

      // 计算当前活动第几天序号
      if(ts.currentPassNo !== 0){
        ts.currentDayNo = parseInt(ts.currentPassNo / 3) + 1;
      }

      // 人头显示位置
      $('.pass'+(ts.currentPassNo > 0 ? ts.currentPassNo : 1)).addClass('current');

      // 开启音乐
      if(!ua.isIos()){
        ts.openMusic();
      }

      // 眨眼
      setInterval(function(){
        ts.isOpenEye = !ts.isOpenEye;
      }, 500);

      // 页面状态切换时，控制音乐播放暂停
      let musicOpenRecord;
      var props = ts.getWindowActiveProperties();
      document.addEventListener(props.eventName, function () {
        // 离开页面
        if (document[props.hiddenPropName] === true && document[props.visibilityStatePropName] == 'hidden') {
          musicOpenRecord = ts.musicOpen;
          ts.closeMusic();
          // 进入页面
        } else if (document[props.hiddenPropName] === false && document[props.visibilityStatePropName] == 'visible') {
          if(musicOpenRecord){
            ts.openMusic();
          }
        }
      }, false);

      // 绘本节答题活动已结束
      if(ts.response.code === 700008){
        ts.$refs['pop-all-over'].show();
      }
    },
    methods: {
      /**
       * wiki
       * http://wiki.bravetime.net/pages/viewpage.action?pageId=17039412
       */
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: false,
          url: '/sale/api/picturebooksholiday/getLevelStatus?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {}),
          success: function (response) {
            ts.response = response;
//            console.log('闯关列表接口 返回数据:');
//            console.log(ts.response);
            ts.passList = ts.response.data.dataList;
//            console.log('闯关列表 数据:');
//            console.log(ts.passList);

//            for(let i in ts.passList){
//              ts.passList[i].status = 1;
//            }

            // 假数据
            /*ts.response = require('../json/list.json');
            console.log('闯关列表接口 返回数据:');
            console.log(ts.response);
            ts.passList = ts.response.data.dataList;
            console.log('闯关列表 数据:');
            console.log(ts.passList);*/
          },
          error: function () {

          }
        });
      },
      showPopRule(isShow){
        this.isPopRuleShow = isShow;
      },
      openMusic(){
        this.musicOpen = true;
        this.$refs.music.play();
      },
      closeMusic(){
        this.musicOpen = false;
        this.$refs.music.pause();
      },
      // 关卡点击
      passClick(passNo, passStatus){
        // 绘本节答题活动已结束,弹窗提示
        if(this.response.code === 700008){
          this.$refs['pop-all-over'].show();
          return;
        }

        let pageUrl = './huibenjie_answer.html?';
        // 已过关
        if (passStatus == '1') {
          let status = passNo % 3 === 0 ? 3 : 4;
          let url = pageUrl + 'passNo=' + passNo + '&status=' + status;
          // 是否连续通过
          if (passNo === 16 || passNo === 17 || passNo === 18) {
            let passAllBefore = this.passList.every(function (item, i) {
              return i < 15 ? item.status === '1' : true;
            });
            if (passAllBefore) {
              url += '&passAllBefore=1';
            }
          }
          location.href = url;
          // 未过关
        } else if (passStatus == '5') {
          let url = pageUrl + 'passNo=' + passNo + '&status=5';
          if(passNo === 18){
            url += '&passAllBefore=0';
          }
          location.href = url;
          // 错过
        } else if (passStatus == '3') {
          this.$refs['pop-miss-pass'].show();
          // 当前进度
        } else if (passStatus == '2') {
          let url = pageUrl + 'passNo=' + passNo + '&status=0';
          // 是否连续通过
          if (passNo === 16 || passNo === 17 || passNo === 18) {
            let passAllBefore = this.passList.every(function (item, i) {
              return i < 15 ? item.status === '1' : true;
            });
            if (passAllBefore) {
              url += '&passAllBefore=1';
            }
          }
          location.href = url;
        }
      },
      /* 获取窗口激活相关属性 */
      getWindowActiveProperties() {
        let hidden, visibilityState, eventName;
        if (typeof document.hidden !== "undefined") {
          hidden = "hidden";
          eventName = "visibilitychange";
          visibilityState = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
          hidden = "mozHidden";
          eventName = "mozvisibilitychange";
          visibilityState = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
          hidden = "msHidden";
          eventName = "msvisibilitychange";
          visibilityState = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden";
          eventName = 'webkitvisibilitychange';
          visibilityState = "webkitVisibilityState";
        }
        return {
          hiddenPropName: hidden,
          visibilityStatePropName: visibilityState,
          eventName: eventName,
        }
      },
      // 背景图片加载结束
      bgPicOnLoad(){
        let ts = this;

        // 进入页面先看到底部
        ts.isShowTitleBar = false;
        let toBottomTimes = 20;
        let toBottomInterval = setInterval(function () {
          document.body.scrollTop = document.body.clientHeight;
          toBottomTimes--;
          if (toBottomTimes < 0) {
            clearInterval(toBottomInterval);
            ts.isShowTitleBar = true;
          }
        }, 40);

        // 第一关提示
        if (ts.currentPassNo === 1) {
          ts.$refs['pop-begin'].show();
          setTimeout(function () {
            ts.$refs['pop-begin'].close();
          }, 2000);
        }else if(ts.currentPassNo > 1){
          setTimeout(function () {
            // 滚动时在每关停留时间
            const everyPassDurationTime = 200;

            // 云彩散开
            for(let i in ts.passList){
              let pass = ts.passList[i];
              if(pass.status != '4'){
                let $cloud = $('.cloud' + (i*1 + 1));
                $cloud.addClass('animation');
                $cloud.css('animation-delay', (i - 1 - 1) * everyPassDurationTime / 1000 + 's');
              }
            }

            // 滚动到当前关卡
            let scrollTop = util.getOffsetTop($('.pass' + ts.currentPassNo)[0]) - document.documentElement.clientHeight / 2;
            let scrollDurationTime = everyPassDurationTime * (ts.currentPassNo);
            ts.isShowTitleBar = false;
            $('body').animate({scrollTop: scrollTop}, scrollDurationTime, 'linear', function(){
              // 滚动结束后,前一天未闯关提示
              if (ts.currentDayNo > 1) {
                let beforeDayNoAnswer = true;
                let start = (ts.currentDayNo - 1) * 3 - 3;
                start = start >= 0 ? start : 0;
                let end = (ts.currentDayNo - 1) * 3 - 1;
                for (let i = start; i < end; i++) {
                  if (ts.passList[i].status == '1') {
                    beforeDayNoAnswer = false;
                  }
                }

                // 提示(当天只提醒一次)
                if (beforeDayNoAnswer && !localStorage.getItem('pop-miss-day-' + ts.currentDayNo)) {
                  setTimeout(function(){
                    ts.$refs['pop-miss-day'].show();
                    localStorage.setItem('pop-miss-day-' + ts.currentDayNo, '1');
                  }, scrollDurationTime);
                }
              }
              ts.isShowTitleBar = true;
            });
          }, 1000);
        }
      }
    },
  }
</script>

<!--样式-->
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/huibenjie_pass";
</style>
