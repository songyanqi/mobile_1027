<template>
    <div class="top0">
        <div class="top_container">
            <div class="top_left" style="width: 40px">
                <a class="top_back" @click='back'>
                    <span class="home_arrow"></span>
                </a>
            </div>
            <div class="title_container">
                {{data||msg}}
            </div>
            <div class="top_right" style="width: 60px;height: 44px;line-height: 44px;">
                    <span style='color:#D0D0D0;' v-if='!rightshow' @click='submit'>提交</span>
                    <span style='color:#FF4A7D;' v-if='rightshow' @click='submit1'>提交</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:['data','rightshow'],
        data:function(){
            return{
                msg:document.title,
            }
        },
        methods:{
            submit(){
                this.$emit('submit', false)
            },
            submit1(){
                this.$emit('submit', true)
            },
            back(){
                this.$emit('back')
            }
        },
        ready: function () {
        }
    }
</script>