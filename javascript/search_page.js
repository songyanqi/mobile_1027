var search = require("../module/search.vue");
var category_sort = require("../module/category_sort.vue");

new Vue({
    el: "body",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        search:search,
        category_sort:category_sort,
    },
    created:function () {
    }
});