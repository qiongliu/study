var h5ComponentPoint = function(name,cfg){
	var component = new h5ComponentBase(name,cfg),
	base = cfg.data[0][1];
	for(var i = 0,j = cfg.data.length;i < j;i++){
		var point = $("<div class='point'>"),
		per = (cfg.data[i][1]/base*100) + '%',
		project = $("<div class='project'>" + cfg.data[i][0] + "</div>"),
		scale = $("<div class='scale'>" + cfg.data[i][1] + "</div>");
		scale.appendTo(project);
		project.appendTo(point);
		point.width(per).height(per);
		if(cfg.data[i][2]){
			point.css('backgroundColor',cfg.data[i][2]);
		}
		if(cfg.data[i][3] !== undefined && cfg.data[i][4] !== undefined){
			point.css({
				left: cfg.data[i][3],
				top: cfg.data[i][4]
			});
		}
		point.appendTo(component);
	}
	return component;
};