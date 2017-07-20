var discuss = require("../module/discuss.vue");

new Vue({
    el: "#discuss",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        discuss:discuss
    }
});