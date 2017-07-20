$(function () {
    document.documentElement.scrollTop = document.body.scrollTop =0;
    var ajaxing = 0,pageIndex=window.pageIndexStart,pagesize = window.pageSize;

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
                        $(".share_red_receive_success_con .success_info").html('已存入手机账号'+tel+'，用手机号码登录后购买即可使用。');
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
                                            $li = $('<li><span class="head"><img class="head_img" ' +
                                                'src="'+ data[i].img+'"></span><div class="con"><p>' +
                                                data[i].name+'<span class="date">' +
                                                data[i].date+'</span></p><p class="fz_12 overflow c6">' +
                                                data[i].word+'</p></div> <span class="price">'+data[i].money+'元</span></li>');
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
        if (ajaxing == 0){
            //判断是否快到页面底部
            var bodyHeight = $(document.body).height();
            var scrollTop = $(document.body).scrollTop();
            var windowHeight = $(window).height();
            if((bodyHeight - scrollTop - windowHeight) < 250 ){
                bravetime.addLoader({little:true});
                //发起ajax请求
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
                                pageIndex++;
                                for(var i=0;i<d.data.length;i++){
                                    var data = d.data;
                                    var $li;
                                    $li = $('<li><span class="head"><img class="head_img" ' +
                                        'src="'+ data[i].img+'"></span><div class="con"><p>' +
                                        data[i].name+'<span class="date">' +
                                        data[i].date+'</span></p><p class="fz_12 overflow c6">' +
                                        data[i].word+'</p></div> <span class="price">'+data[i].money+'元</span></li>');
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
});