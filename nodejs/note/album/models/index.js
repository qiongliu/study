const fs = require('fs');
const path = require('path');
const config = require('../config');
const uploadPath = path.join(__dirname,'..',config.uploadPath);

exports.getAlbums = () => {
	return new Promise((resolve,reject) => {
		fs.readdir(uploadPath,(err,files) => {
			if (err) {
				return reject(err);
			}
			let albums = [];
			(function iterator(i) {
				fs.stat(uploadPath + '/' + files[i],(err,state) => {
					if (i >= files.length) {
						resolve(albums);
						return;
					}
					if (state.isDirectory()) albums.push(files[i]);
					iterator(++i); 
				});
			})(0);
		});
	});
};

exports.getImages = (albumName) => {
	return new Promise((resolve,reject) => {
		let albumUrl = `${uploadPath}/${albumName}`;
		fs.readdir(albumUrl,(err,files) => {
			if (err) return reject(`${albumName}相册不存在!`);
			let imagesArr = [];
			(function iterator (i) {
				fs.stat(`${albumUrl}/${files[i]}`,(err,state) => {
					if (i >= files.length) return resolve(imagesArr);
					if(state.isFile()) imagesArr.push(files[i]);
					iterator(++i);
				});
			})(0);
		});
	});
};