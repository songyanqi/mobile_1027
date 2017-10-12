<template>
	<div class = "bounsCont"></div>
</template>
<script>
	export default {
		data() {
			return {
				bounsId: 10,
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
    		bounsURL: "/api/mg/sale/lottery/get"
			}
		},
		watch: {},
		mounted() {
			this.getData();
		},
		methods: {
			getData() {
				let that = this;
				$.ajax({
          url: startURL,
          data:strSign({
            lotteryActId: that.bounsId,
          }),
          type: 'POST',
          cache: false,
          dataType: "json",
          success: function (res) {
            var data = res.data;
            if (res.code == 0) {
              isStartGame = data.joinLimit == 'no' ? true : false;
              startTime = data.startTime*1000;
              endTime = data.endTime*1000;
              actTimeList = data.timeScope;

              imgUrl = data.shareInfo.imgUrl;  //分享图片
             	descContent = data.shareInfo.desc; // 分享文案
              shareTitle = data.shareInfo.title;  //分享标题

              if (isStartGame) {
                that.judgeTime(function () {
                  that.judgeLogin(function () {
                    that.loadImg(['//pic.davdian.com/free/2017/02/24/red_01.png'], function () {
                      that.startGame();
                    });
                  });
                });
              } else {
                isLimit = false;
              }
            } else {
              console.log(res.msg);
            }
          },
        })
			},
			startGame() {
				if(sessionStorage.getItem("20170420_hby")){
          return false;
        }
	      var $container = $("<div class='game_container'><div class='mask'></div><div class='game'></div> </div>");
	      $(document.body).addClass("gaming").append($container);
	      var $game = $container.find(".game");
	      countdown($game);
	      bravetime.tj.pvSend("hongbaoyu_1704_play")
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
	      loadImg(['//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon1.png', '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon2.png',
	        '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon3.png', '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon4.png',
	        '//mamaj-oss.oss-cn-beijing.aliyuncs.com/free/Bouns/bouns_icon6.png']);
			},
		}
	}
</script>