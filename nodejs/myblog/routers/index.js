var express = require('express');
var router = express.Router();
var Category = require('../models/Category'); //使用 ‘/models/category’，会报错。
var Article = require('../models/Article');

router.use('/',function(req,res,next){
	var data = {
		categoryInfo: [],
		articleInfo: [],
		pageInfo: {
			page: req.query.page || 1,
			limit: 1,
			pages: 0,
			count: 0
		}
	};
	Category.find().then(function(categories){
		data.categoryInfo = categories;
		return Article.count();
	}).then(function(count){
		data.pageInfo.count = count;
		data.pageInfo.pages = Math.ceil(count / data.pageInfo.limit);
		data.pageInfo.page = Math.min(data.pageInfo.page,count);
		data.pageInfo.page = Math.max(data.pageInfo.page,1);
		var skip = (data.pageInfo.page - 1) * data.pageInfo.limit;
		return Article.find().skip(skip).limit(data.pageInfo.limit).populate(['category','author']);
	}).then(function(articles){
		data.articleInfo = articles;
		console.log(data);
		res.render('index',{
			data: data,
			userInfo: req.userInfo
		})
	})
});

module.exports = router;