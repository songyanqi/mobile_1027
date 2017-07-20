<template>
    <div class="course_desc_0" :style="styleObject">
        <div class="class_introduce_tit">
            <div @click="change(1)" class="class_dis">
                <span :class="{ active: class_introduce_left }">{{leftTitle}}</span>
            </div>
            <div @click="change(0)" class="theater_dis">
                <span :class="{ active: !class_introduce_left }">{{rightTitle}}</span>
            </div>
        </div>
        <div v-if="class_introduce_left" class="class_intrduce_left">
            <div v-if='leftContent.courseDescImgUri' class='class_intrduce_left_div'>
                <img :src="item.imgUri" v-for='item in leftContent.courseDescImgUri' class='class_intrduce_left_img'>
            </div>
            <div class="left_introduce_text">
                <p v-html="leftContent.courseDesc.replace(/\n/g,'<br/>')"></p>
            </div>
        </div>
        <div v-else class="class_introduce_right">
            <div class="class_introduce_con">
                <a>
                    <div class="teacher_tit">
                        <img @click='goTeacher(rightContent.command.content)' class="img" :src="rightContent.teacherAvatar" alt="">
                        <div class="teacher_dis">
                            <span class="techer">{{rightContent.teacherName}}</span>
                        </div>
                        <div class='attention_all' v-if='userId != rightContent.teacherId'>
                            <!-- <div class='attention_yes' v-if='attention==0' @click='attention_yes'>关注</div> -->
                            <img class='attention_yes1' src="//pic.davdian.com/free/2017/05/25/introduce_btn1.png" v-if='attention==0' @click='attention_yes'>
                            <div class='attention_no' v-if='attention==1'>已关注</div>
                        </div>
                    </div>
                </a>
                <div class="class_introduce_text">
                    <p v-html="rightContent.teacherDesc.replace(/\n/g,'<br/>')"></p>
                </div>
            </div>
            <div class="class_introduce_con guest_introduce_con" v-for="item in guestList">
                <a>
                    <div class="teacher_tit">
                        <img @click='goTeacher(item.command.content)' class="img" :src="item.avatar" alt="">
                        <div class="teacher_dis">
                            <span class="techer">{{item.name}}</span>
                        </div>
                        <div class='attention_all' v-if='userId != item.teacherId'>
                            <!-- <div class='attention_yes' v-if='item.followStatus==0' @click='attention_yes_guest(item.teacherId)'>关注</div> -->
                            <img class='attention_yes1' src="//pic.davdian.com/free/2017/05/25/introduce_btn1.png" v-if='item.followStatus==0' @click='attention_yes_guest(item.teacherId)'>
                            <div class='attention_no' v-if='item.followStatus==1'>已关注</div>
                        </div>
                    </div>
                </a>
                <div class="class_introduce_text">
                    <p v-html="item.desc.replace(/\n/g,'<br/>')"></p>
                </div>
            </div>
        </div>
        <!-- <div class='maskAttention' v-if='maskAttention'></div> -->
        <div class='contentAttention' v-if='maskAttention'>
            <h1>关注成功</h1>
            <p>老师开讲新课，我们会悄悄告诉你呦</p>
        </div>
    </div>
</template>
<script>
    import './course_desc_0.scss'
    import course_desc_0 from './course_desc_0.es6'
    export default course_desc_0
</script>
<style scoped>
    .attention_all{
        font-size: 0;
        display: inline-block;
        vertical-align: middle;
    }
    .attention_yes{
        width: 0.45rem;
        height: 0.18rem;
        line-height: 0.18rem;
        text-align: center;
        display: inline-block;
        vertical-align: top;
        font-size: 0.12rem;
        color: #FF4A7D;
        border: 1px solid #FF4A7D;
        /*border: 0.5px solid #FF4A7D;*/
        border-radius: 13px;
    }
    .attention_yes1{
        width: 0.45rem!important;
        height: 0.18rem!important;
        display: inline-block;
        vertical-align: top;
    }
    .attention_no{
        width: 0.45rem;
        height: 0.18rem;
        line-height: 0.18rem;
        text-align: center;
        display: inline-block;
        vertical-align: top;
        font-size: 0.12rem;
        color: #fff;
        background: #D8D8D8;
        border: 0.5px solid #D8D8D8;
        border-radius: 13px;
    }
    .maskAttention{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #000;
        opacity: 0.4;
        z-index: 1001;
    }
    .contentAttention{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1202;
        margin: auto;
        background: #000;
        width: 2.7rem;
        opacity: 0.65;
        border-radius: 6px;
        color: #fff;
        height: 0.72rem;
    }
    .contentAttention h1{
        width: 100%;
        font-size: 0.14rem;
        text-align: center;
        margin-top: 0.15rem;
    }
    .contentAttention p{
        width: 100%;
        font-size: 0.14rem;
        text-align: center;
    }
</style>
