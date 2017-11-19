const fs = require('fs');
const path = require('path');
const uploadPath = path.join(__dirname,'../upload');

module.exports = function getAlbums () {
	return new Promise((resolve,reject) => {
		resolve();
		// fs.readdir(uploadPath,(err,files) => {
		// 	if (err) reject(err);
		// 	let albums = [];
		// 	(function iterator(i) {
		// 		fs.stat(uploadPath + '/' + files[i],(err,state) => {
		// 			if (i >= files.length) {
		// 				resolve(albums);
		// 				return;
		// 			}
		// 			if (state.isDirectory()) albums.push(files[i]);
		// 			iterator(++i); 
		// 		});
		// 	})(0);
		// });
	});
};