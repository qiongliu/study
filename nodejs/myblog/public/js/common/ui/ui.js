;(function(w,d,$){
	var Ui = function(){
		this.handlers = {};
	};

	Ui.prototype = {
		widgets: {},
		addEvent: function(type,fn) {
			if(this.handlers[type] === undefined) {
				this.handlers[type] = [];
			}
			this.handlers[type].push(fn);
			return this;
		},
		fireEvent: function(type,data) {
			if(this.handlers[type] instanceof Array) {
				for(var i = 0,len = this.handlers[type].length;i < len;i++) {
					this.handlers[type][i](data);
				}
			}
		},
		deleteEvent: function() {},
		insertDom: function() {},
		bindEvent: function() {},
		render: function(){
			this.insertDom();
			this.bindEvent();
		},
		destroy: function(){
			this.mask.remove();
		}
	};

	window.Ui = new Ui();

})(window,document,jQuery);

define(function(require,exports){
	var Widget = function(widgets,fn){
		this.base = {
			"css": "./css/ui.css?ver=20170426",
			"lib": "./lib.js",
			"config": "./config.js"
		};
		this.type = {
			"tips": "./widgets/tips.js",
			"dropdown": "./widgets/dropdown.js"
			// "dialog": "./widget/dialog.js",
			// "emoji": "./widget/emoji.js",
			// "upload": "./widget/upload/upload.js"
		};

		this.loader(widgets,fn);
	};

	Widget.prototype = {
		loader: function(widgets,fn) {
			var arr = [];

			for(var i in this.base) {
				arr.push(this.base[i]);
			}

			if(widgets instanceof Array) {
				for(var i = 0,len = widgets.length; i < len; i++) {
					widgets[i] && arr.push(this.type[widgets[i]]);
				}
			} else {
				widgets && arr.push(this.type[widgets]);
			}
			
			require.async(arr,function(){
				fn();
			});
		}
	};

	exports.loader = function(widgets,fn){
		new Widget(widgets,fn);
	};
});