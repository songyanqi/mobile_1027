/**
 * Created by luming on 2016/11/22.
 */
var hot_sale = require("../module/hot_sale.vue");

new Vue({
    el: "body",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        hot_sale:hot_sale,
    },
    created:function () {
    }
});