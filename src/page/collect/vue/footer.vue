<template>
  <div class="btn">
    <div class="btn_left">成为会员免费听</div>
    <div class="btn_right">
      <span>订阅合辑:</span>
      <span>¥4.9</span>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style scoped>
  .btn{
    font-size: 0;
    height: 0.49rem;
    position: fixed;
    bottom: 0;
  }
  .btn>div{
    display: inline-block;
    vertical-align: top;
    height: 0.49rem;
    text-align: center;
    line-height: 0.49rem;
  }
  .btn_left{
    width: 1.6rem;
    font-size: 14px;
    background: #F9F7F8;
  }
  .btn_right{
    width: 2.15rem;
    font-size: 14px;
    background: red;
    color: white;
  }
</style>
