<style>
    del{
        text-decoration: line-through;
    }
    .bravetime-info{
        position:absolute!important;
    }
</style>
<template lang="html">
    <div class="introduce_inner">
        <v-school-title></v-school-title>
        <!--内容-->
        <div id="scroll_container" v-if="!error && deleteFlag">
            <div class="scroll">
                <index-feed :data="feedData"></index-feed>
            </div>
            <div class="other_info">
                <div>课程须知：</div>
                <div>1、本次课堂内容永久保存，可反复收听；</div>
            </div>
        </div>
        <div class="invite_and_enroll" v-if="!error && deleteFlag" >
            <div class="btn_container left">
                <div class="invite" @click="invite1" v-if='visitor_status!=3 && type==2'>
                    成为会员免费听
                </div>
                <div class="invite" @click="invite" v-else>
                    邀请好友<template v-if="income">赚: ¥{{income}}</template>
                </div>
                
            </div>

            <div class="btn_container right">
                <!--已报名的观众 或者嘉宾 或者讲师-->
                <div class="enroll" @click="enterClassroom" v-if="!entered&&(userRole==1||userRole==0||userTicket==1)">
                    进入课程
                </div>
                <!--未报名的 人 看到的 公开课课-->
                <div class="enroll" @click="enroll" v-if="!entered&&(userRole==2&&userTicket==0&&type==1)">
                    马上报名
                </div>
                <!--付费课-->
                <div class="enroll" @click="buyClassroom" v-if="!entered&&visitor_status!=3&&(userRole==2 && userTicket==0 && type==2)">
                    购买课程: ¥{{money}}
                </div>
                <!--卖家看到的付费课-->
                <div class="enroll" @click="enroll" v-if="!entered&&visitor_status==3&&(userRole==2 && userTicket==0 && type==2)">
                    会员免费: <del>¥{{money}}</del>
                </div>
                <!--加密课-->
                <div class="enroll need_invite" @click="alertCode" v-if="!entered&&(userRole==2&&userTicket==0&&type==3)">
                    请输入邀请码报名
                </div>
                <!--正在报名的的 所有人-->
                <div class="enroll" v-if="entered">
                    进入课程中
                </div>
            </div>

        </div>
        <invite-card :show="inviteShow" :id="courseId" statistics="3" v-on:close="closeCard"></invite-card>
        <div class="other_info">
            <div class='unLoad' v-if="error">
                <div class='unLoad-img'></div>
                <div class='unLoad-title'>网络异常，请重新加载</div>
                <div class='unLoad-btn' @click='getData(true)'>点击重新加载</div>
            </div>
        </div>
        <div v-if='!deleteFlag'>
            <img class='delete_img' src="//pic.davdian.com/free/introduce_fail.png">
            <p class='delete_content'>
                <span>课程不存在啦</span>
                <span>去看看老师的其他课程</span>
            </p>
            <p class='delete_btn' @click='goTeacherProfile'>进入老师个人主页</p>
        </div>
    </div>
</template>
<style type="text/css">
    #scroll_container{
        -webkit-overflow-scrolling: touch;
    }
    .delete_img{
        margin-top: 0.8rem;
        margin-left: 1.3rem;
        width: 1.2rem;
    }
    .delete_content{
        margin: 0.3rem auto;
        width: 1.7rem;
        /*background: #FF4A7D;*/
        color: #666666;
        font-size: 0.14rem;
        text-align: center;
        opacity: 0.8;
        border-radius: 4px;
        padding-top: 0.03rem;
        padding-bottom: 0.03rem;
    }
    .delete_content span{
        display: inline-block;
    }
    .delete_btn{
        margin: 0.2rem auto;
        color:#333333;
        width: 1.6rem;
        height: 0.33rem;
        border:1px solid #999999;
        border-radius: 4px;
        text-align: center;
        line-height: 0.33rem;
    }
</style>
<script>
    import introduce from "./introduce.es6"
    export default introduce
</script>
