var canvas = document.getElementById('canvas');
var width= 800;
canvas.width = canvas.height = width;

var ctx = canvas.getContext('2d');
var isDown = false;
var lastLoc = {x:0,y:0};

;(function(){
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(3,3);
	ctx.lineTo(width - 3,3);
	ctx.lineTo(width - 3,width - 3);
	ctx.lineTo(3,width-3);
	ctx.closePath();

	ctx.strokeStyle = "#ccc";
	ctx.lineWidth = 6;
	ctx.stroke();

	ctx.beginPath();

	ctx.moveTo(0,0);
	ctx.lineTo(width,width);

	ctx.moveTo(width,0);
	ctx.lineTo(0,width);

	ctx.moveTo(width/2,0);
	ctx.lineTo(width/2,width);

	ctx.moveTo(0,width/2);
	ctx.lineTo(width,width/2);

	ctx.strokeStyle = "#000";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.restore();
})();

function windowToCavnas(x,y) {
	var offset = canvas.getBoundingClientRect();
	return {
		x: Math.round(x - offset.left),
		y: Math.round(y - offset.top)
	};
}

canvas.onmousedown = function(e) {
	e.preventDefault();
	isDown = true;
	lastLoc = windowToCavnas(e.clientX,e.clientY);
};

canvas.onmouseup = function(e) {
	e.preventDefault();	
	isDown = false;

};

canvas.onmouseout = function(e) {
	e.preventDefault();	
	isDown = false;

};

canvas.onmousemove = function(e) {
	e.preventDefault();	
	if(isDown) {
		var curLoc = windowToCavnas(e.clientX,e.clientY);
		ctx.beginPath();
		ctx.moveTo(lastLoc.x,lastLoc.y);
		ctx.lineTo(curLoc.x,curLoc.y);
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 6;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.stroke();
		lastLoc = curLoc;
	}
};