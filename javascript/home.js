var Vue = require('Vue');
var home = require("../module/home.vue");

var vm=new Vue({
    el: "body",
    data: function () {

    },
    components:{
        home:home
    },
    created:function () {

    }
});
