<!--模板-->
<template>
  <div class="group-bottom-btns">
    <div class="top-line"></div>
    <div class="btns">
      <template v-for="btn in btnArray">
        <!--微信登录-->
        <!--<a v-if="btn.btnUrl" @click="click(btn)" :href="(btn.btnType == 'new' || btn.btnType == 'join' || btn.btnType == 'pay') && isLogin === 0 ? (isWechat ? 'http://open.'+(window.location.host).split('.')[1]+'.'+(window.location.host).split('.')[2]+'/WechatLogin/index?referer=' + encodeURIComponent(location.href) : '/login.html?referer='+encodeURIComponent(location.href)) : btn.btnUrl">{{btn.btnTxt}}</a>-->
        <a v-if="btn.btnUrl" @click="click(event, btn)"
           :href="(btn.btnType == 'new' || btn.btnType == 'join' || btn.btnType == 'pay') && isLogin === 0 ? '/login.html?referer='+encodeURIComponent(location.href) : btn.btnUrl">{{btn.btnTxt}}</a>
        <a v-if="!btn.btnUrl" @click="click(event, btn)">{{btn.btnTxt}}</a>
      </template>
    </div>
  </div>
</template>

<!--组件定义-->
<script>
  import layout from '../../../../module/index/layout.es6';
  import share from '../../../common/js/module/share.js';
  import popup from '../../../common/js/module/popup.js';

  export default {
    components: {},
    props: {
      btnArray: Array,
      isLogin: {
        type: Number,
        default: 0
      },
      isIntercept: {
        type: String,
        default: '0'
      }
    },
    data: function () {
      return {
//        isWechat: window.Units.isWechat()
      }
    },
    computed: {},
    created: function () {
    },
    mounted: function () {
    },
    methods: {
      click(event, btn){
        let ts = this;
        debugger
        // 埋点
        let action_type = {
          more: 5,
          new: 4,
          share: 3,
        }[btn.btnType];
        if (action_type) {
          try {
            layout.statistics({
              production: 12,
              action: 1,
              action_type: action_type,
            });
          } catch (error) {
            console.log(error);
          }
        }

        // 喊人参团
        if (btn.btnType == 'share') {
          share.callShare();
        }

//        popup.toast('该团所属店铺已无效，可能会影响您正常购买，请参加其它的团吧～');
//        event.preventDefault();

        // 喊人参团
        if (ts.isIntercept === '1' && (btn.btnType == 'join' || btn.btnType == 'pay')) {
//          popup.alert('该团所属店铺已无效，可能会影响您正常购买，请参加其它的团吧～', function () {
//            location.href = '/group_list.html';
//          });
          popup.toast('该团所属店铺已无效，不能正常参团，为了不影响您正常购买，如已下单请取消订单，参加其它的团吧～');
          event.preventDefault();
        }

      },
    },
  }
</script>


<!--样式-->
<style lang="sass" rel="stylesheet/scss">
  @import "../../../common/css/util/all";
  /*底部购买按钮*/
  .group-bottom-btns {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;

    .top-line {
      border-top: 1px solid #E3DFD8;
      transform: scaleY(0.5);
      transform-origin: bottom;
    }

    .btns {
      display: flex;

      a {
        flex: 1;
        @include height(ptr(50));
        font-size: ptr(14);
        text-align: center;
        background: #F9F7F8;
        color: #666666;

        &:last-of-type {
          background: linear-gradient(to right, #FF5B5B, #FA1862);
          color: white;
        }
      }
    }
  }
</style>
