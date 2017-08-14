<template>
  <div class="act-info">
    <!--活动标题-->
    <!--<div class="act-title">-->
      <!--<img src="[[static]]/page/act_818/img/title.png[[v]]">-->
    <!--</div>-->
    <!--活动今日信息-->
    <div class="act-today-info">
      <div class="text">
      <template v-if="response.data.surplus > 0">
        仅剩&nbsp;<span class="num">{{response.data.surplus}}</span>&nbsp;个活动名额
      </template>
      <template v-else>
        没有活动名额啦~
      </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      response: {
        type: Object,
        default: null
      },
      todayInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {}
    },
    computed: {},
    created(){
    },
    mounted() {
    },
    methods: {},
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

</style>
