var path = require('path');
var express = require('express');
var ejs = require('ejs');
var mongoose = require('mongoose');

var app = express();

app.engine('html',ejs.renderFile);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.set('view cache',false);

app.use('/public',express.static(__dirname + "/public"));

app.use('/',require('./routers/index.js'));
app.use('/admin',require('./routers/admin.js'));
app.use('/api',require('./routers/api.js'));

mongoose.connect('mongodb://localhost:27018/blog',function(err){
	if(err) {
		console.log('mongodb err...');
	} else {
		console.log('mongodb ok...');
		app.listen(7788,function(){
			console.log('listen...');
		});
	}
})

