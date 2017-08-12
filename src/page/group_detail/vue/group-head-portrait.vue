<!--团购列表-->
<template>
  <span class="group-head-portrait" @click="click">
    <img v-if="type == 'normal' || type == 'leader'" class="person" v-lazy="src">
    <img v-if="type == 'empty'" v-lazy="'http://pic.davdian.com/free/2017/03/25/group-head-unknow.png'">
    <a :href="href" v-if="type == 'more'">
      <img v-lazy="'http://pic.davdian.com/free/2017/03/25/group-head-more.png'">
    </a>
    <i v-if="type == 'leader'" class="group-leader"></i>
  </span>
</template>

<script>
  export default {
    components: {},
    props: {
      type: {
        type: String,  // 'normal' | 'leader' | 'empty' | 'more'
        default: 'normal'
      },
      src: {
        type: String,
        default: ''
      },
      href:{
        type: String,
        default: ''
      }
    },
    data: function () {
      return {}
    },
    computed: {},
    created: function () {
    },
    mounted: function () {
    },
    methods: {
      click(){
        this.$emit('click');
      }
    }
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .group-head-portrait {
    position: relative;
    margin: 0 ptr(5);
    display: inline-block;
    font-size: 0;
    img {
      @include circle(ptr(30));
    }
    .person{
      background: url(http://pic.davdian.com/free/default_head_icon_0419.png) no-repeat;
      background-size: 100%;
    }
    .group-leader {
      position: absolute;
      right: ptr(-5);
      bottom: 0;
      display: inline-block;
      width: ptr(26);
      height: ptr(13);
      background: url(http://pic.davdian.com/free/2017/03/25/group-leader-icon.png) no-repeat;
      background-size: 100%;
    }
  }
</style>
