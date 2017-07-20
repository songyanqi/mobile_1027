<!--模板-->
<template>
  <div class="app"
       :class="{answer: status === 0, success: (status === 1 || status === 4), fail: status === 2 || status === 5, prize: status === 3}"
       v-if="subjectResponse">
    <!--头部标题-->
    <com-top-title title="绘本知识大比拼" home></com-top-title>

    <!--容器-->
    <div class="page">
      <!--页面背景-->
      <img class="bg" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_answer/bg-' + (parseInt((passNo-1) / 3) + 1) + '.jpg'">

      <!--欢呼-->
      <img class="cheer" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_answer/cheer.png'" v-if="status === 1 || status === 3 || status === 4">

      <!--答题面板-->
      <img class="panel" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_answer/panel.png'"
           v-if="status === 0 || status === 1 || status === 2 || status === 4 || status === 5">
      <img class="panel" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_answer/panel-prize.png'" v-if="status === 3">

      <div class="content">
        <!--答题面板-->
        <div class="panel">
          <!--关卡标题-->
          <div class="pass-title">比拼第{{passNo}}关</div>

          <!--背景-->
          <div class="desc-title">{{passDesc[passNo - 1].title}}</div>
          <div class="desc-words">{{passDesc[passNo - 1].desc}}</div>

          <!--答题-->
          <template v-if="status === 0">
            <!--标题-->
            <div class="question-title">问题{{subjectNo}}</div>
            <!--描述-->
            <div class="question-desc">{{currentSubject.questionContent}}</div>
            <!--按钮-->
            <div class="option-btns">
              <div class="btn" v-for="(answer, i) in currentSubject.answer" v-if="i < 2"
                   @click="answerBtnClick(currentSubject.questionId, answer.answerId, $event); tongji('hbj_pass_choose_answer');">
                <p>{{i === 0 ? 'A' : 'B'}}</p>
                <p>{{answer.answerConent}}</p>
                <div ref="answer-btn" class="result" :class="{right: answer.answerStatus == '1', wrong: answer.answerStatus == '0'}"></div>
              </div>
            </div>
          </template>

          <!--闯关成功-->
          <template v-if="status === 1">
            <!--标题-->
            <div class="question-title">闯关成功!</div>
            <!--描述-->
            <div class="question-desc">
              <p>恭喜闯关成功！继续下一关吧！</p>
            </div>
            <!--按钮-->
            <div class="normal-btns">
              <div class="btn" @click="goNextPass">开启下一关</div>
              <a class="btn" href="/t-10808.html" @click="tongji('hbj_pass_home');">去主会场</a>
            </div>
          </template>

          <!--闯关失败-->
          <template v-if="status === 2">
            <!--标题-->
            <div class="question-title">闯关失败!</div>
            <!--描述-->
            <div class="question-desc">
              <p>闯关失败！好可惜啊！</p>
              <p>错过了拿红包的机会呢！</p>
            </div>
            <!--按钮-->
            <div class="normal-btns">
              <div class="btn" @click="replay">重玩一次</div>
              <div class="btn"><a :href="passDesc[passNo - 1].answerUrl" @click="tongji('hbj_pass_look_answer');">查看答案</a></div>
            </div>
          </template>

          <!--抽奖-->
          <template v-if="status === 3">
            <!--标题-->
            <div class="question-title">闯关成功</div>

            <!--描述-->
            <div class="question-desc" v-if="passNo !== 18">
              <p>好优秀啊，连续闯关成功！</p>
              <p>奖励1次抽奖机会哟！</p>
            </div>
            <!-- 第18关 -->
            <!--连通18关-->
            <div class="question-desc" v-if="passNo === 18 && passAllBefore">
              <p>Boss关卡都闯过了！连通18关优秀到</p>
              <p>飞起来！快去抽取终极大奖！</p>
            </div>
            <!--未连通18关-->
            <div class="question-desc" v-if="passNo === 18 && !passAllBefore" style="margin-top: 0.2rem">
              <p>恭喜成功闯过第18关！可是··</p>
              <p>你没有连通18关，</p>
              <p>不能参与终极大奖的抽取哦</p>
            </div>

            <!-- 抽奖区域 -->
            <!--未抽奖-->
            <template v-if="!subjectResponse.data.bonusInfo">
              <!--抽奖按钮-->
              <img class="get-coupon-btn" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_answer/get-coupon-btn.png'"
                   @click="getCoupon(); tongji('hbj_pass_draw_prize');" v-if="passNo !== 18 || passNo === 18 && passAllBefore">

              <!--获奖优惠券-->
              <div class="coupon" v-if="prizeResponse && prizeResponse.code === 0" @click="location.href = '/t-10808.html'">
                <div class="money">￥<span class="num">{{prizeResponse.data.bonusMoney}}</span></div>
                <div class="time">有效期:{{prizeResponse.data.useBeginTime}}-{{prizeResponse.data.useEndTime}}</div>
                <div class="condition">满{{prizeResponse.data.minConsumePrice}}元可用</div>
              </div>
            </template>
            <!--未抽奖-->
            <template v-if="subjectResponse.data.bonusInfo">
              <!--获奖优惠券-->
              <div class="coupon" @click="location.href = '/t-10808.html'">
                <div class="money">￥<span class="num">{{subjectResponse.data.bonusInfo.bonusMoney}}</span></div>
                <div class="time">有效期:{{subjectResponse.data.bonusInfo.useBeginTime}}-{{subjectResponse.data.bonusInfo.useEndTime}}</div>
                <div class="condition">满{{subjectResponse.data.bonusInfo.minConsumePrice}}元可用</div>
              </div>
            </template>

            <!--按钮-->
            <div class="normal-btns">
              <a class="btn" href="/t-10808.html" @click="tongji('hbj_pass_home');">去主会场</a>
            </div>
          </template>

          <!--闯关成功(过期)-->
          <template v-if="status === 4">
            <!--标题-->
            <div class="question-title">闯关成功!</div>
            <!--描述-->
            <div class="question-desc">
              <p>恭喜闯关成功！</p>
            </div>
            <!--按钮-->
            <div class="normal-btns">
              <a class="btn" href="/t-10808.html" @click="tongji('hbj_pass_home');">去主会场</a>
            </div>
          </template>

          <!--闯关失败(过期)-->
          <template v-if="status === 5">
            <!--标题-->
            <div class="question-title">闯关失败!</div>
            <!--描述-->
            <div class="question-desc">
              <p>闯关失败！好可惜啊！</p>
              <p>错过了拿红包的机会呢！</p>
            </div>
            <!--按钮-->
            <div class="normal-btns">
              <a class="btn" href="/t-10808.html" @click="tongji('hbj_pass_home');">去主会场</a>
              <div class="btn"><a :href="passDesc[passNo - 1].answerUrl" @click="tongji('hbj_pass_look_answer');">查看答案</a></div>
            </div>
          </template>
        </div>

        <!--比拼名单-->
        <div class="pass-list">
          <img class="title-pic" :src="'http://pic.davdian.com/free/huibenjie/huibenjie_answer/pass-list-title.png'">
          <div class="list">
            <ul ref="pass-list-ul">
              <li v-for="(item, i) in subjectResponse.data.competeList">
                <span class="nickname">{{item.user_mobile}}</span>
                <span class="msg">已经打通{{item.level}}关，获得一张{{item.amount}}元优惠券</span>
              </li>
            </ul>
          </div>
        </div>
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
  import param from '../../../common/js/module/param.js';
  import tongji from '../../../common/js/module/tjAncestor.js';

  import dialog from '../../../../utils/dialog.es6';

  export default {
    components: {
      'com-top-title': require('../../../component/com-top-title.vue'),
      'com-pic-display-box': require('../../../component/com-pic-display-box.vue'),
    },
    props: {},
    data: function () {
      return {
        // 题目数据
        subjectResponse: null,
        // 奖品数据
        prizeResponse: null,
        // 0答题阶段,1闯关成功,2闯关失败,3抽奖,4闯关成功(结束),5闯关失败(结束)
        status: parseInt(param.get('status')),
        // 关卡序号
        passNo: parseInt(param.get('passNo')),
        // 题目序号
        subjectNo: 1,
        // 关卡描述
        passDesc: require('../json/passDesc.json'),
        // 判断用户是否已经回答过当前题目
        userIsAnswer: false,
        // 记录用户答题id
        userSubjectArray: [],
        // 记录用户答题答案
        userAnswerArray: [],
        // 连通15关
        passAllBefore: param.get('passAllBefore') === '1',
      }
    },
    computed: {
      currentSubject(){
        return this.subjectResponse.data.questionList[this.subjectNo - 1];
      }
    },
    created: function () {
      this.getData();
    },
    mounted: function () {
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

      // 设置通关列表滚动
      let passListLength = this.subjectResponse.data.competeList.length;
      this.$refs['pass-list-ul'].style.animationDuration = passListLength * 2 + 's';
    },
    methods: {
      /**
       * 获取问题列表
       * wiki
       * http://wiki.bravetime.net/pages/viewpage.action?pageId=17039414
       */
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: false,
          url: '/sale/api/picturebooksholiday/getLevelCompetes?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {
            // 关卡ID
            levelId: ts.passNo,
            // 关卡比拼名单 1 获取 0 不获取
            levelcompeteList: '1',
          }),
          success: function (response) {
            ts.subjectResponse = response;
//            console.log('题目接口 返回数据:');
//            console.log(ts.subjectResponse);

            // 假数据
//            ts.subjectResponse = require('../json/subject.json');
//            console.log('题目接口 返回数据:');
//            console.log(ts.subjectResponse);
          },
          error: function () {
          }
        });
      },
      /**
       * 关卡题目验证
       * wiki
       * http://wiki.bravetime.net/pages/viewpage.action?pageId=17039414
       */
      validateSubjects(){
        let ts = this;
        let result = -1;
        $.ajax({
          cache: false,
          async: false,
          url: '/sale/api/picturebooksholiday/levelVerify?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {
            // 关卡ID
            levelId: ts.passNo,
            questionId: ts.userSubjectArray.join('|'),
            answerId: ts.userAnswerArray.join('|'),
          }),
          success: function (response) {
//            console.log('关卡题目验证接口 返回数据:');
//            console.log(response);
            result = response.code;
          },
          error: function (response) {
            /*response = require('../json/passValidate.json');
             console.log('关卡题目验证接口 返回数据:');
             console.log(response);
             if (response.code === 0) {
             result = true;
             }*/
          }
        });
        return result;
      },
      /**
       * 抽奖
       * wiki
       * http://wiki.bravetime.net/pages/viewpage.action?pageId=17039418
       */
      getCoupon(){
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/sale/api/picturebooksholiday/levelLuckyDraw?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {
            // 关卡ID
            levelId: ts.passNo,
          }),
          success: function (response) {
            ts.prizeResponse = response;
//            console.log('抽奖接口 返回数据:');
//            console.log(response);
            if(ts.prizeResponse.code === 0){
              if(ts.passNo < 18){
                dialog.alert('今天比拼已结束，明天再继续闯关吧～');
              }
            }else{
//              alert(ts.prizeResponse.data.msg);
              dialog.alert(ts.prizeResponse.data.msg);
            }
          },
          error: function () {
            /*ts.prizeResponse = require('../json/subject.json');
             console.log('题目接口 返回数据:');
             console.log(ts.subjectResponse);*/
          }
        });
      },
      // 答案按钮点击
      answerBtnClick(subjectId, answerId, event){
        let ts = this;
        // 显示结果
        event.currentTarget.querySelector('.result').style.display = 'block';

        // 答完每题切换状态
        if (!ts.userIsAnswer) {
          // 设置用户已经答完当前题目
          ts.userIsAnswer = true;

          // 选择结果显示一秒钟
          setTimeout(function () {
            // 记录答案
            ts.userSubjectArray.push(subjectId);
            ts.userAnswerArray.push(answerId);

            // 第3题答完验证结果
            if (ts.subjectNo === 3) {
              // 第3题回答正确
              let vallidateCode = ts.validateSubjects();
              if (vallidateCode === 0) {
                // 显示闯关成功(有剩余关卡)
                if (ts.passNo % 3 !== 0) {
                  location.replace(param.replace({status: 1}));
                  // 显示抽奖(没有剩余关卡,表示当天3关都闯关成功)
                } else {
                  location.replace(param.replace({status: 3}));
                }
                // 第3题回答错误
              }else if(vallidateCode === 700007){
//                alert('您答的题已经过期啦!请点击今天的关卡重新进入!');
//                location.replace('huibenjie_pass.html');
                dialog.alert('您答的题已经过期啦!请点击今天的关卡重新进入!', function(){
                  location.replace('huibenjie_pass.html');
                });
              } else {
                location.replace(param.replace({status: 2}));
              }
            } else {
              // 前2道题答完,切换下一题
              ts.subjectNo++;
            }
            ts.userIsAnswer = false;

            // 隐藏答题结果
            for(let i in ts.$refs['answer-btn']){
              ts.$refs['answer-btn'][i].style.display = 'none';
            }
          }, 1000);
        }
      },
      // 重玩一次
      replay(){
        location.replace(param.replace({status: 0}));
      },
      // 开启下一关
      goNextPass(){
        location.replace(param.replace({
          passNo: this.passNo + 1,
          status: 0,
        }));
      },
      // 埋点
      tongji(key){
        tongji.pvSend(key);
      }
    },
  }
</script>

<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/huibenjie_answer";
</style>
