var androidOpt = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loop:true,
    direction: 'vertical'
}
var iosOpt = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loop:true,
    //parallax: true,
    effect : 'fade',
    crossFade: true,
    direction: 'vertical'
}
// fix

if(window.Units&&Units.isAndroid()){
    var config = androidOpt;
}else{
    config = iosOpt;
}
var swiper = new Swiper('.swiper-container', config);

$(function () {
    var playBtn = $(".play_btn");
    var music = $("#bg_music");
    playBtn.click(function () {
        var $t = $(this);
        if($t.hasClass("run")){
            $t.removeClass("run");
            stop();

        }else{
            $t.addClass("run");
            play();
        }

    });

    try {
        if((window.Units&&Units.isIOS()&&Units.isWechat())||(window.Units&&!Units.isIOS())){
            setTimeout(function () {
                play();
            },1000)
            playBtn.addClass("run");
        }
    }catch (e){

    }

    function play() {
        music.get(0).play();
    }

    function stop() {
        music.get(0).pause();
    }



   /* $("#listen_container").swipe( {
        swipeUp:function(event, direction, distance, duration, fingerCount) {
            swiper.slideNext();
        },
        swipeDown:function(event, direction, distance, duration, fingerCount) {
            swiper.slidePrev();
        },
        threshold:0
    });*/
});