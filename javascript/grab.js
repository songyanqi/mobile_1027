/**
 * Created by nemolee on 15/11/6.
 */
$(function () {
    var codeInput = $(".redemption_code_input");
    var codeBtn = $(".redemption_code_btn");

    codeInput.on("input", function () {
        if($.trim(codeInput.val())==""){
            codeBtn.removeClass("yellow");
        }else{
            codeBtn.addClass("yellow");
        }
    });

    codeBtn.click(function () {
        if(!codeBtn.hasClass("yellow")){
            return false;
        }
        var code = $.trim(codeInput.val());
        $.ajax({
            url:grabUrl,
            data:{
                invite_code:code
            },
            dataType:"json",
            success: function (result) {
                if(result["error"]==0){
                    bravetime.goto(result["url"]);
                }else if(result["error"]==1){
                    bravetime.info(result["msg"]);
                }else{
                    bravetime.info("系统异常,请刷新后重试");
                }
            },error: function () {
                bravetime.ajaxError(33);
            }
        });
    });
});
