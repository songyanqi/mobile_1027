/**
 * create by dony in 2017-03-28
 */

const NoFindGoods = require('../module/goodsDetail/nofind_goods.vue');

new Vue({
    el: "#noFindGoods",
    data: {
        eventHub: new Vue()
    },
    components: {
        NoFindGoods:NoFindGoods
    }
});