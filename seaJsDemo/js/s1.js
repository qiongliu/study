define(function(require,exports,module){
	alert("s1-1,进入了s1.js");
	$("p").append("<br />s1执行");
	alert("s1-2,下一步将加载s2.js,s3.js,s4.js");
	var s2 = require("JS/s2.js");
	require.async("JS/s3.js",function(s3){
		s3.s3();
	});
	s2.s2();
	require("JS/s4.js");
});