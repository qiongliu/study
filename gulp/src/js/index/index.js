$(function () {
	//轮播
  $(".m_carousel").slide({
  	mainCell: ".bd ul",
  	effect: "leftLoop",
  	autoPlay: true,
  	interTime: 6000
  });

  $(".m_notice").slide({
  	mainCell: ".bd ul",
  	effect: "topLoop",
  	autoPlay: true,
  	interTime: 5000,
  	delayTime: 2000
  });

  $(".m_news").slide({
  	mainCell: ".bd ul",
  	effect: "fold",
  	autoPlay: true,
  	interTime: 5000
  });

  $(".m_app").slide({
  	mainCell: ".bd ul",
    autoPage: true,
    effect: "leftLoop",
    autoPlay: true,
    scroll: 6,
    vis: 6,
    interTime: 4000,
  });
  //轮播完
  
  //去掉登录label提示
  function removeLabel (ele) {
  	ele = ele || [];
  	$.each(ele,function (key,val) {
	  	var self = $(val);
	  	self.on({
	  		'blur': function () {
	  			if(self.val() == '') {
	  				self.next().show();
	  			}
	  		},
	  		'focus': function () {
	  			if(self.val() == '') {
	  				self.next().hide();
	  			}
	  		}
	  	});
  	});
  }
  removeLabel(['#username','#pwd']);
  //去掉登录label提示完
  
  //资源中心导航切换
  function changeNav (ele,contentEle) {
  	var wrap = $(ele), 
  	nav = wrap.find('ul'),
  	navs = nav.find('a'),
  	contents = wrap.find(contentEle);
  	
  	navs.on('click',function () {
  		var self = $(this),
	  	navActive = nav.find('.active'),
	  	contentsShow = wrap.find(contentEle + ':visible'),
  		index = self.parent().index();
  		if(self.hasClass('active')) return;
  		navActive.removeClass('active');
  		self.addClass('active');
  		contentsShow.removeClass('f_show');
  		contents.eq(index).addClass('f_show');
  	});
  }
  changeNav('.m_resource','.resource');
  changeNav('.m_rank','.rank');
  //资源中心导航切换完
  
  //添加动画
  var WINHEIGHT = $(window).height(),
  animateEle = {
  	m_title_data1: {
  		cls: 'animated swing',
  		addHeight: 300
  	},
  	m_title_data2: {
  		cls: 'animated swing'
  	},
  	m_title_data3: {
  		cls: 'animated swing'
  	},
  	zone: {
  		cls: 'animated fadeInUp'
  	},
  	system: {
  		cls: 'animated zoomIn',
  		addHeight: 100
  	},
  	m_group: {
  		cls: 'animated slideInLeft',
  		addHeight: 100
  	},
  	m_activity: {
  		cls: 'animated slideInRight',
  		addHeight: 100
  	},
  	m_resource: {
  		cls: 'animated slideInLeft',
  		addHeight: 100
  	},
  	m_rank: {
  		cls: 'animated slideInRight',
  		addHeight: 100
  	},
  	m_news: {
  		cls: 'animated fadeInUp'
  	},
  	m_video: {
  		cls: 'animated fadeInUp'
  	},
  	a_app: {
  		cls: 'animated fadeInUp'
  	},
    eke: {
      cls: 'animated slideInLeft'
    },
    yext: {
      cls: 'animated slideInRight'
    }
  };

  (function() {
  	$.each(animateEle,function(key,val){
  		val.el = $('.' + key);
  		val.top = val.el.offset().top;
  	});
  })();

  $(window).on('scroll',function () {
  	var self = this;
  	$.each(animateEle,function(key,val) {
  		if((val.el.hasClass('animated'))) return;
	  	var scrollTop = $(self).scrollTop();
  		var h = scrollTop + WINHEIGHT;
  		val.addHeight = val.addHeight || 0;
  		if(h >= val.top + val.addHeight) {
  			val.el.addClass(val.cls);
  			return;
  		}
  	});
  	
  });

  var isIE8 = !$.support.leadingWhitespace;

  $(".zone a, .group a, .activity a, .video a,.resource a,.m_app .slider a").on({
  	'mouseenter': function () {
      var self = $(this);
  		self.css('position','relative').addClass('animated pulse');
      if(isIE8) {
        var mask = $('<div class="mask">');
        mask.css({
          'position': 'absolute',
          'opacity': '0.3',
          'width': '100%',
          'height': '100%',
          'left': 0,
          'top': 0,
          'backgroundColor': '#000'
        });
        self.append(mask);
      }
  	},
  	'mouseleave': function () {
      var self = $(this);
  		self.removeClass('animated pulse');
      if(isIE8) self.find('.mask').remove();
  	}
  });
  //添加动画完
});