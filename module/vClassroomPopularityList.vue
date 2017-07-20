<style>
    .other_info{
        width:100%;
    }
    .unLoad{
        width: 100%;
        height: 400px;
        position: fixed;
        top: 180px;
        z-index: 101;
        max-width: 640px;
        color: #333;
    }
    .unLoad-img{
        width: 122px;
        height: 140px;
        top: 0;
        margin: auto;
        background: url('//pic.davdian.com/free/2016/12/08/no_sign.png') no-repeat;
        background-size: contain;
    }
    .unLoad-title{
        width: 150px;
        height: 20px;
        margin: 30px auto;
        text-align: center;
    }
    .unLoad-btn{
        width: 140px;
        height: 33px;
        text-align: center;
        line-height: 33px;
        margin: 20px auto;
        border: 1px solid #999999;
        border-radius: 2.5px;
    }
</style>
<template>
    <div>
        <Mine v-on:showed="show" v-if="showed" :showed="showed"></Mine>
        <list v-on:showed="show" v-if="showed" :showed="showed"></list>
        <div class="other_info">
            <div class='unLoad' v-if="!showed">
                <div class='unLoad-img'></div>
                <div class='unLoad-title'>网络异常，请重新加载</div>
                <div class='unLoad-btn' @click='getData'>点击重新加载</div>
            </div>
        </div>
    </div>
</template>

<script>
    var Mine = require("../module/vClassroomPopularityListMine.vue");
    var list = require("../module/vClassroomPopularityListOther.vue");
    export default{
        data:function () {
            return{
                showed:true,
            }
        },
        components:{
            Mine:Mine,
            list:list,
        },
        methods:{
            show:function () {
                this.showed = false;
            },
            getData:function () {
                this.showed = true;
            }
        }
    }
</script>