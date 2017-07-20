<template>
    <div class = "noGoods">
        <div v-if = "!isapp" class = "top0 top_h_t top_show">
            <div class="top_container">
                <div class="top_left">
                    <a class="top_back" href="javascript:history.back();" data-dav-tj="detail|back|back|1|back@detail">
                        <span class="home_arrow_back"></span>
                    </a>
                </div>
                <div class="title_container">
                </div>
                <div class="top_right">
                    <a href="/" class="top_home" data-dav-tj="detail|home|home|1|home@detail">
                        <span class="home_icon"></span>
                    </a>
                </div>
            </div>
        </div>
        <!---->
        <div class = "no_good_icon"></div>
        <div class = "no_goods_text">商品不存在</div>
        <div class = "no_goods_btn">
            <a class = "common" href="#" @click="handleBack" style = "margin-right: 10px;">返回上一级</a>
            <a class = "common" href="/" style = "margin-left: 10px;">首页</a>
        </div>
    </div>
</template>
<script>
    export default{
      data () {
          return{
          }
      },
      props: ["isapp"],
      methods: {
        getAppVersion () {
        // 空格分所有
          let u = navigator.userAgent;
        var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) || u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i) || u.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
        if (versionStr == null) {
          return 0;
        } else {
          var v = versionStr[2].split(".").reduce(function (a, b) {
            return +a * 10 + +b
          });
        }
        return +v;
      },
      callNative2 (host, action, params, callback, minv, minCallback) {
        var callback = callback || function () {
          };

        if (this.getAppVersion() >= minv.split(".").reduce(function (a, b) {
            return +a * 10 + +b
          })) {
          var t = Date.now() + "_" + Math.round(Math.random() * 10000);
          window["callback_" + t] = callback;

          var str = "davdian:\/\/call." + host + ".com?action=" + encodeURIComponent(action) + "&params=" + encodeURIComponent(JSON.stringify(params)) + "&callback=" + encodeURIComponent("callback_" + t) + "&minv=" + encodeURIComponent(minv);
          window.location.href = str;
        } else {
          if (minCallback) {
            minCallback();
          } else {
//              bravetime.newAlert("请升级您的APP")
          }
        }
      },
        handleBack () {
            if (this.isapp) {
                let callback = function () {};
              this.callNative2("BrowserTouch", "goBackToRootPage", {}, callback, '3.9.0');
            } else {
              history.back();
            }
        }
      }
    }
</script>
