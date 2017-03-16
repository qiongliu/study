$(function(){
	var canvas = document.getElementById('canvas'),
	clear = document.getElementById('clear'),
	green = document.getElementsByTagName('input')[1],
	yellow = document.getElementsByTagName('input')[2],
	blue = document.getElementsByTagName('input')[3],
	ctx = canvas.getContext('2d'),
	gWidth = Math.min(800, screen.availWidth),
	gHeight = gWidth,
	lineColor = "#000",
	lineWidth = 6,
	isMouseDown = false,
	lastLoc = {x:0 ,y:0};

	canvas.width = gWidth;
	canvas.height = gWidth;

	function drawGrid() {
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(230,11,9)';
		ctx.lineWidth = lineWidth;
		ctx.rect(0, 0, gWidth, gHeight);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(0, 0);
		ctx.lineTo(gWidth, gHeight);
		ctx.moveTo(gWidth / 2, 0);
		ctx.lineTo(gWidth / 2, gHeight);
		ctx.moveTo(gWidth, 0);
		ctx.lineTo(0, gHeight);
		ctx.moveTo(0, gHeight / 2);
		ctx.lineTo(gWidth, gHeight / 2);
		ctx.stroke();
		ctx.restore();
	}

	drawGrid();
	
	function wTc(x, y) {
		var cBox = canvas.getBoundingClientRect();
		return {
			x: Math.round(x - cBox.left),
			y: Math.round(y - cBox.top)
		};
	}

	function beginStroke(point) {
		isMouseDown = true;
		lastLoc = wTc(point.x, point.y);
	}

	function endStroke() {
		isMouseDown = false;
	}

	function moveStroke(point) {
		var curLoc = wTc(point.x, point.y);
			ctx.beginPath();
			ctx.strokeStyle = lineColor;
			ctx.lineWidth = 10;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.moveTo(lastLoc.x, lastLoc.y);
			ctx.lineTo(curLoc.x, curLoc.y);
			ctx.stroke();

			lastLoc = curLoc;
	}

	canvas.onmousedown = function(e) {
		e.preventDefault();
		beginStroke({x: e.clientX, y: e.clientY})
	};

	canvas.onmouseup = function(e) {
		e.preventDefault();
		endStroke()
	};

	canvas.onmouseout = function(e) {
		e.preventDefault();
		endStroke()
	};

	canvas.onmousemove = function(e) {
		e.preventDefault();
		if (isMouseDown) {
			moveStroke({x: e.clientX, y: e.clientY});
		}
	};

	canvas.addEventListener("touchstart",function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		beginStroke({x:touch.pageX, y:touch.pageY});
	})
	canvas.addEventListener("touchend",function(e) {
		e.preventDefault();
		endStroke()
	})
	canvas.addEventListener("touchmove",function(e) {
		e.preventDefault();
		if (isMouseDown) {
			var touch = e.touches[0];
			moveStroke({x:touch.pageX, y:touch.pageY});
		}
	})
	
	clear.onclick = function() {
		ctx.clearRect(0, 0, gWidth, gHeight);
		drawGrid();
	};
	green.onclick = function() {
		lineColor = 'green';
	};
	yellow.onclick = function() {
		lineColor = 'yellow';
	};
	blue.onclick = function() {
		lineColor = 'blue';
	};


});