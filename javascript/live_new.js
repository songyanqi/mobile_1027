// 如果已经存在lastMsgId 就用,没有的话就定义lastMsgId为0
if (window.lastMsgId) {
    var lastMsgId = window.lastMsgId;
} else {
    var lastMsgId = 0;
}
var currentVoice;

$(function () {
    //课程直播页面运行
    var live_id = $(".live_history").attr("id");
    if ($(".live").length) {
        var init = setInterval(function () {
            $.ajax({
                type: "get",
                url: newMessageUrl,
                data: {id: live_id, maxMessageId: lastMsgId},
                dataType: "json",
                success: function (result) {
                    for (var i = 0; i < result.length; i++) {
                        // 新的一条消息的id大于lastMsgId时才插入
                        if (result[i].id > lastMsgId) {
                           //重新定义lastMsgId等于当前数据Id
                            lastMsgId = result[i].id;
                            var height = $(document).height() - $(window).height() - $(document).scrollTop();
                            var $li = $('<li></li>').attr("msg_id", result[i].id);
                            var liSize = $(".live").find("li").size();
                            if (msgShowCount == -1) {
                                $(".live").append($li);
                            }
                            else {
                                if (liSize < msgShowCount) {
                                    $(".live").append($li);
                                    if (liSize + 1 == msgShowCount) {
                                        $(".all_review").append('<div class="vip_limit_point">*直播进行中,学习完整课程请加入*</div>')
                                        clearInterval(init)
                                    }
                                }
                            }
                            var headimg = $('<span class="head"></span>');
                            var right = $('<div class="right"></div>');
                            var name = $('<h2></h2>');
                            var main = $('<div class="main"></div>');
                            $li.append(headimg);
                            $li.append(right);
                            right.append(name);
                            right.append(main);
                            var text = result[i].content;
                            if (result[i].headImage == "") {
                                result[i].headImage = "//pic.davdian.com/free/v_head_80_80.png";
                            }
                            var img = $('<img src="' + result[i].headImage + '">');
                            headimg.append(img);
                            name.append(result[i].fromUserName);
                            var user_role = result[i].user_role;
                            if(user_role==2 || user_role==3){
                                name.addClass("color_FF4A7D");
                            }
                            var type = result[i].objectName;
                            if (type == 1) {
                                main.html(text.replace(/[^"'](http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g, function(d){return "<span class='text_link_live'><a href='"+d+"'>"+d+"</a></span>";}));
                            }
                            if (type == 2) {
                                main.css("padding", "6px");
                                if (result[i].content == "") {
                                    $li.remove();
                                }
                                else {
                                    var pic = $('<img src="' + result[i].content + '">').attr("value", result[i].imageUri);
                                    main.append(pic);
                                    pic.on("click", function () {
                                        var src = $(this).attr("value");
                                        var big_img_container = $('<div class="big_img_container"><img src="' + src + '"><div class="big_img_point">点击图片可返回，请勿点击返回键</div></div>');
                                        $("body").append(big_img_container);
                                        big_img_container.on("click", function () {
                                            $(this).remove()
                                        });
                                        singlePicHold(big_img_container.find("img").get(0));
                                    });
                                    singlePicHold(pic.get(0));
                                }
                            }
                            if (type == 3) {
                                $li.addClass("v_li");
                                var voice = $('<audio src="' + result[i].content + '" preload="auto"></audio>');
                                var duration = result[i].duration;
                                var width = (duration * 2 + 40) > 200 ? 200 : (duration * 2 + 40);
                                var item = $('<div class="voice" style="width: ' + width + 'px;"><i class="fa fa-rss"></i><p class="min">' + duration + '\'\'</p><span class="is_read"></span></div>');
                                main.append(item);
                                main.append(voice);
                                $(".live").find("div.voice").each(function () {
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
                            if (msgShowCount ==-1 && $(".live_history").find("li").size()>0) {
                                    myScroll.refresh();
                                    setTimeout(function () {
                                        var heights=$(".all_review").height()-$("#wrapper").height()+ myScroll.y-$(".live").height();
                                        if (heights < 500) {
                                            var lastLi = $(".live").find("li:last-child").get(0);
                                            myScroll.scrollToElement(lastLi,500);
                                        }
                                    }, 600);
                            }
                           else {
                                setTimeout(function () {
                                    if (height < 500) {
                                        window.scrollTo(0, 99999)
                                    }
                                }, 500);
                            }
                        }

                    }
                    if (msgShowCount == -1 && $(".live_history").find("li").size()>0){
                        //刷新直播页滑动块儿
                        myScroll.refresh();
                    }
                }
            });

        }, 5 * 1000);
    }
});

/**
 * 播放音频
 * @param v jquery元素 是我想要播放的音频的那个div.voice
 */
function playVoice(voiceDiv, flag) {
    voiceDiv.find(".is_read").css("display", "none");
    if (voiceDiv) {
        if (voiceDiv.length) {
            // 停止正在播放的一条
            if (!flag) {
                stopVoice(currentVoice);
            }

            currentVoice = voiceDiv;
            var audioElement = voiceDiv.parent().find("audio");

            // 放音频
            audioElement[0].addEventListener("play",function () {
                voiceDiv.addClass("play");
            });

            // 监听音频结束后自动播放下个音频
            audioElement[0].addEventListener("ended", function () {
                stopVoice(voiceDiv, true);
                if (window.Units && Units.isMobileIOS() && !Units.isWechat() && !Units.isApp()) {

                } else {
                    // next 下一个想要播放的音频的那个div.voice
                    var next = $(voiceDiv.parents("li").nextAll("li.v_li").find(".voice").get(0));
                    playVoice(next, true);
                }
            });

            audioElement[0].play();
        }
    }

}


function stopVoice(voiceDiv, flag) {
    if (voiceDiv && voiceDiv.length) {
        var audioElement = voiceDiv.parent().find("audio");
        voiceDiv.removeClass("play");
        if (!flag) {
            audioElement[0].pause();
            // 点击这条音频暂停后,再点击这条音频重新开始播放
            audioElement[0].currentTime = 0.0;
        }
    }
}
