<template>
  <div class="all">
    <div class="big_img">
      <img src="//pic.davdian.com/free/2017/08/15/a.jpg" alt="">
    </div>
    <div class="content">
      <div class="content_title">别说没时间，走路吃饭能陪孩子锻炼数理思维。做更好的自己</div>
      <div class="content_price">
        <div class="pri_left">
          <span>￥</span><span>19.90</span>
        </div>
        <div class="pri_right">会员免费听</div>
      </div>
      <div class="content_text">著名犹太教育专家、以色列多所高校访问学者周颖即将为您揭秘：零距离观察犹太人如何打造“最强大脑”，科学激发孩子的学习力和创造力。</div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style scoped>
  .all {
    padding-bottom: 0.12rem;
    background: white;
  }

  .big_img {
    margin-bottom: 0.1rem;
  }

  .content {
    padding: 0.1rem 0.1rem 0 0.1rem;
  }

  .big_img img {
    width: 3.75rem;
  }

  .content_title {
    font-size: 14px;
    color: #333333;
    margin-bottom: 0.15rem;
  }

  .content_price {
    margin-bottom: 0.15rem;
  }

  .content_text {
    color: #999999;
    font-size: 12px;
  }

  .content_price .pri_left {
    color: #FF4A7D;
    font-size: 18px;
  }

  .content_price > div {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
  }

  .content_price .pri_right {
    color: #BF9D51;
    font-size: 11px;
    margin-top: 0.04rem;
  }
</style>
