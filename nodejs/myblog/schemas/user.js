var mongoose = require('mongoose');
var userSchema = mongoose.Schema;

module.exports = new userSchema({
	user: String,
	passwork: String
})