<template>
  <div>
    <div class="tab">
      <div :class="{color:flag==1}" @click="fn(1)">早安音乐
        <div class="line" v-if="flag==1"></div>
      </div>
      <div :class="{color:flag==2}" @click="fn(2)">睡前故事
        <div class="line" v-if="flag==2"></div>
      </div>
      <div :class="{color:flag==3}" @click="fn(3)">有声绘本
        <div class="line" v-if="flag==3"></div>
      </div>
      <div :class="{color:flag==4}" @click="fn(4)">家庭百科
        <div class="line" v-if="flag==4"></div>
      </div>
    </div>
    <div class="banner">
      <v-list v-if="flag==1" :menu="21"></v-list>
      <v-list2 v-if="flag==2" :menu="15"></v-list2>
      <v-list3 v-if="flag==3" :menu="20"></v-list3>
      <v-list4 v-if="flag==4" :menu="9"></v-list4>
    </div>

  </div>
</template>
<script>
  import vList from "./list.vue";
  import vList2 from "./list2.vue";
  import vList3 from "./list3.vue";
  import vList4 from "./list4.vue";
  require("../../../../javascript/units.js");
  require("../../../../javascript/model.js");
  require("../../../../javascript/base.js");
  export default{
    components:{
      vList:vList,
      vList2:vList2,
      vList3:vList3,
      vList4:vList4
    },
    data(){
      return {
          flag:1
      }
    },
    methods:{
        fn(flag){
            this.flag=flag;
        }
    }
  }
</script>
<style scoped>
  .tab{
    height: 0.38rem;
    font-size: 0;
    background: #fff;
  }
  .tab>div{
    display: inline-block;
    vertical-align: top;
    width: 25%;
    height: 100%;
    text-align: center;
    line-height: 0.38rem;
    font-size: 14px;
    position: relative;
  }
  .line{
    position: absolute;
    bottom: 0;
    height: 1px;
    background: #FF4A7D;
    width: 0.58rem;
    left: 50%;
    margin-left: -0.29rem;
  }
  .color{
    color:#FF4A7D;
  }
</style>
<style>
  @import "../../../../stylesheet/base.css";
  @import "../../../../stylesheet/model.css";
  @import "../../../../stylesheet/classroom.css";
</style>
