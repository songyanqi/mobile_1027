<template>
  <!--按钮-->
  <div class="act-btn" @click="click">
    <div class="text">
      <template v-if="type === 'login'">去登录~</template>
      <template v-if="type === 'member'">成为会员</template>
      <template v-if="type === ''">去逛逛</template>
    </div>
  </div>
</template>

<script>
  import login from '../../../common/js/module/login';

  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      response: {
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
      click(){
        if (this.type === 'login') {
          login.goLoginPage();
        } else if (this.type === 'member') {
          location.href = '/index.php?c=ShopGoods&a=index&id=348';
        } else {
          if (this.response && this.response.data.actStatus == '2') {
            location.href = '/';
          } else {
            location.href = '/t-13295.html';
          }
        }
      }
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

</style>
