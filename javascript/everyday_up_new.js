/**
 * Created by luming on 2017/1/9.
 */
var everyday_up_new = require("../module/everyday_up_new.vue");
var  VueLazyload = require('vue-lazyload/vue-lazyload');

Vue.use(VueLazyload, {
    // error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
    // loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
    try: 3, // default 1
    preload:2,
});






new Vue({
    el: "#everyday_up_new",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        everyday_up_new:everyday_up_new,
    }
});
