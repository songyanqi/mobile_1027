/**
 * Created by dony on 2017/3/9.
 */
import goodsDetail from '../vue/goods_detail.vue';

// 基础模块
import common from '../../../common/js/common.js';

// 第三方模块
import Vue from 'Vue';
import vueLazyload from '../../../common/js/module/vueLazyload.js';

vueLazyload.init();
window.vm = new Vue({
    el: "#goodsDetail",
    data: {
    	eventHub: new Vue()
    },
    components: {
        goodsDetail: goodsDetail,
    }
});
