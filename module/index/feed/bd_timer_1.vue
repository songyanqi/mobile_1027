<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop}">

        <tt_com_0 :data="data"></tt_com_0>

        <div class="df_new_model_con" :style="styleObject">
            <div class="clearfix" style="padding:10px 7.5px 7.5px 7.5px;">
                <div class="dvd-col-12 need_js_height_seckill" style="overflow: hidden;">
                    <div class="dvd-new-index-module-child dvd-col-6" style="padding: 0 0.025rem 0 2.5px;box-sizing: border-box;height: 1.81rem;overflow: hidden;">
                        <a :href="data.body.dataList[0].command.content" @click.stop="clickAnalysis" position="0" style="height: 1.81rem;">
                            <div class="seckillCountdown seckill2" v-if = "seckillTime >= -1">
                                <span class="seckill_bg">{{ hours }}</span>
                                <span class="seckill_semicolon">:</span>
                                <span class="seckill_bg">{{ minutes }}</span>
                                <span class="seckill_semicolon">:</span>
                                <span class="seckill_bg">{{ seconds }}</span>
                            </div>
                            <img class="newImage" style="height: 1.81rem;border-radius: 3px;" v-lazy="imgObject(data.body.dataList[0].imageUrl)">
                        </a>
                    </div>

                    <div class="dvd-new-index-module-child dvd-col-6" style="margin-bottom:0.05rem;padding: 0 0.025rem;box-sizing: border-box;height: 0.88rem;overflow: hidden;">
                        <a :href="data.body.dataList[1].command.content" @click.stop="clickAnalysis" position="1"  style="height: 0.88rem;">
                            <img class="newImage" style="height: 0.88rem;" v-lazy="imgObject(data.body.dataList[1].imageUrl)">
                        </a>
                    </div>

                    <div class="dvd-new-index-module-child dvd-col-6" style="padding: 0 0.025rem;box-sizing: border-box;height: 0.88rem;overflow: hidden;">
                        <a :href="data.body.dataList[2].command.content" @click.stop="clickAnalysis" position="2" style="height: 0.88rem;">
                            <img class="newImage" style="height: 0.88rem;" v-lazy="imgObject(data.body.dataList[2].imageUrl)">
                        </a>
                    </div>
                </div>

                <div class="dvd-new-index-module-child dvd-col-6" style="margin: 0.05rem 0 2.5px 0;padding: 0 0.025rem 0px 2.5px;box-sizing: border-box;height: 0.88rem;overflow: hidden;">
                    <a :href="data.body.dataList[3].command.content" @click.stop="clickAnalysis" position="3" style="height: 0.88rem;">
                        <img class="newImage" style="height: 0.88rem;" v-lazy="imgObject(data.body.dataList[3].imageUrl)">
                    </a>
                </div>
                <div class="dvd-new-index-module-child dvd-col-6" style="margin: 0.05rem 0 2.5px 0;padding: 0 0.025rem 0px 0.025rem;box-sizing: border-box;height: 0.88rem;overflow: hidden;">
                    <a :href="data.body.dataList[4].command.content" @click.stop="clickAnalysis" position="4" style="height: 0.88rem;">
                        <img class="newImage" style="height: 0.88rem;" v-lazy="imgObject(data.body.dataList[4].imageUrl)">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//    import './bd_timer_1.scss'
    import bd_timer from './bd_timer_1.es6'
    export default bd_timer
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_timer_1.scss";
</style>
