<template>
  <div>
    <!--<div class="img_container" v-if="environment==`menu`">-->
    <div class="img_container" v-if="environment=='menu'">
      <img src="http://pic.davdian.com/free/2017/01/16/750_164_29b5a5aaec2047c94c9154f3908bfdfc.png" alt="">
    </div>
    <div v-if="environment=='preview'" class="navigation_container">
      <ul class="navigation_menu" v-if="itemData.tab&&itemData.tab.length">
        <li v-for="(value,index) in itemData.tab" :key="index">
          <span v-text="value"></span>
        </li>
      </ul>
      <div v-else>导航位置</div>
    </div>

    <div v-if="environment=='show'" style="height:44px;max-width: 640px;">
      <sticky scroll-box="vux_view_box_body" :offset="offsetTop" :check-sticky-support="false">
        <tab :line-width="1" active-color="#ff4a7d" style="max-width: 640px">
          <tab-item @on-item-click="itemClickHandle"
                    :selected=" encodeURI(value).toString().replace(/%/g, '') === selectedName"
                    v-for="(value,index) in itemData.tab" :key="index" v-text="value">
            正在
          </tab-item>
        </tab>
      </sticky>
    </div>
  </div>
</template>
<script>
  import {Tab, TabItem, Sticky, Scroller} from 'vux';
  import Bus from '../js/bus.js';
  import ua from '../../../common/js/module/ua.js';
  export default {
    data(){
      return {
        selectedName: null,
        offsetTop:ua.isDvdApp()?0:44
      }
    },
    props: ['environment', "itemData"],
    components: {
      Sticky,
      Scroller,
      Tab,
      TabItem
    },
    mounted(){
      let that = this;
      this.$nextTick(function () {
        that.init();
      });
    },
    methods: {
      init(){
        let scrollBox = document.getElementById('vux_view_box_body'), that = this;
        scrollBox.addEventListener("scroll", function () {
          let targetName;
          $(".feed_item").each(function (index) {
            let item = $(this);
            let name = item.attr("name");
            if (name.indexOf("no_anchor") === -1) {
              let distance = item.offset().top;
              let minDistance = that.offsetTop+45;
              if (distance < minDistance) {
                targetName = name;
              }
            }
            if (targetName) {
              that.selectedName = targetName
            }
          });
        })
      },
      itemClickHandle(index){
        let that = this;
        const clickAnchor = encodeURI(this.itemData.tab[index]).toString().replace(/%/g, "");
        const toTarget = $('[name=' + clickAnchor + ']').get(0);
        if (toTarget) {
          const toTop = toTarget.offsetTop - (that.offsetTop+44);
          Bus.$emit('scroll', toTop);
        }
      }
    }
  }
</script>
<style>
  html, body {
    height: 100%;
  }

  body {
    overflow: scroll;
  }
</style>
<style scoped="">
  .navigation_menu {
    background: #eee;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-flow: row;
    width: 100%;
    font-size: 14px;
    line-height: 40px;
    /*border-top:1px solid #f1f1f1;*/
    top: 0;
    z-index: 3;
    margin-top: 0;
    overflow: hidden;
  }

  .navigation_menu ul {
    background: #fff;
  }

  .navigation_menu li {
    flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    color: #333;
    text-align: center;
    cursor: pointer;
    min-width: 25%;
  }

  .navigation_menu li.hover {
    color: #FF4A7D
  }

  .navigation_menu li.hover span {
    color: #FF4A7D;
    display: inline-block;
    height: 40px;
    border-bottom: 2px solid #FF4A7D;
  }

</style>
