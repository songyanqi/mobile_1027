$(function () {
        if($.cookie('share_get_flag')){
            $.removeCookie('share_get_flag');
            var url = location.href;
            if (url.indexOf('abct=') > -1) {
                url = url.replace(/t=[\d]+/g, 't=' + Date.now());
            } else if (url.indexOf('?') > -1) {
                url += '&abct=' + Date.now();
            } else {
                url += '?abct=' + Date.now();
            }
            setTimeout(function () {
                location.replace(url);
            },300);
        }



    // 删除地址
    $(".delete").each(function (index, el) {

        $(el).click(function () {
            var address_id = $(el).parents(".address").attr("data-for");
            window.bravetime.newConfirm("您确定要删除改地址么？", {
                okLink: function () {
                    window.bravetime.newInfo("地址删除中");
                    $.ajax({
                        url: deleteUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            address_id: address_id
                        },
                        success: function (result) {
                            if (result["error"] == 0) {
                                location.reload();
                            } else {
                                var msg = result["msg"] || "后台接口问题？？";
                                bravetime.newAlert(msg);
                            }
                        },
                        error: function () {
                            bravetime.ajaxError(9);
                        }
                    });
                }, cancelLink: function () {

                }
            });
            return false;
        })
    });

});