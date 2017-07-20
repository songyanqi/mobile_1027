var currentVoice;
var lastMsgId = 0;
var minMsgId = 0;
var lastMsg;
var myScroll;

$(function () {
    //获取浏览器窗口高度
    //if (window.innerHeight)
    //    winHeight = window.innerHeight;
    //else if ((document.body) && (document.body.clientHeight))
    //    winHeight = document.body.clientHeight;
    //$("#wrapper").find(".all_review").css("min-height", winHeight+450+"px");
    //课程回顾页面运行
    var live_id = $(".live_history").attr("id");
    if ($(".live_history").length) {
        $.ajax({
            type: "get",
            url: historyUrl,
            data: {id: live_id, limit: 20, minMsgId: minMsgId},
            dataType: "json",
            success: function (result) {
                if (result.length > 0) {
                    lastMsg = result[0];
                    minMsgId = result[result.length - 1].id;
                    lastMsgId = lastMsg.id;
                    if (msgShowCount == -1) {
                        $("#wrapper").css("overflow","hidden");
                        live_history(result);
                        //初始页面完成后绑定下拉刷新事件
                        if($(".live_history").find("li").size()>0){
                            loaded();
                            setTimeout(function(){
                                myScroll.refresh();
                            },500);
                        }
                    }
                }
            }
        });
    }

    var licount=0;
    function live_history(data) {
        for (var i = 0; i < data.length; i++) {
            var $li = $('<li></li>').attr("msg_id", data[i].id);
            var headimg = $('<span class="head"></span>');
            var right = $('<div class="right"></div>');
            var name = $('<h2></h2>');
            var main = $('<div class="main"></div>');
            if (licount == 0) {
                $(".live_history").append($li);
                licount=1;
            } else {
                $li.insertBefore($(".live_history").find("li:eq(0)"));
            }

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
            var user_role = data[i].user_role;
            if(user_role==2 || user_role==3){
                name.addClass("color_FF4A7D");
            }
            var type = data[i].objectName;
            if (type == 1) {
                main.html(text.replace(/[^"'](http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g, function(d){return "<span class='text_link_live'><a href='"+d+"'>"+d+"</a></span>";}));
            }
            if (type == 2) {
                main.css("padding", "6px");
                if (data[i].content == "") {
                    $li.remove();
                }
                else {
                    var pic = $('<img src="' + data[i].content + '">').attr("value", data[i].imageUri);
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
                var voice = $('<audio src="' + data[i].content + '" preload="auto"></audio>');
                var duration = data[i].duration;
                var width = (duration * 2 + 40) > 200 ? 200 : (duration * 2 + 40);
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
        }

    }

    function loaded() {
        var $prompt_live = $(".prompt_live");
        myScroll = new IScroll('#wrapper', {
            probeType: 3,
            mouseWheel: true,
            click: true,
        });
        var ajaxings = 0;
        myScroll.on("scroll", function () {
            if(ajaxings == 0){
                var y = this.y;
                if (y >= 30) {
                    $prompt_live.addClass("prompt_ring");
                } else if (y < 30 && y > 0) {
                    $prompt_live.removeClass("prompt_ring");
                }
            }
        });

        myScroll.on("slideDown", function () {
            //如果正在进行AJAX请求的话,不再多次请求
            if (ajaxings == 0) {
                if (this.y > 30) {
                    ajaxings = 1;
                    $prompt_live.addClass("prompt_ring");
                    $.ajax({
                        type: "get",
                        url: historyUrl,
                        data: {id: live_id, limit: 20, minMsgId: minMsgId},
                        dataType: "json",
                        success: function (result) {
                            if (result.length > 0) {
                                minMsgId = result[result.length - 1].id;
                                setTimeout(function () {
                                var dom=$(".live_history").find("li:eq(0)");
                                live_history(result);
                                $prompt_live.removeClass("prompt_ring");
                                myScroll.refresh();
                                myScroll.scrollToElement(dom.get(0),0);
                                myScroll.scrollBy(0, 35)
                                },800);
                                ajaxings = 0;
                                if(result.length < 20){
                                    ajaxings = 1;
                                    $prompt_live.removeClass("prompt_ring");
                                }
                            }
                            else {
                                $prompt_live.removeClass("prompt_ring");
                            }
                        }
                    });
                }
            }
        });
    }
});

/**
 * 播放音频
 * @param v jquery元素 是我想要播放的音频的那个div.voice
 */
function playVoice(voiceDiv, flag) {
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

window.tlShareCallback = window.sendShareCallback = window.QQShareCallback = window.weiboShareCallback = window.qZoneShareCallbackCancel = function () {
    bravetime.tj.evSend({category: "live", action: "share", label: "share_" + live_id, "value": 1});
};

