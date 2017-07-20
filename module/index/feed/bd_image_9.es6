import layout from "../layout.es6"
import * as tt_com_0 from './tt_com_0.vue'
export default {
    data(){
        return{

        }
    },
    props:['data'],
    created:function () {
        /**
         * 数据排序
         */
        layout.sort(this.data);
        console.log(this.data.marginTop)
    },
    computed: {
        styleObject: function () {
            let scope = this;
            return layout.styleObject(scope.data);
        },
        styleTop:function () {
            let scope = this;
            return {
                marginTop: scope.data.marginTop + 'px',
            }
        }
    },
    components:{
        tt_com_0:tt_com_0
    },
    methods:{
        imgObject:function (imgSrc) {
            return{
                src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
            }
        },
        clickAnalysis:function(e) {
            layout.clickAnalysis(e,this,'body');
        }
    }
}