var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
var Article = require('../models/Article');

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
					limit: limit,
					name: 'user'
				}
			});
		});
	});

});

router.get('/article/add',function(req,res,next){
	Category.find().then(function(categories){
		res.render('manage/addArticle',{
			userInfo: req.userInfo,
			categories: categories
		});		
	});
});

router.post('/article/add',function(req,res,next){
	var category = req.body.category,
	title = req.body.title,
	intro = req.body.intro,
	content = req.body.content;

	if(req.body.category === '') {
		res.render('manage/error',{
			userInfo: userInfo,
			message: '文章分类不能为空'
		});
		return;
	}

	new Article({
		category: category,
		title: title,
		intro: intro,
		content: content
	}).save().then(function(rs){
		res.render('manage/success',{
			userInfo: req.userInfo,
			message: '发表成功！',
			url: 'manage/article'
		});
	});

});

router.get('/article/editArtice',function(req,res,next){

})

router.get('/article',function(req,res,next){
	var page = parseInt(req.query.page) || 1,
	pages = 0,
	limit = 4;
	Article.count().then(function(count){
		if(count === 0) {
			res.render('manage/error',{
				userInfo: req.userInfo,
				message: '还没有文章哦！'
			})
			return;
		}
		pages = Math.ceil(count / page);
		page = Math.min(page,pages);
		page = Math.max(page,1);
		var skip = (page - 1) * limit;
		Article.find().sort({_id: -1}).skip(skip).limit(limit).populate('category').then(function(articles){
			res.render('manage/article',{
				userInfo: req.userInfo,
				articles: articles,
				pageInfo: {
					page: page,
					pages: pages,
					limit: limit,
					count: count,
					name: 'article'
				}
			});		
		})
	})
});

router.get('/category/editCategory',function(req,res,next){
	var id = req.query.id;
	Category.findOne({
		_id: id
	}).then(function(category){
		res.render('manage/edit',{
			userInfo: req.userInfo,
			category: category
		});
	});
});

router.post('/category/edit',function(req,res,next){
	var id = req.query.id;
	var name = req.body.categoryName;
	Category.findOne({
		_id: id
	}).then(function(category){
		if(!category) {
			res.render('manage/error',{
				userInfo: req.userInfo,
				message: '没有找到记录'
			});
			return Promise.reject();
		} 
		else {
			Category.findOne({
				_id: {$ne: id},
				name: name
			}).then(function(same){
				if(same) {
					res.render('manage/error',{
						userInfo: req.userInfo,
						message: '已经存在同名分类'
					});
					return Promise.reject();
				} else {
					return Category.update({
						_id: id
					},{
						name: name
					});
				}
			}).then(function(rs){
				res.render('manage/success',{
					userInfo: req.userInfo,
					message: '修改成功!',
					url: '/manage/category'
				});
			});
		}
	});
});

router.get('/category/deleteCategory',function(req,res,next){
	var id = req.query.id || '';
	Category.remove({
		_id: id
	}).then(function(rs){
		res.render('manage/success',{
			userInfo: req.userInfo,
			message: '删除成功！',
			url: '/manage/category'
		});
	});
});

router.post('/category/add',function(req,res,next){
	var name = req.body.categoryName || '';
	if(name === '') {
		res.render('manage/error',{
			userInfo: req.userInfo,
			message: '分类名称不能为空!'
		});		
		return;
	}
	Category.findOne({
		name: name
	}).then(function(rs){
		if(rs) {
			res.render('manage/error',{
				userInfo: req.userInfo,
				message: '用户名已经存在'
			});
			return Promise.reject();
		} else {
			return new Category({
				name: name
			}).save();
		}
	}).then(function(newCategory){
		res.render('manage/success',{
			userInfo: req.userInfo,
			message: '添加分类成功',
			url: '/manage/category'
		});
	});

});

router.get('/category/add',function(req,res,next){
	res.render('manage/addCategory',{
		userInfo: req.userInfo
	});
});

router.get('/category',function(req,res,next){
	var page = parseInt(req.query.page) || 1,
	limit = 4,
	pages = 0;

	Category.count().then(function(count){
		if(count === 0) {
			res.render('manage/error',{
				userInfo: req.userInfo,
				message: '还没有分类哦！'
			})
			return;
		}
		pages = Math.ceil( count / limit );
		page = Math.max(page,1);
		page = Math.min(page,pages);
		var skip = (page - 1) * limit;
		//sort():1，升序；-1，降序
		Category.find().sort({_id: -1}).skip(skip).limit(limit).then(function(categories){
			res.render('manage/category',{
				userInfo: req.userInfo,
				categories: categories,
				pageInfo: {
					page: page,
					limit: limit,
					count: count,
					pages: pages,
					name: 'category'
				}
			});
		});
	});
});

router.use('/',function(req,res,next){
	res.render('manage/index',{
		userInfo: req.userInfo
	});
});

module.exports = router;