<template>
    <div class="only_html" :style="styleObject" @click="clickAnalysis">
            <div v-html="data.body.html"></div>
    </div>
</template>
<script>
//    import './bd_web_0.scss'
    import bd_web_0 from './bd_web_0.es6'
    export default bd_web_0
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "./bd_web_0.scss";
</style>
