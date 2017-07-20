import layout from "../layout.es6"
export default {
    data(){
        return {
            msg: 'hello vue',
            dataList:{},
            mySwiper1:"1",
        }
    },
    props: ['data'],
    computed:{
        dataList: function () {
            return this.data || []
        }
    },
    created:function(){
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
        /**
         * 大V播报轮播
         */
        // this.$nextTick(function () {
        //     let scope = this;
        //     scope.mySwiper1 = new Swiper('.broadcast_title', {
        //         paginationClickable: true,
        //         centeredSlides: true,
        //         noSwiping:true,
        //         autoplay: scope.data.body.showTime * 1000,
        //         autoplayDisableOnInteraction: false,
        //         loop: true,
        //         direction: 'vertical'
        //     });
        // })
    },
    computed: {
        /**
         * 背景颜色
         */
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
    components: {},
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
    },
    watch:{
        'data':function () {
            var scope = this;
            if(scope.mySwiper1 != "1"){
                scope.mySwiper1.destroy(false);
            }
            setTimeout(function () {
                scope.mySwiper1 = new Swiper('.broadcast_title', {
                    paginationClickable: true,
                    centeredSlides: true,
                    noSwiping:true,
                    autoplay: scope.data.body.showTime * 1000,
                    autoplayDisableOnInteraction: false,
                    loop: true,
                    direction: 'vertical'
                })

            },0)
        }
    }
}