
define(function(){
	var Note = function(){
		var self= this;
		this.win = $(window),
		this.body = $('html,body'),//chorme的scroll位于body上;
		//焦点图
		this.carousel = $('.carousel');
		this.list = this.carousel.find('.carousel-list');
		this.items = this.carousel.find('.carousel-list li');
		this.prev = this.carousel.find('.carousel-prev-btn');
		this.next = this.carousel.find('.carousel-next-btn');
		this.bottons = this.carousel.find('.carousel-botton a');
		this.width = this.items.eq(0).width(),
		this.index = 1,
		//内容
		this.content = this.body.find('.content').offset().top,
		this.sidebar = this.body.find('.bar'),
		this.sidebarHeight = this.sidebar.height(),
		this.footerHeight = this.body.find('.footer').height();
		this.sidebarExample =this.body.find('.example-bar'),
		this.section = this.body.find('.section'),
		this.subsection = this.body.find('.subsection'),
		this.unfold = this.body.find('.unfold');
		this.unfoldBtn = $('<button class="unfold-btn fold-btn">展开</button>'),
		this.drapArea = this.body.find('.drap-area'),
		this.clickArea = this.body.find('.drap-clickarea'),
		this.header = this.body.find('.header'),
		this.main = this.body.find('.main');

		//drap
		this.clickArea.mousedown(function(event) {
			event.stopPropagation;
			self.drap(event);
		});
		this.clickArea.mouseup(function(event) {
			event.stopPropagation();
			self.drapArea.parent().unbind('mousemove');
		});

		//给close添加展开、关闭按钮
		self.unFold();

		this.win.on('load', function(event) {
			event.stopPropagation();
			$(this).trigger('scroll');
			// alert(1);
		});
		// trigger() 方法触发被选元素的指定事件类型。
		this.win.on('resize', function(event) {
			event.stopPropagation();
			$(this).trigger('scroll');
			// alert(1);
		});

		this.prev.click(function(event) {
			event.stopPropagation();

			if(self.list.is(':animated')){
				return;
			}

			self.move(self.width);

			if(self.index == 1){
				self.index = self.bottons.length;
			}else{
				self.index--;
			}
			self.showBotton();
		});

		this.next.click(function(event) {
			event.stopPropagation()

			if(self.list.is(':animated')){
				return;
			}

			self.move(-self.width);

			if(self.index == self.bottons.length){
				self.index = 1;
			}else{
				self.index++;
			}
			self.showBotton();
		});

		this.bottons.each(function() {
			$(this).bind('click', function(event) {
				event.stopPropagation();
				//如果点击当前botton，将不再继续执行
				if($(this).attr('class') == 'active'){
					return;
				}
				self.clcikBotton($(this));
				self.showBotton();
			});
		});

		this.bottons.each(function(){
			$(this).bind('click', function(event) {
				event.stopPropagation();
				if($(this).attr('class') == 'active'){
					return;
				}
			});
		});

		this.floor();
		this.css3Select();
		self.sideBar();
		//控制sidebar的位置		
		this.win.on('scroll',function(event){
			event.stopPropagation();
			self.sideBar();
			self.showHeading(self.section,"heading-active");
			self.showHeading(self.subsection,"subheading-active");
		});
	};

	Note.prototype = {
		css3Select:function(){
			$('.select > p').on('click',function(e){
				$('.select').toggleClass('selectopen');
				e.stopPropagation();
			});
			$('.select li').on('click',function(e){
				var self = $(this);
				$('.select > p').html(self.html());
				self.addClass('selected').siblings().removeClass('selected');
				$('.select').removeClass('selectopen');
			})
		},
		drap:function(event){
			var self = this,
			left = event.pageX - this.drapArea.offset().left,
			top = event.pageY - this.drapArea.offset().top;
			self.drapArea.parent().mousemove(function(event) {
				event.stopPropagation();
				var X = event.pageX - self.drapArea.parent().offset().left -left,
				Y = event.pageY - self.drapArea.parent().offset().top - top,
				maxX = self.drapArea.parent().outerWidth() - self.drapArea.width(),
				maxY = self.drapArea.parent().outerHeight() - self.drapArea.height();
				if(X < 0){
					X = 0;
				}else if(X > maxX){
					X = maxX;
				}
				if(Y < 0){
					Y = 0;
				}else if(Y > maxY){
					Y = maxY;
				}
				self.drapArea.css({
					left: X,
					top: Y
				});
			});
		},
		unFold:function(){
			this.unfold.after(this.unfoldBtn);
			$('.unfold-btn').each(function() {
				var self = $(this);
				self.click(function() {
					var height = self.prev().children().height();				
					event.stopPropagation();
					self.html('折叠')
					self.prev().animate({height: height}, 300)
					self.toggleClass('fold-btn');
					var fold = $('.fold-btn');
					fold.html('展开');
					fold.prev().animate({height: '100px'}, 300)
				});
			});
		},
		showHeading:function(section,active){
			var self = this,
			currentId = '',
			currentLink = '';
			section.each(function() {
				if(self.win.scrollTop() > $(this).offset().top - 100){
					currentId = "#" + $(this).attr('id');
				}
			});			
			currentLink = self.sidebar.find('.' + active);
			if(currentId && currentLink.attr('href') != currentId){
				self.sidebar.find("." + active).removeClass(active);
				self.sidebar.find("[href='" + currentId + "']").addClass(active);						
			}
		},
		floor:function(){
			$('.floor1').attr('data-setting',function(){
				var a = JSON.parse($(this).attr('data-setting'));
				var b = $('#html').offset().top;
				a.dest = b;
				return JSON.stringify(a);
			});
			$('.floor2').attr('data-setting',function(){
					var a = JSON.parse($(this).attr('data-setting'));
					var b = $('#css').offset().top;
					a.dest = b;
					return JSON.stringify(a);
				});
			$('.floor3').attr('data-setting',function(){
					var a = JSON.parse($(this).attr('data-setting'));
					var b = $('#js').offset().top;
					a.dest = b;
					return JSON.stringify(a);
				});
			$('.floor4').attr('data-setting',function(){
					var a = JSON.parse($(this).attr('data-setting'));
					var b = $('#jquery').offset().top;
					a.dest = b;
					return JSON.stringify(a);
				});
			$('.floor5').attr('data-setting',function(){
					var a = JSON.parse($(this).attr('data-setting'));
					var b = $('#nodejs').offset().top;
					a.dest = b;
					return JSON.stringify(a);
				});
			$('.floor6').attr('data-setting',function(){
					var a = JSON.parse($(this).attr('data-setting'));
					var b = $('#plugins').offset().top;
					a.dest = b;
					return JSON.stringify(a);
				});
			$('.go-where .btn1').click(function(event){
				var self = $(this);
				event.stopPropagation();
				$('.example-bar').toggleClass('show');
				$(this).toggleClass('open');
				$(this).html('点我一下，然后看右边');
				$('.open').html('再点一次，就看不到了！');
			})
		},
		clcikBotton:function(obj){
			var currentIndex = obj.attr('index'),
			offset = (currentIndex - this.index)* -this.width;
			this.move(offset);
			this.index = currentIndex;
		},
		showBotton:function(){
			this.bottons.eq(this.index-1).addClass('active').parent().siblings().children('a').removeClass('active');
		},
		move:function(offset){
			var currentOffset = parseInt(this.list.css('left')) + offset,
			count = this.items.length,
			maxWidth = (count-2) * this.width,
			self = this;
			this.list.animate({left:currentOffset}, 1000,function(){			
				if(currentOffset > -self.width){ 
					self.list.css('left', -maxWidth);
				}
				if(currentOffset < -maxWidth){ 
					self.list.css('left', -self.width);
				}	
			});
			debugger; //设置断点
		},
		sideBar:function(){
			var top = this.header.height() + this.main.height() -this.sidebarHeight;
			if(this.win.scrollTop() > this.content -100 && this.win.scrollTop() < top){
				this.sidebar.css({
					position: 'fixed',
					top: '30px'
			});
				this.sidebarExample.css({
					position: 'fixed',
					bottom: 20
				})
			}else if(this.win.scrollTop() > top){
				this.sidebar.css({
					position: 'absolute',
					top: top - 400
				})
				this.sidebarExample.css({
					position: 'absolute',
					bottom: 20
				})
			}else{
				this.sidebar.css({
					position: 'static'
				});
				this.sidebarExample.css({
					position: 'static'
				})
			}
		}
	};

	return{Note:Note};

});
