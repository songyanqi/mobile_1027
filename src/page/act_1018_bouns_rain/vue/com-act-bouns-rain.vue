<style lang="sass"  rel="stylesheet/scss">
	@import "../../../common/css/common.scss";
	@import "../css/act_1018_bouns_rain.scss";
</style>
<template>
	<div class = "bounsCont">
		<div class = "bounsImgs" v-if = "Date.now() > 1508256000000 && Date.now() < 1508342400000">
			<img src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bounsMain_iconnew.png">
			<div class = "bounsMask clearfix">
				<div class = "bouns_0" :class = "{ maskImging:isBouns==1,maskImg:(isMask == 1 || isMask == 2 || isMask == 3 || isMask == 4) }"><span :class = "{ maskLine:isBouns==1 }">0点红包雨</span></div>
				<div class = "bouns_1" :class = "{ maskImging:isBouns==2,maskImg:(isMask == 2 || isMask == 3 || isMask == 4) }"><span :class = "{ maskLine: isBouns==2 }">8点红包雨</span></div>
				<div class = "bouns_2":class = "{ maskImging:isBouns==3,maskImg:(isMask == 3 || isMask == 4) }"><span :class = "{ maskLine: isBouns==3 }">16点红包雨</span></div>
				<div class = "bouns_3" :class = "{ maskImging:isBouns==4,maskImg:isMask == 4 }"><span :class = "{ maskLine: isBouns==4 }">20点红包雨</span></div>
			</div>
		</div>
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
				bounsId: 54,
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
	  		isBounsMask: 0,
	  		isBounsing: 0,
	  		currentTime: 0,
	  		timeObj: null,
	  		newTime: null,

	  		isBouns: 0,
	  		isMask: 0,
	  		isNewStart: false,
			}
		},
		props: ['currentDate'],
		watch: {
			currentTime: {
				handler() {
					let that = this;
					clearInterval(that.timeObj);
					that.timeObj = setInterval(() => {
					  that.currentTime = Date.now();

					  if (that.currentTime > 1508256000000 && that.currentTime <= 1508256900000) {
							that.isBouns = 1;
						}
						if (that.currentTime > 1508256900000 && that.currentTime <= 1508284800000) {
							that.isBouns = 0;
							that.isMask = 1;
						}

						if (that.currentTime > 1508284800000 && that.currentTime <= 1508285700000) {
							that.isBouns = 2;
							that.isMask = 1;
						}
						if (that.currentTime > 1508285700000 && that.currentTime <= 1508313600000) {
							that.isBouns = 0;
							that.isMask = 2;
						}

						if (that.currentTime > 1508313600000 && that.currentTime <= 1508314500000) {
							that.isBouns = 3;
							that.isMask = 2;
						}
						if (that.currentTime > 1508314500000 && that.currentTime <= 1508328000000) {
							that.isBouns = 0;
							that.isMask = 3;
						}

						if (that.currentTime > 1508328000000 && that.currentTime <= 1508328900000) {
							that.isBouns = 4;
						}
						if (that.currentTime > 1508328900000) {
							that.isBouns = 0;
							that.isMask = 4;
						}


					}, 1000);
				},
				deep: true,
			},
			startTime: {
				handler() {
					let that = this;
					that.currentTime = Date.now();
					this.$nextTick(function () {
						// 判断红包mask的显示
						// 2017/10/18 00:00:00  1508256000000
						// 2017/10/18 00:15:00  1508256900000
						// 2017/10/18 08:00:00  1508284800000
						// 2017/10/18 08:15:00  1508285700000
						// 2017/10/18 16:00:00  1508313600000
						// 2017/10/18 16:15:00  1508314500000
						// 2017/10/18 20:00:00  1508328000000
						// 2017/10/18 20:15:00  1508328900000
						// 0点到0:15:00

						if (!that.isStart) {
			        that.time = setInterval(function () {
			          that.judgeTime(function () {
			             that.judgeLogin(function () {
			               that.loadImg(['//pic.davdian.com/free/2017/02/24/red_01.png'], function () {
			                 that.startGame();
			              });
			            });
			          });
			        },1000);
			      }
					})
				},
				deep: true
			}
		},
		created() {
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
	            that.isNewStart = true;

	            if (that.isStartGame) {
	            	sessionStorage.setItem("20170420_hby",0);
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
				if(sessionStorage.getItem("20170420_hby") == '1'){
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
	      that.loadImg(['//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bounsrain_no11.png', '//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bouns_yes_icon.png'])
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

	      if (this.clickNum >= 5) {
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
			// 封装倒计时
			setIntervalTime() {
				let that = this;
				let currents = new Date(),
		        dateYears = currents.getFullYear(),
		        dateMounth = currents.getMonth() + 1,
		        dateDay = currents.getDate();

		    clearInterval(that.newTime);
		    if (!that.isNewStart) {
					that.newTime = setInterval(function () {
						that.actTimeList.map(function (item,index) {
							if (Date.now() > new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.beginTime).getTime() - 30000  && (parseInt(Date.now()/1000))*1000 <= new Date(dateYears + '/' + dateMounth + '/' + dateDay + ' ' + item.beginTime).getTime()) {
								that.getData();
							};
						});
	          // that.judgeTime(function () {
	          //    that.judgeLogin(function () {
	          //      that.loadImg(['//pic.davdian.com/free/2017/02/24/red_01.png'], function () {
	          //        that.startGame();
	          //     });
	          //   });
	          // });
	        },1000);
				}
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
	            if (currents.getDate() == new Date(that.endTime).getDate()) {
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
	          templateText += "<img src='//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bouns_iconno22.png'>";
	        } else {
	          templateText += "<img src='//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bounsrain_no11.png'>";
	        }

	        templateText += "<div class='text'>" + nextStr + "</div></div>" +
	          "<div class='close bounsColseBtn'><img src='//pic.davdian.com/free/2017/02/24/close_btn.png' alt=''></div> </div></div> ";

	        var $resultContainer = $(templateText);
	        $game.append($resultContainer);
	        $(".close").click(function () {
	          $(".game_container").hide();
	          that.isNewStart = false;
	          that.setIntervalTime();
	          
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
	                  "<img src='//mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/bouns_yes_icon.png'>" +
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
	                  that.isNewStart = false;
	                  that.setIntervalTime();
	                });
	                $(".look_red").click(function () {
	                	$(".game_container").hide();
	                	that.isNewStart = false;
	                  that.setIntervalTime();
	                })
	                if (!data.bonusInfo.minConsumePrice) {
	                  $(".min_text").hide();
	                };
	              } else {
	                that.showResult();
	              }
	            } else {
	              popup.toast(result.data.msg);
	              $(".game_container").hide();
	              that.isNewStart = false;
	              that.setIntervalTime();
	            }
	          }, error: function () {
	            popup.toast("网络异常，请稍后重试")
	            that.showResult();
	          }
	        });
	      }
			},
		}
	}
</script>