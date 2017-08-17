<template>
  <div>
    <notopen></notopen>
    <index_feed :data="data"></index_feed>
  </div>
</template>
<script>
  import index_feed from '../../../../module/index/index_feed.vue'
  import notopen from "../../../component/com-wx-notopen.vue"
  export default {
    components:{
      index_feed:index_feed,
      notopen:notopen
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
