<style>
    .mask{
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 999;
        background-color: rgba(255, 255, 255, .9);
        text-align: center;
        padding: 20px 0;
    }
    .mask img{
        max-width: 100%;
        box-shadow: 0px 0px 20px rgba(105, 97, 79 ,0.5);
    }
    .share_text{
        color: #666;
    }
    .share_top_text{
        color: #666;
    }
    .share_top_text:before{
        content: "";
        display: block;
        clear: both;
    }
    .close{
        width: 30px;
        height: 30px;
        background-size: 17px;
        background-image: url(//pic.davdian.com/free/2016/12/21/close.png);
        background-repeat: no-repeat;
        background-position: center;
        float: right;
        margin-right: 12px;
    }
    .container{
        max-width: 640px;
        margin: 0 auto;
    }
    .img_container{
        padding: 10px;
        box-sizing: content-box;
    }
</style>
<template>
    <div class="inviteCart" v-show="showCard">
        <div class="mask">
            <div class="container">
                <div class="close" @click="closeCard"></div>
                <div class="share_top_text">长按保存图片</div>
                <!-- <div class="share_top_text" v-if="type==2">分享直播图片赚奖金</div> -->
                <div class="img_container" :style="styleObject">
                    <img :src="imgUrl" :style="styleObject">
                </div>
                <div class="share_text" v-if='type==2 && visitor==3 && income'>当好友通过您的分享报名课程,并<span class='share_text_span'>在您的店铺下单</span>,您便可获得<span class='share_text_span'>¥{{income}}</span>奖金</div>
                <div class="share_text" v-if='type==2 && visitor!=3 && income'>成为店主后,当好友在您的店铺报名该课程,您便可获得<span class='share_text_span'>¥ {{income}}<span>奖金</div>
                <div class="share_text" v-if='type!=2'>分享直播图片加人气</div>
            </div>
        </div>
    </div>
</template>
<script>
    import "./inviteCard.scss"
    import inviteCard from "./inviteCard_v1.es6"
    export default inviteCard
</script>




