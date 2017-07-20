import common from '../common/common.es6';

export default{
    data(){
        return {
            flag:true,
            msg: "",
            url: "/api/mg/content/course/shareCard",
            styleObject: {
                maxHeight: document.documentElement.clientHeight  - 155 + "px"
            },
            type: 0,
            imgUrl: "",
            income: 0,
            password: "",
            visitor:null,
            inApp:window.Units&&Units.isApp()
        }
    },
    computed: {
        showCard: function () {
            return this.show
        },
        courseId: function () {
            return this.id;
        }
    },
    watch: {
        'showCard': function (val) {
            var that = this;
            setTimeout(function () {
                if(that.showCard){
                    if(that.flag){
                        console.log("发送分享卡请求");
                        common.getDataWithSign({
                            url: that.url,
                            dataType: "json",
                            type: "post",
                            data: {
                                courseId: that.courseId
                            },
                            updata: {
                                courseId: that.courseId
                            },
                            success: function (result) {
                                console.log('result->>>', result)
                                if (result && result.visitor_status){
                                    that.visitor = result.visitor_status
                                }
                                let {code, data}=result;
                                if(data){
                                    var {course, imgUrl} = data;
                                }
                                that.imgUrl = imgUrl;
                                if (+code) {
                                    bravetime.info("分享卡数据获取异常:" + code);
                                    that.showFlag = false;
                                } else {
                                    let {code, income, type} = course;
                                    that.type = type;
                                    that.income = income;
                                    that.password = code;
                                    that.flag = false;
                                }
                            },
                            error: function () {

                            }
                        })
                    }
                }
            },0);
            if (val) {
                // 在app中调用app分享卡
                if (window.Units && Units.isApp()) {
                    bravetime.callCardShare(this.courseId);
                    this.closeCard();
                }
                // 分享统计

                common.postStatisticsData({
                    production:that.inApp?"2":"3",
                    action_type:that.statistics
                });
            }
        }
    },
    props: ['show', 'id','statistics'],
    methods: {
        closeCard(){
            this.show = false;
            this.$emit('close');
        }
    },
    ready(){
        $(".mask").on("touchmove",function (e) {
            event.preventDefault();
            return false;
        });
    }
    // ready(){
    //     console.log("v1");
    //     var that = this;
    //     // 请求数据
    //     $.ajax({
    //         url: this.url,
    //         dataType: "json",
    //         type: "post",
    //         data: {
    //             courseId: this.courseId
    //         },
    //         success: function (result) {
    //             let {code, data:{course, imgUrl}}=result;
    //             that.imgUrl = imgUrl;
    //             if (+code) {
    //                 bravetime.info("分享数据获取异常:" + code);
    //             } else {
    //                 let {code, income, type} = course;
    //                 that.type = type;
    //                 that.income = income;
    //                 that.password = code;
    //             }
    //         },
    //         error: function () {
    //
    //         }
    //     })
    // }
}