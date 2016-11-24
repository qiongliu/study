;(function(w,d,$){

	var Drag = function(header,container){
		this.h = $(header);
		this.c = $(container);
		this.d = $(d);
		this.h.css("cursor","move");
		this.move();
	};

	Drag.prototype = {
		move: function(){
			document.onselectstart=new Function('event.returnValue=false;');
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
					maxLeft = $(w).width() - self.c.width();
					maxTop = $(w).height() - self.c.height();
					if(l <= 0){
						l = 0;
					}else if(l >= maxLeft){
						 l = maxLeft;
					}
					if(t <= 0){
						t = 0;
					}else if(t >= maxTop){
						t = maxTop;
					}
					self.c.css({
						left: l,
						top: t,
						position: "absolute",
						marginLeft: 0,
						marginTop: 0
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