if(typeof window.LinYi == "undefined"){
	var LinYi = {};
}

;(function(w,d,$){

	var Magnifire = function(opts){
		this.init(opts);
	};

	$.extend(true, Magnifire.prototype, {
		init: function(opts){
			this.$magnifire = $("#magnifire");
			this.opts = {
				"width": 400,
				"height": 255,
				"borderColor": "1px solid #ccc",
				"dragWidth": 100,
				"dragHeight": 100,
				"backgroundColor": "#000",
				"spacing": 100,
				"dragOpacity": 0.5,
				"bigWidth": 400,
				"bigHeight": 255,
				"bigBorder": "1px solid #ccc"
			}; 
			
			$.extend(true, this.opts, opts || {});

			this.initHtml();
		},
		initHtml: function(){
			var arrHtml = [],
			img = this.$magnifire.find("img")[0],
			imgUrl = img.src.replace("small","big"),
			imgAlt = img.alt;
			this.$magnifire.css({
				"width": this.opts.width,
				"height": this.opts.height,
				"border": this.opts.border
			});
			arrHtml.push('<div class="samll-area" style="position:relative;">');
			arrHtml.push('<div class="drag-area" style="width:'+ this.opts.dragWidth +'px;height:' + this.opts.dragHeight 
				+ 'px;background-color:' + this.opts.dragBgColor + ';opacity:' + this.opts.dragOpacity 
				+ ';filter:alpha(opacity=' + this.opts.dragOpacity * 100 + ');position:absolute;display:none;"></div>');
			arrHtml.push(this.$magnifire.html());
			arrHtml.push('</div>');
			arrHtml.push('<div class="big-area" style="width:' + this.opts.bigWidth + 'px;height:' + this.opts.bigHeight
				+ 'px;border:' + this.opts.bigBorder + ';overflow:hidden;display:none;position:absolute;top:' + 0
				+ ';left:' + (this.opts.width + this.opts.spacing) +'px">');
			arrHtml.push('<img src="' + imgUrl + '" alt="' + img.alt + '" style="position:absolute;">');
			arrHtml.push('</div>');
			this.$magnifire.html(arrHtml.join(""));

			this.$samllArea = this.$magnifire.find(".samll-area");
			this.$dragArea = this.$magnifire.find(".drag-area");
			this.$bigArea = this.$magnifire.find(".big-area");
			this.$bigImg = this.$bigArea.find("img");

			// this.$magnifire.css({
			// 	"width": this.opts.width,
			// 	"height": this.opts.height,
			// 	"border": this.opts.border
			// });
			// this.$samllArea.css("position","relative");
			// this.$dragArea.css({
			// 	"width": this.opts.dragWidth,
			// 	"height": this.opts.dragHeight,
			// 	"backgroundColor": this.opts.dragBgColor,
			// 	"opacity": this.opts.dragOpacity,
			// 	"filter": "alpha(opacity=" + this.opts.dragOpacity * 100 + ")",
			// 	"position": "absolute",
			// 	"display": "none"
			// });
			// this.$bigArea.css({
			// 	"width": this.opts.bigWidth,
			// 	"height": this.opts.bigHeight,
			// 	"border": this.opts.bigBorder,
			// 	"position": "absolute",
			// 	"top": 0,
			// 	"left": this.opts.width + this.opts.spacing,
			// 	"overflow": "hidden",
			// 	"display": "none"
			// });
			this.showBigImg();
			this.hideBigImg();
			this.move();
		},
		showBigImg: function(){
			var self = this;
			this.$magnifire.on("mouseover.drag",function(){
				self.$dragArea.show();
				self.$bigArea.show();
			});
		},
		hideBigImg: function(){
			var self = this;
			this.$magnifire.on("mouseout.drag",function(){
				self.$dragArea.hide();
				self.$bigArea.hide();
			});
		},
		move: function(){
			var self = this;
			this.$magnifire.on("mousemove",function(e){
				e.stopPropagation();
				self.dragMove(e);
			});
		},
		dragMove: function(e){
			var left = e.pageX - this.$magnifire.offset().left - this.$dragArea.width()/2,
			top = e.pageY - this.$magnifire.offset().top - this.$dragArea.height()/2,
			maxLeft = this.$magnifire.width() - this.$dragArea.width(),
			maxTop = this.$magnifire.height() - this.$dragArea.height(); 
			if(left < 0){
				left = 0;
			}else if(left > maxLeft){
				left = maxLeft;
			}

			if(top < 0){
				top = 0;
			}else if(top > maxTop){
				top = maxTop;
			}

			this.$dragArea.css({
				"left": left,
				"top": top
			});

			this.bigImgMove(left,top);
		},
		bigImgMove: function(l,t){
			var left = -(this.$bigImg.width() - this.$bigArea.width()) * l/(this.$magnifire.width() - this.$dragArea.width()),
			top =  -(this.$bigImg.height() - this.$bigArea.height()) * t/(this.$magnifire.height() - this.$dragArea.height());

			this.$bigImg.css({
				"left": left,
				"top": top
			});
		}
	});
	
	LinYi.magnifire = Magnifire;

})(window,document,jQuery);