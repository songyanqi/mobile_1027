<!--团购列表-->
<template>
  <div class="group-state-icon" :class="type">
    <div class="circle">
      <div class="text">
        <template v-if="type == 'success'">组团</br>成功</template>
        <template v-if="type == 'wait'">等待</br>成团</template>
        <template v-if="type == 'fail'">组团</br>失败</template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
      }
    },
    props: {
      type: String,
    },
    components: {},
    methods: {},
    filters: {},
    computed: {
    },
    watch: {},
    created: function () {
    },
    mounted: function () {

    }
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .group-state-icon {
    $border-width: 2px;
    $color: #FFA81B;
    position: absolute;
    right: 0;
    bottom: 0;
    @include circle(ptr(40));
    border: $border-width solid $color;
    background: white;
    transform: rotate(-10deg);
    .circle {
      $border-width: 1px;
      position: absolute;
      top: - $border-width;
      left: - $border-width;
      @include circle(100%);
      transform: scale(0.85);
      border: $border-width solid $color;
    }
    .text {
      color: $color;
      font-size: ptr(12);
      line-height: 1.3;
      text-align: center;
      padding-top: ptr(4);
    }
    // 等待组团
    &.wait {
      $color: #FFA81B;
      border-color: $color;
      .circle {
        border-color: $color;
      }
      .text {
        color: $color;
      }
    }
    // 组团成功
    &.success {
      $color: #00C7BF;
      border-color: $color;
      .circle {
        border-color: $color;
      }
      .text {
        color: $color;
      }
    }
    // 组团失败
    &.fail {
      $color: #FF4A7D;
      border-color: $color;
      .circle {
        border-color: $color;
      }
      .text {
        color: $color;
      }
    }
  }
</style>
