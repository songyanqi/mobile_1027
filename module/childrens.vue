<template>
  <div>
    <div class="mian_bg">
      <a class="check_rule" href="/t-11674.html"></a>
      <img src="//pic.davdian.com/free/2017/05/17/main_pic.png" alt="">
      <!--<img src="//pic.davdian.com/free/2017/05/17/main_pic.jpg" alt="">-->
      <div class="start_play" v-on:click="init_play(1)" style="right:12.1%;">
        <img src="//pic.davdian.com/free/2017/05/18/dot_shank_tran.png" alt="">
      </div>
      <div class="start_play" v-on:click="play_rule" style="left:12.1%;">
        <img src="//pic.davdian.com/free/2017/05/18/dot_shank_tran.png" alt="">
      </div>
    </div>
    <div @touchmove.prevent="prevent_move" v-if="shows" class="playchildren_wrap">
      <div class="playchildren">
        <img class="play" v-if="accessrun&&canPlay" v-on:click="begin" src="//pic.davdian.com/free/2017/05/15/start.png"
             alt="">
        <img class="play" v-show="accessrun&&!canPlay" @click="close"
             src="//pic.davdian.com/free/2017/05/18/fivetimeover.png"
             alt="">
        <div class="title_bottom">
          <img src="//pic.davdian.com/free/2017/05/15/caicaikan_title.png" alt="">
          <div class="closes" @click="close"></div>
        </div>
        <transition-group v-if="shows" :name="'flip-list'+flips" tag="ul">
          <li class="card" v-for="(item,index) in items" v-bind:key="item">
            <!--//中奖的-->
            <div v-if="item == rewardNum" class="card_img" :class="{shank_redss:!not_started}" @click="reward" alt="1">
              <img src="//pic.davdian.com/free/2017/05/18/tran_door.png" alt="">
            </div>
            <!--//未中奖的-->
            <div v-else class="card_img" :class="{card_img2:!noreword[item-1]}" @click="select_no(item-1)">
              <img src="//pic.davdian.com/free/2017/05/18/tran_door.png" alt="">
            </div>
          </li>
        </transition-group>
        <div class="title_bottom">
          <img class="title_bottom" src="//pic.davdian.com/free/2017/05/15/trans.png" alt="">
          <div class="tips">{{tips}}</div>
        </div>
      </div>
    </div>
    <!--游戏规则-->
    <div @touchmove.prevent="prevent_move" v-if="show_rule" class="playchildren_wrap">
      <div class="playchildren">
        <img src="//pic.davdian.com/free/2017/05/18/rule_new.png" alt="">
        <div style="height: 15%;" class="closes" @click="close2"></div>
      </div>
    </div>
    <div @touchmove.prevent="prevent_move" v-if="result" class="result_wrap">
      <div v-if="flips < 5" class="result_in">
        <img src="//pic.davdian.com/free/2017/05/15/regret1.png" alt="">
        <img @click="init_play(2)" class="tips_btn" src="//pic.davdian.com/free/2017/05/15/regret_tips1.png" alt="">
      </div>
      <div v-else class="result_in">
        <img src="//pic.davdian.com/free/2017/05/15/regret1.png" alt="">
        <img @click="close" class="tips_btn2" src="//pic.davdian.com/free/2017/05/15/regret_tips2.png" alt="">
      </div>
    </div>
    <div @touchmove.prevent="prevent_move" v-show="result2" class="result_wrap">
      <div class="result_in">
        <img src="//pic.davdian.com/free/2017/05/18/get_red3.png" alt="">
        <div @click="get_red_con" class="get_continue" :class="{over:flips == 5}"></div>
        <div class="red_desc">
          <div>
            <div><em>¥</em><span>{{bonusMoney}}</span></div>
          </div>
          <div>
            {{bonusName}}满{{minConsumePrice}}元可用 <br>
            有效期限： <br>
            {{timeline}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import layout from "./index/layout.es6";
  export default{
    data: function () {
      return {
        items: [1, 2, 3, 4, 5],
        flips: 1, //抽奖次数
        accessrun: true,
        rewardNum: parseInt(Math.random() * 5 + 1, 10),
        not_started: true,
        sharks: true,
        shows: false, //游戏页面的显示,
        canPlay: true,
        animate_dey: 0,
        result: false,
        result2: false,
        noreword: [true, true, true, true, true],
        accessClick: false, //红包可点击
        activeUrl: "/api/mg/sale/lottery/info", //活动信息接口
//        activeUrl: "../data/active_info.json", //活动信息接
        getrewardUrl: "/api/mg/sale/lottery/get",
//        getrewardUrl: "../data/active_info.json",
        tips: "", //提示
        bonusMoney: 0, //红包金额
        bonusName: "", //红包名字
        timeline: "", //红包使用期间
        minConsumePrice: "",
        show_rule: false, //游戏规则
        lotteryActId: window.lotteryActId, //活动ID,
        last_day: false,
        setTime1: "",
        setTime2: "",
        setTime3: "",
      }
    },
    methods: {
      init_play: function (num) {
        //开始游戏
        if (num == 1) {
          window.bravetime.tj.pvSend('children_begin_init_click', '');
        }
        //继续游戏
        if (num == 2) {
          window.bravetime.tj.pvSend('children_continue_begin', '');
        }
        var scope = this;
        if (window.$user_status == 0) {
          bravetime.goto('login.html?referer=' + location.href);
        } else {
          scope.start_init();
        }
      },
      get_red_con: function () {
        var scope = this;
        if (scope.flips == 5) {
          scope.close();
        } else {
          scope.start_init();
        }
      },
      begin: function () {
        window.bravetime.tj.pvSend('children_play', '');
        var scope = this;
        scope.accessrun = false;
        scope.tips = "红包位置会调换，注意力集中喽~";
        /*告知用户奖品在哪里*/
        scope.not_started = false;
        window.setTime1 = setTimeout(function () {
          scope.not_started = true;
          /*翻转门*/
          var run = 0;
          window.setTime2 = setTimeout(function () {
            scope.shufflecart();
            window.cardrun = setInterval(function () {
              scope.shufflecart();
              run++;
              if (run == 4) {
                clearInterval(cardrun);
                window.setTime3 = setTimeout(function () {
                  scope.tips = "选出红包所在位置吧~";
                  scope.accessClick = true;
                }, 800)
              }
            }, scope.animate_dey);
          }, 400);
        }, 2000);
      },
      shufflecart: function () {
        var scope = this;
        var itemss = [];
        scope.shuffleArray(scope.items, itemss);
        scope.items = itemss;
      },
      shuffleArray: function (arr, newArr) {
        if (arr.length == 1) {
          newArr.push(arr[0]);
          return newArr;
        }
        var random = Math.ceil(Math.random() * arr.length) - 1;
        newArr.push(arr[random]);
        arr.splice(random, 1);
        return this.shuffleArray(arr, newArr);
      },
      close: function () {
        var scope = this;
        window.clearTimeout(window.setTime1);
        window.clearTimeout(window.setTime2);
        window.clearTimeout(window.setTime3);
        window.clearInterval(window.cardrun);
        scope.shows = false;
        scope.result = false;
        scope.result2 = false;
        scope.items = [1, 2, 3, 4, 5];
        scope.accessClick = false;
        return false;
      },
      /*没有中奖*/
      select_no: function (num) {
        var scope = this;
        window.bravetime.tj.pvSend('children_select_red', '');
        if (!scope.accessClick) {
          return false;
        }
        scope.accessClick = false;
        Vue.set(scope.noreword, num, false);
        scope.shakaward();
        //告知后台没有中奖
        $.ajax({
          url: scope.getrewardUrl,
          type: "POST",
          data: layout.strSign("children", {"lotteryActId": scope.lotteryActId, "distribute": "no"}),
          dataType: "json",
          success: function (result) {
            if (result.code) {
              bravetime.info(result.info);
            }
          }
        });
        setTimeout(function () {
          scope.result = true;
          if (scope.flips == 5) {
            if (scope.last_day) {
              scope.tips = "每天只能玩儿5次哦~";
            } else {
              scope.tips = "每天只能玩儿5次哦，明天继续吧~";
            }
          } else {
            scope.tips = "今天还有" + (5 - scope.flips) + "次玩游戏的机会呦~";
          }
        }, 700);
      },
      /*中奖*/
      reward: function () {
        var scope = this;
        window.bravetime.tj.pvSend('children_select_red', '');
        if (!scope.accessClick) {
          return false;
        }
        scope.accessClick = false;
        scope.not_started = false;
        /*告知后台中奖*/
        $.ajax({
          url: scope.getrewardUrl,
          type: "POST",
          data: layout.strSign("children", {"lotteryActId": scope.lotteryActId}),
          dataType: "json",
          success: function (result) {
            if (result.code == 0) {
              scope.bonusMoney = result.data.bonusInfo.bonusMoney;
              scope.bonusName = result.data.bonusInfo.bonusName;
              scope.minConsumePrice = result.data.bonusInfo.minConsumePrice;
              scope.timeline = result.data.bonusInfo.useBeginTime + "-" + result.data.bonusInfo.useEndTime;
            }
          }
        });
        setTimeout(function () {
          scope.result2 = true;
          if (scope.flips == 5) {

          } else {
            scope.tips = "今天还有" + (5 - scope.flips) + "次玩游戏的机会呦~";
          }
        }, 700);
      },
      shakaward: function () {
        var scope = this;
        scope.accessClick = false;
        scope.not_started = false;
      },
      /*点击开始，初始化抽奖信息*/
      start_init: function () {
        var scope = this;
        $.ajax({
          url: scope.activeUrl,
          type: "POST",
          data: layout.strSign("children", {"lotteryActId": scope.lotteryActId}),
          dataType: "json",
          success: function (result) {
            var now = scope.gettimeline(Date.parse(new Date()) / 1000);
            var endTime = scope.gettimeline(result.data.endTime) || "";
            if (now == endTime) {
              scope.last_day = true;
            } else {
              scope.last_day = false;
            }
            if (result.code == 0) {
              scope.shows = true;
              if (result.data.joinLimit == "yes") {
                /*超限*/
                scope.canPlay = false;
                if (scope.last_day) {
                  scope.tips = "每天只能玩儿5次哦~";
                } else {
                  scope.tips = "每天只能玩儿5次哦，明天继续吧~";
                }
                scope.result = false;
                scope.result2 = false;
                scope.noreword = [true, true, true, true, true];
                scope.rewardNum = parseInt(Math.random() * 5 + 1, 10);
                scope.accessrun = true;
                scope.not_started = true;
                return false;
              }
              scope.canPlay = true;
              scope.noreword = [true, true, true, true, true];
              scope.result = false;
              scope.result2 = false;
              scope.rewardNum = parseInt(Math.random() * 5 + 1, 10);
              scope.accessrun = true;
              scope.not_started = true;
              /*抽奖次数*/
              scope.flips = 6 - result.data.remainingTimes;
              scope.tips = "今天还有" + result.data.remainingTimes + "次玩游戏的机会呦~";
              switch (scope.flips) {
                case 1:
                  scope.animate_dey = 920;
                  break;
                case 2:
                  scope.animate_dey = 630;
                  break;
                case 3:
                  scope.animate_dey = 360;
                  break;
                case 4:
                  scope.animate_dey = 280;
                  break;
                case 5:
                  scope.animate_dey = 190;
                  break;
              }
            } else if (result.code == 63409) {
              scope.shows = true;
              /*超限*/
              scope.canPlay = false;
              if (scope.last_day) {
                scope.tips = "每天只能玩儿5次哦~";
              } else {
                scope.tips = "每天只能玩儿5次哦，明天继续吧~";
              }
              return false;
            } else {
              bravetime.info(result.data.msg);
            }
          },
          error: function (e) {
            console.log(e);
          }
        });
      },
      /*时间转换*/
      gettimeline: function (nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10).replace(/-/g, ".")
      },
      /*游戏 规则*/
      play_rule: function () {
        this.show_rule = true;
      },
      close2: function () {
        this.show_rule = false;
      },
      prevent_move: function (e) {

      }
    },
    created: function () {

    }
  }
</script>
<style scoped>
  .flip-list1-move {
    transition: transform 1s;
  }

  .flip-list2-move {
    transition: transform .7s;
  }

  .flip-list3-move {
    transition: transform .4s;
  }

  .flip-list4-move {
    transition: transform .3s;
  }

  .flip-list5-move {
    transition: transform .2s;
  }

  .card {
    float: left;
    list-style: none;
    width: 24.58%;
    margin-left: 6.51%;
  }

  .card img {
    width: 100%;
  }

  .playchildren {
    width: 79.2%;
    min-height: 300px;
    overflow: hidden;
    position: absolute;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-border-radius: 2%;
    -moz-border-radius: 2%;
    border-radius: 2%;
  }

  .playchildren ul {
    background-color: #ffc5bb;
    overflow: hidden;
    background-image: url("//pic.davdian.com/free/2017/05/15/c_bg.png");
    background-size: 100% 100%;
    padding: 5% 0;
  }

  .playchildren ul li:nth-of-type(1) {
    margin-left: 19.9%
  }

  .playchildren ul li:nth-of-type(2) {
    margin-left: 11%
  }

  .play {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 14;
    height: 13.7%;
  }

  .title_bottom {
    width: 100%;
    background-color: #b4bb4b;
    overflow: hidden;
    min-height: 10px;
    position: relative;
  }

  .card_img {
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: url("//pic.davdian.com/free/2017/05/15/doors.png");
  }

  .card_img.card_img2 {
    background-image: url("//pic.davdian.com/free/2017/05/15/doorsno.png");
  }

  .card_img img {
    width: 100%;
  }

  .closes {
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    height: 100%;
    opacity: 0;
  }

  .tips {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #FFF;
    font-size: 0.16rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .start_play {
    width: 30.26%;
    position: absolute;
    bottom: 3.36%;
    -webkit-animation: myredshankss .3s infinite;
    -o-animation: myredshankss .3s infinite;
    animation: myredshankss .3s infinite;
    background-position: 0 0;
    background-size: 100% 100%;
  }

  .start_play img {
    width: 100%;
  }

  @keyframes myredshankss {
    from {
      background-image: url("//pic.davdian.com/free/2017/05/17/shank1.png");
    }
    to {
      background-image: url("//pic.davdian.com/free/2017/05/17/shank2.png");
    }
  }

  @-moz-keyframes myredshankss /* Firefox */
  {
    from {
      background-image: url("//pic.davdian.com/free/2017/05/17/shank1.png");
    }
    to {
      background-image: url("//pic.davdian.com/free/2017/05/17/shank2.png");
    }
  }

  @-webkit-keyframes myredshankss /* Safari 和 Chrome */
  {
    from {
      background-image: url("//pic.davdian.com/free/2017/05/17/shank1.png");
    }
    to {
      background-image: url("//pic.davdian.com/free/2017/05/17/shank2.png");
    }
  }

  @-o-keyframes myredshankss /* Opera */
  {
    from {
      background-image: url("//pic.davdian.com/free/2017/05/17/shank1.png");
    }
    to {
      background-image: url("//pic.davdian.com/free/2017/05/17/shank2.png");
    }
  }

  .result_wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    bottom: 0;
    z-index: 12;
    max-width: 640px;
    margin: auto;
  }

  .playchildren_wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    bottom: 0;
    z-index: 12;
    max-width: 640px;
    margin: auto;
  }

  .result_in {
    width: 79.2%;
    min-height: 50px;
    overflow: hidden;
    position: absolute;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-border-radius: 2%;
    -moz-border-radius: 2%;
    border-radius: 2%;
  }

  .tips_btn {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10%;
    margin: auto;
    height: 15%;
  }

  .tips_btn2 {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 8%;
    margin: auto;
    width: 46%;
  }

  .get_continue {
    position: absolute;
    height: 13%;
    z-index: 9999;
    bottom: 4%;
    left: 0;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center 0;
    right: 0;
    margin: auto;
    background-image: url("//pic.davdian.com/free/2017/05/18/cont.png");
  }

  .get_continue.over {
    background-image: url("//pic.davdian.com/free/2017/05/18/Ikonw.png");
  }

  .red_desc {
    position: absolute;
    width: 67%;
    height: 22%;
    z-index: 9999;
    bottom: 25%;
    left: 0;
    right: 0;
    margin: auto;
    color: #FFF;
    font-weight: 200;
  }

  .red_desc > div:nth-of-type(1) {
    width: 25%;
    height: 100%;
    float: left;
    position: relative;
  }

  .red_desc > div:nth-of-type(1) > div {
    text-align: center;
    font-size: 0.25rem;
    height: 0.25rem;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    margin: auto;
  }

  .red_desc em {
    font-style: normal;
    font-size: 0.12rem;
    font-weight: 100;
  }

  .red_desc > div:nth-of-type(2) {
    width: 73%;
    height: 80%;
    float: left;
    font-size: 0.12rem;
    line-height: 0.17rem;
    margin-top: 4%;
    margin-left: 2%;
  }

  .mian_bg {
    position: relative;
  }

  .check_rule {
    display: block;
    width: 32%;
    height: 4%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 44%;
  }

  .shank_redss {
    width: 100%;
    min-height: 10px;
    -webkit-animation: myredshank .3s infinite;
    -o-animation: myredshank .3s infinite;
    animation: myredshank .3s infinite;
    background-position: 0 0;
    background-size: 100% 100%;
  }

  @keyframes myredshank {
    from {
      background-image: url("//pic.davdian.com/free/2017/05/15/doors1.png");
    }
    to {
      background-image: url("//pic.davdian.com/free/2017/05/15/doors2.png");
    }
  }

  @-moz-keyframes myredshank /* Firefox */
  {
    from {
      background-image: url("//pic.davdian.com/free/2017/05/15/doors1.png");
    }
    to {
      background-image: url("//pic.davdian.com/free/2017/05/15/doors2.png");
    }
  }

  @-webkit-keyframes myredshank /* Safari 和 Chrome */
  {
    from {
      background-image: url("//pic.davdian.com/free/2017/05/15/doors1.png");
    }
    to {
      background-image: url("//pic.davdian.com/free/2017/05/15/doors2.png");
    }
  }

  @-o-keyframes myredshank /* Opera */
  {
    from {
      background-image: url("//pic.davdian.com/free/2017/05/15/doors1.png");
    }
    to {
      background-image: url("//pic.davdian.com/free/2017/05/15/doors2.png");
    }
  }
</style>
