var dvdBottom = require("../module/bottom.vue");
var learn = require("../module/learn.vue");
var VueLazyload = require('vue-lazyload/vue-lazyload');
var VueAwesomeSwiper = require('vue-awesome-swiper');


Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload, {
    try: 3, // default 1
    preload:2,
});
new Vue({
    el: "#learn",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        dvdBottom:dvdBottom,
        learn:learn,
    }
});