;(function(){

	var Tips = function(opts){
		if(!$.isPlainObject(opts)){
			alert("参数格式不对！");
			return false;
		}
		// ie8 属性名使用default 报错
		this.type = {
			moren: "moren",
			warning: "warning",
			failing: "failing",
			success: "success",
			loading: "loading"
		};
		
		/**
		 * [opts description]
		 * @type {
		 * left: left位置；
		 * top: top位置；
		 * type: moren\warning\failing\success\loading；
		 * content: 内容
		 * times: 显示多少秒；
		 * mask: 遮罩 {
		 * 	backgroundColor: 背景色
		 * 	opacity: 透明度
		 * }
		 * skin: 皮肤 {
		 * 	height: 高，默认40px，不可设置
		 * 	width: 根据内容宽度，自适应
		 * 	border: 边框样式
		 * 	backgroundColor: 背景色
		 * 	borderRadiius: 边框四角弧度
		 * }
		 * font: 内容字体样式 {
		 * 	color: 字体颜色；
		 * 	fontSize : 字体大小；
		 * 	fontWeight: 字体粗细；
		 * 	}
		 * }
		 */		
		this.opts = {
			type: "moren",
			content: "hello，这是默认内容。",
			times: 2000,
			mask: {
				backgroundColor: "#000",
				opacity: 0.5
			},
			skin: {
				height: "40px",
				border: "1px solid #ddd",
				backgroundColor: "#ddd",
				borderRadius: "4px"	
			},
			font: {
				color: "#000",
				fontSize: "16px",
				fontWeight: 400
			}
		};

		$.extend(true,this.opts,opts);

		this.render();

	};

	Tips.prototype = $.extend({},SE,{
		initDom: function(){
			var arr = [];
			arr.push("<div class=" + SE.reserveKeyword + "-tips-wrapBox>");
			arr.push("<div class=" + SE.reserveKeyword + "-tips-mask>");
			arr.push("</div>");
			arr.push("<div class=" + SE.reserveKeyword + "-tips>");
			arr.push("<p>" + this.opts.content + "</p>");
			arr.push("</div>");
			arr.push("</div>");
			$("body").append(arr.join(""));

			this.$wrapBox = $("." + SE.reserveKeyword + "-tips-wrapBox");
			this.$mask = this.$wrapBox.find("." + SE.reserveKeyword + "-tips-mask");
			this.$tips = this.$wrapBox.find("." + SE.reserveKeyword + "-tips");
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
				"border": this.opts.skin.border,
				"borderRadius": this.opts.skin.borderRadius,
				"height": "40px",
				"lineHeight": "40px",
				"minWidth": "74px",
				"minHeight": "40px",
				"position": "fixed",
				"textAlign": "center",
				"padding": "0 20px 0 64px",
				"zIndex": 1000
			});
			
			this.$p.css({
				"color": this.opts.font.color,
				"fontSize": this.opts.font.fontSize,
				"fontWeight": this.opts.font.fontWeight
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

			switch(this.opts.type) {
				case this.type.moren:
					this.$tips.css("background",this.opts.skin.backgroundColor + " url('" + SE.config.tipsRoot + "default.png') 16px 4px no-repeat");
					break;
				case this.type.warning:
					this.$tips.css("background",this.opts.skin.backgroundColor + " url('" + SE.config.tipsRoot + "warning.png') 16px 4px no-repeat");
					break;
				case this.type.failing:
					this.$tips.css("background",this.opts.skin.backgroundColor + " url('" + SE.config.tipsRoot + "failing.png') 16px 4px no-repeat");
					break;
				case this.type.success:
					this.$tips.css("background",this.opts.skin.backgroundColor + " url('" + SE.config.tipsRoot + "success.png') 16px 4px no-repeat");
					break;
				case this.type.loading:
				 	this.$tips.css("background",this.opts.skin.backgroundColor + " url('" + SE.config.tipsRoot + "loading.gif') 16px 4px no-repeat");
				 	break;
				default:
					break;
			}

			this.opts.renderAfter && this.opts.renderAfter(this);
		},
		bindEvent: function(){
			var self = this;
			this.$mask.on('click',function(){
				self.destroy();
			});

			setTimeout(function(){
				self.destroy();
			},this.opts.times);
		},	
		destructor: function(){
			this.$mask && this.$mask.remove();
			this.$tips && this.$tips.remove();
		}
	});

	Tips.init = function(opts){
		return new Tips(opts);
	};
	SE.widgets.tips = Tips.init;
})();