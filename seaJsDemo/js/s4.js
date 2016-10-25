define(function(require,exports,module){
	var s4 = function(){
	};
	alert("进入了s4.js");
	$("p").append("<br />我是s4.js，虽然在s1.js里，我的代码写在加载s3.js的后面，可是我会在加载的时候就执行。")
	alert("要退出s4.js了");
	exports.s4 = s4;
});