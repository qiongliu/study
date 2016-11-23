//a域下的main.html页面iframe了b域下的other.html，可以在other.html页面中引入该js文件，调用init方法。
//a域下要存在autoHeight.html文件。

;(function(){
	var AutoHeight = {
		_domain: "", //必须，eg:www.baidu.com
		createIframe: function(params){
			if(param !== null){
				params += "&t=" + Math.random();
			}
			var url = "http://" + this._domain + "/js/autoHeight.html?" + params,
			isExit = document.getElementById("autoHeight");
			if(isExit === null){
				var _iframe = document.createElement('iframe');
				_iframe.id = "autoHeight";
				_iframe.width = "100%";
				_iframe.height = "0";
				_iframe.scrolling = "no";
				_iframe.frameborder = "0";
				_iframe.setAttribute("style","display:none");
				_iframe.src = url;
				document.body.appendChild(_iframe);
			} else {
				document.getElementById("autoHeight").src = url;
			}
		},
		init: function(){
			var pageHeight = document.body.scrollHeight;
			this.createIframe("action=auto&height=" + pageHeight);
		}
	};	
	window.AutoHeight = AutoHeight;	
})();	