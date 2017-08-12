<template>
  <div class="menu_wrap">
    <div class="menu_item">
      <span :class="{hot:!clear,history:clear}">{{hhlist_name}}:</span>
      <span v-if="clear" class="child pull-right" @click="clearhistory">清空</span>
    </div>
    <div class="child_list">
      <a v-if="clear" v-for="lis in item_list" @click="searchs(lis,'')">{{lis}}</a>
      <a v-if="!clear" v-for="lis in item_list" :style="{color:lis.colorType}"
        @click="searchs(lis.name,lis.command.content)">
        {{lis.name}}
      </a>
    </div>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {}
    },
    props: ["hhlist_name", "clear", "item_list"],
    created: function () {

    },
    methods: {
      clearhistory: function (e) {
        e.preventDefault();
        this.$emit("transferclear");
      },
      searchs: function (msg, url) {
        if (this.clear) {
          window.bravetime.tj.pvSend('search_history_click', '');
        } else {
          window.bravetime.tj.pvSend('search_hotword_click', '');
        }
        if (url != '') {
          window.location.href = url
        } else {
          this.$emit("transfertsearchs", msg);
        }
      }
    }
  }
</script>
<style scoped>
  .menu_wrap {
    padding: 10px 0;
    background-color: #FFFFFF;
  }

  .menu_item {
    display: block;
    padding-left: 10px;
  }

  .menu_item span {
    display: inline-block;
    height: 20px;
    background-size: 16px 16px;
    background-position: 0px 2px;
    background-repeat: no-repeat;
    padding-left: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .menu_item .child {
    padding-right: 10px;
    font-size: 12px;
    color: #999999;
  }

  .child_list a {
    display: block;
    float: left;
    font-size: 14px;
    color: #666666;
    background-color: #F8F8F8;
    padding: 5px 13px;
    border-radius: 14px;
    margin: 5px;
    cursor: pointer;
    max-width: 122px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .child_list {
    clear: both;
    padding: 5px;
    overflow: hidden;
  }

  .hot {
    background-image: url("//pic.davdian.com/free/2017/05/04/hot.png");
  }
  .history {
    background-image: url("//pic.davdian.com/free/2017/05/04/history.png");
  }
</style>
