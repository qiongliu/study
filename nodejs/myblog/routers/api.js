var express = require('express');
var router = express.Router();

router.post('/user/regist',function(req,res,next){
	res.json(11);
});

module.exports = router;