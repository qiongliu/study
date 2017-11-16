const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

let server = http.createServer((req,res) => {
	
	let pathname = url.parse(req.url).pathname;
	const static = './static';
	fs.stat(static + pathname,(err,stats) => {
		if (err) {
			fs.readFile(static + '/error.html', (err,data) => {
				res.writeHead(404,{'Content-Type': `text/html;charset=utf-8`});
				res.write(data);
				res.end();
			});
			return;
		}
		if (stats.isDirectory()) {
			pathname += '/index.html';
		}

		pathname = path.normalize(pathname);
		let extname = path.extname(pathname);

		getExtName(extname).then((contentType) => {
			fs.readFile(static + pathname,(err,data) => {
				if (err) {
					fs.readFile(static + '/error.html', (err,data) => {
						res.writeHead(404,{'Content-Type': `${contentType};charset=utf-8`});
						res.write(data);
						res.end();
					});
					return;
				}
				res.writeHead(200,{'Content-Type': `${contentType};charset=utf-8`});
				res.end(data);
			});
		});
	});
});

function getExtName (extname) {
	return new Promise((resolve,reject) => {
		fs.readFile('./static/mime.json','utf8',(err,data) => {
			if (err) throw err;
			data = JSON.parse(data);
			if (data[extname]) {
				contentType = data[extname];
			};
			resolve(contentType);
		});
	});
}

server.listen(7787,'localhost');