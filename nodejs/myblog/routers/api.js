var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/User');
var Article = require('../models/Article');
var Comment = require('../models/Comment');

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
		req.flash('error', '两次输入的密码不一致!'); 
	    res.redirect('/');
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

		var md5 = crypto.createHash('md5');
	    password = md5.update(password).digest('hex');

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

router.post('/comment/post',function(req,res,next) {
	var id = req.body.articleId;
	resData.user = req.userInfo.username;
	resData.content = req.body.articleComment;
	resData.date = new Date();
	new Comment({
		articleId: id,
		user: resData.user,
		content: resData.content,
		date: new Date()
	}).save().then(function(comment){
		resData.message = '评论成功！';
		resData.commentId = comment._id;
		return Comment.count();
	}).then(function(count){
		resData.count = count;
		res.json(resData);
	});
});

router.post('/comment/delete',function(req,res,next){
	var id = req.body.commentId || '';
	Comment.remove({
		_id: id
	}).then(function(rs){
		resData.message = '删除成功!';
		return Comment.count();
	}).then(function(count){
		resData.count = count;
		res.json(resData);
	});

});

router.get('/comment/more',function(req,res,next){
	var articleId = req.query.articleId;
	var moreInfo = {
		more: req.query.more || 1,
		mores: 0,
		limit: 5,
		count: 0
	};
	Comment.count({
		articleId: articleId 
	}).then(function(count){
		moreInfo.count = count;
		moreInfo.mores = Math.ceil(moreInfo.count / moreInfo.limit) - 1;
		moreInfo.more = Math.min(moreInfo.more, moreInfo.mores);
		var skip = moreInfo.more * moreInfo.limit;
		return Comment.where({articleId: articleId}).find().sort({date: -1}).skip(skip).limit(moreInfo.limit);
	}).then(function(comments){
		resData.message = '加载成功！';
		resData.comments = comments;
		resData.moreInfo = moreInfo;
		res.json(resData);
	});
});

module.exports = router;