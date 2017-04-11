$(function(){
	var $commentBtn = $('.comment_btn');
	var $commentInfo = $('.m_comment_info');
	var $commentDel = $(".delete");
	$commentBtn.on('click',function(){
		var data = {
			articleId: $("#articleId").val(),
			articleComment: $("#comment").val()
		};
		$.ajax({
			type: 'post',
			url: '/api/comment/post',
			dataType: 'json',
			data: data,
			timeout: 4000,
			success:function(result){
				var comment = '<li>' +
					'<p><span class="username">' + result.user + '</span><span class="time fr">' + new Date(result.date).toLocaleString() + '</span>' + 
					'<a href="javascript:;"  class="delete fr" commentId="' + result.commentId + '">删除</a></p>' +
					'<p class="comment_load">' + result.content + '</p>' +
				'</li>';
				$commentInfo.prepend(comment);
			},
			error: function(){
				console.log(arguments);
			}
		});
	});

	$commentDel.on('click',function(){
		$.ajax({
			type: 'get',
			url: 'api/comment/delete',
			dataType: 'json',
			data: {
				articleId: $(".delete").attr('commentId')
			},
			timeout: 4000,
			success:function(result){
				console.log(result)
			},
			error: function(){
				console.log(arguments);
			}
		})
	})
});