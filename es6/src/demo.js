//let、const
var i = '10';
for ( let i = 0; i < 4; i++){
	// console.log(i);
}

//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var p = new Point(3, 2);

var str = p.toString();
// console.log(str);
// 
let info = {name:'liyi',age:30};
let tmp = `<div>
<h1>hello ${info.name}</h1>
<h2>hello template</h2>
</div>`;
$(".main").append(tmp);