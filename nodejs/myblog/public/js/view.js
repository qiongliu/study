$(function(){
	var $commentBtn = $('.comment_btn');
	var $commentInfo = $('.m_comment_info');
	$commentBtn.on('click',function(){
		var data = {
			articleId: $("#articleId").val(),
			articleContent: $("#comment").val()
		};
		$.ajax({
			type: 'post',
			url: '/api/comment/post',
			dataType: 'json',
			data: data,
			timeout: 4000,
			success:function(result){
				var comment = '<li>' +
					'<p><span class="username">' + result.user + '</span><span class="time fr">' + result.date.toLocaleString() + '</span></p>' +
					'<p class="comment_load">' + result.content + '</p>' +
				'</li>';
				$commentInfo.prepend(comment);
			},
			error: function(){
				console.log(arguments);
			}
		})
	})
})