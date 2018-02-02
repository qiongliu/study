const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test',{config:{autoIndex: false},useMongoClient:true});
db = mongoose.connection;

db.once('open',() => {
	console.log('success');
});

module.exports = mongoose;