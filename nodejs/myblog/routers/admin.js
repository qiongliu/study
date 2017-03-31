var express = require('express');
var router = express.Router();

router.use(function(req,res,next){
	if(!req.userInfo.isAdmin) {
		res.send("你没有后台管理权限！")
		return;
	}
	next();
})

router.use('/',function(req,res,next){
	res.render('manage/index.html');
});

module.exports = router;