<template>
  <header>
    <div class="top0" :style="{ top: - data.top + 'px' }">
      <div class="top_container" id="top_container">
        <div class="head_index_top clearfix" :style="{'background': head.bgColor}">
          <a :href="head.image && head.image.command.content" class="left_icon_container">
            <span v-if="usersta == 3" class="shop_icon"></span>
            <img v-if="usersta != 0" :src="head.image && head.image.url" class="shop_img">
            <img v-if="usersta == 0" class="shop_img"
                 src="http://pic.davdian.com/shop_logo/2016/06/13/80_80_f81f91d7ef5e31fa354fa935124dab20.png">
          </a>
          <a :href="head.search && head.search.command.content">
            <div class="search_con search_button" v-on:click='turn'>
              <span class="search_icon"></span>
              <input type="text" class="search_input" readonly="">
            </div>
            <div class="shop_name" v-on:click='turn'>在
              <span v-if='head&&head.search&&head.search.title' class="dav_base_red_color"
                    v-text='head.search.title'></span>中搜索...
            </div>
          </a>
          <a class="right_icon_container" href="/cart.html">
            <i class="cart_icon"></i>
            <b v-if="cart" v-text="cart"></b>
          </a>
        </div>
        <div class="swiper-container v_menu" id="v_menu">
          <ul class="swiper-wrapper index_con_menu">
            <li class="swiper-slide" v-for="(item, index) in list"
                @click='changeCategory(item.id,index,$event)'>
              <p class="time_state" v-if='item && item.title'>
                <span class="time_state_span" :class="{time_state_span_active:item.id == cate}">{{item.title}}
                  <i class='hoverSpan' v-if='item.id == cate'></i>
                </span>
              </p>
            </li>
            <li v-if="menumore" class="swiper-slide" @click="javascript:location.href=menumore.command.content">
              <p class="time_state">
                <span class="time_state_span" v-text="menumore.title"></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  // TODO 等待数据接口和规则
  import "./index_header.css"
  import head from "./index_header.es6"
  export default head
</script>
<style scoped>
  .v_menu {
    background: #fff;
    width: 100%;
  }

  .cart_icon{
    display: block;
    width: 40px;
    height: 40px;
    background-position: center;
    -webkit-background-size:100%;
    background-size:100%;
    background-image: url(//pic.davdian.com/free/2017/06/27/shoppingCart.png);
  }

  .index_con_menu {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-flow: row;
    width: 100%;
    max-width: 640px;
    font-size: 13px;
    padding-top: 5px;
    line-height: 8px;
    /*height: 35px;*/
    position: relative;
    top: 0;
    z-index: 11;
    margin-top: 0;
  }

  .index_con_menu li {
    background: #fff;
    color: #333;
    text-align: center;
    cursor: pointer;
    padding-top: 9px;
    padding-bottom: 10px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }

  .time_state_span {
    position: relative;
  }

  .hoverSpan {
    display: block;
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    border-bottom: 2px solid #ff4a7d;
  }

  .time_state_span_active {
    color: #ff4a7d;
  }

  /*新加部分 首页头部 透明*/
  /*#index_fe_container .top0 .top_container,#index_fe_container .v_menu,#index_fe_container .index_con_menu li{*/
    /*background: none;*/
  /*}*/

</style>
