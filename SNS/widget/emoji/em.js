;(function(){

	var Smiley = function(opts){
		if(!$.isPlainObject(opts)){
			alert("参数格式不对！");
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

	Smiley.prototype = $.extend(true, {}, SE, {
		initDom: function(){
			var self = this,
			arr = [];
			arr.push("<div id=" + this.prefix + "-emoji-wrap>");
			for (var i in SE.config.emoji){
				arr.push('<a href="javascript:;"><img src="' + SE.config.emojiRoot  + SE.config.emoji[i] + '" alt="' + i + '"></a>')
			}
			arr.push("</div>");
			SE.widgets.dialog({
				title: "emoji",
				dataMode: "iframe",
				content: arr.join(""),
				isBtn: false,
				height: 370,
				isFollow: true,
				followE: self.opts.eventEl
			});
			this.$em = $("#" + this.prefix + "-emoji-wrap");
			this.$emImg = this.$em.find("a");
		},
		renderDom: function(){
			this.$em.css({
				padding: 12
			});
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
				var smiley = $(this).find("img").clone()[0];
				$(self.opts.textEl).append(smiley);
				self.fireEvent("clickAfter",self);
			});
		}
	});

	Smiley.init = function(opts){
		new Smiley(opts);
	};

	SE.widgets.smiley = Smiley.init;
})();