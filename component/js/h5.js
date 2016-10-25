var H5 = function(){
	this.id = ("h5_" + Math.random()).replace(".","_");
	this.el = $("<div class='h5' id='" + this.id + "'>").hide();
	this.page = [];
	$("body").append(this.el);
	/**
	 * @param {string} name 类名
	 * @param {string} 默认文本
	 * @return {h5} 支持链式调用
	 */		
	this.addPage = function(name,text){
		var page = $("<div class='h5_page section'>");
		if(name !== undefined){
			page = page.addClass('h5_page_' + name);
		}
		if(text !== undefined){
			page.text(text);
		}
		page.appendTo(this.el);
		this.page.push(page);
		return this;
	};
	this.addComponent = function(name,cfg){
		var cfg = cfg || {};
		cfg = $.extend({
			type: 'base'
		},cfg);
		var component = {};
		var page = this.page.slice(-1)[0];
		switch(cfg.type){
			case 'base':
				component = new h5ComponentBase(name,cfg);
			break;

			default:
		}
		component.appendTo(page);
		return this;
	};
	this.loader = function(){
		this.el.show();
		this.el.fullpage({
			onLeave: function(index,nextIndex,direction){
				$(this).find(".h5_component").trigger('onLeave');
			},
			afterLoad: function(anchorLink,index){
				$(this).find(".h5_component").trigger('onLoad');
			}
		});
	};
};