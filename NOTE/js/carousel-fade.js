
define(function(){

	var CarouselFade = function(carousel){
		var self = this;
		this.carousel = carousel;
		this.list = this.carousel.find("ul.carousel-fade-img");
		this.items = this.carousel.find("li");
		this.imgs = this.carousel.find('img');
		this.btns = this.carousel.find('span.carousel-fade-btn');
		this.prev = this.carousel.find("span.carousel-fade-prev-btn");
		this.next = this.carousel.find("span.carousel-fade-next-btn");
		this.botton = this.carousel.find("ul.carousel-fade-botton");
		this.index = 0;
		this.setting = {"width":500,"height":300,"imgWidth":500,"imgHeight":300,"autoPlay":false,"delay":300,"speed":1000};
		$.extend(this.setting,this.getSetting());
		this.setSettingValue();
		this.items.first().show();
		this.addBotton();
		this.bottons = this.botton.find('li');
		this.bottons.first().addClass('active');
		
		this.prev.bind('click', function(event) {
			event.stopPropagation();
			self.move("prev");
		});
		
		this.next.bind('click', function(event) {
			event.stopPropagation();
			self.move("next");
		});

		this.bottons.each(function() {
			$(this).click(function(event) {
				event.stopPropagation();
				self.move("botton",this);
			});
		});

		if(this.setting.autoPlay){
			this.autoPlay();
			this.carousel.hover(function() {
				clearInterval(self.timer);
			}, function() {
				self.autoPlay();
			});
		}

	};	

	CarouselFade.prototype = {
		autoPlay:function(){
			var self = this;
			this.timer = setInterval(function(){
				 self.move("next");
			}, this.setting.delay);
		},
		move:function(offset,obj){
			if(this.items.is(':animated')){
				return;
			}
			if(offset == 'prev'){
				this.index--;
			}else if(offset == 'next'){
				this.index++;
			}else if(offset == 'botton'){
				var currentIndex = $(obj).index();
				this.index = currentIndex;
			}
			if(this.index == -1){
				this.index = this.imgs.size()-1;
			}
			if(this.index == this.imgs.size()){
				this.index = 0;
			}
			this.bottons.eq(this.index).addClass('active').siblings().removeClass('active');
			this.items.eq(this.index).fadeIn(this.setting.speed).siblings().
			fadeOut(this.setting.speed);		
		},
		addBotton:function(){
			var size = this.imgs.size();
			for(var i=1;i<=size;i++){
				var li = "<li>" + i + "</li>";
				this.botton.append(li);
			}
		},
		setSettingValue:function(){
			var btnHeight = this.setting.imgHeight/5;
			this.carousel.css({"width":this.setting.width,"height":this.setting.height});
			this.items.css({"width":this.setting.imgWidth,"height":this.setting.imgHeight});
			this.imgs.css('width', '100%');
			this.btns.css({"top":"50%","marginTop":-btnHeight/2,"width":30,"height":btnHeight,
				"backgroundColor":"black","opacity":0.7,"color":"white","fontSize":34,"textAlign":"center","lineHeight":btnHeight+"px"});
		},
		getSetting:function(){
			var setting = this.carousel.attr("data-setting");
			if (setting&&setting!=""){
				return $.parseJSON(setting);
			}else{
				return{};
			}
		}
	};

	CarouselFade.init = function(carousel){
		var self = this;
		carousel.each(function(){
			new self($(this));
		});
	};
	
	return{CarouselFade:CarouselFade};

});

