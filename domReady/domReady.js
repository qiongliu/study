function domReady(fn){

	//非IE，直接使用DOMContentLoaded事件
	//DOMContentLoaded 事件在许多Webkit浏览器以及IE9上都可以使用
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', fn , false);
	}else {
		IEContentLoaded(fn);
	}

	//IE下实现DOMContentLoaded:DOM树创建完成立即执行
	//IE6,7,8都不支持DOMContentLoaded事件.所以目前所有的hack方法都是为了让IE6,7,8支持DOM Ready事件
	function IEContentLoaded(fn){
		var done = false,
		d = window.document;

		//保证fn只执行一次
		var init = function(){
			if(!done){
				fn();
				done = true;
			}
		};

		 (function(){
		 	try{
		 		//DOM树未创建完之前调用doScroll会抛出异常
		 		d.documentElement.doScroll('left');
		 	}catch(e){
		 		//50ms后再执行一次
		 		setTimeout(arguments.callee, 50);
		 		return;
		 	}
		 	//没有异常，表示DOM树创建完成，立即执行init();
		 	init();
		 })();

		//doscroll失效时，通过监听document的加载状态，约等于window.onload
		d.onreadystatechange = function(){
			if(d.readyState == 'complete'){
				init();
				d.onreadystatechange = null;
			}
		};
	}
}