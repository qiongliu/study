define(function(require,exports,module){
	var s2 = function(){
		$("p").append("<br />执行了s2()方法");
		alert("执行了s2()方法");
	};
	alert("s2-1，进入了s2.js");
	$("p").append("<br />我是s2.js，我会在加载的时候就执行。");
	alert("s2-2,要退出s2.js了");
	exports.s2 = s2;
});