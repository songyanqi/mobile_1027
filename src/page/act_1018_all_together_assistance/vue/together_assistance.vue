<template>
  <div style="font-weight: normal;" class="assistance_box"  v-if="response">
    <!--times-->
    <div class="dtime">
      <img src="//pic.davdian.com/free/2017/09/14/qiqiuqiu.png" alt="">
    </div>
    <!--商品信息-->
    <div class="goods_info">

    </div>
    <!--板-->
    <div class="rule_brand">
      <img src="//pic.davdian.com/free/2017/09/14/table_brand.png" alt="">
    </div>
  </div>
</template>
<script>
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import ua from '../../../common/js/module/ua.js';
  import native from '../../../common/js/module/native.js';
  // 业务模块
  import vueLazyload from '../../../common/js/module/vueLazyload.js';

  vueLazyload.init(true);
  export default {
    props: {},
    data() {
      return {
        moke:'http://www.easy-mock.com/mock/59b92127e0dc663341a8cccd',
        response: null
      }
    },
    components: {},
    computed: {

    },
    watch: {
      // 监听response变化
      response(){
        // response变化后并渲染完dom,设置其他事项
        this.$nextTick(function () {
          let ts = this;
          // 设置分享信息
          try {
//            native.custom.setShareInfo({
//              "title":ts.shareInfo.title,
//              "desc": ts.shareInfo.desc,
//              "imgUrl": ts.shareInfo.imgUrl,
//              "link": ts.shareInfo.link,
//              "shareDesc":ts.shareInfo.desc
//            });
          } catch (err) {
            console.error(err);
          }
        });
      }
    },
    created() {
      this.getData();
    },
    mounted() {

    },
    methods: {
      /**
       * 接口名称:
       * 接口文档:
       */
      getData() {
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: this.moke+'/api/mg/sale/userHelpBuy/getHelpGoodsDetail?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({goodsId: ts.goodsId}),
          success(response) {
            ts.response = response;
          },
          error(error) {
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },

    },
    filters: {

    },
  }
</script>
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  .assistance_box{
    background: -webkit-linear-gradient(top, #F54B74, #FF9F8F);
    background: -webkit-gradient(linear, top top, bottom bottom, from(#F54B74), to(#FF9F8F));
    background: -webkit-linear-gradient(top, #F54B74, #FF9F8F);
    background: linear-gradient(to bottom, #F54B74, #FF9F8F);
    width: 100%;
    height: 1000px;
  }
  .dtime{
    img{
      width: 100%;
      display: block;
    }
  }
  .goods_info{
    height: 100px;
    position: relative;
    margin: 0 10px 10px;
  }
  .goods_info:after{
    content: "";
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    width: 200%;
    height: 200%;
    border: #FFFFFF solid 1px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 8px;
  }
  .rule_brand{
    img{
      width: 100%;
    }
  }
</style>
