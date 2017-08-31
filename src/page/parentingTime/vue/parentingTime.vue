<template>
  <div>
    <div class="tab">
      <div>早安音乐
        <div class="line"></div>
      </div>
      <div>睡前故事</div>
      <div>有声绘本</div>
      <div>家庭百科</div>
    </div>
  </div>
</template>
<script>
  export default{

  }
</script>
<style scoped>
  .tab{
    height: 0.38rem;
    font-size: 0;
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
    background: green;
    width: 80%;
    margin:0 auto;
  }
</style>
