/**
 * Created by dony on 2017/3/9.
 */
import goodsDetail from '../vue/goods_detail.vue';
import {Vue} from '../../../common/js/common.js';

window.vm = new Vue({
    el: "#goodsDetail",
    data: {
    	eventHub: new Vue()
    },
    components: {
        goodsDetail: goodsDetail,
    }
});
