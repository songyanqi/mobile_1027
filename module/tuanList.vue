<template>
    <div class="tuan_list">
        <a v-for="item in list"
           href="/{{item.goods_id}}.html"
           data-remain-second="{{item.left_second}}">
            <div class="tuan_img_container">
                <img data-original="{{item.group_img}}"
                     src="//pic.davdian.com/free/loading_750_328_v3.png">
            </div>
            <div class="tuan_info_container">
                <countdown-time :time="item.left_second"></countdown-time>
                <div class="tuan_item_icon"></div>
                <div class="tuan-other-info">
                    <div class="tuan_item_title">{{item.goods_name}}</div>
                    <div class="tuan_item_price">
                        <span>¥</span>
                        <span class="current_price">{{item.group_price}}</span>
                        <span class="market_price">¥{{item.market_price}}</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>
<style>

</style>
<script>
    var countdownTime = require('./countdownTime.vue');
    export default{
        props: {
            conifg:{}
        },
        data(){
            return{
                list:[]
            }
        },
        ready:function () {
            var that = this;
            $.ajax({
                url:this.conifg.url,
                dataType:"json",
                success:function (result) {
                    if(result.code){
                        bravetime.info(result.msg);
                    }else{
                        that.list = result.data;
                        that.$nextTick(function () {
                            $(".tuan_list").find("img[data-original]").lazyload({effect: "fadeIn", threshold: 100, failure_limit: 100})
                        });
                    }
                },error:function () {
                    bravetime.ajaxError();
                }
            })
        },
        components:{countdownTime}

    }
</script>
