<template>
  <index_feed :data="data"></index_feed>
</template>
<script>
  import index_feed from '../../../../module/index/index_feed.vue'
  export default {
    components:{
      index_feed:index_feed
    },
    data(){
        return {
            data:[]
        }
    },
    created:function () {
        var result=require('../json/landingPage.json');
        this.data=result.data.feedList;

    }
  }
</script>
<style scoped>

</style>
