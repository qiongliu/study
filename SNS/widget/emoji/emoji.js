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
		
		this.render();
	};

	Emoji.prototype = $.extend(true, {}, SE, {
		initDom: function(){
			var self = this,
			arr = [],
			data = "";
			arr.push("<div id=" + SE.reserveKeyword + "-emoji-wrap class='clearfix'>");
			for (var i in SE.config.emoji){
				arr.push('<a href="javascript:;" title="' + i + '"><img class="' + SE.reserveKeyword + '-emoji-img" src="' + SE.config.emojiRoot  + SE.config.emoji[i] + '" alt="' + i + '"></a>')
			}
			arr.push("</div>");
			data = arr.join("");
			SE.widgets.dialog({
				title: "emoji",
				content: data,
				existBtn: false,
				height: 310,
				width: 408,
				existMast: false,
				followE: self.opts.eventEl,
				titleStyle: {
					height: 30
				}
			});
			this.$wrapBox = $("." + SE.reserveKeyword + "-dialog-wrapBox");
			this.$em = this.$wrapBox.find("#" + SE.reserveKeyword + "-emoji-wrap");
			this.$emImg = this.$em.find("a");
		},
		renderDom: function(){
			this.$emImg.css({
				float: "left",
				textAlign: "center",
				border: "1px solid #F0F0F0",
				padding: 4
			});
		},
		bindEvent: function(){
			var self = this;
			this.$emImg.off().on("click",function(e){
				e.stopPropagation();
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
				self.fireEvent('insertAfter',self);

				SE.lib("insertCaret",{
					obj: self.opts.textEl,
					val: this.title
				});
				
				self.fireEvent("clickBefore",self);
			});
		}
	});

	Emoji.init = function(opts){
		return new Emoji(opts);
	};

	SE.widgets.emoji = Emoji.init;
})();