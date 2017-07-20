<template>
    <div id='userCommon'>
        <div class="mask" v-if="commonShow">
            <div class='mask_con_mask' @click="close_comment"></div>
            <div class="mask_con">
                <!--关闭按钮-->
                <div class="close" @click="close_comment">
                    <img src="//pic.davdian.com/free/2016/12/22/60_80_543e7ae3b77c0ce52ebeee2a210dbdf6.png" alt="">
                </div>
                <!--弹出层列表-->
                <div class="common" id="common">
                    <div class="scrollcon" id='scrollcon'>
                        <div class="commonList-container">
                            <div class="end" v-if="refreshtxt">拉取更多</div>
                            <div class="class_introduce_con" v-for="(common, index) in commonList" :key="common.uuid">
                                <div class="comment_tit">
                                    <img class="img" :src="common.speaker.avatar || defaultAvatar" alt="">
                                    <div class="comment_dis">
                                        <span class="commentname">{{decodeURIComponent(common.speaker.name)}}</span>
                                        <span  v-if="new Date()-common.msg.time < 60*60*12*1000">{{getTime(parseInt(common.msg.time))}}</span>
                                        <span  v-if="new Date()-common.msg.time >= 60*60*12*1000">{{getFullTime(parseInt(common.msg.time))}}</span>
                                    </div>
                                </div>
                                <div class="class_introduce_text">
                                    <p>{{decodeURIComponent(common.msg.content)}}</p>
                                </div>
                            </div>
                            <div class="commonbottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import layout from "../layout/api.es6";
    let axios = require("axios");
    require('es6-promise').polyfill();
    export default {
        props:['flag','data','getupdataflag','userCommonTop'],
        data(){
            return {
                refreshtxt:false,
                commonList:[],
                length:null,
                defaultAvatar:'//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png',

            }
        },
        created(){
        	
        },
        mounted(){
            this.$nextTick(function () {
                this.init()
                this.initScrool()
            })
            
        },
        computed:{
            commonShow: function () {
                return this.flag || false
            },
            commonList: function (){
                window.testData1 = this.data || []
                return this.data || []
            },
            updataflag: function () {
                return this.getupdataflag || false
            }
        },
        components: {

        },
        methods:{
            initScrool(){
                $('#scrollcon').on("scroll",function(){
                    if (document.getElementById('scrollcon').scrollTop > document.getElementById('scrollcon').scrollHeight - parseInt(document.body.clientHeight * 0.73) - 2){
                         document.getElementById('scrollcon').scrollTop = document.getElementById('scrollcon').scrollHeight - parseInt(document.body.clientHeight * 0.73) - 2
                    }
                    if (document.getElementById('scrollcon').scrollTop<1){
                        document.getElementById('scrollcon').scrollTop = 1
                    }
                });

            },
            close_comment() {
                this.$emit('closeusercomment', document.getElementById('scrollcon').scrollTop)
            },
            init(){
                var that = this
                if (that.userCommonTop>0){
                    document.getElementById('scrollcon').scrollTop = that.userCommonTop
                } else {
                    document.getElementById('scrollcon').scrollTop=document.getElementById('scrollcon').scrollHeight
                }
                this.scroolEvent()
            },
            scroolEvent(){
                var that = this
                $('#scrollcon').on("scroll",function(){
                    if (document.getElementById('scrollcon').scrollTop<100 && that.updataflag){
                        that.$emit('getupdata', that.updataflag)
                    }
                });
            },
            getTime: function (second) {
                var s = new Date(second).getSeconds();
                var m = new Date(second).getMinutes();
                var h = new Date(second).getHours();
                var str;
                if (h) {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                } else if (m) {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                } else {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                }
                return str;
            },
            getFullTime: function (second) {
                var y = new Date(second).getFullYear();
                var monthtime = new Date(second).getMonth();
                var daytime = new Date(second).getDate();
                var s = new Date(second).getSeconds();
                var m = new Date(second).getMinutes();
                var h = new Date(second).getHours();
                var str;
                var fullTime;
                if (h) {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                } else if (m) {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                } else {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                }
                fullTime = y + '年' + (monthtime + 1) + '月' + daytime + '日' + str;

                return fullTime

            },
        }
    }
</script>
<!-- 组建内改变全局css样式 -->
<style>
    
</style>
<!-- 组建内部css样式，不会改变全局样式 -->
<style lang='sass' scoped>
	@import "../../../stylesheet/yo/usage/core/reset";
	@import "../../../stylesheet/yo/usage/module/commonList";
    .mask{
        width: 100%;
        height: 100%;
        /*left: 50%;*/
        max-width: 640px;
        margin: 0 auto;
        position: fixed;
        z-index: 106;
        background: rgba(0,0,0,0.5);
        .mask_con{
          position: fixed;
          bottom:0;
          width:100%;
          z-index: 100;
          height:73%;
          background: #fff;
          .close{
            position:absolute;
            height:30px;
            width:30px;
            right:0;
            z-index:105;
            top:-40px;
            img{
              width:30px;
              height:40px;
            }
          }
          .common{
            height: 100%;
            overflow: hidden;
            .scrollcon{
                width: 100%;
                height: 100%;
                overflow: scroll;
                -webkit-overflow-scrolling: touch;
            }
          }
        }
    }
    .mask_con_mask{
        position: fixed;
        top: 0;
        width: 100%;
        height: 160px;
        z-index: 100;
    }
    .commonbottom{
        width: 100%;
        height: 10px;
    }
</style>