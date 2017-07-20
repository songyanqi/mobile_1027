<template>
    <div class="dav-buyer-bottom clearfix">
        <div class="bottom-menu">
            <a class="menu-item" :class="{'active':active==0}" :href="active==0?'javascript:void();':'./'" data-dav-tj="{{page}}|index|index|1|index@{{page}}">
                <i class="icon dav_icon_home_44_40" :class="{'active':active==0}" ></i>
                <div class="menu-text">首页</div>
            </a>
            <a class="menu-item" :class="{'active':active==1}" :href="active==1?'javascript:void();':'./course.html'" data-dav-tj="{{page}}|category_search|index|1|index@{{page}}">
                <i class="icon dav_icon_search_44_40" :class="{'active':active==1}" ></i>
                <div class="menu-text" style='margin-top:-1px'>学院</div>
            </a>
            <a class="menu-item" :class="{'active':active==2}" :href="active==2?'javascript:void();':'./cart.html'" data-dav-tj="{{page}}|cart|cart|1|cart@{{page}}">
                <i class="icon dav_icon_cart_44_40" :class="{'active':active==2}" ></i>
                <div class="menu-text">购物车</div>
                <b v-if='cart' v-text="cart"></b>
            </a>
            <a class="menu-item" :class="{'active':active==3}" :href="active==3?'javascript:void();':'./center.html'" data-dav-tj="{{page}}|user|user|1|user@{{page}}">
                <i class="icon dav_icon_me_44_40" :class="{'active':active==3}" ></i>
                <div class="menu-text">我的</div>
            </a>

        </div>
    </div>
</template>
<style>
    .dav_icon_cart_44_40{
        background-size: 24px;
        background-image: url("//pic.davdian.com/free/new_shoppingCartBtm_0803.png");
    }

    .dav_icon_cart_44_40.active{
        background-size: 24px;
        background-image: url("//pic.davdian.com/free/new_shoppingCartBtmActive_0803.png");
    }
    .dav_icon_home_44_40{
        background-size: 24px;
        background-image: url("//pic.davdian.com/free/new_home_0803.png");
    }
    .dav_icon_home_44_40.active{
        background-size: 24px;
        background-image: url("//pic.davdian.com/free/new_homeActive_0803.png");
    }

    .dav_icon_me_44_40{
        background-size: 24px;
        background-image: url("//pic.davdian.com/free/new_mine_0803.png");
    }

    .dav_icon_me_44_40.active{
        background-size: 24px;
        background-image: url("//pic.davdian.com/free/new_mineActive_0803.png");
    }

    .dav_icon_search_44_40{
        background-size: 22px;
        margin-left: 2px;
        margin-top: 1px;
        background-image: url("//pic.davdian.com/free/2017/05/11/footer_course1.png");
    }

    .dav_icon_search_44_40.active{
        background-size: 22px;
        margin-left: 2px;
        margin-top: 1px;
        background-image: url("//pic.davdian.com/free/2017/05/11/footer_course2.png");
    }
</style>
<script>
    export default{
        props: {
            active:0,
            cart:0
        },
        data(){
            return{
                msg:'hello vue',
                page:window.tj_path
            }
        },
        components:{
        }
    }
</script>
