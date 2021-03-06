var h5ComponentBase = function(name,cfg){
	var cfg       = cfg || {};
	var id        = ('h5_c_' + Math.random()).replace(".","_");
	var cls       = 'h5_component_name_' + name + ' h5_component_' + cfg.type;
	var component = $('<div class="h5_component ' + cls + '" id="' + id + '">');

	cfg.text   && component.text(cfg.text);
	cfg.width  && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);

	cfg.css && component.css(cfg.css);
	cfg.bg && component.css('backgroundImage','url("'+ cfg.bg +'")');
	if(cfg.center === true){
		component.css({
			left: "50%",
			marginLeft: (-cfg.width/4) + 'px'
		});
	}

	component.on("onLoad",function(){
		component.addClass('h5_component_' + cfg.type + '_load').removeClass('h5_component_' + cfg.type + '_leave');
		cfg.animateIn && component.animate(cfg.animateIn);
		return false;
	});
	component.on("onLeave",function(){
		component.addClass('h5_component_' + cfg.type + '_leave').removeClass('h5_component_' + cfg.type + '_load');
		cfg.animateOut && component.animate(cfg.animateOut);
		return false;
	});

	return component;
};