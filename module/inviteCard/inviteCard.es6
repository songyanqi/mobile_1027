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
            console.log(this.show)
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
                    bravetime.callCardShare(this.courseId);//判断是否在app，以及升级app
                    this.closeCard();//h5弹窗关闭，但是在app中页面还是正常显示的
                }
                // 分享统计

                common.postStatisticsData({
                    production:that.inApp?"2":"3",
                    action_type:that.statistics + ""
                });
            }
        }
    },
    props: ['show', 'id','statistics'],
    methods: {
        closeCard(){
            this.$emit('close');
        }
    },
    created(){

    }
}