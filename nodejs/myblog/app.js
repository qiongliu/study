var express = require('express');
var config = require('./config');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var User = require('./models/User');

var app = express();

app.set('port', process.env.PORT || 7788);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.set('view cache',false);
app.engine('html',ejs.renderFile);

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/public',express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());

app.use(function(req,res,next){
	req.cookies = new Cookies(req,res);
	req.userInfo = {};
	var userInfo = req.cookies.get('userInfo');
	if(userInfo) {
		try {
			req.userInfo = JSON.parse(userInfo);
			User.findById(req.userInfo.id).then(function(newUserInfo){
				req.userInfo.isAdmin = Boolean(newUserInfo.isAdmin);
				next();
			});
		} catch (e){
			next();
		}
	} else {
		next();
	}
});

app.use(session({
  	secret: config.cookieSecret,
  	key: config.db,//cookie name
  	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  	resave: false,
	  saveUninitialized: true,
  	store: new MongoStore({
  	  	url: 'mongodb://' + config.host + ':' + config.port + '/' + config.db
  	})
}));

app.use('/manage',require('./routers/manage'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/index'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

mongoose.connect('mongodb://' + config.host + ':' + config.port + '/' + config.db,function(err){
	if(err) {
		console.log('mongodb err...');
	} else {
		console.log('mongodb ok...');
		app.listen(app.get("port"),function(){
			console.log('listen...');
		});
	}
});

