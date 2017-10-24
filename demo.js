;(function () {
	var Ui = function (widget) {
		this.handlers = {};
	};

	Ui.prototype = {
		constructor: Ui,
		addEvent: function (name,fn) {
			if (typeof (this.handlers[name]) === 'undefined') {
				this.handlers[name] = [];
			}
			this.handlers[name].push(fn);
			return this;
		},
		fireEvent: function (name,data) {
			if(!(this.handlers[name] instanceof Array)) {
				return;
			}
			for (var i = 0,len = this.handlers[name].length; i < len; i++) {
				this.handlers[name][i](data);
			}
		},
		deleteEvent: function (name) {
			if (name) {
				this.handlers[name] && delete this.handlers[name]
			} else {
				for (var i in this.handlers) {
					delete this.handlers[i];
				}
			}
		}
	}	

	var Dialog = function () {
		Ui.call(this);
		this.type = "dialog";
	}
	Dialog.prototype = Object.create(Ui.prototype);

	Dialog.constructor = Dialog;
	Dialog.prototype.show = function () {
		console.log('this is dialog');
	}

	window.Widgets = function (widget) {
		switch (widget) {
			case "dialog":
				return new Dialog();
			break;
		}
	}

})();