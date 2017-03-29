$(function(){
	$('.u_now_regist').on('click',function(){
		$(this).parents('.m_login').hide();
		$('.m_regist').show();
	});

	$('.u_now_login').on('click',function(){
		$(this).parents('.m_regist').hide();
		$('.m_login').show();
	});

	$(".u_regist_confirm").on('click',function(){
		var data = {};
		data.username = $("input[name='username']").val();
		data.password = $("input[name='password']").val();
		data.repassword = $("input[name='repassword']").val();
		$.ajax({
			type: 'post',
			url: '/api/user/regist',
			dataType: 'json',
			// timeout: 4000,
			data: data,
			success: function(result){
				console.log(result);
			},
			error:function(){
				console.log(arguments);
			}
		});
	});
});