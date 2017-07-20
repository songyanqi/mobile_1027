
var confirmContainer = $(".kd_confirm_container");
var okBtn = confirmContainer.find(".kd_code_btn");
var errorText = confirmContainer.find(".error_code_info");
var noCodeBtn = confirmContainer.find(".no_code_btn");
noCodeBtn.click(function () {
    kd1();
});
// 监听转屏
window.onorientationchange = function () {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    if(windowWidth > windowHeight){
        bravetime.info("请竖屏浏览");
	}
};
okBtn.click(function () {
    var inviteCode = $(".invite_code").val();
    if(inviteCode.length == 0){
        errorText.removeClass("hide").html("请输入邀请码");
        return false;
    }
    kd1(true,inviteCode);
});
function kd1(useCode,code){
    bravetime.addLoader({little:true});
    // kd_btn.addClass("btn-disable").find("span").html("&nbsp;&nbsp;&nbsp;&nbsp;请求中...");
    if(useCode){
        data = {'goods_id':'348',use_code:1,code:code};
    }else{
        data = {'goods_id':'348',use_code:0,code:0};
    }
    console.log(data)
    $.ajax({
        url:'/index.php?c=ShopGoods&a=ajax_do',
        data:data,
        dataType:"json",
        type:"POST",
        success:function(result){
            bravetime.removeLoader();
            // kd_btn.removeClass("btn-disable").find("span").html("立即开店");
            if(result.errcode==0){
                window.bravetime.goto(result["data"]["url"]);
            } else if (result.errcode == 100204 || result.errcode == 100205) {
                window.bravetime.goto(result["data"]["url"]);
            } else if(result.errcode == 2017){
                errorText.removeClass("hide").html(result["errmsg"]||"");
                console.log('errcode')
            }else {
                window.bravetime.newAlert(result["errmsg"]);
            }
        },
        error:function(){
            bravetime.removeLoader();
            // kd_btn.removeClass("btn-disable").find("span").html("立即开店");
            bravetime.ajaxError(15);
        }
    });
}

confirmContainer.find(".mask").click(function () {
    confirmContainer.addClass("hide").removeClass("show_slow");
});
var d129 = $(".detail129_bottom");
var h5 = $(".kd_h5");
if(h5 && h5.length){
    var winHeight = $(window).height();
    h5.css("height",winHeight+"px");
    var winWidth = $(document.body).width();
    var items = h5.find(".img_item").css("height",winHeight+"px");

    if(winHeight/winWidth>1728/1080){
        items.addClass("too_height");
    }else{
        items.addClass("too_width");
    }
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop:true,
        direction: 'vertical'
    });
}

var confirmContainer = $(".kd_confirm_container");
window.tlShareCallback = function(){
    if(window.share_redirect_url){
        window.bravetime.goto(window.share_redirect_url);
    }
};
window.sendShareCallback = function(){
    if(window.share_redirect_url){
        window.bravetime.goto(window.share_redirect_url);
    }
};
window.QQShareCallback = function(){
    if(window.share_redirect_url){
        window.bravetime.goto(window.share_redirect_url);
    }
};





document.getElementsByClassName('swiper-wrapper')[0].style.height = document.documentElement.clientHeight + 'px'
document.onselectstart = new Function('event.returnValue=false;');
var mySwiper = new Swiper ('.swiper-container', {
	initialSlide: 0,
	direction: 'vertical',
	speed: 600,
	loop : true,
	autoHeight: 'auto',
		onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    	swiperAnimateCache(swiper); //隐藏动画元素 
    	swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlidePrevEnd: function (swiper) {
			swiperAnimate(swiper);
		},
		onSlideNextEnd: function (swiper) {
			swiperAnimate(swiper);
		},
		onSlideChangeEnd: function(swiper){ 
  		swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		}
	})
	function infinite(el) {
		document.getElementsByClassName(el)[0].style.animationIterationCount = 'infinite'
	}
	document.getElementById('html').style.fontSize = window.screen.width / 10 + 'px'
	// infinite('ani')
	if (window.status == 3) {
		for (var i = 0;i< document.querySelectorAll('.page6_div1').length;i++) {
			document.querySelectorAll('.page6_div1')[i].setAttribute('class', 'selected page6_div page6_div1')
		}
	}else {
		for (var i = 0;i< document.querySelectorAll('.page6_div2').length;i++) {
			document.querySelectorAll('.page6_div2')[i].setAttribute('class', 'selected page6_div page6_div2')
		}
	}
	var musicEl = document.getElementById('music')
	var noMusicEl = document.getElementById('noMusic')
	var audio = document.getElementById('bg_music')
	audio.play()
	audio.addEventListener("playing", function(){
        musicEl.style.display = 'block'
		noMusicEl.style.display = 'none'
    });
	musicEl.onclick = function () {
		musicEl.style.display = 'none'
		noMusicEl.style.display = 'block'
		bf()
	}
	noMusicEl.onclick = function () {
		musicEl.style.display = 'block'
		noMusicEl.style.display = 'none'
		bf()
	}
	function bindClick (obj, href) {
		for (var i = 0;i<obj.length;i++) {
			obj[i].onclick = function () {
				this.src = '//pic.davdian.com/free/2016/12/24/tree/page6_btn1a.png'
				var that = this
				setTimeout(function () {
					// window.location = href
					function _callback(r) {
		                if(typeof r == "string"){
		                    r = JSON.parse(r);
		                }
		                var code = r.code;
		                if(code==0){
		                    // 没登录
		                }else if(code == 1){
		                    location.reload();
		                }else if(code == 2){
		                    k();
		                }
		            }
		            if(Units.isApp()){
		                if(Units.getAppVersion()>=240){
		                    bravetime.nativeLogin(_callback);
		                }else{
		                    k();
		                }
		            }else{
		                k();
		            }
		            function k() {
		                if($(that).hasClass("btn-disable")){
		                    return;
		                }
		                if(window["needCode"]){
		                    confirmContainer.removeClass("hide").addClass("show_slow");
		                }else{
		                    kd();
		                }
		            }
		            function kd(useCode,code){
					    bravetime.addLoader({little:true});
					    // kd_btn.addClass("btn-disable").find("span").html("&nbsp;&nbsp;&nbsp;&nbsp;请求中...");
					    if(useCode){
					        data = {'goods_id':'348',use_code:1,code:code};
					    }else{
					        data = {'goods_id':'348',use_code:0,code:0};
					    }
					    $.ajax({
					        url:'/index.php?c=ShopGoods&a=ajax_do',
					        data:data,
					        dataType:"json",
					        type:"POST",
					        success:function(result){
					            bravetime.removeLoader();
					            // kd_btn.removeClass("btn-disable").find("span").html("立即开店");
					            if(result.errcode==0){
					                window.bravetime.goto(result["data"]["url"]);
					            } else if (result.errcode == 100204 || result.errcode == 100205) {
					                window.bravetime.goto(result["data"]["url"]);
					            } else if(result.errcode == 2017){
					                errorText.removeClass("hide").html(result["errmsg"]||"");
					                console.log('errcode')
					            }else {
					                window.bravetime.newAlert(result["errmsg"]);
					            }
					        },
					        error:function(){
					            bravetime.removeLoader();
					            // kd_btn.removeClass("btn-disable").find("span").html("立即开店");
					            bravetime.ajaxError(15);
					            that.src = '//pic.davdian.com/free/2016/12/24/tree/page6_btn1b.png'
					        }
					    });
					}
			        if(window.is_new_seller){
			            $(".mask-to-web").removeClass("hide");
			            if(window.shareStr){
			                $(".mask-to-web").find("p").remove();
			                $(".mask-to-web").append($(shareStr));
			            }
			        }
				},150)
			}
		}
		
	}
	bindClick(document.getElementsByClassName('page6_share'), '/348.html')
	// bindClick(document.getElementsByClassName('page6_makemoney1'), 'http://www.baidu.com')
	function bf() {
		if(audio!==null){             
			if(audio.paused){
			    audio.play();
			}else{
			   audio.pause();
			}
		}
	}
	var img_url = '//pic.davdian.com/user/2016/06/06/80_80_3ac6f90599265841db4f48c0c6a73e89.png'
	var img = new Image()
	img.src = img_url
	img.onload = function(){
		var arr = document.querySelectorAll('img')
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].getAttribute('dataSrc')){
				arr[i].setAttribute('src', arr[i].getAttribute('dataSrc'))
			}
		} 
}
function toDou(n){
  if(n<10){
      return '0' + n;
  }else{
      return '' + n;
  }
}
var page6_day1 = document.querySelectorAll('.page6_day1')
var page6_day2 = document.querySelectorAll('.page6_day2')
var page6_time1 = document.querySelectorAll('.page6_time1')
var page6_time2 = document.querySelectorAll('.page6_time2')
var page6_time3 = document.querySelectorAll('.page6_time3')
var page6_time4 = document.querySelectorAll('.page6_time4')
var page6_time5 = document.querySelectorAll('.page6_time5')
var page6_time6 = document.querySelectorAll('.page6_time6')
var page4_eye = document.getElementById('page4_eye')
var timer = null
function overTime() {
	var now = new Date(); 
  var endDate = new Date(2017, 0, 1)
  var leftTime= endDate.getTime()-now.getTime()
	var leftsecond = parseInt(leftTime/1000)
	var day=Math.floor(leftsecond/(60*60*24))
	var hour=Math.floor((leftsecond-day*24*60*60)/3600)
	var minute=Math.floor((leftsecond-day*24*60*60-hour*3600)/60)
	var second=Math.floor(leftsecond-day*24*60*60-hour*3600-minute*60)
	if (leftTime > 0) {
  		// changeSrc1(page6_day1, toDou(day).substring(0, 1))
		changeSrc1(page6_day2, toDou(day).substring(1, 2))
		changeSrc(page6_time1, toDou(hour).substring(0, 1))
		changeSrc(page6_time2, toDou(hour).substring(1, 2))
		changeSrc(page6_time3, toDou(minute).substring(0, 1))
		changeSrc(page6_time4, toDou(minute).substring(1, 2))
		changeSrc(page6_time5, toDou(second).substring(0, 1))
		changeSrc(page6_time6, toDou(second).substring(1, 2))
  } else {
  		// changeSrc1(page6_day1, 0)
		changeSrc1(page6_day2, 0)
		changeSrc(page6_time1, 0)
		changeSrc(page6_time2, 0)
		changeSrc(page6_time3, 0)
		changeSrc(page6_time4, 0)
		changeSrc(page6_time5, 0)
		changeSrc(page6_time6, 0)
		clearInterval(timer)
  }
}
function changeSrc (arr, num) {
	var str = '//pic.davdian.com/free/2016/12/24/tree/number_'
	for (var i = 0 ; i < arr.length; i++) {
		arr[i].src = str + num + '.png'
	}
}
function changeSrc1 (arr, num) {
	var str = '//pic.davdian.com/free/2016/12/24/tree/num_'
	for (var i = 0 ; i < arr.length; i++) {
		arr[i].src = str + num + '.png'
	}
}
function getLevel() {
	var page1_peacock = document.getElementsByClassName('page1_peacock')
	var page1_peacockBg = document.getElementsByClassName('page1_peacockBg')
	for (var i = 0;i<page1_peacock.length;i++) {
		if (window.people <=0) {
			page1_peacock[i].src = '//pic.davdian.com/free/2016/12/24/tree/page1_bee.png'
		} else if (window.people >0 && window.people<20) {
			page1_peacock[i].src = '//pic.davdian.com/free/2016/12/24/tree/page1_butterfly.png'
		}else if (window.people >=20 && window.people<50) {
			page1_peacock[i].src = '//pic.davdian.com/free/2016/12/24/tree/page1_peacock.png'
		}else if (window.people >= 50){
			page1_peacock[i].src = '//pic.davdian.com/free/2016/12/24/tree/page1_phenix.png'
		}
	}
}
getLevel()
window.onload = function(){
  overTime();
  timer = setInterval(overTime, 1000);
  setInterval(function () {
  	if (page4_eye.getAttribute('num') == 1) {
	  	page4_eye.setAttribute('num', 2)
	  	page4_eye.src='//pic.davdian.com/free/2016/12/24/tree/page4_eye2.png'
	  } else {
	  	page4_eye.setAttribute('num', 1)
	  	page4_eye.src='//pic.davdian.com/free/2016/12/24/tree/page4_eye1.png'
	  }
  }, 1000)
}


