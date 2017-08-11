<template>
    <div>
        <span v-if='data.title && data.title.name && data.title.name == "猜你喜欢"' id='tt_com_0_like'></span>
        <a v-if="show" :href="data.title.command.content" @click="clickAnalysis" position="0">
            <div  v-if = "data.title != undefined" class="df_new_title_2" :style="[styleObject,styleTop]">
                <span class="df_new_font new_span" v-if='data.title && data.title.name' v-text='data.title.name'></span>
                <!--<a  :href="data.title.btn.command.content">-->
                    <span class="more" v-if = "data.title.btn != undefined" style="width: 40px;display: inline-block;margin-top: -44px;">
                        <!-- <a  :href="data.title.btn.command.content" @click="clickAnalysis"> -->
                        <span v-if='data.title && data.title.btn && data.title.btn.name' v-text='data.title.btn.name'></span> <i class="dav_icon_arrow"></i>
                        <!-- </a> -->
                    </span>
            </div>
        </a>


        <div  v-if = "data.title != undefined && !show" class="df_new_title_2" :style="[styleObject,styleTop]">
            <span class="df_new_font new_span" v-if='data.title && data.title.name' v-text='data.title.name'></span>
            <span class="more" v-if = "data.title.btn != undefined" style="width: 40px;display: inline-block;margin-top: -44px;">
                <a  :href="data.title.btn.command.content" @click="clickAnalysis" position="0">
                    <span v-if='data.title && data.title.btn && data.title.btn.name' v-text='data.title.btn.name'></span> <i class="dav_icon_arrow"></i>
                </a>
            </span>
        </div>
    </div>
</template>

<script>
//    import './tt_com_0.scss'
    import tt_com_0 from './tt_com_0.es6'
    export default tt_com_0
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./tt_com_0.scss";
</style>
