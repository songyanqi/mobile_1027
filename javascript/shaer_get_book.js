$(function () {
    //图书列表页选取图书
    $(".receive_free_btn").click(function () {
        var $t = $(this);
        var id = $t.parents(".goods_item").attr("data-for-goods-id");
        bravetime.addLoader({little:true});
        $.ajax({
           url:window.commitUrl,
            data:{
                order_id:window.orderId,
                book_id:id
            },
            dataType:"json",
            success:function (result) {
                if(result.code){
                    bravetime.newAlert(result.msg);
                }else{
                    if(window.jumpUrl){
                        bravetime.goto(window.jumpUrl);
                    }else{
                        $.cookie("book_need_refresh",1);
                        history.back();
                    }
                }
            },error:function () {
                bravetime.ajaxError(38);
            }
        });
    });

});