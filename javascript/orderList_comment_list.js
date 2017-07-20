/**
 * Created by xuzelian on 16/12/26.
 */
$(function () {
    var commentList = require("../module/orderList_comment_list.vue");

    new Vue({
        el: "#comment_list",
        components:{
            commentList:commentList
        }
    });
});