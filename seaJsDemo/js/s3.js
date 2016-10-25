define(function(require,exports,module){
	var s3 = function(){
		var flag = confirm("这个s3()方法。再重头来一遍吗？");
		flag && (window.location.href = window.location.href);
	};
	alert("进入了s3.js");
	$("p").append("<br />我是s3.js，在s1里我是通过seajs.aysnc（）加载的，所以在s1里，执行到我的时候，我才会执行。");
	alert("要退出s3.js了");
	exports.s3 = s3;
});