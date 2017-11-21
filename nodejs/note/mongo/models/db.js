const MongoClient = require('mongodb').MongoClient;

let dburl = '';

function _connect () {
	return new Promise((resolve,reject) => {
		MongoClient.connect(dburl,(err,db) => {
			if (err) {
				console.log("数据库连接失败!");
				return reject(err);
			}
			resolve(db);
		});
	});
}

exports.setUrl = (url) => {
	dburl = url || "mongodb://127.0.0.1/test";
};

exports.insert = (collection,data) => {
	return new Promise((resolve,reject) => {
		_connect().then((db) => {
			db.collection(collection).insertOne(data,(err,result) => {
				db.close();
				if (err) {
					return reject(err);
				}
				resolve(result);
			});
		},(err) => {
			reject(err);
		});
	});
};

