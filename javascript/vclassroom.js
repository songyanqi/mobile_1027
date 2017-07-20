/**
 * Created by myy on 16/12/15.
 */
/**
 * Created by myy on 16/12/15.
 */

var Vue = require('Vue');
var classroom = require("../module/classroom.vue");
// var title = require("../module/title.vue");
var VueTouch = require('vue-touch')
Vue.use(VueTouch)
new Vue({
    el: "#vScholl",
    data: {},
    components:{
        classroom:classroom
    },
    created:function () {

    }
});
