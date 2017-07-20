$(function () {
    var changeUserImgForm = $("#change_user_img");
    var changeUserImgInput = $("#img_input");
    changeUserImgInput.change(function () {
        bravetime.addLoader();
        changeUserImgForm.ajaxSubmit({
            success: function (res) {
                var data = eval("("+res+")");
                var imgStr = data["data"]["shop_logo"]["s"];
                changeUserImgForm.find("img").attr("src",imgStr);
                // 上传
                $.ajax({
                    url:updateUserImgUrl,
                    dataType:"json",
                    data:{
                        userId:userId,
                        shop_logo:imgStr
                    },
                    success: function (result) {
                        if(result["error"]==0){
                            changeUserImgForm.find("img").attr("src",imgStr);
                            bravetime.removeLoader();
                        }else{
                            bravetime.removeLoader();
                            bravetime.newAlert(result["msg"]);
                        }
                    },
                    error: function () {
                        bravetime.removeLoader();
                        bravetime.ajaxError(30, "头像上传失败，请刷新后重试");
                    }
                })
            },error: function () {
                bravetime.removeLoader();
                bravetime.ajaxError(30, "头像上传失败，请刷新后重试");
            }
        });
    });

    var downloadLayer = $(".download_layer");
    var downloadBtn = $(".download_btn");
    var mask = $(".dialog_mask");
    var close = mask.find(".modal_close");
    downloadLayer.find(".close").click(function () {
        downloadLayer.addClass("hide");
    });
    downloadBtn.click(function () {
        mask.removeClass("hide");
    });
    close.click(function () {
        mask.addClass("hide");
    });
});


var dvdBottom = require("../module/bottom.vue");
new Vue({
    el: "#user",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        dvdBottom:dvdBottom
    }
});