/**
 * Created by Murphy.lee on 16/10/10.
 */

$(function () {
    var swiper = new Swiper('.swiper-container', {
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            if(swiper.isEnd){
                console.log("oioioioioo");
                $(".tips").addClass("tips2");
            }else{
                $(".tips").removeClass("tips2");
            }
        },
        pagination: '.swiper-pagination',
        paginationClickable: true,
        //loop:true,
        direction: 'vertical'
    });
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