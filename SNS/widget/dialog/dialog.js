;(function(){
	var Dialog = function(opts){
		if(!$.isPlainObject(opts)){
			alert("参数格式不对！");
			return false;
		}
		var self = this;
		this.prefix = SE.reserveKeyword;
		this.opts = {
			title: "dialog",
			dataMode: "html",
			content: "this is a default content",
			width: 400,
			height: 200,
			backgroundColor: "#ddd",
			border: "1px solid #999",
			borderRadius: 8,
			isShadow: true,
			maskStyle: {
				backgroundColor: "#f5f5f5",
				opacity: 0.3,
			},
			titleStyle: {
				height: 40,
				backgroundColor: "#fff",
				color: "#333",
				fontSize: 18,
				fontWeight: 500,
				paddingLeft: 15,
				borderBottom: "1px solid #e5e5e5"
			},
			closeStyle: {
				content: "×",
				backgroundColor: "#fff",
				fontSize: 26,
				fontWeight: 800,
				color: "#333",
				width: 40,
				opacity: 0.3
			},
			contentStyle: {
				backgroundColor: "#fff",
				fontSize: 14,
				fontWeight: 400,
				padding: 15,
				color: "#333"
			},
			isBtn: true,
			btnStyle: {
				backgroundColor: "#fff",
				height: 50,
				type: "confirm,cancel",
				textAlign: "right",
				borderTop: "1px solid #e5e5e5",
				common: {
					backgroundColor: "#428bca",
					fontSize: 16,
					fontWeight: 800,
					height: 30,
					width: 60,
					color: "#fff",
					marginRight: 10,
					borderRadius: 4,
					opacity: 0.9
				},
				confirm: {
					content: "确认",
				},
				cancel: {
					content: "取消",
				}
			}
		};

		$.extend(true,this.opts,opts);
		this.render();
	};

	Dialog.prototype = $.extend({},SE.prototype,{
		initDom: function(){
			var arr = [];
			arr.push("<div class="+ this.prefix + "-wrapBox>");
				arr.push("<div class="+ this.prefix + "-dialog-mask></div>");
				arr.push("<div class="+ this.prefix + "-dialog>");
					arr.push("<div class="+ this.prefix + "-dialog-title>");
						arr.push("<span class="+ this.prefix + "-dialog-title-content>" + this.opts.title + "</span>");
						arr.push("<a class="+ this.prefix + "-dialog-btn-close>" + this.opts.closeStyle.content + "</a>");
					arr.push("</div>");
					arr.push("<div class="+ this.prefix + "-dialog-content>" + this.opts.content + "</div>");
				if(this.opts.isBtn){
					arr.push("<div class="+ this.prefix + "-dialog-btn>");
						if(this.opts.btnStyle.type.indexOf("confirm") > -1){
							arr.push("<a class="+ this.prefix + "-dialog-btn-confirm>" + this.opts.btnStyle.confirm.content + "</a>");
						}
						if(this.opts.btnStyle.type.indexOf("cancel") > -1){
							arr.push("<a class="+ this.prefix + "-dialog-btn-cancel>" + this.opts.btnStyle.cancel.content + "</a>");
						}
					arr.push("</div>");
				}
			arr.push("</div></div>");
			$("body").append(arr.join(""));

			this.$wrapBox = $("." + this.prefix + "-wrapBox");
			this.$mask = this.$wrapBox.find("." + this.prefix + "-dialog-mask");
			this.$dialog = this.$wrapBox.find("." + this.prefix + "-dialog");
			this.$dialogTitle = this.$wrapBox.find("." + this.prefix + "-dialog-title");
			this.$titleContent = this.$wrapBox.find("." + this.prefix + "-dialog-title-content");
			this.$btnClose = this.$wrapBox.find("." + this.prefix + "-dialog-btn-close");
			this.$dialogContent = this.$wrapBox.find("." + this.prefix + "-dialog-content");
			this.$btn = this.$wrapBox.find("." + this.prefix + "-dialog-btn");
			this.$btnConfirm = this.$wrapBox.find("." + this.prefix + "-dialog-btn-confirm");
			this.$btnCancel = this.$wrapBox.find("." + this.prefix + "-dialog-btn-cancel");
		},
		renderDom: function(){

			this.opts.contentStyle.padding = this.opts.dataMode === "html" ? this.opts.contentStyle.padding : 0;
			this.opts.btnStyle.height = this.opts.isBtn ? this.opts.btnStyle.height : 0 ;
			this.$mask.css({
				backgroundColor: this.opts.maskStyle.backgroundColor,
				opacity: this.opts.maskStyle.opacity,
				filter: "Alpha(opacity=" + this.opts.maskStyle.opacity * 100 + ")"
			});
			this.$dialog.css({
				width: this.opts.width,
				height: this.opts.height,
				border: this.opts.border,
				marginLeft: -this.opts.width / 2,
				marginTop: -this.opts.height / 2,
				borderRadius: this.opts.borderRadius,
				backgroundColor: this.opts.backgroundColor
			});
			this.opts.isShadow && this.$dialog.css({
				"boxShadow":"0 3px 9px rgba(0,0,0,.5)"
			});
			this.$dialogTitle.css({
				height: this.opts.titleStyle.height,
				backgroundColor: this.opts.titleStyle.backgroundColor,
				color: this.opts.titleStyle.color,
				fontSize: this.opts.titleStyle.fontSize,
				fontWeight: this.opts.titleStyle.fontWeight,
				paddingLeft: this.opts.titleStyle.paddingLeft,
				lineHeight: this.opts.titleStyle.height + "px",
				borderTopLeftRadius: this.opts.borderRadius,
				borderTopRightRadius: this.opts.borderRadius,
				borderBottom: this.opts.titleStyle.borderBottom
			});
			this.$titleContent.css({
				width: this.opts.width - this.opts.titleStyle.paddingLeft - this.opts.closeStyle.width,
			});
			this.$btnClose.css({
				width: this.opts.closeStyle.width,
				fontSize: this.opts.closeStyle.fontSize,
				fontWeight: this.opts.closeStyle.fontWeight,
				backgroundColor: this.opts.closeStyle.backgroundColor,
				borderRadius: this.opts.borderRadius,
				color: this.opts.closeStyle.color,
				opacity: this.opts.closeStyle.opacity,
				filter: "Alpha(opacity=" + this.opts.closeStyle.opacity * 100 + ")"
			});
			this.$dialogContent.css({
				height: this.opts.height - this.opts.titleStyle.height - this.opts.btnStyle.height - this.opts.contentStyle.padding*2,
				backgroundColor: this.opts.contentStyle.backgroundColor,
				fontSize: this.opts.contentStyle.fontSize,
				fontWeight: this.opts.contentStyle.fontWeight,
				color: this.opts.contentStyle.color,
				padding: this.opts.contentStyle.padding,
			});
			this.$btn.css({
				height: this.opts.btnStyle.height,
				lineHeight: this.opts.btnStyle.height + "px",
				backgroundColor: this.opts.btnStyle.backgroundColor,
				textAlign: this.opts.btnStyle.textAlign,
				borderTop: this.opts.btnStyle.borderTop,
				borderBottomLeftRadius: this.opts.borderRadius,
				borderBottomRightRadius: this.opts.borderRadius
			});
			if(this.opts.btnStyle.type.indexOf("confirm") > -1){
				this.$btnConfirm.css({
					color: this.opts.btnStyle.confirm.color || this.opts.btnStyle.common.color,
					backgroundColor: this.opts.btnStyle.confirm.backgroundColor || this.opts.btnStyle.common.backgroundColor,
					display: "inline-block",
					width: this.opts.btnStyle.confirm.width || this.opts.btnStyle.common.width,
					height: this.opts.btnStyle.confirm.height || this.opts.btnStyle.common.height,
					lineHeight: this.opts.btnStyle.confirm.height || this.opts.btnStyle.common.height + "px",
					marginRight: this.opts.btnStyle.confirm.marginRight || this.opts.btnStyle.common.marginRight,
					fontSize: this.opts.btnStyle.confirm.fontSize || this.opts.btnStyle.common.fontSize,
					borderRadius: this.opts.btnStyle.confirm.borderRadius || this.opts.btnStyle.common.borderRadius,
					opacity: this.opts.btnStyle.common.opacity,
					filter: "Alpha(opacity=" + this.opts.btnStyle.common.opacity * 100 + ")"
				});
			}
			if(this.opts.btnStyle.type.indexOf("cancel") > -1){
				this.$btnCancel.css({
					color: this.opts.btnStyle.cancel.color || this.opts.btnStyle.common.color,
					backgroundColor: this.opts.btnStyle.cancel.backgroundColor || this.opts.btnStyle.common.backgroundColor,
					display: "inline-block",
					width: this.opts.btnStyle.cancel.width || this.opts.btnStyle.common.width,
					height: this.opts.btnStyle.cancel.height || this.opts.btnStyle.common.height,
					lineHeight: this.opts.btnStyle.cancel.height || this.opts.btnStyle.common.height + "px",
					marginRight: this.opts.btnStyle.cancel.marginRight || this.opts.btnStyle.common.marginRight,
					fontSize: this.opts.btnStyle.cancel.fontSize || this.opts.btnStyle.common.fontSize,
					borderRadius: this.opts.btnStyle.cancel.borderRadius || this.opts.btnStyle.common.borderRadius,
					opacity: this.opts.btnStyle.common.opacity,
					filter: "Alpha(opacity=" + this.opts.btnStyle.common.opacity * 100 + ")"
				});
			}
		},
		bindEvent: function(){
			var self = this;
			this.$mask.on("click",function(e){
				e.stopPropagation();
				self.destroy();
			})
			this.$btnClose.on("click",function(e){
				e.stopPropagation();
				// self.fireEvent("closeAfter",self);
				self.destroy();
			});
			this.$btnConfirm.on("click",function(e){
				e.stopPropagation();
				// self.fireEvent("confirmAfter",self);
				// self.destroy();
			});
			this.$btnCancel.on("click",function(e){
				e.stopPropagation();
				// self.fireEvent("cancelAfter",self);
				// self.destroy();
			});
		},
		changeOpacity: function(el,opa){
			el.on({
				"mouseover": function(){
					$(this).css({
						opacity: 1,
						filter: "Alpha(opacity=100)"
					});
				},
				"mouseout": function(){
					$(this).css({
						opacity: opa,
						filter: "Alpha(opacity=" + opa * 100 + ")"
					});
				}
			});
		},
		animateDom: function(){
			var self = this;
			this.changeOpacity(this.$btnClose,this.opts.closeStyle.opacity);
			this.changeOpacity(this.$btnConfirm,this.opts.btnStyle.common.opacity);
			this.changeOpacity(this.$btnCancel,this.opts.btnStyle.common.opacity);

			// require.async("./drag.js",function(){
			// 	new window.Drag("." + self.prefix + "-dialog-title","." + self.prefix + "-dialog");
			// });
		},
		destructor: function(){}
	});

	Dialog.init = function(opts){
		new Dialog(opts);
	};

	SE.widgets.dialog = Dialog.init;
})();

