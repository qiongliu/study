const express = require('express');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');

const app = express();

app.set('view engine','html');
app.engine('html',ejs.renderFile);

app.use(session({
	secret: 'haha',
	resave: true,
	saveUninitialized: true
}));

app.get('/',(req,res) => {
	let message = '未登录！';
	if (req.session.login) {
		message = '已登录';
	}
	res.render('index',{
		data: {
			message: message
		}
	});
});

app.get('/login',(req,res) => {
	req.session.login = true;
	res.render('login',{
		data: {
			message: '登录页！'
		}
	});
});

app.listen(7787);