<template>
  <div>
    <div class="big_img">
      <img src="//pic.davdian.com/free/2017/08/16/a.jpg" alt="">
    </div>
    <div class="text">家庭幸福系统课程，接纳自己</div>
    <div class="range">
      <div class="gray"></div>
      <div class="red"></div>
      <div class="icon"><img src="//pic.davdian.com/free/2017/08/16/progressBarStatus.png" alt=""></div>
    </div>
    <div class="time">
      <div>0:00</div>
      <div>15:56</div>
    </div>
    <div class="btn">
      <div class="btn1"><img src="//pic.davdian.com/free/2017/08/16/time.png" alt=""></div>
      <div class="btn2"><img src="//pic.davdian.com/free/2017/08/16/combinedShape2.png" alt=""></div>
      <div class="btn3"><img src="//pic.davdian.com/free/2017/08/16/playBtn.png" alt=""></div>
      <div class="btn4"><img src="//pic.davdian.com/free/2017/08/16/combinedShape.png" alt=""></div>
      <div class="btn5"><img src="//pic.davdian.com/free/2017/08/16/list.png" alt=""></div>
    </div>
    <div class="look_more">
      <div>查看合辑 (5/26)</div>
      <div></div>
    </div>
    <div></div>
  </div>
</template>
<script>
  export default {}
</script>
<style scoped>
  .big_img img{
    width: 3.75rem;
    height: 3.75rem;

  }
  .text{
    height: 0.51rem;
    line-height: 0.51rem;
    text-align: center;
    color: #333333;
    font-size: 16px;
  }
  .range{
    /*padding: 0.19rem 0.1rem 0 0.1rem;*/
    position:relative;
    height: 0.26rem;
    margin: 0 0.1rem;
  }
  .gray{
    height: 0.04rem;
    background: #ECECEC;
    position:absolute;
    top: 0.11rem;
    width: 100%;
  }
  .red{
    height: 0.04rem;
    background:#FF613C;
    position: absolute;
    top: 0.11rem;
    width: 50%;
  }
  .icon img{
    height: 0.26rem;
    width: 0.26rem;
    position: absolute;
    top: 0;
  }
  .time{
    height: 0.17rem;
    font-size: 0;
    position:relative;
    margin:0 0.1rem;
  }
  .time>div{
    display: inline-block;
    vertical-align: top;
    color:#666666;
    font-size:12px;
    line-height:0.17rem;
    position: absolute;
    height: 0.17rem;
  }

  .time>div:nth-child(1){
    left: 0;
  }
  .time>div:nth-child(2){
    right: 0;
  }
  .btn{
    margin-top: 0.11rem;
    margin-left:0.2rem;
    margin-right:0.2rem;
    margin-bottom:0.2rem;
    width: 3.35rem;
    height: 0.46rem;
    font-size: 0;
  }
  .btn>div{
    display: inline-block;
    vertical-align: top;
  }
  .btn1 img{
    width: 0.26rem;
    height: 0.26rem;
    margin-top:0.1rem;
  }
  .btn2 img{
    width: 0.31rem;
    height: 0.21rem;
    margin-left:0.47rem;
    margin-top: 0.13rem;
  }
  .btn3 img{
    height: 0.46rem;
    width: 0.46rem;
    margin-left: 0.41rem;
  }
  .btn4 img{
    width: 0.3rem;
    height: 0.2rem;
    margin-left:0.42rem;
    margin-top: 0.14rem;
  }
  .btn5 img{
    width: 0.23rem;
    height: 0.18rem;
    margin-left:0.49rem;
    margin-top: 0.15rem;
  }
  .look_more{
    width: 100%;
    height: 0.4rem;
    padding: 0 0.1rem;
  }
</style>
