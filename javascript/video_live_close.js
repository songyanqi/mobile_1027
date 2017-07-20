$(function () {

    $(".exclusiveOwner").click(function(){
        window.bravetime.newConfirm("这是店主专享的独家课程，需要成为店主后才能看呦~~",{
            okText:"马上开店",
            okLink:"/348.html" ,//点击去开店的链接
            cancelText: ""
        });
    });

    $(".close_btn_con").click(function () {
        $(".live_video_list_bottom").addClass("hide");
        $("body").css("padding-bottom", "0px");
        $(".download_con").addClass("hide");
        $(".video_live_top").css("top","10px");
    });

    $(".message_send").click(downloadApp);
    $(".people .head").click(downloadApp);
    $(".user_list").click(downloadApp);
    $(".praise_num").click(downloadApp);

    if($(".list_attention").is(":visible")){
        $(".list_attention").click(function(){
            bravetime.addLoader({little:true});
            $.ajax({
                url: attentionUrl,
                type: 'post',
                dataType: 'json',
                data: {userId:userId},
                success: function (result) {
                    bravetime.removeLoader();
                    if (result.code == 0) {
                        $(".list_attention").addClass("hide");
                        $(".already_attention").removeClass("hide")
                    }
                    else {
                        bravetime.info(result.msg)
                    }
                },
                error: function () {
                    bravetime.info("网络异常,请重试")
                }
            });
        })
    }

    if($(".attention").is(":visible")){
        $(".attention").click(function(){
            bravetime.addLoader({little:true});
            $.ajax({
                url: attentionUrl,
                type: 'post',
                dataType: 'json',
                data: {userId:userId},
                success: function (result) {
                    bravetime.removeLoader();
                    if (result.code == 0) {
                        $(".attention").addClass("hide");
                        bravetime.info("您已关注主播");
                    }
                    else {
                        bravetime.info(result.msg)
                    }
                },
                error: function () {
                    bravetime.info("网络异常,请重试")
                }
            });
        })
    }

    function downloadApp(){
        window.bravetime.newConfirm("<a  >打开大V店</br>马上参与直播</a>",{
            okText:"打开",
            okLink:window.bravetime.callAppLive ,//点击去下载的链接
            cancelText:"取消"
        });
    }

    $(".playbacklist").click(function(){
        window.bravetime.newConfirm("打开大V店APP，观看精彩回放",{
            okText:"打开",
            okLink:window.bravetime.callAppLive ,//点击去下载的链接
            cancelText:"取消"
        });
    });

    setTimeout(function(){
        $(".oval_load").addClass("hide");
        $(".transcoding").html("哎呀......转码失败啦,不能播放了")
    },3000)


    $(".download_btn").click(function (event) {

        window.bravetime.callAppLive();

        event.preventDefault();
        return false;
    })
});
