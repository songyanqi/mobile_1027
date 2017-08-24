// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';

// 业务模块
import encrypt from '../../../common/js/module/encrypt.js';
import tj from '../../../common/js/module/tj.js';
import popup from '../../../common/js/module/popup.js';
import login from '../../../common/js/module/login.js';
import native from '../../../common/js/module/native.js';

// 渲染页面
new Vue({
  el: ".app",
  components: {
    'com-top-title': require('../../../component/com-top-title.vue'),
    'com-picker-address': require('../../../component/com-picker-address.vue')
  },
  data() {
    return {
      response: null,
      showaddress2: {showaddress: false},
      address: '',
      addressId:-1,
      oncesdesc: false,
      hobby: [false, false, false, false, false, false, false, false, false]
    }
  },
  computed: {
    hobbyNUm:function () {
      var that = this;
      let nums = 0;
      that.hobby.forEach(function (value,index) {
        if(value){
          nums++;
        }
      });
      return nums;
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    // this.getData();
  },
  mounted() {
    var that = this;
    that.response = true;
  },
  methods: {
    getaddress: function (msg) {
      var that = this;
      that.address = msg.name;
      that.addressId = msg.value;
      console.log("address",that.address,that.addressId);
    },
    showadselect: function () {
      var that = this;
      that.showaddress2.showaddress = true;
      that.oncesdesc = true;
    },
    hobbys: function (code) {
      var that = this;
      if(that.hobbyNUm == 2 && !that.hobby[code]){
        popup.toast("只能选择两个特长");
      }else{
        Vue.set(that.hobby, code, !that.hobby[code]);
      }
    }
  },
  filters: {},
});
