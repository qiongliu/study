window.onload = function(){
	var oBtn = document.getElementById('gameBtn');
	oBtn.onclick = function(){
		this.style.display = 'none';
		Game.init('div1');
	};
};

var Game = {
	oneMove:function(){
		var nowLi = this.aLi[Math.floor(Math.random()*this.aLi.length)],
		self = this;
		nowLi.timer = setInterval(function(){
			var a = (self.oA.offsetLeft + self.oA.offsetWidth/2) - (nowLi.parentNode.offsetLeft + nowLi.offsetLeft + nowLi.offsetWidth/2),
			b = (self.oA.offsetTop + self.oA.offsetHeight/2) - (nowLi.parentNode.offsetTop + nowLi.offsetTop + nowLi.offsetHeight/2),
			c = Math.sqrt(a*a + b*b);
			var iSX = nowLi.speed * a/c;
			var iSY = nowLi.speed * b/c;

			nowLi.style.left = nowLi.offsetLeft + iSX + "px";
			nowLi.style.top = nowLi.offsetTop + iSY + "px";

			if(self.pz(self.oA,nowLi)){
				alert('game over');
				window.location.reload();
			}

		},70)

	},
	pz:function(obj1,obj2){
		var L1 = obj1.offsetLeft,
		R1 = obj1.offsetLeft + obj1.offsetWidth,
		T1 = obj1.offsetTop,
		B1 = obj1.offsetTop + obj1.offsetHeight,

		L2 = obj2.offsetLeft + obj2.parentNode.offsetLeft,
		R2 = obj2.offsetLeft + obj2.offsetWidth + obj2.parentNode.offsetLeft,
		T2 = obj2.offsetTop + obj2.parentNode.offsetTop,
		B2 = obj2.offsetTop + obj2.offsetHeight + obj2.parentNode.offsetTop;

		if(R1<L2 || L1>R2 || B1<T2 || T1> B2){
			return false;
		}else{
			return true;
		}
	},
	runBullet:function(oB){
		var self = this;
		oB.timer = setInterval(function(){
			if(oB.offsetTop < 0){
				clearInterval(oB.timer);
				self.oParent.removeChild(oB);
			}else{
				oB.style.top = oB.offsetTop - 10 + 'px';

				for(var i = 0;i<self.aLi.length;i++){
					if(self.pz(oB,self.aLi[i])){
						if(self.aLi[i].blood == 1){
							clearInterval(self.aLi[i].timer);
							self.oSNum.innerHTML = parseInt(self.oSNum.innerHTML) + self.aLi[i].score;
							self.oUl.removeChild(self.aLi[i]);
						}else{
							self.aLi[i].blood--;
						}
						clearInterval(oB.timer);
						self.oParent.removeChild(oB);
					}
				}
			}
			if(!self.aLi.length){
				self.createEnemy(1);
				}
		}, 30)
	},
	createBullet:function(){
		var oB = document.createElement('div');
		oB.className = this.air.bulletStyle;
		this.oParent.appendChild(oB);
		oB.style.left = this.oA.offsetLeft + this.oA.offsetWidth/2 + 'px';
		oB.style.top = this.oA.offsetTop + 'px';
		this.runBullet(oB);
	},
	bindAir:function(){
		var iNum = 0,
		timer = null,
		self = this;
		document.onkeydown = function(e){
			e = e || window.event;

			if(!timer){
				timer = setInterval(show, 30);
			}

			if(e.keyCode == 37){
				iNum = 1;			
			}else if(e.keyCode == 39){
				iNum = 2;	
			}else if(e.keyCode == 38){
				iNum = 3;	
			}else if(e.keyCode == 40){
				iNum = 4;	
			}
		}
		document.onkeyup = function(e){
			var e = e || window.event;
			clearInterval(timer);
			timer = null;
			iNum = 0;
			if(e.keyCode == 32){
				self.createBullet();
			}
		}
		function show(){
			if(iNum == 1){
				if(self.oA.offsetLeft <= 0){
					self.oA.style.left = 0;
				}else{ 
					self.oA.style.left = self.oA.offsetLeft - 10 + 'px';
				}
			}else if(iNum == 2){
				if(self.oA.offsetLeft >= self.oParent.offsetWidth - self.oA.offsetWidth){
					self.oA.style.left = self.oParent.offsetWidth - self.oA.offsetWidth;
				}else{
					self.oA.style.left = self.oA.offsetLeft + 10 + 'px';
				}
			}else if(iNum == 3){
				if(self.oA.offsetTop <= 0){
					self.oA.style.top = 0;
				}else{
					self.oA.style.top = self.oA.offsetTop - 10 + 'px';
				}
			}else if(iNum == 4){
				if(self.oA.offsetTop >= self.oParent.offsetHeight - self.oA.offsetHeight){
					self.oA.style.top = self.oParent.offsetHeight - self.oA.offsetHeight;
				}else{
					self.oA.style.top = self.oA.offsetTop + 10 + 'px';
				}
			}
		}
	},
	createAir:function(){
		var oA = document.createElement('div');
		oA.className = this.air.style;
		this.oParent.appendChild(oA);
		oA.style.left = (this.oParent.offsetWidth - oA.offsetWidth)/2 + 'px';
		oA.style.top = this.oParent.offsetHeight - oA.offsetHeight + 'px';
		this.oA = oA;
		this.bindAir();
	},
	runEnemy:function(){
		var self = this,
		L = 0,
		R = this.oParent.offsetWidth - this.oUl.offsetWidth;
		this.oUl.timer = setInterval(function(){
			if(parseInt(self.oUl.style.left) < L){
				self.gk.iSpeedX *= -1;
				self.oUl.style.top = self.oUl.offsetTop +  self.gk.iSpeedY + 'px';
			}else if(parseInt(self.oUl.style.left) > R){
				self.gk.iSpeedX *= -1;
				self.oUl.style.top = self.oUl.offsetTop +  self.gk.iSpeedY + 'px';
			}
			self.oUl.style.left = self.oUl.offsetLeft +  self.gk.iSpeedX + 'px';
		},200)

		setInterval(function(){
			self.oneMove();
		},self.gk.times)
	},
	createEnemy:function(iNow){
		if(this.oUl){
			clearInterval(this.oUl.timer);
			this.oParent.removeChild(this.oUl);
		}

		var gk = this.gK[iNow];
		var oUl = document.createElement('ul'),
		arr = [];
		oUl.id = 'bee';
		oUl.style.width = gk.colNum * 40 + 'px';
		this.oParent.appendChild(oUl);
		oUl.style.left = (this.oParent.offsetWidth - oUl.offsetWidth)/2 + 'px';

		for(var i = 0;i<gk.eMap.length;i++){
			var oLi = document.createElement('li');
			oLi.className = this.oEnemy[gk.eMap[i]].style;

			oLi.blood = this.oEnemy[gk.eMap[i]].blood;
			oLi.speed = this.oEnemy[gk.eMap[i]].speed;
			oLi.score = this.oEnemy[gk.eMap[i]].score;

			oUl.appendChild(oLi);
		}
		this.aLi = oUl.getElementsByTagName('li');
		for(var i = 0;i<this.aLi.length;i++){
			arr.push([this.aLi[i].offsetLeft,this.aLi[i].offsetTop]);
		}

		for(var i = 0;i<this.aLi.length;i++){
			this.aLi[i].style.position = 'absolute';
			this.aLi[i].style.left = arr[i][0] + 'px';
			this.aLi[i].style.top = arr[i][1] + 'px';
		};
		this.oUl = oUl;
		this.gk = gk;
		this.runEnemy();
	},
	air:{
		style: 'air1',
		bulletStyle: 'bullet'
	},
	oEnemy:{
		e1:{style:'enemy1',blood:1,speed:5,score:1},
		e2:{style:'enemy2',blood:2,speed:7,score:2},
		e3:{style:'enemy3',blood:3,speed:10,score:3}
	},
	gK:[
		{
			eMap:[
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1'
			],
			colNum: 10,
			iSpeedX: 10,
			iSpeedY: 10,
			times: 2000
		},
		{
			eMap:[
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1'
			],
			colNum: 10,
			iSpeedX: 10,
			iSpeedY: 10,
			times: 1000
		}
	],
	createScore:function(){
		var oS = document.createElement('div');
		oS.id = 'score';
		oS.innerHTML = '积分：<span>0</span>';
		this.oParent.appendChild(oS);

		this.oSNum = oS.getElementsByTagName('span')[0];

	},
	init:function(id){
		this.oParent = document.getElementById(id);
		this.createScore();
		this.createEnemy(0);
		this.createAir();
	}
}