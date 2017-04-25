var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	title: String,
	intro: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: new Date()
	},
	hits: {
		type: Number,
		default: 0
	},
	noteNum: {
		type: Number,
		default: 0
	},
	fileName: String
});