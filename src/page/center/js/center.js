// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';
import Cookies from 'js-cookie';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import util from '../../../common/js/module/util.js';
import tj from '../../../common/js/module/tj.js';
import popup from '../../../common/js/module/popup.js';
import login from '../../../common/js/module/login.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

login.needLogin();

vueLazyload.init();

new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-to-top-icon': require('../../../component/com-to-top-icon.vue'),
    'com-scroll-list': require('../../../component/com-scroll-list.vue'),
    'com-footer': require('../../../component/com-footer.vue'),
    'g-top-tip': require('../vue/g-top-tip.vue'),
  },
  props: {},
  data() {
    return {
      response: null,
      // 引导浮层第几步,引导过了或2017-08-01之后不再弹出引导浮层
      guideStep: !Cookies.get('centerGuideOver') && Date.now() < new Date("August 1,2017 00:00:00") * 1 ? 1 : 4,
      // guideStep: (!Cookies.get('centerGuideOver') && Date.now() < (window.neverGuideDate || new Date("June 13,2017 18:30:00")) * 1) ? 1 : 4,
      getDataTryTimes: 0,
    }
  },
  computed: {
    // 店铺背景图
    shopBg(){
      return this.response.data.userInfo.shopBackground ? {
        'background-image': `url(${this.response.data.userInfo.shopBackground})`
      } : null;
    },
    // 顶部提示类型
    topTipType(){
      return this.response.visitor_status === 1 && this.response.data.userInfo.attentionWeixin !== '1' ? 'focus'
        : (this.response.visitor_status === 3 ? 'open' : '');
    },
    // 是否显示引导浮层
    isShowGuide(){
      return this.response.visitor_status === 3 && this.guideStep >= 1 && this.guideStep <= 3;
    },
  },
  watch: {
    // 监听response变化
    response(){
      let ts = this;

      // 检测强制跳转
      common.checkRedirect(ts.response);

      // response变化后并渲染完dom,设置其他事项
      ts.$nextTick(function () {
        // popup.toast('wefwe')
      });
    }
  },
  beforeCreate(){
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * 接口名称:
     * 接口文档:
     */
    getData(){
      let ts = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/center/index?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({}),
        success(response) {
          ts.getDataTryTimes++;
          ts.response = response;
        },
        error(error) {
          ts.getDataTryTimes++;
          debugger
          // ts.response = require('../json/center.json');
          if (ts.getDataTryTimes < 3) {
            ts.getData();
          } else {
            popup.toast(`${location.protocol}//${location.host}/api/mg/user/center/index </br>ajax error: ${error.status} ${error.statusText}`);
          }
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    // 引导浮层下一步
    guideStepNext(){
      this.guideStep++;
      if (this.guideStep > 3) {
        Cookies.set('centerGuideOver', '1', {expires: 365 * 2, domain: util.getBaseDomain()});
      }
    },
    // 一元开店点击
    oneKdClick(){
      popup.confirm('<p>点击确定后将不能继续体验大V店</p><p>请慎重选择?</p>', function () {
        $.ajax({
          cache: false,
          async: true,
          url: '/index.php?c=User&a=ajaxDo&_=' + Date.now(),
          dataType: 'json',
          data: {},
          success(response) {
            if (response.code === 0) {
              location.href = response.url;
            } else {
              response.msg;
            }
          },
          error(error) {
            debugger
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      });
    },
    // 统计
    tj(action_type, cmdContent){
      tj.send({
        production: 17,
        action: 1,
        action_type: action_type,
        production_data: {
          feed: {
            cmdContent: cmdContent || ''
          }
        }
      });
    },
    // 有引导浮层时阻止滚动
    preventScroll(event){
      this.isShowGuide && event.preventDefault();
    },
    getMarginOrBorderTop (value, type) {
      if (type == 'border') {
        return value ? {'border-top': (value > 1 ? value : 1) + 'px solid #f0f0f0'} : null;
      } else {
        return value ? {'margin-top': (value > 1 ? value : 1) + 'px'} : null;
      }
    },
  },
  filters: {},
});
