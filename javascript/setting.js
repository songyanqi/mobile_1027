/**
 * Created by Murphy.lee on 17/4/21.
 */
var setting = require("../module/setting.vue");
new Vue({
  el: "#container",
  data: function () {
    return {

    }
  },
  components: {
    setting: setting
  },
  mounted: function () {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
  }
});
