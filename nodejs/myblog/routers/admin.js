var express = require('express');
var router = express.Router();

router.use('/user',function(req,res,next){
	res.send('admin...');
});

module.exports = router;