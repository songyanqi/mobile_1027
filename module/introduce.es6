import vSchoolTitle from "../module/vSchoolTitle.vue";
import indexFeed from './index/index_feed.vue'
import inviteCard from './inviteCard/inviteCard.vue'
import common from "./common/common.es6";
import lay from "./layout/api.es6"
import native from "../src/common/js/module/native.js"
let axios = require("axios");
require('babel-polyfill');
require('es6-promise').polyfill();

export default {
    data () {
        return {
            pv:"",
            inviteShow:false,
            courseId:window.courseId,
            feedData:[],
            userRole:-1,
            userTicket:-1,
            type:-1,
            money:"",
            income:"",
            error:false,
            inApp:window.Units&&Units.isApp(),
            homeLink:common.baseJumpUrl().courseHomePage,
            shareUserId:window.shareUserId||0,
            entered:0,
            visitor_status:-1,
            deleteFlag: true,
            teacherId: null,
            userId: null,
            cmd:null,
            cache:false,
            bottomBtn: false,
            enterClassroomFlag: true,
        }
    },
    created(){
        let that = this;
        //  用通用方法请求数据
        common.getDataWithSign({
            url:"/api/mg/content/course/detail",
            dataType:"json",
            updata:{courseId:that.courseId},
            type:"post",
            success:function (result) {
                if (result.data.userId){
                    that.userId = result.data.userId
                    window.userId = result.data.userId
                    window.userTicket = result.data.userTicket
                }
                if(result==""){
                    that.error = true;
                    return false;
                }
                if (result.visitor_status == 0){
                    native.Browser.setHead({shareBtn:'0'})
                }
                let {code, data, visitor_status}=result;
                if(+code){
                    if (code==30024){
                        that.deleteFlag = false
                        that.cmd = result.data.cmd
                        // that.teacherId = result.data.teacherId
                    } else {
                        if (code==30000){
                            that.visitor_status = 0
                            native.Browser.setHead({shareBtn:'0'})
                        }else {
                            that.error = true;
                            bravetime.info("数据获取异常"+code);
                        }
                    }
                }else{
                    let {userRole, userTicket, course:{type,money,income},feedList}= data;
                    for (let i=0;i<feedList.length;i++){
                        if (feedList[i].body.tplId =='title_0' && money){
                            feedList[i].body.come = money
                        }
                    }
                    that.feedData = feedList;
                    that.userRole = userRole;
                    that.userTicket = userTicket;
                    that.type = type;
                    that.money = money;
                    that.income = income;
                    that.visitor_status = visitor_status;
                    that.$nextTick(function () {
                        $("img").each(function (index, ele) {
                            window.singlePicHold(ele);
                        })
                    });
                    if (!error && deleteFlag && visitor_status!=0){
                        native.Browser.initHead({
                          isAudioAbsorb:'1'
                        });
                    }
                }
                console.log(that.userId, window.teacherId)
            },
            error:function () {
                that.error = true;
            }
        });
    },
    methods: {
        appUpData(){
            let that = this;
        //  用通用方法请求数据
        common.getDataWithSign({
            url:"/api/mg/content/course/detail",
            dataType:"json",
            updata:{courseId:that.courseId},
            type:"post",
            success:function (result) {
                if (result.data.userId){
                    that.userId = result.data.userId
                    window.userId = result.data.userId
                }
                if(result==""){
                    that.error = true;
                    return false;
                }
                if (result.visitor_status == 0){
                    native.Browser.setHead({shareBtn:'0'})
                }
                let {code, data, visitor_status}=result;
                if(+code){
                    if (code==30024){
                        that.deleteFlag = false
                        that.cmd = result.data.cmd
                        // that.teacherId = result.data.teacherId
                    } else {
                        if (code==30000){
                            that.visitor_status = 0
                            native.Browser.setHead({shareBtn:'0'})
                        }else {
                            that.error = true;
                            bravetime.info("数据获取异常"+code);
                        }
                    }
                }else{
                    let {userRole, userTicket, course:{type,money,income},feedList}= data;
                    for (let i=0;i<feedList.length;i++){
                        if (feedList[i].body.tplId =='title_0' && money){
                            feedList[i].body.come = money
                        }
                    }
                    that.feedData = feedList;
                    that.userRole = userRole;
                    that.userTicket = userTicket;
                    that.type = type;
                    that.money = money;
                    that.income = income;
                    that.visitor_status = visitor_status;
                    that.$nextTick(function () {
                        $("img").each(function (index, ele) {
                            window.singlePicHold(ele);
                        })
                    });
                }
                console.log(that.userId, window.teacherId)
            },
            error:function () {
                that.error = true;
            }
        });
        },
        goTeacherProfile(){
            console.log('/course-teacher-' + this.teacherId + '.html')
            if (this.cmd){
                window.location = this.cmd
            } else {
                alert('cmd为:', this.cmd)
            }
            // if (this.teacherId){
            //     window.location = '/course-teacher-' + this.teacherId + '.html'
            // } else {
            //     alert('teacherId数据为:', this.teacherId)
            // }
        },
        login(){
            native.Account.login()
        },
        getData(){
            window.location.reload();
        },
        invite () {
            this.inviteShow=true;
        },
        invite1 () {
            // window.location.href = '/t-10838.html?rp=course_detail&rl=inv_button'
            window.location.href = '/join_vip.html?id=348&kd_type=2&rp=course_detail&rl=inv_button'
        },
        closeCard() {
            this.inviteShow = false;
        },
        // 普通课报名
        newEnter(){
            let  arr = window.backNewData.$children[0].$children[1].$children
            for (let a=0;a<arr.length;a++){
                window.backNewData.$children[0].$children[1].$children[a].userTicket = 1
            }
        },
        enroll(code) {
            let that = this;
            let data = {courseId:that.courseId,shareUserId:that.shareUserId};
            if(typeof code == "string"){
                data.code = code;
            }
            this.newEnter()
            // 成功后回调
            common.getDataWithSign({
                url:"/api/mg/content/course/join",
                updata:data,
                dataType:"json",
                type:"post",
                success:function (result) {
                    let {code,data:{msg,payUrl,jsApi}}=result;
                    if(+code){
                        if (code==30024){
                            bravetime.info("课程已删除");
                        } else {
                            setTimeout(function () {
                                bravetime.info(msg);
                            },300);
                        }
                    }else{
                        if(jsApi){
                            jsApi.jsApiParameters.dvdhref=location.href;
                            bravetime.goto("http://open.davdian.com/wxpay_t2/davke_pay.php?info="+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters)));
                            // bravetime.goto("http://open.vyohui.cn/wxpay_t3/davke_pay.php?info="+encodeURIComponent(JSON.stringify(jsApi.jsApiParameters)));
                           // that.payInWeixin()

                        }else if(payUrl){
                            bravetime.nativePay(payUrl,function (flag) {
                                if(flag){
                                    // 先改状态
                                    that.userTicket = 1;
                                    // that.userTicket = 0;
                                    goCourse();
                                }
                            });
                        }else{
                            that.userTicket = "1";
                            // 报名成功后进入课堂
                            goCourse();
                        }
                        //关注老师
                        if (that.type == 2){
                            let obj = {}
                            obj.obj={
                                teacherId:window.teacherId
                            }
                            axios.post('/api/mg/content/course/follow',lay.strSign(obj))
                                .then(function (respone) {
                                  console.log(respone)
                                })
                                .catch(function (error) {
                                    console.log('error:',error)
                                });
                        }
                        
                    }
                },
                error:function () {
                    bravetime.info("网络异常，请稍后重试");
                }
            })

            function goCourse() {
                bravetime.info("报名成功");
                setTimeout(function () {
                    that.enterClassroom();
                },1800);
            }
        },
        // 输入邀请码
        alertCode(){
            let that = this;
            bravetime.newPrompt("输入邀请码",{
                placeholder:"邀请码" ,
                hideCancel:true,
                hideOnClick:true,
                okLink:function (code) {
                    if(code&&code.length){
                        that.enroll(code);
                    }else {
                        bravetime.info("邀请码为空")
                    }
                }
            });
        },
        // 进入课堂
        enterClassroom(){
            let that = this;
            if (!that.enterClassroomFlag)
                return
            that.enterClassroomFlag = false
            setTimeout(function(){
                that.enterClassroomFlag = true
            },5000)
            if(this.inApp){
                // app的话进入app指定课堂
                that.enterAppCourse();
            }else{
                if(this.userRole==2){
                    // 是观众直接跳转
                    bravetime.goto(common.baseJumpUrl().coursePage(that.courseId));
                }else{
                    window.bravetime.newConfirm("发现您是这堂课程的老师哦，请打开APP继续操作",{
                        okText:"打开APP",
                        hideCancel:true,
                        hideOnClick:true,
                        okLink:function () {
                            // 唤起app制定课程
                            bravetime.callAppEnteroom(that.courseId);
                        }
                    });
                }
            }
        },
        // 购买课程
        buyClassroom(){
            this.enroll();
        },
        enterAppCourse(){
            // var that = this;
            // if(!that.entered) {
                // that.entered = 1;
                bravetime.enterVoiceRoom(this.courseId);
                // setTimeout(function(){
                //     that.entered = 0;
                // },1000)
            // }
            that.enterAppCourse = function () {
                return false;
            }

        },
        payInWeixin(jsApiParameters){
            function callpay()
            {
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                }else{
                    jsApiCall();
                }
            }
            function jsApiCall()
            {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    jsApiParameters,
                    function(res){
                        WeixinJSBridge.log(res.err_msg);
                        alert(res.err_code+res.err_desc+res.err_msg);
                    }
                );
            }

            callpay();
        }
    },
    components: {
        vSchoolTitle:vSchoolTitle,
        inviteCard:inviteCard,
        indexFeed:indexFeed

    }
}
