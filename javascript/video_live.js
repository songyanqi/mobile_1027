$(function () {
    if(window.exclusiveOwner!==undefined){
        if(exclusiveOwner==0){
            $(".video_playback_bg").removeClass("hide");
            $("#video_con").addClass("hide");
        }
    }
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
                ios10: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&& !!u.match(/OS 10/), //ios终端
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
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    $("#video_con").css("width", windowWidth + "px").css("height", windowHeight + "px");
    $("#video_con video").css({"background": 'url('+video_bg+') no-repeat center',"background-size": "cover"});
    $("#video_con object").css({"background": 'url('+video_bg+') no-repeat center',"background-size": "cover"});

    var player = videojs('example_video_1');
    player.ready(function () {
        if(!browser.versions.android){
            player.play();
        }

    });


    if(browser.versions.ios){
        $(".lock_wrp").removeClass("hide");
    }
    else if(browser.versions.android){
        $(".vjs-big-play-button").addClass("display_b");
        player.on('play', function () {
            rec()
        })
    }

    function rec(){
        var mymessage=confirm("打开【大V店】享受更好体验哦~~");
        if(mymessage==true)
        {
            window.bravetime.callAppLive();
        }
    }

    if(browser.versions.ios10){
        rec();
    }


    // 监听播放

    player.on('play', function () {
        setSize();
        $("#video_con video").css("background","none");
    });

    // 监听页面大小变化
     $(window).resize(function() {
     setSize();
     });


    /**
     * 重新设置大小
     * @returns {boolean}
     */
    function setSize() {
        var myVideo = $("#example_video_1");
        var $video =$(".vjs-tech");
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
        $video.css("width", shouldWidth + "px").css("height", shouldHeight + "px");
        myVideo.css("width", shouldWidth + "px").css("height", shouldHeight + "px");
    }
    
    $(".download_btn").click(function (event) {

        window.bravetime.callAppLive();

        event.preventDefault();
        return false;
    })
});
