<template>
  <div>
    <div class="setting_container mt_10">
      <a_setting_item :datalist="bind_data"></a_setting_item>
    </div>
    <div class="setting_container mt_10">
      <a_setting_item :datalist="data"></a_setting_item>
    </div>
  </div>
</template>
<script>
  var a_setting_item = require("../module/setting_item.vue");
  import layout from "./index/layout.es6";
  export default{
    data: function () {
      return {
        data: [
          {
            name: "关于大V店",
            url: "/about.html",
            tj_id: "about"
          },
          {
            name: "用户协议",
            url: "/t-424.html",
            tj_id: "protocol|"
          },
          {
            name: "邮费说明",
            url: "/t-42.html",
            tj_id: "fei|"
          },
          {
            name: "联系我们",
            url: "/class_detail-5459.html",
            tj_id: "contact"
          }
        ],
        bind_data: [
          {
            name: "手机号",
            url: "/index.php?m=default&c=user&a=mobile_bind",
            tj_id: "bind_phone_number",
            bind: ""
          },
          {
            name: "微信账号",
            url:
            "http://open."+(window.location.host).split(".")[1]+"."+(window.location.host).split(".")[2]+"/WechatLogin/index?bind=1&referer=" + location.href,
            tj_id: "bind_wechart",
            bind: ""
          },
          {
            name: "解绑银行卡",
            url: "/bank_card_list.html",
            tj_id: "unbind_bank_card"
          }
        ],
        dataUrl: "/api/mg/user/weixin/checkBind"
      }
    },
    components: {
      a_setting_item: a_setting_item
    },
    mounted: function () {
      //查看是否绑定手机号或者微信号
      this.init();
    },
    methods: {
      init: function () {
        var sccope = this;
        $.ajax({
          type: 'POST',
          url: sccope.dataUrl,
          data: layout.strSign("", {}),
          dataType: "json",
          success: function (result) {
            if (result.code) {

            } else {
              sccope.bind_data[0].bind = result.data.mobile;
              if (result.data.mobile == '') {

              } else {
                sccope.bind_data[0].url = "javascript:bravetime.newAlert('暂不支持解绑')";
              }
              sccope.bind_data[1].bind = result.data.weixinNickName;
              if (result.data.weixinNickName == '') {
                  if(Units.isWechat()){

                  }else{
                    sccope.bind_data[1].url = "javascript:bravetime.newAlert('请在微信内打开')";
                  }
              } else {
                sccope.bind_data[1].url = "javascript:bravetime.newAlert('暂不支持解绑')";
              }
            }
          },
          error: function () {

          }
        })
      }
    }
  }
</script>
