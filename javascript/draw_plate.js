/**
 * Created by Murphy.lee on 17/2/22.
 */
$(function () {
    if ($(".swiper-slide").size() > 4) {
        $(".swiper-slide").css("box-sizing", "border-box");
        // 小喇叭
        new Swiper('.fund_user_list', {
            noSwiping: true,
            autoplay: 3500,
            slidesPerView: 4,
            slidesPerGroup: 1,
            autoplayDisableOnInteraction: false,
            loop: true,
            direction: 'vertical'
        });
    }
    $(".confirm_btn").on("click", function () {
        if(Units.isAndroid() && Units.isWechat()){
            window.location.href=updateUrl(window.location.href); //不传参，默认是“t”
        }else {
            window.location.reload();
            return true;
        }
    });
    function updateUrl(url,key){
        var key= (key || 't') +'=';  //默认是"t"
        var reg=new RegExp(key+'\\d+');  //正则：t=1472286066028
        var timestamp=+new Date();
        if(url.indexOf(key)>-1){ //有时间戳，直接更新
            return url.replace(reg,key+timestamp);
        }else{  //没有时间戳，加上时间戳
            if(url.indexOf('\?')>-1){
                var urlArr=url.split('\?');
                if(urlArr[1]){
                    return urlArr[0]+'?'+key+timestamp+'&'+urlArr[1];
                }else{
                    return urlArr[0]+'?'+key+timestamp;
                }
            }else{
                if(url.indexOf('#')>-1){
                    return url.split('#')[0]+'?'+key+timestamp+location.hash;
                }else{
                    return url+'?'+key+timestamp;
                }
            }
        }
    }
    var ajaxing = 1,
        get_gift_close = $(".get_gift_close"),
    click_reword_btn = $(".click_reword_btn");
    click_reword_btn.on("click", function () {
        click_reword_btn.addClass("reword_btn_grey");
        run_plate();
        click_reword_btn.off("click");
    });
    function run_plate() {
        var num = 0,
            reword_note = $(".reword_note"),
            start_s,
            prize = 0,
            txts = '';
        function run_time(s, callback) {
            start_s = setInterval(function () {
                num++;
                if (num == 9) {
                    num = 1
                }
                reword_note.removeClass("select_note");
                $(".reword_note" + num).addClass("select_note");
                callback();
            }, s);
        }
        if (ajaxing) {
            ajaxing = 0;
            $.ajax({
                url: window.choujiang,
                data: {},
                dataType: "json",
                type: "get",
                success: function (result) {
                    if (result.code) {
                        bravetime.info(result.msg);
                        ajaxing = 1;
                    } else {
                        run_time(100, function () {
                        });
                        setTimeout(function () {
                            window.clearInterval(start_s);
                            run_time(250, function () {
                                setTimeout(function () {
                                    if (result.data.status == 1) {
                                        if (result.data.prize == "p_first") {
                                            prize = 2;
                                            txts = "获得免费哈佛游";
                                        }
                                        if (result.data.prize == "p_second") {
                                            if (Math.random() > 0.5) {
                                                prize = 7;
                                            } else {
                                                prize = 1;
                                            }
                                            txts = "获得牛听听";
                                        }
                                        if (result.data.prize == "p_third") {
                                            if (Math.random() > 0.5) {
                                                prize = 5;
                                            } else {
                                                prize = 8;
                                            }
                                            txts = "获得50元无门槛红包";
                                        }
                                        if (result.data.prize == "p_four") {
                                            prize = 4;
                                            imgs = "//pic.davdian.com/free/2017/kaidianchoujiang20170221/red10.png";
                                            txts = "获得5元红包和5元包邮券";
                                        }
                                        if (result.data.prize == "none") {
                                            if (Math.random() > 0.5) {
                                                prize = 3;
                                            } else {
                                                prize = 6;
                                            }
                                        }
                                        if (prize == num) {
                                            window.clearInterval(start_s);
                                            ajaxing = 1;
                                            setTimeout(function () {
                                                $(".mask").removeClass("hide");
                                                if (result.data.prize != "none") {
                                                    var html = '<img src="//pic.davdian.com/free/2017/kaidianchoujiang20170221/'+result.data.prize+'.png"><p>' + txts + '</p>';
                                                    $(".get_gift").html(html);
                                                    $(".mask .con:eq(0)").removeClass("hide");
                                                } else {
                                                    $(".mask .con:eq(1)").removeClass("hide");
                                                }
                                            }, 400)
                                        }
                                    }
                                    else {
                                        if (Math.random() > 0.5) {
                                            prize = 3;
                                        } else {
                                            prize = 6;
                                        }
                                        if (prize == num) {
                                            window.clearInterval(start_s);
                                            setTimeout(function () {
                                                $(".mask").removeClass("hide");
                                                $(".mask .con:eq(1)").removeClass("hide");
                                                ajaxing = 1;
                                            }, 400)
                                        }
                                    }
                                }, 1200)
                            });
                        }, 2500);
                    }
                }, error: function () {
                    bravetime.info("网络异常,请重试");
                    ajaxing = 1;
                }
            });
        }
    }
});
