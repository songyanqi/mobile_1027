var seriesCourse = require("../module/seriesCourse.vue");
var VueLazyload = require('vue-lazyload/vue-lazyload');
Vue.use(VueLazyload, {
    try: 3,
    preload:2
});

new Vue({
    el: "#seriesCourse",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        seriesCourse:seriesCourse
    },
    ready:function () {

    }
});