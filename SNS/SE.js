;(function(){
	var SE = function(){
		this.reserveKeyword = "linyi";
		this.handlers = {};
	};

	SE.prototype = {
		config: {},
		lib:{},
		widgets: {},
		addEvent: function(type,fn){
			if(typeof (this.handlers[type]) === "undefined"){
				this.handlers[type] = [];
			}
			this.handlers[type].push(fn);
			return this;
		},
		fireEvent: function(type,data){
			if(this.handlers[type] instanceof Array){
				for(var i = 0 ,len = this.handlers[type].length; i < len; i++){
					this.handlers[type][i](data);
				}
			}
		},
		deleteEvent: function(){
			for(var i in this.handlers){
				delete this.handlers[i];
			}
		},
		initDom: function(){},
		renderDom: function(){},
		bindEvent: function(){},
		animateDom: function(){},
		render: function(){
			this.initDom();
			this.renderDom();
			this.bindEvent();
			this.animateDom();
		},
		destructor: function(){},
		destroy: function(){
			this.deleteEvent();
			this.destructor();
			this.$wrapBox.off();
			this.$wrapBox.remove();
		}

	};

	SE.init = function(){
		return new SE();
	};

	window.SE = SE.init();
})();


define(function(require,exports){
	var Widget = function(widgets,fn){
		this.version = 1.1;
		this.setting = {
			"skin": "./css/se.css",
			"lib": "./lib.js",
			"config": "./config.js"
		};
		this.widgetType = {
			"parse": "./parse.js",
			"dialog": "./widget/dialog/dialog.js",
			"emoji": "./widget/emoji/emoji.js",
			"tips": "./widget/tips/tips.js"
		};

		this.loader(widgets,fn);
	};

	Widget.prototype = {
		addVersion: function(path){
			return path + "?ver=" + this.version;
		},
		loader: function(widgets,fn){
			
			var widgetArr = [];
			
			for (var i in this.setting){
				var path = this.addVersion(this.setting[i]);
				widgetArr.push(path);
			}
			
			if (Object.prototype.toString.call(widgets) === "[object Array]"){
				for (var j = 0,len = widgets.length;j < len;j++){
					if (this.widgetType[widgets[j]] !== undefined){
						widgetArr.push(this.addVersion(this.widgetType[widgets[j]]));
					}
				}
			} else {
				if (this.widgetType[widgets] !== undefined){
					widgetArr.push(this.addVersion(this.widgetType[widgets]));
				}
			}
			// seajs按需加载插件
			require.async(widgetArr,function(){
				fn();
			});
		}

	};

	Widget.init = function(widgets,fn){
		new Widget(widgets,fn);
	};

	exports.init = Widget.init;
});
