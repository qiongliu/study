var http = require('http');
var fs = require('fs');
var util = require('util');
var emitter = require('events').EventEmitter;



var app = http.createServer(function(res,req){
	req.writeHead('200',{'Content-Type':'text/plain'});

	// var readStream = fs.createReadStream('./app.js');
	// var writeStream = fs.createWriteStream('./app1.js');


	req.end('hello');
}).listen(7788);


//process
process.argv.forEach(function(val,index,array){
	console.log(index + ':' + val);
});

process.stdout.write('\n');

process.on('exit',function(){
	console.log('precess exit');
});

process.stdout.write('process.stdout.write(liuqiong):liuqiong' + '\n');

console.log('require.resolve(./app.js):' + require.resolve('./app.js') + '\n');

console.log('__filename:' + __filename + '\n');

console.log('__dirname:' + __dirname + '\n' );

console.log(process.execPath + '\n' );

console.log('Starting directory: ' + process.cwd());
// try {
//   process.chdir('/note');
//   console.log('New directory: ' + process.cwd());
// }
// catch (err) {
//   console.log('chdir: ' + err);
// }

console.log(process.pid + '\n' );

console.log(process.title + '\n' );

console.log(process.platform + '\n' );


//util
console.log(util.inspect(process.memoryUsage()));

//events

app.on('newListener',function(){
	console.log('new listener is add');
});

app.on('connection', function (stream) {
  console.log('someone connected!');
});

var onceListener = function(){
	console.log('this listener will fire once');
};
app.once('connection', onceListener);

app.on('click',function(arg){
	console.log('this is ' + arg + ' add event');
});

// app.removeListener('connection',onceListener);

console.log(app.listeners('connection'));

app.emit('click','liuqiong');


//Buffer


//Stream
var readStream = fs.createReadStream('./doc/rect.html');

readStream.on('data',function(chunk){
	console.log(Buffer.isBuffer(chunk));
	console.log(readStream.readable);
});

readStream.on('end',function(){
	console.log('readStream is over');
	console.log(readStream.readable);
});

readStream.on('close',function(){
	console.log('readStream is close');
});


// file system
// fs.rename('./app1.js','./appDemo.js',function(err){
// 	if(err) throw err;
// 	console.log('fs.rename');
// });

fs.stat('./appDemo.js',function(err,stats){
	if(err) throw err;
	console.log(stats);
});