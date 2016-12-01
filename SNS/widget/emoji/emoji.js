;(function(){

	var Emoji = function(opts){
		if(!$.isPlainObject(opts)){
			SE.widgets.tips({
				type: 'failing',
				content: '请给Emoji插件输入格式正确的参数！'
			});
			return false;
		}
		this.opts = {
			textEl: null,
			eventEl: null
		};
		$.extend(true,this.opts,opts);
		
		this.prefix = SE.reserveKeyword;
		this.render();
	};

	Emoji.prototype = $.extend(true, {}, SE, {
		initDom: function(){
			var self = this,
			arr = [];
			arr.push("<div id=" + this.prefix + "-emoji-wrap class='clearfix'>");
			for (var i in SE.config.emoji){
				arr.push('<a href="javascript:;"><img src="' + SE.config.emojiRoot  + SE.config.emoji[i] + '" alt="' + i + '"></a>')
			}
			arr.push("</div>");
			SE.widgets.dialog({
				title: "emoji",
				content: arr.join(""),
				isBtn: false,
				height: 310,
				width: 408,
				isFollow: true,
				followE: self.opts.eventEl,
				titleStyle: {
					height: 30
				}
			});
			this.$wrapBox = $("." + this.prefix + "-dialog-wrapBox")
			this.$em = this.$wrapBox.find("#" + this.prefix + "-emoji-wrap");
			this.$emImg = this.$em.find("a");
		},
		renderDom: function(){
			this.$emImg.css({
				float: "left",
				width: 24,
				height: 24,
				lineHeight: 24 + "px",
				textAlign: "center",
				border: "1px solid #F0F0F0",
				padding: 4
			});
		},
		bindEvent: function(){
			var self = this;
			this.$emImg.on("click",function(){
				if(!self.opts.textEl){
					SE.widgets.tips({
						type: "warning",
						content: "你的emoji插件可能没有传入textEl参数！"
					});
					setTimeout(function(){
						self.destroy();
					},2000);
					return false;
				}
				var emoji = $(this).find("img").clone()[0];
				$(self.opts.textEl).append(emoji);
				self.fireEvent("clickAfter",self);
			});
		}
	});

	Emoji.init = function(opts){
		new Emoji(opts);
	};

	SE.widgets.emoji = Emoji.init;
})();