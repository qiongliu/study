var mongoose = require('mongoose');

module.exports = mongoose.Schema({
	articleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	},
	date: {
		type: Date,
		default: new Date()
	},
	content: String,
	user: String
})