const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const dateformat = require('dateformat');
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

exports.upload = (req,res) => {
	return new Promise((resolve,reject) => {
		let form = new formidable.IncomingForm();
		form.uploadDir = path.join(__dirname,'..','temp');
		form.parse(req,(err,fields,files) => {
			if (err) return reject(err);
			let date = dateformat(new Date(),'yyyymmddHHMMss');
			random = parseInt(Math.random() * (99999 - 10000 + 1) + 10000),
			albumName = fields.albumName,
			file = files.tupian,
			ext = path.extname(file.name),
			newPath = `${uploadPath}/${albumName}/${date}${random}${ext}`;
			fs.rename(file.path,newPath,(err) => {
				if (err) return reject(err);
				resolve(albumName);
			});
		});
	})
};