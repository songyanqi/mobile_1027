import * as bd_goods_0 from './bd_goods_0.vue'
import * as tt_com_0 from './tt_com_0.vue'
import layout from "../layout.es6"

export default {
    data(){
        return {
            msg: 'hello vue'
        }
    },
    props: ['data'],
    created:function(){
        layout.sort(this.data);
    },
    computed: {
        styleObject: function () {
            let scope = this;
            return layout.styleObject(scope.data);
        },
        styleSpan:function () {
            let bgColor = this.data.body.bgColor;
            return {borderBottom: "7px solid" + " #" + bgColor.slice(2,8)}

        }
    },
    components: {
        bd_goods_0:bd_goods_0,
        tt_com_0:tt_com_0,
    },
    methods:{
        imgObject:function (imgSrc) {
            return{
                src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
            }
        },
        clickAnalysis:function(item) {
            layout.clickAnalysis(item,this,'body');
        }
    }
}