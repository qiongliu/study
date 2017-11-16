const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

let server = http.createServer((req,res) => {
	if(req.url === '/favicon.ico') return;
	if (req.url === '/') {
		fs.readFile(__dirname + '/demo1.html',(err,data) => {
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			res.end(data);
		});
	}
	let content = '';
	if(req.url === '/postMethod') {
		req.addListener('data',(chunk) => {
			content += chunk;
		});
		req.addListener('end',() => {
			let data = querystring.parse(content);
			console.log(data);
			res.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
			res.end("post提交成功！");
		});
		return;
	}
	let urlname = url.parse(req.url,true);
	if (urlname.pathname === '/getMethod') {
		console.log(urlname.query);
		res.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
		res.end("get提交成功！");
	}
});

server.listen(7787,'127.0.0.1');