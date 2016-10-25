define(function(){
	
	var ScrollTo = function(obj){
		var self = this;
		this.scrollto = obj;
		this.win = $(window);
		this.scroll = $('html,body'); //chorme的scroll位于body上
		this.btn = this.scrollto.find('.scroll-btn');
		this.setting = {"dest":0,"speed":300,"display":"hide"};
		$.extend(this.setting,this.getSetting());
		this.btn.bind('click', function(event) {
			event.stopPropagation();
			self.move();
		});

		if(this.setting.display == "hide"){			
			self.checkPosition();
			this.win.bind('scroll', function(event) {
				event.stopPropagation();
				self.checkPosition();
			});
		}
	};

	ScrollTo.prototype = {
		checkPosition:function(){
			if(this.win.scrollTop() > this.setting.dest){
				this.btn.fadeIn();
			}else{
				this.btn.fadeOut();
			}
		},
		getSetting:function(){
			var setting = this.scrollto.attr('data-setting');
			if(setting&&setting != null){
				return $.parseJSON(setting);
			}else{
				return {};
			}
		},
		move:function(){
			if(this.win.scrollTop() != this.setting.dest){
				if(!this.scroll.is(':animated')){
					this.scroll.animate({scrollTop: this.setting.dest}, this.setting.speed);
				}
			}
		}
	};

	ScrollTo.init = function(obj){
		var self = this;
		obj.each(function() {
			new self($(this));
		});
	}

	return{ScrollTo:ScrollTo};
});

// define(['jquery'],function($){
// 	function ScrollTo(opts){
// 		this.opts = $.extend({},ScrollTo.DEFAULTS,opts);
// 		this.$el = $('html, body');		
// 	}

// 	ScrollTo.prototype = {
// 		move: function(){
// 			if($(window).scrollTop() != this.opts.dest){
// 				if(!this.$el.is(':animated')){
// 					this.$el.animate({scrollTop: this.opts.dest}, this.opts.speed);
// 				}
// 			}		
// 		},
// 		go:function(){
// 			this.$el.stop().animate({scrollTop: this.opts.dest});
// 		}
// 	}

// 	ScrollTo.DEFAULTS = {
// 		dest: 0,
// 		speed: 500
// 	};

// 	return{
// 		ScrollTo: ScrollTo
// 	};
// });