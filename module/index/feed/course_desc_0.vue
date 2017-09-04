<template>
    <div class="course_desc_0" :style="styleObject">
        <div class='block' style="width: 100%;height: 47px;" v-if='fixFlag'></div>
        <div class="class_introduce_tit" :class='{fixStyle: fixFlag}' v-if='!isApp'>
            <div @click="change(1)" class="class_dis">
                <span :class="{ active: class_introduce_left == 1 }">{{courseDescTitle}}</span>
            </div>
            <div @click="change(0)" class="theater_dis">
                <span :class="{ active: class_introduce_left == 0 }">{{teacherDescTitle}}</span>
            </div>
            <div @click="change(2)" class="theater_dis">
                <span :class="{ active: class_introduce_left == 2 }">{{courseNotesTitle}}</span>
            </div>
        </div>
        <div class="class_introduce_tit" :class='{fixStyle1: fixFlag}' v-if='isApp'>
            <div @click="change(1)" class="class_dis">
                <span :class="{ active: class_introduce_left == 1 }">{{courseDescTitle}}</span>
            </div>
            <div @click="change(0)" class="theater_dis">
                <span :class="{ active: class_introduce_left == 0 }">{{teacherDescTitle}}</span>
            </div>
            <div @click="change(2)" class="theater_dis">
                <span :class="{ active: class_introduce_left == 2 }">{{courseNotesTitle}}</span>
            </div>
        </div>
        <div class='class_intrduce_success'></div>
        <div v-if="class_introduce_left==1" class="class_intrduce_left">
            <div v-if='courseDescInfo.courseDescImgUri' class='class_intrduce_left_div'>
                <img :src="item.imgUri" v-for='(item,index) in courseDescInfo.courseDescImgUri' class='class_intrduce_left_img'>
            </div>
            <div class="left_introduce_text">
                <p v-html="courseDescInfo.courseDesc.replace(/\n/g,'<br/>')"></p>
            </div>
        </div>
        <div v-if="class_introduce_left==0" class="class_introduce_right">
            <div class="class_introduce_con">
                <a>
                    <div class="teacher_tit">
                        <img @click='goTeacher(teacherDescInfo.command.content)' class="img" :src="teacherDescInfo.teacherAvatar" alt="">
                        <div class="teacher_dis">
                            <span class="techer">{{teacherDescInfo.teacherName}}</span>
                        </div>
                        <div class='attention_all' v-if='userId != teacherDescInfo.teacherId'>
                            <!-- <div class='attention_yes' v-if='attention==0' @click='attention_yes'>关注</div> -->
                            <img class='attention_yes1' src="//pic.davdian.com/free/2017/05/25/introduce_btn1.png" v-if='attention==0' @click='attention_yes'>
                            <div class='attention_no' v-if='attention==1'>已关注</div>
                        </div>
                    </div>
                </a>
                <div class="class_introduce_text">
                    <p v-html="teacherDescInfo.teacherDesc.replace(/\n/g,'<br/>')"></p>
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
        <div v-if="class_introduce_left==2">
            <div class='discuss_top'>
                 <img v-if='introduceGuide && guide==2 && userTicket==1' class='introduceGuide1' src="//pic.davdian.com/free/2017/08/11/writeAllSignUp.png" class='writeAllSignUp'>
                 <img v-if='introduceGuide && guide==2 && userTicket==0' class='introduceGuide1' src="//pic.davdian.com/free/2017/08/11/writeAllNotSignUp.png" class='writeAllSignUp'>
                <div class='discuss_top_write' @click='writeNote' v-if='userTicket==1 && AppVersionFlag'>
                    写我的听课笔记
                    <img src="//pic.davdian.com/free/2017/07/26/write.png">

                </div>
                <div class='discuss_top_no_write' v-if='userTicket==0 && AppVersionFlag'>
                    报名后才能写笔记哦
                </div>
                <div class='discuss_top_alldiscuss' @click='allNote'>
                    全部笔记
                    <!-- <img src="//pic.davdian.com/free/2017/07/26/entry.png"> -->
                </div>
                <i class='icon'></i>
            </div>
            <div class='discuss_container' v-if='notesList.length!=0' :class='{discuss_container_noborder: index == notesList.length-1}' v-for="(item, index) in notesList" @click.stop='show_all(item)'>
                <div class='discuss_title'>
                    <div class='title_img title_all' :style="{'background': 'url(' + item.headImg + ') center center / cover no-repeat' , 'background-size': 'cover'}"></div>    
                    <div class='title_name title_all' v-text='item.userName'></div>
                    <div class='title_time title_all' v-text='item.createTime'></div>
                    <img class='title_star title_all' v-if='item.score == 1' src="//pic.davdian.com/free/2017/05/09/star_1.png">
                    <img class='title_star title_all' v-if='item.score == 2' src="//pic.davdian.com/free/2017/05/09/star_2.png">
                    <img class='title_star title_all' v-if='item.score == 3' src="//pic.davdian.com/free/2017/05/09/star_3.png">
                    <img class='title_star title_all' v-if='item.score == 4' src="//pic.davdian.com/free/2017/05/09/star_4.png">
                    <img class='title_star title_all' v-if='item.score == 5' src="//pic.davdian.com/free/2017/05/09/star_5.png">
                </div>
                <div class='discuss_content' v-html="item.content.replace(/\n/g,'<br/>')"></div>
                <div class='discuss_seeAll' v-if='arr[index]==1' @click.stop='showAll(index)'>查看全部</div>
                <div class='discuss_seeAll' v-if='arr[index]==2' @click.stop='showAll1(index)'>收起</div>
                <div class='discuss_imgContainer' >
                    <div class='discuss_img' :style="{'background': 'url(' + item1 + ') center center / cover no-repeat' , 'background-size': 'cover'}" v-for="(item1, index) in item.imgList" @click='showImg(index,item.imgList, item1)'></div>
                </div>
                <div class='discuss_share' v-if='isApp'>
                    <div class='discuss_share_container' @click.stop='share(item)' v-if='isApp'>
                        <img src="//pic.davdian.com/free/2017/02/07/material-share.png">
                        <span v-text='item.shareNum' v-if='item.shareNum !=0'></span>
                    </div>
                </div>
            </div>
            <!-- <div class='discuss_all'>
                <div class="discuss_all_content" @click='allNote' v-if='notesList.length!=0'>
                    查看全部{{notesNum}}条听课笔记
                </div>
            </div> -->
            <div class='no_discuss' v-if='notesList.length==0'>
                <img src="//pic.davdian.com/free/2017/05/10/error_img.png">
                <p>快来写笔记吧</p>
                <!-- <div class='discuss_top_write' @click='writeNote' v-if='userTicket==1 && AppVersionFlag'>
                    写我的听课笔记
                    <img src="//pic.davdian.com/free/2017/07/26/write.png">
                </div>
                <div class='discuss_top_no_write' v-if='userTicket==0 && AppVersionFlag'>
                    报名后才能写笔记哦
                </div> -->
            </div>
        </div>
        <!-- <div class='maskAttention' v-if='maskAttention'></div> -->
        <div class='contentAttention' v-if='maskAttention'>
            <h1>关注成功</h1>
            <p>老师开讲新课，我们会悄悄告诉你呦</p>
        </div>

        <img v-if='introduceGuide && guide==1' class='introduceGuide lectureNnotesAll' src="//pic.davdian.com/free/2017/08/08/lectureNnotesAll.png">

        <div v-if='introduceGuide' class='introduceGuideMask'></div>
        <div v-if='introduceGuide' class='introduceGuidebtn' @click='know'>知道了</div>

    </div>
</template>
<script>
    import './course_desc_0.scss'
    import course_desc_0 from './course_desc_0.es6'
    export default course_desc_0
</script>
<style scoped lang='sass'>
    .course_desc_0 .class_introduce_tit .class_dis, .course_desc_0 .class_introduce_tit .theater_dis{
      /*-webkit-box-flex: 1;*/
      /*-webkit-flex: 1;*/
      /*flex: 1;*/
      width: 1.22rem;
      /*display: -webkit-box;*/
      /*display: -webkit-flex;*/
      /*display: flex;*/
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      height: 16px;
      box-sizing: border-box;
    }
    .no_discuss{
        padding-bottom: 20px;
        text-align: center;
        /*margin-top: -15px;*/
        img{
            width: 120px;
            display: inline-block;
        }
        p{
            color: #666;
            margin-top: .3rem;
            padding-bottom: .1rem;
            width: 100%;
            text-align: center;
            font-size: .14rem;
            display: inline-block;
        }
        .discuss_top_write{
            color: #FF4A7D;
            border-radius: 37px;
            border:1px solid #FF4A7D;
            padding-top: 3.5px;
            padding-bottom: 2.5px;
            padding-left: 15px;
            padding-right: 15px;
            font-size: 12px;
            display: inline-block;
            img{
                width: 11px;
                margin-left: 0;
            }
        }
        .discuss_top_no_write{
            color: #999999;
            border-radius: 37px;
            border:1px solid #999999;
            padding-top: 3.5px;
            padding-bottom: 2.5px;
            padding-left: 15px;
            padding-right: 15px;
            font-size: 12px;
            display: inline-block;
        }
    }
    .discuss_top{
        padding:10px;
        padding-top: 15px;
      position: relative;
        .discuss_top_write{
            float: left;
            color: #FF4A7D;
            border-radius: 37px;
            border:1px solid #FF4A7D;
            height: 24px;
            line-height:24px;
            text-align:center;
            width: 130px;
            font-size: 12px;
            img{
                width: 11px;
            }
        }
        .discuss_top_no_write{
            float: left;
            color: #999999;
            border-radius: 37px;
            border:1px solid #999999;
              height: 24px;
              line-height: 24px;
              text-align:center;
                width: 139px;
            font-size: 12px;
        }
        .discuss_top_alldiscuss{
            float: right;
            color: #999999;
            padding-top: 3.5px;
            padding-bottom: 2.5px;
            padding-right: 10px;
            font-size: 12px;
        }
        .icon{
            display: inline-block;
            vertical-align: 0;
            width: 10px;
            height: 10px;
            border-top: 1px solid #999;
            border-right: 1px solid #999;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
            background: none;
            top: 22px;
            position: absolute;
            right: 11px;
        }
    }
    .discuss_top:after{
        content:"";
        height: 0;
        clear: both;
        display: table;
    }
    .discuss_container{
        padding-top: 0.21rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        padding-bottom: 0.15rem;
        font-size: 0;
        background: #fff;
        border-bottom: 0.5px solid #F1F1F1;
    }
    .discuss_container_noborder{
        border-bottom: 0px;
    }
    .discuss_title{
        .title_all{
            display: inline-block;
            vertical-align: middle;
        }
        .title_img{
            width: 0.24rem;
            height: 0.24rem;
            border-radius: 50%;
            background: red;
        }
        .title_name{
            font-size: 0.14rem;
            color: #666666;
            margin-left: 0.05rem;
        }
        .title_time{
            font-size: 0.12rem;
            margin-left: 0.03rem;
            color: #999999;
        }
        .title_star{
            width: 0.59rem;
            float: right;
            margin-top: 0.06rem;
        }
    }
    .discuss_content{
        font-size: 0.13rem;
        color: #333333;
        margin-top: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        display: -webkit-box;
    }
    .discuss_seeAll{
        width:0.8rem;
        font-size: 0.13rem;
        color: #FF4A7D;
        padding-top: 0.1rem;
    }
    .discuss_imgContainer{
        font-size: 0;
        width: 3.1rem;
        /*min-height: 1rem;*/
        margin-top: 0.1rem;
        .discuss_img{
            width: 0.9rem;
            height: 0.9rem;
            background: red;
            display: inline-block;
            vertical-align: top;
            margin-right: 0.1rem;
            margin-bottom: 0.1rem;
            border-radius:3px;
        }
    }
    .discuss_share{
        width: 100%;
        height: 0.16rem;
        .discuss_share_container{
            height: 0.16rem;
            float: right;
            font-size: 0.11rem;
            color: #999999;
            img{
                width: 0.15rem;
            }
        }
    }
    .discuss_all{
        width:100%;
        color: #999999;
        text-align: center;
        height: 0.5rem;
        .discuss_all_content{
            display: inline-block;
            border-bottom: 1px solid #999;
            height: 19px;
        }
    }



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
    .course_desc_0 .class_introduce_tit{
        text-align: center!important;
        line-height: 15px;
    }
    .course_desc_0 .class_introduce_tit .class_dis, .course_desc_0 .class_introduce_tit .theater_dis{
        display: inline-block!important;
    }
    .course_desc_0 .class_introduce_tit .class_dis .active{
        color:#FF4A7D;
    }
    .course_desc_0 .class_introduce_tit .theater_dis .active{
        color:#FF4A7D;
    }
    .course_desc_0 .class_introduce_tit .class_dis span{
        padding-top: 13px;
        padding-bottom: 13px;
        padding-left: 2px;
        padding-right: 2px;
    }
    .course_desc_0 .class_introduce_tit .theater_dis span{
        padding-top: 13px;
        padding-bottom: 13px;
        padding-left: 2px;
        padding-right: 2px;
    }
    .course_desc_0 .fixStyle{
        position: fixed;
        top: 44px;
        width: 100%;
        background: #fff;
        z-index: 666;
    }
    .course_desc_0 .fixStyle1{
        position: fixed;
        top: 0px;
        width: 100%;
        background: #fff;
        z-index: 666;
    }
    .course_desc_0{
        position: relative;
    }
    .introduceGuide{
        position: absolute;
        top: -14px;
        width: 3.2rem;
        right: 21px;
        z-index:1000;
    }
    .introduceGuide1{
        position: absolute;
        left: 0;
        width: 248px;
        z-index:1000;
        bottom: -10px;
    }
    .introduceGuideMask{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 60px;
        left: 0;
        background: #000000;
        opacity: 0.6;
        z-index: 999;
    }
    .introduceGuidebtn{
        width: 120px;
        height: 40px;
        position: fixed;
        left: 50%;
        margin-left:-60px;
        bottom: 60px;
        z-index: 1000;
        background: -webkit-linear-gradient(left, #FF7C7C, #FF6A8B);
        border-radius: 100px;
        text-align: center;
        line-height: 40px;
        color: #fff;
    }
</style>
