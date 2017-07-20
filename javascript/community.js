$(function () {
    // 推广app
    var appContainer = $(".download_layer");
    if(appContainer.length){
        appContainer.find(".close").click(function () {
            appContainer.addClass("hide");
        });
    }
    //window.down=function(){
    //    bravetime.newInfo('<div class="pop_up_layer"><div class="con"><span class="logo"></span><span><p>安卓版 app 未上线，</p><p>敬请期待</p></span></div></div>',
    //        {
    //            okText:"立即下载",
    //            hasClostButton:true,
    //            okLink: function () {
    //                if(!Units.isApp()){
    //                    if(Units.isMobileIOS()){
    //                        window.location = "//nemo.davdian.com";
    //                    }else{
    //                        bravetime.newAlert("暂时只有IOS版本");
    //                    }
    //                }else{
    //                    bravetime.newAlert("您已经在app中了");
    //                }
    //            }
    //        });
    //};

    // 个人中心确定199开店入口
    $("#create_shop").click(function () {
        bravetime.newConfirm("点击确定后将不能继续体验大V店请慎重选择?", {
            okLink: function () {
                bravetime.addLoader({little: true});
                $.ajax({
                    url:createShopUrl,
                    data: {},
                    dataType: "json",
                    success: function (result) {
                        var code=result.code;
                        var callbackUrl=result.url;
                        var msg=result.msg;
                        if (code==0) {
                            bravetime.goto(callbackUrl);
                        } else {
                            bravetime.info(msg);
                            bravetime.removeLoader();
                        }
                    },
                    error: function () {
                        bravetime.removeLoader();
                    }
                })
            }
        })
    });

    /**
     * 直接下载
     */
    /*
    function download(){
        // 如果在电脑里提示在手机打开
        if(IsPC()){
            bravetime.newAlert("请直接用手机下载");
        }else{
            // 如果在微信里
            if(window.Units&&Units.isWechat()){
                bravetime.newAlert("请用浏览器打开");
            }else{
                if(Units.isMobileIOS()){
                    window.location.href="";
                }else if(Units.isAndroid()){
                    window.location.href="";
                }else {
                    bravetime.newAlert("暂时只有IOS和Android版本");
                }
            }
        }
    }
     */

    /**
     * 用应用宝下载
     */
    function downloadWithTencent(){
        location.href="//open.davdian.com/httpurl?url=http://a.app.qq.com/o/simple.jsp?pkgname=com.davdian.seller"; // 应用宝的地址
    }

    /*
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
     */

    window.down = downloadWithTencent;
    $(".related_products_list .img_container").click(function(e){
        e.stopPropagation()
    })

    //点赞成员超出宽度隐藏,并在右边显示总人数
    if($(".praise").length){
        var height = $(".head").find("ul").height();
        var length = $(".head").find("img").length;
        if (height > 28) {
            if(length > 99 && height > 28){
                $(".praise").append($('<span class="right"><div class="num">99+</div></span>'));
            }
            else {
                $(".praise").append($('<span class="right"><div class="num">'+ length +'</div></span>'));
            }
        }

    }
});