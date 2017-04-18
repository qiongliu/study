$(function(){
	var $mNav = $(".m_nav");
	var $mRegist = $(".m_regist");
	var $uNowLogin = $mRegist.find('.u_now_login');
	var $uRegConf = $mRegist.find('.u_regist_confirm');

	var $mLogin = $(".m_login");
	var $uNowReg = $mLogin.find('.u_now_regist');
	var $uLogConf = $mLogin.find('.u_login_confirm');

	var $mLogInfo = $(".m_login_info");
	var $username = $mLogInfo.find('.user_info span');
	var $loginOut = $mLogInfo.find('.login_out');

	$mNav.find('a').on('click',function(){
		$('.nav_active').removeClass('nav_active');
		$(this).addClass('nav_active');
	});

	$uNowReg.on('click',function(){
		$mLogin.hide();
		$mRegist.show();
	});

	$uNowLogin.on('click',function(){
		$mRegist.hide();
		$mLogin.show();
	});

	// $uRegConf.on('click',function(){
	// 	var data = {};
	// 	data.username = $mRegist.find("input[name='username']").val();
	// 	data.password = $mRegist.find("input[name='password']").val();
	// 	data.repassword = $mRegist.find("input[name='repassword']").val();
	// 	$.ajax({
	// 		type: 'post',
	// 		url: '/api/user/regist',
	// 		dataType: 'json',
	// 		timeout: 4000,
	// 		data: data,
	// 		success: function(result){
	// 			$mRegist.find('.regist_info').html(result.message);
	// 			if(!result.code) {
	// 				window.location.reload();
	// 			}
	// 		},
	// 		error:function(){
	// 			console.log(arguments);
	// 		}
	// 	});
	// });

	$uLogConf.on('click',function(){
		var data = {};
		data.username = $mLogin.find("input[name='username']").val();
		data.password = $mLogin.find("input[name='password']").val();
		$.ajax({
			type: 'post',
			url: '/api/user/login',
			dataType: 'json',
			timeout: 4000,
			data: data,
			success: function(result){
				$mLogin.find('.login_info').html(result.message);
				if(!result.code) {
					window.location.reload();
				}
			},
			error: function(){
				console.log(arguments);
			}
		});
	});

	$loginOut.on('click',function(){
		$.ajax({
			type: 'get',
			url: '/api/user/loginOut',
			dataType: 'json',
			timeout: 4000,
			success: function(result){
				window.location.reload();
			}
		});
	});
});