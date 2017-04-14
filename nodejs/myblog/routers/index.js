var express = require('express');
var router = express.Router();
var Category = require('../models/Category'); //使用 ‘/models/category’，会报错。
var Article = require('../models/Article');
var Comment = require('../models/Comment');

var data = {};
router.use(function(req,res,next) {
	data.categoryInfo = [];

	Category.find().then(function(categories){
		data.categoryInfo = categories;
		next();
	});
});

router.get('/article',function(req,res,next){
	var moreInfo = {
		limit: 5,
		more: 0
	};
	Article.findOne({
		_id: req.query.id
	}).populate('author').then(function(article){
		data.articleInfo = article;
		article.hits++;
		return article.save();
	}).then(function(){
		return Comment.find({
			articleId: req.query.id
		}).limit(moreInfo.limit).sort({date: -1});
	}).then(function(comments){
		data.comments = comments;
		res.render('article',{
			userInfo: req.userInfo,
			data: data,
			moreInfo: moreInfo
		});
	});
});


router.get('/',function(req,res,next){
	data.category = req.query.category || '';
	data.articleInfo = [];
	data.pageInfo = {
		page : req.query.page || 1,
		limit : 4,
		pages : 0,
		count : 0
	};
	var where = {};
	if(data.category) {
		where.category = data.category;
	}

	Article.where(where).count().then(function(count){
		data.pageInfo.count = count;
		data.pageInfo.pages = Math.ceil(count / data.pageInfo.limit);
		data.pageInfo.page = Math.min(data.pageInfo.page,data.pageInfo.pages);
		data.pageInfo.page = Math.max(data.pageInfo.page,1);
		var skip = (data.pageInfo.page - 1) * data.pageInfo.limit;
		return Article.where(where).find().sort({date: -1}).skip(skip).limit(data.pageInfo.limit).populate(['category','author']);
	}).then(function(articles){
		data.articleInfo = articles;
		res.render('index',{
			data: data,
			userInfo: req.userInfo
		});
	});
});

module.exports = router;