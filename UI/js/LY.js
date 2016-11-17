define(function(require,exports){

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
	UI.reserveKeyword = "linyi";

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
		deleteEvent: function(){
			for(var i in this.handlers){
				delete this.handlers[i];
			}
		},
		render: function(){
			this.initDom();
			this.renderDom();
			this.animateDom();
			this.bindEvent();
		},
		destroy: function(){
			this.deleteEvent();
			this.destructor();
			this.$wrapBox.off();
			this.$wrapBox.remove();
		},
		initDom: function(){},
		renderDom: function(){},
		animateDom: function(){},
		bindEvent: function(){},
		destructor: function(){}
	};
	exports.ui = UI;
});


