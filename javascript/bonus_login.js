$(document).ready(function(){
	var container = $(".main");
	var interval = null;
	if(container.length){
		addListener();
	}

	// 展示手机号
	function showTel(){
		container.find(".account_type").addClass("hide");
		container.find(".type_1").removeClass('hide').find(".login_tel").html(window.loginTel);
		
		if(window.loginCallback && typeof window.loginCallback == "function"){
			window.loginCallback();
		}
	}

	// 展示手机号输出框
	function showTelInput(){
		container.find(".account_type").addClass("hide");
		container.find(".type_2").removeClass('hide').find(".change_account_button");
		container.find(".type_2").find("input").val("");

		if(window.unloginCallback && typeof window.unloginCallback == "function"){
			window.unloginCallback();
		}
	}

	//  展示登录界面
	function showLogin(){
		container.find(".input_coantainer").addClass("hide");
		container.find(".type_3").removeClass('hide');
		//container.find(".type_3").find("input").val("");
		container.find(".type_3").find(".tel_input").val(window.loginTel);

		// if(window.unloginCallback && typeof window.unloginCallback == "function"){
		// 	window.unloginCallback();
		// }
	}

	//  展示注册界面
	function showRegister(){
		container.find(".input_coantainer").addClass("hide");
		container.find(".type_4").removeClass('hide');
		//container.find(".type_4").find("input").val("");
		container.find(".type_4").find(".tel_input").val(window.loginTel);
		sendCode();
		
		if(window.unloginCallback && typeof window.unloginCallback == "function"){
			window.unloginCallback();
		}
	}

	// 发送短信验证码
	function sendCode(){
		var button  = container.find(".type_4").find(".code_container");
		if(button.hasClass('btn-disable')){
			return;
		}
		$.ajax({
			sms_code:window.sms_code||null,
			url:sendUrl,
            type:"POST",
           	data:{
				mobile:window.loginTel
			}
		});

		var t = 60;
		button.addClass("btn-disable").html(t-- + "秒后可重新发送");
		// 倒计时
		if(interval){
			clearInterval(interval);
		}
		interval = setInterval(function(){
			button.html(t-- + "秒后可重新发送");
			if(t <= 0){
				button.html("获取验证码").removeClass('btn-disable');
		        clearInterval(interval);
			}
		}, 1000);
	}

	// 发送手机号
	function sendTelNumber(){
		var button = container.find(".type_2").find(".change_account_button");
		var telnumber = container.find(".type_2").find("input").val();
		if(button.hasClass("disable")){
			return;
		}

		button.addClass("disable");
		if(Units.isTel(telnumber)){
			$.ajax({
				sms_code:window.sms_code||null,
				url:url1,
				type:"POST",
				dataType:"json",
				data:{
					mobile:telnumber,
					sms_code:window.sms_code||null
				},
				success:function(result){
					window.loginTel = telnumber;
					button.removeClass("disable");
					if(result.status ==-1){
						bravetime.newAlert(result["msg"]);
					}
					if(result.status==0){
						if(result.act == "login"){
							showLogin();
						}else if(result.act == "register"||result.act=="init"){
							showRegister();
						}	
					}
				},
				error:function(){
					button.removeClass("disable");
					bravetime.ajaxError(2);
				}
			});
		}else{
			bravetime.newAlert("请输入正确的手机号");
			button.removeClass("disable");
		}
	}

	// 登录
	function login(){
		var button = container.find(".type_3").find(".change_account_button");
		if(button.hasClass("disable")){
			return;
		}
		button.addClass("disable");
		var pw = container.find(".type_3").find("input.pass_input").val();
		if(pw.length){
			$.ajax({
				url:url2,
				type:"POST",
				dataType:"json",
				data:{
					sms_code:window.sms_code||null,
	 				password:pw,
					mobile:window.loginTel
				},
				success:function(result){
					button.removeClass("disable");
					if(result.status == -1){
			 			bravetime.newAlert(result["msg"]);
			 		}else if(result.status == 0){
			 			//showTel();
			 			location.reload();
			 		}
				},
				error:function(){
					button.removeClass("disable");
					bravetime.ajaxError(3);
				}
			});
		}else{
			button.removeClass("disable");
			bravetime.newAlert("请输入密码");
		}
	}

	// 注册
	function register(){
		var button = container.find(".type_4").find(".change_account_button");
		if(button.hasClass("disable")){
			return;
		}
		button.addClass("disable");
		var pw = container.find(".type_4").find("input.pass_input").val();
		var code = container.find(".type_4").find("input.vc_input").val();

		$.ajax({
	 		url:registerUrl,
	 		type:"POST",
	 		dataType:"json",
	 		data:{
	 			sms_code:window.sms_code||null,
	 			mobile:window.loginTel,
	 			verify_code:code,
	 			password:pw
	 		},
	 		success:function(result){
	 			button.removeClass("disable");
					if(result.status == -1){
			 			bravetime.newAlert(result["msg"]);
			 		}else if(result.status == 0){
			 			//showTel();
			 			location.reload();
			 		}
	 		},
	 		error:function(){
					button.removeClass("disable");
				bravetime.ajaxError(4);
				}
	 	});
	}


	function addListener(){
		container.find(".type_1").find(".change_account_button").click(showTelInput);
		container.find(".type_2").find(".change_account_button").click(sendTelNumber);
		container.find(".type_3").find(".change_account_button").click(login);
		container.find(".type_4").find(".change_account_button").click(register);

		container.find(".type_3").find(".change_tel").click(showTelInput);
		container.find(".type_3").find(".forget_pw").click(showRegister);
		container.find(".type_4").find(".change_tel").click(showTelInput);
		container.find(".type_4").find(".code_container").click(sendCode);

	}

});