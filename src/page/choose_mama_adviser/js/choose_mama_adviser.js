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
      show_adviser_hobby_list:true,
      show_adviser_list:false,
      showaddress2: {showaddress: false},
      address: '',
      addressId:-1,
      oncesdesc: false,
      hobby: [false, false, false, false, false, false, false, false, false],
      hobbyid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      bobbyidlist:[],
      adviser_select:0
    }
  },
  computed: {
    hobbyNUm:function () {
      var that = this;
      let nums = 0;
      that.bobbyidlist = [];
      that.hobby.forEach(function (value,index) {
        if(value){
          nums++;
          Vue.set(that.bobbyidlist, index, that.hobbyid[index]);
        }
      });
      return nums;
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  methods: {
    getData:function () {
      let that = this;
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/adviser/getUserTagInfo?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt({}),
        success(response) {
          that.response = response;
        },
        error(error) {
          that.response = require('../json/choose_mama_adviser.json');
          console.log(that.response);
          if(that.response.data.distId){
            that.oncesdesc = true;
          }
          console.log(that.response.data.tags[0].id);
          console.log(that.response.data.tags[1].id);
          Vue.set(that.hobby, that.response.data.tags[0].id, true);
          Vue.set(that.hobby, that.response.data.tags[1].id, true);
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    getaddress: function (msg) {
      var that = this;
      that.address = msg.name;
      that.addressId = msg.value;
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
    },
    nextstep:function () {
      /*下一步*/
      var that = this;
      let data = {
        "distId":that.addressId,
        "hobby":that.hobby
      };
      console.log(data);
      that.show_adviser_hobby_list = false;
      that.show_adviser_list = true;
    },
    confirm_adviser:function () {
      /*选定妈妈顾问*/

    },
    prestep:function () {
      var that = this;
      that.show_adviser_hobby_list = true;
      that.show_adviser_list = false;
    }
  },
  filters: {},
});
