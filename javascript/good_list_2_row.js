var module = window.module || {};
var good_list_2_row = module.good_list_2_row = {};
good_list_2_row.init = function (id, showSales) {

        //下拉刷新
        var ajaxing = 0; //标记是否在ajax请求
        var pageIndex = window.pageIndexStart||2;
        var main = $("#"+id);
        var container = main.find(".good_list_2_row");
        if(container.length){
            if(main.find(".refresh").length){
                $(window).on("scroll", function(){
                    var bodyHeight = $("body").height();
                    var scrollTop = $(document).scrollTop();
                    var windowHeight = $(window).height();
                    if((bodyHeight - scrollTop - windowHeight) < 100 ) {
                        refresh(main.find(".refresh"));
                    }
                });
            }else if(main.find(".click2refresh").length){
                main.find(".click2refresh").click(function () {
                    main.find(".loading").removeClass("hide");
                    main.find(".txt").html("加载中...");
                    refresh(main.find(".click2refresh"), function (data) {
                        if (data.has_more) {
                            main.find(".txt").html("点击加载更多");
                            main.find(".loading").addClass("hide");
                        } else {
                            main.find(".click2refresh").html("没有更多商品了！");
                            ajaxing = 1;
                        }

                    });
                });
            }

        }

        function refresh(con,callback){
            if (ajaxing == 0){
                //判断是否快到页面底部

                //发起ajax请求
                ajaxing = 1;
                $.ajax({
                    data:{
                        page:pageIndex,
                        pagesize:pagesize,
                        userId:userId,
                        t:Date.now()
                    },
                    url:refreshUrl,
                    success:function(d){
                        if(typeof d == "string"){
                            var data = JSON.parse(d);
                        }else{
                            var data = d;
                        }
                        if(+data["error_code"]){
                            bravetime.info(data["error_msg"]);
                            ajaxing = 0;
                        }else if(data["data"].length){
                            var goodsData = data["data"],good,i=0,list = container;
                            for(;good=data["data"][i++];){
                                if(good["goods_label"]!==""){
                                    $(".dav-color-price").append('')
                                }
                                $('<a href="'+good["url"]+'" class="good_item">'+
                                    '<div class="good_img_container">'+
                                    '<img src="'+good["img"]+'">'+
                                    ((good["sale_status"]=="offline"||good["sale_status"]=="soldout")?('<div class="good_list_sell_out">'+{offline:"下架",soldout:"售罄"}[good["sale_status"]] +'</div>' ):"")+
                                    (good["tag"]?('<div class="'+good["tag"].toString()+'"></div>'):"")+
                                    '</div>'+
                                    '<div class="good_con">'+
                                    '<div class="good_title">'+good["title"]+'</div>'+
                                    '<div class="fz_12"><span class="dav-color-price">¥' + good["price"] + '</span>'+
                                    ((good["goods_label"]&&good["goods_label"]!=="") ? ('<span class="lable">' + good["goods_label"] + '</span>'):"")+'</div>' +
                                    '</div>'+
                                    '</a>').appendTo(list);
                            }
                            pageIndex++;
                            ajaxing = 0;
                            if (typeof callback == "function") {
                                callback(data);
                            }
                            // window.bravetime.tj.pvSend('goods_list_d2refresh','goods_list_d2refresh_id'+pageIndex);

                        }else{
                            con.html("没有更多商品了！");
                        }
                    },
                    error:function(){
                        $(".refresh").empty();
                        bravetime.ajaxError(18);
                        ajaxing = 0;
                    }
                });
            }
        }
    };


//限时抢购秒杀详情页  剩余时间  倒计时
var merchandiseDetail = $(".detail_sec");
if (merchandiseDetail.length) {
    var merchandiseList = merchandiseDetail.find(".skill_dao");
    window.mechandiseInterval = setInterval(function () {
        var second = +merchandiseDetail.attr("data-skill-time");
        if (second > 0) {
            merchandiseList.html("剩余时间：" + calculateTime(second));
            merchandiseDetail.attr("data-skill-time", second - 1);
        } else if(second == 0) {
            merchandiseList.html("此商品秒杀已结束");
        }

    }, 1000);
}

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
