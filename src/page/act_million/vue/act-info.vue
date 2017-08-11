<template>
  <div class="act-info">
    <!--活动标题-->
    <div class="act-title">
      <!--<p>会员累计支付{{response.data.prize_amount}}元</p>-->
      <!--<p>最高返现50元</p>-->
      <img src="[[static]]/page/act_million/img/title.png[[v]]">
    </div>
    <!--活动进度-->
    <div class="act-step">
      <div class="money-list">
        <span class="money" :class="{current: todayInfo.no === 1}">返50</span>
        <span class="money" :class="{current: todayInfo.no === 2}">返40</span>
        <span class="money" :class="{current: todayInfo.no === 3}">返30</span>
        <span class="money" :class="{current: todayInfo.no === 4}">返30</span>
        <span class="money" :class="{current: todayInfo.no === 5}">返30</span>
        <span class="money" :class="{current: todayInfo.no === 6}">返30</span>
      </div>
      <div class="point-list">
        <template v-for="i in 6">
          <div class="point over" v-if="i < todayInfo.no"><img
            src="[[static]]/page/act_million/img/step-point-over.png[[v]]"></div>
          <div class="point current" v-if="i === todayInfo.no"><img
            src="[[static]]/page/act_million/img/step-point-current.png[[v]]"></div>
          <div class="point next" v-if="i > todayInfo.no"><img
            src="[[static]]/page/act_million/img/step-point-next.png[[v]]"></div>
        </template>
      </div>
      <div class="date-list">
        <span class="date" :class="{over: todayInfo.no > 1}">7.27</span>
        <span class="date" :class="{over: todayInfo.no > 2}">7.28</span>
        <span class="date" :class="{over: todayInfo.no > 3}">7.29</span>
        <span class="date" :class="{over: todayInfo.no > 4}">7.30</span>
        <span class="date" :class="{over: todayInfo.no > 5}">7.31</span>
        <span class="date" :class="{over: todayInfo.no > 6}">8.1</span>
      </div>
    </div>
    <!--活动今日信息-->
    <div class="act-today-info">
      今日返&nbsp;<span class="num">{{todayInfo.money}}</span>元&nbsp;&nbsp;&nbsp;
      <template v-if="response.data.surplus > 0">
        仅剩&nbsp;<span class="num">{{response.data.surplus}}</span>&nbsp;个活动名额
      </template>
      <template v-else>
        没有活动名额啦~
      </template>
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
