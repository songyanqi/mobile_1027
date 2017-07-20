<template>
    <div class="time">{{timeStr}}</div>
</template>
<style>

</style>
<script>

    export default{
        props: ['time'],
        data(){
            return{
                timeStr:""
            }
        },
        methods:{
            format(second){
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
            }
        },
        ready:function () {
            let that = this;
            that.timeStr = that.format(that.time);
            setInterval(function () {
                that.time = that.time -1;
                that.timeStr = that.format(that.time);
            },1000);
        }
    }
</script>
