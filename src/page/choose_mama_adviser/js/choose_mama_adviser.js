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
      addressId:[],
      oncesdesc: false,
      hobby: [false, false, false, false, false, false, false, false, false],
      hobbyid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      bobbyidlist:[],
      adviser_select:0,
      response2:null,
      inapp:!!navigator.userAgent.match(/davdian|bravetime|vyohui/)
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
      console.log(that.bobbyidlist);
      return nums;
    }
  },
  watch: {
    // 监听response变化
    response() {
      // response变化后并渲染完dom,设置其他事项
      this.$nextTick(function () {
        let that = this;
        // 设置app头部标题栏
        native.Browser.setHead({
          'title' : '选择我的顾问'
        });
      });
    }
  },
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
          if(response.code){
              popup.toast(response.data.msg || response.msg);
          }else{
            console.log("getUserTagInfo",response.data);
            if(response.data.distId){
              that.oncesdesc = true;
            }
            let tags = response.data.tags;
            if(tags){
              for(var i=0;i<tags.length;i++){
                that.hobby[tags[i].id-1]=true;
              }
            }
          }
        },
        error(error) {
          popup.toast(error.statusText)
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    getaddress: function (msg) {
      var that = this;
      console.log("getaddress");
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
        "provId":that.addressId[0],
        "cityId":that.addressId[1],
        "distId":that.addressId[2],
        "tags":that.bobbyidlist.filter(function(x){return x}).join(',')
      };

      if(!data.distId){
        popup.toast("请选择所在地区");
        return false;
      }

      if(data.tags==""){
        popup.toast("请选择标签");
        return false;
      }

      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/adviser/getRecommendAdvisers?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt(data),
        success(response) {
          if(response.code){
            popup.toast(response.data.msg || response.msg);
          }else{
            that.response2 = response;
            that.show_adviser_hobby_list = false;
            that.show_adviser_list = true;
          }
        },
        error(error) {
          popup.toast(error.statusText)
          // that.response = require('../json/choose_mama_adviser.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    confirm_adviser:function () {
      /*选定妈妈顾问*/
      if(!this.adviser_select){
        popup.toast("您必须要选择一个顾问");
        return false;
      }
      var that = this;
      let data = {
        "provId":that.addressId[0],
        "cityId":that.addressId[1],
        "distId":that.addressId[2],
        "tags":that.bobbyidlist.filter(function(x){return x}).join(','),
        "adviserId":this.adviser_select
      };
      $.ajax({
        cache: false,
        async: true,
        url: '/api/mg/user/adviser/confirmAdviser?_=' + Date.now(),
        type: 'post',
        dataType: 'json',
        data: encrypt(data),
        success(response) {
          if(response.code){
            popup.toast(response.data.msg || response.msg);
          }else{
            location.replace('/my_adviser.html');
          }
        },
        error(error) {
          popup.toast(error.statusText)
          // that.response = require('../json/choose_mama_adviser.json');
          console.error('ajax error:' + error.status + ' ' + error.statusText);
        }
      });
    },
    prestep:function () {
      var that = this;
      that.show_adviser_hobby_list = true;
      that.show_adviser_list = false;
    }
  },
  filters: {},
});
