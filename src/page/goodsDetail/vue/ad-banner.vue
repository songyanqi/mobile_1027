<template>
  <div class="ad-banner">
    <a :href="adUrl || data && data.body.dataList.command.content" @click="jump">
      <img :src="adImg || data && data.body.dataList.imageUrl">
    </a>
  </div>
</template>

<script>
  import native from '../../../common/js/module/native.js';
  import ua from '../../../common/js/module/ua.js';

  export default {
    props: {
      adImg: {
        type: String,
        default: ''
      },
      adUrl: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default: null
      },
    },
    data() {
      return {}
    },
    computed: {},
    created(){
    },
    mounted() {
    },
    methods: {
      jump(event){
        if (ua.isDvdApp()) {
          event.preventDefault();
          native.Browser.open({
            url: event.currentTarget.href,
          });
        }
      }
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .ad-banner {
    margin-top: 10px;
    img {
      width: 100%;
    }
  }
</style>
