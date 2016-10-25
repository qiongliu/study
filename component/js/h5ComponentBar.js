var h5ComponentBar = function(name,cfg){
	var component = new h5ComponentBase(name,cfg),
	str = "",
	arr = [];
	for(var i = 0,j = cfg.data.length;i < j;i++){
		var per = (cfg.data[i][1] * 100) + '%';
		arr.push("<div class='line'>");
		arr.push("<div class='name'>" + cfg.data[i][0] + "</div>");
		arr.push("<div class='rate' style='width:" + per +"'><div class='bg' style='background-color:" + cfg.data[i][2] +"'></div></div>");
		arr.push("<div class='per'>"  + per + "</div>");
		arr.push("</div>");
	}
	str = arr.join("");
	component.html(str);
	return component;
};