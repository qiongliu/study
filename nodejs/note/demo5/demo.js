const express = require('express');

let app = express();

app.use('/admin',(req,res) => {
	res.write(req.originalUrl + '\n');
	res.write(req.baseUrl + '\n');
	res.write(req.path);
	res.end();
});

app.get('/',(req,res) => {
	res.send('hello');
});

app.set('view engine', 'ejs');
app.use(express.static('./views'));
app.listen(7787);