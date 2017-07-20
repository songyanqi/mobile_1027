$(function () {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    $("#video_con").css("width", windowWidth + "px").css("height", windowHeight + "px");
    $(".vjs-poster").css("display","block");

    var player = videojs('example_video_1');
  //判断在安卓手机上点击播放弹出提示
    var browser={
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    };

    if(browser.versions.android){
        $(".lock_wrp").addClass("hide");
        $(".vjs-big-play-button").addClass("display_b");
        player.on('play', function () {
            rec()
        })
    }

    function rec(){
        var mymessage=confirm("打开【大V店】享受更好体验哦~~");
        if(mymessage==true)
        {
           window.open("https://www.baidu.com")
        }
    }


    // 监听播放
    setTimeout(
        function(){
            player.on('play', function () {
                $(".vjs-poster").css("display","none");
                setSize();
            })
        },100);

    // 监听页面大小变化
   /* $(window).resize(function() {
        setSize();
    });
*/
  /*  // 监听转屏
    window.onorientationchange = function () {
        $(".lock_wrp").removeClass("hide");
    };*/

    /**
     * 重新设置大小
     * @returns {boolean}
     */
    function setSize() {
        var myVideo = $("#example_video_1");
        var $video =myVideo.find('video');
        var video = $video.get(0);
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var videoWidth = video.videoWidth;
        var videoHeight = video.videoHeight;
        var shouldWidth, shouldHeight;

        if(!videoWidth){
            setTimeout(setSize,100);
            return false;
        }

        if (videoHeight / videoWidth > windowHeight / windowWidth) {
            // 视频比较高  视频 180*100  窗口 80*50
            shouldWidth = windowWidth;
            shouldHeight = Math.floor(videoHeight * (windowWidth / videoWidth)); // w 50 h 90
        } else {
            shouldWidth = Math.floor(videoWidth * (windowHeight / videoHeight));
            shouldHeight = windowHeight;
        }

        console.log("窗口:" + windowWidth + "*" + windowHeight);
        console.log("视频:" + videoWidth + "*" + videoHeight);
        console.log("调整后:" + shouldWidth + "*" + shouldHeight);

        $video.css("width", shouldWidth + "px").css("height", shouldHeight + "px");
        myVideo.css("width", shouldWidth + "px").css("height", shouldHeight + "px");
    }
});

/*
$(function () {


    document.getElementById("example_video_1").addEventListener("canplay", setTimeout(function () {
        myFunction();
    }, 1000));

    function myFunction() {
        var video_width = $(window).width();
        var video_height = $(window).height();

        $("#video_con").css({"width": video_width, "height": video_height});

        $("#example_video_1").css({"width": video_width, "height": video_height});

        //视频全屏幕显示

        //获取可视区域宽高



        var video = $(".vjs-tech");
        if(!video.length){
            return  false;
        }
        var videoH = video[0].videoHeight;
        var videoW = video[0].videoWidth;

        console.log(videoH);
        console.log(videoW);

        //计算长宽比
        var videoRatio = videoH / videoW;
        console.log(videoRatio);


        console.log(video_height / video_width);
        //如果可视区域的高宽比大于视频本身的高宽比,表示视频本身的高小于可视区域的高


        //如果可视区域高宽比 小于 视频高宽比, 表示视频比较高,上下隐藏
        if (video_height / video_width < videoRatio) {

            video.css({"width": video.width(), "height": (video.width() * videoRatio)});
            console.log("小于");
            console.log('Width:' + video.width() + ' Height: ' + (video.width() * videoRatio));
            var hide_height = video.height() - video_height;
            console.log(hide_height);
            video.css({"position": "absolute", "top": -(hide_height / 2)});
        }
        else {
            video.css({"width": video.height() / videoRatio, "height": video.height()});
            console.log("大于");
            console.log('Width:' + video.height() / videoRatio + ' Height: ' + video.height());
            var hide_width = video.width() - video_width;
            console.log(hide_width);
            video.css({"position": "absolute", "left": -(hide_width / 2)});

        }


    }


});*/
