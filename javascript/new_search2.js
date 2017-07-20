/**
 * Created by Murphy.lee on 17/3/27.
 */

window.imgUrl = 'http://pic.davdian.com/activity/2017/03/27/640_640_3e38f947b4715789a29a2e32f046224f.png?x-oss-process=image/resize,m_fill,w_80,h_80/quality,Q_90';
window.lineLink = location.href;
window.descContent = '快来大V店搜索';
window.shareTitle = '搜索';

var search = require("../module/new_search2.vue");
var  VueLazyload = require('vue-lazyload/vue-lazyload');
Vue.use(VueLazyload, {
    try: 3,
    preload:2,
});
new Vue({
    el: "#container",
    data:{
        eventHub: new Vue()
    },
    components:{
        search:search
    },
    mounted:function () {

    }
});
