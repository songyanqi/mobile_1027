<template>
  <div class="iphone8" v-if="isAdviser==1" @click="goDetail">
    <template v-if="remainCount>0">
      <template v-if="getAward==0 && remainCount>0">
        <!--未获得-->
        <div class="text" style="top: 0.45rem;">当前服务人群销售额:<span v-text="sales"></span>元</div>
        <div class="text" style="top: 0.6rem;">还差<span v-text="awardMoney-sales"></span>元达到<span v-text="awardMoney"></span>元</div>
        <div class="text" style="top: 0.75rem;">即可获得iphone8</div>
        <div class="text" style="top: 0.9rem;">仅剩<span v-text="remainCount"></span>个名额</div>
      </template>

      <template v-if="getAward==1 && remainCount>0">
        <!--获得-->
        <div class="text" style="top: 0.5rem;">当前服务人群销售额<span v-text="sales"></span>元</div>
        <div class="text" style="top: 0.675rem;">恭喜～获得iphone8一部!!!</div>
        <div class="text" style="top: 0.85rem;">仅剩<span v-text="remainCount"></span>个名额</div>
      </template>
    </template>


    <template v-if="remainCount==0">
      <!--没有名额啦-->
      <div class="text" style="top: 0.5rem;">当前服务人群销售额<span v-text="sales"></span>元</div>
      <div class="text" style="top: 0.675rem;">很遗憾没有名额啦</div>
      <div class="text" style="top: 0.85rem;">您错过了本次活动</div>
    </template>

    <div class="btn"></div>
  </div>
</template>
<script>
  import util from "../../../../utils/utils.es6"
  import native from "../../../../src/common/js/module/native.js"
  export default{
    props:['response'],
    data(){
        return{
          getAward: this.response.getAward,
          awardCount: this.response.awardCount,
          sales: this.response.sales,
          isAdviser: this.response.isAdviser,
          awardMoney:this.response.awardMoney,
          remainCount:this.response.remainCount,
          isApp:util.utils.isApp()
        }
    },
    methods:{
      goDetail(){
        console.log("new");
        if(this.isApp){
          native.Browser.open({
            url: "/iphone8.html"
          })
        }else{
          window.location.href="/iphone8.html";
        }
      }
    }
  }
</script>
<style scoped>
  .iphone8{
    position: relative;
    height: 1.5rem;
    width: 3.75rem;
    background-size: 3.75rem 1.5rem;
    background-image: url('http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2017/10/11/%E5%A6%88%E5%A6%88%E9%A1%BE%E9%97%AE3.png');
  }
  .text{
    color:#f0305e;
    font-size: 0.11rem;
    position: absolute;
    left: 0.31rem;
  }
  .btn{
    width: 1rem;
    height: 0.2rem;
    position: absolute;
    top: 1.1rem;
    left: 0.3rem;
    background-size: 1rem 0.2rem;
    background-image: url('http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2017/10/11/%E5%A6%88%E5%A6%88%E9%A1%BE%E9%97%AE16.png');
  }
</style>
