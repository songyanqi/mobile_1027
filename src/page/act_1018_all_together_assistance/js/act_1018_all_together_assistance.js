// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import $ from '$';

// 业务模块
import native from '../../../common/js/module/native.js';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

// 懒加载初始化
vueLazyload.init();

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'together_assistance': require('../vue/together_assistance.vue'),
  },
  data() {
    return {
      response: null,
      title:"召集好友助力，最低0元购买商品"
    }
  },
  computed: {},
  watch: {

  },
  beforeCreate() {

  },
  created() {

  },
  methods: {
    doc_title:function (title) {
      this.title = title;
      document.title= title;
      native.custom.setHead({
        'title': title,
        'rightBtn': {
          'text': ''
        }
      });
    }
  },
  filters: {

  },
});
