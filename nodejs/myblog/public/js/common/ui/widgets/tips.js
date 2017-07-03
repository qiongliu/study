// 依赖ui.js
;(function(w,d,$){
	var Tips = function(opts){
		if(!$.isPlainObject(opts)){
			alert("参数格式不对！");
			return false;
		}
		this.opts = {
			type: 'warning',
			content: '参数有误！',
			time: '3000'
		};

		$.extend(true,this.opts,opts);

		this.type = {
			success: ['#dff0d8','#3c763d','#d6e9c6','成功!'],
			info: ['#d9edf7','#31708f','#bce8f1',''],
			warning: ['#fcf8e3','#8a6d3b','#faebcc','警告!'],
			danger: ['#f2dede','#a94442','#ebccd1','错误!']
		};
		this.render();
	};

	Tips.prototype = $.extend({},Ui,{
		insertDom: function(){
			this.mask = $("<div class='mask' style='height:100%;background-color:#ccc'>");
			for(var i in this.type) {
				if(this.opts.type === i) {
					var bgColor = this.type[i][0];
					var color = this.type[i][1];
					var bdColor = this.type[i][2];
					var title = this.type[i][3];
				}
			}

			this.tipsWrap = $("<div class='tips' style='position: fixed; padding: 10px 10px 10px 20px; color: " + color + "; background-color: " 
				+ bgColor + "; top: 50%; left: 50%; font-size: 16px; border-radius: 4px; border: 1px solid " 
				+ bdColor +"'><strong style='margin-right: 20px;'>" 
				+ title + "</strong>"
				+ this.opts.content + "<span class='close-btn' style='margin-left: 20px;cursor: pointer;'>×</span></div>");

			$("body").append(this.mask);
			$("body").append(this.tipsWrap);

			this.tipsWrap.css({
				marginTop: -this.tipsWrap.outerHeight()/2,
				marginLeft: -this.tipsWrap.outerWidth()/2,
			});
		},
		bindEvent: function(){
			var self = this;
			this.opts.time && setTimeout(function(){self.tipsWrap.remove();},this.opts.time);
			this.tipsWrap.find('.close-btn').on('click',function(){
				self.tipsWrap.remove();
				self.fireEvent('closeClick','hehe');
				self.destroy();
			});
		}
	});

	Ui.widgets.tips = function(opts) {
		return new Tips(opts);
	};

})(window,document,jQuery);