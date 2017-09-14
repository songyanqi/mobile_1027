<template>
  <!--底部菜单栏-->
  <div class="com-footer" v-if="!isDvdApp">
    <div class="btns">
      <a class="btn" :class="{active: active == 'home'}" href="/" :style="styleList['btn1']">
        <div class="pic-title">
          <img class="pic" src="//pic.davdian.com/free/footer-icon/home-active.png" v-if="active == 'home'" :src="btnList[0].selectedImage">
          <img class="pic" src="//pic.davdian.com/free/2017/09/13/home@2x.png" v-else :src="btnList[0].defaultImage">
          <div class="title">首页</div>
        </div>
      </a>
      <a class="btn" :class="{active: active == 'school'}" href="/course.html"  :style="styleList['btn2']">
        <div class="pic-title">
          <img class="pic" src="//pic.davdian.com/free/footer-icon/school-active.png" v-if="active == 'school'" :src="btnList[1].selectedImage">
          <img class="pic" src="//pic.davdian.com/free/footer-icon/school.png" v-else :src="btnList[1].defaultImage">
          <div class="title">学院</div>
        </div>
      </a>


      <a class="btn" v-if="btnList[2]" :style="styleList['btn3']" :href="styleList['showUrl']">
        <img class="pic" v-if="active == 'dynamic'" :src="btnList[2].selectedImage">
        <img class="pic" v-else :src="btnList[2].defaultImage">
      </a>


      <a class="btn" :class="{active: active == 'dynamic'}" href="/articles.html"  :style="styleList['btn4']">
        <div class="pic-title">
          <img class="pic" src="//pic.davdian.com/free/footer-icon/dynamic-active.png?2" v-if="active == 'dynamic'" :src="btnList[3].selectedImage">
          <img class="pic" src="//pic.davdian.com/free/footer-icon/dynamic.png?2" v-else :src="btnList[3].defaultImage">
          <div class="title">动态</div>
        </div>
      </a>
      <a class="btn" :class="{active: active == 'center'}" href="/center.html"  :style="styleList['btn5']">
        <div class="pic-title">
          <img class="pic" src="//pic.davdian.com/free/footer-icon/center-active.png" v-if="active == 'center'" :src="btnList[4].selectedImage">
          <img class="pic" src="//pic.davdian.com/free/footer-icon/center.png" v-else  :src="btnList[4].defaultImage">
          <div class="title">我的</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import ua from '../common/js/module/ua.js';
  import encrypt from '../common/js/module/encrypt.js';

  export default {
    props: {
      // 取值范围 home school dynamic center
      active: {
        type: String,
        default: 'home'
      },
      cartNum: {
        type: Number,
        default: 0
      },
      bottomTab: {
        type: Array,
        default: []
      },
      bottomStyle: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        isDvdApp: ua.isDvdApp(),
      }
    },
    computed: {
        btnList:function () {
          return this.bottomTab;
        },
        styleList:function () {
          return this.bottomStyle;
        }
    },
    created(){
    },
    mounted() {

    },
    methods: {
      /**
       * 接口名称:
       * 接口文档:
       */
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/m/index/cart?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({}),
          success(response) {
            ts.response = response;
          },
          error(error) {
//            ts.response = require('../json/center.json');
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";

  // 底部菜单栏
  .com-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    font-size: 0;
    max-width: $pageMaxWidth;
    &:before {
      content: '';
      display: block;
      width: 100%;
      border-top: 1px solid #E3DFD8;;
      transform: scaleY(0.5);
    }
    .btns {
      display: flex;
      height: 50px;
      .btn {
        flex: 1;
        display: block;
        text-align: center;
        .pic-title {
          position: relative;
          display: inline-block;
          .pic {
            display: inline-block;
            width: 50px;
            height: 50px;
            .num {
              position: absolute;
              top: 0;
              right: -8px;
              @include circle(16px);
              background: #FF4A7D;
              font-size: 10px;
              color: white;
              font-style: normal;
            }
          }
          .title {
            position: absolute;
            top: 30px;
            width: 100%;
            line-height: 14px;
            font-size: 10px;
            color: #999;
          }
        }
        &.active {
          .pic-title {
            .pic {
              .num {
              }
            }
            .title {
              color: #FF4A7D;
            }
          }
        }

      }
    }
  }
</style>
