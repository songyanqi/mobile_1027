<template>
    <div class="title_0" :style="styleObject">
        <div v-text='data.body.title'></div>
        <div v-if='data.body.come && data.body.come != 0.00' class='title_o_come'>
            <i class='mui-price-rmb'>￥</i><span v-text='data.body.come'></span>
        </div>
    </div>
</template>
<style type="text/css">
    .title_o_come{
        margin-top: 15px;
        font-size: 18px;
        color: #FF4A7D;
    }
    .mui-price-rmb{
        font-family: arial;
        font-style: normal;
    }
</style>
<script>
import './title_0.scss'
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
