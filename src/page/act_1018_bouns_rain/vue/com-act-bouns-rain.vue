<style lang="sass"  rel="stylesheet/scss">
	@import "../../../common/css/common.scss";
	@import "../css/act_1018_bouns_rain.scss";
</style>
<template>
	<div class = "bounsCont">
		<div v-if = "isConfirm">
	    <div class = "weui-mask"></div>
	    <div class="weui-dialog">
	      <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
	      <div class="weui-dialog__bd"><slot><div v-html="content"></div></slot></div>
	      <div class="weui-dialog__ft">
	        <span class="weui-dialog__btn weui-dialog__btn_default" @click="_onCancel">{{cancelText}}</span>
	        <span class="weui-dialog__btn davdian-confirm" @click="_onConfirm">{{confirmText}}</span>
	      </div>
	    </div>
	  </div>
	</div>
</template>
<script>
import login from '../../../common/js/module/login.js';
import tongji from '../../../common/js/module/tjAncestor.js';
import layout from "../../../../module/index/layout.es6";
import popup from '../../../common/js/module/popup.js';

	export default {
		data() {
			return {
				bounsId: 119,
				startTime: "",
	  		endTime: "",
	  		isStartGame: false,
	  		actTimeList: [],
	  		isLimit: true,
	  		clickNum: 0,
	  		isStart: false,
	  		time: null, 
	  		isLastTime: false,
	  		startURL: "/api/mg/sale/lottery/info",
	  		bounsURL: "/api/mg/sale/lottery/get",
	  		isLogin: false,

	  		title: "提示",
	  		content: '需要先登录才能参与红包雨活动哦，先去登录吧～',
	  		cancelText: "取消",
	  		confirmText: "确定",
	  		isConfirm: false,
			}
		},
		watch: {},
		created() {
  		console.log("bouns-rains");
			this.isLogin = login.isLogined();
	  	this.getData();
  	},
		methods: {
			_onCancel() {
				this.isConfirm = false;
			},
			_onConfirm() {
				this.isConfirm = false;
				location.href = "/login.html?referer=" + encodeURI(location.href);
			},
			getData() {
				let that = this;
				$.ajax({
	        url: that.startURL,
	        data: layout.strSign("bounsInfo",{
	          lotteryActId: that.bounsId,
	        }),
	        type: 'POST',
	        cache: false,
	        dataType: "json",
	        success: function (res) {
	          var data = res.data;
	          if (res.code == 0) {
	            that.isStartGame = data.joinLimit == 'no' ? true : false;
	            that.startTime = data.startTime*1000;
	            that.endTime = data.endTime*1000;
	            that.actTimeList = data.timeScope;

	            // imgUrl = data.shareInfo.imgUrl;  //分享图片
	           	// descContent = data.shareInfo.desc; // 分享文案
	            // shareTitle = data.shareInfo.title;  //分享标题

	            if (that.isStartGame) {
	              that.judgeTime(function () {
	                that.judgeLogin(function () {
	                  that.loadImg(['//pic.davdian.com/free/2017/02/24/red_01.png'], function () {
	                    that.startGame();
	                  });
	                });
	              });
	            } else {
	              that.isLimit = false;
	            }
	          } else {
	            console.log(res.msg);
	          }
	        },
	      })
			},
	    loadImg (list, callback) {
	      var loaded = 0, callbacked = false;
	      for (var i = 0; i < list.length; i++) {
	        (function () {
	          var img = new Image();
	          img.onload = function () {
	            loaded++;
	            if (loaded == list.length) {
	              if (!callbacked) {
	                callbacked = true;
	                callback && callback();
	              }
	            }
	          };
	          img.src = list[i];
	        })();
	      }
	      setTimeout(function () {
	        if (!callbacked) {
	          callbacked = true;
	          callback && callback();
	        }
	      }, 500)
	    },
			judgeLogin(callback) {
				if (this.isLogin) {
	        callback()
	      } else {
	        popup.confirm({
	          className: '',
	          title: '提示',
	          text: "需要先登录才能参与红包雨活动哦，先去登录吧～",
	          okBtnTitle: '',
	          okBtnCallback() {
	            location.href = "/login.html?referer=" + encodeURI(location.href);
	          },
	          cancelBtnTitle: '',
	          cancelBtnCallback() {

	          }
	        });
	        // bravetime.newConfirm("需要先登录才能参与红包雨活动哦，先去登录吧～", {
	        //   okLink: "/login.html?referer=" + encodeURI(location.href)
	        // })
	      }
			},
			judgeTime(callback) {
				var that = this;
				if (that.isLimit) {
	        var date = new Date(),
	          dateYears = date.getFullYear(),
	          dateMounth = date.getMonth() + 1,
	          dateDay = date.getDate(),
	          dateTime = date.getTime();

	        if (dateTime > new Date(that.startTime).getTime() && dateTime < new Date(that.endTime).getTime()) {

	          that.actTimeList.map(function (item) {
	            if (dateTime >= new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.beginTime).getTime() && dateTime <= new Date(
	                dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.overTime).getTime()) {
	              that.isStart = true;
	              clearInterval(that.time);
	              callback();
	            }
	          });
	        }
	      } else {
	        clearInterval(that.time);
	      }
			},
			startGame() {
	      var that = this;
				if(sessionStorage.getItem("20170420_hby")){
	        return false;
	      }
	      var $container = $("<div class='game_container'><div class='mask'></div><div class='game'></div> </div>");
	      $(document.body).addClass("gaming").append($container);
	      var $game = $container.find(".game");
	      that.countdown($game);
	      // bravetime.tj.pvSend("hongbaoyu_1704_play");
	      tongji.pvSend("hongbaoyu_1704_play");
			},
			countdown($game) {
				let that = this;
				var $countdownContainer = $("<div class='red_countdown'><div class='count_con'>" +
	      "<img src='//pic.davdian.com/free/2017/02/24/red_01.png'>" +
	      "<span>3</span>" +
	      "</div></div> ");
	      $game.append($countdownContainer);
	      var size = $(".count_con").width() / 4;
	      var font = $game.find("span");
	      font.css("font-size", size + "px").css("margin-left", -(font.width() / 2) + "px");
	      var t = 3;
	      var timer = setInterval(function () {
	        if (t-- > 1) {
	          font.html(t)
	        } else {
	          that.showGame($game);
	          clearInterval(timer);
	          $countdownContainer.remove();
	        }
	      }, 1000);
	      //要替换的是这里的图片
	      that.loadImg(['//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon1.png', '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon2.png',
	        '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon3.png', '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon4.png',
	        '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon6.png']);
			},
			showGame($game) {
				let that = this;
				var $redContainer = $("<div class='red_container'></div>");
	      $game.append($redContainer);
	      setTimeout(function () {
	        that.addRed($redContainer, 1);
	      }, 300);
	      that.loadImg(['//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon7.png', '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon8.png'])
			},
			addRed($redContainer, redNum) {
				var that = this;
				var num = 50, removeTime = 4000;
	      var index = Math.ceil(Math.random() * 3) + 1;
	      var $red;
	      if (index === 4) {
	        $red = $("<div class='red'><img style = 'width: 44px' src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon" + index + ".png' alt=''></div>");
	      } else if (index === 2) {
	        $red = $("<div class='red'><img style = 'width: 57px' src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon" + index + ".png' alt=''></div>");
	      } else if (index === 3) {
	        $red = $("<div class='red'><img style = 'width: 60px' src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon" + index + ".png' alt=''></div>");
	      } else {
	        $red = $("<div class='red'><img src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon" + index + ".png' alt=''></div>");
	      }
	      $red.css("left", (Math.random() * $redContainer.width())*0.8 + "px").css("top", '-100px').css("width", ["", "", 65, 81, 57, 81][index] + "px");

	      $redContainer.append($red);

	      setTimeout(function () {
	        if (redNum < num) {
	          that.addRed($redContainer, ++redNum);
	        } else {
	          setTimeout(function () {
	            that.calculateResult();
	            $redContainer.remove();
	          }, removeTime);
	        }
	      }, 15000 / num);
	      setTimeout(function () {
	        $red && $red.length && $red.remove();
	      }, removeTime);
	      $red.on("mousedown touchstart", function (e) {
	        if (!$red.hasClass("clicked")) {
	          $red.addClass("clicked");
	          that.clickNum++;
	          $(this).addClass("boom").css("animation-play-state", "paused").find("img").attr("src", '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon6.png');
	          setTimeout(function () {
	            $red && $red.length && $red.remove();
	          }, 500)
	        }
	        event.preventDefault();
	        e.preventDefault();
	        return false;
	      })
			},
			calculateResult() {
				console.log("clickNum",this.clickNum);

	      if (this.clickNum > 0) {
	        this.showResult(this.bounsId);
	      } else {
	        this.showResult();
	      }
	      sessionStorage.setItem("20170420_hby",1);
			},
			r(list) {
				var g = Math.random(), v = 0, theList = list[0];

	      console.log(list, g);
	      for (var i = 0; i < list.length; i++) {
	        v += +list[i].n;
	        if (v > g) {
	          theList = list[i];
	          break;
	        }
	      }
	      return theList.id;
			},
			showResult(id) {
				let that = this;
				$(document.body).removeClass("gaming");

	      var currents = new Date(),
	        dateYears = currents.getFullYear(),
	        dateMounth = currents.getMonth() + 1,
	        dateDay = currents.getDate(),
	        currentHour = currents.getHours(),
	        nextStr = "";

	      that.actTimeList.map(function (item, index) {
	        if (that.actTimeList[index+1]) {
	          var getMinutes = new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + that.actTimeList[index+1].beginTime).getMinutes();
	          getMinutes = getMinutes < 10 ? '0'+getMinutes : getMinutes;
	        }
	        var getMinutesTo = new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + that.actTimeList[0].beginTime).getMinutes();
	        getMinutesTo = getMinutesTo < 10 ? '0'+getMinutesTo : getMinutesTo;

	        if (currents.getTime() >= new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.beginTime).getTime() && currents.getTime() <= new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.overTime).getTime()) {
	          if (index == that.actTimeList.length-1) {
	            if (currents.getDate() == new Date(endTime).getDate()) {
	              nextStr = '';
	              that.isLastTime = true;
	            } else {
	              nextStr = "下一场红包雨开始时间：明天 "+ new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + that.actTimeList[0].beginTime).getHours() +":"+ getMinutesTo +":00";
	            }
	          } else {
	            nextStr = "下一场红包雨开始时间：今天 "+ new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + that.actTimeList[index+1].beginTime).getHours() +":"+ getMinutes +":00";
	          }
	        }
	      });
	      var $game = $(".game");
	      if (!id) {
	        var fStr = nextStr.indexOf('时间');
	        var second = nextStr.substring(0,fStr+3);
	        var tStr = nextStr.substring(fStr+3);
	        nextStr = second + "</br>" + tStr;

	        var templateText = "<div class='result_container'>" +
	          "<div class='result result_none'><div class='img_con'>";
	        if (that.isLastTime) {
	          templateText += "<img src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon9.png'>";
	        } else {
	          templateText += "<img src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon7.png'>";
	        }

	        templateText += "<div class='text'>" + nextStr + "</div></div>" +
	          "<div class='close bounsColseBtn'><img src='//pic.davdian.com/free/2017/02/24/close_btn.png' alt=''></div> </div></div> ";

	        var $resultContainer = $(templateText);
	        $game.append($resultContainer);
	        $(".close").click(function () {
	          $(".game_container").hide();
	        });
	      } else {
	        console.log("抽中id为" + id + "的红包")
	        $.ajax({
	          url: that.bounsURL,
	          data:layout.strSign("bounsResult",{
	            lotteryActId: that.bounsId,
	          }),
	          type: 'POST',
	          cache: false,
	          dataType: "json",
	          success: function (result) {
	            if (result.code == 0) {
	              var data = result.data;
	              if (data.lotteryResult == 'success' && that.clickNum >= 5) {
	                var $resultContainer = $("<div class='result_container'>" +
	                  "<div class='result'><div class='img_con'>" +
	                  "<img src='//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon8.png'>" +
	                  "<div class='text'>" + nextStr + "</div>" +
	                  "<div class='min_text'>满" + data.bonusInfo.minConsumePrice + "元可用</div>" +
	                  "<div class='num_text'><span class = 'num_text_icon'>¥</span>" +data.bonusInfo.bonusMoney+ "</div>" +
	                  "<div class='num_time'>有效期：" + data.bonusInfo.useBeginTime +"~"+data.bonusInfo.useEndTime +"</div>" +
	                  "<a class='look_red' href='/user_bonus.html?_refer=hongbaoyu'></a>" +
	                  "<div class='close bounsColseBtn'></div>" +
	                  "</div>" +
	                  "<div class='close bounsColseBtn'><img src='//pic.davdian.com/free/2017/02/24/close_btn.png' alt=''></div> </div></div> ")
	                $game.append($resultContainer);
	                $(".close").click(function () {
	                  $(".game_container").hide();
	                });
	                if (!data.bonusInfo.minConsumePrice) {
	                  $(".min_text").hide();
	                };
	              } else {
	                showResult();
	              }
	            } else {
	              popup.toast(result.data.msg);
	              $(".game_container").hide();
	            }
	          }, error: function () {
	            popup.toast("网络异常，请稍后重试")
	            showResult();
	          }
	        });
	      }
			},
		}
	}
</script>