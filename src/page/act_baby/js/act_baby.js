// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import Cookies from 'js-cookie';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';
import ua from '../../../common/js/module/ua.js';
import popup from '../../../common/js/module/popup.js';
import weixin from '../../../common/js/module/weixin.js';

// 懒加载初始化
vueLazyload.init();

// 初始化界面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
  },
  data() {
    return {
      initResponse: null,
      subjectResponse: null,
      resultResponse: null,
      enableClickFlag: true,
      isWeixin: ua.isWeiXin(),
      initOver: false,
      age: null,
      sex: null,
      quesNo: 0,   // 目前在哪道题
      current: 0,   // 回答了多少道题
      answers: [],
      price_in: [],  //   价格的整数部分
      price_de: [],  //   价格的小数部分
    }
  },
  computed: {},
  watch: {
    // 监听subjectResponse变化
    subjectResponse(){
      // subjectResponse变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let ts = this;

        // 设置app头部标题栏
        native.custom.initHead({
          shareOnHead: 1,
        });

        document.querySelector('.app').style.minHeight = document.documentElement.clientHeight + 'px';
        ts.initOver = true;
      });
    }
  },
  beforeCreate() {
  },
  created() {
    this.getInit();
  },
  mounted(){

  },
  methods: {
    /**
     * 接口名称: 获取初始化信息
     * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=18122739
     */
    getInit(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/userresearch/auth?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({js_wx_info: 1}),
        success(response) {
          if (response.code === 0) {
            ts.initResponse = response;

            // 强制跳转
            common.checkRedirect(response);

            // 设置分享信息
            try {
              share.setShareInfo({
                title: `${ts.initResponse.data.nickName}喊你一起做宝宝评测题`,
                desc: '测评通过智能、言语、情商、行为、艺术，5个方面发现您宝宝的优势特点',
                link: location.href,
                imgUrl: `${location.protocol}[[static]]/page/act_baby/img/share-icon.png`
              }, response);
            } catch (err) {
              console.error(err);
            }
            // 在微信中时，立即调用接口判断是否需要微信授权
            if (ua.isWeiXin()) {
              // alert(ts.initResponse.data.needWxAuth === '1');
              // alert(Cookies.get('act_baby_weixin_auth'));
              if (ts.initResponse.data.needWxAuth === '1' && Cookies.get('act_baby_weixin_auth') === undefined) {
                Cookies.set('act_baby_weixin_auth', 1, {
                  // domain: util.getBaseDomain(),
                  // path: '/',
                  // expires: 1,   // 有效时间1天
                  expires: 1 / 24 / 60    // 有效时间1分钟
                });
                // weixin.goAuthPage(true);
                location.href = ts.initResponse.data.authUrl + '&refer=' + location.href;
                throw new Error(`即将跳转微信授权页(${location.href})，已主动抛出异常中断当前页面js执行，请忽略此异常信息~`);
              }
            }
          } else {
            // popup.toast(`<p>request: ${encrypt({})}</p><p>response: code=${response.code}, msg=${response.data.msg}</p>`);
            // popup.toast(`<!--<p>response: code=${response.code}, msg=${response.data.msg}</p>-->`);
            popup.toast(`${response.data.msg}`);
          }
        },
        error(error) {
          // ts.initResponse = require('../json/getInit.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /**
     * 接口名称: 获取题目
     * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=18122739
     */
    getSubject(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/userresearch/getResearchQues?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          sex: ts.sex,
          age: ts.age,
        }),
        success(response) {
          if (response.code === 0) {
            // 替换成3条，方便测试
            // response.data.quesList = response.data.quesList.splice(0, 1);

            ts.subjectResponse = response;
          } else {
            // popup.toast(`<p>request: ${encrypt({
            //   sex: ts.sex,
            //   age: ts.age,
            // })}</p><p>response: code=${response.code}, msg=${response.data.msg}</p>`);
            // popup.toast(`<!--response: code=${response.code}, msg=${response.data.msg}</p>-->`);
            popup.toast(`${response.data.msg}`);
          }
        },
        error(error) {
          debugger
          // ts.subjectResponse = require('../json/getSubject.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    /**
     * 接口名称: 获取结果
     * 接口文档: http://wiki.ops.vyohui.com/pages/viewpage.action?pageId=18122739
     */
    getResult(){
      let ts = this;
      let answerId = {};
      ts.subjectResponse.data.quesList.forEach(function (item, index) {
        answerId[item.id] = ts.answers[index];
      });
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/userresearch/saveResearchAns?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({
          paperId: ts.subjectResponse.data.paperId,
          answerId: JSON.stringify(answerId)
        }),
        success(response) {
          if (response.code === 0) {
            // 全部100分
            // for(var i in response.data.dataList.point){
            //   response.data.dataList.point[i] = 85;
            // }

            response.data = response.data.dataList;
            ts.resultResponse = response;

            // 设置分享信息
            try {
              let totalPoint = 0;
              for (let i in ts.resultResponse.data.point) {
                totalPoint += ts.resultResponse.data.point[i] * 1;
              }
              share.setShareInfo({
                title: `我宝宝得了${totalPoint}分，快来测下你的宝宝`,
                desc: '测评通过智能、言语、情商、行为、艺术，5个方面发现您宝宝的优势特点',
                link: location.href,
                imgUrl: `${location.protocol}[[static]]/page/act_baby/img/share-icon.png`,
                link: location.href,
              });
            } catch (err) {
              console.error(err);
            }

            // 初始化echart
            ts.$nextTick(function () {
              window.echarts.init(document.querySelector('.chart')).setOption({
                backgroundColor: '#fafafa',
                name: {
                  textStyle: {
                    color: '#666',
                  }
                },
                radar: [
                  {
                    indicator: [
                      {text: '智能 ', max: 100},
                      {text: '言语', max: 100},
                      {text: '情商', max: 100},
                      {text: '行为', max: 100},
                      {text: '  艺术', max: 100}
                    ],
                    center: ['50%', '45%'],
                    radius: '70%',
                    startAngle: 127,
                    splitNumber: 4,
                    name: {
                      formatter: '{value}',
                      textStyle: {
                        color: '#666666'
                      }
                    },
                    splitArea: {
                      areaStyle: {
                        color: [
                          'rgba(234, 128, 59, 1)',
                          'rgba(234, 128, 59, 0.52)',
                          'rgba(234, 128, 59, 0.25)',
                          'rgba(234, 128, 59, 0.15)'
                        ],
                      }
                    },
                    axisLine: {
                      show: false
                    },
                    splitLine: {
                      show: false
                    }
                  },
                ],
                series: [
                  {
                    name: '雷达图',
                    type: 'radar',
                    data: [
                      {
                        value: [
                          ts.resultResponse.data.point.iq,
                          ts.resultResponse.data.point.language,
                          ts.resultResponse.data.point.eq,
                          ts.resultResponse.data.point.action,
                          ts.resultResponse.data.point.art
                        ],
                        label: {
                          normal: {
                            show: true,
                            textStyle: {
                              color: '#333'
                            },
                            position: [0, -12],
                            formatter: function (params) {
                              return params.value;
                            }
                          }
                        },
                        areaStyle: {
                          normal: {
                            color: 'rgba(234, 128, 59, 0.45)',
                          }
                        },
                        // symbol: 'circle',
                        symbol: `image://${location.protocol}[[static]]/page/act_baby/img/echarts-point.png`,
                        symbolSize: 10,
                        lineStyle: {
                          normal: {
                            opacity: 0
                          }
                        },
                      }
                    ]
                  }
                ]
              });
            });
          } else {
            // popup.toast(`<p>request: ${encrypt({
            //   paperId: ts.subjectResponse.data.paperId,
            //   answerId: JSON.stringify(answerId)
            // })}</p><p>response: code=${response.code}, msg=${response.data.msg}</p>`);
            popup.toast(`${response.data.msg}`);
          }
        },
        error(error) {
          debugger
          // ts.resultResponse = require('../json/getResult.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    getSex(sex){
      this.sex = sex;
    },
    getAge(event){
      let ts = this;
      //debugger
      ts.age = event.target.value;
    },
    // 开始答题
    begin(event){
      let ts = this;
      if (ts.sex == null) {
        popup.toast('性别是必选项，记得填哦～');
        return;
      }
      else if (ts.age == null) {
        popup.toast('一定要告诉我们宝宝的年龄才能匹配符合的测试题哦');
        return;
      }
      ts.getSubject();
    },
    // 保存答案
    saveAnswer(answer){
      let ts = this;
      if (!ts.enableClickFlag) {
        return;
      }
      ts.enableClickFlag = false;
      if (ts.answers.length < (ts.quesNo + 1)) {
        ts.answers.push(answer)
      } else {
        ts.answers[ts.quesNo] = answer;
      }
      ts.$forceUpdate();
      setTimeout(function () {
        if (ts.quesNo >= ts.current) {
          ts.current++;
        }
        if (ts.quesNo < (ts.subjectResponse.data.quesList.length - 1)) {
          ts.quesNo++;
        }
        let tempNo = document.querySelector('#currentNo');
        if (tempNo) {
          tempNo.innerHTML = ts.subjectResponse.data.quesList[ts.quesNo].id;
        }
        //ts.$forceUpdate();
        ts.enableClickFlag = true;
      }, 200);
    },
    goTo(page){
      let ts = this;
      ts.quesNo = page;
      let tempNo = document.querySelector('#currentNo');
      if (tempNo) {
        tempNo.innerHTML = ts.subjectResponse.data.quesList[ts.quesNo].id;
      }
    },
    // 分享
    share(event){
      if (ua.isWeiXin() || ua.isDvdApp()) {
        share.callShare();
      } else {
        popup.alert({
          text: '请在微信环境下分享',         // 文本（支持传入html。有则显示。）
        });
      }
    }
  },
  filters: {},
});
