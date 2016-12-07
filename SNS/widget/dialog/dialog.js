;(function(){
	var Dialog = function(opts){
		if(!$.isPlainObject(opts)){
			SE.widgets.tips({
				type: 'failing',
				content: '请给Dialog插件输入格式正确的参数！'
			});
			return false;
		}

		this.opts = {
			title: "dialog",
			content: "this is a default content",
			width: 400,
			height: 200,
			backgroundColor: "#ddd",
			border: "1px solid #999",
			borderRadius: 8,
			existShadow: true,
			existBtn: true,
			followE: "",
			followSpace: 20,
			existMast: true,
			maskStyle: {
				backgroundColor: "#f5f5f5",
				opacity: 0.6,
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
				padding: 0,
				color: "#333",
			},
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
			},
			completed: function(){}
		};

		$.extend(true,this.opts,opts);
		this.render();
	};

	Dialog.prototype = $.extend({},SE,{
		initDom: function(){
			var arr = [];
			var existMast = this.opts.existMast ? "block":"none";
			arr.push("<div class="+ SE.reserveKeyword + "-dialog-wrapBox>");
				arr.push("<div class="+ SE.reserveKeyword + "-dialog-mask style='background-color:" + this.opts.maskStyle.backgroundColor
					+ "; opacity:" + this.opts.maskStyle.opacity + "; filter:Alpha(opacity=" + this.opts.maskStyle.opacity * 100 + "); display:"
					+ existMast + ";'></div>");
				arr.push("<div class="+ SE.reserveKeyword + "-dialog style='width:" + this.opts.width +"; height:" + this.opts.height + "; border:"
				 	+ this.opts.border + "; left'>");
					arr.push("<div class="+ SE.reserveKeyword + "-dialog-title>");
						arr.push("<span class="+ SE.reserveKeyword + "-dialog-title-content>" + this.opts.title + "</span>");
						arr.push("<a class="+ SE.reserveKeyword + "-dialog-btn-close>" + this.opts.closeStyle.content + "</a>");
					arr.push("</div>");
					arr.push("<div class="+ SE.reserveKeyword + "-dialog-content>" + this.opts.content + "</div>");
				if(this.opts.existBtn){
					arr.push("<div class="+ SE.reserveKeyword + "-dialog-btn>");
						if(this.opts.btnStyle.type.indexOf("confirm") > -1){
							arr.push("<a class="+ SE.reserveKeyword + "-dialog-btn-confirm>" + this.opts.btnStyle.confirm.content + "</a>");
						}
						if(this.opts.btnStyle.type.indexOf("cancel") > -1){
							arr.push("<a class="+ SE.reserveKeyword + "-dialog-btn-cancel>" + this.opts.btnStyle.cancel.content + "</a>");
						}
					arr.push("</div>");
				}
			arr.push("</div></div>");
			$("body").append(arr.join(""));

			this.$wrapBox = $("." + SE.reserveKeyword + "-dialog-wrapBox");
			this.$mask = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog-mask");
			this.$dialog = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog");
			this.$dialogTitle = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog-title");
			this.$titleContent = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog-title-content");
			this.$btnClose = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog-btn-close");
			this.$dialogContent = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog-content");
			this.$btn = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog-btn");
			this.$btnConfirm = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog-btn-confirm");
			this.$btnCancel = this.$wrapBox.find("." + SE.reserveKeyword + "-dialog-btn-cancel");
		},
		renderDom: function(){

			this.opts.btnStyle.height = this.opts.existBtn ? this.opts.btnStyle.height : 0 ;
			if(this.opts.followE !== ""){
				var followLeft = this.opts.followE.clientX + this.opts.followSpace,
				followTop = this.opts.followE.clientY + this.opts.followSpace,
				win = $(window);
				if((followTop + this.opts.height) > win.height()){
					followTop = this.opts.followE.clientY - this.opts.height - this.opts.followSpace;
				}
				if((followLeft + this.opts.width) > win.width()){
					followLeft = this.opts.followE.clientX - this.opts.width - this.opts.followSpace;
				}
			}
			this.$dialog.css({
				width: this.opts.width,
				height: this.opts.height,
				border: this.opts.border,
				left: typeof followLeft !== "undefined" ? followLeft : "50%",
				top: typeof followTop !== "undefined" ? followTop : "40%",
				marginLeft: typeof followLeft !== "undefined" ? 0 : -this.opts.width / 2,
				marginTop: typeof followTop !== "undefined" ? 0 : -this.opts.height / 2,
				borderRadius: this.opts.borderRadius,
				backgroundColor: this.opts.backgroundColor,
				zIndex: 999
			});
			this.opts.existShadow && this.$dialog.css({
				boxShadow:"0 3px 9px rgba(0,0,0,.5)"
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
			this.opts.completed && this.opts.completed();
			this.$mask.on("click",function(e){
				e.stopPropagation();
				self.destroy();
			})
			this.$btnClose.on("click",function(e){
				e.stopPropagation();
				self.fireEvent("closeAfter",self);
				self.destroy();
			});
			this.$btnConfirm.on("click",function(e){
				e.stopPropagation();
				self.fireEvent("confirmAfter",self);
				// self.destroy();
			});
			this.$btnCancel.on("click",function(e){
				e.stopPropagation();
				self.fireEvent("cancelAfter",self);
				self.destroy();
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

			SE.lib("drag",{
				dragArea: this.$dialogTitle,
				wrapArea: this.$dialog
			});
			// require.async("./drag.js",function(){
			// 	new window.Drag("." + self.prefix + "-dialog-title","." + self.prefix + "-dialog");
			// });
		},
		destructor: function(){}
	});

	Dialog.init = function(opts){
		return new Dialog(opts);
	};

	SE.widgets.dialog = Dialog.init;
})();

