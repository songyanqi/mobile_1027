$(function () {


    document.documentElement.scrollTop = document.body.scrollTop =0;
    var ajaxing = 0,pageIndex=window.pageIndexStart,pagesize = window.pageSize,tag=0;

    $("#activity_info").click(function(){
        $(".poster").addClass("hide").siblings().removeClass("hide");
        $("#poster").removeClass("hover").siblings().addClass("hover");
        bravetime.removeLoader();
        tag=0;
    });

    $("#poster").click(function(){
        $(".activity_info").addClass("hide").siblings().removeClass("hide");
        $("#activity_info").removeClass("hover").siblings().addClass("hover");
        bravetime.removeLoader();
        tag=1;
    });

    $(".share_red_receive_con .share_red_btn").click(function () {
        var tel = $.trim($(".share_red_receive_con input").val());
        if(Units.isTel(tel)){
            bravetime.addLoader({little:true});
            $.ajax({
                url:window.sendUrl,
                type:"POST",
                dataType:"json",
                data:{tel:tel},
                success:function (result) {
                    if(result.code){
                        bravetime.removeLoader();
                        bravetime.info(result.msg);
                    }else{
                        bravetime.info(result.msg);
                        $(".share_red_receive_success_con .success_info").html('已存入手机'+tel+'，使用手机号注册大V店账号，即可使用红包购物~');
                        $(".share_red_receive_success_con .amount").html(result.amount+"元");
                        $(".share_red_receive_con").addClass("hide");
                        $(".share_red_receive_success_con").removeClass("hide");
                        pageIndex = 1;
                        ajaxing = 1;
                        $.ajax({
                            data:{
                                page:pageIndex,
                                pagesize:pagesize,
                                t:Date.now()
                            },
                            url:listUrl,
                            dataType:"json",
                            success:function(d){
                                bravetime.removeLoader();
                                if(!d.code){
                                    if(d.data.length){
                                        $(".share_red_list ul").empty();
                                        pageIndex++;
                                        for(var i=0;i<d.data.length;i++){
                                            var data = d.data;
                                            var $li;
                                            var register="";
                                            if(data[i].register==1){
                                                register='<span class="registered">已注册</span>'
                                            }
                                            $li = $('<li><span class="head"><img class="head_img" ' +
                                                'src="'+ data[i].img+'"></span><div class="con"><p>' +
                                                data[i].name+''+register+'</p><p class="overflow">' +
                                                data[i].word+'</p></div><span class="price">'+data[i].money+'元</span><span class="date">' +
                                                data[i].date+'</span></li>');
                                            $(".share_red_list ul").append($li);
                                        }
                                        ajaxing = 0;
                                    }else{

                                    }

                                }else {
                                    bravetime.info(d.msg);
                                }
                            },
                            error:function(){
                                bravetime.removeLoader();
                                bravetime.info('网络异常,请稍后再试');
                            }
                        });
                    }

                },error:function () {
                    bravetime.removeLoader();
                    bravetime.newAlert('网络异常,请稍后重试');
                }
            });
        }else{
            bravetime.info("请输入正确的电话号码");
        }
    })



    $(window).on("scroll", function(){
        if (ajaxing == 0&&tag==0){
            //判断是否快到页面底部
            var bodyHeight = $(document.body).height()+44;
            var scrollTop = $(document.body).scrollTop();
            var windowHeight = $(window).height();
            if((bodyHeight - scrollTop - windowHeight) < 250 ){
                ajaxing = 1;
                bravetime.addLoader({little:true});
                //发起ajax请求

                $.ajax({
                    data:{
                        page:pageIndex,
                        pagesize:pagesize,
                        t:Date.now()
                    },
                    url:listUrl,
                    dataType:"json",
                    success:function(d){
                        bravetime.removeLoader();
                        if(!d.code){
                            if(d.data.length){
                                pageIndex++;
                                for(var i=0;i<d.data.length;i++){
                                    var data = d.data;
                                    var $li;
                                    var register="";
                                    if(data[i].register==1){
                                        register='<span class="registered">已注册</span>'
                                    }
                                    $li = $('<li><span class="head"><img class="head_img" ' +
                                        'src="'+ data[i].img+'"></span><div class="con"><p>' +
                                        data[i].name+''+register+'</p><p class="overflow">' +
                                        data[i].word+'</p></div><span class="price">'+data[i].money+'元</span><span class="date">' +
                                        data[i].date+'</span></li>');
                                    $(".share_red_list ul").append($li);
                                }
                                ajaxing = 0;
                            }else{

                            }

                        }else {
                            bravetime.info(d.msg);
                        }
                    },
                    error:function(){
                        bravetime.removeLoader();
                        bravetime.info('网络异常,请稍后再试');
                    }
                });
            }
        }


    });

    $(function () {
        var sharepic=$(".poster_pic img").attr("src");
        window.sharePic = function (type) {
            window.bravetime.callAppShareImg(type,sharepic,function () {
            },function (msg) {
                bravetime.info("错误码"+msg);
            })
        };
    })


    $(".poster_btn .pull-left").click(function () {
        var src=$(".poster_pic img").attr("src");
        bravetime.callAppShareImg(1,src);
    });

    $(".poster_btn .pull-right").click(function () {
        var src=$(".poster_pic img").attr("src");
        bravetime.callAppShareImg(0,src);
    });
});