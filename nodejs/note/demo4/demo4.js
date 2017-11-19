const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

let server = http.createServer((req,res) => {
	if (req.url === '/favicon.ico') return;
	fs.readFile(__dirname + '/demo.html',(err,data) => {
		let template = data.toString();
		let info = {
			infos: [{
				name: 'linyi',
				age: 20
			},
			{
				name: 'liner',
				age: 24
			}]
		};
		let view = ejs.render(template,info);
		res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
		res.end(view);
	});
});

server.listen(7787,'127.0.0.1');

