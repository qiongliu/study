var express = require('express');
var router = express.Router();
var User = require('../module/User');

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
		res.json(resData);
	})
});

router.post('/user/login',function(req,res,next){
	var username = req.body.username,
	password = req.body.password;
	if(username === "" || password === "") {
		resData.code = 1;
		resData.message = "用户名和密码不能为空！"
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
		}
		res.json(resData);
		return;
	})
})

module.exports = router;