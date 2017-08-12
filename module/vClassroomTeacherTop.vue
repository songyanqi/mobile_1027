<style>
    #change_user_img {
        /*background-image: url(//pic.davdian.com/free/2016/11/09/750_320_c1aa09dd2e5e95cb41089b671d3db764.png);*/
        background-image: url(//pic.davdian.com/free/2017/03/19/introduce_bg.png);
        padding: 51px 0 30px;
        background-size: cover;
        color: #fff;
        position: relative;
    }
    .user_img_phone {
        text-align: center;
    }
    .user_img_phone img {
        width: 80px;
        height: 80px;
        border: 0px solid #fff;
        border-radius: 40px;
    }
    .user_text{
        margin-top: 7px;
        max-width: 260px;
        height: 21px;
        line-height: 21px;
        overflow: hidden;
        margin: auto;
        color: #ffffff;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        display: -webkit-box;
    }
    .user_classroom{
        height:44px;
        line-height: 44px;
        background-color: #ffffff;
        padding-left: 10px;
    }
    .home_arrow {
        position: absolute;
        top:14px;
        left:14px;
        display: inline-block;
        vertical-align: 0;
        width: 14px;
        height: 14px;
        border-left: 2px solid #FFFFFF;
        border-bottom: 2px solid #FFFFFF;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
</style>
<style scoped lang='sass'>
    .attention_all{
        text-align: center;
        margin-top: 0.2rem;
    }
    .attention_all img{
        width: 0.6rem;
    }
    .alert_mask{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #000000;
        opacity: 0.6;
        z-index: 1;
    }
    .alert_yes{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        margin: auto;
        background: #000;
        width: 2.7rem;
        opacity: 0.65;
        border-radius: 6px;
        color: #fff;
        height: 0.72rem;
        h1{
            width: 100%;
            font-size: 0.14rem;
            text-align: center;
            margin-top: 0.15rem;
            margin-bottom: 0.05rem;
        }
        div{
            width: 100%;
            font-size: 0.14rem;
            text-align: center;
        }
    }
    .alert_no{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        margin: auto;
        background: #fff;
        width: 2.7rem;
        color: #666;
        opacity: 0.9;
        border-radius: 12px;
        height: 1.55rem;
        h1{
            width: 100%;
            text-align: center;
            font-size: 0.19rem;
            margin-top: 0.15rem;
            color: #333;
            margin-bottom: 0.1rem;
        }
        .alert_content{
            font-size: 0.17rem;
            text-align: center;
            margin: 0.15rem;
        }
        .alert_btn_all{
            width: 100%;
            font-size: 0;
            .alert_btn{
                width: 50%;
                display: inline-block;
                vertical-align: top;
                border-top: 0.5px solid #eee;
                font-size: 0.17rem;
                text-align: center;
                height: 0.4rem;
                line-height: 0.4rem;
                box-sizing: border-box;
            }
            .alert_btn:first-child{
                border-right: 0.5px solid #eee;
            }
            .alert_btn_yes{
                color: #FF4A7D;
            }
            position: absolute;
            bottom: 0
        }
    }
</style>
<style scoped>
  .alert_no .alert_btn_all{
    position: absolute;
    bottom: 0;
  }
</style>
<template>
    <div>
        <div id="change_user_img">
            <div class="top_left">
                <a class="top_back" href="javascript:history.back();">
                    <span class="home_arrow"></span>
                </a>
            </div>
            <div class="user_img_phone">
                <img v-lazy="imgObject(list.avatar)">
            </div>
            <div class="user_img_phone" style="margin-top: 10px;">
                <span class="fz_14">{{list.name}}</span>
            </div>
            <div class="user_img_phone user_text">
                <span class="fz_12">{{list.desc}}</span>
            </div>
            <div class='attention_all'>
                <img src="//pic.davdian.com/free/2017/05/09/attention1.png" v-if='attention==0' @click='attention_yes'>
                <img src="//pic.davdian.com/free/2017/05/09/attention2.png" v-if='attention==1' @click='attention_no'>
            </div>
        </div>
        <div class="user_classroom">
            <span>共{{list.courseNum}}堂课程</span>
        </div>

        <div class='alert_mask' v-if='alert_no'></div>
        <div class='alert_yes' v-if='alert_yes'>
            <h1>关注成功</h1>
            <div>老师开讲新课，我们会悄悄告诉你呦</div>
        </div>
        <div class='alert_no' v-if='alert_no'>
            <h1>确定不再关注老师？</h1>
            <div class='alert_content'>取消关注后,就不能收到老师的开课提醒了哦～</div>
            <div class='alert_btn_all'>
                <span class='alert_btn' @click='alert_btn_no'>取消</span>
                <span class='alert_btn alert_btn_yes' @click='alert_btn_yes'>确定</span>
            </div>
        </div>
    </div>
</template>

<script>
    import lay from "./layout/api.es6"
    let axios = require("axios");
    require('babel-polyfill');
    require('es6-promise').polyfill();
    export default{
        data:function () {
            return{
                alert_yes:false,
                alert_no:false
            }
        },
        computed:{
            attention: function () {
                return this.list.followStatus
            }
        },
        props:["list"],
        created:function () {
          console.log(5);
        },
        methods:{
            imgObject:function (imgSrc) {
                return{
                    src: imgSrc || '//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png',
                    error: '//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png',
                    loading: '//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png'
                }
            },
            attention_yes(){
                var that = this
                var obj = {}
                obj.obj={
                    teacherId:window.teacherId
                }
                axios.post('/api/mg/content/course/follow',lay.strSign(obj))
                    .then(function (respone) {
                        if (respone.data.code == 0){
                            that.list.followStatus = 1
                            that.alert_yes = true
                            setTimeout(function () {
                                that.alert_yes = false
                            },2000)
                        } else {
                            alert('follow接口:'+respone.data.code)
                        }
                      console.log(respone)
                    })
                    .catch(function (error) {
                        console.log('error:',error)
                    });
            },
            attention_no:function () {
                this.alert_no = true
            },
            alert_btn_no: function () {
                this.alert_no = false
            },
            alert_btn_yes: function (){
                var that = this
                var obj = {}
                obj.obj={
                    teacherId:window.teacherId
                }
                axios.post('/api/mg/content/course/unfollow',lay.strSign(obj))
                    .then(function (respone) {
                        if (respone.data.code == 0){
                            that.alert_no = false
                            that.list.followStatus = 0
                        }else{
                            alert('unfollow接口:'+respone.data.code)
                        }
                      console.log(respone)
                    })
                    .catch(function (error) {
                        console.log('error:',error)
                    });
            }
        }
    }
</script>
