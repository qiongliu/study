var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	title: String,
	intro: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	}
});