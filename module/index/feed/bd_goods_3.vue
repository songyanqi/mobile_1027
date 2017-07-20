<template>
    <div :style="{ marginTop:data.marginTop + 'px' }">
        <tt_com_0 :data = 'data'></tt_com_0>
        <div class="tuan_list">
            <a :href="data.body.dataList[0].command.content" :data-remain-second2="remainsecond"
               data-dav-tj="goods_group|good|good|1|good@goods_group">
                <div class="tuan_img_container">
                    <img v-lazy="imgObject(data.body.dataList[0].imageUrl)" style="display: block;">
                </div>
                <div class="tuan_info_container">
                    <div class="time1" v-if="remainsecond > 0">{{remainsecond | timeday}} </div>
                    <div class="time" v-if="remainsecond < 1">团购已结束</div>
                    <div class="tuan_item_icon"></div>
                    <div class="tuan-other-info">
                        <div class="tuan_item_title">
                            {{data.body.dataList[0].title}}
                        </div>
                        <div class="tuan_item_price">
                            <span class="current_price"><em>￥</em>{{data.body.dataList[0].nowPrice}}</span>
                            <span class="market_price"><em>￥</em>{{data.body.dataList[0].prePrice}}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
    Vue.filter('timeday', function(second) {
        var s = second % 60, m = Math.floor(second / 60) % 60,
            h = Math.floor(second / 60 / 60) % 24,
            d = Math.floor(second / 60 / 60 / 24);
        var str = '';
        if (d) {
            str = "剩 " + d + " 天" ;
        } else {
            str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        }
        return str;
    });
    import layout from "../layout.es6"
    import * as tt_com_0 from './tt_com_0.vue'
    export default {
        data(){
            return {
                msg: 'hello vue',
                timer:Date.parse(new Date())
            }
        },
        props: ['data'],
        created: function () {
            /**
             * 数据排序
             */
            layout.sort(this.data);
        },
        components:{
            tt_com_0:tt_com_0
        },
        mounted: function () {
            var that = this;
                window.tuanInterval2 = setInterval(function () {
                    that.data.body.dataList[0].endTimestamp = that.data.body.dataList[0].endTimestamp -1;
                }, 1000);
        },
        methods:{
            imgObject:function (imgSrc) {
                return{
                    src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                    error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                    loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
                }
            }
        },
        computed: {
            remainsecond: function () {
                var timestamp2 = this.timer;
                return this.data.body.dataList[0].endTimestamp - timestamp2/1000;
            }
        }
    }
</script>
<style scoped>
    /*团购样式*/
    .tuan_list {
        display: block;
        text-decoration: none;
        color: #333;
    }

    .tuan_list a {
        border-bottom: 1px solid #f0f0f0;
        display: block;
        position: relative;
    }

    .tuan_list a:last-child {
        border-bottom: none;
    }

    .tuan_img_container img {
        width: 100%;
        display: block;
        height: 43.75vw;
        max-height: 280px;
    }

    .tuan_info_container {
        position: absolute;
        width: 1.62rem;
        top: 0;
        right: 10px;
        height: 100%;
    }

    .tuan_list a .time {
        background-color: rgba(0, 0, 0, .3);
        line-height: normal;
        display: block;
        border-radius: .75rem;
        position: absolute;
        bottom: .14rem;
        left: 0;
        font-size: .12rem;
        padding: 0.01rem 0.05rem;
        color: #fff;
    }

    .tuan_list:hover, .tuan_list:focus {
        text-decoration: none;
        color: #333;
    }

    .tuan_item:hover, .tuan_item:focus {
        text-decoration: none;
        color: #333;
    }

    .tuan-other-info {
        margin-top: 0.15rem;
    }

    .tuan_item_title {
        text-overflow: ellipsis;
        white-space: pre-line;
        overflow: hidden;
        height: 0.62rem;
        line-height: 0.21rem;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        overflow: hidden;
        font-size: 0.14rem;
        color: #333;
    }

    .tuan_item_price {
        font-size: 0.11rem;
        color: #333;
        position: absolute;
        bottom: 0.39rem;
    }

    .tuan_item_price .current_price {
        font-size: 0.24rem;
        padding-right: 6px;
    }

    .tuan_item_price .market_price {
        text-decoration: line-through;
        color: #999;
    }

    .tuan_img_container img {
        width: 100%;
    }

    .tuan_item_icon {
        width: 0.3rem;
        height: 0.31rem;
        background: url(//pic.davdian.com/free/tuanlist_icon_3x_0804.png) no-repeat;
        background-size: 0.3rem;
        display: inline-block;
        position: absolute;
        bottom: 0.11rem;
        right: 2px;
    }
    .time1{
        background-color: rgba(0, 0, 0, .3);
        line-height: normal;
        display: block;
        border-radius: .75rem;
        position: absolute;
        bottom: .14rem;
        left: 0;
        font-size: .12rem;
        padding: 0.01rem 0.05rem;
        color: #fff;
    }
</style>