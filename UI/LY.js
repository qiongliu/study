define(function(require,exports){

	require("jquery-1.11.3.min.js");

	var UI = function(){
		this.type = {
			dialog: "dialog",
			tips: "tips",
			ddl: "dropDownList",
			verify: "verify"
		};
		this.$wrapBox = null;
		this.handlers = {};
	};

	UI.version = "1.0";
	UI.reserverdKeywords = "linyi";

	UI.init = function(){
		return new UI();
	};

	UI.prototype = {
		addEvent: function(type,handler){
			if(typeof this.handlers[type] === 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fireEvent: function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0,len = handlers.length;i < len;i++){
					handlers[i](data);
				}
			}
		},
		initDom: function(){},
		renderDom: function(){},
		bindEvent: function(){},
		sync: function(){},
		render: function(container){
			this.initDom();
			this.renderDom();
			this.bindEvent();
		},
		destructor: function(){},
		destroy: function(){
			this.destructor();
			this.wrapBox.off();
			this.wrapBox.remove();
		}
	};
	exports.ui = UI;
});


