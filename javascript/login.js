var loginReady = function () {
    //输入手机号,密码input出现清空按钮,同时下面按钮变成可点击
    $(".into").each(function () {
        var $this = $(this);
        $this.parent().find(".clear").click(function () {
            $this.val("");//清除输入的内容
            $this.focus();//保留光标
            $(this).hide();
            var parents = $this.parent().parent().parent();
            parents.find(".sure_btn").addClass("btn-disable");
        });

        $this.on("input propertychange",function(){
            input_changse($this);
        })



    });

    //验证码部分使用了单独的css来区别当两个表单都为空或者都不为空的时候操作按钮的disable
    $(".code_inputs3").on("input propertychange",function(){
        if($(".code_inputs3_value").val() != "" && $(this).val() != ""){
            $(".code_inputs3_btn").removeClass("btn-disable");
        }else{
            $(".code_inputs3_btn").addClass("btn-disable");
        }
    });

    var input_changse = function ($this) {
        if ($this.val().trim() != "") {
            $this.parent().find(".clear").show();
            var code_thiss = $this.parent().parent().parent();
            if (code_thiss.find(".code_inputs3").size()) {
                if (code_thiss.find(".code_inputs3").val() == "") {

                } else {
                    $this.parent().parent().parent().find(".sure_btn").removeClass("btn-disable");
                }
            } else {
                $this.parent().parent().parent().find(".sure_btn").removeClass("btn-disable");
            }
        }
        else {
            $this.parent().find(".clear").hide();
            $this.parent().parent().parent().find(".sure_btn").addClass("btn-disable");
        }
    };

    if(document.getElementById("phone")){
      document.getElementById("phone").onkeyup = function(event) {
        var e = event ? event : window.event;
        var text_len = this.value.length;
        if ((text_len === 3 || text_len === 8)&& e.keyCode !== 8) {
          this.value += " ";
        }
      };
    }



    var container = $(".login_container");
    var interval = null;
    if (container.length) {
        addListener();
    }
    // function init(){
    // 	addListener();
    // 	if(window.logined && window.loginTel){
    // 		showTel();
    // 	}else{
    // 		showTelInput();
    // 	}
    // }

    /**
     * 发送语音验证码
     */
    function send_voice_code() {
        $mobile = $(".type_4 .login_tel").html();
        if ($mobile == '') {
            alert("手机号不能为空");
            return false;
        }
        $.ajax({
            sms_code: window.sms_code || null,
            url: voiceCodeUrl,
            type: "POST",
            data: {mobile: $mobile},
            dataType: 'json',
            success: function (result) {
                bravetime.newAlert(result['msg']);
            },
            error: function () {
                bravetime.ajaxError(20);
            }
        });
    }

    // 展示手机号
    function showTel() {
        container.find(".account_type").addClass("hide");
        container.find(".type_1").removeClass('hide').find(".login_tel").html(window.loginTel);

        if (window.loginCallback && typeof window.loginCallback == "function") {
            window.loginCallback();
        }
    }

    // 展示手机号输出框
    function showTelInput() {
        container.find(".account_type").addClass("hide");
        container.find(".type_2").removeClass('hide').find(".change_account_button");
        container.find(".type_2").find("input").val("");

        if (window.unloginCallback && typeof window.unloginCallback == "function") {
            window.unloginCallback();
        }
    }

    // 禁止更换手机号
    function alertNoChange() {
        bravetime.newAlert("不支持更换账号，请到个人中心更换哦～");
        return false
    }

    //  展示登录界面
    function showLogin() {
        container.find(".account_type").addClass("hide");
        container.find(".type_3").removeClass('hide');
        container.find(".type_3").find("input").val("");
        container.find(".type_3").find(".login_tel").html(window.loginTel);

        if (window.unloginCallback && typeof window.unloginCallback == "function") {
            window.unloginCallback();
        }
    }

    //  展示注册界面
    function showRegister() {
        container.find(".account_type").addClass("hide");
        container.find(".type_4").removeClass('hide');
        container.find(".type_4").find("input").val("");
        container.find(".type_4").find(".login_tel").html(window.loginTel);
        sendCode();

        if (window.unloginCallback && typeof window.unloginCallback == "function") {
            window.unloginCallback();
        }
    }

    // 发送短信验证码
    function sendCode() {
        var button = container.find(".type_4").find(".code_container").find(".dav-btn");
        if (button.hasClass('btn-disable')) {
            return;
        }
        $.ajax({
            sms_code: window.sms_code || null,
            url: sendUrl,
            type: "POST",
            dataType: "json",
            data: {mobile: window.loginTel},
            success: function (result) {
                if (result.status != 0) {
                    bravetime.newAlert(result["msg"]);
                }
            }
        });

        var t = 60;
        button.addClass("btn-disable").html(t-- + "s后重发");
        // 倒计时
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(function () {
            button.html(t-- + "s后重发");
            if (t <= 0) {
                button.html("重新发送").removeClass('btn-disable');
                clearInterval(interval);
            }
        }, 1000);
    }

    // 发送手机号
    function sendTelNumber() {
        var button = container.find(".type_2").find(".change_account_button");
        var telnumber = container.find(".type_2").find("input").val().replace(/ /g,"");
        if (button.hasClass("btn-disable")) {
            return;
        }

        button.addClass("btn-disable");
        if (Units.isTel(telnumber)) {
            $.ajax({
                sms_code: window.sms_code || null,
                url: url1,
                type: "POST",
                dataType: "json",
                data: {
                    mobile: telnumber,
                    sms_code: window.sms_code || null
                },
                success: function (result) {
                    window.loginTel = telnumber;
                    button.removeClass("btn-disable");
                    if (result.status == -1) {
                        bravetime.newAlert(result["msg"]);
                    }
                    if (result.status == 0) {
                        if (result.act == "login") {
                            showLogin();
                        } else if (result.act == "register" || result.act == "init") {
                            showRegister();
                        }
                    }
                },
                error: function () {
                    button.removeClass("btn-disable");
                    bravetime.ajaxError(21);
                }
            });
        } else {
            bravetime.newAlert("请输入正确的手机号");
            button.removeClass("btn-disable");
        }
    }

    // 登录
    function login() {
        var button = container.find(".type_3").find(".change_account_button");
        if (button.hasClass("btn-disable")) {
            return;
        }
        button.addClass("btn-disable");
        var pw = container.find(".type_3").find("input.passwd").val();
        if (pw.length) {
            $.ajax({
                url: url2,
                type: "POST",
                dataType: "json",
                data: {
                    sms_code: window.sms_code || null,
                    password: pw,
                    mobile: window.loginTel
                },
                success: function (result) {
                    button.removeClass("btn-disable");
                    if (result.status == -1) {
                        bravetime.newAlert(result["msg"]);
                    } else if (result.status == 0) {
                        showTel();
                    }
                },
                error: function () {
                    button.removeClass("btn-disable");
                    bravetime.ajaxError(22);
                }
            });
        } else {
            button.removeClass("btn-disable");
            bravetime.newAlert("请输入密码");
        }
    }

    // 注册
    function register() {
        var button = container.find(".type_4").find(".change_account_button");
        if (button.hasClass("btn-disable")) {
            return;
        }
        button.addClass("btn-disable");
        var pw = container.find(".type_4").find("input.passwd").val();
        var code = container.find(".type_4").find("input.code").val();

        $.ajax({
            url: registerUrl,
            type: "POST",
            dataType: "json",
            data: {
                sms_code: window.sms_code || null,
                mobile: window.loginTel,
                verify_code: code,
                password: pw
            },
            success: function (result) {
                button.removeClass("btn-disable");
                if (result.status == -1) {
                    bravetime.newAlert(result["msg"]);
                } else if (result.status == 0) {
                    showTel();
                }
            },
            error: function () {
                button.removeClass("btn-disable");
                bravetime.ajaxError(23);
            }
        });
    }


    function addListener() {
        container.find(".type_1").find(".change_account_button").click(alertNoChange);
        container.find(".type_2").find(".change_account_button").click(sendTelNumber);
        container.find(".type_3").find(".change_account_button").click(login);
        container.find(".type_4").find(".change_account_button").click(register);

        container.find(".type_3").find(".change_tel").click(showTelInput);
        container.find(".type_3").find(".forget_pw").click(showRegister);
        container.find(".type_4").find(".change_tel").click(showTelInput);
        container.find(".type_4").find(".code_container").find(".dav-btn").click(sendCode);

        container.find(".type_4").find(".send_voice_code").click(send_voice_code);

    }

};

window.loginReady =loginReady;
