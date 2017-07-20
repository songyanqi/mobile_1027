var seriesActivity = require("../module/seriesActivity.vue");
var VueLazyload = require('vue-lazyload/vue-lazyload');
Vue.use(VueLazyload, {
    try: 3,
    preload:2
});

new Vue({
    el: "#seriesActivity",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        seriesActivity:seriesActivity
    },
    ready:function () {

    }
});