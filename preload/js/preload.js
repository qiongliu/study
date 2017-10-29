;(function($){

	var Preload = function (imgs,opts,order) {
		this.imgs = typeof imgs === 'string' ? [imgs] : imgs;
		this.opts = {
			each: null,
			all: null
		};
		this.opts = $.extend({},this.otps,opts);
		this.count = 0;
		this.len = imgs.length;
		order ? this._orderLoad() : this._load();
	};

	Preload.prototype._load = function () {
		var self = this;
		$.each(this.imgs,function (i,item) {
			if (typeof item.src !== 'string') return;

			var img = new Image();

			img.onload = function () {
				img.onload = null; //避免gif多次请求
				self.opts.each && self.opts.each(self.count,self.len);

				if(self.count >= self.len - 1) {
					self.opts.all && self.opts.all(self.count,self.len);
				} 

				self.count++;
			};

			// img.onerror = function () {
			// 	console.log("..");
			// };
			
			img.src = item.src;
		});
	};

	Preload.prototype._orderLoad = function () {
		var img = new Image(),
		self = this;

		img.onload = function () {
			if(self.count >= self.len - 1) {
				self.opts.all && self.opts.all(self.count);
			} else {
				self.opts.each && self.opts.each(self.count,self.len);
				self.count++;
				self._orderLoad();
			}
		};

		img.src = this.imgs[this.count];
	};

	$.extend({
		preload: function (imgs,opts,order) {
			new Preload(imgs,opts,order);
		}
	});

})(jQuery);