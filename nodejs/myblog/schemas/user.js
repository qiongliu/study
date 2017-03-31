var mongoose = require('mongoose');
var userSchema = mongoose.Schema;

module.exports = new userSchema({
	username: String,
	password: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
})