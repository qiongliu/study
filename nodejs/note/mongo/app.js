const express = require('express');
const db = require('./models/db');

let app = express();

app.get('/',(req,res) => {
	db.setUrl("mongodb://127.0.0.1/demo2");
	db.insert('info',{
		"name": 'b',
		"age": parseInt(Math.random() * (100 - 1 + 1) + 1)
	}).then((result) => {
		res.end();
	},(err) => {
		console.log(err);
	});
});

app.listen(7787);