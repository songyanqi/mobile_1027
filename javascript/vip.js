$(document).ready(function () {


    //获取会员商品列表
    get_vip_goodslist();


});

function get_vip_goodslist() {
    bravetime.addLoader({little:true});
    $.ajax({
        type: "get",
        url: window.vipGoodsUrl,
        success: function (request) {
            var data = JSON.parse(request);
            if(data.code == 0){
            for (var i = 0; i < data.data.length; i++) {
                var $a = $('<a href=/' + data.data[i].goods_id + '.html' + ' data-dav-tj="vip|good|good|1|good@vip"></a>');
                var html = '<div>' +
                    '<img data-original=' + data.data[i].img + '@70Q src=' + data.data[i].img + '>' +
                    '</div>' +
                    '<div class="vip_good_info">' +
                    '<div class="vip_good_title">' + data.data[i].goods_name +
                    '</div>' +
                    '<div class="vip_good_price">' +
                    '<span class="vip_price">' + "会员价: ¥" + data.data[i].member_price + '</span>' +
                    '<span>' + "非会员: ¥" + data.data[i].shop_price + '</span>' +
                    '<span class="pull-right">' + "库存: " + data.data[i].goods_number + '</span>' +
                    '</div>' +
                    '</div>';
                $a.html(html);
                $(".vip_good_list").append($a);
            }
            bravetime.removeLoader();
            }else {
                bravetime.removeLoader();
                bravetime.info(data.msg);
            }
        },error:function(){
            bravetime.removeLoader();
            bravetime.info("网络错误");
        }
    });
}

