"use strict";
$(function () {
    var telInput = $("input.tel");
    var passInput = $("input.pass");
    var okButton = $(".bind_button .dav-btn");

    addListener(); // 增加监听器

    function addListener() {
        $("input").on("input", inputInput);
        okButton.click(commit);
    }

    /**
     * 监听输入框输入
     */
    function inputInput(){
        okButton.toggleClass("btn-disable",!(Units.isTel(telInput.val())&&passInput.val().length>0));
    }

    /**
     * 监听绑定
     */
    function commit(){
        var tel = telInput.val();
        var pass = passInput.val();
        if(!Units.isTel(tel)){
            bravetime.info("请输入正确的手机号码");
            return false;
        }

        if(!pass.length){
            bravetime.info("请输入密码");
            return false;
        }

        bravetime.addLoader({small:true});
        $.ajax({
            url:bindUrl,
            type:"POST",
            dataType:"json",
            data:{
                tel:tel,
                pass:pass
            },
            success: function (result) {
                bravetime.removeLoader();
                if(result["error"]){
                    bravetime.info(result["info"]);
                }else{
                    bravetime.goto(window.jumpUrl|"");
                }
            },
            error: function () {
                bravetime.removeLoader();
                bravetime.ajaxError(38);
            }
        });
    }
});