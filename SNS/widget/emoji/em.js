;(function(){

	var Smiley = function(){
		
	};

	Smiley.prototype = $.extend(true, {}, SE.prototype, {

	});

	SE.widgets.smiley = $.extend(true, {}, SE.widgets.smiley, new Smiley());
})();