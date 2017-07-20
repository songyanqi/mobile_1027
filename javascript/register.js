$(document).ready(function(){
	var con1 = $(".login-container-1");
	var telInput = $(".login-tel-num").find("input");
	if(con1 && con1.length){
		var submitButton = $(".login-button");
		submitButton.click(function(event) {
			if(Units.isTel(telInput.val())){
				$("form").submit();
			}else{
				bravetime.newAlert("请输入正确的手机号");
			}
			
		});
	}

	var con2 = $(".login-container-2");
	if(con2 && con2.length){
		var submitButton = $(".login-button");
		submitButton.click(function(event) {
			var pass = $('#login-pass').val();
			if (pass.length == 0) {
				bravetime.newAlert("请输入密码");
				return false;
			}
			$("form").submit();
		});
	}


	var con3 = $(".login-container-3");
	if(con3 && con3.length){
		var sendButton = $(".send_code"),
			submitButton = $(".login-button"),
			interval,
			loginTel = $(".logined-tel").val();
		sendButton.click(function(){
			if(sendButton.hasClass('btn-disable')){
				return;
			}
			$.ajax({
				sms_code:window.sms_code||null,
				url:sendUrl,
	            type:"POST",
	           	data:{mobile:loginTel},
	           	dataType:"json",
				success:function(result){
					bravetime.newAlert(result.msg);
					sendLock();
				},
				error:function(){
					bravetime.newAlert("操作失败");
				}
			});
		});

		submitButton.click(function(event) {
			var verify_code = $.trim($('#find-code').val());
			var pass = $('#find-pass').val();
			if (verify_code.length == 0) {
				bravetime.newAlert("请输入短信验证码");
				return false;
			}

			if (pass.length == 0) {
				bravetime.newAlert("请输入密码");
				return false;
			} else if (pass.length < 6) {
				bravetime.newAlert("密码长度不能小于6位");
				return false;
			}

			$("form").submit();
		});
	}


	if (window.sendMsg && sendMsg) {
		sendLock();
	}

	function sendLock() {
		var t = 60;
		sendButton.addClass("btn-disable")
			.html(t-- + "秒后可重新发送");
		// 倒计时
		if(interval){
			clearInterval(interval);
		}
		interval = setInterval(function(){
			sendButton.html(t-- + "秒后可重新发送");
			if(t <= 0){
				sendButton.html("获取验证码")
					.removeClass('btn-disable');
		        clearInterval(interval);
			}
		}, 1000);
	}
	if(Units.isApp()){
		setTimeout(function () {
			window.nativeLoginFunction(location.href,function () {
				history.back();
				setTimeout(function () {
                    bravetime.goto('davdian://call.Browser.com?action=close&callback=result&minv=2.5.0');
                },200)

            });
		},150);
	}else{
		$(document.body).removeClass("hide");
	}

	
});
