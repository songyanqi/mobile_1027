var title = require("../module/title.vue");
var kindsort = require("../module/kindsort.vue");
var dvdBottom = require("../module/bottom.vue");
var  VueLazyload = require('vue-lazyload/vue-lazyload');
Vue.use(VueLazyload, {
  try: 3,
  preload:2,
});
new Vue({
    el: "#cat",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        dvdBottom:dvdBottom,
        title:title,
        kindsort:kindsort
    }
});
