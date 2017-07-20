<template>
    <div class="seriesCommentContainer" @click='gohref' :style="{'marginTop':data.marginTop + 'px'}">
        <span>听课笔记 <span v-if='data.body.notesNum'>（ <span v-text='data.body.notesNum'></span>  ）</span></span>
        <i class="icon"></i>
    </div>
</template>

<script>
    export default{
        props:['data'],
        data:function(){
            return{
                msg:document.title,
            }
        },
        methods:{
            gohref(){
                if (window.Units.isAndroid()){
                    if (window.Units.getAppVersion()<392 && window.Units.getAppVersion()!=0){
                        bravetime.newAlert("当前客户端版本过低，请升级后使用此功能")
                    }else {
                        window.location = this.data.body.command.content
                    }
                } else {
                    window.location = this.data.body.command.content
                }
                
            }
        },
        ready: function () {
        }
    }
</script>
<style scoped>
    .seriesCommentContainer{
        background: #fff;
        height: 44px;
        line-height: 44px;
        padding-left: 0.18rem;
        width: 100%;
        color:#666666;
        font-size: 0.14rem;
        position: relative;
        box-sizing: border-box;
    }
    .icon{
        display: inline-block;
        vertical-align: 0;
        width: 10px;
        height: 10px;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        background: none;
        top: 16px;
        position: absolute;
        right: 12px
    }
</style>