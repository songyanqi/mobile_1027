$(function () {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    var player = jwplayer('my-video').setup({
        file: 'http://pili-live-hls.davdian.com/davdian/dvd_vlive_229.m3u8',
        width: windowWidth,
        height: windowHeight
    });

    // 监听播放
    player.on("play", function () {
        setSize();
    });

    // 监听页面大小变化
    $(window).resize(function() {
        setSize();
    });

    // 监听转屏
    window.onorientationchange = function () {
        setSize();
        window.orientation||bravetime.info("请竖屏观看");
    };

    /**
     * 重新设置大小
     * @returns {boolean}
     */
    function setSize() {
        var myVideo = $("#my-video");
        var $video = myVideo.find('video');
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
