const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

let server = http.createServer((req,res) => {
	let pathname = url.parse(req.url).pathname;
	if(pathname === '/') {
		pathname = 'index.html';
	}
	let extname = path.extname(pathname);
	getExtName().then((data) => {
		data = JSON.parse(data);
		let contentType = '';
		if (data[extname]) {
			contentType = data[extname];
		};
		fs.readFile('./static/' + pathname,(err,data) => {
			if (err) {
				fs.readFile('./static/error.html', (err,data) => {
					res.writeHead(404,{'Content-Type': `${contentType};charset=utf-8`});
					res.end(data);
				});
				return;
			}
			res.writeHead(200,{'Content-Type': `${contentType};charset=utf-8`});
			res.end(data);
		});
	});
});

function getExtName () {
	return new Promise((resolve,reject) => {
		fs.readFile('./static/mime.json','utf8',(err,data) => {
			if (err) throw err;
			resolve(data);
		});
	});
}

server.listen(7787,'localhost');