<!--模板-->
<template>
  <div class="app" v-if="response">
    <!--状态:正常领取-->
    <template v-if="response.code === 0">
      <!--组合红包-->
      <div class="wrapper group" v-if="response.data.bonusType == '1'">
        <!--标题-->
        <com-top-title home :title="response.data.status == '1' ? '已领取～' : '恭喜您获得大礼包～'"></com-top-title>
        <!--信封-->
        <div class="envelope">
          <p>恭喜您获得</p>
          <p><span class="num">{{groupTotalMoney}}</span><span>元大礼包</span></p>
        </div>
        <!--红包列表-->
        <div class="redpack-list">
          <img class="arrow" src="http://pic.davdian.com/free/redpack_receive/group-arrow.png">
          <span class="redpack" v-for="item of this.response.data.bonusList">
            <div class="name">{{item.bonusName}}</div>
            <div class="info">
              <span class="symbol">¥</span>
              <span class="money">{{item.bonusMoney}}</span>
              <span class="right-info">
                <p class="type">{{item.content}}</p>
                <p class="condition">满{{item.minConsumePrice}}元使用</p>
              </span>
            </div>
            <div class="time">{{item.useBeginTime}}—{{item.useEndTime}}</div>
          </span>
        </div>
        <!--按钮-->
        <a class="btn" :href="response.data.useUrl"><p>立即使用</p></a>
        <!--使用说明-->
        <div class="rule">
          <img class="title" src="http://pic.davdian.com/free/redpack_receive/rule-title.png">
          <div class="rich-text" v-html="response.data.bonusContent"></div>
        </div>
      </div>

      <!--随机、等额红包-->
      <div class="wrapper random-and-equal" v-if="response.data.bonusType == '0'">
        <!--标题-->
        <com-top-title home :title="response.data.status == '1' ? '已领取～' : '恭喜您获得红包～'"></com-top-title>
        <!--信封-->
        <div class="envelope">
          <p>{{this.response.data.bonusList[0].bonusName}}</p>
          <p>
            <span>¥</span>
            <span>{{this.response.data.bonusList[0].bonusMoney}}</span>
            <span>
          <p>{{this.response.data.bonusList[0].content}}</p>
          <p>满{{this.response.data.bonusList[0].minConsumePrice}}元使用</p>
          <p>{{this.response.data.bonusList[0].useBeginTime}}-{{this.response.data.bonusList[0].useEndTime}}</p>
        </div>
        <!--按钮-->
        <a class="btn" :href="response.data.useUrl"><p>立即使用</p></a>
        <!--手气榜-->
        <div class="luck-list" v-if="response.data.competeList && response.data.competeList.length > 0">
          <img class="title" src="http://pic.davdian.com/free/redpack_receive/luck-title.png">
          <com-scroll-list>
            <li v-for="item of response.data.competeList">
              <span class="head"><img :src="item.avatar"></span>
              <span class="mobile">{{item.nickname}}</span>
              <span class="money">{{item.money}}元</span>
            </li>
          </com-scroll-list>
        </div>
        <!--使用说明-->
        <div class="rule">
          <img class="title" src="http://pic.davdian.com/free/redpack_receive/rule-title.png">
          <div class="rich-text" v-html="response.data.bonusContent"></div>
        </div>
      </div>
    </template>

    <!--状态:未开始-->
    <div class="wrapper no-begin" v-if="response.code === 90005">
      <!--标题-->
      <com-top-title home title="活动未开始～"></com-top-title>
      <!--信封-->
      <div class="envelope">
        <p>活动未开始～</p>
        <p><img src="http://pic.davdian.com/free/redpack_receive/begin-time.png"></p>
        <p>{{this.response.data.startTime}}</p>
      </div>
      <!--按钮-->
      <a class="btn" href="/"><p>去店铺逛逛</p></a>
      <!--使用说明-->
      <div class="rule">
        <img class="title" src="http://pic.davdian.com/free/redpack_receive/rule-title.png">
        <div class="rich-text" v-html="response.data.bonusContent"></div>
      </div>
    </div>

    <!--状态:已结束-->
    <div class="wrapper end" v-if="response.code === 90006">
      <!--标题-->
      <com-top-title home title="活动已结束～"></com-top-title>
      <!--信封-->
      <div class="envelope">
        <p>活动已结束～</p>
        <p>下次活动，敬请期待～</p>
      </div>
      <!--按钮-->
      <a class="btn" href="/"><p>去店铺逛逛</p></a>
      <!--使用说明-->
      <div class="rule">
        <img class="title" src="http://pic.davdian.com/free/redpack_receive/rule-title.png">
        <div class="rich-text" v-html="response.data.bonusContent"></div>
      </div>
    </div>

    <!--状态:红包抢没了-->
    <div class="wrapper no-remain" v-if="response.code === 90001">
      <!--标题-->
      <com-top-title home title="红包已抢光～"></com-top-title>
      <!--信封-->
      <div class="envelope">
        <p>红包已抢光～</p>
        <p>下次活动，敬请期待～</p>
      </div>
      <!--按钮-->
      <a class="btn" href="/"><p>去店铺逛逛</p></a>
      <!--使用说明-->
      <div class="rule">
        <img class="title" src="http://pic.davdian.com/free/redpack_receive/rule-title.png">
        <div class="rich-text" v-html="response.data.bonusContent"></div>
      </div>
    </div>

    <!--状态:未登录-->
    <div class="wrapper no-login" v-if="response.code === 90000">
      <!--标题-->
      <com-top-title home title="您还未登录～"></com-top-title>
      <!--信封-->
      <div class="envelope">
        <p>您还未登录～</p>
        <p>大V店送你红包抢不停～</p>
      </div>
      <!--按钮-->
      <a class="btn" :href="'/login.html?referer=' + encodeURIComponent(location.href)"><p>登录领取</p></a>
      <!--使用说明-->
      <div class="rule">
        <img class="title" src="http://pic.davdian.com/free/redpack_receive/rule-title.png">
        <div class="rich-text" v-html="response.data.bonusContent"></div>
      </div>
    </div>

    <!--状态:非会员领取【会员专享红包活动】的时候触发-->
    <div class="wrapper no-remain" v-if="response.code === 90010">
      <!--标题-->
      <com-top-title home title="会员专享红包"></com-top-title>
      <!--信封-->
      <div class="envelope">
        <p>领取失败啦～</p>
        <p>开通会员才能领红包哦~</p>
      </div>
      <!--按钮-->
      <a class="btn" href="/348.html?rp=bonusactivity&rl=button"><p>立即开通会员</p></a>
      <!--使用说明-->
      <div class="rule">
        <img class="title" src="http://pic.davdian.com/free/redpack_receive/rule-title.png">
        <div class="rich-text" v-html="response.data.bonusContent"></div>
      </div>
    </div>

    <!--状态:出错了-->
    <div class="wrapper error" v-if="isError">
      <!--标题-->
      <com-top-title home title="出错啦～"></com-top-title>
      <!--出错图标-->
      <div class="error-pic"><img src="http://pic.davdian.com/free/redpack_receive/error.png"></div>
      <!--文案-->
      <div class="tip">哎呀，出错啦...</div>
      <!--重新加载-->
      <a class="reload-btn" href="">点击重新加载</a>
      <!--错误原因(连续两次发生错误才显示)-->
      <div class="msg" v-if="localStorage.getItem('error')">
        <p>状态码: {{response.code}}</p>
        <p>异常原因: {{response.data && response.data.msg}}</p>
      </div>
    </div>

    <!--至顶按钮-->
    <!--<com-to-top-icon></com-to-top-icon>-->
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

  // 设置分享信息
  try {
    share.setShareInfo({
      title: window.shareTitle,
      desc: window.shareDesc,
      link: location.href,
      imgUrl: window.shareImg
    });
  } catch (err) {
    console.error(err);
  }

  export default {
    components: {
      'com-top-title': require('../../../component/com-top-title.vue'),
      'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
      'com-scroll-list': require('../../../component/com-scroll-list.vue'),
    },
    props: {},
    data() {
      return {
        response: null,
      }
    },
    computed: {
      // 组合红包总金额
      groupTotalMoney(){
        return this.response.data.bonusList.reduce(function (total, item) {
          return total + item.bonusMoney * 1;
        }, 0);
      },
      // 本次领取红包是否发生错误
      isError(){
        if (this.response.code === 0 || this.response.code === 90005 || this.response.code === 90006 || this.response.code === 90001 || this.response.code === 90000 || this.response.code === 90010) {
          return false;
        }
        return true;
      }
    },
    watch: {
      // 监听response变化
      response(){
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;

          // 设置app头部标题栏
          native.custom.initHead({
            shareOnHead: 1,
          });

          /*// 设置分享信息
          try {
            share.setShareInfo({
              title: ts.response.data.shareTitle,
              desc: ts.response.data.shareDesc,
              link: location.href,
              imgUrl: ts.response.data.shareImg
            });
          } catch (err) {
            console.error(err);
          }*/

          // 如果本次领取红包发生错误,在本地存储进行记录
          if (ts.isError) {
            localStorage.setItem('error', '1');
          } else {
            // 如果本次领取红包未发生错误,去掉之前在本地存储的记录
            localStorage.removeItem('error');
          }
        });
      }
    },
    created() {
      this.getData();
    },
    methods: {
      /**
       * 接口名称: 获取红包信息
       * 接口文档: http://wiki.bravetime.net/pages/viewpage.action?pageId=16581633
       */
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/sale/api/bonusactivity/getBonus?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: layout.strSign('feed', {
            activityid: ts.getActivityId(),
          }),
          success(response) {
            ts.response = response;
          },
          error(error) {
            // 额外增加-1表示网络错误或服务器不明原因错误
            ts.response = {
              code: -1,
              data: {
                msg: error.status + ' ' + error.statusText
              }
            };
          }
        });
      },
      // 从页面path获取活动id
      getActivityId(){
        let result = /\/ab-(\d*).html/.exec(location.pathname);
        return result && result[1] || '';
      }
    },
  }
</script>

<!--样式-->
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  @import "../css/redpack_receive.scss";
</style>
