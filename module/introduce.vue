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
        </div>
        <div class="invite_and_enroll" v-if="!error && deleteFlag" >
            <div class='bottomBtn' v-if='bottomBtn'></div>
            <div class="btn_container left1">
                <div class="invite" @click="invite1" v-if='visitor_status!=3 && type==2'>
                    成为会员免费听
                </div>
                <div class="invite" @click="invite" v-else>
                    邀请好友<template v-if="income">赚: ¥{{income}}<img src="//pic.davdian.com/free/2017/07/28/centerShare.png"></template>
                </div>
            </div>

            <div class="btn_container right1">
                <!--已报名的观众 或者嘉宾 或者讲师-->
                <div class="enroll1" @click="enterClassroom" v-if="!entered&&(userRole==1||userRole==0||userTicket==1)">
                    进入课程 <span v-if='cache'>(已缓存)</span>     
                </div>
                <!--未报名的 人 看到的 公开课课-->
                <div class="enroll1" @click="enroll" v-if="!entered&&(userRole==2&&userTicket==0&&type==1)">
                    马上报名
                </div>
                <!--付费课-->
                <div class="enroll1" @click="buyClassroom" v-if="!entered&&visitor_status!=3&&(userRole==2 && userTicket==0 && type==2)">
                    购买课程: ¥{{money}}
                </div>
                <!--卖家看到的付费课-->
                <div class="enroll1" @click="enroll" v-if="!entered&&visitor_status==3&&(userRole==2 && userTicket==0 && type==2)">
                    会员免费: <del>¥{{money}}</del>
                </div>
                <!--加密课-->
                <div class="enroll1 need_invite" @click="alertCode" v-if="!entered&&(userRole==2&&userTicket==0&&type==3)">
                    请输入邀请码报名
                </div>
                <!--正在报名的的 所有人-->
                <div class="enroll1" v-if="entered">
                    进入课程中
                </div>
            </div>
        </div>
        <invite-card :show="inviteShow" :id="courseId" statistics="3" v-on:close="closeCard" kind="0"></invite-card>
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
<style lang='sass' scoped>
    .bottomBtn{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        opacity: 0.6;
        z-index: 300;
    }
    .btn_container{
        border-top: 1px solid #eee;
    }
    .introduce_inner .invite_and_enroll{
        position: fixed;
        height: 0.5rem;
        bottom:0;
    }
    .introduce_inner .invite_and_enroll .left1{
        width: 1.6rem;
        /*height: 0.5rem;*/
        height: 100%;
        .invite{
            width: 1.6rem;
            height: 0.5rem;
            line-height: 0.5rem;
            margin: 0;
            /*background: -webkit-linear-gradient(left, #FF5B5B, #FB1C62);*/
            background: #F9F7F8;
            color: #666666;
            font-size: 14px;
            img{
                width: 0.13rem;
                margin-bottom: 0.01rem;
            }
        }
    }
    .introduce_inner .invite_and_enroll .right1{
        width: 2.15rem;
        height: 0.5rem;
        right: 0;
        .enroll1{
            width: 2.15rem;
            height: 0.5rem;
            margin: 0;
            line-height: 0.5rem;
            background: -webkit-linear-gradient(left, #FF5B5B, #FA1862);
            text-align: center;
            font-size: 14px;
        }
    }
    .invite_and_enroll:after{
        border-width: 0 0 0!important;
    }
</style>
<script>
    import introduce from "./introduce.es6"
    export default introduce
</script>
