var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');

var resData = {};
router.use(function(req,res,next){
	resData = {
		code: 0,
		message: ''
	};
	next();
});

router.post('/user/regist',function(req,res,next){
	var username = req.body.username,
	password = req.body.password,
	repassword = req.body.repassword;

	if(username === "") {
		resData.code = 1;
		resData.message = '用户名不能为空';
		res.json(resData);
		return;
	}
	if(password === "") {
		resData.code = 2;
		resData.message = '密码不能为空';
		res.json(resData);
		return;
	}
	if(repassword === "") {
		resData.code = 3;
		resData.message = '重复密码不能为空';
		res.json(resData);
		return;
	}
	if(password !== repassword) {
		resData.code = 4;
		resData.message = '两次密码输入的不一样';
		res.json(resData);
		return;
	}
	User.findOne({
		username: username
	}).then(function(userInfo){
		if (userInfo) {
			resData.code = 5;
			resData.message = "用户名已经被注册";
			res.json(resData);
			return;
		}

		var user = new User({
			username: username,
			password: password
		});
		return user.save();
	}).then(function(newUserInfo){
		resData.message = '注册成功';
		resData.userInfo = {
				id: newUserInfo._id,
				username: newUserInfo.username
			};
			req.cookies.set('userInfo',JSON.stringify({
				id: newUserInfo._id,
				username: newUserInfo.username
			}));
		res.json(resData);
		return;
	});
});

router.post('/user/login',function(req,res,next){
	var username = req.body.username,
	password = req.body.password;
	if(username === "" || password === "") {
		resData.code = 1;
		resData.message = "用户名和密码不能为空！";
		res.json(resData);
		return;
	}
	User.findOne({
		username: username,
		password: password
	}).then(function(userInfo){
		if(!userInfo) {
			resData.code = 1;
			resData.message = '用户名或密码错误！';
		} else {
			resData.message = '登录成功';
			resData.userInfo = {
				id: userInfo._id,
				username: userInfo.username
			};
			req.cookies.set('userInfo',JSON.stringify({
				id: userInfo._id,
				username: userInfo.username
			}));
		}
		res.json(resData);
		return;
	});
});

router.get('/user/loginOut',function(req,res,next){
	req.cookies.set('userInfo','');
	resData.message = '退出成功';
	res.json(resData);
});

router.post('/comment/post',function(req,res,next){
	var id = req.body.articleId,
	content = req.body.articleContent;
	var data = {
		user: req.userInfo.username,
		content: content,
		date: new Date()
	}
	Article.findOne({
		_id: id
	}).then(function(article){
		article.comment.push(data);
		return article.save();
	}).then(function(newArticle){
		data.message = '评论成功！';
		res.json(data);
	})
})

module.exports = router;