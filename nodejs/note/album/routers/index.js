const express = require('express');
const router = express.Router();
const index = require('../models/index');

router.use('/:albumName',(req,res) => {
	let albumName = req.params.albumName;
	index.getImages(albumName).then((images) => {
		res.render('album',{
			info: {
				albumName,
				images
			}
		})
	},(err) => {
		res.render('error',{
			info: {
				message: err
			}
		});
	});
});

router.use((req,res) => {
	index.getAlbums().then((albums) => {
		res.render('index',{
			info: {
				code: 0,
				albums
			}
		});
	},(err) => {
		res.render('index',{
			info: {
				code: 1,
				message: '找不到上传文件夹！'
			}
		});
	});
});

module.exports = router;