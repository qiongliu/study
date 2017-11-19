const express = require('express');
const router = express.Router();
const getAlbums = require('../models/index');

router.use((req,res) => {
	getAlbums(function(){
		console.log(1);

	},function() {

	})
	res.end('hello');
	// getAlbums((albums) => {
	// 	res.end('hello');
	// 	// res.render('index',{
	// 	// 	info: {
	// 	// 		code: 0,
	// 	// 		albums
	// 	// 	}
	// 	// });
	// },(err) => {
	// 	res.render('index',{
	// 		info: {
	// 			code: 1,
	// 			message: '找不到上传文件夹！'
	// 		}
	// 	});
	// });
});

module.exports = router;