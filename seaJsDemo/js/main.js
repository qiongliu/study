define(function(require,exports,module){
	require("jquery");
	var init = function(){
		alert("进入了main.js");
		$("p").append("<br />main.js 已执行，下一步将加载s1.js文件；");
		alert("要退出main.js了");
		var s1 = require("JS/s1.js");
	};
	exports.init = init;
});