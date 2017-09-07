require("../../../../stylesheet/base.css");
require("../../../../stylesheet/model.css");
require("../../../../stylesheet/order.css");
require("../../../../stylesheet/index.css");

require("../../../../javascript/model.js");
require("../../../../javascript/units.js");
require("../../../../javascript/base.js");
require("../../../../javascript/jquery.lazyload.js");
$(function () {

    /*
    var allData = [[], [], [], [], []]; // 数据
    var typePage = [1, 1, 1, 1, 1];
    var refreshFlag = [0, 0, 0, 0, 0]; // 下拉刷新标识
    var currentType = +location.href.substr(location.href.indexOf("type=")+5,1)||0;
    var preLoadFlag = [];
    var refreshEndFlag = [0, 0, 0, 0, 0];
    var preLoadEndFunction = null;
    var refreshContainer = $(".refresh");
    var pageSize = 10;
    var allSwitchItem = $(".switcher_item");

    var container = $(".order_list_container");
    */
    //评价、追加评价、确认收货之后返回来刷新页面
    if(sessionStorage.getItem('orderListRefresh')){
        sessionStorage.removeItem('orderListRefresh');
        setTimeout(function () {
            location.reload();
        },200);
        return false
    }
    var orderList = require("../vue/orderList.vue");
    new Vue({
        el: "body",
        components:{
            orderList:orderList
        }
    });
});
