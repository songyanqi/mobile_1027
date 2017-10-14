<template>
  <div class="background">
      <template v-if="false">
        <!--未登录-->
        <div class="big_img"><img src="//pic.davdian.com/free/2017/09/29/bg2.png" alt=""></div>
        <div class="nologin">您还未登录哦~</div>
        <div class="btn1"></div>

        <!--登录（第二长的）-->
        <div class="big_img2"><img src="//pic.davdian.com/free/2017/09/30/bg4.png" alt=""></div>
        <div class="range">
          <div class="date">
            <div class="default readyshop_date">10.19</div>
            <div class="default noshop_date">10.20</div>
            <div class="default readyshop_date">10.21</div>
          </div>
          <div class="circle">
            <div><img src="//pic.davdian.com/free/2017/09/30/yellow.png" alt=""></div>
            <div><img src="//pic.davdian.com/free/2017/09/30/white.png" alt=""></div>
            <div><img src="//pic.davdian.com/free/2017/09/30/yellow.png" alt=""></div>
          </div>
          <div class="state">
            <div class="default2 readyshop_date">已购物</div>
            <div class="default2 noshop_date">已购物</div>
            <div class="default2 readyshop_date">已购物</div>
          </div>
        </div>

        <div class="noshop">今天还未购物哦~</div>
        <div class="noshop">今天已购物~</div>
        <div class="noshop">很遗憾您错过了这次活动~</div>
        <div class="noshop">活动结束啦~~</div>

        <div class="goshop">连续三天购物即可获得</div>
        <div class="goshop">已获得三周年纪念品</div>

        <div class="goods">
          <div style="width: 1.1rem;"><img src="//pic.davdian.com/free/2017/09/30/Rectangle%208.png" alt=""></div>
          <div style="width: 1.5rem;">
            <div style="font-size: 0.16rem;color:#333333;margin-top: 0.2rem;width: 100%;text-align: center">周年庆纪念品</div>
            <div style="font-size: 0.12rem;color:#FF4A7D;margin-top: 0.2rem;width: 100%;text-align: center;">查看详情>>></div>
          </div>
        </div>

        <div class="btn2"></div>
        <div class="btn3"></div>
        <div class="btn4"></div>

      </template>

    <!--最长的-->
    <div class="big_img3"><img src="//pic.davdian.com/free/2017/09/30/bg5.png" alt=""></div>
    <div class="range">
      <div class="date">
        <div class="default readyshop_date">10.19</div>
        <div class="default noshop_date">10.20</div>
        <div class="default readyshop_date">10.21</div>
      </div>
      <div class="circle">
        <div><img src="//pic.davdian.com/free/2017/09/30/yellow.png" alt=""></div>
        <div><img src="//pic.davdian.com/free/2017/09/30/white.png" alt=""></div>
        <div><img src="//pic.davdian.com/free/2017/09/30/yellow.png" alt=""></div>
      </div>
      <div class="state">
        <div class="default2 readyshop_date">已购物</div>
        <div class="default2 noshop_date">已购物</div>
        <div class="default2 readyshop_date">已购物</div>
      </div>
    </div>
    <div>再购物一次就能获得周年庆纪念品啦</div>
    <div>连续三天购物即可获得</div>
    <div>仅剩 2345 个名额</div>
    <div class="goodsLong">
      <div style="width: 1.1rem;"><img src="//pic.davdian.com/free/2017/09/30/Rectangle%208.png" alt=""></div>
      <div style="width: 1.5rem;">
        <div style="font-size: 0.16rem;color:#333333;margin-top: 0.2rem;width: 100%;text-align: center">周年庆纪念品</div>
        <div style="font-size: 0.12rem;color:#FF4A7D;margin-top: 0.2rem;width: 100%;text-align: center;">查看详情>>></div>
      </div>
    </div>

    <div class="btnlong"></div>

      <div class="rute1">
        <div style="margin-top: 0;text-align: center;"><span class="line"></span><span style="padding: 0 0.1rem">活动规则</span><span class="line"></span></div>
        <div style="margin-top: 0.2rem">1.活动时间：10月19日00:00:00~10月21日23:59:59；</div>
        <div>2.仅限大V店会员参与该活动；</div>
        <div>3.10月19日、20日、21日三天连续购物即可获得大V店3周年定制纪念品（限量5000个），每天购物金额不限，每个会员仅有1次获得纪念品的机会；</div>
        <div>4.因退货、换货等原因导致不满足连续3天购物的情况，视为主动放弃该活动；</div>
        <div>5.获得的纪念品将于15个工作日后安排发货，收货地址以10月21日首个已支付且未退货订单的收货地址为准；</div>
        <div>6.开通会员订单不参与该活动；</div>
        <div>7.详情可咨询大V店客服。</div>
      </div>

  </div>
</template>
<script>
  import share from "../../../../src/common/js/module/share.js"
  export default{
    mounted(){
      share.setShareInfo({
        title: "连续三天购物可获得纪念品",
        desc: "10月19、20、21三天连续购物可获得大V店周年纪念品，限量5000个，快来~~~",
        link: window.location.href,
        imgUrl: "http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/2017/10/12/%E6%BB%A1399%E9%80%81%E5%A4%A7V%E4%B8%89%E5%91%A8%E5%B9%B4%E7%BA%AA%E5%BF%B5%E5%93%81%E5%88%86%E4%BA%AB%E7%BC%A9%E7%95%A5%E5%9B%BE.png"
      });
    }
  }
</script>
<style scoped>
  .background{
    position: relative;
  }
  .big_img img{
    width: 3.75rem;
    height: 9.52rem;
  }
  .big_img2 img{
    width: 3.75rem;
    height: 12.11rem;
  }
  .big_img3 img{
    width: 3.75rem;
    height: 12.4rem;
  }
  .nologin{
    color:#F00026;
    font-size: 0.2rem;
    text-align: center;
    position: absolute;
    top: 3.69rem;
    width: 100%;
  }
  .btn1{/*立即登录*/
    width: 2.5rem;
    height: 0.45rem;
    background-image: url('//pic.davdian.com/free/2017/09/29/button1.png');
    background-size: 2.5rem 0.45rem;
    position: absolute;
    top: 4.22rem;
    left: 0.64rem;
  }
  .btn2{ /*快去买买买*/
    width: 2.5rem;
    height: 0.45rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/button.png');
    background-size: 2.5rem 0.45rem;
    position: absolute;
    top: 6.75rem;
    left: 0.63rem;
  }
  .btn3{ /*查看更多优惠活动*/
    width: 2.5rem;
    height: 0.45rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/btn3.png');
    background-size: 2.5rem 0.45rem;
    position: absolute;
    top: 6.75rem;
    left: 0.63rem;
  }
  .btn4{ /*元气满满继续嗨*/
    width: 2.5rem;
    height: 0.45rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/btn4.png');
    background-size: 2.5rem 0.45rem;
    position: absolute;
    top: 6.75rem;
    left: 0.63rem;
  }
  .btnlong{/*元气满满继续嗨长*/
    width: 2.5rem;
    height: 0.45rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/btn4.png');
    background-size: 2.5rem 0.45rem;
    position: absolute;
    top: 7.32rem;
    left: 0.63rem;
  }
  .btnlong2{/*快去买买买长*/
    width: 2.5rem;
    height: 0.45rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/button.png');
    background-size: 2.5rem 0.45rem;
    position: absolute;
    top: 7.32rem;
    left: 0.63rem;
  }
  .btnlong3{/*查看更多优惠活动长*/
    width: 2.5rem;
    height: 0.45rem;
    background-image: url('//pic.davdian.com/free/2017/09/30/btn3.png');
    background-size: 2.5rem 0.45rem;
    position: absolute;
    top: 7.32rem;
    left: 0.63rem;
  }
  .rute1{
    position: absolute;
    bottom: 0.58rem;
    width: 3.45rem;
    height: 3.21rem;
    left: 0.15rem;
  }
  .rute1>div{
    color:#FFFFFF;
    font-size: 0.14rem;
    margin-top: 0.1rem;
    line-height:0.2rem;
  }
  .line{
    display: inline-block;
    width: 0.3rem;
    height: 1px;
    background: #FFFFFF;
    vertical-align: middle;
  }
  .goods{
    width: 2.63rem;
    height: 1.12rem;
    border-radius: 12px;
    position: absolute;
    left: 0.56rem;
    top: 5.38rem;
    font-size: 0;
    border: 1px dashed #FF4A7D;
    box-sizing: border-box;
  }
  .goodsLong{
    width: 2.63rem;
    height: 1.12rem;
    border-radius: 12px;
    position: absolute;
    left: 0.56rem;
    top: 5.82rem;
    font-size: 0;
    border: 1px dashed #FF4A7D;
    box-sizing: border-box;
  }
  .goods>div,.goodsLong>div{
    display: inline-block;
    vertical-align: top;
  }
  .goods img ,.goodsLong img{
    height: 1.1rem;
    width: 1.1rem;
  }
  .noshop{
    position: absolute;
    top: 4.6rem;
    color:#F00026;
    font-size: 0.2rem;
    width: 100%;
    text-align: center;
  }
  .goshop{
    color:#F00026;
    font-size: 0.15rem;
    width: 100%;
    text-align: center;
    top: 4.97rem;
    position: absolute;
  }
  .range{
    position: absolute;
    top: 3.55rem;
    display: inline-block;
    width: 2.73rem;
    left: 0.49rem;
  }
  .date,.circle,.state{
    font-size: 0;
    margin-bottom: 0.1rem;
  }
  .date>div,.circle>div,.state>div{
    display: inline-block;
    vertical-align: top;
  }
  .circle>div>img{
    width: 0.91rem;
    height: 0.15rem;
  }
  .default{
    font-size: 0.14rem;
    width: 0.91rem;
    text-align: center;
  }
  .default2{
    font-size: 0.12rem;
    width: 0.91rem;
    text-align: center;
  }
  .readyshop_date{
    color:#FFF7AB;
   }
  .noshop_date{
    color:#FFFFFF;
  }
  .state{
    margin-bottom: 0;
  }
</style>
