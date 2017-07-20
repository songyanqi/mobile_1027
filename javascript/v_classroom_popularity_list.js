/**
 * Created by luming on 2016/12/21.
 */
var popularitylist = require("../module/vClassroomPopularityList.vue");
var  VueLazyload = require('vue-lazyload/vue-lazyload');


Vue.use(VueLazyload, {
    preload:2,
    try: 3 // default 1
})

new Vue({
    el: "#vPopularityList",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        popularitylist:popularitylist,
    }
});