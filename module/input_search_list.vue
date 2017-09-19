<template>
  <div class="search_like fix">
    <ul class="like_list">
      <li v-for="item in searchlist">
        <a v-text="item" @click="searchs(item)"></a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .search_like {
    top: 44px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
<script>
  import layout from "./index/layout.es6";
  export default{
    data: function () {
      return {}
    },
    props: ["searchlist"],
    created: function () {

    },
    methods: {
      searchs: function (msg) {
        // window.bravetime.tj.pvSend('search_linklike_click', '');
        var data = {
          production:"14",
          action:"1",
          action_type:"0",
          objectId:"0",
          keyword:msg
        };
        layout.statistics(data);
        this.$emit("transferlinklike", msg);
      }
    }
  }
</script>
