var express = require('express');
var router = express.Router();

router.use('/user',function(req,res){
	res.send('api...');
});

module.exports = router;