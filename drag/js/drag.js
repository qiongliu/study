;(function(w,d,$){
	var Drag = function(header,container){
		this.h = $(header);
		this.c = $(container);
		this.d = $(d);
		console.log(header,container);
		this.move();
	};

	Drag.prototype = {
		move: function(){
			var self = this;
			this.h.on('mousedown',function(e){
				e.stopPropagation();
				var x = e.clientX,
				y = e.clientY,
				left = self.c.offset().left,
				top = self.c.offset().top;
				self.d.on('mousemove.drag',function(e){
					e.stopPropagation();
					var offsetX = e.clientX - x,
					offsetY = e.clientY - y,
					l = left + offsetX,
					t = top + offsetY;
					self.c.css({
						left: l,
						top: t,
						position: "absolute"
					});
					self.d.on('mouseup.drag',function(){
						$(this).off(".drag");
					});
				});
			});
		}
	};

	w.Drag = Drag;

})(window,document,jQuery);