const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const formidable = require('formidable');
const util = require('util');
const dateformat = require('dateformat');

let server = http.createServer((req,res) => {
	if(req.url === '/favicon.ico') return;
	if (req.url === '/') {
		fs.readFile(__dirname + '/demo1.html',(err,data) => {
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			res.end(data);
		});
	}
	// let content = '';
	// if(req.url === '/postMethod' && req.method.toLowerCase() === 'post') {
	// 	req.addListener('data',(chunk) => {
	// 		content += chunk;
	// 	});
	// 	req.addListener('end',() => {
	// 		let data = querystring.parse(content);
	// 		console.log(data);
	// 		res.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
	// 		res.end("post提交成功！");
	// 	});
	// 	return;
	// }
	if(req.url === '/postMethod' && req.method.toLowerCase() === 'post') {
		let form = new formidable.IncomingForm();
		form.uploadDir = './upload';
		form.parse(req,(err,fields,files) => {
			let date = dateformat(new Date(),'yyyymmddHHMMss');
			let random = parseInt(Math.random() * (99999 - 10000 + 1) + 10000);
			let file = files.tupian;
			let ext = path.extname(file.name);
			let oldPath = file.path;
			let newPath = __dirname + '/upload/' + date + random + ext;
			fs.rename(oldPath,newPath,(err) => {
				res.end('formidable success');
			});
		});
		return;
	}
});

server.listen(7787,'127.0.0.1');