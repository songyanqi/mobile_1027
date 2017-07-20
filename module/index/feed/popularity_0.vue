<template>
    <a class="popularity_0" :style="styleObject" :href="data.body.command.content">
        <div class="date">
            <span>{{data.body.startTime}}</span>
        </div>
        <div class="hot">
            <i class="heart">
                <img src="//pic.davdian.com/free/2016/12/22/30_28_d3f6958c35fed5bc31b976f8cddb8244.png" alt="">
            </i>
            <span class="pv">{{data.body.pv}}人气</span>
            <div class="headpic">
                <div class="img" v-for="item in data.body.dataList">
                    <img :src="item.avatar" alt="">
                </div>
                </div>

        </div>
        <div class="getmore">
            <i class="icon"></i>
        </div>


    </a>
</template>
<script>
import "./popularity_0.scss";
export default {
    data(){
        return {
            msg: 'hello vue'
        }
    },
    props: ['data'],
    created:function(){
    },
    computed: {
        styleObject: function () {
            let scope = this;
            return {
                marginTop: scope.data.marginTop + 'px'
            }
        }
    }
}
</script>
