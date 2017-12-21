const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/demo')

db.on('open',() => {
	console.log('success');
});

module.exports = db;
