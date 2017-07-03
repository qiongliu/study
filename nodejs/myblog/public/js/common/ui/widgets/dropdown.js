;(function() {
	var Dropdown = function(opts,$obj){
		if(!$.isPlainObject(opts)) {
			Ui.wedgets.tips({
				content: '参数格式不对！'
			});
		}
		this.$obj = $obj;
		this.opts = {
			direction: 'down',
			showCount: '6',
			color: '#000',
			padding: 6, //左右
		};

		$.extend(true,this.opts,opts);

		this.render();
	};

	Dropdown.prototype = $.extend({},Ui,{
		insertDom: function() {
			var self = this,
			options = this.$obj.find('option'),
			selectVal = options.eq(0).text(),
			optionsVal = options.val(),
			height = this.$obj.height(),
			width = parseInt(this.$obj.width()) - this.opts.padding * 2,
			sclloWidth = options.length > this.opts.showCount ? width - window.outerWidth + $(window).width() - 14 : width;
			var strOptions = '';
			options.each(function(i){
				strOptions += '<li><a href="javascript:;" style="padding: 0 ' + self.opts.padding + 'px; width:' + sclloWidth + 'px ;height: ' + height + 'px; line-height: ' + height + 'px; color: ' + 
				self.opts.color +'">' + this.innerHTML + '</li>';
			});

			this.options = $('<ul class="ui-selectMenu" style="height:' + this.opts.showCount * parseInt(height) + 'px">' + strOptions + '</ul>').hide();
			this.btn = $('<button class="ui-selectBtn" style="padding: 0 ' + this.opts.padding + 'px; width:' + width + 'px ;height:' + height + 'px; line-height: ' + 
				height + 'px; color: ' + this.opts.color + '">' + selectVal + '</button>');
			this.select = $('<div class="ui-selectDrop">');
			this.select.append(this.btn);
			this.select.append(this.options);
			this.$obj.after(this.select);
			this.$obj.hide();

			if (this.opts.direction === 'up') {
				$('.ui-selectMenu').css('top', -parseInt($('.ui-selectMenu').height()) - 10);
			}
		},
		bindEvent: function(){
			var self = this;
			this.btn.on('click',function(){
				if(self.options.css('display') === 'none') {
					self.options.css('display','block');
				} else {
					self.options.css('display','none');
				}
			});
			this.options.find('a').on('click',function(){
				self.btn.text(this.innerHTML);
				self.options.css('display','none');
				$(".dropdown-active").removeClass('dropdown-active');
				$(this).addClass('dropdown-active');
			});
		}
	});

	Ui.widgets.dropdown = function(opts) {
		$('select[name="' + opts.name + '"]').each(function(){
			new Dropdown(opts,$(this));
		});
	};
})(window,document,jQuery);