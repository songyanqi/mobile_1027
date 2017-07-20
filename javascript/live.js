RongIMClient.init(ClientInit);
RongIMLib.RongIMVoice.init();
RongIMLib.RongIMEmoji.init();

var currentVoice;
var currentBase64;
var sess_key = $.cookie("sess_key");

loadRongIMClient(false);

function loadRongIMClient(ref) {
    if ($(".live").length) {
        var data = {refresh: ref ? 1 : 0};
        if (sess_key != undefined) {
            data.sess_key = sess_key;
        }
        $.ajax({
            type: "post",
            url: tokenurl,
            data: data,
            dataType: "json",
            success: function (result) {
                if (result.code == 0) {
                    var token = result.data.token;
                    if (sess_key == undefined) {
                        $.cookie("sess_key", result.sess_key);
                    }
                    // var sess_key = result.sess_key;
                    RongIMClient.setConnectionStatusListener({
                        onChanged: function (status) {
                            switch (status) {
                                //链接成功
                                case RongIMLib.ConnectionStatus.CONNECTED:
                                    msg();
                                    break;
                                //正在链接
                                case RongIMLib.ConnectionStatus.CONNECTING:
                                    break;
                                //重新链接
                                case RongIMLib.ConnectionStatus.DISCONNECTED:
                                    break;
                                //其他设备登陆
                                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                                    break;
                                //网络不可用
                                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                                    break;
                            }
                        }
                    });

// 消息监听器

                    RongIMClient.setOnReceiveMessageListener({
                        // 接收到的消息
                        onReceived: function (message) {


                            var height = $(document).height() - $(window).height() - $(document).scrollTop();
                            if (message.objectName == "RC:CmdMsg") {

                            } else if (lastMsgTimestamp >= message.sentTime) {

                            } else {
                                var user = message.content.user;
                                var headImg = user.icon || user.portrait;

                                if (headImg == "") {
                                    headImg = "//pic.davdian.com/free/v_head_80_80.png";
                                }
                                var name = user.name;
                                var li = $("<li></li>");
                                var liSize = $(".live").find("li").size();
                                if (msgShowCount == -1) {
                                    $(".live").append(li);
                                }
                                else {
                                    if (liSize < msgShowCount) {
                                        $(".live").append(li);
                                        if (liSize + 1 == msgShowCount) {
                                            $(".all_review").append('<div class="vip_limit_point">*直播进行中,学习完整课程请加入*</div>')
                                        }
                                    }else {
                                        return;
                                    }
                                }
                                li.append('<span class="head"><img src="' + headImg + '"></span>');
                                var rightCon = $("<div class='right'></div>");
                                li.append(rightCon);
                                rightCon.append('<h2>' + name + '</h2>');

                                var msgContent = message.content;
                                var content = msgContent.content;
                                var main = $("<div class='main'></div>");
                                rightCon.append(main);
                                if (message.objectName == "RC:TxtMsg") {
                                    var str = RongIMLib.RongIMEmoji.emojiToHTML(content);
                                    main.append(str);
                                }
                                if (message.objectName == "RC:ImgMsg") {
                                    main.css("padding", "6px");
                                    var content = msgContent.content;
                                    var imageUri = msgContent.imageUri;
                                    var thumbnail = $('<img src ="data:image/png;base64,' + content + '">').attr("value", imageUri);
                                    if (msgContent.content == "") {
                                        li.remove();
                                    }
                                    else {
                                        main.append(thumbnail);
                                        thumbnail.on("click", function () {
                                            var src = $(this).attr("value");
                                            var big_img_container = $('<div class="big_img_container"><img src="' + src + '"></div>');
                                            $("body").append(big_img_container);
                                            big_img_container.on("click", function () {
                                                $(this).remove()
                                            });
                                            singlePicHold(big_img_container.find("img").get(0));
                                        });
                                        singlePicHold(thumbnail.get(0));
                                    }
                                }
                                if (message.objectName == "RC:VcMsg") {
                                    li.addClass("v_li");
                                    var content = msgContent.content;

                                    var duration = msgContent.duration;
                                    var VcMsgWidth = (duration / 2 + 40) > 200 ? 200 : (duration / 2 + 40);
                                    var VcMsg = $('<div duration="' + duration + '" class="voice" src="' + content + '" style="width: ' + VcMsgWidth + 'px;"><i class="fa fa-rss"></i><p class="min">' + duration + '\'\'</p><span class="is_read"></span></div>');
                                    main.append(VcMsg);
                                    var v = VcMsg;
                                    v.off("click");
                                    v.on("click", function () {
                                        if (!v.hasClass("play")) {
                                            playVoice(v);
                                        }
                                        else {
                                            stopVoice(content);
                                        }

                                    });
                                }

                                if (height < 800) {
                                    window.scrollTo(0, 99999)
                                }
                            }
                        }


                    });
                    function playNextVoice(v) {
                        if (v == currentVoice) {
                            var next = $(v.parents("li").nextAll("li.v_li").find(".voice").get(0));
                            if (next.length) {
                                playVoice(next);
                            }
                        }
                    }

                    function playVoice(v) {
                        v.find(".is_read").css("display", "none");
                        currentBase64 && RongIMLib.RongIMVoice.stop(currentBase64);
                        currentVoice && $(currentVoice).removeClass("play");
                        currentVoice = v;
                        v.addClass("play");
                        var base64 = v.attr("src");
                        var duration = v.attr("duration");
                        RongIMLib.RongIMVoice.play(base64, duration);
                        currentBase64 = base64;
                        var timer = setTimeout(function () {
                            v.removeClass("play");
                            //RongIMLib.RongIMVoice.stop(base64);
                            playNextVoice(v);
                            clearTimeout(timer);
                        }, duration * 1000+1000);
                    }

                    function stopVoice(base64) {
                        currentVoice.removeClass("play");
                        if(typeof (base64)=="undefined"){
                            RongIMLib.RongIMVoice.stop();
                        }else{
                            RongIMLib.RongIMVoice.stop(base64);
                        }

                        currentVoice = null;
                    }

                    RongIMClient.connect(token, {
                        onSuccess: function (userId) {
                            //console.log("Login successfully." + userId);
                            //console.log(token);
                        },
                        onTokenIncorrect: function () {
                            if (!ref) {
                                loadRongIMClient(true);
                            }
                            //console.log(token);
                        },
                        onError: function (errorCode) {
                            var info = '';
                            switch (errorCode) {
                                case RongIMLib.ErrorCode.TIMEOUT:
                                    info = '超时';
                                    break;
                                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                    info = '未知错误';
                                    break;
                                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                                    info = '不可接受的协议版本';
                                    break;
                                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                                    info = 'appkey不正确';
                                    break;
                                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                                    info = '服务器不可用';
                                    break;
                            }
                            console.log(errorCode);
                        }
                    });

                    function msg() {
                        var room = $(".live").attr("id");
                        RongIMClient.getInstance().joinChatRoom(room, 3000, {
                            onSuccess: function () {
                                //console.log("joinChatRoom Successfully");
                                //console.log(arguments);
                            },
                            onError: function (error) {
                                //console.log("joinChatRoom:errorcode:" + error);
                            }
                        });

                        RongIMClient.getInstance().getConversationList({
                            onSuccess: function (list) {
                                //console.log(list);
                            },
                            onError: function (error) {
                                // do something...
                            }
                        }, null);
                        RongIMClient.getInstance().hasRemoteUnreadMessages(token, {
                            onSuccess: function (hasMessage) {
                                if (hasMessage) {
                                    console.log(hasMessage);
                                } else {
                                    // 没有未读的消息
                                }
                            }, onError: function (err) {
                                // 错误处理...
                            }
                        });

                    }
                }
            }
        });
    }
}



