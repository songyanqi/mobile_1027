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
        for(let i = 0 ; i < this.data.body.dataList.length; i ++){
            for(let j = 0 ; j < this.data.body.dataList.length - 1; j++){
                if((this.data.body.dataList[j].position - 0) >(this.data.body.dataList[j + 1].position - 0 )){
                    let temp = this.data.body.dataList[j];
                    this.data.body.dataList[j] = this.data.body.dataList[j+1];
                    this.data.body.dataList[j + 1] = temp;
                }
            }
        }
        this.$nextTick(function () {

        })
    },
    computed: {
        styleObject: function () {
            let scope = this;
            return layout.styleObject(scope.data);
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
    },
    watch:{
        "data":function () {
            setTimeout(function () {
                $("img[data-original]").lazyload({effect: "fadeIn", threshold: 100, failure_limit: 100});
            },0)
        }
    }
}