var dvkcomment = require("../module/dvkcomment.vue");

new Vue({
    el: "#dvkcomment",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        dvkcomment:dvkcomment
    }
});