/**
 * Created by xuzelian on 17/2/21.
 */
$(function () {
    $(".sureCloseShop").click(function () {
        var mobile=window.mobile;
        var info="确认关闭店铺？</br>手机号:"+ mobile;
        bravetime.newConfirm(info,{
            okText:"确定",
            cancelText:"取消",
            okLink:function(){
                bravetime.addLoader({little: true});
                $.ajax({
                    url: closeShopUrl,
                    dataType: "json",
                    data: {},
                    success: function (result) {
                        bravetime.removeLoader();
                        if (result.code) {
                            bravetime.info(result.msg);
                        }else {
                            window.location=window.oklink
                        }
                    },
                    error: function () {
                        bravetime.removeLoader();
                    }
                });
            },
        });
    });
});