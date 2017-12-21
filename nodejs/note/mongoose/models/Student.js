const mongoose = require('mongoose');
const db = require('./db');

let studentSchema = new mongoose.Schema({
	name: {
		type: String
	},
	age: {
		type: Number
	}
});

module.exports = studentModel = db.model('Student',studentSchema);