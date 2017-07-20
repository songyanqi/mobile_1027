import layout from "../layout.es6"
import * as tt_com_0 from './tt_com_0.vue'
export default {
    data(){
        return {
            msg: {},
            show:true
        }
    },
    props: ['data'],
    created:function(){
        let scope = this;
        if(scope.data.body.dataList.length < 4){
            scope.show = false;
        }else if(scope.data.body.dataList.length > 4 && scope.data.body.dataList.length < 8){
            scope.data.body.dataList = scope.data.body.dataList.slice(0,4)
        }else if(scope.data.body.dataList.length > 8){
            scope.data.body.dataList = scope.data.body.dataList.slice(0,8)
        }
    },
    computed: {
        styleObject: function () {
            let bgColor = this.data.body.bgColor;
            return {
                backgroundColor: "rgba(" +
                parseInt('0x' + bgColor.slice(2, 4)) + "," +
                parseInt('0x' + bgColor.slice(4, 6)) + "," +
                parseInt('0x' + bgColor.slice(6, 8)) + "," +
                parseInt('0x' + bgColor.slice(8, 10)) / 255 + ")"
            }
        }
    },
    components: {
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
        clickAnalysis:function(item) {
            layout.clickAnalysis(item,this,'body');
        }
    }
}