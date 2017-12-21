const express = require('express');
const db = require('./models/db');

let app = express();

app.get('/find',(req,res) => {
	let page = parseInt(req.query.page) || 1,
	conut = 5;
	db.setUrl("mongodb://127.0.0.1/demo2");
	db.find('info',{
		'$or': [{'age':44},{'age': 64}]
	},{
		'page': page,
		'count': conut
	}).then((result) => {
		res.send(result);
	},(err) => {
		res.end(err);
	});
});

app.get('/insert',(req,res) => {
	db.setUrl("mongodb://127.0.0.1/demo2");
	db.insert('info',{
		"name": 'b',
		"age": parseInt(Math.random() * (100 - 1 + 1) + 1)
	}).then((result) => {
		res.end();
	},(message) => {
		res.end(message);
	});
});

app.get('/delete',(req,res) => {
	db.setUrl("mongodb://127.0.0.1/demo2");
	let age = parseInt(req.query.age);
	db.delete('info',{
		'age': age
	}).then((result) => {
		res.send(result);
	},(message) => {
		res.send(message);
	});
});

app.

app.get('/',(req,res) => {
	res.send('mongodb!');
});

app.listen(7787);