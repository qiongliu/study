define(function(require,exports){

	var LY = require("./LY").ui;
	var Tips = function(opts){
		if(!$.isPlainObject(opts)){
			alert("参数格式不对！");
			return false;
		}
		this.prefix = LY.reserverdKeywords;
		this.type = {
			default: "default",
			warning: "warning",
			failing: "failing",
			success: "success",
			loading: "loading"
		};

		this.opts = {
			type: "default",
			content: "hello，这是默认内容。",
			times: 3000,
			mask: {
				backgroundColor: "#000",
				opacity: 0.5
			},
			tips: {
				height: "40px",
				border: "1px solid #ddd",
				backgroundColor: "#ddd",
				borderRadius: "4px"	
			},
			fontType: {
				color: "#000",
				fontSize: "16px",
				fontWeight: 400
			}
		};

		$.extend(true,this.opts,opts);

		this.begin();


	};

	Tips.prototype = $.extend({},LY.init(),{
		initDom: function(){
			var arr = [];
			arr.push("<div id=" + this.prefix + "-wrapBox>");
			arr.push("<div class='mask'>");
			arr.push("</div>");
			arr.push("<div class=" + this.prefix + "-tips>");
			arr.push("<p>" + this.opts.content + "</p>");
			arr.push("</div>");
			arr.push("</div>");
			$("body").append(arr.join(""));

			this.$wrapBox = $("#" + this.prefix + "-wrapBox");
			this.$mask = this.$wrapBox.find(".mask");
			this.$tips = this.$wrapBox.find("." + this.prefix + "-tips");
			this.$p = this.$tips.find("p");
		},
		renderDom: function(){
			this.$mask.css({
				"backgroundColor": this.opts.mask.backgroundColor,
				"opacity": this.opts.mask.opacity,
				"filter": "Alpha(opacity = " + this.opts.mask.opacity * 100 + ")",
				"position": "fixed",
				"width": "100%",
				"height": "100%",
				"top": 0,
				"left": 0
			});
			this.$tips.css({
				"border": this.opts.tips.border,
				"borderRadius": this.opts.tips.borderRadius,
				"height": "40px",
				"lineHeight": "40px",
				"minWidth": "74px",
				"minHeight": "40px",
				"position": "fixed",
				"textAlign": "center",
				"padding": "0 20px 0 64px"
			});
			var tipsLeft = typeof this.opts.left === "undefined" ? "50%" : this.opts.left,
			tipsTop = typeof this.opts.top === "undefined" ?"50%" : this.opts.left,
			tipsMarginL = typeof this.opts.left === "undefined" ? -this.$tips.outerWidth()/2 : "",
			tipsMarginT = typeof this.opts.top === "undefined" ? -this.$tips.outerHeight()/2 : "";

			this.$tips.css({
				"left": tipsLeft,
				"top": tipsTop,
				"marginLeft": tipsMarginL,
				"marginTop": tipsMarginT
			});
			this.$p.css({
				"color": this.opts.fontType.color,
				"fontSize": this.opts.fontType.fontSize,
				"fontWeight": this.opts.fontType.fontWeight
			});

			switch(this.opts.type) {
				case this.type.default:
					this.$tips.css("background",this.opts.tips.backgroundColor + " url('images/tips/default.png') 16px 4px no-repeat");
					break;
				case this.type.warning:
					this.$tips.css("background",this.opts.tips.backgroundColor + " url('images/tips/warning.png') 16px 4px no-repeat");
					break;
				case this.type.failing:
					this.$tips.css("background",this.opts.tips.backgroundColor + " url('images/tips/failing.png') 16px 4px no-repeat");
					break;
				case this.type.success:
					this.$tips.css("background",this.opts.tips.backgroundColor + " url('images/tips/success.png') 16px 4px no-repeat");
					break;
				case this.type.loading:
				 	this.$tips.css("background",this.opts.tips.backgroundColor + " url('images/tips/loading.gif') 16px 4px no-repeat");
				 	break;
				default:
					break;
			}
		},
		bindEvent: function(){
			var self = this;
			this.$wrapBox.on('click',function(){
				self.fireEvent("open","1");
				self.destroy();
			});
			setTimeout(function(){
				self.destroy();
			},this.opts.times);
		},	
		destructor: function(){
			this.$mask && this.$mask.remove();
			this.$tips && this.$tips.remove();
		},
		destroy: function(){
			this.destructor();
			this.$wrapBox.off();
			this.$wrapBox.remove();

		},
		begin: function(){
			this.render();
			return this;
		}
	});

	Tips.init = function(opts){
		return new Tips(opts);
	};
	exports.tips = Tips.init;
});