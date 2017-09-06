<template>
  <!--v-刊头部导航-->
  <div class="swiper-container v_menu" v-if="list.length">
    <ul class="swiper-wrapper">
      <li v-for="(item, index) in list" :class="['swiper-slide',category==item.menuId?'hover':'']" @click="changeCategory(item.menuId,index,$event)">
        <a>
                    <span>
                        <p class="time_state" v-text="item.title"></p>
                        <i class='hoverSpan'></i>
                    </span>
        </a>

      </li>
    </ul>
  </div>
</template>
<style>

</style>
<script>
  import layout from "./layout/api.es6";
  export default{
    props: ['list','initCategory'],
    data(){
      return{
        msg:'hello vue',
        menu:null,
        category:this.initCategory
      }
    },
    created(){
      console.log("category"+this.initCategory);
      this.init();
    },
    updated(){
      this.init();
    },
    methods:{
      changeCategory(category,index){
        this.category = category;
        this.$emit('category', category)
        let obj = {
          index: index
        }
        layout.sStorageSet('v_list', obj)
        this.menu.slideTo(Math.max(0,index-2));
      },
      init(){
        var select=0,length = this.list.length;
        var that = this
        if(length){
          for(var i =0;i<length;i++){
            if(this.list[i].menuId==this.category){
              select = i;
            }
          }
          this.$nextTick(function(){
            if( length> 4){
              this.menu = new Swiper('.v_menu', {
                slidesPerView: 4.5,
                grabCursor: true,
                initialSlide: select - 2
              });

            }else{
              this.menu = new Swiper('.v_menu', {
                slidesPerView: length,
                grabCursor: true
              });
            }
          })

        }

      },
    }
  }
</script>
