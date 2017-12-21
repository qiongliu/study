const MongoClient = require('mongodb').MongoClient;
const dburl = require('../config').dburl;

function _connect () {
	return new Promise((resolve,reject) => {
		MongoClient.connect(dburl,(err,db) => {
			if (err) {
				return reject("数据库连接失败!");
			}
			resolve(db);
		});
	});
}

exports.insert = (collectionName,data) => {
	return new Promise((resolve,reject) => {
		_connect().then((db) => {
			db.collection(collectionName).insertOne(data,(err,result) => {
				db.close();
				if (err) {
					return reject("添加数据失败！");
				}
				resolve(result);
			});
		},(message) => {
			reject(message);
		});
	});
};

exports.find = (collectionName,data,opts) => {
	return new Promise((resolve,reject) => {
		opts = opts || {
			'page': 0,
			'count': 0
		};
		let limit = opts.count,
		skip = (opts.page - 1) * opts.count;
		_connect().then((db) => {
			db.collection(collectionName).find(data).limit(limit).skip(skip).toArray((err,result) => {
				if (err) return reject(err);
				resolve(result);
			})
		},(message) => {
			reject(message);
		});
	});
};

exports.delete = (collectionName,data) => {
	return new Promise((resolve,reject) => {
		_connect().then((db) => {
			console.log(1);
			db.collection(collectionName).deleteMany(data,(err,result) => {
				if (err) return reject("删除失败！");
				resolve(result);
			});
		},(message) => {
			reject(message);
		});
	});
};


