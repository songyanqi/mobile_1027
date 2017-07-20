/**
 * Created by myy on 16/12/15.
 */
var Vue = require('Vue');
var introduce = require("../module/introduce.vue");
// var title = require("../module/title.vue");

new Vue({
    el: ".body",
    data: {},
    components:{
        introduce:introduce
    },
    created:function () {

    }
});
