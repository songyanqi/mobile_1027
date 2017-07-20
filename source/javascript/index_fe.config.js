document.body.style.display = 'none'
var index = require("../../module/index/index.vue");
require("../../stylesheet/base.css");
require("../../stylesheet/model.css");

require('../../javascript/jquery.lazyload.js');
require('../../javascript/units.js');
require('../../javascript/base.js');
require('../../javascript/model.js');

var VueLazyload = require('vue-lazyload/vue-lazyload');
Vue.use(VueLazyload, {
    try: 3,
    preload:2
});
document.body.style.display = 'block'
new Vue({
    el: "#index_fe_container",
    components:{
        index:index
    }
});
