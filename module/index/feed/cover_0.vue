<template>
    <div class="cover_0" :style="styleObject" >
        <img :src="data.body.imgUrl">
    </div>
</template>
<script>
//import './cover_0.scss'
export default {
    data(){
        return {
            msg: 'hello vue'
        }
    },
    props: ['data'],
    created:function(){
    },
    computed: {
        styleObject: function () {
            let scope = this;
            return {
                marginTop: scope.data.marginTop + 'px'
            }
        }
    }
}
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./cover_0.scss";
</style>
