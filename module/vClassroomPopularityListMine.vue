<style>
    .popularity{
        position: relative;
        width: 100%;
        background-color: #FFFFFF;
        text-align: center;
        margin-top: 44px;
        padding-top: 0px!important;
        color: #FF4A7D;
        height:37px;
        line-height: 37px;
        font-size: 14px;
    }
    .popimage{
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    .user{
        position: relative;
        height:41px;
        padding: 25px 0px;
        background-color: #ffffff;
    }
    .user_image{
        position: absolute;
        left:10px;

    }
    .user_message{
        position: absolute;
        left: 60px;
        background-color: #ffffff;
    }
    .invite{
        position: absolute;
        right: 10px;
        background-color: #ffffff;
        width:65px;
        height:31px;
        background-color: #FF4A7D;
        color: #FFFFFF;
        border-radius: 4px;
        margin-top: 3px;
    }
    .invite_text{
        padding: 6px 14px 6px 14px;
        font-size: 12px;
    }
    .text_hide{
        width: 140px;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
    }
    .in_app .popularity{
        margin-top: 0px;
    }
</style>
<template>
    <div id="main">
        <top></top>
<<<<<<< HEAD
        <invite-card :show="show" :id="courseId" :kind="0" :statistics="5" v-on:close="closeCard"></invite-card>
=======
        <invite-card :kind="0" :show="show" :id="courseId" :statistics="5" v-on:close="closeCard"></invite-card>
>>>>>>> master
        <!--用户信息-->
        <div style="position: fixed;width:100%;max-width: 640px;z-index: 10;">
            <div class="popularity">
                <span>{{list.course.pv}}人气&nbsp;&nbsp;</span>
                <!-- <span>&nbsp;&nbsp;{{list.course.joinNum}}人报名</span> -->
                <div class="thin_line"></div>
            </div>
            <div class ="user">
                <div class="user_image">
                    <img class="popimage" :src="imgObject(list.user.avatar)" alt="">
                </div>
                <div class="user_message">
                    <span class="fz_15 text_hide" style="color: #333333;height: 20px;display: block;">{{ list.user.name }}(我)</span>
                    <p class="fz_12" style="color:#999999;">推荐了<span style="color:#FF4A7D ">{{ list.user.inviteNum }}</span>个朋友过来听课</p>
                </div>
                <div class="invite">
                    <div class="invite_text" @click="showCard">去邀请</div>
                </div>
                <div class="thin_line"></div>
            </div>
        </div>
    </div>
</template>

<script>

    var inviteCard = require("../module/inviteCard/inviteCard.vue");
    import common from "./common/common.es6";
    var title = require("../module/vClassroomPopularityListTitle.vue");

    export default{
        data:function () {
            return {
                list: {"course": {"pv": ""}, "user": {"name":"     ", "avatar": "", "inviteNum": ""}},
                ajaxing: true,
                id: window.courseId,
                courseId: window.courseId,
                show: false,
                localData: {},
                dataUrl: window.shareTopInfo,
            }
        },
        props:['showed'],
        created:function () {
            var scope = this;
            this.getData(true);
        },
        updated:function() {

        },
        methods:{
            getData:function(flags){
                //确定当前的状态
                let scope = this;
                //判断是否请求数据
                common.getDataWithSign({
                    updata:{courseId:window.courseId},
                    flag:flags,
                    url:scope.dataUrl,
                    success:function (data) {
                        if(data.code == 0){
                            scope.list = data.data;
                            console.log(scope.list)
                            scope.list_course = data.data.course;
                            scope.list_user = data.data.user;
                            scope.msg = data.data.user.name;
                            if(!isPrivateMode){
                                sessionStorage.setItem("vClassroomPopularityMine", JSON.stringify(data));
                            }
                        }else{
                            scope.shows();
                        }
                    },
                    error:function () {
                        scope.shows();
                    }
                })
            },
            showCard:function () {
                this.show = true;
            },
            closeCard:function () {
                this.show = false;
            },
            shows:function () {
                this.$emit('showed');
            },
            imgObject:function (imgSrc) {
                if(imgSrc){
                    return imgSrc
                }else{
                    return '//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png'
                }
            },
        },
        components:{
            top:title,
            inviteCard:inviteCard,
        },
        watch:{
            'showed':function () {
                if(this.showed){
                    this.getData(true);
                }
            }
        }
    }
</script>
