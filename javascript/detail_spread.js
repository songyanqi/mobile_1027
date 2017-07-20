/**
 * Created by xuzelian on 16/5/26.
 */
/**
 * 页面初始化
 */
$(function(){
    initCommend(); //推荐功能

});
/**
 * 初始化推荐商品到首页
 */
function initCommend(){
    var comCon = $(".recommend_container");
    comCon.click(function () {
        var isCom = $(this).hasClass("is_recommend");
        if (!isCom) {
            // 已推荐
            $.ajax({
                url:window.commonendUrl,
                dataType:"json",
                data:{
                    id:window.goodsId,
                    recommend:0
                },success: function (result) {
                    if(result["error"]){
                        bravetime.info(result["msg"]);
                    }else{
                        comCon.toggleClass("is_recommend");
                        bravetime.info("取消推荐成功");
                    }
                },error: function () {
                    bravetime.removeLoader();
                    bravetime.ajaxError(36);
                }
            });
        }else{
            // 未推荐
            $.ajax({
                url:window.commonendUrl,
                dataType:"json",
                data:{
                    id:window.goodsId,
                    recommend:1
                },success: function (result) {
                    bravetime.removeLoader();
                    if(result["error"]){
                        bravetime.info(result["msg"]);
                    }else{
                        comCon.toggleClass("is_recommend");
                        bravetime.info("推荐成功");
                    }
                },error: function () {
                    bravetime.removeLoader();
                    bravetime.ajaxError(36);
                }
            });
        }
    });
}
