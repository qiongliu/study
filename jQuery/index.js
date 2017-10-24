;(function (window, undefined) {
	var jQuery = function (selector) {
		
		// if (!(this instanceof jQuery)) {
		// 	return new jQuery(selector);
		// }
		return new jQuery.fn.init(selector);
	}

	jQuery.fn = jQuery.prototype = {
		init: function () {
			this.name = 'liuqiong';
			return this;
		},
		extend: function (obj) {
			for (var i in obj) {
				this[i] = obj[i];
			}
		}
	}

	jQuery.fn.init.prototype = jQuery.fn;

	return window.jQuery = window.$ = jQuery;
})(window)