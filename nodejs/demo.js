var fs = require('fs');
var http = require('http');
var url = require('url');

var server = http.createServer(function(req,res){
	res.setHeader('name','liuqiong');
	res.writeHead(200,{
		'content-type':'text/html'
	});
	console.log(url.parse(req.url));
	res.end('<h1>hello</h1>');
});

server.listen(7788,function(){
	console.log('listen...');
});