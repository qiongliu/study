;(function(){
	var Upload = function(opts){

		if(!$.isPlainObject(opts)){
			SE.widgets.tips({
				type: 'failing',
				content: '请给Upload插件输入格式正确的参数！'
			});
			return false;
		}

		this.opts = {
			upload_url : "http://www.swfupload.org/upload.php",  //处理上传文件的服务器端页面的url地址，可以是绝对地址，也可以是相对地址，当为相对地址时相对的是当前代码所在的文档地址
			flash_url : "http://www.swfupload.org/swfupload.swf",  //swfupload.swf文件的绝对或相对地址，相对地址是指相对于当前的页面地址。实例化swfupload后，就不能再改变该属性的值了。
			file_post_name : "Filedata",  //相当于用普通的文件域上传文件时的name属性，服务器端接收页面通过该名称来获取上传的文件
			post_params : {  //一个对象字面量，里面的键/值队会随着每一个文件一起上传
				"post_param_name_1" : "post_param_value_1",  
				"post_param_name_2" : "post_param_value_2",  
				"post_param_name_n" : "post_param_value_n"  
			},  
			use_query_string : false,  	// 为false时,post_params会以post方式上传；为true时，则会以get方式上传（即参数会以查询字符串的形式附加到url后面）
			requeue_on_error : false,  
			http_success : [201, 202],  
			assume_success_timeout : 0,  
			file_types : "*.jpg;*.gif",  //指定了允许上传的文件类型,允许所有类型时使用 "*."
			file_types_description: "Web Image Files",  //指定在文件选取窗口中显示的文件类型描述
			file_size_limit : "1024",  //指定要上传的文件的最大体积，可以带单位，合法的单位有:B、KB、MB、GB，如果省略了单位，则默认为KB。该属性为0时，表示不限制文件的大小。
			file_upload_limit : 10,  //指定最多能上传多少个文件，当上传成功的文件数量达到了这个最大值后，就不能再上传文件了，也不能往上传队列里添加文件了。把该属性设为0时表示不限制文件的上传数量。
			//file_queue_limit:指定文件上传队列里最多能同时存放多少个文件。当超过了这个数目后只有当队列里有文件上传成功、上传出错或被取消上传后，
			//等同数量的其他文件才可以被添加进来。当file_upload_limit的数值或者剩余的能上传的文件数量小于file_queue_limit时，则取那个更小的值
			file_queue_limit : 2,  
			debug : false,  
			prevent_swf_caching : false,  //为true时会加一个随机数在swfupload.swf地址的后面，以阻止flash影片被缓存，这是为了防止某些版本的IE浏览器在读取缓存的falsh影片时出现的bug
			preserve_relative_urls : false,  
			button_placeholder_id : "element_id",  //指定一个dom元素的id,该dom元素在swfupload实例化后会被Flash按钮代替，这个dom元素相当于一个占位符
			//button_image_url:指定Flash按钮的背景图片，相对地址或绝对地址都可以。该地址会受到preserve_relative_urls属性的影响，遵从与upload_url一样的规则。
			//该背景图片必须是一个sprite图片,从上到下包含了Flash按钮的正常、鼠标悬停、按下、禁用这四种状态。因此该图片的高度应该是Flash按钮高度的四倍
			button_image_url : "http://www.swfupload.org/button_sprite.png",  
			button_width : 61,  //指定Flash按钮的宽度
			button_height : 22,  //指定Flash按钮的高度，应该为button_image_url所指定的按钮背景图片高度的1/4
			button_text : "<b>Click</b> <span class='redText'>here</span>",  //指定Flash按钮上的文字，也可以是html代码
			button_text_style : ".redText { color: #FF0000; }",  //Flash按钮上的文字的样式
			button_text_left_padding : 3,  //指定Flash按钮左边的内边距
			button_text_top_padding : 2,  //指定Flash按钮顶部的内边距
			button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,  
			button_disabled : false,  //为true时Flash按钮将变为禁用状态，点击也不会触发任何行为
			button_cursor : SWFUpload.CURSOR.HAND,  //指定鼠标悬停在Flash按钮上时的光标样式，可用值为SWFUpload.CURSOR里定义的常量
			button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,  //指定Flash按钮的WMODE属性，可用值为SWFUpload.WINDOW_MODE里定义的常量
			swfupload_loaded_handler : swfupload_loaded_function,  
			file_dialog_start_handler : fileDialogStart,  //fileDialogStart ( )在文件选取窗口将要弹出时触发
			file_queued_handler : fileQueued,  //fileQueued ( file object )当一个文件被添加到上传队列时会触发此事件，提供的唯一参数为包含该文件信息的file object对象
			//fileQueueError ( file object, error code, message )该事件提供了三个参数。第一个参数是当前出现问题的文件对象，第二个参数是具体的错误代码，可以参照SWFUpload.QUEUE_ERROR中定义的常量
			//当文件添加到上传队列失败时触发此事件，失败的原因可能是文件大小超过了你允许的数值、文件是空的或者文件队列已经满员了等。
			file_queue_error_handler : fileQueueError,  
			//fileDialogComplete ( number of files selected, number of files queued, total number of files in the queued )
			//当文件选取完毕且选取的文件经过处理后（指添加到上传队列），会立即触发该事件。可以在该事件中调用this.startUpload()方法来实现文件的自动上传
			//参数number of files selected指本次在文件选取框里选取的文件数量
			//参数number of files queued指本次被添加到上传队列的文件数量
			//参数total number of files in the queued指当前上传队列里共有多少个文件（包括了本次添加进去的文件）
			file_dialog_complete_handler : fileDialogComplete,  
			//uploadStart ( file object )当文件即将上传时会触发该事件,该事件给了你在文件上传前的最后一次机会来验证文件信息、增加要随之上传的附加信息或做其他工作。可以通过返回false来取消本次文件的上传
			//参数file object为当前要上传的文件的信息对象
			upload_start_handler : uploadStart,  
			//uploadProgress ( file object, bytes complete, total bytes )该事件会在文件的上传过程中反复触发，可以利用该事件来实现上传进度条
			//参数file object为文件信息对象
			//参数bytes complete为当前已上传的字节数
			//参数total bytes为文件总的字节数
			upload_progress_handler : uploadProgress,  
			//uploadError ( file object, error code, message )文件上传被中断或是文件没有成功上传时会触发该事件。停止、取消文件上传或是在uploadStart事件中返回false都会引发这个事件，但是如果某个文件被取消了但仍然还在队列中则不会触发该事件
			//参数file object为文件信息对象
			//参数error code为错误代码，具体的可参照SWFUpload.UPLOAD_ERROR中定义的常量
			upload_error_handler : uploadError,  
			//uploadSuccess ( file object, server data, received response )当一个文件上传成功后会触发该事件
			//参数file object为文件信息对象
			//参数server data为服务器端输出的数据
			upload_success_handler : uploadSuccess,  
			//当一次文件上传的流程完成时（不管是成功的还是不成功的）会触发该事件，该事件表明本次上传已经完成，上传队列里的下一个文件可以开始上传了。
			//该事件发生后队列中下一个文件的上传将会开始
			upload_complete_handler : upload_complete_function,  
			debug_handler : debug_function,    
		};

		this.preifx = SE.reserveKeyword;

		$.extend(true,this.opts,opts);

		this.render();
	};

	Upload.prototype = $.extend(true, SE, {
		initDom: function(){
			console.log(1);
		}
	});

	Upload.init = function(opts){
		return new Upload(opts);
	};

	SE.widgets.upload = Upload.init;
	
})();