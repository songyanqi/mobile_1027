var js = document.scripts;
for(var i=0;i<js.length;i++){
    var src = js[i].src;
    if(src.indexOf("base.js")>-1){
        var baseFeUrl = src.substring(0,src.indexOf('/javascript/base.js'));
        window.baseFeUrl = baseFeUrl;
    }
    if(src.indexOf("dist")>-1){
        var baseFeUrl = src.substring(0,src.indexOf('/dist'));
        window.baseFeUrl = baseFeUrl;
    }

}

// 统一加 数据统计
window.cnzz = false; // 是否使用cnzz
window.baidu = true; // 是否使用百度统计

window.google = false; // 是否使用google统计
window.dvd_tj = true; // 大V店统计



if (window.cnzz || window.baidu || window.google || window.dvd_tj) {
    if(!window.bravetime||!window.bravetime.tj){
        var js = document.scripts;
        var tjscr = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1) + "tongji.js";
        tjscr = tjscr.replace("dist","javascript");
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = tjscr;
        var s = document.getElementsByTagName('head')[0].getElementsByTagName("link")[0];
        s.parentNode.insertBefore(oScript, s);
        window.bravetime = window.bravetime || {};
    }
}

if(window.google){

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-61684246-2', 'auto');


}

if (window.cnzz) {
    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cspan id='cnzz_stat_icon_1255599577'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1255599577' type='text/javascript'%3E%3C/script%3E"));
}
if (window.baidu) {
    var _hmt = window._hmt || [];
    if (window["tj_path"]) {
        _hmt.push(['_setAutoPageview', false]);
    }
    window._hmt = _hmt;
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?9b39bbe0b5396b90787c80447d337d58";
        var s = document.getElementsByTagName('head')[0].getElementsByTagName("link")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}



$(document).ready(function () {

    window.iosInterface = window.iosInterface || {};

    window.iosInterface.setCookie = function (_name, _value) {
        var setCookie = function (name, value) {
            console.log("_before set:" + document.cookie);
            var domainList = location.hostname.split(".");
            var domainStr = "." + domainList[domainList.length - 2] + "." + domainList[domainList.length - 1];
            document.cookie = name + "=" + value + ";domain=" + domainStr;
            console.log("_after set:" + document.cookie);
        };
        var getCookie = function (name) {
            var cookieObj = {};
            var cookieList = document.cookie.split(";");
            for (var i = 0, item; item = cookieList[i++];) {
                var k = item.split("=")[0].replace(" ", ""), v = item.split("=")[1];
                cookieObj[k] = v;
            }
            return cookieObj[name];
        };

        try {
            if (getCookie(_name) == _value) {
                return JSON.stringify({code: 0, msg: "success"});
            } else {
                setCookie(_name, _value);

                if (getCookie(_name) == _value) {
                    location.reload();
                    return JSON.stringify({code: 0, msg: "success"});
                } else {
                    return JSON.stringify({code: 1, msg: "set fail"});
                }

            }
        } catch (e) {
            return JSON.stringify({code: -1, msg: e.message});
        }


    };

    window.iosInterface.getHeadAndFootData = function () {
        var defaultData = {
            showHead: 1,     // 是否展示头部
            showFoot: 0,     // 是否展示底部
            backOnHead: 1,   // 头部返回按钮
            homeOnHead: 0,   // 头部首页按钮
            shareOnHead: 0,  // 头部分享按钮
            btnOnHead: 0,    // 头部文字按钮
            btnText: "",     // 头部文字按钮文字
            btnLink: ""      // 头部文字按钮链接
        };
        var formatData = {
            showHead: 0,     // 是否展示头部
            showFoot: 0,     // 是否展示底部
            backOnHead: 0,   // 头部返回按钮
            homeOnHead: 0,   // 头部首页按钮
            shareOnHead: 0,  // 头部分享按钮
            btnOnHead: 0,    // 头部文字按钮
            btnText: "",     // 头部文字按钮文字
            btnLink: ""      // 头部文字按钮链接
        };
        if (window.appData) {
            return JSON.stringify($.extend(formatData, window.appData));
        } else {
            return JSON.stringify(defaultData);
        }

    };

    window.iosInterface.getShareInfo = function () {
        var shareInfo = {
            title: window.shareTitle || "MAMA+|大V店",
            desc: window.descContent || "MAMA+|大V店",
            link: window.lineLink||window.location.href,
            imgUrl: window.imgUrl?window.imgUrl.replace("https","http"):"//pic.davdian.com/free/index0925_icon1.png?x-oss-process=image/resize,m_fill,w_80"
        };
        return JSON.stringify(shareInfo);
    };

    window.iosInterface.netWorkGetShareInfo = window.iosInterface.getShareInfo;

    window.bravetime = window.bravetime || {};


    /**
     * 调用原生方法
     * @param callback
     * @param error
     * @param className
     * @param method
     * @param argumentsList
     */
    window.bravetime.callNative = function (callback, error, className, method, argumentsList) {
        var t = Date.now();
        window["callback_" + t] = callback;
        window["error_" + t] = error;
        var str = "neng:\/\/call.app.com?v=" + [encodeURI("callback_" + t), encodeURI("error_" + t), className, method,JSON.stringify(argumentsList)].join("|||").replace(/\"/g,"'");
        window.bravetime.goto(str);
    };


    window.bravetime.callNative2 = function (host, action, params, callback, minv, minCallback) {
        var callback = callback||function () {};

        if(window.Units&&Units.getAppVersion()>=minv.split(".").reduce(function(a,b){return +a*10+ +b})){
            var t = Date.now()+"_"+Math.round(Math.random()*10000);
            window["callback_" + t] = callback;

            var str = "davdian:\/\/call."+host+".com?action="+encodeURI(action)+"&params="+encodeURI(JSON.stringify(params))+"&callback="+encodeURI("callback_" + t)+"&minv="+encodeURI(minv);
            window.bravetime.goto(str);
        }else{
            if(minCallback){
                minCallback();
            }else{
                bravetime.newAlert("请升级您的APP")
            }
        }
    };

    window.bravetime.callAppLive = function (url) {
        if(window.Units&&Units.isIOS()){
            var href = location.href;
            var baseHref;
            if(href.indexOf("davdian.com")>0){
                baseHref = "davdian.com";
            }else if(href.indexOf("vyohui.cn")>0){
                baseHref = "vyohui.cn"
            }else {
                baseHref = "bravetime.net";
            }
            window.d_callback = function () { };
            var para = {
                "liveId" : window.liveId,
                "isPlaying":"1" ,// 1表示直播中，2是回放，3是整理中
                "fromPush":"0" // 0表示不来自于推送，1表示来自推送
            };
            location.href="//invoke."+baseHref+"?cmd="+encodeURIComponent('davdian://call.LiveVideo.com?action=enterRoom&params='+encodeURIComponent(JSON.stringify(para)) +'&callback=d_callback&minv=2.5.0');
        }else if(window.Units&&Units.isAndroid()&&!Units.isWechat()){
            var baseHref = "davdian.com";
            window.d_callback = function () { };
            var para = {
                "liveId" : window.liveId,
                "isPlaying":"1" ,// 1表示直播中，2是回放，3是整理中
                "fromPush":"0" // 0表示不来自于推送，1表示来自推送
            };
            location.href="davdian://invoke."+baseHref+"?cmd="+encodeURIComponent('davdian://call.LiveVideo.com?action=enterRoom&params='+encodeURIComponent(JSON.stringify(para)) +'&callback=d_callback&minv=2.5.0');
            setTimeout(function () {
                location.href = url||'//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller';
            },1500);
        }else{
            location.href = url||'//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller';
        }
    };

    window.bravetime.setHead = function (opt,callback) {
        bravetime.callNative2("Browser","setHead",opt,callback,'2.6.0');
    };


    window.bravetime.nativeLogin = function (callback,minCallback) {
        bravetime.callNative2("Account","login",{},callback,'2.4.0',minCallback);
    };

    /**
     * app支付
     */
    window.bravetime.nativePay = function (url,callback) {
        var option = {};
        option.url = encodeURIComponent(url);
        if(url.split("app_pay/").length>1){
            var list = url.split("app_pay/")[1].split("&");
            for(var i=0;i<list.length;i++){
                var key = list[i].split("=")[0];
                var value = list[i].split("=")[1];
                option[key] = value;
            }
        }

        var callFunction = function (result) {
            if(typeof result=="string"){
                result = JSON.parse(result);
            }
            callback(+result.code,result.order_id);
        };
        bravetime.callNative2('Browser','pay',option,callFunction,'3.1.0',function () {
            bravetime.goto(url);
        });
    };

    /**
     * 回到app首页
     */
    window.bravetime.goAppHome = function () {
        bravetime.callNative(function () {
        }, function () {
            alert("系统异常，请退出app重试")
        }, "base", "home", []);
    };

    window.bravetime.openNewPage = function (opt, callback) {
        bravetime.callNative2('Browser', 'open', opt, callback, '3.1.0',function () {
            bravetime.goto(opt.url);
        });
    };

    window.bravetime.callAppShare = function (opt) {
        var option = opt || {};
        bravetime.callNative(function () {
            var result = JSON.parse(r);
            var code = result["code"];
            if (code == 0) {
                // 分享成功
                bravetime.info("分享成功");
            } else if (code == 1) {
                bravetime.info("分享失败");
            } else {
                alert("系统异常，请重试");
            }
        }, function () {
            alert("系统异常，请退出app重试")
        }, "base", "share", []);
    };

    window.bravetime.callAppShareToTimeline = function () {
        bravetime.callNative(function () {
            var result = JSON.parse(r);
            var code = result["code"];
            if (code == 0) {
                // 分享成功
                bravetime.info("分享成功");
            } else if (code == 1) {
                bravetime.info("分享失败");
            } else {
                alert("系统异常，请重试");
            }
        }, function () {
            alert("系统异常，请退出app重试")
        }, "base", "share_to_wechat_timeline", []);
    };

    window.bravetime.callAppShareToFriend = function () {
        bravetime.callNative(function () {
            var result = JSON.parse(r);
            var code = result["code"];
            if (code == 0) {
                // 分享成功
                bravetime.info("分享成功");
            } else if (code == 1) {
                bravetime.info("分享失败");
            } else {
                alert("系统异常，请重试");
            }
        }, function () {
            alert("系统异常，请退出app重试")
        }, "base", "share_to_wechat_friend", []);
    };

    window.bravetime.callNativeHoldPic = function (src) {
        bravetime.callNative(function () {

        }, function () {

        }, "base", "savePic", [src]);
    };

    window.bravetime.callNativeReady = function () {
        // 如果是订单确认页,而且是等待刷新的,就不发这个了
        if(window.tj_id==21 && $.cookie && $.cookie("no_refresh")){
            $.removeCookie("no_refresh");
            return false;
        }
        bravetime.callNative(function () {

        }, function () {

        }, "base", "ready", []);
    };

    /**
     * 调用原生确认框
     * @param msg
     * @param opt
     */
    window.bravetime.callNativeConfirm = function (msg, opt) {
        bravetime.callNative(opt.okLink, opt.cancelLink, "base", "confirm", [msg, JSON.stringify(opt)]);
    };

    if (window.Units && Units.isApp()) {
        $(function () {
            window.bravetime.callNativeReady();
        });
        $("img").each(function (index, element) {
            var flag = false, timer = null,already = false;
            $(element).on("touchstart", function () {
                already = false;
                flag = true;
                timer = setTimeout(function () {
                    if (flag) {
                        already = true;
                        window.bravetime.callNativeHoldPic($(element).attr("src"));
                    }
                }, 500);
            });
            $(element).on("touchend", function () {
                flag = false;
                clearTimeout(timer);
            });
            $(element).on("touchmove", function () {
                flag = false;
                clearTimeout(timer);
            });
            $(element).on("touchcancel", function () {
                flag = false;
                clearTimeout(timer);
            });
            var a = $(element).parents("a");
            a.on("touchend", function (e) {
                if(already){
                    e.preventDefault();
                    return false;
                }
            });
            a.on("click", function (e) {
                if(already){
                    e.preventDefault();
                    return false;
                }
            });
        });
    }

    function singlePicHold(dom) {
        var flag = false, timer = null,already = false;
        $(dom).on("touchstart", function () {
            flag = true;
            timer = setTimeout(function () {
                if (flag) {
                    window.bravetime.callNativeHoldPic($(dom).attr("src"));
                }
            }, 500);
        });
        $(dom).on("touchend", function () {
            flag = false;
            clearTimeout(timer);
        });
        $(dom).on("touchmove", function () {
            flag = false;
            clearTimeout(timer);
        });
        $(dom).on("touchcancel", function () {
            flag = false;
            clearTimeout(timer);
        });
        var a = $(dom).parents("a");
        a.on("touchend", function (e) {
            if(already){
                e.preventDefault();
                return false;
            }
        });
    }
    window.singlePicHold = singlePicHold;


    /**
     * 自定义确认框
     * @param msg 提示信息
     * @param opt 配置信息  b
     * @returns {boolean} 返回值
     */
    window.bravetime.newConfirm = function (msg, opt) {
        var result = false,
            msg = msg || "",
            opt = opt || {},
            okText = opt.okText || "确定",
            cancelText = opt.cancelText || "取消",
            callback = opt.okLink || function () {
                },
            cancelCallback = opt.cancelLink || function () {
                },
            hideCancel = opt.hideCancel || false,
            hideOkAndCancel = opt.hideOkAndCancel || false,
            closeButton = opt.hasClostButton || false;

        var $elAlert = $('.modal_dialog_wrap');
        if ($elAlert.length < 1) {
            $(['<div class="dialog_mask" style="display:block">', '<div class="modal_dialog_wrap">', '<div class="modal_dialog">', '<div class="modal_body"></div>', '<div class="modal_footer">', '<a class="confirm">确定</a>', '<a class="cancel">取消</a>', '</div>', '</div>', '</div>', '</div>'].join('')).appendTo(document.body);

            $elAlert = $('.modal_dialog_wrap');
            $elAlert.find('.confirm').click(function () {
                $('.dialog_mask').hide();
                var callback = $(this).data('callback');
                if (callback) {
                    if (typeof callback === 'string') {
                        window.bravetime.goto(callback);
                    } else {
                        callback();
                    }
                }
            });
            $elAlert.find('.cancel').click(function () {
                var callback = $(this).data('cancel_callback');
                if (callback) {
                    if (typeof callback === 'string') {
                        window.bravetime.goto(callback);
                    } else {
                        callback();
                    }
                }
                $('.dialog_mask').hide();
            });
        } else {
            $('.dialog_mask').css('display', 'block');
        }
        $elAlert.toggleClass('modal_dialog_confirm_wrap', !hideCancel);
        $elAlert.toggleClass('modal_dialog_info_wrap', hideOkAndCancel);
        $elAlert.find('.modal_body').html(msg);
        if (closeButton) {
            var closeBtn = $('<div class="modal_close"></div>');
            $elAlert.find('.modal_body').append(closeBtn);
            closeBtn.click(function () {
                $('.dialog_mask').hide();
            })
        }
        $elAlert.find('.confirm').html(okText).data('callback', callback || null);
        $elAlert.find('.cancel').html(cancelText).data('cancel_callback', cancelCallback || null);
        $elAlert.css('margin-top', $elAlert.height() * -0.5);
    };

    window.bravetime.newAlert = function (msg, callback) {
        if (typeof callback == "function") {
            window.bravetime.newConfirm(msg, {
                hideCancel: true,
                okLink: callback
            });
        } else {
            var opt = callback || {};
            opt["hideCancel"] = true;
            window.bravetime.newConfirm(msg, opt);
        }

    };

    window.bravetime.newInfo = function (msg,opt) {
        var o = opt||{};
        o.hideOkAndCancel=true;
        window.bravetime.newConfirm(msg, o);
    };

    window.bravetime.hideNew = function () {
        $('.dialog_mask').hide();
    };

    window.bravetime.info = function (msg) {
        if(!msg){
            return false;
        }
        var delayTime = Math.max(1500,msg.length*150);
        var infoContainer = $(".bravetime-info");
        if (infoContainer.length) {
            infoContainer.removeClass("hide").find('.inner').html(msg);
        } else {
            infoContainer = $('<div style="width:100%;z-index: 99;max-width:640px;position: fixed;top: 200px;text-align: center;"><div class="inner" style="display:inline-block;padding:12px 14px;max-width:80%;background: #FF4A7D;color:#fff;border-radius: 3px;">' + msg + '</div></div>')
                .addClass("bravetime-info");
            $("body").append(infoContainer);
        }
        clearTimeout(window.st1);
        clearTimeout(window.st2);
        infoContainer.css("opacity", 1).stop();
        window.st1 = setTimeout(function () {
            infoContainer.css("opacity", 1).animate({opacity: 0}, 500);
            window.st2 = setTimeout(function () {
                infoContainer.css("opacity", 1).addClass("hide");
            }, 1000);
        }, delayTime);

    };

    window.bravetime.addLoader = function (opt) {
        var h = window.screen.availHeight;
        opt = opt || {};
        if ($(".loader_container").length) {
            $(".loader_container").removeClass('hide');
        } else {
            $("body").append($("<div class='loader_container'><div class='loader'><div class='uil-default-css-normal' style='-webkit-transform:scale(0.25);-moz-transform:scale(0.25);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;'><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div></div></div>"));
            $(".loader_container").css("height", h + "px").click(window.bravetime.removeLoader);
        }
        var little = opt["little"]|| opt["small"] || false;
        if (little) {
            $(".loader_container").addClass("little");
        } else {
            $(".loader_container").removeClass("little");
        }

    };
    window.bravetime.removeLoader = function () {
        $(".loader_container").addClass("hide");
    };

    window.bravetime.goto = function (url) {
        window.location.href = url;
    };

    window.bravetime.ajaxError = function (c, info,callback) {
        var code = c || 0,
            info = info || "网络异常，请稍后重试";
        bravetime.newAlert(info,callback);
        var e1 = new Error("netWorkError");
        e1.stack = 'Error: network_error';
        window.bughd&&bughd("notifyException",e1,{code:code,info:info});

    };

    // 滚动到顶部
    if ($("body.scroll_flag").length) {
        $(window).on("scroll", function () {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > 200) {
                if ($(".to-top").length == 0) {
                    $("body").append('<div class="to-top"><a href="javascript:void(0);" id="to-top"><i class="icon dav_icon_up2top_80_80" style="width:44px;height:44px;"></i></a></div>');
                    $("#to-top")
                        .on("click", function () {
                            $('html,body').animate({scrollTop: 0}, 500);
                            if (window.up2topCallback && typeof window.up2topCallback == "function") {
                                up2topCallback(scrollTop);
                            }
                        });
                }

            } else {
                $(".to-top").remove();
            }
        });
    }
    // 分享模块
    var shareButton = $(".share_to_web");
    if (shareButton && shareButton.length) {
        shareToWeb(shareButton);
    }

    function shareToWeb(shareButton) {
        if (window.Units && Units.isApp()) {
            var useMMB = 0;
            shareButton.click(function () {
                bravetime.callAppShare({
                    title: shareTitle, // 分享标题
                    link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                    imgUrl: imgUrl.replace("https","http"), // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        if (window.appShareCallback && typeof window.appShareCallback == "function") {
                            window.appShareCallback();
                        }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        if (window.appShareCallbackCancel && typeof window.appShareCallbackCancel == "function") {
                            window.appShareCallbackCancel();
                        }
                    }
                });
            });

            return false;
        }

        if (window.Units && Units.isWechat()) {
            var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>点击右上角“分享”按钮</p>' + '<p>选择“发送给朋友”或者“分享到朋友圈”' + (!!window.disableCopyToShare ? '' : '或者“复制链接”后发送链接给朋友') + '</p>' + ((window.shareStr && window.shareStr != "") ? ('<p class="big">推荐语：</p><p>' + window.shareStr + '</p><p>（长按选中后复制推荐语）</p>') : ("")) + '</div>');
        } else if (window.Units && Units.isQQ()) {
            var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>点击右上角“分享”按钮</p>' + '<p>选择QQ好友、QQ空间、微信、朋友圈进行分享' + (!!window.disableCopyToShare ? '' : '或者“复制链接”后发送链接给朋友') + '</p>' + ((window.shareStr && window.shareStr != "") ? ('<p class="big">推荐语：</p><p>' + window.shareStr + '</p><p>（长按选中后复制推荐语）</p>') : ("")) + '</div>');
        } else {
            var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>复制链接分享</p>' + '<p>复制地址栏链接，将链接发送给朋友</p>' + '</div>');
        }
        $("body").append(msk.addClass("hide"));
        shareButton.click(function () {
            msk.removeClass("hide");
            if (window.shareButtonClickCallback && typeof window.shareButtonClickCallback == "function") {
                window.shareButtonClickCallback();
            }
        });
        msk.click(function (event) {
            msk.addClass('hide');
        });
    }

    // 收藏模块
    var favButton = $(".favorite_to_web");
    if (favButton && favButton.length) {
        favToWeb(favButton);
    }
    function favToWeb(favButton) {
        if (window.Units && Units.isWechat()) {
            var msk = $('<div class="mask-to-favorite">' +
                '<div class="fake fake-favorite-we">' +
                '<div class="top">' +
                '<div class="favorite-title">微信中如何收藏店铺?</div> ' +
                '<div class="favorite-con">右上角按钮选择“收藏”</div>' +
                '</div>' +
                '<div class="bottom">' +
                '<div class="favorite-title">以后如何访问?</div>' +
                '<div class="favorite-con">' +
                '<img src="//pic.davdian.com/free/fav-wechat_2x.png">' +
                '<div class="fav-text">点击微信底部菜单中的“我”，在菜单中选择“收藏”，即可看到已经收藏的店铺。</div>' +
                ' </div>' +
                '</div>' +
                '</div>' +
                '</div>');
        } else if (window.Units && Units.isQQ()) {
            var msk = $('<div class="mask-to-favorite">' +
                '<div class="fake fake-favorite-qq">' +
                '<div class="top">' +
                '<div class="favorite-title">手机QQ如何收藏店铺?</div> ' +
                '<div class="favorite-con">点击下方<div class="icon-small-qq-fav"></div>收藏</div>' +
                '</div>' +
                '<div class="bottom">' +
                '<div class="favorite-title">以后如何访问?</div>' +
                '<div class="favorite-con">' +
                '<img src="//pic.davdian.com/free/fav-qq_2x.png">' +
                '<div class="fav-text">在手机QQ中点击左上角自己头像，在菜单中选择“我的收藏”，即可看到已经收藏的店铺。</div>' +
                ' </div>' +
                '</div>' +
                '</div>' +
                '</div>');
        } else {
            var msk = $('<div class="mask-to-favorite">' +
                '<div class="fake fake-favorite-bro">' +
                '<div class="top">' +
                '<div class="favorite-title">浏览器中如何收藏?</div> ' +
                '<div class="favorite-con">在浏览器菜单中选择“收藏”或者“发送到主屏幕”、“桌面”。不同的浏览器，操作方法不同。</div>' +
                '</div>' +
                '<div class="bottom">' +
                '<div class="favorite-title">以后如何访问?</div>' +
                '<div class="favorite-con">在浏览器中找到收藏页面或者点击桌面的图标（如果有）访问</div>' +
                '</div>' +
                '</div>' +
                '</div>');
        }
        $("body").append(msk.addClass("hide"));
        favButton.click(function () {
            msk.removeClass("hide");
            if (window.favButtonClickCallback && typeof window.favButtonClickCallback == "function") {
                window.favButtonClickCallback();
            }
        });
        msk.click(function (event) {
            msk.addClass('hide');
        });
    }


    // 微信里面分享
    if (window.wx) {
        if (window.shareTitle) {
            if (window.wx_token === undefined) {
                var url = window.location.href;
                $.ajax({
                    url: './wechatJsToken',
                    type: 'GET',
                    dataType: 'json',
                    data: {url: encodeURI(url)},
                    success: function (result) {
                        if (result["error"] == 0) {
                            wx.config({
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId: result["data"]["appId"], // 必填，公众号的唯一标识
                                timestamp: result["data"]["timestamp"], // 必填，生成签名的时间戳
                                nonceStr: result["data"]["nonceStr"], // 必填，生成签名的随机串
                                signature: result["data"]["signature"],// 必填，签名，见附录1
                                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            });
                        }

                    },
                    error: function () {
                        console.log("Error");
                    }
                });

            } else if (window.wx_token) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: window.wx_appid, // 必填，公众号的唯一标识
                    timestamp: window.wx_timestamp, // 必填，生成签名的时间戳
                    nonceStr: window.wx_nonceStr, // 必填，生成签名的随机串
                    signature: window.wx_signature,// 必填，签名，见附录1
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }


            wx.ready(function () {
                window.imgUrl = window.imgUrl.replace("https",'http');


                var useMMB = 0;

                if (window.doNotShare) {
                    return false;
                }
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.onMenuShareTimeline({
                    title: shareTitle, // 分享标题
                    link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        if (window.tlShareCallback && typeof window.tlShareCallback == "function") {
                            window.tlShareCallback();
                        }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        if (window.tlShareCallbackCancel && typeof window.tlShareCallbackCancel == "function") {
                            window.tlShareCallbackCancel();
                        }
                    }
                });
                wx.onMenuShareAppMessage({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        if (window.sendShareCallback && typeof window.sendShareCallback == "function") {
                            window.sendShareCallback();
                        }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        if (window.sendShareCallbackCancel && typeof window.sendShareCallbackCancel == "function") {
                            window.sendShareCallbackCancel();
                        }
                    }
                });
                wx.onMenuShareQQ({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        if (window.QQShareCallback && typeof window.QQShareCallback == "function") {
                            window.QQShareCallback();
                        }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        if (window.QQShareCallbackCancel && typeof window.QQShareCallbackCancel == "function") {
                            window.QQShareCallbackCancel();
                        }
                    }
                });
                wx.onMenuShareWeibo({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        if (window.weiboShareCallback && typeof window.weiboShareCallback == "function") {
                            window.weiboShareCallback();
                        }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        if (window.weiboShareCallbackCancel && typeof window.weiboShareCallbackCancel == "function") {
                            window.weiboShareCallbackCancel();
                        }
                    }
                });
                wx.onMenuShareQZone({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        if (window.qZoneShareCallback && typeof window.qZoneShareCallback == "function") {
                            window.qZoneShareCallback();
                        }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        if (window.qZoneShareCallbackCancel && typeof window.qZoneShareCallbackCancel == "function") {
                            window.qZoneShareCallbackCancel();
                        }
                    }
                });

                window.relink = function () {
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    wx.onMenuShareTimeline({
                        title: shareTitle, // 分享标题
                        link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            if (window.tlShareCallback && typeof window.tlShareCallback == "function") {
                                window.tlShareCallback();
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            if (window.tlShareCallbackCancel && typeof window.tlShareCallbackCancel == "function") {
                                window.tlShareCallbackCancel();
                            }
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: shareTitle, // 分享标题
                        desc: descContent, // 分享描述
                        link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            if (window.sendShareCallback && typeof window.sendShareCallback == "function") {
                                window.sendShareCallback();
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            if (window.sendShareCallbackCancel && typeof window.sendShareCallbackCancel == "function") {
                                window.sendShareCallbackCancel();
                            }
                        }
                    });
                    wx.onMenuShareQQ({
                        title: shareTitle, // 分享标题
                        desc: descContent, // 分享描述
                        link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            if (window.QQShareCallback && typeof window.QQShareCallback == "function") {
                                window.QQShareCallback();
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            if (window.QQShareCallbackCancel && typeof window.QQShareCallbackCancel == "function") {
                                window.QQShareCallbackCancel();
                            }
                        }
                    });
                    wx.onMenuShareQZone({
                        title: shareTitle, // 分享标题
                        desc: descContent, // 分享描述
                        link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            if (window.qZoneShareCallback && typeof window.qZoneShareCallback == "function") {
                                window.qZoneShareCallback();
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            if (window.qZoneShareCallbackCancel && typeof window.qZoneShareCallbackCancel == "function") {
                                window.qZoneShareCallbackCancel();
                            }
                        }
                    });
                }
            });
        }
    }
    $("a.need_confirm[data-confirm-content]").click(function (event) {
        var href = $(this).attr("href");
        var con = $(this).attr("data-confirm-content");
        bravetime.newConfirm(con, {
            okLink: href
        });
        event.preventDefault();
    });


    var warning_time;
    window.warning_info = function (text, position) {
        if ($(".warning-info").length > 0) {
            clearTimeout(warning_time);
            $(".warning-info").remove();
        }
        var windowHeight = $(window).height();
        var bottom;
        switch (position || "middle") {
            case "top":
                bottom = windowHeight - 100;
                break;
            case "middle":
                bottom = windowHeight / 2;
                break;
            case "bottom":
                bottom = 50;
                break;
            default:
                bottom = windowHeight / 2;
                break;
        }
        $("body").append("<div class='warning-info' style='position:fixed;width:100%;text-align:center;bottom:" + bottom + "px;z-index:999;'><div class='label label-warning'>" + text + "</div></div>");
        $(".label-warning").css("background-color", "#f89406").css("display", "inline").css("padding", "2px 5px").css("border-radius", "8px");
        warning_time = setTimeout(function () {
            $(".warning-info").fadeOut(2000);
        }, 500);
    };


    /* *
     * 点击立即购买按钮
     */
    window.buy_now = function (goodsId) {
        var goods = {};
        var spec_arr = [];
        var fittings_arr = [];
        var number = document.getElementById('goods_number').value;
        var quick = 0;

        goods.quick = quick;
        goods.spec = spec_arr;
        goods.goods_id = goodsId;
        goods.number = number;
        goods.sag_id = sag_id;
        goods.price = goods_price;
        goods.name = goods_name;

        $.post('index.php?m=default&c=flow&a=add_to_cart', {
            goods: JSON.stringify(goods)
        }, function (data) {
            if (data.error > 0) {
                window.bravetime.newAlert(data.message);
            } else {
                var callback = 'index.php?m=default&c=flow&a=cart';
                window.bravetime.goto(callback);
            }
        }, 'json');
        if (window.buyCallback && typeof window.buyCallback == "function") {
            window.buyCallback(goodsId);
        }
    };

    /**
     * 点击 加入购物车 后弹出
     */
    window.cart = function (goodsId) {
        var goods = {};
        var spec_arr = [];
        var fittings_arr = [];
        var number = document.getElementById('goods_number').value;
        var quick = 1;

        goods.quick = quick;
        goods.spec = spec_arr;
        goods.goods_id = goodsId;
        goods.number = number;
        goods.sag_id = sag_id;
        goods.price = goods_price;
        goods.name = goods_name;

        $.post('index.php?m=default&c=flow&a=add_to_cart', {
            goods: JSON.stringify(goods)
        }, function (data) {
            if (data.error > 0) {
                if (data.error == 2) {
                    window.bravetime.confirm("商品已经在购物车中", {
                        okText: "再逛逛",
                        // okLink:"/", //点击再逛逛跳到的链接
                        cancelText: "去购物车",
                        cancelLink: "/cart.html" //点击去结算跳到的链接
                    });
                } else {
                    window.bravetime.newAlert(data.message);
                }
            } else {
                // 先ajax发送数据，成功后调用以下语句
                window.bravetime.newConfirm("商品已经加入购物车", {
                    okText: "再逛逛",
                    // okLink:"/", //点击再逛逛跳到的链接
                    cancelText: "去结算",
                    cancelLink: "/cart.html" //点击去结算跳到的链接
                });
                $(".detail_bottom .cart_link").html('<i class="menu-i menu-i-3"></i><b>' + data["cart_number"] + "</b>");
            }
        }, 'json');

        if (window.cartCallback && typeof window.cartCallback == "function") {
            window.cartCallback(goodsId);
        }
    };




    // 团购列表
    var tuanListCon = $(".tuan_list");
    if (tuanListCon && tuanListCon.length) {
        tuanListCon.find("a").each(function (index, el) {
            var $el = $(el);
            var second = +$el.attr("data-remain-second");
            var href = $(el).attr("href");
            $el.attr("data-url", href);
            $el.find(".time").html(calculateTime(second));
            $el.find(".dao_time span").html(calculateTime(second));
            $el.attr("data-remain-second", second - 1);
            $el.click(function () {
                if (window.tuanItemClickCallback && typeof window.tuanItemClickCallback == "function") {
                    window.tuanItemClickCallback($el, index);
                    // return false;
                }
            });
        });
        if (tuanListCon.find("a").find(".dao_time span").length || tuanListCon.find("a").find(".time").length) {
            window.tuanInterval = setInterval(function () {
                var flag = false;
                tuanListCon.find("a").each(function (index, el) {
                    var second = +$(el).attr("data-remain-second");
                    if (second > 0) {
                        if(second<60*60*24){
                            $(el).find(".dao_time span").html(calculateTime(second));
                            $(el).find(".time").html(calculateTime(second));
                            $(el).attr("data-remain-second", second - 1);
                            flag = true;
                        }
                    } else {
                        $(el).find(".dao_time").html("团购已结束");
                        $(el).find(".time").html("团购已结束");
                    }
                });
                if(!flag){
                    clearInterval(window.tuanInterval);
                }
            }, 1000);
        }

    }

    // 逆向团购
    var merchandiseDetail = $(".merchandise_detail");
    if (merchandiseDetail.length) {
        var merchandiseList = merchandiseDetail.find(".dao_time");
        window.mechandiseInterval = setInterval(function () {
            merchandiseList.each(function (index, el) {
                var $el = $(el);
                var second = +$el.attr("data-remain-second");
                if (second > 0) {
                    $el.html("倒计时：" + calculateTime(second));
                    $(el).attr("data-remain-second", second - 1);
                } else {
                    $(el).html("此商品组团已结束");
                }
            });
        }, 1000);
    }


    function calculateTime(second) {
        var s = second % 60, m = Math.floor(second / 60) % 60,
            h = Math.floor(second / 60 / 60) % 24,
            d = Math.floor(second / 60 / 60 / 24);
        var str = '';
        if (d) {
            str = "剩 " + d + " 天" ;
        } else {
            str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        }
        return str;
    }


    // 商品列表
    var goodList2 = $(".good_list_2_row");
    if (goodList2 && goodList2.length) {
        goodList2.each(function (index, el) {
            $(el).find(".good_item").each(function (i, e) {
                $(e).attr("data-url", $(e).attr("href"));
            });
            $(el).on("click", ".good_item", function (e) {
                if (window.goodItemClickCallbak && typeof window.goodItemClickCallbak == "function") {
                    window.goodItemClickCallbak($(this), $(el));
                    // return false;
                }
            });
        })
    }

    var addBounsContainer = $(".bonus_prompt");
    if (addBounsContainer.length) {
        addBouns(addBounsContainer);
        var showBouns = false;
    }

    /**
     * 页面弹红包
     */
    function addBouns(container) {
        var height = screen.height;
        $(window).scroll(function () {

            var y = window.scrollY;
            if (y > height * 0.3 && !showBouns) {

                showBouns = true;

                if (getBounsUrl) {
                    $.ajax({
                        url: getBounsUrl,
                        dataType: "json",
                        success: function (result) {
                            if (result["error"]) {
                                //bravetime.info(result["msg"]);
                            } else {
                                var type = result["data"]["type"];
                                var num = result["data"]["num"];
                                if (type == 0 || type == 1 || type == 3) {
                                    return false;
                                }
                                container.find(".bonus_prompt_bonus").html(num);
                                container.addClass("show_animate");
                                setTimeout(function () {
                                    container.addClass("bonus_d")
                                }, 400);
                            }
                        }
                    });
                }
            }
        });

        container.find(".bonus_prompt_close").click(function () {
            container.addClass("hide");
        });
    }


    if(window.isShowActivity){
        showActivityImg();
        setTimeout(function(){
            bravetime.tj.pvSend("alert_activity",(window["tj_path"]||'other_path'));
        },500);

    }
    /**
     * 弹出活动图片
     */
    function showActivityImg() {
        var $body = $(document.body);
        var str='<div class="dialog_mask">'+
            '<div class="active_container">'+
            '<div class="pic_container">'+
            '<div class="close"><span></span></div>'+
            '<a href="'+window.activityLink+'"><img src="'+window.activityImage+'" alt=""></a>'+
            '</div>'+
            '</div>'+
            '</div>'
        var ac = $(str);
        var winHeight = $(window).height();
        var winWidht = Math.min($(window).width(),640);
        var w = winWidht*0.78;
        var l = winWidht*0.11;
        var h = w*410/290;
        var t = Math.max(10,(winHeight-h)/2);

        ac.find(".pic_container").css("width",w+"px").css("top",t+"px").css("left",l+"px");
        $body.append(ac);
        ac.find(".active_container").click(function () {
            ac.remove();
        })
    }



// ios fix
// ios fix
    if (window.Units && Units.isIOS()) {
        var flag = false;
        $(document).on("touchstart", 'input', function () {
            if (window.inputFocusFixFunction && typeof window.inputFocusFixFunction == "function") {
                window.inputFocusFixFunction();
            }
        });

        $(document).on('focus', 'input', function () {
            flag = true;
            if (window.inputFocusFixFunction && typeof window.inputFocusFixFunction == "function") {
                window.inputFocusFixFunction();
            }
        });

        $(document).on('blur', 'input', function () {
            flag = false;
            if (window.inputBlurFixFunction && typeof window.inputBlurFixFunction == "function") {
                window.inputBlurFixFunction();
            }
        });

        $(document).on("touchmove", 'input', function () {
            if (!flag) {
                if (window.inputBlurFixFunction && typeof window.inputBlurFixFunction == "function") {
                    window.inputBlurFixFunction();
                }
            }

        });
    }

    if(window.app_need_update_flag){
        var html = "<p style='font-size: 17px;text-align: center;margin-bottom: 6px;'>更新2.0.0</p>" +
            "<p style='font-size: 14px;text-align: left;margin-bottom: 6px;'>大V店重大更新啦~!</p>" +
            "<p style='font-size: 12px;text-align: left;'>【妈妈课堂】强力入驻大V店学院板块!</p>" +
            "<p style='font-size: 12px;text-align: left;'>在这里就可以直接报名、听课、追回顾!<p>" +
            "<p style='font-size: 12px;text-align: left;'>蒋佩蓉、朱芳宜等大咖课程独家放送!<p>" +
            "<p style='font-size: 12px;text-align: left;'>马上升级 APP 才能使用哟~<p>" +
            "<p style='font-size: 12px;text-align: left;'>不要再等了！</p>";
        window.bravetime.newAlert(html, {
            okText: "<span style='color:#0076FF;font-size: 16px;'>马上升级</span>",
            // okLink:"/", //点击再逛逛跳到的链接
            cancelText: "<span style='color:#0076FF;font-size: 16px;'>马上升级</span>",
            okLink: function () {
                if(Units.isApp()&&Units.isIOS()&&Units.getAppVersion()<200){
                    window.location="https://itunes.apple.com/cn/app/dav-dian-rang-ma-ma-qing-song/id1042582462?mt=8";
                }
                if(Units.isApp()&&Units.isAndroid()&&Units.getAppVersion()<200){
                    window.location="//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller";
                }

            } //点击去结算跳到的链接
        });
    }

    // 在cookie里写设备宽度
    if(!!$.cookie){
        $.cookie('physical_width',$(document.body).width()*(window.devicePixelRatio||1));
    }

    var cookieList = document.cookie.split(";").filter(function(x){return x.indexOf("dvdsid")>-1});
    var sid = cookieList.length&&cookieList[0].split("=")[1];
    sid&&window.bughd&&bughd("user", { sid :sid ,ua:navigator.userAgent});


    $("[url-for-login]").click(function (e) {
        var url = $(this).attr("href"),refer="/";
        nativeLoginFunction(url)
        e.preventDefault();
        return false;
    });

    function nativeLoginFunction(url,errorCallback) {
        var refer = "/";
        var list = url.split("?");
        if(list.length>=2){
            var list2 = list[1];
            if(list2.indexOf("referer=")>-1){
                refer = list2.substr(list2.indexOf("referer=")+8)
            }
        }
        var callback = function (result) {
            if(result["code"]==1||result["code"]==2){
                // alert("I will go to "+ decodeURIComponent(refer)+", but i don't go");
                bravetime.goto(decodeURIComponent(refer));
            }else if(result["code"]==0){
                errorCallback&&errorCallback();
            }
        };
        var minCallback = function () {
            bravetime.goto(url);
        };
        window.bravetime.nativeLogin(callback,minCallback);
    }

    window.nativeLoginFunction = nativeLoginFunction;

});

// 错误统计白名单
var whiteList = [
    {
        url:"?c=prize&a=send_bonus",
        code:-1
    },
    {
        url:"/?c=prize&a=send_bonus",
        code:-1
    }
];

//备份jquery的ajax方法
var _ajax = $.ajax;
$.ajax = function (opt) {
    //备份opt中error和success方法
    var fn = {
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        success: function (data, textStatus) {
        }
    };
    if (opt.error) {
        fn.error = opt.error;
    }
    if (opt.success) {
        fn.success = opt.success;
    }

    //扩展增强处理
    var _opt = $.extend(opt, {
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //错误方法增强处理

            fn.error(XMLHttpRequest, textStatus, errorThrown);
            var e1 = new Error("ajaxError");
            e1.stack = 'Error: ajax_error';
            window.bughd&&bughd("notifyException",e1,{tj_path:window.tj_path||"other_path",ajax_url:opt.url||"other_url",code:"-99",msg:"网络异常"})
        },
        success: function (data, textStatus) {
            fn.success(data, textStatus);
            var code = data["code"]||data["error"]||data["error_code"];
            var msg = data["msg"]||data["error_msg"]||data["message"]||data["error_message"];
            var flag = true;
            for(var i=0;i<whiteList.length;i++){
                if(whiteList[i].url==opt.url&&whiteList[i].code==code){
                    flag = false;
                    break;
                }
            }
            if(code&&flag){
                var e1 = new Error("ajaxApiError");
                e1.stack = 'Error: ajax_api_error';
                window.bughd&&bughd("notifyException",e1,{tj_path:window.tj_path||"other_path",ajax_url:opt.url||"other_url",code:code,msg:msg});
            }
        }
    });
    _ajax(_opt);
};


//判断对象是否为空
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

window.isEmptyObject = isEmptyObject;

// 根据屏幕大小改变html字体大小
/*
 (function (doc, win) {
 var docEl = doc,
 resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
 recalc = function () {
 var clientWidth = docEl.body.clientWidth;
 if (!clientWidth) return;
 docEl.documentElement.style.fontSize = 10 * (clientWidth / 375) + 'px';
 };

 if (!doc.addEventListener) return;
 win.addEventListener(resizeEvt, recalc, false);
 doc.addEventListener('DOMContentLoaded', recalc, false);
 })(document, window);*/

(function(doc, win) {
    var docEl = doc,
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
    docEl.documentElement.dataset.dpr = dpr;
    var recalc = function() {
        var width = docEl.body.clientWidth;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        docEl.documentElement.dataset.width = width;
        docEl.documentElement.dataset.percent = 200 * (width / 750);
        docEl.documentElement.style.fontSize = 200*(width/750) + 'px';
        docEl.body.style.fontSize = '14px';
        var list = document.querySelectorAll("[base-on-rem]");
        for(var i=0;i<list.length;i++){
            list[i].removeAttribute('base-on-rem');
        }
        $(".need_js_height").css("height",Math.floor((width-20)/2*600/531)+"px");
        $(".need_js_height_seckill").css("height",Math.floor((width-25)/2*362/350)+"px");
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);

try {
    localStorage.setItem('isPrivateMode', '1');
    localStorage.removeItem('isPrivateMode');
    window.isPrivateMode = false;
} catch(e) {
    window.isPrivateMode = true;
}
if (!window.isPrivateMode && window.localStorage) {
    var his = [];
    if(sessionStorage.history){
        his = JSON.parse(sessionStorage.history);
    }
    his.push({href:location.href,path:window.tj_path||"other"});
    sessionStorage.history = JSON.stringify(his);
}

function setYCache(page,y) {
    if (!window.isPrivateMode && window.sessionStorage) {
        var y = y || window.window.scrollY;
        var page = page||window.tj_page;
        sessionStorage[page+"_y"] = y;
    }
}
window.setYCache = setYCache;

function getYCache(page) {
    var y = null;
    if (!window.isPrivateMode && window.sessionStorage) {
        var page =  page||window.tj_page;
        y =  sessionStorage[page+"_y"];
    }
    if(y){
        window.scrollTo(0,y);
    }
    return y;
}
window.getYCache = getYCache;

function getGoodsListFromCache(p) {
    var result = null;
    if(!window.isPrivateMode && window.sessionStorage){
        var data = sessionStorage.getItem("goods_list_"+p);
        var his = sessionStorage.getItem("history"),historyList;
        if(his){
            historyList = JSON.parse(his);
        }
        if(data&&historyList&&historyList.length&&historyList[historyList.length-2]&&historyList[historyList.length-2].path=="detail"){
            result = JSON.parse(data);
        }
    }
    return result;
}

function setGoodsListToCache(p,data) {
    if(!window.isPrivateMode && window.sessionStorage){
        if(data&&p){
            sessionStorage.setItem("goods_list_"+p,JSON.stringify(data));
        }
    }
}
window.getGoodsListFromCache = getGoodsListFromCache;
window.setGoodsListToCache = setGoodsListToCache;

//获取url参数
function getUrlArgObject(){
    var args=new Object();
    var query=location.search.substring(1);//获取查询串
    var pairs=query.split(",");//在逗号处断开
    for(var i=0;i<pairs.length;i++){
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1){//如果没有找到就跳过
            continue;
        }
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=unescape(value);//存为属性
    }
    return args;//返回对象
}