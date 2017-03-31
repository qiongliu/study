var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.use(function(req,res,next){
	if(!req.userInfo.isAdmin) {
		res.send("你没有后台管理权限！");
		return;
	}
	next();
});

router.get('/user',function(req,res,next){
	var page = parseInt(req.query.page || 1),
	limit = 4,
	pages = 0;

	User.count().then(function(count){
		pages = Math.ceil( count / limit );
		page = Math.min(page, pages);
		page = Math.max(page, 1);
		var skip = (page - 1) * limit;
		User.find().skip(skip).limit(limit).then(function(users){
			res.render('manage/user',{
				userInfo: req.userInfo,
				users: users,
				pageInfo: {
					page: page,
					count: count,
					pages: pages,
					limit: limit
				}
			});
		});
	});

});

router.use('/category/add',function(req,res,next){
	res.render('manage/addCategory',{
		userInfo: req.userInfo
	});
});

router.use('/category',function(req,res,next){
	res.render('manage/category',{
		userInfo: req.userInfo
	});
});

router.use('/',function(req,res,next){
	res.render('manage/index',{
		userInfo: req.userInfo
	});
});


module.exports = router;