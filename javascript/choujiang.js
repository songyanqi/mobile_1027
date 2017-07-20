$(function () {
    var swiper1 = $("#swiper1");
    var swiper2 = $("#swiper2");
    var ajaxing = true;
    var awardstext = "";
    var k = 0;
    var mySwiper = new Swiper('#swiper22', {
        noSwiping: true,
        autoplay: 3500,
        slidesPerView: 5,
        slidesPerGroup: 5,
        loop: true,
        direction: 'vertical'
    });
    var mySwiper2 = new Swiper('#swiper22', {
        noSwiping: true,
        autoplay: 3500,
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        direction: 'vertical'
    });
    //调用
    getsuperData();
    getListData();
    //普通中奖渲染页面
    function getListData(){
        swiper2.empty();
        $.ajax({
            url: winninglistUrl,
            dataType: "json",
            data: {},
            success: function (result) {
                for (var i = 0; i < result.data.length; i++) {
                    var htmlStr =
                        '<div class="swiper-slide swiper-no-swiping list_text_con">' +
                        '<div class="pull-left left1"><span>' + result.data[i][0] + '</span></div>' +
                        '<div class="pull-left left2 list_text_con"><span style = "padding-left: 10px">' + result.data[i][1] + '</span></div>' +
                        '<div class="pull-right left3">' + result.data[i][2] + '</div> </div> ';
                    var item = $(htmlStr);
                    swiper2.append(item);
                    k++;
                    if(k == 5){
                        k = 0;
                    }
                }
                if(k < 5 && k != 0){
                    for(var t = k;t<5;t++) {
                        var htmlStrs =
                            '<div class="swiper-slide swiper-no-swiping list_text_con">' +
                            '<div class="pull-left left1"><span></span></div>' +
                            '<div style = "text-align: left" class="pull-left left2 list_text_con"><span style = "padding-left: 10px"></span></div>' +
                            '<div class="pull-right left3"></div> </div> ';
                        var items = $(htmlStrs);
                        swiper2.append(items);
                    }
                }
                k = 0;
                if ($("#swiper2 .swiper-slide").size() > 5) {
                    $("#swiper2 .swiper-slide").css("box-sizing", "border-box");
                    // 小喇叭
                    mySwiper = new Swiper('#swiper22', {
                        noSwiping: true,
                        autoplay: 3500,
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        loop: true,
                        direction: 'vertical'
                    });
                }
            },
            error: function () {
            }
        })
    };
    //超级幸运用户
    function getsuperData(){
        $.ajax({
            url: luckystarUrl,
            dataType: "json",
            data: {},
            success: function (result) {
                swiper1.empty();
                for(var i = 0 ; i< result.data.length;i++) {
                    var htmlStr =
                '<div class="swiper-slide swiper-no-swiping list_text_top">' +
                '<div class="pull-left left1"><span>' + result.data[i][0] + '</span></div>' +
                '<div class="pull-left left2">' +
                '<img src="//pic.davdian.com/free/2016/11/02/93_54_5144504e0c449458f60cf8eff809798c.png" alt="" width="15%" style = "position: relative;top: -2px;left: 2px;">' +
                '<span>' + result.data[i][1] + '</span></div>' +
                '<div class="pull-right left3">' + result.data[i][2] + '</div></div>'
                    var items = $(htmlStr);
                    swiper1.append(items);
                }
                if($("#swiper1 .swiper-slide").size()>1){
                    $("#swiper1 .swiper-slide").css("box-sizing", "border-box");
                    // 小喇叭
                    mySwiper2 = new Swiper(' #swiper11', {
                        noSwiping:true,
                        autoplay: 3500,
                        slidesPerView : 1,
                        slidesPerGroup : 1,
                        autoplayDisableOnInteraction:true,
                        loop: true,
                        direction: 'vertical'
                    });
                }
            },
            error: function () {
            }
        });
    };
    //弹框关闭按钮
    $("#close").click(function(){
        $(".dialog_mask").css('display','none');
        mySwiper.destroy(false);
        getListData();
        getsuperData();
    });
    /**
     * 测试抽奖接口
     * @param callback
     */
    var timeOut = function(){  //超时函数
        $("#lotteryBtn").rotate({
            angle:0,
            duration: 10000,
            animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
            callback:function(){
                alert('网络超时')
            }
        });
    };
    //转盘旋转请求数据
    var rotateFunc = function(awards,angle){  //awards:奖项，angle:奖项对应的角度
        $('#lotteryBtn1').stopRotate();
        $("#lotteryBtn1").rotate({
            angle:0,
            duration: 5000,
            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback:function(){
                setTimeout(function(){
                    ajaxing = true;
                    $(".dialog_mask").css('display','block');

                    $("#allow").css('display',"none");
                    $("#allowed").css("display","block");
                    $("#allow_text").css('display',"none");
                    $("#allowed_text").css("display","block");
                    $("#allowed_text span").html(awardstext);
                },800)
            }

        });
        $("#lotteryBtn2").rotate({
            angle:0,
            duration: 5000,
            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback:function(){
                setTimeout(function(){
                    $(".dialog_mask").css('display','block');
                    ajaxing = true;
                    $("#allow").css('display',"none");
                    $("#allowed").css("display","block");
                    $("#allow_text").css('display',"none");
                    $("#allowed_text").css("display","block");
                    $("#allowed_text span").html(awardstext);
                },800)
            }

        });
    };
    $("#lotteryBtn").rotate({
        bind: {
            click: function(){
                $(".dialog_mask").css('display','none');
                if(ajaxing){
                    ajaxing = false;
                    var time = [0,1];
                    time = 1;
                    if(time==0){
                        timeOut(); //网络超时
                    }
                    if(time==1){
                        $.ajax({
                            url: choujiangUrl,
                            dataType: "json",
                            data: {},
                            success: function (result) {
                                if(result.code == -1){
                                    bravetime.newAlert(result.msg);
                                }else if(result.code == 1){
                                    bravetime.newAlert(result.msg,function(){
                                        mySwiper.destroy(false);
                                        mySwiper2.destroy(false);
                                        getListData();
                                        getsuperData();
                                        $("#allow").css('display',"none");
                                        $("#allowed").css("display","block");
                                        $("#allow_text").css('display',"none");
                                        $("#allowed_text").css("display","block");
                                        $("#allowed_text span").html(result.data.bonus_name);
                                    });
                                }else{
                                    if(result.data.bonus_type_id==1416){
                                        $(".look :eq(0)").css("display","block");
                                        $(".look :eq(1)").css("display","none");
                                        $("#show_message")[0].src = "//pic.davdian.com/free/2016/11/02/1130_443_27d0d56e3500163fffb1d4130867dec6.png";
                                        rotateFunc(1,334.1);
                                        awardstext = result.data.bonus_name;
                                    }
                                    if(result.data.bonus_type_id==1417){
                                        $(".look :eq(1)").css("display","block");
                                        $(".look :eq(0)").css("display","none");
                                        $("#go")[0].href = result.data.url;
                                        $("#show_message")[0].src = "//pic.davdian.com/free/2016/11/02/443_174_20782fb60556a3aa16a1b52c4ce3ba76.png";
                                        rotateFunc(2,282.7);
                                        awardstext = result.data.bonus_name;
                                    }
                                    if(result.data.bonus_type_id==1415){
                                        $(".look :eq(0)").css("display","block");
                                        $(".look :eq(1)").css("display","none");
                                        $("#show_message")[0].src = "//pic.davdian.com/free/2016/11/02/1130_443_bafa3a7baa4efb9dcbef45e405f6df8c.png";
                                        rotateFunc(3,231.3);
                                        awardstext = result.data.bonus_name;
                                    }
                                    if(result.data.bonus_type_id==1419){
                                        $(".look :eq(1)").css("display","block");
                                        $(".look :eq(0)").css("display","none");
                                        $("#go")[0].href = result.data.url;
                                        $("#show_message")[0].src = "//pic.davdian.com/free/2016/11/02/443_174_9c866cb5ed0200ecf2b30426972b24d4.png";
                                        rotateFunc(4,179.9);
                                        awardstext = result.data.bonus_name;
                                    }
                                    if(result.data.bonus_type_id==1414){
                                        $(".look :eq(0)").css("display","block");
                                        $(".look :eq(1)").css("display","none");
                                        $("#show_message")[0].src = "//pic.davdian.com/free/2016/11/02/1130_443_48bd1d7be8ce78abb83cf2ce72e56be7.png";
                                        rotateFunc(5,128.5);
                                        awardstext = result.data.bonus_name;
                                    }
                                    if(result.data.bonus_type_id==1418){
                                        $(".look :eq(1)").css("display","block");
                                        $(".look :eq(0)").css("display","none");
                                        $("#go")[0].href = result.data.url;
                                        $("#show_message")[0].src = "//pic.davdian.com/free/2016/11/02/443_174_0262d0dfb0ac6f0e7e85c72a3324c10a.png";
                                        rotateFunc(6,77.1);
                                        awardstext = result.data.bonus_name;
                                    }
                                    if(result.data.bonus_type_id==1413){
                                        $(".look :eq(0)").css("display","block");
                                        $(".look :eq(1)").css("display","none");
                                        $("#show_message")[0].src = "//pic.davdian.com/free/2016/11/02/1130_443_8918cd26685f2ccf5584e165f6c3146c.png";
                                        rotateFunc(7,25.7);
                                        awardstext = result.data.bonus_name;
                                    }
                                }
                            },
                            error: function () {
                                alert("网络不给力，请检查网络");
                                ajaxing = true;
                            }
                        })

                    }
                }

            }
        }

    });
})