const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
	console.log(url.parse(req.url,true));

	res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
	res.write('<h2>this is h2!</h2>'); //参数值必须为 string or Buffer
	res.end('<h1>this is h1!</h1>'); //必须存在此方法关闭响应，参数同上
});

server.listen(3000,'127.0.0.1');

