<!--模板-->
<template>
  <div class="time-over">
    <div class="line"></div>
    <div class="info">
      <div v-if="remainSecond > 0">
        距活动结束:
        <span class="time">
          <span class="box">{{remainTime.day}}</span>天<span class="box">{{remainTime.hour}}</span>:<span
          class="box">{{remainTime.minute}}</span>:<span
          class="box">{{remainTime.second}}</span>
        </span>
      </div>
      <div v-if="remainSecond <= 0">活动已结束<template v-if="groupStatus == '2'">，没能组团成功哦~</template></div>
    </div>
  </div>
</template>

<!--样式-->
<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/util/all";

  .time-over {
    position: relative;
    margin: auto;
    width: ptr(272);
    text-align: center;
    .line {
      position: relative;
      top: ptr(12);
      width: 100%;
      border-top: 1px solid #E1E1E1;
      transform: scaleY(0.5);
    }
    .info {
      position: relative;
      display: inline-block;
      margin: auto;
      padding: 0 ptr(10);
      background: white;
      font-size: ptr(12);
      .time {
        color: #999;
        .box {
          margin: ptr(5);
          padding: ptr(1) ptr(5);
          border-radius: ptr(4);
          background: #666;
          color: white;
        }
      }
    }
  }
</style>

<!--组件定义-->
<script>
  export default {
    data: function () {
      return {
        remainTime: {
          day: '-',
          hour: '-',
          minute: '-',
          second: '-',
        },
        remainMillionSecond: 0,   // 剩余毫秒
        lastSecondTimestamp: null,    // 记录上次修改界面的时间戳
      }
    },
    props: {
      remainSecond: Number,   // 剩余秒
      groupStatus: {
        type: String,
        default: '0'
      },
    },
    components: {},
    created: function () {
    },
    mounted: function () {
      this.computeRemainTime();
    },
    methods: {
      // 倒计时格式化
      computeRemainTime(){
        let oneMinute = 60,
          oneHour = 60 * 60,
          oneDay = 60 * 60 * 24;
        var ts = this;

        // 用毫秒计算,否则损失精度
        ts.remainMillionSecond = ts.remainSecond * 1000;

        // 上次时间
        ts.lastSecondTimestamp = Date.now();

        let interval = setInterval(function () {
          if (ts.remainSecond) {
            if (ts.remainSecond > 0) {

              // 当前时间与上次时间差
              let secondDiff = Date.now() - ts.lastSecondTimestamp;
              ts.lastSecondTimestamp = Date.now();
              ts.remainMillionSecond -= secondDiff;

              // 显示时间,此处不是1000,因为虽然设定是1000毫秒执行一次,但中间可能会有误差
              if(secondDiff > 1100){
                ts.remainSecond = parseInt(ts.remainMillionSecond / 1000);
              }else{
                ts.remainSecond -- ;
              }

              // 计算显示数值
              let day = parseInt(ts.remainSecond / oneDay);
              let hour = parseInt(ts.remainSecond % oneDay / oneHour);
              let minute = parseInt(ts.remainSecond % oneDay % oneHour / oneMinute);
              let second = parseInt(ts.remainSecond % oneDay % oneHour % oneMinute);

              // 小于0显示00
              ts.remainTime.day = day > 0 ? day : '00';
              ts.remainTime.hour = hour > 0 ? hour : '00';
              ts.remainTime.minute = minute > 0 ? minute : '00';
              ts.remainTime.second = second > 0 ? second : '00';
            }
          } else {
            clearInterval(interval);
          }
        }, 1000);
      },
    },
    filters: {},
    computed: {},
    watch: {},
  }
</script>
