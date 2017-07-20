<template lang="html">
    <div class="commonList-container">
        <div class="class_introduce_con" v-for="common in commonList">
            <div class="comment_tit">
                <img  class="img" :src="common.speaker.avatar" alt="">
                <div class="comment_dis">
                    <span class="commentname">{{common.speaker.name}}</span>
                    <span>{{common.msg.time}}</span>
                </div>
            </div>
            <div class="class_introduce_text">
                <p>{{common.msg.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        data () {
            return {
                commonList:[],
                commonShow:this.commonShow
            }
        },
        ready:function(){
            var that = this;
            $.ajax({
                url:"/api/content/course/room/teacher/message",
                dataType:"json",
                success:function (res) {
                    if(res.code==0){
                        alert("ok");
                        var resData = [];
                        try {
                            resData = JSON.parse(res.data.message.dataList);
                        }catch (e) {
                            resData = res.data.message.dataList;
                        }
                        console.log(resData.length);
                        that.commonList=resData.slice(0);
                        console.log(that.commonList[5].msg.content)
                    }
                },error:function () {
                    bravetime.ajaxError();
                }
            });
        },
        computed: {},
        mounted:{

        },
        methods: {},
        components: {}
    }
</script>

