$(function () {
    var flag = false;
    var step2 = $(".js-step-2");
    var img = step2.find(".tiro_boot_page_pic").find("img");
    var hand = step2.find(".hand");
    var title = step2.find(".title");
    var con = step2.find(".con");
    var btn = step2.find(".dav_btn").data("step", 1);
    var desc = step2.find(".desc");
    var imgContainer = step2.find(".tiro_boot_page_pic");
    window.onpopstate = function (data) {
        if(flag){
            change(+data.state);
        }
    };
    btn.click(function () {
        flag = true;
        var data = btn.data("step");
        change(data);
        history.pushState(data, "");
    });

    var changeData = [{
        imgUrl: null,
        btnHtml: "开始学习",
        title: "欢迎您加入大V店！",
        con: "我来带您认识大V店，学会这 4 步，</br>开启大V店之旅，还有红包领哦~",
        hand: null,
        description: null,
        shining:true
    }, {
        imgUrl: "//pic.davdian.com/free/boot_page_pic1_201598_2x.png",
        btnHtml: "下一步（1/4）",
        title: "第一步：怎么进入自己店铺？",
        con: "微信关注“果敢时代大V店”并绑定账号</br>点击“购物”菜单即可进入自己店铺",
        hand: [150, -30],
        description: null
    }, {
        imgUrl: "//pic.davdian.com/free/boot_page_pic2_201598_2x.png",
        btnHtml: "下一步（2/4)",
        title: "第二步：如何赚钱？",
        con: "分享商品、店铺到朋友圈或朋友，</br>店铺卖出商品即可获得返现",
        hand: [130, -30],
        description: null
    }, {
        imgUrl: "//pic.davdian.com/free/boot_page_pic3_201598_2x.png",
        btnHtml: "下一步（3/4)",
        title: "第三步：如何把钱取出来？",
        con: "在“我的-我的奖励”绑定银行卡或支付宝，</br>满 100 元可自主提现",
        description: null
    }, {
        imgUrl: "//pic.davdian.com/free/boot_page_pic4_201598_2x.png",
        btnHtml: "完成，领红包",
        title: "第四步：如何联系客服？",
        con: "在“果敢时代大V店”内留言，即可联系客服</br>或拨打 400 608 1066",
        hand: [192, -10],
        description: null
    }, {
        imgUrl: "//pic.davdian.com/free/boot_page_pic5_20151114.png",
        special: true,
        btnHtml: null,
        title: "红包已放入您的账户，赶紧</br>关注公众号去店铺查看吧",
        con: null,
        description: '长按二维码图片选择"识别图中二维码"即可关注或微信添加"果敢时代大V店"(davdiankefu)即可管理店铺'
    }];


    initImage(0);
    function initImage(index){
        if(!changeData[index]){
            return false;
        }
        var im = new Image();
        im.onload = function(){
            initImage(index+1);
        };
        if(changeData[index]["imgUrl"]){
            im.src = changeData[index]["imgUrl"];
        }else{
            initImage(index+1);
        }
    }

    function change(index) {
        var data = changeData[index];
        step2.css({opacity: 1})
            .animate({opacity: 0}, function () {
                img.attr("src", data["imgUrl"]).toggleClass("special", !!data["special"]);
                if (data["imgSize"]) {
                    img.css("width", data["imgSize"] + "px");
                } else {
                    img.css("width", data["imgSize"] + "px");
                }
                imgContainer.toggleClass("hide", !data["imgUrl"]);
                btn.html(data["btnHtml"]).toggleClass("hide", !data["btnHtml"]).toggleClass("btn_shadow",!!data["shining"]);
                title.html(data["title"]);
                con.toggleClass("hide", !data["con"]).html(data["con"]);
                hand.css("opacity", 0);
                if (data["hand"]) {
                    hand.css("right", "0px").css("bottom", data["hand"][1]);
                }
                hand.toggleClass("hide", !data["hand"]);
                desc.toggleClass("hide", !data["description"]).html(data["description"]);
                step2.animate({opacity: 1}, function () {
                    if (data["hand"]) {
                        hand.animate({right: data["hand"][0], opacity: 1});
                    }
                });
            });
        btn.data("step", index + 1);
    }

});
