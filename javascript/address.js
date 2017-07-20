/**
 * Created by nemolee on 15/8/4.
 */
$(function () {
    var addressList = $(".address_list");
    var lis = addressList.find("li");
    addressList.on("click","li", function () {
        lis.removeClass("current");
        $(this).addClass("current");
    })
});