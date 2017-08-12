<template>
  <!--顶部标题-->
  <div class="com-top-notopen" v-if='!inwx'>
    <img src="//pic.davdian.com/free/2017/02/08/488_504_e8ca7ca5713b5b9791ca85cab02e4134.png">
  </div>
</template>

<script>
  import ua from '../common/js/module/ua.js';
  import native from '../common/js/module/native.js';
  import { isInisWechatOrApp } from "../../utils/utils.es6";

  export default {
    data() {
      return {
        inwx:true
      }
    },
    computed: {},
    created(){
    },
    mounted() {
      this.inwx = isInisWechatOrApp()
    },
    methods: {
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" scoped>
  .com-top-notopen{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 2000;
    text-align: center;
    img{
      width: 240px;
      margin-top: 100px;
    }
  }
</style>
