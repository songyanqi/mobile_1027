var allSchool = require("../module/allSchool.vue");
var VueLazyload = require('vue-lazyload/vue-lazyload');
Vue.use(VueLazyload, {
    try: 3,
    preload:2
});

window.allsclool=new Vue({
    el: "#allScholl",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        allSchool:allSchool
    },
    ready:function () {

    }
});
