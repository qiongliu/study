$(function(){
	var $comment = $('.m_comment');
	var $commentBtn = $comment.find('.comment_btn');
	var $commentInfo =  $comment.find('.m_comment_info');
	var $commentDel = $commentInfo.find(".delete");
	var $more = $comment.find(".more_comment a");
	var commentMore = 0;
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
				$comment.find('.count span').text(result.count);
			},
			error: function(){
				console.log(arguments);
			}
		});
	});

	$commentInfo.on('click','.delete',function(){
		var $this = $(this);
		$.ajax({
			type: 'post',
			url: '/api/comment/delete',
			dataType: 'json',
			data: {
				commentId: $this.attr('commentId')
			},
			timeout: 4000,
			success:function(result){
				if(!result.code) {
					$this.parents('li').remove();
					$comment.find('.count span').text(result.count);
				}
			},
			error: function(){
				console.log(arguments);
			}
		});
	});

	$more.on('click',function(){
		commentMore++;
		$.ajax({
			type: 'get',
			url:'/api/comment/more',
			dataType: 'json',
			data: {
				more: commentMore,
				articleId: $("#articleId").val()
			},
			success: function(result){
				if(!result.code && result.moreInfo.more ) {
					var comment = '';
					for(var i = 0;i < result.comments.length;i++) {
						comment += '<li>' +
							'<p><span class="username">' + result.comments[i].user + '</span><span class="time fr">' + new Date(result.comments[i].date).toLocaleString() + '</span>' + 
							'<a href="javascript:;"  class="delete fr" commentId="' + result.comments[i].commentId + '">删除</a></p>' +
							'<p class="comment_load">' + result.comments[i].content + '</p>' +
						'</li>';
					}
					$commentInfo.append(comment);
					$comment.find('.count span').text(result.count);
					if(result.moreInfo.more === result.moreInfo.mores) {
						$more.text("没有更多了！").off('click');
					}
				}
			},
			error: function(){
				console.log(arguments);
			}
		});
	});

});