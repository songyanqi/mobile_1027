<template>
    <div class="top0">
        <div class="top_container">
            <!--top_back改为a标签，如果有上一页链接地址改为 javascript:history.back();或者你想执行的语句，否则链接改为真正的链接-->
            <div class="top_left">
                <a class="top_back" href="javascript:history.back();">
                    <span class="home_arrow"></span>
                </a>
            </div>
            <div class="title_container">
                订单列表
            </div>
            <div class="top_right">
                <a href="/" class="top_home">
                    <span class="home_icon"></span>
                </a>
            </div>
        </div>
    </div>
    <orderlistswitcher>

    </orderlistswitcher>
</template>

<script>
    var orderlistswitcher = require("../module/orderlistswitcher.vue");
    export default{
        components:{
            orderlistswitcher:orderlistswitcher
        }
    }
</script>