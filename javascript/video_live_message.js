//获取房间id
$("body").attr("id",video_live_chatRoomId);

$("#total_num").html(user_num);
//红包数额保留两位小数点
$(".get_number").html(bonus_money.toFixed(2));



//点赞数超出四位数显示万,+ 是把字符串转换成数字
$(".praise_num").html(praise(praise_num));

function praise(number){
    var txt;
    if(number>=10000){
        //number%10000余方法判断小于1000显示几位小数点
        if(number%10000<1000){
            txt = (number / 10000).toFixed(0) + '万';
        }
        else {
            txt = (number / 10000).toFixed(1) + '万';
        }
    }else {
        txt = number;
    }
    return txt;
}

if(window.it){
    var it=window.it
}
else {
    var it="bmdehs6pd42ks";
}

// 直播时长
var videoTime = $("#video_long_time");
var data_end= videoTime.attr("data_end");
videoTime.attr("long_time",video_timer);
videoTime.html(calculateTime(video_timer));


function calculateTime(second) {
    var s = second % 60, m = Math.floor(second / 60) % 60,
        h = Math.floor(second / 60 / 60);
    var str = '';
    if (h) {
        str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    } else if (m) {
        str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    } else {
        str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    }
    return str;
}


if (status==1) {

    // 直播中启动定时器
    var timer = setInterval(function () {
        //关闭定时器
        if (data_end == 1) {
            clearInterval(timer)
        }
        else {
            var second = parseInt(videoTime.attr("long_time"));
            videoTime.attr("long_time", second + 1);
            video_timer = second;
            videoTime.html(calculateTime(video_timer));
        }

    }, 1000);

    // 融云收取信息
    RongIMClient.init(it);
    RongIMLib.RongIMVoice.init();
    RongIMLib.RongIMEmoji.init();

    var sess_key = $.cookie("sess_key");

    loadRongIMClient(false);

    function loadRongIMClient(ref) {
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

                            var li = $("<li></li>");
                            if(message.messageType=="TextMessage"){
                                var content = message.content.content;
                                var user = message.content.user;
                                var name =user.name;
                                var isTel =isPhoneNum(name);
                                if(isTel){
                                    var myphone=name.substr(3,4);
                                    name=name.replace(myphone,"****");
                                }
                                else {
                                    name=user.name;
                                }
                                var str = RongIMLib.RongIMEmoji.emojiToHTML(content);
                                $(".video_message ul").append(li);
                                li.append('<span class="info_title">'+name+' : </span><span class="info_con">'+str+'</span>');
                            }
                            else if(message.messageType=="CommandMessage") {
                                var contentName = message.content.name;
                                var headImg = message.content.data.userInfo.portraitUri;
                                var userId=message.content.data.userInfo.userId;
                                var name =message.content.data.userInfo.userName;
                                var isTel =isPhoneNum(name);
                                if(isTel){
                                    var myphone=name.substr(3,4);
                                    name=name.replace(myphone,"****");
                                }
                                else {
                                    name=message.content.data.userInfo.userName;
                                }

                                if(contentName== "RC_BONUS"){
                                    var bonus_money_info=message.content.data.bonusInfo.price;
                                    $(".video_message ul").append(li);
                                    li.append('<span class="info_title">'+name+' : </span><span class="info_con color_red_info">给主播发了一个 '+bonus_money_info+' 的大红包！<i class="message_red_icon"></i></span>');
                                    var  bonus_money_total=bonus_money + bonus_money_info;
                                    bonus_money=bonus_money_total;
                                    $(".get_number").html(bonus_money.toFixed(2));
                                }
                                if(contentName == "RC_SHARE"){
                                    $(".video_message ul").append(li);
                                    li.append('<span class="info_title">'+name+' : </span><span class="info_con color_share_info">分享了直播~</span>');
                                }
                                if(contentName == "RC_FIRST_PRAISE"){
                                    $(".video_message ul").append(li);
                                    li.append('<span class="info_title">'+name+' : </span><span class="info_con color_praise_info">给主播点赞啦~！<i class="message_praise_icon"></i></span>');
                                    var  praise_count=praise_num+1;
                                    praise_num = praise_count;
                                    $(".praise_num").html(praise(praise_num));
                                }
                                if(contentName == "RC_PRAISE"){
                                    var  praise_count=praise_num+1;
                                    praise_num = praise_count;
                                    $(".praise_num").html(praise(praise_num));
                                }
                                if(contentName == "RC_ATTENTION"){
                                    $(".video_message ul").append(li);
                                    li.append('<span class="info_title color_white">直播消息 : </span><span class="info_con color_point">'+name+'关注了主播!</span>');
                                }
                                if(contentName == "RC_DISABLEMSG"){
                                    var gagName =message.content.data.disableSendMsg.userName;
                                    var gagNameIsTel =isPhoneNum(gagName);
                                    if(gagNameIsTel){
                                        var myphone=gagName.substr(3,4);
                                        gagName=gagName.replace(myphone,"****");
                                    }
                                    else {
                                        gagName=message.content.data.disableSendMsg.userName;
                                    }
                                    $(".video_message ul").append(li);
                                    li.append('<span class="info_title color_white">直播消息 : </span><span class="info_con color_point">'+gagName+'被主播禁言了!</span>');
                                }
                                //进直播间
                                if(contentName == "RC_COMEIN"){
                                    var headImgLi=$('<li></li>').attr("user_id",userId);
                                    var user_count=user_num+1;
                                    user_num=user_count;
                                    $("#total_num").html(user_num);
                                    //如果列表中已经有当前用户头像了,则不显示
                                    if($(".right li[user_id="+ userId+"]").length){

                                    }
                                    else {
                                        if($(".right li").length){
                                            headImgLi.insertBefore($(".right").find("li:eq(0)"));
                                        }
                                        else {
                                            $(".right ul").append(headImgLi)
                                        }
                                        if(headImg=="" || headImg== undefined){
                                            headImgLi.append($('<span><img src="//pic.davdian.com/free/default_head_icon_0419.png"></span>'));
                                        }
                                        else {
                                            headImgLi.append($('<span><img src="'+headImg+'"></span>'));
                                        }
                                    }

                                }
                                //出直播间
                                if(contentName == "RC_LEAVE"){
                                    $(".right li[user_id="+ userId+"]").remove();
                                }
                                //直播结束
                                if(contentName== "RC_VIDEO_END"){
                                    data_end = 1;
                                    //结束之后执行
                                    end_con(user_num,praise_num,video_timer)
                                }
                            }

                            //收到信息自动向上滚动
                            $(".video_message").scrollTop(99999);
                        }
                    });

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
                        var chatRoomId = $("body").attr("id"); // 聊天室 Id。
                        var count = 0;// 拉取最近聊天最多 50 条。
                        RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
                            onSuccess: function () {
                                //console.log("joinChatRoom Successfully");

                            },
                            onError: function (error) {
                                console.log("joinChatRoom:errorcode:" + error);
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
//直播结束执行
else if(status==3){
    end_con(user_num,praise_num,video_timer)
}


function end_con(user_num,praise_num,video_timer){
    $(".video_live_end").removeClass("hide");
    $(".live_long_time").html(calculateTime(video_timer).split(":").join(" : "));
    $("#people").html(user_num);
    $("#praise").html(praise_num);
    $(".video-js").addClass("hide");
    $("#video_con").css({"background": 'url('+video_bg+') no-repeat center',"background-size": "cover"});
}



function isPhoneNum(s)
{
    var patrn=/^((110)|(13[0-9])|(14[5-7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
    if (!patrn.exec(s)) return false
    return true
}
