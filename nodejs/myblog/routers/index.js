var express = require('express');
var router = express.Router();
var Category = require('../models/Category'); //使用 ‘/models/category’，会报错。

router.use('/',function(req,res,next){
	Category.find().then(function(categories){
		res.render('index',{
			userInfo: req.userInfo,
			categories: categories
		});
	});
});

module.exports = router;