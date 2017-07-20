<template>
  <div>
    <a v-for="item in datalist" class="user_menu_item" :href="item.url"
       :data-dav-tj="'setting|'+item.tj_id+'|'+item.tj_id+'|1|'+item.tj_id+'@setting'">
      <span>{{item.name}}</span>
      <span class="child pull-right">
        <i class="icon dav_icon_dayuhao_18_38"></i>
      </span>
      <span v-if="item.hasOwnProperty('bind')" class="f12 pull-right">{{item.bind == "" ? '未绑定' : item.bind}}</span>
    </a>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {

      }
    },
    props: ['datalist']
  }
</script>
<style scoped>
  .user_menu_item {
    display: block;
    line-height: 40px;
    padding-left: 10px;
    margin-bottom: 1px;
    background: #fff;
  }

  .user_menu_item span {
    display: inline-block;
    height: 41px;
  }
  .user_menu_item .f12 {
    font-size: 12px;
    color:#999999;
    max-width: 180px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .user_menu_item .child {
    overflow: hidden;
  }

  .user_menu_item .child i.icon {
    display: inline-block;
    vertical-align: 0;
    width: 8px;
    height: 8px;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-right: 10px;
    background: none;
  }
</style>
