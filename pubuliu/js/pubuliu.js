;(function($){

	var Pubu = function(){
		var self = this;
		this.w = $(window);
		this.oContainer = $('.container');
		this.loader = $('.loader');
		this.iWidth = 400;
		this.iSpace = 10;
		this.iOuterWidth = this.iWidth + this.iSpace;
		this.iCells = 0;  //显示多少列；
		this.iPage = 0; //显示第几页，目前默认设置为每页显示10张图片
		this.sUrl = './user/test'; //请求路径；
		this.arrL = []; //存储每张图片的left值；
		this.arrT = []; //存储每张图片的top值；
		this.isPage = true;//控制每页加载完成后，方可继续加载；
		this.setCells(); //设置显示多少列；
		this.getArrLT(); //得到第一行的元素位置，存入数组；
		this.getData(); 
		this.w.on('scroll',function(){
			self.load();
		});
		this.w.on('resize',function(){
			self.resize();
		});
	};

	Pubu.prototype = {
		setCells:function(){
			this.iCells = Math.floor(this.w.innerWidth() / this.iOuterWidth);
			if(this.iCells < 3){
				this.iCells = 3;
			}
			if(this.iCells >6){
				this.iCells = 6;
			}
			this.oContainer.css('width', this.iOuterWidth * this.iCells - this.iSpace);			
		},
		getData:function(){
			if(this.isPage){
				this.isPage = false;
				var self = this;
				self.loader.show();
				$.get(this.sUrl, 'page=' + self.iPage, function(data) {
					if(data.status == 'over'){
						self.loader.hide();
						return;
					}
					$.each(data,function(i){
						var oImg = $('<img />');
						oImg.attr('src',this.url);
						self.oContainer.append(oImg);

						var iHeight = self.iWidth / data[i].width * data[i].height;
						oImg.css({
							width : self.iWidth,
							height : iHeight,
							border: "4px solid #ccc"
						});

						var iMinIndex = self.getMinTop();
						oImg.css({
							position : 'absolute',
							left : self.arrL[iMinIndex],
							top  : self.arrT[iMinIndex]
						});

						self.arrT[iMinIndex] += iHeight + 10;
					})
					self.loader.hide();
					self.isPage = true;
				});
			}
		},
		getArrLT:function(){
			for(var i = 0;i < this.iCells;i++){
				this.arrT.push(0);
				this.arrL.push(i * this.iOuterWidth);
			}
			
		},
		getMinTop:function(){
			var iv = this.arrT[0],
			_index = 0;

			for(var i=1;i<this.arrT.length;i++){
				if(this.arrT[i] < iv){
					iv = this.arrT[i];
					_index = i;
				}
			}

			return _index;
		},
		load:function(){
			var self = this;
			var iH = self.w.scrollTop() + self.w.innerHeight();
			var iMinIndex = self.getMinTop();
			if(self.arrT[iMinIndex] + self.oContainer.offset().top < iH){
				self.iPage++;
				self.getData();
			}
		},
		resize:function(){
			var self = this,
			oldCells = this.iCells;
			this.setCells();
			self.load();
			if(oldCells == this.iCells){
				return;
			}
			this.arrT = [];
			this.arrL = [];
			this.getArrLT();
			var imgs = this.oContainer.find('img');
			imgs.each(function(){
				var iMinIndex = self.getMinTop();
				$(this).animate({
					position : 'absolute',
					left : self.arrL[iMinIndex],
					top  : self.arrT[iMinIndex]
				});
				self.arrT[iMinIndex] += $(this).height() + 10;
			})
		}
	}

	window.Pubu = Pubu;

})(jQuery)