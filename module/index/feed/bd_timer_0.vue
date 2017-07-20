<template>
    <div class="hot_activity_cotnainer index_model" :style="{ marginTop:data.marginTop }">

        <tt_com_0 :data="data"></tt_com_0>

        <div class="df_new_model_con">
            <div class="clearfix">
                <div class="dvd-col-12" style="height: 2rem; overflow: hidden;">
                    <div class="dvd-new-index-module-child dvd-col-6" style="height: 2rem;overflow: hidden;" >
                        <a  @click.stop="clickAnalysis" :href="data.body.dataList[0].command.content"  style="height: 2rem;" position="0">
                            <div class="seckillCountdown" v-if="seckillTime >= -1">
                                <span class="seckill_bg">{{ hours }}</span>
                                <span class="seckill_semicolon">:</span>
                                <span class="seckill_bg">{{ minutes }}</span>
                                <span class="seckill_semicolon">:</span>
                                <span class="seckill_bg">{{ seconds }}</span></div>
                            <!-- <img class="newImage" style="height: 2rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/374_400_9dd7740d145f63fcc1bb45acd3ca5562.png" :data-original="data.body.dataList[0].imageUrl"> -->
                            <img class="newImage" style="height: 2rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[0].imageUrl)">

                            <div class="right_border"  :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="dvd-new-index-module-child dvd-col-6">
                        <div class="dvd-col-12 " style="height:1rem;overflow: hidden;" :style="styleObject">
                            <a :href="data.body.dataList[1].command.content" @click.stop="clickAnalysis"  style="height: 1rem;"  position="1">
                                <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/374_200_8f1bcdbd06f1e4345047fb3bfad2741d.png" :data-original="data.body.dataList[1].imageUrl"> -->
                                <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[1].imageUrl)">
                            </a>
                        </div>
                        <div class="dvd-col-12" style="height:1rem;overflow: hidden;">
                            <div class="dvd-new-index-module-child dvd-col-6" :style="styleObject">
                                <a :href="data.body.dataList[2].command.content" @click.stop="clickAnalysis"  style="height: 1rem;" position="2">
                                    <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/186_200_fbaa0fc666e72f32a471934ce7621324.png" :data-original="data.body.dataList[2].imageUrl"> -->
                                    <img class="newImage" style="height: 1rem;overflow: hidden;"
                                         v-lazy="imgObject(data.body.dataList[2].imageUrl)">
                                    <div class="right_border"  :style="styleObject"></div>
                                    <div class="top_border"  :style="styleObject"></div>
                                </a>
                            </div>
                            <div class="dvd-new-index-module-child dvd-col-6" style="height:1rem;overflow: hidden;" :style="styleObject">
                                <a :href="data.body.dataList[3].command.content" @click.stop="clickAnalysis"  style="height: 1rem;" position="3">
                                    <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/186_200_fbaa0fc666e72f32a471934ce7621324.png" :data-original="data.body.dataList[3].imageUrl"> -->
                                    <img class="newImage" style="height: 1rem;overflow: hidden;"
                                         v-lazy="imgObject(data.body.dataList[3].imageUrl)">
                                    <div class="top_border"  :style="styleObject"></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dvd-col-12">
                    <div class="dvd-new-index-module-child dvd-col-6"  style="height:1rem;overflow: hidden;" :style="styleObject">
                        <a :href="data.body.dataList[4].command.content" @click.stop="clickAnalysis" position="4" style="height: 1rem;">
                            <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/374_200_8f1bcdbd06f1e4345047fb3bfad2741d.png" :data-original="data.body.dataList[4].imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[4].imageUrl)">
                            <div class="top_border"  :style="styleObject"></div>
                            <div class="right_border"  :style="styleObject"></div>
                        </a>
                    </div>
                    <div class="dvd-new-index-module-child dvd-col-6" style="height:1rem;overflow: hidden;" :style="styleObject">
                        <a :href="data.body.dataList[5].command.content" @click.stop="clickAnalysis" position="5" style="height: 1rem;">
                            <!-- <img class="newImage" style="height: 1rem;overflow: hidden;" src="//pic.davdian.com/free/2016/12/07/374_200_8f1bcdbd06f1e4345047fb3bfad2741d.png" :data-original="data.body.dataList[5].imageUrl"> -->
                            <img class="newImage" style="height: 1rem;overflow: hidden;" v-lazy="imgObject(data.body.dataList[5].imageUrl)">
                            <div class="top_border"  :style="styleObject"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './bd_timer_0.scss'
    import bd_timer from './bd_timer_0.es6'
    export default bd_timer;
</script>
