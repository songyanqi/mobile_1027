/**
 * Created by xuzelian on 17/3/4.
 */
sessionStorage.setItem("activitySuccess","activitySuccess");

var uploadPicSuccess=sessionStorage.getItem("uploadPicSuccess");
if(uploadPicSuccess){
    sessionStorage.removeItem("uploadPicSuccess");
    setTimeout(function () {
        location.reload();
    },200)
}
if($(".attend").length){
    $(".attend").click(function(){
        bravetime.addLoader({little: true});
        $.ajax({
            type: "GET",
            url:window.attendUrl,
            data:{
                activityId:window.activityId
            },
            dataType:"json",
            success: function (result) {
                bravetime.removeLoader();
                if (result.code) {
                    if(result.code==109){
                        window.bravetime.newConfirm(result.msg, {
                            okLink: function () {
                                 location.href=result.location
                            }
                        });
                    }
                    else {
                        bravetime.info(result.msg);
                    }
                } else {
                    window.location = window.location
                }
            }, error: function () {
                bravetime.removeLoader();
                bravetime.info("网络异常,数据获取失败");
            }
        });
    })
}
if($(".activity_submit").length){
    $(".activity_submit").click(function(){
        bravetime.addLoader({little: true});
        $.ajax({
            type: "GET",
            url:window.activity_submitUrl,
            data:{
                activityId:window.activityId
            },
            dataType:"json",
            success: function (result) {
                bravetime.removeLoader();
                if (result.code) {
                   bravetime.info(result.msg);
                } else {
                    location.href=result.location
                }
            }, error: function () {
                bravetime.removeLoader();
                bravetime.info("网络异常,数据获取失败");
            }
        });
    })
}