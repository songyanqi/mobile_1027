
var currentVoice;
var lastMsgTimestamp;

$(function () {
    //课程回顾页面运行
    var live_id =$(".live_history").attr("id");
    if ($(".live_history").length) {
        $.ajax({
            type: "get",
            url:historyUrl,
            data: {id:live_id},
            dataType: "json",
            success: function (result) {
                if (result.length>0) {
                    var lastMsg = result[result.length-1];
                    lastMsgTimestamp = lastMsg.timestamp;
                    if(msgShowCount==-1){
                        live(result);
                    }
                }
            }
        });

    }

    function live(data) {
        for (var i = 0; i < data.length; i++) {
            var $li = $('<li></li>').attr("msg_id", data[i].id);
            var headimg = $('<span class="head"></span>');
            var right = $('<div class="right"></div>');
            var name = $('<h2></h2>');
            var main = $('<div class="main"></div>');
            $(".live_history").append($li);
            $li.append(headimg);
            $li.append(right);
            right.append(name);
            right.append(main);
            var text = data[i].content;
            if (data[i].headImage == "") {
                data[i].headImage = "//pic.davdian.com/free/v_head_80_80.png";
            }
            var img = $('<img src="' + data[i].headImage + '">');
            headimg.append(img);
            name.append(data[i].fromUserName);
            var type = data[i].objectName;
            if (type == 1) {
                main.append(text)
            }
            if (type == 2) {
                main.css("padding","6px");
                if(data[i].content==""){
                    $li.remove();
                }
                else {
                    var pic = $('<img src="' + data[i].content + '">').attr("value", data[i].imageUri);
                    main.append(pic);
                    pic.on("click", function () {
                        var src = $(this).attr("value");
                        var big_img_container=$('<div class="big_img_container"><img src="' + src + '"></div>');
                        $("body").append(big_img_container);
                        big_img_container.on("click",function(){
                            $(this).remove()
                        });
                        singlePicHold(big_img_container.find("img").get(0));
                    });
                    singlePicHold(pic.get(0));
                }
            }
            if (type == 3) {
                $li.addClass("v_li");
                var voice = $('<audio src="' + data[i].content + '" preload="auto"></audio>');
                var duration = data[i].duration;
                var width = (duration / 2 + 40) > 200 ? 200 : (duration / 2 + 40);
                var item = $('<div class="voice" style="width: ' + width + 'px;"><i class="fa fa-rss"></i><p class="min">' + duration + '\'\'</p></div>');
                main.append(item);
                main.append(voice);
                $(".live_history").find("div.voice").each(function () {
                    var v = $(this);
                    v.off("click");
                    v.on("click", function () {
                        if (!v.hasClass("play")) {
                            playVoice(v);
                        }
                        else {
                            stopVoice(v);
                        }
                    });

                });

            }
            var is_show = data[i].is_show;
            $li.append('<div class="btn"></div>');
            $li.append('<div class="delete_bg"></div>');
            if (is_show == false) {
                $li.addClass("msg_show");
            }
            $li.find(".btn").on("click", function () {
                var $li2 = $(this).parents("li");
                var is_show2 = $li2.hasClass("msg_show");
                if (is_show2 == false) {
                    $li2.addClass("msg_show");
                } else {
                    $li2.removeClass("msg_show");
                }
            });
        }

    }
});

/**
 * 播放音频
 * @param v jquery元素 是我想要播放的音频的那个div.voice
 */
function playVoice(voiceDiv) {
    if (voiceDiv) {
        if (voiceDiv.length) {
            // 停止正在播放的一条
            stopVoice(currentVoice);


            currentVoice = voiceDiv;
            var audioElement = voiceDiv.parent().find("audio");

            // 放音频
            audioElement[0].play();
            // 放动画
            voiceDiv.addClass("play");

            // 监听音频结束后自动播放下个音频
            audioElement[0].addEventListener("ended", function () {
                stopVoice(voiceDiv);

                // next 下一个想要播放的音频的那个div.voice
                var next = $(voiceDiv.parents("li").nextAll("li.v_li").find(".voice").get(0));
                playVoice(next);


            });
        }
    }

}


function stopVoice(voiceDiv) {
    if (voiceDiv && voiceDiv.length) {
        var audioElement = voiceDiv.parent().find("audio");
        voiceDiv.removeClass("play");
        audioElement[0].pause();
        // 点击这条音频暂停后,再点击这条音频重新开始播放
        audioElement[0].currentTime = 0.0;
    }
}

window.tlShareCallback = window.sendShareCallback = window.QQShareCallback = window.weiboShareCallback = window.qZoneShareCallbackCancel = function () {
    // bravetime.tj.evSend({category:"live",action:"share",label:"share_"+live_id,"value":1});
};
